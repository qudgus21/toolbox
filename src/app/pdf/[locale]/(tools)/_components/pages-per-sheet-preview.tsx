"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PAGE_SIZES, type PageSizePreset } from "@/lib/pdf/processors/resize";
import { fileId } from "./file-list";
import type { NupCount, NupOrientation, NupFileMode, PageOrder } from "./pages-per-sheet-options";

// ── Grid layouts (mirrors processor) ────────────────────────────

const GRID_LAYOUTS: Record<NupCount, { cols: number; rows: number }> = {
  2: { cols: 2, rows: 1 },
  4: { cols: 2, rows: 2 },
  6: { cols: 3, rows: 2 },
  9: { cols: 3, rows: 3 },
  16: { cols: 4, rows: 4 },
};

// ── Helpers ──────────────────────────────────────────────────────

function getSheetAspect(
  preset: PageSizePreset,
  orientation: NupOrientation,
  nup: NupCount,
): { width: number; height: number } {
  const size = PAGE_SIZES[preset];
  let w: number = size.width;
  let h: number = size.height;

  if (orientation === "auto") {
    const grid = GRID_LAYOUTS[nup];
    if (grid.cols > grid.rows) {
      if (h > w) [w, h] = [h, w];
    } else {
      if (w > h) [w, h] = [h, w];
    }
  } else if (orientation === "landscape") {
    if (h > w) [w, h] = [h, w];
  } else {
    if (w > h) [w, h] = [h, w];
  }

  return { width: w, height: h };
}

function getCellOrder(
  cols: number,
  rows: number,
  order: PageOrder,
): { col: number; row: number }[] {
  const cells: { col: number; row: number }[] = [];

  if (order === "top-to-bottom") {
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        cells.push({ col: c, row: r });
      }
    }
  } else {
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

// ── Hook: lazy PDF thumbnails for multiple files ─────────────────
// Returns a flat map keyed by "globalPageNum" (1-based across all files).

type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<{
    getViewport: (opts: { scale: number }) => { width: number; height: number };
    render: (opts: unknown) => { promise: Promise<void> };
  }>;
};

function useMultiFileThumbnails(files: File[], pageCounts: Record<string, number>) {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const renderedRef = useRef(new Set<number>());
  const renderingRef = useRef(new Set<number>());
  const urlsRef = useRef<string[]>([]);
  const cancelledRef = useRef(false);
  const filesKeyRef = useRef("");

  // Build file→page offset mapping
  const fileOffsets = useMemo(() => {
    const offsets: { file: File; offset: number; count: number }[] = [];
    let offset = 0;
    for (const f of files) {
      const count = pageCounts[fileId(f)] ?? 0;
      offsets.push({ file: f, offset, count });
      offset += count;
    }
    return offsets;
  }, [files, pageCounts]);

  // PDF document promises per file
  const pdfDocsRef = useRef<Map<string, Promise<PdfDoc>>>(new Map());

  const filesKey = files.map((f) => `${f.name}-${f.size}-${f.lastModified}`).join("|");

  useEffect(() => {
    if (filesKey === filesKeyRef.current) return;
    filesKeyRef.current = filesKey;
    cancelledRef.current = false;
    renderedRef.current = new Set();
    renderingRef.current = new Set();
    for (const u of urlsRef.current) URL.revokeObjectURL(u);
    urlsRef.current = [];
    pdfDocsRef.current = new Map();
    setThumbnails({});

    // Pre-load all PDF documents
    for (const f of files) {
      const fk = fileId(f);
      if (!pdfDocsRef.current.has(fk)) {
        pdfDocsRef.current.set(
          fk,
          (async () => {
            const pdfjsLib = await import("pdfjs-dist");
            pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
              "pdfjs-dist/build/pdf.worker.min.mjs",
              import.meta.url,
            ).toString();
            const ab = await f.arrayBuffer();
            return pdfjsLib.getDocument({ data: ab }).promise as Promise<PdfDoc>;
          })(),
        );
      }
    }

    return () => {
      cancelledRef.current = true;
      filesKeyRef.current = "";
    };
  }, [filesKey, files]);

  const renderPage = useCallback(
    async (globalPageNum: number) => {
      if (
        renderedRef.current.has(globalPageNum) ||
        renderingRef.current.has(globalPageNum) ||
        cancelledRef.current
      )
        return;
      renderingRef.current.add(globalPageNum);

      try {
        // Find which file this global page belongs to
        let targetFile: File | null = null;
        let localPage = 0;
        for (const { file, offset, count } of fileOffsets) {
          if (globalPageNum > offset && globalPageNum <= offset + count) {
            targetFile = file;
            localPage = globalPageNum - offset; // 1-based local page
            break;
          }
        }
        if (!targetFile || cancelledRef.current) return;

        const fk = fileId(targetFile);
        const pdfPromise = pdfDocsRef.current.get(fk);
        if (!pdfPromise) return;

        const pdf = await pdfPromise;
        if (cancelledRef.current || localPage > pdf.numPages) return;

        const page = await pdf.getPage(localPage);
        const scale = 200 / page.getViewport({ scale: 1 }).width;
        const vp = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = vp.width;
        canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({
          canvasContext: ctx,
          viewport: vp,
          canvas,
        } as unknown).promise;

        if (cancelledRef.current) return;

        const url = await new Promise<string>((resolve) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve("");
                return;
              }
              const u = URL.createObjectURL(blob);
              urlsRef.current.push(u);
              resolve(u);
            },
            "image/webp",
            0.6,
          );
        });

        if (cancelledRef.current) return;
        renderedRef.current.add(globalPageNum);
        setThumbnails((prev) => ({ ...prev, [globalPageNum]: url }));
      } catch {
        // silently fail
      } finally {
        renderingRef.current.delete(globalPageNum);
      }
    },
    [fileOffsets],
  );

  const renderPages = useCallback(
    (pageNums: number[]) => {
      for (const pn of pageNums) renderPage(pn);
    },
    [renderPage],
  );

  const totalPages = fileOffsets.reduce((sum, fo) => sum + fo.count, 0);

  return { thumbnails, renderPages, totalPages, fileOffsets };
}

