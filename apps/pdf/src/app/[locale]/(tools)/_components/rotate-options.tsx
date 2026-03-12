"use client";

import { cn } from "@toolbox/utils";
import { RotateCw, RotateCcw } from "lucide-react";

export interface RotateLabels {
  dropFile: string;
  changeFile: string;
  rotatedCount: string;
  rotateCw: string;
  rotateCcw: string;
  rotateAllCw: string;
  rotateAllCcw: string;
  resetAll: string;
  noChanges: string;
  pages: string;
  rotate: string;
}

interface RotateOptionsProps {
  pageCount: number;
  rotations: Record<string, number>;
  onRotateCwAll: () => void;
  onRotateCcwAll: () => void;
  onResetAll: () => void;
  labels: RotateLabels;
}

export function RotateOptions({
  pageCount,
  rotations,
  onRotateCwAll,
  onRotateCcwAll,
  onResetAll,
  labels,
}: RotateOptionsProps) {
  const rotatedCount = Object.values(rotations).filter((r) => r > 0).length;
  const hasAnyChange = rotatedCount > 0;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div
        className={cn(
          "rounded-xl border px-4 py-3 space-y-2",
          hasAnyChange
            ? "border-accent/30 bg-accent-muted/30"
            : "border-border bg-background-muted",
        )}
      >
        {!hasAnyChange ? (
          <p className="text-sm text-foreground-subtle">{labels.noChanges}</p>
        ) : (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-foreground-muted">
              <RotateCw className="h-3.5 w-3.5 text-accent" />
              {labels.rotatedCount}
            </span>
            <span className="text-accent font-bold text-lg">
              {rotatedCount}
              <span className="text-xs font-normal text-foreground-muted ml-1">
                / {pageCount} {labels.pages}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.rotate}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRotateCwAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCw className="h-3 w-3" />
            {labels.rotateAllCw}
          </button>
          <button
            type="button"
            onClick={onRotateCcwAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            {labels.rotateAllCcw}
          </button>
        </div>
      </div>

      {/* Reset */}
      <div className="pt-2 border-t border-border">
        <button
          type="button"
          onClick={onResetAll}
          disabled={!hasAnyChange}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="h-3 w-3" />
          {labels.resetAll}
        </button>
      </div>
    </div>
  );
}
