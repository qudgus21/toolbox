/**
 * 이미지 추출 테스트용 PDF 픽스처 생성 스크립트
 *
 * 실행: npx tsx test-fixtures/scripts/generate-image-pdfs.ts
 *
 * 생성되는 파일:
 *   13-multi-jpeg-per-page.pdf     — 한 페이지에 JPEG 이미지 4개
 *   14-mixed-formats.pdf           — JPEG + FlateDecode(PNG) 혼합, 페이지별 다수
 *   15-many-images-grid.pdf        — 3페이지, 페이지당 6개 이미지 (총 18개)
 *   16-various-sizes.pdf           — 크고 작은 이미지 혼합 (필터링 테스트)
 *   17-grayscale-cmyk.pdf          — DeviceGray + DeviceCMYK 이미지
 *   18-with-smask.pdf              — SMask(알파 채널) 포함 이미지
 */

import { writeFileSync } from "fs";
import { resolve } from "path";
import { PDFDocument, PDFName, PDFNumber, PDFArray, PDFRef } from "pdf-lib";
import pako from "pako";

const OUT_DIR = resolve(__dirname, "../../../test-fixtures/pdf");

// ─── Minimal valid JPEG (SOI + APP0 + quantization + SOF0 + SOS + EOI) ───

function createJpeg(width: number, height: number): Uint8Array {
  // Minimal but structurally valid JPEG with correct dimensions in SOF0
  const w1 = (width >> 8) & 0xff;
  const w2 = width & 0xff;
  const h1 = (height >> 8) & 0xff;
  const h2 = height & 0xff;

  return new Uint8Array([
    // SOI
    0xff, 0xd8,
    // APP0 (JFIF)
    0xff, 0xe0, 0x00, 0x10,
    0x4a, 0x46, 0x49, 0x46, 0x00, // "JFIF\0"
    0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
    // DQT (quantization table)
    0xff, 0xdb, 0x00, 0x43, 0x00,
    ...Array(64).fill(1),
    // SOF0 (baseline DCT)
    0xff, 0xc0, 0x00, 0x0b,
    0x08,              // precision
    h1, h2,            // height
    w1, w2,            // width
    0x01,              // components
    0x01, 0x11, 0x00,  // component 1
    // DHT (Huffman table - minimal DC)
    0xff, 0xc4, 0x00, 0x1f, 0x00,
    0x00, 0x01, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    // SOS
    0xff, 0xda, 0x00, 0x08,
    0x01, 0x01, 0x00,
    0x00, 0x3f, 0x00,
    0x00,  // minimal scan data
    // EOI
    0xff, 0xd9,
  ]);
}

// ─── Raw RGB pixel data for FlateDecode images ───

function createRgbPixels(width: number, height: number, seed: number): Uint8Array {
  const data = new Uint8Array(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      data[i] = ((x + seed) * 37) & 0xff;       // R
      data[i + 1] = ((y + seed) * 53) & 0xff;    // G
      data[i + 2] = ((x + y + seed) * 71) & 0xff; // B
    }
  }
  return data;
}

function createGrayPixels(width: number, height: number, seed: number): Uint8Array {
  const data = new Uint8Array(width * height);
  for (let i = 0; i < data.length; i++) {
    data[i] = ((i + seed) * 41) & 0xff;
  }
  return data;
}

function createCmykPixels(width: number, height: number, seed: number): Uint8Array {
  const data = new Uint8Array(width * height * 4);
  for (let i = 0; i < data.length; i++) {
    data[i] = ((i + seed) * 29) & 0xff;
  }
  return data;
}

// ─── Helpers to embed images in PDF ───

function embedJpegImage(
  context: PDFDocument["context"],
  page: ReturnType<PDFDocument["addPage"]>,
  jpegBytes: Uint8Array,
  width: number,
  height: number,
  name: string,
) {
  const streamRef = context.register(
    context.stream(jpegBytes, {
      Type: "XObject",
      Subtype: "Image",
      Width: width,
      Height: height,
      ColorSpace: "DeviceRGB",
      BitsPerComponent: 8,
      Filter: "DCTDecode",
    }),
  );
  addXObjectToPage(context, page, streamRef, name);
}

function embedFlateImage(
  context: PDFDocument["context"],
  page: ReturnType<PDFDocument["addPage"]>,
  rawPixels: Uint8Array,
  width: number,
  height: number,
  colorSpace: string,
  name: string,
) {
  const compressed = pako.deflate(rawPixels);
  const streamRef = context.register(
    context.stream(compressed, {
      Type: "XObject",
      Subtype: "Image",
      Width: width,
      Height: height,
      ColorSpace: colorSpace,
      BitsPerComponent: 8,
      Filter: "FlateDecode",
    }),
  );
  addXObjectToPage(context, page, streamRef, name);
}

