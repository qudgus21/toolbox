"use client";

export interface BlurOptionsValue {
  radius: number;
}

interface BlurOptionsProps {
  value: BlurOptionsValue;
  onChange: (value: BlurOptionsValue) => void;
}

export function BlurOptions({ value, onChange }: BlurOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Blur Radius
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.radius}px
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={50}
          step={1}
          value={value.radius}
          onChange={(e) => onChange({ ...value, radius: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Subtle</span>
          <span>Heavy</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultBlurOptions(): BlurOptionsValue {
  return { radius: 5 };
}
