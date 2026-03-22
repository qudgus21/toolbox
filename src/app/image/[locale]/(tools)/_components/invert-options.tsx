"use client";

export interface InvertOptionsValue {
  strength: number;
}

interface InvertOptionsProps {
  value: InvertOptionsValue;
  onChange: (value: InvertOptionsValue) => void;
}

export function InvertOptions({ value, onChange }: InvertOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Strength
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.strength}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.strength}
          onChange={(e) => onChange({ ...value, strength: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Subtle</span>
          <span>Full</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultInvertOptions(): InvertOptionsValue {
  return { strength: 100 };
}
