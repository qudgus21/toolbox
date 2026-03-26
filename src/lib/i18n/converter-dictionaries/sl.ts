import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Vsa orodja za pretvorbo, ki jih potrebujete",
    titleAccent: "pretvorbo",
    description:
      "Pretvarjajte enote, barve, podatkovne formate, datume in več. Vse neposredno v brskalniku.",
    tabAll: "Vse",
    categoryUnit: "Enote",
    categoryNumber: "Števila",
    categoryColor: "Barve",
    categoryDatetime: "Datum/Čas",
    categoryData: "Podatki",
    categoryCss: "CSS",
    categoryCooking: "Kuhanje",
    categoryGeography: "Geografija",
    searchPlaceholder: "Iskanje pretvornikov...",
    noResults: "Noben pretvornik ni bil najden.",
    recentTools: "Nedavno uporabljeni",
    favorites: "Priljubljeni",
    favDragHint: "Povlecite za prerazporeditev",
    favHint: "Kliknite zvezdico za dodajanje med priljubljene",
    gridView: "Mrežni pogled",
    listView: "Seznamski pogled",
  },
  trust: {
    encryption: "Varna obdelava",
    encryptionDesc: "Vse pretvorbe potekajo lokalno v vašem brskalniku",
    autoDelete: "Brez shranjevanja podatkov",
    autoDeleteDesc: "Vaši podatki se nikoli ne shranijo ali pošljejo na strežnik",
    free: "100 % brezplačno",
    freeDesc: "Brez omejitev, brez registracije, brez skritih stroškov",
    browserProcessing: "Takojšnji rezultati",
    browserProcessingDesc: "Pretvorba v realnem času med tipkanjem",
  },
  tools: {
    length: {
      title: "Pretvornik dolžin",
      description:
        "Pretvarjajte med metri, kilometri, miljami, čevlji, palci in več.",
    },
    weight: {
      title: "Pretvornik teže",
      description:
        "Pretvarjajte med kilogrami, funti, unčami, tonami in več.",
    },
    temperature: {
      title: "Pretvornik temperatur",
      description: "Pretvarjajte med Celzij, Fahrenheit in Kelvin.",
    },
    area: {
      title: "Pretvornik površin",
      description:
        "Pretvarjajte med kvadratnimi metri, hektarji, akri, kvadratnimi čevlji in več.",
    },
    volume: {
      title: "Pretvornik prostornin",
      description:
        "Pretvarjajte med litri, galoni, skodelicami, tekočinskimi unčami in več.",
    },
    speed: {
      title: "Pretvornik hitrosti",
      description: "Pretvarjajte med m/s, km/h, mph, vozli in več.",
    },
    time: {
      title: "Pretvornik časa",
      description:
        "Pretvarjajte med sekundami, minutami, urami, dnevi, tedni in več.",
    },
    pressure: {
      title: "Pretvornik tlaka",
      description:
        "Pretvarjajte med Pascalom, barom, PSI, atmosfero in več.",
    },
    energy: {
      title: "Pretvornik energije",
      description:
        "Pretvarjajte med jouli, kalorijami, kilovatnimi urami, BTU in več.",
    },
    power: {
      title: "Pretvornik moči",
      description:
        "Pretvarjajte med vati, kilovati, konjskimi močmi in več.",
    },
    frequency: {
      title: "Pretvornik frekvenc",
      description:
        "Pretvarjajte med herci, kiloherci, megaherci, gigaherci in RPM.",
    },
    angle: {
      title: "Pretvornik kotov",
      description: "Pretvarjajte med stopinjami, radiani, gradiani in obrati.",
    },
    "data-storage": {
      title: "Pretvornik podatkovne shrambe",
      description:
        "Pretvarjajte med bajti, kilobajti, megabajti, gigabajti in več.",
    },
    "fuel-economy": {
      title: "Pretvornik porabe goriva",
      description: "Pretvarjajte med km/L, mpg in L/100km.",
    },
    "number-base": {
      title: "Pretvornik številskih osnov",
      description:
        "Pretvarjajte med dvojiškim, osmiškm, desetiškim, šestnajstiškim in drugimi sistemi.",
    },
    "roman-numeral": {
      title: "Pretvornik rimskih številk",
      description: "Pretvarjajte med rimskimi in arabskimi številkami.",
    },
    "scientific-notation": {
      title: "Pretvornik znanstvenega zapisa",
      description:
        "Pretvarjajte med znanstvenim zapisom in standardnimi števili.",
    },
    "fraction-decimal": {
      title: "Ulomek ↔ Decimalno",
      description: "Pretvarjajte med ulomki in decimalnimi števili.",
    },
    percentage: {
      title: "Pretvornik odstotkov",
      description:
        "Pretvarjajte med ulomki, decimalnimi števili in odstotki.",
    },
    "color-converter": {
      title: "Pretvornik barv",
      description:
        "Pretvarjajte med barvnimi formati HEX, RGB, HSL, HSV in CMYK.",
    },
    "color-palette-generator": {
      title: "Generator barvnih palet",
      description:
        "Generirajte komplementarne, triadne in analogne barvne palete.",
    },
    "gradient-generator": {
      title: "Generator CSS gradientov",
      description:
        "Ustvarite linearne, radialne in konične CSS gradiente s predogledom v živo.",
    },
    "color-contrast-checker": {
      title: "Preverjevalnik barvnega kontrasta",
      description:
        "Preverite razmerje kontrasta WCAG AA/AAA med dvema barvama.",
    },
    "color-blindness-simulator": {
      title: "Simulator barvne slepote",
      description:
        "Simulirajte, kako barve vidijo ljudje z motnjo barvnega vida.",
    },
    timezone: {
      title: "Pretvornik časovnih pasov",
      description:
        "Pretvarjajte čas med različnimi časovnimi pasovi po svetu.",
    },
    "unix-timestamp": {
      title: "Pretvornik Unix Timestamp",
      description:
        "Pretvarjajte med Unix časovnimi žigi in berljivimi datumi.",
    },
    "date-format": {
      title: "Pretvornik datumskega formata",
      description:
        "Pretvarjajte datume med različnimi formati (ISO, US, EU in več).",
    },
    "date-calculator": {
      title: "Kalkulator datumov",
      description:
        "Izračunajte razliko med datumi ali dodajte/odštejte dni.",
    },
    "age-calculator": {
      title: "Kalkulator starosti",
      description:
        "Izračunajte natančno starost iz datuma rojstva v letih, mesecih in dnevih.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Pretvarjajte med podatkovnima formatoma JSON in YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Pretvarjajte med JSON nizi in pregledničnim formatom CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Pretvarjajte med podatkovnima formatoma JSON in XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Pretvarjajte med konfiguracijskima formatoma JSON in TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Pretvarjajte med označevalnima jezikoma Markdown in HTML.",
    },
    "csv-table": {
      title: "CSV v tabelo",
      description: "Pretvorite podatke CSV v Markdown ali HTML tabele.",
    },
    "json-typescript": {
      title: "JSON v TypeScript",
      description: "Generirajte TypeScript vmesnike iz podatkov JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Pretvarjajte med SQL INSERT stavki in podatki JSON.",
    },
    "px-rem": {
      title: "px ↔ rem pretvornik",
      description:
        "Pretvarjajte med piksli in enotami rem z osnovno velikostjo po meri.",
    },
    "px-em": {
      title: "px ↔ em pretvornik",
      description:
        "Pretvarjajte med piksli in enotami em z velikostjo nadrejenega elementa po meri.",
    },
    "px-percent": {
      title: "px ↔ % pretvornik",
      description:
        "Pretvarjajte med piksli in odstotki s širino vsebnika po meri.",
    },
    "css-unit": {
      title: "Pretvornik CSS enot",
      description:
        "Pretvarjajte med px, rem, em, %, vw, vh in drugimi CSS enotami.",
    },
    "css-minifier": {
      title: "CSS minimizator / oblikovalec",
      description:
        "Minimizirajte ali oblikujte CSS kodo za produkcijo ali berljivost.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Pretvarjajte med razredi Tailwind CSS in navadnim CSS.",
    },
    "cooking-measurement": {
      title: "Pretvornik kuhinjskih mer",
      description:
        "Pretvarjajte med skodelicami, jedilnimi žlicami, čajnimi žličkami, mililitri in grami.",
    },
    "recipe-scaler": {
      title: "Prilagojevalnik receptov",
      description:
        "Prilagodite sestavine recepta navzgor ali navzdol glede na število porcij.",
    },
    "oven-temperature": {
      title: "Pretvornik temperature pečice",
      description:
        "Pretvarjajte med Celzij, Fahrenheit in Gas Mark za temperature pečice.",
    },
    coordinate: {
      title: "Pretvornik koordinat",
      description:
        "Pretvarjajte med koordinatnimi formati DMS, DD in DDM.",
    },
    "distance-calculator": {
      title: "Kalkulator razdalj",
      description:
        "Izračunajte razdaljo med dvema geografskima koordinatama.",
    },
  },
  nav: {
    allTools: "Vsa orodja za pretvorbo",
    language: "Jezik",
  },
  footer: {
    tools: "Pretvorniki",
    legal: "Pravne informacije",
    privacy: "Politika zasebnosti",
    terms: "Pogoji uporabe",
    copyright: "ToolPop. Vse pravice pridržane.",
    company: "Podjetje",
    about: "O nas",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Vsi pretvorniki",
    inputPlaceholder: "Vnesite vrednost za pretvorbo...",
    outputLabel: "Rezultat",
    copyToClipboard: "Kopiraj v odložišče",
    copied: "Kopirano!",
    clear: "Počisti",
    paste: "Prilepi",
    processing: "Pretvarjanje...",
    startOver: "Začni znova",
    process: "Pretvori",
    tryAgain: "Poskusi znova",
    notImplemented: "Ta pretvornik bo kmalu na voljo.",
    tryOtherTools: "Preizkusite druge pretvornike",
    privacyBadge: "Vse pretvorbe potekajo v vašem brskalniku",
    favoriteAdded: "Dodano med priljubljene",
    favoriteRemoved: "Odstranjeno iz priljubljenih",
    comingSoon: "Kmalu na voljo",
    share: "Deli",
    shareTitle: "Deli ta pretvornik",
    shareSubtitle: "Delite ta uporaben pretvornik z drugimi",
    shareCopied: "Povezava kopirana!",
    shareCopyLink: "Kopiraj povezavo",
    downloadAsFile: "Prenesi",
    options: "Možnosti",
    input: "Vhod",
    output: "Izhod",
    convert: "Pretvori",
    swap: "Zamenjaj",
    from: "Iz",
    to: "V",
    result: "Rezultat",
    allConversions: "Vse pretvorbe",
    details: "Podrobnosti",
    pageNotFound: "Pretvornik ni bil najden",
    goHome: "Nazaj na vse pretvornike",
  },
  toolOptions: {
    fromUnit: "Iz",
    toUnit: "V",
    precision: "Decimalna mesta",
    baseSize: "Osnovna velikost pisave (px)",
    parentSize: "Velikost pisave nadrejenega (px)",
    containerWidth: "Širina vsebnika (px)",
    viewportWidth: "Širina pogleda (px)",
    viewportHeight: "Višina pogleda (px)",
    direction: "Smer",
    mode: "Način",
    ingredient: "Sestavina",
    water: "Voda",
    flour: "Moka",
    sugar: "Sladkor",
    butter: "Maslo",
    rice: "Riž",
    milk: "Mleko",
    originalServings: "Prvotne porcije",
    targetServings: "Želene porcije",
    fromTimezone: "Iz časovnega pasu",
    toTimezone: "V časovni pas",
    inputFormat: "Vhodni format",
    outputFormat: "Izhodni format",
    harmony: "Barvna harmonija",
    complementary: "Komplementarna",
    triadic: "Triadna",
    analogous: "Analogna",
    splitComplementary: "Deljena komplementarna",
    tetradic: "Tetradna",
    gradientType: "Vrsta gradienta",
    linear: "Linearni",
    radial: "Radialni",
    conic: "Konični",
    gradientAngle: "Kot (deg)",
    rootName: "Ime korenskega vmesnika",
    tableName: "Ime tabele",
    minify: "Minimiziraj",
    beautify: "Oblikuj",
    colorType: "Vrsta motnje",
    protanopia: "Protanopija (brez rdeče)",
    deuteranopia: "Devteranopija (brez zelene)",
    tritanopia: "Tritanopija (brez modre)",
    achromatopsia: "Akromatopsija (brez barv)",
    operation: "Operacija",
    difference: "Razlika",
    add: "Dodaj",
    subtract: "Odštej",
    amount: "Količina",
    unit: "Enota",
    days: "Dnevi",
    weeks: "Tedni",
    months: "Meseci",
    years: "Leta",
    fromBase: "Iz osnove",
    toBase: "V osnovo",
    binary: "Dvojiška (2)",
    octal: "Osmiška (8)",
    decimal: "Desetiška (10)",
    hexadecimal: "Šestnajstiška (16)",
    seconds: "Sekunde",
    milliseconds: "Milisekunde",
    autoDetect: "Samodejno zaznaj",
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
    toRoman: "Število → Rimsko",
    toArabic: "Rimsko → Število",
    toScientific: "Standardno → Znanstveno",
    toStandard: "Znanstveno → Standardno",
    toFraction: "Decimalno → Ulomek",
    toDecimal: "Ulomek → Decimalno",
    decimalToPercent: "Decimalno → Odstotek",
    percentToDecimal: "Odstotek → Decimalno",
    fractionToPercent: "Ulomek → Odstotek",
    dd: "Decimalne stopinje (DD)",
    dms: "Stopinje Minute Sekunde (DMS)",
    ddm: "Stopinje Decimalne minute (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Dolg format",
    short: "Kratek format",
    relative: "Relativno",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Barva ozadja",
    monochromatic: "Monokromatska",
    timestampToDate: "Časovni žig → Datum",
    dateToTimestamp: "Datum → Časovni žig",
    showDetails: "Prikaži podroben razčlenitev",
    addDays: "Dodaj dneve",
    subtractDays: "Odštej dneve",
    datetimeHint: "npr. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Vrstice",
    characters: "Znaki",
    rows: "Vrstice",
    columns: "Stolpci",
    elements: "Elementi",
    keys: "Ključi",
    interfaces: "Vmesniki",
    properties: "Lastnosti",
    originalSize: "Prvotna velikost",
    resultSize: "Velikost rezultata",
    savings: "Prihranek",
    ingredients: "Sestavine",
    scaleFactor: "Faktor prilagoditve",
    contrastRatio: "Razmerje kontrasta",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Zemljepisna širina",
    longitude: "Zemljepisna dolžina",
    distanceKm: "Razdalja (km)",
    distanceMi: "Razdalja (mi)",
    years: "Leta",
    months: "Meseci",
    days: "Dnevi",
  },
  processorMessages: {
    invalidTimezone: "Neveljaven časovni pas",
    pass: "Uspešno", fail: "Neuspešno",
    fromNow: "od zdaj", ago: "nazaj",
    today: "Danes", tomorrow: "Jutri", yesterday: "Včeraj",
    seconds: "sekunda", secondsPlural: "sekund",
    minutes: "minuta", minutesPlural: "minut",
    hours: "ura", hoursPlural: "ur",
    daysUnit: "dan", daysPlural: "dni",
    weeksUnit: "teden", weeksPlural: "tednov",
    monthsUnit: "mesec", monthsPlural: "mesecev",
    yearsUnit: "leto", yearsPlural: "let",
    gasmark: "Gas Mark",
    veryCool: "Zelo hladno", cool: "Hladno", moderatelyCool: "Zmerno hladno",
    moderate: "Zmerno", moderatelyHot: "Zmerno vroče",
    hot: "Vroče", veryHot: "Zelo vroče", extremelyHot: "Izjemno vroče",
    original: "Izvirnik",
    from: "Od", to: "Do",
    totalDays: "Skupno dni", weeksDays: "Tedni + Dnevi",
    originalDate: "Izvirni datum", operationLabel: "Operacija",
    resultDate: "Rezultat datum", dayOfWeek: "Dan v tednu",
    daysBetween: "Dni med",
    age: "Starost", totalMonths: "Skupno mesecev",
    totalHours: "Skupno ur", totalMinutes: "Skupno minut",
    nextBirthday: "Naslednji rojstni dan",
    roman: "Rimsko", arabic: "Arabsko",
    scientific: "Znanstveno", standard: "Standardno", engineering: "Inženirsko",
    fraction: "Ulomek", simplified: "Poenostavljeno", percentage: "Odstotek",
    color1: "Barva 1", color2: "Barva 2",
    contrastRatioLabel: "Razmerje kontrasta",
    aaNormalText: "AA navadno besedilo", aaLargeText: "AA veliko besedilo",
    aaaNormalText: "AAA navadno besedilo", aaaLargeText: "AAA veliko besedilo",
    gradientTypeLabel: "Vrsta", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Brezplačni spletni pretvorniki",
    siteDescription:
      "Pretvarjajte enote, barve, podatkovne formate, datume in več. Brezplačno, hitro in zasebno — vse deluje v vašem brskalniku.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Nasveti, vodniki in znanje o pretvorbah enot, podatkovnih formatih in več.",
    readMore: "Preberi več",
    backToBlog: "Nazaj na blog",
    publishedOn: "Objavljeno",
    categoryGuide: "Vodnik",
    categoryTips: "Nasveti",
    categoryKnowledge: "Znanje",
  },
  cookie: {
    message:
      "Uporabljamo piškotke za izboljšanje vaše izkušnje. Z nadaljevanjem se strinjate z našo politiko piškotkov.",
    accept: "Sprejmi",
    decline: "Zavrni",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Milimeter (mm)",
      mi: "Milja (mi)", yd: "Jard (yd)", ft: "Čevelj (ft)", in: "Palec (in)",
      nm: "Navtična milja (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Funt (lb)",
      oz: "Unča (oz)", ton: "Metrična tona (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celzij (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Kvadratni meter (m\u00B2)", "km\u00B2": "Kvadratni kilometer (km\u00B2)",
      ha: "Hektar (ha)", acre: "Aker", "ft\u00B2": "Kvadratni čevelj (ft\u00B2)",
      "mi\u00B2": "Kvadratna milja (mi\u00B2)", "yd\u00B2": "Kvadratni jard (yd\u00B2)",
      "cm\u00B2": "Kvadratni centimeter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Mililiter (mL)", gal: "Ameriski galon (gal)",
      "fl oz": "Ameriška tekočinska unča (fl oz)", cup: "Ameriška skodelica", pt: "Ameriška pinta (pt)",
      qt: "Ameriški quart (qt)", "m\u00B3": "Kubični meter (m\u00B3)",
      "cm\u00B3": "Kubični centimeter (cm\u00B3)", tbsp: "Jedilna žlica (tbsp)", tsp: "Čajna žlička (tsp)",
    },
    speed: {
      "m/s": "Meter/s (m/s)", "km/h": "Kilometer/h (km/h)", mph: "Milja/h (mph)",
      kn: "Vozel (kn)", "ft/s": "Čevelj/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisekunda (ms)", s: "Sekunda (s)", min: "Minuta (min)", h: "Ura (h)",
      d: "Dan (d)", wk: "Teden (wk)", mo: "Mesec (mo)", yr: "Leto (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalorija (cal)", kcal: "Kilokalorija (kcal)",
      Wh: "Vatna ura (Wh)", kWh: "Kilovatna ura (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Vat (W)", kW: "Kilovat (kW)", MW: "Megavat (MW)", hp: "Konjska moč (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kalorija/s",
    },
    frequency: {
      Hz: "Herc (Hz)", kHz: "Kiloherc (kHz)", MHz: "Megaherc (MHz)",
      GHz: "Gigaherc (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Stopinja (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Obrat", arcmin: "Kotna minuta (\u2032)", arcsec: "Kotna sekunda (\u2033)",
    },
    "data-storage": {
      B: "Bajt (B)", KB: "Kilobajt (KB)", MB: "Megabajt (MB)", GB: "Gigabajt (GB)",
      TB: "Terabajt (TB)", PB: "Petabajt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Skodelica", tbsp: "Jedilna žlica", tsp: "Čajna žlička", mL: "Mililiter (mL)",
      L: "Liter (L)", fl_oz: "Tekočinska unča", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Unča (oz)", lb: "Funt (lb)",
    },
    "oven-temperature": { C: "Celzij (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Piksli (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Piksli (px)", em: "Em (em)" },
    "px-percent": { px: "Piksli (px)", "%": "Odstotek (%)" },
    "css-unit": {
      px: "Piksli (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Odstotek (%)", vw: "Širina pogleda (vw)", vh: "Višina pogleda (vh)",
    },
  },
};

export default dict;
