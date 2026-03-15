import {
  PDFDocument,
  PDFName,
  PDFArray,
  PDFDict,
  PDFRef,
  PDFContentStream,
  PDFStream,
  pushGraphicsState,
  popGraphicsState,
  concatTransformationMatrix,
  drawObject,
} from "pdf-lib";
import type { PDFPage } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";

// ─── 타입 ─────────────────────────────────────────────

export interface FlattenOptions {
  formFields: boolean;
  annotations: boolean;
}

// ─── 분석: PDF 내 인터랙티브 요소 감지 ─────────────────

export interface FlattenAnalysis {
  hasFormFields: boolean;
  formFieldCount: number;
  hasAnnotations: boolean;
  annotationCount: number;
  /** 주석 타입별 개수 */
  annotationTypes: Record<string, number>;
}

/** PDF 바이트에서 폼 필드와 주석 현황을 분석 */
export async function analyzePdf(file: File): Promise<FlattenAnalysis> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  // 폼 필드 수 확인
  let formFieldCount = 0;
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (root) {
    const catalog = context.lookup(root) as PDFDict | undefined;
    if (catalog && typeof catalog.get === "function") {
      const acroForm = catalog.get(PDFName.of("AcroForm"));
      if (acroForm) {
        const acroDict = context.lookup(
          acroForm instanceof PDFRef ? acroForm : acroForm,
        ) as PDFDict | undefined;
        if (acroDict && typeof acroDict.get === "function") {
          const fields = acroDict.get(PDFName.of("Fields"));
          if (fields) {
            const fieldsArr = context.lookup(
              fields instanceof PDFRef ? fields : fields,
            ) as PDFArray | undefined;
            if (fieldsArr) {
              formFieldCount = fieldsArr.size();
            }
          }
        }
      }
    }
  }

  // 주석 수 확인
  let annotationCount = 0;
  const annotationTypes: Record<string, number> = {};

  for (const page of doc.getPages()) {
    const annots = page.node.get(PDFName.of("Annots"));
    if (!annots) continue;

    const annotsArr = context.lookup(
      annots instanceof PDFRef ? annots : annots,
    ) as PDFArray | undefined;
    if (!annotsArr) continue;

    for (let i = 0; i < annotsArr.size(); i++) {
      const annotRef = annotsArr.get(i);
      const annotDict = context.lookup(
        annotRef instanceof PDFRef ? annotRef : annotRef,
      ) as PDFDict | undefined;
      if (!annotDict || typeof annotDict.get !== "function") continue;

      const subtype = annotDict.get(PDFName.of("Subtype"));
      const typeName = subtype?.toString().replace("/", "") ?? "Unknown";

      // Widget 타입은 폼 필드이므로 주석 카운트에서 제외
      if (typeName === "Widget") continue;

      annotationCount++;
      annotationTypes[typeName] = (annotationTypes[typeName] ?? 0) + 1;
    }
  }

  return {
    hasFormFields: formFieldCount > 0,
    formFieldCount,
    hasAnnotations: annotationCount > 0,
    annotationCount,
    annotationTypes,
  };
}

// ─── 공통: appearance stream을 페이지 콘텐츠에 병합 ──────

/** 주석의 Rect 배열 [x1, y1, x2, y2] 파싱 */
function getAnnotRect(
  annotDict: PDFDict,
  context: PDFDocument["context"],
): [number, number, number, number] | null {
  const rectObj = annotDict.get(PDFName.of("Rect"));
  if (!rectObj) return null;
  const rectArr = context.lookup(
    rectObj instanceof PDFRef ? rectObj : rectObj,
  ) as PDFArray | undefined;
  if (!rectArr || rectArr.size() < 4) return null;

  const nums: number[] = [];
  for (let i = 0; i < 4; i++) {
    const val = rectArr.get(i);
    const n = (val as { numberValue?: number }).numberValue;
    if (typeof n !== "number") return null;
    nums.push(n);
  }
  return nums as unknown as [number, number, number, number];
}

/** appearance stream의 BBox [x1, y1, x2, y2] 파싱 */
function getStreamBBox(
  stream: PDFDict | PDFStream,
  context: PDFDocument["context"],
): [number, number, number, number] | null {
  const dict = stream instanceof PDFStream ? stream.dict : stream;
  const bboxObj = dict.get(PDFName.of("BBox"));
  if (!bboxObj) return null;
  const bboxArr = context.lookup(
    bboxObj instanceof PDFRef ? bboxObj : bboxObj,
  ) as PDFArray | undefined;
  if (!bboxArr || bboxArr.size() < 4) return null;

  const nums: number[] = [];
  for (let i = 0; i < 4; i++) {
    const val = bboxArr.get(i);
    const n = (val as { numberValue?: number }).numberValue;
    if (typeof n !== "number") return null;
    nums.push(n);
  }
  return nums as unknown as [number, number, number, number];
}

