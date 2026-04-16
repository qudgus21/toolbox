import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, AppNavMenu } from "@/lib/ui";
import { AppLogo } from "@/lib/ui/components/app-logo/app-logo";
import { ThemeToggle } from "@/lib/ui/components/theme-toggle/theme-toggle";
import { LanguageSwitcher } from "@/lib/ui/components/language-switcher/language-switcher";
import { ShareButton } from "@/lib/ui/components/share-button";
import { MobileTabBar } from "@/lib/ui/components/mobile-tab-bar/mobile-tab-bar";
import { HtmlAttrsSync } from "./html-attrs-sync";
import { type Locale, locales, isIndexedLocale } from "@/lib/i18n";
import { getLandingDictionary } from "@/lib/i18n/get-landing-dictionary";
import { buildNavApps } from "@/lib/build-nav-apps";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL("https://toolpop.org"),
    ...(!isIndexedLocale(locale) && {
      robots: { index: false, follow: true },
    }),
  };
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

  const landingDict = await getLandingDictionary(locale as Locale);
  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";
  const navApps = buildNavApps({ locale });

  return (
    <>
      <HtmlAttrsSync locale={locale} dir={dir} />
      <Header
        logo={<AppLogo />}
        nav={<AppNavMenu apps={navApps} menuLabel={landingDict.common.ariaMenu} />}
      >
        <Link
          href={`/${locale}/blog`}
          className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors hidden sm:block"
        >
          {landingDict.footer.blog}
        </Link>
        <ThemeToggle ariaLabel={landingDict.common.ariaToggleTheme} />
        <ShareButton
          shareTitle={landingDict.common.shareTitle}
          shareSubtitle={landingDict.common.shareSubtitle}
          copyLabel={landingDict.common.shareCopyLink}
          copiedLabel={landingDict.common.shareCopied}
          closeLabel={landingDict.common.ariaClose}
          ariaLabel={landingDict.common.ariaShare}
        />
        <LanguageSwitcher locale={locale} />
      </Header>
      <MobileTabBar apps={navApps} />
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
