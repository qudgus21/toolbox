"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PageNumberOptions, PageNumberPosition } from "./page-numbers-types";

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

// ─── 페이지 번호 텍스트 생성 ───

const FORMAT_TEMPLATES: Record<string, string> = {
  "{n}": "{n}",
  "{n}/{total}": "{n} / {total}",
  "page-n": "Page {n}",
  "page-n-of": "Page {n} of {total}",
};

function getPreviewText(options: PageNumberOptions, pageIndex: number, totalNumbered: number): string {
  const template = options.format === "custom"
    ? (options.customTemplate || "{n}")
    : (FORMAT_TEMPLATES[options.format] || "{n}");

  const currentNum = options.startNumber + pageIndex;
  const totalNum = totalNumbered + options.startNumber - 1;

  return template
    .replace(/\{n\}/g, String(currentNum))
    .replace(/\{total\}/g, String(totalNum));
}

function isPageNumbered(
  pageIndex: number,
  pageCount: number,
  options: PageNumberOptions,
): boolean {
  // skipFirstN
  if (pageIndex < options.skipFirstN) return false;
  // facing-cover skips first page
  if (options.facingMode === "facing-cover" && pageIndex === 0) return false;
  // custom range
  if (options.pageRange === "custom" && options.customRange.trim()) {
    const rangePages = parseRangeForPreview(options.customRange, pageCount);
    if (!rangePages.has(pageIndex)) return false;
  }
  return true;
}

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

function getEffectivePosition(
  position: PageNumberPosition,
  pageIndex: number,
  facingMode: PageNumberOptions["facingMode"],
): PageNumberPosition {
  if (facingMode === "single") return position;
  const isEvenPage = facingMode === "facing"
    ? pageIndex % 2 === 1
    : (pageIndex - 1) % 2 === 1;
  if (!isEvenPage) return position;
  if (position.endsWith("left")) return position.replace("left", "right") as PageNumberPosition;
  if (position.endsWith("right")) return position.replace("right", "left") as PageNumberPosition;
  return position;
}

// ─── 위치 → CSS ───

function positionToStyle(position: PageNumberPosition, marginPx: number): React.CSSProperties {
  const style: React.CSSProperties = { position: "absolute" };

  if (position.startsWith("top")) {
    style.top = marginPx;
  } else {
    style.bottom = marginPx;
  }

  if (position.endsWith("left")) {
    style.left = marginPx;
    style.textAlign = "left";
  } else if (position.endsWith("center")) {
    style.left = 0;
    style.right = 0;
    style.textAlign = "center";
  } else {
    style.right = marginPx;
    style.textAlign = "right";
  }

  return style;
}

// ─── 그리드 컬럼 ───

function useGridColumns(ref: React.RefObject<HTMLElement | null>) {
  const [cols, setCols] = useState(5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      // 카드 최소 폭 ~140px, gap 12px 고려
      setCols(Math.max(3, Math.min(8, Math.floor((w + 12) / 152))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return cols;
}

// ─── 메인 컴포넌트 ───

interface PageNumbersPreviewProps {
  file: File;
  pageCount: number;
  options: PageNumberOptions;
}

export function PageNumbersPreview({
  file,
  pageCount,
  options,
}: PageNumbersPreviewProps) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const gridRef = useRef<HTMLDivElement>(null);
  const cols = useGridColumns(gridRef);

  // 번호가 매겨지는 페이지 인덱스 목록
  const numberedIndices: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    if (isPageNumbered(i, pageCount, options)) numberedIndices.push(i);
  }
  const totalNumbered = numberedIndices.length;

  // 각 페이지의 번호 인덱스 (0-based, 번호 매겨지는 페이지만)
  const numberIndexMap = new Map<number, number>();
  numberedIndices.forEach((pi, idx) => numberIndexMap.set(pi, idx));

  // 마진 비율 (썸네일 기준 약 5%)
  const marginPx = Math.max(4, Math.round(options.marginMm * 0.6));

  // 폰트 매핑
  const fontFamilyMap: Record<string, string> = {
    Helvetica: "Helvetica, Arial, sans-serif",
    HelveticaBold: "Helvetica, Arial, sans-serif",
    TimesRoman: "'Times New Roman', serif",
    TimesRomanBold: "'Times New Roman', serif",
    Courier: "'Courier New', monospace",
    CourierBold: "'Courier New', monospace",
    Georgia: "Georgia, serif",
    Verdana: "Verdana, sans-serif",
  };

  const isBoldFont = options.font.endsWith("Bold");

  return (
    <div
      ref={gridRef}
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: pageCount }, (_, i) => {
        const pageNum = i + 1;
        const thumb = thumbnails[pageNum];
        const isNumbered = numberIndexMap.has(i);
        const numberIdx = numberIndexMap.get(i) ?? 0;
        const effectivePos = getEffectivePosition(options.position, i, options.facingMode);

        return (
          <div
            key={i}
            ref={observe}
            data-page={pageNum}
            className="group relative"
          >
            {/* 썸네일 */}
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-lg border transition-all ${
                isNumbered
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

              {/* 페이지 번호 오버레이 */}
              {isNumbered && (
                <div
                  style={{
                    ...positionToStyle(effectivePos, marginPx),
                    fontSize: Math.max(6, Math.min(18, options.fontSize * 0.7)),
                    color: options.color,
                    fontFamily: fontFamilyMap[options.font] || "sans-serif",
                    fontWeight: isBoldFont ? 700 : 400,
                    lineHeight: 1,
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getPreviewText(options, numberIdx, totalNumbered)}
                </div>
              )}
            </div>

            {/* 페이지 번호 라벨 */}
            <p className="mt-1 text-center text-xs text-foreground-muted">
              {pageNum}
            </p>
          </div>
        );
      })}
    </div>
  );
}
