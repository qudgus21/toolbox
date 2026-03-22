"use client";

import { RotateCcw } from "lucide-react";

export interface FiltersOptionsValue {
  brightness: number;
  contrast: number;
  saturation: number;
  hueRotate: number;
  sepia: number;
  invert: number;
}

interface FiltersOptionsProps {
  value: FiltersOptionsValue;
  onChange: (value: FiltersOptionsValue) => void;
}

const DEFAULTS: FiltersOptionsValue = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hueRotate: 0,
  sepia: 0,
  invert: 0,
};

const SLIDERS: {
  key: keyof FiltersOptionsValue;
  label: string;
  min: number;
  max: number;
  unit: string;
}[] = [
  { key: "brightness", label: "Brightness", min: 0, max: 200, unit: "%" },
  { key: "contrast", label: "Contrast", min: 0, max: 200, unit: "%" },
  { key: "saturation", label: "Saturation", min: 0, max: 200, unit: "%" },
  { key: "hueRotate", label: "Hue Rotate", min: 0, max: 360, unit: "\u00B0" },
  { key: "sepia", label: "Sepia", min: 0, max: 100, unit: "%" },
  { key: "invert", label: "Invert", min: 0, max: 100, unit: "%" },
];

export function FiltersOptions({ value, onChange }: FiltersOptionsProps) {
  const isModified = SLIDERS.some((s) => value[s.key] !== DEFAULTS[s.key]);

  return (
    <div className="space-y-4">
      {SLIDERS.map((s) => (
        <div key={s.key}>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-foreground-muted">
              {s.label}
            </label>
            <span className="text-sm font-semibold text-foreground">
              {value[s.key]}{s.unit}
            </span>
          </div>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={1}
            value={value[s.key]}
            onChange={(e) => onChange({ ...value, [s.key]: Number(e.target.value) })}
            className="w-full accent-accent"
          />
        </div>
      ))}

      {/* Reset button */}
      {isModified && (
        <button
          type="button"
          onClick={() => onChange({ ...DEFAULTS })}
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground-muted hover:bg-background-subtle transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All
        </button>
      )}
    </div>
  );
}

export function getDefaultFiltersOptions(): FiltersOptionsValue {
  return { ...DEFAULTS };
}
