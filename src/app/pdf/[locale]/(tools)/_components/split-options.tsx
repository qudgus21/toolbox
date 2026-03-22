"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { cn, formatSize } from "@/lib/utils";
import { Plus, X, AlertTriangle } from "lucide-react";

type SplitMode = "range" | "extract" | "size";
type RangeType = "custom" | "fixed";

interface SplitRange {
  from: number;
  to: number;
}

interface SplitLabels {
  tabRange: string;
  tabExtract: string;
  tabSize: string;
  rangeCustom: string;
  rangeFixed: string;
  addRange: string;
  from: string;
  to: string;
  everyNPages: string;
  mergeIntoOne: string;
  extractAll: string;
  extractSelect: string;
  pagesPlaceholder: string;
  maxFileSize: string;
  originalSize: string;
  totalPages: string;
  filesCreated: string;
  pages: string;
  errorFromGreaterThanTo: string;
  errorEmptyValue: string;
}

interface SplitOptionsProps {
  pageCount: number;
  fileSize: number;
  onChange: (options: Record<string, unknown>) => void;
  labels: SplitLabels;
  onRegisterSetRanges?: (setter: (ranges: SplitRange[]) => void) => void;
  onRegisterValidate?: (validator: () => boolean) => void;
  onRegisterSetExtractPages?: (setter: (pages: number[]) => void) => void;
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

export function SplitOptions({
  pageCount,
  fileSize,
  onChange,
  labels,
  onRegisterSetRanges,
  onRegisterValidate,
  onRegisterSetExtractPages,
}: SplitOptionsProps) {
  const [mode, setMode] = useState<SplitMode>("range");
  const [showErrors, setShowErrors] = useState(false);

  // Range state
  const [rangeType, setRangeType] = useState<RangeType>("custom");
  const [ranges, setRanges] = useState<SplitRange[]>([{ from: 1, to: pageCount }]);
  const [fixedInterval, setFixedInterval] = useState(1);
  const [fixedRangesOverride, setFixedRangesOverride] = useState<SplitRange[] | null>(null);
  const [mergeIntoOne, setMergeIntoOne] = useState(false);

  // Extract state
  const [extractAll, setExtractAll] = useState(true);
  const [extractPagesInput, setExtractPagesInput] = useState("");
  const [extractPagesOverride, setExtractPagesOverride] = useState<number[] | null>(null);
  const [mergeExtracted, setMergeExtracted] = useState(false);

  // Size state
  const [maxSizeMB, setMaxSizeMB] = useState(
    Math.max(1, Math.ceil(fileSize / (1024 * 1024) / 2)),
  );
  const [sizeUnit, setSizeUnit] = useState<"MB" | "KB">("MB");

  // Update ranges when pageCount changes
  useEffect(() => {
    setRanges([{ from: 1, to: pageCount }]);
    setFixedRangesOverride(null);
  }, [pageCount]);

  // Reset fixed override when interval changes
  useEffect(() => {
    setFixedRangesOverride(null);
  }, [fixedInterval]);

  // Reset extract override when switching
  useEffect(() => {
    setExtractPagesOverride(null);
  }, [extractAll]);

  // Register setRanges for external sync (DnD reorder from preview)
  useEffect(() => {
    onRegisterSetRanges?.((newRanges) => {
      if (rangeType === "fixed") {
        setFixedRangesOverride(newRanges);
      } else {
        setRanges(newRanges);
      }
    });
  }, [onRegisterSetRanges, rangeType]);

  // Register setExtractPages for external sync (extract preview)
  useEffect(() => {
    onRegisterSetExtractPages?.((pages) => {
      setExtractPagesOverride(pages);
    });
  }, [onRegisterSetExtractPages]);

  const computeResultCount = useCallback((): number => {
    if (mode === "range") {
      if (mergeIntoOne) return 1;
      if (rangeType === "fixed") {
        return Math.ceil(pageCount / Math.max(1, fixedInterval));
      }
      return ranges.length;
    }
    if (mode === "extract") {
      if (mergeExtracted) return 1;
      if (extractAll) return extractPagesOverride ? extractPagesOverride.length : pageCount;
      return parsePageInput(extractPagesInput, pageCount).length || 1;
    }
    // size
    const maxBytes = sizeUnit === "MB" ? maxSizeMB * 1024 * 1024 : maxSizeMB * 1024;
    const avgPageSize = fileSize / Math.max(1, pageCount);
    return Math.max(1, Math.ceil(fileSize / Math.max(avgPageSize, maxBytes)));
  }, [
    mode, rangeType, ranges, fixedInterval, mergeIntoOne,
    extractAll, extractPagesInput, extractPagesOverride, mergeExtracted,
    maxSizeMB, sizeUnit, pageCount, fileSize,
  ]);

  // Emit options on any change
  useEffect(() => {
    const maxSizeKB = sizeUnit === "MB" ? maxSizeMB * 1024 : maxSizeMB;

    const opts: Record<string, unknown> = { mode };

    if (mode === "range") {
      opts.rangeType = rangeType;
      if (rangeType === "custom") {
        opts.ranges = ranges;
      } else {
        opts.fixedInterval = fixedInterval;
        if (fixedRangesOverride) {
          opts.ranges = fixedRangesOverride;
        }
      }
      opts.mergeIntoOne = mergeIntoOne;
    } else if (mode === "extract") {
      opts.extractAll = extractAll;
      if (extractAll) {
        if (extractPagesOverride) {
          opts.extractPages = extractPagesOverride;
        }
      } else {
        opts.extractPages = parsePageInput(extractPagesInput, pageCount);
      }
      opts.mergeIntoOne = mergeExtracted;
    } else {
      opts.maxSizeKB = maxSizeKB;
    }

    onChange(opts);
  }, [
    mode, rangeType, ranges, fixedInterval, fixedRangesOverride, mergeIntoOne,
    extractAll, extractPagesInput, extractPagesOverride, mergeExtracted,
    maxSizeMB, sizeUnit, pageCount, onChange,
  ]);

  const resultCount = computeResultCount();

  // Validation
  const rangeErrors = useMemo(() => {
    if (mode !== "range" || rangeType !== "custom") return [];
    return ranges.map((r) => {
      if (r.from === 0 || r.to === 0) return "empty";
      if (r.from > r.to) return "fromGreaterThanTo";
      return null;
    });
  }, [mode, rangeType, ranges]);

  const hasErrors = rangeErrors.some((e) => e !== null);
  const hasEmptyErrors = rangeErrors.some((e) => e === "empty");

  // Clear showErrors when empty values are fixed
  useEffect(() => {
    if (!hasEmptyErrors) setShowErrors(false);
  }, [hasEmptyErrors]);

  // Register validate function for parent to call on button click
  useEffect(() => {
    onRegisterValidate?.(() => {
      if (hasErrors) {
        setShowErrors(true);
        return false;
      }
      return true;
    });
  }, [hasErrors, onRegisterValidate]);

  const tabs: { key: SplitMode; label: string }[] = [
    { key: "range", label: labels.tabRange },
    { key: "extract", label: labels.tabExtract },
    { key: "size", label: labels.tabSize },
  ];

  return (
    <div className="space-y-5">
      {/* Tab bar */}
      <div className="flex rounded-xl bg-background-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setMode(tab.key)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 cursor-pointer",
              mode === tab.key
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Range mode */}
      {mode === "range" && (
        <div className="space-y-4">
          {/* Radio: custom vs fixed */}
          <div className="flex gap-4">
            {([
              ["custom", labels.rangeCustom],
              ["fixed", labels.rangeFixed],
            ] as const).map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="rangeType"
                  checked={rangeType === value}
                  onChange={() => setRangeType(value)}
                  className="accent-accent"
                />
                <span className={cn(
                  "font-medium",
                  rangeType === value ? "text-foreground" : "text-foreground-muted",
                )}>
                  {label}
                </span>
              </label>
            ))}
          </div>

          {rangeType === "custom" ? (
            <div className="space-y-2">
              {ranges.map((range, idx) => {
                const rawError = rangeErrors[idx] ?? null;
                const error = rawError === "fromGreaterThanTo" ? rawError : (showErrors ? rawError : null);
                return (
                  <div key={idx} className="space-y-1">
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors",
                        error
                          ? "border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950/30"
                          : "border-border bg-background-elevated",
                      )}
                    >
                      <span className="text-xs font-bold text-foreground-subtle min-w-[16px]">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-foreground-muted">{labels.from}</span>
                      <input
                        type="number"
                        min={1}
                        max={pageCount}
                        value={range.from === 0 ? "" : range.from}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const val = raw === "" ? 0 : Math.min(parseInt(raw, 10), pageCount);
                          if (isNaN(val)) return;
                          setRanges((prev) =>
                            prev.map((r, i) => (i === idx ? { ...r, from: val } : r)),
                          );
                        }}
                        className={cn(
                          "w-16 rounded-md border bg-background px-2 py-1 text-sm text-center focus:outline-none transition-colors",
                          error ? "border-red-400 dark:border-red-500 focus:border-red-500" : "border-border focus:border-accent",
                        )}
                      />
                      <span className="text-foreground-subtle">~</span>
                      <span className="text-xs text-foreground-muted">{labels.to}</span>
                      <input
                        type="number"
                        min={1}
                        max={pageCount}
                        value={range.to === 0 ? "" : range.to}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const val = raw === "" ? 0 : Math.min(parseInt(raw, 10), pageCount);
                          if (isNaN(val)) return;
                          setRanges((prev) =>
                            prev.map((r, i) => (i === idx ? { ...r, to: val } : r)),
                          );
                        }}
                        className={cn(
                          "w-16 rounded-md border bg-background px-2 py-1 text-sm text-center focus:outline-none transition-colors",
                          error ? "border-red-400 dark:border-red-500 focus:border-red-500" : "border-border focus:border-accent",
                        )}
                      />
                      {ranges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setRanges((prev) => prev.filter((_, i) => i !== idx))}
                          className="ml-auto rounded-md p-1 text-foreground-subtle hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    {error && (
                      <div className="flex items-center gap-1.5 px-1 text-red-500">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        <span className="text-xs font-medium">
                          {error === "fromGreaterThanTo"
                            ? labels.errorFromGreaterThanTo
                            : labels.errorEmptyValue}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() =>
                  setRanges((prev) => {
                    const lastTo = prev[prev.length - 1]?.to ?? 0;
                    return [
                      ...prev,
                      {
                        from: Math.min(lastTo + 1, pageCount),
                        to: pageCount,
                      },
                    ];
                  })
                }
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-sm font-medium text-foreground-muted hover:border-accent hover:text-accent transition-colors cursor-pointer w-full justify-center"
              >
                <Plus className="h-3.5 w-3.5" />
                {labels.addRange}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background-elevated px-4 py-3">
              <span className="text-sm text-foreground-muted">{labels.everyNPages}</span>
              <input
                type="number"
                min={1}
                max={pageCount}
                value={fixedInterval}
                onChange={(e) =>
                  setFixedInterval(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                className="w-20 rounded-md border border-border bg-background px-2 py-1 text-sm text-center focus:border-accent focus:outline-none"
              />
              <span className="text-sm text-foreground-muted">{labels.pages}</span>
            </div>
          )}

