"use client";

export interface PatternOptionsValue {
  type: "stripes" | "dots" | "checkerboard" | "grid" | "diagonal";
  color1: string;
  color2: string;
  width: number;
  height: number;
  spacing: number;
}

interface PatternOptionsProps {
  value: PatternOptionsValue;
  onChange: (value: PatternOptionsValue) => void;
}

const PATTERN_TYPES = [
  { value: "stripes", label: "Stripes" },
  { value: "dots", label: "Dots" },
  { value: "checkerboard", label: "Checker" },
  { value: "grid", label: "Grid" },
  { value: "diagonal", label: "Diagonal" },
] as const;

export function PatternOptions({ value, onChange }: PatternOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Pattern type */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-2 block">
          Pattern Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PATTERN_TYPES.map((pt) => (
            <button
              key={pt.value}
              onClick={() => onChange({ ...value, type: pt.value })}
              className={`rounded-md border px-2 py-2 text-xs cursor-pointer transition-colors ${
                value.type === pt.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-muted hover:border-foreground/30"
              }`}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            Color 1
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.color1}
              onChange={(e) => onChange({ ...value, color1: e.target.value })}
              className="h-8 w-8 rounded border border-border cursor-pointer"
            />
            <span className="text-xs text-foreground-muted font-mono">{value.color1}</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            Color 2
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.color2}
              onChange={(e) => onChange({ ...value, color2: e.target.value })}
              className="h-8 w-8 rounded border border-border cursor-pointer"
            />
            <span className="text-xs text-foreground-muted font-mono">{value.color2}</span>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Spacing
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.spacing}px
          </span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          step={1}
          value={value.spacing}
          onChange={(e) => onChange({ ...value, spacing: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Width & Height */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            Width
          </label>
          <input
            type="number"
            min={100}
            max={4096}
            value={value.width}
            onChange={(e) => onChange({ ...value, width: Number(e.target.value) || 800 })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            Height
          </label>
          <input
            type="number"
            min={100}
            max={4096}
            value={value.height}
            onChange={(e) => onChange({ ...value, height: Number(e.target.value) || 800 })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>
    </div>
  );
}

export function getDefaultPatternOptions(): PatternOptionsValue {
  return {
    type: "stripes",
    color1: "#ffffff",
    color2: "#000000",
    width: 800,
    height: 800,
    spacing: 20,
  };
}
