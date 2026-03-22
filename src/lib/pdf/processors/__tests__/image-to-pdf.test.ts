import { describe, it, expect, beforeAll } from "vitest";
import { PDFDocument } from "pdf-lib";
import imageToPdf from "../image-to-pdf";

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
  loadAnyImageFixture,
} from "./helpers";

// ── 헬퍼 ──

/** 이미지 파일 → 프로세서용 옵션 키 */
function imgFileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

/** 허용 오차 비교 (PDF points 소수점 반올림 이슈) */
function approxEqual(a: number, b: number, tolerance = 1) {
  return Math.abs(a - b) <= tolerance;
}

// ── 기본 동작 ──

describe("image-to-pdf: 기본 동작", () => {
  it("단일 PNG 파일을 PDF로 변환한다", async () => {
    const file = loadImageFixture("png", "01-transparent.png");
    const { onProgress, values } = createProgressTracker();

    const result = await imageToPdf([file], {}, onProgress);

    expect(result.filename).toBe("01-transparent.pdf");
    expect(result.blob.type).toBe("application/pdf");
    expect(result.pageCount).toBe(1);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("단일 JPG 파일을 PDF로 변환한다", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], {}, onProgress);

    expect(result.filename).toBe("square-red.pdf");
    expect(result.blob.type).toBe("application/pdf");
    expect(result.pageCount).toBe(1);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("빈 파일 배열이면 에러를 던진다", async () => {
    const { onProgress } = createProgressTracker();
    await expect(imageToPdf([], {}, onProgress)).rejects.toThrow("No file provided");
  });
});

// ── 옵션: pageSize ──

describe("image-to-pdf: pageSize 옵션", () => {
  it("기본값 fit: 페이지 크기가 이미지에 맞춰진다", async () => {
    const file = loadImageFixture("png", "01-transparent.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "fit" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // fit 모드에서 페이지 크기는 이미지 크기와 동일 (마진 0)
    expect(sizes.length).toBe(1);
    // 이미지의 실제 크기에 맞아야 함
    expect(sizes[0].width).toBeGreaterThan(0);
    expect(sizes[0].height).toBeGreaterThan(0);
  });

  it("a4: 페이지가 A4 세로 크기이다 (595×842)", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "a4", orientation: "portrait" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(approxEqual(sizes[0].width, 595)).toBe(true);
    expect(approxEqual(sizes[0].height, 842)).toBe(true);
  });

  it("letter: 페이지가 US Letter 크기이다 (612×792)", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "letter", orientation: "portrait" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(approxEqual(sizes[0].width, 612)).toBe(true);
    expect(approxEqual(sizes[0].height, 792)).toBe(true);
  });

  it("a3: 페이지가 A3 크기이다", async () => {
    const file = loadImageFixture("png", "01-transparent.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "a3", orientation: "portrait" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(approxEqual(sizes[0].width, 842)).toBe(true);
    expect(approxEqual(sizes[0].height, 1191)).toBe(true);
  });

  it("photo4x6: 페이지가 4×6인치 크기이다 (288×432)", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "photo4x6", orientation: "portrait" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(approxEqual(sizes[0].width, 288)).toBe(true);
    expect(approxEqual(sizes[0].height, 432)).toBe(true);
  });
});

// ── 옵션: orientation ──

describe("image-to-pdf: orientation 옵션", () => {
  it("portrait: 너비 < 높이", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "a4", orientation: "portrait" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(sizes[0].width).toBeLessThan(sizes[0].height);
  });

  it("landscape: 너비 > 높이", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "a4", orientation: "landscape" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(sizes[0].width).toBeGreaterThan(sizes[0].height);
  });

  it("landscape A4 크기가 842×595이다", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "a4", orientation: "landscape" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(approxEqual(sizes[0].width, 842)).toBe(true);
    expect(approxEqual(sizes[0].height, 595)).toBe(true);
  });
});

// ── 옵션: marginMm ──

