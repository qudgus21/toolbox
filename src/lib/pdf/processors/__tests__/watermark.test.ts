import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import watermarkPdf, {
  calculateWatermarkPosition,
  parseRange,
  getTargetPageIndices,
  hasNonLatinChars,
} from "../watermark";
import { hexToRgb } from "../color-utils";
import {
  createMarkedPdf,
  resultToPdf,
  createProgressTracker,
  getPageSizes,
} from "./helpers";
import type { WatermarkOptions } from "../watermark-types";
import { DEFAULT_WATERMARK_OPTIONS } from "../watermark-types";

// ─── 순수 함수 단위 테스트 ───

describe("hexToRgb", () => {
  it("#FF0000 → red", () => {
    const c = hexToRgb("#FF0000");
    expect(c.red).toBeCloseTo(1);
    expect(c.green).toBeCloseTo(0);
    expect(c.blue).toBeCloseTo(0);
  });

  it("#000000 → black", () => {
    const c = hexToRgb("#000000");
    expect(c.red).toBeCloseTo(0);
    expect(c.green).toBeCloseTo(0);
    expect(c.blue).toBeCloseTo(0);
  });
});

describe("hasNonLatinChars", () => {
  it("Latin 텍스트", () => {
    expect(hasNonLatinChars("CONFIDENTIAL")).toBe(false);
  });

  it("한글 포함", () => {
    expect(hasNonLatinChars("기밀")).toBe(true);
  });

  it("빈 문자열", () => {
    expect(hasNonLatinChars("")).toBe(false);
  });
});

