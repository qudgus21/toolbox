"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface ColorPaletteOptionsValue {
  numColors: number;
  layout: "horizontal" | "grid";
}

interface ColorPaletteOptionsProps {
  value: ColorPaletteOptionsValue;
  onChange: (value: ColorPaletteOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["colorPalette"];
}

export function ColorPaletteOptions({ value, onChange, labels }: ColorPaletteOptionsProps) {
  const LAYOUT_LABELS: Record<string, string> = {
    horizontal: labels.horizontal,
    grid: labels.grid,
  };

  return (
    <div className="space-y-4">
      {/* Number of colors */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.numberOfColors}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.numColors}
          </span>
        </div>
        <input
          type="range"
          min={4}
          max={12}
          step={1}
          value={value.numColors}
          onChange={(e) => onChange({ ...value, numColors: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>4</span>
          <span>12</span>
        </div>
      </div>

      {/* Layout */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-2 block">
          {labels.layout}
        </label>
        <div className="flex gap-2">
          {(["horizontal", "grid"] as const).map((layout) => (
            <button
              key={layout}
              onClick={() => onChange({ ...value, layout })}
              className={`flex-1 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                value.layout === layout
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-muted hover:border-foreground/30"
              }`}
            >
              {LAYOUT_LABELS[layout]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getDefaultColorPaletteOptions(): ColorPaletteOptionsValue {
  return { numColors: 6, layout: "horizontal" };
}
