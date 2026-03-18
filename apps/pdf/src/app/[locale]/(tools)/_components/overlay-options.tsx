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
      {/* Layer position */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          {labels.layerLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {LAYER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("layer", opt.value)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                options.layer === opt.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-subtle hover:bg-background-muted"
              }`}
            >
              {labels[opt.key]}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay mode */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          {labels.modeLabel}
        </label>
        <div className="space-y-2">
          {MODE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("overlayMode", opt.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                options.overlayMode === opt.value
                  ? "border-accent bg-accent/10"
                  : "border-border hover:bg-background-muted"
              }`}
            >
              <span className={`block text-sm font-medium ${
                options.overlayMode === opt.value ? "text-accent" : "text-foreground"
              }`}>
                {labels[opt.labelKey]}
              </span>
              <span className="block text-xs text-foreground-subtle mt-0.5">
                {labels[opt.descKey]}
              </span>
            </button>
          ))}
        </div>
      </div>

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
