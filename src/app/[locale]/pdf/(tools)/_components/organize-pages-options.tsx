"use client";

import { cn } from "@/lib/utils";
import { Trash2, RotateCcw, RotateCw, Copy, AlertTriangle, Undo2 } from "lucide-react";
import type { OrganizePageEntry } from "./organize-pages-preview";

export interface OrganizePagesLabels {
  dropFile: string;
  changeFile: string;
  resultPages: string;
  deletedCount: string;
  duplicatedCount: string;
  rotatedCount: string;
  selectAll: string;
  deselectAll: string;
  selectOdd: string;
  selectEven: string;
  rotateAll: string;
  resetOrder: string;
  resetAll: string;
  noChanges: string;
  cannotDeleteAll: string;
  pages: string;
  duplicate: string;
  rotate: string;
  delete: string;
  restore: string;
  copy: string;
}

interface OrganizePagesOptionsProps {
  pageCount: number;
  pages: OrganizePageEntry[];
  onPagesChange: (pages: OrganizePageEntry[]) => void;
  onResetAll: () => void;
  labels: OrganizePagesLabels;
}

export function OrganizePagesOptions({
  pageCount,
  pages,
  onPagesChange,
  onResetAll,
  labels,
}: OrganizePagesOptionsProps) {
  const deletedCount = pages.filter((p) => p.deleted).length;
  const duplicatedCount = pages.filter((p) => p.isDuplicate).length;
  const rotatedCount = pages.filter((p) => p.rotation > 0 && !p.deleted).length;
  const resultCount = pages.length - deletedCount;
  const allNonDeletedAreDeleted = resultCount === 0;

  // Check if order has changed from default
  const defaultOrder = Array.from({ length: pageCount }, (_, i) => i + 1);
  const currentOrder = pages.filter((p) => !p.isDuplicate).map((p) => p.srcPage);
  const orderChanged =
    currentOrder.length !== defaultOrder.length ||
    currentOrder.some((p, i) => p !== defaultOrder[i]);

  const hasAnyChange = deletedCount > 0 || duplicatedCount > 0 || rotatedCount > 0 || orderChanged || pages.length !== pageCount;

  const handleDeleteAll = () => {
    // Delete all except last non-deleted page
    const nonDeleted = pages.filter((p) => !p.deleted);
    if (nonDeleted.length <= 1) return;
    const lastId = nonDeleted[nonDeleted.length - 1].id;
    onPagesChange(
      pages.map((p) => (p.id === lastId ? p : { ...p, deleted: true })),
    );
  };

  const handleRestoreAll = () => {
    onPagesChange(pages.map((p) => ({ ...p, deleted: false })));
  };

  const handleDeleteOdd = () => {
    // Mark odd-positioned (1st, 3rd, ...) non-deleted pages
    let count = 0;
    const nonDeletedIds = pages.filter((p) => !p.deleted).map((p) => p.id);
    const oddIds = new Set(nonDeletedIds.filter((_, i) => i % 2 === 0));
    // Keep at least 1 page
    if (oddIds.size >= nonDeletedIds.length) {
      const last = nonDeletedIds[nonDeletedIds.length - 1];
      oddIds.delete(last);
    }
    onPagesChange(
      pages.map((p) => (oddIds.has(p.id) ? { ...p, deleted: true } : p)),
    );
  };

  const handleDeleteEven = () => {
    const nonDeletedIds = pages.filter((p) => !p.deleted).map((p) => p.id);
    const evenIds = new Set(nonDeletedIds.filter((_, i) => i % 2 === 1));
    if (evenIds.size >= nonDeletedIds.length) {
      const last = nonDeletedIds[nonDeletedIds.length - 1];
      evenIds.delete(last);
    }
    onPagesChange(
      pages.map((p) => (evenIds.has(p.id) ? { ...p, deleted: true } : p)),
    );
  };

  const handleRotateAll = () => {
    onPagesChange(
      pages.map((p) =>
        p.deleted ? p : { ...p, rotation: (p.rotation + 90) % 360 },
      ),
    );
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div
        className={cn(
          "rounded-xl border px-4 py-3 space-y-2",
          allNonDeletedAreDeleted
            ? "border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-950/20"
            : hasAnyChange
              ? "border-accent/30 bg-accent-muted/30"
              : "border-border bg-background-muted",
        )}
      >
        {allNonDeletedAreDeleted ? (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="font-medium">{labels.cannotDeleteAll}</span>
          </div>
        ) : !hasAnyChange ? (
          <p className="text-sm text-foreground-subtle">{labels.noChanges}</p>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground font-semibold">
                {labels.resultPages}
              </span>
              <span className="text-accent font-bold text-lg">{resultCount}</span>
            </div>
            <div className="space-y-1">
              {deletedCount > 0 && (
                <div className="flex items-center justify-between text-xs text-foreground-muted">
                  <span className="flex items-center gap-1.5">
                    <Trash2 className="h-3 w-3 text-red-500" />
                    {labels.deletedCount}
                  </span>
                  <span className="font-semibold text-red-500">{deletedCount}</span>
                </div>
              )}
              {duplicatedCount > 0 && (
                <div className="flex items-center justify-between text-xs text-foreground-muted">
                  <span className="flex items-center gap-1.5">
                    <Copy className="h-3 w-3 text-blue-500" />
                    {labels.duplicatedCount}
                  </span>
                  <span className="font-semibold text-blue-500">{duplicatedCount}</span>
                </div>
              )}
              {rotatedCount > 0 && (
                <div className="flex items-center justify-between text-xs text-foreground-muted">
                  <span className="flex items-center gap-1.5">
                    <RotateCw className="h-3 w-3 text-amber-500" />
                    {labels.rotatedCount}
                  </span>
                  <span className="font-semibold text-amber-500">{rotatedCount}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Quick actions: delete */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">{labels.delete}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={deletedCount > 0 ? handleRestoreAll : handleDeleteAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            {deletedCount > 0 ? (
              <><Undo2 className="h-3 w-3" /> {labels.deselectAll}</>
            ) : (
              <><Trash2 className="h-3 w-3" /> {labels.selectAll}</>
            )}
          </button>
          <button
            type="button"
            onClick={handleDeleteOdd}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            {labels.selectOdd}
          </button>
          <button
            type="button"
            onClick={handleDeleteEven}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            {labels.selectEven}
          </button>
        </div>
      </div>

      {/* Quick actions: rotate */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">{labels.rotate}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleRotateAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCw className="h-3 w-3" />
            {labels.rotateAll}
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
