import { describe, it, expect, beforeAll } from "vitest";
import { PDFDocument } from "pdf-lib";
import jpgToPdf from "../jpg-to-pdf";

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
  fileId,
  loadImageFixture,
} from "./helpers";

// ── 헬퍼 ────────────────────────────────────────────────────────────

function jpg(name: string) {
  return loadImageFixture("jpg", name);
}
function png(name: string) {
  return loadImageFixture("png", name);
}

const MM_TO_PT = 2.83465;

// 허용 오차 (부동소수점)
const TOLERANCE = 1;

function approx(actual: number, expected: number) {
  expect(actual).toBeGreaterThanOrEqual(expected - TOLERANCE);
  expect(actual).toBeLessThanOrEqual(expected + TOLERANCE);
}

// ── 기본 동작 ──────────────────────────────────────────────────────

describe("jpg-to-pdf: 기본 동작", () => {
  it("단일 JPG → PDF 변환", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress, values } = createProgressTracker();
    const result = await jpgToPdf([file], {}, onProgress);

    expect(result.blob.type).toBe("application/pdf");
    expect(result.filename).toBe("01-small-red.pdf");
    expect(result.pageCount).toBe(1);
    expect(result.size).toBeGreaterThan(0);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("단일 PNG → PDF 변환", async () => {
    const file = png("arrow-up.png");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], {}, onProgress);

    expect(result.filename).toBe("arrow-up.pdf");
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("빈 파일 배열 → 에러", async () => {
    const { onProgress } = createProgressTracker();
    await expect(jpgToPdf([], {}, onProgress)).rejects.toThrow("No file provided");
  });
});

// ── 페이지 크기 ────────────────────────────────────────────────────

describe("jpg-to-pdf: 페이지 크기", () => {
  const PAGE_SIZES: Record<string, { width: number; height: number }> = {
    a4: { width: 595.28, height: 841.89 },
    a3: { width: 841.89, height: 1190.55 },
    a5: { width: 419.53, height: 595.28 },
    letter: { width: 612, height: 792 },
    legal: { width: 612, height: 1008 },
    b5: { width: 498.9, height: 708.66 },
    photo4x6: { width: 288, height: 432 },
    photo5x7: { width: 360, height: 504 },
    postcard: { width: 283.46, height: 419.53 },
  };

  for (const [key, dims] of Object.entries(PAGE_SIZES)) {
    it(`페이지 크기: ${key} (세로)`, async () => {
      const file = jpg("square-red.jpg");
      const { onProgress } = createProgressTracker();
      const result = await jpgToPdf([file], { pageSize: key, orientation: "portrait" }, onProgress);
      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);

      approx(sizes[0].width, Math.min(dims.width, dims.height));
      approx(sizes[0].height, Math.max(dims.width, dims.height));
    });

    it(`페이지 크기: ${key} (가로)`, async () => {
      const file = jpg("square-red.jpg");
      const { onProgress } = createProgressTracker();
      const result = await jpgToPdf([file], { pageSize: key, orientation: "landscape" }, onProgress);
      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);

      approx(sizes[0].width, Math.max(dims.width, dims.height));
      approx(sizes[0].height, Math.min(dims.width, dims.height));
    });
  }

  it("fit 모드: 페이지가 이미지 크기에 맞춰짐", async () => {
    const file = jpg("landscape-green.jpg"); // 800x400
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "fit" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // fit 모드: 페이지 크기 = 이미지 크기 (여백 없음)
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height); // 가로 이미지
  });

  it("fit 모드 + 여백: 페이지가 이미지+여백 크기", async () => {
    const file = jpg("square-red.jpg");
    const { onProgress } = createProgressTracker();
    const marginMm = 10;
    const result = await jpgToPdf([file], { pageSize: "fit", marginMm }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // 여백 없이 한번 더 변환
    const resultNoMargin = await jpgToPdf([file], { pageSize: "fit", marginMm: 0 }, onProgress);
    const pdfNoMargin = await resultToPdf(resultNoMargin.blob);
    const sizesNoMargin = getPageSizes(pdfNoMargin);

    const expectedExtra = Math.round(marginMm * MM_TO_PT * 2);
    approx(sizes[0].width - sizesNoMargin[0].width, expectedExtra);
    approx(sizes[0].height - sizesNoMargin[0].height, expectedExtra);
  });
});

