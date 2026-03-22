import {
  PDFDocument,
  StandardFonts,
  degrees,
  type PDFFont,
  type PDFImage,
  type PDFPage,
} from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";
import { hexToRgb } from "./color-utils";
import type {
  WatermarkOptions,
  WatermarkPosition,
  WatermarkFont,
  WatermarkLayer,
} from "./watermark-types";

const MM_TO_PT = 72 / 25.4;

// ─── Helpers ──────────────────────────────────────────────────

function hasNonLatinChars(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 0xff) return true;
  }
  return false;
}

/** Canvas로 텍스트를 렌더링해서 PNG bytes 반환 (CJK/웹폰트 + 그림자 지원) */
async function textToImage(
  content: string,
  fontSize: number,
  fontFamily: string,
  fontColor: string,
  bold: boolean,
  shadow: boolean,
): Promise<{ pngBytes: Uint8Array; width: number; height: number }> {
  const scale = 3;
  const padding = shadow ? 6 : 2;
  const fontStr = `${bold ? "bold " : ""}${fontSize}px ${fontFamily}, sans-serif`;

  const measure = document.createElement("canvas");
  const mCtx = measure.getContext("2d")!;
  mCtx.font = fontStr;
  const tw = mCtx.measureText(content).width;

  const width = Math.ceil(tw) + padding * 2;
  const height = Math.ceil(fontSize * 1.3) + padding * 2;

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, width, height);

  if (shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  ctx.font = fontStr;
  ctx.fillStyle = fontColor;
  ctx.textBaseline = "top";
  ctx.fillText(content, padding, padding);

  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => b ? res(b) : rej(new Error("Canvas toBlob returned null")), "image/png"),
  );
  measure.width = 0; measure.height = 0;
  canvas.width = 0; canvas.height = 0;
  return {
    pngBytes: new Uint8Array(await blob.arrayBuffer()),
    width,
    height,
  };
}

// ─── 대상 페이지 ───

function parseRange(rangeStr: string, totalPages: number): number[] {
  const result: number[] = [];
  if (!rangeStr.trim()) return [];
  for (const part of rangeStr.split(",")) {
    const trimmed = part.trim();
    const match = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
    if (match) {
      const start = Math.max(1, parseInt(match[1], 10));
      const end = Math.min(totalPages, parseInt(match[2], 10));
      for (let i = start; i <= end; i++) result.push(i);
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) result.push(num);
    }
  }
  return [...new Set(result)].sort((a, b) => a - b);
}

function getTargetPageIndices(
  totalPages: number,
  pageRange: "all" | "custom",
  customRange: string,
): Set<number> {
  if (pageRange === "all") {
    return new Set(Array.from({ length: totalPages }, (_, i) => i));
  }
  return new Set(parseRange(customRange, totalPages).map((p) => p - 1));
}

// ─── 위치 계산 (9그리드) ───

/**
 * 회전 후 바운딩 박스 크기 계산
 * pdf-lib의 rotate는 (x,y) 기준점을 중심으로 회전하므로,
 * 위치 계산에는 회전 후의 바운딩 박스를 사용해야 함
 */
