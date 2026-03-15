import { describe, it, expect } from "vitest";
import { PDFDocument, PDFName, PDFArray, PDFDict, PDFRef, PDFString, PDFStream, rgb, StandardFonts } from "pdf-lib";
import flattenPdf, { analyzePdf } from "../flatten";
import {
  loadFixture,
  createMarkedPdf,
  resultToPdf,
  getPageSizes,
  createProgressTracker,
} from "./helpers";

// ─── 헬퍼: 폼 필드가 있는 테스트 PDF 생성 ──────────────

async function createPdfWithFormFields(fieldCount = 3): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([595, 842]);

  page.drawText("Form Fields Test", { x: 50, y: 780, size: 18, font });

  const form = doc.getForm();

  for (let i = 0; i < fieldCount; i++) {
    const field = form.createTextField(`field_${i}`);
    field.setText(`Value ${i + 1}`);
    field.addToPage(page, {
      x: 50,
      y: 700 - i * 50,
      width: 200,
      height: 25,
    });
  }

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "form-fields.pdf", { type: "application/pdf" });
}

// ─── 헬퍼: 주석이 있는 테스트 PDF 생성 ──────────────────

async function createPdfWithAnnotations(annotCount = 3): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([595, 842]);

  page.drawText("Annotations Test", { x: 50, y: 780, size: 18, font });

  const context = doc.context;
  const annots: PDFRef[] = [];

  for (let i = 0; i < annotCount; i++) {
    const annotDict = context.obj({
      Type: PDFName.of("Annot"),
      Subtype: PDFName.of("FreeText"),
      Rect: [50, 700 - i * 60, 300, 740 - i * 60],
      Contents: PDFString.of(`Annotation ${i + 1}`),
      DA: PDFString.of("/Helv 12 Tf 0 0 1 rg"),
    });
    annots.push(context.register(annotDict));
  }

  const annotsArray = context.obj(annots);
  page.node.set(PDFName.of("Annots"), annotsArray);

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "annotations.pdf", { type: "application/pdf" });
}

// ─── 헬퍼: 폼 필드 + 주석 모두 있는 PDF ─────────────────

async function createPdfWithBoth(): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);

  // 페이지 1: 폼 필드
  const page1 = doc.addPage([595, 842]);
  page1.drawText("Page 1 — Form Fields", { x: 50, y: 780, size: 18, font });

  const form = doc.getForm();
  const nameField = form.createTextField("name");
  nameField.setText("John Doe");
  nameField.addToPage(page1, { x: 50, y: 700, width: 200, height: 25 });

  const emailField = form.createTextField("email");
  emailField.setText("john@test.com");
  emailField.addToPage(page1, { x: 50, y: 650, width: 200, height: 25 });

  // 페이지 2: 주석
  const page2 = doc.addPage([595, 842]);
  page2.drawText("Page 2 — Annotations", { x: 50, y: 780, size: 18, font });

  const context = doc.context;
  const textAnnot = context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("Text"),
    Rect: [100, 640, 120, 660],
    Contents: PDFString.of("Sticky note"),
    Name: PDFName.of("Comment"),
    C: [1, 1, 0],
  });
  const textAnnotRef = context.register(textAnnot);

  const highlightAnnot = context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("Highlight"),
    Rect: [50, 715, 450, 730],
    Contents: PDFString.of("Highlighted"),
    C: [1, 1, 0],
    QuadPoints: [50, 730, 450, 730, 50, 715, 450, 715],
  });
  const highlightAnnotRef = context.register(highlightAnnot);

  page2.node.set(
    PDFName.of("Annots"),
    context.obj([textAnnotRef, highlightAnnotRef]),
  );

  // 페이지 3: 일반 콘텐츠
  const page3 = doc.addPage([595, 842]);
  page3.drawText("Page 3 — Plain", { x: 50, y: 780, size: 18, font });

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "both.pdf", { type: "application/pdf" });
}

// ─── 헬퍼: 깨끗한 PDF (폼/주석 없음) ────────────────────

