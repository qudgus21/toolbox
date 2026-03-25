import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Alle konverteringsverktøy du trenger",
    titleAccent: "konverteringsverktøy",
    description:
      "Konverter enheter, farger, dataformater, datoer og mer — direkte i nettleseren din.",
    tabAll: "Alle",
    categoryUnit: "Enheter",
    categoryNumber: "Tall",
    categoryColor: "Farger",
    categoryDatetime: "Dato/Tid",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Matlaging",
    categoryGeography: "Geografi",
    searchPlaceholder: "Søk etter konverteringsverktøy...",
    noResults: "Ingen konverteringsverktøy funnet.",
    recentTools: "Nylig brukt",
    favorites: "Favoritter",
    favDragHint: "Dra for å endre rekkefølge",
    favHint: "Klikk på stjernen for å legge til favoritter",
    gridView: "Rutenettvisning",
    listView: "Listevisning",
  },
  trust: {
    encryption: "Sikker behandling",
    encryptionDesc: "Alle konverteringer skjer lokalt i nettleseren din",
    autoDelete: "Ingen data lagres",
    autoDeleteDesc: "Dataene dine blir aldri lagret eller sendt til en server",
    free: "100 % gratis",
    freeDesc: "Ingen begrensninger, ingen registrering, ingen skjulte kostnader",
    browserProcessing: "Umiddelbare resultater",
    browserProcessingDesc: "Sanntidskonvertering mens du skriver",
  },
  tools: {
    length: {
      title: "Lengdekonverterer",
      description:
        "Konverter mellom meter, kilometer, miles, fot, tommer og mer.",
    },
    weight: {
      title: "Vektkonverterer",
      description:
        "Konverter mellom kilogram, pund, unser, tonn og mer.",
    },
    temperature: {
      title: "Temperaturkonverterer",
      description: "Konverter mellom Celsius, Fahrenheit og Kelvin.",
    },
    area: {
      title: "Arealkonverterer",
      description:
        "Konverter mellom kvadratmeter, hektar, acres, kvadratfot og mer.",
    },
    volume: {
      title: "Volumkonverterer",
      description:
        "Konverter mellom liter, gallons, kopper, fluid ounces og mer.",
    },
    speed: {
      title: "Hastighetskonverterer",
      description: "Konverter mellom m/s, km/t, mph, knop og mer.",
    },
    time: {
      title: "Tidskonverterer",
      description:
        "Konverter mellom sekunder, minutter, timer, dager, uker og mer.",
    },
    pressure: {
      title: "Trykkonverterer",
      description:
        "Konverter mellom Pascal, bar, PSI, atmosfære og mer.",
    },
    energy: {
      title: "Energikonverterer",
      description:
        "Konverter mellom joule, kalorier, kilowattimer, BTU og mer.",
    },
    power: {
      title: "Effektkonverterer",
      description:
        "Konverter mellom watt, kilowatt, hestekrefter og mer.",
    },
    frequency: {
      title: "Frekvenskonverterer",
      description:
        "Konverter mellom hertz, kilohertz, megahertz, gigahertz og RPM.",
    },
    angle: {
      title: "Vinkelkonverterer",
      description: "Konverter mellom grader, radianer, gradianer og omdreininger.",
    },
    "data-storage": {
      title: "Datalagringskonverterer",
      description:
        "Konverter mellom bytes, kilobytes, megabytes, gigabytes og mer.",
    },
    "fuel-economy": {
      title: "Drivstofforbrukskonverterer",
      description: "Konverter mellom km/L, mpg og L/100km.",
    },
    "number-base": {
      title: "Tallbasekonverterer",
      description:
        "Konverter mellom binær, oktal, desimal, heksadesimal og egendefinerte baser.",
    },
    "roman-numeral": {
      title: "Romertallkonverterer",
      description: "Konverter mellom romertall og arabiske tall.",
    },
    "scientific-notation": {
      title: "Vitenskapelig notasjon-konverterer",
      description:
        "Konverter mellom vitenskapelig notasjon og vanlige tall.",
    },
    "fraction-decimal": {
      title: "Brøk ↔ Desimaltall",
      description: "Konverter mellom brøker og desimaltall.",
    },
    percentage: {
      title: "Prosentkonverterer",
      description:
        "Konverter mellom brøker, desimaltall og prosent.",
    },
    "color-converter": {
      title: "Fargekonverterer",
      description:
        "Konverter mellom HEX, RGB, HSL, HSV og CMYK fargeformater.",
    },
    "color-palette-generator": {
      title: "Fargepalettgenerator",
      description:
        "Generer komplementære, triadiske og analoge fargepaletter.",
    },
    "gradient-generator": {
      title: "CSS-gradientgenerator",
      description:
        "Lag lineære, radiale og koniske CSS-gradienter med forhåndsvisning.",
    },
    "color-contrast-checker": {
      title: "Fargekontrastsjekker",
      description:
        "Sjekk WCAG AA/AAA fargekontrastforhold mellom to farger.",
    },
    "color-blindness-simulator": {
      title: "Fargeblindhetsimulator",
      description:
        "Simuler hvordan farger ser ut for personer med fargesynssvikt.",
    },
    timezone: {
      title: "Tidssonekonverterer",
      description:
        "Konverter tid mellom ulike tidssoner verden over.",
    },
    "unix-timestamp": {
      title: "Unix-tidsstempelkonverterer",
      description:
        "Konverter mellom Unix-tidsstempler og lesbare datoer.",
    },
    "date-format": {
      title: "Datoformatkonverterer",
      description:
        "Konverter datoer mellom ulike formater (ISO, US, EU og mer).",
    },
    "date-calculator": {
      title: "Datokalkulator",
      description:
        "Beregn forskjellen mellom datoer eller legg til/trekk fra dager.",
    },
    "age-calculator": {
      title: "Alderskalkulator",
      description:
        "Beregn nøyaktig alder fra fødselsdato i år, måneder og dager.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Konverter mellom JSON- og YAML-dataformater.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Konverter mellom JSON-arrays og CSV-regnearkformat.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Konverter mellom JSON- og XML-dataformater.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Konverter mellom JSON- og TOML-konfigurasjonsformater.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Konverter mellom Markdown- og HTML-markering.",
    },
    "csv-table": {
      title: "CSV til tabell",
      description: "Konverter CSV-data til Markdown- eller HTML-tabeller.",
    },
    "json-typescript": {
      title: "JSON til TypeScript",
      description: "Generer TypeScript-grensesnitt fra JSON-data.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Konverter mellom SQL INSERT-setninger og JSON-data.",
    },
    "px-rem": {
      title: "px ↔ rem-konverterer",
      description:
        "Konverter mellom piksler og rem-enheter med egendefinert grunnstørrelse.",
    },
    "px-em": {
      title: "px ↔ em-konverterer",
      description:
        "Konverter mellom piksler og em-enheter med egendefinert foreldrestørrelse.",
    },
    "px-percent": {
      title: "px ↔ %-konverterer",
      description:
        "Konverter mellom piksler og prosent med egendefinert containerbredde.",
    },
    "css-unit": {
      title: "CSS-enhetskonverterer",
      description:
        "Konverter mellom px, rem, em, %, vw, vh og andre CSS-enheter.",
    },
    "css-minifier": {
      title: "CSS Minifier / Beautifier",
      description:
        "Minifiser eller formater CSS-kode for produksjon eller lesbarhet.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Konverter mellom Tailwind CSS-klasser og vanlig CSS.",
    },
    "cooking-measurement": {
      title: "Matlagingsmålkonverterer",
      description:
        "Konverter mellom kopper, spiseskjeer, teskjeer, milliliter og gram.",
    },
    "recipe-scaler": {
      title: "Oppskriftsskalerer",
      description:
        "Skaler oppskriftsingredienser opp eller ned etter antall porsjoner.",
    },
    "oven-temperature": {
      title: "Ovnstemperaturkonverterer",
      description:
        "Konverter mellom Celsius, Fahrenheit og Gas Mark for ovnstemperaturer.",
    },
    coordinate: {
      title: "Koordinatkonverterer",
      description:
        "Konverter mellom DMS-, DD- og DDM-koordinatformater.",
    },
    "distance-calculator": {
      title: "Avstandskalkulator",
      description:
        "Beregn avstanden mellom to geografiske koordinater.",
    },
  },
  nav: {
    allTools: "Alle konverteringsverktøy",
    language: "Språk",
  },
  footer: {
    tools: "Konverteringsverktøy",
    legal: "Juridisk",
    privacy: "Personvernerklæring",
    terms: "Vilkår for bruk",
    copyright: "ToolPop. Alle rettigheter forbeholdt.",
    company: "Selskap",
    about: "Om oss",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Alle konverteringsverktøy",
    inputPlaceholder: "Skriv inn en verdi å konvertere...",
    outputLabel: "Resultat",
    copyToClipboard: "Kopier til utklippstavle",
    copied: "Kopiert!",
    clear: "Tøm",
    paste: "Lim inn",
    processing: "Konverterer...",
    startOver: "Start på nytt",
    process: "Konverter",
    tryAgain: "Prøv igjen",
    notImplemented: "Denne konvertereren kommer snart.",
    tryOtherTools: "Prøv andre konverteringsverktøy",
    privacyBadge: "Alle konverteringer skjer i nettleseren din",
    favoriteAdded: "Lagt til i favoritter",
    favoriteRemoved: "Fjernet fra favoritter",
    comingSoon: "Kommer snart",
    share: "Del",
    shareTitle: "Del denne konvertereren",
    shareSubtitle: "Del dette nyttige konverteringsverktøyet med andre",
    shareCopied: "Lenke kopiert!",
    shareCopyLink: "Kopier lenke",
    downloadAsFile: "Last ned",
    options: "Alternativer",
    input: "Inndata",
    output: "Resultat",
    convert: "Konverter",
    swap: "Bytt",
    from: "Fra",
    to: "Til",
    result: "Resultat",
    allConversions: "Alle konverteringer",
    details: "Detaljer",
    pageNotFound: "Konverteringsverktøyet ble ikke funnet",
    goHome: "Tilbake til alle konverteringsverktøy",
  },
  toolOptions: {
    fromUnit: "Fra",
    toUnit: "Til",
    precision: "Desimalplasser",
    baseSize: "Grunnstørrelse for font (px)",
    parentSize: "Foreldres fontstørrelse (px)",
    containerWidth: "Containerbredde (px)",
    viewportWidth: "Viewport-bredde (px)",
    viewportHeight: "Viewport-høyde (px)",
    direction: "Retning",
    mode: "Modus",
    ingredient: "Ingrediens",
    water: "Vann",
    flour: "Mel",
    sugar: "Sukker",
    butter: "Smør",
    rice: "Ris",
    milk: "Melk",
    originalServings: "Opprinnelige porsjoner",
    targetServings: "Ønskede porsjoner",
    fromTimezone: "Fra tidssone",
    toTimezone: "Til tidssone",
    inputFormat: "Inngangsformat",
    outputFormat: "Utgangsformat",
    harmony: "Fargeharmoni",
    complementary: "Komplementær",
    triadic: "Triadisk",
    analogous: "Analog",
    splitComplementary: "Delt komplementær",
    tetradic: "Tetradisk",
    gradientType: "Gradienttype",
    linear: "Lineær",
    radial: "Radial",
    conic: "Konisk",
    gradientAngle: "Vinkel (deg)",
    rootName: "Navn på rot-grensesnitt",
    tableName: "Tabellnavn",
    minify: "Minifiser",
    beautify: "Formater",
    colorType: "Type fargesvikt",
    protanopia: "Protanopi (mangler rødt)",
    deuteranopia: "Deuteranopi (mangler grønt)",
    tritanopia: "Tritanopi (mangler blått)",
    achromatopsia: "Akromatopsi (uten farge)",
    operation: "Operasjon",
    difference: "Forskjell",
    add: "Legg til",
    subtract: "Trekk fra",
    amount: "Mengde",
    unit: "Enhet",
    days: "Dager",
    weeks: "Uker",
    months: "Måneder",
    years: "År",
    fromBase: "Fra base",
    toBase: "Til base",
    binary: "Binær (2)",
    octal: "Oktal (8)",
    decimal: "Desimal (10)",
    hexadecimal: "Heksadesimal (16)",
    seconds: "Sekunder",
    milliseconds: "Millisekunder",
    autoDetect: "Oppdag automatisk",
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
    toRoman: "Tall → Romertall",
    toArabic: "Romertall → Tall",
    toScientific: "Standard → Vitenskapelig",
    toStandard: "Vitenskapelig → Standard",
    toFraction: "Desimal → Brøk",
    toDecimal: "Brøk → Desimal",
    decimalToPercent: "Desimal → Prosent",
    percentToDecimal: "Prosent → Desimal",
    fractionToPercent: "Brøk → Prosent",
    dd: "Desimalgrader (DD)",
    dms: "Grader Minutter Sekunder (DMS)",
    ddm: "Grader Desimalminutter (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Langt format",
    short: "Kort format",
    relative: "Relativ",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Bakgrunnsfarge",
    monochromatic: "Monokromatisk",
    timestampToDate: "Tidsstempel → Dato",
    dateToTimestamp: "Dato → Tidsstempel",
    showDetails: "Vis detaljert oversikt",
    addDays: "Legg til dager",
    subtractDays: "Trekk fra dager",
    datetimeHint: "f.eks. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Linjer",
    characters: "Tegn",
    rows: "Rader",
    columns: "Kolonner",
    elements: "Elementer",
    keys: "Nøkler",
    interfaces: "Grensesnitt",
    properties: "Egenskaper",
    originalSize: "Opprinnelig størrelse",
    resultSize: "Resultatstørrelse",
    savings: "Besparelse",
    ingredients: "Ingredienser",
    scaleFactor: "Skaleringsfaktor",
    contrastRatio: "Kontrastforhold",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Breddegrad",
    longitude: "Lengdegrad",
    distanceKm: "Avstand (km)",
    distanceMi: "Avstand (mi)",
    years: "År",
    months: "Måneder",
    days: "Dager",
  },
  processorMessages: {
    invalidTimezone: "Ugyldig tidssone",
    pass: "Bestått", fail: "Ikke bestått",
    fromNow: "fra nå", ago: "siden",
    today: "I dag", tomorrow: "I morgen", yesterday: "I går",
    seconds: "sekund", secondsPlural: "sekunder",
    minutes: "minutt", minutesPlural: "minutter",
    hours: "time", hoursPlural: "timer",
    daysUnit: "dag", daysPlural: "dager",
    weeksUnit: "uke", weeksPlural: "uker",
    monthsUnit: "måned", monthsPlural: "måneder",
    yearsUnit: "år", yearsPlural: "år",
    gasmark: "Gas Mark",
    veryCool: "Svært kjølig", cool: "Kjølig", moderatelyCool: "Moderat kjølig",
    moderate: "Moderat", moderatelyHot: "Moderat varm",
    hot: "Varm", veryHot: "Svært varm", extremelyHot: "Ekstremt varm",
    original: "Original",
    from: "Fra", to: "Til",
    totalDays: "Totalt dager", weeksDays: "Uker + Dager",
    originalDate: "Opprinnelig dato", operationLabel: "Operasjon",
    resultDate: "Resultatdato", dayOfWeek: "Ukedag",
    daysBetween: "Dager mellom",
    age: "Alder", totalMonths: "Totalt måneder",
    totalHours: "Totalt timer", totalMinutes: "Totalt minutter",
    nextBirthday: "Neste bursdag",
    roman: "Romertall", arabic: "Arabisk",
    scientific: "Vitenskapelig", standard: "Standard", engineering: "Teknisk",
    fraction: "Brøk", simplified: "Forenklet", percentage: "Prosent",
    color1: "Farge 1", color2: "Farge 2",
    contrastRatioLabel: "Kontrastforhold",
    aaNormalText: "AA Normal tekst", aaLargeText: "AA Stor tekst",
    aaaNormalText: "AAA Normal tekst", aaaLargeText: "AAA Stor tekst",
    gradientTypeLabel: "Type", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Gratis konverteringsverktøy på nett",
    siteDescription:
      "Konverter enheter, farger, dataformater, datoer og mer. Gratis, raskt og privat — alt kjører i nettleseren din.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blogg",
    description:
      "Tips, guider og kunnskap om enhetskonverteringer, dataformater og mer.",
    readMore: "Les mer",
    backToBlog: "Tilbake til bloggen",
    publishedOn: "Publisert",
    categoryGuide: "Guide",
    categoryTips: "Tips",
    categoryKnowledge: "Kunnskap",
  },
  cookie: {
    message:
      "Vi bruker informasjonskapsler for å forbedre opplevelsen din. Ved å fortsette godtar du vår policy for informasjonskapsler.",
    accept: "Godta",
    decline: "Avslå",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Millimeter (mm)",
      mi: "Mil (mi)", yd: "Yard (yd)", ft: "Fot (ft)", in: "Tomme (in)",
      nm: "Nautisk mil (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Milligram (mg)", lb: "Pund (lb)",
      oz: "Unse (oz)", ton: "Metrisk tonn (t)", st: "Stone (st)", ct: "Karat (ct)",
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
      qt: "US Quart (qt)", "m\u00B3": "Kubikkmeter (m\u00B3)",
      "cm\u00B3": "Kubikkcentimeter (cm\u00B3)", tbsp: "Spiseskje (tbsp)", tsp: "Teskje (tsp)",
    },
    speed: {
      "m/s": "Meter/sek (m/s)", "km/h": "Kilometer/t (km/h)", mph: "Mil/t (mph)",
      kn: "Knop (kn)", "ft/s": "Fot/sek (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekund (ms)", s: "Sekund (s)", min: "Minutt (min)", h: "Time (h)",
      d: "Dag (d)", wk: "Uke (wk)", mo: "Måned (mo)", yr: "År (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfære (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalori (cal)", kcal: "Kilokalori (kcal)",
      Wh: "Wattime (Wh)", kWh: "Kilowattime (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Hestekraft (hp)",
      "BTU/h": "BTU/t", "cal/s": "Kalori/sek",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grad (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Omdreining", arcmin: "Bueminutt (\u2032)", arcsec: "Buesekund (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Kopp", tbsp: "Spiseskje", tsp: "Teskje", mL: "Milliliter (mL)",
      L: "Liter (L)", fl_oz: "Fluid Ounce", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Unse (oz)", lb: "Pund (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Piksler (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Piksler (px)", em: "Em (em)" },
    "px-percent": { px: "Piksler (px)", "%": "Prosent (%)" },
    "css-unit": {
      px: "Piksler (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Prosent (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
