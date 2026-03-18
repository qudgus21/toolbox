"use client";

import { useMemo } from "react";
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
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Highlighter,
  UnderlineIcon,
  Strikethrough,
  StickyNote,
  Pencil,
  Square,
  Circle,
  ArrowUpRight,
  Type,
  Stamp,
  GripVertical,
  Trash2,
  X,
} from "lucide-react";
import type { AnnotateElement, AnnotatePdfLabels } from "./annotate-types";
import { HIGHLIGHT_COLORS, STAMP_TEXT } from "./annotate-types";
import type { AnnotateDispatch } from "./use-annotate-store";

/* ── Props ──────────────────────────────────────────────────── */

interface AnnotateListPanelProps {
  annotations: AnnotateElement[];
  activePageIndex: number;
  selectedElementId: string | null;
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
  onScrollToPage: (pageIndex: number) => void;
}

/* ── Icon & Color Maps ─────────────────────────────────────── */

const TYPE_ICON: Record<string, React.ElementType> = {
  highlight: Highlighter,
  underline: UnderlineIcon,
  strikethrough: Strikethrough,
  "sticky-note": StickyNote,
  freehand: Pencil,
  rectangle: Square,
  ellipse: Circle,
  arrow: ArrowUpRight,
  "text-box": Type,
  stamp: Stamp,
};

const TYPE_COLOR: Record<string, string> = {
  highlight: "text-yellow-500",
  underline: "text-blue-500",
  strikethrough: "text-red-500",
  "sticky-note": "text-amber-500",
  freehand: "text-pink-500",
  rectangle: "text-orange-500",
  ellipse: "text-purple-500",
  arrow: "text-green-500",
  "text-box": "text-cyan-500",
  stamp: "text-indigo-500",
};

/* ── Helpers ─────────────────────────────────────────────────── */

function getLabel(el: AnnotateElement, labels: AnnotatePdfLabels): string {
  switch (el.type) {
    case "highlight":
      return `${labels.toolHighlight} (${labels[`color${el.color.charAt(0).toUpperCase() + el.color.slice(1)}` as keyof AnnotatePdfLabels] ?? el.color})`;
    case "underline":
      return labels.toolUnderline;
    case "strikethrough":
      return labels.toolStrikethrough;
    case "sticky-note":
      return el.noteContent.length > 20
        ? el.noteContent.slice(0, 20) + "..."
        : el.noteContent || labels.toolStickyNote;
    case "freehand":
      return labels.toolFreehand;
    case "rectangle":
      return labels.toolRectangle;
    case "ellipse":
      return labels.toolEllipse;
    case "arrow":
      return labels.toolArrow;
    case "text-box":
      return el.content.length > 20
        ? el.content.slice(0, 20) + "..."
        : el.content || labels.toolTextBox;
    case "stamp":
      return STAMP_TEXT[el.stampKind];
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
  el: AnnotateElement;
  labels: AnnotatePdfLabels;
  dispatch: AnnotateDispatch;
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
        <GripVertical
          size={14}
          className="text-foreground-muted/50 transition-colors group-hover:text-foreground-muted"
        />
      </button>

      <Icon size={16} className={`shrink-0 ${colorCls}`} />

      <span className="flex-1 truncate text-sm text-foreground">
        {getLabel(el, labels)}
      </span>

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

export function AnnotateListPanel({
  annotations,
  activePageIndex,
  selectedElementId,
  dispatch,
  labels,
  onScrollToPage,
}: AnnotateListPanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  // Filter annotations for the current page
  const pageAnnotations = useMemo(
    () => annotations.filter((el) => el.pageIndex === activePageIndex),
    [annotations, activePageIndex],
  );

  // Reversed for display (top = highest z-index)
  const reversedEls = useMemo(
    () => [...pageAnnotations].reverse(),
    [pageAnnotations],
  );

  const ids = useMemo(() => reversedEls.map((el) => el.id), [reversedEls]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const reversedIds = reversedEls.map((el) => el.id);
    const oldIdx = reversedIds.indexOf(String(active.id));
    const newIdx = reversedIds.indexOf(String(over.id));
    if (oldIdx === -1 || newIdx === -1) return;

    // Move in reversed array, then reverse back
    const reordered = arrayMove(reversedIds, oldIdx, newIdx);
    const finalIds = [...reordered].reverse();

    dispatch({
      type: "REORDER_ANNOTATIONS",
      pageIndex: activePageIndex,
      orderedIds: finalIds,
    });
  };

  const handleSelect = (el: AnnotateElement) => {
    dispatch({ type: "SELECT_ELEMENT", id: el.id });
    onScrollToPage(el.pageIndex);
  };

  return (
    <div className="hidden w-[260px] shrink-0 flex-col overflow-hidden rounded-r-xl border-l border-border bg-background md:flex lg:w-[300px]">
      {/* Header */}
      <div className="relative flex h-12 items-center justify-center border-b border-border px-3">
        <div className="flex items-baseline gap-1.5">
          <h3 className="text-base font-medium text-foreground">
            {labels.annotationList}
          </h3>
          <span className="text-xs text-foreground-muted">
            {pageAnnotations.length}
          </span>
        </div>
        {pageAnnotations.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (
                !window.confirm(labels.confirmClearAll ?? "Delete all annotations?")
              )
                return;
              for (const el of [...pageAnnotations]) {
                dispatch({ type: "DELETE_ELEMENT", id: el.id });
              }
            }}
            title={labels.confirmClearAll ?? "Clear all"}
            className="absolute right-3 flex h-7 items-center gap-1 rounded-md px-2 text-xs text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>

      {/* Page indicator */}
      <div className="border-b border-border px-3 py-1.5 text-xs text-foreground-muted">
        {labels.annotationsOnPage} {activePageIndex + 1}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {pageAnnotations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-2 text-2xl opacity-30">
              <Highlighter size={28} className="mx-auto text-foreground-muted" />
            </div>
            <p className="text-xs text-foreground-muted">
              {labels.noAnnotations}
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={ids}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-0.5">
                {reversedEls.map((el) => (
                  <SortableItem
                    key={el.id}
                    el={el}
                    labels={labels}
                    dispatch={dispatch}
                    isSelected={el.id === selectedElementId}
                    onSelect={() => handleSelect(el)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