async function createCleanPdf(pageCount = 1): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 0; i < pageCount; i++) {
    const page = doc.addPage([595, 842]);
    page.drawText(`Clean page ${i + 1}`, { x: 50, y: 780, size: 18, font });
  }

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "clean.pdf", { type: "application/pdf" });
}

// ─── 헬퍼: 결과 PDF에서 AcroForm 존재 여부 확인 ──────────

function hasAcroForm(doc: PDFDocument): boolean {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return false;
  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return false;
  return !!catalog.get(PDFName.of("AcroForm"));
}

// ─── 헬퍼: 결과 PDF에서 Widget 주석 수 확인 ─────────────

function countWidgets(doc: PDFDocument): number {
  const context = doc.context;
  let count = 0;
  for (const page of doc.getPages()) {
    const annots = page.node.get(PDFName.of("Annots"));
    if (!annots) continue;
    const annotsArr = context.lookup(
      annots instanceof PDFRef ? annots : annots,
    ) as PDFArray | undefined;
    if (!annotsArr) continue;
    for (let i = 0; i < annotsArr.size(); i++) {
      const ref = annotsArr.get(i);
      const dict = context.lookup(
        ref instanceof PDFRef ? ref : ref,
      ) as PDFDict | undefined;
      if (!dict || typeof dict.get !== "function") continue;
      const sub = dict.get(PDFName.of("Subtype"));
      if (sub === PDFName.of("Widget")) count++;
    }
  }
  return count;
}

// ─── 헬퍼: 결과 PDF에서 비-Widget/비-Link 주석 수 확인 ───

function countNonWidgetAnnotations(doc: PDFDocument): number {
  const context = doc.context;
  let count = 0;
  for (const page of doc.getPages()) {
    const annots = page.node.get(PDFName.of("Annots"));
    if (!annots) continue;
    const annotsArr = context.lookup(
      annots instanceof PDFRef ? annots : annots,
    ) as PDFArray | undefined;
    if (!annotsArr) continue;
    for (let i = 0; i < annotsArr.size(); i++) {
      const ref = annotsArr.get(i);
      const dict = context.lookup(
        ref instanceof PDFRef ? ref : ref,
      ) as PDFDict | undefined;
      if (!dict || typeof dict.get !== "function") continue;
      const sub = dict.get(PDFName.of("Subtype"));
      const name = sub?.toString().replace("/", "") ?? "";
      if (name !== "Widget" && name !== "Link") count++;
    }
  }
  return count;
}

// ─── 헬퍼: 페이지 Resources의 XObject 개수 확인 ──────────

function countXObjects(doc: PDFDocument, pageIndex: number): number {
  const context = doc.context;
  const page = doc.getPage(pageIndex);
  const resources = page.node.get(PDFName.of("Resources"));
  if (!resources) return 0;
  const resDict = context.lookup(
    resources instanceof PDFRef ? resources : resources,
  ) as PDFDict | undefined;
  if (!resDict || typeof resDict.get !== "function") return 0;
  const xobj = resDict.get(PDFName.of("XObject"));
  if (!xobj) return 0;
  const xobjDict = context.lookup(
    xobj instanceof PDFRef ? xobj : xobj,
  ) as PDFDict | undefined;
  if (!xobjDict || typeof xobjDict.entries !== "function") return 0;
  return xobjDict.entries().length;
}

// ═══════════════════════════════════════════════════════════
// 테스트
// ═══════════════════════════════════════════════════════════

