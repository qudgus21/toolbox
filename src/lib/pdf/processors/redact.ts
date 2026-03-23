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

function canvasToJpegBytes(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) { reject(new Error("Canvas toBlob failed")); return; }
        blob.arrayBuffer().then((ab) => resolve(new Uint8Array(ab)));
      },
      "image/jpeg",
      quality,
    );
  });
}

const redact: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const file = files[0];
  const redactions = (options.redactions ?? []) as RedactArea[];

  if (redactions.length === 0) throw new Error("No redactions specified");

  onProgress(5);

  const bytes = await file.arrayBuffer();

  // Step 1: Draw opaque rectangles using pdf-lib
  const overlayDoc = await PDFDocument.load(bytes);
  const totalPages = overlayDoc.getPageCount();

  // Group redactions by page
  const byPage = new Map<number, RedactArea[]>();
  for (const r of redactions) {
    if (!byPage.has(r.pageIndex)) byPage.set(r.pageIndex, []);
    byPage.get(r.pageIndex)!.push(r);
  }

  for (const [pageIdx, pageRedactions] of byPage) {
    if (pageIdx < 0 || pageIdx >= totalPages) continue;
    const page = overlayDoc.getPage(pageIdx);
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
  }

  onProgress(20);

  // Step 2: Rasterize redacted pages to permanently remove underlying content
  const overlayBytes = await overlayDoc.save();

  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const pdfDoc = await pdfjsLib.getDocument({ data: overlayBytes }).promise;
  const outputDoc = await PDFDocument.create();
  const copySourceDoc = await PDFDocument.load(overlayBytes);

  const RASTER_SCALE = 2; // High quality rasterization

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdfDoc.getPage(i);
    const pageIdx = i - 1;

    if (byPage.has(pageIdx)) {
      // Redacted page: rasterize to remove underlying text data
      const viewport = page.getViewport({ scale: RASTER_SCALE });
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext("2d")!;

      await (page.render({
        canvasContext: ctx,
        viewport,
        canvas,
      } as Parameters<typeof page.render>[0]) as { promise: Promise<void> }).promise;

      const jpegBytes = await canvasToJpegBytes(canvas, 0.95);
      const origSize = page.getViewport({ scale: 1 });
      canvas.width = 0;
      canvas.height = 0;
      page.cleanup();

      const image = await outputDoc.embedJpg(jpegBytes);
      const newPage = outputDoc.addPage([origSize.width, origSize.height]);
      newPage.drawImage(image, {
        x: 0,
        y: 0,
        width: origSize.width,
        height: origSize.height,
      });
    } else {
      // Non-redacted page: copy as-is to preserve vector content
      const [copiedPage] = await outputDoc.copyPages(copySourceDoc, [pageIdx]);
      outputDoc.addPage(copiedPage);
      page.cleanup();
    }

    onProgress(20 + Math.round((i / totalPages) * 70));
  }

  pdfDoc.destroy();

  onProgress(95);

  const pdfBytes = await outputDoc.save();
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
