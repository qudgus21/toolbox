"use client";

import type { BookletOptions, BookletBinding, BookletSheetSize } from "@/lib/processors/booklet-types";

export interface BookletLabels {
  sheetSizeLabel: string;
  bindingLabel: string;
  bindingLeft: string;
  bindingRight: string;
  changeFile: string;
  sheetLabel: string;
  frontLabel: string;
  backLabel: string;
}

interface BookletOptionsProps {
  options: BookletOptions;
  onChange: (options: BookletOptions) => void;
  labels: BookletLabels;
}

const SHEET_SIZES: { value: BookletSheetSize; label: string }[] = [
  { value: "a4", label: "A4" },
  { value: "a3", label: "A3" },
  { value: "letter", label: "Letter" },
  { value: "legal", label: "Legal" },
  { value: "ledger", label: "Ledger" },
];

const BINDING_OPTIONS: { value: BookletBinding; key: keyof BookletLabels }[] = [
  { value: "left", key: "bindingLeft" },
  { value: "right", key: "bindingRight" },
];

export function BookletOptionsComponent({ options, onChange, labels }: BookletOptionsProps) {
  const update = <K extends keyof BookletOptions>(key: K, value: BookletOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-5 rounded-xl border border-border bg-background-card p-4">
      {/* Sheet size */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          {labels.sheetSizeLabel}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SHEET_SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => update("sheetSize", s.value)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                options.sheetSize === s.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-subtle hover:bg-background-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Binding */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          {labels.bindingLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {BINDING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("binding", opt.value)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                options.binding === opt.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-subtle hover:bg-background-muted"
              }`}
            >
              {labels[opt.key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