/** 주석의 Normal appearance stream ref를 가져온다 */
function getNormalAppearanceRef(
  annotDict: PDFDict,
  context: PDFDocument["context"],
): PDFRef | null {
  const ap = annotDict.get(PDFName.of("AP"));
  if (!ap) return null;

  const apDict = context.lookup(
    ap instanceof PDFRef ? ap : ap,
  ) as PDFDict | undefined;
  if (!apDict || typeof apDict.get !== "function") return null;

  const n = apDict.get(PDFName.of("N"));
  if (!n) return null;

  // N은 직접 스트림 Ref이거나 상태별 딕셔너리일 수 있음
  if (n instanceof PDFRef) return n;

  // 딕셔너리인 경우 현재 appearance state(AS)에 해당하는 항목 사용
  const nDict = context.lookup(n) as PDFDict | undefined;
  if (nDict && typeof nDict.get === "function") {
    const as = annotDict.get(PDFName.of("AS"));
    if (as instanceof PDFName) {
      const stateStream = nDict.get(as);
      if (stateStream instanceof PDFRef) return stateStream;
    }
    // AS가 없으면 첫 번째 항목 사용
    const entries = nDict.entries();
    if (entries.length > 0) {
      const first = entries[0][1];
      if (first instanceof PDFRef) return first;
    }
  }

  return null;
}

/**
 * appearance stream을 페이지 XObject로 등록하고 콘텐츠 스트림에 그리기 명령 추가.
 * BBox→Rect 매핑 변환 행렬을 계산하여 정확한 위치에 렌더링한다.
 */
function embedAppearanceInPage(
  page: PDFPage,
  apRef: PDFRef,
  rect: [number, number, number, number],
  context: PDFDocument["context"],
): boolean {
  // appearance stream 확인
  const apStream = context.lookup(apRef);
  if (!apStream) return false;

  // XObject로 페이지 Resources에 등록
  const xObjName = page.node.newXObject("Flat", apRef);

  // BBox 파싱 → Rect에 매핑하는 변환 행렬 계산
  const [rx1, ry1, rx2, ry2] = rect;
  const rectW = Math.abs(rx2 - rx1);
  const rectH = Math.abs(ry2 - ry1);

  let sx = 1,
    sy = 1,
    tx = Math.min(rx1, rx2),
    ty = Math.min(ry1, ry2);

  const bbox = getStreamBBox(
    apStream as PDFDict | PDFStream,
    context,
  );
  if (bbox) {
    const [bx1, by1, bx2, by2] = bbox;
    const bboxW = Math.abs(bx2 - bx1);
    const bboxH = Math.abs(by2 - by1);
    if (bboxW > 0) sx = rectW / bboxW;
    if (bboxH > 0) sy = rectH / bboxH;
    tx = Math.min(rx1, rx2) - Math.min(bx1, bx2) * sx;
    ty = Math.min(ry1, ry2) - Math.min(by1, by2) * sy;
  }

  // q sx 0 0 sy tx ty cm /XObjName Do Q
  const operators = [
    pushGraphicsState(),
    concatTransformationMatrix(sx, 0, 0, sy, tx, ty),
    drawObject(xObjName.toString().slice(1)), // "/Flat_0" → "Flat_0"
    popGraphicsState(),
  ];

  const contentStream = PDFContentStream.of(context.obj({}), operators);
  const contentStreamRef = context.register(contentStream);
  page.node.addContentStream(contentStreamRef);

  return true;
}

// ─── 폼 필드 평탄화 ───────────────────────────────────

