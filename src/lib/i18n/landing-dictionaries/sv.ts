import type { LandingDictionary } from "../landing-config";

const dict: LandingDictionary = {
  meta: {
    title: "ToolPop — Gratis onlineverktyg",
    description: "Redigera, slå ihop och konvertera PDF:er. Ändra storlek, komprimera och omvandla bilder. Helt gratis, direkt i webbläsaren.",
  },
  hero: {
    badge: "131+ gratis onlineverktyg",
    title: "Alla verktyg du behöver, samlade i ToolPop",
    titleAccent: "ToolPop",
    subtitle: "Arbeta med PDF:er och bilder direkt i webbläsaren. Ingen installation, ingen registrering.",
    searchPlaceholder: "Vilket verktyg letar du efter?",
  },
  apps: {
    pdf: { name: "PDF-verktyg", description: "Slå ihop, dela upp, konvertera, redigera och komprimera — allt du kan göra med en PDF.", cta: "Utforska PDF-verktyg", toolCount: "39 verktyg" },
    image: { name: "Bildverktyg", description: "Ändra storlek, beskär, konvertera, lägg till effekter, skapa QR-koder — allt för bilder.", cta: "Utforska bildverktyg", toolCount: "48 verktyg" },
    text: { name: "Textverktyg", description: "Omvandla, analysera, rensa, koda och generera text direkt.", cta: "Textverktyg", toolCount: "44+ verktyg" },
  },
  popularTools: { sectionTitle: "Populära verktyg", sectionSubtitle: "Hoppa direkt in i de mest använda verktygen", viewAll: "Visa alla" },
  stats: { tools: "131+", toolsLabel: "Gratisverktyg", languages: "45", languagesLabel: "Språk", users: "100%", usersLabel: "I webbläsaren", price: "0 kr", priceLabel: "Gratis för alltid" },
  trust: {
    sectionTitle: "Varför ToolPop?",
    sectionSubtitle: "Säkerhet och bekvämlighet utan kompromisser",
    browserBased: "Bearbetning i webbläsaren",
    browserBasedDesc: "Dina filer lämnar aldrig din enhet. Allt körs i webbläsaren — snabbt och säkert.",
    free: "Helt gratis",
    freeDesc: "Använd alla verktyg hur många gånger du vill, utan begränsningar. Inga dolda avgifter.",
    private: "Integritet först",
    privateDesc: "Filerna stannar på din enhet. Ingen uppladdning till servrar innebär att dina data förblir dina.",
    noSignup: "Ingen registrering krävs",
    noSignupDesc: "Inget konto, ingen e-post. Öppna ett verktyg och börja direkt.",
  },
  cta: { title: "Redo att börja?", subtitle: "Ingen installation, ingen registrering, ingen betalning — bara ett klick bort.", button: "Se alla verktyg" },
  common: { shareTitle: "Dela", shareSubtitle: "Tipsa dina vänner om ToolPop!", shareCopyLink: "Kopiera länk", shareCopied: "Kopierad!" },
  footer: { apps: "Verktyg", company: "Företag", about: "Om oss", contact: "Kontakt", faq: "Vanliga frågor", blog: "Blogg", legal: "Juridiskt", privacy: "Integritetspolicy", terms: "Användarvillkor", copyright: "© 2026 ToolPop. All rights reserved.", tagline: "Gratis onlineverktyg för PDF, bilder och mer. Ingen registrering krävs.", madeWith: "Skapat med kärlek för alla" },
  search: { noResults: "Inga resultat hittades" },
  nav: { pdf: "PDF", image: "Bild", text: "Text" },
};
export default dict;
