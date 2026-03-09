"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@toolbox/utils";
import { FileOutput, RotateCcw, AlertTriangle } from "lucide-react";

interface ExtractPagesLabels {
  pagesToExtract: string;
  pagesPlaceholder: string;
  selectAll: string;
  deselectAll: string;
  selectOdd: string;
  selectEven: string;
  willBeExtracted: string;
  willRemain: string;
  pages: string;
  noPageSelected: string;
  cannotExtractAll: string;
}

interface ExtractPagesOptionsProps {
  pageCount: number;
  extractedPages: Set<number>;
  onExtractedPagesChange: (pages: Set<number>) => void;
  labels: ExtractPagesLabels;
}

function parsePageInput(input: string, maxPage: number): number[] {
  const pages = new Set<number>();
  const parts = input.split(",").map((s) => s.trim());
  for (const part of parts) {
    if (!part) continue;
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const from = parseInt(rangeMatch[1], 10);
      const to = parseInt(rangeMatch[2], 10);
      for (let i = Math.max(1, from); i <= Math.min(maxPage, to); i++) {
        pages.add(i);
      }
    } else {
      const num = parseInt(part, 10);
      if (num >= 1 && num <= maxPage) pages.add(num);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function ExtractPagesOptions({
  pageCount,
  extractedPages,
  onExtractedPagesChange,
  labels,
}: ExtractPagesOptionsProps) {
  const [rangeInput, setRangeInput] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const extractedCount = extractedPages.size;
  const remainCount = pageCount - extractedCount;
  const isAllSelected = extractedCount >= pageCount;
  const hasSelection = extractedCount > 0;

  // Sync range input when extractedPages changes externally (from clicks)
  // Only update when input is not focused
  useEffect(() => {
    if (inputFocused) return;
    if (extractedPages.size === 0) {
      setRangeInput("");
      return;
    }
    // Convert set to compact range string
    const sorted = Array.from(extractedPages).sort((a, b) => a - b);
    const parts: string[] = [];
    let i = 0;
    while (i < sorted.length) {
      const start = sorted[i];
      let end = start;
      while (i + 1 < sorted.length && sorted[i + 1] === end + 1) {
        end = sorted[++i];
      }
      parts.push(start === end ? `${start}` : `${start}-${end}`);
      i++;
    }
    setRangeInput(parts.join(", "));
  }, [extractedPages, inputFocused]);

  const handleInputChange = useCallback(
    (value: string) => {
      setRangeInput(value);
      const parsed = parsePageInput(value, pageCount);
      onExtractedPagesChange(new Set(parsed));
    },
    [pageCount, onExtractedPagesChange],
  );

  const quickActions = [
    {
      label: hasSelection ? labels.deselectAll : labels.selectAll,
      onClick: () => {
        if (hasSelection) {
          onExtractedPagesChange(new Set());
        } else {
          // Select all except last page (can't extract all)
          onExtractedPagesChange(
            new Set(Array.from({ length: pageCount - 1 }, (_, i) => i + 1)),
          );
        }
      },
      icon: hasSelection ? RotateCcw : FileOutput,
    },
    {
      label: labels.selectOdd,
      onClick: () => {
        const odd = new Set<number>();
        for (let i = 1; i <= pageCount; i += 2) odd.add(i);
        // Ensure at least 1 page remains
        if (odd.size >= pageCount) odd.delete(pageCount);
        onExtractedPagesChange(odd);
      },
    },
    {
      label: labels.selectEven,
      onClick: () => {
        const even = new Set<number>();
        for (let i = 2; i <= pageCount; i += 2) even.add(i);
        if (even.size >= pageCount) even.delete(pageCount);
        onExtractedPagesChange(even);
      },
    },
  ];

  return (
    <div className="space-y-5">
      {/* Range input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {labels.pagesToExtract}
        </label>
        <input
          type="text"
          value={rangeInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder={labels.pagesPlaceholder}
          className="w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 text-sm placeholder:text-foreground-subtle focus:border-accent focus:outline-none"
        />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
            >
              {Icon && <Icon className="h-3 w-3" />}
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div
        className={cn(
          "rounded-xl border px-4 py-3 space-y-1",
          isAllSelected
            ? "border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-950/20"
            : "border-border bg-background-muted",
        )}
      >
        {!hasSelection ? (
          <p className="text-sm text-foreground-subtle">{labels.noPageSelected}</p>
        ) : isAllSelected ? (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="font-medium">{labels.cannotExtractAll}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="text-lg">{extractedCount}</span> {labels.willBeExtracted}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground-muted">
                <span className="text-foreground font-semibold">{remainCount}</span> {labels.willRemain}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