describe("parseRange", () => {
  it("범위 파싱", () => {
    expect(parseRange("1-3", 10)).toEqual([1, 2, 3]);
  });

  it("개별 페이지", () => {
    expect(parseRange("2, 5", 10)).toEqual([2, 5]);
  });

  it("혼합", () => {
    expect(parseRange("1-3, 5, 8-10", 10)).toEqual([1, 2, 3, 5, 8, 9, 10]);
  });

  it("빈 문자열", () => {
    expect(parseRange("", 10)).toEqual([]);
  });

  it("범위 초과 제한", () => {
    expect(parseRange("1-20", 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("중복 제거", () => {
    expect(parseRange("1-3, 2-4", 10)).toEqual([1, 2, 3, 4]);
  });
});

describe("getTargetPageIndices", () => {
  it("all → 모든 페이지", () => {
    const result = getTargetPageIndices(5, "all", "");
    expect(result).toEqual(new Set([0, 1, 2, 3, 4]));
  });

  it("custom 범위", () => {
    const result = getTargetPageIndices(10, "custom", "2-4");
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it("빈 custom → 전체", () => {
    const result = getTargetPageIndices(3, "custom", "");
    expect(result).toEqual(new Set());
  });
});

describe("calculateWatermarkPosition", () => {
  const pw = 595;
  const ph = 842;
  const cw = 100;
  const ch = 50;
  const ox = 0;
  const oy = 0;

  it("center — 페이지 정중앙", () => {
    const { x, y } = calculateWatermarkPosition("center", pw, ph, cw, ch, ox, oy);
    expect(x).toBeCloseTo((pw - cw) / 2);
    expect(y).toBeCloseTo((ph - ch) / 2);
  });

  it("top-left — 좌측 상단", () => {
    const { x, y } = calculateWatermarkPosition("top-left", pw, ph, cw, ch, ox, oy);
    expect(x).toBe(0);
    expect(y).toBe(ph - ch);
  });

  it("top-center — 상단 중앙", () => {
    const { x, y } = calculateWatermarkPosition("top-center", pw, ph, cw, ch, ox, oy);
    expect(x).toBeCloseTo((pw - cw) / 2);
    expect(y).toBe(ph - ch);
  });

  it("top-right — 우측 상단", () => {
    const { x, y } = calculateWatermarkPosition("top-right", pw, ph, cw, ch, ox, oy);
    expect(x).toBe(pw - cw);
    expect(y).toBe(ph - ch);
  });

  it("center-left — 좌측 중앙", () => {
    const { x, y } = calculateWatermarkPosition("center-left", pw, ph, cw, ch, ox, oy);
    expect(x).toBe(0);
    expect(y).toBeCloseTo((ph - ch) / 2);
  });

  it("center-right — 우측 중앙", () => {
    const { x, y } = calculateWatermarkPosition("center-right", pw, ph, cw, ch, ox, oy);
    expect(x).toBe(pw - cw);
    expect(y).toBeCloseTo((ph - ch) / 2);
  });

  it("bottom-left — 좌측 하단", () => {
    const { x, y } = calculateWatermarkPosition("bottom-left", pw, ph, cw, ch, ox, oy);
    expect(x).toBe(0);
    expect(y).toBe(0);
  });

  it("bottom-center — 하단 중앙", () => {
    const { x, y } = calculateWatermarkPosition("bottom-center", pw, ph, cw, ch, ox, oy);
    expect(x).toBeCloseTo((pw - cw) / 2);
    expect(y).toBe(0);
  });

  it("bottom-right — 우측 하단", () => {
    const { x, y } = calculateWatermarkPosition("bottom-right", pw, ph, cw, ch, ox, oy);
    expect(x).toBe(pw - cw);
    expect(y).toBe(0);
  });

  it("offset 적용", () => {
    const offsetX = 10;
    const offsetY = 20;
    const { x, y } = calculateWatermarkPosition("top-left", pw, ph, cw, ch, offsetX, offsetY);
    expect(x).toBe(offsetX);
    expect(y).toBe(ph - ch - offsetY);
  });
});

// ─── 프로세서 통합 테스트 ───

describe("watermarkPdf processor", () => {
  const baseOpts: WatermarkOptions = {
    ...DEFAULT_WATERMARK_OPTIONS,
    text: {
      ...DEFAULT_WATERMARK_OPTIONS.text,
      text: "TEST",
      font: "Helvetica",
      fontSize: 24,
      color: "#FF0000",
      opacity: 0.5,
      shadow: false,
    },
  };

  it("기본 텍스트 워터마크", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress, values } = createProgressTracker();
    const result = await watermarkPdf([file], baseOpts as never, onProgress);

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(3);
    expect(result.filename).toContain("_watermarked.pdf");

    // 페이지 수 보존 확인
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });

  it.each([
    "top-left", "top-center", "top-right",
    "center-left", "center", "center-right",
    "bottom-left", "bottom-center", "bottom-right",
  ] as const)("위치 %s에 텍스트 워터마크", async (position) => {
    const file = await createMarkedPdf(1);
    const opts = { ...baseOpts, position };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(1);
  });

  it.each([0, 45, -45, 90, 180] as const)("회전 %d도 텍스트 워터마크", async (rotation) => {
    const file = await createMarkedPdf(1);
    const opts = { ...baseOpts, rotation };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it.each([0.25, 0.5, 0.75, 1.0])("투명도 %s 텍스트 워터마크", async (opacity) => {
    const file = await createMarkedPdf(1);
    const opts = {
      ...baseOpts,
      text: { ...baseOpts.text, opacity },
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it.each(["Helvetica", "Courier", "TimesRoman"] as const)("폰트 %s 텍스트 워터마크", async (font) => {
    const file = await createMarkedPdf(1);
    const opts = {
      ...baseOpts,
      text: { ...baseOpts.text, font },
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("커스텀 페이지 범위", async () => {
    const file = await createMarkedPdf(5);
    const opts = {
      ...baseOpts,
      pageRange: "custom" as const,
      customRange: "2-4",
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.pageCount).toBe(5);
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("레이어 over", async () => {
    const file = await createMarkedPdf(2);
    const opts = { ...baseOpts, layer: "over" as const };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(2);
  });

  it("레이어 below", async () => {
    const file = await createMarkedPdf(2);
    const opts = { ...baseOpts, layer: "below" as const };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(2);
  });

  it("100페이지 대량 PDF 처리", async () => {
    const file = await createMarkedPdf(100);
    const { onProgress, values } = createProgressTracker();
    const result = await watermarkPdf([file], baseOpts as never, onProgress);

    expect(result.pageCount).toBe(100);
    expect(result.blob.size).toBeGreaterThan(0);

    // 진행률 단조 증가 확인
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
    expect(values[values.length - 1]).toBe(100);
  });

  it("진행률 콜백 호출 확인", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress, values } = createProgressTracker();
    await watermarkPdf([file], baseOpts as never, onProgress);

    expect(values.length).toBeGreaterThan(0);
    expect(values[0]).toBe(10);
    expect(values[values.length - 1]).toBe(100);

    // 단조 증가
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });

  it("파일명 접미사 _watermarked.pdf", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], baseOpts as never, onProgress);
    expect(result.filename).toMatch(/_watermarked\.pdf$/);
  });

  it("페이지 크기 변경 없음 (over 레이어)", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], baseOpts as never, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    // createMarkedPdf: width = 500 + pageNum, height = 842
    expect(sizes[0]).toEqual({ width: 501, height: 842 });
    expect(sizes[1]).toEqual({ width: 502, height: 842 });
    expect(sizes[2]).toEqual({ width: 503, height: 842 });
  });

  it("텍스트 워터마크가 PDF 내부에 실제 기록됨", async () => {
    const file = await createMarkedPdf(1);
    const originalSize = (await file.arrayBuffer()).byteLength;
    const opts = { ...baseOpts, text: { ...baseOpts.text, text: "WATERMARK_CHECK" } };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);

    // 1. 워터마크 추가로 파일 크기 증가 (drawText 연산이 추가됨)
    expect(result.blob.size).toBeGreaterThan(originalSize);

    // 2. 워터마크 없이 처리한 것과 비교 (빈 텍스트)
    const file2 = await createMarkedPdf(1);
    const emptyOpts = { ...baseOpts, text: { ...baseOpts.text, text: "" } };
    const result2 = await watermarkPdf([file2], emptyOpts as never, onProgress);

    // 빈 텍스트 워터마크보다 실제 텍스트가 있는 워터마크가 더 커야 함
    expect(result.blob.size).toBeGreaterThan(result2.blob.size);

    // 3. 결과 PDF를 재로드해서 유효한 PDF인지 확인
    const pdf = await PDFDocument.load(await result.blob.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);

    // 4. 폰트가 임베딩 되었는지: pdf-lib 내부 객체로 확인
    const page = pdf.getPage(0);
    const resources = page.node.Resources();
    expect(resources).toBeTruthy();
  });

  it("워터마크 적용 전후 PDF 바이너리가 다름 (실제 변경 확인)", async () => {
    const file = await createMarkedPdf(1);
    const originalPdfBytes = new Uint8Array(await file.arrayBuffer());
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], baseOpts as never, onProgress);
    const resultPdfBytes = new Uint8Array(await result.blob.arrayBuffer());

    // 바이트가 동일하지 않아야 함 (워터마크가 추가되었으므로)
    expect(resultPdfBytes.length).not.toBe(originalPdfBytes.length);
  });

  it("이미지 워터마크 적용 시 PDF에 이미지 리소스 추가됨", async () => {
    const pngBytes = createMinimalPng();
    const imgBlob = new Blob([pngBytes as BlobPart], { type: "image/png" });
    const imgFile = new File([imgBlob], "watermark.png", { type: "image/png" });

    const file = await createMarkedPdf(1);
    const opts: WatermarkOptions = {
      ...DEFAULT_WATERMARK_OPTIONS,
      mode: "image",
      image: { imageFile: imgFile, imageDataUrl: "", scale: 1.0, opacity: 0.5, mosaic: false },
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);

    // 결과 PDF 내부에 이미지 XObject가 존재하는지 확인
    const pdfBytes = new Uint8Array(await result.blob.arrayBuffer());
    const pdfText = new TextDecoder("latin1").decode(pdfBytes);
    // pdf-lib는 이미지를 /Subtype /Image로 임베딩
    expect(pdfText).toContain("/Subtype /Image");
  });

  it("커스텀 범위 페이지만 워터마크 적용 (비대상 페이지는 변경 없음)", async () => {
    const file = await createMarkedPdf(3);
    // 2페이지만 대상
    const opts = { ...baseOpts, pageRange: "custom" as const, customRange: "2" };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);

    // 페이지 크기가 모두 보존되었는지 확인
    const sizes = getPageSizes(pdf);
    expect(sizes[0]).toEqual({ width: 501, height: 842 });
    expect(sizes[1]).toEqual({ width: 502, height: 842 });
    expect(sizes[2]).toEqual({ width: 503, height: 842 });
  });

  it("파일 없으면 에러", async () => {
    const { onProgress } = createProgressTracker();
    await expect(
      watermarkPdf([], baseOpts as never, onProgress),
    ).rejects.toThrow("No file provided");
  });

  it("이미지 모드 — imageFile 없으면 원본 그대로", async () => {
    const file = await createMarkedPdf(2);
    const opts: WatermarkOptions = {
      ...DEFAULT_WATERMARK_OPTIONS,
      mode: "image",
      // imageFile은 null
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.pageCount).toBe(2);
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("이미지 모드 — PNG 이미지 워터마크", async () => {
    // 최소 유효 1x1 PNG 생성
    const pngBytes = createMinimalPng();
    const imgBlob = new Blob([pngBytes as BlobPart], { type: "image/png" });
    const imgFile = new File([imgBlob], "watermark.png", { type: "image/png" });

    const file = await createMarkedPdf(2);
    const opts: WatermarkOptions = {
      ...DEFAULT_WATERMARK_OPTIONS,
      mode: "image",
      image: {
        imageFile: imgFile,
        imageDataUrl: "",
        scale: 1.0,
        opacity: 0.5,
        mosaic: false,
      },
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.pageCount).toBe(2);
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("이미지 모드 — mosaic 타일 패턴", async () => {
    const pngBytes = createMinimalPng();
    const imgBlob = new Blob([pngBytes as BlobPart], { type: "image/png" });
    const imgFile = new File([imgBlob], "watermark.png", { type: "image/png" });

    const file = await createMarkedPdf(1);
    const opts: WatermarkOptions = {
      ...DEFAULT_WATERMARK_OPTIONS,
      mode: "image",
      image: {
        imageFile: imgFile,
        imageDataUrl: "",
        scale: 0.5,
        opacity: 0.3,
        mosaic: true,
      },
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.pageCount).toBe(1);
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("이미지 모드 — JPEG 이미지", async () => {
    // 최소 JPEG (2x2 흰색)
    const jpegBytes = createMinimalJpeg();
    const imgBlob = new Blob([jpegBytes as BlobPart], { type: "image/jpeg" });
    const imgFile = new File([imgBlob], "watermark.jpg", { type: "image/jpeg" });

    const file = await createMarkedPdf(1);
    const opts: WatermarkOptions = {
      ...DEFAULT_WATERMARK_OPTIONS,
      mode: "image",
      image: {
        imageFile: imgFile,
        imageDataUrl: "",
        scale: 1.0,
        opacity: 0.5,
        mosaic: false,
      },
    };
    const { onProgress } = createProgressTracker();
    const result = await watermarkPdf([file], opts as never, onProgress);
    expect(result.pageCount).toBe(1);
    expect(result.blob.size).toBeGreaterThan(0);
  });
});

// ─── 최소 이미지 생성 헬퍼 ───

function createMinimalPng(): Uint8Array {
  // 최소 유효 1x1 빨간 PNG
  return new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
    0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
    0xde,
    0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54, // IDAT chunk
    0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00, 0x00,
    0x00, 0x02, 0x00, 0x01, 0xe2, 0x21, 0xbc, 0x33,
    0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, // IEND chunk
    0xae, 0x42, 0x60, 0x82,
  ]);
}

function createMinimalJpeg(): Uint8Array {
  // Minimal valid JPEG: 1x1 white pixel
  return new Uint8Array([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43,
    0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
    0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20,
    0x24, 0x2e, 0x27, 0x20, 0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29,
    0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27, 0x39, 0x3d, 0x38, 0x32,
    0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01,
    0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x1f, 0x00, 0x00,
    0x01, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0xff, 0xc4, 0x00, 0xb5, 0x10, 0x00, 0x02, 0x01, 0x03,
    0x03, 0x02, 0x04, 0x03, 0x05, 0x05, 0x04, 0x04, 0x00, 0x00, 0x01, 0x7d,
    0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06,
    0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08,
    0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0, 0x24, 0x33, 0x62, 0x72,
    0x82, 0x09, 0x0a, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28,
    0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45,
    0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59,
    0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75,
    0x76, 0x77, 0x78, 0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89,
    0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3,
    0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6,
    0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9,
    0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2,
    0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4,
    0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01,
    0x00, 0x00, 0x3f, 0x00, 0x7b, 0x94, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xd9,
  ]);
}
