"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface MemeOptionsValue {
  topText: string;
  bottomText: string;
  fontSize: number;
  autoFontSize: boolean;
  textColor: string;
  strokeColor: string;
}

interface MemeOptionsProps {
  value: MemeOptionsValue;
  onChange: (value: MemeOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["meme"];
}

export function MemeOptions({ value, onChange, labels }: MemeOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Top text */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.topText}
        </label>
        <input
          type="text"
          value={value.topText}
          onChange={(e) => onChange({ ...value, topText: e.target.value })}
          placeholder={labels.topTextPlaceholder}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Bottom text */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.bottomText}
        </label>
        <input
          type="text"
          value={value.bottomText}
          onChange={(e) => onChange({ ...value, bottomText: e.target.value })}
          placeholder={labels.bottomTextPlaceholder}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Font size */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.fontSize}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...value, autoFontSize: !value.autoFontSize })}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
                value.autoFontSize
                  ? "bg-accent/10 text-accent"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {labels.auto}
            </button>
            {!value.autoFontSize && (
              <span className="text-sm font-semibold text-foreground">
                {value.fontSize}px
              </span>
            )}
          </div>
        </div>
        {!value.autoFontSize && (
          <input
            type="range"
            min={10}
            max={200}
            step={1}
            value={value.fontSize}
            onChange={(e) => onChange({ ...value, fontSize: Number(e.target.value) })}
            className="w-full accent-accent"
          />
        )}
      </div>

      {/* Text color */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.textColor}
        </label>
        <input
          type="color"
          value={value.textColor}
          onChange={(e) => onChange({ ...value, textColor: e.target.value })}
          className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent"
        />
      </div>

      {/* Stroke color */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.strokeColor}
        </label>
        <input
          type="color"
          value={value.strokeColor}
          onChange={(e) => onChange({ ...value, strokeColor: e.target.value })}
          className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent"
        />
      </div>
    </div>
  );
}

export function getDefaultMemeOptions(): MemeOptionsValue {
  return {
    topText: "",
    bottomText: "",
    fontSize: 48,
    autoFontSize: true,
    textColor: "#ffffff",
    strokeColor: "#000000",
  };
}
