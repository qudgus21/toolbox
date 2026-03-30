"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Monitor, Gift, ShieldCheck, UserX, Search, Sparkles } from "lucide-react";
import { Container } from "@/lib/ui";
import { apps } from "@/lib/apps";
import { appIconMap } from "@/lib/app-icons";
import { useTrack, landingEvents } from "@/lib/analytics";
import type { LandingDictionary } from "@/lib/i18n/landing-config";

interface PopularToolInfo {
  slug: string;
  appSlug: string;
  title: string;
  description: string;
  emoji: string;
  href: string;
}

interface LandingContentProps {
  dict: LandingDictionary;
  locale: string;
  popularTools: PopularToolInfo[];
  allTools: PopularToolInfo[];
}

/* Shared IntersectionObserver for all AnimatedSections — single observer instead of 5 */
const sharedObserverCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;
function getSharedObserver() {
  if (sharedObserver) return sharedObserver;
  if (typeof window === "undefined") return null;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          sharedObserverCallbacks.get(entry.target)?.();
          sharedObserver?.unobserve(entry.target);
          sharedObserverCallbacks.delete(entry.target);
        }
      }
    },
    { rootMargin: "-80px" },
  );
  return sharedObserver;
}

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const io = getSharedObserver();
    if (!el || !io) return;
    sharedObserverCallbacks.set(el, () => setVisible(true));
    io.observe(el);
    return () => { io.unobserve(el); sharedObserverCallbacks.delete(el); };
  }, []);

  return (
    <section
      ref={ref}
      className={`${className ?? ""} transition-all duration-600 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </section>
  );
}

export function LandingContent({ dict, locale, popularTools, allTools }: LandingContentProps) {
  const track = useTrack("landing", landingEvents);
  const [search, setSearch] = useState("");
  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* Lazy-load icon maps — only when user starts searching */
  type IconMap = Record<string, React.ComponentType<{ className?: string }>>;
  const [iconMaps, setIconMaps] = useState<{ pdf: IconMap; image: IconMap } | null>(null);
  const iconMapsLoadedRef = useRef(false);
  const loadIconMaps = useCallback(() => {
    if (iconMapsLoadedRef.current) return;
    iconMapsLoadedRef.current = true;
    Promise.all([
      import("@/lib/pdf/tool-icons").then((m) => m.toolIconMap),
      import("@/lib/image/tool-icons").then((m) => m.toolIconMap),
    ]).then(([pdf, image]) => setIconMaps({ pdf, image }));
  }, []);

  // 검색어 디바운스 추적
  useEffect(() => {
    if (search.length < 2) return;
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      track.searchQuery({ search_term: search });
    }, 500);
    return () => clearTimeout(searchTimerRef.current);
  }, [search, track]);

  const searchResults = useMemo(() => {
    if (search.length < 2) return [];
    const q = search.toLowerCase();
    return allTools.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [search, allTools]);

  const isSearching = search.length >= 2;

  return (
    <main className="pb-0">
      {/* Search Section */}
      <section className="relative -mt-4 mb-8 sm:mb-12">
        <Container size="md">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-subtle" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={loadIconMaps}
              placeholder={dict.hero.searchPlaceholder}
              className="w-full rounded-2xl border border-border bg-background-elevated pl-12 pr-5 py-4 text-base text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 shadow-lg transition-all"
            />
            {/* Search Results Dropdown */}
            {isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border bg-background shadow-xl overflow-hidden">
                {searchResults.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-foreground-muted">
                    {dict.search.noResults}
                  </div>
                ) : (
                  searchResults.map((tool) => {
                    const app = apps.find((a) => a.slug === tool.appSlug);
                    const ToolIcon = iconMaps?.[tool.appSlug as "pdf" | "image"]?.[tool.slug];
                    return (
                      <Link
                        key={`${tool.appSlug}-${tool.slug}`}
                        href={tool.href}
                        onClick={() => track.searchResultClick({ tool_slug: tool.slug, app_slug: tool.appSlug })}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-background-muted transition-colors border-b border-border/50 last:border-0"
                      >
                        {ToolIcon ? <ToolIcon className="h-6 w-6 shrink-0" /> : <span className="text-xl shrink-0">{tool.emoji}</span>}
                        <div className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-foreground">{tool.title}</span>
                          <span className="block text-xs text-foreground-muted truncate">{tool.description}</span>
                        </div>
                        <span className={`shrink-0 text-[10px] font-bold rounded px-1.5 py-0.5 ${
                          app?.slug === "pdf"
                            ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                        }`}>
                          {app?.slug.toUpperCase()}
                        </span>
                      </Link>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <AnimatedSection className="py-8 sm:py-10">
        <Container size="lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: dict.stats.tools, label: dict.stats.toolsLabel, gradient: "from-purple-500 to-indigo-500" },
              { value: dict.stats.languages, label: dict.stats.languagesLabel, gradient: "from-blue-500 to-cyan-500" },
              { value: dict.stats.users, label: dict.stats.usersLabel, gradient: "from-green-500 to-emerald-500" },
              { value: dict.stats.price, label: dict.stats.priceLabel, gradient: "from-amber-500 to-orange-500" },
            ].map((stat) => (
              <div key={stat.label} className="relative group">
                <div className="rounded-2xl border border-border/60 bg-background-elevated p-5 text-center sm:transition-all sm:duration-300 sm:hover:shadow-md sm:hover:-translate-y-0.5">
                  <div className={`text-3xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent sm:text-4xl`}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-foreground-muted sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* App Showcase Cards */}
      <AnimatedSection className="py-8 sm:py-12">
        <Container size="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {apps.map((app, index) => {
              const appDict = dict.apps[app.slug];
              const isLastRow = index >= 3;
              return (
                <Link
                  key={app.slug}
                  href={`/${locale}/${app.slug}`}
                  onClick={() => track.appCardClick({ app_slug: app.slug })}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border ${app.accentBorder} p-8 sm:transition-all sm:duration-300 sm:hover:shadow-xl sm:hover:-translate-y-1 lg:col-span-2 ${isLastRow && index === 3 ? "lg:col-start-2" : ""}`}
                >
                  {/* Gradient bg */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${app.accentFrom} ${app.accentTo} opacity-[0.04] dark:opacity-[0.08] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity`} />
                  {/* Decorative SVG */}
                  <svg className="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.04] dark:opacity-[0.06]" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" className={app.accentText} />
                    <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="2" className={app.accentText} />
                    <circle cx="60" cy="60" r="15" fill="currentColor" className={app.accentText} />
                  </svg>

                  <div className="relative flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${app.accentFrom} ${app.accentTo} shadow-md p-2`}>
                        {(() => { const AppIcon = appIconMap[app.slug]; return AppIcon ? <AppIcon className="h-full w-full drop-shadow-sm" /> : null; })()}
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${app.accentText} ${app.accentBg}`}>
                        <Sparkles className="h-3 w-3" />
                        {appDict?.toolCount}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      {appDict?.name ?? app.slug}
                    </h2>
                    <p className="text-sm text-foreground-muted mb-6 leading-relaxed flex-1">
                      {appDict?.description}
                    </p>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${app.accentText} group-hover:gap-3 transition-all duration-300`}>
                      {appDict?.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </AnimatedSection>

      {/* Popular Tools */}
      {popularTools.length > 0 && (
        <AnimatedSection className="py-10 sm:py-14">
          <Container size="lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {dict.popularTools.sectionTitle}
              </h2>
              <p className="mt-2 text-sm text-foreground-muted">
                {dict.popularTools.sectionSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularTools.map((tool) => {
                const app = apps.find((a) => a.slug === tool.appSlug);
                const ToolIcon = iconMaps?.[tool.appSlug as "pdf" | "image"]?.[tool.slug];
                return (
                  <div key={`${tool.appSlug}-${tool.slug}`}>
                    <Link
                      href={tool.href}
                      onClick={() => track.popularToolClick({ tool_slug: tool.slug, app_slug: tool.appSlug })}
                      className="group flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-background-elevated p-5 shadow-sm sm:transition-all sm:duration-200 sm:hover:shadow-md sm:hover:-translate-y-1 hover:border-accent/40"
                    >
                      <div className="flex items-center gap-3">
                        {ToolIcon ? <ToolIcon className="h-7 w-7 shrink-0" /> : <span className="text-2xl">{tool.emoji}</span>}
                        <div className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-foreground">{tool.title}</span>
                          <span className={`text-[10px] font-bold ${
                            app?.slug === "pdf"
                              ? "text-red-500 dark:text-red-400"
                              : "text-blue-500 dark:text-blue-400"
                          }`}>
                            {app?.slug.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Container>
        </AnimatedSection>
      )}

      {/* Trust Section */}
      <AnimatedSection className="py-12 sm:py-16">
        <Container size="lg">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background-subtle p-8 sm:p-12">
            {/* Background decoration */}
            <svg className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] dark:opacity-[0.06]" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" />
            </svg>

            <div className="relative text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {dict.trust.sectionTitle}
              </h2>
              <p className="mt-2 text-sm text-foreground-muted">
                {dict.trust.sectionSubtitle}
              </p>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {([
                { icon: Monitor, title: dict.trust.browserBased, desc: dict.trust.browserBasedDesc, color: "from-purple-500 to-indigo-500" },
                { icon: Gift, title: dict.trust.free, desc: dict.trust.freeDesc, color: "from-amber-500 to-orange-500" },
                { icon: ShieldCheck, title: dict.trust.private, desc: dict.trust.privateDesc, color: "from-green-500 to-emerald-500" },
                { icon: UserX, title: dict.trust.noSignup, desc: dict.trust.noSignupDesc, color: "from-blue-500 to-cyan-500" },
              ] as const).map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center gap-3 p-4"
                >
                  <div className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-md`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-xs text-foreground-muted max-w-[240px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* Bottom CTA */}
      <AnimatedSection className="py-12 sm:py-16">
        <Container size="md">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 p-10 sm:p-14 text-center shadow-xl">
            {/* Decorative dots */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {dict.cta.title}
              </h2>
              <p className="mt-3 text-purple-100 text-sm sm:text-base max-w-lg mx-auto">
                {dict.cta.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {apps.map((app) => {
                  const AppIcon = appIconMap[app.slug];
                  return (
                    <Link
                      key={app.slug}
                      href={`/${locale}/${app.slug}`}
                      onClick={() => track.ctaClick({ app_slug: app.slug, section: "bottom" })}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-6 py-3 text-sm font-semibold text-purple-700 shadow-md hover:bg-white transition-colors hover:shadow-lg"
                    >
                      {AppIcon && <AppIcon className="h-5 w-5 shrink-0" />}
                      {dict.apps[app.slug]?.cta}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </main>
  );
}
