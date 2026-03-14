"use client";

interface FileInfoBarProps {
  file: File;
  pageCount?: number;
  changeLabel: string;
  onChangeFile: () => void;
  accentColor?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileInfoBar({
  file,
  pageCount,
  changeLabel,
  onChangeFile,
  accentColor,
}: FileInfoBarProps) {
  const iconBgClass = accentColor === "purple"
    ? "bg-purple-50 dark:bg-purple-950/40"
    : accentColor === "blue"
      ? "bg-blue-50 dark:bg-blue-950/40"
      : "bg-accent-muted";

  const iconTextClass = accentColor === "purple"
    ? "text-purple-600 dark:text-purple-400"
    : accentColor === "blue"
      ? "text-blue-600 dark:text-blue-400"
      : "text-accent";

  const btnHoverClass = accentColor === "purple"
    ? "hover:border-purple-500 hover:text-purple-500"
    : accentColor === "blue"
      ? "hover:border-blue-500 hover:text-blue-500"
      : "hover:border-accent hover:text-accent";

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBgClass}`}>
          <svg className={`h-5 w-5 ${iconTextClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {file.name}
          </p>
          <p className="text-xs text-foreground-muted">
            {formatSize(file.size)}
            {pageCount && (
              <span> · {pageCount}p</span>
            )}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onChangeFile}
        className={`shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted ${btnHoverClass} transition-colors cursor-pointer`}
      >
        {changeLabel}
      </button>
    </div>
  );
}
