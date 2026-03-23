"use client";

import { useCallback, useEffect, useState } from "react";
import { Link2, Link2Off } from "lucide-react";
import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface ResizeOptionsValue {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

interface ResizeOptionsProps {
  originalWidth: number;
  originalHeight: number;
  value: ResizeOptionsValue;
  onChange: (value: ResizeOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["resize"];
}

export function ResizeOptions({
  originalWidth,
  originalHeight,
  value,
  onChange,
  labels,
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
        {labels.original} {originalWidth} &times; {originalHeight} px
      </div>

      {/* Width & Height inputs with lock toggle */}
      <div className="flex items-center gap-2">
        {/* Width */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            {labels.widthPx}
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
          title={value.maintainAspectRatio ? labels.unlockAspect : labels.lockAspect}
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
            {labels.heightPx}
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
  };
}
