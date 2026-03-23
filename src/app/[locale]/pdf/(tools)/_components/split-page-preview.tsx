"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";
import { Check, GripVertical, X } from "lucide-react";

const GROUP_COLOR = {
  border: "border-border",
  badge: "bg-foreground-muted",
  light: "bg-background-muted/50",
};

interface SplitPagePreviewProps {
  file: File;
  pageCount: number;
  splitOptions: Record<string, unknown>;
  rangeLabel?: string;
  onRangesReorder?: (ranges: { from: number; to: number }[]) => void;
  onExtractPagesChange?: (pages: number[]) => void;
}

/* ─── Hook: lazy PDF thumbnails (renders only visible pages) ─── */

function useLazyPdfThumbnails(file: File | null) {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const renderedRef = useRef(new Set<number>());
  const renderingRef = useRef(new Set<number>());
  const fileKeyRef = useRef("");
  const urlsRef = useRef<string[]>([]);
  const pdfPromiseRef = useRef<Promise<unknown> | null>(null);
  const cancelledRef = useRef(false);

  // Load PDF document once
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

  // Render a single page on demand
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
      const scale = 120 / page.getViewport({ scale: 1 }).width;
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
            canvas.width = 0; canvas.height = 0;
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

/* ─── Hook: shared IntersectionObserver for lazy loading ─── */

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

/* ─── Hook: render specific PDF pages (for grouped view) ─── */

function usePdfSpecificThumbnails(file: File | null, pageNumbers: number[]) {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const renderedRef = useRef(new Set<number>());
  const fileKeyRef = useRef("");
  const urlsRef = useRef<string[]>([]);

  const sortedKey = useMemo(
    () =>
      [...new Set(pageNumbers)]
        .filter((p) => p >= 1)
        .sort((a, b) => a - b)
        .join(","),
    [pageNumbers],
  );

  useEffect(() => {
    const fk = file ? `${file.name}-${file.size}-${file.lastModified}` : "";

    if (fk !== fileKeyRef.current) {
      fileKeyRef.current = fk;
      renderedRef.current = new Set();
      for (const u of urlsRef.current) URL.revokeObjectURL(u);
      urlsRef.current = [];
      setThumbnails({});
    }

    if (!file || !sortedKey) return;

    const toRender = sortedKey
      .split(",")
      .map(Number)
      .filter((p) => !renderedRef.current.has(p));

    if (toRender.length === 0) return;

    let cancelled = false;

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const ab = await file!.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: ab }).promise;

        for (const pn of toRender) {
          if (cancelled || pn > pdf.numPages) continue;
          renderedRef.current.add(pn);

          const page = await pdf.getPage(pn);
          const scale = 150 / page.getViewport({ scale: 1 }).width;
          const vp = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext("2d")!;
          await page.render({
            canvasContext: ctx,
            viewport: vp,
            canvas,
          } as Parameters<typeof page.render>[0]).promise;

          if (cancelled) return;

          const url = await new Promise<string>((resolve) => {
            canvas.toBlob(
              (blob) => {
                canvas.width = 0; canvas.height = 0;
                if (!blob) {
                  resolve("");
                  return;
                }
                const u = URL.createObjectURL(blob);
                urlsRef.current.push(u);
                resolve(u);
              },
              "image/webp",
              0.7,
            );
          });

          if (cancelled) return;
          setThumbnails((prev) => ({ ...prev, [pn]: url }));
        }
      } catch {
        // silently fail
      }
    }

    render();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, sortedKey]);

  return thumbnails;
}

/* ─── Page skeleton (mimics document content) ─── */

function PageSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-[6px] p-3 animate-pulse">
      <div className="h-[6px] w-3/4 rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-5/6 rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-2/3 rounded-full bg-foreground-subtle/10" />
      <div className="mt-auto h-[6px] w-1/2 rounded-full bg-foreground-subtle/8" />
    </div>
  );
}

/* ─── Page thumbnail card ─── */

