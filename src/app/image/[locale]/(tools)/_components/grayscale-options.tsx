"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface GrayscaleOptionsValue {
  mode: "luminance" | "average" | "desaturate";
}

interface GrayscaleOptionsProps {
  value: GrayscaleOptionsValue;
  onChange: (value: GrayscaleOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["grayscale"];
}

export function GrayscaleOptions({ value, onChange, labels }: GrayscaleOptionsProps) {
  const MODES = [
    { value: "luminance" as const, label: labels.luminance, desc: labels.luminanceDesc },
    { value: "average" as const, label: labels.average, desc: labels.averageDesc },
    { value: "desaturate" as const, label: labels.desaturate, desc: labels.desaturateDesc },
  ];

  return (
    <div className="space-y-4">
      <label className="block text-xs font-medium text-foreground-muted mb-2">
        {labels.mode}
      </label>
      <div className="flex flex-col gap-2">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange({ ...value, mode: m.value })}
            className={`rounded-md border px-3 py-2.5 text-left transition-colors cursor-pointer ${
              value.mode === m.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
            }`}
          >
            <span className="text-xs font-medium">{m.label}</span>
            <span className="block text-xs opacity-70 mt-0.5">{m.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function getDefaultGrayscaleOptions(): GrayscaleOptionsValue {
  return { mode: "luminance" };
}
