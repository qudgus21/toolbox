import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Svi konverteri na jednom mjestu",
    titleAccent: "konverteri",
    description:
      "Pretvarajte jedinice, boje, formate podataka, datume i mnogo toga — direktno u pregledniku.",
    tabAll: "Sve",
    categoryUnit: "Jedinice",
    categoryNumber: "Brojevi",
    categoryColor: "Boje",
    categoryDatetime: "Datum/Vrijeme",
    categoryData: "Podaci",
    categoryCss: "CSS",
    categoryCooking: "Kuhanje",
    categoryGeography: "Geografija",
    searchPlaceholder: "Pretraži konvertere...",
    noResults: "Nema pronađenih konvertera.",
    recentTools: "Nedavno korišteni",
    favorites: "Favoriti",
    favDragHint: "Prevucite za promjenu redoslijeda",
    favHint: "Kliknite zvjezdicu da dodate u favorite",
    gridView: "Mrežni prikaz",
    listView: "Prikaz liste",
  },
  trust: {
    encryption: "Sigurna obrada",
    encryptionDesc: "Sve konverzije se obavljaju lokalno u vašem pregledniku",
    autoDelete: "Bez pohrane podataka",
    autoDeleteDesc: "Vaš unos se nikada ne sprema niti šalje na server",
    free: "100% besplatno",
    freeDesc: "Bez ograničenja, bez registracije, bez skrivenih troškova",
    browserProcessing: "Trenutni rezultati",
    browserProcessingDesc: "Konverzija u realnom vremenu dok tipkate",
  },
  tools: {
    length: {
      title: "Konverter za dužinu",
      description:
        "Pretvarajte između metara, kilometara, milja, stopa, inča i još mnogo toga.",
    },
    weight: {
      title: "Konverter za težinu",
      description:
        "Pretvarajte između kilograma, funti, unci, tona i još mnogo toga.",
    },
    temperature: {
      title: "Konverter za temperaturu",
      description: "Pretvarajte između Celzijusa, Farenhajta i Kelvina.",
    },
    area: {
      title: "Konverter za površinu",
      description:
        "Pretvarajte između kvadratnih metara, hektara, akri, kvadratnih stopa i još mnogo toga.",
    },
    volume: {
      title: "Konverter za zapreminu",
      description:
        "Pretvarajte između litara, galona, šolja, tečnih unci i još mnogo toga.",
    },
    speed: {
      title: "Konverter za brzinu",
      description: "Pretvarajte između m/s, km/h, mph, čvorova i još mnogo toga.",
    },
    time: {
      title: "Konverter za vrijeme",
      description:
        "Pretvarajte između sekundi, minuta, sati, dana, sedmica i još mnogo toga.",
    },
    pressure: {
      title: "Konverter za pritisak",
      description:
        "Pretvarajte između Paskala, bara, PSI, atmosfere i još mnogo toga.",
    },
    energy: {
      title: "Konverter za energiju",
      description:
        "Pretvarajte između džula, kalorija, kilovat-sati, BTU i još mnogo toga.",
    },
    power: {
      title: "Konverter za snagu",
      description:
        "Pretvarajte između vati, kilovati, konjskih snaga i još mnogo toga.",
    },
    frequency: {
      title: "Konverter za frekvenciju",
      description:
        "Pretvarajte između herca, kiloherca, megaherca, gigaherca i RPM.",
    },
    angle: {
      title: "Konverter za uglove",
      description: "Pretvarajte između stepeni, radijana, gradijana i okretaja.",
    },
    "data-storage": {
      title: "Konverter za pohranu podataka",
      description:
        "Pretvarajte između bajtova, kilobajta, megabajta, gigabajta i još mnogo toga.",
    },
    "fuel-economy": {
      title: "Konverter za potrošnju goriva",
      description: "Pretvarajte između km/L, mpg i L/100km.",
    },
    "number-base": {
      title: "Konverter brojevnih baza",
      description:
        "Pretvarajte između binarnog, oktalnog, decimalnog, heksadecimalnog i prilagođenih baza.",
    },
    "roman-numeral": {
      title: "Konverter rimskih brojeva",
      description: "Pretvarajte između rimskih i arapskih brojeva.",
    },
    "scientific-notation": {
      title: "Naučna notacija",
      description:
        "Pretvarajte između naučne notacije i standardnih brojeva.",
    },
    "fraction-decimal": {
      title: "Razlomak ↔ Decimalni",
      description: "Pretvarajte između razlomaka i decimalnih brojeva.",
    },
    percentage: {
      title: "Konverter za procente",
      description:
        "Pretvarajte između razlomaka, decimalnih brojeva i procenata.",
    },
    "color-converter": {
      title: "Konverter za boje",
      description:
        "Pretvarajte između HEX, RGB, HSL, HSV i CMYK formata boja.",
    },
    "color-palette-generator": {
      title: "Generator paleta boja",
      description:
        "Generišite komplementarne, trijadne i analogne palete boja.",
    },
    "gradient-generator": {
      title: "CSS generator gradijenata",
      description:
        "Kreirajte linearne, radijalne i konusne CSS gradijente s pregledom uživo.",
    },
    "color-contrast-checker": {
      title: "Provjera kontrasta boja",
      description:
        "Provjerite WCAG AA/AAA omjer kontrasta između dviju boja.",
    },
    "color-blindness-simulator": {
      title: "Simulator daltonizma",
      description:
        "Simulirajte kako boje izgledaju osobama s poremećajem vida za boje.",
    },
    timezone: {
      title: "Konverter za vremenske zone",
      description:
        "Pretvarajte vrijeme između različitih vremenskih zona širom svijeta.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp konverter",
      description:
        "Pretvarajte između Unix vremenskih oznaka i čitljivih datuma.",
    },
    "date-format": {
      title: "Konverter formata datuma",
      description:
        "Pretvarajte datume između različitih formata (ISO, US, EU i drugih).",
    },
    "date-calculator": {
      title: "Kalkulator datuma",
      description:
        "Izračunajte razliku između datuma ili dodajte/oduzmite dane.",
    },
    "age-calculator": {
      title: "Kalkulator starosti",
      description:
        "Izračunajte tačnu starost od datuma rođenja u godinama, mjesecima i danima.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Pretvarajte između JSON i YAML formata podataka.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Pretvarajte između JSON nizova i CSV tabelarnog formata.",
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
      description: "Pretvarajte između Markdown i HTML markupa.",
    },
    "csv-table": {
      title: "CSV u tabelu",
      description: "Pretvorite CSV podatke u Markdown ili HTML tabele.",
    },
    "json-typescript": {
      title: "JSON u TypeScript",
      description: "Generišite TypeScript interfejse iz JSON podataka.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Pretvarajte između SQL INSERT naredbi i JSON podataka.",
    },
    "px-rem": {
      title: "px ↔ rem konverter",
      description:
        "Pretvarajte između piksela i rem jedinica s prilagodljivom baznom veličinom.",
    },
    "px-em": {
      title: "px ↔ em konverter",
      description:
        "Pretvarajte između piksela i em jedinica s prilagodljivom roditeljskom veličinom.",
    },
    "px-percent": {
      title: "px ↔ % konverter",
      description:
        "Pretvarajte između piksela i procenata s prilagodljivom širinom kontejnera.",
    },
    "css-unit": {
      title: "CSS konverter jedinica",
      description:
        "Pretvarajte između px, rem, em, %, vw, vh i drugih CSS jedinica.",
    },
    "css-minifier": {
      title: "CSS minifikator / uljepšavač",
      description:
        "Minificirajte ili uljepšajte CSS kod za produkciju ili čitljivost.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Pretvarajte između Tailwind CSS klasa i običnog CSS-a.",
    },
    "cooking-measurement": {
      title: "Konverter za kuhinjske mjere",
      description:
        "Pretvarajte između šolja, kašika, kašičica, mililitara i grama.",
    },
    "recipe-scaler": {
      title: "Skaliranje recepata",
      description:
        "Prilagodite količine sastojaka prema broju porcija.",
    },
    "oven-temperature": {
      title: "Konverter za temperaturu rerne",
      description:
        "Pretvarajte između Celzijusa, Farenhajta i Gas Mark za temperature rerne.",
    },
    coordinate: {
      title: "Konverter za koordinate",
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
    allTools: "Svi alati za konverziju",
    language: "Jezik",
  },
  footer: {
    tools: "Konverteri",
    legal: "Pravno",
    privacy: "Politika privatnosti",
    terms: "Uvjeti korištenja",
    copyright: "ToolPop. Sva prava zadržana.",
    company: "Kompanija",
    about: "O nama",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Svi konverteri",
    inputPlaceholder: "Unesite vrijednost za konverziju...",
    outputLabel: "Rezultat",
    copyToClipboard: "Kopiraj u međuspremnik",
    copied: "Kopirano!",
    clear: "Obriši",
    paste: "Zalijepi",
    processing: "Pretvaranje...",
    startOver: "Počni ispočetka",
    process: "Pretvori",
    tryAgain: "Pokušaj ponovo",
    notImplemented: "Ovaj konverter stiže uskoro.",
    tryOtherTools: "Isprobajte druge konvertere",
    privacyBadge: "Sve konverzije se obavljaju u vašem pregledniku",
    favoriteAdded: "Dodano u favorite",
    favoriteRemoved: "Uklonjeno iz favorita",
    comingSoon: "Uskoro",
    share: "Podijeli",
    shareTitle: "Podijelite ovaj konverter",
    shareSubtitle: "Podijelite ovaj koristan konverter s drugima",
    shareCopied: "Link kopiran!",
    shareCopyLink: "Kopiraj link",
    downloadAsFile: "Preuzmi",
    options: "Opcije",
    input: "Unos",
    output: "Izlaz",
    convert: "Pretvori",
    swap: "Zamijeni",
    from: "Iz",
    to: "U",
    result: "Rezultat",
    allConversions: "Sve konverzije",
    details: "Detalji",
    pageNotFound: "Konverter nije pronađen",
    goHome: "Nazad na sve konvertere",
  },
  toolOptions: {
    fromUnit: "Iz",
    toUnit: "U",
    precision: "Decimalna mjesta",
    baseSize: "Bazna veličina fonta (px)",
    parentSize: "Veličina roditeljskog fonta (px)",
    containerWidth: "Širina kontejnera (px)",
    viewportWidth: "Širina preglednika (px)",
    viewportHeight: "Visina preglednika (px)",
    direction: "Smjer",
    mode: "Način",
    ingredient: "Sastojak",
    water: "Voda",
    flour: "Brašno",
    sugar: "Šećer",
    butter: "Maslac",
    rice: "Riža",
    milk: "Mlijeko",
    originalServings: "Originalne porcije",
    targetServings: "Željene porcije",
    fromTimezone: "Iz vremenske zone",
    toTimezone: "U vremensku zonu",
    inputFormat: "Ulazni format",
    outputFormat: "Izlazni format",
    harmony: "Harmonija boja",
    complementary: "Komplementarna",
    triadic: "Trijadna",
    analogous: "Analogna",
    splitComplementary: "Podijeljena komplementarna",
    tetradic: "Tetradna",
    gradientType: "Tip gradijenta",
    linear: "Linearni",
    radial: "Radijalni",
    conic: "Konusni",
    gradientAngle: "Ugao (deg)",
    rootName: "Naziv korijenskog interfejsa",
    tableName: "Naziv tabele",
    minify: "Minificiraj",
    beautify: "Uljepšaj",
    colorType: "Tip poremećaja",
    protanopia: "Protanopija (bez crvene)",
    deuteranopia: "Deuteranopija (bez zelene)",
    tritanopia: "Tritanopija (bez plave)",
    achromatopsia: "Ahromatopsija (bez boje)",
    operation: "Operacija",
    difference: "Razlika",
    add: "Dodaj",
    subtract: "Oduzmi",
    amount: "Iznos",
    unit: "Jedinica",
    days: "Dani",
    weeks: "Sedmice",
    months: "Mjeseci",
    years: "Godine",
    fromBase: "Iz baze",
    toBase: "U bazu",
    binary: "Binarni (2)",
    octal: "Oktalni (8)",
    decimal: "Decimalni (10)",
    hexadecimal: "Heksadecimalni (16)",
    seconds: "Sekunde",
    milliseconds: "Milisekunde",
    autoDetect: "Automatski",
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
    markdown: "Markdown tabela",
    html: "HTML tabela",
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
    toScientific: "Standardni → Naučni",
    toStandard: "Naučni → Standardni",
    toFraction: "Decimalni → Razlomak",
    toDecimal: "Razlomak → Decimalni",
    decimalToPercent: "Decimalni → Procenat",
    percentToDecimal: "Procenat → Decimalni",
    fractionToPercent: "Razlomak → Procenat",
    dd: "Decimalni stepeni (DD)",
    dms: "Stepeni minute sekunde (DMS)",
    ddm: "Stepeni decimalne minute (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Dugi format",
    short: "Kratki format",
    relative: "Relativni",
    celsius: "Celzijus (°C)",
    fahrenheit: "Farenhajt (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Boja pozadine",
    monochromatic: "Monohromatska",
    timestampToDate: "Vremenska oznaka → Datum",
    dateToTimestamp: "Datum → Vremenska oznaka",
    showDetails: "Prikaži detaljan pregled",
    addDays: "Dodaj dane",
    subtractDays: "Oduzmi dane",
    datetimeHint: "npr. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Redovi",
    characters: "Znakovi",
    rows: "Redovi",
    columns: "Kolone",
    elements: "Elementi",
    keys: "Ključevi",
    interfaces: "Interfejsi",
    properties: "Svojstva",
    originalSize: "Originalna veličina",
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
    weeksUnit: "sedmica", weeksPlural: "sedmica",
    monthsUnit: "mjesec", monthsPlural: "mjeseci",
    yearsUnit: "godina", yearsPlural: "godina",
    gasmark: "Gas Mark",
    veryCool: "Jako hladno", cool: "Hladno", moderatelyCool: "Umjereno hladno",
    moderate: "Umjereno", moderatelyHot: "Umjereno vruće",
    hot: "Vruće", veryHot: "Jako vruće", extremelyHot: "Izuzetno vruće",
    original: "Original",
    from: "Od", to: "Do",
    totalDays: "Ukupno dana", weeksDays: "Sedmice + Dani",
    originalDate: "Originalni datum", operationLabel: "Operacija",
    resultDate: "Datum rezultata", dayOfWeek: "Dan u sedmici",
    daysBetween: "Dana između",
    age: "Starost", totalMonths: "Ukupno mjeseci",
    totalHours: "Ukupno sati", totalMinutes: "Ukupno minuta",
    nextBirthday: "Sljedeći rođendan",
    roman: "Rimski", arabic: "Arapski",
    scientific: "Naučni", standard: "Standardni", engineering: "Inženjerski",
    fraction: "Razlomak", simplified: "Pojednostavljen", percentage: "Procenat",
    color1: "Boja 1", color2: "Boja 2",
    contrastRatioLabel: "Omjer kontrasta",
    aaNormalText: "AA normalan tekst", aaLargeText: "AA veliki tekst",
    aaaNormalText: "AAA normalan tekst", aaaLargeText: "AAA veliki tekst",
    gradientTypeLabel: "Tip", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Besplatni online konverteri",
    siteDescription:
      "Pretvarajte jedinice, boje, formate podataka, datume i još mnogo toga. Besplatno, brzo i privatno — sve radi u vašem pregledniku.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Savjeti, vodiči i znanja o konverziji jedinica, formatima podataka i još mnogo toga.",
    readMore: "Pročitajte više",
    backToBlog: "Nazad na blog",
    publishedOn: "Objavljeno",
    categoryGuide: "Vodič",
    categoryTips: "Savjeti",
    categoryKnowledge: "Znanje",
  },
  cookie: {
    message:
      "Koristimo kolačiće za poboljšanje vašeg iskustva. Nastavkom korištenja prihvatate našu politiku kolačića.",
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
    temperature: { C: "Celzijus (\u00B0C)", F: "Farenhajt (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Kvadratni metar (m\u00B2)", "km\u00B2": "Kvadratni kilometar (km\u00B2)",
      ha: "Hektar (ha)", acre: "Aker", "ft\u00B2": "Kvadratna stopa (ft\u00B2)",
      "mi\u00B2": "Kvadratna milja (mi\u00B2)", "yd\u00B2": "Kvadratni jard (yd\u00B2)",
      "cm\u00B2": "Kvadratni centimetar (cm\u00B2)",
    },
    volume: {
      L: "Litar (L)", mL: "Mililitar (mL)", gal: "US galon (gal)",
      "fl oz": "US tečna unca (fl oz)", cup: "US šolja", pt: "US pinta (pt)",
      qt: "US kvart (qt)", "m\u00B3": "Kubni metar (m\u00B3)",
      "cm\u00B3": "Kubni centimetar (cm\u00B3)", tbsp: "Kašika (tbsp)", tsp: "Kašičica (tsp)",
    },
    speed: {
      "m/s": "Metar/s (m/s)", "km/h": "Kilometar/h (km/h)", mph: "Milja/h (mph)",
      kn: "Čvor (kn)", "ft/s": "Stopa/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisekunda (ms)", s: "Sekunda (s)", min: "Minuta (min)", h: "Sat (h)",
      d: "Dan (d)", wk: "Sedmica (wk)", mo: "Mjesec (mo)", yr: "Godina (yr)",
    },
    pressure: {
      Pa: "Paskal (Pa)", kPa: "Kilopaskal (kPa)", bar: "Bar", psi: "PSI",
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
      deg: "Stepen (\u00B0)", rad: "Radijan (rad)", grad: "Gradijan (grad)",
      turn: "Okretaj", arcmin: "Lučna minuta (\u2032)", arcsec: "Lučna sekunda (\u2033)",
    },
    "data-storage": {
      B: "Bajt (B)", KB: "Kilobajt (KB)", MB: "Megabajt (MB)", GB: "Gigabajt (GB)",
      TB: "Terabajt (TB)", PB: "Petabajt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Šolja", tbsp: "Kašika", tsp: "Kašičica", mL: "Mililitar (mL)",
      L: "Litar (L)", fl_oz: "Tečna unca", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Unca (oz)", lb: "Funta (lb)",
    },
    "oven-temperature": { C: "Celzijus (\u00B0C)", F: "Farenhajt (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pikseli (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pikseli (px)", em: "Em (em)" },
    "px-percent": { px: "Pikseli (px)", "%": "Procenat (%)" },
    "css-unit": {
      px: "Pikseli (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procenat (%)", vw: "Širina preglednika (vw)", vh: "Visina preglednika (vh)",
    },
  },
};

export default dict;
