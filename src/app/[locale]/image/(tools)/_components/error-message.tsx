"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  retryLabel: string;
}

export function ErrorMessage({ message, onRetry, retryLabel }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
        <AlertTriangle className="h-6 w-6 text-red-500" />
      </div>
      <p className="max-w-sm text-center text-sm text-foreground-muted">{message}</p>
      <button
        onClick={onRetry}
        className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
        {retryLabel}
      </button>
    </div>
  );
}
