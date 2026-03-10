import { describe, it, expect, vi, beforeAll } from "vitest";
import { PDFDocument, PDFName, PDFNumber } from "pdf-lib";
import JSZip from "jszip";
import pako from "pako";
import extractImages from "../extract-images";
import { createProgressTracker } from "./helpers";

/* ═══════════════════════════════════════════════════════════
 *  이미지 추출 프로세서 — 단위 테스트
 *
 *  pdf-lib로 이미지를 내장한 PDF를 합성하여
 *  프로세서의 DCTDecode/FlateDecode 분기 로직을 검증한다.
 * ═══════════════════════════════════════════════════════════ */

// ─── Minimal JPEG bytes (SOI + APP0 + EOI) ──────────────────

function createMinimalJpeg(): Uint8Array {
  return new Uint8Array([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00,
    0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
  ]);
}

// ─── Canvas / ImageBitmap mocking ──────────────────────────

beforeAll(() => {
  // Mock createImageBitmap
  vi.stubGlobal("createImageBitmap", async () => ({
    width: 100,
    height: 100,
    close: () => {},
  }));

  // Mock document.createElement for canvas
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
        toBlob: (cb: (b: Blob | null) => void) => {
          // Return a fake PNG blob
          cb(new Blob([new Uint8Array([0x89, 0x50, 0x4e, 0x47]) as BlobPart], { type: "image/png" }));
        },
      };
    }),
  });

  // Mock ImageData constructor
  vi.stubGlobal("ImageData", class {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    constructor(data: Uint8ClampedArray, w: number, h: number) {
      this.data = data;
      this.width = w;
      this.height = h;
    }
  });
});

// ─── PDF with embedded JPEG image ──────────────────────────

async function createPdfWithJpeg(imageCount = 1): Promise<File> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const context = doc.context;

  for (let i = 0; i < imageCount; i++) {
    const jpegBytes = createMinimalJpeg();
    const streamRef = context.register(
      context.stream(jpegBytes, {
        Type: "XObject",
        Subtype: "Image",
        Width: 100,
        Height: 100,
        ColorSpace: "DeviceRGB",
        BitsPerComponent: 8,
        Filter: "DCTDecode",
      }),
    );

    // Reference it on the page so it's in the PDF
    const resources = page.node.get(PDFName.of("Resources"));
    if (resources && "get" in resources) {
      let xObjDict = (resources as any).get(PDFName.of("XObject"));
      if (!xObjDict) {
        xObjDict = context.obj({});
        (resources as any).set(PDFName.of("XObject"), xObjDict);
      }
      xObjDict.set(PDFName.of(`Im${i}`), streamRef);
    }
  }

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "test-with-jpeg.pdf", { type: "application/pdf" });
}

// ─── PDF with embedded FlateDecode image ────────────────────

async function createPdfWithFlateImage(): Promise<File> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const context = doc.context;

  // Create raw RGB pixel data (100x100 = 30000 bytes)
  const w = 100;
  const h = 100;
  const rawPixels = new Uint8Array(w * h * 3);
  for (let i = 0; i < rawPixels.length; i++) {
    rawPixels[i] = (i * 7) & 0xff; // some pattern
  }

  // Compress with pako (no predictor)
  const compressed = pako.deflate(rawPixels);

  const streamRef = context.register(
    context.stream(compressed, {
      Type: "XObject",
      Subtype: "Image",
      Width: w,
      Height: h,
      ColorSpace: "DeviceRGB",
      BitsPerComponent: 8,
      Filter: "FlateDecode",
    }),
  );

  const resources = page.node.get(PDFName.of("Resources"));
  if (resources && "get" in resources) {
    let xObjDict = (resources as any).get(PDFName.of("XObject"));
    if (!xObjDict) {
      xObjDict = context.obj({});
      (resources as any).set(PDFName.of("XObject"), xObjDict);
    }
    xObjDict.set(PDFName.of("Im0"), streamRef);
  }

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "test-with-flate.pdf", { type: "application/pdf" });
}

// ─── PDF without images ────────────────────────────────────

async function createPdfWithoutImages(): Promise<File> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const font = await doc.embedFont("Helvetica" as never);
  page.drawText("No images here", { x: 50, y: 400, size: 24, font });

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "no-images.pdf", { type: "application/pdf" });
}

// ─── PDF with tiny image (should be skipped) ───────────────