describe("image-to-pdf: margin 옵션", () => {
  it("마진 0: fit 모드에서 페이지 크기 = 이미지 크기", async () => {
    const file = loadImageFixture("png", "01-transparent.png");
    const { onProgress } = createProgressTracker();

    const noMargin = await imageToPdf([file], { pageSize: "fit", marginMm: 0 }, onProgress);
    const pdfNo = await resultToPdf(noMargin.blob);
    const sizeNo = getPageSizes(pdfNo)[0];

    // 마진 없으면 페이지 = 이미지 크기
    expect(sizeNo.width).toBeGreaterThan(0);
    expect(sizeNo.height).toBeGreaterThan(0);
  });

  it("마진 추가 시 fit 모드에서 페이지가 더 커진다", async () => {
    const file = loadImageFixture("png", "01-transparent.png");
    const { onProgress: p1 } = createProgressTracker();
    const { onProgress: p2 } = createProgressTracker();

    const noMargin = await imageToPdf([file], { pageSize: "fit", marginMm: 0 }, p1);
    const withMargin = await imageToPdf([file], { pageSize: "fit", marginMm: 10 }, p2);

    const sizeNo = getPageSizes(await resultToPdf(noMargin.blob))[0];
    const sizeWith = getPageSizes(await resultToPdf(withMargin.blob))[0];

    // 10mm = ~28.35pt per side, so total +56.7pt
    expect(sizeWith.width).toBeGreaterThan(sizeNo.width);
    expect(sizeWith.height).toBeGreaterThan(sizeNo.height);

    const marginPt = 10 * 2.83465;
    expect(approxEqual(sizeWith.width - sizeNo.width, marginPt * 2, 2)).toBe(true);
  });

  it("고정 페이지 크기에서 마진은 이미지 영역만 줄인다 (페이지 크기 동일)", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress: p1 } = createProgressTracker();
    const { onProgress: p2 } = createProgressTracker();

    const noMargin = await imageToPdf([file], { pageSize: "a4", marginMm: 0 }, p1);
    const withMargin = await imageToPdf([file], { pageSize: "a4", marginMm: 15 }, p2);

    const sizeNo = getPageSizes(await resultToPdf(noMargin.blob))[0];
    const sizeWith = getPageSizes(await resultToPdf(withMargin.blob))[0];

    // A4 크기는 마진과 무관하게 동일
    expect(sizeNo.width).toBe(sizeWith.width);
    expect(sizeNo.height).toBe(sizeWith.height);
  });
});

// ── 옵션: mergeAll ──

describe("image-to-pdf: mergeAll 옵션", () => {
  it("다중 파일 + mergeAll=true: 하나의 PDF로 합쳐진다", async () => {
    const files = [
      loadImageFixture("jpg", "square-red.jpg"),
      loadImageFixture("png", "01-transparent.png"),
      loadImageFixture("jpg", "landscape-green.jpg"),
    ];
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(files, { mergeAll: true }, onProgress);

    expect(result.filename).toBe("images_merged.pdf");
    expect(result.pageCount).toBe(3);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });

  it("다중 파일 + mergeAll=false: ZIP으로 개별 PDF 생성", async () => {
    const files = [
      loadImageFixture("jpg", "square-red.jpg"),
      loadImageFixture("png", "01-transparent.png"),
    ];
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(files, { mergeAll: false }, onProgress);

    expect(result.filename).toBe("image_to_pdf.zip");
    expect(result.pageCount).toBe(2);

    const filenames = await extractZipFilenames(result.blob);
    expect(filenames).toContain("square-red.pdf");
    expect(filenames).toContain("01-transparent.pdf");

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(2);
    expect(pdfs[0].getPageCount()).toBe(1);
    expect(pdfs[1].getPageCount()).toBe(1);
  });

  it("단일 파일은 mergeAll 무관하게 단일 PDF 출력", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress: p1 } = createProgressTracker();
    const { onProgress: p2 } = createProgressTracker();

    const merged = await imageToPdf([file], { mergeAll: true }, p1);
    const separate = await imageToPdf([file], { mergeAll: false }, p2);

    // 둘 다 단일 PDF (ZIP 아님)
    expect(merged.filename).toBe("square-red.pdf");
    expect(separate.filename).toBe("square-red.pdf");
  });

  it("mergeAll 기본값은 true이다", async () => {
    const files = [
      loadImageFixture("jpg", "square-red.jpg"),
      loadImageFixture("png", "01-transparent.png"),
    ];
    const { onProgress } = createProgressTracker();

    // mergeAll 생략 → 기본값 true → 단일 PDF
    const result = await imageToPdf(files, {}, onProgress);
    expect(result.filename).toBe("images_merged.pdf");
  });
});

