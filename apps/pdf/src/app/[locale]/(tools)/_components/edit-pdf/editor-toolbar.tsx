"use client";

import { useRef, useState, useEffect } from "react";
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
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Paintbrush,
  PaintBucket,
  Pen,
} from "lucide-react";
import {
  type ToolType,
  type EditPdfLabels,
  type SymbolKind,
  type TextAlign,
  type EditorElement,
  type EditorState,
  FONT_OPTIONS,
  generateId,
} from "./editor-types";
import { SymbolPicker } from "./symbol-picker";
import { ColorPicker } from "./color-picker";
import type { EditorDispatch } from "./use-editor-store";

/* ── Constants ──────────────────────────────────────────────── */

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96];

/* ── Props ──────────────────────────────────────────────────── */

interface EditorToolbarProps {
  state: EditorState;
  dispatch: EditorDispatch;
  onUndo: () => void;
  onRedo: () => void;
  labels: EditPdfLabels;
  selectedElement: EditorElement | null;
}

/* ── Main Component ─────────────────────────────────────────── */

export function EditorToolbar({
  state,
  dispatch,
  onUndo,
  onRedo,
  labels,
  selectedElement,
}: EditorToolbarProps) {
  const [showSymbolPicker, setShowSymbolPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const symbolBtnRef = useRef<HTMLDivElement>(null);

  const { activeTool, history } = state;

  // Close symbol picker on outside click
  useEffect(() => {
    if (!showSymbolPicker) return;
    const handleClick = (e: MouseEvent) => {
      if (symbolBtnRef.current && !symbolBtnRef.current.contains(e.target as Node)) {
        setShowSymbolPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSymbolPicker]);

  /* ── Handlers ───────────────────────────────────────────── */

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
    // Toggle: if same tool is already active, switch back to select
    if (activeTool === tool) {
      dispatch({ type: "SET_TOOL", tool: "select" });
    } else {
      dispatch({ type: "SET_TOOL", tool });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
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
            pageIndex: state.activePageIndex,
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
        pageIndex: state.activePageIndex,
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

  /* ── Context Bar Logic ──────────────────────────────────── */

  type ContextType = EditorElement["type"] | null;

  let contextType: ContextType = null;
  if (selectedElement) {
    contextType = selectedElement.type;
  } else if (
    activeTool === "text" ||
    activeTool === "rectangle" ||
    activeTool === "ellipse" ||
    activeTool === "line" ||
    activeTool === "freehand"
  ) {
    contextType = activeTool as ContextType;
  }

  const showContextBar = contextType !== null;

  /* ── Render ─────────────────────────────────────────────── */

  return (
    <div className="relative shrink-0 rounded-t-xl border-b border-border bg-background">
      {/* ── Row 1: Main Tools ────────────────────────────── */}
      <div className="flex h-14 items-center px-2">
        <div className="flex items-center gap-0.5 overflow-x-auto">
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

          {/* Text */}
          <ToolBtn
            active={activeTool === "text"}
            onClick={() => handleToolClick("text")}
            title={labels.addText}
          >
            <Type size={18} />
            <span className="hidden text-xs sm:inline">{labels.addText}</span>
          </ToolBtn>

          {/* Image */}
          <ToolBtn
            active={false}
            onClick={() => fileInputRef.current?.click()}
            title={labels.addImage}
          >
            <ImagePlus size={18} />
            <span className="hidden text-xs sm:inline">{labels.addImage}</span>
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
            active={activeTool === "line"}
            onClick={() => handleToolClick("line")}
            title={labels.toolLine}
          >
            <Minus size={18} />
          </ToolBtn>

          <Divider />

          {/* Draw */}
          <ToolBtn
            active={activeTool === "freehand"}
            onClick={() => handleToolClick("freehand")}
            title={labels.toolDraw}
          >
            <Pencil size={18} />
            <span className="hidden text-xs sm:inline">{labels.toolDraw}</span>
          </ToolBtn>

          <Divider />

          {/* Symbol */}
          <div ref={symbolBtnRef} className="relative">
            <ToolBtn
              active={activeTool === "symbol"}
              onClick={() => setShowSymbolPicker(!showSymbolPicker)}
              title={labels.toolSymbol}
            >
              <Smile size={18} />
            </ToolBtn>
            {showSymbolPicker && (
              <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-border bg-background-elevated p-2 shadow-lg">
                <SymbolPicker onSelect={handleSymbolSelect} labels={labels} />
              </div>
            )}
          </div>

          <Divider />

          {/* Undo / Redo */}
          <ActionBtn
            onClick={onUndo}
            disabled={history.past.length === 0}
            title={labels.undo}
          >
            <Undo2 size={16} />
          </ActionBtn>
          <ActionBtn
            onClick={onRedo}
            disabled={history.future.length === 0}
            title={labels.redo}
          >
            <Redo2 size={16} />
          </ActionBtn>
        </div>

      </div>

      {/* ── Row 2: Context Bar (overlay, excludes right panel) ── */}
      <div
        className={`absolute left-0 right-0 top-full z-30 border-b border-border bg-background/95 backdrop-blur-sm transition-opacity duration-150 ease-out ${
          showContextBar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 px-3 pb-1.5">
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

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}

/* ── Context Bar ────────────────────────────────────────────── */

function ContextBarContent({
  contextType,
  selectedElement,
  state,
  dispatch,
  labels,
}: {
  contextType: EditorElement["type"];
  selectedElement: EditorElement | null;
  state: EditorState;
  dispatch: EditorDispatch;
  labels: EditPdfLabels;
}) {
  const isText = contextType === "text";
  const isShape = contextType === "rectangle" || contextType === "ellipse";
  const isDraw = contextType === "line" || contextType === "freehand";
  const isSymbol = contextType === "symbol";
  const isImage = contextType === "image";

  return (
    <>
      {isText && (
        <TextContextControls
          element={selectedElement?.type === "text" ? selectedElement : null}
          defaults={state.textDefaults}
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
      {isDraw && (
        <DrawContextControls
          element={
            selectedElement?.type === "line" || selectedElement?.type === "freehand"
              ? selectedElement
              : null
          }
          defaults={state.drawDefaults}
          dispatch={dispatch}
          labels={labels}
        />
      )}
      {isSymbol && selectedElement?.type === "symbol" && (
        <ColorPicker
          value={selectedElement.color}
          onChange={(c) =>
            dispatch({ type: "UPDATE_ELEMENT", id: selectedElement.id, changes: { color: c } })
          }
          label={labels.fontColor}
          icon={<Paintbrush size={14} />}
        />
      )}

      {/* Common controls for selected elements */}
      {selectedElement && (
        <>
          {(isText || isShape || isDraw || isSymbol || isImage) && <Divider />}

          {/* Opacity */}
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

          {/* Layer order */}
          <div className="flex items-center gap-0.5">
            <LayerBtn
              onClick={() => dispatch({ type: "MOVE_LAYER", id: selectedElement.id, direction: "top" })}
              title={labels.bringToFront}
            >
              <ChevronsUp size={14} />
            </LayerBtn>
            <LayerBtn
              onClick={() => dispatch({ type: "MOVE_LAYER", id: selectedElement.id, direction: "up" })}
              title={labels.bringForward}
            >
              <ArrowUp size={14} />
            </LayerBtn>
            <LayerBtn
              onClick={() => dispatch({ type: "MOVE_LAYER", id: selectedElement.id, direction: "down" })}
              title={labels.sendBackward}
            >
              <ArrowDown size={14} />
            </LayerBtn>
            <LayerBtn
              onClick={() => dispatch({ type: "MOVE_LAYER", id: selectedElement.id, direction: "bottom" })}
              title={labels.sendToBack}
            >
              <ChevronsDown size={14} />
            </LayerBtn>
          </div>

          <Divider />

          {/* Delete */}
          <button
            type="button"
            onClick={() => dispatch({ type: "DELETE_ELEMENT", id: selectedElement.id })}
            title={labels.deleteElement}
            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 size={14} />
            <span className="hidden text-xs sm:inline">{labels.deleteElement}</span>
          </button>
        </>
      )}
    </>
  );
}

/* ── Text Controls ──────────────────────────────────────────── */

function TextContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<EditorElement, { type: "text" }> | null;
  defaults: EditorState["textDefaults"];
  dispatch: EditorDispatch;
  labels: EditPdfLabels;
}) {
  const val = element ?? defaults;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<EditorElement> });
    }
    // Always update defaults so next text uses the last chosen values
    dispatch({ type: "UPDATE_TEXT_DEFAULTS", changes: changes as Partial<EditorState["textDefaults"]> });
  };

  return (
    <>
      {/* Font family */}
      <div className="group/tip relative">
        <select
          value={val.fontFamily}
          onChange={(e) => update({ fontFamily: e.target.value })}
          className="h-8 max-w-[120px] cursor-pointer rounded-md border border-border bg-background px-1.5 text-xs text-foreground transition-colors hover:border-foreground-muted sm:max-w-[140px]"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
          {labels.fontFamily}
        </div>
      </div>

      {/* Font size — select + slider */}
      <div className="group/tip relative flex items-center gap-1.5">
        <select
          value={FONT_SIZES.includes(val.fontSize) ? val.fontSize : ""}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            update({ fontSize: newSize, height: newSize });
          }}
          className="h-8 w-[56px] cursor-pointer rounded-md border border-border bg-background px-1 text-center text-xs text-foreground transition-colors hover:border-foreground-muted"
        >
          {!FONT_SIZES.includes(val.fontSize) && (
            <option value="" disabled>
              {val.fontSize}
            </option>
          )}
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="range"
          min={8}
          max={96}
          step={2}
          value={val.fontSize}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            update({ fontSize: newSize, height: newSize });
          }}
          className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-border accent-foreground [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
        />
        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
          {labels.fontSize}
        </div>
      </div>

      {/* Font color & Background color */}
      <ColorPicker
        value={val.fontColor}
        onChange={(c) => update({ fontColor: c })}
        label={labels.fontColor}
        icon={<Type size={14} />}
      />
      <ColorPicker
        value={val.backgroundColor}
        onChange={(c) => update({ backgroundColor: c })}
        label={labels.backgroundColor}
        icon={<PaintBucket size={14} />}
        allowTransparent
      />

      <Divider />

      {/* Bold / Italic / Underline */}
      <div className="flex items-center gap-0.5">
        <ToggleBtn active={val.bold} onClick={() => update({ bold: !val.bold })} title={labels.bold}>
          <Bold size={14} />
        </ToggleBtn>
        <ToggleBtn active={val.italic} onClick={() => update({ italic: !val.italic })} title={labels.italic}>
          <Italic size={14} />
        </ToggleBtn>
        <ToggleBtn active={val.underline} onClick={() => update({ underline: !val.underline })} title={labels.underline}>
          <Underline size={14} />
        </ToggleBtn>
      </div>

      {/* Line height */}
      <div className="group/tip relative flex items-center gap-1.5">
        <span className="text-xs text-foreground-muted tabular-nums">{val.lineHeight.toFixed(1)}</span>
        <input
          type="range"
          min={0.8}
          max={3}
          step={0.1}
          value={val.lineHeight}
          onChange={(e) => update({ lineHeight: Number(e.target.value) })}
          className="h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-border accent-foreground [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
        />
        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
          {labels.lineHeight}
        </div>
      </div>

      <Divider />

      {/* Alignment */}
      <div className="flex items-center gap-0.5">
        <ToggleBtn
          active={val.align === "left"}
          onClick={() => update({ align: "left" as TextAlign })}
          title={labels.alignLeft}
        >
          <AlignLeft size={14} />
        </ToggleBtn>
        <ToggleBtn
          active={val.align === "center"}
          onClick={() => update({ align: "center" as TextAlign })}
          title={labels.alignCenter}
        >
          <AlignCenter size={14} />
        </ToggleBtn>
        <ToggleBtn
          active={val.align === "right"}
          onClick={() => update({ align: "right" as TextAlign })}
          title={labels.alignRight}
        >
          <AlignRight size={14} />
        </ToggleBtn>
      </div>
    </>
  );
}

/* ── Shape Controls ─────────────────────────────────────────── */

function ShapeContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<EditorElement, { type: "rectangle" }> | Extract<EditorElement, { type: "ellipse" }> | null;
  defaults: EditorState["shapeDefaults"];
  dispatch: EditorDispatch;
  labels: EditPdfLabels;
}) {
  const val = element ?? defaults;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<EditorElement> });
    } else {
      dispatch({ type: "UPDATE_SHAPE_DEFAULTS", changes: changes as Partial<EditorState["shapeDefaults"]> });
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
        <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">
          {val.strokeWidth}px
        </span>
      </div>
    </>
  );
}

/* ── Draw Controls ──────────────────────────────────────────── */

function DrawContextControls({
  element,
  defaults,
  dispatch,
  labels,
}: {
  element: Extract<EditorElement, { type: "line" }> | Extract<EditorElement, { type: "freehand" }> | null;
  defaults: EditorState["drawDefaults"];
  dispatch: EditorDispatch;
  labels: EditPdfLabels;
}) {
  const strokeColor = element?.strokeColor ?? defaults.strokeColor;
  const strokeWidth = element?.strokeWidth ?? defaults.strokeWidth;

  const update = (changes: Record<string, unknown>) => {
    if (element) {
      dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes: changes as Partial<EditorElement> });
    } else {
      dispatch({ type: "UPDATE_DRAW_DEFAULTS", changes: changes as Partial<EditorState["drawDefaults"]> });
    }
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
        <span className="w-8 text-right text-xs tabular-nums text-foreground-muted">
          {strokeWidth}px
        </span>
      </div>
    </>
  );
}

/* ── Shared UI Components ───────────────────────────────────── */

function ToolBtn({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group/tip relative">
      <button
        type="button"
        onClick={onClick}
        className={`flex h-9 items-center gap-1.5 rounded-lg px-2.5 transition-colors ${
          active
            ? "bg-accent/10 text-accent"
            : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
        }`}
      >
        {children}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
        {title}
      </div>
    </div>
  );
}

function ActionBtn({
  onClick,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group/tip relative">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground disabled:opacity-30"
      >
        {children}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
        {title}
      </div>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group/tip relative">
      <button
        type="button"
        onClick={onClick}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
          active
            ? "bg-accent/10 text-accent"
            : "text-foreground-muted hover:bg-background-muted"
        }`}
      >
        {children}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
        {title}
      </div>
    </div>
  );
}

function LayerBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group/tip relative">
      <button
        type="button"
        onClick={onClick}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground"
      >
        {children}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
        {title}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px shrink-0 bg-border" />;
}
