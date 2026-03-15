// ─── Tool Types ───────────────────────────────────────────────
export type ToolType =
  | "select"
  | "text"
  | "image"
  | "rectangle"
  | "ellipse"
  | "line"
  | "freehand"
  | "symbol";

export type TextAlign = "left" | "center" | "right";

export type SymbolKind =
  | "check"
  | "cross"
  | "heart"
  | "smile"
  | "neutral"
  | "sad"
  | "exclamation"
  | "question";

// ─── Element Types ────────────────────────────────────────────
interface BaseElement {
  id: string;
  type: ToolType;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export interface TextElement extends BaseElement {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: TextAlign;
  lineHeight: number;
  /** True when user manually resized width via anchor */
  manualWidth?: boolean;
}

export interface ImageElement extends BaseElement {
  type: "image";
  dataUrl: string;
  originalWidth: number;
  originalHeight: number;
}

export interface RectangleElement extends BaseElement {
  type: "rectangle";
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
}

export interface EllipseElement extends BaseElement {
  type: "ellipse";
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
}

export interface LineElement extends BaseElement {
  type: "line";
  points: [number, number, number, number]; // [x1, y1, x2, y2] relative
  strokeColor: string;
  strokeWidth: number;
}

export interface FreehandElement extends BaseElement {
  type: "freehand";
  points: number[]; // flattened [x1, y1, x2, y2, ...]
  strokeColor: string;
  strokeWidth: number;
}

export interface SymbolElement extends BaseElement {
  type: "symbol";
  symbol: SymbolKind;
  color: string;
}

export type EditorElement =
  | TextElement
  | ImageElement
  | RectangleElement
  | EllipseElement
  | LineElement
  | FreehandElement
  | SymbolElement;

// ─── Page Data ────────────────────────────────────────────────
export interface PageData {
  width: number;
  height: number;
  imageUrl: string;
}

// ─── State ────────────────────────────────────────────────────
export interface TextDefaults {
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: TextAlign;
  lineHeight: number;
}

export interface ShapeDefaults {
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
  opacity: number;
}

export interface DrawDefaults {
  strokeColor: string;
  strokeWidth: number;
}

export interface EditorState {
  pages: PageData[];
  annotations: EditorElement[];
  activeTool: ToolType;
  selectedElementId: string | null;
  activePageIndex: number;
  zoom: number;
  history: {
    past: EditorElement[][];
    future: EditorElement[][];
  };
  textDefaults: TextDefaults;
  shapeDefaults: ShapeDefaults;
  drawDefaults: DrawDefaults;
}

// ─── Actions ──────────────────────────────────────────────────
export type EditorAction =
  | { type: "SET_PAGES"; pages: PageData[] }
  | { type: "ADD_ELEMENT"; element: EditorElement }
  | { type: "UPDATE_ELEMENT"; id: string; changes: Partial<EditorElement>; skipHistory?: boolean; skipResize?: boolean }
  | { type: "DELETE_ELEMENT"; id: string }
  | { type: "SELECT_ELEMENT"; id: string | null }
  | { type: "SET_TOOL"; tool: ToolType }
  | { type: "SET_PAGE"; index: number }
  | { type: "SET_ZOOM"; zoom: number }
  | { type: "UNDO" }
  | { type: "REDO" }
  | {
      type: "MOVE_LAYER";
      id: string;
      direction: "up" | "down" | "top" | "bottom";
    }
  | { type: "REORDER_ANNOTATIONS"; pageIndex: number; orderedIds: string[] }
  | { type: "UPDATE_TEXT_DEFAULTS"; changes: Partial<TextDefaults> }
  | { type: "UPDATE_SHAPE_DEFAULTS"; changes: Partial<ShapeDefaults> }
  | { type: "UPDATE_DRAW_DEFAULTS"; changes: Partial<DrawDefaults> };

// ─── Labels ───────────────────────────────────────────────────
export interface EditPdfLabels {
  // Upload
  dropFile: string;
  // Toolbar
  toolSelect: string;
  toolText: string;
  toolImage: string;
  toolRectangle: string;
  toolEllipse: string;
  toolLine: string;
  toolDraw: string;
  toolSymbol: string;
  // Text
  fontFamily: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: string;
  bold: string;
  italic: string;
  underline: string;
  lineHeight: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  // Shape
  borderColor: string;
  fillColor: string;
  strokeWidth: string;
  opacity: string;
  // Drawing
  drawColor: string;
  drawThickness: string;
  // Symbols
  symbolCheck: string;
  symbolCross: string;
  symbolHeart: string;
  symbolSmile: string;
  symbolNeutral: string;
  symbolSad: string;
  symbolExclamation: string;
  symbolQuestion: string;
  // Actions
  undo: string;
  redo: string;
  zoomIn: string;
  zoomOut: string;
  fitWidth: string;
  fitPage: string;
  deleteElement: string;
  bringForward: string;
  sendBackward: string;
  bringToFront: string;
  sendToBack: string;
  // Navigation
  pageLabel: string;
  pageOf: string;
  previousPage: string;
  nextPage: string;
  singlePage: string;
  doublePage: string;
  // Export
  applyButton: string;
  // General
  addText: string;
  addImage: string;
  uploadImage: string;
  clickToPlace: string;
  noSelection: string;
  position: string;
  size: string;
  rotation: string;
  layerOrder: string;
}

// ─── Helpers ──────────────────────────────────────────────────
let _id = 0;
export function generateId(): string {
  return `el_${Date.now()}_${++_id}`;
}

export const FONT_OPTIONS = [
  { value: "Helvetica", label: "Arial / Helvetica" },
  { value: "TimesRoman", label: "Times New Roman" },
  { value: "Courier", label: "Courier" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
  { value: "Impact", label: "Impact" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Palatino", label: "Palatino" },
  { value: "Garamond", label: "Garamond" },
  { value: "Lucida Console", label: "Lucida Console" },
] as const;

export const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

export const PRESET_COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#FF6600",
  "#FFCC00",
  "#33CC33",
  "#0066FF",
  "#9933FF",
  "#FF3399",
  "#666666",
  "#CCCCCC",
  "#990000",
  "#994C00",
  "#999900",
  "#006600",
  "#003399",
  "#660099",
  "#99004C",
  "#333333",
  "#999999",
] as const;

/** Get a canvas font string */
function buildFont(fontSize: number, fontFamily: string, bold: boolean, italic: boolean) {
  return `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px ${fontFamily}`;
}

/** Cached canvas context for text measurement */
let _measureCtx: CanvasRenderingContext2D | null = null;
function getMeasureCtx(): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") return null;
  if (!_measureCtx) {
    _measureCtx = document.createElement("canvas").getContext("2d");
  }
  return _measureCtx;
}

/** Measure single-line text width using Canvas API */
export function measureTextWidth(
  text: string,
  fontSize: number,
  fontFamily: string,
  bold = false,
  italic = false,
): number {
  const ctx = getMeasureCtx();
  if (!ctx) return fontSize * text.length * 0.6;
  ctx.font = buildFont(fontSize, fontFamily, bold, italic);
  return Math.ceil(ctx.measureText(text).width) + 4;
}

/** Hidden DOM element for text measurement — matches overlay styles exactly */
let _measureDiv: HTMLDivElement | null = null;
function getMeasureDiv(): HTMLDivElement | null {
  if (typeof document === "undefined") return null;
  if (!_measureDiv) {
    _measureDiv = document.createElement("div");
    Object.assign(_measureDiv.style, {
      position: "absolute",
      visibility: "hidden",
      left: "-9999px",
      top: "-9999px",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
      lineHeight: "1.2",
    });
    document.body.appendChild(_measureDiv);
  }
  return _measureDiv;
}

/** Measure text size with auto-wrap at maxWidth. Returns { width, height, lineCount }. */
export function measureTextSize(
  text: string,
  fontSize: number,
  fontFamily: string,
  bold: boolean,
  italic: boolean,
  maxWidth: number,
  lineHeight = 1.2,
): { width: number; height: number; lineCount: number } {
  const div = getMeasureDiv();
  if (!div) {
    const w = fontSize * text.length * 0.6;
    return { width: Math.min(w, maxWidth), height: fontSize * lineHeight, lineCount: 1 };
  }

  div.style.font = buildFont(fontSize, fontFamily, bold, italic);
  div.style.lineHeight = String(lineHeight);
  div.style.width = `${maxWidth}px`;
  div.innerText = text || "\u00A0";

  const height = div.scrollHeight;
  // For auto-width: measure without constraint
  div.style.width = "";
  const naturalWidth = div.scrollWidth;
  div.style.width = `${maxWidth}px`;

  const lineCount = Math.max(1, Math.round(height / (fontSize * lineHeight)));

  return {
    width: Math.ceil(Math.min(naturalWidth, maxWidth)),
    height,
    lineCount,
  };
}

export const SYMBOL_MAP: Record<SymbolKind, string> = {
  check: "✓",
  cross: "✗",
  heart: "❤",
  smile: "😊",
  neutral: "😐",
  sad: "😢",
  exclamation: "❗",
  question: "❓",
};
