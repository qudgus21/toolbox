import { PDFDocument } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";

/**
 * Delete Pages processor
 *
 * options.pagesToDelete: number[] — 1-based page numbers to remove
 * options.pageOrder?: number[]   — 1-based page order (from DnD reorder)
 *                                  If provided, kept pages follow this order.
 */
const deletePagesPdf: ProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  if (!file) throw new Error("No file provided");

  const pagesToDelete = (options.pagesToDelete as number[] | undefined) ?? [];

  if (pagesToDelete.length === 0) {
    throw new Error("No pages selected for deletion");
  }

  onProgress(10);

  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const totalPages = srcDoc.getPageCount();

  const deleteSet = new Set(
    pagesToDelete.filter((p) => p >= 1 && p <= totalPages),
  );

  if (deleteSet.size === 0) {
    throw new Error("No valid pages selected for deletion");
  }

  if (deleteSet.size >= totalPages) {
    throw new Error("Cannot delete all pages from PDF");
  }

  onProgress(30);

  // Use custom page order if provided (from DnD), otherwise default 1..N
  const pageOrder = (options.pageOrder as number[] | undefined) ??
    Array.from({ length: totalPages }, (_, i) => i + 1);

  // Filter out deleted pages, keeping the user's chosen order
  const pagesToKeep = pageOrder.filter(
    (p) => p >= 1 && p <= totalPages && !deleteSet.has(p),
  );

  const indicesToKeep = pagesToKeep.map((p) => p - 1);

  const doc = await PDFDocument.create();
  const pages = await doc.copyPages(srcDoc, indicesToKeep);
  for (const page of pages) doc.addPage(page);

  onProgress(70);

  const pdfBytes = await doc.save();
  onProgress(100);

  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  const baseName = file.name.replace(/\.pdf$/i, "");

  return {
    blob,
    filename: `${baseName}_deleted.pdf`,
    size: blob.size,
    pageCount: doc.getPageCount(),
  } satisfies ProcessingResult;
};

export default deletePagesPdf;
