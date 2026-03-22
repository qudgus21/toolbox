"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  HeaderFooterOptions,
  HeaderFooterAlign,
} from "@/lib/pdf/processors/header-footer-types";
import type { FacingPageMode } from "@/lib/pdf/processors/page-numbers-types";

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
            canvas.width = 0; canvas.height = 0;
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
            const pn = Number(entry.target.getAttribute("data-page"));
            if (!isNaN(pn)) renderPage(pn);
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

// ─── Template variable resolution ───

function resolveTemplate(
  template: string,
  pageNum: number,
  totalPages: number,
  filename: string,
): string {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return template
    .replace(/\{page\}/g, String(pageNum))
    .replace(/\{total\}/g, String(totalPages))
    .replace(/\{date\}/g, dateStr)
    .replace(/\{filename\}/g, filename);
}

// ─── Page range parsing ───

function parseRangeForPreview(rangeStr: string, totalPages: number): Set<number> {
  const result = new Set<number>();
  for (const part of rangeStr.split(",")) {
    const trimmed = part.trim();
    const match = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
    if (match) {
      const start = Math.max(1, parseInt(match[1], 10));
      const end = Math.min(totalPages, parseInt(match[2], 10));
      for (let i = start; i <= end; i++) result.add(i - 1);
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) result.add(num - 1);
    }
  }
  return result;
}

// ─── Target check ───

function isTargetPage(
  pageIndex: number,
  pageCount: number,
  options: HeaderFooterOptions,
): boolean {
  if (options.pageRange === "all") return true;
  if (!options.customRange.trim()) return true;
  const rangePages = parseRangeForPreview(options.customRange, pageCount);
  return rangePages.has(pageIndex);
}

// ─── Alignment helpers ───

function mirrorAlign(align: HeaderFooterAlign): HeaderFooterAlign {
  if (align === "left") return "right";
  if (align === "right") return "left";
  return "center";
}

function getEffectiveAlign(
  align: HeaderFooterAlign,
  pageIndex: number,
  facingMode: FacingPageMode,
): HeaderFooterAlign {
  if (facingMode === "single") return align;
  const isEvenPage =
    facingMode === "facing" ? pageIndex % 2 === 1 : (pageIndex - 1) % 2 === 1;
  return isEvenPage ? mirrorAlign(align) : align;
}

function alignToStyle(align: HeaderFooterAlign, marginPx: number): React.CSSProperties {
  if (align === "left") return { left: marginPx, textAlign: "left" };
  if (align === "right") return { right: marginPx, textAlign: "right" };
  return { left: 0, right: 0, textAlign: "center" };
}

// ─── Grid columns ───

function useGridColumns(ref: React.RefObject<HTMLElement | null>) {
  const [cols, setCols] = useState(5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setCols(Math.max(3, Math.min(8, Math.floor((w + 12) / 152))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return cols;
}

// ─── Font mapping ───

const FONT_FAMILY_MAP: Record<string, string> = {
  Helvetica: "Helvetica, Arial, sans-serif",
  HelveticaBold: "Helvetica, Arial, sans-serif",
  TimesRoman: "'Times New Roman', serif",
  TimesRomanBold: "'Times New Roman', serif",
  Courier: "'Courier New', monospace",
  CourierBold: "'Courier New', monospace",
  Georgia: "Georgia, serif",
  Verdana: "Verdana, sans-serif",
};

// ─── Main component ───

interface HeaderFooterPreviewProps {
  file: File;
  pageCount: number;
  options: HeaderFooterOptions;
}

export function HeaderFooterPreview({
  file,
  pageCount,
  options,
}: HeaderFooterPreviewProps) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const gridRef = useRef<HTMLDivElement>(null);
  const cols = useGridColumns(gridRef);

  const filename = file.name.replace(/\.pdf$/i, "");
  const isBold = options.font.endsWith("Bold");
  const fontFamily = FONT_FAMILY_MAP[options.font] || "sans-serif";
  const marginPx = Math.max(4, Math.round(options.marginMm * 0.6));
  const fontSize = Math.max(6, Math.min(18, options.fontSize * 0.7));

  return (
    <div
      ref={gridRef}
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: pageCount }, (_, i) => {
        const pageNum = i + 1;
        const thumb = thumbnails[pageNum];
        const isTarget = isTargetPage(i, pageCount, options);

        const showHeader = options.headerEnabled && options.headerText.trim() !== "" && isTarget;
        const showFooter = options.footerEnabled && options.footerText.trim() !== "" && isTarget;

        const headerText = showHeader
          ? resolveTemplate(options.headerText, pageNum, pageCount, filename)
          : "";
        const footerText = showFooter
          ? resolveTemplate(options.footerText, pageNum, pageCount, filename)
          : "";

        const headerAlign = getEffectiveAlign(options.headerAlign, i, options.facingMode);
        const footerAlign = getEffectiveAlign(options.footerAlign, i, options.facingMode);

        return (
          <div
            key={i}
            ref={observe}
            data-page={pageNum}
            className="group relative"
          >
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-lg border transition-all ${
                isTarget
                  ? "border-border bg-white dark:bg-zinc-900"
                  : "border-border/50 bg-background-muted opacity-50"
              }`}
            >
              {thumb ? (
                <img
                  src={thumb}
                  alt={`Page ${pageNum}`}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="space-y-1.5 px-4 w-full">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="h-1 rounded-full bg-foreground-subtle/10"
                        style={{ width: `${60 + (j % 3) * 15}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Header overlay */}
              {showHeader && (
                <div
                  className="absolute overflow-hidden text-ellipsis whitespace-nowrap px-0.5"
                  style={{
                    top: marginPx,
                    ...alignToStyle(headerAlign, marginPx),
                    fontSize,
                    color: options.color,
                    fontFamily,
                    fontWeight: isBold ? 700 : 400,
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {headerText}
                </div>
              )}

              {/* Footer overlay */}
              {showFooter && (
                <div
                  className="absolute overflow-hidden text-ellipsis whitespace-nowrap px-0.5"
                  style={{
                    bottom: marginPx,
                    ...alignToStyle(footerAlign, marginPx),
                    fontSize,
                    color: options.color,
                    fontFamily,
                    fontWeight: isBold ? 700 : 400,
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {footerText}
                </div>
              )}
            </div>

            <p className="mt-1 text-center text-xs text-foreground-muted">
              {pageNum}
            </p>
          </div>
        );
      })}
    </div>
  );
}
