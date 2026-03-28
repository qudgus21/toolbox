import type { LandingDictionary } from "../landing-config";

const dict: LandingDictionary = {
  meta: {
    title: "ToolPop — Ilmaiset verkkotyökalut",
    description: "Muokkaa, yhdistä ja muunna PDF-tiedostoja. Muuta kokoa, pakkaa ja käsittele kuvia. Muunna yksiköitä, värejä ja datamuotoja. Kaikki ilmaiseksi, suoraan selaimessa.",
  },
  hero: {
    badge: "176+ ilmaista verkkotyökalua",
    title: "Kaikki tarvitsemasi työkalut yhdessä paikassa — ToolPop",
    titleAccent: "ToolPop",
    subtitle: "Käsittele PDF-tiedostoja, kuvia ja muuntimeia suoraan selaimessa. Ei asennuksia, ei rekisteröitymistä.",
    searchPlaceholder: "Mitä työkalua etsit?",
  },
  apps: {
    pdf: { name: "PDF-työkalut", description: "Yhdistäminen, jakaminen, muuntaminen, muokkaus ja pakkaus — kaikki mitä PDF:llä voi tehdä.", cta: "Tutustu PDF-työkaluihin", toolCount: "39 työkalua" },
    image: { name: "Kuvatyökalut", description: "Koon muutos, rajaus, muuntaminen, tehosteet, QR-koodien luonti — kaikki kuvien käsittelyyn.", cta: "Tutustu kuvatyökaluihin", toolCount: "48 työkalua" },
    text: { name: "Tekstityökalut", description: "Muunna, analysoi, siisti, koodaa ja luo tekstiä hetkessä.", cta: "Tutustu tekstityökaluihin", toolCount: "44+ työkalua" },
    converter: { name: "Muunnostyökalut", description: "Muunna yksiköitä, värejä, datamuotoja, päivämääriä ja paljon muuta.", cta: "Tutustu muuntimeihin", toolCount: "45 työkalua" },
    calculator: { name: "Laskurit", description: "Matematiikka, talous, terveys ja arjen laskutoimitukset — nopeasti ja ilmaiseksi.", cta: "Tutustu laskureihin", toolCount: "30+ työkalua" },
  },
  popularTools: { sectionTitle: "Suositut työkalut", sectionSubtitle: "Hyppää suoraan käytetyimpiin työkaluihin", viewAll: "Näytä kaikki" },
  stats: { tools: "176+", toolsLabel: "Ilmaista työkalua", languages: "45", languagesLabel: "Kieltä", users: "100%", usersLabel: "Selainpohjainen", price: "0 €", priceLabel: "Ilmainen aina" },
  trust: {
    sectionTitle: "Miksi ToolPop?",
    sectionSubtitle: "Turvallisuutta ja käyttömukavuutta ilman kompromisseja",
    browserBased: "Käsittely selaimessa",
    browserBasedDesc: "Tiedostosi eivät koskaan poistu laitteeltasi. Kaikki tapahtuu selaimessa — nopeasti ja turvallisesti.",
    free: "Täysin ilmainen",
    freeDesc: "Käytä mitä tahansa työkalua niin usein kuin haluat, ilman rajoituksia. Ei piilokustannuksia.",
    private: "Yksityisyys ensin",
    privateDesc: "Tiedostot pysyvät laitteellasi. Ei palvelimelle lataamista — tietosi pysyvät sinun.",
    noSignup: "Ei rekisteröitymistä",
    noSignupDesc: "Ei tiliä, ei sähköpostia. Avaa työkalu ja aloita työskentely.",
  },
  cta: { title: "Valmis aloittamaan?", subtitle: "Ei asennuksia, ei rekisteröitymistä, ei maksuja — vain yksi klikkaus.", button: "Selaa kaikkia työkaluja" },
  common: { shareTitle: "Jaa", shareSubtitle: "Kerro kavereillesi ToolPopista!", shareCopyLink: "Kopioi linkki", shareCopied: "Kopioitu!", ariaClose: "Sulje", ariaMenu: "Valikko", ariaShare: "Jaa", ariaToggleTheme: "Vaihda teemaa" },
  footer: { apps: "Työkalut", company: "Yritys", about: "Tietoa meistä", contact: "Yhteystiedot", faq: "UKK", blog: "Blogi", legal: "Oikeudelliset tiedot", privacy: "Tietosuojakäytäntö", terms: "Käyttöehdot", copyright: "© 2026 ToolPop. Kaikki oikeudet pidätetään.", tagline: "Ilmaiset verkkotyökalut PDF-tiedostoille, kuville ja muulle. Ei rekisteröitymistä.", madeWith: "Tehty rakkaudella kaikille" },
  search: { noResults: "Tuloksia ei löytynyt" },
  nav: { pdf: "PDF", image: "Kuva", text: "Teksti", converter: "Muunnin", calculator: "Laskuri" },
};
export default dict;
