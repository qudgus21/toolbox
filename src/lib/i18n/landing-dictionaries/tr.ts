import type { LandingDictionary } from "../landing-config";

const dict: LandingDictionary = {
  meta: {
    title: "ToolPop — Ücretsiz Çevrimiçi Araçlar",
    description: "PDF düzenle, birleştir, dönüştür. Görsel boyutlandır, sıkıştır, dönüştür. Hepsi ücretsiz, doğrudan tarayıcında.",
  },
  hero: {
    badge: "131+ ücretsiz çevrimiçi araç",
    title: "İhtiyacın olan her araç, tek bir ToolPop'ta",
    titleAccent: "ToolPop",
    subtitle: "PDF ve görsellerle doğrudan tarayıcında çalış. Kurulum yok, kayıt yok.",
    searchPlaceholder: "Hangi aracı arıyorsun?",
  },
  apps: {
    pdf: { name: "PDF Araçları", description: "Birleştir, böl, dönüştür, düzenle ve sıkıştır — PDF ile yapabileceğin her şey.", cta: "PDF Araçlarını Keşfet", toolCount: "39 araç" },
    image: { name: "Görsel Araçları", description: "Boyutlandır, kırp, dönüştür, efekt uygula, QR kod oluştur — görseller için her şey.", cta: "Görsel Araçlarını Keşfet", toolCount: "48 araç" },
    text: { name: "Metin Araçları", description: "Metni dönüştür, analiz et, temizle, kodla ve anında oluştur.", cta: "Metin Araçları", toolCount: "44+ araç" },
  },
  popularTools: { sectionTitle: "Popüler Araçlar", sectionSubtitle: "En çok kullanılan araçlara hemen geç", viewAll: "Tümünü gör" },
  stats: { tools: "131+", toolsLabel: "Ücretsiz Araç", languages: "45", languagesLabel: "Dil", users: "100%", usersLabel: "Tarayıcı Tabanlı", price: "$0", priceLabel: "Sonsuza dek ücretsiz" },
  trust: {
    sectionTitle: "Neden ToolPop?",
    sectionSubtitle: "Güvenlik ve kolaylık, taviz vermeden",
    browserBased: "Tarayıcıda İşleme",
    browserBasedDesc: "Dosyaların cihazından asla ayrılmaz. Her şey tarayıcında çalışır — hızlı ve güvenli.",
    free: "Tamamen Ücretsiz",
    freeDesc: "Her aracı istediğin kadar kullan, sınır yok. Gizli ücret yok.",
    private: "Gizlilik Öncelikli",
    privateDesc: "Dosyalar cihazında kalır. Sunucuya yükleme yok — verilerin sana ait.",
    noSignup: "Kayıt Gerektirmez",
    noSignupDesc: "Hesap yok, e-posta yok. Aracı aç ve hemen başla.",
  },
  cta: { title: "Başlamaya hazır mısın?", subtitle: "Kurulum yok, kayıt yok, ödeme yok — tek tık uzağında.", button: "Tüm Araçlara Göz At" },
  common: { shareTitle: "Paylaş", shareSubtitle: "Arkadaşlarına ToolPop'u anlat!", shareCopyLink: "Linki kopyala", shareCopied: "Kopyalandı!" },
  footer: { apps: "Araçlar", company: "Şirket", about: "Hakkımızda", contact: "İletişim", faq: "SSS", blog: "Blog", legal: "Yasal", privacy: "Gizlilik Politikası", terms: "Kullanım Koşulları", copyright: "© 2026 ToolPop. All rights reserved.", tagline: "PDF, görsel ve daha fazlası için ücretsiz çevrimiçi araçlar. Kayıt gerektirmez.", madeWith: "Herkes için sevgiyle yapıldı" },
  search: { noResults: "Sonuç bulunamadı" },
  nav: { pdf: "PDF", image: "Görsel", text: "Metin" },
};
export default dict;
