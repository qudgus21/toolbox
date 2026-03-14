"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { EditorToolbar } from "./editor-toolbar";
import { EditorHistoryPanel } from "./editor-history-panel";
import { useEditorStore } from "./use-editor-store";
import { usePdfPages } from "./use-pdf-pages";
import { ZOOM_LEVELS } from "./editor-types";
import type { EditPdfLabels, EditorElement } from "./editor-types";

export type { EditPdfLabels };

/* ── Dynamic import for Konva (SSR-safe) ────────────────────── */

const PageCanvas = dynamic(
  () =>
    import("./editor-page-canvas").then((m) => ({
      default: m.PageCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    ),
  },
);

/* ── Props ──────────────────────────────────────────────────── */

interface EditorLayoutProps {
  file: File;
  labels: EditPdfLabels;
  onAnnotationsChange: (annotations: EditorElement[]) => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function EditorLayout({
  file,
  labels,
  onAnnotationsChange,
}: EditorLayoutProps) {
  const { state, dispatch, undo, redo } = useEditorStore();
  const { pages, loading } = usePdfPages(file);

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [containerWidth, setContainerWidth] = useState(800);
  const [editorHeight, setEditorHeight] = useState("calc(100vh - 140px)");
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set([0]));

  /* ── Auto-measure available height ───────────────────── */

  useEffect(() => {
    const el = editorContainerRef.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top;
      const available = window.innerHeight - top - 16; // 16px bottom margin
      setEditorHeight(`${Math.max(available, 500)}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [loading]);

  /* ── Load pages into state ────────────────────────────── */

  useEffect(() => {
    if (pages.length > 0) {
      dispatch({ type: "SET_PAGES", pages });
    }
  }, [pages, dispatch]);

  /* ── Notify parent of annotation changes ──────────────── */

  useEffect(() => {
    onAnnotationsChange(state.annotations);
  }, [state.annotations, onAnnotationsChange]);

  /* ── Measure center area width ────────────────────────── */

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const measure = () => setContainerWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  /* ── IntersectionObserver for visible pages ───────────── */

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root || pages.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisiblePages((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            const idx = Number(entry.target.getAttribute("data-page-index"));
            if (Number.isNaN(idx)) continue;
            if (entry.isIntersecting) {
              next.add(idx);
            } else {
              next.delete(idx);
            }
          }
          return next;
        });
      },
      { root, rootMargin: "300px 0px", threshold: 0.01 },
    );

    // Initially mark all pages as visible until observer updates
    setVisiblePages(new Set(pages.map((_, i) => i)));

    // Use requestAnimationFrame to ensure refs are populated after render
    const rafId = requestAnimationFrame(() => {
      pageRefs.current.forEach((el) => observer.observe(el));
    });
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [pages.length]);

  /* ── Track active page from scroll position ───────────── */

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        let closestIdx = 0;
        let closestDist = Infinity;

        pageRefs.current.forEach((el, idx) => {
          const rect = el.getBoundingClientRect();
          const pageCenterY = rect.top + rect.height / 2;
          const dist = Math.abs(pageCenterY - centerY);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = idx;
          }
        });

        if (state.activePageIndex !== closestIdx) {
          dispatch({ type: "SET_PAGE", index: closestIdx });
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [state.activePageIndex, dispatch]);

  /* ── Keyboard shortcuts ───────────────────────────────── */

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      )
        return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        redo();
      }
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        state.selectedElementId &&
        !(document.activeElement as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        dispatch({ type: "DELETE_ELEMENT", id: state.selectedElementId });
      }
      if (e.key === "Escape") {
        dispatch({ type: "SET_TOOL", tool: "select" });
        dispatch({ type: "SELECT_ELEMENT", id: null });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, state.selectedElementId, dispatch]);

  /* ── Derived values ───────────────────────────────────── */

  const selectedElement =
    state.annotations.find((a) => a.id === state.selectedElementId) ?? null;

  const maxPageWidth =
    pages.length > 0 ? Math.max(...pages.map((p) => p.width)) : 1;
  const baseScale = Math.min(1, (containerWidth - 80) / maxPageWidth);
  const scale = baseScale * state.zoom;

  /* ── Navigation helpers ───────────────────────────────── */

  const scrollToPage = useCallback((idx: number) => {
    const el = pageRefs.current.get(idx);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleZoom = useCallback(
    (direction: "in" | "out") => {
      const currentIdx = ZOOM_LEVELS.findIndex((z) => z >= state.zoom);
      if (direction === "in") {
        const next =
          ZOOM_LEVELS[Math.min(currentIdx + 1, ZOOM_LEVELS.length - 1)];
        dispatch({ type: "SET_ZOOM", zoom: next ?? 2 });
      } else {
        const prev =
          ZOOM_LEVELS[
            Math.max(
              (currentIdx === -1 ? ZOOM_LEVELS.length : currentIdx) - 1,
              0,
            )
          ];
        dispatch({ type: "SET_ZOOM", zoom: prev ?? 0.5 });
      }
    },
    [state.zoom, dispatch],
  );

  const handleSelectAnnotation = useCallback(
    (id: string) => {
      dispatch({ type: "SELECT_ELEMENT", id });
      dispatch({ type: "SET_TOOL", tool: "select" });
      const el = state.annotations.find((a) => a.id === id);
      if (el) scrollToPage(el.pageIndex);
    },
    [dispatch, state.annotations, scrollToPage],
  );

  /* ── Loading state ────────────────────────────────────── */

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-foreground-muted">Loading PDF...</p>
        </div>
      </div>
    );
  }

  /* ── Render ───────────────────────────────────────────── */

  return (
    <div
      ref={editorContainerRef}
      className="flex min-h-[500px] rounded-xl border border-border bg-background"
      style={{ height: editorHeight }}
    >
      {/* ── Left + Center Column ──────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ── Top Toolbar ─────────────────────────────────── */}
        <EditorToolbar
          state={state}
          dispatch={dispatch}
          onUndo={undo}
          onRedo={redo}
          labels={labels}
          selectedElement={selectedElement}
        />

        {/* ── Content Area ────────────────────────────────── */}
        <div className="relative flex flex-1 overflow-hidden rounded-bl-xl">
          {/* Left: Page Thumbnails */}
          <div className="hidden w-[110px] shrink-0 flex-col gap-2 overflow-y-auto border-r border-border bg-background p-2 sm:flex lg:w-[130px]">
          {pages.map((page, idx) => {
            const isActive = idx === state.activePageIndex;
            const count = state.annotations.filter(
              (a) => a.pageIndex === idx,
            ).length;
            const thumbAspect = page.height / page.width;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToPage(idx)}
                className={`shrink-0 relative overflow-hidden rounded-md border-2 transition-all ${
                  isActive
                    ? "border-accent shadow-sm"
                    : "border-border hover:border-foreground-muted"
                }`}
              >
                <div
                  className="relative w-full bg-white"
                  style={{ paddingBottom: `${thumbAspect * 100}%` }}
                >
                  <img
                    src={page.imageUrl}
                    alt={`Page ${idx + 1}`}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 bg-background py-0.5 text-[10px] text-foreground-muted">
                  <span>{idx + 1}</span>
                  {count > 0 && (
                    <span className="rounded-full bg-accent/10 px-1 text-accent">
                      {count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Center: All Pages Stacked Vertically */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto bg-background-muted"
        >
          <div className="flex flex-col items-center gap-6 px-4 py-6 pb-16">
            {pages.map((page, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) pageRefs.current.set(idx, el);
                }}
                data-page-index={idx}
                className="shrink-0 shadow-lg"
                style={{
                  width: page.width * scale,
                  height: page.height * scale,
                }}
              >
                <PageCanvas
                  page={page}
                  pageIndex={idx}
                  annotations={state.annotations.filter(
                    (a) => a.pageIndex === idx,
                  )}
                  state={state}
                  dispatch={dispatch}
                  scale={scale}
                  isVisible={visiblePages.has(idx)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Floating Bottom Nav Bar ───────────────────── */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-border bg-background/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
          {/* Page up */}
          <button
            type="button"
            onClick={() =>
              scrollToPage(Math.max(0, state.activePageIndex - 1))
            }
            disabled={state.activePageIndex === 0}
            className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:opacity-30"
          >
            <ChevronUp size={16} />
          </button>
          {/* Page down */}
          <button
            type="button"
            onClick={() =>
              scrollToPage(
                Math.min(pages.length - 1, state.activePageIndex + 1),
              )
            }
            disabled={state.activePageIndex >= pages.length - 1}
            className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:opacity-30"
          >
            <ChevronDown size={16} />
          </button>

          <div className="mx-1 h-5 w-px bg-border" />

          {/* Page indicator */}
          <span className="min-w-[28px] text-center text-sm font-medium tabular-nums text-foreground">
            {state.activePageIndex + 1}
          </span>
          <span className="text-sm text-foreground-muted">
            / {pages.length}
          </span>

          <div className="mx-1 h-5 w-px bg-border" />

          {/* Zoom out */}
          <button
            type="button"
            onClick={() => handleZoom("out")}
            className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"
          >
            <ZoomOut size={14} />
          </button>
          {/* Zoom % */}
          <span className="min-w-[36px] text-center text-xs tabular-nums text-foreground-muted">
            {Math.round(state.zoom * 100)}%
          </span>
          {/* Zoom in */}
          <button
            type="button"
            onClick={() => handleZoom("in")}
            className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"
          >
            <ZoomIn size={14} />
          </button>
        </div>
        </div>
      </div>

      {/* Right: History / Annotations Panel */}
      <EditorHistoryPanel
        annotations={state.annotations}
        pages={state.pages}
        dispatch={dispatch}
        labels={labels}
        selectedElementId={state.selectedElementId}
        onSelectElement={handleSelectAnnotation}
      />
    </div>
  );
}
