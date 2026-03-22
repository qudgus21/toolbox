"use client";

import { useEffect, useState, useCallback, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { cn } from "@/lib/utils";
import { X, Check, CheckSquare, Square, GripVertical } from "lucide-react";

/* ─── Lazy PDF thumbnail hooks ─── */

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

/* ─── Page skeleton ─── */

function PageSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-[5px] p-2.5 animate-pulse">
      <div className="h-[5px] w-3/4 rounded-full bg-foreground-subtle/10" />
      <div className="h-[5px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[5px] w-5/6 rounded-full bg-foreground-subtle/10" />
      <div className="h-[5px] w-full rounded-full bg-foreground-subtle/10" />
      <div className="h-[5px] w-2/3 rounded-full bg-foreground-subtle/10" />
      <div className="mt-auto h-[5px] w-1/2 rounded-full bg-foreground-subtle/8" />
    </div>
  );
}

/* ─── Types ─── */

interface PageSelectorModalProps {
  file: File;
  totalPages: number;
  selectedPages: number[] | null; // null = all selected
  onConfirm: (pages: number[]) => void;
  onClose: () => void;
  labels?: {
    selectAll?: string;
    deselectAll?: string;
    confirm?: string;
    pagesSelected?: string;
    page?: string;
    dragToReorder?: string;
  };
}

function SortablePageCard({
  pageNum,
  isSelected,
  thumb,
  pageLabel,
  onToggle,
  disableTransition,
  didDragRef,
  observe,
}: {
  pageNum: number;
  isSelected: boolean;
  thumb?: string;
  pageLabel: string;
  onToggle: () => void;
  disableTransition: boolean;
  didDragRef: React.RefObject<boolean>;
  observe: (el: Element | null) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: pageNum });

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
      onClickCapture={(e) => {
        if (didDragRef.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onClick={onToggle}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border-2 transition-all duration-150 cursor-grab active:cursor-grabbing",
        isDragging && "shadow-xl scale-105",
        isSelected
          ? "border-accent shadow-sm"
          : "border-border-muted opacity-50 hover:opacity-80",
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/5] w-full bg-white dark:bg-background-muted">
        {thumb ? (
          <img
            src={thumb}
            alt={`${pageLabel} ${pageNum}`}
            className="h-full w-full object-contain bg-white"
            draggable={false}
          />
        ) : (
          <PageSkeleton />
        )}

        {/* Check indicator */}
        {isSelected && (
          <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
            <Check className="h-2.5 w-2.5" />
          </div>
        )}
      </div>

      {/* Page number */}
      <div className="px-1.5 py-0.5 text-center">
        <span className="text-[10px] font-medium text-foreground-muted">
          {pageNum}
        </span>
      </div>
    </div>
  );
}

export function PageSelectorModal({
  file,
  totalPages,
  selectedPages,
  onConfirm,
  onClose,
  labels,
}: PageSelectorModalProps) {
  const initialPages = selectedPages ?? Array.from({ length: totalPages }, (_, i) => i + 1);
  const allPageNums = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 순서가 있는 페이지 배열 (드래그로 순서 변경)
  const [orderedPages, setOrderedPages] = useState<number[]>(
    () => {
      // selectedPages가 있으면 그 순서를 유지하고, 나머지 페이지를 뒤에 추가
      if (selectedPages) {
        const rest = allPageNums.filter((p) => !selectedPages.includes(p));
        return [...selectedPages, ...rest];
      }
      return allPageNums;
    },
  );
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(initialPages),
  );
  const { thumbnails, renderPage } = useLazyPdfThumbnails(file);
  const observe = useThumbnailObserver(renderPage);

  const [disableTransition, setDisableTransition] = useState(false);
  const didDragRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const togglePage = useCallback((page: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(page)) {
        next.delete(page);
      } else {
        next.add(page);
      }
      return next;
    });
  }, []);

  const allSelected = selected.size === totalPages;

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allPageNums));
    }
  }, [allSelected, allPageNums]);

  function handleDragStart() {
    didDragRef.current = true;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setTimeout(() => { didDragRef.current = false; }, 0);

    if (!over || active.id === over.id) return;

    const oldIndex = orderedPages.indexOf(active.id as number);
    const newIndex = orderedPages.indexOf(over.id as number);
    if (oldIndex === -1 || newIndex === -1) return;

    setDisableTransition(true);
    setOrderedPages(arrayMove(orderedPages, oldIndex, newIndex));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableTransition(false);
      });
    });
  }

  const handleConfirm = () => {
    // 순서를 유지하면서 선택된 페이지만 반환
    const result = orderedPages.filter((p) => selected.has(p));
    onConfirm(result);
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-[5vh]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-full min-h-0 flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-muted px-5 py-4">
            <div>
              <h3 className="text-base font-bold text-foreground truncate max-w-[400px]">
                {file.name}
              </h3>
              <p className="mt-0.5 text-xs text-foreground-muted">
                {selected.size}/{totalPages} {labels?.pagesSelected ?? "pages selected"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-subtle hover:bg-background-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-border-muted px-5 py-2.5">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors cursor-pointer"
            >
              {allSelected ? (
                <>
                  <Square className="h-3.5 w-3.5" />
                  {labels?.deselectAll ?? "Deselect all"}
                </>
              ) : (
                <>
                  <CheckSquare className="h-3.5 w-3.5" />
                  {labels?.selectAll ?? "Select all"}
                </>
              )}
            </button>
            <span className="flex items-center gap-1 text-[11px] text-foreground-subtle">
              <GripVertical className="h-3 w-3" />
              {labels?.dragToReorder ?? "Drag to reorder"}
            </span>
          </div>

          {/* Page grid */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={orderedPages} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
                  {orderedPages.map((pageNum) => (
                    <SortablePageCard
                      key={pageNum}
                      pageNum={pageNum}
                      isSelected={selected.has(pageNum)}
                      thumb={thumbnails[pageNum]}
                      pageLabel={labels?.page ?? "Page"}
                      onToggle={() => togglePage(pageNum)}
                      disableTransition={disableTransition}
                      didDragRef={didDragRef}
                      observe={observe}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-border-muted px-5 py-3">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={selected.size === 0}
              className={cn(
                "rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer",
                "bg-accent text-accent-foreground shadow-sm hover:brightness-110",
                "disabled:opacity-40 disabled:pointer-events-none",
              )}
            >
              {labels?.confirm ?? "Confirm"} ({selected.size})
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