function getRotatedBounds(
  w: number,
  h: number,
  angleDeg: number,
): { width: number; height: number } {
  const rad = (Math.abs(angleDeg) * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  return {
    width: w * cos + h * sin,
    height: w * sin + h * cos,
  };
}

function calculateWatermarkPosition(
  position: WatermarkPosition,
  pageWidth: number,
  pageHeight: number,
  contentWidth: number,
  contentHeight: number,
  offsetXPt: number,
  offsetYPt: number,
): { x: number; y: number } {
  let x: number;
  let y: number;

  // 수평
  if (position.includes("left")) {
    x = offsetXPt;
  } else if (position.includes("right")) {
    x = pageWidth - contentWidth - offsetXPt;
  } else {
    x = (pageWidth - contentWidth) / 2 + offsetXPt;
  }

  // 수직 (pdf-lib: y=0은 페이지 하단)
  if (position.startsWith("top")) {
    y = pageHeight - contentHeight - offsetYPt;
  } else if (position.startsWith("bottom")) {
    y = offsetYPt;
  } else {
    // center 행
    y = (pageHeight - contentHeight) / 2 - offsetYPt;
  }

  return { x, y };
}

/**
 * 회전을 고려한 최종 드로우 좌표 계산
 *
 * pdf-lib의 drawText/drawImage rotate는 (x, y) 좌표를 기준으로 회전합니다.
 * 즉 (x, y)는 회전 전 콘텐츠의 좌하단이고, 그 점을 중심으로 콘텐츠가 회전합니다.
 *
 * 전략:
 * 1. 회전 후 바운딩 박스 크기로 9그리드 위치 계산 (바운딩 박스가 원하는 위치에 맞춤)
 * 2. 바운딩 박스의 중심점(targetCx, targetCy) 도출
 * 3. 회전된 콘텐츠의 좌하단 꼭짓점에서 중심까지의 오프셋을 역산
 * 4. 최종 (x, y) = 중심 - 오프셋
 */
function getRotatedDrawPosition(
  position: WatermarkPosition,
  pw: number, ph: number,
  contentW: number, contentH: number,
  offsetXPt: number, offsetYPt: number,
  angleDeg: number,
): { x: number; y: number } {
  // 1. 회전 후 바운딩 박스
  const bounds = getRotatedBounds(contentW, contentH, angleDeg);

  // 2. 바운딩 박스 위치
  const { x: bx, y: by } = calculateWatermarkPosition(
    position, pw, ph, bounds.width, bounds.height, offsetXPt, offsetYPt,
  );

  // 바운딩 박스 중심
  const cx = bx + bounds.width / 2;
  const cy = by + bounds.height / 2;

  // 3. 회전 전 콘텐츠의 좌하단(0,0)에서 중심까지 = (w/2, h/2)
  //    이를 angleDeg만큼 회전: R(angle) * (w/2, h/2)
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const halfW = contentW / 2;
  const halfH = contentH / 2;

  // 회전된 중심 오프셋 (기준점 → 회전된 콘텐츠 중심)
  const rotCx = halfW * cos - halfH * sin;
  const rotCy = halfW * sin + halfH * cos;

  // 4. 기준점(x, y) = 원하는 중심 - 회전된 중심 오프셋
  return {
    x: cx - rotCx,
    y: cy - rotCy,
  };
}

// ─── 폰트 매핑 ───

const FONT_MAP: Partial<Record<WatermarkFont, keyof typeof StandardFonts>> = {
  Helvetica: "Helvetica",
  HelveticaBold: "HelveticaBold",
  TimesRoman: "TimesRoman",
  TimesRomanBold: "TimesRomanBold",
  Courier: "Courier",
  CourierBold: "CourierBold",
};

const CSS_FONT_MAP: Record<WatermarkFont, string> = {
  Helvetica: "Helvetica, Arial, sans-serif",
  HelveticaBold: "Helvetica, Arial, sans-serif",
  TimesRoman: "Times New Roman, serif",
  TimesRomanBold: "Times New Roman, serif",
  Courier: "Courier New, monospace",
  CourierBold: "Courier New, monospace",
  Georgia: "Georgia, serif",
  Verdana: "Verdana, sans-serif",
};

function isBoldFont(font: WatermarkFont): boolean {
  return font.endsWith("Bold");
}

// ─── 이미지 변환 헬퍼 ───

async function imageFileToBytes(file: File): Promise<{ bytes: Uint8Array; isPng: boolean }> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
  return { bytes, isPng };
}

/** 비-PNG/JPG 이미지를 Canvas를 통해 PNG로 변환 */
async function convertToPng(file: File): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => b ? res(b) : rej(new Error("Canvas toBlob returned null")), "image/png"),
  );
  canvas.width = 0; canvas.height = 0;
  return new Uint8Array(await blob.arrayBuffer());
}

