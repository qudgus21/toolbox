"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Globe } from "lucide-react";
import { sendEvent } from "@/lib/analytics";

const languageNames: Record<string, string> = {
  id: "Bahasa Indonesia",
  bs: "Bosanski",
  da: "Dansk",
  de: "Deutsch",
  et: "Eesti",
  en: "English",
  es: "Español",
  fr: "Français",
  ga: "Gaeilge",
  hr: "Hrvatski",
  it: "Italiano",
  lv: "Latviešu",
  lt: "Lietuvių",
  hu: "Magyar",
  mt: "Malti",
  nl: "Nederlands",
  no: "Norsk",
  pl: "Polski",
  pt: "Português",
  ro: "Română",
  sk: "Slovenčina",
  sl: "Slovenščina",
  fi: "Suomi",
  sv: "Svenska",
  vi: "Tiếng Việt",
  tr: "Türkçe",
  is: "Íslenska",
  cs: "Čeština",
  el: "Ελληνικά",
  bg: "Български",
  ru: "Русский",
  uk: "Українська",
  he: "עברית",
  ar: "العربية",
  mr: "मराठी",
  hi: "हिन्दी",
  bn: "বাংলা",
  pa: "ਪੰਜਾਬੀ",
  te: "తెలుగు",
  th: "ไทย",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
};

// 글로벌 사용자 수 기준 정렬 순서
const popularityOrder = [
  "en", "zh", "es", "hi", "ar", "fr", "bn", "pt", "ru", "ja",
  "de", "ko", "it", "tr", "vi", "th", "pl", "nl", "uk", "ro",
  "el", "cs", "sv", "hu", "he", "da", "fi", "no", "bg", "hr",
  "sk", "sl", "lt", "lv", "et", "id", "ga", "is", "bs", "mt",
  "mr", "pa", "te",
];

function getSortedLocales(currentLocale: string) {
  return Object.entries(languageNames).sort((a, b) => {
    // 현재 로케일을 최상단에
    if (a[0] === currentLocale) return -1;
    if (b[0] === currentLocale) return 1;
    // 나머지는 사용자 수 기준
    const idxA = popularityOrder.indexOf(a[0]);
    const idxB = popularityOrder.indexOf(b[0]);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });
}

interface LanguageSwitcherProps {
  locale: string;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{languageNames[locale] ?? locale}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 max-h-80 w-52 overflow-y-auto rounded-lg border border-border bg-background shadow-lg">
          {getSortedLocales(locale).map(([code, name]) => (
            <Link
              key={code}
              href={`/pdf/${code}`}
              className={`block px-4 py-2 text-sm transition-colors ${
                code === locale
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-foreground-muted hover:bg-background-elevated hover:text-foreground"
              }`}
              onClick={() => { sendEvent("language_switch", { app: "pdf", from_locale: locale, to_locale: code }); setOpen(false); }}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
