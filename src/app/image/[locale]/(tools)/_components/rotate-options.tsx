"use client";

import { RotateCcw, RotateCw } from "lucide-react";

export interface RotateOptionsValue {
  angle: number;
  backgroundColor: string;
}

interface RotateOptionsProps {
  value: RotateOptionsValue;
  onChange: (value: RotateOptionsValue) => void;
}

const QUICK_ROTATIONS = [
  { label: "90\u00B0 CCW", angle: 270, icon: RotateCcw },
  { label: "180\u00B0", angle: 180, icon: RotateCw },
  { label: "90\u00B0 CW", angle: 90, icon: RotateCw },
];

const BACKGROUND_COLORS = [
  { label: "Transparent", value: "transparent" },
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
];

export function RotateOptions({ value, onChange }: RotateOptionsProps) {
  const isNon90 = value.angle % 90 !== 0;

  return (
    <div className="space-y-5">
      {/* Quick rotation buttons */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          Quick Rotate
        </label>
        <div className="flex gap-2">
          {QUICK_ROTATIONS.map((r) => {
            const Icon = r.icon;
            const isActive = value.angle === r.angle;
            return (
              <button
                key={r.angle}
                type="button"
                onClick={() => onChange({ ...value, angle: isActive ? 0 : r.angle })}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom angle */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          Custom Angle: {value.angle}\u00B0
        </label>
        <input
          type="range"
          min={0}
          max={360}
          step={1}
          value={value.angle}
          onChange={(e) => onChange({ ...value, angle: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>0\u00B0</span>
          <span>90\u00B0</span>
          <span>180\u00B0</span>
          <span>270\u00B0</span>
          <span>360\u00B0</span>
        </div>
      </div>

      {/* Angle number input */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          Angle (degrees)
        </label>
        <input
          type="number"
          min={0}
          max={360}
          value={value.angle}
          onChange={(e) => {
            const v = Math.max(0, Math.min(360, Number(e.target.value)));
            onChange({ ...value, angle: v });
          }}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Background color (for non-90 degree rotations) */}
      {isNon90 && (
        <div>
          <label className="block text-xs font-medium text-foreground-muted mb-2">
            Background Color
          </label>
          <div className="flex gap-2">
            {BACKGROUND_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange({ ...value, backgroundColor: c.value })}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  value.backgroundColor === c.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
                }`}
              >
                <span
                  className="inline-block h-3 w-3 rounded-full border border-border"
                  style={{
                    backgroundColor: c.value === "transparent" ? undefined : c.value,
                    backgroundImage:
                      c.value === "transparent"
                        ? "conic-gradient(#ccc 25%, #fff 25% 50%, #ccc 50% 75%, #fff 75%)"
                        : undefined,
                    backgroundSize: c.value === "transparent" ? "6px 6px" : undefined,
                  }}
                />
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <label className="text-xs text-foreground-muted">Custom:</label>
            <input
              type="color"
              value={value.backgroundColor === "transparent" ? "#ffffff" : value.backgroundColor}
              onChange={(e) => onChange({ ...value, backgroundColor: e.target.value })}
              className="h-7 w-10 cursor-pointer rounded border border-border bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function getDefaultRotateOptions(): RotateOptionsValue {
  return {
    angle: 90,
    backgroundColor: "transparent",
  };
}
