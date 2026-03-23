"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface GradientOptionsValue {
  type: "linear" | "radial" | "conic";
  colors: string[];
  angle: number;
  width: number;
  height: number;
}

interface GradientOptionsProps {
  value: GradientOptionsValue;
  onChange: (value: GradientOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["gradient"];
}

export function GradientOptions({ value, onChange, labels }: GradientOptionsProps) {
  const TYPE_LABELS: Record<string, string> = {
    linear: labels.linear,
    radial: labels.radial,
    conic: labels.conic,
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...value.colors];
    newColors[index] = color;
    onChange({ ...value, colors: newColors });
  };

  const addColor = () => {
    if (value.colors.length < 4) {
      onChange({ ...value, colors: [...value.colors, "#00ff00"] });
    }
  };

  const removeColor = (index: number) => {
    if (value.colors.length > 2) {
      onChange({ ...value, colors: value.colors.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-4">
      {/* Gradient type */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-2 block">
          {labels.type}
        </label>
        <div className="flex gap-2">
          {(["linear", "radial", "conic"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...value, type: t })}
              className={`flex-1 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                value.type === t
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-muted hover:border-foreground/30"
              }`}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.colors}
          </label>
          {value.colors.length < 4 && (
            <button
              onClick={addColor}
              className="text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              {labels.addColor}
            </button>
          )}
        </div>
        <div className="space-y-2">
          {value.colors.map((color, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="h-8 w-8 rounded border border-border cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              {value.colors.length > 2 && (
                <button
                  onClick={() => removeColor(i)}
                  className="text-foreground-muted hover:text-foreground transition-colors cursor-pointer text-sm"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Angle (for linear and conic) */}
      {(value.type === "linear" || value.type === "conic") && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-foreground-muted">
              {labels.angle}
            </label>
            <span className="text-sm font-semibold text-foreground">
              {value.angle}&deg;
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={value.angle}
            onChange={(e) => onChange({ ...value, angle: Number(e.target.value) })}
            className="w-full accent-accent"
          />
        </div>
      )}

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
            onChange={(e) => onChange({ ...value, height: Number(e.target.value) || 600 })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Preview swatch */}
      <div
        className="h-16 rounded-md border border-border"
        style={{
          background:
            value.type === "radial"
              ? `radial-gradient(circle, ${value.colors.join(", ")})`
              : value.type === "conic"
                ? `conic-gradient(from ${value.angle}deg, ${value.colors.join(", ")})`
                : `linear-gradient(${value.angle}deg, ${value.colors.join(", ")})`,
        }}
      />
    </div>
  );
}

export function getDefaultGradientOptions(): GradientOptionsValue {
  return {
    type: "linear",
    colors: ["#667eea", "#764ba2"],
    angle: 135,
    width: 800,
    height: 600,
  };
}
