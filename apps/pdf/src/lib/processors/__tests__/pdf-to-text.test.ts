import { describe, it, expect, vi } from "vitest";
import JSZip from "jszip";
import pdfToText from "../pdf-to-text";
import { createMarkedPdf, createProgressTracker } from "./helpers";

/* ═══════════════════════════════════════════════════════════
 *  PDF → Text 프로세서 — 단위 테스트
 *
 *  pdfjs-dist를 모킹하여 getTextContent 기반
 *  텍스트 추출 로직과 분기를 검증한다.
 * ═══════════════════════════════════════════════════════════ */

// ─── pdfjs-dist 모킹 ────────────────────────────────────────

vi.mock("pdfjs-dist", async () => {
  const pdfLib = await import("pdf-lib");
  return {
    GlobalWorkerOptions: { workerSrc: "" },
    getDocument: ({ data }: { data: ArrayBuffer }) => ({
      promise: pdfLib.PDFDocument.load(data).then((doc) => {
        const numPages = doc.getPageCount();
        return {
          numPages,
          getPage: async (pageNum: number) => ({
            getTextContent: async () => ({
              items: [
                {
                  str: `PAGE_${pageNum}`,
                  transform: [12, 0, 0, 12, 50, 400],
                },
                {
                  str: " sample text",
                  transform: [12, 0, 0, 12, 150, 400],
                },
                {
                  str: "second line",
                  transform: [12, 0, 0, 12, 50, 380],
                },
              ],
            }),
            getViewport: ({ scale }: { scale: number }) => ({
              width: 595 * scale,
              height: 842 * scale,
            }),
            render: () => ({ promise: Promise.resolve() }),
          }),
          destroy: () => {},
        };
      }),
    }),
  };
});

// ─── 테스트 ──────────────────────────────────────────────────

describe("pdf-to-text processor", () => {
  describe("단일 파일", () => {
    it("단일 페이지 PDF → 단일 TXT 파일 출력", async () => {
      const file = await createMarkedPdf(1);
      const tracker = createProgressTracker();

      const result = await pdfToText([file], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.txt$/);
      expect(result.blob.type).toBe("text/plain;charset=utf-8");
      expect(result.size).toBeGreaterThan(0);
      expect(result.pageCount).toBe(1);
    });

    it("텍스트 내용이 올바르게 추출됨", async () => {
      const file = await createMarkedPdf(1);
      const tracker = createProgressTracker();

      const result = await pdfToText([file], {}, tracker.onProgress);

      const text = await result.blob.text();
      expect(text).toContain("PAGE_1");
      expect(text).toContain("sample text");
      expect(text).toContain("second line");
    });

    it("다중 페이지 PDF → 페이지 구분선 포함", async () => {
      const file = await createMarkedPdf(3);
      const tracker = createProgressTracker();

      const result = await pdfToText([file], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.txt$/);
      expect(result.pageCount).toBe(3);

      const text = await result.blob.text();
      expect(text).toContain("PAGE_1");
      expect(text).toContain("PAGE_2");
      expect(text).toContain("PAGE_3");
      // Page breaks
      expect(text).toContain("--- Page Break ---");
    });
  });

  describe("다중 파일", () => {
    it("여러 PDF 파일 → ZIP 파일 출력", async () => {
      const file1 = await createMarkedPdf(2);
      const file2 = await createMarkedPdf(1);
      const tracker = createProgressTracker();

      const result = await pdfToText([file1, file2], {}, tracker.onProgress);

      expect(result.filename).toBe("pdf_to_text.zip");
      expect(result.pageCount).toBe(3);

      const ab = await result.blob.arrayBuffer();
      const zip = await JSZip.loadAsync(ab);
      const txtFiles = Object.keys(zip.files).filter((name) => name.endsWith(".txt")).sort();
      expect(txtFiles).toHaveLength(2);
    });

    it("ZIP 내 각 텍스트 파일에 올바른 내용 포함", async () => {
      const file1 = await createMarkedPdf(1);
      const file2 = await createMarkedPdf(2);
      const tracker = createProgressTracker();

      const result = await pdfToText([file1, file2], {}, tracker.onProgress);

      const ab = await result.blob.arrayBuffer();
      const zip = await JSZip.loadAsync(ab);
      const txtFiles = Object.keys(zip.files).filter((name) => name.endsWith(".txt")).sort();

      for (const txtFile of txtFiles) {
        const content = await zip.files[txtFile].async("text");
        expect(content).toContain("PAGE_1");
        expect(content).toContain("sample text");
      }
    });
  });

  describe("진행률 추적", () => {
    it("progress가 0~100 범위에서 단조 증가", async () => {
      const file = await createMarkedPdf(3);
      const tracker = createProgressTracker();

      await pdfToText([file], {}, tracker.onProgress);

      expect(tracker.values.length).toBeGreaterThan(0);
      expect(tracker.values[tracker.values.length - 1]).toBe(100);

      for (let i = 1; i < tracker.values.length; i++) {
        expect(tracker.values[i]).toBeGreaterThanOrEqual(tracker.values[i - 1]);
      }
    });
  });

  describe("파일명", () => {
    it("단일 파일: baseName.txt", async () => {
      const file = await createMarkedPdf(1);
      const tracker = createProgressTracker();
      const result = await pdfToText([file], {}, tracker.onProgress);

      expect(result.filename).toBe("marked-1p.txt");
    });

    it("다중 파일: pdf_to_text.zip", async () => {
      const file1 = await createMarkedPdf(1);
      const file2 = await createMarkedPdf(1);
      const tracker = createProgressTracker();
      const result = await pdfToText([file1, file2], {}, tracker.onProgress);

      expect(result.filename).toBe("pdf_to_text.zip");
    });
  });

  describe("에러 처리", () => {
    it("파일이 없으면 에러", async () => {
      const tracker = createProgressTracker();
      await expect(pdfToText([], {}, tracker.onProgress)).rejects.toThrow(
        "No file provided",
      );
    });
  });
});
