// ─── Redaction Types ─────────────────────────────────────────

export type RedactToolType = "select" | "redactArea" | "redactText";

export interface RedactArea {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: "area" | "text";
  label?: string;
}

export interface PageData {
  width: number;
  height: number;
  imageUrl: string;
}

export interface TextSearchResult {
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

// ─── State ───────────────────────────────────────────────────

export interface RedactState {
  pages: PageData[];
  redactions: RedactArea[];
  activeTool: RedactToolType;
  selectedRedactionId: string | null;
  activePageIndex: number;
  redactColor: string;
  searchQuery: string;
  searchResults: TextSearchResult[];
  history: {
    past: RedactArea[][];
    future: RedactArea[][];
  };
}

// ─── Actions ─────────────────────────────────────────────────

export type RedactAction =
  | { type: "SET_PAGES"; pages: PageData[] }
  | { type: "ADD_REDACTION"; redaction: RedactArea }
  | { type: "UPDATE_REDACTION"; id: string; changes: Partial<RedactArea> }
  | { type: "DELETE_REDACTION"; id: string }
  | { type: "SELECT_REDACTION"; id: string | null }
  | { type: "SET_TOOL"; tool: RedactToolType }
  | { type: "SET_PAGE"; index: number }
  | { type: "SET_COLOR"; color: string }
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_SEARCH_RESULTS"; results: TextSearchResult[] }
  | { type: "ADD_TEXT_REDACTIONS"; results: TextSearchResult[] }
  | { type: "CLEAR_ALL" }
  | { type: "UNDO" }
  | { type: "REDO" };

// ─── Labels ──────────────────────────────────────────────────

export type PatternType = "creditCard" | "phone" | "email";

export interface PatternResult {
  type: PatternType;
  results: TextSearchResult[];
}

export interface RedactPdfLabels {
  dropFile: string;
  toolSelect: string;
  toolRedactArea: string;
  toolRedactText: string;
  searchPlaceholder: string;
  searchButton: string;
  searchNoResults: string;
  searchResultCount: string;
  redactAllResults: string;
  redactColor: string;
  colorBlack: string;
  colorWhite: string;
  colorRed: string;
  colorGray: string;
  undo: string;
  redo: string;
  zoomIn: string;
  zoomOut: string;
  fitWidth: string;
  fitPage: string;
  previousPage: string;
  nextPage: string;
  singlePage: string;
  doublePage: string;
  pageLabel: string;
  pageOf: string;
  deleteRedaction: string;
  redactionList: string;
  noRedactions: string;
  redactionsOnPage: string;
  areaRedaction: string;
  textRedaction: string;
  changeFile: string;
  applyButton: string;
  applyWarning: string;
  clickToDraw: string;
  confirmClearAll: string;
  position: string;
  size: string;
  // Pattern detection
  patternDetect: string;
  patternCreditCard: string;
  patternPhone: string;
  patternEmail: string;
  patternScanning: string;
  patternFound: string;
  patternNone: string;
  redactSelected: string;
  // Full page redaction
  redactFullPage: string;
  redactFullPageDesc: string;
  currentPage: string;
  allPages: string;
  oddPages: string;
  evenPages: string;
  customPages: string;
  customPagesPlaceholder: string;
  addPageRedaction: string;
  pageRedaction: string;
}

// ─── Helpers ─────────────────────────────────────────────────

let _id = 0;
export function generateRedactId(): string {
  return `redact_${Date.now()}_${++_id}`;
}

export const REDACT_COLORS = [
  { value: "#000000", label: "colorBlack" as const },
  { value: "#FFFFFF", label: "colorWhite" as const },
  { value: "#FF0000", label: "colorRed" as const },
  { value: "#808080", label: "colorGray" as const },
] as const;

// ─── Pattern Detection Regexes ──────────────────────────────

export const PATTERN_REGEXES: Record<PatternType, RegExp> = {
  creditCard: /\b(?:\d[ -]*?){13,19}\b/g,
  phone: /(?:\+?\d{1,4}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}\b/g,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
};

// Luhn check for credit card validation
export function isValidCreditCard(num: string): boolean {
  const digits = num.replace(/[\s-]/g, "");
  if (digits.length < 13 || digits.length > 19 || !/^\d+$/.test(digits)) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

// ─── Page Range Parser ──────────────────────────────────────

export function parsePageRange(input: string, totalPages: number): number[] {
  const pages = new Set<number>();
  for (const part of input.split(",")) {
    const trimmed = part.trim();
    const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = Math.max(1, parseInt(rangeMatch[1], 10));
      const end = Math.min(totalPages, parseInt(rangeMatch[2], 10));
      for (let i = start; i <= end; i++) pages.add(i - 1);
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) pages.add(num - 1);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}
