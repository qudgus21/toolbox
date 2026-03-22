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
import { Trash2, RotateCw, Copy, Undo2 } from "lucide-react";

/* ─── Types ─── */

export interface OrganizePageEntry {
  /** Unique id for DnD */
  id: string;
  /** 1-based original page number */
  srcPage: number;
  /** Whether this page is marked for deletion */
  deleted: boolean;
  /** Rotation angle: 0, 90, 180, 270 */
  rotation: number;
  /** Whether this is a duplicated page */
  isDuplicate: boolean;
}

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

function SortableOrganizeCard({
  entry,
  thumbnail,
  onToggleDelete,
  onRotate,
  onDuplicate,
  disableTransition,
  didDragRef,
  observe,
  labels,
}: {
  entry: OrganizePageEntry;
  thumbnail: string | undefined;
  onToggleDelete: () => void;
  onRotate: () => void;
  onDuplicate: () => void;
  disableTransition: boolean;
  didDragRef: React.RefObject<boolean>;
  observe: (el: Element | null) => void;
  labels: OrganizePagesPreviewLabels;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: entry.id });

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
      data-page={entry.srcPage}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing group/card"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 transition-all duration-200",
          entry.deleted
            ? "border-red-400 dark:border-red-500 shadow-sm"
            : "border-border/50 hover:border-border",
          isDragging && "shadow-2xl scale-105 ring-2 ring-foreground-subtle/20",
        )}
      >
        {/* Thumbnail */}
        <div className="aspect-[4/5] bg-white dark:bg-background-muted overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`Page ${entry.srcPage}`}
              className={cn(
                "h-full w-full object-cover transition-all duration-200",
                entry.deleted && "opacity-30 grayscale",
              )}
              style={
                entry.rotation
                  ? { transform: `rotate(${entry.rotation}deg)`, transformOrigin: "center center" }
                  : undefined
              }
              draggable={false}
            />
          ) : (
            <PageSkeleton />
          )}
        </div>

        {/* Page number badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-1 pb-0.5 pt-3">
          <span className={cn(
            "text-[10px] font-bold",
            entry.deleted ? "text-red-300 line-through" : "text-white",
          )}>
            {entry.srcPage}
            {entry.isDuplicate && (
              <span className="ml-0.5 text-[8px] font-normal opacity-70">({labels.copy})</span>
            )}
          </span>
        </div>

        {/* Delete overlay */}
        {entry.deleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
            <div className="rounded-full bg-red-500 p-1.5">
              <Trash2 className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Rotation indicator */}
        {entry.rotation > 0 && !entry.deleted && (
          <div className="absolute top-1 left-1 rounded-full bg-black/50 px-1.5 py-0.5">
            <span className="text-[9px] font-medium text-white">{entry.rotation}°</span>
          </div>
        )}

        {/* Action buttons — visible on hover */}
        <div className={cn(
          "absolute top-1 right-1 flex flex-col gap-1 transition-opacity duration-150",
          "opacity-0 group-hover/card:opacity-100",
          isDragging && "opacity-0",
        )}>
          {entry.deleted ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggleDelete(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="rounded-full bg-green-600 p-1 shadow-md hover:bg-green-700 transition-colors"
              title={labels.restore}
            >
              <Undo2 className="h-3 w-3 text-white" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onRotate(); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="rounded-full bg-black/60 p-1 shadow-md hover:bg-black/80 transition-colors"
                title={labels.rotate}
              >
                <RotateCw className="h-3 w-3 text-white" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="rounded-full bg-black/60 p-1 shadow-md hover:bg-black/80 transition-colors"
                title={labels.duplicate}
              >
                <Copy className="h-3 w-3 text-white" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleDelete(); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="rounded-full bg-red-600 p-1 shadow-md hover:bg-red-700 transition-colors"
                title={labels.delete}
              >
                <Trash2 className="h-3 w-3 text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─── */

export interface OrganizePagesPreviewLabels {
  duplicate: string;
  rotate: string;
  delete: string;
  restore: string;
  copy: string;
}

interface OrganizePagesPreviewProps {
  file: File;
  pageCount: number;
  pages: OrganizePageEntry[];
  onPagesChange: (pages: OrganizePageEntry[]) => void;
  labels: OrganizePagesPreviewLabels;
}

export function OrganizePagesPreview({
  file,
  pageCount,
  pages,
  onPagesChange,
  labels,
}: OrganizePagesPreviewProps) {
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [disableTransition, setDisableTransition] = useState(false);
  const didDragRef = useRef(false);

  const cols = useGridColumns(scrollRef);
  const rowCount = Math.ceil(pages.length / cols);
  const ROW_HEIGHT = 170;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const ids = useMemo(() => pages.map((p) => p.id), [pages]);

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
    setTimeout(() => { didDragRef.current = false; }, 0);

    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    setDisableTransition(true);
    onPagesChange(arrayMove(pages, oldIndex, newIndex));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisableTransition(false));
    });
  }

  const handleToggleDelete = useCallback((idx: number) => {
    onPagesChange(
      pages.map((p, i) => (i === idx ? { ...p, deleted: !p.deleted } : p)),
    );
  }, [pages, onPagesChange]);

  const handleRotate = useCallback((idx: number) => {
    onPagesChange(
      pages.map((p, i) =>
        i === idx ? { ...p, rotation: (p.rotation + 90) % 360 } : p,
      ),
    );
  }, [pages, onPagesChange]);

  const handleDuplicate = useCallback((idx: number) => {
    const src = pages[idx];
    const newEntry: OrganizePageEntry = {
      id: `org-${src.srcPage}-dup-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      srcPage: src.srcPage,
      deleted: false,
      rotation: src.rotation,
      isDuplicate: true,
    };
    const next = [...pages];
    next.splice(idx + 1, 0, newEntry);
    onPagesChange(next);
  }, [pages, onPagesChange]);

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
              const rowItems = pages.slice(startIdx, startIdx + cols);

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
                    {rowItems.map((entry, i) => (
                      <SortableOrganizeCard
                        key={entry.id}
                        entry={entry}
                        thumbnail={thumbnails[entry.srcPage]}
                        onToggleDelete={() => handleToggleDelete(startIdx + i)}
                        onRotate={() => handleRotate(startIdx + i)}
                        onDuplicate={() => handleDuplicate(startIdx + i)}
                        disableTransition={disableTransition}
                        didDragRef={didDragRef}
                        observe={observe}
                        labels={labels}
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
