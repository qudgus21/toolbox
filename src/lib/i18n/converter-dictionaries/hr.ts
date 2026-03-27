import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Svi alati za pretvorbu koje trebate",
    titleAccent: "pretvorbu",
    description:
      "Pretvarajte jedinice, boje, formate podataka, datume i više. Sve u vašem pregledniku.",
    tabAll: "Sve",
    categoryUnit: "Jedinice",
    categoryNumber: "Brojevi",
    categoryColor: "Boje",
    categoryDatetime: "Datum/Vrijeme",
    categoryData: "Podaci",
    categoryCss: "CSS",
    categoryCooking: "Kuhanje",
    categoryGeography: "Geografija",
    searchPlaceholder: "Pretraži pretvarače...",
    noResults: "Nema pronađenih pretvarača.",
    recentTools: "Nedavno korišteno",
    favorites: "Favoriti",
    favDragHint: "Povucite za promjenu redoslijeda",
    favHint: "Kliknite zvjezdicu za dodavanje favorita",
    gridView: "Mrežni prikaz",
    listView: "Prikaz popisa",
  },
  trust: {
    encryption: "Sigurna obrada",
    encryptionDesc: "Sve pretvorbe odvijaju se lokalno u vašem pregledniku",
    autoDelete: "Bez pohrane podataka",
    autoDeleteDesc: "Vaš unos se nikad ne sprema niti šalje na poslužitelj",
    free: "100% besplatno",
    freeDesc: "Bez ograničenja, bez registracije, bez skrivenih troškova",
    browserProcessing: "Trenutni rezultati",
    browserProcessingDesc: "Pretvorba u stvarnom vremenu dok tipkate",
  },
  tools: {
    length: {
      title: "Pretvarač duljine",
      description:
        "Pretvarajte između metara, kilometara, milja, stopa, inča i više.",
    },
    weight: {
      title: "Pretvarač mase",
      description:
        "Pretvarajte između kilograma, funti, unci, tona i više.",
    },
    temperature: {
      title: "Pretvarač temperature",
      description: "Pretvarajte između Celzija, Fahrenheita i Kelvina.",
    },
    area: {
      title: "Pretvarač površine",
      description:
        "Pretvarajte između kvadratnih metara, hektara, akra, kvadratnih stopa i više.",
    },
    volume: {
      title: "Pretvarač obujma",
      description:
        "Pretvarajte između litara, galona, šalica, tekućih unci i više.",
    },
    speed: {
      title: "Pretvarač brzine",
      description: "Pretvarajte između m/s, km/h, mph, čvorova i više.",
    },
    time: {
      title: "Pretvarač vremena",
      description:
        "Pretvarajte između sekundi, minuta, sati, dana, tjedana i više.",
    },
    pressure: {
      title: "Pretvarač tlaka",
      description:
        "Pretvarajte između Pascala, bara, PSI, atmosfere i više.",
    },
    energy: {
      title: "Pretvarač energije",
      description:
        "Pretvarajte između džula, kalorija, kilovat-sati, BTU i više.",
    },
    power: {
      title: "Pretvarač snage",
      description:
        "Pretvarajte između vata, kilovata, konjskih snaga i više.",
    },
    frequency: {
      title: "Pretvarač frekvencije",
      description:
        "Pretvarajte između herca, kiloherca, megaherca, gigaherca i RPM.",
    },
    angle: {
      title: "Pretvarač kutova",
      description: "Pretvarajte između stupnjeva, radijana, gradijana i okretaja.",
    },
    "data-storage": {
      title: "Pretvarač pohrane podataka",
      description:
        "Pretvarajte između bajtova, kilobajta, megabajta, gigabajta i više.",
    },
    "fuel-economy": {
      title: "Pretvarač potrošnje goriva",
      description: "Pretvarajte između km/L, mpg i L/100km.",
    },
    "number-base": {
      title: "Pretvarač brojevnih sustava",
      description:
        "Pretvarajte između binarnog, oktalnog, decimalnog, heksadecimalnog i prilagođenih sustava.",
    },
    "roman-numeral": {
      title: "Pretvarač rimskih brojeva",
      description: "Pretvarajte između rimskih i arapskih brojeva.",
    },
    "scientific-notation": {
      title: "Pretvarač znanstvenog zapisa",
      description:
        "Pretvarajte između znanstvenog zapisa i standardnih brojeva.",
    },
    "fraction-decimal": {
      title: "Razlomak ↔ Decimala",
      description: "Pretvarajte između razlomaka i decimalnih brojeva.",
    },
    percentage: {
      title: "Pretvarač postotaka",
      description:
        "Pretvarajte između razlomaka, decimala i postotaka.",
    },
    "color-converter": {
      title: "Pretvarač boja",
      description:
        "Pretvarajte između HEX, RGB, HSL, HSV i CMYK formata boja.",
    },
    "color-palette-generator": {
      title: "Generator paleta boja",
      description:
        "Generirajte komplementarne, trijadne i analogne palete boja.",
    },
    "gradient-generator": {
      title: "CSS Generator gradijenata",
      description:
        "Stvarajte linearne, radijalne i konične CSS gradijente s prikazom uživo.",
    },
    "color-contrast-checker": {
      title: "Provjera kontrasta boja",
      description:
        "Provjerite WCAG AA/AAA omjer kontrasta boja između dvije boje.",
    },
    "color-blindness-simulator": {
      title: "Simulator daltonizma",
      description:
        "Simulirajte kako boje izgledaju osobama s poremećajem vida za boje.",
    },
    timezone: {
      title: "Pretvarač vremenskih zona",
      description:
        "Pretvarajte vrijeme između različitih vremenskih zona diljem svijeta.",
    },
    "unix-timestamp": {
      title: "Pretvarač Unix vremenskih oznaka",
      description:
        "Pretvarajte između Unix vremenskih oznaka i čitljivih datuma.",
    },
    "date-format": {
      title: "Pretvarač formata datuma",
      description:
        "Pretvarajte datume između različitih formata (ISO, US, EU i više).",
    },
    "date-calculator": {
      title: "Kalkulator datuma",
      description:
        "Izračunajte razliku između datuma ili dodajte/oduzmite dane.",
    },
    "age-calculator": {
      title: "Kalkulator dobi",
      description:
        "Izračunajte točnu dob prema datumu rođenja u godinama, mjesecima i danima.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Pretvarajte između JSON i YAML formata podataka.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Pretvarajte između JSON nizova i CSV tablicnog formata.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Pretvarajte između JSON i XML formata podataka.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Pretvarajte između JSON i TOML konfiguracijskih formata.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Pretvarajte između Markdown i HTML oznaka.",
    },
    "csv-table": {
      title: "CSV u tablicu",
      description: "Pretvorite CSV podatke u Markdown ili HTML tablice.",
    },
    "json-typescript": {
      title: "JSON u TypeScript",
      description: "Generirajte TypeScript sučelja iz JSON podataka.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Pretvarajte između SQL INSERT naredbi i JSON podataka.",
    },
    "px-rem": {
      title: "px ↔ rem Pretvarač",
      description:
        "Pretvarajte između piksela i rem jedinica s prilagođenom baznom veličinom.",
    },
    "px-em": {
      title: "px ↔ em Pretvarač",
      description:
        "Pretvarajte između piksela i em jedinica s prilagođenom veličinom roditelja.",
    },
    "px-percent": {
      title: "px ↔ % Pretvarač",
      description:
        "Pretvarajte između piksela i postotaka s prilagođenom širinom spremnika.",
    },
    "css-unit": {
      title: "CSS Pretvarač jedinica",
      description:
        "Pretvarajte između px, rem, em, %, vw, vh i drugih CSS jedinica.",
    },
    "css-minifier": {
      title: "CSS Minifikator / Uljepšavač",
      description:
        "Minimizirajte ili uljepšajte CSS kod za produkciju ili čitljivost.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Pretvarajte između Tailwind CSS klasa i običnog CSS-a.",
    },
    "cooking-measurement": {
      title: "Pretvarač kuhinjskih mjera",
      description:
        "Pretvarajte između šalica, žlica, žličica, mililitara i grama.",
    },
    "recipe-scaler": {
      title: "Skaliranje recepata",
      description:
        "Prilagodite količine sastojaka prema broju porcija.",
    },
    "oven-temperature": {
      title: "Pretvarač temperature pećnice",
      description:
        "Pretvarajte između Celzija, Fahrenheita i Gas Marka za temperature pećnice.",
    },
    coordinate: {
      title: "Pretvarač koordinata",
      description:
        "Pretvarajte između DMS, DD i DDM formata koordinata.",
    },
    "distance-calculator": {
      title: "Kalkulator udaljenosti",
      description:
        "Izračunajte udaljenost između dviju geografskih koordinata.",
    },
  },
  nav: {
    allTools: "Svi pretvarači",
    language: "Jezik",
  },
  footer: {
    tools: "Pretvarači",
    legal: "Pravne informacije",
    privacy: "Pravila privatnosti",
    terms: "Uvjeti korištenja",
    copyright: "ToolPop. Sva prava pridržana.",
    company: "Tvrtka",
    about: "O nama",
    contact: "Kontakt",
    faq: "ČPP",
  },
  common: {
    backToAll: "Svi pretvarači",
    inputPlaceholder: "Unesite vrijednost za pretvorbu...",
    outputLabel: "Rezultat",
    copyToClipboard: "Kopiraj u međuspremnik",
    copied: "Kopirano!",
    clear: "Obriši",
    paste: "Zalijepi",
    processing: "Pretvaranje...",
    startOver: "Počni ispočetka",
    process: "Pretvori",
    tryAgain: "Pokušaj ponovno",
    notImplemented: "Ovaj pretvarač uskoro dolazi.",
    tryOtherTools: "Isprobajte druge pretvarače",
    privacyBadge: "Sve pretvorbe odvijaju se u vašem pregledniku",
    favoriteAdded: "Dodano u favorite",
    favoriteRemoved: "Uklonjeno iz favorita",
    comingSoon: "Uskoro",
    share: "Podijeli",
    shareTitle: "Podijeli ovaj pretvarač",
    shareSubtitle: "Podijelite ovaj koristan pretvarač s drugima",
    shareCopied: "Poveznica kopirana!",
    shareCopyLink: "Kopiraj poveznicu",
    downloadAsFile: "Preuzmi",
    options: "Opcije",
    input: "Unos",
    output: "Izlaz",
    convert: "Pretvori",
    swap: "Zamijeni",
    from: "Iz",
    to: "U",
    result: "Rezultat",
    allConversions: "Sve pretvorbe",
    details: "Detalji",
    pageNotFound: "Pretvarač nije pronađen",
    goHome: "Natrag na sve pretvarače",
  },
  toolOptions: {
    fromUnit: "Iz",
    toUnit: "U",
    precision: "Decimalna mjesta",
    baseSize: "Bazna veličina fonta (px)",
    parentSize: "Veličina fonta roditelja (px)",
    containerWidth: "Širina spremnika (px)",
    viewportWidth: "Širina prozora (px)",
    viewportHeight: "Visina prozora (px)",
    direction: "Smjer",
    mode: "Način",
    ingredient: "Sastojak",
    water: "Voda",
    flour: "Brašno",
    sugar: "Šećer",
    butter: "Maslac",
    rice: "Riža",
    milk: "Mlijeko",
    originalServings: "Izvorni broj porcija",
    targetServings: "Željeni broj porcija",
    fromTimezone: "Izvorna vremenska zona",
    toTimezone: "Ciljna vremenska zona",
    inputFormat: "Ulazni format",
    outputFormat: "Izlazni format",
    harmony: "Harmonija boja",
    complementary: "Komplementarna",
    triadic: "Trijadna",
    analogous: "Analogna",
    splitComplementary: "Podijeljena komplementarna",
    tetradic: "Tetradna",
    gradientType: "Vrsta gradijenta",
    linear: "Linearni",
    radial: "Radijalni",
    conic: "Konični",
    gradientAngle: "Kut (deg)",
    rootName: "Naziv korijenskog sučelja",
    tableName: "Naziv tablice",
    minify: "Minimiziraj",
    beautify: "Uljepšaj",
    colorType: "Vrsta nedostatka",
    protanopia: "Protanopija (bez crvene)",
    deuteranopia: "Deuteranopija (bez zelene)",
    tritanopia: "Tritanopija (bez plave)",
    achromatopsia: "Akromatopsija (bez boja)",
    operation: "Operacija",
    difference: "Razlika",
    add: "Dodaj",
    subtract: "Oduzmi",
    amount: "Količina",
    unit: "Jedinica",
    days: "Dani",
    weeks: "Tjedni",
    months: "Mjeseci",
    years: "Godine",
    fromBase: "Iz sustava",
    toBase: "U sustav",
    binary: "Binarni (2)",
    octal: "Oktalni (8)",
    decimal: "Decimalni (10)",
    hexadecimal: "Heksadecimalni (16)",
    seconds: "Sekunde",
    milliseconds: "Milisekunde",
    autoDetect: "Automatsko prepoznavanje",
    jsonToYaml: "JSON → YAML",
    yamlToJson: "YAML → JSON",
    jsonToCsv: "JSON → CSV",
    csvToJson: "CSV → JSON",
    jsonToXml: "JSON → XML",
    xmlToJson: "XML → JSON",
    jsonToToml: "JSON → TOML",
    tomlToJson: "TOML → JSON",
    mdToHtml: "Markdown → HTML",
    htmlToMd: "HTML → Markdown",
    markdown: "Markdown tablica",
    html: "HTML tablica",
    sqlToJson: "SQL → JSON",
    jsonToSql: "JSON → SQL",
    pxToRem: "px → rem",
    remToPx: "rem → px",
    pxToEm: "px → em",
    emToPx: "em → px",
    pxToPercent: "px → %",
    percentToPx: "% → px",
    tailwindToCss: "Tailwind → CSS",
    cssToTailwind: "CSS → Tailwind",
    toRoman: "Broj → Rimski",
    toArabic: "Rimski → Broj",
    toScientific: "Standardni → Znanstveni",
    toStandard: "Znanstveni → Standardni",
    toFraction: "Decimala → Razlomak",
    toDecimal: "Razlomak → Decimala",
    decimalToPercent: "Decimala → Postotak",
    percentToDecimal: "Postotak → Decimala",
    fractionToPercent: "Razlomak → Postotak",
    dd: "Decimalni stupnjevi (DD)",
    dms: "Stupnjevi minute sekunde (DMS)",
    ddm: "Stupnjevi decimalne minute (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Dugi format",
    short: "Kratki format",
    relative: "Relativni",
    celsius: "Celzij (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Boja pozadine",
    monochromatic: "Monokromatska",
    timestampToDate: "Vremenska oznaka → Datum",
    dateToTimestamp: "Datum → Vremenska oznaka",
    showDetails: "Prikaži detaljan pregled",
    addDays: "Dodaj dane",
    subtractDays: "Oduzmi dane",
    datetimeHint: "npr. 2024-01-15, 1705312200, now",
    endDate: "Datum završetka",
    today: "Danas (zadano)",
    dateUnit: "Jedinica",
  },
  statsLabels: {
    lines: "Redaka",
    characters: "Znakova",
    rows: "Redova",
    columns: "Stupaca",
    elements: "Elemenata",
    keys: "Ključeva",
    interfaces: "Sučelja",
    properties: "Svojstava",
    originalSize: "Izvorna veličina",
    resultSize: "Veličina rezultata",
    savings: "Ušteda",
    ingredients: "Sastojci",
    scaleFactor: "Faktor skaliranja",
    contrastRatio: "Omjer kontrasta",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Geografska širina",
    longitude: "Geografska dužina",
    distanceKm: "Udaljenost (km)",
    distanceMi: "Udaljenost (mi)",
    years: "Godine",
    months: "Mjeseci",
    days: "Dani",
  },
  processorMessages: {
    invalidTimezone: "Nevažeća vremenska zona",
    pass: "Prolazi", fail: "Ne prolazi",
    fromNow: "od sada", ago: "prije",
    today: "Danas", tomorrow: "Sutra", yesterday: "Jučer",
    seconds: "sekunda", secondsPlural: "sekundi",
    minutes: "minuta", minutesPlural: "minuta",
    hours: "sat", hoursPlural: "sati",
    daysUnit: "dan", daysPlural: "dana",
    weeksUnit: "tjedan", weeksPlural: "tjedana",
    monthsUnit: "mjesec", monthsPlural: "mjeseci",
    yearsUnit: "godina", yearsPlural: "godina",
    gasmark: "Gas Mark",
    veryCool: "Jako hladno", cool: "Hladno", moderatelyCool: "Umjereno hladno",
    moderate: "Umjereno", moderatelyHot: "Umjereno vruće",
    hot: "Vruće", veryHot: "Jako vruće", extremelyHot: "Iznimno vruće",
    original: "Izvorno",
    from: "Od", to: "Do",
    totalDays: "Ukupno dana", weeksDays: "Tjedni + Dani",
    originalDate: "Izvorni datum", operationLabel: "Operacija",
    resultDate: "Rezultat datum", dayOfWeek: "Dan u tjednu",
    daysBetween: "Dana između",
    age: "Dob", totalMonths: "Ukupno mjeseci",
    totalHours: "Ukupno sati", totalMinutes: "Ukupno minuta",
    nextBirthday: "Sljedeći rođendan",
    roman: "Rimski", arabic: "Arapski",
    scientific: "Znanstveni", standard: "Standardni", engineering: "Inženjerski",
    fraction: "Razlomak", simplified: "Pojednostavljeni", percentage: "Postotak",
    color1: "Boja 1", color2: "Boja 2",
    contrastRatioLabel: "Omjer kontrasta",
    aaNormalText: "AA normalni tekst", aaLargeText: "AA veliki tekst",
    aaaNormalText: "AAA normalni tekst", aaaLargeText: "AAA veliki tekst",
    gradientTypeLabel: "Vrsta", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Pretvarač — Besplatni online pretvarači",
    siteDescription:
      "Pretvarajte jedinice, boje, formate podataka, datume i više. Besplatno, brzo i privatno — sve radi u vašem pregledniku.",
    toolTitleSuffix: "| ToolPop Pretvarač",
  },
  blog: {
    title: "Blog",
    description:
      "Savjeti, vodiči i znanje o pretvorbi jedinica, formatima podataka i više.",
    readMore: "Pročitaj više",
    backToBlog: "Natrag na blog",
    publishedOn: "Objavljeno",
    categoryGuide: "Vodič",
    categoryTips: "Savjeti",
    categoryKnowledge: "Znanje",
  },
  cookie: {
    message:
      "Koristimo kolačiće za poboljšanje vašeg iskustva. Nastavkom korištenja prihvaćate našu politiku kolačića.",
    accept: "Prihvati",
    decline: "Odbij",
  },
  unitLabels: {
    length: {
      m: "Metar (m)", km: "Kilometar (km)", cm: "Centimetar (cm)", mm: "Milimetar (mm)",
      mi: "Milja (mi)", yd: "Jard (yd)", ft: "Stopa (ft)", in: "Inč (in)",
      nm: "Nautička milja (nm)", "\u03BCm": "Mikrometar (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Funta (lb)",
      oz: "Unca (oz)", ton: "Metrička tona (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celzij (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Kvadratni metar (m\u00B2)", "km\u00B2": "Kvadratni kilometar (km\u00B2)",
      ha: "Hektar (ha)", acre: "Akr", "ft\u00B2": "Kvadratna stopa (ft\u00B2)",
      "mi\u00B2": "Kvadratna milja (mi\u00B2)", "yd\u00B2": "Kvadratni jard (yd\u00B2)",
      "cm\u00B2": "Kvadratni centimetar (cm\u00B2)",
    },
    volume: {
      L: "Litra (L)", mL: "Mililitra (mL)", gal: "US galon (gal)",
      "fl oz": "US tekuća unca (fl oz)", cup: "US šalica", pt: "US pinta (pt)",
      qt: "US quart (qt)", "m\u00B3": "Kubni metar (m\u00B3)",
      "cm\u00B3": "Kubni centimetar (cm\u00B3)", tbsp: "Žlica (tbsp)", tsp: "Žličica (tsp)",
    },
    speed: {
      "m/s": "Metar/s (m/s)", "km/h": "Kilometar/h (km/h)", mph: "Milja/h (mph)",
      kn: "Čvor (kn)", "ft/s": "Stopa/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisekunda (ms)", s: "Sekunda (s)", min: "Minuta (min)", h: "Sat (h)",
      d: "Dan (d)", wk: "Tjedan (wk)", mo: "Mjesec (mo)", yr: "Godina (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Džul (J)", kJ: "Kilodžul (kJ)", cal: "Kalorija (cal)", kcal: "Kilokalorija (kcal)",
      Wh: "Vat-sat (Wh)", kWh: "Kilovat-sat (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Vat (W)", kW: "Kilovat (kW)", MW: "Megavat (MW)", hp: "Konjska snaga (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kalorija/s",
    },
    frequency: {
      Hz: "Herc (Hz)", kHz: "Kiloherc (kHz)", MHz: "Megaherc (MHz)",
      GHz: "Gigaherc (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Stupanj (\u00B0)", rad: "Radijan (rad)", grad: "Gradijan (grad)",
      turn: "Okretaj", arcmin: "Lučna minuta (\u2032)", arcsec: "Lučna sekunda (\u2033)",
    },
    "data-storage": {
      B: "Bajt (B)", KB: "Kilobajt (KB)", MB: "Megabajt (MB)", GB: "Gigabajt (GB)",
      TB: "Terabajt (TB)", PB: "Petabajt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Šalica", tbsp: "Žlica", tsp: "Žličica", mL: "Mililitra (mL)",
      L: "Litra (L)", fl_oz: "Tekuća unca", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Unca (oz)", lb: "Funta (lb)",
    },
    "oven-temperature": { C: "Celzij (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pikseli (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pikseli (px)", em: "Em (em)" },
    "px-percent": { px: "Pikseli (px)", "%": "Postotak (%)" },
    "css-unit": {
      px: "Pikseli (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Postotak (%)", vw: "Širina prozora (vw)", vh: "Visina prozora (vh)",
    },
  },
};

export default dict;
