import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Visi konvertēšanas rīki, kas jums nepieciešami",
    titleAccent: "konvertēšanas",
    description:
      "Konvertējiet vienības, krāsas, datu formātus, datumus un vairāk. Viss tieši pārlūkā.",
    tabAll: "Visi",
    categoryUnit: "Vienības",
    categoryNumber: "Skaitļi",
    categoryColor: "Krāsas",
    categoryDatetime: "Datums/Laiks",
    categoryData: "Dati",
    categoryCss: "CSS",
    categoryCooking: "Ēdienu gatavošana",
    categoryGeography: "Ģeogrāfija",
    searchPlaceholder: "Meklēt pārveidotājus...",
    noResults: "Pārveidotāji nav atrasti.",
    recentTools: "Nesen lietoti",
    favorites: "Izlase",
    favDragHint: "Velciet, lai pārkārtotu",
    favHint: "Noklikšķiniet uz zvaigznītes, lai pievienotu izlasei",
    gridView: "Režģa skats",
    listView: "Saraksta skats",
  },
  trust: {
    encryption: "Droša apstrāde",
    encryptionDesc: "Visi pārveidojumi notiek lokāli jūsu pārlūkprogrammā",
    autoDelete: "Dati netiek glabāti",
    autoDeleteDesc: "Jūsu ievade nekad netiek saglabāta vai nosūtīta uz serveri",
    free: "100% bezmaksas",
    freeDesc: "Bez ierobežojumiem, bez reģistrācijas, bez slēptām maksām",
    browserProcessing: "Tūlītēji rezultāti",
    browserProcessingDesc: "Pārveidošana reāllaikā, kamēr rakstāt",
  },
  tools: {
    length: {
      title: "Garuma pārveidotājs",
      description:
        "Pārveidojiet starp metriem, kilometriem, jūdzēm, pēdām, collām un citiem.",
    },
    weight: {
      title: "Svara pārveidotājs",
      description:
        "Pārveidojiet starp kilogramiem, mārciņām, uncēm, tonnām un citiem.",
    },
    temperature: {
      title: "Temperatūras pārveidotājs",
      description: "Pārveidojiet starp Celsija, Fārenheita un Kelvina grādiem.",
    },
    area: {
      title: "Platības pārveidotājs",
      description:
        "Pārveidojiet starp kvadrātmetriem, hektāriem, akriem, kvadrātpēdām un citiem.",
    },
    volume: {
      title: "Tilpuma pārveidotājs",
      description:
        "Pārveidojiet starp litriem, galoniem, krūzēm, šķidruma uncēm un citiem.",
    },
    speed: {
      title: "Ātruma pārveidotājs",
      description: "Pārveidojiet starp m/s, km/h, mph, mezgliem un citiem.",
    },
    time: {
      title: "Laika pārveidotājs",
      description:
        "Pārveidojiet starp sekundēm, minūtēm, stundām, dienām, nedēļām un citiem.",
    },
    pressure: {
      title: "Spiediena pārveidotājs",
      description:
        "Pārveidojiet starp Paskālu, bāru, PSI, atmosfēru un citiem.",
    },
    energy: {
      title: "Enerģijas pārveidotājs",
      description:
        "Pārveidojiet starp džouliem, kalorijām, kilovatstundām, BTU un citiem.",
    },
    power: {
      title: "Jaudas pārveidotājs",
      description:
        "Pārveidojiet starp vatiem, kilovatiem, zirgspēkiem un citiem.",
    },
    frequency: {
      title: "Frekvences pārveidotājs",
      description:
        "Pārveidojiet starp herciem, kiloherciem, megaherciem, gigaherciem un RPM.",
    },
    angle: {
      title: "Leņķa pārveidotājs",
      description: "Pārveidojiet starp grādiem, radiāniem, gradiāniem un apgriezieniem.",
    },
    "data-storage": {
      title: "Datu glabātuves pārveidotājs",
      description:
        "Pārveidojiet starp baitiem, kilobaitiem, megabaitiem, gigabaitiem un citiem.",
    },
    "fuel-economy": {
      title: "Degvielas ekonomijas pārveidotājs",
      description: "Pārveidojiet starp km/L, mpg un L/100km.",
    },
    "number-base": {
      title: "Skaitļu sistēmu pārveidotājs",
      description:
        "Pārveidojiet starp bināro, oktālo, decimālo, heksadecimālo un pielāgotām sistēmām.",
    },
    "roman-numeral": {
      title: "Romiešu ciparu pārveidotājs",
      description: "Pārveidojiet starp romiešu un arābu cipariem.",
    },
    "scientific-notation": {
      title: "Zinātniskā pieraksta pārveidotājs",
      description:
        "Pārveidojiet starp zinātnisko pierakstu un standarta skaitļiem.",
    },
    "fraction-decimal": {
      title: "Daļskaitlis ↔ Decimālskaitlis",
      description: "Pārveidojiet starp daļskaitļiem un decimālskaitļiem.",
    },
    percentage: {
      title: "Procentu pārveidotājs",
      description:
        "Pārveidojiet starp daļskaitļiem, decimālskaitļiem un procentiem.",
    },
    "color-converter": {
      title: "Krāsu pārveidotājs",
      description:
        "Pārveidojiet starp HEX, RGB, HSL, HSV un CMYK krāsu formātiem.",
    },
    "color-palette-generator": {
      title: "Krāsu paletes ģenerators",
      description:
        "Ģenerējiet papildinošas, triādiskas un analogas krāsu paletes.",
    },
    "gradient-generator": {
      title: "CSS Gradienta ģenerators",
      description:
        "Izveidojiet lineārus, radiālus un koniskus CSS gradientus ar tiešsaistes priekšskatījumu.",
    },
    "color-contrast-checker": {
      title: "Krāsu kontrasta pārbaudītājs",
      description:
        "Pārbaudiet WCAG AA/AAA krāsu kontrasta attiecību starp divām krāsām.",
    },
    "color-blindness-simulator": {
      title: "Krāsu akluma simulators",
      description:
        "Simulējiet, kā krāsas izskatās cilvēkiem ar krāsu redzes trūkumiem.",
    },
    timezone: {
      title: "Laika joslu pārveidotājs",
      description:
        "Pārveidojiet laiku starp dažādām laika joslām visā pasaulē.",
    },
    "unix-timestamp": {
      title: "Unix laikspiedola pārveidotājs",
      description:
        "Pārveidojiet starp Unix laikspiedoliem un cilvēklasāmiem datumiem.",
    },
    "date-format": {
      title: "Datuma formāta pārveidotājs",
      description:
        "Pārveidojiet datumus starp dažādiem formātiem (ISO, US, EU un citiem).",
    },
    "date-calculator": {
      title: "Datumu kalkulators",
      description:
        "Aprēķiniet starpību starp datumiem vai pievienojiet/atņemiet dienas.",
    },
    "age-calculator": {
      title: "Vecuma kalkulators",
      description:
        "Aprēķiniet precīzu vecumu no dzimšanas datuma gados, mēnešos un dienās.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Pārveidojiet starp JSON un YAML datu formātiem.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Pārveidojiet starp JSON masīviem un CSV tabulas formātu.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Pārveidojiet starp JSON un XML datu formātiem.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Pārveidojiet starp JSON un TOML konfigurācijas formātiem.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Pārveidojiet starp Markdown un HTML iezīmēšanu.",
    },
    "csv-table": {
      title: "CSV uz tabulu",
      description: "Pārveidojiet CSV datus Markdown vai HTML tabulā.",
    },
    "json-typescript": {
      title: "JSON uz TypeScript",
      description: "Ģenerējiet TypeScript saskarnes no JSON datiem.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Pārveidojiet starp SQL INSERT priekšrakstiem un JSON datiem.",
    },
    "px-rem": {
      title: "px ↔ rem pārveidotājs",
      description:
        "Pārveidojiet starp pikseļiem un rem vienībām ar pielāgotu bāzes izmēru.",
    },
    "px-em": {
      title: "px ↔ em pārveidotājs",
      description:
        "Pārveidojiet starp pikseļiem un em vienībām ar pielāgotu vecākelementa izmēru.",
    },
    "px-percent": {
      title: "px ↔ % pārveidotājs",
      description:
        "Pārveidojiet starp pikseļiem un procentiem ar pielāgotu konteinera platumu.",
    },
    "css-unit": {
      title: "CSS vienību pārveidotājs",
      description:
        "Pārveidojiet starp px, rem, em, %, vw, vh un citām CSS vienībām.",
    },
    "css-minifier": {
      title: "CSS minifikators / formatētājs",
      description:
        "Minificējiet vai formatējiet CSS kodu ražošanai vai lasāmībai.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Pārveidojiet starp Tailwind CSS klasēm un parastu CSS.",
    },
    "cooking-measurement": {
      title: "Ēdienu gatavošanas mēru pārveidotājs",
      description:
        "Pārveidojiet starp krūzēm, ēdamkarotēm, tējkarotēm, mililitriem un gramiem.",
    },
    "recipe-scaler": {
      title: "Receptes mērogotājs",
      description:
        "Mērogojiet receptes sastāvdaļas pēc porciju skaita.",
    },
    "oven-temperature": {
      title: "Cepeškrāsns temperatūras pārveidotājs",
      description:
        "Pārveidojiet starp Celsija, Fārenheita un Gas Mark cepeškrāsns temperatūrām.",
    },
    coordinate: {
      title: "Koordinātu pārveidotājs",
      description:
        "Pārveidojiet starp DMS, DD un DDM koordinātu formātiem.",
    },
    "distance-calculator": {
      title: "Attāluma kalkulators",
      description:
        "Aprēķiniet attālumu starp divām ģeogrāfiskajām koordinātēm.",
    },
  },
  nav: {
    allTools: "Visi pārveidotāji",
    language: "Valoda",
  },
  footer: {
    tools: "Pārveidotāji",
    legal: "Juridiskā informācija",
    privacy: "Privātuma politika",
    terms: "Pakalpojumu noteikumi",
    copyright: "ToolPop. Visas tiesības aizsargātas.",
    company: "Uzņēmums",
    about: "Par mums",
    contact: "Kontakti",
    faq: "BUJ",
  },
  common: {
    backToAll: "Visi pārveidotāji",
    inputPlaceholder: "Ievadiet vērtību pārveidošanai...",
    outputLabel: "Rezultāts",
    copyToClipboard: "Kopēt starpliktuvē",
    copied: "Nokopēts!",
    clear: "Notīrīt",
    paste: "Ielīmēt",
    processing: "Pārveidošana...",
    startOver: "Sākt no jauna",
    process: "Pārveidot",
    tryAgain: "Mēģināt vēlreiz",
    notImplemented: "Šis pārveidotājs drīz būs pieejams.",
    tryOtherTools: "Izmēģiniet citus pārveidotājus",
    privacyBadge: "Visi pārveidojumi notiek jūsu pārlūkprogrammā",
    favoriteAdded: "Pievienots izlasei",
    favoriteRemoved: "Noņemts no izlases",
    comingSoon: "Drīzumā",
    share: "Dalīties",
    shareTitle: "Dalīties ar šo pārveidotāju",
    shareSubtitle: "Dalieties ar šo noderīgo pārveidotāju ar citiem",
    shareCopied: "Saite nokopēta!",
    shareCopyLink: "Kopēt saiti",
    downloadAsFile: "Lejupielādēt",
    options: "Iestatījumi",
    input: "Ievade",
    output: "Izvade",
    convert: "Pārveidot",
    swap: "Apmainīt",
    from: "No",
    to: "Uz",
    result: "Rezultāts",
    allConversions: "Visi pārveidojumi",
    details: "Detaļas",
    pageNotFound: "Pārveidotājs nav atrasts",
    goHome: "Atpakaļ pie visiem pārveidotājiem",
  },
  toolOptions: {
    fromUnit: "No",
    toUnit: "Uz",
    precision: "Decimālzīmes",
    baseSize: "Bāzes fonta izmērs (px)",
    parentSize: "Vecākelementa fonta izmērs (px)",
    containerWidth: "Konteinera platums (px)",
    viewportWidth: "Skata platums (px)",
    viewportHeight: "Skata augstums (px)",
    direction: "Virziens",
    mode: "Režīms",
    ingredient: "Sastāvdaļa",
    water: "Ūdens",
    flour: "Milti",
    sugar: "Cukurs",
    butter: "Sviests",
    rice: "Rīsi",
    milk: "Piens",
    originalServings: "Sākotnējās porcijas",
    targetServings: "Vēlamās porcijas",
    fromTimezone: "No laika joslas",
    toTimezone: "Uz laika joslu",
    inputFormat: "Ievades formāts",
    outputFormat: "Izvades formāts",
    harmony: "Krāsu harmonija",
    complementary: "Papildinoša",
    triadic: "Triādiska",
    analogous: "Analoga",
    splitComplementary: "Dalīti papildinoša",
    tetradic: "Tetrādiska",
    gradientType: "Gradienta veids",
    linear: "Lineārs",
    radial: "Radiāls",
    conic: "Konisks",
    gradientAngle: "Leņķis (deg)",
    rootName: "Saknes saskarnes nosaukums",
    tableName: "Tabulas nosaukums",
    minify: "Minificēt",
    beautify: "Formatēt",
    colorType: "Trūkuma veids",
    protanopia: "Protanopija (bez sarkanas)",
    deuteranopia: "Deuteranopija (bez zaļas)",
    tritanopia: "Tritanopija (bez zilas)",
    achromatopsia: "Achromatopsija (bez krāsām)",
    operation: "Darbība",
    difference: "Starpība",
    add: "Pievienot",
    subtract: "Atņemt",
    amount: "Daudzums",
    unit: "Vienība",
    days: "Dienas",
    weeks: "Nedēļas",
    months: "Mēneši",
    years: "Gadi",
    fromBase: "No bāzes",
    toBase: "Uz bāzi",
    binary: "Binārā (2)",
    octal: "Oktālā (8)",
    decimal: "Decimālā (10)",
    hexadecimal: "Heksadecimālā (16)",
    seconds: "Sekundes",
    milliseconds: "Milisekundes",
    autoDetect: "Automātiska noteikšana",
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
    markdown: "Markdown tabula",
    html: "HTML tabula",
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
    toRoman: "Skaitlis → Romiešu",
    toArabic: "Romiešu → Skaitlis",
    toScientific: "Standarta → Zinātnisks",
    toStandard: "Zinātnisks → Standarta",
    toFraction: "Decimālskaitlis → Daļskaitlis",
    toDecimal: "Daļskaitlis → Decimālskaitlis",
    decimalToPercent: "Decimālskaitlis → Procents",
    percentToDecimal: "Procents → Decimālskaitlis",
    fractionToPercent: "Daļskaitlis → Procents",
    dd: "Decimālgrādi (DD)",
    dms: "Grādi minūtes sekundes (DMS)",
    ddm: "Grādi decimālminūtes (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Garais formāts",
    short: "Īsais formāts",
    relative: "Relatīvs",
    celsius: "Celsijs (°C)",
    fahrenheit: "Fārenheits (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Fona krāsa",
    monochromatic: "Monohromatiska",
    timestampToDate: "Laikspiedols → Datums",
    dateToTimestamp: "Datums → Laikspiedols",
    showDetails: "Rādīt detalizētu sadalījumu",
    addDays: "Pievienot dienas",
    subtractDays: "Atņemt dienas",
    datetimeHint: "piem. 2024-01-15, 1705312200, now",
    endDate: "Beigu datums",
    today: "Šodien (noklusējums)",
    dateUnit: "Vienība",
  },
  statsLabels: {
    lines: "Rindas",
    characters: "Rakstzīmes",
    rows: "Rindas",
    columns: "Kolonnas",
    elements: "Elementi",
    keys: "Atslēgas",
    interfaces: "Saskarnes",
    properties: "Īpašības",
    originalSize: "Sākotnējais izmērs",
    resultSize: "Rezultāta izmērs",
    savings: "Ietaupījums",
    ingredients: "Sastāvdaļas",
    scaleFactor: "Mēroga koeficients",
    contrastRatio: "Kontrasta attiecība",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Platums",
    longitude: "Garums",
    distanceKm: "Attālums (km)",
    distanceMi: "Attālums (mi)",
    years: "Gadi",
    months: "Mēneši",
    days: "Dienas",
  },
  processorMessages: {
    invalidTimezone: "Nederīga laika josla",
    pass: "Izturēts", fail: "Neizturēts",
    fromNow: "no šī brīža", ago: "pirms",
    today: "Šodien", tomorrow: "Rīt", yesterday: "Vakar",
    seconds: "sekunde", secondsPlural: "sekundes",
    minutes: "minūte", minutesPlural: "minūtes",
    hours: "stunda", hoursPlural: "stundas",
    daysUnit: "diena", daysPlural: "dienas",
    weeksUnit: "nedēļa", weeksPlural: "nedēļas",
    monthsUnit: "mēnesis", monthsPlural: "mēneši",
    yearsUnit: "gads", yearsPlural: "gadi",
    gasmark: "Gas Mark",
    veryCool: "Ļoti vēss", cool: "Vēss", moderatelyCool: "Mēreni vēss",
    moderate: "Mērens", moderatelyHot: "Mēreni karsts",
    hot: "Karsts", veryHot: "Ļoti karsts", extremelyHot: "Ārkārtīgi karsts",
    original: "Oriģināls",
    from: "No", to: "Līdz",
    totalDays: "Kopā dienas", weeksDays: "Nedēļas + Dienas",
    originalDate: "Sākotnējais datums", operationLabel: "Darbība",
    resultDate: "Rezultāta datums", dayOfWeek: "Nedēļas diena",
    daysBetween: "Dienas starpā",
    age: "Vecums", totalMonths: "Kopā mēneši",
    totalHours: "Kopā stundas", totalMinutes: "Kopā minūtes",
    nextBirthday: "Nākamā dzimšanas diena",
    roman: "Romiešu", arabic: "Arābu",
    scientific: "Zinātnisks", standard: "Standarta", engineering: "Inženieru",
    fraction: "Daļskaitlis", simplified: "Vienkāršots", percentage: "Procents",
    color1: "Krāsa 1", color2: "Krāsa 2",
    contrastRatioLabel: "Kontrasta attiecība",
    aaNormalText: "AA parastais teksts", aaLargeText: "AA lielais teksts",
    aaaNormalText: "AAA parastais teksts", aaaLargeText: "AAA lielais teksts",
    gradientTypeLabel: "Veids", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Pārveidotājs — Bezmaksas tiešsaistes pārveidotāji",
    siteDescription:
      "Pārveidojiet vienības, krāsas, datu formātus, datumus un daudz ko citu. Bezmaksas, ātri un privāti — viss darbojas jūsu pārlūkprogrammā.",
    toolTitleSuffix: "| ToolPop Pārveidotājs",
  },
  blog: {
    title: "Emuārs",
    description:
      "Padomi, ceļveži un zināšanas par vienību pārveidošanu, datu formātiem un daudz ko citu.",
    readMore: "Lasīt vairāk",
    backToBlog: "Atpakaļ uz emuāru",
    publishedOn: "Publicēts",
    categoryGuide: "Ceļvedis",
    categoryTips: "Padomi",
    categoryKnowledge: "Zināšanas",
  },
  cookie: {
    message:
      "Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pieredzi. Turpinot jūs piekrītat mūsu sīkdatņu politikai.",
    accept: "Pieņemt",
    decline: "Noraidīt",
  },
  unitLabels: {
    length: {
      m: "Metrs (m)", km: "Kilometrs (km)", cm: "Centimetrs (cm)", mm: "Milimetrs (mm)",
      mi: "Jūdze (mi)", yd: "Jards (yd)", ft: "Pēda (ft)", in: "Colla (in)",
      nm: "Jūras jūdze (nm)", "\u03BCm": "Mikrometrs (\u03BCm)",
    },
    weight: {
      kg: "Kilograms (kg)", g: "Grams (g)", mg: "Miligrams (mg)", lb: "Mārciņa (lb)",
      oz: "Unce (oz)", ton: "Metriskā tonna (t)", st: "Stouns (st)", ct: "Karāts (ct)",
    },
    temperature: { C: "Celsijs (\u00B0C)", F: "Fārenheits (\u00B0F)", K: "Kelvins (K)" },
    area: {
      "m\u00B2": "Kvadrātmetrs (m\u00B2)", "km\u00B2": "Kvadrātkilometrs (km\u00B2)",
      ha: "Hektārs (ha)", acre: "Akrs", "ft\u00B2": "Kvadrātpēda (ft\u00B2)",
      "mi\u00B2": "Kvadrātjūdze (mi\u00B2)", "yd\u00B2": "Kvadrātjards (yd\u00B2)",
      "cm\u00B2": "Kvadrātcentimetrs (cm\u00B2)",
    },
    volume: {
      L: "Litrs (L)", mL: "Mililitrs (mL)", gal: "US galons (gal)",
      "fl oz": "US šķidruma unce (fl oz)", cup: "US krūze", pt: "US pinte (pt)",
      qt: "US kvarts (qt)", "m\u00B3": "Kubikmetrs (m\u00B3)",
      "cm\u00B3": "Kubikcentimetrs (cm\u00B3)", tbsp: "Ēdamkarote (tbsp)", tsp: "Tējkarote (tsp)",
    },
    speed: {
      "m/s": "Metrs/s (m/s)", "km/h": "Kilometrs/h (km/h)", mph: "Jūdze/h (mph)",
      kn: "Mezgls (kn)", "ft/s": "Pēda/s (ft/s)", mach: "Mahs",
    },
    time: {
      ms: "Milisekunde (ms)", s: "Sekunde (s)", min: "Minūte (min)", h: "Stunda (h)",
      d: "Diena (d)", wk: "Nedēļa (wk)", mo: "Mēnesis (mo)", yr: "Gads (yr)",
    },
    pressure: {
      Pa: "Paskāls (Pa)", kPa: "Kilopaskāls (kPa)", bar: "Bārs", psi: "PSI",
      atm: "Atmosfēra (atm)", torr: "Torrs", mmHg: "mmHg",
    },
    energy: {
      J: "Džouls (J)", kJ: "Kilodžouls (kJ)", cal: "Kalorija (cal)", kcal: "Kilokalorija (kcal)",
      Wh: "Vatstunda (Wh)", kWh: "Kilovatstunda (kWh)", BTU: "BTU", eV: "Elektronvolts (eV)",
    },
    power: {
      W: "Vats (W)", kW: "Kilovats (kW)", MW: "Megavats (MW)", hp: "Zirgspēks (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kalorija/s",
    },
    frequency: {
      Hz: "Hercs (Hz)", kHz: "Kilohercs (kHz)", MHz: "Megahercs (MHz)",
      GHz: "Gigahercs (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grāds (\u00B0)", rad: "Radiāns (rad)", grad: "Gradiāns (grad)",
      turn: "Apgrieziens", arcmin: "Loka minūte (\u2032)", arcsec: "Loka sekunde (\u2033)",
    },
    "data-storage": {
      B: "Baits (B)", KB: "Kilobaits (KB)", MB: "Megabaits (MB)", GB: "Gigabaits (GB)",
      TB: "Terabaits (TB)", PB: "Petabaits (PB)", bit: "Bits",
      Kbit: "Kilobits", Mbit: "Megabits", Gbit: "Gigabits",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Krūze", tbsp: "Ēdamkarote", tsp: "Tējkarote", mL: "Mililitrs (mL)",
      L: "Litrs (L)", fl_oz: "Šķidruma unce", g: "Grams (g)", kg: "Kilograms (kg)",
      oz: "Unce (oz)", lb: "Mārciņa (lb)",
    },
    "oven-temperature": { C: "Celsijs (\u00B0C)", F: "Fārenheits (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pikseļi (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pikseļi (px)", em: "Em (em)" },
    "px-percent": { px: "Pikseļi (px)", "%": "Procents (%)" },
    "css-unit": {
      px: "Pikseļi (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procents (%)", vw: "Skata platums (vw)", vh: "Skata augstums (vh)",
    },
  },
};

export default dict;
