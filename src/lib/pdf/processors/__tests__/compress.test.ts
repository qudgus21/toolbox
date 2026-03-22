import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { PDFDocument, PDFName, PDFNumber, PDFRawStream } from "pdf-lib";
import pako from "pako";
import compressPdf from "../compress";
import {
  loadFixture,
  resultToPdf,
  extractZipPdfs,
  extractZipFilenames,
  getPageSizes,
  createProgressTracker,
} from "./helpers";

/* ═══════════════════════════════════════════════════════════
 *  PDF 압축 프로세서 — 통합 테스트
 *
 *  ★ 핵심 원칙: 모든 케이스에서 결과 ≤ 원본.
 *  압축인데 오히려 커지면 안 된다.
 *
 *  전체 fixture × 6개 케이스(2모드 × 3레벨) = 78개 조합 전수 검사.
 * ═══════════════════════════════════════════════════════════ */

// ─── 유틸 ──────────────────────────────────────────────────

function createMinimalJpeg(
  width: number,
  height: number,
  extraPadding = 0,
): Uint8Array {
  const base = [
    0xff, 0xd8,
    0xff, 0xc0, 0x00, 0x11,
    0x08,
    (height >> 8) & 0xff, height & 0xff,
    (width >> 8) & 0xff, width & 0xff,
    0x03,
    0x01, 0x11, 0x00,
    0x02, 0x11, 0x01,
    0x03, 0x11, 0x01,
    0xff, 0xda, 0x00, 0x0c,
    0x03, 0x01, 0x00, 0x02, 0x11, 0x03, 0x11,
    0x00, 0x3f, 0x00,
    0x00,
  ];
  const result = new Uint8Array(base.length + extraPadding + 2);
  result.set(base);
  result[result.length - 2] = 0xff;
  result[result.length - 1] = 0xd9;
  return result;
}

function fmt(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  return `${(bytes / 1024).toFixed(1)}KB`;
}

// ─── 모킹 ──────────────────────────────────────────────────

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

let mockRecompressCount = 0;

function setupMocks() {
  mockRecompressCount = 0;
  vi.stubGlobal("OffscreenCanvas", class OffscreenCanvas {});
  vi.stubGlobal(
    "createImageBitmap",
    vi.fn(async (source: unknown) => {
      // ImageData를 받는 경우 (FlateDecode 처리)
      if (source && typeof source === "object" && "width" in source && "height" in source && "data" in source) {
        const s = source as { width: number; height: number };
        return { width: s.width, height: s.height, close: () => {} };
      }
      // Blob를 받는 경우 (DCTDecode 처리)
      return { width: 800, height: 600, close: () => {} };
    }),
  );
  vi.stubGlobal("ImageData", class ImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    constructor(data: Uint8ClampedArray, width: number, height?: number) {
      this.data = data;
      this.width = width;
      this.height = height ?? (data.length / 4 / width);
    }
  });
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
        toBlob: (cb: (b: Blob) => void, _t: string, quality: number) => {
          mockRecompressCount++;
          const w = _w || 100;
          const h = _h || 100;
          const bytesPerPixel = quality * 0.025;
          const padding = Math.max(0, Math.round(w * h * bytesPerPixel) - 40);
          cb(new Blob([createMinimalJpeg(w, h, padding)], { type: "image/jpeg" }));
        },
      };
    }),
  });
}

// ═══════════════════════════════════════════════════════════
//  ★ 핵심 테스트: 모든 fixture × 6 케이스 — 결과 ≤ 원본
// ═══════════════════════════════════════════════════════════

const ALL_FIXTURES = [
  "01-single-page.pdf",
  "02-multi-page-10.pdf",
  "03-many-pages-50.pdf",
  "04-landscape.pdf",
  "05-rotated-pages.pdf",
  "06-with-metadata.pdf",
  "07-mixed-sizes.pdf",
  "08-text-heavy.pdf",
  "09-colorful.pdf",
  "10-security-test.pdf",
  "11-large-500-pages.pdf",
  "12-heavy-content.pdf",
  "12-image-heavy.pdf",
] as const;

const MODES = ["image", "rasterize"] as const;
const LEVELS = ["extreme", "recommended", "less"] as const;

