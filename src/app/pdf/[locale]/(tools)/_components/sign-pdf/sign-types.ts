// ─── Field Types ────────────────────────────────────────────
export type SignFieldType = "signature" | "initials" | "name" | "date" | "text";

export type SignCreateMethod = "draw" | "type" | "image";

// ─── Signature Data (created via modal) ─────────────────────
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

// ─── Page Data ──────────────────────────────────────────────
export interface PageData {
  width: number;
  height: number;
  imageUrl: string;
}

// ─── State ──────────────────────────────────────────────────
export interface SignState {
  pages: PageData[];
  elements: SignElement[];
  selectedElementId: string | null;
  activePageIndex: number;
  zoom: number;
  history: {
    past: SignElement[][];
    future: SignElement[][];
  };
  savedSignature: SignatureData | null;
  savedInitials: SignatureData | null;
  userName: string;
  dateFormat: DateFormatKey;
  createModalOpen: boolean;
  createModalTarget: "signature" | "initials";
}

// ─── Actions ────────────────────────────────────────────────
export type SignAction =
  | { type: "SET_PAGES"; pages: PageData[] }
  | { type: "ADD_ELEMENT"; element: SignElement }
  | { type: "UPDATE_ELEMENT"; id: string; changes: Partial<SignElement>; skipHistory?: boolean }
  | { type: "DELETE_ELEMENT"; id: string }
  | { type: "DUPLICATE_ELEMENT"; id: string }
  | { type: "SELECT_ELEMENT"; id: string | null }
  | { type: "SET_PAGE"; index: number }
  | { type: "SET_ZOOM"; zoom: number }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_SIGNATURE"; data: SignatureData }
  | { type: "SET_INITIALS"; data: SignatureData }
  | { type: "SET_USER_NAME"; name: string }
  | { type: "SET_DATE_FORMAT"; format: DateFormatKey }
  | { type: "OPEN_CREATE_MODAL"; target: "signature" | "initials" }
  | { type: "CLOSE_CREATE_MODAL" };

// ─── Constants ──────────────────────────────────────────────
export const SIGNATURE_COLORS = [
  "#000000", // Black
  "#1E3A5F", // Navy
  "#0000FF", // Blue
  "#8B0000", // Dark Red
] as const;

export type SignatureColor = (typeof SIGNATURE_COLORS)[number];

export const SIGNATURE_FONTS = [
  { name: "Dancing Script", css: "'Dancing Script', cursive", url: "Dancing+Script:wght@700" },
  { name: "Great Vibes", css: "'Great Vibes', cursive", url: "Great+Vibes" },
  { name: "Pacifico", css: "'Pacifico', cursive", url: "Pacifico" },
  { name: "Caveat", css: "'Caveat', cursive", url: "Caveat:wght@700" },
  { name: "Sacramento", css: "'Sacramento', cursive", url: "Sacramento" },
  { name: "Allura", css: "'Allura', cursive", url: "Allura" },
] as const;

export type DateFormatKey = "iso" | "us" | "eu" | "dot" | "long-us" | "long-eu";

export const DATE_FORMATS: Record<DateFormatKey, { label: string; format: (d: Date) => string }> = {
  iso: {
    label: "YYYY-MM-DD",
    format: (d) => `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`,
  },
  us: {
    label: "MM/DD/YYYY",
    format: (d) => `${p(d.getMonth() + 1)}/${p(d.getDate())}/${d.getFullYear()}`,
  },
  eu: {
    label: "DD/MM/YYYY",
    format: (d) => `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`,
  },
  dot: {
    label: "DD.MM.YYYY",
    format: (d) => `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`,
  },
  "long-us": {
    label: "Month DD, YYYY",
    format: (d) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    },
  },
  "long-eu": {
    label: "DD Month YYYY",
    format: (d) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    },
  },
};

function p(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// ─── Defaults ───────────────────────────────────────────────
export const DEFAULT_SIGNATURE_SIZE = { width: 200, height: 80 };
export const DEFAULT_INITIALS_SIZE = { width: 80, height: 60 };
export const DEFAULT_TEXT_FIELD = {
  fontFamily: "Helvetica",
  fontSize: 16,
  fontColor: "#000000",
  width: 180,
  height: 24,
};

// ─── Zoom ───────────────────────────────────────────────────
export const ZOOM_STEPS = [25, 33, 50, 67, 75, 100, 125, 150, 200, 300];

// ─── Labels ─────────────────────────────────────────────────
export interface SignPdfLabels {
  // Field types
  fieldSignature: string;
  fieldInitials: string;
  fieldName: string;
  fieldDate: string;
  fieldText: string;
  // Create modal
  createSignature: string;
  createInitials: string;
  tabDraw: string;
  tabType: string;
  tabImage: string;
  drawHint: string;
  clearCanvas: string;
  typeHint: string;
  typePlaceholder: string;
  uploadHint: string;
  uploadButton: string;
  colorLabel: string;
  fontStyleLabel: string;
  saveButton: string;
  cancelButton: string;
  // Options panel
  requiredSection: string;
  optionalSection: string;
  addToDocument: string;
  editField: string;
  namePlaceholder: string;
  textPlaceholder: string;
  dateFormatLabel: string;
  placedCount: string;
  noSignatureYet: string;
  noInitialsYet: string;
  clickToCreate: string;
  // Common
  undo: string;
  redo: string;
  zoomIn: string;
  zoomOut: string;
  fitWidth: string;
  fitPage: string;
  deleteElement: string;
  duplicate: string;
  pageLabel: string;
  pageOf: string;
  previousPage: string;
  nextPage: string;
  singlePage: string;
  doublePage: string;
  applyButton: string;
  noSelection: string;
  position: string;
  size: string;
  rotation: string;
  changeFile: string;
  // Selected element
  selectedElement: string;
}

// ─── Helpers ────────────────────────────────────────────────
let _id = 0;
export function generateSignId(): string {
  return `sign_${Date.now()}_${++_id}`;
}
