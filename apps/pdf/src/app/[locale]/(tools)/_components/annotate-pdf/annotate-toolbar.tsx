"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  MousePointer2,
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
  Undo2,
  Redo2,
  Trash2,
  Paintbrush,
  PaintBucket,
  Pen,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  FileInput,
} from "lucide-react";
import {
  type AnnotateToolType,
  type AnnotatePdfLabels,
  type AnnotateElement,
  type AnnotateState,
  type HighlightColor,
  type StampKind,
  HIGHLIGHT_COLORS,
  STAMP_TEXT,
  STAMP_DEFAULT_COLORS,
  FONT_OPTIONS,
} from "./annotate-types";
import { ColorPicker } from "../edit-pdf/color-picker";
import type { AnnotateDispatch } from "./use-annotate-store";

/* ── Constants ──────────────────────────────────────────────── */

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96];

const HIGHLIGHT_COLOR_KEYS: HighlightColor[] = [
  "yellow", "green", "pink", "blue", "orange", "purple",
];

const STAMP_KINDS: StampKind[] = [
  "approved", "rejected", "confidential", "draft", "final", "void", "not-approved", "for-review",
];

/* ── Props ──────────────────────────────────────────────────── */

interface AnnotateToolbarProps {
  state: AnnotateState;
  dispatch: AnnotateDispatch;
  onUndo: () => void;
  onRedo: () => void;
  labels: AnnotatePdfLabels;
  selectedElement: AnnotateElement | null;
  onChangeFile: () => void;
}

/* ── Main Component ─────────────────────────────────────────── */

