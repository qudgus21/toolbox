import { PDFDocument, rgb, type PDFPage } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";
import { PAGE_SIZES, type PageSizePreset } from "./resize";

// ── Types ────────────────────────────────────────────────────────

type NupCount = 2 | 4 | 6 | 9 | 16;
type PageOrder = "left-to-right" | "right-to-left" | "top-to-bottom";
type Orientation = "portrait" | "landscape" | "auto";

interface GridLayout {
  cols: number;
  rows: number;
}

const GRID_LAYOUTS: Record<NupCount, GridLayout> = {
  2: { cols: 2, rows: 1 },
  4: { cols: 2, rows: 2 },
  6: { cols: 3, rows: 2 },
  9: { cols: 3, rows: 3 },
  16: { cols: 4, rows: 4 },
};

const MM_TO_PT = 72 / 25.4;

// ── Helpers ──────────────────────────────────────────────────────

function getSheetSize(
  preset: PageSizePreset,
  orientation: Orientation,
  nup: NupCount,
): { width: number; height: number } {
  const size = PAGE_SIZES[preset];
  let w = size.width;
  let h = size.height;

  if (orientation === "auto") {
    // For 2-up, landscape is usually better; for others portrait
    const grid = GRID_LAYOUTS[nup];
    if (grid.cols > grid.rows) {
      // More columns than rows → landscape
      if (h > w) [w, h] = [h, w];
    } else {
      // Equal or more rows → portrait
      if (w > h) [w, h] = [h, w];
    }
  } else if (orientation === "landscape") {
    if (h > w) [w, h] = [h, w];
  } else {
    if (w > h) [w, h] = [h, w];
  }

  return { width: w, height: h };
}

/**
 * Generate ordered cell indices based on page order direction.
 * Returns array of { col, row } in the reading order.
 */
function getCellOrder(
  cols: number,
  rows: number,
  order: PageOrder,
): { col: number; row: number }[] {
  const cells: { col: number; row: number }[] = [];

  if (order === "top-to-bottom") {
    // Column-major: go down each column, then next column
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        cells.push({ col: c, row: r });
      }
    }
  } else {
    // Row-major: left-to-right or right-to-left
    for (let r = 0; r < rows; r++) {
      if (order === "right-to-left") {
        for (let c = cols - 1; c >= 0; c--) {
          cells.push({ col: c, row: r });
        }
      } else {
        for (let c = 0; c < cols; c++) {
          cells.push({ col: c, row: r });
        }
      }
    }
  }

  return cells;
}

function drawBorder(
  page: PDFPage,
  x: number,
  y: number,
  w: number,
  h: number,
  borderColor: { r: number; g: number; b: number },
) {
  const color = rgb(borderColor.r / 255, borderColor.g / 255, borderColor.b / 255);
  page.drawRectangle({
    x,
    y,
    width: w,
    height: h,
    borderColor: color,
    borderWidth: 0.5,
    opacity: 0,
  });
}

// ── Main processor ───────────────────────────────────────────────

const pagesPerSheet: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const nup = (options.pagesPerSheet as NupCount) ?? 4;
  const sheetPreset = (options.sheetSize as PageSizePreset) ?? "a4";
  const orientation = (options.orientation as Orientation) ?? "auto";
  const pageOrder = (options.pageOrder as PageOrder) ?? "left-to-right";
  const gapMm = (options.gap as number) ?? 2;
  const showBorder = (options.border as boolean) ?? false;
  const borderColor = (options.borderColor as { r: number; g: number; b: number }) ?? {
    r: 200,
    g: 200,
    b: 200,
  };

  const gap = gapMm * MM_TO_PT;
  const grid = GRID_LAYOUTS[nup];
  const { width: sheetW, height: sheetH } = getSheetSize(sheetPreset, orientation, nup);

  onProgress(5);

  const results: { name: string; bytes: Uint8Array; pageCount: number }[] = [];

  for (let fi = 0; fi < files.length; fi++) {
    const file = files[fi];
    const bytes = await file.arrayBuffer();
    const srcDoc = await PDFDocument.load(bytes);
    const totalSrcPages = srcDoc.getPageCount();

    const doc = await PDFDocument.create();
    const cellOrder = getCellOrder(grid.cols, grid.rows, pageOrder);

    // Total number of cells per output sheet
    const cellsPerSheet = grid.cols * grid.rows;

    // Calculate cell dimensions
    const totalGapX = gap * (grid.cols - 1);
    const totalGapY = gap * (grid.rows - 1);
    const outerMargin = gap; // Use gap as outer margin too
    const cellW = (sheetW - outerMargin * 2 - totalGapX) / grid.cols;
    const cellH = (sheetH - outerMargin * 2 - totalGapY) / grid.rows;

    for (let srcIdx = 0; srcIdx < totalSrcPages; srcIdx += cellsPerSheet) {
      const outPage = doc.addPage([sheetW, sheetH]);

      for (let ci = 0; ci < cellsPerSheet; ci++) {
        const pageIdx = srcIdx + ci;
        if (pageIdx >= totalSrcPages) break;

        const srcPage = srcDoc.getPage(pageIdx);
        const { width: srcW, height: srcH } = srcPage.getMediaBox();
        const embeddedPage = await doc.embedPage(srcPage);

        const { col, row } = cellOrder[ci];

        // Cell position (PDF origin is bottom-left)
        const cellX = outerMargin + col * (cellW + gap);
        const cellY = sheetH - outerMargin - (row + 1) * cellH - row * gap;

        // Scale source page to fit within cell (maintain aspect ratio)
        const scaleX = cellW / srcW;
        const scaleY = cellH / srcH;
        const scale = Math.min(scaleX, scaleY);
        const drawW = srcW * scale;
        const drawH = srcH * scale;

        // Center within cell
        const drawX = cellX + (cellW - drawW) / 2;
        const drawY = cellY + (cellH - drawH) / 2;

        outPage.drawPage(embeddedPage, {
          x: drawX,
          y: drawY,
          width: drawW,
          height: drawH,
        });

        // Optional border around the drawn page
        if (showBorder) {
          drawBorder(outPage, drawX, drawY, drawW, drawH, borderColor);
        }
      }

      onProgress(5 + ((fi + (srcIdx + cellsPerSheet) / totalSrcPages) / files.length) * 85);
    }

    const pdfBytes = await doc.save();
    const baseName = file.name.replace(/\.pdf$/i, "");
    results.push({
      name: `${baseName}_${nup}up.pdf`,
      bytes: pdfBytes,
      pageCount: doc.getPageCount(),
    });
  }

  // Single file → PDF, multiple → ZIP
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
    filename: "pages_per_sheet.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default pagesPerSheet;
