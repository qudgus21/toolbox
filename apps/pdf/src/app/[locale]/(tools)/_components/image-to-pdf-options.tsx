"use client";

import { useState } from "react";
import { cn } from "@toolbox/utils";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { PageSizeKey, Orientation } from "@/lib/processors/image-to-pdf";

export interface ImageToPdfLabels {
  orientationLabel: string;
  portrait: string;
  landscape: string;
  pageSizeLabel: string;
  pageSizeFit: string;
  pageSizeFitDesc: string;
  pageSizeGroupDoc: string;
  pageSizeGroupPhoto: string;
  pageSizeGroupOther: string;
  marginLabel: string;
  marginNone: string;
  marginSmall: string;
  marginLarge: string;
  marginUnit: string;
  mergeAllLabel: string;
  mergeAllDesc: string;
  convertButton: string;
  convertInfo: string;
}

const MARGIN_PRESETS = [
  { mm: 0, labelKey: "marginNone" as const },
  { mm: 6.7, labelKey: "marginSmall" as const },
  { mm: 13.3, labelKey: "marginLarge" as const },
];

const MARGIN_MIN = 0;
const MARGIN_MAX = 25;
const MARGIN_STEP = 0.1;

interface ImageToPdfOptionsProps {
  orientation: Orientation;
  pageSize: PageSizeKey;
  marginMm: number;
  mergeAll: boolean;
  fileCount: number;
  onOrientationChange: (v: Orientation) => void;
  onPageSizeChange: (v: PageSizeKey) => void;
  onMarginMmChange: (v: number) => void;
  onMergeAllChange: (v: boolean) => void;
  labels: ImageToPdfLabels;
}

interface SizeOption {
  value: PageSizeKey;
  label: string;
  size: string;
  group: "doc" | "photo" | "other";
}

const ALL_SIZES: SizeOption[] = [
  { value: "a4", label: "A4", size: "210×297mm", group: "doc" },
  { value: "a3", label: "A3", size: "297×420mm", group: "doc" },
  { value: "a5", label: "A5", size: "148×210mm", group: "doc" },
  { value: "letter", label: "US Letter", size: "216×279mm", group: "doc" },
  { value: "legal", label: "US Legal", size: "216×356mm", group: "doc" },
  { value: "photo4x6", label: "4×6\"", size: "102×152mm", group: "photo" },
  { value: "photo5x7", label: "5×7\"", size: "127×178mm", group: "photo" },
  { value: "b5", label: "B5", size: "176×250mm", group: "other" },
  { value: "postcard", label: "Postcard", size: "100×148mm", group: "other" },
];

export function ImageToPdfOptions({
  orientation,
  pageSize,
  marginMm,
  mergeAll,
  fileCount,
  onOrientationChange,
  onPageSizeChange,
  onMarginMmChange,
  onMergeAllChange,
  labels,
}: ImageToPdfOptionsProps) {
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  const selectedSize = ALL_SIZES.find((s) => s.value === pageSize);
  const displayLabel = selectedSize
    ? `${selectedSize.label} (${selectedSize.size})`
    : pageSize;

  const groupLabelMap: Record<string, string> = {
    doc: labels.pageSizeGroupDoc,
    photo: labels.pageSizeGroupPhoto,
    other: labels.pageSizeGroupOther,
  };

  return (
    <div className="space-y-4">
      {/* ── Orientation ── */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          {labels.orientationLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["portrait", "landscape"] as const).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onOrientationChange(val)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all cursor-pointer",
                orientation === val
                  ? "border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-foreground"
                  : "border-border text-foreground-muted hover:border-foreground-subtle",
              )}
            >
              <div
                className={cn(
                  "rounded-sm border-2 transition-colors",
                  val === "portrait" ? "h-4.5 w-3" : "h-3 w-4.5",
                  orientation === val
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-900/40"
                    : "border-foreground-subtle/30",
                )}
              />
              {val === "portrait" ? labels.portrait : labels.landscape}
            </button>
          ))}
        </div>
      </div>

      {/* ── Page Size (dropdown) ── */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          {labels.pageSizeLabel}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
            className={cn(
              "w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-medium transition-all cursor-pointer",
              sizeDropdownOpen
                ? "border-blue-400 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/40"
                : "border-border hover:border-foreground-subtle",
            )}
          >
            <span className="text-foreground">{displayLabel}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-foreground-subtle transition-transform duration-200",
                sizeDropdownOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {sizeDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setSizeDropdownOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-xl border border-border-muted bg-background-elevated shadow-xl"
                >
                  {(["doc", "photo", "other"] as const).map((group) => {
                    const items = ALL_SIZES.filter((s) => s.group === group);
                    return (
                      <div key={group}>
                        <p className="px-3 pt-3 pb-1.5 text-[10px] font-extrabold text-foreground uppercase tracking-widest border-t border-border-muted first:border-t-0">
                          {groupLabelMap[group]}
                        </p>
                        {items.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              onPageSizeChange(opt.value);
                              setSizeDropdownOpen(false);
                            }}
                            className={cn(
                              "flex w-full items-center justify-between px-3 py-2 text-sm transition-colors cursor-pointer",
                              pageSize === opt.value
                                ? "bg-blue-50/60 dark:bg-blue-950/20 text-foreground font-semibold"
                                : "text-foreground-muted hover:bg-background-muted hover:text-foreground",
                            )}
                          >
                            <span>{opt.label}</span>
                            <span className="text-[11px] text-foreground-subtle">
                              {opt.size}
                            </span>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Margin ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            {labels.marginLabel}
          </label>
          <span className="text-xs font-medium text-foreground-muted tabular-nums">
            {marginMm === 0 ? labels.marginNone : `${marginMm.toFixed(1)}${labels.marginUnit}`}
          </span>
        </div>

        {/* Preset buttons */}
        <div className="grid grid-cols-3 gap-1.5">
          {MARGIN_PRESETS.map((preset) => (
            <button
              key={preset.mm}
              type="button"
              onClick={() => onMarginMmChange(preset.mm)}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                Math.abs(marginMm - preset.mm) < 0.05
                  ? "border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-foreground"
                  : "border-border text-foreground-muted hover:border-foreground-subtle",
              )}
            >
              {labels[preset.labelKey]}
            </button>
          ))}
        </div>

        {/* Slider */}
        <input
          type="range"
          min={MARGIN_MIN}
          max={MARGIN_MAX}
          step={MARGIN_STEP}
          value={marginMm}
          onChange={(e) => onMarginMmChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border accent-blue-500"
        />
      </div>

      {/* ── Merge All (only when multiple files) ── */}
      {fileCount > 1 && (
        <button
          type="button"
          onClick={() => onMergeAllChange(!mergeAll)}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all cursor-pointer",
            mergeAll
              ? "border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
              : "border-border hover:border-foreground-subtle",
          )}
        >
          <div
            className={cn(
              "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
              mergeAll
                ? "border-blue-500 bg-blue-500"
                : "border-foreground-subtle/30",
            )}
          >
            {mergeAll && <Check className="h-3 w-3 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-foreground">
              {labels.mergeAllLabel}
            </span>
            <p className="text-[11px] text-foreground-muted">
              {labels.mergeAllDesc}
            </p>
          </div>
        </button>
      )}

      {/* ── Info ── */}
      <p className="text-xs text-foreground-muted">
        {labels.convertInfo}
      </p>
    </div>
  );
}
