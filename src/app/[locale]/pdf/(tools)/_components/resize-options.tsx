"use client";

import { cn } from "@/lib/utils";
import {
  Maximize2,
  Minimize2,
  Move,
  ArrowUpDown,
} from "lucide-react";
import { PAGE_SIZES, type PageSizePreset, type ScaleMode, type Unit } from "@/lib/pdf/processors/resize";

export type MarginPreset = "none" | "narrow" | "normal" | "wide";

export const MARGIN_VALUES: Record<MarginPreset, number> = {
  none: 0,
  narrow: 5,
  normal: 15,
  wide: 30,
};

export interface ResizeLabels {
  pageSize: string;
  custom: string;
  width: string;
  height: string;
  unit: string;
  mm: string;
  inches: string;
  orientation: string;
  portrait: string;
  landscape: string;
  scaleMode: string;
  fit: string;
  fitDesc: string;
  fill: string;
  fillDesc: string;
  stretch: string;
  stretchDesc: string;
  center: string;
  centerDesc: string;
  margins: string;
  marginNone: string;
  marginNarrow: string;
  marginNormal: string;
  marginWide: string;
}

interface ResizeOptionsProps {
  preset: PageSizePreset | "custom";
  customWidth: number;
  customHeight: number;
  unit: Unit;
  orientation: "portrait" | "landscape";
  scaleMode: ScaleMode;
  marginPreset: MarginPreset;
  onPresetChange: (v: PageSizePreset | "custom") => void;
  onCustomWidthChange: (v: number) => void;
  onCustomHeightChange: (v: number) => void;
  onUnitChange: (v: Unit) => void;
  onOrientationChange: (v: "portrait" | "landscape") => void;
  onScaleModeChange: (v: ScaleMode) => void;
  onMarginPresetChange: (v: MarginPreset) => void;
  labels: ResizeLabels;
}

const scaleModeIcons: Record<ScaleMode, typeof Maximize2> = {
  fit: Minimize2,
  fill: Maximize2,
  stretch: ArrowUpDown,
  center: Move,
};

export function ResizeOptions({
  preset,
  customWidth,
  customHeight,
  unit,
  orientation,
  scaleMode,
  marginPreset,
  onPresetChange,
  onCustomWidthChange,
  onCustomHeightChange,
  onUnitChange,
  onOrientationChange,
  onScaleModeChange,
  onMarginPresetChange,
  labels,
}: ResizeOptionsProps) {

  const presetKeys = Object.keys(PAGE_SIZES) as PageSizePreset[];

  return (
    <div className="space-y-5">
      {/* Page size preset */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.pageSize}
        </p>
        <select
          value={preset}
          onChange={(e) => onPresetChange(e.target.value as PageSizePreset | "custom")}
          className="w-full rounded-lg border border-border bg-background-elevated px-3 py-2.5 text-sm font-bold text-foreground focus:border-accent focus:outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M3%204.5L6%207.5L9%204.5%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
        >
          {presetKeys.map((key) => (
            <option key={key} value={key}>
              {PAGE_SIZES[key].label}
            </option>
          ))}
          <option value="custom">{labels.custom}</option>
        </select>
      </div>

      {/* Custom size inputs */}
      {preset === "custom" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-foreground-subtle">{labels.width}</label>
              <input
                type="number"
                min={1}
                step={unit === "mm" ? 1 : 0.1}
                value={customWidth}
                onChange={(e) => onCustomWidthChange(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs text-foreground-subtle">{labels.height}</label>
              <input
                type="number"
                min={1}
                step={unit === "mm" ? 1 : 0.1}
                value={customHeight}
                onChange={(e) => onCustomHeightChange(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Unit toggle */}
          <div className="flex gap-1">
            {(["mm", "in"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => onUnitChange(u)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-bold transition-colors cursor-pointer",
                  unit === u
                    ? "bg-accent text-white"
                    : "bg-background-muted text-foreground-muted hover:text-foreground",
                )}
              >
                {u === "mm" ? labels.mm : labels.inches}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Orientation */}
      {preset !== "custom" && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
            {labels.orientation}
          </p>
          <div className="flex gap-2">
            {(["portrait", "landscape"] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => onOrientationChange(o)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-bold transition-colors cursor-pointer",
                  orientation === o
                    ? "border-accent bg-accent-muted/30 text-accent"
                    : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
                )}
              >
                <div
                  className={cn(
                    "border-2 rounded-sm",
                    orientation === o ? "border-accent" : "border-foreground-subtle",
                    o === "portrait" ? "w-3 h-4" : "w-4 h-3",
                  )}
                />
                {o === "portrait" ? labels.portrait : labels.landscape}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Margins */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.margins}
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {(["none", "narrow", "normal", "wide"] as const).map((m) => {
            const labelKey = `margin${m.charAt(0).toUpperCase()}${m.slice(1)}` as keyof ResizeLabels;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onMarginPresetChange(m)}
                className={cn(
                  "rounded-lg border px-2 py-2 text-xs font-bold transition-colors cursor-pointer text-center",
                  marginPreset === m
                    ? "border-accent bg-accent-muted/30 text-accent"
                    : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
                )}
              >
                {labels[labelKey]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scale mode */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.scaleMode}
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {(["fit", "fill", "stretch", "center"] as const).map((mode) => {
            const Icon = scaleModeIcons[mode];
            const descKey = `${mode}Desc` as keyof ResizeLabels;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onScaleModeChange(mode)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-bold transition-colors cursor-pointer",
                  scaleMode === mode
                    ? "border-accent bg-accent-muted/30 text-accent"
                    : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{labels[mode]}</span>
                <span className={cn(
                  "text-[10px] font-normal leading-tight",
                  scaleMode === mode ? "text-accent/70" : "text-foreground-subtle",
                )}>
                  {labels[descKey]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
