"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  MoveHorizontal,
  Maximize2,
  Columns2,
} from "lucide-react";
import { EditorToolbar } from "./editor-toolbar";
import { EditorHistoryPanel } from "./editor-history-panel";
import { useEditorStore } from "./use-editor-store";
import { usePdfPages } from "./use-pdf-pages";
import { generateId, type EditPdfLabels, type EditorElement } from "./editor-types";
import { ZOOM_STEPS } from "@/lib/pdf/constants";

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
      <div className="flex h-full w-full items-center justify-center bg-background">
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
  onChangeFile: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function EditorLayout({
  file,
  labels,
  onAnnotationsChange,
  onChangeFile,
}: EditorLayoutProps) {
  const { state, dispatch, undo, redo } = useEditorStore();
  const { pages, loading } = usePdfPages(file);

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const programmaticScroll = useRef(false);
  const clipboardRef = useRef<EditorElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [containerRect, setContainerRect] = useState({ left: 0, right: 0 });
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set([0]));
  const [viewMode, setViewMode] = useState<"fitWidth" | "fitPage" | null>("fitWidth");
  const [columns, setColumns] = useState<1 | 2>(1);
  const [manualScale, setManualScale] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(600);
  const [pageInput, setPageInput] = useState("");
  const [zoomInput, setZoomInput] = useState("");

  /* ── Lock body scroll while editor is mounted ────────── */

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);



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
    const measure = () => {
      setContainerWidth(el.clientWidth);
      setScrollHeight(el.clientHeight);
      const rect = el.getBoundingClientRect();
      setContainerRect({ left: rect.left, right: rect.right });
    };
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
      if (programmaticScroll.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (programmaticScroll.current) return;
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
  }, [state.activePageIndex, dispatch, loading]);

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
      // Copy
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && state.selectedElementId) {
        const el = state.annotations.find((a) => a.id === state.selectedElementId);
        if (el) clipboardRef.current = el;
      }
      // Paste
      if ((e.ctrlKey || e.metaKey) && e.key === "v" && clipboardRef.current) {
        e.preventDefault();
        const src = clipboardRef.current;
        const clone = {
          ...src,
          id: generateId(),
          x: src.x + 20,
          y: src.y + 20,
          pageIndex: state.activePageIndex,
        } as EditorElement;
        dispatch({ type: "ADD_ELEMENT", element: clone });
        clipboardRef.current = clone;
      }
      if (e.key === "Escape") {
        dispatch({ type: "SET_TOOL", tool: "select" });
        dispatch({ type: "SELECT_ELEMENT", id: null });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, state.selectedElementId, state.annotations, state.activePageIndex, dispatch]);

  /* ── Derived values ───────────────────────────────────── */

  const selectedElement =
    state.annotations.find((a) => a.id === state.selectedElementId) ?? null;

  const maxPageWidth =
    pages.length > 0 ? Math.max(...pages.map((p) => p.width)) : 1;
  const maxPageHeight =
    pages.length > 0 ? Math.max(...pages.map((p) => p.height)) : 1;

  const fitWidthScale = columns === 2
    ? (containerWidth - 48 - 24) / (2 * maxPageWidth)
    : (containerWidth - 80) / maxPageWidth;

  const fitPageScale = Math.min(
    fitWidthScale,
    (scrollHeight - 80) / maxPageHeight,
  );

  const rawScale = viewMode === "fitWidth"
    ? fitWidthScale
    : viewMode === "fitPage"
      ? fitPageScale
      : manualScale;
  const scale = pages.length > 0 ? Math.max(0.1, Math.min(5, rawScale)) : 1;
  const zoomPercent = Math.round(scale * 100);

  /* ── Navigation helpers ───────────────────────────────── */

  const scrollToPage = useCallback((idx: number) => {
    programmaticScroll.current = true;
    dispatch({ type: "SET_PAGE", index: idx });
    const el = pageRefs.current.get(idx);
    const container = scrollContainerRef.current;
    if (!el || !container) {
      programmaticScroll.current = false;
      return;
    }
    const top = Math.max(0, el.offsetTop - 5);
    // dispatch 리렌더 이후 smooth 스크롤 시작
    requestAnimationFrame(() => {
      container.scrollTo({ top, behavior: "smooth" });
    });
    const unlock = () => { programmaticScroll.current = false; };
    const fallback = setTimeout(unlock, 1000);
    container.addEventListener("scrollend", () => {
      clearTimeout(fallback);
      unlock();
    }, { once: true });
  }, [dispatch]);

  const handleZoomIn = useCallback(() => {
    const next = ZOOM_STEPS.find((s) => s > zoomPercent) ?? 300;
    setManualScale(next / 100);
    setViewMode(null);
  }, [zoomPercent]);

  const handleZoomOut = useCallback(() => {
    const prev = [...ZOOM_STEPS].reverse().find((s) => s < zoomPercent) ?? 25;
    setManualScale(prev / 100);
    setViewMode(null);
  }, [zoomPercent]);

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
          <p className="text-sm text-foreground-muted">{labels.loadingPdf ?? "Loading PDF..."}</p>
        </div>
      </div>
    );
  }

  /* ── Render ───────────────────────────────────────────── */

  return (
    <>
    <div
      ref={editorContainerRef}
      className="flex bg-background"
      style={{ height: "calc(100dvh - 140px)" }}
    >
        {/* ── Content Area ────────────────────────────────── */}
        <div className="relative flex flex-1 min-h-0 rounded-bl-xl">
          {/* Left: Page Thumbnails */}
          <div className="hidden w-[160px] shrink-0 flex-col overflow-hidden border-r border-border bg-background sm:flex lg:w-[190px]">
            {/* Header */}
            <div className="flex h-12 items-center justify-center gap-1.5 border-b border-border px-3">
              <span className="text-base font-medium text-foreground">{labels.pageLabel}</span>
              <span className="text-xs text-foreground-muted">{pages.length}</span>
            </div>
            {/* Thumbnail List */}
            <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto px-2 py-4">
          {pages.map((page, idx) => {
            const isActive = idx === state.activePageIndex;
            const count = state.annotations.filter(
              (a) => a.pageIndex === idx,
            ).length;
            const thumbAspect = page.height / page.width;

            return (
              <div key={idx} className="flex w-[110px] shrink-0 flex-col items-center">
                <button
                  type="button"
                  onClick={() => scrollToPage(idx)}
                  className={`w-full relative overflow-hidden rounded-md border-2 transition-all cursor-pointer ${
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
                </button>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-foreground-muted">
                  <span>{idx + 1}</span>
                  {count > 0 && (
                    <span className="rounded-full bg-accent/10 px-1 text-accent">
                      {count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
            </div>
          </div>

        {/* Center: Toolbar + Canvas */}
        <div className="flex flex-1 flex-col min-h-0 min-w-0">
          {/* ── Top Toolbar ─────────────────────────────────── */}
          <EditorToolbar
            state={state}
            dispatch={dispatch}
            onUndo={undo}
            onRedo={redo}
            labels={labels}
            selectedElement={selectedElement}
            onChangeFile={onChangeFile}
          />

          {/* All Pages Stacked Vertically */}
          <div
            ref={scrollContainerRef}
            className="relative z-0 flex-1 overflow-y-auto bg-background-muted"
          >
          {/* Tool placement guide */}
          {state.activeTool !== "select" && (
            <div className="pointer-events-none sticky top-14 z-30 -mb-[28px] flex justify-center" style={{ height: 28 }}>
              <span className="rounded-full border border-blue-300 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-600 shadow-sm backdrop-blur-sm dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400">
                {labels.clickToPlace}
              </span>
            </div>
          )}
          <div className={columns === 2 ? "flex flex-wrap justify-center gap-4 px-2 py-6 pb-16" : "flex flex-col items-center gap-6 px-4 py-6 pb-16"}>
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

    {/* ── Fixed Bottom Nav Bar ──────────────────── */}
    <div
      className="fixed z-50 flex justify-center"
      style={{
        left: containerRect.left,
        width: containerRect.right - containerRect.left,
        bottom: 76,
      }}
    >
      <div className="flex items-center gap-1 rounded-xl border border-border bg-background/95 px-2 py-1.5 shadow-lg backdrop-blur-sm">
        {/* Page up */}
        <NavTip label={labels.previousPage}>
          <button
            type="button"
            onClick={() => scrollToPage(Math.max(0, state.activePageIndex - 1))}
            disabled={state.activePageIndex === 0}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:cursor-default disabled:opacity-30"
          >
            <ChevronUp size={16} />
          </button>
        </NavTip>
        {/* Page down */}
        <NavTip label={labels.nextPage}>
          <button
            type="button"
            onClick={() => scrollToPage(Math.min(pages.length - 1, state.activePageIndex + 1))}
            disabled={state.activePageIndex >= pages.length - 1}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:cursor-default disabled:opacity-30"
          >
            <ChevronDown size={16} />
          </button>
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Page input */}
        <input
          type="text"
          inputMode="numeric"
          value={pageInput !== "" ? pageInput : String(state.activePageIndex + 1)}
          onFocus={(e) => {
            setPageInput(String(state.activePageIndex + 1));
            requestAnimationFrame(() => e.target.select());
          }}
          onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ""))}
          onBlur={() => {
            const num = parseInt(pageInput, 10);
            if (!isNaN(num) && num >= 1 && num <= pages.length) {
              scrollToPage(num - 1);
            }
            setPageInput("");
          }}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
          className="h-7 w-12 cursor-text rounded-md bg-background-muted px-1 text-center text-sm tabular-nums text-foreground outline-none focus:ring-1 focus:ring-accent"
        />
        <span className="text-sm text-foreground-muted">
          / {pages.length}
        </span>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Zoom out */}
        <NavTip label={labels.zoomOut}>
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"
          >
            <ZoomOut size={14} />
          </button>
        </NavTip>
        {/* Zoom in */}
        <NavTip label={labels.zoomIn}>
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"
          >
            <ZoomIn size={14} />
          </button>
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Zoom % input */}
        <NavTip label={`${labels.zoomIn} / ${labels.zoomOut}`}>
          <input
            type="text"
            inputMode="numeric"
            value={zoomInput !== "" ? zoomInput : `${zoomPercent}%`}
            onFocus={(e) => {
              setZoomInput(String(zoomPercent));
              requestAnimationFrame(() => e.target.select());
            }}
            onChange={(e) => setZoomInput(e.target.value.replace(/[^\d]/g, ""))}
            onBlur={() => {
              const num = parseInt(zoomInput, 10);
              if (!isNaN(num) && num >= 10 && num <= 500) {
                setManualScale(num / 100);
                setViewMode(null);
              }
              setZoomInput("");
            }}
            onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
            className="h-7 w-14 cursor-text rounded-md bg-background-muted px-1 text-center text-sm tabular-nums text-foreground outline-none focus:ring-1 focus:ring-accent"
          />
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Fit width */}
        <NavTip label={labels.fitWidth}>
          <button
            type="button"
            onClick={() => setViewMode("fitWidth")}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${
              viewMode === "fitWidth"
                ? "bg-accent/15 text-accent"
                : "text-foreground-muted hover:bg-background-muted"
            }`}
          >
            <MoveHorizontal size={14} />
          </button>
        </NavTip>
        {/* Fit page */}
        <NavTip label={labels.fitPage}>
          <button
            type="button"
            onClick={() => setViewMode("fitPage")}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${
              viewMode === "fitPage"
                ? "bg-accent/15 text-accent"
                : "text-foreground-muted hover:bg-background-muted"
            }`}
          >
            <Maximize2 size={14} />
          </button>
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Column toggle */}
        <NavTip label={columns === 1 ? labels.doublePage : labels.singlePage}>
          <button
            type="button"
            onClick={() => setColumns((c) => (c === 1 ? 2 : 1))}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${
              columns === 2
                ? "bg-accent/15 text-accent"
                : "text-foreground-muted hover:bg-background-muted"
            }`}
          >
            <Columns2 size={14} />
          </button>
        </NavTip>
      </div>
    </div>
    </>
  );
}

/* ── Nav Bar Tooltip ─────────────────────────────────────────── */

function NavTip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group/tip relative">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
        {label}
      </div>
    </div>
  );
}
