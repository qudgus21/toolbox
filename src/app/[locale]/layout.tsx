import { type Locale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={dir} className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
    </div>
  );
}
