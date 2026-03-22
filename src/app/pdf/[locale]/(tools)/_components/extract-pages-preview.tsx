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
import { FileOutput } from "lucide-react";

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
      const minW = 100;
      setCols(Math.max(4, Math.min(6, Math.floor((w + gap) / (minW + gap)))));
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
      <div className="h-[6px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[6px] w-2/3 rounded-full bg-foreground-subtle/10" />
      <div className="mt-auto h-[6px] w-1/2 rounded-full bg-foreground-subtle/8" />
    </div>
  );
}

/* ─── Sortable page card ─── */

function SortableExtractCard({
  id,
  pageNum,
  isSelected,
  thumbnail,
  onToggle,
  disableTransition,
  didDragRef,
  observe,
}: {
  id: string;
  pageNum: number;
  isSelected: boolean;
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
          isSelected
            ? "border-emerald-400 dark:border-emerald-500 shadow-sm"
            : "border-border/50 hover:border-border",
          isDragging && "shadow-2xl scale-105 ring-2 ring-foreground-subtle/20",
        )}
      >
        <div className="aspect-[4/5] bg-white dark:bg-background-muted">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`Page ${pageNum}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <PageSkeleton />
          )}
        </div>

        {/* Page number */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-1 pb-0.5 pt-3">
          <span className={cn(
            "text-[10px] font-bold",
            isSelected ? "text-emerald-300" : "text-white",
          )}>
            {pageNum}
          </span>
        </div>

        {/* Selected overlay */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/10">
            <div className="rounded-full bg-emerald-500 p-1.5">
              <FileOutput className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main export ─── */

interface ExtractPagesPreviewProps {
  file: File;
  pageCount: number;
  selectedPages: Set<number>;
  orderedPages: number[];
  onTogglePage: (pageNum: number) => void;
  onOrderChange: (pages: number[]) => void;
}

export function ExtractPagesPreview({
  file,
  pageCount,
  selectedPages,
  orderedPages,
  onTogglePage,
  onOrderChange,
}: ExtractPagesPreviewProps) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [disableTransition, setDisableTransition] = useState(false);
  const didDragRef = useRef(false);

  const cols = useGridColumns(scrollRef);
  const rowCount = Math.ceil(orderedPages.length / cols);
  const ROW_HEIGHT = 170;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const ids = useMemo(
    () => orderedPages.map((p) => `ext-${p}`),
    [orderedPages],
  );

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
    onOrderChange(arrayMove(orderedPages, oldIndex, newIndex));
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
                        key={`ext-${pageNum}`}
                        id={`ext-${pageNum}`}
                        pageNum={pageNum}
                        isSelected={selectedPages.has(pageNum)}
                        thumbnail={thumbnails[pageNum]}
                        onToggle={() => onTogglePage(pageNum)}
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