// ── 옵션: rotations ──

describe("image-to-pdf: rotation 옵션", () => {
  it("회전 없는 기본 이미지는 페이지 크기가 이미지와 일치한다", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "fit" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // 정사각형 이미지이므로 width ≈ height
    expect(approxEqual(sizes[0].width, sizes[0].height, 5)).toBe(true);
  });

  it("90도 회전 시 fit 모드에서 페이지 크기가 뒤집힌다", async () => {
    const file = loadImageFixture("jpg", "03-portrait.jpg");
    const key = imgFileId(file);
    const { onProgress: p1 } = createProgressTracker();
    const { onProgress: p2 } = createProgressTracker();

    const normal = await imageToPdf([file], { pageSize: "fit" }, p1);
    const rotated = await imageToPdf(
      [file],
      { pageSize: "fit", rotations: { [key]: 90 } },
      p2,
    );

    const sizeNormal = getPageSizes(await resultToPdf(normal.blob))[0];
    const sizeRotated = getPageSizes(await resultToPdf(rotated.blob))[0];

    // 90도 회전이면 width↔height 스왑
    expect(approxEqual(sizeNormal.width, sizeRotated.height, 2)).toBe(true);
    expect(approxEqual(sizeNormal.height, sizeRotated.width, 2)).toBe(true);
  });

  it("180도 회전 시 fit 모드에서 페이지 크기는 동일하다", async () => {
    const file = loadImageFixture("jpg", "03-portrait.jpg");
    const key = imgFileId(file);
    const { onProgress: p1 } = createProgressTracker();
    const { onProgress: p2 } = createProgressTracker();

    const normal = await imageToPdf([file], { pageSize: "fit" }, p1);
    const rotated = await imageToPdf(
      [file],
      { pageSize: "fit", rotations: { [key]: 180 } },
      p2,
    );

    const sizeNormal = getPageSizes(await resultToPdf(normal.blob))[0];
    const sizeRotated = getPageSizes(await resultToPdf(rotated.blob))[0];

    expect(sizeNormal.width).toBe(sizeRotated.width);
    expect(sizeNormal.height).toBe(sizeRotated.height);
  });

  it("270도 회전도 width↔height 스왑", async () => {
    const file = loadImageFixture("jpg", "03-portrait.jpg");
    const key = imgFileId(file);
    const { onProgress: p1 } = createProgressTracker();
    const { onProgress: p2 } = createProgressTracker();

    const normal = await imageToPdf([file], { pageSize: "fit" }, p1);
    const rotated = await imageToPdf(
      [file],
      { pageSize: "fit", rotations: { [key]: 270 } },
      p2,
    );

    const sizeNormal = getPageSizes(await resultToPdf(normal.blob))[0];
    const sizeRotated = getPageSizes(await resultToPdf(rotated.blob))[0];

    expect(approxEqual(sizeNormal.width, sizeRotated.height, 2)).toBe(true);
    expect(approxEqual(sizeNormal.height, sizeRotated.width, 2)).toBe(true);
  });

  it("개별 파일마다 다른 회전을 적용할 수 있다", async () => {
    const file1 = loadImageFixture("jpg", "03-portrait.jpg");
    const file2 = loadImageFixture("jpg", "landscape-green.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(
      [file1, file2],
      {
        pageSize: "fit",
        mergeAll: true,
        rotations: {
          [imgFileId(file1)]: 90,
          [imgFileId(file2)]: 0,
        },
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
  });
});

// ── 출력 포맷 ──

describe("image-to-pdf: 출력 포맷", () => {
  it("단일 파일: blob 타입이 application/pdf", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], {}, onProgress);
    expect(result.blob.type).toBe("application/pdf");
  });

  it("ZIP 출력: 각 PDF 파일명이 원본 이미지명.pdf", async () => {
    const files = [
      loadImageFixture("jpg", "square-red.jpg"),
      loadImageFixture("png", "portrait-blue.png"),
      loadImageFixture("jpg", "landscape-green.jpg"),
    ];
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(files, { mergeAll: false }, onProgress);
    const filenames = await extractZipFilenames(result.blob);

    expect(filenames).toContain("square-red.pdf");
    expect(filenames).toContain("portrait-blue.pdf");
    expect(filenames).toContain("landscape-green.pdf");
  });

  it("result.size가 blob.size와 일치한다", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], {}, onProgress);
    expect(result.size).toBe(result.blob.size);
  });
});

