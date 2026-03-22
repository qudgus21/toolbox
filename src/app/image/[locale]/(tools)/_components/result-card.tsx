"use client";

import { Download, RotateCcw } from "lucide-react";
import type { ImageProcessingResult } from "@/lib/image/types";
import type { ImageDictionary } from "@/lib/i18n/image-config";

interface ResultCardProps {
  result: ImageProcessingResult;
  onDownload: () => void;
  onReset: () => void;
  labels: ImageDictionary["common"];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResultCard({ result, onDownload, onReset, labels }: ResultCardProps) {
  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* Preview */}
      {result.previewUrl && (
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.previewUrl}
            alt={result.filename}
            className="mx-auto max-h-64 object-contain"
          />
        </div>
      )}

      {/* Info */}
      <div className="rounded-lg border border-border bg-background p-4 text-center">
        <p className="text-sm font-medium text-foreground truncate">{result.filename}</p>
        <div className="mt-2 flex items-center justify-center gap-4 text-xs text-foreground-muted">
          <span>{formatSize(result.size)}</span>
          {result.width && result.height && (
            <span>{result.width} x {result.height}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onDownload}
          className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover transition-colors"
        >
          <Download className="h-4 w-4" />
          {labels.download}
        </button>
        <button
          onClick={onReset}
          className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          {labels.startOver}
        </button>
      </div>
    </div>
  );
}
