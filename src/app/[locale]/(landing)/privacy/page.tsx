import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const title = dict.privacy.title;

  return {
    title,
    description: dict.privacy.intro,
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/privacy`])),
        "x-default": "/en/privacy",
      },
    },
    openGraph: { title, description: dict.privacy.intro, url: `/${locale}/privacy`, type: "website", locale, siteName: "ToolPop" },
    twitter: { card: "summary_large_image", title, description: dict.privacy.intro },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop", url: `https://toolpop.org/${locale}` },
    { name: dict.privacy.title, url: `https://toolpop.org/${locale}/privacy` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="py-12">
      <Container size="md">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {dict.privacy.title}
        </h1>
        <p className="text-sm text-foreground-muted mb-8">
          {dict.privacy.lastUpdated}
        </p>
        <p className="text-foreground-muted leading-relaxed mb-8">
          {dict.privacy.intro}
        </p>
        <div className="space-y-8">
          {dict.privacy.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </main>
    </>
  );
}
