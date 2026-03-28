import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Öll umbreytingatól sem þú þarft",
    titleAccent: "umbreytinga",
    description:
      "Umbreyttu einingum, litum, gagnasniðum, dagsetningum og fleira. Allt beint í vafranum.",
    tabAll: "Allt",
    categoryUnit: "Einingar",
    categoryNumber: "Tölur",
    categoryColor: "Litir",
    categoryDatetime: "Dagsetning/Tími",
    categoryData: "Gögn",
    categoryCss: "CSS",
    categoryCooking: "Matargerð",
    categoryGeography: "Landafræði",
    searchPlaceholder: "Leita að umreikni...",
    noResults: "Enginn umreikni fannst.",
    recentTools: "Nýlega notað",
    favorites: "Eftirlæti",
    favDragHint: "Dragðu til að endurraða",
    favHint: "Smelltu á stjörnuna til að bæta við eftirlæti",
    gridView: "Hnitasjá",
    listView: "Listasjá",
  },
  trust: {
    encryption: "Örugg vinnsla",
    encryptionDesc: "Allar umreiknir fara fram á staðnum í vafranum þínum",
    autoDelete: "Engin gagnageymsla",
    autoDeleteDesc: "Inntak þitt er aldrei vistað eða sent á þjón",
    free: "100% ókeypis",
    freeDesc: "Engin takmörk, engin nýskráning, engin falin gjöld",
    browserProcessing: "Tafarlausar niðurstöður",
    browserProcessingDesc: "Rauntíma umreikni á meðan þú skrifar",
  },
  tools: {
    length: {
      title: "Lengdarumreikni",
      description:
        "Umreiknaðu á milli metra, kílómetra, mílna, feta, tomma og fleira.",
    },
    weight: {
      title: "Þyngdarumreikni",
      description:
        "Umreiknaðu á milli kílógramma, punda, únsa, tonna og fleira.",
    },
    temperature: {
      title: "Hitastigsumreikni",
      description: "Umreiknaðu á milli Celsíus, Fahrenheit og Kelvin.",
    },
    area: {
      title: "Flatarmálsumreikni",
      description:
        "Umreiknaðu á milli fermetra, hektara, ekra, ferfeta og fleira.",
    },
    volume: {
      title: "Rúmmálsumreikni",
      description:
        "Umreiknaðu á milli lítra, gallona, bolla, vökvaúnsa og fleira.",
    },
    speed: {
      title: "Hraðaumreikni",
      description: "Umreiknaðu á milli m/s, km/h, mph, hnúta og fleira.",
    },
    time: {
      title: "Tímaumreikni",
      description:
        "Umreiknaðu á milli sekúndna, mínútna, klukkustunda, daga, vikna og fleira.",
    },
    pressure: {
      title: "Þrýstingsumreikni",
      description:
        "Umreiknaðu á milli Pascal, bar, PSI, loftþrýstings og fleira.",
    },
    energy: {
      title: "Orkuumreikni",
      description:
        "Umreiknaðu á milli júla, hitaeininga, kílóvattstunda, BTU og fleira.",
    },
    power: {
      title: "Aflumreikni",
      description:
        "Umreiknaðu á milli vatta, kílóvatta, hestafla og fleira.",
    },
    frequency: {
      title: "Tíðniumreikni",
      description:
        "Umreiknaðu á milli hertz, kílóhertz, megahertz, gígahertz og RPM.",
    },
    angle: {
      title: "Hornaumreikni",
      description: "Umreiknaðu á milli gráða, radíana, gradíana og snúninga.",
    },
    "data-storage": {
      title: "Gagnageymslumreikni",
      description:
        "Umreiknaðu á milli bæta, kílóbæta, megabæta, gígabæta og fleira.",
    },
    "fuel-economy": {
      title: "Eldsneytissparnaðarumreikni",
      description: "Umreiknaðu á milli km/L, mpg og L/100km.",
    },
    "number-base": {
      title: "Talnakerfsumreikni",
      description:
        "Umreiknaðu á milli tvíundarkerfis, áttundarkerfis, tugakerfis, sextándarkerfis og sérsniðinna kerfa.",
    },
    "roman-numeral": {
      title: "Rómverskra talna umreikni",
      description: "Umreiknaðu á milli rómverskra og arabískra talna.",
    },
    "scientific-notation": {
      title: "Vísindaritháttarumreikni",
      description:
        "Umreiknaðu á milli vísindaritháttar og staðaltalna.",
    },
    "fraction-decimal": {
      title: "Brot ↔ Tugabrot",
      description: "Umreiknaðu á milli brota og tugabrota.",
    },
    percentage: {
      title: "Prósentuumreikni",
      description:
        "Umreiknaðu á milli brota, tugabrota og prósentu.",
    },
    "color-converter": {
      title: "Litaumreikni",
      description:
        "Umreiknaðu á milli HEX, RGB, HSL, HSV og CMYK litasniðmáta.",
    },
    "color-palette-generator": {
      title: "Litaspjaldsmyndari",
      description:
        "Búðu til samsettar, þríhliða og hliðstæðar litaspjöld.",
    },
    "gradient-generator": {
      title: "CSS Stigulsmyndari",
      description:
        "Búðu til línulega, geislalega og keilulega CSS stigla með beinni forsýningu.",
    },
    "color-contrast-checker": {
      title: "Litaandstæðuprófari",
      description:
        "Athugaðu WCAG AA/AAA litaandstæðuhlutfall á milli tveggja lita.",
    },
    "color-blindness-simulator": {
      title: "Litblinduhermir",
      description:
        "Herma eftir því hvernig litir líta út fyrir fólk með litblinduskerðingu.",
    },
    timezone: {
      title: "Tímabeltisumreikni",
      description:
        "Umreiknaðu tíma á milli mismunandi tímabelta um allan heim.",
    },
    "unix-timestamp": {
      title: "Unix tímastimplaumreikni",
      description:
        "Umreiknaðu á milli Unix tímastimpla og læsilegra dagsetninga.",
    },
    "date-format": {
      title: "Dagsetningarsniðmátsumreikni",
      description:
        "Umreiknaðu dagsetningar á milli mismunandi sniðmáta (ISO, US, EU og fleira).",
    },
    "date-calculator": {
      title: "Dagsetningarreiknivél",
      description:
        "Reiknaðu mismun milli dagsetninga eða bættu við/dragðu frá dögum.",
    },
    "age-calculator": {
      title: "Aldursreiknivél",
      description:
        "Reiknaðu nákvæman aldur frá fæðingardegi í árum, mánuðum og dögum.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Umreiknaðu á milli JSON og YAML gagnasniðmáta.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Umreiknaðu á milli JSON-fylkja og CSV-töflusniðmáts.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Umreiknaðu á milli JSON og XML gagnasniðmáta.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Umreiknaðu á milli JSON og TOML stillingasniðmáta.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Umreiknaðu á milli Markdown og HTML merkingarsnið.",
    },
    "csv-table": {
      title: "CSV í töflu",
      description: "Breyttu CSV gögnum í Markdown eða HTML töflu.",
    },
    "json-typescript": {
      title: "JSON í TypeScript",
      description: "Búðu til TypeScript viðmót úr JSON gögnum.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Umreiknaðu á milli SQL INSERT skipana og JSON gagna.",
    },
    "px-rem": {
      title: "px ↔ rem umreikni",
      description:
        "Umreiknaðu á milli pixla og rem eininga með sérsniðinni grunnstærð.",
    },
    "px-em": {
      title: "px ↔ em umreikni",
      description:
        "Umreiknaðu á milli pixla og em eininga með sérsniðinni foreldrastærð.",
    },
    "px-percent": {
      title: "px ↔ % umreikni",
      description:
        "Umreiknaðu á milli pixla og prósentu með sérsniðinni gámsbreidd.",
    },
    "css-unit": {
      title: "CSS einingaumreikni",
      description:
        "Umreiknaðu á milli px, rem, em, %, vw, vh og annarra CSS eininga.",
    },
    "css-minifier": {
      title: "CSS minnkari / snyrtari",
      description:
        "Minnkaðu eða snyrtið CSS kóða fyrir framleiðslu eða læsileika.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Umreiknaðu á milli Tailwind CSS klasa og venjulegs CSS.",
    },
    "cooking-measurement": {
      title: "Matreiðslumálakerfsumreikni",
      description:
        "Umreiknaðu á milli bolla, matskeiða, teskeiða, millilítra og gramma.",
    },
    "recipe-scaler": {
      title: "Uppskriftarkvarði",
      description:
        "Kvarðaðu uppskriftarefni upp eða niður eftir skammtastærð.",
    },
    "oven-temperature": {
      title: "Ofnhitastigsumreikni",
      description:
        "Umreiknaðu á milli Celsíus, Fahrenheit og Gas Mark fyrir ofnhitastig.",
    },
    coordinate: {
      title: "Hnitaumreikni",
      description:
        "Umreiknaðu á milli DMS, DD og DDM hnitasniðmáta.",
    },
    "distance-calculator": {
      title: "Fjarlægðarreiknivél",
      description:
        "Reiknaðu fjarlægð milli tveggja landfræðilegra hnita.",
    },
  },
  nav: {
    allTools: "Allir umreiknar",
    language: "Tungumál",
  },
  footer: {
    tools: "Umreiknar",
    legal: "Lagalegt",
    privacy: "Persónuverndarstefna",
    terms: "Þjónustuskilmálar",
    copyright: "ToolPop. Öll réttindi áskilin.",
    company: "Fyrirtæki",
    about: "Um okkur",
    contact: "Hafa samband",
    faq: "Algengar spurningar",
  },
  common: {
    backToAll: "Allir umreiknar",
    inputPlaceholder: "Sláðu inn gildi til að umreikna...",
    outputLabel: "Niðurstaða",
    copyToClipboard: "Afrita á klippiborð",
    copied: "Afritað!",
    clear: "Hreinsa",
    paste: "Líma",
    processing: "Umreikna...",
    startOver: "Byrja aftur",
    process: "Umreikna",
    tryAgain: "Reyna aftur",
    notImplemented: "Þessi umreikni kemur bráðlega.",
    tryOtherTools: "Prófaðu aðra umreikna",
    privacyBadge: "Allar umreiknir fara fram í vafranum þínum",
    favoriteAdded: "Bætt við eftirlæti",
    favoriteRemoved: "Fjarlægt úr eftirlætum",
    comingSoon: "Bráðlega",
    share: "Deila",
    shareTitle: "Deildu þessum umreikni",
    shareSubtitle: "Deildu þessum nytsamlega umreikni með öðrum",
    shareCopied: "Tengill afritaður!",
    shareCopyLink: "Afrita tengil",
    downloadAsFile: "Sækja",
    options: "Valkostir",
    input: "Inntak",
    output: "Úttak",
    convert: "Umreikna",
    swap: "Skipta",
    from: "Frá",
    to: "Í",
    result: "Niðurstaða",
    allConversions: "Allar umreiknir",
    details: "Nánar",
    pageNotFound: "Umreikni fannst ekki",
    goHome: "Til baka á alla umreikna",
    colorPickerLabel: "Litaval",
  },
  toolOptions: {
    fromUnit: "Frá",
    toUnit: "Í",
    precision: "Aukastafir",
    baseSize: "Grunn leturstærð (px)",
    parentSize: "Foreldri leturstærð (px)",
    containerWidth: "Gámsbreidd (px)",
    viewportWidth: "Gluggabreidd (px)",
    viewportHeight: "Gluggahæð (px)",
    direction: "Stefna",
    mode: "Stilling",
    ingredient: "Hráefni",
    water: "Vatn",
    flour: "Hveiti",
    sugar: "Sykur",
    butter: "Smjör",
    rice: "Hrísgrjón",
    milk: "Mjólk",
    originalServings: "Upprunalegar skammtir",
    targetServings: "Markskammtir",
    fromTimezone: "Frá tímabelti",
    toTimezone: "Í tímabelti",
    inputFormat: "Inntakssniðmát",
    outputFormat: "Úttakssniðmát",
    harmony: "Litasamræmi",
    complementary: "Samsettur",
    triadic: "Þríhliða",
    analogous: "Hliðstæður",
    splitComplementary: "Skiptur samsettur",
    tetradic: "Fjórhliða",
    gradientType: "Stigultegund",
    linear: "Línulegur",
    radial: "Geislalegur",
    conic: "Keilulegur",
    gradientAngle: "Horn (deg)",
    rootName: "Rótarviðmótsnafn",
    tableName: "Töflunafn",
    minify: "Minnka",
    beautify: "Snyrtilegt",
    colorType: "Tegund skerðingar",
    protanopia: "Rauðblinda (protanopía)",
    deuteranopia: "Grænblinda (deuteranopía)",
    tritanopia: "Bláblinda (tritanopía)",
    achromatopsia: "Litleysi (akrómatopsía)",
    operation: "Aðgerð",
    difference: "Mismunur",
    add: "Bæta við",
    subtract: "Draga frá",
    amount: "Magn",
    unit: "Eining",
    days: "Dagar",
    weeks: "Vikur",
    months: "Mánuðir",
    years: "Ár",
    fromBase: "Frá grunni",
    toBase: "Í grunn",
    binary: "Tvíundakerfi (2)",
    octal: "Áttundakerfi (8)",
    decimal: "Tugakerfi (10)",
    hexadecimal: "Sextándakerfi (16)",
    seconds: "Sekúndur",
    milliseconds: "Millisekúndur",
    autoDetect: "Sjálfvirk greining",
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
    markdown: "Markdown tafla",
    html: "HTML tafla",
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
    toRoman: "Tala → Rómversk",
    toArabic: "Rómversk → Tala",
    toScientific: "Staðal → Vísindalegur",
    toStandard: "Vísindalegur → Staðal",
    toFraction: "Tugabrot → Brot",
    toDecimal: "Brot → Tugabrot",
    decimalToPercent: "Tugabrot → Prósenta",
    percentToDecimal: "Prósenta → Tugabrot",
    fractionToPercent: "Brot → Prósenta",
    dd: "Tugabrotsgráður (DD)",
    dms: "Gráður mínútur sekúndur (DMS)",
    ddm: "Gráður tugabrotsmínútur (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Langt snið",
    short: "Stutt snið",
    relative: "Hlutfallslegt",
    celsius: "Celsíus (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Bakgrunnslitur",
    monochromatic: "Einlitt",
    timestampToDate: "Tímastimpill → Dagsetning",
    dateToTimestamp: "Dagsetning → Tímastimpill",
    showDetails: "Sýna sundurliðun",
    addDays: "Bæta við dögum",
    subtractDays: "Draga frá dögum",
    datetimeHint: "t.d. 2024-01-15, 1705312200, now",
    endDate: "Lokadagsetning",
    today: "Í dag (sjálfgefið)",
    dateUnit: "Eining",
  },
  statsLabels: {
    lines: "Línur",
    characters: "Stafir",
    rows: "Raðir",
    columns: "Dálkar",
    elements: "Einingar",
    keys: "Lyklar",
    interfaces: "Viðmót",
    properties: "Eiginleikar",
    originalSize: "Upprunaleg stærð",
    resultSize: "Stærð niðurstöðu",
    savings: "Sparnaður",
    ingredients: "Hráefni",
    scaleFactor: "Kvarðastuðull",
    contrastRatio: "Andstæðuhlutfall",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Breiddargráða",
    longitude: "Lengdargráða",
    distanceKm: "Fjarlægð (km)",
    distanceMi: "Fjarlægð (mi)",
    years: "Ár",
    months: "Mánuðir",
    days: "Dagar",
  },
  processorMessages: {
    invalidTimezone: "Ógilt tímabelti",
    pass: "Stenst", fail: "Stenst ekki",
    fromNow: "héðan í frá", ago: "síðan",
    today: "Í dag", tomorrow: "Á morgun", yesterday: "Í gær",
    seconds: "sekúnda", secondsPlural: "sekúndur",
    minutes: "mínúta", minutesPlural: "mínútur",
    hours: "klukkustund", hoursPlural: "klukkustundir",
    daysUnit: "dagur", daysPlural: "dagar",
    weeksUnit: "vika", weeksPlural: "vikur",
    monthsUnit: "mánuður", monthsPlural: "mánuðir",
    yearsUnit: "ár", yearsPlural: "ár",
    gasmark: "Gas Mark",
    veryCool: "Mjög svalt", cool: "Svalt", moderatelyCool: "Í meðallagi svalt",
    moderate: "Í meðallagi", moderatelyHot: "Í meðallagi heitt",
    hot: "Heitt", veryHot: "Mjög heitt", extremelyHot: "Ofurhiti",
    original: "Upprunalegt",
    from: "Frá", to: "Í",
    totalDays: "Heildarfjöldi daga", weeksDays: "Vikur + Dagar",
    originalDate: "Upprunaleg dagsetning", operationLabel: "Aðgerð",
    resultDate: "Niðurstaða dagsetning", dayOfWeek: "Vikudagur",
    daysBetween: "Dagar á milli",
    age: "Aldur", totalMonths: "Heildarmánuðir",
    totalHours: "Heildarklukkustundir", totalMinutes: "Heildarmínútur",
    nextBirthday: "Næsti afmælisdagur",
    roman: "Rómverskt", arabic: "Arabískt",
    scientific: "Vísindalegt", standard: "Staðlað", engineering: "Verkfræðilegt",
    fraction: "Brot", simplified: "Einfaldað", percentage: "Prósenta",
    color1: "Litur 1", color2: "Litur 2",
    contrastRatioLabel: "Andstæðuhlutfall",
    aaNormalText: "AA venjulegur texti", aaLargeText: "AA stór texti",
    aaaNormalText: "AAA venjulegur texti", aaaLargeText: "AAA stór texti",
    gradientTypeLabel: "Tegund", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Umreikni — Ókeypis umreiknar á netinu",
    siteDescription:
      "Umreiknaðu einingar, liti, gagnasniðmát, dagsetningar og fleira. Ókeypis, hratt og persónuverndarvænt — allt keyrir í vafranum þínum.",
    toolTitleSuffix: "| ToolPop Umreikni",
  },
  blog: {
    title: "Blogg",
    description:
      "Ráðleggingar, leiðbeiningar og þekking um einingaumreiknir, gagnasniðmát og fleira.",
    readMore: "Lesa meira",
    backToBlog: "Til baka á blogg",
    publishedOn: "Birt þann",
    categoryGuide: "Leiðbeining",
    categoryTips: "Ráðleggingar",
    categoryKnowledge: "Þekking",
  },
  cookie: {
    message:
      "Við notum vafrakökur til að bæta upplifun þína. Með því að halda áfram samþykkir þú vafrakökustefnu okkar.",
    accept: "Samþykkja",
    decline: "Hafna",
  },
  unitLabels: {
    length: {
      m: "Metri (m)", km: "Kílómetri (km)", cm: "Sentimetri (cm)", mm: "Millimetri (mm)",
      mi: "Míla (mi)", yd: "Yard (yd)", ft: "Fet (ft)", in: "Tomma (in)",
      nm: "Sjómíla (nm)", "\u03BCm": "Míkrómetri (\u03BCm)",
    },
    weight: {
      kg: "Kílógramm (kg)", g: "Gramm (g)", mg: "Milligramm (mg)", lb: "Pund (lb)",
      oz: "Únsa (oz)", ton: "Metrískt tonn (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsíus (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Fermetri (m\u00B2)", "km\u00B2": "Ferkílómetri (km\u00B2)",
      ha: "Hektari (ha)", acre: "Ekra", "ft\u00B2": "Ferfet (ft\u00B2)",
      "mi\u00B2": "Fermíla (mi\u00B2)", "yd\u00B2": "Fer-yard (yd\u00B2)",
      "cm\u00B2": "Fersentimetri (cm\u00B2)",
    },
    volume: {
      L: "Lítri (L)", mL: "Millilítri (mL)", gal: "Bandarísk gallón (gal)",
      "fl oz": "Bandarísk vökvaúnsa (fl oz)", cup: "Bandarískur bolli", pt: "Bandarísk pinta (pt)",
      qt: "Bandarísk kvart (qt)", "m\u00B3": "Rúmmetri (m\u00B3)",
      "cm\u00B3": "Rúmsentimetri (cm\u00B3)", tbsp: "Matskeiðar (tbsp)", tsp: "Teskeiðar (tsp)",
    },
    speed: {
      "m/s": "Metrar/sek (m/s)", "km/h": "Kílómetrar/klst (km/h)", mph: "Mílur/klst (mph)",
      kn: "Hnútur (kn)", "ft/s": "Fet/sek (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekúnda (ms)", s: "Sekúnda (s)", min: "Mínúta (min)", h: "Klukkustund (h)",
      d: "Dagur (d)", wk: "Vika (wk)", mo: "Mánuður (mo)", yr: "Ár (yr)",
    },
    pressure: {
      Pa: "Paskal (Pa)", kPa: "Kílópaskal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Loftþrýstingur (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Júl (J)", kJ: "Kílójúl (kJ)", cal: "Hitaeining (cal)", kcal: "Kílóhitaeining (kcal)",
      Wh: "Vattstund (Wh)", kWh: "Kílóvattstund (kWh)", BTU: "BTU", eV: "Rafeindavolt (eV)",
    },
    power: {
      W: "Vatt (W)", kW: "Kílóvatt (kW)", MW: "Megavatt (MW)", hp: "Hestafl (hp)",
      "BTU/h": "BTU/klst", "cal/s": "Hitaeining/sek",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kílóhertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gígahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Gráða (\u00B0)", rad: "Radían (rad)", grad: "Gradían (grad)",
      turn: "Snúningur", arcmin: "Bogamínúta (\u2032)", arcsec: "Bogasekúnda (\u2033)",
    },
    "data-storage": {
      B: "Bæti (B)", KB: "Kílóbæti (KB)", MB: "Megabæti (MB)", GB: "Gígabæti (GB)",
      TB: "Terabæti (TB)", PB: "Petabæti (PB)", bit: "Bit",
      Kbit: "Kílóbit", Mbit: "Megabit", Gbit: "Gígabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Bolli", tbsp: "Matskeið", tsp: "Teskeið", mL: "Millilítri (mL)",
      L: "Lítri (L)", fl_oz: "Vökvaúnsa", g: "Gramm (g)", kg: "Kílógramm (kg)",
      oz: "Únsa (oz)", lb: "Pund (lb)",
    },
    "oven-temperature": { C: "Celsíus (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixlar (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixlar (px)", em: "Em (em)" },
    "px-percent": { px: "Pixlar (px)", "%": "Prósent (%)" },
    "css-unit": {
      px: "Pixlar (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Prósent (%)", vw: "Gluggabreidd (vw)", vh: "Gluggahæð (vh)",
    },
  },
};

export default dict;
