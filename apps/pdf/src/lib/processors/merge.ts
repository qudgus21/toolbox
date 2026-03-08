import { PDFDocument, degrees } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";

function fileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

const mergePdf: ProcessorFn = async (files, options, onProgress) => {
  const rotations = (options.rotations ?? {}) as Record<string, number>;
  const pageSelections = (options.pageSelections ?? {}) as Record<string, number[]>;
  const merged = await PDFDocument.create();
  let totalPages = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const key = fileId(file);
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const rotation = rotations[key] ?? 0;

    // 선택된 페이지만 (없으면 전체)
    const allIndices = doc.getPageIndices();
    const selectedPages = pageSelections[key];
    const indicesToCopy = selectedPages
      ? selectedPages.map((p) => p - 1).filter((idx) => allIndices.includes(idx))
      : allIndices;

    const pages = await merged.copyPages(doc, indicesToCopy);

    for (const page of pages) {
      if (rotation !== 0) {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotation));
      }
      merged.addPage(page);
      totalPages++;
    }
    onProgress(((i + 1) / files.length) * 90);
  }

  const pdfBytes = await merged.save();
  onProgress(100);

  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });

  return {
    blob,
    filename: "merged.pdf",
    size: blob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default mergePdf;
