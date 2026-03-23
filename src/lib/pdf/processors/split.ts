import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

async function createDocFromPages(
  srcDoc: PDFDocument,
  indices: number[],
): Promise<PDFDocument> {
  const doc = await PDFDocument.create();
  if (indices.length === 0) return doc;
  const pages = await doc.copyPages(srcDoc, indices);
  for (const page of pages) doc.addPage(page);
  return doc;
}

async function splitByRange(
  srcDoc: PDFDocument,
  options: Record<string, unknown>,
  totalPages: number,
  onProgress: (n: number) => void,
): Promise<PDFDocument[]> {
  const rangeType = (options.rangeType as string) ?? "custom";
  const mergeIntoOne = options.mergeIntoOne === true;

  let ranges: { from: number; to: number }[];

  if (rangeType === "fixed") {
    // DnD reorder may provide ranges override
    const override = options.ranges as { from: number; to: number }[] | undefined;
    if (override && override.length > 0) {
      ranges = override;
    } else {
      const interval = Math.max(1, (options.fixedInterval as number) ?? 1);
      ranges = [];
      for (let i = 0; i < totalPages; i += interval) {
        ranges.push({ from: i + 1, to: Math.min(i + interval, totalPages) });
      }
    }
  } else {
    ranges = (options.ranges as { from: number; to: number }[]) ?? [
      { from: 1, to: totalPages },
    ];
  }

  ranges = ranges
    .map((r) => ({
      from: Math.max(1, Math.min(r.from, totalPages)),
      to: Math.max(1, Math.min(r.to, totalPages)),
    }))
    .filter((r) => r.from <= r.to);

  if (ranges.length === 0) ranges = [{ from: 1, to: totalPages }];

  if (mergeIntoOne) {
    const indices = ranges.flatMap((r) =>
      Array.from({ length: r.to - r.from + 1 }, (_, i) => r.from - 1 + i),
    );
    const doc = await createDocFromPages(srcDoc, indices);
    onProgress(70);
    return [doc];
  }

  const results: PDFDocument[] = [];
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    const indices = Array.from(
      { length: range.to - range.from + 1 },
      (_, j) => range.from - 1 + j,
    );
    const doc = await createDocFromPages(srcDoc, indices);
    results.push(doc);
    onProgress(((i + 1) / ranges.length) * 70);
  }
  return results;
}

async function splitByExtract(
  srcDoc: PDFDocument,
  options: Record<string, unknown>,
  totalPages: number,
  onProgress: (n: number) => void,
): Promise<PDFDocument[]> {
  const extractAll = options.extractAll !== false;
  const mergeIntoOne = options.mergeIntoOne === true;

  let pageNumbers: number[];

  if (extractAll) {
    // extractPages may contain reordered pages from DnD
    const override = options.extractPages as number[] | undefined;
    if (override && override.length > 0) {
      pageNumbers = override.filter((p) => p >= 1 && p <= totalPages);
    } else {
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  } else {
    pageNumbers = ((options.extractPages as number[]) ?? []).filter(
      (p) => p >= 1 && p <= totalPages,
    );
  }

  if (pageNumbers.length === 0) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (mergeIntoOne) {
    const indices = pageNumbers.map((p) => p - 1);
    const doc = await createDocFromPages(srcDoc, indices);
    onProgress(70);
    return [doc];
  }

  const results: PDFDocument[] = [];
  for (let i = 0; i < pageNumbers.length; i++) {
    const doc = await createDocFromPages(srcDoc, [pageNumbers[i] - 1]);
    results.push(doc);
    onProgress(((i + 1) / pageNumbers.length) * 70);
  }
  return results;
}

async function splitBySize(
  srcDoc: PDFDocument,
  options: Record<string, unknown>,
  totalPages: number,
  onProgress: (n: number) => void,
): Promise<PDFDocument[]> {
  const maxSizeBytes = ((options.maxSizeKB as number) ?? 5120) * 1024;
  const results: PDFDocument[] = [];

  // Estimate per-page size from a single-page sample to avoid repeated save()
  const sampleDoc = await createDocFromPages(srcDoc, [0]);
  const sampleBytes = await sampleDoc.save();
  const avgPageSize = Math.max(sampleBytes.length, 1024);

  let startIdx = 0;

  while (startIdx < totalPages) {
    // Estimate how many pages fit within the size limit
    const remaining = totalPages - startIdx;
    let guess = Math.max(1, Math.floor(maxSizeBytes / avgPageSize));
    guess = Math.min(guess, remaining);

    // Verify with a single save, then adjust down if needed
    let indices = Array.from({ length: guess }, (_, i) => startIdx + i);
    let doc = await createDocFromPages(srcDoc, indices);
    let bytes = await doc.save();

    if (bytes.length > maxSizeBytes && guess > 1) {
      // Over limit — reduce by estimated ratio, minimum 1 page
      const ratio = maxSizeBytes / bytes.length;
      guess = Math.max(1, Math.floor(guess * ratio * 0.9));
      indices = Array.from({ length: guess }, (_, i) => startIdx + i);
      doc = await createDocFromPages(srcDoc, indices);
      bytes = await doc.save();

      // If still over limit, fall back to 1 page at a time
      while (bytes.length > maxSizeBytes && guess > 1) {
        guess = Math.max(1, guess - 1);
        indices = Array.from({ length: guess }, (_, i) => startIdx + i);
        doc = await createDocFromPages(srcDoc, indices);
        bytes = await doc.save();
      }
    }

    results.push(doc);
    startIdx += guess;
    onProgress((startIdx / totalPages) * 70);
  }

  return results;
}

const splitPdf: ProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  if (!file) throw new Error("No file provided");

  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const totalPages = srcDoc.getPageCount();
  const mode = (options.mode as string) ?? "range";

  let outputDocs: PDFDocument[];

  switch (mode) {
    case "extract":
      outputDocs = await splitByExtract(srcDoc, options, totalPages, onProgress);
      break;
    case "size":
      outputDocs = await splitBySize(srcDoc, options, totalPages, onProgress);
      break;
    default:
      outputDocs = await splitByRange(srcDoc, options, totalPages, onProgress);
      break;
  }

  const baseName = file.name.replace(/\.pdf$/i, "");

  if (outputDocs.length === 1) {
    const pdfBytes = await outputDocs[0].save();
    onProgress(100);
    const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
    return {
      blob,
      filename: `${baseName}_split.pdf`,
      size: blob.size,
      pageCount: outputDocs[0].getPageCount(),
    } satisfies ProcessingResult;
  }

  const zip = new JSZip();
  for (let i = 0; i < outputDocs.length; i++) {
    const pdfBytes = await outputDocs[i].save();
    zip.file(`${baseName}_${i + 1}.pdf`, pdfBytes);
    onProgress(75 + ((i + 1) / outputDocs.length) * 20);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: `${baseName}_split.zip`,
    size: zipBlob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default splitPdf;
