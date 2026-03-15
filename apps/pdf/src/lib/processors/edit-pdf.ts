import {
  PDFDocument,
  rgb,
  StandardFonts,
  degrees,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";
import type { ProcessorFn } from "../types";

interface BaseAnnotation {
  id: string;
  type: string;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

interface TextAnnotation extends BaseAnnotation {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  bold: boolean;
  italic: boolean;
  align: string;
  lineHeight: number;
}

interface RectangleAnnotation extends BaseAnnotation {
  type: "rectangle";
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
}

interface EllipseAnnotation extends BaseAnnotation {
  type: "ellipse";
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
}

interface LineAnnotation extends BaseAnnotation {
  type: "line";
  points: [number, number, number, number];
  strokeColor: string;
  strokeWidth: number;
}

interface FreehandAnnotation extends BaseAnnotation {
  type: "freehand";
  points: number[];
  strokeColor: string;
  strokeWidth: number;
}

interface ImageAnnotation extends BaseAnnotation {
  type: "image";
  dataUrl: string;
}

interface SymbolAnnotation extends BaseAnnotation {
  type: "symbol";
  symbol: string;
  color: string;
}

type Annotation =
  | TextAnnotation
  | RectangleAnnotation
  | EllipseAnnotation
  | LineAnnotation
  | FreehandAnnotation
  | ImageAnnotation
  | SymbolAnnotation;

// ─── Helpers ──────────────────────────────────────────────────
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return rgb(
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  );
}

function getFontKey(family: string, bold: boolean, italic: boolean): keyof typeof StandardFonts {
  const map: Record<string, keyof typeof StandardFonts> = {
    Helvetica: "Helvetica",
    "Helvetica-bold": "HelveticaBold",
    "Helvetica-italic": "HelveticaOblique",
    "Helvetica-bold-italic": "HelveticaBoldOblique",
    Courier: "Courier",
    "Courier-bold": "CourierBold",
    "Courier-italic": "CourierOblique",
    "Courier-bold-italic": "CourierBoldOblique",
    TimesRoman: "TimesRoman",
    "TimesRoman-bold": "TimesRomanBold",
    "TimesRoman-italic": "TimesRomanItalic",
    "TimesRoman-bold-italic": "TimesRomanBoldItalic",
  };

  const base = family === "Georgia" || family === "Verdana" ? "Helvetica" : (family || "Helvetica");
  const suffix = `${bold ? "-bold" : ""}${italic ? "-italic" : ""}`;
  return map[base + suffix] || map[base] || "Helvetica";
}

// Convert Konva top-left Y-down to PDF bottom-left Y-up
function toPdfY(konvaY: number, elementHeight: number, pageHeight: number): number {
  return pageHeight - konvaY - elementHeight;
}

/** Check if text contains characters outside WinAnsi range */
function hasNonLatinChars(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // WinAnsi covers basic Latin + Latin-1 Supplement (roughly 0x20-0xFF)
    if (code > 0xFF) return true;
  }
  return false;
}

/** Render text to canvas and return PNG bytes */
async function textToImage(
  content: string,
  width: number,
  height: number,
  fontSize: number,
  fontFamily: string,
  fontColor: string,
  bold: boolean,
  italic: boolean,
  align: string,
  lineHeight: number,
): Promise<Uint8Array> {
  const scale = 3; // High-res for clarity
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  const ctx = canvas.getContext("2d")!;

  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, width, height);

  const fontStyle = `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px ${fontFamily}, sans-serif`;
  ctx.font = fontStyle;
  ctx.fillStyle = fontColor;
  ctx.textBaseline = "top";

  const lh = fontSize * lineHeight;
  const lines = wrapText(ctx, content, width);

  for (let i = 0; i < lines.length; i++) {
    let x = 0;
    if (align === "center") {
      x = (width - ctx.measureText(lines[i]).width) / 2;
    } else if (align === "right") {
      x = width - ctx.measureText(lines[i]).width;
    }
    ctx.fillText(lines[i], x, i * lh);
  }

  const blob = await new Promise<Blob>((res) =>
    canvas.toBlob((b) => res(b!), "image/png"),
  );
  return new Uint8Array(await blob.arrayBuffer());
}

