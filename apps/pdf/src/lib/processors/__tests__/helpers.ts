import { readFileSync } from "fs";
import { resolve } from "path";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

const FIXTURES_DIR = resolve(__dirname, "../../../../test-fixtures");
const ROOT_FIXTURES_DIR = resolve(__dirname, "../../../../../../test-fixtures");

/**
 * Load a test fixture PDF as a File object (Node emulation)
 */
export function loadFixture(filename: string): File {
  const buf = readFileSync(resolve(FIXTURES_DIR, filename));
  const blob = new Blob([buf], { type: "application/pdf" });
  return new File([blob], filename, { type: "application/pdf" });
}

/**
 * Create a synthetic PDF with N pages, each with a unique marker + distinct page size.
 * - Text marker: "PAGE_1", "PAGE_2", ...
 * - Width: 500 + pageNum (so page 1 = 501, page 2 = 502, etc.)
 * - Height: always 842
 *
 * This allows verifying both page identity (via width) and order after processing.
 */
export async function createMarkedPdf(pageCount: number): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont("Helvetica" as never);

  for (let i = 0; i < pageCount; i++) {
    const pageWidth = 500 + (i + 1); // unique width per page
    const page = doc.addPage([pageWidth, 842]);
    page.drawText(`PAGE_${i + 1}`, {
      x: 50,
      y: 400,
      size: 40,
      font,
    });
  }

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], `marked-${pageCount}p.pdf`, { type: "application/pdf" });
}

/**
 * Read a result Blob back into a PDFDocument for verification
 */
export async function resultToPdf(blob: Blob): Promise<PDFDocument> {
  const ab = await blob.arrayBuffer();
  return PDFDocument.load(ab);
}

/**
 * Extract all PDFs from a ZIP blob, sorted by filename
 */
export async function extractZipPdfs(blob: Blob): Promise<PDFDocument[]> {
  const ab = await blob.arrayBuffer();
  const zip = await JSZip.loadAsync(ab);
  const pdfs: PDFDocument[] = [];

  const entries = Object.entries(zip.files)
    .filter(([name]) => name.endsWith(".pdf"))
    .sort(([a], [b]) => {
      // Numeric sort: extract trailing number before .pdf (e.g., "_2.pdf" → 2)
      const numA = parseInt(a.match(/_(\d+)\.pdf$/)?.[1] ?? "0", 10);
      const numB = parseInt(b.match(/_(\d+)\.pdf$/)?.[1] ?? "0", 10);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

  for (const [, file] of entries) {
    const data = await file.async("arraybuffer");
    pdfs.push(await PDFDocument.load(data));
  }

  return pdfs;
}

/**
 * Extract ZIP filenames (sorted)
 */
export async function extractZipFilenames(blob: Blob): Promise<string[]> {
  const ab = await blob.arrayBuffer();
  const zip = await JSZip.loadAsync(ab);
  return Object.keys(zip.files)
    .filter((name) => name.endsWith(".pdf"))
    .sort((a, b) => {
      const numA = parseInt(a.match(/_(\d+)\.pdf$/)?.[1] ?? "0", 10);
      const numB = parseInt(b.match(/_(\d+)\.pdf$/)?.[1] ?? "0", 10);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });
}

/**
 * Get page count from result (handles both single PDF and ZIP)
 */
export async function getResultPageCounts(blob: Blob, filename: string): Promise<number[]> {
  if (filename.endsWith(".zip")) {
    const pdfs = await extractZipPdfs(blob);
    return pdfs.map((pdf) => pdf.getPageCount());
  }
  const pdf = await resultToPdf(blob);
  return [pdf.getPageCount()];
}

/**
 * Get the page widths from a result PDF.
 * Since createMarkedPdf assigns width = 500 + pageNum,
 * we can derive the original page number: width - 500.
 *
 * Returns the original page numbers in result order.
 */
export async function getPageOrder(pdf: PDFDocument): Promise<number[]> {
  const order: number[] = [];
  for (let i = 0; i < pdf.getPageCount(); i++) {
    const page = pdf.getPage(i);
    const width = Math.round(page.getSize().width);
    order.push(width - 500);
  }
  return order;
}

/**
 * Get rotation angles for all pages in a PDFDocument
 */
export function getPageRotations(pdf: PDFDocument): number[] {
  const rotations: number[] = [];
  for (let i = 0; i < pdf.getPageCount(); i++) {
    rotations.push(pdf.getPage(i).getRotation().angle);
  }
  return rotations;
}

/**
 * Get page sizes (width x height) for all pages
 */
export function getPageSizes(pdf: PDFDocument): { width: number; height: number }[] {
  const sizes: { width: number; height: number }[] = [];
  for (let i = 0; i < pdf.getPageCount(); i++) {
    const { width, height } = pdf.getPage(i).getSize();
    sizes.push({ width: Math.round(width), height: Math.round(height) });
  }
  return sizes;
}

/**
 * No-op progress tracker that records progress values
 */
export function createProgressTracker() {
  const values: number[] = [];
  const onProgress = (n: number) => values.push(n);
  return { values, onProgress };
}

/**
 * Helper to generate a fileId matching merge.ts's fileId function
 */
export function fileId(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

/**
 * Load an image fixture (jpg/png) from the root test-fixtures directory
 */
export function loadImageFixture(subdir: "jpg" | "png", filename: string): File {
  const buf = readFileSync(resolve(ROOT_FIXTURES_DIR, subdir, filename));
  const mimeType = subdir === "jpg" ? "image/jpeg" : "image/png";
  const blob = new Blob([buf], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

const MIME_MAP: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  svg: "image/svg+xml",
  bmp: "image/bmp",
  ico: "image/x-icon",
};

/**
 * Load any image fixture from test-fixtures/images/ directory.
 * Auto-detects MIME type from file extension.
 */
export function loadAnyImageFixture(filename: string): File {
  const buf = readFileSync(resolve(ROOT_FIXTURES_DIR, "images", filename));
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const mimeType = MIME_MAP[ext] ?? "application/octet-stream";
  const blob = new Blob([buf], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

/**
 * Load a scan fixture from test-fixtures/scan/ directory.
 * Auto-detects MIME type from file extension.
 */
export function loadScanFixture(filename: string): File {
  const buf = readFileSync(resolve(ROOT_FIXTURES_DIR, "scan", filename));
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const mimeType = MIME_MAP[ext] ?? "application/octet-stream";
  const blob = new Blob([buf], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}