// ── progress 콜백 ──

describe("image-to-pdf: progress 콜백", () => {
  it("단일 파일: progress 값이 단조 증가하며 100으로 끝난다", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress, values } = createProgressTracker();

    await imageToPdf([file], {}, onProgress);

    expect(values.length).toBeGreaterThan(0);
    expect(values[0]).toBe(5);
    expect(values[values.length - 1]).toBe(100);

    // 단조 증가
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });

  it("다중 파일 merge: progress가 0~100 범위", async () => {
    const files = [
      loadImageFixture("jpg", "square-red.jpg"),
      loadImageFixture("png", "01-transparent.png"),
      loadImageFixture("jpg", "landscape-green.jpg"),
    ];
    const { onProgress, values } = createProgressTracker();

    await imageToPdf(files, { mergeAll: true }, onProgress);

    values.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    });
    expect(values[values.length - 1]).toBe(100);
  });

  it("다중 파일 ZIP: progress가 0~100 범위", async () => {
    const files = [
      loadImageFixture("jpg", "square-red.jpg"),
      loadImageFixture("png", "01-transparent.png"),
    ];
    const { onProgress, values } = createProgressTracker();

    await imageToPdf(files, { mergeAll: false }, onProgress);

    values.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    });
    expect(values[values.length - 1]).toBe(100);
  });
});

// ── 다양한 이미지 타입 ──

