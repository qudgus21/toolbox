"use client";

import { ImageIcon, Info } from "lucide-react";

export interface ExtractImagesLabels {
  dropFile: string;
  changeFile: string;
  description: string;
  jpegNote: string;
  pngNote: string;
  minSizeNote: string;
  noImagesFound: string;
}

interface ExtractImagesOptionsProps {
  labels: ExtractImagesLabels;
}

export function ExtractImagesOptions({ labels }: ExtractImagesOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Info card */}
      <div className="rounded-xl border border-border bg-background-muted px-4 py-3 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ImageIcon className="h-4 w-4 text-blue-500" />
          {labels.description}
        </div>
        <div className="space-y-1.5">
          {[labels.jpegNote, labels.pngNote, labels.minSizeNote].map((note) => (
            <div
              key={note}
              className="flex items-start gap-2 text-xs text-foreground-muted"
            >
              <Info className="h-3 w-3 mt-0.5 shrink-0 text-foreground-subtle" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
