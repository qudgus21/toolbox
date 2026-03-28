import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Alle conversietools die je nodig hebt",
    titleAccent: "conversie",
    description:
      "Converteer eenheden, kleuren, dataformaten, datums en meer. Alles in je browser.",
    tabAll: "Alles",
    categoryUnit: "Eenheden",
    categoryNumber: "Getallen",
    categoryColor: "Kleuren",
    categoryDatetime: "Datum/Tijd",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Koken",
    categoryGeography: "Geografie",
    searchPlaceholder: "Zoek converters...",
    noResults: "Geen converters gevonden.",
    recentTools: "Recent gebruikt",
    favorites: "Favorieten",
    favDragHint: "Sleep om te herordenen",
    favHint: "Klik op de ster om favorieten toe te voegen",
    gridView: "Rasterweergave",
    listView: "Lijstweergave",
  },
  trust: {
    encryption: "Veilige verwerking",
    encryptionDesc: "Alle conversies worden lokaal in je browser uitgevoerd",
    autoDelete: "Geen data opgeslagen",
    autoDeleteDesc: "Je invoer wordt nooit opgeslagen of naar een server gestuurd",
    free: "100% gratis",
    freeDesc: "Geen limieten, geen registratie, geen verborgen kosten",
    browserProcessing: "Direct resultaat",
    browserProcessingDesc: "Realtime conversie terwijl je typt",
  },
  tools: {
    length: {
      title: "Lengteconverter",
      description:
        "Converteer tussen meters, kilometers, mijlen, voet, inches en meer.",
    },
    weight: {
      title: "Gewichtsconverter",
      description:
        "Converteer tussen kilogram, pond, ounces, ton en meer.",
    },
    temperature: {
      title: "Temperatuurconverter",
      description: "Converteer tussen Celsius, Fahrenheit en Kelvin.",
    },
    area: {
      title: "Oppervlakteconverter",
      description:
        "Converteer tussen vierkante meters, hectaren, acres, vierkante voet en meer.",
    },
    volume: {
      title: "Volumeconverter",
      description:
        "Converteer tussen liters, gallons, kopjes, fluid ounces en meer.",
    },
    speed: {
      title: "Snelheidsconverter",
      description: "Converteer tussen m/s, km/u, mph, knopen en meer.",
    },
    time: {
      title: "Tijdconverter",
      description:
        "Converteer tussen seconden, minuten, uren, dagen, weken en meer.",
    },
    pressure: {
      title: "Drukconverter",
      description:
        "Converteer tussen Pascal, bar, PSI, atmosfeer en meer.",
    },
    energy: {
      title: "Energieconverter",
      description:
        "Converteer tussen joules, calorieën, kilowattuur, BTU en meer.",
    },
    power: {
      title: "Vermogensconverter",
      description:
        "Converteer tussen watt, kilowatt, pk en meer.",
    },
    frequency: {
      title: "Frequentieconverter",
      description:
        "Converteer tussen hertz, kilohertz, megahertz, gigahertz en RPM.",
    },
    angle: {
      title: "Hoekconverter",
      description: "Converteer tussen graden, radialen, gradianen en omwentelingen.",
    },
    "data-storage": {
      title: "Gegevensopslagconverter",
      description:
        "Converteer tussen bytes, kilobytes, megabytes, gigabytes en meer.",
    },
    "fuel-economy": {
      title: "Brandstofverbruikconverter",
      description: "Converteer tussen km/L, mpg en L/100km.",
    },
    "number-base": {
      title: "Getallenstelselconverter",
      description:
        "Converteer tussen binair, octaal, decimaal, hexadecimaal en andere stelsels.",
    },
    "roman-numeral": {
      title: "Romeinse cijfers converter",
      description: "Converteer tussen Romeinse en Arabische cijfers.",
    },
    "scientific-notation": {
      title: "Wetenschappelijke notatie",
      description:
        "Converteer tussen wetenschappelijke notatie en standaardgetallen.",
    },
    "fraction-decimal": {
      title: "Breuk ↔ Decimaal",
      description: "Converteer tussen breuken en decimale getallen.",
    },
    percentage: {
      title: "Percentageconverter",
      description:
        "Converteer tussen breuken, decimalen en percentages.",
    },
    "color-converter": {
      title: "Kleurconverter",
      description:
        "Converteer tussen HEX, RGB, HSL, HSV en CMYK kleurformaten.",
    },
    "color-palette-generator": {
      title: "Kleurpaletgenerator",
      description:
        "Genereer complementaire, triadische en analoge kleurpaletten.",
    },
    "gradient-generator": {
      title: "CSS-gradiëntgenerator",
      description:
        "Maak lineaire, radiale en conische CSS-gradiënten met live preview.",
    },
    "color-contrast-checker": {
      title: "Kleurcontrastchecker",
      description:
        "Controleer de WCAG AA/AAA contrastverhouding tussen twee kleuren.",
    },
    "color-blindness-simulator": {
      title: "Kleurenblindheid-simulator",
      description:
        "Simuleer hoe kleuren eruitzien voor mensen met kleurenblindheid.",
    },
    timezone: {
      title: "Tijdzoneconverter",
      description:
        "Converteer tijd tussen verschillende tijdzones wereldwijd.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp-converter",
      description:
        "Converteer tussen Unix-timestamps en leesbare datums.",
    },
    "date-format": {
      title: "Datumformaatconverter",
      description:
        "Converteer datums tussen ISO, US, EU en andere formaten.",
    },
    "date-calculator": {
      title: "Datumcalculator",
      description:
        "Bereken het verschil tussen datums of tel dagen op/af.",
    },
    "age-calculator": {
      title: "Leeftijdscalculator",
      description:
        "Bereken de exacte leeftijd op basis van geboortedatum in jaren, maanden en dagen.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Converteer tussen JSON- en YAML-dataformaten.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Converteer tussen JSON-arrays en CSV-spreadsheetformaat.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Converteer tussen JSON- en XML-dataformaten.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Converteer tussen JSON- en TOML-configuratieformaten.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Converteer tussen Markdown en HTML.",
    },
    "csv-table": {
      title: "CSV naar tabel",
      description: "Converteer CSV-gegevens naar Markdown- of HTML-tabellen.",
    },
    "json-typescript": {
      title: "JSON naar TypeScript",
      description: "Genereer TypeScript-interfaces uit JSON-gegevens.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Converteer tussen SQL INSERT-statements en JSON-gegevens.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Converteer tussen pixels en rem met een aangepaste basisgrootte.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Converteer tussen pixels en em met een aangepaste oudergrootte.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Converteer tussen pixels en percentage met een aangepaste containerbreedte.",
    },
    "css-unit": {
      title: "CSS-eenhedenconverter",
      description:
        "Converteer tussen px, rem, em, %, vw, vh en andere CSS-eenheden.",
    },
    "css-minifier": {
      title: "CSS-minimaliseerder / formatteerder",
      description:
        "Minimaliseer of formatteer CSS-code voor productie of leesbaarheid.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Converteer tussen Tailwind CSS-klassen en gewone CSS.",
    },
    "cooking-measurement": {
      title: "Kookmaatconverter",
      description:
        "Converteer tussen kopjes, eetlepels, theelepels, milliliters en grammen.",
    },
    "recipe-scaler": {
      title: "Receptschaler",
      description:
        "Schaal receptingrediënten op of neer op basis van porties.",
    },
    "oven-temperature": {
      title: "Oventemperatuurconverter",
      description:
        "Converteer oventemperatuur tussen Celsius, Fahrenheit en Gas Mark.",
    },
    coordinate: {
      title: "Coördinatenconverter",
      description:
        "Converteer tussen DMS-, DD- en DDM-coördinaatformaten.",
    },
    "distance-calculator": {
      title: "Afstandscalculator",
      description:
        "Bereken de afstand tussen twee geografische coördinaten.",
    },
  },
  nav: {
    allTools: "Alle converters",
    language: "Taal",
  },
  footer: {
    tools: "Converters",
    legal: "Juridisch",
    privacy: "Privacybeleid",
    terms: "Gebruiksvoorwaarden",
    copyright: "ToolPop. Alle rechten voorbehouden.",
    company: "Bedrijf",
    about: "Over ons",
    contact: "Contact",
    faq: "FAQ",
  },
  common: {
    backToAll: "Alle converters",
    inputPlaceholder: "Voer een waarde in om te converteren...",
    outputLabel: "Resultaat",
    copyToClipboard: "Kopiëren",
    copied: "Gekopieerd!",
    clear: "Wissen",
    paste: "Plakken",
    processing: "Converteren...",
    startOver: "Opnieuw beginnen",
    process: "Converteer",
    tryAgain: "Opnieuw proberen",
    notImplemented: "Deze converter komt binnenkort.",
    tryOtherTools: "Probeer andere converters",
    privacyBadge: "Alle conversies gebeuren in je browser",
    favoriteAdded: "Aan favorieten toegevoegd",
    favoriteRemoved: "Uit favorieten verwijderd",
    comingSoon: "Binnenkort",
    share: "Delen",
    shareTitle: "Deel deze converter",
    shareSubtitle: "Deel deze handige converter met anderen",
    shareCopied: "Link gekopieerd!",
    shareCopyLink: "Link kopiëren",
    downloadAsFile: "Downloaden",
    options: "Opties",
    input: "Invoer",
    output: "Uitvoer",
    convert: "Converteer",
    swap: "Wisselen",
    from: "Van",
    to: "Naar",
    result: "Resultaat",
    allConversions: "Alle conversies",
    details: "Details",
    pageNotFound: "Converter niet gevonden",
    goHome: "Terug naar alle converters",
    colorPickerLabel: "Kleurenkiezer",
  },
  toolOptions: {
    fromUnit: "Van",
    toUnit: "Naar",
    precision: "Decimalen",
    baseSize: "Basislettergrootte (px)",
    parentSize: "Ouderlettergrootte (px)",
    containerWidth: "Containerbreedte (px)",
    viewportWidth: "Viewportbreedte (px)",
    viewportHeight: "Viewporthoogte (px)",
    direction: "Richting",
    mode: "Modus",
    ingredient: "Ingrediënt",
    water: "Water",
    flour: "Bloem",
    sugar: "Suiker",
    butter: "Boter",
    rice: "Rijst",
    milk: "Melk",
    originalServings: "Originele porties",
    targetServings: "Gewenste porties",
    fromTimezone: "Van tijdzone",
    toTimezone: "Naar tijdzone",
    inputFormat: "Invoerformaat",
    outputFormat: "Uitvoerformaat",
    harmony: "Kleurharmonie",
    complementary: "Complementair",
    triadic: "Triadisch",
    analogous: "Analoog",
    splitComplementary: "Gesplitst complementair",
    tetradic: "Tetradisch",
    gradientType: "Gradiënttype",
    linear: "Lineair",
    radial: "Radiaal",
    conic: "Conisch",
    gradientAngle: "Hoek (deg)",
    rootName: "Naam van root-interface",
    tableName: "Tabelnaam",
    minify: "Minimaliseren",
    beautify: "Formatteren",
    colorType: "Type afwijking",
    protanopia: "Protanopie (geen rood)",
    deuteranopia: "Deuteranopie (geen groen)",
    tritanopia: "Tritanopie (geen blauw)",
    achromatopsia: "Achromatopsie (geen kleur)",
    operation: "Bewerking",
    difference: "Verschil",
    add: "Optellen",
    subtract: "Aftrekken",
    amount: "Hoeveelheid",
    unit: "Eenheid",
    days: "Dagen",
    weeks: "Weken",
    months: "Maanden",
    years: "Jaren",
    fromBase: "Van stelsel",
    toBase: "Naar stelsel",
    binary: "Binair (2)",
    octal: "Octaal (8)",
    decimal: "Decimaal (10)",
    hexadecimal: "Hexadecimaal (16)",
    seconds: "Seconden",
    milliseconds: "Milliseconden",
    autoDetect: "Automatisch detecteren",
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
    markdown: "Markdown-tabel",
    html: "HTML-tabel",
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
    toRoman: "Getal → Romeins",
    toArabic: "Romeins → Getal",
    toScientific: "Standaard → Wetenschappelijk",
    toStandard: "Wetenschappelijk → Standaard",
    toFraction: "Decimaal → Breuk",
    toDecimal: "Breuk → Decimaal",
    decimalToPercent: "Decimaal → Percentage",
    percentToDecimal: "Percentage → Decimaal",
    fractionToPercent: "Breuk → Percentage",
    dd: "Decimale graden (DD)",
    dms: "Graden minuten seconden (DMS)",
    ddm: "Graden decimale minuten (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/JJJJ)",
    eu: "EU (DD/MM/JJJJ)",
    long: "Lang formaat",
    short: "Kort formaat",
    relative: "Relatief",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Achtergrondkleur",
    monochromatic: "Monochromatisch",
    timestampToDate: "Timestamp → Datum",
    dateToTimestamp: "Datum → Timestamp",
    showDetails: "Gedetailleerd overzicht tonen",
    addDays: "Dagen optellen",
    subtractDays: "Dagen aftrekken",
    datetimeHint: "bijv. 2024-01-15, 1705312200, now",
    endDate: "Einddatum",
    today: "Vandaag (standaard)",
    dateUnit: "Eenheid",
  },
  statsLabels: {
    lines: "Regels",
    characters: "Tekens",
    rows: "Rijen",
    columns: "Kolommen",
    elements: "Elementen",
    keys: "Sleutels",
    interfaces: "Interfaces",
    properties: "Eigenschappen",
    originalSize: "Originele grootte",
    resultSize: "Resultaatgrootte",
    savings: "Besparing",
    ingredients: "Ingrediënten",
    scaleFactor: "Schaalfactor",
    contrastRatio: "Contrastverhouding",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Breedtegraad",
    longitude: "Lengtegraad",
    distanceKm: "Afstand (km)",
    distanceMi: "Afstand (mi)",
    years: "Jaren",
    months: "Maanden",
    days: "Dagen",
  },
  processorMessages: {
    invalidTimezone: "Ongeldige tijdzone",
    pass: "Geslaagd", fail: "Niet geslaagd",
    fromNow: "vanaf nu", ago: "geleden",
    today: "Vandaag", tomorrow: "Morgen", yesterday: "Gisteren",
    seconds: "seconde", secondsPlural: "seconden",
    minutes: "minuut", minutesPlural: "minuten",
    hours: "uur", hoursPlural: "uur",
    daysUnit: "dag", daysPlural: "dagen",
    weeksUnit: "week", weeksPlural: "weken",
    monthsUnit: "maand", monthsPlural: "maanden",
    yearsUnit: "jaar", yearsPlural: "jaar",
    gasmark: "Gas Mark",
    veryCool: "Zeer koel", cool: "Koel", moderatelyCool: "Matig koel",
    moderate: "Matig", moderatelyHot: "Matig heet",
    hot: "Heet", veryHot: "Zeer heet", extremelyHot: "Extreem heet",
    original: "Origineel",
    from: "Van", to: "Naar",
    totalDays: "Totaal dagen", weeksDays: "Weken + Dagen",
    originalDate: "Oorspronkelijke datum", operationLabel: "Bewerking",
    resultDate: "Resultaatdatum", dayOfWeek: "Dag van de week",
    daysBetween: "Dagen ertussen",
    age: "Leeftijd", totalMonths: "Totaal maanden",
    totalHours: "Totaal uren", totalMinutes: "Totaal minuten",
    nextBirthday: "Volgende verjaardag",
    roman: "Romeins", arabic: "Arabisch",
    scientific: "Wetenschappelijk", standard: "Standaard", engineering: "Technisch",
    fraction: "Breuk", simplified: "Vereenvoudigd", percentage: "Percentage",
    color1: "Kleur 1", color2: "Kleur 2",
    contrastRatioLabel: "Contrastverhouding",
    aaNormalText: "AA Normale tekst", aaLargeText: "AA Grote tekst",
    aaaNormalText: "AAA Normale tekst", aaaLargeText: "AAA Grote tekst",
    gradientTypeLabel: "Type", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Gratis online converters",
    siteDescription:
      "Converteer eenheden, kleuren, dataformaten, datums en meer. Gratis, snel en privé — alles draait in je browser.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Tips, handleidingen en kennis over eenheidsconversies, dataformaten en meer.",
    readMore: "Lees meer",
    backToBlog: "Terug naar blog",
    publishedOn: "Gepubliceerd op",
    categoryGuide: "Handleiding",
    categoryTips: "Tips",
    categoryKnowledge: "Kennis",
  },
  cookie: {
    message:
      "We gebruiken cookies om je ervaring te verbeteren. Door verder te gaan, ga je akkoord met ons cookiebeleid.",
    accept: "Accepteren",
    decline: "Weigeren",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Millimeter (mm)",
      mi: "Mijl (mi)", yd: "Yard (yd)", ft: "Voet (ft)", in: "Inch (in)",
      nm: "Zeemijl (nm)", "\u03BCm": "Micrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Milligram (mg)", lb: "Pond (lb)",
      oz: "Ounce (oz)", ton: "Metrieke ton (t)", st: "Stone (st)", ct: "Karaat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Vierkante meter (m\u00B2)", "km\u00B2": "Vierkante kilometer (km\u00B2)",
      ha: "Hectare (ha)", acre: "Acre", "ft\u00B2": "Vierkante voet (ft\u00B2)",
      "mi\u00B2": "Vierkante mijl (mi\u00B2)", "yd\u00B2": "Vierkante yard (yd\u00B2)",
      "cm\u00B2": "Vierkante centimeter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Milliliter (mL)", gal: "US Gallon (gal)",
      "fl oz": "US Fluid Ounce (fl oz)", cup: "US Kopje", pt: "US Pint (pt)",
      qt: "US Quart (qt)", "m\u00B3": "Kubieke meter (m\u00B3)",
      "cm\u00B3": "Kubieke centimeter (cm\u00B3)", tbsp: "Eetlepel (tbsp)", tsp: "Theelepel (tsp)",
    },
    speed: {
      "m/s": "Meter/sec (m/s)", "km/h": "Kilometer/u (km/h)", mph: "Mijl/u (mph)",
      kn: "Knoop (kn)", "ft/s": "Voet/sec (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milliseconde (ms)", s: "Seconde (s)", min: "Minuut (min)", h: "Uur (h)",
      d: "Dag (d)", wk: "Week (wk)", mo: "Maand (mo)", yr: "Jaar (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfeer (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Calorie (cal)", kcal: "Kilocalorie (kcal)",
      Wh: "Wattuur (Wh)", kWh: "Kilowattuur (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Paardenkracht (hp)",
      "BTU/h": "BTU/u", "cal/s": "Calorie/sec",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Graad (\u00B0)", rad: "Radiaal (rad)", grad: "Gradiaan (grad)",
      turn: "Omwenteling", arcmin: "Boogminuut (\u2032)", arcsec: "Boogseconde (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Kopje", tbsp: "Eetlepel", tsp: "Theelepel", mL: "Milliliter (mL)",
      L: "Liter (L)", fl_oz: "Fluid Ounce", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Ounce (oz)", lb: "Pond (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixels (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixels (px)", em: "Em (em)" },
    "px-percent": { px: "Pixels (px)", "%": "Procent (%)" },
    "css-unit": {
      px: "Pixels (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procent (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
