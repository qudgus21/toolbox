"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List, Shield, Trash2, Gift, Cloud } from "lucide-react";
import { Container, ToolCard } from "@toolbox/ui";
import { tools, categories, categoryColors } from "@/lib/tools";
import type { Dictionary } from "@toolbox/i18n";

type CategoryFilter = "all" | "organize" | "convert" | "edit" | "optimize" | "security";

const categoryLabelKeys: Record<string, keyof Dictionary["home"]> = {
  organize: "categoryOrganize",
  convert: "categoryConvert",
  edit: "categoryEdit",
  optimize: "categoryOptimize",
  security: "categorySecurity",
};

interface HomeContentProps {
  dict: Dictionary;
  locale: string;
}

export function HomeContent({ dict, locale }: HomeContentProps) {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTools = useMemo(() => {
    let result = activeTab === "all" ? tools : tools.filter((t) => t.category === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = tools.filter((t) => {
        const td = dict.tools[t.slug];
        return (
          td.title.toLowerCase().includes(q) ||
          td.description.toLowerCase().includes(q) ||
          t.slug.includes(q)
        );
      });
    }
    return result;
  }, [activeTab, search, dict.tools]);

  const isSearching = search.trim().length > 0;

  const equalizeCardHeights = useCallback((node: HTMLDivElement | null) => {
    if (!node || viewMode !== "grid") return;
    requestAnimationFrame(() => {
      const cards = node.querySelectorAll<HTMLElement>("[data-card]");
      cards.forEach((c) => (c.style.minHeight = ""));
      let max = 0;
      cards.forEach((c) => { max = Math.max(max, c.offsetHeight); });
      if (max > 0) {
        cards.forEach((c) => (c.style.minHeight = `${max}px`));
      }
    });
  }, [filteredTools, viewMode]);

  return (
    <main className="py-8">
      <Container size="full" className="max-w-screen-2xl">
        {/* Hero */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {dict.home.title}{" "}
            <span className="text-accent">{dict.home.titleAccent}</span>
          </h1>
          <p className="mt-2 text-base text-foreground-muted max-w-2xl mx-auto">
            {dict.home.description}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-foreground-subtle" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.home.searchPlaceholder}
              className="w-full rounded-full border border-border bg-background-elevated pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground-subtle focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus/30 transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Tabs + View Toggle */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <button
            onClick={() => { setActiveTab("all"); setSearch(""); }}
            className={`cursor-pointer rounded-full border px-6 py-2 text-base font-bold transition-colors ${
              activeTab === "all" && !isSearching
                ? "bg-zinc-800 border-zinc-800 text-white dark:bg-zinc-200 dark:border-zinc-200 dark:text-zinc-900"
                : "border-border dark:border-zinc-600 text-foreground-muted hover:bg-background-muted hover:text-foreground hover:border-foreground-subtle"
            }`}
          >
            {dict.home.tabAll}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveTab(cat.key); setSearch(""); }}
              className={`cursor-pointer rounded-full border px-6 py-2 text-base font-bold transition-colors ${
                activeTab === cat.key && !isSearching
                  ? "bg-zinc-800 border-zinc-800 text-white dark:bg-zinc-200 dark:border-zinc-200 dark:text-zinc-900"
                  : "border-border dark:border-zinc-600 text-foreground-muted hover:bg-background-muted hover:text-foreground hover:border-foreground-subtle"
              }`}
            >
              {cat.emoji} {dict.home[categoryLabelKeys[cat.key]]}
            </button>
          ))}

          {/* View Toggle */}
          <div className="hidden sm:flex items-center gap-1 ml-2 rounded-full border border-border p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer rounded-full p-1.5 transition-colors ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-foreground-muted hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`cursor-pointer rounded-full p-1.5 transition-colors ${viewMode === "list" ? "bg-accent text-accent-foreground" : "text-foreground-muted hover:text-foreground"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Tool Grid / List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${search}-${viewMode}`}
            ref={equalizeCardHeights}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                : "flex flex-col gap-2"
            }
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.03 },
              },
            }}
          >
            {filteredTools.length === 0 ? (
              <motion.p
                className="col-span-full text-center py-12 text-foreground-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {dict.home.noResults}
              </motion.p>
            ) : (
              filteredTools.map((tool) => {
                const toolDict = dict.tools[tool.slug];
                return (
                  <motion.div
                    key={tool.slug}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {viewMode === "grid" ? (
                      <ToolCard
                        data-card
                        href={`/${locale}/${tool.slug}`}
                        icon={tool.icon}
                        title={toolDict.title}
                        description={toolDict.description}
                        emoji={tool.emoji}
                        iconColorClasses={categoryColors[tool.category]}
                      />
                    ) : (
                      <a
                        href={`/${locale}/${tool.slug}`}
                        className="group flex items-center gap-4 rounded-lg border border-border/60 bg-background-elevated px-4 py-3 shadow-sm transition-colors hover:border-accent/50 hover:shadow-md"
                      >
                        {tool.emoji && <span className="text-2xl shrink-0">{tool.emoji}</span>}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-foreground">{toolDict.title}</h3>
                          <p className="text-xs text-foreground-muted truncate">{toolDict.description}</p>
                        </div>
                      </a>
                    )}
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Trust Section */}
        <motion.section
          className="mt-16 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: dict.trust.encryption, desc: dict.trust.encryptionDesc },
              { icon: Trash2, title: dict.trust.autoDelete, desc: dict.trust.autoDeleteDesc },
              { icon: Gift, title: dict.trust.free, desc: dict.trust.freeDesc },
              { icon: Cloud, title: dict.trust.cloud, desc: dict.trust.cloudDesc },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-2 py-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-muted text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-foreground-muted max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </Container>
    </main>
  );
}
