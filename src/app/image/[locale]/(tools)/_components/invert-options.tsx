"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface InvertOptionsValue {
  strength: number;
}

interface InvertOptionsProps {
  value: InvertOptionsValue;
  onChange: (value: InvertOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["invert"];
}

export function InvertOptions({ value, onChange, labels }: InvertOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.strength}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.strength}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.strength}
          onChange={(e) => onChange({ ...value, strength: Number(e.target.value) })}
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

export function getDefaultInvertOptions(): InvertOptionsValue {
  return { strength: 100 };
}
