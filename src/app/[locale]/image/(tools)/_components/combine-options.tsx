"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface CombineOptionsValue {
  layout: "horizontal" | "vertical" | "grid";
  gap: number;
  backgroundColor: string;
  alignment: "start" | "center" | "end";
}

interface CombineOptionsProps {
  value: CombineOptionsValue;
  onChange: (value: CombineOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["combine"];
}

export function CombineOptions({ value, onChange, labels }: CombineOptionsProps) {
  const LAYOUTS = [
    { value: "horizontal" as const, label: labels.horizontal, icon: "|||" },
    { value: "vertical" as const, label: labels.vertical, icon: "\u2261" },
    { value: "grid" as const, label: labels.grid, icon: "\u229E" },
  ];

  const ALIGNMENTS = [
    { value: "start" as const, label: labels.start },
    { value: "center" as const, label: labels.center },
    { value: "end" as const, label: labels.end },
  ];

  return (
    <div className="space-y-4">
      {/* Layout selector */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          {labels.layout}
        </label>
        <div className="flex gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => onChange({ ...value, layout: l.value })}
              className={`flex flex-1 flex-col items-center gap-1 rounded-md border px-3 py-2.5 transition-colors cursor-pointer ${
                value.layout === l.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              <span className="text-base font-bold">{l.icon}</span>
              <span className="text-xs font-medium">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gap */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.gap}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.gap}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={value.gap}
          onChange={(e) => onChange({ ...value, gap: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Background color */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.bgColor}
        </label>
        <input
          type="color"
          value={value.backgroundColor}
          onChange={(e) => onChange({ ...value, backgroundColor: e.target.value })}
          className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent"
        />
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          {labels.alignment}
        </label>
        <div className="flex gap-2">
          {ALIGNMENTS.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => onChange({ ...value, alignment: a.value })}
              className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                value.alignment === a.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getDefaultCombineOptions(): CombineOptionsValue {
  return {
    layout: "horizontal",
    gap: 0,
    backgroundColor: "#ffffff",
    alignment: "center",
  };
}