function addXObjectToPage(
  context: PDFDocument["context"],
  page: ReturnType<PDFDocument["addPage"]>,
  streamRef: PDFRef,
  name: string,
) {
  const resources = page.node.get(PDFName.of("Resources"));
  if (resources && "get" in resources) {
    let xObjDict = (resources as any).get(PDFName.of("XObject"));
    if (!xObjDict) {
      xObjDict = context.obj({});
      (resources as any).set(PDFName.of("XObject"), xObjDict);
    }
    xObjDict.set(PDFName.of(name), streamRef);
  }
}

function save(bytes: Uint8Array, filename: string) {
  const path = resolve(OUT_DIR, filename);
  writeFileSync(path, bytes);
  console.log(`  ✓ ${filename} (${(bytes.length / 1024).toFixed(1)} KB)`);
}

// ═══════════════════════════════════════════════════════════════
//  13-multi-jpeg-per-page.pdf
//  한 페이지에 JPEG 이미지 4개 (서로 다른 크기)
// ═══════════════════════════════════════════════════════════════

async function generate13() {
  const doc = await PDFDocument.create();
  const ctx = doc.context;
  const page = doc.addPage([612, 792]);

  const sizes = [
    { w: 200, h: 150 },
    { w: 300, h: 200 },
    { w: 150, h: 250 },
    { w: 400, h: 100 },
  ];

  for (let i = 0; i < sizes.length; i++) {
    const { w, h } = sizes[i];
    const jpeg = createJpeg(w, h);
    embedJpegImage(ctx, page, jpeg, w, h, `Im${i}`);
  }

  save(await doc.save(), "13-multi-jpeg-per-page.pdf");
}

// ═══════════════════════════════════════════════════════════════
//  14-mixed-formats.pdf
//  2페이지: JPEG + FlateDecode(RGB) 혼합
//  페이지 1: JPEG 2개 + FlateDecode 1개
//  페이지 2: FlateDecode 2개 + JPEG 1개
// ═══════════════════════════════════════════════════════════════

async function generate14() {
  const doc = await PDFDocument.create();
  const ctx = doc.context;

  // Page 1
  const p1 = doc.addPage([612, 792]);
  embedJpegImage(ctx, p1, createJpeg(250, 180), 250, 180, "Im0");
  embedJpegImage(ctx, p1, createJpeg(320, 240), 320, 240, "Im1");
  embedFlateImage(ctx, p1, createRgbPixels(200, 200, 42), 200, 200, "DeviceRGB", "Im2");

  // Page 2
  const p2 = doc.addPage([612, 792]);
  embedFlateImage(ctx, p2, createRgbPixels(300, 150, 77), 300, 150, "DeviceRGB", "Im3");
  embedFlateImage(ctx, p2, createRgbPixels(160, 200, 13), 160, 200, "DeviceRGB", "Im4");
  embedJpegImage(ctx, p2, createJpeg(400, 300), 400, 300, "Im5");

  save(await doc.save(), "14-mixed-formats.pdf");
}

// ═══════════════════════════════════════════════════════════════
//  15-many-images-grid.pdf
//  3페이지, 페이지당 6개 이미지 (총 18개) — 대량 추출 테스트
// ═══════════════════════════════════════════════════════════════

async function generate15() {
  const doc = await PDFDocument.create();
  const ctx = doc.context;

  for (let pageIdx = 0; pageIdx < 3; pageIdx++) {
    const page = doc.addPage([612, 792]);

    for (let imgIdx = 0; imgIdx < 6; imgIdx++) {
      const globalIdx = pageIdx * 6 + imgIdx;
      const w = 100 + (imgIdx * 30);
      const h = 80 + (imgIdx * 20);

      if (imgIdx % 2 === 0) {
        embedJpegImage(ctx, page, createJpeg(w, h), w, h, `Im${globalIdx}`);
      } else {
        embedFlateImage(ctx, page, createRgbPixels(w, h, globalIdx), w, h, "DeviceRGB", `Im${globalIdx}`);
      }
    }
  }

  save(await doc.save(), "15-many-images-grid.pdf");
}

// ═══════════════════════════════════════════════════════════════
//  16-various-sizes.pdf
//  큰 이미지 + 작은 이미지(MIN_IMAGE_AREA 미만) 혼합
//  필터링 로직 검증용
// ═══════════════════════════════════════════════════════════════

