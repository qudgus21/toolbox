import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import { notFound } from "next/navigation";
import { FaqAccordion } from "./faq-accordion";

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
  const title = dict.faq.title;

  return {
    title,
    description: dict.faq.intro,
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/faq`])),
        "x-default": "/en/faq",
      },
    },
    openGraph: { title, description: dict.faq.intro, url: `/${locale}/faq`, type: "website", locale, siteName: "ToolPop" },
    twitter: { card: "summary_large_image", title, description: dict.faq.intro },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop", url: `https://toolpop.org/${locale}` },
    { name: dict.faq.title, url: `https://toolpop.org/${locale}/faq` },
  ]);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: dict.faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <main className="py-12">
        <Container size="md">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {dict.faq.title}
          </h1>
          <p className="text-foreground-muted leading-relaxed mb-8">
            {dict.faq.intro}
          </p>
          <FaqAccordion items={dict.faq.items} />
        </Container>
      </main>
    </>
  );
}
