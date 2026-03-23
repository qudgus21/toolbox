"use client";

import { FlipHorizontal, FlipVertical } from "lucide-react";
import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface FlipOptionsValue {
  horizontal: boolean;
  vertical: boolean;
}

interface FlipOptionsProps {
  value: FlipOptionsValue;
  onChange: (value: FlipOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["flip"];
}

export function FlipOptions({ value, onChange, labels }: FlipOptionsProps) {
  return (
    <div className="space-y-4">
      <label className="block text-xs font-medium text-foreground-muted mb-2">
        {labels.direction}
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange({ ...value, horizontal: !value.horizontal })}
          className={`flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 transition-colors cursor-pointer ${
            value.horizontal
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
          }`}
        >
          <FlipHorizontal className="h-8 w-8" />
          <span className="text-xs font-medium">{labels.horizontal}</span>
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...value, vertical: !value.vertical })}
          className={`flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 transition-colors cursor-pointer ${
            value.vertical
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
          }`}
        >
          <FlipVertical className="h-8 w-8" />
          <span className="text-xs font-medium">{labels.vertical}</span>
        </button>
      </div>
      {!value.horizontal && !value.vertical && (
        <p className="text-xs text-foreground-muted text-center">
          {labels.selectOne}
        </p>
      )}
    </div>
  );
}

export function getDefaultFlipOptions(): FlipOptionsValue {
  return { horizontal: true, vertical: false };
}
