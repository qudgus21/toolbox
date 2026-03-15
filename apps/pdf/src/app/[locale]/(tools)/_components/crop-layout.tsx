"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  MoveHorizontal,
  Maximize2,
  RotateCcw,
  FileInput,
} from "lucide-react";
import type { CropArea } from "@/lib/processors/crop";
import type { CropLabels } from "./crop-options";
import { CropOptions } from "./crop-options";
import type { CropPageMode, CropMargins } from "@/lib/processors/crop";

/* ── Types ──────────────────────────────────────────────────── */

interface PageData {
  width: number;
  height: number;
  imageUrl: string;
}

interface CropLayoutProps {
  file: File;
  pageCount: number;
  cropArea: CropArea | null;
  onCropAreaChange: (area: CropArea | null) => void;
  cropMargins: CropMargins;
  onCropMarginsChange: (m: CropMargins) => void;
  cropMode: "area" | "margins";
  onCropModeChange: (mode: "area" | "margins") => void;
  cropPageMode: CropPageMode;
  onCropPageModeChange: (mode: CropPageMode) => void;
  cropCurrentPage: number;
  onCropCurrentPageChange: (page: number) => void;
  cropPageRange: string;
  onCropPageRangeChange: (range: string) => void;
  onResetAll: () => void;
  onChangeFile: () => void;
  labels: CropLabels;
}

const ZOOM_STEPS = [25, 33, 50, 67, 75, 100, 125, 150, 200, 300] as const;

/* ── Component ──────────────────────────────────────────────── */

