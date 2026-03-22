import { PDFDocument } from "pdf-lib";
import type { ProcessorFn } from "../types";
import { hexToRgb } from "./color-utils";

export interface RedactArea {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: "area" | "text";
  label?: string;
}

// Convert Konva top-left Y-down to PDF bottom-left Y-up
function toPdfY(konvaY: number, elementHeight: number, pageHeight: number): number {
  return pageHeight - konvaY - elementHeight;
}

const redact: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const file = files[0];
  const redactions = (options.redactions ?? []) as RedactArea[];

  if (redactions.length === 0) throw new Error("No redactions specified");

  onProgress(5);

  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const totalPages = doc.getPageCount();

  onProgress(15);

  // Group redactions by page
  const byPage = new Map<number, RedactArea[]>();
  for (const r of redactions) {
    if (!byPage.has(r.pageIndex)) byPage.set(r.pageIndex, []);
    byPage.get(r.pageIndex)!.push(r);
  }

  onProgress(25);

  // Apply redactions: draw opaque rectangles over the content
  for (const [pageIdx, pageRedactions] of byPage) {
    if (pageIdx < 0 || pageIdx >= totalPages) continue;

    const page = doc.getPage(pageIdx);
    const { height: ph } = page.getSize();

    for (const r of pageRedactions) {
      const pdfY = toPdfY(r.y, r.height, ph);
      page.drawRectangle({
        x: r.x,
        y: pdfY,
        width: r.width,
        height: r.height,
        color: hexToRgb(r.color),
        opacity: 1,
      });
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
    filename: `${baseName}_redacted.pdf`,
    size: blob.size,
    pageCount: totalPages,
  };
};

export default redact;