// ── 방향 (Orientation) ─────────────────────────────────────────────

describe("jpg-to-pdf: 방향", () => {
  it("portrait: 페이지가 세로", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", orientation: "portrait" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].height).toBeGreaterThan(sizes[0].width);
  });

  it("landscape: 페이지가 가로", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", orientation: "landscape" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height);
  });

  it("기본값: portrait", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].height).toBeGreaterThan(sizes[0].width);
  });
});

// ── 여백 (Margin) ──────────────────────────────────────────────────

describe("jpg-to-pdf: 여백", () => {
  it("여백 0mm: 이미지가 페이지 가득 채움", async () => {
    const file = jpg("square-red.jpg"); // 정사각형
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", marginMm: 0 }, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
    // 페이지 크기는 A4 그대로
    const sizes = getPageSizes(pdf);
    approx(sizes[0].width, 595);
    approx(sizes[0].height, 842);
  });

  it("여백 6.7mm: 실제 여백이 적용됨", async () => {
    const file = jpg("square-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", marginMm: 6.7 }, onProgress);
    const pdf = await resultToPdf(result.blob);
    // 페이지 크기는 A4 그대로 (여백은 내부 여백)
    const sizes = getPageSizes(pdf);
    approx(sizes[0].width, 595);
    approx(sizes[0].height, 842);
  });

  it("여백 25mm (최대): 페이지 크기는 변하지 않음", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", marginMm: 25 }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    approx(sizes[0].width, 595);
    approx(sizes[0].height, 842);
  });

  it("기본값: 여백 0mm", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    // marginMm 생략
    const result = await jpgToPdf([file], { pageSize: "fit" }, onProgress);
    const resultWithZero = await jpgToPdf([file], { pageSize: "fit", marginMm: 0 }, onProgress);

    const pdf = await resultToPdf(result.blob);
    const pdfZero = await resultToPdf(resultWithZero.blob);
    const sizes = getPageSizes(pdf);
    const sizesZero = getPageSizes(pdfZero);

    // fit 모드에서 기본값 0mm면 크기가 같아야 함
    approx(sizes[0].width, sizesZero[0].width);
    approx(sizes[0].height, sizesZero[0].height);
  });
});

// ── 회전 (Rotation) ────────────────────────────────────────────────

describe("jpg-to-pdf: 회전", () => {
  it("회전 0°: 이미지가 원본 방향", async () => {
    const file = jpg("landscape-green.jpg"); // 800x400 가로
    const key = fileId(file);
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "fit", rotations: { [key]: 0 } }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height); // 가로 유지
  });

  it("회전 90°: fit 모드에서 페이지가 회전된 이미지에 맞춤", async () => {
    const file = jpg("landscape-green.jpg"); // 800x400 가로
    const key = fileId(file);
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "fit", rotations: { [key]: 90 } }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    // 90° 회전: 가로 이미지 → 세로 (rotW=400, rotH=800)
    expect(sizes[0].height).toBeGreaterThan(sizes[0].width);
  });

  it("회전 180°: 페이지 크기는 동일 (fit 모드)", async () => {
    const file = jpg("landscape-green.jpg"); // 800x400
    const key = fileId(file);
    const { onProgress } = createProgressTracker();
    const result0 = await jpgToPdf([file], { pageSize: "fit", rotations: { [key]: 0 } }, onProgress);
    const result180 = await jpgToPdf([file], { pageSize: "fit", rotations: { [key]: 180 } }, onProgress);

    const sizes0 = getPageSizes(await resultToPdf(result0.blob));
    const sizes180 = getPageSizes(await resultToPdf(result180.blob));
    approx(sizes0[0].width, sizes180[0].width);
    approx(sizes0[0].height, sizes180[0].height);
  });

  it("회전 270°: 90°와 같은 페이지 크기 (fit 모드)", async () => {
    const file = jpg("landscape-green.jpg");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();
    const result90 = await jpgToPdf([file], { pageSize: "fit", rotations: { [key]: 90 } }, onProgress);
    const result270 = await jpgToPdf([file], { pageSize: "fit", rotations: { [key]: 270 } }, onProgress);

    const sizes90 = getPageSizes(await resultToPdf(result90.blob));
    const sizes270 = getPageSizes(await resultToPdf(result270.blob));
    approx(sizes90[0].width, sizes270[0].width);
    approx(sizes90[0].height, sizes270[0].height);
  });

  it("회전 + 고정 페이지 크기: 페이지 크기는 A4 유지", async () => {
    const file = jpg("landscape-green.jpg");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(
      [file],
      { pageSize: "a4", orientation: "portrait", rotations: { [key]: 90 } },
      onProgress,
    );
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    approx(sizes[0].width, 595);
    approx(sizes[0].height, 842);
  });

  it("파일별 다른 회전값", async () => {
    const file1 = jpg("01-small-red.jpg");
    const file2 = jpg("landscape-green.jpg");
    const key1 = fileId(file1);
    const key2 = fileId(file2);
    const { onProgress } = createProgressTracker();

    const result = await jpgToPdf(
      [file1, file2],
      {
        pageSize: "fit",
        mergeAll: true,
        rotations: { [key1]: 0, [key2]: 90 },
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
  });

  it("회전 미지정 파일은 0°로 처리", async () => {
    const file = jpg("landscape-green.jpg");
    const { onProgress } = createProgressTracker();
    // rotations 객체에 해당 파일 키 없음
    const result = await jpgToPdf([file], { pageSize: "fit", rotations: {} }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height); // 가로 유지
  });
});

