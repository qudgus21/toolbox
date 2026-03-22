import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import resizePdf from "../resize";
import { PAGE_SIZES } from "../resize";
import {
  createMarkedPdf,
  resultToPdf,
  extractZipPdfs,
  extractZipFilenames,
  getPageSizes,
  createProgressTracker,
} from "./helpers";

const MM_TO_PT = 72 / 25.4;
const IN_TO_PT = 72;

/** 지정 페이지 수의 A4 세로 PDF를 생성 */
async function createTestPdf(pages: number, name = "test.pdf"): Promise<File> {
  return createMarkedPdf(pages);
}

/** 콘텐츠가 있는 PDF 페이지를 생성하는 헬퍼 (embedPage가 Contents 필요) */
async function createPdfWithContent(
  pages: [number, number][],
  name: string,
): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont("Helvetica" as never);
  for (let i = 0; i < pages.length; i++) {
    const [w, h] = pages[i];
    const page = doc.addPage([w, h]);
    page.drawText(`P${i + 1}`, { x: 10, y: h / 2, size: 12, font });
  }
  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], name, { type: "application/pdf" });
}

/** 가로(landscape) PDF 1페이지 생성 */
async function createLandscapePdf(): Promise<File> {
  return createPdfWithContent([[842, 595]], "landscape.pdf");
}

/** 혼합 크기 PDF 생성 (5페이지, 각기 다른 크기) */
async function createMixedSizePdf(): Promise<File> {
  return createPdfWithContent(
    [[595, 842], [612, 792], [842, 595], [419, 595], [792, 1224]],
    "mixed.pdf",
  );
}

