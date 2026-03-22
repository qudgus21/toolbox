"use client";

export interface SplitOptionsValue {
  rows: number;
  cols: number;
}

interface SplitOptionsProps {
  value: SplitOptionsValue;
  onChange: (value: SplitOptionsValue) => void;
}

export function SplitOptions({ value, onChange }: SplitOptionsProps) {
  const total = value.rows * value.cols;

  return (
    <div className="space-y-4">
      {/* Rows */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Rows
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.rows}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value.rows}
          onChange={(e) => onChange({ ...value, rows: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Cols */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Columns
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.cols}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value.cols}
          onChange={(e) => onChange({ ...value, cols: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Preview */}
      <div className="rounded-md border border-border bg-background-subtle p-3 text-center">
        <span className="text-xs text-foreground-muted">Output: </span>
        <span className="text-sm font-semibold text-foreground">
          {value.rows}&times;{value.cols} = {total} images
        </span>
      </div>

      {/* Visual grid preview */}
      <div className="flex justify-center">
        <div
          className="grid gap-0.5 w-32 h-32 border border-border rounded-md overflow-hidden"
          style={{
            gridTemplateRows: `repeat(${value.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${value.cols}, 1fr)`,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="bg-accent/20 border border-accent/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function getDefaultSplitOptions(): SplitOptionsValue {
  return { rows: 2, cols: 2 };
}
