import {
  PDFDocument,
  StandardFonts,
} from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";
import type { HeaderFooterOptions, HeaderFooterAlign } from "./header-footer-types";
import type { PageNumberFont } from "./page-numbers-types";
// Re-use helpers from page-numbers
import {
  hasNonLatinChars,
  parseRange,
} from "./page-numbers";
import { hexToRgb } from "./color-utils";

const MM_TO_PT = 72 / 25.4;

// ─── Font mapping (same as page-numbers) ─────────────────────

const FONT_MAP: Partial<Record<PageNumberFont, keyof typeof StandardFonts>> = {
  Helvetica: "Helvetica",
  HelveticaBold: "HelveticaBold",
  TimesRoman: "TimesRoman",
  TimesRomanBold: "TimesRomanBold",
  Courier: "Courier",
  CourierBold: "CourierBold",
};

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

// ─── Canvas text rendering (CJK support) ─────────────────────

async function textToImage(
  content: string,
  fontSize: number,
  fontFamily: string,
  fontColor: string,
  bold = false,
): Promise<{ pngBytes: Uint8Array; width: number; height: number }> {
  const scale = 3;
  const fontStr = `${bold ? "bold " : ""}${fontSize}px ${fontFamily}, sans-serif`;
  const measure = document.createElement("canvas");
  const mCtx = measure.getContext("2d")!;
  mCtx.font = fontStr;
  const tw = mCtx.measureText(content).width;

  const width = Math.ceil(tw) + 4;
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

// ─── Template variable replacement ───────────────────────────

function resolveTemplate(
  template: string,
  pageNum: number,
  totalPages: number,
  filename: string,
): string {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return template
    .replace(/\{page\}/g, String(pageNum))
    .replace(/\{total\}/g, String(totalPages))
    .replace(/\{date\}/g, dateStr)
    .replace(/\{filename\}/g, filename);
}

// ─── Position calculation ────────────────────────────────────

function calcX(
  align: HeaderFooterAlign,
  pageWidth: number,
  textWidth: number,
  marginPt: number,
): number {
  if (align === "left") return marginPt;
  if (align === "center") return (pageWidth - textWidth) / 2;
  return pageWidth - marginPt - textWidth;
}

function mirrorAlign(align: HeaderFooterAlign): HeaderFooterAlign {
  if (align === "left") return "right";
  if (align === "right") return "left";
  return "center";
}

// ─── Target page indices ─────────────────────────────────────

function getTargetPages(
  totalPages: number,
  opts: HeaderFooterOptions,
): Set<number> {
  if (opts.pageRange === "all") {
    return new Set(Array.from({ length: totalPages }, (_, i) => i));
  }
  return new Set(
    parseRange(opts.customRange, totalPages).map((p) => p - 1),
  );
}

// ─── Draw text helper ────────────────────────────────────────

async function drawHeaderOrFooter(
  doc: PDFDocument,
  pageIndex: number,
  text: string,
  align: HeaderFooterAlign,
  isHeader: boolean,
  opts: HeaderFooterOptions,
  font: import("pdf-lib").PDFFont | null,
) {
  const page = doc.getPage(pageIndex);
  const { width: pw, height: ph } = page.getSize();
  const marginPt = opts.marginMm * MM_TO_PT;

  // Facing mode mirror
  let effectiveAlign = align;
  if (opts.facingMode !== "single") {
    const isEvenPage =
      opts.facingMode === "facing" ? pageIndex % 2 === 1 : (pageIndex - 1) % 2 === 1;
    if (isEvenPage) effectiveAlign = mirrorAlign(effectiveAlign);
  }

  const useCanvas = !font || hasNonLatinChars(text);

  if (useCanvas) {
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
    const x = calcX(effectiveAlign, pw, imgW, marginPt);
    const y = isHeader ? ph - marginPt - imgH : marginPt;

    page.drawImage(pngImage, { x, y, width: imgW, height: imgH });
  } else {
    const textWidth = font!.widthOfTextAtSize(text, opts.fontSize);
    const x = calcX(effectiveAlign, pw, textWidth, marginPt);
    const y = isHeader ? ph - marginPt - opts.fontSize : marginPt;
    const color = hexToRgb(opts.color);

    page.drawText(text, {
      x,
      y,
      size: opts.fontSize,
      font: font!,
      color,
    });
  }
}

// ─── Main processor ──────────────────────────────────────────

const headerFooterPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const opts = options as unknown as HeaderFooterOptions;
  const file = files[0];
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const totalPages = doc.getPageCount();
  const filename = file.name.replace(/\.pdf$/i, "");

  onProgress(10);

  // Embed font
  const standardFontKey = FONT_MAP[opts.font];
  const font = standardFontKey
    ? await doc.embedFont(StandardFonts[standardFontKey])
    : null;

  onProgress(20);

  const targetPages = getTargetPages(totalPages, opts);

  for (let i = 0; i < totalPages; i++) {
    if (!targetPages.has(i)) {
      onProgress(20 + Math.round(((i + 1) / totalPages) * 70));
      continue;
    }

    const pageNum = i + 1;

    if (opts.headerEnabled && opts.headerText.trim()) {
      const headerText = resolveTemplate(opts.headerText, pageNum, totalPages, filename);
      await drawHeaderOrFooter(doc, i, headerText, opts.headerAlign, true, opts, font);
    }

    if (opts.footerEnabled && opts.footerText.trim()) {
      const footerText = resolveTemplate(opts.footerText, pageNum, totalPages, filename);
      await drawHeaderOrFooter(doc, i, footerText, opts.footerAlign, false, opts, font);
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
    filename: `${baseName}_header-footer.pdf`,
    size: blob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default headerFooterPdf;
