"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  MoveHorizontal,
  Maximize2,
  Columns2,
  Undo2,
  Redo2,
  MousePointer2,
  Square,
  Search,
  Trash2,
  CreditCard,
  Phone,
  Mail,
  FileText,
  ScanSearch,
  X,
  Check,
  Loader2,
  ChevronRight,
  Pipette,
} from "lucide-react";
import { useRedactStore } from "./use-redact-store";
import { usePdfPages } from "../edit-pdf/use-pdf-pages";
import {
  generateRedactId,
  REDACT_COLORS,
  CREDIT_CARD_REGEX,
  PHONE_REGEXES,
  PATTERN_REGEXES,
  isValidCreditCard,
  parsePageRange,
  type RedactPdfLabels,
  type RedactArea,
  type PatternType,
  type TextSearchResult,
} from "./redact-types";
import { ZOOM_STEPS } from "@/lib/pdf/constants";

export type { RedactPdfLabels };

type AnchorDir = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

const ANCHOR_CURSORS: Record<AnchorDir, string> = {
  nw: "nwse-resize", n: "ns-resize", ne: "nesw-resize", e: "ew-resize",
  se: "nwse-resize", s: "ns-resize", sw: "nesw-resize", w: "ew-resize",
};

function anchorPosition(dir: AnchorDir): React.CSSProperties {
  const half = "-5px"; // half of 2.5 (10px) anchor
  const center = "calc(50% - 5px)";
  switch (dir) {
    case "nw": return { top: half, left: half };
    case "n":  return { top: half, left: center };
    case "ne": return { top: half, right: half };
    case "e":  return { top: center, right: half };
    case "se": return { bottom: half, right: half };
    case "s":  return { bottom: half, left: center };
    case "sw": return { bottom: half, left: half };
    case "w":  return { top: center, left: half };
  }
}

/* ── Props ──────────────────────────────────────────────────── */

