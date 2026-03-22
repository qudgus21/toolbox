"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

const ALL_SIZES = [16, 32, 48, 64, 128, 256, 512];

export interface ImageToIconOptionsValue {
  sizes: number[];
}

interface ImageToIconOptionsProps {
  value: ImageToIconOptionsValue;
  onChange: (value: ImageToIconOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["imageToIcon"];
}

export function ImageToIconOptions({ value, onChange, labels }: ImageToIconOptionsProps) {
  const allSelected = value.sizes.length === ALL_SIZES.length;

  const toggleSize = (size: number) => {
    const newSizes = value.sizes.includes(size)
      ? value.sizes.filter((s) => s !== size)
      : [...value.sizes, size].sort((a, b) => a - b);
    if (newSizes.length > 0) {
      onChange({ ...value, sizes: newSizes });
    }
  };

  const toggleAll = () => {
    onChange({ ...value, sizes: allSelected ? [32] : [...ALL_SIZES] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-medium text-foreground-muted">
          {labels.iconSizes}
        </label>
        <button
          onClick={toggleAll}
          className="text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer"
        >
          {allSelected ? labels.deselectAll : labels.selectAll}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {ALL_SIZES.map((size) => (
          <label
            key={size}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-background-subtle transition-colors"
          >
            <input
              type="checkbox"
              checked={value.sizes.includes(size)}
              onChange={() => toggleSize(size)}
              className="accent-accent"
            />
            <span className="text-sm text-foreground">
              {size} &times; {size}
            </span>
          </label>
        ))}
      </div>

      <div className="rounded-md border border-border bg-background-subtle p-3 text-center">
        <span className="text-xs text-foreground-muted">{labels.output} </span>
        <span className="text-sm font-semibold text-foreground">
          {labels.outputDesc}
        </span>
      </div>
    </div>
  );
}

export function getDefaultImageToIconOptions(): ImageToIconOptionsValue {
  return { sizes: [...ALL_SIZES] };
}
