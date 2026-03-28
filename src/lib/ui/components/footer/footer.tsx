import { cn } from "@/lib/utils";
import { Container } from "../container";

export interface FooterTranslations {
  copyright: string;
  privacy: string;
  terms: string;
}

export interface FooterProps {
  className?: string;
  locale?: string;
  translations?: FooterTranslations;
}

const defaultTranslations: FooterTranslations = {
  copyright: "ToolPop. All rights reserved.",
  privacy: "Privacy",
  terms: "Terms",
};

export function Footer({ className, locale, translations }: FooterProps) {
  const t = translations ?? defaultTranslations;
  const base = locale ? `/${locale}` : "";

  return (
    <footer className={cn("border-t border-border py-8", className)}>
      <Container size="xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} {t.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href={`${base}/privacy`} className="text-sm text-foreground-subtle hover:text-foreground transition-colors">
              {t.privacy}
            </a>
            <a href={`${base}/terms`} className="text-sm text-foreground-subtle hover:text-foreground transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
