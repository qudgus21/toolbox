import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

/**
 * PDF to Text processor — multi-file support
 *
 * Uses pdfjs-dist getTextContent() to extract text from each page.
 * options.rotations: ignored (text extraction doesn't depend on rotation)
 */
const pdfToText: ProcessorFn = async (files, _options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  onProgress(5);

  // Load pdfjs-dist dynamically
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  onProgress(8);

  // Load all PDF documents
  const pdfDocs: { file: File; doc: Awaited<ReturnType<typeof pdfjsLib.getDocument>>["promise"] extends Promise<infer T> ? T : never }[] = [];
  let totalPages = 0;

  for (const file of files) {
    const ab = await file.arrayBuffer();
    const doc = await pdfjsLib.getDocument({ data: ab }).promise;
    pdfDocs.push({ file, doc: doc as typeof pdfDocs[0]["doc"] });
    totalPages += doc.numPages;
  }

  onProgress(10);

  // Extract text from a single document
  async function extractText(doc: typeof pdfDocs[0]["doc"]): Promise<string> {
    const pageTexts: string[] = [];

    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const content = await page.getTextContent();

      // Group text items by approximate Y position to reconstruct lines
      const items = content.items.filter(
        (item): item is typeof item & { str: string; transform: number[] } =>
          "str" in item && "transform" in item,
      );

      if (items.length === 0) {
        pageTexts.push("");
        continue;
      }

      // Sort by Y (descending — top first), then X (ascending — left to right)
      items.sort((a, b) => {
        const yDiff = b.transform[5] - a.transform[5];
        if (Math.abs(yDiff) > 2) return yDiff;
        return a.transform[4] - b.transform[4];
      });

      // Group into lines by Y proximity
      const lines: string[][] = [];
      let currentY = items[0].transform[5];
      let currentLine: string[] = [];

      for (const item of items) {
        const y = item.transform[5];
        if (Math.abs(y - currentY) > 2) {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = [];
          currentY = y;
        }
        currentLine.push(item.str);
      }
      if (currentLine.length > 0) lines.push(currentLine);

      pageTexts.push(lines.map((line) => line.join(" ")).join("\n"));
    }

    return pageTexts.join("\n\n--- Page Break ---\n\n");
  }

  // Single file → single TXT
  if (files.length === 1) {
    const { doc, file } = pdfDocs[0];
    const text = await extractText(doc);
    doc.destroy();

    onProgress(90);

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    onProgress(100);

    const baseName = file.name.replace(/\.pdf$/i, "");
    return {
      blob,
      filename: `${baseName}.txt`,
      size: blob.size,
      pageCount: totalPages,
    } satisfies ProcessingResult;
  }

  // Multiple files → ZIP with one TXT per file
  const zip = new JSZip();
  let processedFiles = 0;
  const progressPerFile = 82 / pdfDocs.length;

  for (const { file, doc } of pdfDocs) {
    const baseName = file.name.replace(/\.pdf$/i, "");
    const text = await extractText(doc);
    doc.destroy();

    zip.file(`${baseName}.txt`, text);

    processedFiles++;
    onProgress(10 + progressPerFile * processedFiles);
  }

  onProgress(92);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "pdf_to_text.zip",
    size: zipBlob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default pdfToText;
