import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Alla konverteringsverktyg du behöver",
    titleAccent: "konverterings",
    description:
      "Konvertera enheter, färger, dataformat, datum och mer. Allt direkt i webbläsaren.",
    tabAll: "Alla",
    categoryUnit: "Enheter",
    categoryNumber: "Tal",
    categoryColor: "Färger",
    categoryDatetime: "Datum/Tid",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Matlagning",
    categoryGeography: "Geografi",
    searchPlaceholder: "Sök konverterare...",
    noResults: "Inga konverterare hittades.",
    recentTools: "Senast använda",
    favorites: "Favoriter",
    favDragHint: "Dra för att ordna om",
    favHint: "Klicka på stjärnan för att lägga till favoriter",
    gridView: "Rutnätsvy",
    listView: "Listvy",
  },
  trust: {
    encryption: "Säker bearbetning",
    encryptionDesc: "Alla konverteringar sker lokalt i din webbläsare",
    autoDelete: "Ingen data sparas",
    autoDeleteDesc: "Din indata sparas aldrig eller skickas till en server",
    free: "100 % gratis",
    freeDesc: "Inga begränsningar, ingen registrering, inga dolda avgifter",
    browserProcessing: "Omedelbart resultat",
    browserProcessingDesc: "Realtidskonvertering medan du skriver",
  },
  tools: {
    length: {
      title: "Längdkonverterare",
      description:
        "Konvertera mellan meter, kilometer, miles, fot, tum och mer.",
    },
    weight: {
      title: "Viktkonverterare",
      description:
        "Konvertera mellan kilogram, pund, ounces, ton och mer.",
    },
    temperature: {
      title: "Temperaturkonverterare",
      description: "Konvertera mellan Celsius, Fahrenheit och Kelvin.",
    },
    area: {
      title: "Ytkonverterare",
      description:
        "Konvertera mellan kvadratmeter, hektar, acres, kvadratfot och mer.",
    },
    volume: {
      title: "Volymkonverterare",
      description:
        "Konvertera mellan liter, gallons, koppar, fluid ounces och mer.",
    },
    speed: {
      title: "Hastighetskonverterare",
      description: "Konvertera mellan m/s, km/h, mph, knop och mer.",
    },
    time: {
      title: "Tidskonverterare",
      description:
        "Konvertera mellan sekunder, minuter, timmar, dagar, veckor och mer.",
    },
    pressure: {
      title: "Tryckkonverterare",
      description:
        "Konvertera mellan Pascal, bar, PSI, atmosfär och mer.",
    },
    energy: {
      title: "Energikonverterare",
      description:
        "Konvertera mellan joule, kalorier, kilowattimmar, BTU och mer.",
    },
    power: {
      title: "Effektkonverterare",
      description:
        "Konvertera mellan watt, kilowatt, hästkrafter och mer.",
    },
    frequency: {
      title: "Frekvenskonverterare",
      description:
        "Konvertera mellan hertz, kilohertz, megahertz, gigahertz och RPM.",
    },
    angle: {
      title: "Vinkelkonverterare",
      description: "Konvertera mellan grader, radianer, gradianer och varv.",
    },
    "data-storage": {
      title: "Datalagringskonverterare",
      description:
        "Konvertera mellan bytes, kilobytes, megabytes, gigabytes och mer.",
    },
    "fuel-economy": {
      title: "Bränsleförbrukningskonverterare",
      description: "Konvertera mellan km/L, mpg och L/100km.",
    },
    "number-base": {
      title: "Talsystemskonverterare",
      description:
        "Konvertera mellan binärt, oktalt, decimalt, hexadecimalt och andra talsystem.",
    },
    "roman-numeral": {
      title: "Romerska siffror",
      description: "Konvertera mellan romerska och arabiska siffror.",
    },
    "scientific-notation": {
      title: "Vetenskaplig notation",
      description:
        "Konvertera mellan vetenskaplig notation och standardtal.",
    },
    "fraction-decimal": {
      title: "Bråk ↔ Decimal",
      description: "Konvertera mellan bråk och decimaltal.",
    },
    percentage: {
      title: "Procentkonverterare",
      description:
        "Konvertera mellan bråk, decimaltal och procent.",
    },
    "color-converter": {
      title: "Färgkonverterare",
      description:
        "Konvertera mellan HEX, RGB, HSL, HSV och CMYK-färgformat.",
    },
    "color-palette-generator": {
      title: "Färgpalettgenerator",
      description:
        "Generera komplementära, triadiska och analoga färgpaletter.",
    },
    "gradient-generator": {
      title: "CSS-gradientgenerator",
      description:
        "Skapa linjära, radiella och koniska CSS-gradienter med förhandsgranskning.",
    },
    "color-contrast-checker": {
      title: "Färgkontrastkontroll",
      description:
        "Kontrollera WCAG AA/AAA-kontrastförhållandet mellan två färger.",
    },
    "color-blindness-simulator": {
      title: "Färgblindhetssimulator",
      description:
        "Simulera hur färger uppfattas av personer med nedsatt färgseende.",
    },
    timezone: {
      title: "Tidszonskonverterare",
      description:
        "Konvertera tid mellan olika tidszoner världen över.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp-konverterare",
      description:
        "Konvertera mellan Unix-tidsstämplar och läsbara datum.",
    },
    "date-format": {
      title: "Datumformatkonverterare",
      description:
        "Konvertera datum mellan ISO, US, EU och andra format.",
    },
    "date-calculator": {
      title: "Datumkalkylator",
      description:
        "Beräkna skillnaden mellan datum eller lägg till/dra ifrån dagar.",
    },
    "age-calculator": {
      title: "Ålderskalkylator",
      description:
        "Beräkna exakt ålder från födelsedatum i år, månader och dagar.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Konvertera mellan JSON- och YAML-dataformat.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Konvertera mellan JSON-arrayer och CSV-kalkylbladsformat.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Konvertera mellan JSON- och XML-dataformat.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Konvertera mellan JSON- och TOML-konfigurationsformat.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Konvertera mellan Markdown och HTML.",
    },
    "csv-table": {
      title: "CSV till tabell",
      description: "Konvertera CSV-data till Markdown- eller HTML-tabeller.",
    },
    "json-typescript": {
      title: "JSON till TypeScript",
      description: "Generera TypeScript-gränssnitt från JSON-data.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Konvertera mellan SQL INSERT-satser och JSON-data.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Konvertera mellan pixlar och rem med anpassad basstorlek.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Konvertera mellan pixlar och em med anpassad förälderstorlek.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Konvertera mellan pixlar och procent med anpassad containerbredd.",
    },
    "css-unit": {
      title: "CSS-enhetskonverterare",
      description:
        "Konvertera mellan px, rem, em, %, vw, vh och andra CSS-enheter.",
    },
    "css-minifier": {
      title: "CSS-minifierare / formaterare",
      description:
        "Minifiera eller formatera CSS-kod för produktion eller läsbarhet.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Konvertera mellan Tailwind CSS-klasser och vanlig CSS.",
    },
    "cooking-measurement": {
      title: "Matmåttskonverterare",
      description:
        "Konvertera mellan koppar, matskedar, teskedar, milliliter och gram.",
    },
    "recipe-scaler": {
      title: "Receptskalare",
      description:
        "Skala upp eller ner receptingredienser efter antal portioner.",
    },
    "oven-temperature": {
      title: "Ugnstemperaturkonverterare",
      description:
        "Konvertera ugnstemperatur mellan Celsius, Fahrenheit och Gas Mark.",
    },
    coordinate: {
      title: "Koordinatkonverterare",
      description:
        "Konvertera mellan DMS-, DD- och DDM-koordinatformat.",
    },
    "distance-calculator": {
      title: "Avståndskalkylator",
      description:
        "Beräkna avståndet mellan två geografiska koordinater.",
    },
  },
  nav: {
    allTools: "Alla konverterare",
    language: "Språk",
  },
  footer: {
    tools: "Konverterare",
    legal: "Juridiskt",
    privacy: "Integritetspolicy",
    terms: "Användarvillkor",
    copyright: "ToolPop. Alla rättigheter förbehållna.",
    company: "Företag",
    about: "Om oss",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Alla konverterare",
    inputPlaceholder: "Ange ett värde att konvertera...",
    outputLabel: "Resultat",
    copyToClipboard: "Kopiera",
    copied: "Kopierat!",
    clear: "Rensa",
    paste: "Klistra in",
    processing: "Konverterar...",
    startOver: "Börja om",
    process: "Konvertera",
    tryAgain: "Försök igen",
    notImplemented: "Den här konverteraren kommer snart.",
    tryOtherTools: "Prova andra konverterare",
    privacyBadge: "Alla konverteringar sker i din webbläsare",
    favoriteAdded: "Tillagd i favoriter",
    favoriteRemoved: "Borttagen från favoriter",
    comingSoon: "Kommer snart",
    share: "Dela",
    shareTitle: "Dela den här konverteraren",
    shareSubtitle: "Dela den här användbara konverteraren med andra",
    shareCopied: "Länk kopierad!",
    shareCopyLink: "Kopiera länk",
    downloadAsFile: "Ladda ner",
    options: "Alternativ",
    input: "Indata",
    output: "Utdata",
    convert: "Konvertera",
    swap: "Byt",
    from: "Från",
    to: "Till",
    result: "Resultat",
    allConversions: "Alla konverteringar",
    details: "Detaljer",
    pageNotFound: "Konverteraren hittades inte",
    goHome: "Tillbaka till alla konverterare",
  },
  toolOptions: {
    fromUnit: "Från",
    toUnit: "Till",
    precision: "Decimaler",
    baseSize: "Bastypsnittsstorlek (px)",
    parentSize: "Förälders typsnittsstorlek (px)",
    containerWidth: "Containerbredd (px)",
    viewportWidth: "Viewportbredd (px)",
    viewportHeight: "Viewporthöjd (px)",
    direction: "Riktning",
    mode: "Läge",
    ingredient: "Ingrediens",
    water: "Vatten",
    flour: "Mjöl",
    sugar: "Socker",
    butter: "Smör",
    rice: "Ris",
    milk: "Mjölk",
    originalServings: "Ursprungliga portioner",
    targetServings: "Önskade portioner",
    fromTimezone: "Från tidszon",
    toTimezone: "Till tidszon",
    inputFormat: "Indataformat",
    outputFormat: "Utdataformat",
    harmony: "Färgharmoni",
    complementary: "Komplementär",
    triadic: "Triadisk",
    analogous: "Analog",
    splitComplementary: "Delad komplementär",
    tetradic: "Tetradisk",
    gradientType: "Gradienttyp",
    linear: "Linjär",
    radial: "Radiell",
    conic: "Konisk",
    gradientAngle: "Vinkel (deg)",
    rootName: "Namn på rotgränssnitt",
    tableName: "Tabellnamn",
    minify: "Minifiera",
    beautify: "Formatera",
    colorType: "Typ av synfel",
    protanopia: "Protanopi (inget rött)",
    deuteranopia: "Deuteranopi (inget grönt)",
    tritanopia: "Tritanopi (inget blått)",
    achromatopsia: "Akromatopsi (ingen färg)",
    operation: "Operation",
    difference: "Skillnad",
    add: "Lägg till",
    subtract: "Dra ifrån",
    amount: "Antal",
    unit: "Enhet",
    days: "Dagar",
    weeks: "Veckor",
    months: "Månader",
    years: "År",
    fromBase: "Från bas",
    toBase: "Till bas",
    binary: "Binärt (2)",
    octal: "Oktalt (8)",
    decimal: "Decimalt (10)",
    hexadecimal: "Hexadecimalt (16)",
    seconds: "Sekunder",
    milliseconds: "Millisekunder",
    autoDetect: "Identifiera automatiskt",
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
    markdown: "Markdown-tabell",
    html: "HTML-tabell",
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
    toRoman: "Tal → Romerskt",
    toArabic: "Romerskt → Tal",
    toScientific: "Standard → Vetenskaplig",
    toStandard: "Vetenskaplig → Standard",
    toFraction: "Decimal → Bråk",
    toDecimal: "Bråk → Decimal",
    decimalToPercent: "Decimal → Procent",
    percentToDecimal: "Procent → Decimal",
    fractionToPercent: "Bråk → Procent",
    dd: "Decimalgrader (DD)",
    dms: "Grader minuter sekunder (DMS)",
    ddm: "Grader decimalminuter (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/ÅÅÅÅ)",
    eu: "EU (DD/MM/ÅÅÅÅ)",
    long: "Långt format",
    short: "Kort format",
    relative: "Relativt",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Bakgrundsfärg",
    monochromatic: "Monokromatisk",
    timestampToDate: "Tidsstämpel → Datum",
    dateToTimestamp: "Datum → Tidsstämpel",
    showDetails: "Visa detaljerad uppdelning",
    addDays: "Lägg till dagar",
    subtractDays: "Dra ifrån dagar",
    datetimeHint: "t.ex. 2024-01-15, 1705312200, now",
    endDate: "Slutdatum",
    today: "Idag (standard)",
    dateUnit: "Enhet",
  },
  statsLabels: {
    lines: "Rader",
    characters: "Tecken",
    rows: "Rader",
    columns: "Kolumner",
    elements: "Element",
    keys: "Nycklar",
    interfaces: "Gränssnitt",
    properties: "Egenskaper",
    originalSize: "Originalstorlek",
    resultSize: "Resultatstorlek",
    savings: "Besparing",
    ingredients: "Ingredienser",
    scaleFactor: "Skalfaktor",
    contrastRatio: "Kontrastförhållande",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitud",
    longitude: "Longitud",
    distanceKm: "Avstånd (km)",
    distanceMi: "Avstånd (mi)",
    years: "År",
    months: "Månader",
    days: "Dagar",
  },
  processorMessages: {
    invalidTimezone: "Ogiltig tidszon",
    pass: "Godkänd", fail: "Underkänd",
    fromNow: "från nu", ago: "sedan",
    today: "Idag", tomorrow: "Imorgon", yesterday: "Igår",
    seconds: "sekund", secondsPlural: "sekunder",
    minutes: "minut", minutesPlural: "minuter",
    hours: "timme", hoursPlural: "timmar",
    daysUnit: "dag", daysPlural: "dagar",
    weeksUnit: "vecka", weeksPlural: "veckor",
    monthsUnit: "månad", monthsPlural: "månader",
    yearsUnit: "år", yearsPlural: "år",
    gasmark: "Gas Mark",
    veryCool: "Mycket svalt", cool: "Svalt", moderatelyCool: "Måttligt svalt",
    moderate: "Måttligt", moderatelyHot: "Måttligt varmt",
    hot: "Varmt", veryHot: "Mycket varmt", extremelyHot: "Extremt varmt",
    original: "Original",
    from: "Från", to: "Till",
    totalDays: "Totalt dagar", weeksDays: "Veckor + Dagar",
    originalDate: "Ursprungligt datum", operationLabel: "Operation",
    resultDate: "Resultatdatum", dayOfWeek: "Veckodag",
    daysBetween: "Dagar emellan",
    age: "Ålder", totalMonths: "Totalt månader",
    totalHours: "Totalt timmar", totalMinutes: "Totalt minuter",
    nextBirthday: "Nästa födelsedag",
    roman: "Romersk", arabic: "Arabisk",
    scientific: "Vetenskaplig", standard: "Standard", engineering: "Teknisk",
    fraction: "Bråk", simplified: "Förenklat", percentage: "Procent",
    color1: "Färg 1", color2: "Färg 2",
    contrastRatioLabel: "Kontrastförhållande",
    aaNormalText: "AA Normal text", aaLargeText: "AA Stor text",
    aaaNormalText: "AAA Normal text", aaaLargeText: "AAA Stor text",
    gradientTypeLabel: "Typ", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Gratis konverterare online",
    siteDescription:
      "Konvertera enheter, färger, dataformat, datum och mer. Gratis, snabbt och privat — allt körs i din webbläsare.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blogg",
    description:
      "Tips, guider och kunskap om enhetskonverteringar, dataformat och mer.",
    readMore: "Läs mer",
    backToBlog: "Tillbaka till bloggen",
    publishedOn: "Publicerad",
    categoryGuide: "Guide",
    categoryTips: "Tips",
    categoryKnowledge: "Kunskap",
  },
  cookie: {
    message:
      "Vi använder cookies för att förbättra din upplevelse. Genom att fortsätta godkänner du vår cookiepolicy.",
    accept: "Godkänn",
    decline: "Avböj",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Millimeter (mm)",
      mi: "Mil (mi)", yd: "Yard (yd)", ft: "Fot (ft)", in: "Tum (in)",
      nm: "Sjömil (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Milligram (mg)", lb: "Pund (lb)",
      oz: "Ounce (oz)", ton: "Metriskt ton (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Kvadratmeter (m\u00B2)", "km\u00B2": "Kvadratkilometer (km\u00B2)",
      ha: "Hektar (ha)", acre: "Acre", "ft\u00B2": "Kvadratfot (ft\u00B2)",
      "mi\u00B2": "Kvadratmil (mi\u00B2)", "yd\u00B2": "Kvadratyard (yd\u00B2)",
      "cm\u00B2": "Kvadratcentimeter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Milliliter (mL)", gal: "US Gallon (gal)",
      "fl oz": "US Fluid Ounce (fl oz)", cup: "US Kopp", pt: "US Pint (pt)",
      qt: "US Quart (qt)", "m\u00B3": "Kubikmeter (m\u00B3)",
      "cm\u00B3": "Kubikcentimeter (cm\u00B3)", tbsp: "Matsked (tbsp)", tsp: "Tesked (tsp)",
    },
    speed: {
      "m/s": "Meter/sek (m/s)", "km/h": "Kilometer/h (km/h)", mph: "Mil/h (mph)",
      kn: "Knop (kn)", "ft/s": "Fot/sek (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekund (ms)", s: "Sekund (s)", min: "Minut (min)", h: "Timme (h)",
      d: "Dag (d)", wk: "Vecka (wk)", mo: "Månad (mo)", yr: "År (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfär (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalori (cal)", kcal: "Kilokalori (kcal)",
      Wh: "Wattimme (Wh)", kWh: "Kilowattimme (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Hästkraft (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kalori/sek",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grad (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Varv", arcmin: "Bågminut (\u2032)", arcsec: "Bågsekund (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Kopp", tbsp: "Matsked", tsp: "Tesked", mL: "Milliliter (mL)",
      L: "Liter (L)", fl_oz: "Fluid Ounce", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Ounce (oz)", lb: "Pund (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixlar (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixlar (px)", em: "Em (em)" },
    "px-percent": { px: "Pixlar (px)", "%": "Procent (%)" },
    "css-unit": {
      px: "Pixlar (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procent (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