// ── Mini skeleton for a cell ─────────────────────────────────────

function CellSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-[3px] p-1.5 animate-pulse">
      <div className="h-[3px] w-3/4 rounded-full bg-foreground-subtle/10" />
      <div className="h-[3px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[3px] w-5/6 rounded-full bg-foreground-subtle/10" />
      <div className="h-[3px] w-2/3 rounded-full bg-foreground-subtle/10" />
    </div>
  );
}

// ── Single output sheet card ─────────────────────────────────────

interface SheetCardProps {
  sheetIndex: number;
  pages: number[]; // global page numbers (1-based)
  nup: NupCount;
  pageOrder: PageOrder;
  gap: number;
  border: boolean;
  sheetAspect: { width: number; height: number };
  thumbnails: Record<number, string>;
}

function SheetCard({
  sheetIndex,
  pages,
  nup,
  pageOrder,
  gap,
  border,
  sheetAspect,
  thumbnails,
}: SheetCardProps) {
  const { cols, rows } = GRID_LAYOUTS[nup];
  const cellOrder = getCellOrder(cols, rows, pageOrder);
  const gapPct = (gap / 15) * 3;

  return (
    <div className="group relative">
      <div
        className="relative overflow-hidden rounded-lg border border-border bg-white dark:bg-neutral-100 shadow-sm"
        style={{ aspectRatio: `${sheetAspect.width}/${sheetAspect.height}` }}
      >
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${gapPct}%`,
            padding: `${gapPct}%`,
          }}
        >
          {cellOrder.map((cell, ci) => {
            const pageNum = pages[ci];
            const thumb = pageNum != null ? thumbnails[pageNum] : undefined;
            const isEmpty = pageNum == null;

            return (
              <div
                key={`${cell.col}-${cell.row}`}
                className={cn(
                  "relative overflow-hidden",
                  border && !isEmpty && "ring-1 ring-neutral-300 dark:ring-neutral-400",
                )}
                style={{
                  gridColumn: cell.col + 1,
                  gridRow: cell.row + 1,
                }}
              >
                {isEmpty ? (
                  <div className="h-full w-full" />
                ) : thumb ? (
                  <img
                    src={thumb}
                    alt={`Page ${pageNum}`}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <CellSkeleton />
                )}
                {!isEmpty && (
                  <span className="absolute bottom-0 right-0 bg-black/50 text-white text-[9px] leading-none px-1 py-0.5 rounded-tl">
                    {pageNum}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-1 text-center text-[11px] tabular-nums text-foreground-subtle">
        {sheetIndex + 1}
      </p>
    </div>
  );
}

// ── Build sheets logic ───────────────────────────────────────────

function buildSheets(
  totalPages: number,
  fileOffsets: { offset: number; count: number }[],
  cellsPerSheet: number,
  fileMode: NupFileMode,
): number[][] {
  if (fileMode === "merge") {
    // All pages sequentially, no breaks between files
    const sheets: number[][] = [];
    for (let i = 0; i < totalPages; i += cellsPerSheet) {
      const pages: number[] = [];
      for (let j = 0; j < cellsPerSheet; j++) {
        const pn = i + j + 1;
        if (pn <= totalPages) pages.push(pn);
      }
      sheets.push(pages);
    }
    return sheets;
  }

  // new-sheet: each file starts on a new output sheet
  const sheets: number[][] = [];
  for (const { offset, count } of fileOffsets) {
    for (let i = 0; i < count; i += cellsPerSheet) {
      const pages: number[] = [];
      for (let j = 0; j < cellsPerSheet; j++) {
        const pn = offset + i + j + 1;
        if (pn <= offset + count) pages.push(pn);
      }
      sheets.push(pages);
    }
  }
  return sheets;
}

// ── Main preview component ───────────────────────────────────────

interface PagesPerSheetPreviewProps {
  files: File[];
  pageCounts: Record<string, number>;
  nup: NupCount;
  sheetSize: PageSizePreset;
  orientation: NupOrientation;
  pageOrder: PageOrder;
  gap: number;
  border: boolean;
  fileMode: NupFileMode;
  labels: {
    pageOf: string;
    changeFile: string;
    sheets: string;
  };
  onAddMore: () => void;
}

export function PagesPerSheetPreview({
  files,
  pageCounts,
  nup,
  sheetSize,
  orientation,
  pageOrder,
  gap,
  border,
  fileMode,
  labels,
  onAddMore,
}: PagesPerSheetPreviewProps) {
  const { thumbnails, renderPages, totalPages, fileOffsets } = useMultiFileThumbnails(files, pageCounts);
  const sheetAspect = getSheetAspect(sheetSize, orientation, nup);
  const cellsPerSheet = GRID_LAYOUTS[nup].cols * GRID_LAYOUTS[nup].rows;

  const sheets = useMemo(
    () => buildSheets(totalPages, fileOffsets, cellsPerSheet, fileMode),
    [totalPages, fileOffsets, cellsPerSheet, fileMode],
  );

  // IntersectionObserver for lazy rendering
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sheetRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-sheet"));
            if (!isNaN(idx) && sheets[idx]) {
              renderPages(sheets[idx]);
            }
          }
        }
      },
      { rootMargin: "600px" },
    );

    sheetRefs.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sheets, renderPages]);

  const setSheetRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      if (el) {
        sheetRefs.current.set(idx, el);
        observerRef.current?.observe(el);
      } else {
        sheetRefs.current.delete(idx);
      }
    },
    [],
  );

  const isLandscape = sheetAspect.width > sheetAspect.height;
  const gridCols = isLandscape ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className="space-y-3">
      {/* Info bar */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-foreground truncate">
            {files.length === 1 ? files[0].name : `${files.length} files`}
          </span>
          <span className="text-xs text-foreground-subtle shrink-0">
            {totalPages} {labels.pageOf}
          </span>
          <span className="text-xs text-foreground-subtle shrink-0">
            → {sheets.length} {labels.sheets}
          </span>
        </div>
        <button
          type="button"
          onClick={onAddMore}
          className="text-xs font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer shrink-0 ml-2"
        >
          + {labels.changeFile}
        </button>
      </div>

      {/* Output sheets grid */}
      <div className={cn("grid gap-3", gridCols)}>
        {sheets.map((pages, sheetIdx) => (
          <div
            key={sheetIdx}
            ref={setSheetRef(sheetIdx)}
            data-sheet={sheetIdx}
          >
            <SheetCard
              sheetIndex={sheetIdx}
              pages={pages}
              nup={nup}
              pageOrder={pageOrder}
              gap={gap}
              border={border}
              sheetAspect={sheetAspect}
              thumbnails={thumbnails}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
