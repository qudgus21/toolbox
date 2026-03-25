import type { LandingDictionary } from "../landing-config";

const dict: LandingDictionary = {
  meta: {
    title: "ToolPop — Strumenti Online Gratuiti",
    description: "Modifica PDF, trasforma immagini, converti unità e molto altro. Tutto gratis, direttamente nel browser.",
  },
  hero: {
    badge: "176+ strumenti online gratuiti",
    title: "Tutti gli strumenti che ti servono, in un solo ToolPop",
    titleAccent: "ToolPop",
    subtitle: "Lavora con PDF, immagini, testi e conversioni direttamente nel browser. Nessuna installazione, nessuna registrazione.",
    searchPlaceholder: "Quale strumento stai cercando?",
  },
  apps: {
    pdf: { name: "Strumenti PDF", description: "Unisci, dividi, converti, modifica e comprimi — tutto quello che puoi fare con un PDF.", cta: "Scopri gli strumenti PDF", toolCount: "39 strumenti" },
    image: { name: "Strumenti Immagine", description: "Ridimensiona, ritaglia, converti, applica effetti, genera codici QR — tutto per le immagini.", cta: "Scopri gli strumenti Immagine", toolCount: "48 strumenti" },
    text: { name: "Strumenti Testo", description: "Trasforma, analizza, pulisci, codifica e genera testo in un istante.", cta: "Strumenti Testo", toolCount: "44+ strumenti" },
    converter: { name: "Strumenti di conversione", description: "Converti unità, colori, formati dati, date e altro all'istante.", cta: "Convertitori", toolCount: "45 strumenti" },
  },
  popularTools: { sectionTitle: "Strumenti popolari", sectionSubtitle: "Vai subito agli strumenti più usati", viewAll: "Vedi tutti" },
  stats: { tools: "176+", toolsLabel: "Strumenti gratuiti", languages: "45", languagesLabel: "Lingue", users: "100%", usersLabel: "Basato su browser", price: "€0", priceLabel: "Gratis per sempre" },
  trust: {
    sectionTitle: "Perché ToolPop?",
    sectionSubtitle: "Sicurezza e praticità, senza compromessi",
    browserBased: "Elaborazione nel browser",
    browserBasedDesc: "I tuoi file non lasciano mai il dispositivo. Tutto viene elaborato nel browser — veloce e sicuro.",
    free: "Completamente gratuito",
    freeDesc: "Usa ogni strumento quante volte vuoi, senza limiti. Nessun costo nascosto.",
    private: "Privacy al primo posto",
    privateDesc: "I file restano sul tuo dispositivo. Nessun caricamento su server — i tuoi dati rimangono tuoi.",
    noSignup: "Nessuna registrazione",
    noSignupDesc: "Nessun account, nessuna email. Apri uno strumento e inizia subito.",
  },
  cta: { title: "Pronto per iniziare?", subtitle: "Nessuna installazione, nessuna registrazione, nessun pagamento — a un solo clic di distanza.", button: "Esplora tutti gli strumenti" },
  common: { shareTitle: "Condividi", shareSubtitle: "Fai conoscere ToolPop ai tuoi amici!", shareCopyLink: "Copia link", shareCopied: "Copiato!" },
  footer: { apps: "Strumenti", company: "Azienda", about: "Chi siamo", contact: "Contatti", faq: "FAQ", blog: "Blog", legal: "Note legali", privacy: "Privacy Policy", terms: "Termini di servizio", copyright: "© 2026 ToolPop. All rights reserved.", tagline: "Strumenti online gratuiti per PDF, immagini e altro. Senza registrazione.", madeWith: "Fatto con amore per tutti" },
  search: { noResults: "Nessun risultato trovato" },
  nav: { pdf: "PDF", image: "Immagine", text: "Testo", converter: "Convertitore" },
};
export default dict;
