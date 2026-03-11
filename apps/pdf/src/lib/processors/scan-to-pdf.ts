import { PDFDocument, degrees as pdfDegrees } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

// ── Re-use page size definitions from image-to-pdf ──────────────────
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
export type ScanColorMode = "color" | "grayscale" | "bw";

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

function guessMime(bytes: Uint8Array): string {
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "image/gif";
  if (bytes[0] === 0x42 && bytes[1] === 0x4d) return "image/bmp";
  if ((bytes[0] === 0x49 && bytes[1] === 0x49) || (bytes[0] === 0x4d && bytes[1] === 0x4d)) return "image/tiff";
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return "image/webp";
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return "image/avif";
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) return "image/x-icon";
  if (bytes[0] === 0x3c) return "image/svg+xml";
  return "image/png";
}

function readFileAsUint8Array(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsArrayBuffer(file);
  });
}

// ── Scan enhancement via Canvas ─────────────────────────────────────

/**
 * Apply scan enhancements to an image:
 * - Auto-enhance: increase contrast & sharpen for document readability
 * - Color mode: convert to grayscale or black & white (threshold)
 *
 * Returns PNG bytes of the processed image.
 */
export function enhanceScanImage(
  bytes: Uint8Array,
  mimeType: string,
  options: { autoEnhance: boolean; colorMode: ScanColorMode },
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      // Auto-enhance: adaptive contrast stretching
      if (options.autoEnhance) {
        let minR = 255, maxR = 0;
        let minG = 255, maxG = 0;
        let minB = 255, maxB = 0;

        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          if (r < minR) minR = r; if (r > maxR) maxR = r;
          if (g < minG) minG = g; if (g > maxG) maxG = g;
          if (b < minB) minB = b; if (b > maxB) maxB = b;
        }

        // Use percentile-like clipping to avoid outliers
        const clipMin = 10;
        const clipMax = 245;
        minR = Math.max(minR, clipMin); maxR = Math.min(maxR, clipMax);
        minG = Math.max(minG, clipMin); maxG = Math.min(maxG, clipMax);
        minB = Math.max(minB, clipMin); maxB = Math.min(maxB, clipMax);

        const rangeR = maxR - minR || 1;
        const rangeG = maxG - minG || 1;
        const rangeB = maxB - minB || 1;

        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, ((data[i] - minR) / rangeR) * 255));
          data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] - minG) / rangeG) * 255));
          data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] - minB) / rangeB) * 255));
        }
      }

      // Color mode conversion
      if (options.colorMode === "grayscale") {
        for (let i = 0; i < data.length; i += 4) {
          const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }
      } else if (options.colorMode === "bw") {
        // Otsu's threshold for optimal binarization
        const histogram = new Uint32Array(256);
        for (let i = 0; i < data.length; i += 4) {
          const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
          histogram[gray]++;
        }

        const totalPixels = data.length / 4;
        let sumTotal = 0;
        for (let t = 0; t < 256; t++) sumTotal += t * histogram[t];

        let sumBg = 0;
        let weightBg = 0;
        let maxVariance = 0;
        let threshold = 128;

        for (let t = 0; t < 256; t++) {
          weightBg += histogram[t];
          if (weightBg === 0) continue;
          const weightFg = totalPixels - weightBg;
          if (weightFg === 0) break;

          sumBg += t * histogram[t];
          const meanBg = sumBg / weightBg;
          const meanFg = (sumTotal - sumBg) / weightFg;
          const variance = weightBg * weightFg * (meanBg - meanFg) * (meanBg - meanFg);

          if (variance > maxVariance) {
            maxVariance = variance;
            threshold = t;
          }
        }

        for (let i = 0; i < data.length; i += 4) {
          const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
          const val = gray > threshold ? 255 : 0;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob(
        (resultBlob) => {
          if (!resultBlob) { reject(new Error("Canvas toBlob failed")); return; }
          resultBlob.arrayBuffer().then(
            (buf) => resolve(new Uint8Array(buf)),
            reject,
          );
        },
        "image/png",
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to decode image (${mimeType})`));
    };
    img.src = url;
  });
}

/**
 * Embed image bytes into a PDFDocument.
 * If scan enhancements are enabled, process via Canvas first.
 */
async function embedScanImage(
  pdfDoc: PDFDocument,
  bytes: Uint8Array,
  enhance: { autoEnhance: boolean; colorMode: ScanColorMode },
) {
  const needsEnhance = enhance.autoEnhance || enhance.colorMode !== "color";

  if (needsEnhance) {
    // Determine MIME for Canvas decoding
    let mime: string;
    if (isPng(bytes)) mime = "image/png";
    else if (isJpeg(bytes)) mime = "image/jpeg";
    else mime = guessMime(bytes);

    const enhanced = await enhanceScanImage(bytes, mime, enhance);
    return pdfDoc.embedPng(enhanced);
  }

  // No enhancement — embed directly
  if (isPng(bytes)) return pdfDoc.embedPng(bytes);
  if (isJpeg(bytes)) return pdfDoc.embedJpg(bytes);

  // Unsupported format → convert via Canvas (no enhancement)
  const mime = guessMime(bytes);
  const converted = await enhanceScanImage(bytes, mime, { autoEnhance: false, colorMode: "color" });
  return pdfDoc.embedPng(converted);
}

function getRotatedDimensions(w: number, h: number, rotation: number) {
  if (rotation === 90 || rotation === 270) return { width: h, height: w };
  return { width: w, height: h };
}

async function addScanImageToPdf(
  pdfDoc: PDFDocument,
  imageBytes: Uint8Array,
  pageSize: PageSizeKey,
  orientation: Orientation,
  marginMm: number,
  rotation: number,
  enhance: { autoEnhance: boolean; colorMode: ScanColorMode },
) {
  const embedded = await embedScanImage(pdfDoc, imageBytes, enhance);
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
    const scaleX = availW / rotW;
    const scaleY = availH / rotH;
    const scale = Math.min(scaleX, scaleY);
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

const scanToPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const pageSize = (options.pageSize as PageSizeKey) ?? "a4";
  const orientation = (options.orientation as Orientation) ?? "portrait";
  const marginMm = (options.marginMm as number) ?? 0;
  const mergeAll = (options.mergeAll as boolean) ?? true;
  const rotations = (options.rotations as Record<string, number> | undefined) ?? {};
  const autoEnhance = (options.autoEnhance as boolean) ?? true;
  const colorMode = (options.colorMode as ScanColorMode) ?? "grayscale";

  const enhance = { autoEnhance, colorMode };

  onProgress(5);

  if (files.length === 1 || mergeAll) {
    const pdfDoc = await PDFDocument.create();
    const progressPerFile = 85 / files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
      const rotation = rotations[fileKey] ?? 0;
      const bytes = await readFileAsUint8Array(file);

      await addScanImageToPdf(pdfDoc, bytes, pageSize, orientation, marginMm, rotation, enhance);
      onProgress(5 + progressPerFile * (i + 1));
    }

    const pdfBytes = await pdfDoc.save();
    onProgress(95);

    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName =
      files.length === 1
        ? files[0].name.replace(/\.[^.]+$/, "")
        : "scanned";

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
    await addScanImageToPdf(pdfDoc, bytes, pageSize, orientation, marginMm, rotation, enhance);

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
    filename: "scan_to_pdf.zip",
    size: zipBlob.size,
    pageCount: files.length,
  } satisfies ProcessingResult;
};

export default scanToPdf;
