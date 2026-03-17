import {
  PDFDocument,
  rgb,
  StandardFonts,
  type PDFFont,
} from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";
import type {
  PageNumberOptions,
  PageNumberPosition,
  PageNumberFont,
} from "./page-numbers-types";

const MM_TO_PT = 72 / 25.4;

// ─── Helpers ──────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return rgb(
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  );
}

/** WinAnsi 범위를 벗어나는 문자가 있으면 true */
function hasNonLatinChars(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 0xff) return true;
  }
  return false;
}

/** Canvas로 텍스트를 렌더링해서 PNG bytes 반환 (CJK용) */
async function textToImage(
  content: string,
  fontSize: number,
  fontFamily: string,
  fontColor: string,
  bold = false,
): Promise<{ pngBytes: Uint8Array; width: number; height: number }> {
  const scale = 3;
  const fontStr = `${bold ? "bold " : ""}${fontSize}px ${fontFamily}, sans-serif`;
  // 폭을 먼저 측정
  const measure = document.createElement("canvas");
  const mCtx = measure.getContext("2d")!;
  mCtx.font = fontStr;
  const tw = mCtx.measureText(content).width;

  const width = Math.ceil(tw) + 4; // 약간의 여유
  const height = Math.ceil(fontSize * 1.3);

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, width, height);
  ctx.font = fontStr;
  ctx.fillStyle = fontColor;
  ctx.textBaseline = "top";
  ctx.fillText(content, 0, 0);

  const blob = await new Promise<Blob>((res) =>
    canvas.toBlob((b) => res(b!), "image/png"),
  );
  return {
    pngBytes: new Uint8Array(await blob.arrayBuffer()),
    width,
    height,
  };
}

// ─── 형식 처리 ───

const FORMAT_TEMPLATES: Record<string, string> = {
  "{n}": "{n}",
  "{n}/{total}": "{n} / {total}",
  "page-n": "Page {n}",
  "page-n-of": "Page {n} of {total}",
};

function getTemplate(format: string, customTemplate: string): string {
  if (format === "custom") return customTemplate || "{n}";
  return FORMAT_TEMPLATES[format] || "{n}";
}

function formatPageNumber(
  template: string,
  currentPage: number,
  totalPages: number,
): string {
  return template
    .replace(/\{n\}/g, String(currentPage))
    .replace(/\{total\}/g, String(totalPages));
}

// ─── 위치 계산 ───

function calculatePosition(
  position: PageNumberPosition,
  pageWidth: number,
  pageHeight: number,
  textWidth: number,
  fontSize: number,
  marginPt: number,
): { x: number; y: number } {
  const isTop = position.startsWith("top");
  const y = isTop ? pageHeight - marginPt - fontSize : marginPt;

  let x: number;
  if (position.endsWith("left")) {
    x = marginPt;
  } else if (position.endsWith("center")) {
    x = (pageWidth - textWidth) / 2;
  } else {
    x = pageWidth - marginPt - textWidth;
  }

  return { x, y };
}

function mirrorPosition(position: PageNumberPosition): PageNumberPosition {
  if (position.endsWith("left"))
    return position.replace("left", "right") as PageNumberPosition;
  if (position.endsWith("right"))
    return position.replace("right", "left") as PageNumberPosition;
  return position;
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
  opts: PageNumberOptions,
): Set<number> {
  let candidates: number[];
  if (opts.pageRange === "all") {
    candidates = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    candidates = parseRange(opts.customRange, totalPages).map((p) => p - 1);
  }

  const skipSet = new Set(
    Array.from({ length: opts.skipFirstN }, (_, i) => i),
  );

  if (opts.facingMode === "facing-cover") {
    skipSet.add(0);
  }

  return new Set(candidates.filter((i) => !skipSet.has(i)));
}

// ─── 폰트 매핑 ───

/** StandardFonts에 있는 폰트만 매핑. 없는 폰트는 Canvas 렌더링으로 처리. */
const FONT_MAP: Partial<Record<PageNumberFont, keyof typeof StandardFonts>> = {
  Helvetica: "Helvetica",
  HelveticaBold: "HelveticaBold",
  TimesRoman: "TimesRoman",
  TimesRomanBold: "TimesRomanBold",
  Courier: "Courier",
  CourierBold: "CourierBold",
};

