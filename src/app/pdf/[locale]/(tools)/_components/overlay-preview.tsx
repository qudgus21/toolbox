"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { OverlayOptions } from "@/lib/pdf/processors/overlay-types";

// ─── Render a single PDF page to canvas ───

interface PdfPageData {
  width: number;
  height: number;
  imageData: ImageData;
}

function usePdfPages(file: File | null) {
  const [pages, setPages] = useState<PdfPageData[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const fileKeyRef = useRef("");
  const cancelledRef = useRef(false);

  useEffect(() => {
    const fk = file ? `${file.name}-${file.size}-${file.lastModified}` : "";
    if (fk === fileKeyRef.current) return;
    fileKeyRef.current = fk;
    cancelledRef.current = false;
    setPages([]);
    setPageCount(0);

    if (!file) return;

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        const ab = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: ab }).promise;
        if (cancelledRef.current) return;
        setPageCount(pdf.numPages);

        // Render first few pages for preview (limit to 6 for performance)
        const maxPages = Math.min(pdf.numPages, 6);
        const rendered: PdfPageData[] = [];

        for (let i = 1; i <= maxPages; i++) {
          if (cancelledRef.current) return;
          const page = await pdf.getPage(i);
          const scale = 300 / page.getViewport({ scale: 1 }).width;
          const vp = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport: vp } as never).promise;
          if (cancelledRef.current) return;

          rendered.push({
            width: vp.width,
            height: vp.height,
            imageData: ctx.getImageData(0, 0, vp.width, vp.height),
          });
        }

        if (!cancelledRef.current) setPages(rendered);
      } catch {
        // silently fail
      }
    })();

    return () => {
      cancelledRef.current = true;
      fileKeyRef.current = "";
    };
  }, [file]);

  return { pages, pageCount };
}

// ─── Composite canvas ───

function CompositeCanvas({
  contentPage,
  overlayPage,
  options,
  displayWidth,
}: {
  contentPage: PdfPageData;
  overlayPage: PdfPageData | null;
  options: OverlayOptions;
  displayWidth: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const cw = contentPage.width;
    const ch = contentPage.height;
    canvas.width = cw;
    canvas.height = ch;

    // Helper to draw ImageData
    const drawImageData = (data: PdfPageData, x: number, y: number, w: number, h: number) => {
      const tmp = document.createElement("canvas");
      tmp.width = data.width;
      tmp.height = data.height;
      tmp.getContext("2d")!.putImageData(data.imageData, 0, 0);
      ctx.drawImage(tmp, x, y, w, h);
    };

    // Calculate overlay dimensions
    const calcOverlay = (ow: number, oh: number) => {
      if (options.scaleMode === "fit") {
        const scale = Math.min(cw / ow, ch / oh);
        const dw = ow * scale;
        const dh = oh * scale;
        return { x: (cw - dw) / 2, y: (ch - dh) / 2, w: dw, h: dh };
      } else if (options.scaleMode === "stretch") {
        return { x: 0, y: 0, w: cw, h: ch };
      } else {
        // original
        return { x: (cw - ow) / 2, y: (ch - oh) / 2, w: ow, h: oh };
      }
    };

    ctx.clearRect(0, 0, cw, ch);

    // Always draw content as base
    drawImageData(contentPage, 0, 0, cw, ch);

    if (overlayPage) {
      const { x, y, w, h } = calcOverlay(overlayPage.width, overlayPage.height);
      // Use multiply so white backgrounds become transparent
      ctx.globalCompositeOperation = "multiply";
      drawImageData(overlayPage, x, y, w, h);
      ctx.globalCompositeOperation = "source-over";
    }
  }, [contentPage, overlayPage, options]);

  const aspectRatio = contentPage.width / contentPage.height;

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg border border-border"
      style={{ maxWidth: displayWidth, aspectRatio }}
    />
  );
}

// ─── Main component ───

interface OverlayPreviewProps {
  contentFile: File;
  overlayFile: File | null;
  options: OverlayOptions;
  labels: {
    contentFile: string;
    overlayFile: string;
    pageLabel: string;
  };
}

export function OverlayPreview({
  contentFile,
  overlayFile,
  options,
  labels,
}: OverlayPreviewProps) {
  const { pages: contentPages, pageCount: contentPageCount } = usePdfPages(contentFile);
  const { pages: overlayPages } = usePdfPages(overlayFile);
  const [currentPage, setCurrentPage] = useState(0);

  // Reset page when files change
  useEffect(() => {
    setCurrentPage(0);
  }, [contentFile, overlayFile]);

  if (contentPages.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-[3/4] rounded-xl border border-border bg-background-muted">
        <div className="space-y-2 px-8 w-full">
          {[...Array(5)].map((_, j) => (
            <div
              key={j}
              className="h-2 rounded-full bg-foreground-subtle/10 animate-pulse"
              style={{ width: `${50 + (j % 3) * 20}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const contentPage = contentPages[currentPage] ?? contentPages[0];

  // Auto-detect: single overlay page → repeat on all, multiple → 1:1 match
  let overlayPage: PdfPageData | null = null;
  if (overlayPages.length === 1) {
    overlayPage = overlayPages[0];
  } else if (overlayPages.length > 1) {
    overlayPage = currentPage < overlayPages.length ? overlayPages[currentPage] : null;
  }

  const maxPage = Math.min(contentPages.length, contentPageCount);

  return (
    <div className="space-y-3">
      <CompositeCanvas
        contentPage={contentPage}
        overlayPage={overlayPage}
        options={options}
        displayWidth={600}
      />

      {/* Page navigation */}
      {maxPage > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium disabled:opacity-30 hover:bg-background-muted transition-colors cursor-pointer disabled:cursor-default"
          >
            ←
          </button>
          <span className="text-xs text-foreground-muted min-w-[4rem] text-center">
            {labels.pageLabel} {currentPage + 1} / {maxPage}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(maxPage - 1, currentPage + 1))}
            disabled={currentPage >= maxPage - 1}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium disabled:opacity-30 hover:bg-background-muted transition-colors cursor-pointer disabled:cursor-default"
          >
            →
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 justify-center text-[10px] text-foreground-subtle">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-accent/60" />
          {labels.contentFile}
          {contentPageCount > 0 && ` (${contentPageCount}p)`}
        </span>
        {overlayFile && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground-subtle/40" />
            {labels.overlayFile}
          </span>
        )}
      </div>
    </div>
  );
}
