"use client";

import { FileText, Info } from "lucide-react";

export interface PdfToTextLabels {
  description: string;
  pageBreakNote: string;
  encodingNote: string;
  convertButton: string;
}

interface PdfToTextOptionsProps {
  labels: PdfToTextLabels;
}

export function PdfToTextOptions({ labels }: PdfToTextOptionsProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground">
              {labels.description}
            </p>
            <div className="space-y-1">
              <p className="flex items-start gap-1.5 text-xs text-foreground-muted">
                <Info className="h-3 w-3 mt-0.5 shrink-0 text-blue-500" />
                {labels.pageBreakNote}
              </p>
              <p className="flex items-start gap-1.5 text-xs text-foreground-muted">
                <Info className="h-3 w-3 mt-0.5 shrink-0 text-blue-500" />
                {labels.encodingNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
