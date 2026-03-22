"use client";

export interface PixelateOptionsValue {
  pixelSize: number;
}

interface PixelateOptionsProps {
  value: PixelateOptionsValue;
  onChange: (value: PixelateOptionsValue) => void;
}

export function PixelateOptions({ value, onChange }: PixelateOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Pixel Size
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.pixelSize}px
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={100}
          step={1}
          value={value.pixelSize}
          onChange={(e) => onChange({ ...value, pixelSize: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Fine</span>
          <span>Blocky</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultPixelateOptions(): PixelateOptionsValue {
  return { pixelSize: 10 };
}
