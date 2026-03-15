"use client";

import { SYMBOL_MAP, type SymbolKind, type EditPdfLabels } from "./editor-types";

interface SymbolPickerProps {
  onSelect: (symbol: SymbolKind) => void;
  labels: EditPdfLabels;
}

const SYMBOL_KEYS: SymbolKind[] = [
  "check",
  "cross",
  "circle",
  "star",
  "thumbsUp",
  "thumbsDown",
  "heart",
  "smile",
  "neutral",
  "sad",
  "exclamation",
  "question",
  "arrow",
  "dash",
];

export function SymbolPicker({ onSelect, labels }: SymbolPickerProps) {
  const labelMap: Record<SymbolKind, string> = {
    check: labels.symbolCheck,
    cross: labels.symbolCross,
    circle: labels.symbolCircle,
    star: labels.symbolStar,
    thumbsUp: labels.symbolThumbsUp,
    thumbsDown: labels.symbolThumbsDown,
    heart: labels.symbolHeart,
    smile: labels.symbolSmile,
    neutral: labels.symbolNeutral,
    sad: labels.symbolSad,
    exclamation: labels.symbolExclamation,
    question: labels.symbolQuestion,
    arrow: labels.symbolArrow,
    dash: labels.symbolDash,
  };

  return (
    <div className="grid grid-cols-7 gap-1">
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
