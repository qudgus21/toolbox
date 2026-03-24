"use client";

import { cn } from "@/lib/utils";

interface StatsDisplayProps {
  stats?: Record<string, string | number | boolean>;
  labels?: Record<string, string>;
  className?: string;
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

/** Compact stats list — displayed in the right panel */
export function StatsDisplay({ stats, labels, className }: StatsDisplayProps) {
  if (!stats) return null;

  const entries = Object.entries(stats)
    .filter((e): e is [string, string | number] => typeof e[1] !== "boolean");

  return (
    <div className={cn(
      "rounded-2xl border border-border/50 bg-gradient-to-b from-background-elevated to-background overflow-hidden shadow-sm",
      className,
    )}>
      {entries.map(([key, value], i) => (
        <div
          key={key}
          className={cn(
            "flex items-center justify-between px-4 py-3",
            i < entries.length - 1 && "border-b border-border/30",
          )}
        >
          <span className="text-sm text-foreground-muted">{labels?.[key] ?? formatLabel(key)}</span>
          <span className="text-sm font-bold text-foreground tabular-nums">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
        </div>
      ))}
    </div>
  );
}

