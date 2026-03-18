import { PDFDocument } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";
import type { OverlayOptions } from "./overlay-types";

/**
 * Overlay processor — merges two PDFs as layers.
 *
 * files[0] = content PDF (base document)
 * files[1] = overlay PDF (letterhead / stamp / watermark)
 *
 * Each page of the content PDF gets the overlay drawn on top or below.
 */
const overlayPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length < 2) throw new Error("Two PDF files are required");

  const opts = options as unknown as OverlayOptions;
  const contentFile = files[0];
  const overlayFile = files[1];

  onProgress(5);

  const [contentBytes, overlayBytes] = await Promise.all([
    contentFile.arrayBuffer(),
    overlayFile.arrayBuffer(),
  ]);

  onProgress(15);

  const contentDoc = await PDFDocument.load(contentBytes);
  const overlayDoc = await PDFDocument.load(overlayBytes);

  const contentPageCount = contentDoc.getPageCount();
  const overlayPageCount = overlayDoc.getPageCount();

  onProgress(25);

  // Create output document
  const outDoc = await PDFDocument.create();

  for (let i = 0; i < contentPageCount; i++) {
    // Determine which overlay page to use
    let overlayPageIndex: number;
    if (opts.overlayMode === "repeat-first") {
      overlayPageIndex = 0;
    } else {
      // "match" mode — use corresponding page, skip if no overlay page
      overlayPageIndex = i < overlayPageCount ? i : -1;
    }

    // Copy the content page to the output
    const [contentPageCopy] = await outDoc.copyPages(contentDoc, [i]);
    const { width: cw, height: ch } = contentPageCopy.getSize();

    if (overlayPageIndex >= 0 && overlayPageIndex < overlayPageCount) {
      // Embed the overlay page
      const [overlayPageCopy] = await outDoc.copyPages(overlayDoc, [overlayPageIndex]);
      const embeddedOverlay = await outDoc.embedPage(overlayPageCopy);
      const { width: ow, height: oh } = embeddedOverlay;

      // Calculate scale and position
      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (opts.scaleMode === "fit") {
        const scaleX = cw / ow;
        const scaleY = ch / oh;
        const scale = Math.min(scaleX, scaleY);
        drawW = ow * scale;
        drawH = oh * scale;
        drawX = (cw - drawW) / 2;
        drawY = (ch - drawH) / 2;
      } else if (opts.scaleMode === "stretch") {
        drawW = cw;
        drawH = ch;
        drawX = 0;
        drawY = 0;
      } else {
        // "original" — center without scaling
        drawW = ow;
        drawH = oh;
        drawX = (cw - ow) / 2;
        drawY = (ch - oh) / 2;
      }

      if (opts.layer === "below") {
        // Draw overlay first on a new page, then draw content on top
        const newPage = outDoc.addPage([cw, ch]);
        newPage.drawPage(embeddedOverlay, { x: drawX, y: drawY, width: drawW, height: drawH });
        const embeddedContent = await outDoc.embedPage(contentPageCopy);
        newPage.drawPage(embeddedContent, { x: 0, y: 0, width: cw, height: ch });
      } else {
        // Draw content first, then overlay on top
        outDoc.addPage(contentPageCopy);
        const page = outDoc.getPage(outDoc.getPageCount() - 1);
        page.drawPage(embeddedOverlay, { x: drawX, y: drawY, width: drawW, height: drawH });
      }
    } else {
      // No overlay for this page — just add the content page
      outDoc.addPage(contentPageCopy);
    }

    onProgress(25 + Math.round(((i + 1) / contentPageCount) * 65));
  }

  onProgress(95);
  const pdfBytes = await outDoc.save();
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  onProgress(100);

  const baseName = contentFile.name.replace(/\.pdf$/i, "");
  return {
    blob,
    filename: `${baseName}_overlay.pdf`,
    size: blob.size,
    pageCount: contentPageCount,
  } satisfies ProcessingResult;
};

export default overlayPdf;
