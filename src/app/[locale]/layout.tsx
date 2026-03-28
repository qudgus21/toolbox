import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, AppNavMenu } from "@/lib/ui";
import { AppLogo } from "@/lib/ui/components/app-logo/app-logo";
import { ThemeToggle } from "@/lib/ui/components/theme-toggle/theme-toggle";
import { LanguageSwitcher } from "@/lib/ui/components/language-switcher/language-switcher";
import { ShareButton } from "@/lib/ui/components/share-button";
import { MobileTabBar } from "@/lib/ui/components/mobile-tab-bar/mobile-tab-bar";
import { type Locale, locales } from "@/lib/i18n";
import { getLandingDictionary } from "@/lib/i18n/get-landing-dictionary";
import { buildNavApps } from "@/lib/build-nav-apps";
import { HtmlAttrsSync } from "./html-attrs-sync";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://toolpop.org"),
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
