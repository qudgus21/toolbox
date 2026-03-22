import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFRef,
  type PDFDict,
} from "pdf-lib";
import pako from "pako";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";
import {
  getFilterString,
  collectImageEntries,
  recompressImageEntries,
} from "./pdf-image-utils";

// ─── 타입 ─────────────────────────────────────────────

export type WebOptimizePreset = "screen" | "email" | "quality";

export interface WebOptimizeConfig {
  /** 이미지 JPEG 재압축 품질 0~1 */
  quality: number;
  /** 이미지 최대 해상도 (px). 0이면 축소 안 함 */
  maxDimension: number;
  /** 이 면적(px²) 미만 이미지 건너뜀 */
  minImageArea: number;
}

const presetConfig: Record<WebOptimizePreset, WebOptimizeConfig> = {
  screen: { quality: 0.6, maxDimension: 1800, minImageArea: 8000 },
  email: { quality: 0.45, maxDimension: 1200, minImageArea: 5000 },
  quality: { quality: 0.8, maxDimension: 2800, minImageArea: 15000 },
};

// ─── 최적화 통계 ─────────────────────────────────────

interface OptimizationStats {
  imagesOptimized: number;
  metadataRemoved: boolean;
  jsActionsRemoved: boolean;
  formsFlattened: boolean;
  annotationsRemoved: boolean;
  streamsCompressed: number;
}

// ─── 이미지 최적화 ─────────────────────────────────────

