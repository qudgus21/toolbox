"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BookletOptions } from "@/lib/processors/booklet-types";

// ─── Lazy PDF Thumbnails ───

function useLazyPdfThumbnails(file: File | null) {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const renderedRef = useRef(new Set<number>());
  const renderingRef = useRef(new Set<number>());
  const fileKeyRef = useRef("");
  const urlsRef = useRef<string[]>([]);
  const pdfPromiseRef = useRef<Promise<unknown> | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const fk = file ? `${file.name}-${file.size}-${file.lastModified}` : "";
    if (fk === fileKeyRef.current) return;
    fileKeyRef.current = fk;
    cancelledRef.current = false;
    renderedRef.current = new Set();
    renderingRef.current = new Set();
    for (const u of urlsRef.current) URL.revokeObjectURL(u);
    urlsRef.current = [];
    pdfPromiseRef.current = null;
    setThumbnails({});

    if (!file) return;

    pdfPromiseRef.current = (async () => {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      const ab = await file.arrayBuffer();
      return pdfjsLib.getDocument({ data: ab }).promise;
    })();

    return () => {
      cancelledRef.current = true;
      fileKeyRef.current = "";
    };
  }, [file]);

  const renderPage = useCallback(async (pageNum: number) => {
    if (
      renderedRef.current.has(pageNum) ||
      renderingRef.current.has(pageNum) ||
      !pdfPromiseRef.current ||
      cancelledRef.current
    )
      return;
    renderingRef.current.add(pageNum);

    try {
      const pdf = (await pdfPromiseRef.current) as {
        numPages: number;
        getPage: (n: number) => Promise<{
          getViewport: (opts: { scale: number }) => { width: number; height: number };
          render: (opts: unknown) => { promise: Promise<void> };
        }>;
      };
      if (cancelledRef.current || pageNum > pdf.numPages) return;

      const page = await pdf.getPage(pageNum);
      const scale = 200 / page.getViewport({ scale: 1 }).width;
      const vp = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = vp.width;
      canvas.height = vp.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport: vp, canvas } as unknown)
        .promise;

      if (cancelledRef.current) return;

      const url = await new Promise<string>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) { resolve(""); return; }
            const u = URL.createObjectURL(blob);
            urlsRef.current.push(u);
            resolve(u);
          },
          "image/webp",
          0.6,
        );
      });

      if (cancelledRef.current) return;
      renderedRef.current.add(pageNum);
      setThumbnails((prev) => ({ ...prev, [pageNum]: url }));
    } catch {
      // silently fail
    } finally {
      renderingRef.current.delete(pageNum);
    }
  }, []);

  return { thumbnails, renderPage };
}

// ─── IntersectionObserver ───

function useThumbnailObserver(renderPage: (pageNum: number) => void) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const pages = entry.target.getAttribute("data-pages");
            if (pages) {
              for (const p of pages.split(",")) {
                const pn = Number(p);
                if (!isNaN(pn) && pn > 0) renderPage(pn);
              }
            }
          }
        }
      },
      { rootMargin: "400px" },
    );
    return () => observerRef.current?.disconnect();
  }, [renderPage]);

  return useCallback((el: Element | null) => {
    if (el) observerRef.current?.observe(el);
  }, []);
}

// ─── Imposition 계산 (프로세서와 동일) ───

interface SheetSide {
  sheetIndex: number;
  side: "front" | "back";
  leftPage: number; // 1-based, 0 = blank
  rightPage: number;
}

function buildImposition(pageCount: number, binding: "left" | "right"): SheetSide[] {
  const paddedCount = Math.ceil(pageCount / 4) * 4;
  const sides: SheetSide[] = [];

  for (let i = 0; i < paddedCount / 2; i++) {
    const sheetIndex = Math.floor(i / 2);
    const isFront = i % 2 === 0;

    let left: number;
    let right: number;

    if (isFront) {
      left = paddedCount - 1 - 2 * sheetIndex;
      right = 2 * sheetIndex;
    } else {
      left = 2 * sheetIndex + 1;
      right = paddedCount - 2 - 2 * sheetIndex;
    }

    if (binding === "right") {
      [left, right] = [right, left];
    }

    // Convert to 1-based (0 = blank)
    const leftPage = left < pageCount ? left + 1 : 0;
    const rightPage = right < pageCount ? right + 1 : 0;

    sides.push({
      sheetIndex,
      side: isFront ? "front" : "back",
      leftPage,
      rightPage,
    });
  }

  return sides;
}

// ─── Page slot component ───

function PageSlot({
  pageNum,
  thumbnail,
}: {
  pageNum: number;
  thumbnail?: string;
}) {
  if (pageNum === 0) {
    return (
      <div className="flex-1 flex items-center justify-center rounded bg-background-muted border border-dashed border-border text-xs text-foreground-subtle">
        blank
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center rounded border border-border bg-white dark:bg-zinc-900 overflow-hidden relative">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={`Page ${pageNum}`}
          className="h-full w-full object-contain"
          draggable={false}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center p-2">
          <div className="space-y-1 w-full px-2">
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="h-0.5 rounded-full bg-foreground-subtle/10"
                style={{ width: `${60 + (j % 3) * 15}%` }}
              />
            ))}
          </div>
        </div>
      )}
      <span className="absolute bottom-0.5 left-0 right-0 text-center text-[10px] font-medium text-foreground-muted bg-background/70">
        {pageNum}
      </span>
    </div>
  );
}

// ─── Main component ───

interface BookletPreviewProps {
  file: File;
  pageCount: number;
  options: BookletOptions;
  labels: {
    sheetLabel: string;
    frontLabel: string;
    backLabel: string;
  };
}

export function BookletPreview({
  file,
  pageCount,
  options,
  labels,
}: BookletPreviewProps) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);

  const sides = buildImposition(pageCount, options.binding);
  const totalSheets = sides.length > 0 ? sides[sides.length - 1].sheetIndex + 1 : 0;

  return (
    <div className="space-y-3">
      {Array.from({ length: totalSheets }, (_, si) => {
        const front = sides.find((s) => s.sheetIndex === si && s.side === "front")!;
        const back = sides.find((s) => s.sheetIndex === si && s.side === "back")!;

        // Collect page numbers for lazy loading
        const dataPages = [front.leftPage, front.rightPage, back.leftPage, back.rightPage]
          .filter((p) => p > 0)
          .join(",");

        return (
          <div
            key={si}
            ref={observe}
            data-pages={dataPages}
            className="rounded-xl border border-border bg-background-card p-3"
          >
            <p className="mb-2 text-xs font-semibold text-foreground-muted">
              {labels.sheetLabel} {si + 1}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Front side */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium text-foreground-subtle text-center uppercase tracking-wider">
                  {labels.frontLabel}
                </p>
                <div className="flex gap-0.5 aspect-[2/1.4]">
                  <PageSlot pageNum={front.leftPage} thumbnail={thumbnails[front.leftPage]} />
                  <PageSlot pageNum={front.rightPage} thumbnail={thumbnails[front.rightPage]} />
                </div>
              </div>
              {/* Back side */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium text-foreground-subtle text-center uppercase tracking-wider">
                  {labels.backLabel}
                </p>
                <div className="flex gap-0.5 aspect-[2/1.4]">
                  <PageSlot pageNum={back.leftPage} thumbnail={thumbnails[back.leftPage]} />
                  <PageSlot pageNum={back.rightPage} thumbnail={thumbnails[back.rightPage]} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
