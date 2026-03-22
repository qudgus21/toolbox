"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface SharpenOptionsValue {
  amount: number;
  radius: number;
}

interface SharpenOptionsProps {
  value: SharpenOptionsValue;
  onChange: (value: SharpenOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["sharpen"];
}

export function SharpenOptions({ value, onChange, labels }: SharpenOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.amount}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.amount}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={200}
          step={1}
          value={value.amount}
          onChange={(e) => onChange({ ...value, amount: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>{labels.subtle}</span>
          <span>{labels.strong}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.radius}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.radius}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value.radius}
          onChange={(e) => onChange({ ...value, radius: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>{labels.fine}</span>
          <span>{labels.coarse}</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultSharpenOptions(): SharpenOptionsValue {
  return { amount: 50, radius: 1 };
}
