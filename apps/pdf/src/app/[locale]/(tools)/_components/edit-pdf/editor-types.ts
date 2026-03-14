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
  | { type: "UPDATE_ELEMENT"; id: string; changes: Partial<EditorElement> }
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
  | { type: "UPDATE_TEXT_DEFAULTS"; changes: Partial<TextDefaults> }
  | { type: "UPDATE_SHAPE_DEFAULTS"; changes: Partial<ShapeDefaults> }
  | { type: "UPDATE_DRAW_DEFAULTS"; changes: Partial<DrawDefaults> };

// ─── Labels ───────────────────────────────────────────────────
export interface EditPdfLabels {
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
  pageOf: string;
  previousPage: string;
  nextPage: string;
  // Export
  applyButton: string;
  // General
  addText: string;
  addImage: string;
  uploadImage: string;
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
  { value: "Courier", label: "Courier" },
  { value: "TimesRoman", label: "Times New Roman" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
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