describe("flatten — analyzePdf", () => {
  it("폼 필드가 있는 PDF를 정확히 분석한다", async () => {
    const file = await createPdfWithFormFields(3);
    const analysis = await analyzePdf(file);

    expect(analysis.hasFormFields).toBe(true);
    expect(analysis.formFieldCount).toBe(3);
  });

  it("주석이 있는 PDF를 정확히 분석한다", async () => {
    const file = await createPdfWithAnnotations(2);
    const analysis = await analyzePdf(file);

    expect(analysis.hasAnnotations).toBe(true);
    expect(analysis.annotationCount).toBe(2);
    expect(analysis.annotationTypes["FreeText"]).toBe(2);
  });

  it("폼 + 주석 모두 있는 PDF 분석", async () => {
    const file = await createPdfWithBoth();
    const analysis = await analyzePdf(file);

    expect(analysis.hasFormFields).toBe(true);
    expect(analysis.formFieldCount).toBe(2);
    expect(analysis.hasAnnotations).toBe(true);
    expect(analysis.annotationCount).toBe(2);
    expect(analysis.annotationTypes["Text"]).toBe(1);
    expect(analysis.annotationTypes["Highlight"]).toBe(1);
  });

  it("깨끗한 PDF (폼/주석 없음) 분석", async () => {
    const file = await createCleanPdf();
    const analysis = await analyzePdf(file);

    expect(analysis.hasFormFields).toBe(false);
    expect(analysis.formFieldCount).toBe(0);
    expect(analysis.hasAnnotations).toBe(false);
    expect(analysis.annotationCount).toBe(0);
    expect(Object.keys(analysis.annotationTypes)).toHaveLength(0);
  });
});

describe("flatten — 기본 동작", () => {
  it("폼 필드가 있는 PDF를 평탄화하면 AcroForm이 제거된다", async () => {
    const file = await createPdfWithFormFields(3);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);

    // AcroForm 제거 확인
    expect(hasAcroForm(pdf)).toBe(false);

    // Widget 주석 제거 확인
    expect(countWidgets(pdf)).toBe(0);
  });

  it("폼 필드 평탄화 후 appearance가 페이지 콘텐츠에 병합된다 (XObject 존재)", async () => {
    const file = await createPdfWithFormFields(3);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: false },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);

    // 페이지 0에 XObject가 추가되었는지 확인
    // 폼 필드 3개의 appearance stream이 XObject로 등록되어야 함
    const xobjCount = countXObjects(pdf, 0);
    expect(xobjCount).toBeGreaterThanOrEqual(3);
  });

  it("주석 평탄화 후 비-Widget 주석이 제거된다", async () => {
    const file = await createPdfWithAnnotations(3);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: false, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(countNonWidgetAnnotations(pdf)).toBe(0);
  });

  it("폼 + 주석 모두 평탄화", async () => {
    const file = await createPdfWithBoth();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);

    expect(hasAcroForm(pdf)).toBe(false);
    expect(countWidgets(pdf)).toBe(0);
    expect(countNonWidgetAnnotations(pdf)).toBe(0);

    // 페이지 수 보존
    expect(pdf.getPageCount()).toBe(3);
  });
});

describe("flatten — 옵션 조합", () => {
  it("formFields만 true: 폼만 평탄화, 주석은 보존", async () => {
    const file = await createPdfWithBoth();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: false },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);

    // 폼 제거됨
    expect(hasAcroForm(pdf)).toBe(false);
    expect(countWidgets(pdf)).toBe(0);

    // 주석은 보존됨
    expect(countNonWidgetAnnotations(pdf)).toBe(2);
  });

  it("annotations만 true: 주석만 평탄화, 폼은 보존", async () => {
    const file = await createPdfWithBoth();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: false, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);

    // 폼 보존됨
    expect(hasAcroForm(pdf)).toBe(true);
    expect(countWidgets(pdf)).toBeGreaterThan(0);

    // 주석 제거됨
    expect(countNonWidgetAnnotations(pdf)).toBe(0);
  });

  it("둘 다 false: 아무것도 변경하지 않음", async () => {
    const file = await createPdfWithBoth();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: false, annotations: false },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);

    expect(hasAcroForm(pdf)).toBe(true);
    expect(countWidgets(pdf)).toBeGreaterThan(0);
    expect(countNonWidgetAnnotations(pdf)).toBe(2);
  });
});

