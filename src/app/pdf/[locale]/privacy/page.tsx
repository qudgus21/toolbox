import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateAlternates } from "@/lib/seo";
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

  const title = `${dict.privacy.title} ${dict.metadata.toolTitleSuffix}`;

  return {
    title,
    description: dict.privacy.intro,
    alternates: generateAlternates("privacy", locales, locale, "en", "pdf"),
    openGraph: {
      title,
      description: dict.privacy.intro,
      url: `/pdf/${locale}/privacy`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.privacy.intro,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
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
  );
}
