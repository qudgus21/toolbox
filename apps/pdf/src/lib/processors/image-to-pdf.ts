import { PDFDocument, degrees as pdfDegrees } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

// ── Page size definitions (points, 1pt = 1/72 inch) ─────────────────
export type PageSizeKey =
  | "fit"
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

const PAGE_SIZES: Record<Exclude<PageSizeKey, "fit">, PageDimensions> = {
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

/** Check PNG magic bytes: 0x89 0x50 0x4E 0x47 */
function isPng(bytes: Uint8Array): boolean {
  return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
}

/** Check JPEG magic bytes: 0xFF 0xD8 0xFF */
function isJpeg(bytes: Uint8Array): boolean {
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

/**
 * Convert any browser-supported image to PNG bytes via HTMLImageElement + Canvas.
 * Used for formats pdf-lib doesn't support natively (GIF, BMP, TIFF, WebP).
 */
function convertToPngViaCanvas(bytes: Uint8Array, mimeType: string): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) { reject(new Error("Canvas toBlob failed")); return; }
        pngBlob.arrayBuffer().then(
          (buf) => resolve(new Uint8Array(buf)),
          reject,
        );
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to decode image (${mimeType})`));
    };
    img.src = url;
  });
}

/** Guess MIME type from magic bytes */
function guessMime(bytes: Uint8Array): string {
  // GIF: 47 49 46
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "image/gif";
  // BMP: 42 4D
  if (bytes[0] === 0x42 && bytes[1] === 0x4d) return "image/bmp";
  // TIFF: 49 49 or 4D 4D
  if ((bytes[0] === 0x49 && bytes[1] === 0x49) || (bytes[0] === 0x4d && bytes[1] === 0x4d)) return "image/tiff";
  // WebP: RIFF....WEBP
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return "image/webp";
  // AVIF: ....ftypavif (offset 4)
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return "image/avif";
  // ICO: 00 00 01 00
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) return "image/x-icon";
  // SVG: starts with < (text-based)
  if (bytes[0] === 0x3c) return "image/svg+xml";
  return "image/png"; // fallback
}

/**
 * Load image bytes and embed into a PDFDocument.
 * Supports PNG and JPEG natively; other formats (GIF, BMP, TIFF, WebP)
 * are converted to PNG via Canvas before embedding.
 */
async function embedImage(pdfDoc: PDFDocument, bytes: Uint8Array) {
  if (isPng(bytes)) return pdfDoc.embedPng(bytes);
  if (isJpeg(bytes)) return pdfDoc.embedJpg(bytes);

  // Convert unsupported format to PNG via Canvas
  const mime = guessMime(bytes);
  const pngBytes = await convertToPngViaCanvas(bytes, mime);
  return pdfDoc.embedPng(pngBytes);
}

/**
 * Apply rotation to image dimensions.
 * rotation: 0, 90, 180, 270 degrees clockwise
 */
function getRotatedDimensions(
  w: number,
  h: number,
  rotation: number,
): { width: number; height: number } {
  if (rotation === 90 || rotation === 270) {
    return { width: h, height: w };
  }
  return { width: w, height: h };
}

/**
 * Read a File as Uint8Array.
 */
function readFileAsUint8Array(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Add a single image to an existing PDFDocument.
 */
async function addImageToPdf(
  pdfDoc: PDFDocument,
  imageBytes: Uint8Array,
  pageSize: PageSizeKey,
  orientation: Orientation,
  marginMm: number,
  rotation: number,
) {
  const embedded = await embedImage(pdfDoc, imageBytes);
  const imgW = embedded.width;
  const imgH = embedded.height;
  const { width: rotW, height: rotH } = getRotatedDimensions(imgW, imgH, rotation);

  const m = marginMm * MM_TO_PT;

  let pageW: number;
  let pageH: number;

  if (pageSize === "fit") {
    // Page matches rotated image dimensions + margins
    pageW = rotW + m * 2;
    pageH = rotH + m * 2;
  } else {
    const dims = PAGE_SIZES[pageSize];
    if (orientation === "landscape") {
      pageW = Math.max(dims.width, dims.height);
      pageH = Math.min(dims.width, dims.height);
    } else {
      pageW = Math.min(dims.width, dims.height);
      pageH = Math.max(dims.width, dims.height);
    }
  }

  // Available area after margins
  const availW = pageW - m * 2;
  const availH = pageH - m * 2;

  // Scale image to fit within available area (maintain aspect ratio)
  let drawW = rotW;
  let drawH = rotH;

  if (pageSize !== "fit") {
    const scaleX = availW / rotW;
    const scaleY = availH / rotH;
    const scale = Math.min(scaleX, scaleY); // scale to fit page
    drawW = rotW * scale;
    drawH = rotH * scale;
  }

  // Center image on page
  const x = m + (availW - drawW) / 2;
  const y = m + (availH - drawH) / 2;

  const page = pdfDoc.addPage([pageW, pageH]);

  // Apply rotation via pdf-lib page drawing
  if (rotation === 0) {
    page.drawImage(embedded, { x, y, width: drawW, height: drawH });
  } else {
    // Center of the target draw area (based on rotated dimensions)
    const cx = x + drawW / 2;
    const cy = y + drawH / 2;

    // Original (unrotated) image dimensions for drawImage
    const origW = rotation === 90 || rotation === 270 ? drawH : drawW;
    const origH = rotation === 90 || rotation === 270 ? drawW : drawH;

    // pdf-lib rotates around (x, y) i.e. the bottom-left of the image.
    // Compute (imgX, imgY) so the rotated image is centered at (cx, cy).
    const theta = (-rotation * Math.PI) / 180;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const imgX = cx - (origW * cosT - origH * sinT) / 2;
    const imgY = cy - (origW * sinT + origH * cosT) / 2;

    page.drawImage(embedded, {
      x: imgX,
      y: imgY,
      width: origW,
      height: origH,
      rotate: pdfDegrees(-rotation),
    });
  }
}

// ── Main processor ──────────────────────────────────────────────────

const imageToPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const pageSize = (options.pageSize as PageSizeKey) ?? "fit";
  const orientation = (options.orientation as Orientation) ?? "portrait";
  const marginMm = (options.marginMm as number) ?? 0;
  const mergeAll = (options.mergeAll as boolean) ?? true;
  const rotations = (options.rotations as Record<string, number> | undefined) ?? {};

  onProgress(5);

  // Single file or merge mode → single PDF
  if (files.length === 1 || mergeAll) {
    const pdfDoc = await PDFDocument.create();
    const progressPerFile = 85 / files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
      const rotation = rotations[fileKey] ?? 0;
      const bytes = await readFileAsUint8Array(file);

      await addImageToPdf(pdfDoc, bytes, pageSize, orientation, marginMm, rotation);
      onProgress(5 + progressPerFile * (i + 1));
    }

    const pdfBytes = await pdfDoc.save();
    onProgress(95);

    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName =
      files.length === 1
        ? files[0].name.replace(/\.[^.]+$/, "")
        : "images_merged";

    onProgress(100);

    return {
      blob,
      filename: `${baseName}.pdf`,
      size: blob.size,
      pageCount: files.length,
    } satisfies ProcessingResult;
  }

  // Multiple files, separate PDFs → ZIP
  const zip = new JSZip();
  const progressPerFile = 85 / files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    const rotation = rotations[fileKey] ?? 0;
    const bytes = await readFileAsUint8Array(file);

    const pdfDoc = await PDFDocument.create();
    await addImageToPdf(pdfDoc, bytes, pageSize, orientation, marginMm, rotation);

    const pdfBytes = await pdfDoc.save();
    const baseName = file.name.replace(/\.[^.]+$/, "");
    zip.file(`${baseName}.pdf`, pdfBytes);

    onProgress(5 + progressPerFile * (i + 1));
  }

  onProgress(92);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "image_to_pdf.zip",
    size: zipBlob.size,
    pageCount: files.length,
  } satisfies ProcessingResult;
};

export default imageToPdf;
