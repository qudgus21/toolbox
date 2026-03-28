"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { EllipsisTooltip } from "@/lib/ui";
import type { CalculatorResult, CalculatorTableRow, CalculatorBreakdownRow } from "@/lib/calculator/types";
import { CopyButton } from "./copy-button";

interface CalculatorOutputAreaProps {
  result: CalculatorResult | null;
  isPreview?: boolean;
  label?: string;
  copyLabel: string;
  copiedLabel: string;
  breakdownLabel?: string;
  allResultsLabel?: string;
  statsLabels?: Record<string, string>;
  processorLabels?: Record<string, string>;
  booleanYes?: string;
  booleanNo?: string;
  className?: string;
  onCopy?: () => void;
}

export function CalculatorOutputArea({
  result,
  isPreview,
  label,
  copyLabel,
  copiedLabel,
  breakdownLabel,
  allResultsLabel,
  statsLabels,
  processorLabels,
  booleanYes,
  booleanNo,
  className,
  onCopy,
}: CalculatorOutputAreaProps) {
  const output = result?.output ?? "";
  const table = result?.table;
  const breakdown = result?.breakdown;
  const stats = result?.stats;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden shadow-sm transition-all duration-200",
        "border border-violet-500/25 bg-gradient-to-b from-violet-500/[0.03] to-transparent",
        "hover:shadow-md hover:border-violet-500/40",
        isPreview && "opacity-50",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-violet-500/10 to-violet-500/[0.03] px-4 py-2.5 border-b border-violet-500/15">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          {label}
        </span>
        <div className="flex items-center gap-1">
          {output && !isPreview && (
            <CopyButton
              text={output}
              label={copyLabel}
              copiedLabel={copiedLabel}
              onCopy={onCopy}
            />
          )}
        </div>
      </div>

      {/* Main result */}
      <div className="px-4 py-4">
        {output ? (
          <p className="text-center text-2xl sm:text-3xl font-bold text-foreground tabular-nums tracking-tight break-all">
            {output}
          </p>
        ) : (
          <p className="text-center text-lg text-foreground-subtle/50 italic">
            ---
          </p>
        )}
      </div>

      {/* Breakdown section */}
      {breakdown && breakdown.length > 0 && (
        <BreakdownSection
          rows={breakdown}
          title={breakdownLabel}
          processorLabels={processorLabels}
          isPreview={isPreview}
          booleanYes={booleanYes}
          booleanNo={booleanNo}
        />
      )}

      {/* Stats section */}
      {stats && Object.keys(stats).length > 0 && (
        <StatsSection stats={stats} labels={statsLabels} booleanYes={booleanYes} booleanNo={booleanNo} />
      )}

      {/* Conversion table */}
      {table && table.length > 0 && (
        <ResultTable
          rows={table}
          title={allResultsLabel}
          processorLabels={processorLabels}
          copyLabel={copyLabel}
          copiedLabel={copiedLabel}
          isPreview={isPreview}
          booleanYes={booleanYes}
          booleanNo={booleanNo}
        />
      )}
    </div>
  );
}

// ── Breakdown Section ───────────────────────────────────────────────────

function BreakdownSection({
  rows,
  title,
  processorLabels,
  isPreview,
  booleanYes,
  booleanNo,
}: {
  rows: CalculatorBreakdownRow[];
  title?: string;
  processorLabels?: Record<string, string>;
  isPreview?: boolean;
  booleanYes?: string;
  booleanNo?: string;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-t border-violet-500/10">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 hover:bg-violet-500/5 transition-colors cursor-pointer"
      >
        <span>{title}</span>
        {expanded ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>
      {expanded && (
        <div className={cn("px-4 pb-3 space-y-1", isPreview && "pointer-events-none")}>
          {rows.map((row, i) => {
            const displayValue = typeof row.value === "boolean"
              ? (row.value ? (booleanYes ?? "Yes") : (booleanNo ?? "No"))
              : row.value;
            return (
              <div
                key={`${row.label}-${i}`}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  row.highlight
                    ? "bg-violet-500/8 font-semibold"
                    : "hover:bg-violet-500/[0.04]",
                )}
              >
                <span
                  className={cn(
                    "text-foreground-muted",
                    row.highlight && "text-violet-700 dark:text-violet-300",
                  )}
                >
                  {processorLabels?.[row.label] ?? row.label}
                </span>
                <span
                  className={cn(
                    "font-mono font-semibold tabular-nums",
                    row.highlight
                      ? "text-violet-700 dark:text-violet-300"
                      : "text-foreground",
                  )}
                >
                  {displayValue}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Stats Section ───────────────────────────────────────────────────────

function StatsSection({
  stats,
  labels,
  booleanYes,
  booleanNo,
}: {
  stats: Record<string, string | number | boolean>;
  labels?: Record<string, string>;
  booleanYes?: string;
  booleanNo?: string;
}) {
  const entries = Object.entries(stats).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return null;

  return (
    <div className="border-t border-violet-500/10 px-4 py-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted/60">
              {labels?.[key] ?? key}
            </span>
            <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
              {typeof value === "boolean" ? (value ? (booleanYes ?? "Yes") : (booleanNo ?? "No")) : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Result Table ────────────────────────────────────────────────────────

function ResultTable({
  rows,
  title,
  processorLabels,
  copyLabel,
  copiedLabel,
  isPreview,
  booleanYes,
  booleanNo,
}: {
  rows: CalculatorTableRow[];
  title?: string;
  processorLabels?: Record<string, string>;
  copyLabel: string;
  copiedLabel: string;
  isPreview?: boolean;
  booleanYes?: string;
  booleanNo?: string;
}) {
  return (
    <div className="border-t border-violet-500/10">
      {title && (
        <div className="px-4 pt-2.5 pb-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            {title}
          </h3>
        </div>
      )}
      <div className="grid grid-cols-2 gap-px bg-border/10 p-1">
        {rows.map((row, i) => {
          const displayValue = typeof row.value === "boolean"
            ? (row.value ? (booleanYes ?? "Yes") : (booleanNo ?? "No"))
            : row.value;
          return (
            <div
              key={`${row.label}-${i}`}
              className={cn(
                "group/row flex items-center justify-between gap-1 rounded-lg px-3 py-2 transition-colors duration-150",
                "hover:bg-violet-500/[0.06]",
              )}
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-foreground-muted/60 uppercase tracking-wide leading-none mb-0.5">
                  {processorLabels?.[row.label] ?? row.label}
                </span>
                <EllipsisTooltip
                  text={row.unit ? `${displayValue} ${row.unit}` : displayValue}
                  className="font-mono text-sm font-semibold text-foreground truncate"
                >
                  {displayValue}
                  {row.unit && (
                    <span className="text-xs text-foreground-muted/60 ml-1">{row.unit}</span>
                  )}
                </EllipsisTooltip>
              </div>
              {!isPreview && (
                <div className="opacity-0 group-hover/row:opacity-100 transition-opacity duration-150 shrink-0">
                  <CopyButton
                    text={displayValue}
                    label={copyLabel}
                    copiedLabel={copiedLabel}
                    variant="icon"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