describe("flatten — 엣지 케이스", () => {
  it("폼/주석 없는 깨끗한 PDF → 에러 없이 통과", async () => {
    const file = await createCleanPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });

  it("1페이지 PDF 평탄화", async () => {
    const file = await createPdfWithFormFields(1);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
    expect(hasAcroForm(pdf)).toBe(false);
  });

  it("체크박스 포함 PDF 평탄화", async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]);

    const form = doc.getForm();
    const checkbox = form.createCheckBox("agree");
    checkbox.check();
    checkbox.addToPage(page, { x: 50, y: 700, width: 15, height: 15 });

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const file = new File([blob], "checkbox.pdf", { type: "application/pdf" });

    const { onProgress } = createProgressTracker();
    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(hasAcroForm(pdf)).toBe(false);
    expect(countWidgets(pdf)).toBe(0);
    // 체크박스 appearance가 XObject로 임베딩됨
    expect(countXObjects(pdf, 0)).toBeGreaterThanOrEqual(1);
  });

  it("드롭다운 포함 PDF 평탄화", async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]);

    const form = doc.getForm();
    const dropdown = form.createDropdown("priority");
    dropdown.addOptions(["Low", "Medium", "High"]);
    dropdown.select("Medium");
    dropdown.addToPage(page, { x: 50, y: 700, width: 150, height: 25 });

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const file = new File([blob], "dropdown.pdf", { type: "application/pdf" });

    const { onProgress } = createProgressTracker();
    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(hasAcroForm(pdf)).toBe(false);
    expect(countWidgets(pdf)).toBe(0);
  });

  it("Link 주석은 평탄화 시에도 보존된다", async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const page = doc.addPage([595, 842]);
    page.drawText("Click here", { x: 50, y: 700, size: 14, font });

    const context = doc.context;
    const linkAnnot = context.obj({
      Type: PDFName.of("Annot"),
      Subtype: PDFName.of("Link"),
      Rect: [50, 690, 150, 720],
    });
    const linkRef = context.register(linkAnnot);

    const textAnnot = context.obj({
      Type: PDFName.of("Annot"),
      Subtype: PDFName.of("Text"),
      Rect: [200, 690, 220, 710],
      Contents: PDFString.of("Note"),
    });
    const textRef = context.register(textAnnot);

    page.node.set(PDFName.of("Annots"), context.obj([linkRef, textRef]));

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const file = new File([blob], "link.pdf", { type: "application/pdf" });

    const { onProgress } = createProgressTracker();
    const result = await flattenPdf(
      [file],
      { formFields: false, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);

    // Link 보존 확인
    const ctx = pdf.context;
    let linkCount = 0;
    for (const p of pdf.getPages()) {
      const annots = p.node.get(PDFName.of("Annots"));
      if (!annots) continue;
      const arr = ctx.lookup(
        annots instanceof PDFRef ? annots : annots,
      ) as PDFArray | undefined;
      if (!arr) continue;
      for (let i = 0; i < arr.size(); i++) {
        const ref = arr.get(i);
        const dict = ctx.lookup(
          ref instanceof PDFRef ? ref : ref,
        ) as PDFDict | undefined;
        if (!dict) continue;
        const sub = dict.get(PDFName.of("Subtype"));
        if (sub === PDFName.of("Link")) linkCount++;
      }
    }
    expect(linkCount).toBe(1);

    // Text 주석은 제거됨
    expect(countNonWidgetAnnotations(pdf)).toBe(0);
  });
});

describe("flatten — 출력 포맷", () => {
  it("파일명이 _flattened.pdf로 끝난다", async () => {
    const file = await createCleanPdf();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    expect(result.filename).toBe("clean_flattened.pdf");
  });

  it("blob 타입이 application/pdf이다", async () => {
    const file = await createCleanPdf();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    expect(result.blob.type).toBe("application/pdf");
  });

  it("size가 blob.size와 일치한다", async () => {
    const file = await createCleanPdf();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    expect(result.size).toBe(result.blob.size);
  });

  it("pageCount가 원본과 같다", async () => {
    const file = await createPdfWithBoth(); // 3페이지
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    expect(result.pageCount).toBe(3);
  });

  it("페이지 크기가 보존된다", async () => {
    const file = await createPdfWithFormFields(1);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0]).toEqual({ width: 595, height: 842 });
  });
});

