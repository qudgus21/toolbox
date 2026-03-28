import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Kõik vajalikud teisendamistööriistad",
    titleAccent: "teisendamis",
    description:
      "Teisenda ühikuid, värve, andmeformaate, kuupäevi ja muud. Kõik toimub otse brauseris.",
    tabAll: "Kõik",
    categoryUnit: "Ühikud",
    categoryNumber: "Arvud",
    categoryColor: "Värvid",
    categoryDatetime: "Kuupäev/Aeg",
    categoryData: "Andmed",
    categoryCss: "CSS",
    categoryCooking: "Toiduvalmistamine",
    categoryGeography: "Geograafia",
    searchPlaceholder: "Otsi teisendajaid...",
    noResults: "Teisendajaid ei leitud.",
    recentTools: "Hiljuti kasutatud",
    favorites: "Lemmikud",
    favDragHint: "Lohistage järjestuse muutmiseks",
    favHint: "Klõpsake tähte lemmikute hulka lisamiseks",
    gridView: "Ruudustik",
    listView: "Nimekiri",
  },
  trust: {
    encryption: "Turvaline töötlemine",
    encryptionDesc: "Kõik teisendused toimuvad lokaalselt teie brauseris",
    autoDelete: "Andmeid ei salvestata",
    autoDeleteDesc: "Teie sisendit ei salvestata ega saadeta serverisse",
    free: "100% tasuta",
    freeDesc: "Ilma piiranguteta, registreerimiseta, peidetud tasudeta",
    browserProcessing: "Kohesed tulemused",
    browserProcessingDesc: "Reaalajas teisendamine sisestamise ajal",
  },
  tools: {
    length: {
      title: "Pikkuse teisendaja",
      description:
        "Teisendage meetrite, kilomeetrite, miilide, jalgade, tollide ja muu vahel.",
    },
    weight: {
      title: "Kaalu teisendaja",
      description:
        "Teisendage kilogrammide, naelte, untside, tonnide ja muu vahel.",
    },
    temperature: {
      title: "Temperatuuri teisendaja",
      description: "Teisendage Celsiuse, Fahrenheiti ja Kelvini vahel.",
    },
    area: {
      title: "Pindala teisendaja",
      description:
        "Teisendage ruutmeetrite, hektarite, aakrite, ruutjalgade ja muu vahel.",
    },
    volume: {
      title: "Mahutavuse teisendaja",
      description:
        "Teisendage liitrite, gallonite, tassitäite, vedelikuuntside ja muu vahel.",
    },
    speed: {
      title: "Kiiruse teisendaja",
      description: "Teisendage m/s, km/h, mph, sõlmede ja muu vahel.",
    },
    time: {
      title: "Aja teisendaja",
      description:
        "Teisendage sekundite, minutite, tundide, päevade, nädalate ja muu vahel.",
    },
    pressure: {
      title: "Rõhu teisendaja",
      description:
        "Teisendage Pascali, baari, PSI, atmosfääri ja muu vahel.",
    },
    energy: {
      title: "Energia teisendaja",
      description:
        "Teisendage džaulide, kalorite, kilovatt-tundide, BTU ja muu vahel.",
    },
    power: {
      title: "Võimsuse teisendaja",
      description:
        "Teisendage vattide, kilovattide, hobujõudude ja muu vahel.",
    },
    frequency: {
      title: "Sageduse teisendaja",
      description:
        "Teisendage hertside, kilohertside, megahertside, gigahertside ja RPM vahel.",
    },
    angle: {
      title: "Nurga teisendaja",
      description: "Teisendage kraadide, radiaanide, gradiaanide ja pöörete vahel.",
    },
    "data-storage": {
      title: "Andmemahu teisendaja",
      description:
        "Teisendage baitide, kilobaitide, megabaitide, gigabaitide ja muu vahel.",
    },
    "fuel-economy": {
      title: "Kütusekulu teisendaja",
      description: "Teisendage km/L, mpg ja L/100km vahel.",
    },
    "number-base": {
      title: "Arvusüsteemi teisendaja",
      description:
        "Teisendage kahendsüsteemi, kaheksandsüsteemi, kümnendsüsteemi, kuueteistkümnendsüsteemi ja kohandatud süsteemide vahel.",
    },
    "roman-numeral": {
      title: "Rooma numbrite teisendaja",
      description: "Teisendage Rooma ja araabia numbrite vahel.",
    },
    "scientific-notation": {
      title: "Teaduslik märgistus",
      description:
        "Teisendage teadusliku märgistuse ja standardarvude vahel.",
    },
    "fraction-decimal": {
      title: "Murd ↔ Kümnendmurd",
      description: "Teisendage murdude ja kümnendmurdude vahel.",
    },
    percentage: {
      title: "Protsendi teisendaja",
      description:
        "Teisendage murdude, kümnendmurdude ja protsentide vahel.",
    },
    "color-converter": {
      title: "Värvi teisendaja",
      description:
        "Teisendage HEX, RGB, HSL, HSV ja CMYK värvivormingute vahel.",
    },
    "color-palette-generator": {
      title: "Värvipaleti generaator",
      description:
        "Looge komplementaarseid, triaadilisi ja analoogseid värvipalette.",
    },
    "gradient-generator": {
      title: "CSS gradiendi generaator",
      description:
        "Looge lineaarseid, radiaalseid ja koonilisi CSS gradiente reaalajas eelvaatega.",
    },
    "color-contrast-checker": {
      title: "Värvikontrasdi kontrollija",
      description:
        "Kontrollige WCAG AA/AAA värvikontrasdi suhet kahe värvi vahel.",
    },
    "color-blindness-simulator": {
      title: "Värvipimeduse simulaator",
      description:
        "Simuleerige, kuidas värvid näevad välja värvnägemishäiretega inimestele.",
    },
    timezone: {
      title: "Ajavööndi teisendaja",
      description:
        "Teisendage aega erinevate ajavööndite vahel üle maailma.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp teisendaja",
      description:
        "Teisendage Unix ajatemplite ja loetavate kuupäevade vahel.",
    },
    "date-format": {
      title: "Kuupäevavormingu teisendaja",
      description:
        "Teisendage kuupäevi erinevate vormingute vahel (ISO, US, EU ja muud).",
    },
    "date-calculator": {
      title: "Kuupäevakalkulaator",
      description:
        "Arvutage kuupäevade vahet või lisage/lahutage päevi.",
    },
    "age-calculator": {
      title: "Vanuse kalkulaator",
      description:
        "Arvutage täpne vanus sünnipäevast aastates, kuudes ja päevades.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Teisendage JSON ja YAML andmevormingute vahel.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Teisendage JSON massiivide ja CSV tabeli vormingu vahel.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Teisendage JSON ja XML andmevormingute vahel.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Teisendage JSON ja TOML konfiguratsioonivormingute vahel.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Teisendage Markdown ja HTML märgistuse vahel.",
    },
    "csv-table": {
      title: "CSV tabeliks",
      description: "Teisendage CSV andmed Markdown või HTML tabeliteks.",
    },
    "json-typescript": {
      title: "JSON TypeScriptiks",
      description: "Looge TypeScript liideseid JSON andmetest.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Teisendage SQL INSERT lausete ja JSON andmete vahel.",
    },
    "px-rem": {
      title: "px ↔ rem teisendaja",
      description:
        "Teisendage pikslite ja rem ühikute vahel kohandatava baassuurusega.",
    },
    "px-em": {
      title: "px ↔ em teisendaja",
      description:
        "Teisendage pikslite ja em ühikute vahel kohandatava vanema suurusega.",
    },
    "px-percent": {
      title: "px ↔ % teisendaja",
      description:
        "Teisendage pikslite ja protsentide vahel kohandatava konteineri laiusega.",
    },
    "css-unit": {
      title: "CSS ühikute teisendaja",
      description:
        "Teisendage px, rem, em, %, vw, vh ja teiste CSS ühikute vahel.",
    },
    "css-minifier": {
      title: "CSS minifitseerija / vormindaja",
      description:
        "Minifitseerige või vormindage CSS koodi tootmiseks või loetavuseks.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Teisendage Tailwind CSS klasside ja tavalise CSS vahel.",
    },
    "cooking-measurement": {
      title: "Köögimõõtude teisendaja",
      description:
        "Teisendage tassitäite, supilusikatäite, teelusikatäite, milliliitrite ja grammide vahel.",
    },
    "recipe-scaler": {
      title: "Retsepti skaleerimine",
      description:
        "Skaleerige retsepti koostisosade koguseid portsjonite arvu järgi.",
    },
    "oven-temperature": {
      title: "Ahju temperatuuri teisendaja",
      description:
        "Teisendage Celsiuse, Fahrenheiti ja Gas Marki vahel ahju temperatuurideks.",
    },
    coordinate: {
      title: "Koordinaatide teisendaja",
      description:
        "Teisendage DMS, DD ja DDM koordinaadivormingute vahel.",
    },
    "distance-calculator": {
      title: "Vahemaa kalkulaator",
      description:
        "Arvutage vahemaa kahe geograafilise koordinaadi vahel.",
    },
  },
  nav: {
    allTools: "Kõik teisendusvahendid",
    language: "Keel",
  },
  footer: {
    tools: "Teisendajad",
    legal: "Õiguslik",
    privacy: "Privaatsuspoliitika",
    terms: "Kasutustingimused",
    copyright: "ToolPop. Kõik õigused kaitstud.",
    company: "Ettevõte",
    about: "Meist",
    contact: "Kontakt",
    faq: "KKK",
  },
  common: {
    backToAll: "Kõik teisendajad",
    inputPlaceholder: "Sisestage teisendamiseks väärtus...",
    outputLabel: "Tulemus",
    copyToClipboard: "Kopeeri lõikelauale",
    copied: "Kopeeritud!",
    clear: "Tühjenda",
    paste: "Kleebi",
    processing: "Teisendamine...",
    startOver: "Alusta uuesti",
    process: "Teisenda",
    tryAgain: "Proovi uuesti",
    notImplemented: "See teisendaja on peagi tulemas.",
    tryOtherTools: "Proovige teisi teisendajaid",
    privacyBadge: "Kõik teisendused toimuvad teie brauseris",
    favoriteAdded: "Lemmikutesse lisatud",
    favoriteRemoved: "Lemmikutest eemaldatud",
    comingSoon: "Peagi tulemas",
    share: "Jaga",
    shareTitle: "Jagage seda teisendajat",
    shareSubtitle: "Jagage seda kasulikku teisendajat teistega",
    shareCopied: "Link kopeeritud!",
    shareCopyLink: "Kopeeri link",
    downloadAsFile: "Laadi alla",
    options: "Valikud",
    input: "Sisend",
    output: "Väljund",
    convert: "Teisenda",
    swap: "Vaheta",
    from: "Alates",
    to: "Kuni",
    result: "Tulemus",
    allConversions: "Kõik teisendused",
    details: "Üksikasjad",
    pageNotFound: "Teisendajat ei leitud",
    goHome: "Tagasi kõigi teisendajate juurde",
    colorPickerLabel: "Värvi valik",
  },
  toolOptions: {
    fromUnit: "Alates",
    toUnit: "Kuni",
    precision: "Kümnendkohad",
    baseSize: "Baasfondi suurus (px)",
    parentSize: "Vanema fondi suurus (px)",
    containerWidth: "Konteineri laius (px)",
    viewportWidth: "Vaateava laius (px)",
    viewportHeight: "Vaateava kõrgus (px)",
    direction: "Suund",
    mode: "Režiim",
    ingredient: "Koostisosa",
    water: "Vesi",
    flour: "Jahu",
    sugar: "Suhkur",
    butter: "Või",
    rice: "Riis",
    milk: "Piim",
    originalServings: "Algsed portsjonid",
    targetServings: "Soovitud portsjonid",
    fromTimezone: "Ajavööndist",
    toTimezone: "Ajavööndisse",
    inputFormat: "Sisendvorming",
    outputFormat: "Väljundvorming",
    harmony: "Värviharmoonia",
    complementary: "Komplementaarne",
    triadic: "Triaadne",
    analogous: "Analoogne",
    splitComplementary: "Jagatud komplementaarne",
    tetradic: "Tetraadne",
    gradientType: "Gradiendi tüüp",
    linear: "Lineaarne",
    radial: "Radiaalne",
    conic: "Kooniline",
    gradientAngle: "Nurk (deg)",
    rootName: "Juurliidese nimi",
    tableName: "Tabeli nimi",
    minify: "Minifitseeri",
    beautify: "Vorminda",
    colorType: "Häire tüüp",
    protanopia: "Protanoopia (punane puudub)",
    deuteranopia: "Deuteranoopia (roheline puudub)",
    tritanopia: "Tritanoopia (sinine puudub)",
    achromatopsia: "Akromatopsia (värvus puudub)",
    operation: "Toiming",
    difference: "Vahe",
    add: "Lisa",
    subtract: "Lahuta",
    amount: "Kogus",
    unit: "Ühik",
    days: "Päevad",
    weeks: "Nädalad",
    months: "Kuud",
    years: "Aastad",
    fromBase: "Süsteemist",
    toBase: "Süsteemi",
    binary: "Kahendne (2)",
    octal: "Kaheksandne (8)",
    decimal: "Kümnendne (10)",
    hexadecimal: "Kuueteistkümne (16)",
    seconds: "Sekundid",
    milliseconds: "Millisekundid",
    autoDetect: "Automaatne",
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
    markdown: "Markdown tabel",
    html: "HTML tabel",
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
    toRoman: "Arv → Rooma",
    toArabic: "Rooma → Arv",
    toScientific: "Standard → Teaduslik",
    toStandard: "Teaduslik → Standard",
    toFraction: "Kümnendmurd → Murd",
    toDecimal: "Murd → Kümnendmurd",
    decimalToPercent: "Kümnendmurd → Protsent",
    percentToDecimal: "Protsent → Kümnendmurd",
    fractionToPercent: "Murd → Protsent",
    dd: "Kümnendkraadid (DD)",
    dms: "Kraadid minutid sekundid (DMS)",
    ddm: "Kraadid kümnendminutid (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Pikk vorming",
    short: "Lühike vorming",
    relative: "Suhteline",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Taustavärv",
    monochromatic: "Monokromaatiline",
    timestampToDate: "Ajatempel → Kuupäev",
    dateToTimestamp: "Kuupäev → Ajatempel",
    showDetails: "Kuva üksikasjalik jaotus",
    addDays: "Lisa päevi",
    subtractDays: "Lahuta päevi",
    datetimeHint: "nt 2024-01-15, 1705312200, now",
    endDate: "Lõppkuupäev",
    today: "Täna (vaikimisi)",
    dateUnit: "Ühik",
  },
  statsLabels: {
    lines: "Read",
    characters: "Märgid",
    rows: "Read",
    columns: "Veerud",
    elements: "Elemendid",
    keys: "Võtmed",
    interfaces: "Liidesed",
    properties: "Omadused",
    originalSize: "Algne suurus",
    resultSize: "Tulemuse suurus",
    savings: "Kokkuhoid",
    ingredients: "Koostisosad",
    scaleFactor: "Skaleerimistegur",
    contrastRatio: "Kontrastisuhe",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Laiuskraad",
    longitude: "Pikkuskraad",
    distanceKm: "Vahemaa (km)",
    distanceMi: "Vahemaa (mi)",
    years: "Aastad",
    months: "Kuud",
    days: "Päevad",
  },
  processorMessages: {
    invalidTimezone: "Vigane ajavöönd",
    pass: "Läbitud", fail: "Läbimata",
    fromNow: "praegusest", ago: "tagasi",
    today: "Täna", tomorrow: "Homme", yesterday: "Eile",
    seconds: "sekund", secondsPlural: "sekundit",
    minutes: "minut", minutesPlural: "minutit",
    hours: "tund", hoursPlural: "tundi",
    daysUnit: "päev", daysPlural: "päeva",
    weeksUnit: "nädal", weeksPlural: "nädalat",
    monthsUnit: "kuu", monthsPlural: "kuud",
    yearsUnit: "aasta", yearsPlural: "aastat",
    gasmark: "Gas Mark",
    veryCool: "Väga jahe", cool: "Jahe", moderatelyCool: "Mõõdukalt jahe",
    moderate: "Mõõdukas", moderatelyHot: "Mõõdukalt kuum",
    hot: "Kuum", veryHot: "Väga kuum", extremelyHot: "Äärmiselt kuum",
    original: "Originaal",
    from: "Alates", to: "Kuni",
    totalDays: "Päevi kokku", weeksDays: "Nädalad + Päevad",
    originalDate: "Algne kuupäev", operationLabel: "Toiming",
    resultDate: "Tulemuse kuupäev", dayOfWeek: "Nädalapäev",
    daysBetween: "Päevi vahel",
    age: "Vanus", totalMonths: "Kuid kokku",
    totalHours: "Tunde kokku", totalMinutes: "Minuteid kokku",
    nextBirthday: "Järgmine sünnipäev",
    roman: "Rooma", arabic: "Araabia",
    scientific: "Teaduslik", standard: "Standard", engineering: "Insenerlik",
    fraction: "Murd", simplified: "Lihtsustatud", percentage: "Protsent",
    color1: "Värv 1", color2: "Värv 2",
    contrastRatioLabel: "Kontrastisuhe",
    aaNormalText: "AA tavaline tekst", aaLargeText: "AA suur tekst",
    aaaNormalText: "AAA tavaline tekst", aaaLargeText: "AAA suur tekst",
    gradientTypeLabel: "Tüüp", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Tasuta veebiteisendajad",
    siteDescription:
      "Teisendage ühikuid, värve, andmevorminguid, kuupäevi ja muud. Tasuta, kiire ja privaatne — kõik toimib teie brauseris.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blogi",
    description:
      "Nõuanded, juhendid ja teadmised ühikute teisendamise, andmevormingute ja muu kohta.",
    readMore: "Loe edasi",
    backToBlog: "Tagasi blogisse",
    publishedOn: "Avaldatud",
    categoryGuide: "Juhend",
    categoryTips: "Nõuanded",
    categoryKnowledge: "Teadmised",
  },
  cookie: {
    message:
      "Kasutame küpsiseid teie kogemuse parandamiseks. Jätkates nõustute meie küpsiste poliitikaga.",
    accept: "Nõustu",
    decline: "Keeldu",
  },
  unitLabels: {
    length: {
      m: "Meeter (m)", km: "Kilomeeter (km)", cm: "Sentimeeter (cm)", mm: "Millimeeter (mm)",
      mi: "Miil (mi)", yd: "Jard (yd)", ft: "Jalg (ft)", in: "Toll (in)",
      nm: "Meremiil (nm)", "\u03BCm": "Mikromeeter (\u03BCm)",
    },
    weight: {
      kg: "Kilogramm (kg)", g: "Gramm (g)", mg: "Milligramm (mg)", lb: "Nael (lb)",
      oz: "Unts (oz)", ton: "Meetriline tonn (t)", st: "Stone (st)", ct: "Karaat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Ruutmeeter (m\u00B2)", "km\u00B2": "Ruutkilomeeter (km\u00B2)",
      ha: "Hektar (ha)", acre: "Aaker", "ft\u00B2": "Ruutjalg (ft\u00B2)",
      "mi\u00B2": "Ruutmiil (mi\u00B2)", "yd\u00B2": "Ruutjard (yd\u00B2)",
      "cm\u00B2": "Ruutsentimeeter (cm\u00B2)",
    },
    volume: {
      L: "Liiter (L)", mL: "Milliliiter (mL)", gal: "US gallon (gal)",
      "fl oz": "US vedelikuunts (fl oz)", cup: "US tass", pt: "US pint (pt)",
      qt: "US kvart (qt)", "m\u00B3": "Kuupmeeter (m\u00B3)",
      "cm\u00B3": "Kuupsentimeeter (cm\u00B3)", tbsp: "Supilusikas (tbsp)", tsp: "Teelusikas (tsp)",
    },
    speed: {
      "m/s": "Meeter/s (m/s)", "km/h": "Kilomeeter/t (km/h)", mph: "Miil/t (mph)",
      kn: "Sõlm (kn)", "ft/s": "Jalg/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekund (ms)", s: "Sekund (s)", min: "Minut (min)", h: "Tund (h)",
      d: "Päev (d)", wk: "Nädal (wk)", mo: "Kuu (mo)", yr: "Aasta (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Baar", psi: "PSI",
      atm: "Atmosfäär (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Džaul (J)", kJ: "Kilodžaul (kJ)", cal: "Kalor (cal)", kcal: "Kilokalor (kcal)",
      Wh: "Vatt-tund (Wh)", kWh: "Kilovatt-tund (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Vatt (W)", kW: "Kilovatt (kW)", MW: "Megavatt (MW)", hp: "Hobujõud (hp)",
      "BTU/h": "BTU/t", "cal/s": "Kalor/s",
    },
    frequency: {
      Hz: "Herts (Hz)", kHz: "Kiloherts (kHz)", MHz: "Megaherts (MHz)",
      GHz: "Gigaherts (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Kraad (\u00B0)", rad: "Radiaan (rad)", grad: "Gradiaan (grad)",
      turn: "Pööre", arcmin: "Kaareminut (\u2032)", arcsec: "Kaaresekund (\u2033)",
    },
    "data-storage": {
      B: "Bait (B)", KB: "Kilobait (KB)", MB: "Megabait (MB)", GB: "Gigabait (GB)",
      TB: "Terabait (TB)", PB: "Petabait (PB)", bit: "Bitt",
      Kbit: "Kilobitt", Mbit: "Megabitt", Gbit: "Gigabitt",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Tass", tbsp: "Supilusikas", tsp: "Teelusikas", mL: "Milliliiter (mL)",
      L: "Liiter (L)", fl_oz: "Vedelikuunts", g: "Gramm (g)", kg: "Kilogramm (kg)",
      oz: "Unts (oz)", lb: "Nael (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pikslid (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pikslid (px)", em: "Em (em)" },
    "px-percent": { px: "Pikslid (px)", "%": "Protsent (%)" },
    "css-unit": {
      px: "Pikslid (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Protsent (%)", vw: "Vaateava laius (vw)", vh: "Vaateava kõrgus (vh)",
    },
  },
};

export default dict;
