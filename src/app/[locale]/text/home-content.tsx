"use client";

import { useState, useMemo, useCallback, useEffect, useRef, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List, Shield, Trash2, Gift, Monitor, Star } from "lucide-react";
import Link from "next/link";
import { Container, ToolCard } from "@/lib/ui";
import { tools, categories, categoryColors } from "@/lib/text/tools";
import { toolIconMap, categoryIconMap } from "@/lib/text/tool-icons";
import { getAppFavorites, toggleAppFavorite, reorderAppFavorites } from "@/lib/storage";
import { useTrack, textEvents } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { TextDictionary } from "@/lib/i18n/text-config";

const FavoritesDnd = lazy(() => import("./favorites-dnd").then(m => ({ default: m.FavoritesDnd })));

type CategoryFilter = "all" | "count" | "transform" | "clean" | "find" | "encode" | "generate";

const categoryTabColors: Record<Exclude<CategoryFilter, "all">, { icon: string }> = {
  count:     { icon: "text-amber-500" },
  transform: { icon: "text-blue-500" },
  clean:     { icon: "text-purple-500" },
  find:      { icon: "text-cyan-500" },
  encode:    { icon: "text-green-500" },
  generate:  { icon: "text-rose-500" },
};

const categoryLabelKeys: Record<string, keyof TextDictionary["home"]> = {
  count: "categoryCount",
  transform: "categoryTransform",
  clean: "categoryClean",
  find: "categoryFind",
  encode: "categoryEncode",
  generate: "categoryGenerate",
};

interface HomeContentProps {
  dict: TextDictionary;
  locale: string;
}

function FavToast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg"
    >
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      {message}
    </motion.div>
  );
}

const FAV_HINT_KEY = "text-fav-hint-seen";

