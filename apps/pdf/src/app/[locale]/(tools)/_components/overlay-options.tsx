"use client";

import type { OverlayOptions, OverlayLayer, OverlayMode, OverlayScale } from "@/lib/processors/overlay-types";

export interface OverlayLabels {
  contentFile: string;
  overlayFile: string;
  dropOverlay: string;
  layerLabel: string;
  layerAbove: string;
  layerBelow: string;
  modeLabel: string;
  modeRepeat: string;
  modeRepeatDesc: string;
  modeMatch: string;
  modeMatchDesc: string;
  scaleLabel: string;
  scaleFit: string;
  scaleOriginal: string;
  scaleStretch: string;
  swapFiles: string;
  changeFile: string;
  pageLabel: string;
}

interface OverlayOptionsProps {
  options: OverlayOptions;
  onChange: (options: OverlayOptions) => void;
  labels: OverlayLabels;
}

const LAYER_OPTIONS: { value: OverlayLayer; key: keyof OverlayLabels }[] = [
  { value: "above", key: "layerAbove" },
  { value: "below", key: "layerBelow" },
];

const MODE_OPTIONS: { value: OverlayMode; labelKey: keyof OverlayLabels; descKey: keyof OverlayLabels }[] = [
  { value: "repeat-first", labelKey: "modeRepeat", descKey: "modeRepeatDesc" },
  { value: "match", labelKey: "modeMatch", descKey: "modeMatchDesc" },
];

const SCALE_OPTIONS: { value: OverlayScale; key: keyof OverlayLabels }[] = [
  { value: "fit", key: "scaleFit" },
  { value: "original", key: "scaleOriginal" },
  { value: "stretch", key: "scaleStretch" },
];

export function OverlayOptionsComponent({ options, onChange, labels }: OverlayOptionsProps) {
  const update = <K extends keyof OverlayOptions>(key: K, value: OverlayOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-5 rounded-xl border border-border bg-background-card p-4">
      {/* Scale mode */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          {labels.scaleLabel}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SCALE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("scaleMode", opt.value)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                options.scaleMode === opt.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-subtle hover:bg-background-muted"
              }`}
            >
              {labels[opt.key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