// ── 병합 모드 (Merge All) ──────────────────────────────────────────

describe("jpg-to-pdf: 병합 모드", () => {
  it("mergeAll=true (기본): 여러 이미지 → 단일 PDF", async () => {
    const files = [jpg("01-small-red.jpg"), jpg("landscape-green.jpg"), png("arrow-up.png")];
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(files, { mergeAll: true }, onProgress);

    expect(result.filename).toBe("images_merged.pdf");
    expect(result.blob.type).toBe("application/pdf");
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });

  it("mergeAll=false: 여러 이미지 → ZIP (각각 1페이지 PDF)", async () => {
    const files = [jpg("01-small-red.jpg"), jpg("landscape-green.jpg"), png("arrow-up.png")];
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(files, { mergeAll: false }, onProgress);

    expect(result.filename).toBe("jpg_to_pdf.zip");
    expect(result.pageCount).toBe(3);

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
    pdfs.forEach((pdf) => expect(pdf.getPageCount()).toBe(1));
  });

  it("mergeAll=false: ZIP 파일명이 원본 이미지명 기반", async () => {
    const files = [jpg("01-small-red.jpg"), png("arrow-up.png")];
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(files, { mergeAll: false }, onProgress);

    const filenames = await extractZipFilenames(result.blob);
    expect(filenames).toContain("01-small-red.pdf");
    expect(filenames).toContain("arrow-up.pdf");
  });

  it("단일 파일 + mergeAll=false: 단일 PDF (ZIP 아님)", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { mergeAll: false }, onProgress);

    // 단일 파일은 mergeAll 무관하게 단일 PDF
    expect(result.filename).toBe("01-small-red.pdf");
    expect(result.blob.type).toBe("application/pdf");
  });

  it("기본값: mergeAll=true", async () => {
    const files = [jpg("01-small-red.jpg"), jpg("landscape-green.jpg")];
    const { onProgress } = createProgressTracker();
    // mergeAll 생략
    const result = await jpgToPdf(files, {}, onProgress);

    expect(result.filename).toBe("images_merged.pdf");
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
  });
});

// ── 이미지 형식 ────────────────────────────────────────────────────

describe("jpg-to-pdf: 이미지 형식", () => {
  it("JPG 이미지 처리", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], {}, onProgress);
    expect(result.pageCount).toBe(1);
  });

  it("PNG 이미지 처리", async () => {
    const file = png("checkerboard.png");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], {}, onProgress);
    expect(result.pageCount).toBe(1);
  });

  it("JPG + PNG 혼합 병합", async () => {
    const files = [jpg("01-small-red.jpg"), png("arrow-up.png"), jpg("landscape-green.jpg")];
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(files, { mergeAll: true }, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });
});

// ── 다양한 이미지 비율 ─────────────────────────────────────────────

