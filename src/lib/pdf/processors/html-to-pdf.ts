import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

// ── Page size definitions (points, 1pt = 1/72 inch) ─────────────────
export type PageSizeKey =
  | "a4"
  | "a3"
  | "a5"
  | "letter"
  | "legal"
  | "b5"
  | "photo4x6"
  | "photo5x7"
  | "postcard";

export type Orientation = "portrait" | "landscape";

interface PageDimensions {
  width: number;
  height: number;
}

const PAGE_SIZES: Record<PageSizeKey, PageDimensions> = {
  a4: { width: 595.28, height: 841.89 },
  a3: { width: 841.89, height: 1190.55 },
  a5: { width: 419.53, height: 595.28 },
  letter: { width: 612, height: 792 },
  legal: { width: 612, height: 1008 },
  b5: { width: 498.9, height: 708.66 },
  photo4x6: { width: 288, height: 432 },
  photo5x7: { width: 360, height: 504 },
  postcard: { width: 283.46, height: 419.53 },
};

/** Convert mm to PDF points (1pt = 1/72 inch, 1mm ≈ 2.835pt) */
const MM_TO_PT = 2.83465;

/** PDF points to CSS pixels (96dpi) — 1pt = 96/72 px */
const PT_TO_PX = 96 / 72;

/**
 * Best-effort strip of scripts, event handlers, and dangerous elements.
 * NOTE: Regex-based sanitization is bypassable — the real security boundary
 * is the iframe sandbox (no allow-scripts) in renderHtmlToCanvas.
 */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, "")
    .replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"')
    .replace(/href\s*=\s*'javascript:[^']*'/gi, "href='#'")
    .replace(/<(iframe|embed|object)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(iframe|embed|object)[^>]*\/?\s*>/gi, "");
}

/** Read a File as text string */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsText(file);
  });
}

/**
 * Render HTML content in a hidden iframe and capture via html2canvas.
 * Returns a canvas containing the full rendered content.
 */
async function renderHtmlToCanvas(
  htmlContent: string,
  renderWidthPx: number,
): Promise<HTMLCanvasElement> {
  const sanitized = sanitizeHtml(htmlContent);

  // Create hidden iframe
  const iframe = document.createElement("iframe");
  iframe.style.cssText = `position:fixed;left:-9999px;top:0;width:${renderWidthPx}px;height:100vh;border:none;visibility:hidden;`;
  iframe.sandbox.add("allow-same-origin");
  document.body.appendChild(iframe);

  try {
    // Write HTML content
    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(sanitized);
    doc.close();

    // Wait for content to load
    await new Promise<void>((resolve) => {
      if (doc.readyState === "complete") {
        resolve();
      } else {
        iframe.onload = () => resolve();
      }
    });

    // Small delay for rendering
    await new Promise((r) => setTimeout(r, 200));

    // Set body width to match and get actual height
    doc.body.style.width = `${renderWidthPx}px`;
    doc.body.style.margin = "0";
    doc.body.style.padding = "8px";
    doc.body.style.boxSizing = "border-box";

    // Capture with html2canvas
    const canvas = await html2canvas(doc.body, {
      width: renderWidthPx,
      windowWidth: renderWidthPx,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      scale: 2, // 2x resolution for crisp text
    });

    return canvas;
  } finally {
    document.body.removeChild(iframe);
  }
}

/**
 * Slice a tall canvas into page-sized chunks and embed each as a PDF page.
 */
async function addHtmlPagesToPdf(
  pdfDoc: PDFDocument,
  canvas: HTMLCanvasElement,
  pageSize: PageSizeKey,
  orientation: Orientation,
  marginMm: number,
): Promise<number> {
  const dims = PAGE_SIZES[pageSize];
  let pageW: number;
  let pageH: number;

  if (orientation === "landscape") {
    pageW = Math.max(dims.width, dims.height);
    pageH = Math.min(dims.width, dims.height);
  } else {
    pageW = Math.min(dims.width, dims.height);
    pageH = Math.max(dims.width, dims.height);
  }

  const m = marginMm * MM_TO_PT;
  const availW = pageW - m * 2;
  const availH = pageH - m * 2;

  // Scale factor: canvas pixels → PDF points
  const scale = availW / canvas.width;
  const canvasPageHeightPx = availH / scale;

  const totalPages = Math.max(1, Math.ceil(canvas.height / canvasPageHeightPx));

  for (let i = 0; i < totalPages; i++) {
    const srcY = i * canvasPageHeightPx;
    const srcH = Math.min(canvasPageHeightPx, canvas.height - srcY);

    // Create a chunk canvas
    const chunk = document.createElement("canvas");
    chunk.width = canvas.width;
    chunk.height = Math.ceil(srcH);
    const ctx = chunk.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, chunk.width, chunk.height);
    ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

    // Convert to PNG
    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      chunk.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png");
    });
    const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
    chunk.width = 0; chunk.height = 0;
    const embedded = await pdfDoc.embedPng(pngBytes);

    // Draw on PDF page
    const drawH = srcH * scale;
    const page = pdfDoc.addPage([pageW, pageH]);
    page.drawImage(embedded, {
      x: m,
      y: pageH - m - drawH, // PDF origin is bottom-left
      width: availW,
      height: drawH,
    });
  }

  return totalPages;
}

