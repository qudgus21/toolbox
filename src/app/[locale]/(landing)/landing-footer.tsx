import Link from "next/link";
import { apps } from "@/lib/apps";
import type { LandingDictionary } from "@/lib/i18n/landing-config";

interface LandingFooterProps {
  dict: LandingDictionary;
  locale: string;
}

export function LandingFooter({ dict, locale }: LandingFooterProps) {
  return (
    <footer className="border-t border-border bg-background-subtle">
      <div className="mx-auto max-w-screen-lg px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 text-lg font-bold text-foreground mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
              >
                <defs>
                  <linearGradient id="footer-logo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="7" fill="url(#footer-logo)" />
                <text x="16" y="21.5" fontFamily="system-ui" fontSize="15" fontWeight="800" fill="white" textAnchor="middle">T</text>
                <circle cx="25" cy="8" r="3.5" fill="#fbbf24" />
                <circle cx="25" cy="8" r="1.5" fill="white" />
              </svg>
              <span>ToolPop</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Apps */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {dict.footer.apps}
            </h3>
            <ul className="space-y-2.5">
              {apps.map((app) => (
                <li key={app.slug}>
                  <Link
                    href={`/${locale}/${app.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <span className="text-sm">{app.emoji}</span>
                    {dict.apps[app.slug]?.name ?? app.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {dict.footer.company}
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: dict.footer.about, href: `/${locale}/about` },
                { label: dict.footer.contact, href: `/${locale}/contact` },
                { label: dict.footer.faq, href: `/${locale}/faq` },
                { label: dict.footer.blog, href: `/${locale}/blog` },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {dict.footer.legal}
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: dict.footer.privacy, href: `/${locale}/privacy` },
                { label: dict.footer.terms, href: `/${locale}/terms` },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-foreground-subtle">
            {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-1 text-xs text-foreground-subtle">
            {dict.footer.madeWith}
          </div>
        </div>
      </div>
    </footer>
  );
}