describe("flatten — progress 콜백", () => {
  it("progress가 10, 30, 50, 70, 90, 100 순서로 호출된다", async () => {
    const file = await createPdfWithBoth();
    const { values, onProgress } = createProgressTracker();

    await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    expect(values).toEqual([10, 30, 50, 70, 90, 100]);
  });

  it("progress가 단조 증가한다", async () => {
    const file = await createCleanPdf();
    const { values, onProgress } = createProgressTracker();

    await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
    expect(values[values.length - 1]).toBe(100);
  });
});

describe("flatten — 콘텐츠 병합 검증 (핵심)", () => {
  it("텍스트 폼 필드의 appearance stream이 XObject로 페이지에 임베딩된다", async () => {
    const file = await createPdfWithFormFields(2);

    // 평탄화 전: XObject 개수 확인
    const beforePdf = await PDFDocument.load(await file.arrayBuffer());
    const xobjBefore = countXObjects(beforePdf, 0);

    const { onProgress } = createProgressTracker();
    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: false },
      onProgress,
    );

    const afterPdf = await resultToPdf(result.blob);
    const xobjAfter = countXObjects(afterPdf, 0);

    // 평탄화 후 XObject 개수가 증가해야 함 (appearance stream이 추가되었으므로)
    expect(xobjAfter).toBeGreaterThan(xobjBefore);
  });

  it("결과 PDF를 다시 분석하면 폼 필드가 0개이다", async () => {
    const file = await createPdfWithFormFields(5);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    // 결과를 File로 변환해서 다시 분석
    const resultFile = new File([result.blob], "result.pdf", {
      type: "application/pdf",
    });
    const analysis = await analyzePdf(resultFile);

    expect(analysis.hasFormFields).toBe(false);
    expect(analysis.formFieldCount).toBe(0);
  });

  it("결과 PDF를 다시 분석하면 주석이 0개이다", async () => {
    const file = await createPdfWithAnnotations(4);
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const resultFile = new File([result.blob], "result.pdf", {
      type: "application/pdf",
    });
    const analysis = await analyzePdf(resultFile);

    expect(analysis.hasAnnotations).toBe(false);
    expect(analysis.annotationCount).toBe(0);
  });

  it("평탄화 결과 PDF가 유효하고 다시 로드 가능하다", async () => {
    const file = await createPdfWithBoth();
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    // 결과 PDF를 다시 로드할 수 있어야 함 (손상되지 않았는지)
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);

    // 다시 저장도 가능해야 함
    const bytes2 = await pdf.save();
    expect(bytes2.length).toBeGreaterThan(0);
  });
});

describe("flatten — test-fixtures/flatten-test.pdf", () => {
  it("테스트 픽스처 PDF를 분석하면 폼 필드와 주석이 감지된다", async () => {
    const file = loadFixture("flatten-test.pdf");
    const analysis = await analyzePdf(file);

    expect(analysis.hasFormFields).toBe(true);
    expect(analysis.formFieldCount).toBe(5);
    expect(analysis.hasAnnotations).toBe(true);
    expect(analysis.annotationCount).toBe(3);
  });

  it("테스트 픽스처 PDF를 완전 평탄화하면 폼/주석이 모두 제거된다", async () => {
    const file = loadFixture("flatten-test.pdf");
    const { onProgress } = createProgressTracker();

    const result = await flattenPdf(
      [file],
      { formFields: true, annotations: true },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(hasAcroForm(pdf)).toBe(false);
    expect(countWidgets(pdf)).toBe(0);
    expect(countNonWidgetAnnotations(pdf)).toBe(0);
    expect(pdf.getPageCount()).toBe(3);
  });
});
