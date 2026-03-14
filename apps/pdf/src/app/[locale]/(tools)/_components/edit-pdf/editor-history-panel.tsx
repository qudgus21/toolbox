"use client";

import {
  Type,
  ImagePlus,
  Square,
  Circle,
  Minus,
  Pencil,
  Smile,
  X,
  Trash2,
} from "lucide-react";
import {
  SYMBOL_MAP,
  type EditorElement,
  type EditPdfLabels,
  type PageData,
} from "./editor-types";
import type { EditorDispatch } from "./use-editor-store";

/* ── Props ──────────────────────────────────────────────────── */

interface EditorHistoryPanelProps {
  annotations: EditorElement[];
  pages: PageData[];
  dispatch: EditorDispatch;
  labels: EditPdfLabels;
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
}

/* ── Icon & Color maps ──────────────────────────────────────── */

const TYPE_ICON: Record<string, React.ElementType> = {
  text: Type,
  image: ImagePlus,
  rectangle: Square,
  ellipse: Circle,
  line: Minus,
  freehand: Pencil,
  symbol: Smile,
};

const TYPE_COLOR: Record<string, string> = {
  text: "text-blue-500",
  image: "text-green-500",
  rectangle: "text-orange-500",
  ellipse: "text-purple-500",
  line: "text-gray-500",
  freehand: "text-pink-500",
  symbol: "text-yellow-600",
};

/* ── Component ──────────────────────────────────────────────── */

export function EditorHistoryPanel({
  annotations,
  pages,
  dispatch,
  labels,
  selectedElementId,
  onSelectElement,
}: EditorHistoryPanelProps) {
  const multiPage = pages.length > 1;

  // Group annotations by page
  const grouped = new Map<number, EditorElement[]>();
  for (const el of annotations) {
    const arr = grouped.get(el.pageIndex) ?? [];
    arr.push(el);
    grouped.set(el.pageIndex, arr);
  }

  const getLabel = (el: EditorElement): string => {
    switch (el.type) {
      case "text":
        return el.content.length > 18
          ? el.content.slice(0, 18) + "…"
          : el.content;
      case "symbol":
        return SYMBOL_MAP[el.symbol];
      case "image":
        return labels.addImage;
      case "rectangle":
        return labels.toolRectangle;
      case "ellipse":
        return labels.toolEllipse;
      case "line":
        return labels.toolLine;
      case "freehand":
        return labels.toolDraw;
      default:
        return "element";
    }
  };

  return (
    <div className="hidden w-[200px] shrink-0 flex-col overflow-hidden rounded-r-xl border-l border-border bg-background md:flex lg:w-[240px]">
      {/* Header */}
      <div className="flex h-[57px] items-center justify-between border-b border-border px-3">
        <div className="flex items-baseline gap-1.5">
          <h3 className="text-sm font-medium text-foreground">
            {labels.layerOrder}
          </h3>
          <span className="text-[11px] text-foreground-muted">
            {annotations.length}
          </span>
        </div>
        {annotations.length > 0 && (
          <button
            type="button"
            onClick={() => {
              for (const el of [...annotations]) {
                dispatch({ type: "DELETE_ELEMENT", id: el.id });
              }
            }}
            title="Clear all"
            className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {annotations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-2 text-2xl opacity-30">✏️</div>
            <p className="text-xs text-foreground-muted">{labels.noSelection}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {[...grouped.entries()]
              .sort(([a], [b]) => a - b)
              .map(([pageIdx, els]) => (
                <div key={pageIdx}>
                  {/* Page header (only for multi-page) */}
                  {multiPage && (
                    <div className="mt-2 px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-foreground-muted first:mt-0">
                      {labels.pageOf
                        .replace("{n}", String(pageIdx + 1))
                        .replace("{total}", String(pages.length))}
                    </div>
                  )}

                  {/* Annotation items */}
                  {els.map((el) => {
                    const Icon = TYPE_ICON[el.type] ?? Type;
                    const colorCls = TYPE_COLOR[el.type] ?? "text-foreground-muted";
                    const isSelected = el.id === selectedElementId;

                    return (
                      <div
                        key={el.id}
                        onClick={() => onSelectElement(el.id)}
                        className={`group flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                          isSelected
                            ? "bg-accent/10 ring-1 ring-accent/30"
                            : "hover:bg-background-muted"
                        }`}
                      >
                        <Icon size={14} className={`shrink-0 ${colorCls}`} />
                        <span className="flex-1 truncate text-xs text-foreground">
                          {getLabel(el)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: "DELETE_ELEMENT", id: el.id });
                          }}
                          title={labels.deleteElement}
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100 dark:hover:bg-red-900"
                        >
                          <X size={12} className="text-red-500" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