          {/* Merge checkbox */}
          <label className="flex items-center gap-2.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={mergeIntoOne}
              onChange={(e) => setMergeIntoOne(e.target.checked)}
              className="accent-accent h-4 w-4 rounded"
            />
            <span className="text-foreground-muted">{labels.mergeIntoOne}</span>
          </label>
        </div>
      )}

      {/* Extract mode */}
      {mode === "extract" && (
        <div className="space-y-4">
          <div className="flex gap-4">
            {([
              [true, labels.extractAll],
              [false, labels.extractSelect],
            ] as [boolean, string][]).map(([value, label]) => (
              <label
                key={String(value)}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="extractType"
                  checked={extractAll === value}
                  onChange={() => setExtractAll(value)}
                  className="accent-accent"
                />
                <span className={cn(
                  "font-medium",
                  extractAll === value ? "text-foreground" : "text-foreground-muted",
                )}>
                  {label}
                </span>
              </label>
            ))}
          </div>

          {!extractAll && (
            <input
              type="text"
              value={extractPagesInput}
              onChange={(e) => setExtractPagesInput(e.target.value)}
              placeholder={labels.pagesPlaceholder}
              className="w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 text-sm placeholder:text-foreground-subtle focus:border-accent focus:outline-none"
            />
          )}

          <label className="flex items-center gap-2.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={mergeExtracted}
              onChange={(e) => setMergeExtracted(e.target.checked)}
              className="accent-accent h-4 w-4 rounded"
            />
            <span className="text-foreground-muted">{labels.mergeIntoOne}</span>
          </label>
        </div>
      )}

      {/* Size mode */}
      {mode === "size" && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-foreground-muted">
            <span>
              {labels.originalSize}:{" "}
              <span className="font-semibold text-foreground">{formatSize(fileSize)}</span>
            </span>
            <span className="text-foreground-subtle">·</span>
            <span>
              {labels.totalPages}:{" "}
              <span className="font-semibold text-foreground">{pageCount}</span>
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-foreground-muted">{labels.maxFileSize}</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={maxSizeMB}
                onChange={(e) =>
                  setMaxSizeMB(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                className="w-24 rounded-lg border border-border bg-background-elevated px-3 py-2.5 text-sm text-center focus:border-accent focus:outline-none"
              />
              <select
                value={sizeUnit}
                onChange={(e) => setSizeUnit(e.target.value as "MB" | "KB")}
                className="rounded-lg border border-border bg-background-elevated px-3 py-2.5 text-sm focus:border-accent focus:outline-none cursor-pointer"
              >
                <option value="MB">MB</option>
                <option value="KB">KB</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Result count */}
      <div className="rounded-lg bg-background-muted px-4 py-3 text-sm font-medium text-foreground-muted">
        → {resultCount} {labels.filesCreated}
      </div>
    </div>
  );
}