async function generate16() {
  const doc = await PDFDocument.create();
  const ctx = doc.context;
  const page = doc.addPage([612, 792]);

  // 큰 이미지 (추출 대상)
  embedJpegImage(ctx, page, createJpeg(800, 600), 800, 600, "ImBig1");
  embedJpegImage(ctx, page, createJpeg(500, 400), 500, 400, "ImBig2");
  embedFlateImage(ctx, page, createRgbPixels(300, 300, 99), 300, 300, "DeviceRGB", "ImBig3");

  // 작은 이미지 (MIN_IMAGE_AREA = 2500 미만, 필터링 대상)
  embedJpegImage(ctx, page, createJpeg(20, 20), 20, 20, "ImTiny1");   // 400 < 2500
  embedJpegImage(ctx, page, createJpeg(10, 10), 10, 10, "ImTiny2");   // 100 < 2500
  embedJpegImage(ctx, page, createJpeg(49, 49), 49, 49, "ImTiny3");   // 2401 < 2500

  // 경계값 (50×50 = 2500, 정확히 MIN_IMAGE_AREA)
  embedJpegImage(ctx, page, createJpeg(50, 50), 50, 50, "ImEdge");    // 2500 = 2500

  save(await doc.save(), "16-various-sizes.pdf");
}

// ═══════════════════════════════════════════════════════════════
//  17-grayscale-cmyk.pdf
//  DeviceGray + DeviceCMYK 색공간 이미지
// ═══════════════════════════════════════════════════════════════

async function generate17() {
  const doc = await PDFDocument.create();
  const ctx = doc.context;
  const page = doc.addPage([612, 792]);

  // DeviceGray 이미지 2개
  embedFlateImage(ctx, page, createGrayPixels(200, 200, 11), 200, 200, "DeviceGray", "ImGray1");
  embedFlateImage(ctx, page, createGrayPixels(150, 300, 22), 150, 300, "DeviceGray", "ImGray2");

  // DeviceCMYK 이미지 2개
  embedFlateImage(ctx, page, createCmykPixels(180, 180, 33), 180, 180, "DeviceCMYK", "ImCmyk1");
  embedFlateImage(ctx, page, createCmykPixels(250, 120, 44), 250, 120, "DeviceCMYK", "ImCmyk2");

  // DeviceRGB 1개 (비교용)
  embedFlateImage(ctx, page, createRgbPixels(200, 150, 55), 200, 150, "DeviceRGB", "ImRgb1");

  save(await doc.save(), "17-grayscale-cmyk.pdf");
}

// ═══════════════════════════════════════════════════════════════
//  18-with-smask.pdf
//  SMask(알파 채널) 포함 이미지
// ═══════════════════════════════════════════════════════════════

async function generate18() {
  const doc = await PDFDocument.create();
  const ctx = doc.context;
  const page = doc.addPage([612, 792]);

  const w = 200, h = 200;

  // Main RGB image
  const rgbPixels = createRgbPixels(w, h, 88);
  const rgbCompressed = pako.deflate(rgbPixels);

  // SMask (alpha channel) — gradient from opaque to transparent
  const alphaPixels = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      alphaPixels[y * w + x] = Math.round((x / w) * 255);
    }
  }
  const alphaCompressed = pako.deflate(alphaPixels);

  // Register SMask stream
  const smaskRef = ctx.register(
    ctx.stream(alphaCompressed, {
      Type: "XObject",
      Subtype: "Image",
      Width: w,
      Height: h,
      ColorSpace: "DeviceGray",
      BitsPerComponent: 8,
      Filter: "FlateDecode",
    }),
  );

  // Register main image with SMask reference
  const mainRef = ctx.register(
    ctx.stream(rgbCompressed, {
      Type: "XObject",
      Subtype: "Image",
      Width: w,
      Height: h,
      ColorSpace: "DeviceRGB",
      BitsPerComponent: 8,
      Filter: "FlateDecode",
      SMask: smaskRef,
    }),
  );

  addXObjectToPage(ctx, page, mainRef, "ImAlpha1");

  // 일반 이미지도 하나 추가 (비교용)
  embedJpegImage(ctx, page, createJpeg(300, 200), 300, 200, "ImNormal");

  save(await doc.save(), "18-with-smask.pdf");
}

// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log("Generating image extraction test PDFs...\n");

  await generate13();
  await generate14();
  await generate15();
  await generate16();
  await generate17();
  await generate18();

  console.log("\nDone!");
}

main().catch(console.error);
