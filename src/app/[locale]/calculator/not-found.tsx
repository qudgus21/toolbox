"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/lib/ui";

const LABELS: Record<string, { notFound: string; goHome: string }> = {
  en: { notFound: "Page not found", goHome: "Go Home" },
  ko: { notFound: "페이지를 찾을 수 없습니다", goHome: "홈으로" },
  ja: { notFound: "ページが見つかりません", goHome: "ホームへ" },
  zh: { notFound: "页面未找到", goHome: "回到首页" },
  es: { notFound: "Página no encontrada", goHome: "Ir al inicio" },
  fr: { notFound: "Page introuvable", goHome: "Accueil" },
  de: { notFound: "Seite nicht gefunden", goHome: "Startseite" },
  pt: { notFound: "Página não encontrada", goHome: "Início" },
  it: { notFound: "Pagina non trovata", goHome: "Home" },
  ru: { notFound: "Страница не найдена", goHome: "На главную" },
  ar: { notFound: "الصفحة غير موجودة", goHome: "الرئيسية" },
  hi: { notFound: "पृष्ठ नहीं मिला", goHome: "होम पर जाएं" },
  vi: { notFound: "Không tìm thấy trang", goHome: "Trang chủ" },
  th: { notFound: "ไม่พบหน้านี้", goHome: "หน้าหลัก" },
  id: { notFound: "Halaman tidak ditemukan", goHome: "Beranda" },
  tr: { notFound: "Sayfa bulunamadı", goHome: "Ana Sayfa" },
  pl: { notFound: "Strona nie znaleziona", goHome: "Strona główna" },
  nl: { notFound: "Pagina niet gevonden", goHome: "Startpagina" },
  sv: { notFound: "Sidan hittades inte", goHome: "Startsida" },
  da: { notFound: "Siden blev ikke fundet", goHome: "Forside" },
  no: { notFound: "Siden ble ikke funnet", goHome: "Forside" },
  fi: { notFound: "Sivua ei löytynyt", goHome: "Etusivu" },
  cs: { notFound: "Stránka nenalezena", goHome: "Domů" },
  sk: { notFound: "Stránka sa nenašla", goHome: "Domov" },
  hu: { notFound: "Az oldal nem található", goHome: "Főoldal" },
  ro: { notFound: "Pagina nu a fost găsită", goHome: "Acasă" },
  bg: { notFound: "Страницата не е намерена", goHome: "Начало" },
  uk: { notFound: "Сторінку не знайдено", goHome: "На головну" },
  el: { notFound: "Η σελίδα δεν βρέθηκε", goHome: "Αρχική" },
  he: { notFound: "הדף לא נמצא", goHome: "דף הבית" },
  hr: { notFound: "Stranica nije pronađena", goHome: "Početna" },
  sl: { notFound: "Stran ni najdena", goHome: "Domov" },
  lt: { notFound: "Puslapis nerastas", goHome: "Pradžia" },
  lv: { notFound: "Lapa nav atrasta", goHome: "Sākums" },
  et: { notFound: "Lehte ei leitud", goHome: "Avaleht" },
  is: { notFound: "Síða fannst ekki", goHome: "Forsíða" },
  ga: { notFound: "Ní bhfuarthas an leathanach", goHome: "Baile" },
  mt: { notFound: "Il-paġna ma nstabitx", goHome: "Paġna Ewlenija" },
  bs: { notFound: "Stranica nije pronađena", goHome: "Početna" },
  ms: { notFound: "Halaman tidak ditemui", goHome: "Laman Utama" },
  bn: { notFound: "পৃষ্ঠা পাওয়া যায়নি", goHome: "হোম" },
  mr: { notFound: "पृष्ठ सापडले नाही", goHome: "मुख्यपृष्ठ" },
  pa: { notFound: "ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ", goHome: "ਹੋਮ" },
  te: { notFound: "పేజీ కనుగొనబడలేదు", goHome: "హోమ్" },
  km: { notFound: "រកមិនឃើញទំព័រ", goHome: "ទំព័រដើម" },
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
          href={`/${locale}/calculator`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
        >
          {labels.goHome}
        </Link>
      </Container>
    </main>
  );
}
