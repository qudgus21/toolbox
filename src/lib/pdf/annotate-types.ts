// ─── Annotate Element Types (shared between processors and UI) ───

export type AnnotateToolType =
  | "select"
  | "highlight"
  | "underline"
  | "strikethrough"
  | "freehand"
  | "rectangle"
  | "ellipse"
  | "arrow"
  | "text-box"
  | "stamp";

export type TextAlign = "left" | "center" | "right";

export type HighlightColor =
  | "yellow"
  | "green"
  | "pink"
  | "blue"
  | "orange"
  | "purple";

export type StampKind =
  | "approved"
  | "rejected"
  | "confidential"
  | "draft"
  | "final"
  | "void"
  | "not-approved"
  | "for-review";

export const HIGHLIGHT_COLORS: Record<HighlightColor, string> = {
  yellow: "#FFEB3B",
  green: "#66BB6A",
  pink: "#F06292",
  blue: "#42A5F5",
  orange: "#FFA726",
  purple: "#AB47BC",
};

export const STAMP_TEXT: Record<StampKind, string> = {
  approved: "APPROVED",
  rejected: "REJECTED",
  confidential: "CONFIDENTIAL",
  draft: "DRAFT",
  final: "FINAL",
  void: "VOID",
  "not-approved": "NOT APPROVED",
  "for-review": "FOR REVIEW",
};

export const STAMP_DEFAULT_COLORS: Record<StampKind, string> = {
  approved: "#22C55E",
  rejected: "#EF4444",
  confidential: "#8B5CF6",
  draft: "#6B7280",
  final: "#3B82F6",
  void: "#EF4444",
  "not-approved": "#EF4444",
  "for-review": "#F59E0B",
};

// ─── Element Types ───────────────────────────────────────────
interface AnnotateBaseElement {
  id: string;
  type: AnnotateToolType;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  comment?: string;
}

export interface HighlightElement extends AnnotateBaseElement {
  type: "highlight";
  color: HighlightColor;
}

export interface UnderlineElement extends AnnotateBaseElement {
  type: "underline";
  color: string;
  strokeWidth: number;
}

export interface StrikethroughElement extends AnnotateBaseElement {
  type: "strikethrough";
  color: string;
  strokeWidth: number;
}

export interface FreehandElement extends AnnotateBaseElement {
  type: "freehand";
  points: number[];
  strokeColor: string;
  strokeWidth: number;
}

export interface RectangleElement extends AnnotateBaseElement {
  type: "rectangle";
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
}

export interface EllipseElement extends AnnotateBaseElement {
  type: "ellipse";
  borderColor: string;
  fillColor: string;
  strokeWidth: number;
}

export interface ArrowElement extends AnnotateBaseElement {
  type: "arrow";
  points: [number, number, number, number];
  strokeColor: string;
  strokeWidth: number;
  headSize: number;
}

export interface TextBoxElement extends AnnotateBaseElement {
  type: "text-box";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  borderColor: string;
  bold: boolean;
  italic: boolean;
  align: TextAlign;
  lineHeight: number;
  manualWidth?: boolean;
}

export interface StampElement extends AnnotateBaseElement {
  type: "stamp";
  stampKind: StampKind;
  color: string;
}

export type AnnotateElement =
  | HighlightElement
  | UnderlineElement
  | StrikethroughElement
  | FreehandElement
  | RectangleElement
  | EllipseElement
  | ArrowElement
  | TextBoxElement
  | StampElement;
