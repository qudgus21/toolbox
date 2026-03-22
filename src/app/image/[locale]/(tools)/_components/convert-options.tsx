"use client";

import { ArrowRight } from "lucide-react";
import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface ConvertOptionsValue {
  quality?: number;
}

interface ConvertOptionsProps {
  slug: string;
  value: ConvertOptionsValue;
  onChange: (value: ConvertOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["convert"];
}

function parseConversionInfo(slug: string): { from: string; to: string } | null {
  const match = slug.match(/^(.+)-to-(.+)$/);
  if (!match) return null;
  return { from: match[1].toUpperCase(), to: match[2].toUpperCase() };
}

const LOSSY_FORMATS = ["JPG", "JPEG", "WEBP"];

export function ConvertOptions({ slug, value, onChange, labels }: ConvertOptionsProps) {
  const info = parseConversionInfo(slug);
  if (!info) return null;

  const isLossyTarget = LOSSY_FORMATS.includes(info.to);

  return (
    <div className="space-y-5">
      {/* Conversion direction display */}
      <div className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-subtle p-4">
        <span className="rounded-md bg-accent/10 px-3 py-1.5 text-sm font-bold text-accent">
          {info.from}
        </span>
        <ArrowRight className="h-5 w-5 text-foreground-muted" />
        <span className="rounded-md bg-accent/10 px-3 py-1.5 text-sm font-bold text-accent">
          {info.to}
        </span>
      </div>

      {/* Quality slider for lossy output formats */}
      {isLossyTarget && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-foreground-muted">
              {labels.quality}
            </label>
            <span className="text-sm font-semibold text-foreground">
              {value.quality ?? 92}%
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={value.quality ?? 92}
            onChange={(e) => onChange({ ...value, quality: Number(e.target.value) })}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-foreground-muted mt-1">
            <span>{labels.smallerFile}</span>
            <span>{labels.bestQuality}</span>
          </div>
        </div>
      )}

      {!isLossyTarget && (
        <p className="text-xs text-foreground-muted text-center">
          {info.to} {labels.losslessMessage}
        </p>
      )}
    </div>
  );
}

export function getDefaultConvertOptions(slug: string): ConvertOptionsValue {
  const info = parseConversionInfo(slug);
  const isLossy = info && LOSSY_FORMATS.includes(info.to);
  return { quality: isLossy ? 92 : undefined };
}
