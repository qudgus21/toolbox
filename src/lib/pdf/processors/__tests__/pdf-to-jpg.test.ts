import { describe, it, expect, vi, beforeAll } from "vitest";
import JSZip from "jszip";
import pdfToJpg from "../pdf-to-jpg";
import { createMarkedPdf, createProgressTracker } from "./helpers";

/* ═══════════════════════════════════════════════════════════
 *  PDF → JPG 프로세서 — 단위 테스트
 *
 *  pdfjs-dist를 모킹하여 canvas 렌더링 없이
 *  프로세서의 데이터 흐름과 분기 로직을 검증한다.
 * ═══════════════════════════════════════════════════════════ */

// ─── Minimal JPEG bytes ──────────────────────────────────────

function createMinimalJpeg(): Uint8Array {
  return new Uint8Array([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00,
    0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
  ]);
}

// ─── pdfjs-dist 모킹 ────────────────────────────────────────

vi.mock("pdfjs-dist", async () => {
  const pdfLib = await import("pdf-lib");
  return {
    GlobalWorkerOptions: { workerSrc: "" },
    getDocument: ({ data }: { data: ArrayBuffer }) => ({
      promise: pdfLib.PDFDocument.load(data).then((doc) => {
        const numPages = doc.getPageCount();
        const pages = doc.getPages();
        return {
          numPages,
          getPage: async (pageNum: number) => {
            const page = pages[pageNum - 1];
            const { width, height } = page.getSize();
            return {
              getViewport: ({ scale }: { scale: number }) => ({
                width: Math.round(width * scale),
                height: Math.round(height * scale),
              }),
              render: () => ({ promise: Promise.resolve() }),
            };
          },
          destroy: () => {},
        };
      }),
    }),
  };
});

// ─── document.createElement 모킹 ─────────────────────────────

beforeAll(() => {
  vi.stubGlobal("document", {
    createElement: vi.fn((tag: string) => {
      if (tag !== "canvas") throw new Error(`Unexpected: ${tag}`);
      let _w = 0;
      let _h = 0;
      return {
        get width() { return _w; },
        set width(v: number) { _w = v; },
        get height() { return _h; },
        set height(v: number) { _h = v; },
        getContext: () => ({ drawImage: () => {} }),
        toBlob: (cb: (b: Blob) => void, _type?: string, _quality?: number) => {
          cb(new Blob([createMinimalJpeg() as BlobPart], { type: "image/jpeg" }));
        },
      };
    }),
  });
});

// ─── Helper ──────────────────────────────────────────────────

async function extractZipEntries(blob: Blob): Promise<string[]> {
  const ab = await blob.arrayBuffer();
  const zip = await JSZip.loadAsync(ab);
  return Object.keys(zip.files)
    .filter((name) => name.endsWith(".jpg"))
    .sort();
}

// ─── 테스트 ──────────────────────────────────────────────────

describe("pdf-to-jpg processor", () => {
  describe("단일 파일", () => {
    it("단일 페이지 PDF → 단일 JPG 파일 출력", async () => {
      const file = await createMarkedPdf(1);
      const tracker = createProgressTracker();

      const result = await pdfToJpg([file], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.jpg$/);
      expect(result.blob.type).toBe("image/jpeg");
      expect(result.size).toBeGreaterThan(0);
      expect(result.pageCount).toBe(1);
    });

    it("다중 페이지 PDF → ZIP 파일 출력", async () => {
      const file = await createMarkedPdf(3);
      const tracker = createProgressTracker();

      const result = await pdfToJpg([file], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.zip$/);
      expect(result.size).toBeGreaterThan(0);
      expect(result.pageCount).toBe(3);

      const jpgs = await extractZipEntries(result.blob);
      expect(jpgs).toHaveLength(3);
    });
  });

  describe("다중 파일", () => {
    it("여러 PDF 파일 → ZIP 파일 출력 (폴더 구조)", async () => {
      const file1 = await createMarkedPdf(2);
      const file2 = await createMarkedPdf(3);
      const tracker = createProgressTracker();

      const result = await pdfToJpg([file1, file2], {}, tracker.onProgress);

      expect(result.filename).toBe("pdf_to_jpg.zip");
      expect(result.pageCount).toBe(5);

      const jpgs = await extractZipEntries(result.blob);
      expect(jpgs).toHaveLength(5);
      // Multi-file → files are organized in subfolders
      expect(jpgs.some((name) => name.includes("/"))).toBe(true);
    });

    it("단일 페이지 파일 여러 개 → ZIP 출력", async () => {
      const file1 = await createMarkedPdf(1);
      const file2 = await createMarkedPdf(1);
      const tracker = createProgressTracker();

      const result = await pdfToJpg([file1, file2], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.zip$/);
      expect(result.pageCount).toBe(2);
    });
  });

  describe("품질 옵션", () => {
    it("quality 옵션을 전달해도 에러 없이 동작", async () => {
      const file = await createMarkedPdf(2);

      for (const quality of ["high", "medium", "low"] as const) {
        const tracker = createProgressTracker();
        const result = await pdfToJpg(
          [file],
          { quality },
          tracker.onProgress,
        );
        expect(result.size).toBeGreaterThan(0);
        expect(result.pageCount).toBe(2);
      }
    });
  });

  describe("진행률 추적", () => {
    it("progress가 0~100 범위에서 단조 증가", async () => {
      const file = await createMarkedPdf(3);
      const tracker = createProgressTracker();

      await pdfToJpg([file], {}, tracker.onProgress);

      expect(tracker.values.length).toBeGreaterThan(0);
      expect(tracker.values[tracker.values.length - 1]).toBe(100);

      for (let i = 1; i < tracker.values.length; i++) {
        expect(tracker.values[i]).toBeGreaterThanOrEqual(tracker.values[i - 1]);
      }
    });
  });

  describe("파일명", () => {
    it("단일 파일 단일 페이지: baseName.jpg", async () => {
      const file = await createMarkedPdf(1);
      const tracker = createProgressTracker();
      const result = await pdfToJpg([file], {}, tracker.onProgress);

      expect(result.filename).toBe("marked-1p.jpg");
    });

    it("단일 파일 다중 페이지: baseName_images.zip", async () => {
      const file = await createMarkedPdf(3);
      const tracker = createProgressTracker();
      const result = await pdfToJpg([file], {}, tracker.onProgress);

      expect(result.filename).toBe("marked-3p_images.zip");
    });

    it("ZIP 내부 파일명이 zero-padded 페이지 번호 포함", async () => {
      const file = await createMarkedPdf(12);
      const tracker = createProgressTracker();
      const result = await pdfToJpg([file], {}, tracker.onProgress);

      const jpgs = await extractZipEntries(result.blob);
      expect(jpgs[0]).toContain("page01");
      expect(jpgs[11]).toContain("page12");
    });
  });

  describe("에러 처리", () => {
    it("파일이 없으면 에러", async () => {
      const tracker = createProgressTracker();
      await expect(pdfToJpg([], {}, tracker.onProgress)).rejects.toThrow(
        "No file provided",
      );
    });
  });
});
