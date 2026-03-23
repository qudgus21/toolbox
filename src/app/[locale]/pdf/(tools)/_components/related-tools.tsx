"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { tools, type ToolDefinition } from "@/lib/pdf/tools";
import { getRecentTools } from "@/lib/storage";

interface RelatedToolsProps {
  currentSlug: string;
  locale: string;
  title?: string;
  className?: string;
}

function getRelatedTools(currentSlug: string, recentSlugs: string[]): ToolDefinition[] {
  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return tools.slice(0, 6);

  const used = new Set<string>([currentSlug]);
  const result: ToolDefinition[] = [];

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
  title = "Try other tools",
  className,
}: RelatedToolsProps) {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    setRecentSlugs(getRecentTools());
  }, []);

  const related = getRelatedTools(currentSlug, recentSlugs);

  return (
    <div className={cn("mt-8", className)}>
      <p className="mb-4 text-center text-sm font-medium text-foreground-muted">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {related.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/${locale}/pdf/${tool.slug}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-background-elevated px-4 py-3 text-sm font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground hover:shadow-sm transition-all duration-150 cursor-pointer"
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-accent" />
              <span className="truncate">{tool.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
