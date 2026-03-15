import { PDFDocument } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";

const MM_TO_PT = 72 / 25.4;

export type CropPageMode = "all" | "current" | "range";

export interface CropArea {
  /** 0–1 비율로 표현된 크롭 영역 */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface CropOptions {
  mode: "area" | "margins";
  cropArea?: CropArea;
  margins?: CropMargins;
  pageMode: CropPageMode;
  currentPage?: number;
  pageRange?: number[];
}

function getTargetPages(
  totalPages: number,
  pageMode: CropPageMode,
  currentPage?: number,
  pageRange?: number[],
): Set<number> {
  if (pageMode === "all") {
    return new Set(Array.from({ length: totalPages }, (_, i) => i));
  }
  if (pageMode === "current" && currentPage !== undefined) {
    return new Set([currentPage]);
  }
  if (pageMode === "range" && pageRange) {
    return new Set(pageRange.map((p) => p - 1));
  }
  return new Set(Array.from({ length: totalPages }, (_, i) => i));
}

const cropPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const opts = options as unknown as CropOptions;
  const file = files[0];
  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const totalPages = srcDoc.getPageCount();

  const targetPages = getTargetPages(
    totalPages,
    opts.pageMode,
    opts.currentPage,
    opts.pageRange,
  );

  for (let i = 0; i < totalPages; i++) {
    if (!targetPages.has(i)) {
      onProgress(((i + 1) / totalPages) * 90);
      continue;
    }

    const page = srcDoc.getPage(i);
    const mediaBox = page.getMediaBox();
    const pageW = mediaBox.width;
    const pageH = mediaBox.height;

    let cropX: number;
    let cropY: number;
    let cropW: number;
    let cropH: number;

    if (opts.mode === "area" && opts.cropArea) {
      const area = opts.cropArea;
      cropX = mediaBox.x + pageW * area.x;
      cropY = mediaBox.y + pageH * (1 - area.y - area.height);
      cropW = pageW * area.width;
      cropH = pageH * area.height;
    } else if (opts.mode === "margins" && opts.margins) {
      const m = opts.margins;
      const topPt = m.top * MM_TO_PT;
      const rightPt = m.right * MM_TO_PT;
      const bottomPt = m.bottom * MM_TO_PT;
      const leftPt = m.left * MM_TO_PT;

      cropX = mediaBox.x + leftPt;
      cropY = mediaBox.y + bottomPt;
      cropW = pageW - leftPt - rightPt;
      cropH = pageH - topPt - bottomPt;
    } else {
      onProgress(((i + 1) / totalPages) * 90);
      continue;
    }

    cropW = Math.max(cropW, 1);
    cropH = Math.max(cropH, 1);

    page.setCropBox(cropX, cropY, cropW, cropH);
    page.setMediaBox(cropX, cropY, cropW, cropH);

    onProgress(((i + 1) / totalPages) * 90);
  }

  const pdfBytes = await srcDoc.save();
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  onProgress(100);

  const baseName = file.name.replace(/\.pdf$/i, "");
  return {
    blob,
    filename: `${baseName}_cropped.pdf`,
    size: blob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default cropPdf;
