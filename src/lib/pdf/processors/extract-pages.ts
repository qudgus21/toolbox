import { PDFDocument } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";

/**
 * Extract Pages processor
 *
 * options.pagesToExtract: number[] — 1-based page numbers to extract
 * options.pageOrder?: number[]    — 1-based page order (from DnD reorder)
 *                                   If provided, extracted pages follow this order.
 */
const extractPagesPdf: ProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  if (!file) throw new Error("No file provided");

  const pagesToExtract = (options.pagesToExtract as number[] | undefined) ?? [];

  if (pagesToExtract.length === 0) {
    throw new Error("No pages selected for extraction");
  }

  onProgress(10);

  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const totalPages = srcDoc.getPageCount();

  const extractSet = new Set(
    pagesToExtract.filter((p) => p >= 1 && p <= totalPages),
  );

  if (extractSet.size === 0) {
    throw new Error("No valid pages selected for extraction");
  }

  if (extractSet.size >= totalPages) {
    throw new Error("Cannot extract all pages — use download instead");
  }

  onProgress(30);

  // Use custom page order if provided (from DnD), otherwise default 1..N
  const pageOrder = (options.pageOrder as number[] | undefined) ??
    Array.from({ length: totalPages }, (_, i) => i + 1);

  // Keep only extracted pages, preserving the user's chosen order
  const pagesToKeep = pageOrder.filter(
    (p) => p >= 1 && p <= totalPages && extractSet.has(p),
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
    filename: `${baseName}_extracted.pdf`,
    size: blob.size,
    pageCount: doc.getPageCount(),
  } satisfies ProcessingResult;
};

export default extractPagesPdf;