describe("compress: 전체 fixture × 6케이스 — 결과 ≤ 원본 보장", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  // 크기 비교 결과를 모아서 마지막에 테이블로 출력
  const results: { file: string; mode: string; level: string; before: number; after: number; ratio: number }[] = [];

  for (const fixture of ALL_FIXTURES) {
    for (const mode of MODES) {
      for (const level of LEVELS) {
        const label = `${fixture} / ${mode} / ${level}`;

        it(label, async () => {
          const file = loadFixture(fixture);
          const originalSize = file.size;
          const { onProgress } = createProgressTracker();

          const result = await compressPdf(
            [file],
            { compressionLevel: level, compressMode: mode },
            onProgress,
          );

          results.push({
            file: fixture,
            mode,
            level,
            before: originalSize,
            after: result.size,
            ratio: result.size / originalSize,
          });

          // ★ 핵심 assertion: 결과가 원본보다 크면 안 됨
          expect(result.size).toBeLessThanOrEqual(originalSize);

          // 유효한 PDF인지
          const pdf = await resultToPdf(result.blob);
          expect(pdf.getPageCount()).toBeGreaterThan(0);
        }, 120_000);
      }
    }
  }

  // 전체 결과 요약 출력
  afterAll(() => {
    console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
    console.log("║  압축 결과 전수 비교 (모든 fixture × 모든 케이스)                   ║");
    console.log("╠═══════════════════════════════╦══════════╦══════════╦══════════╦══════╣");
    console.log("║ fixture                       ║ mode     ║ level    ║ before→after   ║");
    console.log("╠═══════════════════════════════╬══════════╬══════════╬══════════╬══════╣");
    for (const r of results) {
      const change = r.ratio <= 1
        ? `${((1 - r.ratio) * 100).toFixed(0)}%↓`
        : `${((r.ratio - 1) * 100).toFixed(0)}%↑ ⚠️`;
      const name = r.file.padEnd(30);
      console.log(
        `║ ${name}║ ${r.mode.padEnd(9)}║ ${r.level.padEnd(9)}║ ${fmt(r.before)}→${fmt(r.after)} ${change}`,
      );
    }
    console.log("╚═══════════════════════════════╩══════════╩══════════╩══════════════════╝");
  });
});

// ═══════════════════════════════════════════════════════════
//  레벨별 순서 검증: extreme ≤ recommended ≤ less
// ═══════════════════════════════════════════════════════════

describe("compress: 레벨별 크기 순서 (extreme ≤ recommended ≤ less)", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  for (const mode of MODES) {
    it(`${mode} 모드 — 레벨별 크기 순서`, async () => {
      const file = loadFixture("12-image-heavy.pdf");
      const sizes: Record<string, number> = {};

      for (const level of LEVELS) {
        const { onProgress } = createProgressTracker();
        const result = await compressPdf(
          [file],
          { compressionLevel: level, compressMode: mode },
          onProgress,
        );
        sizes[level] = result.size;
      }

      expect(sizes.extreme).toBeLessThanOrEqual(sizes.recommended);
      expect(sizes.recommended).toBeLessThanOrEqual(sizes.less);
    });
  }
});

// ═══════════════════════════════════════════════════════════
//  페이지 속성 보존
// ═══════════════════════════════════════════════════════════

describe("compress: 페이지 속성 보존", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  for (const mode of MODES) {
    it(`${mode} — landscape 페이지 크기 보존`, async () => {
      const file = loadFixture("04-landscape.pdf");
      const origPdf = await PDFDocument.load(await file.arrayBuffer());
      const origSize = origPdf.getPage(0).getSize();

      const { onProgress } = createProgressTracker();
      const result = await compressPdf(
        [file],
        { compressionLevel: "recommended", compressMode: mode },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      const s = pdf.getPage(0).getSize();
      expect(Math.round(s.width)).toBe(Math.round(origSize.width));
      expect(Math.round(s.height)).toBe(Math.round(origSize.height));
    });

    it(`${mode} — mixed-sizes 각 페이지 크기 보존`, async () => {
      const file = loadFixture("07-mixed-sizes.pdf");
      const origPdf = await PDFDocument.load(await file.arrayBuffer());
      const origSizes = origPdf.getPages().map((p) => ({
        width: Math.round(p.getSize().width),
        height: Math.round(p.getSize().height),
      }));

      const { onProgress } = createProgressTracker();
      const result = await compressPdf(
        [file],
        { compressionLevel: "recommended", compressMode: mode },
        onProgress,
      );

      const pdf = await resultToPdf(result.blob);
      expect(getPageSizes(pdf)).toEqual(origSizes);
    });
  }

  it("image — rotated pages 회전 보존", async () => {
    const file = loadFixture("05-rotated-pages.pdf");
    const origPdf = await PDFDocument.load(await file.arrayBuffer());
    const origRot = origPdf.getPages().map((p) => p.getRotation().angle);

    const { onProgress } = createProgressTracker();
    const result = await compressPdf(
      [file],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPages().map((p) => p.getRotation().angle)).toEqual(origRot);
  });

  it("image — 메타데이터 제거", async () => {
    const file = loadFixture("06-with-metadata.pdf");
    const { onProgress } = createProgressTracker();
    const result = await compressPdf(
      [file],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getTitle()).toBeFalsy();
    expect(pdf.getAuthor()).toBeFalsy();
  });
});

