"use client";

import { FlipHorizontal, FlipVertical } from "lucide-react";

export interface FlipOptionsValue {
  horizontal: boolean;
  vertical: boolean;
}

interface FlipOptionsProps {
  value: FlipOptionsValue;
  onChange: (value: FlipOptionsValue) => void;
}

export function FlipOptions({ value, onChange }: FlipOptionsProps) {
  return (
    <div className="space-y-4">
      <label className="block text-xs font-medium text-foreground-muted mb-2">
        Flip Direction
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
          <span className="text-xs font-medium">Flip Horizontal</span>
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
          <span className="text-xs font-medium">Flip Vertical</span>
        </button>
      </div>
      {!value.horizontal && !value.vertical && (
        <p className="text-xs text-foreground-muted text-center">
          Select at least one direction to flip
        </p>
      )}
    </div>
  );
}

export function getDefaultFlipOptions(): FlipOptionsValue {
  return { horizontal: true, vertical: false };
}