interface RedactLayoutProps {
  file: File;
  labels: RedactPdfLabels;
  onRedactionsChange: (redactions: RedactArea[]) => void;
  onChangeFile: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function RedactLayout({
  file,
  labels,
  onRedactionsChange,
  onChangeFile,
}: RedactLayoutProps) {
  const { state, dispatch, undo, redo } = useRedactStore();
  const { pages, loading } = usePdfPages(file);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const programmaticScroll = useRef(false);
  const [containerWidth, setContainerWidth] = useState(800);
  const [containerRect, setContainerRect] = useState({ left: 0, right: 0 });
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set([0]));
  const [viewMode, setViewMode] = useState<"fitWidth" | "fitPage" | null>("fitWidth");
  const [columns, setColumns] = useState<1 | 2>(1);
  const [manualScale, setManualScale] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(600);
  const [pageInput, setPageInput] = useState("");
  const [zoomInput, setZoomInput] = useState("");

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number; pageIndex: number } | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<{ x: number; y: number } | null>(null);

  // Drag-move state
  const [isDragging, setIsDragging] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOrigin, setDragOrigin] = useState<{ mouseX: number; mouseY: number; rx: number; ry: number } | null>(null);

  // Resize state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<AnchorDir | null>(null);
  const [resizeOrigin, setResizeOrigin] = useState<{ mouseX: number; mouseY: number; x: number; y: number; w: number; h: number } | null>(null);

  // Search & scan state
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<"text" | PatternType>>(new Set());
  const [scanPhase, setScanPhase] = useState<"select" | "scanning" | "results">("select");

  // Pattern detection state
  const [patternResults, setPatternResults] = useState<Record<PatternType, TextSearchResult[]>>({
    creditCard: [], phone: [], email: [],
  });
  const [textSearchResults, setTextSearchResults] = useState<TextSearchResult[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<Set<string>>(new Set());
  const [expandedPattern, setExpandedPattern] = useState<"text" | PatternType | null>(null);

  // Page redaction state
  const [pageRedactMode, setPageRedactMode] = useState<"current" | "all" | "odd" | "even" | "custom">("current");
  const [customPageInput, setCustomPageInput] = useState("");

  // Right panel section collapse
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set(["page"]));
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const toggleSection = useCallback((id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);
  const scrollRightPanelToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      rightPanelRef.current?.scrollTo({ top: rightPanelRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  /* ── Lock body scroll ────────────────────────────── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── Load pages ────────────────────────────────── */
  useEffect(() => {
    if (pages.length > 0) {
      dispatch({ type: "SET_PAGES", pages });
    }
  }, [pages, dispatch]);

  /* ── Notify parent ──────────────────────────────── */
  useEffect(() => {
    onRedactionsChange(state.redactions);
  }, [state.redactions, onRedactionsChange]);

  /* ── Measure center area ────────────────────────── */
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

  /* ── IntersectionObserver for visible pages ───── */
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

  /* ── Track active page from scroll ───────────── */
  const activePageRef = useRef(state.activePageIndex);
  activePageRef.current = state.activePageIndex;

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
          const dist = Math.abs(rect.top + rect.height / 2 - centerY);
          if (dist < closestDist) { closestDist = dist; closestIdx = idx; }
        });
        if (activePageRef.current !== closestIdx) {
          dispatch({ type: "SET_PAGE", index: closestIdx });
        }
      });
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => { container.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, [dispatch, loading]);

  /* ── Keyboard shortcuts ───────────────────────── */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) { e.preventDefault(); redo(); }
      if ((e.key === "Delete" || e.key === "Backspace") && state.selectedRedactionId) {
        e.preventDefault();
        dispatch({ type: "DELETE_REDACTION", id: state.selectedRedactionId });
      }
      if (e.key === "Escape") {
        dispatch({ type: "SET_TOOL", tool: "select" });
        dispatch({ type: "SELECT_REDACTION", id: null });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, state.selectedRedactionId, dispatch]);

  /* ── Derived values ───────────────────────────── */
  const maxPageWidth = pages.length > 0 ? Math.max(...pages.map((p) => p.width)) : 1;
  const maxPageHeight = pages.length > 0 ? Math.max(...pages.map((p) => p.height)) : 1;
  const fitWidthScale = columns === 2
    ? (containerWidth - 48 - 24) / (2 * maxPageWidth)
    : (containerWidth - 80) / maxPageWidth;
  const fitPageScale = Math.min(fitWidthScale, (scrollHeight - 80) / maxPageHeight);
  const rawScale = viewMode === "fitWidth" ? fitWidthScale : viewMode === "fitPage" ? fitPageScale : manualScale;
  const scale = pages.length > 0 ? Math.max(0.1, Math.min(5, rawScale)) : 1;
  const zoomPercent = Math.round(scale * 100);

  /* ── Navigation helpers ───────────────────────── */
  const scrollToPage = useCallback((idx: number) => {
    programmaticScroll.current = true;
    dispatch({ type: "SET_PAGE", index: idx });
    const el = pageRefs.current.get(idx);
    const container = scrollContainerRef.current;
    if (!el || !container) { programmaticScroll.current = false; return; }
    const top = Math.max(0, el.offsetTop - 5);
    requestAnimationFrame(() => container.scrollTo({ top, behavior: "smooth" }));
    const unlock = () => { programmaticScroll.current = false; };
    const fallback = setTimeout(unlock, 1000);
    container.addEventListener("scrollend", () => { clearTimeout(fallback); unlock(); }, { once: true });
  }, [dispatch]);

  const handleZoomIn = useCallback(() => {
    const next = ZOOM_STEPS.find((s) => s > zoomPercent) ?? 300;
    setManualScale(next / 100); setViewMode(null);
  }, [zoomPercent]);

  const handleZoomOut = useCallback(() => {
    const prev = [...ZOOM_STEPS].reverse().find((s) => s < zoomPercent) ?? 25;
    setManualScale(prev / 100); setViewMode(null);
  }, [zoomPercent]);

  /* ── Drawing handlers ─────────────────────────── */
  const handlePageMouseDown = useCallback((e: React.MouseEvent, pageIndex: number, page: { width: number; height: number }) => {
    // Deselect when clicking empty area on the page
    if (state.selectedRedactionId) {
      dispatch({ type: "SELECT_REDACTION", id: null });
    }
    if (state.activeTool !== "redactArea") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    const cx = Math.max(0, Math.min(page.width, x));
    const cy = Math.max(0, Math.min(page.height, y));
    setIsDrawing(true);
    setDrawStart({ x: cx, y: cy, pageIndex });
    setDrawCurrent({ x: cx, y: cy });
  }, [state.activeTool, state.selectedRedactionId, scale, dispatch]);

  const handlePageMouseMove = useCallback((e: React.MouseEvent, page: { width: number; height: number }) => {
    // Resize selected redaction
    if (isResizing && resizeDir && resizeOrigin && state.selectedRedactionId) {
      const rect = e.currentTarget.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / scale;
      const my = (e.clientY - rect.top) / scale;
      const dx = mx - resizeOrigin.mouseX;
      const dy = my - resizeOrigin.mouseY;
      const { x: ox, y: oy, w: ow, h: oh } = resizeOrigin;
      const MIN = 10;
      let nx = ox, ny = oy, nw = ow, nh = oh;

      // Horizontal
      if (resizeDir.includes("w")) { nx = Math.max(0, Math.min(ox + ow - MIN, ox + dx)); nw = ow - (nx - ox); }
      if (resizeDir.includes("e")) { nw = Math.max(MIN, Math.min(page.width - ox, ow + dx)); }
      // Vertical
      if (resizeDir.includes("n")) { ny = Math.max(0, Math.min(oy + oh - MIN, oy + dy)); nh = oh - (ny - oy); }
      if (resizeDir.includes("s")) { nh = Math.max(MIN, Math.min(page.height - oy, oh + dy)); }

      dispatch({ type: "UPDATE_REDACTION", id: state.selectedRedactionId, changes: { x: nx, y: ny, width: nw, height: nh } });
      return;
    }
    // Drag-move selected redaction
    if (isDragging && dragId && dragOrigin) {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / scale;
      const mouseY = (e.clientY - rect.top) / scale;
      const dx = mouseX - dragOrigin.mouseX;
      const dy = mouseY - dragOrigin.mouseY;
      const r = state.redactions.find((a) => a.id === dragId);
      if (r) {
        const newX = Math.max(0, Math.min(page.width - r.width, dragOrigin.rx + dx));
        const newY = Math.max(0, Math.min(page.height - r.height, dragOrigin.ry + dy));
        dispatch({ type: "UPDATE_REDACTION", id: dragId, changes: { x: newX, y: newY } });
      }
      return;
    }
    // Draw new area
    if (!isDrawing || !drawStart) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(page.width, (e.clientX - rect.left) / scale));
    const y = Math.max(0, Math.min(page.height, (e.clientY - rect.top) / scale));
    setDrawCurrent({ x, y });
  }, [isDrawing, drawStart, scale, isDragging, dragId, dragOrigin, isResizing, resizeDir, resizeOrigin, state.redactions, state.selectedRedactionId, dispatch]);

  const handlePageMouseUp = useCallback(() => {
    // End resize
    if (isResizing) {
      setIsResizing(false);
      setResizeDir(null);
      setResizeOrigin(null);
      return;
    }
    // End drag-move
    if (isDragging) {
      setIsDragging(false);
      setDragId(null);
      setDragOrigin(null);
      return;
    }
    // End draw
    if (!isDrawing || !drawStart || !drawCurrent) {
      setIsDrawing(false); return;
    }
    const minX = Math.min(drawStart.x, drawCurrent.x);
    const minY = Math.min(drawStart.y, drawCurrent.y);
    const w = Math.abs(drawCurrent.x - drawStart.x);
    const h = Math.abs(drawCurrent.y - drawStart.y);

    if (w > 5 && h > 5) {
      dispatch({
        type: "ADD_REDACTION",
        redaction: {
          id: generateRedactId(),
          pageIndex: drawStart.pageIndex,
          x: minX,
          y: minY,
          width: w,
          height: h,
          color: state.redactColor,
          type: "area",
        },
      });
    }
    setIsDrawing(false);
    setDrawStart(null);
    setDrawCurrent(null);
  }, [isDrawing, isDragging, isResizing, drawStart, drawCurrent, state.redactColor, dispatch]);

  /* ── Start drag on redaction mousedown ─────────── */
  const handleRedactionMouseDown = useCallback((e: React.MouseEvent, r: RedactArea) => {
    e.stopPropagation();
    dispatch({ type: "SELECT_REDACTION", id: r.id });
    dispatch({ type: "SET_TOOL", tool: "select" });
    // Start drag
    const pageEl = e.currentTarget.parentElement;
    if (!pageEl) return;
    const rect = pageEl.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / scale;
    const mouseY = (e.clientY - rect.top) / scale;
    setIsDragging(true);
    setDragId(r.id);
    setDragOrigin({ mouseX, mouseY, rx: r.x, ry: r.y });
  }, [dispatch, scale]);

  /* ── Start resize on anchor mousedown ────────── */
  const handleResizeStart = useCallback((e: React.MouseEvent, dir: AnchorDir, r: RedactArea) => {
    e.stopPropagation();
    e.preventDefault();
    const pageEl = (e.currentTarget as HTMLElement).closest("[data-page-index]");
    if (!pageEl) return;
    const rect = pageEl.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / scale;
    const mouseY = (e.clientY - rect.top) / scale;
    setIsResizing(true);
    setResizeDir(dir);
    setResizeOrigin({ mouseX, mouseY, x: r.x, y: r.y, w: r.width, h: r.height });
  }, [scale]);

  /* ── PDF text extraction helper ─────────────── */
  const extractAllText = useCallback(async () => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    // fontName → CSS font string cache
    const fontCache = new Map<string, string>();
    const measureCanvas = document.createElement("canvas").getContext("2d");
    const allItems: { pageIndex: number; text: string; x: number; y: number; width: number; height: number; fontName: string; fontSize: number }[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const viewport = page.getViewport({ scale: 1 });
      // Build font family lookup from commonObjs
      const styles = (textContent as { styles?: Record<string, { fontFamily?: string }> }).styles ?? {};

      for (const item of textContent.items) {
        if (!("str" in item) || !item.str.trim()) continue;
        const tx = item.transform[4];
        const ty = item.transform[5];
        const fontSize = Math.sqrt(item.transform[0] ** 2 + item.transform[1] ** 2);
        const w = item.width ?? fontSize * item.str.length * 0.6;
        const h = item.height ?? fontSize * 1.2;
        const konvaY = viewport.height - ty - h;
        const fontName = ("fontName" in item ? (item as { fontName: string }).fontName : "") ?? "";

        // Resolve CSS font string
        if (fontName && !fontCache.has(fontName)) {
          const style = styles[fontName];
          const family = style?.fontFamily ?? "sans-serif";
          fontCache.set(fontName, `${fontSize}px ${family}`);
        }

        allItems.push({
          pageIndex: i - 1,
          text: item.str,
          x: tx,
          y: konvaY,
          width: w,
          height: h,
          fontName,
          fontSize,
        });
      }
    }
    return { allItems, fontCache, measureCanvas };
  }, [file]);

  /* ── Run scan for selected categories ──────── */
  const handleRunScan = useCallback(async () => {
    if (selectedCategories.size === 0) return;
    setScanPhase("scanning");

    try {
      const { allItems, fontCache, measureCanvas } = await extractAllText();

      type TextItem = typeof allItems[number];
      const newPatternResults: Record<PatternType, TextSearchResult[]> = {
        creditCard: [], phone: [], email: [],
      };
      let newTextResults: TextSearchResult[] = [];

      // Helper: find items spanning a match in joined text and compute bounding box
      // Build per-page index for positional lookup
      const itemsByPage = new Map<number, TextItem[]>();
      for (const it of allItems) {
        let arr = itemsByPage.get(it.pageIndex);
        if (!arr) { arr = []; itemsByPage.set(it.pageIndex, arr); }
        arr.push(it);
      }

      // Helper: measure substring width using canvas + font info for accuracy
      function measureSubstring(item: TextItem, start: number, len: number): { offsetX: number; width: number } {
        if (!measureCanvas || item.text.length === 0) {
          // fallback to average char width
          const charW = item.width / item.text.length;
          return { offsetX: start * charW, width: len * charW };
        }
        const font = fontCache.get(item.fontName);
        if (font) {
          measureCanvas.font = font;
        } else {
          measureCanvas.font = `${item.fontSize}px sans-serif`;
        }
        // Scale factor: actual item width vs measured full string width
        const measuredFull = measureCanvas.measureText(item.text).width;
        const scaleFactor = measuredFull > 0 ? item.width / measuredFull : 1;
        const prefix = item.text.substring(0, start);
        const sub = item.text.substring(start, start + len);
        const offsetX = measureCanvas.measureText(prefix).width * scaleFactor;
        const subW = measureCanvas.measureText(sub).width * scaleFactor;
        return { offsetX, width: subW };
      }

      // Helper: given a substring match inside an item's text, compute the sub-region
      function subRegion(item: TextItem, matchStart: number, matchLen: number): TextSearchResult {
        const { offsetX, width } = measureSubstring(item, matchStart, matchLen);
        return {
          pageIndex: item.pageIndex,
          x: item.x + offsetX,
          y: item.y,
          width,
          height: item.height,
          text: item.text.substring(matchStart, matchStart + matchLen),
        };
      }

      // Text search — per-word substring matching with precise bounds
      if (selectedCategories.has("text") && searchInput.trim()) {
        const query = searchInput.trim().toLowerCase();
        for (const item of allItems) {
          const lower = item.text.toLowerCase();
          let idx = 0;
          while ((idx = lower.indexOf(query, idx)) !== -1) {
            newTextResults.push(subRegion(item, idx, query.length));
            idx += query.length;
          }
        }
      }

      // Pattern detection — per-item matching to avoid cross-boundary issues
      const patternTypes = (["creditCard", "phone", "email"] as PatternType[])
        .filter((t) => selectedCategories.has(t));

      if (patternTypes.length > 0) {
        // Helper: run a single regex against item text and collect sub-region results
        function matchInItem(item: TextItem, regex: RegExp, type: PatternType) {
          const freshRegex = new RegExp(regex.source, regex.flags);
          let match;
          while ((match = freshRegex.exec(item.text)) !== null) {
            const matchText = match[0].trim();
            if (!matchText) continue;
            if (type === "creditCard" && !isValidCreditCard(matchText)) continue;
            if (type === "phone") {
              const digitsOnly = matchText.replace(/\D/g, "");
              if (digitsOnly.length < 7 || digitsOnly.length > 15) continue;
            }
            newPatternResults[type].push(subRegion(item, match.index, match[0].length));
          }
        }

        for (const item of allItems) {
          // Credit card — per-item to prevent cross-boundary matching
          if (selectedCategories.has("creditCard")) {
            matchInItem(item, CREDIT_CARD_REGEX, "creditCard");
          }
          // Phone — try each specific phone regex
          if (selectedCategories.has("phone")) {
            for (const phoneRegex of PHONE_REGEXES) {
              matchInItem(item, phoneRegex, "phone");
            }
          }
          // Email
          if (selectedCategories.has("email")) {
            matchInItem(item, PATTERN_REGEXES.email, "email");
          }
        }

        // De-duplicate by position + text
        for (const type of patternTypes) {
          const seen = new Set<string>();
          newPatternResults[type] = newPatternResults[type].filter((r) => {
            const key = `${r.pageIndex}-${Math.round(r.x)}-${Math.round(r.y)}-${r.text}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        }
      }

      setTextSearchResults(newTextResults);
      setPatternResults(newPatternResults);

      // Auto-select all results
      const allKeys = new Set<string>();
      newTextResults.forEach((_, i) => allKeys.add(`text-${i}`));
      for (const type of patternTypes) {
        newPatternResults[type].forEach((_, i) => allKeys.add(`${type}-${i}`));
      }
      setSelectedPatterns(allKeys);

      // Update search results in store for highlighting on canvas
      dispatch({ type: "SET_SEARCH_RESULTS", results: [...newTextResults, ...patternTypes.flatMap((t) => newPatternResults[t])] });

      setScanPhase("results");
    } catch (err) {
      console.error("Scan failed:", err);
      setScanPhase("select");
    }
  }, [selectedCategories, searchInput, extractAllText, dispatch]);

  /* ── Redact selected scan results ──────────── */
  const handleRedactSelectedPatterns = useCallback(() => {
    const toRedact: TextSearchResult[] = [];
    for (const key of selectedPatterns) {
      const [type, idxStr] = key.split("-");
      const idx = parseInt(idxStr, 10);
      if (type === "text") {
        if (textSearchResults[idx]) toRedact.push(textSearchResults[idx]);
      } else {
        const arr = patternResults[type as PatternType];
        if (arr && arr[idx]) toRedact.push(arr[idx]);
      }
    }
    if (toRedact.length > 0) {
      dispatch({ type: "ADD_TEXT_REDACTIONS", results: toRedact });
    }
    // Reset scan
    setScanPhase("select");
    setSelectedCategories(new Set());
    setSearchInput("");
    setTextSearchResults([]);
    setPatternResults({ creditCard: [], phone: [], email: [] });
    setSelectedPatterns(new Set());
    setExpandedPattern(null);
    dispatch({ type: "SET_SEARCH_RESULTS", results: [] });
  }, [selectedPatterns, textSearchResults, patternResults, dispatch]);

  const togglePatternItem = useCallback((key: string) => {
    setSelectedPatterns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const toggleAllForType = useCallback((type: "text" | PatternType) => {
    setSelectedPatterns((prev) => {
      const next = new Set(prev);
      const items = type === "text" ? textSearchResults : patternResults[type];
      const allSelected = items.every((_, i) => next.has(`${type}-${i}`));
      items.forEach((_, i) => {
        const key = `${type}-${i}`;
        if (allSelected) next.delete(key); else next.add(key);
      });
      return next;
    });
  }, [patternResults, textSearchResults]);

  const toggleCategory = useCallback((cat: "text" | PatternType) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
    // Reset results when changing categories
    if (scanPhase === "results") {
      setScanPhase("select");
      dispatch({ type: "SET_SEARCH_RESULTS", results: [] });
    }
  }, [scanPhase, dispatch]);

  /* ── Page redaction ───────────────────────────── */
  const handleAddPageRedaction = useCallback(() => {
    let targetPages: number[] = [];
    const total = pages.length;

    switch (pageRedactMode) {
      case "current":
        targetPages = [state.activePageIndex];
        break;
      case "all":
        targetPages = pages.map((_, i) => i);
        break;
      case "odd":
        targetPages = pages.map((_, i) => i).filter((i) => i % 2 === 0);
        break;
      case "even":
        targetPages = pages.map((_, i) => i).filter((i) => i % 2 === 1);
        break;
      case "custom":
        targetPages = parsePageRange(customPageInput, total);
        break;
    }

    for (const pageIdx of targetPages) {
      const page = pages[pageIdx];
      if (!page) continue;
      dispatch({
        type: "ADD_REDACTION",
        redaction: {
          id: generateRedactId(),
          pageIndex: pageIdx,
          x: 0,
          y: 0,
          width: page.width,
          height: page.height,
          color: state.redactColor,
          type: "area",
          label: labels.pageRedaction,
        },
      });
    }

    setCustomPageInput("");
  }, [pageRedactMode, customPageInput, pages, state.activePageIndex, state.redactColor, dispatch, labels.pageRedaction]);

  const handleSelectRedaction = useCallback((id: string) => {
    dispatch({ type: "SELECT_REDACTION", id });
    dispatch({ type: "SET_TOOL", tool: "select" });
    const r = state.redactions.find((a) => a.id === id);
    if (r) scrollToPage(r.pageIndex);
  }, [dispatch, state.redactions, scrollToPage]);

  /* ── Loading ────────────────────────────────────── */
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

  const selectedRedaction = state.redactions.find((r) => r.id === state.selectedRedactionId) ?? null;
  const totalResultCount = textSearchResults.length + patternResults.creditCard.length + patternResults.phone.length + patternResults.email.length;

  const CATEGORY_CARDS: { type: "text" | PatternType; icon: typeof Search; labelKey: keyof RedactPdfLabels; desc: string }[] = [
    { type: "text", icon: Search, labelKey: "toolRedactText", desc: labels.searchPlaceholder },
    { type: "creditCard", icon: CreditCard, labelKey: "patternCreditCard", desc: "4111-XXXX-XXXX-XXXX" },
    { type: "phone", icon: Phone, labelKey: "patternPhone", desc: "+1 (555) 123-4567" },
    { type: "email", icon: Mail, labelKey: "patternEmail", desc: "user@example.com" },
  ];

  const PATTERN_META: { type: PatternType; icon: typeof CreditCard; labelKey: "patternCreditCard" | "patternPhone" | "patternEmail" }[] = [
    { type: "creditCard", icon: CreditCard, labelKey: "patternCreditCard" },
    { type: "phone", icon: Phone, labelKey: "patternPhone" },
    { type: "email", icon: Mail, labelKey: "patternEmail" },
  ];

  /* ── Render ─────────────────────────────────────── */
  return (
    <>
    <div className="flex bg-background" style={{ height: "calc(100dvh - 140px)" }}>
      {/* ── Left: Page Thumbnails ───────────────── */}
      <div className="hidden w-[160px] shrink-0 flex-col overflow-hidden border-r border-border bg-background sm:flex lg:w-[190px]">
        <div className="flex h-12 items-center justify-center gap-1.5 border-b border-border px-3">
          <span className="text-base font-medium text-foreground">{labels.pageLabel}</span>
          <span className="text-xs text-foreground-muted">{pages.length}</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto px-2 py-4">
          {pages.map((page, idx) => {
            const isActive = idx === state.activePageIndex;
            const redactCount = state.redactions.filter((r) => r.pageIndex === idx).length;
            const detectCount = textSearchResults.filter((r) => r.pageIndex === idx).length
              + patternResults.creditCard.filter((r) => r.pageIndex === idx).length
              + patternResults.phone.filter((r) => r.pageIndex === idx).length
              + patternResults.email.filter((r) => r.pageIndex === idx).length;
            const count = redactCount + detectCount;
            const thumbAspect = page.height / page.width;
            return (
              <div key={idx} className="flex w-[110px] shrink-0 flex-col items-center">
                <button
                  type="button"
                  onClick={() => scrollToPage(idx)}
                  className={`w-full relative overflow-hidden rounded-md border-2 transition-all cursor-pointer ${
                    isActive ? "border-accent shadow-sm" : "border-border hover:border-foreground-muted"
                  }`}
                >
                  <div className="relative w-full bg-white" style={{ paddingBottom: `${thumbAspect * 100}%` }}>
                    <img src={page.imageUrl} alt={`Page ${idx + 1}`} className="absolute inset-0 h-full w-full object-contain" loading="lazy" />
                    {state.redactions.filter((r) => r.pageIndex === idx).map((r) => (
                      <div
                        key={r.id}
                        className="absolute opacity-60"
                        style={{
                          left: `${(r.x / page.width) * 100}%`,
                          top: `${(r.y / page.height) * 100}%`,
                          width: `${(r.width / page.width) * 100}%`,
                          height: `${(r.height / page.height) * 100}%`,
                          backgroundColor: r.color,
                        }}
                      />
                    ))}
                  </div>
                </button>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-foreground-muted">
                  <span>{idx + 1}</span>
                  {count > 0 && (
                    <span className="rounded-full bg-red-500/10 px-1 text-red-500">{count}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Center: Toolbar + Canvas ───────────── */}
      <div className="flex flex-1 flex-col min-h-0 min-w-0">
        {/* Top Toolbar — minimal */}
        <div className="flex h-12 items-center gap-1 border-b border-border bg-background px-2">
          <ToolBtn onClick={undo} disabled={state.history.past.length === 0} title={labels.undo}>
            <Undo2 size={16} />
          </ToolBtn>
          <ToolBtn onClick={redo} disabled={state.history.future.length === 0} title={labels.redo}>
            <Redo2 size={16} />
          </ToolBtn>

          <div className="mx-1 h-5 w-px bg-border" />

          <ToolBtn
            onClick={() => {
              if (state.redactions.length > 0 && confirm(labels.confirmClearAll)) {
                dispatch({ type: "CLEAR_ALL" });
              }
            }}
            disabled={state.redactions.length === 0}
            title={labels.deleteRedaction}
          >
            <Trash2 size={16} />
          </ToolBtn>

          {state.redactions.length > 0 && (
            <span className="ml-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-500">
              {state.redactions.length}
            </span>
          )}

          <div className="flex-1" />

          <button
            type="button"
            onClick={onChangeFile}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-foreground-muted hover:bg-background-muted transition-colors cursor-pointer"
          >
            {labels.changeFile}
          </button>
        </div>

        {/* Tool placement guide */}
        {state.activeTool === "redactArea" && (
          <div className="pointer-events-none sticky top-14 z-30 -mb-[28px] flex justify-center" style={{ height: 28 }}>
            <span className="rounded-full border border-red-300 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-600 shadow-sm backdrop-blur-sm dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
              {labels.clickToDraw}
            </span>
          </div>
        )}

        {/* Canvas area */}
        <div
          ref={scrollContainerRef}
          className="relative z-0 flex-1 overflow-y-auto bg-background-muted"
        >
          <div className={columns === 2 ? "flex flex-wrap justify-center gap-4 px-2 py-6 pb-16" : "flex flex-col items-center gap-6 px-4 py-6 pb-16"}>
            {pages.map((page, idx) => (
              <div
                key={idx}
                ref={(el) => { if (el) pageRefs.current.set(idx, el); }}
                data-page-index={idx}
                className="shrink-0 shadow-lg relative"
                style={{
                  width: page.width * scale,
                  height: page.height * scale,
                  cursor: state.activeTool === "redactArea" ? "crosshair" : "default",
                }}
                onMouseDown={(e) => handlePageMouseDown(e, idx, page)}
                onMouseMove={(e) => handlePageMouseMove(e, page)}
                onMouseUp={handlePageMouseUp}
                onMouseLeave={() => { if (isDrawing || isDragging || isResizing) handlePageMouseUp(); }}
              >
                {visiblePages.has(idx) ? (
                  <img
                    src={page.imageUrl}
                    alt={`Page ${idx + 1}`}
                    className="absolute inset-0 h-full w-full"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white" />
                )}

                {/* Rendered redaction areas */}
                {state.redactions.filter((r) => r.pageIndex === idx).map((r) => {
                  const isSelected = state.selectedRedactionId === r.id;
                  return (
                    <div
                      key={r.id}
                      className={`absolute transition-shadow group/redact ${
                        isSelected
                          ? "ring-2 ring-accent ring-offset-1"
                          : "hover:ring-2 hover:ring-accent/50"
                      }`}
                      style={{
                        left: r.x * scale,
                        top: r.y * scale,
                        width: r.width * scale,
                        height: r.height * scale,
                        backgroundColor: r.color,
                        opacity: 0.7,
                        cursor: state.activeTool === "redactArea" ? "crosshair" : "move",
                      }}
                      onMouseDown={(e) => handleRedactionMouseDown(e, r)}
                    >
                      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`hash-${r.id}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <line x1="0" y1="0" x2="0" y2="8" stroke="white" strokeWidth="2" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#hash-${r.id})`} />
                      </svg>
                      {/* Delete button — visible on hover or when selected */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: "DELETE_REDACTION", id: r.id });
                        }}
                        className={`absolute left-1/2 -translate-x-1/2 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-2 ring-white transition-all cursor-pointer hover:bg-red-700 hover:scale-110 ${
                          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                        }`}
                        style={{ bottom: -36 }}
                        title={labels.deleteRedaction}
                      >
                        <X size={12} />
                      </button>
                      {/* Resize anchors — 8 directions, only when selected */}
                      {isSelected && (
                        <>
                          {(["nw","n","ne","e","se","s","sw","w"] as AnchorDir[]).map((dir) => (
                            <div
                              key={dir}
                              onMouseDown={(e) => handleResizeStart(e, dir, r)}
                              className="absolute z-20 h-2.5 w-2.5 rounded-full border-2 border-accent bg-white shadow-sm"
                              style={{
                                cursor: ANCHOR_CURSORS[dir],
                                ...anchorPosition(dir),
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Search result highlights */}
                {state.searchResults.filter((r) => r.pageIndex === idx).map((r, i) => (
                  <div
                    key={`sr-${i}`}
                    className="absolute border-2 border-yellow-400 bg-yellow-200/40 rounded-sm"
                    style={{
                      left: (r.x - 2) * scale,
                      top: r.y * scale,
                      width: (r.width + 6) * scale,
                      height: (r.height + 5) * scale,
                    }}
                  />
                ))}

                {/* Drawing preview */}
                {isDrawing && drawStart && drawCurrent && drawStart.pageIndex === idx && (
                  <div
                    className="absolute border-2 border-dashed border-red-500"
                    style={{
                      left: Math.min(drawStart.x, drawCurrent.x) * scale,
                      top: Math.min(drawStart.y, drawCurrent.y) * scale,
                      width: Math.abs(drawCurrent.x - drawStart.x) * scale,
                      height: Math.abs(drawCurrent.y - drawStart.y) * scale,
                      backgroundColor: `${state.redactColor}40`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Tools & Options Panel ───────── */}
      <div className="hidden w-[280px] shrink-0 flex-col border-l border-border bg-background sm:flex lg:w-[320px]">
        <div className="flex h-12 items-center justify-center border-b border-border px-3">
          <span className="text-base font-medium text-foreground">{labels.toolsPanelTitle}</span>
        </div>
        <div ref={rightPanelRef} className="flex-1 overflow-y-auto pb-5">

          {/* ─ Section: 도구 선택 ─ */}
          <PanelSection title={labels.toolSelect} icon={<MousePointer2 size={14} />} collapsed={collapsedSections.has("tools")} onToggle={() => toggleSection("tools")}>
            <div className="flex gap-1.5 px-4 pb-3">
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_TOOL", tool: "select" })}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  state.activeTool === "select" ? "border-accent bg-accent/10 text-accent" : "border-border hover:bg-background-muted text-foreground-muted"
                }`}
              >
                <MousePointer2 size={14} />
                {labels.toolSelect}
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_TOOL", tool: "redactArea" })}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  state.activeTool === "redactArea" ? "border-accent bg-accent/10 text-accent" : "border-border hover:bg-background-muted text-foreground-muted"
                }`}
              >
                <Square size={14} />
                {labels.toolRedactArea}
              </button>
            </div>
          </PanelSection>

          {/* ─ Section: 검열 색상 ─ */}
          <PanelSection title={labels.redactColor} collapsed={collapsedSections.has("color")} onToggle={() => toggleSection("color")}>
            <div className="flex items-center gap-2 px-4 pb-3">
              {REDACT_COLORS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    dispatch({ type: "SET_COLOR", color: value });
                    if (state.selectedRedactionId) {
                      dispatch({ type: "UPDATE_REDACTION", id: state.selectedRedactionId, changes: { color: value } });
                    }
                  }}
                  title={labels[label]}
                  className={`h-7 w-7 rounded-full border-2 cursor-pointer transition-all ${
                    state.redactColor === value
                      ? "border-accent scale-110 ring-2 ring-accent/30"
                      : "border-border hover:border-foreground-muted"
                  }`}
                  style={{ backgroundColor: value }}
                />
              ))}
              {/* Custom color picker */}
              <label
                className={`relative h-7 w-7 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${
                  !REDACT_COLORS.some(({ value }) => value === state.redactColor)
                    ? "border-accent scale-110 ring-2 ring-accent/30"
                    : "border-border hover:border-foreground-muted"
                }`}
                style={{
                  backgroundColor: !REDACT_COLORS.some(({ value }) => value === state.redactColor)
                    ? state.redactColor
                    : "transparent",
                }}
              >
                <Pipette size={14} className="text-foreground-muted" />
                <input
                  type="color"
                  value={state.redactColor}
                  onChange={(e) => {
                    dispatch({ type: "SET_COLOR", color: e.target.value });
                    if (state.selectedRedactionId) {
                      dispatch({ type: "UPDATE_REDACTION", id: state.selectedRedactionId, changes: { color: e.target.value } });
                    }
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>
          </PanelSection>

          {/* ─ Section: 자동 감지 & 검색 ─ */}
          <PanelSection title={labels.patternDetect} icon={<ScanSearch size={14} />} collapsed={collapsedSections.has("detect")} onToggle={() => toggleSection("detect")}>
            <div className="px-4 pb-4 space-y-3">
              {/* Category cards */}
              <div className="space-y-1.5">
                {CATEGORY_CARDS.map(({ type, icon: Icon, labelKey, desc }) => {
                  const isSelected = selectedCategories.has(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      data-testid={`category-${type}`}
                      onClick={() => toggleCategory(type)}
                      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-accent bg-accent/10 shadow-sm"
                          : "border-border hover:bg-background-muted hover:border-foreground-muted"
                      }`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${isSelected ? "bg-accent/20" : "bg-background-muted"}`}>
                        <Icon size={16} className={isSelected ? "text-accent" : "text-foreground-muted"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs font-medium block ${isSelected ? "text-accent" : "text-foreground"}`}>
                          {labels[labelKey]}
                        </span>
                        <span className="text-[10px] text-foreground-subtle truncate block">{desc}</span>
                      </div>
                      {isSelected && (
                        <Check size={14} className="text-accent shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Text search input — shown when text category is selected */}
              {selectedCategories.has("text") && (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background-muted/50 px-3 py-2">
                  <Search size={14} className="text-foreground-muted shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && selectedCategories.size > 0) handleRunScan(); }}
                    placeholder={labels.searchPlaceholder}
                    className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-foreground-subtle"
                    autoFocus
                  />
                </div>
              )}

              {/* Scan button */}
              {selectedCategories.size > 0 && scanPhase !== "results" && (
                <button
                  type="button"
                  data-testid="scan-button"
                  onClick={handleRunScan}
                  disabled={scanPhase === "scanning" || (selectedCategories.has("text") && !selectedCategories.has("creditCard") && !selectedCategories.has("phone") && !selectedCategories.has("email") && !searchInput.trim())}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-xs font-medium text-accent-foreground hover:brightness-110 disabled:opacity-50 cursor-pointer transition-all"
                >
                  {scanPhase === "scanning" ? (
                    <><Loader2 size={14} className="animate-spin" /> {labels.patternScanning}</>
                  ) : (
                    <><ScanSearch size={14} /> {labels.searchButton}</>
                  )}
                </button>
              )}

              {/* Results */}
              {scanPhase === "results" && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">
                      {labels.patternFound.replace("{count}", String(totalResultCount))}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setScanPhase("select");
                        dispatch({ type: "SET_SEARCH_RESULTS", results: [] });
                      }}
                      className="text-foreground-muted hover:text-foreground cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {totalResultCount === 0 && (
                    <p className="text-xs text-foreground-subtle text-center py-3">{labels.patternNone}</p>
                  )}

                  {/* Text results */}
                  {textSearchResults.length > 0 && (
                    <ResultGroup
                      type="text"
                      label={labels.toolRedactText}
                      icon={<Search size={12} />}
                      items={textSearchResults}
                      selectedPatterns={selectedPatterns}
                      expandedPattern={expandedPattern}
                      onExpand={() => setExpandedPattern(expandedPattern === "text" ? null : "text")}
                      onToggleItem={togglePatternItem}
                      onToggleAll={() => toggleAllForType("text")}
                    />
                  )}

                  {/* Pattern results */}
                  {PATTERN_META.map(({ type, icon: Icon, labelKey }) => {
                    const items = patternResults[type];
                    if (items.length === 0) return null;
                    return (
                      <ResultGroup
                        key={type}
                        type={type}
                        label={labels[labelKey]}
                        icon={<Icon size={12} />}
                        items={items}
                        selectedPatterns={selectedPatterns}
                        expandedPattern={expandedPattern}
                        onExpand={() => setExpandedPattern(expandedPattern === type ? null : type)}
                        onToggleItem={togglePatternItem}
                        onToggleAll={() => toggleAllForType(type)}
                      />
                    );
                  })}

                  {/* Redact selected button */}
                  {totalResultCount > 0 && (
                    <button
                      type="button"
                      data-testid="redact-selected-button"
                      onClick={handleRedactSelectedPatterns}
                      disabled={selectedPatterns.size === 0}
                      className="w-full rounded-lg bg-red-500 px-3 py-2.5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer transition-colors"
                    >
                      {labels.redactSelected} ({selectedPatterns.size})
                    </button>
                  )}
                </div>
              )}
            </div>
          </PanelSection>

          {/* ─ Section: 페이지 검열 (옵션만, 버튼은 하단 고정) ─ */}
          <PanelSection title={labels.redactFullPage} icon={<FileText size={14} />} collapsed={collapsedSections.has("page")} onToggle={() => { toggleSection("page"); if (collapsedSections.has("page")) scrollRightPanelToBottom(); }}>
            <div className="px-4 pb-3 space-y-2">
              <p className="text-[11px] text-foreground-muted">{labels.redactFullPageDesc}</p>

              <div className="space-y-1">
                {([
                  ["current", labels.currentPage + ` (${state.activePageIndex + 1})`],
                  ["all", labels.allPages + ` (${pages.length})`],
                  ["odd", labels.oddPages],
                  ["even", labels.evenPages],
                  ["custom", labels.customPages],
                ] as [typeof pageRedactMode, string][]).map(([mode, label]) => (
                  <label
                    key={mode}
                    className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 cursor-pointer transition-colors text-xs ${
                      pageRedactMode === mode ? "border-accent bg-accent/5" : "border-border hover:bg-background-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pageRedactMode"
                      checked={pageRedactMode === mode}
                      onChange={() => setPageRedactMode(mode)}
                      className="accent-accent"
                    />
                    <span className="text-foreground">{label}</span>
                  </label>
                ))}
              </div>

              {pageRedactMode === "custom" && (
                <input
                  type="text"
                  value={customPageInput}
                  onChange={(e) => setCustomPageInput(e.target.value)}
                  placeholder={labels.customPagesPlaceholder}
                  className="w-full rounded-md border border-border bg-background-muted px-2.5 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-accent placeholder:text-foreground-subtle"
                />
              )}

              <button
                type="button"
                onClick={handleAddPageRedaction}
                disabled={pageRedactMode === "custom" && !customPageInput.trim()}
                className="w-full rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer transition-colors"
              >
                {labels.addPageRedaction}
              </button>
            </div>
          </PanelSection>

          {/* ─ Section: 선택된 영역 — 삭제만 ─ */}
          {selectedRedaction && (
            <div className="border-t border-border px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs text-foreground-muted truncate">
                {selectedRedaction.label ? `"${selectedRedaction.label}"` : (selectedRedaction.type === "area" ? labels.areaRedaction : labels.textRedaction)}
              </span>
              <button
                type="button"
                onClick={() => dispatch({ type: "DELETE_REDACTION", id: selectedRedaction.id })}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 cursor-pointer shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>

      </div>
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
        <NavTip label={labels.previousPage}>
          <button type="button" onClick={() => scrollToPage(Math.max(0, state.activePageIndex - 1))} disabled={state.activePageIndex === 0} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:cursor-default disabled:opacity-30"><ChevronUp size={16} /></button>
        </NavTip>
        <NavTip label={labels.nextPage}>
          <button type="button" onClick={() => scrollToPage(Math.min(pages.length - 1, state.activePageIndex + 1))} disabled={state.activePageIndex >= pages.length - 1} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:cursor-default disabled:opacity-30"><ChevronDown size={16} /></button>
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        <input
          type="text"
          inputMode="numeric"
          value={pageInput !== "" ? pageInput : String(state.activePageIndex + 1)}
          onFocus={(e) => { setPageInput(String(state.activePageIndex + 1)); requestAnimationFrame(() => e.target.select()); }}
          onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ""))}
          onBlur={() => { const num = parseInt(pageInput, 10); if (!isNaN(num) && num >= 1 && num <= pages.length) scrollToPage(num - 1); setPageInput(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
          className="h-7 w-12 cursor-text rounded-md bg-background-muted px-1 text-center text-sm tabular-nums text-foreground outline-none focus:ring-1 focus:ring-accent"
        />
        <span className="text-sm text-foreground-muted">/ {pages.length}</span>

        <div className="mx-1 h-5 w-px bg-border" />

        <NavTip label={labels.zoomOut}>
          <button type="button" onClick={handleZoomOut} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"><ZoomOut size={14} /></button>
        </NavTip>
        <NavTip label={labels.zoomIn}>
          <button type="button" onClick={handleZoomIn} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"><ZoomIn size={14} /></button>
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        <NavTip label={`${labels.zoomIn} / ${labels.zoomOut}`}>
          <input
            type="text"
            inputMode="numeric"
            value={zoomInput !== "" ? zoomInput : `${zoomPercent}%`}
            onFocus={(e) => { setZoomInput(String(zoomPercent)); requestAnimationFrame(() => e.target.select()); }}
            onChange={(e) => setZoomInput(e.target.value.replace(/[^\d]/g, ""))}
            onBlur={() => { const num = parseInt(zoomInput, 10); if (!isNaN(num) && num >= 10 && num <= 500) { setManualScale(num / 100); setViewMode(null); } setZoomInput(""); }}
            onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
            className="h-7 w-14 cursor-text rounded-md bg-background-muted px-1 text-center text-sm tabular-nums text-foreground outline-none focus:ring-1 focus:ring-accent"
          />
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        <NavTip label={labels.fitWidth}>
          <button type="button" onClick={() => setViewMode("fitWidth")} className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${viewMode === "fitWidth" ? "bg-accent/15 text-accent" : "text-foreground-muted hover:bg-background-muted"}`}><MoveHorizontal size={14} /></button>
        </NavTip>
        <NavTip label={labels.fitPage}>
          <button type="button" onClick={() => setViewMode("fitPage")} className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${viewMode === "fitPage" ? "bg-accent/15 text-accent" : "text-foreground-muted hover:bg-background-muted"}`}><Maximize2 size={14} /></button>
        </NavTip>

        <div className="mx-1 h-5 w-px bg-border" />

        <NavTip label={columns === 1 ? labels.doublePage : labels.singlePage}>
          <button type="button" onClick={() => setColumns((c) => (c === 1 ? 2 : 1))} className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${columns === 2 ? "bg-accent/15 text-accent" : "text-foreground-muted hover:bg-background-muted"}`}><Columns2 size={14} /></button>
        </NavTip>
      </div>
    </div>
    </>
  );
}

/* ── Panel Section (collapsible) ─────────────────── */
function PanelSection({ title, icon, collapsed, onToggle, children }: {
  title: string;
  icon?: React.ReactNode;
  collapsed?: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors hover:bg-background-muted/50 cursor-pointer"
      >
        <ChevronRight size={12} className={`text-foreground-muted transition-transform ${collapsed ? "" : "rotate-90"}`} />
        {icon && <span className="text-foreground-muted">{icon}</span>}
        <span className="text-xs font-semibold text-foreground">{title}</span>
      </button>
      {!collapsed && children}
    </div>
  );
}

/* ── Result Group (for scan results) ─────────────── */
function ResultGroup({ type, label, icon, items, selectedPatterns, expandedPattern, onExpand, onToggleItem, onToggleAll }: {
  type: string;
  label: string;
  icon: React.ReactNode;
  items: TextSearchResult[];
  selectedPatterns: Set<string>;
  expandedPattern: string | null;
  onExpand: () => void;
  onToggleItem: (key: string) => void;
  onToggleAll: () => void;
}) {
  const isExpanded = expandedPattern === type;
  const selectedCount = items.filter((_, i) => selectedPatterns.has(`${type}-${i}`)).length;

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        type="button"
        onClick={onExpand}
        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left hover:bg-background-muted/50 cursor-pointer transition-colors"
      >
        <ChevronRight size={10} className={`text-foreground-muted transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        <span className="text-foreground-muted">{icon}</span>
        <span className="flex-1 text-[11px] font-medium text-foreground">{label}</span>
        <span className="text-[10px] text-foreground-subtle">{selectedCount}/{items.length}</span>
      </button>

      {isExpanded && (
        <div className="max-h-[180px] overflow-y-auto border-t border-border/50">
          <div className="flex items-center justify-between px-2.5 py-1">
            <button
              type="button"
              onClick={onToggleAll}
              className="text-[10px] font-medium text-accent hover:underline cursor-pointer"
            >
              {items.every((_, i) => selectedPatterns.has(`${type}-${i}`)) ? "Deselect all" : "Select all"}
            </button>
          </div>
          {items.map((r, i) => {
            const key = `${type}-${i}`;
            const isSelected = selectedPatterns.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => onToggleItem(key)}
                className={`w-full flex items-center gap-1.5 px-2.5 py-1 text-left text-[11px] transition-colors cursor-pointer ${
                  isSelected ? "bg-accent/5 text-accent" : "hover:bg-background-muted text-foreground-muted"
                }`}
              >
                <div className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                  isSelected ? "border-accent bg-accent text-white" : "border-border"
                }`}>
                  {isSelected && <Check size={8} />}
                </div>
                <span className="flex-1 truncate font-mono text-[10px]">{r.text}</span>
                <span className="text-[9px] text-foreground-subtle">p.{r.pageIndex + 1}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Tool Button ──────────────────────────────────── */
function ToolBtn({ active, onClick, disabled, title, children }: {
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-accent/15 text-accent"
          : "text-foreground-muted hover:bg-background-muted"
      } disabled:cursor-default disabled:opacity-30`}
    >
      {children}
    </button>
  );
}

/* ── Nav Bar Tooltip ──────────────────────────────── */
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