export function AnnotateToolbar({
  state,
  dispatch,
  onUndo,
  onRedo,
  labels,
  selectedElement,
  onChangeFile,
}: AnnotateToolbarProps) {
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showStampPicker, setShowStampPicker] = useState(false);
  const highlightBtnRef = useRef<HTMLDivElement>(null);
  const stampBtnRef = useRef<HTMLDivElement>(null);

  const { activeTool, history } = state;

  // Close pickers on outside click
  useEffect(() => {
    if (!showHighlightPicker && !showStampPicker) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showHighlightPicker && !highlightBtnRef.current?.contains(target) && !target.closest?.("[data-highlight-picker]")) {
        setShowHighlightPicker(false);
      }
      if (showStampPicker && !stampBtnRef.current?.contains(target) && !target.closest?.("[data-stamp-picker]")) {
        setShowStampPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showHighlightPicker, showStampPicker]);

  /* ── Handlers ───────────────────────────────────────────── */

  const handleToolClick = (tool: AnnotateToolType) => {
    if (tool === "highlight") {
      setShowHighlightPicker(!showHighlightPicker);
      setShowStampPicker(false);
      if (activeTool !== "highlight") {
        dispatch({ type: "SET_TOOL", tool: "highlight" });
      }
      return;
    }
    if (tool === "stamp") {
      setShowStampPicker(!showStampPicker);
      setShowHighlightPicker(false);
      return;
    }
    setShowHighlightPicker(false);
    setShowStampPicker(false);
    if (activeTool === tool) {
      dispatch({ type: "SET_TOOL", tool: "select" });
    } else {
      dispatch({ type: "SET_TOOL", tool });
    }
  };

  const handleHighlightColorSelect = (color: HighlightColor) => {
    dispatch({ type: "UPDATE_HIGHLIGHT_DEFAULTS", changes: { color } });
    dispatch({ type: "SET_TOOL", tool: "highlight" });
    setShowHighlightPicker(false);
  };

  const handleStampSelect = (stamp: StampKind) => {
    dispatch({ type: "SET_PENDING_STAMP", stamp });
    dispatch({ type: "UPDATE_STAMP_DEFAULTS", changes: { stampKind: stamp, color: STAMP_DEFAULT_COLORS[stamp] } });
    setShowStampPicker(false);
  };

  /* ── Context Bar Logic ──────────────────────────────────── */

  type ContextType = AnnotateElement["type"] | null;
  let contextType: ContextType = null;
  if (selectedElement) {
    contextType = selectedElement.type;
  } else if (
    activeTool === "highlight" ||
    activeTool === "underline" ||
    activeTool === "strikethrough" ||
    activeTool === "freehand" ||
    activeTool === "rectangle" ||
    activeTool === "ellipse" ||
    activeTool === "arrow" ||
    activeTool === "text-box"
  ) {
    contextType = activeTool as ContextType;
  }

  const showContextBar = contextType !== null;

  /* ── Render ─────────────────────────────────────────────── */

  const stampLabel = labels[`stamp${state.stampDefaults.stampKind.charAt(0).toUpperCase()}${state.stampDefaults.stampKind.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())}` as keyof AnnotatePdfLabels] || labels.toolStamp;

  return (
    <div className="relative z-20 shrink-0 rounded-t-xl border-b border-border bg-background">
      {/* ── Row 1: Main Tools ────────────────────────────── */}
      <div className="flex h-[47px] items-center px-2">
        <div className="flex items-center gap-0.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Select */}
          <ToolBtn
            active={activeTool === "select" && !selectedElement}
            onClick={() => {
              dispatch({ type: "SET_TOOL", tool: "select" });
              dispatch({ type: "SELECT_ELEMENT", id: null });
            }}
            title={labels.toolSelect}
          >
            <MousePointer2 size={18} />
          </ToolBtn>

          <Divider />

          {/* Markup Tools */}
          <div ref={highlightBtnRef}>
            <ToolBtn
              active={activeTool === "highlight"}
              onClick={() => handleToolClick("highlight")}
              title={labels.toolHighlight}
            >
              <Highlighter size={18} />
              <div
                className="h-1 w-4 rounded-full"
                style={{ backgroundColor: HIGHLIGHT_COLORS[state.highlightDefaults.color] }}
              />
            </ToolBtn>
            {showHighlightPicker &&
              createPortal(
                <HighlightPickerDropdown
                  btnRef={highlightBtnRef}
                  selectedColor={state.highlightDefaults.color}
                  onSelect={handleHighlightColorSelect}
                  labels={labels}
                />,
                document.body,
              )}
          </div>

          <ToolBtn
            active={activeTool === "underline"}
            onClick={() => handleToolClick("underline")}
            title={labels.toolUnderline}
          >
            <UnderlineIcon size={18} />
          </ToolBtn>

          <ToolBtn
            active={activeTool === "strikethrough"}
            onClick={() => handleToolClick("strikethrough")}
            title={labels.toolStrikethrough}
          >
            <Strikethrough size={18} />
          </ToolBtn>

          <Divider />

          {/* Sticky Note */}
          <ToolBtn
            active={activeTool === "sticky-note"}
            onClick={() => handleToolClick("sticky-note")}
            title={labels.toolStickyNote}
          >
            <StickyNote size={18} />
          </ToolBtn>

          <Divider />

          {/* Freehand */}
          <ToolBtn
            active={activeTool === "freehand"}
            onClick={() => handleToolClick("freehand")}
            title={labels.toolFreehand}
          >
            <Pencil size={18} />
          </ToolBtn>

          <Divider />

          {/* Shapes */}
          <ToolBtn
            active={activeTool === "rectangle"}
            onClick={() => handleToolClick("rectangle")}
            title={labels.toolRectangle}
          >
            <Square size={18} />
          </ToolBtn>
          <ToolBtn
            active={activeTool === "ellipse"}
            onClick={() => handleToolClick("ellipse")}
            title={labels.toolEllipse}
          >
            <Circle size={18} />
          </ToolBtn>
          <ToolBtn
            active={activeTool === "arrow"}
            onClick={() => handleToolClick("arrow")}
            title={labels.toolArrow}
          >
            <ArrowUpRight size={18} />
          </ToolBtn>

          <Divider />

          {/* Text Box */}
          <ToolBtn
            active={activeTool === "text-box"}
            onClick={() => handleToolClick("text-box")}
            title={labels.toolTextBox}
          >
            <Type size={18} />
          </ToolBtn>

          <Divider />

          {/* Stamp */}
          <div ref={stampBtnRef}>
            <ToolBtn
              active={activeTool === "stamp"}
              onClick={() => handleToolClick("stamp")}
              title={labels.toolStamp}
            >
              <Stamp size={18} />
              <span className="hidden text-xs sm:inline">{stampLabel}</span>
            </ToolBtn>
            {showStampPicker &&
              createPortal(
                <StampPickerDropdown
                  btnRef={stampBtnRef}
                  selectedStamp={state.stampDefaults.stampKind}
                  onSelect={handleStampSelect}
                  labels={labels}
                />,
                document.body,
              )}
          </div>

          <Divider />

          {/* Undo / Redo */}
          <ActionBtn onClick={onUndo} disabled={history.past.length === 0} title={labels.undo}>
            <Undo2 size={16} />
          </ActionBtn>
          <ActionBtn onClick={onRedo} disabled={history.future.length === 0} title={labels.redo}>
            <Redo2 size={16} />
          </ActionBtn>
        </div>

        {/* Right: Change PDF */}
        <div className="ml-auto shrink-0 pr-1">
          <PortalTooltip label={labels.changeFile}>
            <button
              type="button"
              onClick={onChangeFile}
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground"
            >
              <FileInput size={16} />
              <span className="hidden text-xs sm:inline">{labels.changeFile}</span>
            </button>
          </PortalTooltip>
        </div>
      </div>

      {/* ── Row 2: Context Bar ── */}
      <div
        className={`absolute left-0 right-0 top-full z-30 border-b border-border bg-background/95 backdrop-blur-sm transition-opacity duration-150 ease-out ${
          showContextBar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 overflow-x-auto px-3 pb-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {showContextBar && (
            <ContextBarContent
              contextType={contextType!}
              selectedElement={selectedElement}
              state={state}
              dispatch={dispatch}
              labels={labels}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Context Bar ─────────────────────────────────────────────── */

export function AnnotateContextBar({
  state,
  dispatch,
  labels,
  selectedElement,
}: {
  state: AnnotateState;
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
  selectedElement: AnnotateElement | null;
}) {
  type ContextType = AnnotateElement["type"] | null;
  let contextType: ContextType = null;
  if (selectedElement) {
    contextType = selectedElement.type;
  } else if (
    state.activeTool === "highlight" ||
    state.activeTool === "underline" ||
    state.activeTool === "strikethrough" ||
    state.activeTool === "freehand" ||
    state.activeTool === "rectangle" ||
    state.activeTool === "ellipse" ||
    state.activeTool === "arrow" ||
    state.activeTool === "text-box"
  ) {
    contextType = state.activeTool as ContextType;
  }
  if (!contextType) return null;

  return (
    <div className="relative z-10 -mb-[36px] border-b border-border bg-background/95 backdrop-blur-sm" style={{ height: 36 }}>
      <div className="flex h-full items-center gap-2 overflow-x-auto px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ContextBarContent
          contextType={contextType}
          selectedElement={selectedElement}
          state={state}
          dispatch={dispatch}
          labels={labels}
        />
      </div>
    </div>
  );
}

function ContextBarContent({
  contextType,
  selectedElement,
  state,
  dispatch,
  labels,
}: {
  contextType: AnnotateElement["type"];
  selectedElement: AnnotateElement | null;
  state: AnnotateState;
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  const isHighlight = contextType === "highlight";
  const isUnderline = contextType === "underline";
  const isStrikethrough = contextType === "strikethrough";
  const isMarkup = isUnderline || isStrikethrough;
  const isStickyNote = contextType === "sticky-note";
  const isFreehand = contextType === "freehand";
  const isShape = contextType === "rectangle" || contextType === "ellipse";
  const isArrow = contextType === "arrow";
  const isTextBox = contextType === "text-box";
  const isStamp = contextType === "stamp";

  return (
    <>
      {isHighlight && (
        <HighlightContextControls
          element={selectedElement?.type === "highlight" ? selectedElement : null}
          defaults={state.highlightDefaults}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isMarkup && (
        <MarkupContextControls
          element={
            selectedElement?.type === "underline" || selectedElement?.type === "strikethrough"
              ? selectedElement
              : null
          }
          defaults={state.markupDefaults}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isStickyNote && selectedElement?.type === "sticky-note" && (
        <StickyNoteContextControls
          element={selectedElement}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isFreehand && (
        <DrawContextControls
          element={selectedElement?.type === "freehand" ? selectedElement : null}
          defaults={state.drawDefaults}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isShape && (
        <ShapeContextControls
          element={
            selectedElement?.type === "rectangle" || selectedElement?.type === "ellipse"
              ? selectedElement
              : null
          }
          defaults={state.shapeDefaults}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isArrow && (
        <ArrowContextControls
          element={selectedElement?.type === "arrow" ? selectedElement : null}
          defaults={state.arrowDefaults}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isTextBox && (
        <TextBoxContextControls
          element={selectedElement?.type === "text-box" ? selectedElement : null}
          defaults={state.textBoxDefaults}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isStamp && selectedElement?.type === "stamp" && (
        <ColorPicker
          value={selectedElement.color}
          onChange={(c) =>
            dispatch({ type: "UPDATE_ELEMENT", id: selectedElement.id, changes: { color: c } })
          }
          label={labels.borderColor}
          icon={<Paintbrush size={14} />}
        />
      )}

      {/* Common: Opacity + Delete */}
      {selectedElement && (
        <>
          <Divider />
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-foreground-muted">{labels.opacity}</label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={selectedElement.opacity}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_ELEMENT",
                  id: selectedElement.id,
                  changes: { opacity: Number(e.target.value) },
                })
              }
              className="h-1 w-16 accent-accent sm:w-20"
            />
            <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">
              {Math.round(selectedElement.opacity * 100)}%
            </span>
          </div>
          <Divider />
          <button
            type="button"
            onClick={() => dispatch({ type: "DELETE_ELEMENT", id: selectedElement.id })}
            title={labels.deleteElement}
            className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 size={14} />
            <span className="hidden text-xs sm:inline">{labels.deleteElement}</span>
          </button>
        </>
      )}
    </>
  );
}

/* ── Highlight Controls ──────────────────────────────────────── */

function HighlightContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<AnnotateElement, { type: "highlight" }> | null;
  defaults: AnnotateState["highlightDefaults"];
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  const currentColor = element?.color ?? defaults.color;

  const colorLabelMap: Record<HighlightColor, string> = {
    yellow: labels.colorYellow,
    green: labels.colorGreen,
    pink: labels.colorPink,
    blue: labels.colorBlue,
    orange: labels.colorOrange,
    purple: labels.colorPurple,
  };

  return (
    <div className="flex items-center gap-1">
      {HIGHLIGHT_COLOR_KEYS.map((c) => (
        <PortalTooltip key={c} label={colorLabelMap[c]}>
          <button
            type="button"
            onClick={() => {
              if (element) {
                dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: { color: c } });
              }
              dispatch({ type: "UPDATE_HIGHLIGHT_DEFAULTS", changes: { color: c } });
            }}
            className={`h-6 w-6 rounded-md border-2 transition-transform hover:scale-110 ${
              currentColor === c ? "border-foreground" : "border-transparent"
            }`}
            style={{ backgroundColor: HIGHLIGHT_COLORS[c], opacity: 0.7 }}
          />
        </PortalTooltip>
      ))}
    </div>
  );
}

/* ── Markup Controls (Underline / Strikethrough) ─────────────── */

function MarkupContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<AnnotateElement, { type: "underline" }> | Extract<AnnotateElement, { type: "strikethrough" }> | null;
  defaults: AnnotateState["markupDefaults"];
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  const color = element?.color ?? defaults.color;
  const strokeWidth = element?.strokeWidth ?? defaults.strokeWidth;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<AnnotateElement> });
    }
    dispatch({ type: "UPDATE_MARKUP_DEFAULTS", changes: changes as Partial<AnnotateState["markupDefaults"]> });
  };

  return (
    <>
      <ColorPicker
        value={color}
        onChange={(c) => update({ color: c })}
        label={labels.drawColor}
        icon={<Paintbrush size={14} />}
      />
      <Divider />
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-foreground-muted">{labels.strokeWidth}</label>
        <input
          type="range"
          min={1}
          max={10}
          value={strokeWidth}
          onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
          className="h-1 w-16 accent-accent sm:w-20"
        />
        <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">{strokeWidth}px</span>
      </div>
    </>
  );
}

/* ── Sticky Note Controls ────────────────────────────────────── */

function StickyNoteContextControls({
  element,
  dispatch,
  labels,
}: {
  element: Extract<AnnotateElement, { type: "sticky-note" }>;
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  return (
    <ColorPicker
      value={element.noteColor}
      onChange={(c) =>
        dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: { noteColor: c } })
      }
      label={labels.noteContent}
      icon={<StickyNote size={14} />}
    />
  );
}

/* ── Draw Controls ───────────────────────────────────────────── */

function DrawContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<AnnotateElement, { type: "freehand" }> | null;
  defaults: AnnotateState["drawDefaults"];
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  const strokeColor = element?.strokeColor ?? defaults.strokeColor;
  const strokeWidth = element?.strokeWidth ?? defaults.strokeWidth;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<AnnotateElement> });
    }
    dispatch({ type: "UPDATE_DRAW_DEFAULTS", changes: changes as Partial<AnnotateState["drawDefaults"]> });
  };

  return (
    <>
      <ColorPicker
        value={strokeColor}
        onChange={(c) => update({ strokeColor: c })}
        label={labels.drawColor}
        icon={<Paintbrush size={14} />}
      />
      <Divider />
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-foreground-muted">{labels.drawThickness}</label>
        <input
          type="range"
          min={1}
          max={20}
          value={strokeWidth}
          onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
          className="h-1 w-16 accent-accent sm:w-20"
        />
        <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">{strokeWidth}px</span>
      </div>
    </>
  );
}

/* ── Shape Controls ──────────────────────────────────────────── */

function ShapeContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<AnnotateElement, { type: "rectangle" }> | Extract<AnnotateElement, { type: "ellipse" }> | null;
  defaults: AnnotateState["shapeDefaults"];
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  const val = element ?? defaults;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<AnnotateElement> });
    } else {
      dispatch({ type: "UPDATE_SHAPE_DEFAULTS", changes: changes as Partial<AnnotateState["shapeDefaults"]> });
    }
  };

  return (
    <>
      <ColorPicker
        value={val.borderColor}
        onChange={(c) => update({ borderColor: c })}
        label={labels.borderColor}
        icon={<Pen size={14} />}
      />
      <ColorPicker
        value={val.fillColor}
        onChange={(c) => update({ fillColor: c })}
        label={labels.fillColor}
        icon={<PaintBucket size={14} />}
        allowTransparent
      />
      <Divider />
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-foreground-muted">{labels.strokeWidth}</label>
        <input
          type="range"
          min={1}
          max={20}
          value={val.strokeWidth}
          onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
          className="h-1 w-16 accent-accent sm:w-20"
        />
        <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">{val.strokeWidth}px</span>
      </div>
    </>
  );
}

/* ── Arrow Controls ──────────────────────────────────────────── */

function ArrowContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<AnnotateElement, { type: "arrow" }> | null;
  defaults: AnnotateState["arrowDefaults"];
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  const strokeColor = element?.strokeColor ?? defaults.strokeColor;
  const strokeWidth = element?.strokeWidth ?? defaults.strokeWidth;
  const headSize = element?.headSize ?? defaults.headSize;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<AnnotateElement> });
    }
    dispatch({ type: "UPDATE_ARROW_DEFAULTS", changes: changes as Partial<AnnotateState["arrowDefaults"]> });
  };

  return (
    <>
      <ColorPicker
        value={strokeColor}
        onChange={(c) => update({ strokeColor: c })}
        label={labels.drawColor}
        icon={<Paintbrush size={14} />}
      />
      <Divider />
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-foreground-muted">{labels.drawThickness}</label>
        <input
          type="range"
          min={1}
          max={10}
          value={strokeWidth}
          onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
          className="h-1 w-16 accent-accent sm:w-20"
        />
        <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">{strokeWidth}px</span>
      </div>
      <Divider />
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-foreground-muted">{labels.arrowSize}</label>
        <input
          type="range"
          min={5}
          max={30}
          value={headSize}
          onChange={(e) => update({ headSize: Number(e.target.value) })}
          className="h-1 w-16 accent-accent sm:w-20"
        />
        <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">{headSize}px</span>
      </div>
    </>
  );
}

/* ── TextBox Controls ────────────────────────────────────────── */

function TextBoxContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<AnnotateElement, { type: "text-box" }> | null;
  defaults: AnnotateState["textBoxDefaults"];
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}) {
  const val = element ?? defaults;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<AnnotateElement> });
    }
    dispatch({ type: "UPDATE_TEXT_BOX_DEFAULTS", changes: changes as Partial<AnnotateState["textBoxDefaults"]> });
  };

  return (
    <>
      {/* Font family */}
      <PortalTooltip label={labels.fontFamily}>
        <select
          value={val.fontFamily}
          onChange={(e) => update({ fontFamily: e.target.value })}
          className="h-8 max-w-[120px] cursor-pointer rounded-md border border-border bg-background px-1.5 text-xs text-foreground transition-colors hover:border-foreground-muted sm:max-w-[140px]"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </PortalTooltip>

      {/* Font size */}
      <PortalTooltip label={labels.fontSize}>
        <div className="flex items-center gap-1.5">
          <select
            value={FONT_SIZES.includes(val.fontSize) ? val.fontSize : ""}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
            className="h-8 w-[56px] cursor-pointer rounded-md border border-border bg-background px-1 text-center text-xs text-foreground transition-colors hover:border-foreground-muted"
          >
            {!FONT_SIZES.includes(val.fontSize) && (
              <option value="" disabled>{val.fontSize}</option>
            )}
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </PortalTooltip>

      {/* Colors */}
      <ColorPicker
        value={val.fontColor}
        onChange={(c) => update({ fontColor: c })}
        label={labels.fontColor}
        icon={<Type size={14} />}
      />
      <ColorPicker
        value={val.borderColor}
        onChange={(c) => update({ borderColor: c })}
        label={labels.borderColor}
        icon={<Pen size={14} />}
      />

      <Divider />

      {/* Bold / Italic */}
      <div className="flex items-center gap-0.5">
        <ToggleBtn active={val.bold} onClick={() => update({ bold: !val.bold })} title={labels.bold}>
          <Bold size={14} />
        </ToggleBtn>
        <ToggleBtn active={val.italic} onClick={() => update({ italic: !val.italic })} title={labels.italic}>
          <Italic size={14} />
        </ToggleBtn>
      </div>

      <Divider />

      {/* Alignment */}
      <div className="flex items-center gap-0.5">
        <ToggleBtn active={val.align === "left"} onClick={() => update({ align: "left" })} title={labels.alignLeft}>
          <AlignLeft size={14} />
        </ToggleBtn>
        <ToggleBtn active={val.align === "center"} onClick={() => update({ align: "center" })} title={labels.alignCenter}>
          <AlignCenter size={14} />
        </ToggleBtn>
        <ToggleBtn active={val.align === "right"} onClick={() => update({ align: "right" })} title={labels.alignRight}>
          <AlignRight size={14} />
        </ToggleBtn>
      </div>
    </>
  );
}

/* ── Highlight Picker Dropdown ───────────────────────────────── */

function HighlightPickerDropdown({
  btnRef,
  selectedColor,
  onSelect,
  labels,
}: {
  btnRef: React.RefObject<HTMLDivElement | null>;
  selectedColor: HighlightColor;
  onSelect: (color: HighlightColor) => void;
  labels: AnnotatePdfLabels;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePos = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 4, left: rect.left });
  }, [btnRef]);

  useEffect(() => {
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [updatePos]);

  const colorLabelMap: Record<HighlightColor, string> = {
    yellow: labels.colorYellow,
    green: labels.colorGreen,
    pink: labels.colorPink,
    blue: labels.colorBlue,
    orange: labels.colorOrange,
    purple: labels.colorPurple,
  };

  return (
    <div
      data-highlight-picker
      className="fixed z-[200] rounded-lg border border-border bg-background-elevated p-3 shadow-lg"
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="grid grid-cols-3 gap-2">
        {HIGHLIGHT_COLOR_KEYS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(c)}
            className={`flex h-8 items-center gap-2 rounded-md px-2 transition-colors hover:bg-background-muted ${
              selectedColor === c ? "ring-2 ring-accent" : ""
            }`}
          >
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: HIGHLIGHT_COLORS[c], opacity: 0.7 }}
            />
            <span className="text-xs text-foreground">{colorLabelMap[c]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Stamp Picker Dropdown ───────────────────────────────────── */

function StampPickerDropdown({
  btnRef,
  selectedStamp,
  onSelect,
  labels,
}: {
  btnRef: React.RefObject<HTMLDivElement | null>;
  selectedStamp: StampKind;
  onSelect: (stamp: StampKind) => void;
  labels: AnnotatePdfLabels;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePos = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 4, left: rect.left });
  }, [btnRef]);

  useEffect(() => {
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [updatePos]);

  const stampLabelMap: Record<StampKind, string> = {
    approved: labels.stampApproved,
    rejected: labels.stampRejected,
    confidential: labels.stampConfidential,
    draft: labels.stampDraft,
    final: labels.stampFinal,
    void: labels.stampVoid,
    "not-approved": labels.stampNotApproved,
    "for-review": labels.stampForReview,
  };

  return (
    <div
      data-stamp-picker
      className="fixed z-[200] rounded-lg border border-border bg-background-elevated p-2 shadow-lg"
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="flex flex-col gap-0.5">
        {STAMP_KINDS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className={`flex h-8 items-center gap-2 rounded-md px-3 text-left transition-colors hover:bg-background-muted ${
              selectedStamp === s ? "bg-accent/10" : ""
            }`}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: STAMP_DEFAULT_COLORS[s] }}
            >
              {STAMP_TEXT[s]}
            </span>
            <span className="ml-auto text-xs text-foreground-muted">{stampLabelMap[s]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Portal Tooltip ──────────────────────────────────────────── */

function PortalTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePos = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 });
  }, []);

  useEffect(() => {
    if (!hover) return;
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [hover, updatePos]);

  return (
    <div ref={ref} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      {hover &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[200] -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-lg"
            style={{ top: pos.top, left: pos.left }}
          >
            {label}
          </div>,
          document.body,
        )}
    </div>
  );
}

/* ── Shared UI ───────────────────────────────────────────────── */

function ToolBtn({ active, onClick, title, children }: { active: boolean; onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <PortalTooltip label={title}>
      <button
        type="button"
        onClick={onClick}
        className={`flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 transition-colors ${
          active ? "bg-accent/10 text-accent" : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
        }`}
      >
        {children}
      </button>
    </PortalTooltip>
  );
}

function ActionBtn({ onClick, disabled, title, children }: { onClick: () => void; disabled?: boolean; title: string; children: React.ReactNode }) {
  return (
    <PortalTooltip label={title}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground disabled:cursor-default disabled:opacity-30"
      >
        {children}
      </button>
    </PortalTooltip>
  );
}

function ToggleBtn({ active, onClick, title, children }: { active: boolean; onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <PortalTooltip label={title}>
      <button
        type="button"
        onClick={onClick}
        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${
          active ? "bg-accent/10 text-accent" : "text-foreground-muted hover:bg-background-muted"
        }`}
      >
        {children}
      </button>
    </PortalTooltip>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px shrink-0 bg-border" />;
}
