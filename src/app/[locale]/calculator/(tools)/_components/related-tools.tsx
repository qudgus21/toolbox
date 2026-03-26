"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { tools, type CalculatorToolDefinition } from "@/lib/calculator/tools";
import { getRecentTools } from "@/lib/storage";

interface RelatedToolsProps {
  currentSlug: string;
  locale: string;
  title: string;
  toolNames: Record<string, { title: string }>;
  className?: string;
}

function getRelatedTools(currentSlug: string, recentSlugs: string[]): CalculatorToolDefinition[] {
  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return tools.slice(0, 6);

  const used = new Set<string>([currentSlug]);
  const result: CalculatorToolDefinition[] = [];

  // 1. Recently used tools first (up to 2)
  for (const slug of recentSlugs) {
    if (used.has(slug)) continue;
    const tool = tools.find((t) => t.slug === slug);
    if (tool) {
      result.push(tool);
      used.add(slug);
    }
    if (result.length >= 2) break;
  }

  // 2. Same category
  const sameCategory = tools.filter(
    (t) => t.category === current.category && !used.has(t.slug),
  );
  for (const t of sameCategory) {
    if (result.length >= 6) break;
    result.push(t);
    used.add(t.slug);
  }

  // 3. Other categories to fill remaining slots
  const others = tools.filter((t) => !used.has(t.slug));
  for (const t of others) {
    if (result.length >= 6) break;
    result.push(t);
  }

  return result;
}

export function RelatedTools({
  currentSlug,
  locale,
  title,
  toolNames,
  className,
}: RelatedToolsProps) {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    setRecentSlugs(getRecentTools());
  }, []);

  const related = getRelatedTools(currentSlug, recentSlugs);

  return (
    <div className={cn("mt-10", className)}>
      <p className="mb-4 text-center text-sm font-semibold text-foreground-muted">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {related.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/${locale}/calculator/${tool.slug}`}
              className={cn(
                "group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-bold transition-all duration-200 cursor-pointer",
                "border-border/50 bg-gradient-to-r from-background-elevated to-background",
                "hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5 hover:-translate-y-0.5",
                "text-foreground-muted hover:text-foreground",
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 transition-colors group-hover:bg-violet-500/20">
                <Icon className="h-4 w-4" />
              </div>
              <span className="truncate">{toolNames[tool.slug]?.title ?? tool.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