async function optimizeImages(
  doc: PDFDocument,
  config: WebOptimizeConfig,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<number> {
  const imageEntries = collectImageEntries(doc, config.minImageArea);

  return recompressImageEntries(
    doc,
    imageEntries,
    config.quality,
    config.maxDimension,
    onProgress,
    progressBase,
    progressRange,
  );
}

// ─── 메타데이터 제거 ──────────────────────────────────

function stripMetadata(doc: PDFDocument): boolean {
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setCreator("");
  doc.setProducer("");

  // XMP 메타데이터 스트림 제거
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (root) {
    const catalog = context.lookup(root) as PDFDict | undefined;
    if (catalog && typeof catalog.get === "function") {
      catalog.delete(PDFName.of("Metadata"));
    }
  }

  return true;
}

// ─── JavaScript/액션 제거 ─────────────────────────────

function stripJsAndActions(doc: PDFDocument): boolean {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return false;
  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return false;

  // Names (JavaScript, EmbeddedFiles 등)
  catalog.delete(PDFName.of("Names"));
  // 문서 열 때 실행되는 액션
  catalog.delete(PDFName.of("OpenAction"));
  // 추가 액션
  catalog.delete(PDFName.of("AA"));

  // 각 페이지의 액션 제거
  for (const page of doc.getPages()) {
    page.node.delete(PDFName.of("AA"));
  }

  return true;
}

// ─── 폼 필드 제거 (Flatten) ──────────────────────────

function removeFormFields(doc: PDFDocument): boolean {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return false;
  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return false;

  const hasForm = catalog.get(PDFName.of("AcroForm"));
  if (hasForm) {
    catalog.delete(PDFName.of("AcroForm"));
    return true;
  }
  return false;
}

// ─── 주석(Annotations) 제거 ─────────────────────────

function removeAnnotations(doc: PDFDocument): number {
  let removed = 0;
  for (const page of doc.getPages()) {
    const annots = page.node.get(PDFName.of("Annots"));
    if (annots) {
      // Link 타입만 보존하려면 필터링 가능하지만, 웹 최적화에서는 모두 제거
      page.node.delete(PDFName.of("Annots"));
      removed++;
    }
  }
  return removed;
}

// ─── 구조 트리/태그 제거 ──────────────────────────────

function stripStructureTree(doc: PDFDocument): void {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return;
  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return;

  catalog.delete(PDFName.of("MarkInfo"));
  catalog.delete(PDFName.of("StructTreeRoot"));
}

// ─── 임베디드 썸네일 제거 ─────────────────────────────

function removeThumbnails(doc: PDFDocument): void {
  for (const page of doc.getPages()) {
    page.node.delete(PDFName.of("Thumb"));
  }
}

// ─── 미사용 스트림 재압축 ──────────────────────────────

function recompressStreams(doc: PDFDocument): number {
  const context = doc.context;
  let count = 0;

  for (const [ref, obj] of context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue;

    const dict = obj.dict;
    const subtype = dict.get(PDFName.of("Subtype"));
    // 이미지는 이미 처리됨, 스킵
    if (subtype === PDFName.of("Image")) continue;

    const filterStr = getFilterString(dict);

    // 비압축 콘텐츠 스트림 → FlateDecode 압축
    if (!filterStr) {
      const raw = obj.getContents();
      if (raw.length < 100) continue; // 너무 작으면 스킵

      try {
        const deflated = pako.deflate(raw);
        if (deflated.length < raw.length) {
          dict.set(PDFName.of("Filter"), PDFName.of("FlateDecode"));
          dict.set(PDFName.of("Length"), PDFNumber.of(deflated.length));
          context.assign(ref, PDFRawStream.of(dict, deflated));
          count++;
        }
      } catch {
        // deflate 실패 시 스킵
      }
    }
  }

  return count;
}

// ─── 단일 파일 웹 최적화 ─────────────────────────────

async function optimizeSinglePdf(
  file: File,
  preset: WebOptimizePreset,
  toggles: {
    images: boolean;
    metadata: boolean;
    jsActions: boolean;
    forms: boolean;
    annotations: boolean;
    thumbnails: boolean;
    streams: boolean;
  },
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<{ bytes: Uint8Array; pageCount: number; stats: OptimizationStats; srcBytes: ArrayBuffer }> {
  const config = presetConfig[preset];
  const srcBytes = await file.arrayBuffer();

  const srcDoc = await PDFDocument.load(srcBytes);
  const doc = await PDFDocument.create();
  const copiedPages = await doc.copyPages(srcDoc, srcDoc.getPageIndices());
  for (const page of copiedPages) doc.addPage(page);

  onProgress(progressBase + progressRange * 0.05);

  const stats: OptimizationStats = {
    imagesOptimized: 0,
    metadataRemoved: false,
    jsActionsRemoved: false,
    formsFlattened: false,
    annotationsRemoved: false,
    streamsCompressed: 0,
  };

  // 1. 이미지 최적화 (가장 시간 소요)
  if (toggles.images) {
    stats.imagesOptimized = await optimizeImages(
      doc, config, onProgress,
      progressBase + progressRange * 0.05,
      progressRange * 0.65,
    );
  } else {
    onProgress(progressBase + progressRange * 0.7);
  }

  // 2. 메타데이터 제거
  if (toggles.metadata) {
    stats.metadataRemoved = stripMetadata(doc);
  }

  onProgress(progressBase + progressRange * 0.75);

  // 3. JavaScript/액션 제거
  if (toggles.jsActions) {
    stats.jsActionsRemoved = stripJsAndActions(doc);
  }

  // 4. 폼 필드 제거
  if (toggles.forms) {
    stats.formsFlattened = removeFormFields(doc);
  }

  // 5. 주석 제거
  if (toggles.annotations) {
    const count = removeAnnotations(doc);
    stats.annotationsRemoved = count > 0;
  }

  // 6. 구조 트리 제거
  stripStructureTree(doc);

  // 7. 썸네일 제거
  if (toggles.thumbnails) {
    removeThumbnails(doc);
  }

  onProgress(progressBase + progressRange * 0.8);

  // 8. 스트림 재압축
  if (toggles.streams) {
    stats.streamsCompressed = recompressStreams(doc);
  }

  onProgress(progressBase + progressRange * 0.9);

  // Object streams 사용으로 추가 압축
  const pdfBytes = await doc.save({ useObjectStreams: true });

  onProgress(progressBase + progressRange);

  return { bytes: pdfBytes, pageCount: doc.getPageCount(), stats, srcBytes };
}

// ─── 메인 프로세서 ────────────────────────────────────

const webOptimizePdf: ProcessorFn = async (files, options, onProgress) => {
  const preset = (options.preset as WebOptimizePreset) ?? "screen";
  const toggles = {
    images: (options.images as boolean) ?? true,
    metadata: (options.metadata as boolean) ?? true,
    jsActions: (options.jsActions as boolean) ?? true,
    forms: (options.forms as boolean) ?? true,
    annotations: (options.annotations as boolean) ?? false,
    thumbnails: (options.thumbnails as boolean) ?? true,
    streams: (options.streams as boolean) ?? true,
  };

  if (files.length === 1) {
    const file = files[0];
    const originalSize = file.size;
    const { bytes, pageCount, srcBytes } = await optimizeSinglePdf(
      file, preset, toggles, onProgress, 5, 90,
    );

    // 결과가 원본보다 크면 원본 반환
    const finalBytes = bytes.length >= originalSize
      ? new Uint8Array(srcBytes)
      : bytes;

    const blob = new Blob([finalBytes as BlobPart], { type: "application/pdf" });
    const baseName = file.name.replace(/\.pdf$/i, "");
    onProgress(100);

    return {
      blob,
      filename: `${baseName}_optimized.pdf`,
      size: blob.size,
      pageCount,
    } satisfies ProcessingResult;
  }

  // 다중 파일 → 개별 최적화 후 ZIP
  const zip = new JSZip();
  let totalPageCount = 0;
  const perFile = 80 / files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const originalSize = file.size;
    const base = 5 + i * perFile;
    const { bytes, pageCount, srcBytes } = await optimizeSinglePdf(
      file, preset, toggles, onProgress, base, perFile,
    );

    const finalBytes = bytes.length >= originalSize
      ? new Uint8Array(srcBytes)
      : bytes;

    const baseName = file.name.replace(/\.pdf$/i, "");
    zip.file(`${baseName}_optimized.pdf`, finalBytes);
    totalPageCount += pageCount;
  }

  onProgress(90);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "optimized_pdfs.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default webOptimizePdf;
