import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Toate convertoarele de care ai nevoie",
    titleAccent: "convertoarele",
    description:
      "Convertește unități, culori, formate de date, date calendaristice și multe altele — instant, direct în browser.",
    tabAll: "Toate",
    categoryUnit: "Unități",
    categoryNumber: "Numere",
    categoryColor: "Culori",
    categoryDatetime: "Dată/Oră",
    categoryData: "Date",
    categoryCss: "CSS",
    categoryCooking: "Gătit",
    categoryGeography: "Geografie",
    searchPlaceholder: "Caută convertoare...",
    noResults: "Niciun convertor găsit.",
    recentTools: "Utilizate recent",
    favorites: "Favorite",
    favDragHint: "Trage pentru a reordona",
    favHint: "Apasă pe stea pentru a adăuga la favorite",
    gridView: "Vizualizare grilă",
    listView: "Vizualizare listă",
  },
  trust: {
    encryption: "Procesare sigură",
    encryptionDesc: "Toate conversiile au loc local, în browserul tău",
    autoDelete: "Fără stocare de date",
    autoDeleteDesc: "Datele tale nu sunt niciodată salvate sau trimise la un server",
    free: "100% gratuit",
    freeDesc: "Fără limite, fără înregistrare, fără costuri ascunse",
    browserProcessing: "Rezultate instantanee",
    browserProcessingDesc: "Conversie în timp real pe măsură ce tastezi",
  },
  tools: {
    length: {
      title: "Convertor de lungime",
      description:
        "Convertește între metri, kilometri, mile, picioare, inci și multe altele.",
    },
    weight: {
      title: "Convertor de greutate",
      description:
        "Convertește între kilograme, livre, uncii, tone și multe altele.",
    },
    temperature: {
      title: "Convertor de temperatură",
      description: "Convertește între Celsius, Fahrenheit și Kelvin.",
    },
    area: {
      title: "Convertor de suprafață",
      description:
        "Convertește între metri pătrați, hectare, acri, picioare pătrate și multe altele.",
    },
    volume: {
      title: "Convertor de volum",
      description:
        "Convertește între litri, galoane, căni, uncii lichide și multe altele.",
    },
    speed: {
      title: "Convertor de viteză",
      description: "Convertește între m/s, km/h, mph, noduri și multe altele.",
    },
    time: {
      title: "Convertor de timp",
      description:
        "Convertește între secunde, minute, ore, zile, săptămâni și multe altele.",
    },
    pressure: {
      title: "Convertor de presiune",
      description:
        "Convertește între Pascal, bar, PSI, atmosferă și multe altele.",
    },
    energy: {
      title: "Convertor de energie",
      description:
        "Convertește între jouli, calorii, kilowatt-ore, BTU și multe altele.",
    },
    power: {
      title: "Convertor de putere",
      description:
        "Convertește între wați, kilowați, cai putere și multe altele.",
    },
    frequency: {
      title: "Convertor de frecvență",
      description:
        "Convertește între hertz, kilohertz, megahertz, gigahertz și RPM.",
    },
    angle: {
      title: "Convertor de unghiuri",
      description: "Convertește între grade, radiani, gradieni și ture.",
    },
    "data-storage": {
      title: "Convertor de stocare date",
      description:
        "Convertește între bytes, kilobytes, megabytes, gigabytes și multe altele.",
    },
    "fuel-economy": {
      title: "Convertor consum de combustibil",
      description: "Convertește între km/L, mpg și L/100km.",
    },
    "number-base": {
      title: "Convertor de baze numerice",
      description:
        "Convertește între binar, octal, zecimal, hexazecimal și baze personalizate.",
    },
    "roman-numeral": {
      title: "Convertor de cifre romane",
      description: "Convertește între cifre romane și numere arabe.",
    },
    "scientific-notation": {
      title: "Convertor notație științifică",
      description:
        "Convertește între notația științifică și numerele standard.",
    },
    "fraction-decimal": {
      title: "Fracție ↔ Zecimal",
      description: "Convertește între fracții și numere zecimale.",
    },
    percentage: {
      title: "Convertor de procente",
      description:
        "Convertește între fracții, zecimale și procente.",
    },
    "color-converter": {
      title: "Convertor de culori",
      description:
        "Convertește între formatele de culoare HEX, RGB, HSL, HSV și CMYK.",
    },
    "color-palette-generator": {
      title: "Generator de palete de culori",
      description:
        "Generează palete de culori complementare, triadice și analoge.",
    },
    "gradient-generator": {
      title: "Generator de gradienți CSS",
      description:
        "Creează gradienți CSS liniari, radiali și conici cu previzualizare live.",
    },
    "color-contrast-checker": {
      title: "Verificator de contrast",
      description:
        "Verifică raportul de contrast WCAG AA/AAA între două culori.",
    },
    "color-blindness-simulator": {
      title: "Simulator de daltonism",
      description:
        "Simulează cum apar culorile pentru persoanele cu deficiențe de vedere a culorilor.",
    },
    timezone: {
      title: "Convertor de fusuri orare",
      description:
        "Convertește ora între diferite fusuri orare din întreaga lume.",
    },
    "unix-timestamp": {
      title: "Convertor Unix Timestamp",
      description:
        "Convertește între timestamp-uri Unix și date lizibile.",
    },
    "date-format": {
      title: "Convertor de format dată",
      description:
        "Convertește date între diferite formate (ISO, US, EU și altele).",
    },
    "date-calculator": {
      title: "Calculator de date",
      description:
        "Calculează diferența dintre date sau adaugă/scade zile.",
    },
    "age-calculator": {
      title: "Calculator de vârstă",
      description:
        "Calculează vârsta exactă din data nașterii în ani, luni și zile.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Convertește între formatele de date JSON și YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Convertește între array-uri JSON și formatul de foi de calcul CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Convertește între formatele de date JSON și XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Convertește între formatele de configurare JSON și TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Convertește între markup-ul Markdown și HTML.",
    },
    "csv-table": {
      title: "CSV în tabel",
      description: "Convertește date CSV în tabele Markdown sau HTML.",
    },
    "json-typescript": {
      title: "JSON în TypeScript",
      description: "Generează interfețe TypeScript din date JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Convertește între instrucțiuni SQL INSERT și date JSON.",
    },
    "px-rem": {
      title: "px ↔ rem Convertor",
      description:
        "Convertește între pixeli și unități rem cu dimensiune de bază personalizată.",
    },
    "px-em": {
      title: "px ↔ em Convertor",
      description:
        "Convertește între pixeli și unități em cu dimensiune părinte personalizată.",
    },
    "px-percent": {
      title: "px ↔ % Convertor",
      description:
        "Convertește între pixeli și procente cu lățime container personalizată.",
    },
    "css-unit": {
      title: "Convertor de unități CSS",
      description:
        "Convertește între px, rem, em, %, vw, vh și alte unități CSS.",
    },
    "css-minifier": {
      title: "CSS Minifier / Beautifier",
      description:
        "Minifică sau formatează codul CSS pentru producție sau lizibilitate.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Convertește între clasele Tailwind CSS și CSS obișnuit.",
    },
    "cooking-measurement": {
      title: "Convertor de măsuri culinare",
      description:
        "Convertește între căni, linguri, lingurițe, mililitri și grame.",
    },
    "recipe-scaler": {
      title: "Ajustare rețete",
      description:
        "Ajustează ingredientele rețetei în sus sau în jos după numărul de porții.",
    },
    "oven-temperature": {
      title: "Convertor temperatură cuptor",
      description:
        "Convertește între Celsius, Fahrenheit și Gas Mark pentru temperaturi de cuptor.",
    },
    coordinate: {
      title: "Convertor de coordonate",
      description:
        "Convertește între formatele de coordonate DMS, DD și DDM.",
    },
    "distance-calculator": {
      title: "Calculator de distanță",
      description:
        "Calculează distanța dintre două coordonate geografice.",
    },
  },
  nav: {
    allTools: "Toate convertoarele",
    language: "Limbă",
  },
  footer: {
    tools: "Convertoare",
    legal: "Legal",
    privacy: "Politica de confidențialitate",
    terms: "Termeni și condiții",
    copyright: "ToolPop. Toate drepturile rezervate.",
    company: "Companie",
    about: "Despre noi",
    contact: "Contact",
    faq: "FAQ",
  },
  common: {
    backToAll: "Toate convertoarele",
    inputPlaceholder: "Introdu o valoare de convertit...",
    outputLabel: "Rezultat",
    copyToClipboard: "Copiază în clipboard",
    copied: "Copiat!",
    clear: "Șterge",
    paste: "Lipește",
    processing: "Se convertește...",
    startOver: "Începe din nou",
    process: "Convertește",
    tryAgain: "Încearcă din nou",
    notImplemented: "Acest convertor va fi disponibil în curând.",
    tryOtherTools: "Încearcă alte convertoare",
    privacyBadge: "Toate conversiile au loc în browserul tău",
    favoriteAdded: "Adăugat la favorite",
    favoriteRemoved: "Eliminat din favorite",
    comingSoon: "În curând",
    share: "Distribuie",
    shareTitle: "Distribuie acest convertor",
    shareSubtitle: "Distribuie acest convertor util cu alții",
    shareCopied: "Link copiat!",
    shareCopyLink: "Copiază linkul",
    downloadAsFile: "Descarcă",
    options: "Opțiuni",
    input: "Intrare",
    output: "Ieșire",
    convert: "Convertește",
    swap: "Inversează",
    from: "Din",
    to: "În",
    result: "Rezultat",
    allConversions: "Toate conversiile",
    details: "Detalii",
    pageNotFound: "Convertor negăsit",
    goHome: "Înapoi la toate convertoarele",
  },
  toolOptions: {
    fromUnit: "Din",
    toUnit: "În",
    precision: "Zecimale",
    baseSize: "Dimensiune font de bază (px)",
    parentSize: "Dimensiune font părinte (px)",
    containerWidth: "Lățime container (px)",
    viewportWidth: "Lățime viewport (px)",
    viewportHeight: "Înălțime viewport (px)",
    direction: "Direcție",
    mode: "Mod",
    ingredient: "Ingredient",
    water: "Apă",
    flour: "Făină",
    sugar: "Zahăr",
    butter: "Unt",
    rice: "Orez",
    milk: "Lapte",
    originalServings: "Porții originale",
    targetServings: "Porții dorite",
    fromTimezone: "Din fusul orar",
    toTimezone: "În fusul orar",
    inputFormat: "Format intrare",
    outputFormat: "Format ieșire",
    harmony: "Armonie cromatică",
    complementary: "Complementar",
    triadic: "Triadic",
    analogous: "Analog",
    splitComplementary: "Complementar scindat",
    tetradic: "Tetradic",
    gradientType: "Tip de gradient",
    linear: "Liniar",
    radial: "Radial",
    conic: "Conic",
    gradientAngle: "Unghi (deg)",
    rootName: "Nume interfață rădăcină",
    tableName: "Nume tabel",
    minify: "Minifică",
    beautify: "Formatează",
    colorType: "Tip de deficiență",
    protanopia: "Protanopie (fără roșu)",
    deuteranopia: "Deuteranopie (fără verde)",
    tritanopia: "Tritanopie (fără albastru)",
    achromatopsia: "Acromatopsie (fără culoare)",
    operation: "Operație",
    difference: "Diferență",
    add: "Adaugă",
    subtract: "Scade",
    amount: "Cantitate",
    unit: "Unitate",
    days: "Zile",
    weeks: "Săptămâni",
    months: "Luni",
    years: "Ani",
    fromBase: "Din baza",
    toBase: "În baza",
    binary: "Binar (2)",
    octal: "Octal (8)",
    decimal: "Zecimal (10)",
    hexadecimal: "Hexazecimal (16)",
    seconds: "Secunde",
    milliseconds: "Milisecunde",
    autoDetect: "Detectare automată",
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
    markdown: "Tabel Markdown",
    html: "Tabel HTML",
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
    toRoman: "Număr → Roman",
    toArabic: "Roman → Număr",
    toScientific: "Standard → Științific",
    toStandard: "Științific → Standard",
    toFraction: "Zecimal → Fracție",
    toDecimal: "Fracție → Zecimal",
    decimalToPercent: "Zecimal → Procent",
    percentToDecimal: "Procent → Zecimal",
    fractionToPercent: "Fracție → Procent",
    dd: "Grade zecimale (DD)",
    dms: "Grade Minute Secunde (DMS)",
    ddm: "Grade Minute zecimale (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Format lung",
    short: "Format scurt",
    relative: "Relativ",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Culoare fundal",
    monochromatic: "Monocromatică",
    timestampToDate: "Timestamp → Dată",
    dateToTimestamp: "Dată → Timestamp",
    showDetails: "Afișează detalii complete",
    addDays: "Adaugă zile",
    subtractDays: "Scade zile",
    datetimeHint: "ex. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Linii",
    characters: "Caractere",
    rows: "Rânduri",
    columns: "Coloane",
    elements: "Elemente",
    keys: "Chei",
    interfaces: "Interfețe",
    properties: "Proprietăți",
    originalSize: "Dimensiune originală",
    resultSize: "Dimensiune rezultat",
    savings: "Economie",
    ingredients: "Ingrediente",
    scaleFactor: "Factor de scalare",
    contrastRatio: "Raport de contrast",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitudine",
    longitude: "Longitudine",
    distanceKm: "Distanță (km)",
    distanceMi: "Distanță (mi)",
    years: "Ani",
    months: "Luni",
    days: "Zile",
  },
  processorMessages: {
    invalidTimezone: "Fus orar invalid",
    pass: "Trecut", fail: "Eșuat",
    fromNow: "de acum", ago: "în urmă",
    today: "Astăzi", tomorrow: "Mâine", yesterday: "Ieri",
    seconds: "secundă", secondsPlural: "secunde",
    minutes: "minut", minutesPlural: "minute",
    hours: "oră", hoursPlural: "ore",
    daysUnit: "zi", daysPlural: "zile",
    weeksUnit: "săptămână", weeksPlural: "săptămâni",
    monthsUnit: "lună", monthsPlural: "luni",
    yearsUnit: "an", yearsPlural: "ani",
    gasmark: "Gas Mark",
    veryCool: "Foarte rece", cool: "Rece", moderatelyCool: "Moderat rece",
    moderate: "Moderat", moderatelyHot: "Moderat cald",
    hot: "Cald", veryHot: "Foarte cald", extremelyHot: "Extrem de cald",
    original: "Original",
    from: "De la", to: "La",
    totalDays: "Total zile", weeksDays: "Săptămâni + Zile",
    originalDate: "Data originală", operationLabel: "Operație",
    resultDate: "Data rezultat", dayOfWeek: "Ziua săptămânii",
    daysBetween: "Zile între",
    age: "Vârstă", totalMonths: "Total luni",
    totalHours: "Total ore", totalMinutes: "Total minute",
    nextBirthday: "Următoarea zi de naștere",
    roman: "Roman", arabic: "Arab",
    scientific: "Științific", standard: "Standard", engineering: "Ingineresc",
    fraction: "Fracție", simplified: "Simplificat", percentage: "Procent",
    color1: "Culoare 1", color2: "Culoare 2",
    contrastRatioLabel: "Raport de contrast",
    aaNormalText: "AA text normal", aaLargeText: "AA text mare",
    aaaNormalText: "AAA text normal", aaaLargeText: "AAA text mare",
    gradientTypeLabel: "Tip", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Convertoare online gratuite",
    siteDescription:
      "Convertește unități, culori, formate de date, date calendaristice și multe altele. Gratuit, rapid și privat — totul funcționează în browserul tău.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Sfaturi, ghiduri și informații despre conversii de unități, formate de date și multe altele.",
    readMore: "Citește mai mult",
    backToBlog: "Înapoi la blog",
    publishedOn: "Publicat pe",
    categoryGuide: "Ghid",
    categoryTips: "Sfaturi",
    categoryKnowledge: "Informații",
  },
  cookie: {
    message:
      "Folosim cookie-uri pentru a-ți îmbunătăți experiența. Continuând, ești de acord cu politica noastră de cookie-uri.",
    accept: "Accept",
    decline: "Refuz",
  },
  unitLabels: {
    length: {
      m: "Metru (m)", km: "Kilometru (km)", cm: "Centimetru (cm)", mm: "Milimetru (mm)",
      mi: "Milă (mi)", yd: "Yard (yd)", ft: "Picior (ft)", in: "Inch (in)",
      nm: "Milă nautică (nm)", "\u03BCm": "Micrometru (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Livră (lb)",
      oz: "Uncie (oz)", ton: "Tonă metrică (t)", st: "Stone (st)", ct: "Carat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Metru pătrat (m\u00B2)", "km\u00B2": "Kilometru pătrat (km\u00B2)",
      ha: "Hectar (ha)", acre: "Acru", "ft\u00B2": "Picior pătrat (ft\u00B2)",
      "mi\u00B2": "Milă pătrată (mi\u00B2)", "yd\u00B2": "Yard pătrat (yd\u00B2)",
      "cm\u00B2": "Centimetru pătrat (cm\u00B2)",
    },
    volume: {
      L: "Litru (L)", mL: "Mililitru (mL)", gal: "Galon US (gal)",
      "fl oz": "Uncie lichidă US (fl oz)", cup: "Cană US", pt: "Pintă US (pt)",
      qt: "Quart US (qt)", "m\u00B3": "Metru cub (m\u00B3)",
      "cm\u00B3": "Centimetru cub (cm\u00B3)", tbsp: "Lingură (tbsp)", tsp: "Linguriță (tsp)",
    },
    speed: {
      "m/s": "Metru/s (m/s)", "km/h": "Kilometru/h (km/h)", mph: "Milă/h (mph)",
      kn: "Nod (kn)", "ft/s": "Picior/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisecundă (ms)", s: "Secundă (s)", min: "Minut (min)", h: "Oră (h)",
      d: "Zi (d)", wk: "Săptămână (wk)", mo: "Lună (mo)", yr: "An (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosferă (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Calorie (cal)", kcal: "Kilocalorie (kcal)",
      Wh: "Watt-oră (Wh)", kWh: "Kilowatt-oră (kWh)", BTU: "BTU", eV: "Electronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Cal putere (hp)",
      "BTU/h": "BTU/h", "cal/s": "Calorie/s",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grad (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Rotație", arcmin: "Minut de arc (\u2032)", arcsec: "Secundă de arc (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Cană", tbsp: "Lingură", tsp: "Linguriță", mL: "Mililitru (mL)",
      L: "Litru (L)", fl_oz: "Uncie lichidă", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Uncie (oz)", lb: "Livră (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixeli (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixeli (px)", em: "Em (em)" },
    "px-percent": { px: "Pixeli (px)", "%": "Procent (%)" },
    "css-unit": {
      px: "Pixeli (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procent (%)", vw: "Lățime viewport (vw)", vh: "Înălțime viewport (vh)",
    },
  },
};

export default dict;
