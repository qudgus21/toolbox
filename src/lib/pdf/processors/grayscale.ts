import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

function fileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

/** Render a single PDF page to a grayscale PNG blob via canvas. */
async function renderPageGrayscale(
  doc: Awaited<ReturnType<Awaited<typeof import("pdfjs-dist")>["getDocument"]>>["promise"] extends Promise<infer T> ? T : never,
  pageNum: number,
  scale: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext("2d")!;

  // Render the page
  await (
    page.render({
      canvasContext: ctx,
      viewport,
      canvas,
    } as Parameters<typeof page.render>[0]) as { promise: Promise<void> }
  ).promise;

  // Convert to grayscale via pixel manipulation (luminance formula)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  ctx.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas toBlob failed"))),
      "image/png",
    );
  });

  return { blob, width: canvas.width, height: canvas.height };
}

/**
 * Grayscale PDF processor (multi-file)
 *
 * Renders each page to canvas, applies grayscale conversion,
 * then embeds the result back into a new PDF preserving page dimensions.
 * Single file → PDF, multiple files → ZIP.
 */
const grayscalePdf: ProcessorFn = async (files, _options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  onProgress(5);

  // Load pdfjs-dist dynamically
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  onProgress(8);

  // Count total pages for progress
  const pdfDocs: { file: File; doc: Awaited<ReturnType<typeof pdfjsLib.getDocument>>["promise"] extends Promise<infer T> ? T : never }[] = [];
  let totalPages = 0;

  for (const file of files) {
    const ab = await file.arrayBuffer();
    const doc = await pdfjsLib.getDocument({ data: ab }).promise;
    pdfDocs.push({ file, doc: doc as typeof pdfDocs[0]["doc"] });
    totalPages += doc.numPages;
  }

  onProgress(10);

  const RENDER_SCALE = 2; // 144 dpi — good quality/speed balance
  const results: { name: string; bytes: Uint8Array; pageCount: number }[] = [];
  let processedPages = 0;
  const progressPerPage = 80 / totalPages;

  for (const { file, doc } of pdfDocs) {
    const numPages = doc.numPages;
    const newDoc = await PDFDocument.create();

    for (let p = 1; p <= numPages; p++) {
      const { blob, width, height } = await renderPageGrayscale(doc, p, RENDER_SCALE);
      const pngBytes = new Uint8Array(await blob.arrayBuffer());
      const pngImage = await newDoc.embedPng(pngBytes);

      // Preserve original page dimensions (pdf.js renders at scale, but page size should match original)
      const origPage = await doc.getPage(p);
      const origViewport = origPage.getViewport({ scale: 1 });
      const pageWidth = origViewport.width * 0.75; // Convert from pdf.js units (96dpi based) to PDF points (72dpi)
      const pageHeight = origViewport.height * 0.75;

      const page = newDoc.addPage([pageWidth, pageHeight]);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });

      processedPages++;
      onProgress(10 + progressPerPage * processedPages);
    }

    doc.destroy();

    const pdfBytes = await newDoc.save();
    const baseName = file.name.replace(/\.pdf$/i, "");
    results.push({
      name: `${baseName}_grayscale.pdf`,
      bytes: pdfBytes,
      pageCount: numPages,
    });
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
    filename: "grayscale_pdfs.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default grayscalePdf;