describe("jpg-to-pdf: 다양한 이미지 비율", () => {
  it("정사각형 이미지 → A4: 가로가 꽉 참", async () => {
    const file = jpg("square-red.jpg"); // 500x500
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", orientation: "portrait", marginMm: 0 }, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("가로로 긴 이미지 → A4 세로: 가로 제한", async () => {
    const file = jpg("panorama.jpg"); // 1500x400
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", orientation: "portrait" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    approx(sizes[0].width, 595);
    approx(sizes[0].height, 842);
  });

  it("세로로 긴 이미지 → A4 가로: 높이 제한", async () => {
    const file = png("tall-narrow.png"); // 200x800
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], { pageSize: "a4", orientation: "landscape" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    approx(sizes[0].width, 842); // landscape A4
    approx(sizes[0].height, 595);
  });
});

// ── 옵션 조합 ──────────────────────────────────────────────────────

describe("jpg-to-pdf: 옵션 조합", () => {
  it("landscape + legal + 여백 13.3mm + 회전 90°", async () => {
    const file = jpg("01-small-red.jpg");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(
      [file],
      {
        pageSize: "legal",
        orientation: "landscape",
        marginMm: 13.3,
        rotations: { [key]: 90 },
      },
      onProgress,
    );
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    // Legal landscape: width=1008, height=612
    approx(sizes[0].width, 1008);
    approx(sizes[0].height, 612);
  });

  it("여러 파일 + mergeAll=false + 각각 다른 회전", async () => {
    const file1 = jpg("01-small-red.jpg");
    const file2 = png("arrow-up.png");
    const key1 = fileId(file1);
    const key2 = fileId(file2);
    const { onProgress } = createProgressTracker();

    const result = await jpgToPdf(
      [file1, file2],
      {
        pageSize: "a4",
        mergeAll: false,
        rotations: { [key1]: 90, [key2]: 180 },
      },
      onProgress,
    );

    expect(result.filename).toBe("jpg_to_pdf.zip");
    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(2);

    // 각 PDF 페이지 크기는 A4 (회전은 내부 이미지에만 적용)
    for (const pdf of pdfs) {
      const sizes = getPageSizes(pdf);
      approx(sizes[0].width, 595);
      approx(sizes[0].height, 842);
    }
  });
});

// ── progress 콜백 ──────────────────────────────────────────────────

describe("jpg-to-pdf: progress 콜백", () => {
  it("단일 파일: progress 0→100 단조 증가", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress, values } = createProgressTracker();
    await jpgToPdf([file], {}, onProgress);

    expect(values[0]).toBe(5); // 시작
    expect(values[values.length - 1]).toBe(100); // 끝
    // 단조 증가
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });

  it("여러 파일 merge: progress가 파일 수에 비례하여 증가", async () => {
    const files = [jpg("01-small-red.jpg"), jpg("square-red.jpg"), png("arrow-up.png")];
    const { onProgress, values } = createProgressTracker();
    await jpgToPdf(files, { mergeAll: true }, onProgress);

    expect(values[0]).toBe(5);
    expect(values[values.length - 1]).toBe(100);
    expect(values.length).toBeGreaterThanOrEqual(4); // 5, ~33, ~61, 90, 95, 100
  });

  it("여러 파일 ZIP: progress 끝 100", async () => {
    const files = [jpg("01-small-red.jpg"), png("arrow-up.png")];
    const { onProgress, values } = createProgressTracker();
    await jpgToPdf(files, { mergeAll: false }, onProgress);

    expect(values[values.length - 1]).toBe(100);
  });
});

// ── 출력 포맷 ──────────────────────────────────────────────────────

describe("jpg-to-pdf: 출력 포맷", () => {
  it("단일 파일: filename이 원본명.pdf", async () => {
    const file = jpg("landscape-green.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], {}, onProgress);
    expect(result.filename).toBe("landscape-green.pdf");
  });

  it("병합: filename이 images_merged.pdf", async () => {
    const files = [jpg("01-small-red.jpg"), jpg("square-red.jpg")];
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(files, { mergeAll: true }, onProgress);
    expect(result.filename).toBe("images_merged.pdf");
  });

  it("ZIP: filename이 jpg_to_pdf.zip", async () => {
    const files = [jpg("01-small-red.jpg"), jpg("square-red.jpg")];
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf(files, { mergeAll: false }, onProgress);
    expect(result.filename).toBe("jpg_to_pdf.zip");
  });

  it("result.size가 blob.size와 일치", async () => {
    const file = jpg("01-small-red.jpg");
    const { onProgress } = createProgressTracker();
    const result = await jpgToPdf([file], {}, onProgress);
    expect(result.size).toBe(result.blob.size);
  });
});
