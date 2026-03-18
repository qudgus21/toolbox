import { PDFDocument } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";
import type { BookletOptions } from "./booklet-types";
import { PAGE_SIZES } from "./resize";

/**
 * Booklet (saddle-stitch) imposition processor.
 *
 * Rearranges pages so that when printed double-sided and folded in half,
 * they form a booklet in the correct reading order.
 *
 * For N pages (padded to multiple of 4):
 *   Sheet 1 front: [N, 1]   back: [2, N-1]
 *   Sheet 2 front: [N-2, 3] back: [4, N-3]
 *   ...
 *
 * Each sheet is landscape-oriented with two pages side by side.
 */
const bookletPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const opts = options as unknown as BookletOptions;
  const file = files[0];
  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const srcPageCount = srcDoc.getPageCount();

  onProgress(10);

  // Pad to multiple of 4
  const paddedCount = Math.ceil(srcPageCount / 4) * 4;

  // Get sheet dimensions (landscape)
  const sheetDef = PAGE_SIZES[opts.sheetSize] ?? PAGE_SIZES.a4;
  const sheetW = Math.max(sheetDef.width, sheetDef.height); // landscape width
  const sheetH = Math.min(sheetDef.width, sheetDef.height); // landscape height
  const halfW = sheetW / 2;

  onProgress(15);

  // Build imposition order: pairs of [left, right] page indices (0-based, -1 = blank)
  const pairs: [number, number][] = [];
  const totalSheets = paddedCount / 2; // number of half-sheets (front + back sides)

  for (let i = 0; i < paddedCount / 2; i++) {
    const sheetIndex = Math.floor(i / 2);
    const isFront = i % 2 === 0;

    let left: number;
    let right: number;

    if (isFront) {
      // Front side: [paddedCount - 1 - 2*sheetIndex, 2*sheetIndex]
      left = paddedCount - 1 - 2 * sheetIndex;
      right = 2 * sheetIndex;
    } else {
      // Back side: [2*sheetIndex + 1, paddedCount - 2 - 2*sheetIndex]
      left = 2 * sheetIndex + 1;
      right = paddedCount - 2 - 2 * sheetIndex;
    }

    // For right binding, mirror the order
    if (opts.binding === "right") {
      [left, right] = [right, left];
    }

    // Convert to 0-based source page index (-1 for blank padding pages)
    const leftIdx = left < srcPageCount ? left : -1;
    const rightIdx = right < srcPageCount ? right : -1;

    pairs.push([leftIdx, rightIdx]);
  }

  onProgress(25);

  // Create output document
  const outDoc = await PDFDocument.create();

  for (let i = 0; i < pairs.length; i++) {
    const [leftIdx, rightIdx] = pairs[i];
    const page = outDoc.addPage([sheetW, sheetH]);

    // Draw left page
    if (leftIdx >= 0) {
      const [srcPage] = await outDoc.copyPages(srcDoc, [leftIdx]);
      const embedded = await outDoc.embedPage(srcPage);
      const { width: pw, height: ph } = embedded;

      // Scale to fit half sheet
      const scaleX = halfW / pw;
      const scaleY = sheetH / ph;
      const scale = Math.min(scaleX, scaleY);
      const drawW = pw * scale;
      const drawH = ph * scale;
      const drawX = (halfW - drawW) / 2;
      const drawY = (sheetH - drawH) / 2;

      page.drawPage(embedded, { x: drawX, y: drawY, width: drawW, height: drawH });
    }

    // Draw right page
    if (rightIdx >= 0) {
      const [srcPage] = await outDoc.copyPages(srcDoc, [rightIdx]);
      const embedded = await outDoc.embedPage(srcPage);
      const { width: pw, height: ph } = embedded;

      const scaleX = halfW / pw;
      const scaleY = sheetH / ph;
      const scale = Math.min(scaleX, scaleY);
      const drawW = pw * scale;
      const drawH = ph * scale;
      const drawX = halfW + (halfW - drawW) / 2;
      const drawY = (sheetH - drawH) / 2;

      page.drawPage(embedded, { x: drawX, y: drawY, width: drawW, height: drawH });
    }

    onProgress(25 + Math.round(((i + 1) / pairs.length) * 65));
  }

  onProgress(95);
  const pdfBytes = await outDoc.save();
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  onProgress(100);

  const baseName = file.name.replace(/\.pdf$/i, "");
  return {
    blob,
    filename: `${baseName}_booklet.pdf`,
    size: blob.size,
    pageCount: outDoc.getPageCount(),
  } satisfies ProcessingResult;
};

export default bookletPdf;
