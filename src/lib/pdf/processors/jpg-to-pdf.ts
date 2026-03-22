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

/**
 * Load image bytes and embed into a PDFDocument.
 * Supports JPEG and PNG (detected by magic bytes).
 */
async function embedImage(pdfDoc: PDFDocument, bytes: Uint8Array) {
  // Detect PNG by magic bytes: 0x89 0x50 0x4E 0x47
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return pdfDoc.embedPng(bytes);
  }
  return pdfDoc.embedJpg(bytes);
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

const jpgToPdf: ProcessorFn = async (files, options, onProgress) => {
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
    filename: "jpg_to_pdf.zip",
    size: zipBlob.size,
    pageCount: files.length,
  } satisfies ProcessingResult;
};

export default jpgToPdf;
