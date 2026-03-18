import {
  PDFDocument,
  rgb,
  StandardFonts,
  degrees,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";
import type { ProcessorFn } from "../types";
import type {
  AnnotateElement,
  HighlightElement,
  UnderlineElement,
  StrikethroughElement,
  StickyNoteElement,
  FreehandElement,
  RectangleElement,
  EllipseElement,
  ArrowElement,
  TextBoxElement,
  StampElement,
} from "../../app/[locale]/(tools)/_components/annotate-pdf/annotate-types";
import {
  HIGHLIGHT_COLORS,
  STAMP_TEXT,
} from "../../app/[locale]/(tools)/_components/annotate-pdf/annotate-types";

// ─── Helpers ──────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return rgb(
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  );
}

/** Convert Konva top-left Y-down to PDF bottom-left Y-up */
function toPdfY(konvaY: number, elementHeight: number, pageHeight: number): number {
  return pageHeight - konvaY - elementHeight;
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

/** Check if text contains characters outside WinAnsi range */
function hasNonLatinChars(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
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
  const scale = 3;
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
    const tw = ctx.measureText(lines[i]).width;
    if (align === "center") {
      x = (width - tw) / 2;
    } else if (align === "right") {
      x = width - tw;
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

/** Render a sticky note icon via canvas and return PNG bytes */
async function stickyNoteToImage(
  size: number,
  noteColor: string,
): Promise<Uint8Array> {
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(size * scale);
  canvas.height = Math.ceil(size * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // Folded corner note
  const fold = size * 0.25;

  ctx.fillStyle = noteColor;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size - fold, 0);
  ctx.lineTo(size, fold);
  ctx.lineTo(size, size);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.fill();

  // Fold triangle
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath();
  ctx.moveTo(size - fold, 0);
  ctx.lineTo(size, fold);
  ctx.lineTo(size - fold, fold);
  ctx.closePath();
  ctx.fill();

  // Border
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size - fold, 0);
  ctx.lineTo(size, fold);
  ctx.lineTo(size, size);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.stroke();

  const blob = await new Promise<Blob>((res) =>
    canvas.toBlob((b) => res(b!), "image/png"),
  );
  return new Uint8Array(await blob.arrayBuffer());
}

/** Render a stamp via canvas and return PNG bytes */
async function stampToImage(
  width: number,
  height: number,
  text: string,
  color: string,
  rotation: number,
): Promise<Uint8Array> {
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  ctx.translate(width / 2, height / 2);
  // Note: rotation is applied in PDF coordinates, so we don't rotate canvas here

  const borderWidth = 3;
  const rx = width / 2 - borderWidth;
  const ry = height / 2 - borderWidth;

  // Border rectangle
  ctx.strokeStyle = color;
  ctx.lineWidth = borderWidth;
  ctx.strokeRect(-rx, -ry, rx * 2, ry * 2);

  // Text
  const fontSize = Math.min(
    (width - borderWidth * 4) / (text.length * 0.65),
    height * 0.45,
  );
  ctx.font = `bold ${fontSize}px Helvetica, Arial, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 0);

  const blob = await new Promise<Blob>((res) =>
    canvas.toBlob((b) => res(b!), "image/png"),
  );
  return new Uint8Array(await blob.arrayBuffer());
}

// ─── Processor ────────────────────────────────────────────────

const annotatePdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const file = files[0];
  const annotations = (options.annotations ?? []) as AnnotateElement[];

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
  const byPage = new Map<number, AnnotateElement[]>();
  for (const ann of annotations) {
    if (!byPage.has(ann.pageIndex)) byPage.set(ann.pageIndex, []);
    byPage.get(ann.pageIndex)!.push(ann);
  }

  onProgress(25);

  // Process each page
  for (const [pageIdx, pageAnnotations] of byPage) {
    if (pageIdx < 0 || pageIdx >= totalPages) continue;

    const page = doc.getPage(pageIdx);
    const { height: ph } = page.getSize();

    for (const ann of pageAnnotations) {
      switch (ann.type) {
        // ─── Highlight ─────────────────────────────────
        case "highlight": {
          const hl = ann as HighlightElement;
          const pdfY = toPdfY(hl.y, hl.height, ph);
          const colorHex = HIGHLIGHT_COLORS[hl.color] ?? "#FFEB3B";
          page.drawRectangle({
            x: hl.x,
            y: pdfY,
            width: hl.width,
            height: hl.height,
            color: hexToRgb(colorHex),
            opacity: hl.opacity ?? 0.35,
          });
          break;
        }

        // ─── Underline ────────────────────────────────
        case "underline": {
          const ul = ann as UnderlineElement;
          // Line at the bottom of the element
          const lineY = ph - (ul.y + ul.height);
          page.drawLine({
            start: { x: ul.x, y: lineY },
            end: { x: ul.x + ul.width, y: lineY },
            thickness: ul.strokeWidth,
            color: hexToRgb(ul.color),
            opacity: ul.opacity,
          });
          break;
        }

        // ─── Strikethrough ────────────────────────────
        case "strikethrough": {
          const st = ann as StrikethroughElement;
          // Line at the vertical middle of the element
          const midY = ph - (st.y + st.height / 2);
          page.drawLine({
            start: { x: st.x, y: midY },
            end: { x: st.x + st.width, y: midY },
            thickness: st.strokeWidth,
            color: hexToRgb(st.color),
            opacity: st.opacity,
          });
          break;
        }

        // ─── Sticky Note ──────────────────────────────
        case "sticky-note": {
          const sn = ann as StickyNoteElement;
          const noteSize = Math.min(sn.width, sn.height);
          const pdfY = toPdfY(sn.y, noteSize, ph);

          // Render note icon
          const iconBytes = await stickyNoteToImage(noteSize, sn.noteColor);
          const iconImage = await doc.embedPng(iconBytes);
          page.drawImage(iconImage, {
            x: sn.x,
            y: pdfY,
            width: noteSize,
            height: noteSize,
            opacity: sn.opacity,
          });

          // If there's note content, render small text beside the icon
          if (sn.noteContent && sn.noteContent.trim()) {
            const font = await getFont("Helvetica", false, false);
            const textFontSize = Math.max(8, noteSize * 0.3);
            const textX = sn.x + noteSize + 4;
            const textY = pdfY + noteSize - textFontSize;

            if (hasNonLatinChars(sn.noteContent)) {
              const maxTextWidth = 150;
              const textHeight = textFontSize * 1.3 * Math.ceil(sn.noteContent.length / 20);
              const imgBytes = await textToImage(
                sn.noteContent,
                maxTextWidth,
                Math.max(textFontSize * 2, textHeight),
                textFontSize,
                "Helvetica",
                "#333333",
                false,
                false,
                "left",
                1.3,
              );
              const textImage = await doc.embedPng(imgBytes);
              page.drawImage(textImage, {
                x: textX,
                y: pdfY,
                width: maxTextWidth,
                height: Math.max(textFontSize * 2, textHeight),
                opacity: sn.opacity,
              });
            } else {
              // Truncate long content for inline display
              const displayText = sn.noteContent.length > 40
                ? sn.noteContent.substring(0, 40) + "..."
                : sn.noteContent;
              page.drawText(displayText, {
                x: textX,
                y: textY,
                size: textFontSize,
                font,
                color: rgb(0.2, 0.2, 0.2),
                opacity: sn.opacity,
              });
            }
          }
          break;
        }

        // ─── Freehand ─────────────────────────────────
        case "freehand": {
          const fh = ann as FreehandElement;
          const pts = fh.points;
          for (let i = 0; i < pts.length - 2; i += 2) {
            page.drawLine({
              start: { x: pts[i], y: ph - pts[i + 1] },
              end: { x: pts[i + 2], y: ph - pts[i + 3] },
              thickness: fh.strokeWidth,
              color: hexToRgb(fh.strokeColor),
              opacity: fh.opacity,
            });
          }
          break;
        }

        // ─── Rectangle ───────────────────────────────
        case "rectangle": {
          const rect = ann as RectangleElement;
          const pdfY = toPdfY(rect.y, rect.height, ph);
          const drawOpts: Parameters<PDFPage["drawRectangle"]>[0] = {
            x: rect.x,
            y: pdfY,
            width: rect.width,
            height: rect.height,
            borderWidth: rect.strokeWidth,
            borderColor: hexToRgb(rect.borderColor),
            opacity: rect.opacity,
            rotate: degrees(-rect.rotation),
          };
          if (rect.fillColor !== "transparent") {
            drawOpts.color = hexToRgb(rect.fillColor);
          }
          page.drawRectangle(drawOpts);
          break;
        }

        // ─── Ellipse ─────────────────────────────────
        case "ellipse": {
          const el = ann as EllipseElement;
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          const pdfCy = ph - cy;
          page.drawEllipse({
            x: cx,
            y: pdfCy,
            xScale: el.width / 2,
            yScale: el.height / 2,
            borderWidth: el.strokeWidth,
            borderColor: hexToRgb(el.borderColor),
            color:
              el.fillColor !== "transparent"
                ? hexToRgb(el.fillColor)
                : undefined,
            opacity: el.opacity,
          });
          break;
        }

        // ─── Arrow ───────────────────────────────────
        case "arrow": {
          const ar = ann as ArrowElement;
          const [x1, y1, x2, y2] = ar.points;
          const pdfX1 = x1;
          const pdfY1 = ph - y1;
          const pdfX2 = x2;
          const pdfY2 = ph - y2;

          // Draw arrow body
          page.drawLine({
            start: { x: pdfX1, y: pdfY1 },
            end: { x: pdfX2, y: pdfY2 },
            thickness: ar.strokeWidth,
            color: hexToRgb(ar.strokeColor),
            opacity: ar.opacity,
          });

          // Draw arrowhead triangle
          const headSize = ar.headSize;
          const dx = pdfX2 - pdfX1;
          const dy = pdfY2 - pdfY1;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0) {
            // Unit vector along the arrow direction
            const ux = dx / len;
            const uy = dy / len;
            // Perpendicular unit vector
            const px = -uy;
            const py = ux;

            // Arrowhead base point (back from tip by headSize)
            const baseX = pdfX2 - ux * headSize;
            const baseY = pdfY2 - uy * headSize;

            // Two wing points
            const wingHalf = headSize / 2;
            const leftX = baseX + px * wingHalf;
            const leftY = baseY + py * wingHalf;
            const rightX = baseX - px * wingHalf;
            const rightY = baseY - py * wingHalf;

            // Draw filled triangle using three lines forming a closed shape
            // pdf-lib doesn't have drawPolygon, so we draw a filled triangle via SVG path
            // Workaround: draw rectangle-based arrowhead or use page.drawLine for borders
            // Better approach: use the page's content stream directly
            const arrowColor = hexToRgb(ar.strokeColor);

            // Draw the arrowhead as a filled triangle using moveTo/lineTo
            page.pushOperators(
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              ...(() => {
                const { pushGraphicsState, popGraphicsState, moveTo, lineTo, closePath, fill, setFillingColor } = require("pdf-lib") as typeof import("pdf-lib");
                return [
                  pushGraphicsState(),
                  setFillingColor(arrowColor),
                  moveTo(pdfX2, pdfY2),
                  lineTo(leftX, leftY),
                  lineTo(rightX, rightY),
                  closePath(),
                  fill(),
                  popGraphicsState(),
                ];
              })(),
            );
          }
          break;
        }

        // ─── Text Box ────────────────────────────────
        case "text-box": {
          const tb = ann as TextBoxElement;
          const pdfY = toPdfY(tb.y, tb.height, ph);

          // Draw background if set
          if (tb.backgroundColor && tb.backgroundColor !== "transparent") {
            page.drawRectangle({
              x: tb.x,
              y: pdfY,
              width: tb.width,
              height: tb.height,
              color: hexToRgb(tb.backgroundColor),
              opacity: tb.opacity,
              rotate: degrees(-tb.rotation),
            });
          }

          // Draw border if set
          if (tb.borderColor && tb.borderColor !== "transparent") {
            page.drawRectangle({
              x: tb.x,
              y: pdfY,
              width: tb.width,
              height: tb.height,
              borderWidth: 1,
              borderColor: hexToRgb(tb.borderColor),
              opacity: tb.opacity,
              rotate: degrees(-tb.rotation),
            });
          }

          // Render text content
          if (tb.content && tb.content.trim()) {
            if (hasNonLatinChars(tb.content)) {
              const imgBytes = await textToImage(
                tb.content,
                tb.width,
                tb.height,
                tb.fontSize,
                tb.fontFamily,
                tb.fontColor,
                tb.bold,
                tb.italic,
                tb.align,
                tb.lineHeight ?? 1.2,
              );
              const textImage = await doc.embedPng(imgBytes);
              page.drawImage(textImage, {
                x: tb.x,
                y: pdfY,
                width: tb.width,
                height: tb.height,
                opacity: tb.opacity,
                rotate: degrees(-tb.rotation),
              });
            } else {
              const font = await getFont(tb.fontFamily, tb.bold, tb.italic);
              const lh = tb.fontSize * (tb.lineHeight ?? 1.2);
              const textColor = hexToRgb(tb.fontColor);
              const lines = tb.content.split("\n");

              for (let i = 0; i < lines.length; i++) {
                const lineY = pdfY + tb.height - tb.fontSize - i * lh;
                if (lineY < pdfY) break; // Don't render below the box

                let lineX = tb.x;
                if (tb.align === "center") {
                  const tw = font.widthOfTextAtSize(lines[i], tb.fontSize);
                  lineX = tb.x + (tb.width - tw) / 2;
                } else if (tb.align === "right") {
                  const tw = font.widthOfTextAtSize(lines[i], tb.fontSize);
                  lineX = tb.x + tb.width - tw;
                }

                page.drawText(lines[i], {
                  x: lineX,
                  y: lineY,
                  size: tb.fontSize,
                  font,
                  color: textColor,
                  opacity: tb.opacity,
                  rotate: degrees(-tb.rotation),
                });
              }
            }
          }
          break;
        }

        // ─── Stamp ───────────────────────────────────
        case "stamp": {
          const st = ann as StampElement;
          const pdfY = toPdfY(st.y, st.height, ph);
          const stampText = STAMP_TEXT[st.stampKind] ?? st.stampKind.toUpperCase();

          const imgBytes = await stampToImage(
            st.width,
            st.height,
            stampText,
            st.color,
            st.rotation,
          );
          const stampImage = await doc.embedPng(imgBytes);
          page.drawImage(stampImage, {
            x: st.x,
            y: pdfY,
            width: st.width,
            height: st.height,
            opacity: st.opacity ?? 0.85,
            rotate: degrees(-st.rotation),
          });
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
    filename: `${baseName}_annotated.pdf`,
    size: blob.size,
    pageCount: totalPages,
  };
};

export default annotatePdf;
