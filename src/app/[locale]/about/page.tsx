import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
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
  const title = dict.about.title;

  return {
    title,
    description: dict.about.intro,
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/about`])),
        "x-default": "/en/about",
      },
    },
    openGraph: { title, description: dict.about.intro, url: `/${locale}/about`, type: "website" },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <main className="py-12">
      <Container size="md">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {dict.about.title}
        </h1>
        <p className="text-foreground-muted leading-relaxed mb-8">
          {dict.about.intro}
        </p>
        <div className="space-y-8">
          {dict.about.sections.map((section, i) => (
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
