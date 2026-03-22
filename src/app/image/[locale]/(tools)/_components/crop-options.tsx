"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface CropOptionsValue {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: number | null; // null = free
}

interface CropOptionsProps {
  value: CropOptionsValue;
  onChange: (value: CropOptionsValue) => void;
  originalWidth: number;
  originalHeight: number;
  labels: ImageDictionary["toolOptions"]["crop"];
}

export function CropOptions({
  value,
  onChange,
  originalWidth,
  originalHeight,
  labels,
}: CropOptionsProps) {
  const PRESETS: { label: string; ratio: number | null }[] = [
    { label: labels.free, ratio: null },
    { label: "1:1", ratio: 1 },
    { label: "4:3", ratio: 4 / 3 },
    { label: "16:9", ratio: 16 / 9 },
    { label: "3:2", ratio: 3 / 2 },
    { label: "9:16", ratio: 9 / 16 },
    { label: "3:4", ratio: 3 / 4 },
  ];

  const handlePreset = (ratio: number | null) => {
    if (ratio === null) {
      onChange({ ...value, aspectRatio: null });
      return;
    }

    // Recalculate crop area to match the new aspect ratio, centered
    let newW: number;
    let newH: number;

    if (originalWidth / originalHeight > ratio) {
      // Image is wider than the ratio
      newH = originalHeight;
      newW = Math.round(originalHeight * ratio);
    } else {
      newW = originalWidth;
      newH = Math.round(originalWidth / ratio);
    }

    // Ensure it fits
    newW = Math.min(newW, originalWidth);
    newH = Math.min(newH, originalHeight);

    const newX = Math.round((originalWidth - newW) / 2);
    const newY = Math.round((originalHeight - newH) / 2);

    onChange({
      x: newX,
      y: newY,
      width: newW,
      height: newH,
      aspectRatio: ratio,
    });
  };

  return (
    <div className="space-y-4">
      {/* Aspect ratio presets */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          {labels.aspectRatio}
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePreset(preset.ratio)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                value.aspectRatio === preset.ratio
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crop dimensions display */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            {labels.x}
          </label>
          <input
            type="number"
            min={0}
            max={originalWidth}
            value={Math.round(value.x)}
            onChange={(e) => onChange({ ...value, x: Number(e.target.value) })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            {labels.y}
          </label>
          <input
            type="number"
            min={0}
            max={originalHeight}
            value={Math.round(value.y)}
            onChange={(e) => onChange({ ...value, y: Number(e.target.value) })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            {labels.width}
          </label>
          <input
            type="number"
            min={1}
            max={originalWidth}
            value={Math.round(value.width)}
            onChange={(e) => {
              const w = Number(e.target.value);
              if (value.aspectRatio) {
                onChange({ ...value, width: w, height: Math.round(w / value.aspectRatio) });
              } else {
                onChange({ ...value, width: w });
              }
            }}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            {labels.height}
          </label>
          <input
            type="number"
            min={1}
            max={originalHeight}
            value={Math.round(value.height)}
            onChange={(e) => {
              const h = Number(e.target.value);
              if (value.aspectRatio) {
                onChange({ ...value, height: h, width: Math.round(h * value.aspectRatio) });
              } else {
                onChange({ ...value, height: h });
              }
            }}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
    </div>
  );
}

export function getDefaultCropOptions(
  originalWidth: number,
  originalHeight: number,
): CropOptionsValue {
  return {
    x: 0,
    y: 0,
    width: originalWidth,
    height: originalHeight,
    aspectRatio: null,
  };
}
