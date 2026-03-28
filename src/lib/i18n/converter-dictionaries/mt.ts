import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "L-għodod kollha ta' konverżjoni li għandek bżonn",
    titleAccent: "konverżjoni",
    description:
      "Ikkonverti unitajiet, kuluri, formats tad-data, dati u aktar. Kollox fil-browser tiegħek.",
    tabAll: "Kollox",
    categoryUnit: "Unitajiet",
    categoryNumber: "Numri",
    categoryColor: "Kuluri",
    categoryDatetime: "Data/Ħin",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Tisjir",
    categoryGeography: "Ġeografija",
    searchPlaceholder: "Fittex konvertituri...",
    noResults: "L-ebda konvertitur ma nstab.",
    recentTools: "Użati Riċentement",
    favorites: "Favoriti",
    favDragHint: "Iġbed biex tibdel l-ordni",
    favHint: "Ikklikkja l-istilla biex iżżid favoriti",
    gridView: "Vista grilja",
    listView: "Vista lista",
  },
  trust: {
    encryption: "Proċessar Sigur",
    encryptionDesc: "Il-konverżjonijiet kollha jsiru lokalment fil-browser tiegħek",
    autoDelete: "L-Ebda Data Maħżuna",
    autoDeleteDesc: "L-input tiegħek qatt ma jiġi ssejvjat jew mibgħut lil server",
    free: "100% B'xejn",
    freeDesc: "Bla limiti, bla reġistrazzjonijiet, bla ħlasijiet moħbija",
    browserProcessing: "Riżultati Istantanji",
    browserProcessingDesc: "Konverżjoni f'ħin reali waqt li tittajpja",
  },
  tools: {
    length: {
      title: "Konvertitur tat-Tul",
      description:
        "Ikkonverti bejn metri, kilometri, mili, piedi, pulzieri, u aktar.",
    },
    weight: {
      title: "Konvertitur tal-Piż",
      description:
        "Ikkonverti bejn kilogrammi, liri, onzas, tunnellati, u aktar.",
    },
    temperature: {
      title: "Konvertitur tat-Temperatura",
      description: "Ikkonverti bejn Celsius, Fahrenheit, u Kelvin.",
    },
    area: {
      title: "Konvertitur tal-Erja",
      description:
        "Ikkonverti bejn metri kwadri, ettari, acres, piedi kwadri, u aktar.",
    },
    volume: {
      title: "Konvertitur tal-Volum",
      description:
        "Ikkonverti bejn litri, galluni, tazzi, fluid ounces, u aktar.",
    },
    speed: {
      title: "Konvertitur tal-Veloċità",
      description: "Ikkonverti bejn m/s, km/h, mph, knots, u aktar.",
    },
    time: {
      title: "Konvertitur tal-Ħin",
      description:
        "Ikkonverti bejn sekondi, minuti, sigħat, ġranet, ġimgħat, u aktar.",
    },
    pressure: {
      title: "Konvertitur tal-Pressjoni",
      description:
        "Ikkonverti bejn Pascal, bar, PSI, atmosfera, u aktar.",
    },
    energy: {
      title: "Konvertitur tal-Enerġija",
      description:
        "Ikkonverti bejn joules, kalorii, kilowatt-sigħat, BTU, u aktar.",
    },
    power: {
      title: "Konvertitur tal-Qawwa",
      description:
        "Ikkonverti bejn watts, kilowatts, horsepower, u aktar.",
    },
    frequency: {
      title: "Konvertitur tal-Frekwenza",
      description:
        "Ikkonverti bejn hertz, kilohertz, megahertz, gigahertz, u RPM.",
    },
    angle: {
      title: "Konvertitur tal-Angolu",
      description: "Ikkonverti bejn gradi, radjani, gradjani, u dawriet.",
    },
    "data-storage": {
      title: "Konvertitur tal-Ħażna tad-Data",
      description:
        "Ikkonverti bejn bytes, kilobytes, megabytes, gigabytes, u aktar.",
    },
    "fuel-economy": {
      title: "Konvertitur tal-Ekonomija tal-Fjuwil",
      description: "Ikkonverti bejn km/L, mpg, u L/100km.",
    },
    "number-base": {
      title: "Konvertitur tal-Bażi tan-Numri",
      description:
        "Ikkonverti bejn binarju, ottali, deċimali, eżadeċimali, u bażijiet oħra.",
    },
    "roman-numeral": {
      title: "Konvertitur tan-Numri Rumani",
      description: "Ikkonverti bejn numri Rumani u numri Għarbin.",
    },
    "scientific-notation": {
      title: "Konvertitur tan-Notazzjoni Xjentifika",
      description:
        "Ikkonverti bejn notazzjoni xjentifika u numri standard.",
    },
    "fraction-decimal": {
      title: "Frazzjoni ↔ Deċimali",
      description: "Ikkonverti bejn frazzjonijiet u numri deċimali.",
    },
    percentage: {
      title: "Konvertitur tal-Perċentwal",
      description:
        "Ikkonverti bejn frazzjonijiet, deċimali, u perċentwali.",
    },
    "color-converter": {
      title: "Konvertitur tal-Kuluri",
      description:
        "Ikkonverti bejn formats tal-kuluri HEX, RGB, HSL, HSV, u CMYK.",
    },
    "color-palette-generator": {
      title: "Ġeneratur tal-Paletta tal-Kuluri",
      description:
        "Iġġenera paletti ta' kuluri kumplimentari, triadiċi, u analogi.",
    },
    "gradient-generator": {
      title: "Ġeneratur ta' CSS Gradient",
      description:
        "Oħloq gradjenti CSS lineari, radjali, u koniċi b'preview ħaj.",
    },
    "color-contrast-checker": {
      title: "Kontrollur tal-Kuntrast tal-Kuluri",
      description:
        "Iċċekkja r-ratio tal-kuntrast WCAG AA/AAA bejn żewġ kuluri.",
    },
    "color-blindness-simulator": {
      title: "Simulatur tal-Għama tal-Kuluri",
      description:
        "Issimula kif il-kuluri jidhru lil-persuni b'defiċjenza tal-vista tal-kuluri.",
    },
    timezone: {
      title: "Konvertitur taż-Żona tal-Ħin",
      description:
        "Ikkonverti l-ħin bejn żoni tal-ħin differenti mad-dinja kollha.",
    },
    "unix-timestamp": {
      title: "Konvertitur ta' Unix Timestamp",
      description:
        "Ikkonverti bejn Unix timestamps u dati li jinqraw mill-bniedem.",
    },
    "date-format": {
      title: "Konvertitur tal-Format tad-Data",
      description:
        "Ikkonverti dati bejn formats differenti (ISO, US, EU, u aktar).",
    },
    "date-calculator": {
      title: "Kalkulatur tad-Data",
      description:
        "Ikkalkula d-differenza bejn id-dati jew żid/naqqas ġranet.",
    },
    "age-calculator": {
      title: "Kalkulatur tal-Età",
      description:
        "Ikkalkula l-età eżatta mid-data tat-twelid f'snin, xhur, u ġranet.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Ikkonverti bejn formats tad-data JSON u YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Ikkonverti bejn arrays JSON u format ta' spreadsheet CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Ikkonverti bejn formats tad-data JSON u XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Ikkonverti bejn formats ta' konfigurazzjoni JSON u TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Ikkonverti bejn markup Markdown u HTML.",
    },
    "csv-table": {
      title: "CSV għal Tabella",
      description: "Ikkonverti data CSV għal tabelli Markdown jew HTML.",
    },
    "json-typescript": {
      title: "JSON għal TypeScript",
      description: "Iġġenera interfaces TypeScript minn data JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Ikkonverti bejn dikjarazzjonijiet SQL INSERT u data JSON.",
    },
    "px-rem": {
      title: "px ↔ rem Konvertitur",
      description:
        "Ikkonverti bejn pixels u unitajiet rem b'daqs bażi personalizzat.",
    },
    "px-em": {
      title: "px ↔ em Konvertitur",
      description:
        "Ikkonverti bejn pixels u unitajiet em b'daqs tal-ġenitur personalizzat.",
    },
    "px-percent": {
      title: "px ↔ % Konvertitur",
      description:
        "Ikkonverti bejn pixels u perċentwal b'wisa' tal-kontenitur personalizzat.",
    },
    "css-unit": {
      title: "Konvertitur ta' Unitajiet CSS",
      description:
        "Ikkonverti bejn px, rem, em, %, vw, vh u unitajiet CSS oħra.",
    },
    "css-minifier": {
      title: "CSS Tnaqqis / Sebbaħ",
      description:
        "Naqqas jew sebbaħ kodiċi CSS għall-produzzjoni jew għal-leġġibilità.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Ikkonverti bejn klassijiet Tailwind CSS u CSS vanilla.",
    },
    "cooking-measurement": {
      title: "Konvertitur tal-Kejl tat-Tisjir",
      description:
        "Ikkonverti bejn tazzi, imgħaref kbar, mgħaref żgħar, millilitri, u grammi.",
    },
    "recipe-scaler": {
      title: "Skalatur tar-Riċetti",
      description:
        "Skala l-ingredjenti tar-riċetta 'l fuq jew 'l isfel skont id-daqs tal-porzjon.",
    },
    "oven-temperature": {
      title: "Konvertitur tat-Temperatura tal-Forn",
      description:
        "Ikkonverti bejn Celsius, Fahrenheit, u Gas Mark għat-temperaturi tal-forn.",
    },
    coordinate: {
      title: "Konvertitur tal-Koordinati",
      description:
        "Ikkonverti bejn formats ta' koordinati DMS, DD, u DDM.",
    },
    "distance-calculator": {
      title: "Kalkulatur tad-Distanza",
      description:
        "Ikkalkula d-distanza bejn żewġ koordinati ġeografiċi.",
    },
  },
  nav: {
    allTools: "Il-Konvertituri Kollha",
    language: "Lingwa",
  },
  footer: {
    tools: "Konvertituri",
    legal: "Legali",
    privacy: "Politika tal-Privatezza",
    terms: "Termini tas-Servizz",
    copyright: "ToolPop. Id-drittijiet kollha riżervati.",
    company: "Kumpanija",
    about: "Dwarna",
    contact: "Kuntatt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Il-Konvertituri Kollha",
    inputPlaceholder: "Daħħal valur biex tikkonverti...",
    outputLabel: "Riżultat",
    copyToClipboard: "Ikkopja fil-clipboard",
    copied: "Ikkupjat!",
    clear: "Naddaf",
    paste: "Waħħal",
    processing: "Qed jikkonverti...",
    startOver: "Ibda mill-ġdid",
    process: "Ikkonverti",
    tryAgain: "Erġa' pprova",
    notImplemented: "Dan il-konvertitur ġej dalwaqt.",
    tryOtherTools: "Ipprova konvertituri oħra",
    privacyBadge: "Il-konverżjonijiet kollha jsiru fil-browser tiegħek",
    favoriteAdded: "Miżjud mal-favoriti",
    favoriteRemoved: "Imneħħi mill-favoriti",
    comingSoon: "Ġej Dalwaqt",
    share: "Aqsam",
    shareTitle: "Aqsam dan il-konvertitur",
    shareSubtitle: "Aqsam dan il-konvertitur utli ma' oħrajn",
    shareCopied: "Il-link ġie kkupjat!",
    shareCopyLink: "Ikkopja l-link",
    downloadAsFile: "Niżżel",
    options: "Għażliet",
    input: "Input",
    output: "Output",
    convert: "Ikkonverti",
    swap: "Ibdel",
    from: "Minn",
    to: "Għal",
    result: "Riżultat",
    allConversions: "Il-Konverżjonijiet Kollha",
    details: "Dettalji",
    pageNotFound: "Konvertitur mhux misjub",
    goHome: "Lura għall-konvertituri kollha",
    colorPickerLabel: "Għażel il-kulur",
  },
  toolOptions: {
    fromUnit: "Minn",
    toUnit: "Għal",
    precision: "Postijiet deċimali",
    baseSize: "Daqs bażi tal-font (px)",
    parentSize: "Daqs tal-font tal-ġenitur (px)",
    containerWidth: "Wisa' tal-kontenitur (px)",
    viewportWidth: "Wisa' tal-viewport (px)",
    viewportHeight: "Għoli tal-viewport (px)",
    direction: "Direzzjoni",
    mode: "Modalità",
    ingredient: "Ingredjent",
    water: "Ilma",
    flour: "Dqiq",
    sugar: "Zokkor",
    butter: "Butir",
    rice: "Ross",
    milk: "Ħalib",
    originalServings: "Porzjonijiet oriġinali",
    targetServings: "Porzjonijiet mixtieqa",
    fromTimezone: "Miż-żona tal-ħin",
    toTimezone: "Għaż-żona tal-ħin",
    inputFormat: "Format tal-input",
    outputFormat: "Format tal-output",
    harmony: "Armonija tal-kuluri",
    complementary: "Kumplimentari",
    triadic: "Triadiku",
    analogous: "Analogu",
    splitComplementary: "Kumplimentari Maqsum",
    tetradic: "Tetradiku",
    gradientType: "Tip ta' gradjent",
    linear: "Lineari",
    radial: "Radjali",
    conic: "Koniku",
    gradientAngle: "Angolu (deg)",
    rootName: "Isem tal-interface ewlenija",
    tableName: "Isem tat-tabella",
    minify: "Naqqas",
    beautify: "Sebbaħ",
    colorType: "Tip ta' defiċjenza",
    protanopia: "Protanopija (mingħajr aħmar)",
    deuteranopia: "Dewteranopija (mingħajr aħdar)",
    tritanopia: "Tritanopija (mingħajr blu)",
    achromatopsia: "Akromatopsija (mingħajr kulur)",
    operation: "Operazzjoni",
    difference: "Differenza",
    add: "Żid",
    subtract: "Naqqas",
    amount: "Ammont",
    unit: "Unità",
    days: "Ġranet",
    weeks: "Ġimgħat",
    months: "Xhur",
    years: "Snin",
    fromBase: "Mill-bażi",
    toBase: "Għall-bażi",
    binary: "Binarju (2)",
    octal: "Ottali (8)",
    decimal: "Deċimali (10)",
    hexadecimal: "Eżadeċimali (16)",
    seconds: "Sekondi",
    milliseconds: "Millisekondi",
    autoDetect: "Identifika awtomatikament",
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
    markdown: "Tabella Markdown",
    html: "Tabella HTML",
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
    toRoman: "Numru → Ruman",
    toArabic: "Ruman → Numru",
    toScientific: "Standard → Xjentifiku",
    toStandard: "Xjentifiku → Standard",
    toFraction: "Deċimali → Frazzjoni",
    toDecimal: "Frazzjoni → Deċimali",
    decimalToPercent: "Deċimali → Perċent",
    percentToDecimal: "Perċent → Deċimali",
    fractionToPercent: "Frazzjoni → Perċent",
    dd: "Gradi Deċimali (DD)",
    dms: "Gradi Minuti Sekondi (DMS)",
    ddm: "Gradi Minuti Deċimali (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Format twil",
    short: "Format qasir",
    relative: "Relattiv",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Kulur tal-Isfond",
    monochromatic: "Monokromatiku",
    timestampToDate: "Timestamp → Data",
    dateToTimestamp: "Data → Timestamp",
    showDetails: "Uri d-dettalji sħaħ",
    addDays: "Żid ġranet",
    subtractDays: "Naqqas ġranet",
    datetimeHint: "eż. 2024-01-15, 1705312200, now",
    endDate: "Data tal-tmiem",
    today: "Illum (awtomatiku)",
    dateUnit: "Unità",
  },
  statsLabels: {
    lines: "Linji",
    characters: "Karattri",
    rows: "Ringieli",
    columns: "Kolonni",
    elements: "Elementi",
    keys: "Keys",
    interfaces: "Interfaces",
    properties: "Proprjetajiet",
    originalSize: "Daqs oriġinali",
    resultSize: "Daqs tar-riżultat",
    savings: "Ffrankar",
    ingredients: "Ingredjenti",
    scaleFactor: "Fattur ta' skala",
    contrastRatio: "Ratio tal-kuntrast",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitudni",
    longitude: "Lonġitudni",
    distanceKm: "Distanza (km)",
    distanceMi: "Distanza (mi)",
    years: "Snin",
    months: "Xhur",
    days: "Ġranet",
  },
  processorMessages: {
    invalidTimezone: "Żona tal-ħin invalida",
    pass: "Għadda", fail: "Ma għaddiex",
    fromNow: "minn issa", ago: "ilu",
    today: "Illum", tomorrow: "Għada", yesterday: "Ilbieraħ",
    seconds: "sekonda", secondsPlural: "sekondi",
    minutes: "minuta", minutesPlural: "minuti",
    hours: "siegħa", hoursPlural: "sigħat",
    daysUnit: "jum", daysPlural: "ġranet",
    weeksUnit: "ġimgħa", weeksPlural: "ġimgħat",
    monthsUnit: "xahar", monthsPlural: "xhur",
    yearsUnit: "sena", yearsPlural: "snin",
    gasmark: "Gas Mark",
    veryCool: "Kiesaħ ħafna", cool: "Kiesaħ", moderatelyCool: "Kiesaħ moderatament",
    moderate: "Moderat", moderatelyHot: "Sħun moderatament",
    hot: "Sħun", veryHot: "Sħun ħafna", extremelyHot: "Estremament sħun",
    original: "Oriġinali",
    from: "Minn", to: "Għal",
    totalDays: "Total Ġranet", weeksDays: "Ġimgħat + Ġranet",
    originalDate: "Data Oriġinali", operationLabel: "Operazzjoni",
    resultDate: "Data tar-Riżultat", dayOfWeek: "Jum tal-Ġimgħa",
    daysBetween: "Ġranet bejn",
    age: "Età", totalMonths: "Total Xhur",
    totalHours: "Total Sigħat", totalMinutes: "Total Minuti",
    nextBirthday: "Birthday li jmiss",
    roman: "Ruman", arabic: "Għarbi",
    scientific: "Xjentifiku", standard: "Standard", engineering: "Inġinerija",
    fraction: "Frazzjoni", simplified: "Simplifikat", percentage: "Perċentwal",
    color1: "Kulur 1", color2: "Kulur 2",
    contrastRatioLabel: "Ratio tal-Kuntrast",
    aaNormalText: "AA Test Normali", aaLargeText: "AA Test Kbir",
    aaaNormalText: "AAA Test Normali", aaaLargeText: "AAA Test Kbir",
    gradientTypeLabel: "Tip", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Konvertituri Online B'Xejn",
    siteDescription:
      "Ikkonverti unitajiet, kuluri, formats tad-data, dati, u aktar. B'xejn, mgħaġġel, u privat — kollox jaħdem fil-browser tiegħek.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Pariri, gwidi, u għarfien dwar konverżjonijiet tal-unitajiet, formats tad-data, u aktar.",
    readMore: "Aqra aktar",
    backToBlog: "Lura għall-Blog",
    publishedOn: "Ippubblikat fi",
    categoryGuide: "Gwida",
    categoryTips: "Pariri",
    categoryKnowledge: "Għarfien",
  },
  cookie: {
    message:
      "Nużaw cookies biex intejbu l-esperjenza tiegħek. Billi tkompli, qed taqbel mal-politika tagħna tal-cookies.",
    accept: "Aċċetta",
    decline: "Irrifjuta",
  },
  unitLabels: {
    length: {
      m: "Metru (m)", km: "Kilometru (km)", cm: "Ċentimetru (cm)", mm: "Millimetru (mm)",
      mi: "Mil (mi)", yd: "Yard (yd)", ft: "Pied (ft)", in: "Pulzier (in)",
      nm: "Mil nawtiku (nm)", "\u03BCm": "Mikrometru (\u03BCm)",
    },
    weight: {
      kg: "Kilogramm (kg)", g: "Gramm (g)", mg: "Milligramm (mg)", lb: "Libra (lb)",
      oz: "Onza (oz)", ton: "Tunnellata metrika (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Metru kwadru (m\u00B2)", "km\u00B2": "Kilometru kwadru (km\u00B2)",
      ha: "Ettaru (ha)", acre: "Acre", "ft\u00B2": "Pied kwadru (ft\u00B2)",
      "mi\u00B2": "Mil kwadru (mi\u00B2)", "yd\u00B2": "Yard kwadru (yd\u00B2)",
      "cm\u00B2": "Ċentimetru kwadru (cm\u00B2)",
    },
    volume: {
      L: "Litru (L)", mL: "Millilitru (mL)", gal: "Gallun Amerikan (gal)",
      "fl oz": "Fluid ounce Amerikan (fl oz)", cup: "Tazza Amerikana", pt: "Pinta Amerikana (pt)",
      qt: "Quart Amerikan (qt)", "m\u00B3": "Metru kubu (m\u00B3)",
      "cm\u00B3": "Ċentimetru kubu (cm\u00B3)", tbsp: "Mgħarfa kbira (tbsp)", tsp: "Mgħarfa żgħira (tsp)",
    },
    speed: {
      "m/s": "Metru/sek (m/s)", "km/h": "Kilometru/siegħa (km/h)", mph: "Mil/siegħa (mph)",
      kn: "Knot (kn)", "ft/s": "Pied/sek (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekonda (ms)", s: "Sekonda (s)", min: "Minuta (min)", h: "Siegħa (h)",
      d: "Jum (d)", wk: "Ġimgħa (wk)", mo: "Xahar (mo)", yr: "Sena (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalorija (cal)", kcal: "Kilokalorija (kcal)",
      Wh: "Watt-siegħa (Wh)", kWh: "Kilowatt-siegħa (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Horsepower (hp)",
      "BTU/h": "BTU/siegħa", "cal/s": "Kalorija/sek",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grad (\u00B0)", rad: "Radjan (rad)", grad: "Gradjan (grad)",
      turn: "Dawra", arcmin: "Minuta tal-ark (\u2032)", arcsec: "Sekonda tal-ark (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Tazza", tbsp: "Mgħarfa kbira", tsp: "Mgħarfa żgħira", mL: "Millilitru (mL)",
      L: "Litru (L)", fl_oz: "Fluid Ounce", g: "Gramm (g)", kg: "Kilogramm (kg)",
      oz: "Onza (oz)", lb: "Libra (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixels (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixels (px)", em: "Em (em)" },
    "px-percent": { px: "Pixels (px)", "%": "Perċent (%)" },
    "css-unit": {
      px: "Pixels (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Perċent (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