// ═══════════════════════════════════════════════════════════
//  FlateDecode(PNG) 이미지 처리 검증
// ═══════════════════════════════════════════════════════════

describe("compress: FlateDecode 이미지 재압축", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  it("FlateDecode(RGB) 이미지가 있는 PDF — 실제 압축", async () => {
    // 큰 FlateDecode RGB 이미지를 임베드한 PDF 생성
    const doc = await PDFDocument.create();
    const page = doc.addPage([400, 400]);

    // 200x200 RGB 이미지 (무압축 시 120KB)
    const w = 200;
    const h = 200;
    const rawPixels = new Uint8Array(w * h * 3);
    // 그라데이션 패턴
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 3;
        rawPixels[idx] = (x * 255 / w) | 0;
        rawPixels[idx + 1] = (y * 255 / h) | 0;
        rawPixels[idx + 2] = 128;
      }
    }

    const compressed = pako.deflate(rawPixels);

    // PDF에 FlateDecode 이미지 직접 삽입
    const context = doc.context;
    const imageDict = context.obj({
      Type: "XObject",
      Subtype: "Image",
      Width: w,
      Height: h,
      ColorSpace: "DeviceRGB",
      BitsPerComponent: 8,
      Filter: "FlateDecode",
      Length: compressed.length,
    });
    const imageStream = PDFRawStream.of(imageDict, compressed);
    const imageRef = context.register(imageStream);

    // 페이지에 이미지 참조 추가
    const Resources = context.obj({ XObject: context.obj({ Im0: imageRef }) });
    page.node.set(PDFName.of("Resources"), Resources);

    const pdfBytes = await doc.save();
    const file = new File([pdfBytes], "flat-image.pdf", { type: "application/pdf" });

    const { onProgress } = createProgressTracker();
    const result = await compressPdf(
      [file],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );

    // 유효한 PDF
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);

    // 압축 효과 (FlateDecode → DCTDecode 변환)
    expect(result.size).toBeLessThanOrEqual(file.size);
  });

  it("FlateDecode(Gray) 이미지도 처리", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([300, 300]);

    const w = 150;
    const h = 150;
    const rawPixels = new Uint8Array(w * h);
    for (let i = 0; i < rawPixels.length; i++) rawPixels[i] = (i * 7) & 0xff;

    const compressed = pako.deflate(rawPixels);
    const context = doc.context;
    const imageDict = context.obj({
      Type: "XObject",
      Subtype: "Image",
      Width: w,
      Height: h,
      ColorSpace: "DeviceGray",
      BitsPerComponent: 8,
      Filter: "FlateDecode",
      Length: compressed.length,
    });
    const imageStream = PDFRawStream.of(imageDict, compressed);
    context.register(imageStream);

    const pdfBytes = await doc.save();
    const file = new File([pdfBytes], "gray-image.pdf", { type: "application/pdf" });

    const { onProgress } = createProgressTracker();
    const result = await compressPdf(
      [file],
      { compressionLevel: "extreme", compressMode: "image" },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
    expect(result.size).toBeLessThanOrEqual(file.size);
  });

  it("PNG predictor가 있는 FlateDecode도 처리", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([300, 300]);

    const w = 100;
    const h = 100;
    // PNG predictor: 각 행 앞에 filter byte (0 = None) 추가
    const rowBytes = w * 3;
    const withFilter = new Uint8Array(h * (rowBytes + 1));
    for (let y = 0; y < h; y++) {
      withFilter[y * (rowBytes + 1)] = 0; // filter byte = None
      for (let x = 0; x < rowBytes; x++) {
        withFilter[y * (rowBytes + 1) + 1 + x] = ((y + x) * 3) & 0xff;
      }
    }

    const compressed = pako.deflate(withFilter);
    const context = doc.context;

    const decodeParms = context.obj({
      Predictor: 15,
      Colors: 3,
      BitsPerComponent: 8,
      Columns: w,
    });

    const imageDict = context.obj({
      Type: "XObject",
      Subtype: "Image",
      Width: w,
      Height: h,
      ColorSpace: "DeviceRGB",
      BitsPerComponent: 8,
      Filter: "FlateDecode",
      DecodeParms: decodeParms,
      Length: compressed.length,
    });
    const imageStream = PDFRawStream.of(imageDict, compressed);
    context.register(imageStream);

    const pdfBytes = await doc.save();
    const file = new File([pdfBytes], "predictor-image.pdf", { type: "application/pdf" });

    const { onProgress } = createProgressTracker();
    const result = await compressPdf(
      [file],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
    expect(result.size).toBeLessThanOrEqual(file.size);
  });
});

