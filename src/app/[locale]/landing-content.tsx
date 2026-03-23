"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Monitor, Gift, ShieldCheck, UserX, Search, Sparkles } from "lucide-react";
import { Container } from "@/lib/ui";
import { apps } from "@/lib/apps";
import { appIconMap } from "@/lib/app-icons";
import { toolIconMap as pdfToolIcons } from "@/lib/pdf/tool-icons";
import { toolIconMap as imageToolIcons } from "@/lib/image/tool-icons";
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

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export function LandingContent({ dict, locale, popularTools, allTools }: LandingContentProps) {
  const [search, setSearch] = useState("");

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
              placeholder={dict.hero.searchPlaceholder}
              className="w-full rounded-2xl border border-border bg-background-elevated pl-12 pr-5 py-4 text-base text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 shadow-lg transition-all"
            />
            {/* Search Results Dropdown */}
            {isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border bg-background shadow-xl overflow-hidden">
                {searchResults.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-foreground-muted">
                    No results found
                  </div>
                ) : (
                  searchResults.map((tool) => {
                    const app = apps.find((a) => a.slug === tool.appSlug);
                    const iconMap = tool.appSlug === "pdf" ? pdfToolIcons : imageToolIcons;
                    const ToolIcon = iconMap[tool.slug];
                    return (
                      <Link
                        key={`${tool.appSlug}-${tool.slug}`}
                        href={tool.href}
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
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="relative group"
              >
                <div className="rounded-2xl border border-border/60 bg-background-elevated p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className={`text-3xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent sm:text-4xl`}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-foreground-muted sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* App Showcase Cards */}
      <AnimatedSection className="py-8 sm:py-12">
        <Container size="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {apps.map((app, i) => {
              const appDict = dict.apps[app.slug];
              return (
                <motion.div
                  key={app.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                >
                  <Link
                    href={app.href}
                    className={`group relative block overflow-hidden rounded-2xl border ${app.accentBorder} p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    {/* Gradient bg */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${app.accentFrom} ${app.accentTo} opacity-[0.04] dark:opacity-[0.08] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity`} />
                    {/* Decorative SVG */}
                    <svg className="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.04] dark:opacity-[0.06]" viewBox="0 0 120 120" fill="none">
                      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" className={app.accentText} />
                      <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="2" className={app.accentText} />
                      <circle cx="60" cy="60" r="15" fill="currentColor" className={app.accentText} />
                    </svg>

                    <div className="relative">
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
                      <p className="text-sm text-foreground-muted mb-6 leading-relaxed">
                        {appDict?.description}
                      </p>
                      <span className={`inline-flex items-center gap-2 text-sm font-semibold ${app.accentText} group-hover:gap-3 transition-all duration-300`}>
                        {appDict?.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
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
              {popularTools.map((tool, i) => {
                const app = apps.find((a) => a.slug === tool.appSlug);
                const iconMap = tool.appSlug === "pdf" ? pdfToolIcons : imageToolIcons;
                const ToolIcon = iconMap[tool.slug];
                return (
                  <motion.div
                    key={`${tool.appSlug}-${tool.slug}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.04 * i }}
                  >
                    <Link
                      href={tool.href}
                      className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-background-elevated p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-accent/40"
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
                  </motion.div>
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
              ] as const).map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center gap-3 p-4"
                >
                  <div className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-md`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-xs text-foreground-muted max-w-[240px] leading-relaxed">{item.desc}</p>
                </motion.div>
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
                      href={app.href}
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
