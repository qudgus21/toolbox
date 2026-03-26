import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Všetky nástroje na konverziu, ktoré potrebujete",
    titleAccent: "konverziu",
    description:
      "Prevádzajte jednotky, farby, formáty dát, dátumy a viac. Všetko priamo v prehliadači.",
    tabAll: "Všetky",
    categoryUnit: "Jednotky",
    categoryNumber: "Čísla",
    categoryColor: "Farby",
    categoryDatetime: "Dátum/Čas",
    categoryData: "Dáta",
    categoryCss: "CSS",
    categoryCooking: "Varenie",
    categoryGeography: "Geografia",
    searchPlaceholder: "Hľadať konvertory...",
    noResults: "Žiadne konvertory sa nenašli.",
    recentTools: "Nedávno použité",
    favorites: "Obľúbené",
    favDragHint: "Potiahnutím zmeníte poradie",
    favHint: "Kliknutím na hviezdičku pridáte do obľúbených",
    gridView: "Mriežkové zobrazenie",
    listView: "Zobrazenie zoznamu",
  },
  trust: {
    encryption: "Bezpečné spracovanie",
    encryptionDesc: "Všetky konverzie prebiehajú lokálne vo vašom prehliadači",
    autoDelete: "Žiadne ukladanie dát",
    autoDeleteDesc: "Vaše dáta sa nikdy neukladajú ani neodosielajú na server",
    free: "100 % zadarmo",
    freeDesc: "Bez limitov, bez registrácie, bez skrytých poplatkov",
    browserProcessing: "Okamžité výsledky",
    browserProcessingDesc: "Konverzia v reálnom čase počas písania",
  },
  tools: {
    length: {
      title: "Konvertor dĺžky",
      description:
        "Konvertujte medzi metrami, kilometrami, míľami, stopami, palcami a ďalšími.",
    },
    weight: {
      title: "Konvertor hmotnosti",
      description:
        "Konvertujte medzi kilogramami, librami, uncami, tonami a ďalšími.",
    },
    temperature: {
      title: "Konvertor teploty",
      description: "Konvertujte medzi Celsiom, Fahrenheitom a Kelvinom.",
    },
    area: {
      title: "Konvertor plochy",
      description:
        "Konvertujte medzi štvorcovými metrami, hektármi, akrami, štvorcovými stopami a ďalšími.",
    },
    volume: {
      title: "Konvertor objemu",
      description:
        "Konvertujte medzi litrami, galónmi, šálkami, kvapalinými uncami a ďalšími.",
    },
    speed: {
      title: "Konvertor rýchlosti",
      description: "Konvertujte medzi m/s, km/h, mph, uzlami a ďalšími.",
    },
    time: {
      title: "Konvertor času",
      description:
        "Konvertujte medzi sekundami, minútami, hodinami, dňami, týždňami a ďalšími.",
    },
    pressure: {
      title: "Konvertor tlaku",
      description:
        "Konvertujte medzi Pascalom, barom, PSI, atmosférou a ďalšími.",
    },
    energy: {
      title: "Konvertor energie",
      description:
        "Konvertujte medzi joulmi, kalóriami, kilowatthodinami, BTU a ďalšími.",
    },
    power: {
      title: "Konvertor výkonu",
      description:
        "Konvertujte medzi wattmi, kilowattmi, koňskými silami a ďalšími.",
    },
    frequency: {
      title: "Konvertor frekvencie",
      description:
        "Konvertujte medzi hertzmi, kilohertzmi, megahertzmi, gigahertzmi a RPM.",
    },
    angle: {
      title: "Konvertor uhlov",
      description: "Konvertujte medzi stupňami, radiánmi, gradiánmi a otáčkami.",
    },
    "data-storage": {
      title: "Konvertor dátového úložiska",
      description:
        "Konvertujte medzi bajtmi, kilobajtmi, megabajtmi, gigabajtmi a ďalšími.",
    },
    "fuel-economy": {
      title: "Konvertor spotreby paliva",
      description: "Konvertujte medzi km/L, mpg a L/100km.",
    },
    "number-base": {
      title: "Konvertor číselných sústav",
      description:
        "Konvertujte medzi binárnou, oktálnou, desiatkovou, hexadecimálnou a vlastnými sústavami.",
    },
    "roman-numeral": {
      title: "Konvertor rímskych čísel",
      description: "Konvertujte medzi rímskymi a arabskými číslami.",
    },
    "scientific-notation": {
      title: "Konvertor vedeckého zápisu",
      description:
        "Konvertujte medzi vedeckým zápisom a štandardnými číslami.",
    },
    "fraction-decimal": {
      title: "Zlomok ↔ Desatinné číslo",
      description: "Konvertujte medzi zlomkami a desatinnými číslami.",
    },
    percentage: {
      title: "Konvertor percent",
      description:
        "Konvertujte medzi zlomkami, desatinnými číslami a percentami.",
    },
    "color-converter": {
      title: "Konvertor farieb",
      description:
        "Konvertujte medzi farebnými formátmi HEX, RGB, HSL, HSV a CMYK.",
    },
    "color-palette-generator": {
      title: "Generátor farebných paliet",
      description:
        "Generujte doplnkové, triadické a analogické farebné palety.",
    },
    "gradient-generator": {
      title: "Generátor CSS gradientov",
      description:
        "Vytvorte lineárne, radiálne a kónické CSS gradienty s náhľadom naživo.",
    },
    "color-contrast-checker": {
      title: "Kontrola farebného kontrastu",
      description:
        "Skontrolujte pomer kontrastu WCAG AA/AAA medzi dvoma farbami.",
    },
    "color-blindness-simulator": {
      title: "Simulátor farbosleposti",
      description:
        "Simulujte, ako farby vyzerajú pre ľudí s poruchou farebného videnia.",
    },
    timezone: {
      title: "Konvertor časových pásiem",
      description:
        "Konvertujte čas medzi rôznymi časovými pásmami po celom svete.",
    },
    "unix-timestamp": {
      title: "Konvertor Unix Timestamp",
      description:
        "Konvertujte medzi Unix timestampmi a čitateľnými dátumami.",
    },
    "date-format": {
      title: "Konvertor formátu dátumu",
      description:
        "Konvertujte dátumy medzi rôznymi formátmi (ISO, US, EU a ďalšie).",
    },
    "date-calculator": {
      title: "Kalkulačka dátumov",
      description:
        "Vypočítajte rozdiel medzi dátumami alebo pridajte/odoberte dni.",
    },
    "age-calculator": {
      title: "Kalkulačka veku",
      description:
        "Vypočítajte presný vek z dátumu narodenia v rokoch, mesiacoch a dňoch.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Konvertujte medzi dátovými formátmi JSON a YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Konvertujte medzi JSON poľami a tabuľkovým formátom CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Konvertujte medzi dátovými formátmi JSON a XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Konvertujte medzi konfiguračnými formátmi JSON a TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Konvertujte medzi značkovacími jazykmi Markdown a HTML.",
    },
    "csv-table": {
      title: "CSV do tabuľky",
      description: "Konvertujte CSV dáta do Markdown alebo HTML tabuliek.",
    },
    "json-typescript": {
      title: "JSON do TypeScript",
      description: "Generujte TypeScript rozhrania z JSON dát.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Konvertujte medzi SQL INSERT príkazmi a JSON dátami.",
    },
    "px-rem": {
      title: "px ↔ rem konvertor",
      description:
        "Konvertujte medzi pixelmi a rem jednotkami s vlastnou základnou veľkosťou.",
    },
    "px-em": {
      title: "px ↔ em konvertor",
      description:
        "Konvertujte medzi pixelmi a em jednotkami s vlastnou veľkosťou rodiča.",
    },
    "px-percent": {
      title: "px ↔ % konvertor",
      description:
        "Konvertujte medzi pixelmi a percentami s vlastnou šírkou kontajnera.",
    },
    "css-unit": {
      title: "Konvertor CSS jednotiek",
      description:
        "Konvertujte medzi px, rem, em, %, vw, vh a ďalšími CSS jednotkami.",
    },
    "css-minifier": {
      title: "CSS minifikátor / formátovač",
      description:
        "Minifikujte alebo zformátujte CSS kód pre produkciu alebo čitateľnosť.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Konvertujte medzi triedami Tailwind CSS a bežným CSS.",
    },
    "cooking-measurement": {
      title: "Konvertor kuchynských mier",
      description:
        "Konvertujte medzi šálkami, polievkovými lyžicami, čajovými lyžičkami, mililitrami a gramami.",
    },
    "recipe-scaler": {
      title: "Prepočet receptov",
      description:
        "Prepočítajte ingrediencie receptu nahor alebo nadol podľa počtu porcií.",
    },
    "oven-temperature": {
      title: "Konvertor teploty rúry",
      description:
        "Konvertujte medzi Celsiom, Fahrenheitom a Gas Mark pre teploty rúry.",
    },
    coordinate: {
      title: "Konvertor súradníc",
      description:
        "Konvertujte medzi formátmi súradníc DMS, DD a DDM.",
    },
    "distance-calculator": {
      title: "Kalkulačka vzdialeností",
      description:
        "Vypočítajte vzdialenosť medzi dvoma geografickými súradnicami.",
    },
  },
  nav: {
    allTools: "Všetky konvertory",
    language: "Jazyk",
  },
  footer: {
    tools: "Konvertory",
    legal: "Právne informácie",
    privacy: "Zásady ochrany súkromia",
    terms: "Podmienky používania",
    copyright: "ToolPop. Všetky práva vyhradené.",
    company: "Spoločnosť",
    about: "O nás",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Všetky konvertory",
    inputPlaceholder: "Zadajte hodnotu na konverziu...",
    outputLabel: "Výsledok",
    copyToClipboard: "Kopírovať do schránky",
    copied: "Skopírované!",
    clear: "Vymazať",
    paste: "Prilepiť",
    processing: "Konvertuje sa...",
    startOver: "Začať odznova",
    process: "Konvertovať",
    tryAgain: "Skúsiť znova",
    notImplemented: "Tento konvertor bude čoskoro dostupný.",
    tryOtherTools: "Vyskúšajte iné konvertory",
    privacyBadge: "Všetky konverzie prebiehajú vo vašom prehliadači",
    favoriteAdded: "Pridané do obľúbených",
    favoriteRemoved: "Odstránené z obľúbených",
    comingSoon: "Už čoskoro",
    share: "Zdieľať",
    shareTitle: "Zdieľať tento konvertor",
    shareSubtitle: "Zdieľajte tento užitočný konvertor s ostatnými",
    shareCopied: "Odkaz skopírovaný!",
    shareCopyLink: "Kopírovať odkaz",
    downloadAsFile: "Stiahnuť",
    options: "Možnosti",
    input: "Vstup",
    output: "Výstup",
    convert: "Konvertovať",
    swap: "Zameniť",
    from: "Z",
    to: "Do",
    result: "Výsledok",
    allConversions: "Všetky konverzie",
    details: "Podrobnosti",
    pageNotFound: "Konvertor nebol nájdený",
    goHome: "Späť na všetky konvertory",
  },
  toolOptions: {
    fromUnit: "Z",
    toUnit: "Do",
    precision: "Desatinné miesta",
    baseSize: "Základná veľkosť písma (px)",
    parentSize: "Veľkosť písma rodiča (px)",
    containerWidth: "Šírka kontajnera (px)",
    viewportWidth: "Šírka viewportu (px)",
    viewportHeight: "Výška viewportu (px)",
    direction: "Smer",
    mode: "Režim",
    ingredient: "Ingrediencia",
    water: "Voda",
    flour: "Múka",
    sugar: "Cukor",
    butter: "Maslo",
    rice: "Ryža",
    milk: "Mlieko",
    originalServings: "Pôvodné porcie",
    targetServings: "Požadované porcie",
    fromTimezone: "Z časového pásma",
    toTimezone: "Do časového pásma",
    inputFormat: "Vstupný formát",
    outputFormat: "Výstupný formát",
    harmony: "Farebná harmónia",
    complementary: "Doplnková",
    triadic: "Triadická",
    analogous: "Analogická",
    splitComplementary: "Rozdelená doplnková",
    tetradic: "Tetradická",
    gradientType: "Typ gradientu",
    linear: "Lineárny",
    radial: "Radiálny",
    conic: "Kónický",
    gradientAngle: "Uhol (deg)",
    rootName: "Názov koreňového rozhrania",
    tableName: "Názov tabuľky",
    minify: "Minifikovať",
    beautify: "Formátovať",
    colorType: "Typ poruchy",
    protanopia: "Protanopia (bez červenej)",
    deuteranopia: "Deuteranopia (bez zelenej)",
    tritanopia: "Tritanopia (bez modrej)",
    achromatopsia: "Achromatopsia (bez farieb)",
    operation: "Operácia",
    difference: "Rozdiel",
    add: "Pridať",
    subtract: "Odčítať",
    amount: "Množstvo",
    unit: "Jednotka",
    days: "Dni",
    weeks: "Týždne",
    months: "Mesiace",
    years: "Roky",
    fromBase: "Z bázy",
    toBase: "Do bázy",
    binary: "Binárna (2)",
    octal: "Oktálna (8)",
    decimal: "Desiatková (10)",
    hexadecimal: "Hexadecimálna (16)",
    seconds: "Sekundy",
    milliseconds: "Milisekundy",
    autoDetect: "Automatická detekcia",
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
    markdown: "Markdown tabuľka",
    html: "HTML tabuľka",
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
    toRoman: "Číslo → Rímske",
    toArabic: "Rímske → Číslo",
    toScientific: "Štandardné → Vedecké",
    toStandard: "Vedecké → Štandardné",
    toFraction: "Desatinné → Zlomok",
    toDecimal: "Zlomok → Desatinné",
    decimalToPercent: "Desatinné → Percento",
    percentToDecimal: "Percento → Desatinné",
    fractionToPercent: "Zlomok → Percento",
    dd: "Desatinné stupne (DD)",
    dms: "Stupne Minúty Sekundy (DMS)",
    ddm: "Stupne Desatinné minúty (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Dlhý formát",
    short: "Krátky formát",
    relative: "Relatívny",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Farba pozadia",
    monochromatic: "Monochromatická",
    timestampToDate: "Timestamp → Dátum",
    dateToTimestamp: "Dátum → Timestamp",
    showDetails: "Zobraziť podrobný rozpis",
    addDays: "Pridať dni",
    subtractDays: "Odobrať dni",
    datetimeHint: "napr. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Riadky",
    characters: "Znaky",
    rows: "Riadky",
    columns: "Stĺpce",
    elements: "Prvky",
    keys: "Kľúče",
    interfaces: "Rozhrania",
    properties: "Vlastnosti",
    originalSize: "Pôvodná veľkosť",
    resultSize: "Veľkosť výsledku",
    savings: "Úspora",
    ingredients: "Ingrediencie",
    scaleFactor: "Faktor zmeny",
    contrastRatio: "Pomer kontrastu",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Zemepisná šírka",
    longitude: "Zemepisná dĺžka",
    distanceKm: "Vzdialenosť (km)",
    distanceMi: "Vzdialenosť (mi)",
    years: "Roky",
    months: "Mesiace",
    days: "Dni",
  },
  processorMessages: {
    invalidTimezone: "Neplatné časové pásmo",
    pass: "Splnené", fail: "Nesplnené",
    fromNow: "od teraz", ago: "pred",
    today: "Dnes", tomorrow: "Zajtra", yesterday: "Včera",
    seconds: "sekunda", secondsPlural: "sekúnd",
    minutes: "minúta", minutesPlural: "minút",
    hours: "hodina", hoursPlural: "hodín",
    daysUnit: "deň", daysPlural: "dní",
    weeksUnit: "týždeň", weeksPlural: "týždňov",
    monthsUnit: "mesiac", monthsPlural: "mesiacov",
    yearsUnit: "rok", yearsPlural: "rokov",
    gasmark: "Gas Mark",
    veryCool: "Veľmi studené", cool: "Studené", moderatelyCool: "Mierne studené",
    moderate: "Stredné", moderatelyHot: "Mierne horúce",
    hot: "Horúce", veryHot: "Veľmi horúce", extremelyHot: "Extrémne horúce",
    original: "Originál",
    from: "Od", to: "Do",
    totalDays: "Celkový počet dní", weeksDays: "Týždne + Dni",
    originalDate: "Pôvodný dátum", operationLabel: "Operácia",
    resultDate: "Výsledný dátum", dayOfWeek: "Deň v týždni",
    daysBetween: "Počet dní medzi",
    age: "Vek", totalMonths: "Celkový počet mesiacov",
    totalHours: "Celkový počet hodín", totalMinutes: "Celkový počet minút",
    nextBirthday: "Najbližšie narodeniny",
    roman: "Rímske", arabic: "Arabské",
    scientific: "Vedecký", standard: "Štandardný", engineering: "Inžiniersky",
    fraction: "Zlomok", simplified: "Zjednodušený", percentage: "Percento",
    color1: "Farba 1", color2: "Farba 2",
    contrastRatioLabel: "Pomer kontrastu",
    aaNormalText: "AA bežný text", aaLargeText: "AA veľký text",
    aaaNormalText: "AAA bežný text", aaaLargeText: "AAA veľký text",
    gradientTypeLabel: "Typ", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Bezplatné online konvertory",
    siteDescription:
      "Konvertujte jednotky, farby, dátové formáty, dátumy a ďalšie. Zadarmo, rýchlo a súkromne — všetko beží vo vašom prehliadači.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Tipy, návody a poznatky o konverziách jednotiek, dátových formátoch a ďalšom.",
    readMore: "Čítať ďalej",
    backToBlog: "Späť na blog",
    publishedOn: "Publikované",
    categoryGuide: "Návod",
    categoryTips: "Tipy",
    categoryKnowledge: "Poznatky",
  },
  cookie: {
    message:
      "Používame cookies na zlepšenie vášho zážitku. Pokračovaním súhlasíte s našimi zásadami používania cookies.",
    accept: "Prijať",
    decline: "Odmietnuť",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Milimeter (mm)",
      mi: "Míľa (mi)", yd: "Yard (yd)", ft: "Stopa (ft)", in: "Palec (in)",
      nm: "Námorná míľa (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Libra (lb)",
      oz: "Unca (oz)", ton: "Metrická tona (t)", st: "Stone (st)", ct: "Karát (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Štvorcový meter (m\u00B2)", "km\u00B2": "Štvorcový kilometer (km\u00B2)",
      ha: "Hektár (ha)", acre: "Aker", "ft\u00B2": "Štvorcová stopa (ft\u00B2)",
      "mi\u00B2": "Štvorcová míľa (mi\u00B2)", "yd\u00B2": "Štvorcový yard (yd\u00B2)",
      "cm\u00B2": "Štvorcový centimeter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Mililiter (mL)", gal: "US galón (gal)",
      "fl oz": "US kvapalinná unca (fl oz)", cup: "US šálka", pt: "US pinta (pt)",
      qt: "US quart (qt)", "m\u00B3": "Kubický meter (m\u00B3)",
      "cm\u00B3": "Kubický centimeter (cm\u00B3)", tbsp: "Polievková lyžica (tbsp)", tsp: "Čajová lyžička (tsp)",
    },
    speed: {
      "m/s": "Meter/s (m/s)", "km/h": "Kilometer/h (km/h)", mph: "Míľa/h (mph)",
      kn: "Uzol (kn)", "ft/s": "Stopa/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisekunda (ms)", s: "Sekunda (s)", min: "Minúta (min)", h: "Hodina (h)",
      d: "Deň (d)", wk: "Týždeň (wk)", mo: "Mesiac (mo)", yr: "Rok (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosféra (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalória (cal)", kcal: "Kilokalória (kcal)",
      Wh: "Watthodina (Wh)", kWh: "Kilowatthodina (kWh)", BTU: "BTU", eV: "Elektrónvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Konská sila (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kalória/s",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Stupeň (\u00B0)", rad: "Radián (rad)", grad: "Gradián (grad)",
      turn: "Otáčka", arcmin: "Oblúková minúta (\u2032)", arcsec: "Oblúková sekunda (\u2033)",
    },
    "data-storage": {
      B: "Bajt (B)", KB: "Kilobajt (KB)", MB: "Megabajt (MB)", GB: "Gigabajt (GB)",
      TB: "Terabajt (TB)", PB: "Petabajt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Šálka", tbsp: "Polievková lyžica", tsp: "Čajová lyžička", mL: "Mililiter (mL)",
      L: "Liter (L)", fl_oz: "Kvapalinná unca", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Unca (oz)", lb: "Libra (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixely (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixely (px)", em: "Em (em)" },
    "px-percent": { px: "Pixely (px)", "%": "Percento (%)" },
    "css-unit": {
      px: "Pixely (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Percento (%)", vw: "Šírka viewportu (vw)", vh: "Výška viewportu (vh)",
    },
  },
};

export default dict;
