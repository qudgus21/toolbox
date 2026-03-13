import { PDFDocument, PDFPage } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

/** Standard page sizes in points (1pt = 1/72 inch) */
export const PAGE_SIZES = {
  a3: { width: 841.89, height: 1190.55, label: "A3" },
  a4: { width: 595.28, height: 841.89, label: "A4" },
  a5: { width: 419.53, height: 595.28, label: "A5" },
  b4: { width: 708.66, height: 1000.63, label: "B4" },
  b5: { width: 498.9, height: 708.66, label: "B5" },
  letter: { width: 612, height: 792, label: "Letter" },
  legal: { width: 612, height: 1008, label: "Legal" },
  ledger: { width: 792, height: 1224, label: "Ledger" },
  tabloid: { width: 792, height: 1224, label: "Tabloid" },
} as const;

export type PageSizePreset = keyof typeof PAGE_SIZES;
export type ScaleMode = "fit" | "fill" | "stretch" | "center";
export type Unit = "mm" | "in";

const MM_TO_PT = 72 / 25.4;
const IN_TO_PT = 72;

function unitToPt(value: number, unit: Unit): number {
  return unit === "mm" ? value * MM_TO_PT : value * IN_TO_PT;
}

function fileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

interface ResizeOptions {
  preset?: PageSizePreset | "custom";
  customWidth?: number;
  customHeight?: number;
  unit?: Unit;
  orientation?: "portrait" | "landscape";
  scaleMode?: ScaleMode;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

function getTargetSize(opts: ResizeOptions): { width: number; height: number } {
  let w: number;
  let h: number;

  if (opts.preset === "custom") {
    const unit = opts.unit ?? "mm";
    w = unitToPt(opts.customWidth ?? 210, unit);
    h = unitToPt(opts.customHeight ?? 297, unit);
  } else {
    const key = opts.preset ?? "a4";
    const size = PAGE_SIZES[key];
    w = size.width;
    h = size.height;
  }

  if (opts.orientation === "landscape" && h > w) {
    [w, h] = [h, w];
  } else if (opts.orientation === "portrait" && w > h) {
    [w, h] = [h, w];
  }

  return { width: w, height: h };
}

function embedAndPlace(
  newPage: PDFPage,
  embedded: ReturnType<PDFPage["getWidth"]> extends number ? { width: number; height: number } : never,
  embeddedRef: Awaited<ReturnType<PDFDocument["embedPage"]>>,
  targetW: number,
  targetH: number,
  scaleMode: ScaleMode,
  margins: { top: number; bottom: number; left: number; right: number },
) {
  const availW = targetW - margins.left - margins.right;
  const availH = targetH - margins.top - margins.bottom;
  const srcW = embedded.width;
  const srcH = embedded.height;

  let drawW: number;
  let drawH: number;
  let drawX: number;
  let drawY: number;

  switch (scaleMode) {
    case "fit": {
      const scale = Math.min(availW / srcW, availH / srcH);
      drawW = srcW * scale;
      drawH = srcH * scale;
      drawX = margins.left + (availW - drawW) / 2;
      drawY = margins.bottom + (availH - drawH) / 2;
      break;
    }
    case "fill": {
      const scale = Math.max(availW / srcW, availH / srcH);
      drawW = srcW * scale;
      drawH = srcH * scale;
      drawX = margins.left + (availW - drawW) / 2;
      drawY = margins.bottom + (availH - drawH) / 2;
      break;
    }
    case "stretch": {
      drawW = availW;
      drawH = availH;
      drawX = margins.left;
      drawY = margins.bottom;
      break;
    }
    case "center":
    default: {
      drawW = srcW;
      drawH = srcH;
      drawX = margins.left + (availW - drawW) / 2;
      drawY = margins.bottom + (availH - drawH) / 2;
      break;
    }
  }

  newPage.drawPage(embeddedRef, {
    x: drawX,
    y: drawY,
    width: drawW,
    height: drawH,
  });
}

/**
 * Resize PDF processor (multi-file)
 *
 * Changes page size of every page in each PDF.
 * Single file → resized PDF, multiple files → ZIP.
 */
const resizePdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const opts = options as unknown as ResizeOptions;
  const { width: targetW, height: targetH } = getTargetSize(opts);
  const scaleMode: ScaleMode = opts.scaleMode ?? "fit";
  const unit = opts.unit ?? "mm";
  const margins = {
    top: unitToPt(opts.marginTop ?? 0, unit),
    bottom: unitToPt(opts.marginBottom ?? 0, unit),
    left: unitToPt(opts.marginLeft ?? 0, unit),
    right: unitToPt(opts.marginRight ?? 0, unit),
  };

  const results: { name: string; bytes: Uint8Array; pageCount: number }[] = [];

  for (let fi = 0; fi < files.length; fi++) {
    const file = files[fi];
    const bytes = await file.arrayBuffer();
    const srcDoc = await PDFDocument.load(bytes);
    const totalPages = srcDoc.getPageCount();

    const doc = await PDFDocument.create();

    for (let pi = 0; pi < totalPages; pi++) {
      const srcPage = srcDoc.getPage(pi);
      const { width: srcW, height: srcH } = srcPage.getMediaBox();

      const embeddedPage = await doc.embedPage(srcPage);

      const newPage = doc.addPage([targetW, targetH]);
      embedAndPlace(
        newPage,
        { width: srcW, height: srcH },
        embeddedPage,
        targetW,
        targetH,
        scaleMode,
        margins,
      );

      onProgress(((fi + (pi + 1) / totalPages) / files.length) * 90);
    }

    const pdfBytes = await doc.save();
    const baseName = file.name.replace(/\.pdf$/i, "");
    results.push({
      name: `${baseName}_resized.pdf`,
      bytes: pdfBytes,
      pageCount: doc.getPageCount(),
    });
  }

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
    filename: "resized_pdfs.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default resizePdf;