// ── Main processor ──────────────────────────────────────────────────

/** Stitch multiple canvases vertically with a pixel gap between them */
function stitchCanvases(canvases: HTMLCanvasElement[], gapPx: number): HTMLCanvasElement {
  if (canvases.length === 1 && gapPx === 0) return canvases[0];
  const width = canvases[0].width;
  const totalH = canvases.reduce((s, c) => s + c.height, 0) + gapPx * (canvases.length - 1);
  const result = document.createElement("canvas");
  result.width = width;
  result.height = totalH;
  const ctx = result.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, totalH);
  let y = 0;
  for (let i = 0; i < canvases.length; i++) {
    if (i > 0) y += gapPx;
    ctx.drawImage(canvases[i], 0, y);
    y += canvases[i].height;
  }
  return result;
}

export type FileBreak = "new-page" | "continuous";

const htmlToPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const pageSize = (options.pageSize as PageSizeKey) ?? "a4";
  const orientation = (options.orientation as Orientation) ?? "portrait";
  const marginMm = (options.marginMm as number) ?? 0;
  const mergeAll = (options.mergeAll as boolean) ?? true;
  const fileBreak = (options.fileBreak as FileBreak) ?? "new-page";
  const fileGapMm = (options.fileGapMm as number) ?? 10;

  onProgress(5);

  // Calculate render width in CSS pixels
  const dims = PAGE_SIZES[pageSize];
  const m = marginMm * MM_TO_PT;
  const pageW = orientation === "landscape"
    ? Math.max(dims.width, dims.height)
    : Math.min(dims.width, dims.height);
  const availW = pageW - m * 2;
  const renderWidthPx = Math.round(availW * PT_TO_PX);

  // Single file or merge mode → single PDF
  if (files.length === 1 || mergeAll) {
    const pdfDoc = await PDFDocument.create();
    const progressPerFile = 70 / files.length;

    // Render all HTML files to canvases
    const canvases: HTMLCanvasElement[] = [];
    for (let i = 0; i < files.length; i++) {
      const htmlContent = await readFileAsText(files[i]);
      onProgress(5 + progressPerFile * i + progressPerFile * 0.3);
      const canvas = await renderHtmlToCanvas(htmlContent, renderWidthPx);
      canvases.push(canvas);
      onProgress(5 + progressPerFile * (i + 1));
    }

    onProgress(80);

    let totalPageCount: number;
    if (fileBreak === "continuous" && canvases.length > 1) {
      // Stitch canvases with gap, then slice into pages
      const gapPx = Math.round(fileGapMm * MM_TO_PT * PT_TO_PX * 2); // *2 for html2canvas 2x scale
      const combined = stitchCanvases(canvases, gapPx);
      totalPageCount = await addHtmlPagesToPdf(pdfDoc, combined, pageSize, orientation, marginMm);
      combined.width = 0; combined.height = 0;
    } else {
      // Each file starts on a new page
      totalPageCount = 0;
      for (const canvas of canvases) {
        totalPageCount += await addHtmlPagesToPdf(pdfDoc, canvas, pageSize, orientation, marginMm);
      }
    }
    for (const c of canvases) { c.width = 0; c.height = 0; }

    onProgress(90);
    const pdfBytes = await pdfDoc.save();
    onProgress(95);

    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName =
      files.length === 1
        ? files[0].name.replace(/\.[^.]+$/, "")
        : "html_merged";

    onProgress(100);

    return {
      blob,
      filename: `${baseName}.pdf`,
      size: blob.size,
      pageCount: totalPageCount,
    } satisfies ProcessingResult;
  }

  // Multiple files, separate PDFs → ZIP
  const zip = new JSZip();
  const progressPerFile = 80 / files.length;
  let totalPageCount = 0;

  for (let i = 0; i < files.length; i++) {
    const htmlContent = await readFileAsText(files[i]);
    const canvas = await renderHtmlToCanvas(htmlContent, renderWidthPx);

    const pdfDoc = await PDFDocument.create();
    const pages = await addHtmlPagesToPdf(pdfDoc, canvas, pageSize, orientation, marginMm);
    canvas.width = 0; canvas.height = 0;
    totalPageCount += pages;

    const pdfBytes = await pdfDoc.save();
    const baseName = files[i].name.replace(/\.[^.]+$/, "");
    zip.file(`${baseName}.pdf`, pdfBytes);

    onProgress(5 + progressPerFile * (i + 1));
  }

  onProgress(92);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "html_to_pdf.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default htmlToPdf;
