import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Všechny převodníky na jednom místě",
    titleAccent: "převodníky",
    description:
      "Převádějte jednotky, barvy, datové formáty, data a další — přímo v prohlížeči.",
    tabAll: "Vše",
    categoryUnit: "Jednotky",
    categoryNumber: "Čísla",
    categoryColor: "Barvy",
    categoryDatetime: "Datum/Čas",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Vaření",
    categoryGeography: "Geografie",
    searchPlaceholder: "Hledat převodníky...",
    noResults: "Žádné převodníky nenalezeny.",
    recentTools: "Naposledy použité",
    favorites: "Oblíbené",
    favDragHint: "Přetáhněte pro změnu pořadí",
    favHint: "Klikněte na hvězdičku pro přidání do oblíbených",
    gridView: "Mřížka",
    listView: "Seznam",
  },
  trust: {
    encryption: "Bezpečné zpracování",
    encryptionDesc: "Všechny převody probíhají lokálně ve vašem prohlížeči",
    autoDelete: "Žádné ukládání dat",
    autoDeleteDesc: "Váš vstup se nikdy neukládá ani neodesílá na server",
    free: "100% zdarma",
    freeDesc: "Žádné limity, žádná registrace, žádné skryté poplatky",
    browserProcessing: "Okamžité výsledky",
    browserProcessingDesc: "Převod v reálném čase při psaní",
  },
  tools: {
    length: {
      title: "Převodník délky",
      description:
        "Převádějte mezi metry, kilometry, mílemi, stopami, palci a dalšími.",
    },
    weight: {
      title: "Převodník hmotnosti",
      description:
        "Převádějte mezi kilogramy, librami, uncemi, tunami a dalšími.",
    },
    temperature: {
      title: "Převodník teploty",
      description: "Převádějte mezi stupni Celsia, Fahrenheita a Kelviny.",
    },
    area: {
      title: "Převodník plochy",
      description:
        "Převádějte mezi čtverečními metry, hektary, akry, čtverečními stopami a dalšími.",
    },
    volume: {
      title: "Převodník objemu",
      description:
        "Převádějte mezi litry, galony, šálky, tekutými uncemi a dalšími.",
    },
    speed: {
      title: "Převodník rychlosti",
      description: "Převádějte mezi m/s, km/h, mph, uzly a dalšími.",
    },
    time: {
      title: "Převodník času",
      description:
        "Převádějte mezi sekundami, minutami, hodinami, dny, týdny a dalšími.",
    },
    pressure: {
      title: "Převodník tlaku",
      description:
        "Převádějte mezi Pascaly, bary, PSI, atmosférami a dalšími.",
    },
    energy: {
      title: "Převodník energie",
      description:
        "Převádějte mezi jouly, kaloriemi, kilowatthodinami, BTU a dalšími.",
    },
    power: {
      title: "Převodník výkonu",
      description:
        "Převádějte mezi watty, kilowatty, koňskými silami a dalšími.",
    },
    frequency: {
      title: "Převodník frekvence",
      description:
        "Převádějte mezi hertzy, kiloherzy, megahertzy, gigahertzy a RPM.",
    },
    angle: {
      title: "Převodník úhlů",
      description: "Převádějte mezi stupni, radiány, gradiány a otáčkami.",
    },
    "data-storage": {
      title: "Převodník datového úložiště",
      description:
        "Převádějte mezi bajty, kilobajty, megabajty, gigabajty a dalšími.",
    },
    "fuel-economy": {
      title: "Převodník spotřeby paliva",
      description: "Převádějte mezi km/L, mpg a L/100km.",
    },
    "number-base": {
      title: "Převodník číselných soustav",
      description:
        "Převádějte mezi binární, osmičkovou, desítkovou, šestnáctkovou a dalšími soustavami.",
    },
    "roman-numeral": {
      title: "Převodník římských číslic",
      description: "Převádějte mezi římskými a arabskými číslicemi.",
    },
    "scientific-notation": {
      title: "Vědecký zápis",
      description:
        "Převádějte mezi vědeckým zápisem a standardními čísly.",
    },
    "fraction-decimal": {
      title: "Zlomek ↔ Desetinné číslo",
      description: "Převádějte mezi zlomky a desetinnými čísly.",
    },
    percentage: {
      title: "Převodník procent",
      description:
        "Převádějte mezi zlomky, desetinnými čísly a procenty.",
    },
    "color-converter": {
      title: "Převodník barev",
      description:
        "Převádějte mezi HEX, RGB, HSL, HSV a CMYK barevnými formáty.",
    },
    "color-palette-generator": {
      title: "Generátor barevných palet",
      description:
        "Generujte komplementární, triadické a analogické barevné palety.",
    },
    "gradient-generator": {
      title: "CSS generátor přechodů",
      description:
        "Vytvářejte lineární, radiální a kuželové CSS přechody s živým náhledem.",
    },
    "color-contrast-checker": {
      title: "Kontrola kontrastu barev",
      description:
        "Zkontrolujte poměr kontrastu WCAG AA/AAA mezi dvěma barvami.",
    },
    "color-blindness-simulator": {
      title: "Simulátor barvosleposti",
      description:
        "Simulujte, jak barvy vidí lidé s poruchou barevného vidění.",
    },
    timezone: {
      title: "Převodník časových zón",
      description:
        "Převádějte čas mezi různými časovými zónami po celém světě.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp převodník",
      description:
        "Převádějte mezi Unix časovými razítky a čitelnými daty.",
    },
    "date-format": {
      title: "Převodník formátu data",
      description:
        "Převádějte data mezi různými formáty (ISO, US, EU a dalšími).",
    },
    "date-calculator": {
      title: "Kalkulačka dat",
      description:
        "Vypočítejte rozdíl mezi daty nebo přidejte/odečtěte dny.",
    },
    "age-calculator": {
      title: "Kalkulačka věku",
      description:
        "Vypočítejte přesný věk od data narození v letech, měsících a dnech.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Převádějte mezi JSON a YAML datovými formáty.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Převádějte mezi JSON poli a CSV tabulkovým formátem.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Převádějte mezi JSON a XML datovými formáty.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Převádějte mezi JSON a TOML konfiguračními formáty.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Převádějte mezi Markdown a HTML značkováním.",
    },
    "csv-table": {
      title: "CSV do tabulky",
      description: "Převeďte CSV data do Markdown nebo HTML tabulek.",
    },
    "json-typescript": {
      title: "JSON do TypeScript",
      description: "Generujte TypeScript rozhraní z JSON dat.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Převádějte mezi SQL INSERT příkazy a JSON daty.",
    },
    "px-rem": {
      title: "px ↔ rem převodník",
      description:
        "Převádějte mezi pixely a rem jednotkami s nastavitelnou základní velikostí.",
    },
    "px-em": {
      title: "px ↔ em převodník",
      description:
        "Převádějte mezi pixely a em jednotkami s nastavitelnou rodičovskou velikostí.",
    },
    "px-percent": {
      title: "px ↔ % převodník",
      description:
        "Převádějte mezi pixely a procenty s nastavitelnou šířkou kontejneru.",
    },
    "css-unit": {
      title: "CSS převodník jednotek",
      description:
        "Převádějte mezi px, rem, em, %, vw, vh a dalšími CSS jednotkami.",
    },
    "css-minifier": {
      title: "CSS minifikátor / formátovač",
      description:
        "Minifikujte nebo formátujte CSS kód pro produkci nebo čitelnost.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Převádějte mezi Tailwind CSS třídami a běžným CSS.",
    },
    "cooking-measurement": {
      title: "Převodník kuchyňských měr",
      description:
        "Převádějte mezi šálky, lžícemi, lžičkami, mililitry a gramy.",
    },
    "recipe-scaler": {
      title: "Přepočet receptů",
      description:
        "Přepočítejte ingredience receptu podle počtu porcí.",
    },
    "oven-temperature": {
      title: "Převodník teploty trouby",
      description:
        "Převádějte mezi stupni Celsia, Fahrenheita a Gas Mark pro teplotu trouby.",
    },
    coordinate: {
      title: "Převodník souřadnic",
      description:
        "Převádějte mezi DMS, DD a DDM formáty souřadnic.",
    },
    "distance-calculator": {
      title: "Kalkulačka vzdálenosti",
      description:
        "Vypočítejte vzdálenost mezi dvěma zeměpisnými souřadnicemi.",
    },
  },
  nav: {
    allTools: "Všechny převodníky",
    language: "Jazyk",
  },
  footer: {
    tools: "Převodníky",
    legal: "Právní informace",
    privacy: "Ochrana soukromí",
    terms: "Podmínky užívání",
    copyright: "ToolPop. Všechna práva vyhrazena.",
    company: "Společnost",
    about: "O nás",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Všechny převodníky",
    inputPlaceholder: "Zadejte hodnotu k převodu...",
    outputLabel: "Výsledek",
    copyToClipboard: "Kopírovat do schránky",
    copied: "Zkopírováno!",
    clear: "Vymazat",
    paste: "Vložit",
    processing: "Převádění...",
    startOver: "Začít znovu",
    process: "Převést",
    tryAgain: "Zkusit znovu",
    notImplemented: "Tento převodník bude brzy k dispozici.",
    tryOtherTools: "Vyzkoušejte jiné převodníky",
    privacyBadge: "Všechny převody probíhají ve vašem prohlížeči",
    favoriteAdded: "Přidáno do oblíbených",
    favoriteRemoved: "Odebráno z oblíbených",
    comingSoon: "Již brzy",
    share: "Sdílet",
    shareTitle: "Sdílejte tento převodník",
    shareSubtitle: "Sdílejte tento užitečný převodník s ostatními",
    shareCopied: "Odkaz zkopírován!",
    shareCopyLink: "Kopírovat odkaz",
    downloadAsFile: "Stáhnout",
    options: "Možnosti",
    input: "Vstup",
    output: "Výstup",
    convert: "Převést",
    swap: "Prohodit",
    from: "Z",
    to: "Do",
    result: "Výsledek",
    allConversions: "Všechny převody",
    details: "Podrobnosti",
    pageNotFound: "Převodník nenalezen",
    goHome: "Zpět na všechny převodníky",
  },
  toolOptions: {
    fromUnit: "Z",
    toUnit: "Do",
    precision: "Desetinná místa",
    baseSize: "Základní velikost písma (px)",
    parentSize: "Velikost rodičovského písma (px)",
    containerWidth: "Šířka kontejneru (px)",
    viewportWidth: "Šířka výřezu (px)",
    viewportHeight: "Výška výřezu (px)",
    direction: "Směr",
    mode: "Režim",
    ingredient: "Ingredience",
    water: "Voda",
    flour: "Mouka",
    sugar: "Cukr",
    butter: "Máslo",
    rice: "Rýže",
    milk: "Mléko",
    originalServings: "Původní porce",
    targetServings: "Cílové porce",
    fromTimezone: "Z časové zóny",
    toTimezone: "Do časové zóny",
    inputFormat: "Vstupní formát",
    outputFormat: "Výstupní formát",
    harmony: "Barevná harmonie",
    complementary: "Komplementární",
    triadic: "Triadická",
    analogous: "Analogická",
    splitComplementary: "Rozdělená komplementární",
    tetradic: "Tetradická",
    gradientType: "Typ přechodu",
    linear: "Lineární",
    radial: "Radiální",
    conic: "Kuželový",
    gradientAngle: "Úhel (deg)",
    rootName: "Název kořenového rozhraní",
    tableName: "Název tabulky",
    minify: "Minifikovat",
    beautify: "Formátovat",
    colorType: "Typ poruchy",
    protanopia: "Protanopie (bez červené)",
    deuteranopia: "Deuteranopie (bez zelené)",
    tritanopia: "Tritanopie (bez modré)",
    achromatopsia: "Achromatopsie (bez barvy)",
    operation: "Operace",
    difference: "Rozdíl",
    add: "Přidat",
    subtract: "Odečíst",
    amount: "Množství",
    unit: "Jednotka",
    days: "Dny",
    weeks: "Týdny",
    months: "Měsíce",
    years: "Roky",
    fromBase: "Ze soustavy",
    toBase: "Do soustavy",
    binary: "Binární (2)",
    octal: "Osmičková (8)",
    decimal: "Desítková (10)",
    hexadecimal: "Šestnáctková (16)",
    seconds: "Sekundy",
    milliseconds: "Milisekundy",
    autoDetect: "Automaticky",
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
    markdown: "Markdown tabulka",
    html: "HTML tabulka",
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
    toRoman: "Číslo → Římské",
    toArabic: "Římské → Číslo",
    toScientific: "Standardní → Vědecký",
    toStandard: "Vědecký → Standardní",
    toFraction: "Desetinné → Zlomek",
    toDecimal: "Zlomek → Desetinné",
    decimalToPercent: "Desetinné → Procento",
    percentToDecimal: "Procento → Desetinné",
    fractionToPercent: "Zlomek → Procento",
    dd: "Desetinné stupně (DD)",
    dms: "Stupně minuty sekundy (DMS)",
    ddm: "Stupně desetinné minuty (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Dlouhý formát",
    short: "Krátký formát",
    relative: "Relativní",
    celsius: "Celsia (°C)",
    fahrenheit: "Fahrenheita (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Barva pozadí",
    monochromatic: "Monochromatický",
    timestampToDate: "Časové razítko → Datum",
    dateToTimestamp: "Datum → Časové razítko",
    showDetails: "Zobrazit podrobný rozpis",
    addDays: "Přidat dny",
    subtractDays: "Odečíst dny",
    datetimeHint: "např. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Řádky",
    characters: "Znaky",
    rows: "Řádky",
    columns: "Sloupce",
    elements: "Prvky",
    keys: "Klíče",
    interfaces: "Rozhraní",
    properties: "Vlastnosti",
    originalSize: "Původní velikost",
    resultSize: "Velikost výsledku",
    savings: "Úspora",
    ingredients: "Ingredience",
    scaleFactor: "Faktor měřítka",
    contrastRatio: "Poměr kontrastu",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Zeměpisná šířka",
    longitude: "Zeměpisná délka",
    distanceKm: "Vzdálenost (km)",
    distanceMi: "Vzdálenost (mi)",
    years: "Roky",
    months: "Měsíce",
    days: "Dny",
  },
  processorMessages: {
    invalidTimezone: "Neplatná časová zóna",
    pass: "Splněno", fail: "Nesplněno",
    fromNow: "od teď", ago: "zpět",
    today: "Dnes", tomorrow: "Zítra", yesterday: "Včera",
    seconds: "sekunda", secondsPlural: "sekund",
    minutes: "minuta", minutesPlural: "minut",
    hours: "hodina", hoursPlural: "hodin",
    daysUnit: "den", daysPlural: "dní",
    weeksUnit: "týden", weeksPlural: "týdnů",
    monthsUnit: "měsíc", monthsPlural: "měsíců",
    yearsUnit: "rok", yearsPlural: "let",
    gasmark: "Gas Mark",
    veryCool: "Velmi chladné", cool: "Chladné", moderatelyCool: "Mírně chladné",
    moderate: "Střední", moderatelyHot: "Mírně horké",
    hot: "Horké", veryHot: "Velmi horké", extremelyHot: "Extrémně horké",
    original: "Originál",
    from: "Z", to: "Do",
    totalDays: "Celkem dní", weeksDays: "Týdny + Dny",
    originalDate: "Původní datum", operationLabel: "Operace",
    resultDate: "Výsledné datum", dayOfWeek: "Den v týdnu",
    daysBetween: "Dní mezi",
    age: "Věk", totalMonths: "Celkem měsíců",
    totalHours: "Celkem hodin", totalMinutes: "Celkem minut",
    nextBirthday: "Příští narozeniny",
    roman: "Římské", arabic: "Arabské",
    scientific: "Vědecký", standard: "Standardní", engineering: "Inženýrský",
    fraction: "Zlomek", simplified: "Zjednodušený", percentage: "Procento",
    color1: "Barva 1", color2: "Barva 2",
    contrastRatioLabel: "Poměr kontrastu",
    aaNormalText: "AA Normální text", aaLargeText: "AA Velký text",
    aaaNormalText: "AAA Normální text", aaaLargeText: "AAA Velký text",
    gradientTypeLabel: "Typ", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Bezplatné online převodníky",
    siteDescription:
      "Převádějte jednotky, barvy, datové formáty, data a další. Zdarma, rychle a soukromě — vše běží ve vašem prohlížeči.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Tipy, návody a znalosti o převodu jednotek, datových formátech a dalším.",
    readMore: "Číst dále",
    backToBlog: "Zpět na blog",
    publishedOn: "Publikováno",
    categoryGuide: "Návod",
    categoryTips: "Tipy",
    categoryKnowledge: "Znalosti",
  },
  cookie: {
    message:
      "Používáme cookies ke zlepšení vašeho zážitku. Pokračováním souhlasíte s našimi pravidly pro cookies.",
    accept: "Přijmout",
    decline: "Odmítnout",
  },
  unitLabels: {
    length: {
      m: "Metr (m)", km: "Kilometr (km)", cm: "Centimetr (cm)", mm: "Milimetr (mm)",
      mi: "Míle (mi)", yd: "Yard (yd)", ft: "Stopa (ft)", in: "Palec (in)",
      nm: "Námořní míle (nm)", "\u03BCm": "Mikrometr (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Libra (lb)",
      oz: "Unce (oz)", ton: "Metrická tuna (t)", st: "Stone (st)", ct: "Karát (ct)",
    },
    temperature: { C: "Celsia (\u00B0C)", F: "Fahrenheita (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Čtvereční metr (m\u00B2)", "km\u00B2": "Čtvereční kilometr (km\u00B2)",
      ha: "Hektar (ha)", acre: "Akr", "ft\u00B2": "Čtvereční stopa (ft\u00B2)",
      "mi\u00B2": "Čtvereční míle (mi\u00B2)", "yd\u00B2": "Čtvereční yard (yd\u00B2)",
      "cm\u00B2": "Čtvereční centimetr (cm\u00B2)",
    },
    volume: {
      L: "Litr (L)", mL: "Mililitr (mL)", gal: "US Galon (gal)",
      "fl oz": "US Tekutá unce (fl oz)", cup: "US Šálek", pt: "US Pinta (pt)",
      qt: "US Kvart (qt)", "m\u00B3": "Krychlový metr (m\u00B3)",
      "cm\u00B3": "Krychlový centimetr (cm\u00B3)", tbsp: "Lžíce (tbsp)", tsp: "Lžička (tsp)",
    },
    speed: {
      "m/s": "Metr/s (m/s)", "km/h": "Kilometr/h (km/h)", mph: "Míle/h (mph)",
      kn: "Uzel (kn)", "ft/s": "Stopa/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisekunda (ms)", s: "Sekunda (s)", min: "Minuta (min)", h: "Hodina (h)",
      d: "Den (d)", wk: "Týden (wk)", mo: "Měsíc (mo)", yr: "Rok (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosféra (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalorie (cal)", kcal: "Kilokalorie (kcal)",
      Wh: "Watthodina (Wh)", kWh: "Kilowatthodina (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Koňská síla (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kalorie/s",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Stupeň (\u00B0)", rad: "Radián (rad)", grad: "Gradián (grad)",
      turn: "Otáčka", arcmin: "Úhlová minuta (\u2032)", arcsec: "Úhlová sekunda (\u2033)",
    },
    "data-storage": {
      B: "Bajt (B)", KB: "Kilobajt (KB)", MB: "Megabajt (MB)", GB: "Gigabajt (GB)",
      TB: "Terabajt (TB)", PB: "Petabajt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Šálek", tbsp: "Lžíce", tsp: "Lžička", mL: "Mililitr (mL)",
      L: "Litr (L)", fl_oz: "Tekutá unce", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Unce (oz)", lb: "Libra (lb)",
    },
    "oven-temperature": { C: "Celsia (\u00B0C)", F: "Fahrenheita (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixely (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixely (px)", em: "Em (em)" },
    "px-percent": { px: "Pixely (px)", "%": "Procento (%)" },
    "css-unit": {
      px: "Pixely (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procento (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