/** Simple word-wrap for canvas text */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (paragraph === "") { lines.push(""); continue; }
    let current = "";
    // For CJK, break per-character; for others, break per-word
    const chars = Array.from(paragraph);
    for (const ch of chars) {
      const test = current + ch;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = ch;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  }
  return lines.length ? lines : [""];
}

const SYMBOL_UNICODE: Record<string, string> = {
  check: "\u2713",
  cross: "\u2717",
  heart: "\u2764",
  exclamation: "!",
  question: "?",
};

// ─── Processor ────────────────────────────────────────────────
const editPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const file = files[0];
  const annotations = (options.annotations ?? []) as Annotation[];

  onProgress(5);

  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const totalPages = doc.getPageCount();

  onProgress(15);

  // Embed fonts upfront
  const fontCache = new Map<string, PDFFont>();
  async function getFont(family: string, bold: boolean, italic: boolean): Promise<PDFFont> {
    const key = getFontKey(family, bold, italic);
    if (!fontCache.has(key)) {
      const font = await doc.embedFont(StandardFonts[key]);
      fontCache.set(key, font);
    }
    return fontCache.get(key)!;
  }

  // Group annotations by page
  const byPage = new Map<number, Annotation[]>();
  for (const ann of annotations) {
    if (!byPage.has(ann.pageIndex)) byPage.set(ann.pageIndex, []);
    byPage.get(ann.pageIndex)!.push(ann);
  }

  onProgress(25);

  // Process each page
  for (const [pageIdx, pageAnnotations] of byPage) {
    if (pageIdx < 0 || pageIdx >= totalPages) continue;

    const page = doc.getPage(pageIdx);
    const { width: pw, height: ph } = page.getSize();

    for (const ann of pageAnnotations) {
      switch (ann.type) {
        case "text": {
          const pdfY = toPdfY(ann.y, ann.height, ph);

          // Draw background rectangle if backgroundColor is set
          if (ann.backgroundColor && ann.backgroundColor !== "transparent") {
            page.drawRectangle({
              x: ann.x,
              y: pdfY,
              width: ann.width,
              height: ann.height,
              color: hexToRgb(ann.backgroundColor),
              opacity: ann.opacity,
              rotate: degrees(-ann.rotation),
            });
          }

          if (hasNonLatinChars(ann.content)) {
            // Non-Latin text (Korean, CJK, etc.) → render via canvas image
            const imgBytes = await textToImage(
              ann.content,
              ann.width,
              ann.height,
              ann.fontSize,
              ann.fontFamily,
              ann.fontColor,
              ann.bold,
              ann.italic,
              ann.align,
              ann.lineHeight ?? 1.2,
            );
            const textImage = await doc.embedPng(imgBytes);
            page.drawImage(textImage, {
              x: ann.x,
              y: pdfY,
              width: ann.width,
              height: ann.height,
              opacity: ann.opacity,
              rotate: degrees(-ann.rotation),
            });
          } else {
            // Latin text → use standard PDF fonts (vector, smaller file size)
            const font = await getFont(ann.fontFamily, ann.bold, ann.italic);
            page.drawText(ann.content, {
              x: ann.x,
              y: pdfY + ann.height - ann.fontSize,
              size: ann.fontSize,
              font,
              color: hexToRgb(ann.fontColor),
              opacity: ann.opacity,
              rotate: degrees(-ann.rotation),
            });
          }
          break;
        }

        case "rectangle": {
          const pdfY = toPdfY(ann.y, ann.height, ph);
          const drawOpts: Parameters<PDFPage["drawRectangle"]>[0] = {
            x: ann.x,
            y: pdfY,
            width: ann.width,
            height: ann.height,
            borderWidth: ann.strokeWidth,
            borderColor: hexToRgb(ann.borderColor),
            opacity: ann.opacity,
            rotate: degrees(-ann.rotation),
          };
          if (ann.fillColor !== "transparent") {
            drawOpts.color = hexToRgb(ann.fillColor);
          }
          page.drawRectangle(drawOpts);
          break;
        }

        case "ellipse": {
          const cx = ann.x + ann.width / 2;
          const cy = ann.y + ann.height / 2;
          const pdfCy = ph - cy;
          page.drawEllipse({
            x: cx,
            y: pdfCy,
            xScale: ann.width / 2,
            yScale: ann.height / 2,
            borderWidth: ann.strokeWidth,
            borderColor: hexToRgb(ann.borderColor),
            color:
              ann.fillColor !== "transparent"
                ? hexToRgb(ann.fillColor)
                : undefined,
            opacity: ann.opacity,
          });
          break;
        }

        case "line": {
          const [x1, y1, x2, y2] = ann.points;
          page.drawLine({
            start: { x: x1, y: ph - y1 },
            end: { x: x2, y: ph - y2 },
            thickness: ann.strokeWidth,
            color: hexToRgb(ann.strokeColor),
            opacity: ann.opacity,
          });
          break;
        }

        case "freehand": {
          // Draw freehand as a series of line segments
          const pts = ann.points;
          for (let i = 0; i < pts.length - 2; i += 2) {
            page.drawLine({
              start: { x: pts[i], y: ph - pts[i + 1] },
              end: { x: pts[i + 2], y: ph - pts[i + 3] },
              thickness: ann.strokeWidth,
              color: hexToRgb(ann.strokeColor),
              opacity: ann.opacity,
            });
          }
          break;
        }

        case "image": {
          const base64Data = ann.dataUrl.split(",")[1];
          const isPng = ann.dataUrl.includes("image/png");
          const imageBytes = Uint8Array.from(atob(base64Data), (c) =>
            c.charCodeAt(0),
          );
          const image = isPng
            ? await doc.embedPng(imageBytes)
            : await doc.embedJpg(imageBytes);

          const pdfY = toPdfY(ann.y, ann.height, ph);
          page.drawImage(image, {
            x: ann.x,
            y: pdfY,
            width: ann.width,
            height: ann.height,
            opacity: ann.opacity,
            rotate: degrees(-ann.rotation),
          });
          break;
        }

        case "symbol": {
          // Render simple symbols as text using standard font
          const symbolChar = SYMBOL_UNICODE[ann.symbol];
          if (symbolChar) {
            const font = await getFont("Helvetica", false, false);
            const pdfY = toPdfY(ann.y, ann.width, ph);
            page.drawText(symbolChar, {
              x: ann.x,
              y: pdfY,
              size: ann.width,
              font,
              color: hexToRgb(ann.color),
              opacity: ann.opacity,
            });
          } else {
            // For emoji symbols (smile, sad, etc.), render as image via canvas
            const canvas = document.createElement("canvas");
            const size = Math.round(ann.width * 2);
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d")!;
            ctx.font = `${size}px serif`;
            ctx.textBaseline = "top";

            const emojiMap: Record<string, string> = {
              smile: "\u{1F60A}",
              neutral: "\u{1F610}",
              sad: "\u{1F622}",
              heart: "\u2764\uFE0F",
            };
            ctx.fillText(emojiMap[ann.symbol] ?? "?", 0, 0);

            const blob = await new Promise<Blob>((res) =>
              canvas.toBlob((b) => res(b!), "image/png"),
            );
            const arrBuf = await blob.arrayBuffer();
            const emojiImage = await doc.embedPng(new Uint8Array(arrBuf));
            const pdfY = toPdfY(ann.y, ann.width, ph);
            page.drawImage(emojiImage, {
              x: ann.x,
              y: pdfY,
              width: ann.width,
              height: ann.width,
              opacity: ann.opacity,
            });
          }
          break;
        }
      }
    }

    onProgress(25 + Math.round(((pageIdx + 1) / totalPages) * 60));
  }

  onProgress(90);

  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });

  const baseName = file.name.replace(/\.pdf$/i, "");

  onProgress(100);

  return {
    blob,
    filename: `${baseName}_edited.pdf`,
    size: blob.size,
    pageCount: totalPages,
  };
};

export default editPdf;
