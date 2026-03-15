"use client";

import { useMemo, useState, useRef, useEffect } from "react";
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
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  PencilLine,
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

/* ── Helpers ─────────────────────────────────────────────────── */

function getLabel(el: EditorElement, labels: EditPdfLabels): string {
  switch (el.type) {
    case "text":
      return el.content.length > 18
        ? el.content.slice(0, 18) + "…"
        : el.content || "…";
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
}

/* ── Sortable Item ───────────────────────────────────────────── */

function SortableItem({
  el,
  labels,
  dispatch,
  isSelected,
  onSelect,
}: {
  el: EditorElement;
  labels: EditPdfLabels;
  dispatch: EditorDispatch;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: el.id });

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isText = el.type === "text";

  const startEdit = () => {
    if (!isText) return;
    setEditValue((el as Extract<EditorElement, { type: "text" }>).content);
    setEditing(true);
  };

  const commitEdit = () => {
    setEditing(false);
    if (isText && editValue !== (el as Extract<EditorElement, { type: "text" }>).content) {
      dispatch({ type: "UPDATE_ELEMENT", id: el.id, changes: { content: editValue } });
    }
  };

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const Icon = TYPE_ICON[el.type] ?? Type;
  const colorCls = TYPE_COLOR[el.type] ?? "text-foreground-muted";

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${
        isDragging
          ? "z-50 bg-background shadow-lg opacity-90"
          : isSelected
            ? "bg-accent/10 ring-1 ring-accent/30"
            : "hover:bg-background-muted"
      }`}
    >
      {/* Drag handle */}
      <button
        type="button"
        className="flex shrink-0 cursor-grab touch-none items-center active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} className="text-foreground-muted/50 transition-colors group-hover:text-foreground-muted" />
      </button>

      <Icon size={16} className={`shrink-0 ${colorCls}`} />

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") setEditing(false);
          }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 rounded border border-accent bg-background px-1 py-0.5 text-sm text-foreground outline-none"
        />
      ) : (
        <span
          className="flex-1 truncate text-sm text-foreground"
          onDoubleClick={(e) => {
            e.stopPropagation();
            startEdit();
          }}
        >
          {getLabel(el, labels)}
        </span>
      )}

      {/* Edit button (text only) */}
      {isText && !editing && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            startEdit();
          }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded opacity-0 transition-opacity hover:bg-accent/10 group-hover:opacity-100"
        >
          <PencilLine size={13} className="text-foreground-muted" />
        </button>
      )}

      {/* Delete button */}
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
}

/* ── Main Component ──────────────────────────────────────────── */

export function EditorHistoryPanel({
  annotations,
  pages,
  dispatch,
  labels,
  selectedElementId,
  onSelectElement,
}: EditorHistoryPanelProps) {
  const multiPage = pages.length > 1;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  // Group annotations by page
  const grouped = useMemo(() => {
    const map = new Map<number, EditorElement[]>();
    for (const el of annotations) {
      const arr = map.get(el.pageIndex) ?? [];
      arr.push(el);
      map.set(el.pageIndex, arr);
    }
    return map;
  }, [annotations]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Find which page these belong to
    const srcEl = annotations.find((a) => a.id === active.id);
    const dstEl = annotations.find((a) => a.id === over.id);
    if (!srcEl || !dstEl || srcEl.pageIndex !== dstEl.pageIndex) return;

    const pageIdx = srcEl.pageIndex;
    const pageEls = grouped.get(pageIdx) ?? [];
    // Panel shows reversed order (top = highest z = last in array)
    // So we work with reversed ids, reorder, then reverse back
    const reversedIds = [...pageEls].reverse().map((el) => el.id);

    const oldIdx = reversedIds.indexOf(String(active.id));
    const newIdx = reversedIds.indexOf(String(over.id));
    if (oldIdx === -1 || newIdx === -1) return;

    // Move in reversed array
    const [moved] = reversedIds.splice(oldIdx, 1);
    reversedIds.splice(newIdx, 0, moved);

    // Reverse back to get original array order
    const finalIds = [...reversedIds].reverse();
    dispatch({ type: "REORDER_ANNOTATIONS", pageIndex: pageIdx, orderedIds: finalIds });
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col gap-0.5">
              {[...grouped.entries()]
                .sort(([a], [b]) => a - b)
                .map(([pageIdx, els]) => {
                  const reversedEls = [...els].reverse();
                  const ids = reversedEls.map((el) => el.id);

                  return (
                    <div key={pageIdx}>
                      {multiPage && (
                        <div className="mt-4 mb-1 border-b border-border px-2 pb-1.5 text-sm font-semibold text-foreground first:mt-0">
                          {labels.pageLabel} {pageIdx + 1}
                        </div>
                      )}

                      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                        {reversedEls.map((el) => (
                          <SortableItem
                            key={el.id}
                            el={el}
                            labels={labels}
                            dispatch={dispatch}
                            isSelected={el.id === selectedElementId}
                            onSelect={() => onSelectElement(el.id)}
                          />
                        ))}
                      </SortableContext>
                    </div>
                  );
                })}
            </div>
          </DndContext>
        )}
      </div>
    </div>
  );
}
