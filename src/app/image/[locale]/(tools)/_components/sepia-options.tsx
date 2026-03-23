"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface SepiaOptionsValue {
  intensity: number;
}

interface SepiaOptionsProps {
  value: SepiaOptionsValue;
  onChange: (value: SepiaOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["sepia"];
}

export function SepiaOptions({ value, onChange, labels }: SepiaOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.intensity}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.intensity}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.intensity}
          onChange={(e) => onChange({ ...value, intensity: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>{labels.subtle}</span>
          <span>{labels.full}</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultSepiaOptions(): SepiaOptionsValue {
  return { intensity: 100 };
}