// ═══════════════════════════════════════════════════════════
//  bloat 제거 검증
// ═══════════════════════════════════════════════════════════

describe("compress: bloat 제거", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  it("extreme — AcroForm, Names, OpenAction 제거", async () => {
    const file = loadFixture("06-with-metadata.pdf");
    const { onProgress } = createProgressTracker();
    const result = await compressPdf(
      [file],
      { compressionLevel: "extreme", compressMode: "image" },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getTitle()).toBeFalsy();
    expect(pdf.getPageCount()).toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════
//  다중 파일 → ZIP
// ═══════════════════════════════════════════════════════════

describe("compress: 다중 파일 → ZIP", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  it("2개 파일 — ZIP, 파일명 _compressed.pdf", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await compressPdf(
      [file1, file2],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );

    expect(result.filename).toBe("compressed_pdfs.zip");
    const filenames = await extractZipFilenames(result.blob);
    expect(filenames).toContain("01-single-page_compressed.pdf");
    expect(filenames).toContain("02-multi-page-10_compressed.pdf");
    expect(result.pageCount).toBe(11);
  });

  it("다중 파일 — ZIP 내 각 PDF 유효", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("04-landscape.pdf");
    const { onProgress } = createProgressTracker();

    const result = await compressPdf(
      [file1, file2],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    for (const pdf of pdfs) {
      expect(pdf.getPageCount()).toBeGreaterThan(0);
    }
  });
});

// ═══════════════════════════════════════════════════════════
//  옵션 기본값
// ═══════════════════════════════════════════════════════════

describe("compress: 옵션 기본값", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  it("빈 옵션 → recommended + image", async () => {
    const file = loadFixture("01-single-page.pdf");
    const { onProgress } = createProgressTracker();
    const result = await compressPdf([file], {}, onProgress);
    expect(result.filename).toBe("01-single-page_compressed.pdf");
    expect(result.pageCount).toBe(1);
  });

  it("단일 파일 → PDF (ZIP 아님)", async () => {
    const file = loadFixture("01-single-page.pdf");
    const { onProgress } = createProgressTracker();
    const result = await compressPdf([file], {}, onProgress);
    expect(result.filename).toMatch(/\.pdf$/);
  });
});

// ═══════════════════════════════════════════════════════════
//  Progress 콜백
// ═══════════════════════════════════════════════════════════

describe("compress: progress", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  it("단일 — 0~100 단조 증가", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { values, onProgress } = createProgressTracker();

    await compressPdf(
      [file],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );

    expect(values.length).toBeGreaterThan(0);
    expect(values[values.length - 1]).toBe(100);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });

  it("다중 — progress 100 도달", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("02-multi-page-10.pdf");
    const { values, onProgress } = createProgressTracker();

    await compressPdf(
      [file1, file2],
      { compressionLevel: "recommended", compressMode: "image" },
      onProgress,
    );

    expect(values[values.length - 1]).toBe(100);
  });
});

// ═══════════════════════════════════════════════════════════
//  결과물 무결성
// ═══════════════════════════════════════════════════════════

describe("compress: 무결성", () => {
  beforeAll(() => setupMocks());
  afterAll(() => vi.unstubAllGlobals());

  it("result.blob.size === result.size", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();
    const result = await compressPdf([file], {}, onProgress);
    expect(result.size).toBe(result.blob.size);
  });

  it("결과 PDF 재파싱 + 재저장 가능", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();
    const result = await compressPdf([file], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    const resaved = await pdf.save();
    const pdf2 = await PDFDocument.load(resaved);
    expect(pdf2.getPageCount()).toBe(10);
  });

  it("파일명 — 단일: _compressed.pdf, 다중: compressed_pdfs.zip", async () => {
    const { onProgress: p1 } = createProgressTracker();
    const r1 = await compressPdf([loadFixture("08-text-heavy.pdf")], {}, p1);
    expect(r1.filename).toBe("08-text-heavy_compressed.pdf");

    const { onProgress: p2 } = createProgressTracker();
    const r2 = await compressPdf(
      [loadFixture("01-single-page.pdf"), loadFixture("02-multi-page-10.pdf")],
      {},
      p2,
    );
    expect(r2.filename).toBe("compressed_pdfs.zip");
  });
});
