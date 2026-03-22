import { PDFDocument, rgb, type PDFPage } from "pdf-lib";
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
  let w: number = size.width;
  let h: number = size.height;

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
// All files' pages are merged sequentially into a single N-up PDF output.

const pagesPerSheet: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const nup = (options.pagesPerSheet as NupCount) ?? 4;
  const sheetPreset = (options.sheetSize as PageSizePreset) ?? "a4";
  const orientation = (options.orientation as Orientation) ?? "auto";
  const pageOrder = (options.pageOrder as PageOrder) ?? "left-to-right";
  const gapMm = (options.gap as number) ?? 2;
  const showBorder = (options.border as boolean) ?? false;
  const fileMode = (options.fileMode as "merge" | "new-sheet") ?? "merge";
  const borderColor = (options.borderColor as { r: number; g: number; b: number }) ?? {
    r: 200,
    g: 200,
    b: 200,
  };

  const gap = gapMm * MM_TO_PT;
  const grid = GRID_LAYOUTS[nup];
  const { width: sheetW, height: sheetH } = getSheetSize(sheetPreset, orientation, nup);

  onProgress(5);

  // 1. Load all source documents and collect total page count
  const srcDocs: PDFDocument[] = [];
  let totalSrcPages = 0;
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    srcDocs.push(doc);
    totalSrcPages += doc.getPageCount();
  }

  onProgress(10);

  // 2. Create single output document
  const doc = await PDFDocument.create();
  const cellOrder = getCellOrder(grid.cols, grid.rows, pageOrder);
  const cellsPerSheet = grid.cols * grid.rows;

  // Calculate cell dimensions
  const totalGapX = gap * (grid.cols - 1);
  const totalGapY = gap * (grid.rows - 1);
  const outerMargin = gap;
  const cellW = (sheetW - outerMargin * 2 - totalGapX) / grid.cols;
  const cellH = (sheetH - outerMargin * 2 - totalGapY) / grid.rows;

  // 3. Iterate all pages across all files sequentially
  let globalPageIdx = 0;

  for (const srcDoc of srcDocs) {
    const docPageCount = srcDoc.getPageCount();

    // In "new-sheet" mode, each file starts on a fresh output sheet
    if (fileMode === "new-sheet" && globalPageIdx % cellsPerSheet !== 0) {
      globalPageIdx = Math.ceil(globalPageIdx / cellsPerSheet) * cellsPerSheet;
    }

    for (let pi = 0; pi < docPageCount; pi++) {
      const cellIdx = globalPageIdx % cellsPerSheet;

      // Start a new output sheet when needed
      if (cellIdx === 0) {
        doc.addPage([sheetW, sheetH]);
      }

      const outPage = doc.getPage(doc.getPageCount() - 1);
      const srcPage = srcDoc.getPage(pi);
      const { width: srcW, height: srcH } = srcPage.getMediaBox();
      const embeddedPage = await doc.embedPage(srcPage);

      const { col, row } = cellOrder[cellIdx];

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

      if (showBorder) {
        drawBorder(outPage, drawX, drawY, drawW, drawH, borderColor);
      }

      globalPageIdx++;
      onProgress(10 + (globalPageIdx / totalSrcPages) * 85);
    }
  }

  const pdfBytes = await doc.save();
  const baseName = files[0].name.replace(/\.pdf$/i, "");
  const filename = files.length === 1 ? `${baseName}_${nup}up.pdf` : `combined_${nup}up.pdf`;
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });

  onProgress(100);

  return {
    blob,
    filename,
    size: blob.size,
    pageCount: doc.getPageCount(),
  } satisfies ProcessingResult;
};

export default pagesPerSheet;