export function CropLayout({
  file,
  pageCount,
  cropArea,
  onCropAreaChange,
  cropMargins,
  onCropMarginsChange,
  cropMode,
  onCropModeChange,
  cropPageMode,
  onCropPageModeChange,
  cropCurrentPage,
  onCropCurrentPageChange,
  cropPageRange,
  onCropPageRangeChange,
  onResetAll,
  onChangeFile,
  labels,
}: CropLayoutProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const programmaticScroll = useRef(false);
  // Per-page img refs for coordinate calculation
  const imgRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  const [containerWidth, setContainerWidth] = useState(800);
  const [containerRect, setContainerRect] = useState({ left: 0, right: 0 });
  const [scrollHeight, setScrollHeight] = useState(600);
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set([0]));

  const [viewMode, setViewMode] = useState<"fitWidth" | "fitPage" | null>("fitWidth");
  const [manualScale, setManualScale] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const [zoomInput, setZoomInput] = useState("");

  // Crop interaction state — per-page
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [tempArea, setTempArea] = useState<CropArea | null>(null);
  const [interactingPage, setInteractingPage] = useState<number | null>(null);

  const activeArea = cropArea || tempArea;

  // Sync guard to prevent infinite loops
  const syncSource = useRef<"area" | "margins" | null>(null);

  const ptPerMm = 72 / 25.4;

  // Get current page dimensions for conversion
  const currentPageData = pages[cropCurrentPage];

  // Wrapped area change: area → margins sync
  const handleCropAreaChange = useCallback(
    (area: CropArea | null) => {
      onCropAreaChange(area);
      if (!area || !currentPageData || syncSource.current === "margins") return;
      syncSource.current = "area";
      const pw = currentPageData.width;
      const ph = currentPageData.height;
      onCropMarginsChange({
        top: Math.round((area.y * ph) / ptPerMm * 10) / 10,
        right: Math.round(((1 - area.x - area.width) * pw) / ptPerMm * 10) / 10,
        bottom: Math.round(((1 - area.y - area.height) * ph) / ptPerMm * 10) / 10,
        left: Math.round((area.x * pw) / ptPerMm * 10) / 10,
      });
      syncSource.current = null;
    },
    [onCropAreaChange, onCropMarginsChange, currentPageData, ptPerMm],
  );

  // Wrapped margins change: margins → area sync
  const handleMarginsChange = useCallback(
    (m: CropMargins) => {
      onCropMarginsChange(m);
      if (!currentPageData || syncSource.current === "area") return;
      syncSource.current = "margins";
      const pw = currentPageData.width;
      const ph = currentPageData.height;
      const x = (m.left * ptPerMm) / pw;
      const y = (m.top * ptPerMm) / ph;
      const w = 1 - x - (m.right * ptPerMm) / pw;
      const h = 1 - y - (m.bottom * ptPerMm) / ph;
      if (w > 0 && h > 0) {
        onCropAreaChange({ x, y, width: w, height: h });
      } else {
        onCropAreaChange(null);
      }
      syncSource.current = null;
    },
    [onCropMarginsChange, onCropAreaChange, currentPageData, ptPerMm],
  );

  /* ── Lock body scroll ─────────────────────────────────────── */

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── Load PDF pages as images ─────────────────────────────── */

  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadPages() {
      setLoading(true);
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        const results: PageData[] = [];

        for (const url of urlsRef.current) URL.revokeObjectURL(url);
        urlsRef.current = [];

        for (let i = 1; i <= totalPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]).promise;
          if (cancelled) return;

          const blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => resolve(b!), "image/png"),
          );
          const url = URL.createObjectURL(blob);
          urlsRef.current.push(url);

          const baseViewport = page.getViewport({ scale: 1 });
          results.push({
            width: baseViewport.width,
            height: baseViewport.height,
            imageUrl: url,
          });
        }

        if (!cancelled) setPages(results);
      } catch (err) {
        console.error("Failed to load PDF pages:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPages();
    return () => { cancelled = true; };
  }, [file]);

  useEffect(() => {
    return () => {
      for (const url of urlsRef.current) URL.revokeObjectURL(url);
    };
  }, []);

  /* ── Measure center area ──────────────────────────────────── */

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

  /* ── IntersectionObserver for visible pages ─────────────── */

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
            if (entry.isIntersecting) next.add(idx);
            else next.delete(idx);
          }
          return next;
        });
      },
      { root, rootMargin: "300px 0px", threshold: 0.01 },
    );

    setVisiblePages(new Set(pages.map((_, i) => i)));
    const rafId = requestAnimationFrame(() => {
      pageRefs.current.forEach((el) => observer.observe(el));
    });
    return () => { cancelAnimationFrame(rafId); observer.disconnect(); };
  }, [pages.length]);

  /* ── Track active page from scroll position ────────────── */

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId = 0;
    const handleScroll = () => {
      if (programmaticScroll.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (programmaticScroll.current) return;
        const containerR = container.getBoundingClientRect();
        const centerY = containerR.top + containerR.height / 2;

        let closestIdx = 0;
        let closestDist = Infinity;
        pageRefs.current.forEach((el, idx) => {
          const rect = el.getBoundingClientRect();
          const pageCenterY = rect.top + rect.height / 2;
          const dist = Math.abs(pageCenterY - centerY);
          if (dist < closestDist) { closestDist = dist; closestIdx = idx; }
        });

        if (cropCurrentPage !== closestIdx) {
          onCropCurrentPageChange(closestIdx);
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => { container.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, [cropCurrentPage, onCropCurrentPageChange]);

  /* ── Scale calculation ────────────────────────────────────── */

  const maxPageWidth = pages.length > 0 ? Math.max(...pages.map((p) => p.width)) : 1;
  const maxPageHeight = pages.length > 0 ? Math.max(...pages.map((p) => p.height)) : 1;

  const fitWidthScale = (containerWidth - 80) / maxPageWidth;
  const fitPageScale = Math.min(fitWidthScale, (scrollHeight - 80) / maxPageHeight);

  const rawScale = viewMode === "fitWidth"
    ? fitWidthScale
    : viewMode === "fitPage"
      ? fitPageScale
      : manualScale;
  const scale = pages.length > 0 ? Math.max(0.1, Math.min(5, rawScale)) : 1;
  const zoomPercent = Math.round(scale * 100);

  /* ── Navigation helpers ───────────────────────────────────── */

  const goToPage = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(pages.length - 1, idx));
    programmaticScroll.current = true;
    onCropCurrentPageChange(clamped);
    const el = pageRefs.current.get(clamped);
    const container = scrollContainerRef.current;
    if (!el || !container) {
      programmaticScroll.current = false;
      return;
    }
    const top = Math.max(0, el.offsetTop - 5);
    requestAnimationFrame(() => {
      container.scrollTo({ top, behavior: "smooth" });
    });
    const unlock = () => { programmaticScroll.current = false; };
    const fallback = setTimeout(unlock, 1000);
    container.addEventListener("scrollend", () => {
      clearTimeout(fallback);
      unlock();
    }, { once: true });
  }, [pages.length, onCropCurrentPageChange]);

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

  /* ── Crop interaction ─────────────────────────────────────── */

  const getRelativeCoords = useCallback(
    (e: React.MouseEvent | React.TouchEvent, pageIdx: number) => {
      const img = imgRefs.current.get(pageIdx);
      if (!img) return { x: 0, y: 0 };
      const rect = img.getBoundingClientRect();

      let clientX: number;
      let clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
      };
    },
    [],
  );

  const getResizeHandle = useCallback(
    (relX: number, relY: number, area: CropArea): string | null => {
      const threshold = 0.025;
      const nearLeft = Math.abs(relX - area.x) < threshold;
      const nearRight = Math.abs(relX - (area.x + area.width)) < threshold;
      const nearTop = Math.abs(relY - area.y) < threshold;
      const nearBottom = Math.abs(relY - (area.y + area.height)) < threshold;
      const insideX = relX > area.x - threshold && relX < area.x + area.width + threshold;
      const insideY = relY > area.y - threshold && relY < area.y + area.height + threshold;

      if (nearTop && nearLeft) return "nw";
      if (nearTop && nearRight) return "ne";
      if (nearBottom && nearLeft) return "sw";
      if (nearBottom && nearRight) return "se";
      if (nearTop && insideX) return "n";
      if (nearBottom && insideX) return "s";
      if (nearLeft && insideY) return "w";
      if (nearRight && insideY) return "e";
      return null;
    },
    [],
  );

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent, pageIdx: number) => {
      if (cropMode !== "area") return;
      e.preventDefault();
      setInteractingPage(pageIdx);
      const coords = getRelativeCoords(e, pageIdx);
      const currentArea = cropArea || tempArea;

      if (currentArea) {
        const handle = getResizeHandle(coords.x, coords.y, currentArea);
        if (handle) {
          setIsResizing(handle);
          setDragStart(coords);
          return;
        }
      }

      setIsDragging(true);
      setDragStart(coords);
      setTempArea(null);
      handleCropAreaChange(null);
    },
    [cropMode, cropArea, tempArea, getRelativeCoords, getResizeHandle, handleCropAreaChange],
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragStart || interactingPage === null) return;
      e.preventDefault();
      const coords = getRelativeCoords(e, interactingPage);

      if (isResizing && (cropArea || tempArea)) {
        const area = cropArea || tempArea!;
        const newArea = { ...area };

        switch (isResizing) {
          case "nw":
            newArea.width = area.x + area.width - coords.x;
            newArea.height = area.y + area.height - coords.y;
            newArea.x = coords.x;
            newArea.y = coords.y;
            break;
          case "ne":
            newArea.width = coords.x - area.x;
            newArea.height = area.y + area.height - coords.y;
            newArea.y = coords.y;
            break;
          case "sw":
            newArea.width = area.x + area.width - coords.x;
            newArea.height = coords.y - area.y;
            newArea.x = coords.x;
            break;
          case "se":
            newArea.width = coords.x - area.x;
            newArea.height = coords.y - area.y;
            break;
          case "n":
            newArea.height = area.y + area.height - coords.y;
            newArea.y = coords.y;
            break;
          case "s":
            newArea.height = coords.y - area.y;
            break;
          case "w":
            newArea.width = area.x + area.width - coords.x;
            newArea.x = coords.x;
            break;
          case "e":
            newArea.width = coords.x - area.x;
            break;
        }

        newArea.x = Math.max(0, Math.min(1, newArea.x));
        newArea.y = Math.max(0, Math.min(1, newArea.y));
        newArea.width = Math.max(0.01, Math.min(1 - newArea.x, newArea.width));
        newArea.height = Math.max(0.01, Math.min(1 - newArea.y, newArea.height));

        handleCropAreaChange(newArea);
        return;
      }

      if (isDragging) {
        const x = Math.min(dragStart.x, coords.x);
        const y = Math.min(dragStart.y, coords.y);
        const width = Math.abs(coords.x - dragStart.x);
        const height = Math.abs(coords.y - dragStart.y);

        if (width > 0.01 || height > 0.01) {
          setTempArea({
            x: Math.max(0, x),
            y: Math.max(0, y),
            width: Math.min(width, 1 - Math.max(0, x)),
            height: Math.min(height, 1 - Math.max(0, y)),
          });
        }
      }
    },
    [isDragging, isResizing, dragStart, cropArea, tempArea, getRelativeCoords, handleCropAreaChange, interactingPage],
  );

  const handlePointerUp = useCallback(() => {
    if (isDragging && tempArea && tempArea.width > 0.01 && tempArea.height > 0.01) {
      handleCropAreaChange(tempArea);
    }
    setIsDragging(false);
    setIsResizing(null);
    setDragStart(null);
    setTempArea(null);
    setInteractingPage(null);
  }, [isDragging, tempArea, handleCropAreaChange]);

  const handleReset = useCallback(() => {
    handleCropAreaChange(null);
    setTempArea(null);
  }, [handleCropAreaChange]);

  const overlayArea = cropMode === "area" ? activeArea : { x: 0, y: 0, width: 1, height: 1 };

  // Determine which pages show the crop overlay
  const shouldShowOverlay = useCallback(
    (pageIdx: number): boolean => {
      // For area mode, need an area to be set
      if (cropMode === "area" && !activeArea) return false;
      if (cropPageMode === "all") return true;
      if (cropPageMode === "current") return pageIdx === cropCurrentPage;
      if (cropPageMode === "range") {
        const parts = cropPageRange.split(",");
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.includes("-")) {
            const [a, b] = trimmed.split("-").map(Number);
            if (pageIdx + 1 >= a && pageIdx + 1 <= b) return true;
          } else {
            if (pageIdx + 1 === Number(trimmed)) return true;
          }
        }
        return false;
      }
      return false;
    },
    [cropMode, activeArea, cropPageMode, cropCurrentPage, cropPageRange],
  );

  /* ── Loading ──────────────────────────────────────────────── */

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

  /* ── Render ───────────────────────────────────────────────── */

  return (
    <>
      <div
        ref={editorContainerRef}
        className="flex bg-background"
        style={{ height: "calc(100dvh - 140px)" }}
      >
        {/* ── Left: Page Thumbnails ─────────────────────────── */}
        <div className="hidden w-[160px] shrink-0 flex-col overflow-hidden border-r border-border bg-background sm:flex lg:w-[190px]">
          {/* Header */}
          <div className="flex h-12 items-center justify-center gap-1.5 border-b border-border px-3">
            <span className="text-base font-medium text-foreground">{labels.pageOf.split("/")[0]?.trim() || "Page"}</span>
            <span className="text-xs text-foreground-muted">{pages.length}</span>
          </div>
          {/* Thumbnail List */}
          <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto px-2 py-4">
            {pages.map((page, idx) => {
              const isActive = idx === cropCurrentPage;
              const thumbAspect = page.height / page.width;

              return (
                <div key={idx} className="flex w-[110px] shrink-0 flex-col items-center">
                  <button
                    type="button"
                    onClick={() => goToPage(idx)}
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
                  <span className="mt-1 text-[10px] text-foreground-muted">{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Center: Canvas Area ───────────────────────────── */}
        <div className="flex flex-1 flex-col min-h-0 min-w-0">
          {/* Top bar — file change button */}
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate text-sm font-medium text-foreground">{file.name}</span>
              <span className="shrink-0 text-xs text-foreground-muted">
                ({(file.size / 1024 / 1024).toFixed(1)} MB)
              </span>
            </div>
            <button
              type="button"
              onClick={onChangeFile}
              className="flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground"
            >
              <FileInput size={16} />
              <span className="hidden text-xs sm:inline">{labels.changeFile}</span>
            </button>
          </div>

          {/* Canvas scroll area — all pages stacked */}
          <div
            ref={scrollContainerRef}
            className="relative z-0 flex-1 overflow-y-auto bg-background-muted"
          >
            <div className="flex flex-col items-center gap-6 px-4 py-6 pb-16">
              {pages.map((page, idx) => {
                const pw = page.width * scale;
                const ph = page.height * scale;
                const showOverlay = shouldShowOverlay(idx);
                const isActivePage = idx === cropCurrentPage;

                // For margins mode, compute per-page overlay
                const pageOverlay = cropMode === "margins" && page
                  ? (() => {
                      const ptPerMm = 72 / 25.4;
                      const t = (cropMargins.top * ptPerMm) / page.height;
                      const r = (cropMargins.right * ptPerMm) / page.width;
                      const b = (cropMargins.bottom * ptPerMm) / page.height;
                      const l = (cropMargins.left * ptPerMm) / page.width;
                      if (t + b >= 1 || l + r >= 1) return null;
                      return { x: l, y: t, width: 1 - l - r, height: 1 - t - b };
                    })()
                  : null;

                const thisOverlay = cropMode === "area" ? activeArea : pageOverlay;

                return (
                  <div
                    key={idx}
                    ref={(el) => { if (el) pageRefs.current.set(idx, el); }}
                    data-page-index={idx}
                    className="relative shrink-0 select-none shadow-lg"
                    style={{ width: pw, height: ph }}
                  >
                    {/* Page image */}
                    {visiblePages.has(idx) ? (
                      <img
                        ref={(el) => { if (el) imgRefs.current.set(idx, el); }}
                        src={page.imageUrl}
                        alt={`Page ${idx + 1}`}
                        className="block rounded-sm"
                        style={{
                          width: pw,
                          height: ph,
                          background: "white",
                          cursor: cropMode === "area" ? "crosshair" : "default",
                        }}
                        draggable={false}
                        onMouseDown={(e) => handlePointerDown(e, idx)}
                        onMouseMove={handlePointerMove}
                        onMouseUp={handlePointerUp}
                        onMouseLeave={handlePointerUp}
                        onTouchStart={(e) => handlePointerDown(e, idx)}
                        onTouchMove={handlePointerMove}
                        onTouchEnd={handlePointerUp}
                      />
                    ) : (
                      <div className="bg-white rounded-sm" style={{ width: pw, height: ph }} />
                    )}

                    {/* Crop overlay */}
                    {showOverlay && thisOverlay && pw > 0 && (
                      <>
                        {/* Dark overlay — 4 rects */}
                        <div className="absolute bg-black/40 pointer-events-none" style={{ left: 0, top: 0, width: pw, height: thisOverlay.y * ph }} />
                        <div className="absolute bg-black/40 pointer-events-none" style={{ left: 0, top: (thisOverlay.y + thisOverlay.height) * ph, width: pw, height: (1 - thisOverlay.y - thisOverlay.height) * ph }} />
                        <div className="absolute bg-black/40 pointer-events-none" style={{ left: 0, top: thisOverlay.y * ph, width: thisOverlay.x * pw, height: thisOverlay.height * ph }} />
                        <div className="absolute bg-black/40 pointer-events-none" style={{ left: (thisOverlay.x + thisOverlay.width) * pw, top: thisOverlay.y * ph, width: (1 - thisOverlay.x - thisOverlay.width) * pw, height: thisOverlay.height * ph }} />

                        {/* Crop border */}
                        <div
                          className="absolute border-2 border-accent pointer-events-none"
                          style={{
                            left: thisOverlay.x * pw,
                            top: thisOverlay.y * ph,
                            width: thisOverlay.width * pw,
                            height: thisOverlay.height * ph,
                          }}
                        >
                          {/* Grid lines */}
                          <div className="absolute inset-0">
                            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
                            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30" />
                            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
                            <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
                          </div>

                          {/* Size badge — only on active page */}
                          {isActivePage && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/80 px-2 py-0.5 text-xs font-medium text-background backdrop-blur-sm">
                              {Math.round(thisOverlay.width * 100)}% × {Math.round(thisOverlay.height * 100)}%
                            </div>
                          )}
                        </div>

                        {/* Resize handles — area mode, active page only */}
                        {cropMode === "area" && isActivePage && !isDragging && (
                          <>
                            <Handle dir="nw" area={thisOverlay} dw={pw} dh={ph} />
                            <Handle dir="ne" area={thisOverlay} dw={pw} dh={ph} />
                            <Handle dir="sw" area={thisOverlay} dw={pw} dh={ph} />
                            <Handle dir="se" area={thisOverlay} dw={pw} dh={ph} />
                            <Handle dir="n" area={thisOverlay} dw={pw} dh={ph} />
                            <Handle dir="s" area={thisOverlay} dw={pw} dh={ph} />
                            <Handle dir="w" area={thisOverlay} dw={pw} dh={ph} />
                            <Handle dir="e" area={thisOverlay} dw={pw} dh={ph} />
                          </>
                        )}
                      </>
                    )}

                    {/* Drag hint — only on first visible page when no area set */}
                    {cropMode === "area" && !activeArea && !isDragging && idx === cropCurrentPage && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-foreground/70 text-background px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                          {labels.dragHint}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Crop Options ───────────────────────────── */}
        <div className="hidden w-[280px] shrink-0 flex-col overflow-hidden border-l border-border bg-background md:flex lg:w-[320px]">
          {/* Header */}
          <div className="flex h-12 items-center justify-center border-b border-border px-3">
            <span className="text-base font-medium text-foreground">{labels.title}</span>
          </div>
          {/* Options scroll area */}
          <div className="flex-1 overflow-y-auto p-4">
          <CropOptions
            cropArea={cropArea}
            margins={cropMargins}
            onMarginsChange={handleMarginsChange}
            cropMode={cropMode}
            onCropModeChange={onCropModeChange}
            pageMode={cropPageMode}
            onPageModeChange={onCropPageModeChange}
            pageRange={cropPageRange}
            onPageRangeChange={onCropPageRangeChange}
            pageCount={pageCount}
            onResetAll={onResetAll}
            labels={labels}
          />
          </div>
        </div>
      </div>

      {/* ── Fixed Bottom Nav Bar ─────────────────────────────── */}
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
          <NavTip label={labels.pageOf}>
            <button
              type="button"
              onClick={() => goToPage(cropCurrentPage - 1)}
              disabled={cropCurrentPage === 0}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:cursor-default disabled:opacity-30"
            >
              <ChevronUp size={16} />
            </button>
          </NavTip>
          {/* Page down */}
          <NavTip label={labels.pageOf}>
            <button
              type="button"
              onClick={() => goToPage(cropCurrentPage + 1)}
              disabled={cropCurrentPage >= pages.length - 1}
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
            value={pageInput !== "" ? pageInput : String(cropCurrentPage + 1)}
            onFocus={(e) => {
              setPageInput(String(cropCurrentPage + 1));
              requestAnimationFrame(() => e.target.select());
            }}
            onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ""))}
            onBlur={() => {
              const num = parseInt(pageInput, 10);
              if (!isNaN(num) && num >= 1 && num <= pages.length) {
                goToPage(num - 1);
              }
              setPageInput("");
            }}
            onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
            className="h-7 w-12 cursor-text rounded-md bg-background-muted px-1 text-center text-sm tabular-nums text-foreground outline-none focus:ring-1 focus:ring-accent"
          />
          <span className="text-sm text-foreground-muted">/ {pages.length}</span>

          <div className="mx-1 h-5 w-px bg-border" />

          {/* Zoom out */}
          <NavTip label="Zoom out">
            <button
              type="button"
              onClick={handleZoomOut}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"
            >
              <ZoomOut size={14} />
            </button>
          </NavTip>
          {/* Zoom in */}
          <NavTip label="Zoom in">
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

          <div className="mx-1 h-5 w-px bg-border" />

          {/* Fit width */}
          <NavTip label="Fit width">
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
          <NavTip label="Fit page">
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

          {/* Reset crop */}
          {activeArea && cropMode === "area" && (
            <>
              <div className="mx-1 h-5 w-px bg-border" />
              <NavTip label={labels.resetCrop}>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted hover:text-accent"
                >
                  <RotateCcw size={14} />
                </button>
              </NavTip>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Resize Handle ──────────────────────────────────────────── */

function Handle({
  dir,
  area,
  dw,
  dh,
}: {
  dir: string;
  area: CropArea;
  dw: number;
  dh: number;
}) {
  const size = 12;
  const half = size / 2;

  let left = 0;
  let top = 0;
  let cursor = "default";

  switch (dir) {
    case "nw": left = area.x * dw - half; top = area.y * dh - half; cursor = "nw-resize"; break;
    case "ne": left = (area.x + area.width) * dw - half; top = area.y * dh - half; cursor = "ne-resize"; break;
    case "sw": left = area.x * dw - half; top = (area.y + area.height) * dh - half; cursor = "sw-resize"; break;
    case "se": left = (area.x + area.width) * dw - half; top = (area.y + area.height) * dh - half; cursor = "se-resize"; break;
    case "n": left = (area.x + area.width / 2) * dw - half; top = area.y * dh - half; cursor = "n-resize"; break;
    case "s": left = (area.x + area.width / 2) * dw - half; top = (area.y + area.height) * dh - half; cursor = "s-resize"; break;
    case "w": left = area.x * dw - half; top = (area.y + area.height / 2) * dh - half; cursor = "w-resize"; break;
    case "e": left = (area.x + area.width) * dw - half; top = (area.y + area.height / 2) * dh - half; cursor = "e-resize"; break;
  }

  return (
    <div
      className="absolute z-10 rounded-full bg-accent border-2 border-white shadow-md pointer-events-auto"
      style={{ left, top, width: size, height: size, cursor }}
    />
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
