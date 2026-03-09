"use client";

import { Info } from "lucide-react";

interface PdfToWordLabels {
  notice: string;
}

interface PdfToWordOptionsProps {
  labels: PdfToWordLabels;
}

export function PdfToWordOptions({ labels }: PdfToWordOptionsProps) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-blue-300 dark:border-blue-600/50 bg-blue-50 dark:bg-blue-950/20 px-3.5 py-2.5">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
      <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
        {labels.notice}
      </p>
    </div>
  );
}