// ─── 텍스트 워터마크 그리기 ───

async function drawTextWatermark(
  doc: PDFDocument,
  page: PDFPage,
  pw: number,
  ph: number,
  opts: WatermarkOptions,
  font: PDFFont | null,
) {
  const textOpts = opts.text;
  const offsetXPt = opts.offsetX * MM_TO_PT;
  const offsetYPt = opts.offsetY * MM_TO_PT;
  const useCanvas = !font || hasNonLatinChars(textOpts.text);
  const rotation = opts.rotation;

  if (useCanvas) {
    const cssFont = CSS_FONT_MAP[textOpts.font] || "sans-serif";
    const bold = isBoldFont(textOpts.font);
    const { pngBytes, width: imgW, height: imgH } = await textToImage(
      textOpts.text,
      textOpts.fontSize,
      cssFont,
      textOpts.color,
      bold,
      textOpts.shadow,
    );
    const pngImage = await doc.embedPng(pngBytes);
    const { x, y } = getRotatedDrawPosition(
      opts.position, pw, ph, imgW, imgH, offsetXPt, offsetYPt, rotation,
    );
    page.drawImage(pngImage, {
      x, y, width: imgW, height: imgH,
      opacity: textOpts.opacity,
      rotate: degrees(rotation),
    });
  } else {
    const textWidth = font!.widthOfTextAtSize(textOpts.text, textOpts.fontSize);
    const textHeight = textOpts.fontSize;
    const { x, y } = getRotatedDrawPosition(
      opts.position, pw, ph, textWidth, textHeight, offsetXPt, offsetYPt, rotation,
    );
    page.drawText(textOpts.text, {
      x, y,
      size: textOpts.fontSize,
      font: font!,
      color: hexToRgb(textOpts.color),
      opacity: textOpts.opacity,
      rotate: degrees(rotation),
    });
  }
}

// ─── 이미지 워터마크 그리기 ───

function drawImageWatermark(
  page: PDFPage,
  pw: number,
  ph: number,
  image: PDFImage,
  dims: { width: number; height: number },
  opts: WatermarkOptions,
) {
  const imgOpts = opts.image;
  const offsetXPt = opts.offsetX * MM_TO_PT;
  const offsetYPt = opts.offsetY * MM_TO_PT;
  const scaledW = dims.width * imgOpts.scale;
  const scaledH = dims.height * imgOpts.scale;
  const rotation = opts.rotation;

  if (imgOpts.mosaic) {
    // 타일 모드: 페이지 전체를 커버
    const spacingX = Math.max(scaledW * 1.5, 50);
    const spacingY = Math.max(scaledH * 1.5, 50);
    for (let tx = -scaledW; tx < pw + scaledW; tx += spacingX) {
      for (let ty = -scaledH; ty < ph + scaledH; ty += spacingY) {
        page.drawImage(image, {
          x: tx, y: ty,
          width: scaledW, height: scaledH,
          opacity: imgOpts.opacity,
          rotate: degrees(rotation),
        });
      }
    }
  } else {
    const { x, y } = getRotatedDrawPosition(
      opts.position, pw, ph, scaledW, scaledH, offsetXPt, offsetYPt, rotation,
    );
    page.drawImage(image, {
      x, y,
      width: scaledW, height: scaledH,
      opacity: imgOpts.opacity,
      rotate: degrees(rotation),
    });
  }
}

// ─── 레이어 "below" 처리 ───

