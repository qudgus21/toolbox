"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface RoundOptionsValue {
  borderWidth: number;
  borderColor: string;
}

interface RoundOptionsProps {
  value: RoundOptionsValue;
  onChange: (value: RoundOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["round"];
}

export function RoundOptions({ value, onChange, labels }: RoundOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Border width */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.borderWidth}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.borderWidth}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={value.borderWidth}
          onChange={(e) => onChange({ ...value, borderWidth: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Border color */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.borderColor}
        </label>
        <input
          type="color"
          value={value.borderColor}
          onChange={(e) => onChange({ ...value, borderColor: e.target.value })}
          className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent"
        />
      </div>
    </div>
  );
}

export function getDefaultRoundOptions(): RoundOptionsValue {
  return {
    borderWidth: 0,
    borderColor: "#ffffff",
  };
}
