"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Lightbulb, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

const categoryIcons = {
  guide: BookOpen,
  tips: Lightbulb,
  knowledge: GraduationCap,
} as const;

interface BlogArticleItem {
  slug: string;
  category: "guide" | "tips" | "knowledge";
  title: string;
  description: string;
}

interface BlogListProps {
  articles: BlogArticleItem[];
  locale: string;
  readMoreLabel: string;
  categoryLabels: Record<string, string>;
  prevLabel: string;
  nextLabel: string;
  pageLabel: string;
  paginationLabel: string;
}

export function BlogList({
  articles,
  locale,
  readMoreLabel,
  categoryLabels,
  prevLabel,
  nextLabel,
  pageLabel,
  paginationLabel,
}: BlogListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visible = articles.slice(start, start + ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => {
          const Icon = categoryIcons[article.category];
          return (
            <Link
              key={article.slug}
              href={`/${locale}/blog/${article.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-colors hover:border-accent/40 hover:bg-background-subtle"
            >
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium text-accent">
                  {categoryLabels[article.category]}
                </span>
              </div>
              <h2 className="mb-2 text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-foreground-muted line-clamp-3 flex-1">
                {article.description}
              </p>
              <span className="mt-4 text-xs font-medium text-accent">
                {readMoreLabel} →
              </span>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2" aria-label={paginationLabel}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background-subtle disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
            {prevLabel}
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`min-w-[36px] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-accent text-white"
                    : "text-foreground hover:bg-background-subtle"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background-subtle disabled:opacity-40 disabled:pointer-events-none"
          >
            {nextLabel}
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </>
  );
}
