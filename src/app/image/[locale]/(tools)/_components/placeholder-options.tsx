"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface PlaceholderOptionsValue {
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  text: string;
  format: "png" | "jpg";
}

interface PlaceholderOptionsProps {
  value: PlaceholderOptionsValue;
  onChange: (value: PlaceholderOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["placeholder"];
}

export function PlaceholderOptions({ value, onChange, labels }: PlaceholderOptionsProps) {
  const PRESETS = [
    { label: labels.banner, w: 1200, h: 630 },
    { label: labels.square, w: 800, h: 800 },
    { label: labels.hd, w: 1920, h: 1080 },
    { label: labels.thumb, w: 300, h: 200 },
  ];

  return (
    <div className="space-y-4">
      {/* Size presets */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-2 block">
          {labels.presets}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => onChange({ ...value, width: preset.w, height: preset.h })}
              className={`rounded-md border px-3 py-2 text-xs cursor-pointer transition-colors ${
                value.width === preset.w && value.height === preset.h
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-muted hover:border-foreground/30"
              }`}
            >
              {preset.label} ({preset.w}&times;{preset.h})
            </button>
          ))}
        </div>
      </div>

      {/* Width & Height */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            {labels.width}
          </label>
          <input
            type="number"
            min={1}
            max={4096}
            value={value.width}
            onChange={(e) => onChange({ ...value, width: Number(e.target.value) || 800 })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            {labels.height}
          </label>
          <input
            type="number"
            min={1}
            max={4096}
            value={value.height}
            onChange={(e) => onChange({ ...value, height: Number(e.target.value) || 600 })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Background color */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          {labels.bgColor}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value.bgColor}
            onChange={(e) => onChange({ ...value, bgColor: e.target.value })}
            className="h-8 w-8 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={value.bgColor}
            onChange={(e) => onChange({ ...value, bgColor: e.target.value })}
            className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Text color */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          {labels.textColor}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value.textColor}
            onChange={(e) => onChange({ ...value, textColor: e.target.value })}
            className="h-8 w-8 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={value.textColor}
            onChange={(e) => onChange({ ...value, textColor: e.target.value })}
            className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Custom text */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          {labels.textLabel}
        </label>
        <input
          type="text"
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          placeholder={`${value.width} x ${value.height}`}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>

      {/* Format */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-2 block">
          {labels.format}
        </label>
        <div className="flex gap-2">
          {(["png", "jpg"] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => onChange({ ...value, format: fmt })}
              className={`flex-1 rounded-md border px-3 py-2 text-sm uppercase cursor-pointer transition-colors ${
                value.format === fmt
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-muted hover:border-foreground/30"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getDefaultPlaceholderOptions(): PlaceholderOptionsValue {
  return {
    width: 800,
    height: 600,
    bgColor: "#cccccc",
    textColor: "#666666",
    text: "",
    format: "png",
  };
}
