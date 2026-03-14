"use client";

import { SYMBOL_MAP, type SymbolKind, type EditPdfLabels } from "./editor-types";

interface SymbolPickerProps {
  onSelect: (symbol: SymbolKind) => void;
  labels: EditPdfLabels;
}

const SYMBOL_KEYS: SymbolKind[] = [
  "check",
  "cross",
  "heart",
  "smile",
  "neutral",
  "sad",
  "exclamation",
  "question",
];

export function SymbolPicker({ onSelect, labels }: SymbolPickerProps) {
  const labelMap: Record<SymbolKind, string> = {
    check: labels.symbolCheck,
    cross: labels.symbolCross,
    heart: labels.symbolHeart,
    smile: labels.symbolSmile,
    neutral: labels.symbolNeutral,
    sad: labels.symbolSad,
    exclamation: labels.symbolExclamation,
    question: labels.symbolQuestion,
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {SYMBOL_KEYS.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          title={labelMap[key]}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg transition-colors hover:bg-background-muted"
        >
          {SYMBOL_MAP[key]}
        </button>
      ))}
    </div>
  );
}
