import { PDFDocument, degrees } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";

/**
 * Organize Pages processor
 *
 * options.pageOrder: number[]                — 1-based page order (from DnD).
 *                                              May include duplicates for cloned pages.
 * options.deletedPages: number[]             — 1-based page numbers to remove
 * options.rotations: Record<string, number>  — rotation angle per ordered-index (0/90/180/270)
 */
const organizePagesPdf: ProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  if (!file) throw new Error("No file provided");

  const pageOrder = (options.pageOrder as number[] | undefined) ?? [];
  const deletedPages = (options.deletedPages as number[] | undefined) ?? [];
  const rotations = (options.rotations as Record<string, number> | undefined) ?? {};

  onProgress(10);

  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const totalPages = srcDoc.getPageCount();

  // Build final page list: follow order, skip deleted indices
  const deleteSet = new Set(deletedPages);

  // pageOrder contains ordered indices (0-based into the visual list).
  // Each entry is a 1-based original page number.
  // If pageOrder is empty, use default order.
  const orderedPages =
    pageOrder.length > 0
      ? pageOrder
      : Array.from({ length: totalPages }, (_, i) => i + 1);

  // Filter out deleted entries (by their position index, 0-based)
  const finalPages: { srcPage: number; rotation: number; idx: number }[] = [];
  for (let i = 0; i < orderedPages.length; i++) {
    if (deleteSet.has(i)) continue;
    const srcPage = orderedPages[i];
    if (srcPage < 1 || srcPage > totalPages) continue;
    finalPages.push({
      srcPage,
      rotation: rotations[String(i)] ?? 0,
      idx: i,
    });
  }

  if (finalPages.length === 0) {
    throw new Error("Cannot remove all pages");
  }

  onProgress(30);

  const doc = await PDFDocument.create();
  const srcIndices = finalPages.map((p) => p.srcPage - 1);
  const copiedPages = await doc.copyPages(srcDoc, srcIndices);

  for (let i = 0; i < copiedPages.length; i++) {
    const page = copiedPages[i];
    const rot = finalPages[i].rotation;
    if (rot !== 0) {
      page.setRotation(degrees((page.getRotation().angle + rot) % 360));
    }
    doc.addPage(page);
  }

  onProgress(70);

  const pdfBytes = await doc.save();
  onProgress(100);

  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  const baseName = file.name.replace(/\.pdf$/i, "");

  return {
    blob,
    filename: `${baseName}_organized.pdf`,
    size: blob.size,
    pageCount: doc.getPageCount(),
  } satisfies ProcessingResult;
};

export default organizePagesPdf;
