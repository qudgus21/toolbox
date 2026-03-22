"use client";

import { useCallback, useEffect, useState } from "react";
import { Link2, Link2Off } from "lucide-react";

export interface ResizeOptionsValue {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  mode: "fit" | "fill" | "stretch";
}

interface ResizeOptionsProps {
  originalWidth: number;
  originalHeight: number;
  value: ResizeOptionsValue;
  onChange: (value: ResizeOptionsValue) => void;
}

const MODES = [
  { value: "fit" as const, label: "Fit", desc: "Scale to fit within bounds" },
  { value: "fill" as const, label: "Fill", desc: "Cover the area, crop overflow" },
  { value: "stretch" as const, label: "Stretch", desc: "Stretch to exact size" },
];

export function ResizeOptions({
  originalWidth,
  originalHeight,
  value,
  onChange,
}: ResizeOptionsProps) {
  const aspectRatio = originalWidth > 0 ? originalWidth / originalHeight : 1;

  const handleWidthChange = useCallback(
    (w: number) => {
      if (value.maintainAspectRatio && w > 0) {
        onChange({ ...value, width: w, height: Math.round(w / aspectRatio) });
      } else {
        onChange({ ...value, width: w });
      }
    },
    [value, onChange, aspectRatio],
  );

  const handleHeightChange = useCallback(
    (h: number) => {
      if (value.maintainAspectRatio && h > 0) {
        onChange({ ...value, height: h, width: Math.round(h * aspectRatio) });
      } else {
        onChange({ ...value, height: h });
      }
    },
    [value, onChange, aspectRatio],
  );

  const toggleAspectRatio = useCallback(() => {
    const next = !value.maintainAspectRatio;
    if (next && value.width > 0) {
      // Re-lock: recalculate height based on current width
      onChange({
        ...value,
        maintainAspectRatio: next,
        height: Math.round(value.width / aspectRatio),
      });
    } else {
      onChange({ ...value, maintainAspectRatio: next });
    }
  }, [value, onChange, aspectRatio]);

  return (
    <div className="space-y-5">
      {/* Original dimensions */}
      <div className="text-sm text-foreground-muted">
        Original: {originalWidth} &times; {originalHeight} px
      </div>

      {/* Width & Height inputs with lock toggle */}
      <div className="flex items-center gap-2">
        {/* Width */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            Width (px)
          </label>
          <input
            type="number"
            min={1}
            max={99999}
            value={value.width || ""}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Aspect ratio lock button */}
        <button
          type="button"
          onClick={toggleAspectRatio}
          className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border hover:bg-background-subtle transition-colors cursor-pointer"
          title={value.maintainAspectRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
        >
          {value.maintainAspectRatio ? (
            <Link2 className="h-4 w-4 text-accent" />
          ) : (
            <Link2Off className="h-4 w-4 text-foreground-muted" />
          )}
        </button>

        {/* Height */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            Height (px)
          </label>
          <input
            type="number"
            min={1}
            max={99999}
            value={value.height || ""}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Mode selector */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          Resize Mode
        </label>
        <div className="flex gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => onChange({ ...value, mode: m.value })}
              className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                value.mode === m.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
              title={m.desc}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-foreground-muted">
          {MODES.find((m) => m.value === value.mode)?.desc}
        </p>
      </div>
    </div>
  );
}

export function getDefaultResizeOptions(
  originalWidth: number,
  originalHeight: number,
): ResizeOptionsValue {
  return {
    width: originalWidth,
    height: originalHeight,
    maintainAspectRatio: true,
    mode: "fit",
  };
}