describe("image-to-pdf: 다양한 이미지 포맷 (PNG/JPEG)", () => {
  it("투명 PNG를 PDF로 변환한다", async () => {
    const file = loadImageFixture("png", "01-transparent.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("그레이스케일 PNG를 변환한다", async () => {
    const file = loadImageFixture("png", "02-grayscale.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("대형 PNG를 변환한다", async () => {
    const file = loadImageFixture("png", "03-large.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "a4" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("1×1 픽셀 PNG를 변환한다", async () => {
    const file = loadImageFixture("png", "04-tiny-1x1.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "fit" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("가로형(landscape) JPG를 변환한다", async () => {
    const file = loadImageFixture("jpg", "landscape-green.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "fit" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // landscape 이미지이므로 width > height
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height);
  });

  it("세로형(portrait) JPG를 변환한다", async () => {
    const file = loadImageFixture("jpg", "03-portrait.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "fit" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // portrait 이미지이므로 width < height
    expect(sizes[0].width).toBeLessThan(sizes[0].height);
  });

  it("파노라마(매우 넓은) JPG를 fit 모드로 변환한다", async () => {
    const file = loadImageFixture("jpg", "panorama.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf([file], { pageSize: "fit" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // 파노라마는 매우 넓으므로 width >> height
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height * 2);
  });

  it("PNG와 JPG를 혼합하여 합칠 수 있다", async () => {
    const files = [
      loadImageFixture("jpg", "square-red.jpg"),
      loadImageFixture("png", "01-transparent.png"),
      loadImageFixture("jpg", "landscape-green.jpg"),
      loadImageFixture("png", "portrait-blue.png"),
    ];
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(files, { mergeAll: true, pageSize: "a4" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
  });
});

// ── 복합 옵션 조합 ──

describe("image-to-pdf: 복합 옵션 조합", () => {
  it("landscape + a4 + margin 10mm", async () => {
    const file = loadImageFixture("jpg", "square-red.jpg");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(
      [file],
      { pageSize: "a4", orientation: "landscape", marginMm: 10 },
      onProgress,
    );
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // landscape A4
    expect(approxEqual(sizes[0].width, 842)).toBe(true);
    expect(approxEqual(sizes[0].height, 595)).toBe(true);
  });

  it("multiple files + rotation + letter + merge", async () => {
    const file1 = loadImageFixture("jpg", "square-red.jpg");
    const file2 = loadImageFixture("png", "01-transparent.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(
      [file1, file2],
      {
        pageSize: "letter",
        orientation: "portrait",
        marginMm: 5,
        mergeAll: true,
        rotations: { [imgFileId(file1)]: 90 },
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);

    const sizes = getPageSizes(pdf);
    // 둘 다 letter portrait 크기
    sizes.forEach((s) => {
      expect(approxEqual(s.width, 612)).toBe(true);
      expect(approxEqual(s.height, 792)).toBe(true);
    });
  });

  it("여러 파일 + separate(ZIP) + 각각 다른 회전", async () => {
    const file1 = loadImageFixture("jpg", "square-red.jpg");
    const file2 = loadImageFixture("jpg", "landscape-green.jpg");
    const file3 = loadImageFixture("png", "portrait-blue.png");
    const { onProgress } = createProgressTracker();

    const result = await imageToPdf(
      [file1, file2, file3],
      {
        pageSize: "a5",
        orientation: "portrait",
        mergeAll: false,
        rotations: {
          [imgFileId(file1)]: 0,
          [imgFileId(file2)]: 90,
          [imgFileId(file3)]: 180,
        },
      },
      onProgress,
    );

    expect(result.filename).toBe("image_to_pdf.zip");
    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);

    // 각 PDF는 1페이지씩
    pdfs.forEach((pdf) => {
      expect(pdf.getPageCount()).toBe(1);
    });

    // 모든 PDF가 A5 portrait 크기
    pdfs.forEach((pdf) => {
      const sizes = getPageSizes(pdf);
      expect(approxEqual(sizes[0].width, 420)).toBe(true);
      expect(approxEqual(sizes[0].height, 595)).toBe(true);
    });
  });
});

// ── 모든 페이지 크기 ──

describe("image-to-pdf: 모든 페이지 크기 옵션", () => {
  const pageSizeTests: { key: string; w: number; h: number }[] = [
    { key: "a4", w: 595, h: 842 },
    { key: "a3", w: 842, h: 1191 },
    { key: "a5", w: 420, h: 595 },
    { key: "letter", w: 612, h: 792 },
    { key: "legal", w: 612, h: 1008 },
    { key: "b5", w: 499, h: 709 },
    { key: "photo4x6", w: 288, h: 432 },
    { key: "photo5x7", w: 360, h: 504 },
    { key: "postcard", w: 283, h: 420 },
  ];

  for (const { key, w, h } of pageSizeTests) {
    it(`${key} portrait: ${w}×${h}pt`, async () => {
      const file = loadImageFixture("jpg", "square-red.jpg");
      const { onProgress } = createProgressTracker();

      const result = await imageToPdf(
        [file],
        { pageSize: key, orientation: "portrait" },
        onProgress,
      );
      const pdf = await resultToPdf(result.blob);
      const sizes = getPageSizes(pdf);

      expect(approxEqual(sizes[0].width, w, 2)).toBe(true);
      expect(approxEqual(sizes[0].height, h, 2)).toBe(true);
    });
  }
});