async function applyBelowLayer(
  doc: PDFDocument,
  originalPageIndex: number,
  drawWatermarkFn: (page: PDFPage, pw: number, ph: number) => Promise<void> | void,
) {
  const originalPage = doc.getPage(originalPageIndex);
  const { width, height } = originalPage.getSize();
  const rotation = originalPage.getRotation();

  // 1. 원본 페이지를 embed
  const [embedded] = await doc.embedPages([originalPage]);

  // 2. 원본 페이지의 콘텐츠를 클리어하고 워터마크를 먼저 그림
  // pdf-lib에서는 기존 페이지를 직접 클리어하기 어려우므로,
  // 새 페이지를 삽입하고 원본을 제거하는 방식 사용
  const newPage = doc.insertPage(originalPageIndex, [width, height]);
  newPage.setRotation(rotation);

  // 워터마크를 먼저 그림 (아래 레이어)
  await drawWatermarkFn(newPage, width, height);

  // 원본 콘텐츠를 위에 올림
  newPage.drawPage(embedded, { x: 0, y: 0, width, height });

  // 원본 페이지 제거 (새 페이지가 삽입되었으므로 원본은 index+1)
  doc.removePage(originalPageIndex + 1);
}

// ─── 메인 프로세서 ──────────────────────────────────────────────

const watermarkPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const opts = options as unknown as WatermarkOptions;
  const file = files[0];
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const totalPages = doc.getPageCount();

  onProgress(10);

  // 폰트 준비 (텍스트 모드)
  let font: PDFFont | null = null;
  if (opts.mode === "text") {
    const standardFontKey = FONT_MAP[opts.text.font];
    font = standardFontKey
      ? await doc.embedFont(StandardFonts[standardFontKey])
      : null;
  }

  // 이미지 준비 (이미지 모드)
  let watermarkImage: PDFImage | null = null;
  let watermarkImageDims: { width: number; height: number } | null = null;

  if (opts.mode === "image" && opts.image.imageFile) {
    const imgFile = opts.image.imageFile;
    const isSupported = imgFile.type === "image/png" || imgFile.type === "image/jpeg";

    let imgBytes: Uint8Array;
    let isPng: boolean;

    if (isSupported) {
      const result = await imageFileToBytes(imgFile);
      imgBytes = result.bytes;
      isPng = result.isPng;
    } else {
      // WebP, SVG 등 → PNG로 변환
      imgBytes = await convertToPng(imgFile);
      isPng = true;
    }

    watermarkImage = isPng
      ? await doc.embedPng(imgBytes)
      : await doc.embedJpg(imgBytes);
    watermarkImageDims = {
      width: watermarkImage.width,
      height: watermarkImage.height,
    };
  }

  onProgress(20);

  const targetPages = getTargetPageIndices(totalPages, opts.pageRange, opts.customRange);

  for (let i = 0; i < totalPages; i++) {
    if (!targetPages.has(i)) {
      onProgress(20 + Math.round(((i + 1) / totalPages) * 70));
      continue;
    }

    if (opts.layer === "below") {
      // 아래 레이어: 워터마크 → 원본 콘텐츠 순서
      await applyBelowLayer(doc, i, async (page, pw, ph) => {
        if (opts.mode === "text") {
          await drawTextWatermark(doc, page, pw, ph, opts, font);
        } else if (watermarkImage && watermarkImageDims) {
          drawImageWatermark(page, pw, ph, watermarkImage, watermarkImageDims, opts);
        }
      });
    } else {
      // 위 레이어: 기본 동작
      const page = doc.getPage(i);
      const { width: pw, height: ph } = page.getSize();

      if (opts.mode === "text") {
        await drawTextWatermark(doc, page, pw, ph, opts, font);
      } else if (watermarkImage && watermarkImageDims) {
        drawImageWatermark(page, pw, ph, watermarkImage, watermarkImageDims, opts);
      }
    }

    onProgress(20 + Math.round(((i + 1) / totalPages) * 70));
  }

  onProgress(95);
  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  onProgress(100);

  const baseName = file.name.replace(/\.pdf$/i, "");
  return {
    blob,
    filename: `${baseName}_watermarked.pdf`,
    size: blob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default watermarkPdf;

// 테스트용 export
export {
  hasNonLatinChars,
  parseRange,
  getTargetPageIndices,
  calculateWatermarkPosition,
};
