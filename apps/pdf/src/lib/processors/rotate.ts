import { PDFDocument, degrees } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

function fileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

/**
 * Rotate PDF processor (multi-file)
 *
 * options.rotations: Record<string, number> — fileKey → rotation angle (0/90/180/270)
 * All pages of each file are rotated by the same angle.
 * Single file → rotated PDF, multiple files → ZIP.
 */
const rotatePdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const rotations = (options.rotations ?? {}) as Record<string, number>;

  const results: { name: string; bytes: Uint8Array; pageCount: number }[] = [];

  for (let fi = 0; fi < files.length; fi++) {
    const file = files[fi];
    const key = fileId(file);
    const rotation = rotations[key] ?? 0;

    const bytes = await file.arrayBuffer();
    const srcDoc = await PDFDocument.load(bytes);
    const totalPages = srcDoc.getPageCount();

    const doc = await PDFDocument.create();
    const indices = Array.from({ length: totalPages }, (_, i) => i);
    const copiedPages = await doc.copyPages(srcDoc, indices);

    for (const page of copiedPages) {
      if (rotation !== 0) {
        page.setRotation(degrees((page.getRotation().angle + rotation) % 360));
      }
      doc.addPage(page);
    }

    const pdfBytes = await doc.save();
    const baseName = file.name.replace(/\.pdf$/i, "");
    results.push({
      name: `${baseName}_rotated.pdf`,
      bytes: pdfBytes,
      pageCount: doc.getPageCount(),
    });

    onProgress(((fi + 1) / files.length) * 90);
  }

  // Single file → direct PDF
  if (results.length === 1) {
    const r = results[0];
    const blob = new Blob([r.bytes as BlobPart], { type: "application/pdf" });
    onProgress(100);
    return {
      blob,
      filename: r.name,
      size: blob.size,
      pageCount: r.pageCount,
    } satisfies ProcessingResult;
  }

  // Multiple files → ZIP
  const zip = new JSZip();
  let totalPageCount = 0;
  for (const r of results) {
    zip.file(r.name, r.bytes);
    totalPageCount += r.pageCount;
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "rotated_pdfs.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default rotatePdf;
