import type { LandingDictionary } from "../landing-config";

const dict: LandingDictionary = {
  meta: {
    title: "ToolPop — Ücretsiz Çevrimiçi Araçlar",
    description: "PDF düzenle, görselleri dönüştür, birimleri çevir ve daha fazlası. Hepsi ücretsiz, doğrudan tarayıcında.",
  },
  hero: {
    badge: "250+ ücretsiz çevrimiçi araç",
    title: "İhtiyacın olan her araç, tek bir ToolPop'ta",
    titleAccent: "ToolPop",
    subtitle: "PDF, görseller, metin ve dönüştürme araçlarıyla doğrudan tarayıcında çalış. Kurulum yok, kayıt yok.",
    searchPlaceholder: "Hangi aracı arıyorsun?",
  },
  apps: {
    pdf: { name: "PDF Araçları", description: "Birleştir, böl, dönüştür, düzenle ve sıkıştır — PDF ile yapabileceğin her şey.", cta: "PDF Araçlarını Keşfet", toolCount: "44 araç" },
    image: { name: "Görsel Araçları", description: "Boyutlandır, kırp, dönüştür, efekt uygula, QR kod oluştur — görseller için her şey.", cta: "Görsel Araçlarını Keşfet", toolCount: "69 araç" },
    text: { name: "Metin Araçları", description: "Metni dönüştür, analiz et, temizle, kodla ve anında oluştur.", cta: "Metin Araçlarını Keşfet", toolCount: "44 araç" },
    converter: { name: "Dönüştürme Araçları", description: "Birimleri, renkleri, veri formatlarını, tarihleri ve daha fazlasını anında dönüştürün.", cta: "Dönüştürücüleri Keşfet", toolCount: "48 araç" },
    calculator: { name: "Hesap Makineleri", description: "Matematik, finans, sağlık ve günlük hesaplamalar — hızlı ve ücretsiz.", cta: "Hesap Makinelerini Keşfet", toolCount: "50 araç" },
  },
  popularTools: { sectionTitle: "Popüler Araçlar", sectionSubtitle: "En çok kullanılan araçlara hemen geç", viewAll: "Tümünü gör" },
  stats: { tools: "250+", toolsLabel: "Ücretsiz Araç", languages: "45", languagesLabel: "Dil", users: "5", usersLabel: "Kategori", price: "$0", priceLabel: "Sonsuza dek ücretsiz" },
  trust: {
    sectionTitle: "Neden ToolPop?",
    sectionSubtitle: "Güvenlik ve kolaylık, taviz vermeden",
    free: "Tamamen Ücretsiz",
    freeDesc: "Her aracı sınırsız kullan, istediğin kadar. Gizli ücret yok, asla olmayacak.",
    private: "Gizlilik Öncelikli",
    privateDesc: "Dosyaların işlem biter bitmez silinir. Hiçbir veri toplamıyor veya saklamıyoruz.",
    noSignup: "Kayıt Gerektirmez",
    noSignupDesc: "Hesap yok, e-posta yok. Aracı aç ve hemen işe koyul.",
  },
  cta: { title: "Başlamaya hazır mısın?", subtitle: "Kurulum yok, kayıt yok, ödeme yok — tek tık uzağında.", button: "Tüm Araçlara Göz At" },
  common: { shareTitle: "Paylaş", shareSubtitle: "Arkadaşlarına ToolPop'u anlat!", shareCopyLink: "Linki kopyala", shareCopied: "Kopyalandı!", ariaClose: "Kapat", ariaMenu: "Menü", ariaShare: "Paylaş", ariaToggleTheme: "Tema değiştir" },
  footer: { apps: "Araçlar", company: "Şirket", about: "Hakkımızda", contact: "İletişim", faq: "SSS", blog: "Blog", legal: "Yasal", privacy: "Gizlilik Politikası", terms: "Kullanım Koşulları", copyright: "© 2026 ToolPop. Tüm hakları saklıdır.", tagline: "PDF, görsel ve daha fazlası için ücretsiz çevrimiçi araçlar. Kayıt gerektirmez.", madeWith: "Herkes için sevgiyle yapıldı" },
  blogSection: {
    sectionTitle: "Latest Articles",
    sectionSubtitle: "Tips, guides, and deep dives into file formats and digital tools",
    viewAll: "View all articles",
  },
  search: { noResults: "Sonuç bulunamadı" },
  nav: { pdf: "PDF", image: "Görsel", text: "Metin", converter: "Dönüştür", calculator: "Hesaplama" },
};
export default dict;
