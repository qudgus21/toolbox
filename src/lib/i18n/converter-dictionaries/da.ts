import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Alle konverteringsværktøjer du har brug for",
    titleAccent: "konverterings",
    description:
      "Konverter enheder, farver, dataformater, datoer og mere. Alt sker direkte i din browser.",
    tabAll: "Alle",
    categoryUnit: "Enheder",
    categoryNumber: "Tal",
    categoryColor: "Farver",
    categoryDatetime: "Dato/Tid",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Madlavning",
    categoryGeography: "Geografi",
    searchPlaceholder: "Søg efter konvertere...",
    noResults: "Ingen konvertere fundet.",
    recentTools: "Senest brugte",
    favorites: "Favoritter",
    favDragHint: "Træk for at ændre rækkefølge",
    favHint: "Klik på stjernen for at tilføje til favoritter",
    gridView: "Gittervisning",
    listView: "Listevisning",
  },
  trust: {
    encryption: "Sikker behandling",
    encryptionDesc: "Alle konverteringer sker lokalt i din browser",
    autoDelete: "Ingen data gemmes",
    autoDeleteDesc: "Dit input gemmes aldrig eller sendes til en server",
    free: "100% gratis",
    freeDesc: "Ingen begrænsninger, ingen tilmelding, ingen skjulte gebyrer",
    browserProcessing: "Øjeblikkelige resultater",
    browserProcessingDesc: "Konvertering i realtid mens du skriver",
  },
  tools: {
    length: {
      title: "Længdekonverter",
      description:
        "Konvertér mellem meter, kilometer, miles, fod, tommer og meget mere.",
    },
    weight: {
      title: "Vægtkonverter",
      description:
        "Konvertér mellem kilogram, pund, ounces, tons og meget mere.",
    },
    temperature: {
      title: "Temperaturkonverter",
      description: "Konvertér mellem Celsius, Fahrenheit og Kelvin.",
    },
    area: {
      title: "Arealkonverter",
      description:
        "Konvertér mellem kvadratmeter, hektar, acres, kvadratfod og meget mere.",
    },
    volume: {
      title: "Volumenkonverter",
      description:
        "Konvertér mellem liter, galloner, kopper, fluid ounces og meget mere.",
    },
    speed: {
      title: "Hastighedskonverter",
      description: "Konvertér mellem m/s, km/t, mph, knob og meget mere.",
    },
    time: {
      title: "Tidskonverter",
      description:
        "Konvertér mellem sekunder, minutter, timer, dage, uger og meget mere.",
    },
    pressure: {
      title: "Trykkonverter",
      description:
        "Konvertér mellem Pascal, bar, PSI, atmosfære og meget mere.",
    },
    energy: {
      title: "Energikonverter",
      description:
        "Konvertér mellem joule, kalorier, kilowatttimer, BTU og meget mere.",
    },
    power: {
      title: "Effektkonverter",
      description:
        "Konvertér mellem watt, kilowatt, hestekræfter og meget mere.",
    },
    frequency: {
      title: "Frekvenskonverter",
      description:
        "Konvertér mellem hertz, kilohertz, megahertz, gigahertz og RPM.",
    },
    angle: {
      title: "Vinkelkonverter",
      description: "Konvertér mellem grader, radianer, gradianer og omdrejninger.",
    },
    "data-storage": {
      title: "Datalagringskonverter",
      description:
        "Konvertér mellem bytes, kilobytes, megabytes, gigabytes og meget mere.",
    },
    "fuel-economy": {
      title: "Brændstofforbrugskonverter",
      description: "Konvertér mellem km/L, mpg og L/100km.",
    },
    "number-base": {
      title: "Talbasekonverter",
      description:
        "Konvertér mellem binære, oktale, decimale, hexadecimale og brugerdefinerede talbaser.",
    },
    "roman-numeral": {
      title: "Romertalkonverter",
      description: "Konvertér mellem romertal og arabiske tal.",
    },
    "scientific-notation": {
      title: "Videnskabelig notation",
      description:
        "Konvertér mellem videnskabelig notation og standardtal.",
    },
    "fraction-decimal": {
      title: "Brøk ↔ Decimal",
      description: "Konvertér mellem brøker og decimaltal.",
    },
    percentage: {
      title: "Procentkonverter",
      description:
        "Konvertér mellem brøker, decimaltal og procenter.",
    },
    "color-converter": {
      title: "Farvekonverter",
      description:
        "Konvertér mellem HEX, RGB, HSL, HSV og CMYK farveformater.",
    },
    "color-palette-generator": {
      title: "Farvepaletgenerator",
      description:
        "Generér komplementære, triadiske og analoge farvepaletter.",
    },
    "gradient-generator": {
      title: "CSS gradientgenerator",
      description:
        "Opret lineære, radiale og koniske CSS gradienter med live forhåndsvisning.",
    },
    "color-contrast-checker": {
      title: "Farvekontrasttjekker",
      description:
        "Tjek WCAG AA/AAA farvekontrastforhold mellem to farver.",
    },
    "color-blindness-simulator": {
      title: "Farveblindhedssimulator",
      description:
        "Simulér hvordan farver ser ud for personer med farvesynsdefekter.",
    },
    timezone: {
      title: "Tidszonekonverter",
      description:
        "Konvertér tid mellem forskellige tidszoner verden over.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp konverter",
      description:
        "Konvertér mellem Unix tidsstempler og læsbare datoer.",
    },
    "date-format": {
      title: "Datoformatkonverter",
      description:
        "Konvertér datoer mellem forskellige formater (ISO, US, EU og flere).",
    },
    "date-calculator": {
      title: "Datoregner",
      description:
        "Beregn forskellen mellem datoer eller tilføj/fratræk dage.",
    },
    "age-calculator": {
      title: "Aldersberegner",
      description:
        "Beregn præcis alder fra fødselsdato i år, måneder og dage.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Konvertér mellem JSON og YAML dataformater.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Konvertér mellem JSON arrays og CSV regnearkformat.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Konvertér mellem JSON og XML dataformater.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Konvertér mellem JSON og TOML konfigurationsformater.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Konvertér mellem Markdown og HTML markup.",
    },
    "csv-table": {
      title: "CSV til tabel",
      description: "Konvertér CSV data til Markdown eller HTML tabeller.",
    },
    "json-typescript": {
      title: "JSON til TypeScript",
      description: "Generér TypeScript interfaces fra JSON data.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Konvertér mellem SQL INSERT sætninger og JSON data.",
    },
    "px-rem": {
      title: "px ↔ rem konverter",
      description:
        "Konvertér mellem pixels og rem enheder med tilpasset basisstørrelse.",
    },
    "px-em": {
      title: "px ↔ em konverter",
      description:
        "Konvertér mellem pixels og em enheder med tilpasset overordnet størrelse.",
    },
    "px-percent": {
      title: "px ↔ % konverter",
      description:
        "Konvertér mellem pixels og procent med tilpasset containerbredde.",
    },
    "css-unit": {
      title: "CSS enhedskonverter",
      description:
        "Konvertér mellem px, rem, em, %, vw, vh og andre CSS enheder.",
    },
    "css-minifier": {
      title: "CSS minifikator / formatering",
      description:
        "Minificér eller formatér CSS kode til produktion eller læsbarhed.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Konvertér mellem Tailwind CSS klasser og almindelig CSS.",
    },
    "cooking-measurement": {
      title: "Køkkenmålkonverter",
      description:
        "Konvertér mellem kopper, spiseskeer, teskeer, milliliter og gram.",
    },
    "recipe-scaler": {
      title: "Opskriftskalering",
      description:
        "Skalér opskriftsingredienser op eller ned efter portionsstørrelse.",
    },
    "oven-temperature": {
      title: "Ovntemperaturkonverter",
      description:
        "Konvertér mellem Celsius, Fahrenheit og Gas Mark til ovntemperaturer.",
    },
    coordinate: {
      title: "Koordinatkonverter",
      description:
        "Konvertér mellem DMS, DD og DDM koordinatformater.",
    },
    "distance-calculator": {
      title: "Afstandsberegner",
      description:
        "Beregn afstanden mellem to geografiske koordinater.",
    },
  },
  nav: {
    allTools: "Alle konverteringsværktøjer",
    language: "Sprog",
  },
  footer: {
    tools: "Konvertere",
    legal: "Juridisk",
    privacy: "Privatlivspolitik",
    terms: "Vilkår for brug",
    copyright: "ToolPop. Alle rettigheder forbeholdes.",
    company: "Virksomhed",
    about: "Om os",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Alle konvertere",
    inputPlaceholder: "Indtast en værdi til konvertering...",
    outputLabel: "Resultat",
    copyToClipboard: "Kopiér til udklipsholder",
    copied: "Kopieret!",
    clear: "Ryd",
    paste: "Indsæt",
    processing: "Konverterer...",
    startOver: "Start forfra",
    process: "Konvertér",
    tryAgain: "Prøv igen",
    notImplemented: "Denne konverter kommer snart.",
    tryOtherTools: "Prøv andre konvertere",
    privacyBadge: "Alle konverteringer sker i din browser",
    favoriteAdded: "Tilføjet til favoritter",
    favoriteRemoved: "Fjernet fra favoritter",
    comingSoon: "Kommer snart",
    share: "Del",
    shareTitle: "Del denne konverter",
    shareSubtitle: "Del denne nyttige konverter med andre",
    shareCopied: "Link kopieret!",
    shareCopyLink: "Kopiér link",
    downloadAsFile: "Hent som fil",
    options: "Indstillinger",
    input: "Input",
    output: "Output",
    convert: "Konvertér",
    swap: "Byt om",
    from: "Fra",
    to: "Til",
    result: "Resultat",
    allConversions: "Alle konverteringer",
    details: "Detaljer",
    pageNotFound: "Konverter ikke fundet",
    goHome: "Tilbage til alle konvertere",
    colorPickerLabel: "Farvevælger",
  },
  toolOptions: {
    fromUnit: "Fra",
    toUnit: "Til",
    precision: "Decimaler",
    baseSize: "Basis skriftstørrelse (px)",
    parentSize: "Overordnet skriftstørrelse (px)",
    containerWidth: "Containerbredde (px)",
    viewportWidth: "Viewportbredde (px)",
    viewportHeight: "Viewporthøjde (px)",
    direction: "Retning",
    mode: "Tilstand",
    ingredient: "Ingrediens",
    water: "Vand",
    flour: "Mel",
    sugar: "Sukker",
    butter: "Smør",
    rice: "Ris",
    milk: "Mælk",
    originalServings: "Originale portioner",
    targetServings: "Ønskede portioner",
    fromTimezone: "Fra tidszone",
    toTimezone: "Til tidszone",
    inputFormat: "Inputformat",
    outputFormat: "Outputformat",
    harmony: "Farveharmoni",
    complementary: "Komplementær",
    triadic: "Triadisk",
    analogous: "Analog",
    splitComplementary: "Splitkomplementær",
    tetradic: "Tetradisk",
    gradientType: "Gradienttype",
    linear: "Lineær",
    radial: "Radial",
    conic: "Konisk",
    gradientAngle: "Vinkel (deg)",
    rootName: "Rod-interfacenavn",
    tableName: "Tabelnavn",
    minify: "Minificér",
    beautify: "Formatér",
    colorType: "Defekttype",
    protanopia: "Protanopi (ingen rød)",
    deuteranopia: "Deuteranopi (ingen grøn)",
    tritanopia: "Tritanopi (ingen blå)",
    achromatopsia: "Akromatopsi (ingen farve)",
    operation: "Operation",
    difference: "Forskel",
    add: "Tilføj",
    subtract: "Fratræk",
    amount: "Mængde",
    unit: "Enhed",
    days: "Dage",
    weeks: "Uger",
    months: "Måneder",
    years: "År",
    fromBase: "Fra base",
    toBase: "Til base",
    binary: "Binær (2)",
    octal: "Oktal (8)",
    decimal: "Decimal (10)",
    hexadecimal: "Hexadecimal (16)",
    seconds: "Sekunder",
    milliseconds: "Millisekunder",
    autoDetect: "Automatisk",
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
    toRoman: "Tal → Romertal",
    toArabic: "Romertal → Tal",
    toScientific: "Standard → Videnskabelig",
    toStandard: "Videnskabelig → Standard",
    toFraction: "Decimal → Brøk",
    toDecimal: "Brøk → Decimal",
    decimalToPercent: "Decimal → Procent",
    percentToDecimal: "Procent → Decimal",
    fractionToPercent: "Brøk → Procent",
    dd: "Decimalgrader (DD)",
    dms: "Grader minutter sekunder (DMS)",
    ddm: "Grader decimalminutter (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Langt format",
    short: "Kort format",
    relative: "Relativ",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Baggrundsfarve",
    monochromatic: "Monokromatisk",
    timestampToDate: "Tidsstempel → Dato",
    dateToTimestamp: "Dato → Tidsstempel",
    showDetails: "Vis detaljeret opdeling",
    addDays: "Tilføj dage",
    subtractDays: "Fratræk dage",
    datetimeHint: "f.eks. 2024-01-15, 1705312200, now",
    endDate: "Slutdato",
    today: "I dag (standard)",
    dateUnit: "Enhed",
  },
  statsLabels: {
    lines: "Linjer",
    characters: "Tegn",
    rows: "Rækker",
    columns: "Kolonner",
    elements: "Elementer",
    keys: "Nøgler",
    interfaces: "Interfaces",
    properties: "Egenskaber",
    originalSize: "Original størrelse",
    resultSize: "Resultatstørrelse",
    savings: "Besparelse",
    ingredients: "Ingredienser",
    scaleFactor: "Skaleringsfaktor",
    contrastRatio: "Kontrastforhold",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Breddegrad",
    longitude: "Længdegrad",
    distanceKm: "Afstand (km)",
    distanceMi: "Afstand (mi)",
    years: "År",
    months: "Måneder",
    days: "Dage",
  },
  processorMessages: {
    invalidTimezone: "Ugyldig tidszone",
    pass: "Bestået", fail: "Ikke bestået",
    fromNow: "fra nu", ago: "siden",
    today: "I dag", tomorrow: "I morgen", yesterday: "I går",
    seconds: "sekund", secondsPlural: "sekunder",
    minutes: "minut", minutesPlural: "minutter",
    hours: "time", hoursPlural: "timer",
    daysUnit: "dag", daysPlural: "dage",
    weeksUnit: "uge", weeksPlural: "uger",
    monthsUnit: "måned", monthsPlural: "måneder",
    yearsUnit: "år", yearsPlural: "år",
    gasmark: "Gas Mark",
    veryCool: "Meget kølig", cool: "Kølig", moderatelyCool: "Moderat kølig",
    moderate: "Moderat", moderatelyHot: "Moderat varm",
    hot: "Varm", veryHot: "Meget varm", extremelyHot: "Ekstremt varm",
    gasMark: "Gas Mark",
    original: "Original",
    from: "Fra", to: "Til",
    totalDays: "Dage i alt", weeksDays: "Uger + Dage",
    originalDate: "Oprindelig dato", operationLabel: "Operation",
    resultDate: "Resultatdato", dayOfWeek: "Ugedag",
    daysBetween: "Dage imellem",
    age: "Alder", totalMonths: "Måneder i alt",
    totalHours: "Timer i alt", totalMinutes: "Minutter i alt",
    nextBirthday: "Næste fødselsdag",
    roman: "Romertal", arabic: "Arabisk",
    scientific: "Videnskabelig", standard: "Standard", engineering: "Teknisk",
    fraction: "Brøk", simplified: "Forenklet", percentage: "Procent",
    color1: "Farve 1", color2: "Farve 2",
    contrastRatioLabel: "Kontrastforhold",
    aaNormalText: "AA Normal tekst", aaLargeText: "AA Stor tekst",
    aaaNormalText: "AAA Normal tekst", aaaLargeText: "AAA Stor tekst",
    gradientTypeLabel: "Type", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Gratis online konvertere",
    siteDescription:
      "Konvertér enheder, farver, dataformater, datoer og meget mere. Gratis, hurtigt og privat — alt kører i din browser.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Tips, vejledninger og viden om enhedskonvertering, dataformater og meget mere.",
    readMore: "Læs mere",
    backToBlog: "Tilbage til bloggen",
    publishedOn: "Udgivet",
    categoryGuide: "Vejledning",
    categoryTips: "Tips",
    categoryKnowledge: "Viden",
  },
  cookie: {
    message:
      "Vi bruger cookies for at forbedre din oplevelse. Ved at fortsætte accepterer du vores cookiepolitik.",
    accept: "Acceptér",
    decline: "Afvis",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Millimeter (mm)",
      mi: "Mil (mi)", yd: "Yard (yd)", ft: "Fod (ft)", in: "Tomme (in)",
      nm: "Sømil (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Milligram (mg)", lb: "Pund (lb)",
      oz: "Ounce (oz)", ton: "Metrisk ton (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Kvadratmeter (m\u00B2)", "km\u00B2": "Kvadratkilometer (km\u00B2)",
      ha: "Hektar (ha)", acre: "Acre", "ft\u00B2": "Kvadratfod (ft\u00B2)",
      "mi\u00B2": "Kvadratmil (mi\u00B2)", "yd\u00B2": "Kvadratyard (yd\u00B2)",
      "cm\u00B2": "Kvadratcentimeter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Milliliter (mL)", gal: "US Gallon (gal)",
      "fl oz": "US Fluid Ounce (fl oz)", cup: "US Kop", pt: "US Pint (pt)",
      qt: "US Quart (qt)", "m\u00B3": "Kubikmeter (m\u00B3)",
      "cm\u00B3": "Kubikcentimeter (cm\u00B3)", tbsp: "Spiseske (tbsp)", tsp: "Teske (tsp)",
    },
    speed: {
      "m/s": "Meter/sek (m/s)", "km/h": "Kilometer/t (km/h)", mph: "Mil/t (mph)",
      kn: "Knob (kn)", "ft/s": "Fod/sek (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekund (ms)", s: "Sekund (s)", min: "Minut (min)", h: "Time (h)",
      d: "Dag (d)", wk: "Uge (wk)", mo: "Måned (mo)", yr: "År (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfære (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalorie (cal)", kcal: "Kilokalorie (kcal)",
      Wh: "Watttime (Wh)", kWh: "Kilowatttime (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Hestekraft (hp)",
      "BTU/h": "BTU/t", "cal/s": "Kalorie/sek",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grad (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Omdrejning", arcmin: "Bueminut (\u2032)", arcsec: "Buesekund (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Kop", tbsp: "Spiseske", tsp: "Teske", mL: "Milliliter (mL)",
      L: "Liter (L)", fl_oz: "Fluid Ounce", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Ounce (oz)", lb: "Pund (lb)",
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