/** CSS font-family 매핑 (Canvas 렌더링용) */
const CSS_FONT_MAP: Record<PageNumberFont, string> = {
  Helvetica: "Helvetica, Arial, sans-serif",
  HelveticaBold: "Helvetica, Arial, sans-serif",
  TimesRoman: "Times New Roman, serif",
  TimesRomanBold: "Times New Roman, serif",
  Courier: "Courier New, monospace",
  CourierBold: "Courier New, monospace",
  Georgia: "Georgia, serif",
  Verdana: "Verdana, sans-serif",
};

function isBoldFont(font: PageNumberFont): boolean {
  return font.endsWith("Bold");
}

// ─── 메인 프로세서 ──────────────────────────────────────────────

const pageNumbersPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const opts = options as unknown as PageNumberOptions;
  const file = files[0];
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const totalPages = doc.getPageCount();

  onProgress(10);

  const standardFontKey = FONT_MAP[opts.font];
  const font = standardFontKey
    ? await doc.embedFont(StandardFonts[standardFontKey])
    : null; // Georgia, Verdana 등은 Canvas 렌더링

  onProgress(20);

  const targetPages = getTargetPageIndices(totalPages, opts);
  const marginPt = opts.marginMm * MM_TO_PT;
  const color = hexToRgb(opts.color);
  const template = getTemplate(opts.format, opts.customTemplate);

  // total은 번호가 매겨지는 페이지들의 마지막 번호
  const numberedTotal = targetPages.size + opts.startNumber - 1;

  let numberCounter = opts.startNumber;

  for (let i = 0; i < totalPages; i++) {
    if (!targetPages.has(i)) {
      onProgress(20 + Math.round(((i + 1) / totalPages) * 70));
      continue;
    }

    const page = doc.getPage(i);
    const { width: pw, height: ph } = page.getSize();

    const text = formatPageNumber(template, numberCounter, numberedTotal);

    // 마주보기 모드 처리
    let effectivePosition = opts.position;
    if (opts.facingMode !== "single") {
      const isEvenPage =
        opts.facingMode === "facing" ? i % 2 === 1 : (i - 1) % 2 === 1;
      if (isEvenPage) effectivePosition = mirrorPosition(effectivePosition);
    }

    const useCanvas = !font || hasNonLatinChars(text);

    if (useCanvas) {
      // Canvas → PNG → embedPng (CJK 또는 웹 폰트)
      const cssFont = CSS_FONT_MAP[opts.font] || "sans-serif";
      const bold = isBoldFont(opts.font);

      const { pngBytes, width: imgW, height: imgH } = await textToImage(
        text,
        opts.fontSize,
        cssFont,
        opts.color,
        bold,
      );

      const pngImage = await doc.embedPng(pngBytes);
      const { x, y } = calculatePosition(
        effectivePosition,
        pw,
        ph,
        imgW,
        imgH,
        marginPt,
      );

      page.drawImage(pngImage, {
        x,
        y,
        width: imgW,
        height: imgH,
      });
    } else {
      // Latin + StandardFont: drawText 직접 사용
      const textWidth = font.widthOfTextAtSize(text, opts.fontSize);
      const { x, y } = calculatePosition(
        effectivePosition,
        pw,
        ph,
        textWidth,
        opts.fontSize,
        marginPt,
      );

      page.drawText(text, {
        x,
        y,
        size: opts.fontSize,
        font,
        color,
      });
    }

    numberCounter++;
    onProgress(20 + Math.round(((i + 1) / totalPages) * 70));
  }

  onProgress(95);
  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  onProgress(100);

  const baseName = file.name.replace(/\.pdf$/i, "");
  return {
    blob,
    filename: `${baseName}_numbered.pdf`,
    size: blob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default pageNumbersPdf;

// 테스트용 export
export {
  formatPageNumber,
  calculatePosition,
  mirrorPosition,
  parseRange,
  getTargetPageIndices,
  getTemplate,
  hexToRgb,
  hasNonLatinChars,
};
