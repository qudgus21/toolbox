"use client";

import { useRef, useState } from "react";
import {
  MousePointer2,
  Type,
  ImagePlus,
  Square,
  Circle,
  Minus,
  Pencil,
  Smile,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  type ToolType,
  type EditPdfLabels,
  type SymbolKind,
  ZOOM_LEVELS,
  generateId,
} from "./editor-types";
import { SymbolPicker } from "./symbol-picker";
import type { EditorState } from "./editor-types";
import type { EditorDispatch } from "./use-editor-store";

interface EditorToolbarProps {
  state: EditorState;
  dispatch: EditorDispatch;
  onUndo: () => void;
  onRedo: () => void;
  labels: EditPdfLabels;
}

const TOOL_ITEMS: {
  tool: ToolType;
  icon: React.ElementType;
  labelKey: keyof EditPdfLabels;
}[] = [
  { tool: "select", icon: MousePointer2, labelKey: "toolSelect" },
  { tool: "text", icon: Type, labelKey: "toolText" },
  { tool: "image", icon: ImagePlus, labelKey: "toolImage" },
  { tool: "rectangle", icon: Square, labelKey: "toolRectangle" },
  { tool: "ellipse", icon: Circle, labelKey: "toolEllipse" },
  { tool: "line", icon: Minus, labelKey: "toolLine" },
  { tool: "freehand", icon: Pencil, labelKey: "toolDraw" },
  { tool: "symbol", icon: Smile, labelKey: "toolSymbol" },
];

export function EditorToolbar({
  state,
  dispatch,
  onUndo,
  onRedo,
  labels,
}: EditorToolbarProps) {
  const [showSymbolPicker, setShowSymbolPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const symbolBtnRef = useRef<HTMLDivElement>(null);

  const { activeTool, activePageIndex, pages, zoom, history } = state;

  const handleToolClick = (tool: ToolType) => {
    if (tool === "image") {
      fileInputRef.current?.click();
      return;
    }
    if (tool === "symbol") {
      setShowSymbolPicker(!showSymbolPicker);
      return;
    }
    setShowSymbolPicker(false);
    dispatch({ type: "SET_TOOL", tool });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        // Scale down if too large
        let w = img.width;
        let h = img.height;
        const maxDim = 300;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w *= ratio;
          h *= ratio;
        }
        dispatch({
          type: "ADD_ELEMENT",
          element: {
            id: generateId(),
            type: "image",
            pageIndex: activePageIndex,
            x: 50,
            y: 50,
            width: w,
            height: h,
            rotation: 0,
            opacity: 1,
            dataUrl,
            originalWidth: img.width,
            originalHeight: img.height,
          },
        });
        dispatch({ type: "SET_TOOL", tool: "select" });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSymbolSelect = (symbol: SymbolKind) => {
    dispatch({
      type: "ADD_ELEMENT",
      element: {
        id: generateId(),
        type: "symbol",
        pageIndex: activePageIndex,
        x: 100,
        y: 100,
        width: 40,
        height: 40,
        rotation: 0,
        opacity: 1,
        symbol,
        color: "#000000",
      },
    });
    setShowSymbolPicker(false);
    dispatch({ type: "SET_TOOL", tool: "select" });
  };

  const handleZoom = (direction: "in" | "out") => {
    const currentIdx = ZOOM_LEVELS.findIndex((z) => z >= zoom);
    if (direction === "in") {
      const next = ZOOM_LEVELS[Math.min(currentIdx + 1, ZOOM_LEVELS.length - 1)];
      dispatch({ type: "SET_ZOOM", zoom: next ?? 2 });
    } else {
      const prev = ZOOM_LEVELS[Math.max((currentIdx === -1 ? ZOOM_LEVELS.length : currentIdx) - 1, 0)];
      dispatch({ type: "SET_ZOOM", zoom: prev ?? 0.5 });
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-2 py-1.5">
      {/* Tool Buttons */}
      <div className="flex items-center gap-0.5">
        {TOOL_ITEMS.map(({ tool, icon: Icon, labelKey }) => (
          <div key={tool} className="relative" ref={tool === "symbol" ? symbolBtnRef : undefined}>
            <button
              type="button"
              onClick={() => handleToolClick(tool)}
              title={labels[labelKey]}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                activeTool === tool
                  ? "bg-accent/10 text-accent"
                  : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
              }`}
            >
              <Icon size={18} />
            </button>
          </div>
        ))}

        {/* Symbol picker dropdown */}
        {showSymbolPicker && (
          <div className="absolute left-[280px] top-[44px] z-50 rounded-lg border border-border bg-background-elevated p-2 shadow-lg">
            <SymbolPicker onSelect={handleSymbolSelect} labels={labels} />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-border" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={onUndo}
          disabled={history.past.length === 0}
          title={labels.undo}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground disabled:opacity-30"
        >
          <Undo2 size={18} />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={history.future.length === 0}
          title={labels.redo}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground disabled:opacity-30"
        >
          <Redo2 size={18} />
        </button>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "SET_PAGE", index: Math.max(0, activePageIndex - 1) })
          }
          disabled={activePageIndex === 0}
          title={labels.previousPage}
          className="flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="min-w-[60px] text-center text-sm text-foreground-muted">
          {labels.pageOf
            .replace("{n}", String(activePageIndex + 1))
            .replace("{total}", String(pages.length))}
        </span>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: "SET_PAGE",
              index: Math.min(pages.length - 1, activePageIndex + 1),
            })
          }
          disabled={activePageIndex >= pages.length - 1}
          title={labels.nextPage}
          className="flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted disabled:opacity-30"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => handleZoom("out")}
          title={labels.zoomOut}
          className="flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"
        >
          <ZoomOut size={16} />
        </button>
        <span className="min-w-[44px] text-center text-xs text-foreground-muted">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => handleZoom("in")}
          title={labels.zoomIn}
          className="flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted"
        >
          <ZoomIn size={16} />
        </button>
      </div>
    </div>
  );
}
