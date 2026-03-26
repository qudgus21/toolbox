import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Minden átváltó eszköz egy helyen",
    titleAccent: "átváltó",
    description:
      "Egységek, színek, adatformátumok, dátumok átváltása. Minden a böngészőben történik.",
    tabAll: "Összes",
    categoryUnit: "Mértékegységek",
    categoryNumber: "Számok",
    categoryColor: "Színek",
    categoryDatetime: "Dátum/Idő",
    categoryData: "Adatok",
    categoryCss: "CSS",
    categoryCooking: "Főzés",
    categoryGeography: "Földrajz",
    searchPlaceholder: "Átváltók keresése...",
    noResults: "Nem található átváltó.",
    recentTools: "Nemrég használt",
    favorites: "Kedvencek",
    favDragHint: "Húzza az átrendezéshez",
    favHint: "Kattintson a csillagra a kedvencekhez adáshoz",
    gridView: "Rácsnézet",
    listView: "Listanézet",
  },
  trust: {
    encryption: "Biztonságos feldolgozás",
    encryptionDesc: "Minden átváltás helyben, a böngészőjében történik",
    autoDelete: "Nincs adattárolás",
    autoDeleteDesc: "A bevitt adatokat soha nem mentjük és nem küldjük szerverre",
    free: "100% ingyenes",
    freeDesc: "Korlátlan használat, regisztráció és rejtett díjak nélkül",
    browserProcessing: "Azonnali eredmények",
    browserProcessingDesc: "Valós idejű átváltás gépelés közben",
  },
  tools: {
    length: {
      title: "Hosszúság átváltó",
      description:
        "Váltson át méterek, kilométerek, mérföldek, lábak, hüvelykek és más egységek között.",
    },
    weight: {
      title: "Tömeg átváltó",
      description:
        "Váltson át kilogrammok, fontok, unciák, tonnák és más egységek között.",
    },
    temperature: {
      title: "Hőmérséklet átváltó",
      description: "Váltson át Celsius, Fahrenheit és Kelvin között.",
    },
    area: {
      title: "Terület átváltó",
      description:
        "Váltson át négyzetméterek, hektárok, acrek, négyzetlábak és más egységek között.",
    },
    volume: {
      title: "Térfogat átváltó",
      description:
        "Váltson át literek, gallonok, csészék, folyadékuncia és más egységek között.",
    },
    speed: {
      title: "Sebesség átváltó",
      description: "Váltson át m/s, km/h, mph, csomó és más egységek között.",
    },
    time: {
      title: "Idő átváltó",
      description:
        "Váltson át másodpercek, percek, órák, napok, hetek és más egységek között.",
    },
    pressure: {
      title: "Nyomás átváltó",
      description:
        "Váltson át Pascal, bar, PSI, atmoszféra és más egységek között.",
    },
    energy: {
      title: "Energia átváltó",
      description:
        "Váltson át joule, kalória, kilowattóra, BTU és más egységek között.",
    },
    power: {
      title: "Teljesítmény átváltó",
      description:
        "Váltson át watt, kilowatt, lóerő és más egységek között.",
    },
    frequency: {
      title: "Frekvencia átváltó",
      description:
        "Váltson át hertz, kilohertz, megahertz, gigahertz és RPM között.",
    },
    angle: {
      title: "Szög átváltó",
      description: "Váltson át fokok, radiánok, gradiánsok és fordulatok között.",
    },
    "data-storage": {
      title: "Adattárolás átváltó",
      description:
        "Váltson át bájtok, kilobájtok, megabájtok, gigabájtok és más egységek között.",
    },
    "fuel-economy": {
      title: "Üzemanyag-fogyasztás átváltó",
      description: "Váltson át km/L, mpg és L/100km között.",
    },
    "number-base": {
      title: "Számrendszer átváltó",
      description:
        "Váltson át kettes, nyolcas, tízes, tizenhatos és egyéni számrendszerek között.",
    },
    "roman-numeral": {
      title: "Római szám átváltó",
      description: "Váltson át római számok és arab számok között.",
    },
    "scientific-notation": {
      title: "Tudományos jelölés átváltó",
      description:
        "Váltson át tudományos jelölés és normál számok között.",
    },
    "fraction-decimal": {
      title: "Tört ↔ Tizedes",
      description: "Váltson át törtek és tizedes számok között.",
    },
    percentage: {
      title: "Százalék átváltó",
      description:
        "Váltson át törtek, tizedes számok és százalékok között.",
    },
    "color-converter": {
      title: "Szín átváltó",
      description:
        "Váltson át HEX, RGB, HSL, HSV és CMYK színformátumok között.",
    },
    "color-palette-generator": {
      title: "Színpaletta generátor",
      description:
        "Generáljon komplementer, triádikus és analóg színpalettákat.",
    },
    "gradient-generator": {
      title: "CSS Gradiens generátor",
      description:
        "Hozzon létre lineáris, radiális és kúpos CSS gradienseket élő előnézettel.",
    },
    "color-contrast-checker": {
      title: "Színkontraszt ellenőrző",
      description:
        "Ellenőrizze a WCAG AA/AAA színkontraszt arányt két szín között.",
    },
    "color-blindness-simulator": {
      title: "Színtévesztés szimulátor",
      description:
        "Szimulálja, hogyan látják a színeket a színtévesztéssel élők.",
    },
    timezone: {
      title: "Időzóna átváltó",
      description:
        "Váltson át időt különböző időzónák között világszerte.",
    },
    "unix-timestamp": {
      title: "Unix időbélyeg átváltó",
      description:
        "Váltson át Unix időbélyegek és olvasható dátumok között.",
    },
    "date-format": {
      title: "Dátumformátum átváltó",
      description:
        "Váltson át dátumokat különböző formátumok között (ISO, US, EU és más).",
    },
    "date-calculator": {
      title: "Dátumszámító",
      description:
        "Számítsa ki két dátum közötti különbséget, vagy adjon hozzá/vonjon ki napokat.",
    },
    "age-calculator": {
      title: "Életkor számító",
      description:
        "Számítsa ki a pontos életkort születési dátumból években, hónapokban és napokban.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Váltson át JSON és YAML adatformátumok között.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Váltson át JSON tömbök és CSV táblázatos formátum között.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Váltson át JSON és XML adatformátumok között.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Váltson át JSON és TOML konfigurációs formátumok között.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Váltson át Markdown és HTML jelölőnyelv között.",
    },
    "csv-table": {
      title: "CSV táblázattá",
      description: "Alakítsa át a CSV adatokat Markdown vagy HTML táblázattá.",
    },
    "json-typescript": {
      title: "JSON → TypeScript",
      description: "Generáljon TypeScript interfészeket JSON adatokból.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Váltson át SQL INSERT utasítások és JSON adatok között.",
    },
    "px-rem": {
      title: "px ↔ rem átváltó",
      description:
        "Váltson át pixelek és rem egységek között egyéni alapmérettel.",
    },
    "px-em": {
      title: "px ↔ em átváltó",
      description:
        "Váltson át pixelek és em egységek között egyéni szülőmérettel.",
    },
    "px-percent": {
      title: "px ↔ % átváltó",
      description:
        "Váltson át pixelek és százalék között egyéni tárolószélességgel.",
    },
    "css-unit": {
      title: "CSS egység átváltó",
      description:
        "Váltson át px, rem, em, %, vw, vh és más CSS egységek között.",
    },
    "css-minifier": {
      title: "CSS tömörítő / szépítő",
      description:
        "Tömörítse vagy szépítse a CSS kódot éles vagy olvasható formátumra.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Váltson át Tailwind CSS osztályok és hagyományos CSS között.",
    },
    "cooking-measurement": {
      title: "Konyhai mértékegység átváltó",
      description:
        "Váltson át csészék, evőkanalak, teáskanalak, milliliterek és grammok között.",
    },
    "recipe-scaler": {
      title: "Recept átméretező",
      description:
        "Méretezze át a recept hozzávalóit az adagszám szerint.",
    },
    "oven-temperature": {
      title: "Sütőhőmérséklet átváltó",
      description:
        "Váltson át Celsius, Fahrenheit és Gas Mark között sütőhőmérsékletekhez.",
    },
    coordinate: {
      title: "Koordináta átváltó",
      description:
        "Váltson át DMS, DD és DDM koordinátaformátumok között.",
    },
    "distance-calculator": {
      title: "Távolság számító",
      description:
        "Számítsa ki két földrajzi koordináta közötti távolságot.",
    },
  },
  nav: {
    allTools: "Összes átváltó",
    language: "Nyelv",
  },
  footer: {
    tools: "Átváltók",
    legal: "Jogi információk",
    privacy: "Adatvédelmi irányelvek",
    terms: "Felhasználási feltételek",
    copyright: "ToolPop. Minden jog fenntartva.",
    company: "Cég",
    about: "Rólunk",
    contact: "Kapcsolat",
    faq: "GYIK",
  },
  common: {
    backToAll: "Összes átváltó",
    inputPlaceholder: "Adjon meg egy értéket az átváltáshoz...",
    outputLabel: "Eredmény",
    copyToClipboard: "Másolás vágólapra",
    copied: "Másolva!",
    clear: "Törlés",
    paste: "Beillesztés",
    processing: "Átváltás...",
    startOver: "Újrakezdés",
    process: "Átváltás",
    tryAgain: "Próbálja újra",
    notImplemented: "Ez az átváltó hamarosan elérhető lesz.",
    tryOtherTools: "Próbáljon ki más átváltókat",
    privacyBadge: "Minden átváltás a böngészőjében történik",
    favoriteAdded: "Hozzáadva a kedvencekhez",
    favoriteRemoved: "Eltávolítva a kedvencekből",
    comingSoon: "Hamarosan",
    share: "Megosztás",
    shareTitle: "Átváltó megosztása",
    shareSubtitle: "Ossza meg ezt a hasznos átváltót másokkal",
    shareCopied: "Link másolva!",
    shareCopyLink: "Link másolása",
    downloadAsFile: "Letöltés",
    options: "Beállítások",
    input: "Bemenet",
    output: "Kimenet",
    convert: "Átváltás",
    swap: "Csere",
    from: "Innen",
    to: "Ide",
    result: "Eredmény",
    allConversions: "Összes átváltás",
    details: "Részletek",
    pageNotFound: "Az átváltó nem található",
    goHome: "Vissza az összes átváltóhoz",
  },
  toolOptions: {
    fromUnit: "Innen",
    toUnit: "Ide",
    precision: "Tizedesjegyek",
    baseSize: "Alap betűméret (px)",
    parentSize: "Szülő betűmérete (px)",
    containerWidth: "Tároló szélessége (px)",
    viewportWidth: "Nézetablak szélessége (px)",
    viewportHeight: "Nézetablak magassága (px)",
    direction: "Irány",
    mode: "Mód",
    ingredient: "Hozzávaló",
    water: "Víz",
    flour: "Liszt",
    sugar: "Cukor",
    butter: "Vaj",
    rice: "Rizs",
    milk: "Tej",
    originalServings: "Eredeti adagszám",
    targetServings: "Kívánt adagszám",
    fromTimezone: "Forrás időzóna",
    toTimezone: "Cél időzóna",
    inputFormat: "Bemeneti formátum",
    outputFormat: "Kimeneti formátum",
    harmony: "Színharmónia",
    complementary: "Komplementer",
    triadic: "Triádikus",
    analogous: "Analóg",
    splitComplementary: "Osztott komplementer",
    tetradic: "Tetrádikus",
    gradientType: "Gradiens típusa",
    linear: "Lineáris",
    radial: "Radiális",
    conic: "Kúpos",
    gradientAngle: "Szög (deg)",
    rootName: "Gyökér interfész neve",
    tableName: "Tábla neve",
    minify: "Tömörítés",
    beautify: "Szépítés",
    colorType: "Hiányosság típusa",
    protanopia: "Protanópia (vörös hiány)",
    deuteranopia: "Deuteranópia (zöld hiány)",
    tritanopia: "Tritanópia (kék hiány)",
    achromatopsia: "Akromatopszia (színtelen)",
    operation: "Művelet",
    difference: "Különbség",
    add: "Hozzáadás",
    subtract: "Kivonás",
    amount: "Mennyiség",
    unit: "Egység",
    days: "Napok",
    weeks: "Hetek",
    months: "Hónapok",
    years: "Évek",
    fromBase: "Forrás számrendszer",
    toBase: "Cél számrendszer",
    binary: "Kettes (2)",
    octal: "Nyolcas (8)",
    decimal: "Tízes (10)",
    hexadecimal: "Tizenhatos (16)",
    seconds: "Másodpercek",
    milliseconds: "Ezredmásodpercek",
    autoDetect: "Automatikus felismerés",
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
    markdown: "Markdown táblázat",
    html: "HTML táblázat",
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
    toRoman: "Szám → Római",
    toArabic: "Római → Szám",
    toScientific: "Normál → Tudományos",
    toStandard: "Tudományos → Normál",
    toFraction: "Tizedes → Tört",
    toDecimal: "Tört → Tizedes",
    decimalToPercent: "Tizedes → Százalék",
    percentToDecimal: "Százalék → Tizedes",
    fractionToPercent: "Tört → Százalék",
    dd: "Tizedes fokok (DD)",
    dms: "Fok perc másodperc (DMS)",
    ddm: "Fok tizedes perc (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Hosszú formátum",
    short: "Rövid formátum",
    relative: "Relatív",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Háttérszín",
    monochromatic: "Monokromatikus",
    timestampToDate: "Időbélyeg → Dátum",
    dateToTimestamp: "Dátum → Időbélyeg",
    showDetails: "Részletes bontás megjelenítése",
    addDays: "Napok hozzáadása",
    subtractDays: "Napok kivonása",
    datetimeHint: "pl. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Sorok",
    characters: "Karakterek",
    rows: "Sorok",
    columns: "Oszlopok",
    elements: "Elemek",
    keys: "Kulcsok",
    interfaces: "Interfészek",
    properties: "Tulajdonságok",
    originalSize: "Eredeti méret",
    resultSize: "Eredmény mérete",
    savings: "Megtakarítás",
    ingredients: "Hozzávalók",
    scaleFactor: "Méretezési arány",
    contrastRatio: "Kontraszt arány",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Szélesség",
    longitude: "Hosszúság",
    distanceKm: "Távolság (km)",
    distanceMi: "Távolság (mi)",
    years: "Évek",
    months: "Hónapok",
    days: "Napok",
  },
  processorMessages: {
    invalidTimezone: "Érvénytelen időzóna",
    pass: "Megfelelt", fail: "Nem felelt meg",
    fromNow: "mostantól", ago: "ezelőtt",
    today: "Ma", tomorrow: "Holnap", yesterday: "Tegnap",
    seconds: "másodperc", secondsPlural: "másodperc",
    minutes: "perc", minutesPlural: "perc",
    hours: "óra", hoursPlural: "óra",
    daysUnit: "nap", daysPlural: "nap",
    weeksUnit: "hét", weeksPlural: "hét",
    monthsUnit: "hónap", monthsPlural: "hónap",
    yearsUnit: "év", yearsPlural: "év",
    gasmark: "Gas Mark",
    veryCool: "Nagyon hűvös", cool: "Hűvös", moderatelyCool: "Mérsékelten hűvös",
    moderate: "Mérsékelt", moderatelyHot: "Mérsékelten forró",
    hot: "Forró", veryHot: "Nagyon forró", extremelyHot: "Rendkívül forró",
    original: "Eredeti",
    from: "Innen", to: "Ide",
    totalDays: "Összes nap", weeksDays: "Hetek + Napok",
    originalDate: "Eredeti dátum", operationLabel: "Művelet",
    resultDate: "Eredmény dátum", dayOfWeek: "A hét napja",
    daysBetween: "Napok száma",
    age: "Életkor", totalMonths: "Összes hónap",
    totalHours: "Összes óra", totalMinutes: "Összes perc",
    nextBirthday: "Következő születésnap",
    roman: "Római", arabic: "Arab",
    scientific: "Tudományos", standard: "Normál", engineering: "Mérnöki",
    fraction: "Tört", simplified: "Egyszerűsített", percentage: "Százalék",
    color1: "Szín 1", color2: "Szín 2",
    contrastRatioLabel: "Kontraszt arány",
    aaNormalText: "AA Normál szöveg", aaLargeText: "AA Nagy szöveg",
    aaaNormalText: "AAA Normál szöveg", aaaLargeText: "AAA Nagy szöveg",
    gradientTypeLabel: "Típus", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Átváltó — Ingyenes online átváltók",
    siteDescription:
      "Váltson át mértékegységeket, színeket, adatformátumokat, dátumokat és még sok mást. Ingyenes, gyors és biztonságos — minden a böngészőben történik.",
    toolTitleSuffix: "| ToolPop Átváltó",
  },
  blog: {
    title: "Blog",
    description:
      "Tippek, útmutatók és tudnivalók mértékegység-átváltásról, adatformátumokról és még sok másról.",
    readMore: "Tovább olvasom",
    backToBlog: "Vissza a blogra",
    publishedOn: "Megjelent",
    categoryGuide: "Útmutató",
    categoryTips: "Tippek",
    categoryKnowledge: "Tudás",
  },
  cookie: {
    message:
      "Sütiket használunk a jobb felhasználói élmény érdekében. A folytatással elfogadja süti-szabályzatunkat.",
    accept: "Elfogadom",
    decline: "Elutasítom",
  },
  unitLabels: {
    length: {
      m: "Méter (m)", km: "Kilométer (km)", cm: "Centiméter (cm)", mm: "Milliméter (mm)",
      mi: "Mérföld (mi)", yd: "Yard (yd)", ft: "Láb (ft)", in: "Hüvelyk (in)",
      nm: "Tengeri mérföld (nm)", "\u03BCm": "Mikrométer (\u03BCm)",
    },
    weight: {
      kg: "Kilogramm (kg)", g: "Gramm (g)", mg: "Milligramm (mg)", lb: "Font (lb)",
      oz: "Uncia (oz)", ton: "Metrikus tonna (t)", st: "Stone (st)", ct: "Karát (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Négyzetméter (m\u00B2)", "km\u00B2": "Négyzetkilométer (km\u00B2)",
      ha: "Hektár (ha)", acre: "Akre", "ft\u00B2": "Négyzetláb (ft\u00B2)",
      "mi\u00B2": "Négyzetmérföld (mi\u00B2)", "yd\u00B2": "Négyzetyard (yd\u00B2)",
      "cm\u00B2": "Négyzetcentiméter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Milliliter (mL)", gal: "US Gallon (gal)",
      "fl oz": "US Folyadékuncia (fl oz)", cup: "US Csésze", pt: "US Pint (pt)",
      qt: "US Quart (qt)", "m\u00B3": "Köbméter (m\u00B3)",
      "cm\u00B3": "Köbcentiméter (cm\u00B3)", tbsp: "Evőkanál (tbsp)", tsp: "Teáskanál (tsp)",
    },
    speed: {
      "m/s": "Méter/mp (m/s)", "km/h": "Kilométer/ó (km/h)", mph: "Mérföld/ó (mph)",
      kn: "Csomó (kn)", "ft/s": "Láb/mp (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milliszekundum (ms)", s: "Másodperc (s)", min: "Perc (min)", h: "Óra (h)",
      d: "Nap (d)", wk: "Hét (wk)", mo: "Hónap (mo)", yr: "Év (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmoszféra (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalória (cal)", kcal: "Kilokalória (kcal)",
      Wh: "Wattóra (Wh)", kWh: "Kilowattóra (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Lóerő (hp)",
      "BTU/h": "BTU/ó", "cal/s": "Kalória/mp",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Fok (\u00B0)", rad: "Radián (rad)", grad: "Gradián (grad)",
      turn: "Fordulat", arcmin: "Ívperc (\u2032)", arcsec: "Ívmásodperc (\u2033)",
    },
    "data-storage": {
      B: "Bájt (B)", KB: "Kilobájt (KB)", MB: "Megabájt (MB)", GB: "Gigabájt (GB)",
      TB: "Terabájt (TB)", PB: "Petabájt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Csésze", tbsp: "Evőkanál", tsp: "Teáskanál", mL: "Milliliter (mL)",
      L: "Liter (L)", fl_oz: "Folyadékuncia", g: "Gramm (g)", kg: "Kilogramm (kg)",
      oz: "Uncia (oz)", lb: "Font (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixel (px)", em: "Em (em)" },
    "px-percent": { px: "Pixel (px)", "%": "Százalék (%)" },
    "css-unit": {
      px: "Pixel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Százalék (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
