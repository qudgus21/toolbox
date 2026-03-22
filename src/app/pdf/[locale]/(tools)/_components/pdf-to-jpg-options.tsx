"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type ImageQuality = "high" | "medium" | "low";

export interface PdfToJpgLabels {
  qualityLabel: string;
  qualityHigh: string;
  qualityHighDesc: string;
  qualityMedium: string;
  qualityMediumDesc: string;
  qualityLow: string;
  qualityLowDesc: string;
  convertInfo: string;
  convertButton: string;
}

interface PdfToJpgOptionsProps {
  quality: ImageQuality;
  onQualityChange: (quality: ImageQuality) => void;
  labels: PdfToJpgLabels;
}

const qualityOptions: { value: ImageQuality; dpi: string }[] = [
  { value: "high", dpi: "216 DPI" },
  { value: "medium", dpi: "144 DPI" },
  { value: "low", dpi: "108 DPI" },
];

export function PdfToJpgOptions({
  quality,
  onQualityChange,
  labels,
}: PdfToJpgOptionsProps) {
  const qualityLabels: Record<ImageQuality, { name: string; desc: string }> = {
    high: { name: labels.qualityHigh, desc: labels.qualityHighDesc },
    medium: { name: labels.qualityMedium, desc: labels.qualityMediumDesc },
    low: { name: labels.qualityLow, desc: labels.qualityLowDesc },
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">
        {labels.qualityLabel}
      </label>
      <div className="space-y-2">
        {qualityOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onQualityChange(opt.value)}
            className={cn(
              "w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all cursor-pointer",
              quality === opt.value
                ? "border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                : "border-border hover:border-foreground-subtle",
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                quality === opt.value
                  ? "border-blue-500 bg-blue-500"
                  : "border-foreground-subtle/30",
              )}
            >
              {quality === opt.value && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {qualityLabels[opt.value].name}
                </span>
                <span className="text-[10px] font-medium text-foreground-subtle bg-background-muted rounded px-1.5 py-0.5">
                  {opt.dpi}
                </span>
              </div>
              <p className="text-xs text-foreground-muted mt-0.5">
                {qualityLabels[opt.value].desc}
              </p>
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-foreground-muted mt-2">
        {labels.convertInfo}
      </p>
    </div>
  );
}
