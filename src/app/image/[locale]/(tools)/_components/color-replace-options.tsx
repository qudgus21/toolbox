"use client";

export interface ColorReplaceOptionsValue {
  sourceColor: string;
  targetColor: string;
  tolerance: number;
}

interface ColorReplaceOptionsProps {
  value: ColorReplaceOptionsValue;
  onChange: (value: ColorReplaceOptionsValue) => void;
}

export function ColorReplaceOptions({ value, onChange }: ColorReplaceOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          Source Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value.sourceColor}
            onChange={(e) => onChange({ ...value, sourceColor: e.target.value })}
            className="h-8 w-12 cursor-pointer rounded border border-border"
          />
          <span className="text-sm text-foreground font-mono">{value.sourceColor}</span>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          Target Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value.targetColor}
            onChange={(e) => onChange({ ...value, targetColor: e.target.value })}
            className="h-8 w-12 cursor-pointer rounded border border-border"
          />
          <span className="text-sm text-foreground font-mono">{value.targetColor}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Tolerance
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.tolerance}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.tolerance}
          onChange={(e) => onChange({ ...value, tolerance: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Exact</span>
          <span>Wide</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultColorReplaceOptions(): ColorReplaceOptionsValue {
  return { sourceColor: "#ff0000", targetColor: "#0000ff", tolerance: 30 };
}
