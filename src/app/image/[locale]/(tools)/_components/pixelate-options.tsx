"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface PixelateOptionsValue {
  pixelSize: number;
}

interface PixelateOptionsProps {
  value: PixelateOptionsValue;
  onChange: (value: PixelateOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["pixelate"];
}

export function PixelateOptions({ value, onChange, labels }: PixelateOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.pixelSize}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.pixelSize}px
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={100}
          step={1}
          value={value.pixelSize}
          onChange={(e) => onChange({ ...value, pixelSize: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>{labels.fine}</span>
          <span>{labels.blocky}</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultPixelateOptions(): PixelateOptionsValue {
  return { pixelSize: 10 };
}
