"use client";

import { LanguageSwitcher as SharedLanguageSwitcher } from "@/lib/ui/components/language-switcher/language-switcher";

interface LanguageSwitcherProps {
  locale: string;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  return <SharedLanguageSwitcher locale={locale} basePath="/image" app="image" />;
}