function flattenFormFields(doc: PDFDocument): number {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return 0;

  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return 0;

  const acroForm = catalog.get(PDFName.of("AcroForm"));
  if (!acroForm) return 0;

  let flattenedCount = 0;

  for (const page of doc.getPages()) {
    const annots = page.node.get(PDFName.of("Annots"));
    if (!annots) continue;

    const annotsArr = context.lookup(
      annots instanceof PDFRef ? annots : annots,
    ) as PDFArray | undefined;
    if (!annotsArr) continue;

    const keepAnnots: (PDFRef | PDFDict)[] = [];

    for (let i = 0; i < annotsArr.size(); i++) {
      const annotRef = annotsArr.get(i);
      const annotDict = context.lookup(
        annotRef instanceof PDFRef ? annotRef : annotRef,
      ) as PDFDict | undefined;
      if (!annotDict || typeof annotDict.get !== "function") {
        keepAnnots.push(annotRef as PDFRef);
        continue;
      }

      const subtype = annotDict.get(PDFName.of("Subtype"));
      if (subtype !== PDFName.of("Widget")) {
        keepAnnots.push(annotRef as PDFRef);
        continue;
      }

      // Widget의 appearance stream을 페이지 콘텐츠에 병합
      const apRef = getNormalAppearanceRef(annotDict, context);
      const rect = getAnnotRect(annotDict, context);

      if (apRef && rect) {
        embedAppearanceInPage(page, apRef, rect, context);
      }

      flattenedCount++;
      // Widget은 keepAnnots에 추가하지 않음 → 제거됨
    }

    // Annots 업데이트
    if (keepAnnots.length === 0) {
      page.node.delete(PDFName.of("Annots"));
    } else if (keepAnnots.length < annotsArr.size()) {
      const newArr = context.obj(keepAnnots);
      page.node.set(PDFName.of("Annots"), newArr);
    }
  }

  // AcroForm 제거
  catalog.delete(PDFName.of("AcroForm"));

  return flattenedCount;
}

// ─── 주석 평탄화 ──────────────────────────────────────

function flattenAnnotations(doc: PDFDocument): number {
  const context = doc.context;
  let removedCount = 0;

  for (const page of doc.getPages()) {
    const annots = page.node.get(PDFName.of("Annots"));
    if (!annots) continue;

    const annotsArr = context.lookup(
      annots instanceof PDFRef ? annots : annots,
    ) as PDFArray | undefined;
    if (!annotsArr) continue;

    const keepAnnots: (PDFRef | PDFDict)[] = [];

    for (let i = 0; i < annotsArr.size(); i++) {
      const annotRef = annotsArr.get(i);
      const annotDict = context.lookup(
        annotRef instanceof PDFRef ? annotRef : annotRef,
      ) as PDFDict | undefined;
      if (!annotDict || typeof annotDict.get !== "function") {
        keepAnnots.push(annotRef as PDFRef);
        continue;
      }

      const subtype = annotDict.get(PDFName.of("Subtype"));
      const typeName = subtype?.toString().replace("/", "") ?? "";

      // Widget(폼 필드)와 Link(하이퍼링크)는 보존
      if (typeName === "Widget" || typeName === "Link") {
        keepAnnots.push(annotRef as PDFRef);
        continue;
      }

      // appearance stream이 있으면 페이지에 병합
      const apRef = getNormalAppearanceRef(annotDict, context);
      const rect = getAnnotRect(annotDict, context);

      if (apRef && rect) {
        embedAppearanceInPage(page, apRef, rect, context);
      }
      // appearance stream이 없는 주석(Popup 등)은 시각적 콘텐츠가 없으므로 그냥 제거

      removedCount++;
    }

    if (keepAnnots.length === 0) {
      page.node.delete(PDFName.of("Annots"));
    } else if (keepAnnots.length < annotsArr.size()) {
      const newArr = context.obj(keepAnnots);
      page.node.set(PDFName.of("Annots"), newArr);
    }
  }

  return removedCount;
}

// ─── 메인 프로세서 ────────────────────────────────────

const flattenPdf: ProcessorFn = async (files, options, onProgress) => {
  const flattenForms = (options.formFields as boolean) ?? true;
  const flattenAnnots = (options.annotations as boolean) ?? true;

  const file = files[0];
  const srcBytes = await file.arrayBuffer();
  onProgress(10);

  const doc = await PDFDocument.load(srcBytes);
  onProgress(30);

  // 폼 필드의 appearance stream이 아직 생성되지 않은 경우를 대비해
  // updateFieldAppearances 호출 (이미 있으면 무시됨)
  try {
    const form = doc.getForm();
    form.updateFieldAppearances();
  } catch {
    // 폼이 없거나 에러 시 무시
  }

  let formsFlattened = 0;
  let annotsFlattened = 0;

  if (flattenForms) {
    formsFlattened = flattenFormFields(doc);
  }
  onProgress(50);

  if (flattenAnnots) {
    annotsFlattened = flattenAnnotations(doc);
  }
  onProgress(70);

  const pdfBytes = await doc.save({ useObjectStreams: true });
  onProgress(90);

  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  const baseName = file.name.replace(/\.pdf$/i, "");
  onProgress(100);

  return {
    blob,
    filename: `${baseName}_flattened.pdf`,
    size: blob.size,
    pageCount: doc.getPageCount(),
  } satisfies ProcessingResult;
};

export default flattenPdf;