describe("resize 프로세서", () => {
  describe("기본 동작", () => {
    it("기본 옵션(A4, fit)으로 단일 파일을 리사이즈한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf([file], {}, onProgress);

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.filename).toContain("_resized.pdf");
      expect(result.pageCount).toBe(1);
      expect(result.size).toBeGreaterThan(0);

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.a4.width, 0);
      expect(sizes[0].height).toBeCloseTo(PAGE_SIZES.a4.height, 0);
    });

    it("다중 페이지 PDF의 모든 페이지를 리사이즈한다", async () => {
      const file = await createMarkedPdf(10);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf([file], { preset: "letter" }, onProgress);

      const pdf = await resultToPdf(result.blob);
      expect(pdf.getPageCount()).toBe(10);
      const sizes = getPageSizes(pdf);
      for (const size of sizes) {
        expect(size.width).toBeCloseTo(PAGE_SIZES.letter.width, 0);
        expect(size.height).toBeCloseTo(PAGE_SIZES.letter.height, 0);
      }
    });

    it("빈 파일 배열이면 에러를 던진다", async () => {
      const { onProgress } = createProgressTracker();
      await expect(resizePdf([], {}, onProgress)).rejects.toThrow("No file provided");
    });
  });

  describe("프리셋 크기", () => {
    const presets = Object.keys(PAGE_SIZES) as (keyof typeof PAGE_SIZES)[];

    for (const preset of presets) {
      it(`${PAGE_SIZES[preset].label} 프리셋으로 리사이즈한다`, async () => {
        const file = await createMarkedPdf(1);
        const { onProgress } = createProgressTracker();

        const result = await resizePdf([file], { preset }, onProgress);
        const pdf = await resultToPdf(result.blob);
        const sizes = getPageSizes(pdf);

        expect(sizes[0].width).toBeCloseTo(PAGE_SIZES[preset].width, 0);
        expect(sizes[0].height).toBeCloseTo(PAGE_SIZES[preset].height, 0);
      });
    }
  });

  describe("커스텀 크기", () => {
    it("mm 단위 커스텀 크기를 적용한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "custom", customWidth: 100, customHeight: 200, unit: "mm" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(100 * MM_TO_PT, 0);
      expect(sizes[0].height).toBeCloseTo(200 * MM_TO_PT, 0);
    });

    it("인치 단위 커스텀 크기를 적용한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "custom", customWidth: 5, customHeight: 8, unit: "in" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(5 * IN_TO_PT, 0);
      expect(sizes[0].height).toBeCloseTo(8 * IN_TO_PT, 0);
    });

    it("커스텀 크기 생략 시 기본값(210×297mm)을 사용한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "custom" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(210 * MM_TO_PT, 0);
      expect(sizes[0].height).toBeCloseTo(297 * MM_TO_PT, 0);
    });
  });

  describe("방향 (orientation)", () => {
    it("landscape 방향으로 A4를 설정하면 가로가 세로보다 크다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "a4", orientation: "landscape" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.a4.height, 0);
      expect(sizes[0].height).toBeCloseTo(PAGE_SIZES.a4.width, 0);
      expect(sizes[0].width).toBeGreaterThan(sizes[0].height);
    });

    it("portrait 방향이면 세로가 가로보다 크다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "a4", orientation: "portrait" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].height).toBeGreaterThan(sizes[0].width);
    });

    it("Ledger에 portrait를 적용하면 h > w", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "ledger", orientation: "portrait" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].height).toBeGreaterThan(sizes[0].width);
    });
  });

  describe("콘텐츠 스케일링 모드", () => {
    it("fit 모드: 결과 페이지 크기가 타겟과 일치한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "letter", scaleMode: "fit" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.letter.width, 0);
      expect(sizes[0].height).toBeCloseTo(PAGE_SIZES.letter.height, 0);
    });

    it("fill 모드: 결과 페이지 크기가 타겟과 일치한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "a3", scaleMode: "fill" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.a3.width, 0);
      expect(sizes[0].height).toBeCloseTo(PAGE_SIZES.a3.height, 0);
    });

    it("stretch 모드: 결과 페이지 크기가 타겟과 일치한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "a5", scaleMode: "stretch" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.a5.width, 0);
      expect(sizes[0].height).toBeCloseTo(PAGE_SIZES.a5.height, 0);
    });

    it("center 모드: 결과 페이지 크기가 타겟과 일치한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "a3", scaleMode: "center" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.a3.width, 0);
      expect(sizes[0].height).toBeCloseTo(PAGE_SIZES.a3.height, 0);
    });

    it("scaleMode 생략 시 기본값 fit이 사용된다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const resultDefault = await resizePdf(
        [file],
        { preset: "letter" },
        onProgress,
      );
      const resultFit = await resizePdf(
        [file],
        { preset: "letter", scaleMode: "fit" },
        onProgress,
      );

      expect(resultDefault.size).toBe(resultFit.size);
    });

    it("다른 scaleMode는 서로 다른 결과를 만든다", async () => {
      const file = await createLandscapePdf();
      const { onProgress } = createProgressTracker();

      const resultFit = await resizePdf([file], { preset: "a4", scaleMode: "fit" }, onProgress);
      const resultFill = await resizePdf([file], { preset: "a4", scaleMode: "fill" }, onProgress);
      const resultStretch = await resizePdf([file], { preset: "a4", scaleMode: "stretch" }, onProgress);
      const resultCenter = await resizePdf([file], { preset: "a4", scaleMode: "center" }, onProgress);

      // 모든 모드의 결과 파일 크기가 서로 다르거나 적어도 일부 다름
      const sizes = [resultFit.size, resultFill.size, resultStretch.size, resultCenter.size];
      const uniqueSizes = new Set(sizes);
      expect(uniqueSizes.size).toBeGreaterThan(1);
    });
  });

  describe("마진", () => {
    it("마진 적용 시 페이지 크기는 동일하고 파일 크기가 달라진다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const resultNoMargin = await resizePdf(
        [file],
        { preset: "a4", scaleMode: "fit" },
        onProgress,
      );
      const resultWithMargin = await resizePdf(
        [file],
        {
          preset: "a4",
          scaleMode: "fit",
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
          unit: "mm",
        },
        onProgress,
      );

      const pdfNoM = await resultToPdf(resultNoMargin.blob);
      const pdfWithM = await resultToPdf(resultWithMargin.blob);

      // 페이지 크기 자체는 동일하게 A4
      const sizesNoM = getPageSizes(pdfNoM);
      const sizesWithM = getPageSizes(pdfWithM);
      expect(sizesNoM[0].width).toBeCloseTo(sizesWithM[0].width, 0);
      expect(sizesNoM[0].height).toBeCloseTo(sizesWithM[0].height, 0);

      // 마진이 있으면 콘텐츠가 다르게 배치되므로 파일 크기가 달라야 함
      expect(resultNoMargin.size).not.toBe(resultWithMargin.size);
    });

    it("인치 단위 마진이 적용된다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        {
          preset: "letter",
          marginTop: 1,
          marginBottom: 1,
          marginLeft: 1,
          marginRight: 1,
          unit: "in",
        },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      expect(pdf.getPageCount()).toBe(1);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.letter.width, 0);
    });

    it("마진 0이면 마진 없는 결과와 동일하다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result1 = await resizePdf(
        [file],
        { preset: "a4", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 },
        onProgress,
      );
      const result2 = await resizePdf(
        [file],
        { preset: "a4" },
        onProgress,
      );

      expect(result1.size).toBe(result2.size);
    });
  });

  describe("다중 파일 (ZIP)", () => {
    it("2개 이상 파일이면 ZIP으로 출력한다", async () => {
      const file1 = await createMarkedPdf(1);
      const file2 = await createPdfWithContent([[595, 842]], "second.pdf");
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file1, file2],
        { preset: "letter" },
        onProgress,
      );

      expect(result.filename).toBe("resized_pdfs.zip");
      const filenames = await extractZipFilenames(result.blob);
      expect(filenames).toHaveLength(2);
    });

    it("ZIP 내 각 PDF의 페이지 크기가 올바르다", async () => {
      const file1 = await createMarkedPdf(1);
      const file2 = await createMarkedPdf(3);
      const file2r = new File([file2], "multi.pdf", { type: "application/pdf" });
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file1, file2r],
        { preset: "a5" },
        onProgress,
      );

      const pdfs = await extractZipPdfs(result.blob);
      expect(pdfs).toHaveLength(2);

      expect(pdfs[0].getPageCount()).toBe(1);
      const sizes0 = getPageSizes(pdfs[0]);
      expect(sizes0[0].width).toBeCloseTo(PAGE_SIZES.a5.width, 0);

      expect(pdfs[1].getPageCount()).toBe(3);
      const sizes1 = getPageSizes(pdfs[1]);
      for (const s of sizes1) {
        expect(s.width).toBeCloseTo(PAGE_SIZES.a5.width, 0);
        expect(s.height).toBeCloseTo(PAGE_SIZES.a5.height, 0);
      }
    });

    it("단일 파일이면 PDF로 직접 출력한다", async () => {
      const file = await createMarkedPdf(1);
      const { onProgress } = createProgressTracker();

      const result = await resizePdf([file], { preset: "a4" }, onProgress);

      expect(result.filename).toContain("_resized.pdf");
      expect(result.blob.type).toBe("application/pdf");
    });
  });

  describe("다양한 PDF 타입", () => {
    it("가로(landscape) PDF를 리사이즈한다", async () => {
      const file = await createLandscapePdf();
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "a4", scaleMode: "fit" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes[0].width).toBeCloseTo(PAGE_SIZES.a4.width, 0);
      expect(sizes[0].height).toBeCloseTo(PAGE_SIZES.a4.height, 0);
    });

    it("혼합 크기 PDF의 모든 페이지를 동일 크기로 통일한다", async () => {
      const file = await createMixedSizePdf();
      const { onProgress } = createProgressTracker();

      const result = await resizePdf(
        [file],
        { preset: "a4" },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);
      expect(sizes.length).toBe(5);
      for (const size of sizes) {
        expect(size.width).toBeCloseTo(PAGE_SIZES.a4.width, 0);
        expect(size.height).toBeCloseTo(PAGE_SIZES.a4.height, 0);
      }
    });
  });

  describe("progress 콜백", () => {
    it("progress가 0~100 범위 내에서 단조 증가한다", async () => {
      const file = await createMarkedPdf(5);
      const { values, onProgress } = createProgressTracker();

      await resizePdf([file], { preset: "a4" }, onProgress);

      expect(values.length).toBeGreaterThan(0);
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
      }
      expect(values[values.length - 1]).toBe(100);
      for (const v of values) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
    });

    it("다중 파일에서도 progress가 올바르게 동작한다", async () => {
      const file1 = await createMarkedPdf(1);
      const file2 = await createMarkedPdf(2);
      const file2R = new File([file2], "f2.pdf", { type: "application/pdf" });
      const { values, onProgress } = createProgressTracker();

      await resizePdf([file1, file2R], { preset: "a4" }, onProgress);

      expect(values[values.length - 1]).toBe(100);
    });
  });

  describe("파일명", () => {
    it("결과 파일명에 _resized 접미사가 붙는다", async () => {
      const file = await createPdfWithContent([[595, 842]], "MyDocument.PDF");
      const { onProgress } = createProgressTracker();

      const result = await resizePdf([file], {}, onProgress);
      expect(result.filename).toBe("MyDocument_resized.pdf");
    });
  });
});
