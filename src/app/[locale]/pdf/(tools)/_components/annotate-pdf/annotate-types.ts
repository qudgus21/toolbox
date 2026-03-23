// Re-export shared element types from lib (canonical source)
export type {
  AnnotateToolType,
  TextAlign,
  HighlightColor,
  StampKind,
  AnnotateElement,
  HighlightElement,
  UnderlineElement,
  StrikethroughElement,
  FreehandElement,
  RectangleElement,
  EllipseElement,
  ArrowElement,
  TextBoxElement,
  StampElement,
} from "@/lib/pdf/annotate-types";

export {
  HIGHLIGHT_COLORS,
  STAMP_TEXT,
  STAMP_DEFAULT_COLORS,
} from "@/lib/pdf/annotate-types";

import type {
  AnnotateToolType,
  TextAlign,
  HighlightColor,
  StampKind,
  AnnotateElement,
} from "@/lib/pdf/annotate-types";

// ─── Defaults ────────────────────────────────────────────────
export interface HighlightDefaults {
  color: HighlightColor;
  opacity: number;
}

export interface MarkupDefaults {
  color: string;
  strokeWidth: number;
}

export interface DrawDefaults {
  strokeColor: string;
  strokeWidth: number;
}

export interface ShapeDefaults {
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
  opacity: number;
}

export interface TextBoxDefaults {
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  borderColor: string;
  bold: boolean;
  italic: boolean;
  align: TextAlign;
  lineHeight: number;
}

export interface ArrowDefaults {
  strokeColor: string;
  strokeWidth: number;
  headSize: number;
}

export interface StampDefaults {
  stampKind: StampKind;
  color: string;
}

// ─── State ───────────────────────────────────────────────────
export interface AnnotateState {
  pages: PageData[];
  annotations: AnnotateElement[];
  activeTool: AnnotateToolType;
  selectedElementId: string | null;
  activePageIndex: number;
  zoom: number;
  history: {
    past: AnnotateElement[][];
    future: AnnotateElement[][];
  };
  pendingStamp: StampKind | null;
  highlightDefaults: HighlightDefaults;
  markupDefaults: MarkupDefaults;
  drawDefaults: DrawDefaults;
  shapeDefaults: ShapeDefaults;
  textBoxDefaults: TextBoxDefaults;
  arrowDefaults: ArrowDefaults;
  stampDefaults: StampDefaults;
}

// ─── Actions ─────────────────────────────────────────────────
export type AnnotateAction =
  | { type: "SET_PAGES"; pages: PageData[] }
  | { type: "ADD_ELEMENT"; element: AnnotateElement }
  | { type: "UPDATE_ELEMENT"; id: string; changes: Partial<AnnotateElement>; skipHistory?: boolean; skipResize?: boolean }
  | { type: "DELETE_ELEMENT"; id: string }
  | { type: "SELECT_ELEMENT"; id: string | null }
  | { type: "SET_TOOL"; tool: AnnotateToolType }
  | { type: "SET_PAGE"; index: number }
  | { type: "SET_ZOOM"; zoom: number }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "MOVE_LAYER"; id: string; direction: "up" | "down" | "top" | "bottom" }
  | { type: "REORDER_ANNOTATIONS"; pageIndex: number; orderedIds: string[] }
  | { type: "SET_PENDING_STAMP"; stamp: StampKind }
  | { type: "UPDATE_HIGHLIGHT_DEFAULTS"; changes: Partial<HighlightDefaults> }
  | { type: "UPDATE_MARKUP_DEFAULTS"; changes: Partial<MarkupDefaults> }
  | { type: "UPDATE_DRAW_DEFAULTS"; changes: Partial<DrawDefaults> }
  | { type: "UPDATE_SHAPE_DEFAULTS"; changes: Partial<ShapeDefaults> }
  | { type: "UPDATE_TEXT_BOX_DEFAULTS"; changes: Partial<TextBoxDefaults> }
  | { type: "UPDATE_ARROW_DEFAULTS"; changes: Partial<ArrowDefaults> }
  | { type: "UPDATE_STAMP_DEFAULTS"; changes: Partial<StampDefaults> };

// ─── Page Data (reuse from edit-pdf) ─────────────────────────
export interface PageData {
  width: number;
  height: number;
  imageUrl: string;
}

// ─── Labels ──────────────────────────────────────────────────
export interface AnnotatePdfLabels {
  // Tools
  toolSelect: string;
  toolHighlight: string;
  toolUnderline: string;
  toolStrikethrough: string;
  toolFreehand: string;
  toolRectangle: string;
  toolEllipse: string;
  toolArrow: string;
  toolTextBox: string;
  toolStamp: string;
  // Highlight colors
  colorYellow: string;
  colorGreen: string;
  colorPink: string;
  colorBlue: string;
  colorOrange: string;
  colorPurple: string;
  // Stamps
  stampApproved: string;
  stampRejected: string;
  stampConfidential: string;
  stampDraft: string;
  stampFinal: string;
  stampVoid: string;
  stampNotApproved: string;
  stampForReview: string;
  // Text box
  fontFamily: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: string;
  bold: string;
  italic: string;
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
  // Arrow
  arrowSize: string;
  commentPlaceholder: string;
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
  clickToPlace: string;
  noSelection: string;
  position: string;
  size: string;
  rotation: string;
  layerOrder: string;
  changeFile: string;
  confirmClearAll: string;
  annotationList: string;
  noAnnotations: string;
  annotationsOnPage: string;
  addComment: string;
}

// ─── Helpers ─────────────────────────────────────────────────
let _id = 0;
export function generateId(): string {
  return `ann_${Date.now()}_${++_id}`;
}

/** Reuse from editor-types — shared constants */
export { FONT_OPTIONS, ZOOM_LEVELS, PRESET_COLORS, measureTextWidth, measureTextSize } from "../edit-pdf/editor-types";
