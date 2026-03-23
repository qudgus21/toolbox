// ─── Sign Element Types (shared between processors and UI) ───

export type SignFieldType = "signature" | "initials" | "name" | "date" | "text";

export type SignCreateMethod = "draw" | "type" | "image";

export interface SignatureData {
  id: string;
  imageDataUrl: string;
  method: SignCreateMethod;
  width: number;
  height: number;
}

// ─── Element Types ──────────────────────────────────────────
interface SignBaseElement {
  id: string;
  type: SignFieldType;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export interface SignatureElement extends SignBaseElement {
  type: "signature" | "initials";
  imageDataUrl: string;
}

export interface TextFieldElement extends SignBaseElement {
  type: "name" | "date" | "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
}

export type SignElement = SignatureElement | TextFieldElement;
