"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface BlurOptionsValue {
  radius: number;
}

interface BlurOptionsProps {
  value: BlurOptionsValue;
  onChange: (value: BlurOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["blur"];
}

export function BlurOptions({ value, onChange, labels }: BlurOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.blurRadius}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.radius}px
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={50}
          step={1}
          value={value.radius}
          onChange={(e) => onChange({ ...value, radius: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>{labels.subtle}</span>
          <span>{labels.heavy}</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultBlurOptions(): BlurOptionsValue {
  return { radius: 5 };
}
