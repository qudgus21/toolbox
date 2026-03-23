"use client";

interface ProcessingOverlayProps {
  progress: number;
  label: string;
}

export function ProcessingOverlay({ progress, label }: ProcessingOverlayProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative h-20 w-20">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-border"
          />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${progress * 0.975} 97.5`}
            strokeLinecap="round"
            className="text-accent transition-all duration-300"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <p className="text-sm font-medium text-foreground-muted">{label}</p>
    </div>
  );
}
