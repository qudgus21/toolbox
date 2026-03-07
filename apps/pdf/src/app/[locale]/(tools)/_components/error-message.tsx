"use client";

import { cn } from "@toolbox/utils";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@toolbox/ui";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorMessage({
  message,
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-error/30 bg-error-muted p-6 text-center",
        className,
      )}
    >
      <AlertCircle className="mx-auto h-10 w-10 text-error" />
      <p className="mt-3 text-sm font-medium text-foreground">{message}</p>
      {onRetry && (
        <Button variant="ghost" size="md" onClick={onRetry} className="mt-4">
          <RotateCcw className="mr-2 h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
