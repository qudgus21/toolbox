import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, locales } from "@/lib/i18n";
import { getLandingDictionary } from "@/lib/i18n/get-landing-dictionary";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getImageDictionary } from "@/lib/i18n/get-image-dictionary";
import { generateAlternates, generateBreadcrumbJsonLd } from "@/lib/seo";
import { apps } from "@/lib/apps";
import { tools as pdfTools } from "@/lib/pdf/tools";
import { tools as imageTools } from "@/lib/image/tools";
import { Container } from "@/lib/ui";
import { PdfAppIcon, ImageAppIcon, appIconMap } from "@/lib/app-icons";
import { LandingContent } from "./landing-content";
import { LandingFooter } from "./landing-footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getLandingDictionary(locale as Locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: generateAlternates("", locales, locale, "en", ""),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

interface PopularToolInfo {
  slug: string;
  appSlug: string;
  title: string;
  description: string;
  emoji: string;
  href: string;
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getLandingDictionary(locale as Locale);
  const [pdfDict, imageDict] = await Promise.all([
    getDictionary(locale as Locale),
    getImageDictionary(locale as Locale),
  ]);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop", url: `https://toolpop.org/${locale}` },
  ]);

  // Build popular tools data
  const popularTools: PopularToolInfo[] = [];
  for (const app of apps) {
    const toolDefs = app.slug === "pdf" ? pdfTools : imageTools;
    const appDict = app.slug === "pdf" ? pdfDict : imageDict;
    for (const slug of app.popularToolSlugs) {
      const tool = toolDefs.find((t) => t.slug === slug);
      if (!tool || tool.comingSoon) continue;
      const toolDict = (appDict as unknown as Record<string, Record<string, Record<string, string>>>).tools?.[slug];
      popularTools.push({
        slug,
        appSlug: app.slug,
        title: toolDict?.title ?? tool.title,
        description: toolDict?.description ?? tool.description,
        emoji: tool.emoji,
        href: `/${app.slug}/${locale}/${slug}`,
      });
    }
  }

  // Build all tools for search
  const allTools: PopularToolInfo[] = [];
  for (const app of apps) {
    const toolDefs = app.slug === "pdf" ? pdfTools : imageTools;
    const appDict = app.slug === "pdf" ? pdfDict : imageDict;
    for (const tool of toolDefs) {
      if (tool.comingSoon) continue;
      const toolDict = (appDict as unknown as Record<string, Record<string, Record<string, string>>>).tools?.[tool.slug];
      allTools.push({
        slug: tool.slug,
        appSlug: app.slug,
        title: toolDict?.title ?? tool.title,
        description: toolDict?.description ?? tool.description,
        emoji: tool.emoji,
        href: `/${app.slug}/${locale}/${tool.slug}`,
      });
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ToolPop",
            url: "https://toolpop.org",
            description: dict.meta.description,
            inLanguage: locale,
            author: {
              "@type": "Organization",
              name: "ToolPop",
              url: "https://toolpop.org",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero — server-rendered for fast LCP */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Gradient orbs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-400/15 dark:bg-purple-500/10 blur-3xl" />
          <div className="absolute -top-12 -right-32 w-80 h-80 rounded-full bg-blue-400/10 dark:bg-blue-500/8 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-300/5 dark:bg-purple-400/5 blur-3xl" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          {/* Floating shapes — hidden on mobile for performance */}
          <svg className="hidden sm:block absolute top-16 left-[15%] w-6 h-6 text-purple-400/30 dark:text-purple-300/20 animate-[float_6s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /></svg>
          <svg className="hidden sm:block absolute top-32 right-[20%] w-4 h-4 text-blue-400/25 dark:text-blue-300/15 animate-[float_8s_ease-in-out_infinite_1s]" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="3" /></svg>
          <svg className="hidden sm:block absolute bottom-20 left-[25%] w-5 h-5 text-amber-400/25 dark:text-amber-300/15 animate-[float_7s_ease-in-out_infinite_2s]" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,22 2,22" /></svg>
          <svg className="hidden sm:block absolute top-24 right-[35%] w-3 h-3 text-red-400/20 dark:text-red-300/15 animate-[float_9s_ease-in-out_infinite_0.5s]" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /></svg>
        </div>

        <Container size="lg" className="relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-4 py-1.5 text-sm font-medium text-accent mb-6">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
                <path d="M8 1l2.1 4.3L15 6l-3.5 3.4.8 4.8L8 12l-4.3 2.2.8-4.8L1 6l4.9-.7L8 1z" fill="currentColor" />
              </svg>
              {dict.hero.badge}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              <HeroTitle title={dict.hero.title} accent={dict.hero.titleAccent} />
            </h1>
            <p className="mt-5 text-lg text-foreground-muted max-w-3xl mx-auto sm:text-xl leading-relaxed">
              {dict.hero.subtitle}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {apps.map((app, i) => {
                const AppIcon = appIconMap[app.slug];
                return (
                  <Link
                    key={app.slug}
                    href={app.href}
                    className={`inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                      i === 0
                        ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                        : "bg-background-elevated border border-border text-foreground hover:border-foreground-subtle"
                    }`}
                  >
                    {AppIcon && <AppIcon className="h-5 w-5 shrink-0" />}
                    {dict.apps[app.slug]?.cta ?? app.slug}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <LandingContent
        dict={dict}
        locale={locale}
        popularTools={popularTools}
        allTools={allTools}
      />
      <LandingFooter dict={dict} locale={locale} />
    </>
  );
}

function HeroTitle({ title, accent }: { title: string; accent: string }) {
  const idx = title.indexOf(accent);
  if (idx !== -1) {
    return (
      <>
        {title.slice(0, idx)}
        <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 dark:from-purple-400 dark:via-purple-300 dark:to-indigo-400 bg-clip-text text-transparent">{accent}</span>
        {title.slice(idx + accent.length)}
      </>
    );
  }
  return <>{title}</>;
}
