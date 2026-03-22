"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WatermarkOptions, WatermarkPosition } from "@/lib/pdf/processors/watermark-types";

// ─── Lazy PDF Thumbnails (page-numbers-preview 패턴 동일) ───

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

// ─── 그리드 컬럼 ───

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

// ─── 대상 페이지 판정 ───

function isTargetPage(
  pageIndex: number,
  pageCount: number,
  options: WatermarkOptions,
): boolean {
  if (options.pageRange === "all") return true;
  if (!options.customRange.trim()) return true;
  const rangePages = parseRangeForPreview(options.customRange, pageCount);
  return rangePages.has(pageIndex);
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

// ─── 위치 → CSS ───

function positionToStyle(
  position: WatermarkPosition,
  offsetXPx: number,
  offsetYPx: number,
): React.CSSProperties {
  const style: React.CSSProperties = { position: "absolute" };

  // 수직
  if (position.startsWith("top")) {
    style.top = offsetYPx;
  } else if (position.startsWith("bottom")) {
    style.bottom = offsetYPx;
  } else {
    // center 행
    style.top = "50%";
  }

  // 수평
  if (position.includes("left")) {
    style.left = offsetXPx;
  } else if (position.includes("right")) {
    style.right = offsetXPx;
  } else {
    // center 열
    style.left = "50%";
  }

  return style;
}

function getTransform(position: WatermarkPosition, rotation: number): string {
  const parts: string[] = [];
  const isVCenter = !position.startsWith("top") && !position.startsWith("bottom");
  const isHCenter = !position.includes("left") && !position.includes("right");

  if (isVCenter && isHCenter) {
    parts.push("translate(-50%, -50%)");
  } else if (isVCenter) {
    parts.push("translateY(-50%)");
  } else if (isHCenter) {
    parts.push("translateX(-50%)");
  }

  if (rotation !== 0) {
    parts.push(`rotate(${rotation}deg)`);
  }

  return parts.join(" ");
}

// ─── 폰트 매핑 ───

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

// ─── 워터마크 오버레이 ───

function WatermarkOverlay({ options }: { options: WatermarkOptions }) {
  const transform = getTransform(options.position, options.rotation);
  const offsetXPx = Math.round(options.offsetX * 0.6);
  const offsetYPx = Math.round(options.offsetY * 0.6);
  const baseStyle = positionToStyle(options.position, offsetXPx, offsetYPx);

  if (options.mode === "text") {
    const textOpts = options.text;
    const fontSize = Math.max(6, Math.min(24, textOpts.fontSize * 0.35));
    const isBold = textOpts.font.endsWith("Bold");

    return (
      <div
        style={{
          ...baseStyle,
          transform,
          fontSize,
          color: textOpts.color,
          fontFamily: fontFamilyMap[textOpts.font] || "sans-serif",
          fontWeight: isBold ? 700 : 400,
          opacity: textOpts.opacity,
          textShadow: textOpts.shadow ? "1px 1px 2px rgba(0,0,0,0.5)" : "none",
          lineHeight: 1.2,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: options.layer === "over" ? 10 : 0,
        }}
      >
        {textOpts.text || " "}
      </div>
    );
  }

  // 이미지 모드
  const imgOpts = options.image;
  if (!imgOpts.imageDataUrl) return null;

  if (imgOpts.mosaic) {
    // 타일 모드
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imgOpts.imageDataUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: `${Math.round(30 * imgOpts.scale)}px auto`,
          opacity: imgOpts.opacity,
          transform: options.rotation !== 0 ? `rotate(${options.rotation}deg)` : undefined,
          transformOrigin: "center",
          pointerEvents: "none",
          zIndex: options.layer === "over" ? 10 : 0,
          // 확대해서 회전 시 빈 공간 없도록
          ...(options.rotation !== 0 ? { inset: "-30%" } : {}),
        }}
      />
    );
  }

  // 단일 이미지
  const imgScale = imgOpts.scale * 0.35;
  return (
    <img
      src={imgOpts.imageDataUrl}
      alt=""
      style={{
        ...baseStyle,
        transform: `${transform} scale(${imgScale})`,
        opacity: imgOpts.opacity,
        maxWidth: "80%",
        maxHeight: "80%",
        pointerEvents: "none",
        zIndex: options.layer === "over" ? 10 : 0,
      }}
      draggable={false}
    />
  );
}

// ─── 메인 컴포넌트 ───

interface WatermarkPreviewProps {
  file: File;
  pageCount: number;
  options: WatermarkOptions;
}

export function WatermarkPreview({
  file,
  pageCount,
  options,
}: WatermarkPreviewProps) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const gridRef = useRef<HTMLDivElement>(null);
  const cols = useGridColumns(gridRef);

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
              {/* 레이어 below인 경우 워터마크를 썸네일 뒤에 */}
              {isTarget && options.layer === "below" && (
                <WatermarkOverlay options={options} />
              )}

              {thumb ? (
                <img
                  src={thumb}
                  alt={`Page ${pageNum}`}
                  className="relative h-full w-full object-contain"
                  style={{ zIndex: options.layer === "below" ? 5 : 1 }}
                  draggable={false}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center" style={{ zIndex: options.layer === "below" ? 5 : 1 }}>
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

              {/* 레이어 over인 경우 워터마크를 썸네일 위에 */}
              {isTarget && options.layer === "over" && (
                <WatermarkOverlay options={options} />
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
