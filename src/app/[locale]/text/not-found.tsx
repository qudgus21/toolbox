"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/lib/ui";

const LABELS: Record<string, { notFound: string; goHome: string }> = {
  ko: { notFound: "페이지를 찾을 수 없습니다", goHome: "홈으로" },
  ja: { notFound: "ページが見つかりません", goHome: "ホームへ" },
  zh: { notFound: "页面未找到", goHome: "回到首页" },
  es: { notFound: "Página no encontrada", goHome: "Ir al inicio" },
  fr: { notFound: "Page introuvable", goHome: "Accueil" },
  de: { notFound: "Seite nicht gefunden", goHome: "Startseite" },
  pt: { notFound: "Página não encontrada", goHome: "Início" },
  ru: { notFound: "Страница не найдена", goHome: "На главную" },
  ar: { notFound: "الصفحة غير موجودة", goHome: "الرئيسية" },
  hi: { notFound: "पृष्ठ नहीं मिला", goHome: "होम पर जाएं" },
  en: { notFound: "Page not found", goHome: "Go Home" },
};

function getLabels(locale: string) {
  return LABELS[locale] ?? LABELS.en;
}

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const labels = getLabels(locale);

  return (
    <main className="py-24">
      <Container size="sm" className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-lg text-foreground-muted mb-8">
          {labels.notFound}
        </p>
        <Link
          href={`/${locale}/text`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
        >
          {labels.goHome}
        </Link>
      </Container>
    </main>
  );
}