async function createPdfWithTinyImage(): Promise<File> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const context = doc.context;

  // 10x10 = 100 pixels, below MIN_IMAGE_AREA (2500)
  const jpegBytes = createMinimalJpeg();
  const streamRef = context.register(
    context.stream(jpegBytes, {
      Type: "XObject",
      Subtype: "Image",
      Width: 10,
      Height: 10,
      ColorSpace: "DeviceRGB",
      BitsPerComponent: 8,
      Filter: "DCTDecode",
    }),
  );

  const resources = page.node.get(PDFName.of("Resources"));
  if (resources && "get" in resources) {
    let xObjDict = (resources as any).get(PDFName.of("XObject"));
    if (!xObjDict) {
      xObjDict = context.obj({});
      (resources as any).set(PDFName.of("XObject"), xObjDict);
    }
    xObjDict.set(PDFName.of("Im0"), streamRef);
  }

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "tiny-image.pdf", { type: "application/pdf" });
}

// ─── 테스트 ────────────────────────────────────────────────

describe("extract-images processor", () => {
  describe("DCTDecode (JPEG) 추출", () => {
    it("단일 JPEG 이미지 → 직접 JPG 파일 출력", async () => {
      const file = await createPdfWithJpeg(1);
      const tracker = createProgressTracker();

      const result = await extractImages([file], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.jpg$/);
      expect(result.blob.type).toBe("image/jpeg");
      expect(result.size).toBeGreaterThan(0);
      expect(result.pageCount).toBe(1);
    });

    it("다중 JPEG 이미지 → ZIP 파일 출력", async () => {
      const file = await createPdfWithJpeg(3);
      const tracker = createProgressTracker();

      const result = await extractImages([file], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.zip$/);
      expect(result.pageCount).toBe(3);

      const ab = await result.blob.arrayBuffer();
      const zip = await JSZip.loadAsync(ab);
      const names = Object.keys(zip.files).sort();
      expect(names).toHaveLength(3);
      expect(names.every((n) => n.endsWith(".jpg"))).toBe(true);
    });
  });

  describe("FlateDecode (PNG) 추출", () => {
    it("FlateDecode 이미지 → PNG로 변환 출력", async () => {
      const file = await createPdfWithFlateImage();
      const tracker = createProgressTracker();

      const result = await extractImages([file], {}, tracker.onProgress);

      expect(result.filename).toMatch(/\.png$/);
      expect(result.size).toBeGreaterThan(0);
      expect(result.pageCount).toBe(1);
    });
  });

  describe("에러 처리", () => {
    it("파일이 없으면 에러", async () => {
      const tracker = createProgressTracker();
      await expect(
        extractImages([], {}, tracker.onProgress),
      ).rejects.toThrow("No file provided");
    });

    it("이미지가 없는 PDF → NO_IMAGES_FOUND 에러", async () => {
      const file = await createPdfWithoutImages();
      const tracker = createProgressTracker();

      await expect(
        extractImages([file], {}, tracker.onProgress),
      ).rejects.toThrow("NO_IMAGES_FOUND");
    });

    it("작은 이미지(50×50 미만)는 제외 → NO_IMAGES_FOUND", async () => {
      const file = await createPdfWithTinyImage();
      const tracker = createProgressTracker();

      await expect(
        extractImages([file], {}, tracker.onProgress),
      ).rejects.toThrow("NO_IMAGES_FOUND");
    });
  });

  describe("진행률 추적", () => {
    it("progress가 0~100 범위에서 단조 증가", async () => {
      const file = await createPdfWithJpeg(2);
      const tracker = createProgressTracker();

      await extractImages([file], {}, tracker.onProgress);

      expect(tracker.values.length).toBeGreaterThan(0);
      expect(tracker.values[tracker.values.length - 1]).toBe(100);

      for (let i = 1; i < tracker.values.length; i++) {
        expect(tracker.values[i]).toBeGreaterThanOrEqual(tracker.values[i - 1]);
      }
    });
  });

  describe("파일명", () => {
    it("단일 이미지: baseName_image_1.ext", async () => {
      const file = await createPdfWithJpeg(1);
      const tracker = createProgressTracker();
      const result = await extractImages([file], {}, tracker.onProgress);

      expect(result.filename).toBe("test-with-jpeg_image_1.jpg");
    });

    it("다중 이미지: baseName_images.zip", async () => {
      const file = await createPdfWithJpeg(3);
      const tracker = createProgressTracker();
      const result = await extractImages([file], {}, tracker.onProgress);

      expect(result.filename).toBe("test-with-jpeg_images.zip");
    });
  });
});
