import { PDFDocument, degrees as pdfDegrees } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

// ── Page size definitions (mirrored from image-to-pdf) ──────────────
type PageSizeKey =
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

type Orientation = "portrait" | "landscape";

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

const MM_TO_PT = 2.83465;

function isPng(bytes: Uint8Array): boolean {
  return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
}

function isJpeg(bytes: Uint8Array): boolean {
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

async function embedImage(pdfDoc: PDFDocument, bytes: Uint8Array) {
  if (isPng(bytes)) return pdfDoc.embedPng(bytes);
  if (isJpeg(bytes)) return pdfDoc.embedJpg(bytes);
  // heic2any converts to JPEG by default, so this fallback shouldn't be needed
  return pdfDoc.embedJpg(bytes);
}

function getRotatedDimensions(w: number, h: number, rotation: number) {
  if (rotation === 90 || rotation === 270) return { width: h, height: w };
  return { width: w, height: h };
}

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Convert HEIC/HEIF file to JPEG/PNG Blob using heic2any (lazy-loaded).
 */
async function convertHeicToBlob(file: File): Promise<Blob> {
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });
  // heic2any may return a single blob or an array (for multi-image HEIC)
  if (Array.isArray(result)) return result[0];
  return result;
}

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

  const availW = pageW - m * 2;
  const availH = pageH - m * 2;

  let drawW = rotW;
  let drawH = rotH;

  if (pageSize !== "fit") {
    const scale = Math.min(availW / rotW, availH / rotH);
    drawW = rotW * scale;
    drawH = rotH * scale;
  }

  const x = m + (availW - drawW) / 2;
  const y = m + (availH - drawH) / 2;

  const page = pdfDoc.addPage([pageW, pageH]);

  if (rotation === 0) {
    page.drawImage(embedded, { x, y, width: drawW, height: drawH });
  } else {
    const cx = x + drawW / 2;
    const cy = y + drawH / 2;
    const origW = rotation === 90 || rotation === 270 ? drawH : drawW;
    const origH = rotation === 90 || rotation === 270 ? drawW : drawH;
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

const heicToPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const pageSize = (options.pageSize as PageSizeKey) ?? "fit";
  const orientation = (options.orientation as Orientation) ?? "portrait";
  const marginMm = (options.marginMm as number) ?? 0;
  const mergeAll = (options.mergeAll as boolean) ?? true;
  const rotations = (options.rotations as Record<string, number> | undefined) ?? {};

  onProgress(5);

  // Convert all HEIC files to JPEG first
  const convertedImages: { bytes: Uint8Array; name: string; file: File }[] = [];
  const convertProgressPerFile = 40 / files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const jpegBlob = await convertHeicToBlob(file);
    const buf = await jpegBlob.arrayBuffer();
    convertedImages.push({
      bytes: new Uint8Array(buf),
      name: file.name,
      file,
    });
    onProgress(5 + convertProgressPerFile * (i + 1));
  }

  // Single file or merge mode → single PDF
  if (files.length === 1 || mergeAll) {
    const pdfDoc = await PDFDocument.create();
    const embedProgressPerFile = 45 / files.length;

    for (let i = 0; i < convertedImages.length; i++) {
      const { bytes, file } = convertedImages[i];
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
      const rotation = rotations[fileKey] ?? 0;

      await addImageToPdf(pdfDoc, bytes, pageSize, orientation, marginMm, rotation);
      onProgress(45 + embedProgressPerFile * (i + 1));
    }

    const pdfBytes = await pdfDoc.save();
    onProgress(95);

    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName =
      files.length === 1
        ? files[0].name.replace(/\.[^.]+$/, "")
        : "heic_merged";

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
  const embedProgressPerFile = 45 / files.length;

  for (let i = 0; i < convertedImages.length; i++) {
    const { bytes, name, file } = convertedImages[i];
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    const rotation = rotations[fileKey] ?? 0;

    const pdfDoc = await PDFDocument.create();
    await addImageToPdf(pdfDoc, bytes, pageSize, orientation, marginMm, rotation);

    const pdfBytes = await pdfDoc.save();
    const baseName = name.replace(/\.[^.]+$/, "");
    zip.file(`${baseName}.pdf`, pdfBytes);

    onProgress(45 + embedProgressPerFile * (i + 1));
  }

  onProgress(92);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "heic_to_pdf.zip",
    size: zipBlob.size,
    pageCount: files.length,
  } satisfies ProcessingResult;
};

export default heicToPdf;
