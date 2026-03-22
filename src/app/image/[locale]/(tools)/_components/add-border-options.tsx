"use client";

export interface AddBorderOptionsValue {
  borderWidth: number;
  borderColor: string;
  borderStyle: "solid" | "double" | "rounded";
  borderRadius: number;
}

interface AddBorderOptionsProps {
  value: AddBorderOptionsValue;
  onChange: (value: AddBorderOptionsValue) => void;
}

const STYLES = [
  { value: "solid" as const, label: "Solid" },
  { value: "double" as const, label: "Double" },
  { value: "rounded" as const, label: "Rounded" },
];

export function AddBorderOptions({ value, onChange }: AddBorderOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Border width */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Border Width
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.borderWidth}px
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={value.borderWidth}
          onChange={(e) => onChange({ ...value, borderWidth: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Border color */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          Border Color
        </label>
        <input
          type="color"
          value={value.borderColor}
          onChange={(e) => onChange({ ...value, borderColor: e.target.value })}
          className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent"
        />
      </div>

      {/* Border style */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          Border Style
        </label>
        <div className="flex gap-2">
          {STYLES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange({ ...value, borderStyle: s.value })}
              className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                value.borderStyle === s.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Border radius (only for rounded style) */}
      {value.borderStyle === "rounded" && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-foreground-muted">
              Border Radius
            </label>
            <span className="text-sm font-semibold text-foreground">
              {value.borderRadius}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={value.borderRadius}
            onChange={(e) => onChange({ ...value, borderRadius: Number(e.target.value) })}
            className="w-full accent-accent"
          />
        </div>
      )}
    </div>
  );
}

export function getDefaultAddBorderOptions(): AddBorderOptionsValue {
  return {
    borderWidth: 20,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 0,
  };
}
