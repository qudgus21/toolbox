"use client";

import { RotateCcw } from "lucide-react";
import type { ImageDictionary } from "@/lib/i18n/image-config";

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
  labels: ImageDictionary["toolOptions"]["filters"];
}

const DEFAULTS: FiltersOptionsValue = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hueRotate: 0,
  sepia: 0,
  invert: 0,
};

const SLIDER_KEYS: {
  key: keyof FiltersOptionsValue;
  labelKey: keyof ImageDictionary["toolOptions"]["filters"];
  min: number;
  max: number;
  unit: string;
}[] = [
  { key: "brightness", labelKey: "brightness", min: 0, max: 200, unit: "%" },
  { key: "contrast", labelKey: "contrast", min: 0, max: 200, unit: "%" },
  { key: "saturation", labelKey: "saturation", min: 0, max: 200, unit: "%" },
  { key: "hueRotate", labelKey: "hueRotate", min: 0, max: 360, unit: "\u00B0" },
  { key: "sepia", labelKey: "sepia", min: 0, max: 100, unit: "%" },
  { key: "invert", labelKey: "invert", min: 0, max: 100, unit: "%" },
];

export function FiltersOptions({ value, onChange, labels }: FiltersOptionsProps) {
  const isModified = SLIDER_KEYS.some((s) => value[s.key] !== DEFAULTS[s.key]);

  return (
    <div className="space-y-4">
      {SLIDER_KEYS.map((s) => (
        <div key={s.key}>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-foreground-muted">
              {labels[s.labelKey]}
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
          {labels.resetAll}
        </button>
      )}
    </div>
  );
}

export function getDefaultFiltersOptions(): FiltersOptionsValue {
  return { ...DEFAULTS };
}
