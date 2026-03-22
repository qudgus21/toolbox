"use client";

export interface NoiseOptionsValue {
  amount: number;
  monochrome: boolean;
}

interface NoiseOptionsProps {
  value: NoiseOptionsValue;
  onChange: (value: NoiseOptionsValue) => void;
}

export function NoiseOptions({ value, onChange }: NoiseOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Amount
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.amount}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.amount}
          onChange={(e) => onChange({ ...value, amount: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Subtle</span>
          <span>Heavy</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="noise-monochrome"
          checked={value.monochrome}
          onChange={(e) => onChange({ ...value, monochrome: e.target.checked })}
          className="accent-accent"
        />
        <label htmlFor="noise-monochrome" className="text-xs font-medium text-foreground-muted cursor-pointer">
          Monochrome noise
        </label>
      </div>
    </div>
  );
}

export function getDefaultNoiseOptions(): NoiseOptionsValue {
  return { amount: 30, monochrome: false };
}
