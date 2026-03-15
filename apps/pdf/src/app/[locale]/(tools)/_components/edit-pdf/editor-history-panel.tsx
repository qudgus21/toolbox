"use client";

import { useRef, useState } from "react";
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
  GripVertical,
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

  // Drag state
  const dragId = useRef<string | null>(null);
  const dragPageIdx = useRef<number>(-1);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<"above" | "below">("below");

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

  const handleDragStart = (el: EditorElement) => {
    dragId.current = el.id;
    dragPageIdx.current = el.pageIndex;
  };

  const handleDragOver = (e: React.DragEvent, targetEl: EditorElement) => {
    if (dragPageIdx.current !== targetEl.pageIndex) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    setDropPosition(e.clientY < midY ? "above" : "below");
    setDropTargetId(targetEl.id);
  };

  const handleDrop = (e: React.DragEvent, targetEl: EditorElement) => {
    e.preventDefault();
    const srcId = dragId.current;
    const pageIdx = dragPageIdx.current;
    if (!srcId || pageIdx !== targetEl.pageIndex) return;

    const pageEls = grouped.get(pageIdx) ?? [];
    const ids = pageEls.map((el) => el.id);
    const srcIdx = ids.indexOf(srcId);
    if (srcIdx === -1) return;

    // Remove from old position
    ids.splice(srcIdx, 1);

    // Insert at new position
    let targetIdx = ids.indexOf(targetEl.id);
    if (targetIdx === -1) return;
    if (dropPosition === "below") targetIdx += 1;
    ids.splice(targetIdx, 0, srcId);

    dispatch({ type: "REORDER_ANNOTATIONS", pageIndex: pageIdx, orderedIds: ids });

    // Cleanup
    dragId.current = null;
    dragPageIdx.current = -1;
    setDropTargetId(null);
  };

  const handleDragEnd = () => {
    dragId.current = null;
    dragPageIdx.current = -1;
    setDropTargetId(null);
  };

  return (
    <div className="hidden w-[260px] shrink-0 flex-col overflow-hidden rounded-r-xl border-l border-border bg-background md:flex lg:w-[300px]">
      {/* Header */}
      <div className="relative flex h-12 items-center justify-center border-b border-border px-3">
        <div className="flex items-baseline gap-1.5">
          <h3 className="text-base font-medium text-foreground">
            {labels.layerOrder}
          </h3>
          <span className="text-xs text-foreground-muted">
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
            className="absolute right-3 flex h-7 items-center gap-1 rounded-md px-2 text-xs text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
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
          <div className="flex flex-col gap-1">
            {[...grouped.entries()]
              .sort(([a], [b]) => a - b)
              .map(([pageIdx, els]) => (
                <div key={pageIdx}>
                  {/* Page header (only for multi-page) */}
                  {multiPage && (
                    <div className="mt-4 mb-1 border-b border-border px-2 pb-1.5 text-sm font-semibold text-foreground first:mt-0">
                      {labels.pageLabel} {pageIdx + 1}
                    </div>
                  )}

                  {/* Annotation items */}
                  {els.map((el) => {
                    const Icon = TYPE_ICON[el.type] ?? Type;
                    const colorCls = TYPE_COLOR[el.type] ?? "text-foreground-muted";
                    const isSelected = el.id === selectedElementId;
                    const isDropTarget = dropTargetId === el.id;

                    return (
                      <div
                        key={el.id}
                        draggable
                        onDragStart={() => handleDragStart(el)}
                        onDragOver={(e) => handleDragOver(e, el)}
                        onDrop={(e) => handleDrop(e, el)}
                        onDragEnd={handleDragEnd}
                        onClick={() => onSelectElement(el.id)}
                        className={`group relative flex cursor-grab items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors active:cursor-grabbing ${
                          isSelected
                            ? "bg-accent/10 ring-1 ring-accent/30"
                            : "hover:bg-background-muted"
                        }`}
                      >
                        {/* Drop indicator */}
                        {isDropTarget && (
                          <div
                            className={`pointer-events-none absolute left-2 right-2 h-0.5 rounded-full bg-accent ${
                              dropPosition === "above" ? "-top-0.5" : "-bottom-0.5"
                            }`}
                          />
                        )}
                        <GripVertical size={14} className="shrink-0 text-foreground-muted/50 transition-colors group-hover:text-foreground-muted" />
                        <Icon size={16} className={`shrink-0 ${colorCls}`} />
                        <span className="flex-1 truncate text-sm text-foreground">
                          {getLabel(el)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: "DELETE_ELEMENT", id: el.id });
                          }}
                          title={labels.deleteElement}
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100 dark:hover:bg-red-900"
                        >
                          <X size={14} className="text-red-500" />
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
