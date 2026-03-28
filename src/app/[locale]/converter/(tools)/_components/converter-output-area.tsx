"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { EllipsisTooltip } from "@/lib/ui";
import type { ConverterResult, ConversionTableRow } from "@/lib/converter/types";
import { CopyButton } from "./copy-button";

interface ConverterOutputAreaProps {
  result: ConverterResult | null;
  isPreview?: boolean;
  label?: string;
  copyLabel: string;
  copiedLabel: string;
  allConversionsLabel?: string;
  detailsLabel?: string;
  className?: string;
  unitLabels?: Record<string, string>;
  onCopy?: () => void;
}

export function ConverterOutputArea({
  result,
  isPreview,
  label,
  copyLabel,
  copiedLabel,
  allConversionsLabel,
  className,
  unitLabels,
  onCopy,
}: ConverterOutputAreaProps) {
  const output = result?.output ?? "";
  const table = result?.table;
  const preview = result?.preview;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden shadow-sm transition-all duration-200",
        "border border-emerald-500/25 bg-gradient-to-b from-emerald-500/[0.03] to-transparent",
        "hover:shadow-md hover:border-emerald-500/40",
        isPreview && "opacity-50",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-emerald-500/[0.03] px-4 py-2.5 border-b border-emerald-500/15">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
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
          <p className="text-center text-base sm:text-lg font-bold text-foreground font-mono tracking-tight break-all">
            {output}
          </p>
        ) : (
          <p className="text-center text-lg text-foreground-subtle/50 italic">
            ---
          </p>
        )}
      </div>

      {/* Visual preview (color swatch, gradient, etc.) */}
      {preview && (
        <PreviewSection preview={preview} />
      )}

      {/* Conversion table */}
      {table && table.length > 0 && (
        <ConversionTable
          rows={table}
          title={allConversionsLabel}
          copyLabel={copyLabel}
          copiedLabel={copiedLabel}
          isPreview={isPreview}
          unitLabels={unitLabels}
        />
      )}
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────

function extractColor(value: string): string | null {
  const match = value.match(/#[0-9a-f]{3,8}/i);
  return match ? match[0] : null;
}

// ── Preview Section ──────────────────────────────────────────────────

function PreviewSection({ preview }: { preview: string }) {
  const isGradient = preview.includes("gradient(");
  const isColor = /^#[0-9a-f]{3,8}$/i.test(preview) || preview.startsWith("rgb") || preview.startsWith("hsl");

  // Palette: JSON array of hex colors, e.g. ["#ff0000","#00ffff"]
  let palette: string[] | null = null;
  if (preview.startsWith("[")) {
    try {
      const parsed = JSON.parse(preview);
      if (Array.isArray(parsed) && parsed.every((c: unknown) => typeof c === "string")) {
        palette = parsed;
      }
    } catch { /* not JSON */ }
  }

  if (!isGradient && !isColor && !palette) return null;

  if (palette) {
    return (
      <div className="px-4 pb-3">
        <div className="flex h-16 w-full overflow-hidden rounded-xl border border-border/40 shadow-inner">
          {palette.map((color, i) => (
            <div
              key={i}
              className="flex-1 transition-all duration-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-3">
      <div
        className="h-16 w-full rounded-xl border border-border/40 shadow-inner transition-all duration-300"
        style={{ background: isGradient ? preview : preview }}
      />
    </div>
  );
}

// ── Conversion Table ─────────────────────────────────────────────────

function ConversionTable({
  rows,
  title,
  copyLabel,
  copiedLabel,
  isPreview,
  unitLabels,
}: {
  rows: ConversionTableRow[];
  title?: string;
  copyLabel: string;
  copiedLabel: string;
  isPreview?: boolean;
  unitLabels?: Record<string, string>;
}) {
  return (
    <div className="border-t border-emerald-500/10">
      {title && (
        <div className="px-4 pt-2.5 pb-1">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {title}
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-px bg-border/10 p-1">
        {rows.map((row, i) => (
          <div
            key={`${row.label}-${i}`}
            className={cn(
              "group/row flex items-center justify-between gap-1 rounded-lg px-3 py-2 transition-colors duration-150",
              "hover:bg-emerald-500/[0.06]",
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              {extractColor(row.value) && (
                <span
                  className="h-5 w-5 shrink-0 rounded-md border border-border/40 shadow-inner"
                  style={{ backgroundColor: extractColor(row.value)! }}
                />
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-foreground-subtle uppercase tracking-wide leading-none mb-0.5">
                  {(row.unit && unitLabels?.[row.unit]) ?? row.label}
                </span>
                <EllipsisTooltip
                  text={row.unit ? `${row.value} ${row.unit}` : row.value}
                  className="font-mono text-sm font-semibold text-foreground truncate"
                >
                  {row.value}
                  {row.unit && (
                    <span className="text-xs text-foreground-subtle ml-1">{row.unit}</span>
                  )}
                </EllipsisTooltip>
              </div>
            </div>
            {!isPreview && (
              <div className="opacity-0 group-hover/row:opacity-100 transition-opacity duration-150 shrink-0">
                <CopyButton
                  text={row.value}
                  label={copyLabel}
                  copiedLabel={copiedLabel}
                  variant="icon"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


