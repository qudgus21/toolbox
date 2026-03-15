"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@toolbox/utils";
import { FormInput, MessageSquare } from "lucide-react";
import type { FlattenAnalysis } from "@/lib/processors/flatten";

/* ─── Hook: lazy PDF thumbnails ─── */

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
      const scale = 140 / page.getViewport({ scale: 1 }).width;
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

/* ─── Hook: IntersectionObserver ─── */

function useThumbnailObserver(renderPage: (pageNum: number) => void) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const pn = Number(entry.target.getAttribute("data-page"));
            if (!isNaN(pn)) renderPage(pn);
          }
        }
      },
      { rootMargin: "400px" },
    );
    return () => observerRef.current?.disconnect();
  }, [renderPage]);

  const observe = useCallback((el: Element | null) => {
    if (el) observerRef.current?.observe(el);
  }, []);

  return observe;
}

/* ─── Hook: grid column count ─── */

function useGridColumns(ref: React.RefObject<HTMLElement | null>) {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const gap = 10;
      const minW = 120;
      setCols(Math.max(3, Math.min(6, Math.floor((w + gap) / (minW + gap)))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return cols;
}

/* ─── Page skeleton ─── */

function PageSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-[6px] p-3 animate-pulse">
      <div className="h-[6px] w-3/4 rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-5/6 rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-2/3 rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-1/2 rounded-full bg-foreground-subtle/10" />
    </div>
  );
}

/* ─── 주석 뱃지: 어떤 페이지에 어떤 인터랙티브 요소가 있는지 표시 ─── */

interface PageBadgesProps {
  hasForm: boolean;
  hasAnnot: boolean;
}

function PageBadges({ hasForm, hasAnnot }: PageBadgesProps) {
  if (!hasForm && !hasAnnot) return null;
  return (
    <div className="absolute top-1 right-1 flex gap-0.5">
      {hasForm && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/90 text-white shadow-sm">
          <FormInput className="h-3 w-3" />
        </span>
      )}
      {hasAnnot && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/90 text-white shadow-sm">
          <MessageSquare className="h-3 w-3" />
        </span>
      )}
    </div>
  );
}

/* ─── Main preview ─── */

interface FlattenPreviewProps {
  file: File;
  pageCount: number;
  analysis: FlattenAnalysis | null;
  flattenForms: boolean;
  flattenAnnotations: boolean;
  labels: {
    pageOf: string;
    changeFile: string;
  };
  onChangeFile: () => void;
}

export function FlattenPreview({
  file,
  pageCount,
  analysis,
  flattenForms,
  flattenAnnotations,
  labels,
  onChangeFile,
}: FlattenPreviewProps) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const gridRef = useRef<HTMLDivElement>(null);
  const cols = useGridColumns(gridRef);

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="space-y-3">
      {/* File info bar */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-foreground truncate">
            {file.name}
          </span>
          <span className="text-xs text-foreground-subtle shrink-0">
            {pageCount} {labels.pageOf}
          </span>
        </div>
        <button
          type="button"
          onClick={onChangeFile}
          className="text-xs font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer shrink-0 ml-2"
        >
          {labels.changeFile}
        </button>
      </div>

      {/* Page grid */}
      <div
        ref={gridRef}
        className="grid gap-2.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {pages.map((pageNum) => {
          const thumb = thumbnails[pageNum];
          // 실제 per-page 분석은 하지 않으므로 전체 문서 수준에서 표시
          const hasForm = analysis?.hasFormFields && flattenForms;
          const hasAnnot = analysis?.hasAnnotations && flattenAnnotations;

          return (
            <div
              key={pageNum}
              ref={observe}
              data-page={pageNum}
              className="group relative"
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg border-2 transition-all duration-200",
                  (hasForm || hasAnnot)
                    ? "border-accent/40 shadow-sm"
                    : "border-border",
                )}
                style={{ aspectRatio: "210/297" }}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={`Page ${pageNum}`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <PageSkeleton />
                )}

                {/* 평탄화 대상 표시 오버레이 */}
                {(hasForm || hasAnnot) && (
                  <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                )}

                {/* 배지 — 첫 페이지에만 표시 (문서 수준 분석이므로) */}
                {pageNum === 1 && (
                  <PageBadges
                    hasForm={!!hasForm}
                    hasAnnot={!!hasAnnot}
                  />
                )}
              </div>

              {/* 페이지 번호 */}
              <p className="mt-1 text-center text-[11px] tabular-nums text-foreground-subtle">
                {pageNum}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
