"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface VignetteOptionsValue {
  intensity: number;
  radius: number;
}

interface VignetteOptionsProps {
  value: VignetteOptionsValue;
  onChange: (value: VignetteOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["vignette"];
}

export function VignetteOptions({ value, onChange, labels }: VignetteOptionsProps) {
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
          <span>{labels.heavy}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.radius}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.radius}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.radius}
          onChange={(e) => onChange({ ...value, radius: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>{labels.small}</span>
          <span>{labels.large}</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultVignetteOptions(): VignetteOptionsValue {
  return { intensity: 50, radius: 70 };
}