function PageThumb({
  pageNum,
  src,
}: {
  pageNum: number;
  src?: string | null;
}) {
  return (
    <div className="relative w-[84px] sm:w-[100px] aspect-[3/4] overflow-hidden rounded-md border border-border bg-white dark:bg-background-muted shadow-sm">
      {src ? (
        <img
          src={src}
          alt={`Page ${pageNum}`}
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <PageSkeleton />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-1 pb-0.5 pt-2">
        <span className="text-[10px] font-bold text-white">{pageNum}</span>
      </div>
    </div>
  );
}

/* ─── Sortable range group card ─── */

function SortableRangeCard({
  id,
  index,
  range,
  thumbnails,
  rangeLabel,
  disableTransition,
  didDragRef,
  draggable = true,
  onRemove,
}: {
  id: string;
  index: number;
  range: { from: number; to: number };
  thumbnails: Record<number, string>;
  rangeLabel: string;
  disableTransition: boolean;
  didDragRef: React.RefObject<boolean>;
  draggable?: boolean;
  onRemove?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition:
      isDragging || disableTransition
        ? "none"
        : "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
    zIndex: isDragging ? 50 : "auto",
  };

  const from = Math.max(1, range.from);
  const to = Math.max(1, range.to);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClickCapture={(e) => {
        if (didDragRef.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className={draggable ? "cursor-grab active:cursor-grabbing" : undefined}
    >
      <div
        className={cn(
          "group relative rounded-xl border-2 border-dashed transition-all duration-200",
          GROUP_COLOR.border,
          GROUP_COLOR.light,
          isDragging && "shadow-2xl scale-105 ring-2 ring-foreground-subtle/20",
        )}
      >
        {/* Header: drag handle + label + remove */}
        <div className="flex items-center gap-1.5 px-3.5 pt-3.5 pb-2">
          {draggable && <GripVertical className="h-4 w-4 text-foreground-subtle/50" />}
          <span
            className={cn(
              "text-[11px] font-bold text-white px-2.5 py-0.5 rounded-full",
              GROUP_COLOR.badge,
            )}
          >
            {rangeLabel} {index + 1}
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="ml-auto rounded-md p-0.5 text-foreground-subtle/50 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex items-center justify-center gap-4 px-5 pb-4 pt-1">
          <PageThumb pageNum={from} src={thumbnails[from]} />

          <span className="text-foreground-subtle/50 font-bold text-xl leading-none select-none">
            ···
          </span>

          <PageThumb pageNum={to} src={thumbnails[to]} />
        </div>
      </div>
    </div>
  );
}

/* ─── Range grouped view with DnD ─── */

function RangeGroupView({
  file,
  ranges,
  rangeLabel,
  onReorder,
  draggable = true,
}: {
  file: File;
  ranges: { from: number; to: number }[];
  rangeLabel: string;
  onReorder?: (ranges: { from: number; to: number }[]) => void;
  draggable?: boolean;
}) {
  const [disableTransition, setDisableTransition] = useState(false);
  const didDragRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: draggable ? 5 : Infinity } }),
  );

  const neededPages = useMemo(() => {
    const pages = new Set<number>();
    for (const r of ranges) {
      if (r.from >= 1) pages.add(r.from);
      if (r.to >= 1 && r.to !== r.from) pages.add(r.to);
    }
    return [...pages].sort((a, b) => a - b);
  }, [ranges]);

  const thumbnails = usePdfSpecificThumbnails(file, neededPages);

  const ids = ranges.map((_, i) => `range-${i}`);

  function handleDragStart() {
    didDragRef.current = true;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setTimeout(() => {
      didDragRef.current = false;
    }, 0);

    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    setDisableTransition(true);
    onReorder?.(arrayMove(ranges, oldIndex, newIndex));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisableTransition(false));
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        <div
          className={cn(
            "grid gap-3",
            ranges.length === 1 && "grid-cols-1 max-w-[280px] mx-auto",
            ranges.length === 2 && "grid-cols-2 max-w-[560px] mx-auto",
            ranges.length >= 3 && "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {ranges.map((range, i) => (
            <SortableRangeCard
              key={ids[i]}
              id={ids[i]}
              index={i}
              range={range}
              thumbnails={thumbnails}
              rangeLabel={rangeLabel}
              disableTransition={disableTransition}
              didDragRef={didDragRef}
              draggable={draggable}
              onRemove={
                ranges.length > 1
                  ? () => onReorder?.(ranges.filter((_, j) => j !== i))
                  : undefined
              }
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

/* ─── Sortable extract page card ─── */

function SortableExtractCard({
  id,
  pageNum,
  selected,
  thumbnail,
  onToggle,
  disableTransition,
  didDragRef,
  observe,
}: {
  id: string;
  pageNum: number;
  selected: boolean;
  thumbnail: string | undefined;
  onToggle: () => void;
  disableTransition: boolean;
  didDragRef: React.RefObject<boolean>;
  observe: (el: Element | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const combinedRef = useCallback(
    (el: HTMLDivElement | null) => {
      setNodeRef(el);
      observe(el);
    },
    [setNodeRef, observe],
  );

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition:
      isDragging || disableTransition
        ? "none"
        : "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={combinedRef}
      data-page={pageNum}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (!didDragRef.current) onToggle();
      }}
      onClickCapture={(e) => {
        if (didDragRef.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 transition-all duration-200",
          selected
            ? "border-blue-500 dark:border-blue-400 shadow-sm"
            : "border-border/30 opacity-35",
          isDragging && "shadow-2xl scale-105 ring-2 ring-blue-500/30",
        )}
      >
        <div className="aspect-[4/5] bg-white dark:bg-background-muted">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`Page ${pageNum}`}
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <PageSkeleton />
          )}
        </div>

        {/* Page number */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-1 pb-0.5 pt-3">
          <span className="text-[10px] font-bold text-white">{pageNum}</span>
        </div>

        {/* Selection indicator */}
        <div className="absolute right-1 top-1">
          <div
            className={cn(
              "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
              selected
                ? "bg-blue-500 border-blue-500 dark:bg-blue-400 dark:border-blue-400"
                : "border-white/60 bg-black/20",
            )}
          >
            {selected && <Check className="h-3 w-3 text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hook: detect grid column count from container width ─── */

function useGridColumns(ref: React.RefObject<HTMLElement | null>) {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const gap = 10;
      const minW = 100;
      setCols(Math.max(4, Math.min(6, Math.floor((w + gap) / (minW + gap)))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return cols;
}

/* ─── Extract page view with DnD + selection + lazy thumbnails + virtualization ─── */

function ExtractPageView({
  file,
  pageCount,
  onPagesChange,
}: {
  file: File;
  pageCount: number;
  onPagesChange?: (pages: number[]) => void;
}) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const [disableTransition, setDisableTransition] = useState(false);
  const didDragRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [orderedPages, setOrderedPages] = useState<number[]>(() =>
    Array.from({ length: pageCount }, (_, i) => i + 1),
  );
  const [selectedPages, setSelectedPages] = useState<Set<number>>(
    () => new Set(Array.from({ length: pageCount }, (_, i) => i + 1)),
  );

  // Reset when pageCount changes
  const prevPageCountRef = useRef(pageCount);
  useEffect(() => {
    if (pageCount !== prevPageCountRef.current) {
      prevPageCountRef.current = pageCount;
      const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
      setOrderedPages(pages);
      setSelectedPages(new Set(pages));
    }
  }, [pageCount]);

  // Emit changes
  const onPagesChangeRef = useRef(onPagesChange);
  onPagesChangeRef.current = onPagesChange;
  useEffect(() => {
    const result = orderedPages.filter((p) => selectedPages.has(p));
    onPagesChangeRef.current?.(result);
  }, [orderedPages, selectedPages]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const ids = useMemo(
    () => orderedPages.map((p) => `extract-${p}`),
    [orderedPages],
  );

  // Grid columns + row virtualization
  const cols = useGridColumns(scrollRef);
  const rowCount = Math.ceil(orderedPages.length / cols);
  const ROW_HEIGHT = 170;

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  function handleDragStart() {
    didDragRef.current = true;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setTimeout(() => {
      didDragRef.current = false;
    }, 0);

    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    setDisableTransition(true);
    setOrderedPages((prev) => arrayMove(prev, oldIndex, newIndex));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisableTransition(false));
    });
  }

  function handleToggle(pageNum: number) {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        if (next.size > 1) next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
      return next;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        <div
          ref={scrollRef}
          className="max-h-[75vh] overflow-y-auto rounded-lg"
        >
          <div
            style={{
              height: virtualizer.getTotalSize(),
              position: "relative",
              width: "100%",
            }}
          >
            {virtualizer.getVirtualItems().map((vRow) => {
              const startIdx = vRow.index * cols;
              const rowItems = orderedPages.slice(startIdx, startIdx + cols);

              return (
                <div
                  key={vRow.key}
                  data-index={vRow.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${vRow.start}px)`,
                  }}
                >
                  <div
                    className="grid gap-2.5 pb-2.5"
                    style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                  >
                    {rowItems.map((pageNum) => (
                      <SortableExtractCard
                        key={`extract-${pageNum}`}
                        id={`extract-${pageNum}`}
                        pageNum={pageNum}
                        selected={selectedPages.has(pageNum)}
                        thumbnail={thumbnails[pageNum]}
                        onToggle={() => handleToggle(pageNum)}
                        disableTransition={disableTransition}
                        didDragRef={didDragRef}
                        observe={observe}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

/* ─── Flat grid view (extract select / size) with lazy thumbnails ─── */

function computeFlatGroups(
  options: Record<string, unknown>,
  pageCount: number,
): { from: number; to: number }[] {
  const mode = (options.mode as string) ?? "range";

  if (mode === "range") {
    const rangeType = (options.rangeType as string) ?? "custom";
    if (rangeType === "fixed") {
      const interval = Math.max(1, (options.fixedInterval as number) ?? 1);
      const groups: { from: number; to: number }[] = [];
      for (let i = 0; i < pageCount; i += interval) {
        groups.push({ from: i + 1, to: Math.min(i + interval, pageCount) });
      }
      return groups;
    }
    return [{ from: 1, to: pageCount }];
  }

  if (mode === "extract") {
    const extractAll = options.extractAll !== false;
    if (extractAll) {
      return Array.from({ length: pageCount }, (_, i) => ({
        from: i + 1,
        to: i + 1,
      }));
    }
    const pages = (options.extractPages as number[]) ?? [];
    return pages
      .filter((p) => p >= 1 && p <= pageCount)
      .map((p) => ({ from: p, to: p }));
  }

  if (mode === "size") {
    return [{ from: 1, to: pageCount }];
  }

  return [{ from: 1, to: pageCount }];
}

function getPageGroupIndex(
  pageNum: number,
  groups: { from: number; to: number }[],
): number {
  for (let i = 0; i < groups.length; i++) {
    if (pageNum >= groups[i].from && pageNum <= groups[i].to) return i;
  }
  return -1;
}

function FlatGridView({
  file,
  pageCount,
  splitOptions,
}: {
  file: File;
  pageCount: number;
  splitOptions: Record<string, unknown>;
}) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const groups = computeFlatGroups(splitOptions, pageCount);
  const mode = (splitOptions.mode as string) ?? "range";
  const mergeIntoOne = splitOptions.mergeIntoOne === true;

  const isExtractSelect =
    mode === "extract" && splitOptions.extractAll === false;

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2">
      {Array.from({ length: pageCount }, (_, i) => {
        const pageNum = i + 1;
        const groupIdx = getPageGroupIndex(pageNum, groups);
        const isInGroup = groupIdx >= 0;
        const colorClass =
          mergeIntoOne || mode === "size"
            ? "border-foreground-muted"
            : isInGroup
              ? "border-border"
              : "border-border/40";

        const isLastInGroup =
          isInGroup &&
          !mergeIntoOne &&
          mode !== "size" &&
          groupIdx < groups.length &&
          pageNum === groups[groupIdx].to &&
          pageNum < pageCount;

        return (
          <div
            key={pageNum}
            ref={observe}
            data-page={pageNum}
            className="relative"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-md border-2 transition-all duration-200",
                isInGroup ? colorClass : "border-border opacity-30",
                isExtractSelect && !isInGroup && "opacity-20",
              )}
            >
              <div className="aspect-[3/4] bg-white dark:bg-background-muted">
                {thumbnails[pageNum] ? (
                  <img
                    src={thumbnails[pageNum]}
                    alt={`Page ${pageNum}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <PageSkeleton />
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-1 pb-0.5 pt-3">
                <span className="text-[10px] font-bold text-white">
                  {pageNum}
                </span>
              </div>

              {isInGroup &&
                !mergeIntoOne &&
                mode !== "size" &&
                groups.length > 1 && (
                  <div className="absolute right-0.5 top-0.5">
                    <span
                      className={cn(
                        "inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white",
                        GROUP_COLOR.badge,
                      )}
                    >
                      {groupIdx + 1}
                    </span>
                  </div>
                )}
            </div>

            {isLastInGroup && (
              <div className="absolute -right-[5px] top-0 bottom-0 flex items-center">
                <div
                  className="h-full w-[2px] bg-accent/60"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent, transparent 3px, var(--color-accent) 3px, var(--color-accent) 7px)",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main export ─── */

export function SplitPagePreview({
  file,
  pageCount,
  splitOptions,
  rangeLabel = "Range",
  onRangesReorder,
  onExtractPagesChange,
}: SplitPagePreviewProps) {
  const mode = (splitOptions.mode as string) ?? "range";
  const rangeType = (splitOptions.rangeType as string) ?? "custom";
  const isRangeCustom = mode === "range" && rangeType === "custom";
  const isRangeFixed = mode === "range" && rangeType === "fixed";

  if (mode === "extract" && splitOptions.extractAll !== false) {
    return (
      <ExtractPageView
        file={file}
        pageCount={pageCount}
        onPagesChange={onExtractPagesChange}
      />
    );
  }

  if (isRangeCustom) {
    const rawRanges = (splitOptions.ranges as { from: number; to: number }[]) ?? [
      { from: 1, to: pageCount },
    ];
    const ranges = rawRanges.map((r) => ({
      from: Math.max(1, Math.min(r.from, pageCount)),
      to: Math.max(1, Math.min(r.to, pageCount)),
    }));

    return (
      <RangeGroupView
        file={file}
        ranges={ranges}
        rangeLabel={rangeLabel}
        onReorder={onRangesReorder}
      />
    );
  }

  if (isRangeFixed) {
    const overrideRanges = splitOptions.ranges as { from: number; to: number }[] | undefined;

    let ranges: { from: number; to: number }[];
    if (overrideRanges && overrideRanges.length > 0) {
      ranges = overrideRanges;
    } else {
      const interval = Math.max(1, (splitOptions.fixedInterval as number) ?? 1);
      ranges = [];
      for (let i = 0; i < pageCount; i += interval) {
        ranges.push({ from: i + 1, to: Math.min(i + interval, pageCount) });
      }
    }

    return (
      <RangeGroupView
        file={file}
        ranges={ranges}
        rangeLabel={rangeLabel}
        onReorder={onRangesReorder}
      />
    );
  }

  return (
    <FlatGridView
      file={file}
      pageCount={pageCount}
      splitOptions={splitOptions}
    />
  );
}