export function HomeContent({ dict, locale }: HomeContentProps) {
  const track = useTrack("text", textEvents);
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favSlugs, setFavSlugs] = useState<string[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [disableFavTransition, setDisableFavTransition] = useState(false);
  const [favHintSlug, setFavHintSlug] = useState<string | null>(null);
  const didDragRef = useRef(false);

  const handleFavHintEnter = useCallback((slug: string) => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(FAV_HINT_KEY)) return;
    setFavHintSlug(slug);
    localStorage.setItem(FAV_HINT_KEY, "1");
  }, []);

  useEffect(() => {
    if (!favHintSlug) return;
    const t = setTimeout(() => setFavHintSlug(null), 2500);
    return () => clearTimeout(t);
  }, [favHintSlug]);

  const refreshFavs = useCallback(() => {
    setFavSlugs(getAppFavorites("text"));
  }, []);

  useEffect(() => {
    refreshFavs();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") refreshFavs();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [refreshFavs]);

  const handleToggleFav = useCallback((slug: string) => {
    const added = toggleAppFavorite("text", slug);
    setFavSlugs(getAppFavorites("text"));
    setToast(added ? dict.common.favoriteAdded : dict.common.favoriteRemoved);
    track.favoriteToggle({ tool_slug: slug, action: added ? "add" : "remove" });
  }, [dict.common, track]);


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
    // comingSoon 도구를 맨 뒤로
    return [...result].sort((a, b) => ((a as any).comingSoon ? 1 : 0) - ((b as any).comingSoon ? 1 : 0));
  }, [activeTab, search, dict.tools]);

  const favTools = useMemo(
    () => (favSlugs ?? []).map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as typeof tools,
    [favSlugs],
  );

  // Search GA tracking (debounce 500ms, min 2 chars)
  useEffect(() => {
    if (search.trim().length < 2) return;
    const timer = setTimeout(() => {
      track.searchQuery({ search_term: search.trim() });
    }, 500);
    return () => clearTimeout(timer);
  }, [search, track]);

  const isSearching = search.trim().length > 0;
  const showFavSection = favSlugs !== null && !isSearching && activeTab === "all" && favTools.length > 0;

  const gridRef = useRef<HTMLDivElement>(null);
  const favGridRef = useRef<HTMLDivElement>(null);

  const renderToolCard = (tool: typeof tools[number], ctx: "grid" | "fav" = "grid") => {
    const toolDict = dict.tools[tool.slug];
    const isFav = favSlugs?.includes(tool.slug) ?? false;
    const handleToolClick = () => {
      track.toolCardClick({
        tool_slug: tool.slug,
        source: isSearching ? "search" : ctx === "fav" ? "favorites" : "grid",
      });
    };
    return viewMode === "grid" ? (
      <div className={cn("relative group/fav h-full")} onClick={handleToolClick}>
        <ToolCard
          data-card
          href={`/${locale}/text/${tool.slug}`}
          linkComponent={Link}
          icon={tool.icon}
          title={toolDict.title}
          description={toolDict.description}
          toolIcon={toolIconMap[tool.slug] ? (() => { const Icon = toolIconMap[tool.slug]; return <Icon className="h-10 w-auto" />; })() : undefined}
          iconColorClasses={categoryColors[tool.category]}
        />
        <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleFav(tool.slug); }}
            onMouseEnter={ctx === "grid" ? () => handleFavHintEnter(tool.slug) : undefined}
            className={cn(
              "absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 cursor-pointer",
              isFav
                ? "bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-600 opacity-100"
                : "bg-background/80 backdrop-blur-sm border border-transparent opacity-0 group-hover/fav:opacity-100 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60",
            )}
            aria-label={isFav ? dict.common.favoriteRemoved : dict.common.favoriteAdded}
          >
            <Star
              className={cn(
                "h-3.5 w-3.5 transition-colors",
                isFav
                  ? "fill-amber-400 text-amber-400"
                  : "text-foreground-muted hover:text-amber-400",
              )}
            />
            <AnimatePresence>
              {ctx === "grid" && favHintSlug === tool.slug && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-lg pointer-events-none"
                >
                  {dict.home.favHint}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
      </div>
    ) : (
      <div className={cn("relative group/fav")}>
        <Link
          href={`/${locale}/text/${tool.slug}`}
          onClick={handleToolClick}
          className="group flex items-center gap-4 rounded-lg border border-border/60 bg-background-elevated px-4 py-3 shadow-sm transition-colors hover:border-accent/50 hover:shadow-md"
        >
          {toolIconMap[tool.slug] ? (() => { const Icon = toolIconMap[tool.slug]; return <Icon className="h-7 w-auto shrink-0" />; })() : tool.emoji ? <span className="text-2xl shrink-0">{tool.emoji}</span> : null}
          <div className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-foreground">
              {toolDict.title}
            </span>
            <p className="text-xs text-foreground-muted truncate">{toolDict.description}</p>
          </div>
        </Link>
        <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleFav(tool.slug); }}
            onMouseEnter={ctx === "grid" ? () => handleFavHintEnter(tool.slug) : undefined}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 cursor-pointer",
              isFav
                ? "opacity-100"
                : "opacity-0 group-hover/fav:opacity-100",
            )}
            aria-label={isFav ? dict.common.favoriteRemoved : dict.common.favoriteAdded}
          >
            <Star
              className={cn(
                "h-3.5 w-3.5 transition-colors",
                isFav
                  ? "fill-amber-400 text-amber-400"
                  : "text-foreground-muted hover:text-amber-400",
              )}
            />
            <AnimatePresence>
              {ctx === "grid" && favHintSlug === tool.slug && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-lg pointer-events-none"
                >
                  {dict.home.favHint}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
      </div>
    );
  };

  return (
    <main className="pb-8">
      <Container size="full" className="max-w-screen-2xl">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-5">
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
        </div>

        {/* Category Tabs + View Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <button
            onClick={() => { setActiveTab("all"); setSearch(""); track.categoryTabClick({ category: "all" }); }}
            className={`cursor-pointer rounded-full border px-4 py-2 text-base font-bold transition-colors ${
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
              onClick={() => { setActiveTab(cat.key); setSearch(""); track.categoryTabClick({ category: cat.key }); }}
              className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-base font-bold transition-colors ${
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
              onClick={() => { setViewMode("grid"); track.viewModeToggle({ mode: "grid" }); }}
              aria-label={dict.home.gridView}
              className={`cursor-pointer rounded-full p-1.5 transition-colors ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-foreground-muted hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => { setViewMode("list"); track.viewModeToggle({ mode: "list" }); }}
              aria-label={dict.home.listView}
              className={`cursor-pointer rounded-full p-1.5 transition-colors ${viewMode === "list" ? "bg-accent text-accent-foreground" : "text-foreground-muted hover:text-foreground"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Favorites Section */}
        {showFavSection && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <h2 className="text-sm font-bold text-foreground">{dict.home.favorites}</h2>
            </div>
            <Suspense fallback={
              <div
                ref={favGridRef}
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" : "flex flex-col gap-2"}
              >
                {favTools.map((tool) => <div key={`fav-fallback-${tool.slug}`}>{renderToolCard(tool, "fav")}</div>)}
              </div>
            }>
              <FavoritesDnd
                favSlugs={favSlugs ?? []}
                setFavSlugs={setFavSlugs}
                viewMode={viewMode}
                disableFavTransition={disableFavTransition}
                setDisableFavTransition={setDisableFavTransition}
                didDragRef={didDragRef}
                hintText={dict.home.favDragHint}
                favGridRef={favGridRef}
              >
                {(slug) => {
                  const tool = favTools.find(t => t.slug === slug);
                  return tool ? renderToolCard(tool, "fav") : null;
                }}
              </FavoritesDnd>
            </Suspense>
          </section>
        )}

        {/* All Tools title (only when favorites exist) */}
        {showFavSection && (
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-foreground">{dict.nav.allTools}</h2>
          </div>
        )}

        {/* Tool Grid / List */}
        <div
          ref={gridRef}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              : "flex flex-col gap-2"
          }
        >
          {filteredTools.length === 0 ? (
            <p className="col-span-full text-center py-12 text-foreground-muted">
              {dict.home.noResults}
            </p>
          ) : (
            filteredTools.map((tool) => (
              <div key={tool.slug} className="h-full">
                {renderToolCard(tool)}
              </div>
            ))
          )}
        </div>

        {/* Trust Section */}
        <section className="mt-16 mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: dict.trust.encryption, desc: dict.trust.encryptionDesc },
              { icon: Trash2, title: dict.trust.autoDelete, desc: dict.trust.autoDeleteDesc },
              { icon: Gift, title: dict.trust.free, desc: dict.trust.freeDesc },
              { icon: Monitor, title: dict.trust.browserProcessing, desc: dict.trust.browserProcessingDesc },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-2 py-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-muted text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-foreground-muted max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <FavToast message={toast} onDone={() => setToast(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
