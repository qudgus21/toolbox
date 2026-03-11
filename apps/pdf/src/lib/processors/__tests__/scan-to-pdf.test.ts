import { describe, it, expect, beforeAll } from "vitest";
import scanToPdf from "../scan-to-pdf";

// Node 환경에서 FileReader 폴리필 (프로세서가 FileReader 사용)
beforeAll(() => {
  if (typeof globalThis.FileReader === "undefined") {
    // @ts-expect-error Node polyfill
    globalThis.FileReader = class FileReader {
      result: ArrayBuffer | null = null;
      onload: (() => void) | null = null;
      onerror: ((err: unknown) => void) | null = null;
      readAsArrayBuffer(blob: Blob) {
        blob
          .arrayBuffer()
          .then((ab) => {
            this.result = ab;
            this.onload?.();
          })
          .catch((err) => this.onerror?.(err));
      }
    };
  }
});

import {
  resultToPdf,
  extractZipPdfs,
  extractZipFilenames,
  getPageSizes,
  createProgressTracker,
  loadScanFixture,
} from "./helpers";

// ── 기본 동작 (autoEnhance: false로 Canvas 의존 없이 테스트) ──

describe("scan-to-pdf: 기본 동작", () => {
  it("단일 PNG 스캔 파일을 PDF로 변환한다", async () => {
    const file = loadScanFixture("01-document-scan.png");
    const { onProgress, values } = createProgressTracker();

    const result = await scanToPdf(
      [file],
      { autoEnhance: false, colorMode: "color" },
      onProgress,
    );

    expect(result.filename).toBe("01-document-scan.pdf");
    expect(result.blob.type).toBe("application/pdf");
    expect(result.pageCount).toBe(1);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("빈 파일 배열이면 에러를 던진다", async () => {
    const { onProgress } = createProgressTracker();
    await expect(
      scanToPdf([], { autoEnhance: false, colorMode: "color" }, onProgress),
    ).rejects.toThrow("No file provided");
  });

  it("진행률이 5에서 시작해 100으로 끝난다", async () => {
    const file = loadScanFixture("01-document-scan.png");
    const { onProgress, values } = createProgressTracker();

    await scanToPdf(
      [file],
      { autoEnhance: false, colorMode: "color" },
      onProgress,
    );

    expect(values[0]).toBe(5);
    expect(values[values.length - 1]).toBe(100);
    // 단조 증가 확인
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });
});

// ── 다중 파일 ──

describe("scan-to-pdf: 다중 파일", () => {
  it("여러 파일을 하나의 PDF로 병합한다 (mergeAll: true)", async () => {
    const files = [
      loadScanFixture("01-document-scan.png"),
      loadScanFixture("02-low-contrast.png"),
      loadScanFixture("03-color-document.png"),
    ];
    const { onProgress } = createProgressTracker();

    const result = await scanToPdf(
      files,
      { autoEnhance: false, colorMode: "color", mergeAll: true },
      onProgress,
    );

    expect(result.filename).toBe("scanned.pdf");
    expect(result.blob.type).toBe("application/pdf");
    expect(result.pageCount).toBe(3);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });

  it("여러 파일을 개별 PDF로 변환하면 ZIP으로 반환한다 (mergeAll: false)", async () => {
    const files = [
      loadScanFixture("01-document-scan.png"),
      loadScanFixture("02-low-contrast.png"),
    ];
    const { onProgress } = createProgressTracker();

    const result = await scanToPdf(
      files,
      { autoEnhance: false, colorMode: "color", mergeAll: false },
      onProgress,
    );

    expect(result.filename).toBe("scan_to_pdf.zip");
    expect(result.pageCount).toBe(2);

    const filenames = await extractZipFilenames(result.blob);
    expect(filenames).toContain("01-document-scan.pdf");
    expect(filenames).toContain("02-low-contrast.pdf");

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs).toHaveLength(2);
    pdfs.forEach((pdf) => expect(pdf.getPageCount()).toBe(1));
  });
});

// ── 페이지 크기 & 여백 ──

describe("scan-to-pdf: 페이지 크기 옵션", () => {
  it("A4 세로 모드로 PDF를 생성한다", async () => {
    const file = loadScanFixture("01-document-scan.png");
    const { onProgress } = createProgressTracker();

    const result = await scanToPdf(
      [file],
      {
        autoEnhance: false,
        colorMode: "color",
        pageSize: "a4",
        orientation: "portrait",
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    // A4: 595 x 842
    expect(sizes[0].width).toBe(595);
    expect(sizes[0].height).toBe(842);
  });

  it("가로 모드면 너비와 높이가 뒤바뀐다", async () => {
    const file = loadScanFixture("01-document-scan.png");
    const { onProgress } = createProgressTracker();

    const result = await scanToPdf(
      [file],
      {
        autoEnhance: false,
        colorMode: "color",
        pageSize: "a4",
        orientation: "landscape",
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    // landscape A4: 842 x 595
    expect(sizes[0].width).toBe(842);
    expect(sizes[0].height).toBe(595);
  });

  it("여백을 적용하면 페이지 크기는 동일하되 이미지 영역이 줄어든다", async () => {
    const file = loadScanFixture("01-document-scan.png");
    const { onProgress: p1 } = createProgressTracker();
    const { onProgress: p2 } = createProgressTracker();

    const noMargin = await scanToPdf(
      [file],
      { autoEnhance: false, colorMode: "color", pageSize: "a4", marginMm: 0 },
      p1,
    );
    const withMargin = await scanToPdf(
      [file],
      { autoEnhance: false, colorMode: "color", pageSize: "a4", marginMm: 10 },
      p2,
    );

    // 페이지 크기는 A4로 동일
    const sizes1 = getPageSizes(await resultToPdf(noMargin.blob));
    const sizes2 = getPageSizes(await resultToPdf(withMargin.blob));
    expect(sizes1[0].width).toBe(sizes2[0].width);
    expect(sizes1[0].height).toBe(sizes2[0].height);
  });
});

// ── 기본값 ──

describe("scan-to-pdf: 기본 옵션", () => {
  it("기본 페이지 크기는 a4이다", async () => {
    const file = loadScanFixture("01-document-scan.png");
    const { onProgress } = createProgressTracker();

    // pageSize 미지정 → 기본 a4
    const result = await scanToPdf(
      [file],
      { autoEnhance: false, colorMode: "color" },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].width).toBe(595);
    expect(sizes[0].height).toBe(842);
  });
});
