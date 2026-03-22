"use client";

import { cn } from "@/lib/utils";
import { PAGE_SIZES, type PageSizePreset } from "@/lib/pdf/processors/resize";

// ── Types ────────────────────────────────────────────────────────

export type NupCount = 2 | 4 | 6 | 9 | 16;
export type PageOrder = "left-to-right" | "right-to-left" | "top-to-bottom";
export type NupOrientation = "portrait" | "landscape" | "auto";

export type NupFileMode = "merge" | "new-sheet";

export interface PagesPerSheetLabels {
  pagesPerSheet: string;
  sheetSize: string;
  orientation: string;
  portrait: string;
  landscape: string;
  auto: string;
  pageOrder: string;
  leftToRight: string;
  rightToLeft: string;
  topToBottom: string;
  gap: string;
  gapUnit: string;
  border: string;
  borderOn: string;
  borderOff: string;
  changeFile: string;
  pageOf: string;
  sheets: string;
  fileMode: string;
  fileModeNewSheet: string;
  fileModeMerge: string;
}

interface PagesPerSheetOptionsProps {
  nup: NupCount;
  sheetSize: PageSizePreset;
  orientation: NupOrientation;
  pageOrder: PageOrder;
  gap: number;
  border: boolean;
  fileMode: NupFileMode;
  fileCount: number;
  onNupChange: (v: NupCount) => void;
  onSheetSizeChange: (v: PageSizePreset) => void;
  onOrientationChange: (v: NupOrientation) => void;
  onPageOrderChange: (v: PageOrder) => void;
  onGapChange: (v: number) => void;
  onBorderChange: (v: boolean) => void;
  onFileModeChange: (v: NupFileMode) => void;
  labels: PagesPerSheetLabels;
}

// ── Grid preview mini-component ──────────────────────────────────

const NUP_OPTIONS: NupCount[] = [2, 4, 6, 9, 16];

function NupGridPreview({ n, selected }: { n: NupCount; selected: boolean }) {
  const gridMap: Record<NupCount, { cols: number; rows: number }> = {
    2: { cols: 2, rows: 1 },
    4: { cols: 2, rows: 2 },
    6: { cols: 3, rows: 2 },
    9: { cols: 3, rows: 3 },
    16: { cols: 4, rows: 4 },
  };
  const { cols, rows } = gridMap[n];

  return (
    <div
      className="grid gap-[2px] w-8 h-8"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-[1px]",
            selected ? "bg-accent" : "bg-foreground-subtle/40",
          )}
        />
      ))}
    </div>
  );
}

// ── Main options component ───────────────────────────────────────

export function PagesPerSheetOptions({
  nup,
  sheetSize,
  orientation,
  pageOrder,
  gap,
  border,
  fileMode,
  fileCount,
  onNupChange,
  onSheetSizeChange,
  onOrientationChange,
  onPageOrderChange,
  onGapChange,
  onBorderChange,
  onFileModeChange,
  labels,
}: PagesPerSheetOptionsProps) {
  const presetKeys = Object.keys(PAGE_SIZES) as PageSizePreset[];

  return (
    <div className="space-y-5">
      {/* Pages per sheet selector */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.pagesPerSheet}
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {NUP_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onNupChange(n)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 transition-colors cursor-pointer",
                nup === n
                  ? "border-accent bg-accent-muted/30 text-accent"
                  : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
              )}
            >
              <NupGridPreview n={n} selected={nup === n} />
              <span className="text-xs font-bold">{n}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sheet size */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.sheetSize}
        </p>
        <select
          value={sheetSize}
          onChange={(e) => onSheetSizeChange(e.target.value as PageSizePreset)}
          className="w-full rounded-lg border border-border bg-background-elevated px-3 py-2.5 text-sm font-bold text-foreground focus:border-accent focus:outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M3%204.5L6%207.5L9%204.5%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
        >
          {presetKeys.map((key) => (
            <option key={key} value={key}>
              {PAGE_SIZES[key].label}
            </option>
          ))}
        </select>
      </div>

      {/* Orientation */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.orientation}
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {(["auto", "portrait", "landscape"] as const).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => onOrientationChange(o)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-bold transition-colors cursor-pointer",
                orientation === o
                  ? "border-accent bg-accent-muted/30 text-accent"
                  : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
              )}
            >
              {o === "auto" && (
                <div className="flex gap-0.5">
                  <div className={cn("border-2 rounded-sm w-2.5 h-3", orientation === o ? "border-accent" : "border-foreground-subtle")} />
                  <div className={cn("border-2 rounded-sm w-3 h-2.5", orientation === o ? "border-accent" : "border-foreground-subtle")} />
                </div>
              )}
              {o === "portrait" && (
                <div className={cn("border-2 rounded-sm w-3 h-4", orientation === o ? "border-accent" : "border-foreground-subtle")} />
              )}
              {o === "landscape" && (
                <div className={cn("border-2 rounded-sm w-4 h-3", orientation === o ? "border-accent" : "border-foreground-subtle")} />
              )}
              {labels[o]}
            </button>
          ))}
        </div>
      </div>

      {/* Page order */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.pageOrder}
        </p>
        <select
          value={pageOrder}
          onChange={(e) => onPageOrderChange(e.target.value as PageOrder)}
          className="w-full rounded-lg border border-border bg-background-elevated px-3 py-2.5 text-sm font-bold text-foreground focus:border-accent focus:outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M3%204.5L6%207.5L9%204.5%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
        >
          <option value="left-to-right">{labels.leftToRight}</option>
          <option value="right-to-left">{labels.rightToLeft}</option>
          <option value="top-to-bottom">{labels.topToBottom}</option>
        </select>
      </div>

      {/* Gap (spacing) */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.gap}
        </p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={15}
            step={1}
            value={gap}
            onChange={(e) => onGapChange(parseInt(e.target.value, 10))}
            className="flex-1 accent-accent cursor-pointer"
          />
          <span className="text-sm font-bold text-foreground tabular-nums w-16 text-right">
            {gap} {labels.gapUnit}
          </span>
        </div>
      </div>

      {/* Border toggle */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.border}
        </p>
        <div className="flex gap-2">
          {([true, false] as const).map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => onBorderChange(v)}
              className={cn(
                "flex-1 rounded-lg border px-3 py-2.5 text-xs font-bold transition-colors cursor-pointer",
                border === v
                  ? "border-accent bg-accent-muted/30 text-accent"
                  : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
              )}
            >
              {v ? labels.borderOn : labels.borderOff}
            </button>
          ))}
        </div>
      </div>

      {/* File mode toggle — only show when multiple files */}
      {fileCount > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
            {labels.fileMode}
          </p>
          <div className="flex gap-2">
            {(["merge", "new-sheet"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onFileModeChange(mode)}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2.5 text-xs font-bold transition-colors cursor-pointer",
                  fileMode === mode
                    ? "border-accent bg-accent-muted/30 text-accent"
                    : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
                )}
              >
                {mode === "merge" ? labels.fileModeMerge : labels.fileModeNewSheet}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
