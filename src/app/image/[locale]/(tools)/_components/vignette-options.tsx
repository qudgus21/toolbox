"use client";

export interface VignetteOptionsValue {
  intensity: number;
  radius: number;
}

interface VignetteOptionsProps {
  value: VignetteOptionsValue;
  onChange: (value: VignetteOptionsValue) => void;
}

export function VignetteOptions({ value, onChange }: VignetteOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Intensity
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.intensity}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.intensity}
          onChange={(e) => onChange({ ...value, intensity: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Subtle</span>
          <span>Heavy</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Radius
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.radius}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.radius}
          onChange={(e) => onChange({ ...value, radius: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultVignetteOptions(): VignetteOptionsValue {
  return { intensity: 50, radius: 70 };
}
