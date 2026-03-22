export type BookletBinding = "left" | "right";
export type BookletSheetSize = "a4" | "a3" | "letter" | "legal" | "ledger";

export interface BookletOptions {
  sheetSize: BookletSheetSize;
  binding: BookletBinding;
}

export const DEFAULT_BOOKLET_OPTIONS: BookletOptions = {
  sheetSize: "a4",
  binding: "left",
};
