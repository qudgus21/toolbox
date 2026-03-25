import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Alle Konverter, die Sie brauchen",
    titleAccent: "Konverter",
    description:
      "Einheiten, Farben, Datenformate, Daten und mehr — direkt im Browser umrechnen.",
    tabAll: "Alle",
    categoryUnit: "Einheiten",
    categoryNumber: "Zahlen",
    categoryColor: "Farben",
    categoryDatetime: "Datum/Zeit",
    categoryData: "Daten",
    categoryCss: "CSS",
    categoryCooking: "Kochen",
    categoryGeography: "Geografie",
    searchPlaceholder: "Konverter suchen...",
    noResults: "Keine Konverter gefunden.",
    recentTools: "Zuletzt verwendet",
    favorites: "Favoriten",
    favDragHint: "Ziehen zum Sortieren",
    favHint: "Stern anklicken, um Favoriten hinzuzufügen",
    gridView: "Rasteransicht",
    listView: "Listenansicht",
  },
  trust: {
    encryption: "Sichere Verarbeitung",
    encryptionDesc: "Alle Umrechnungen erfolgen lokal in Ihrem Browser",
    autoDelete: "Keine Datenspeicherung",
    autoDeleteDesc: "Ihre Eingaben werden weder gespeichert noch an einen Server gesendet",
    free: "100% kostenlos",
    freeDesc: "Keine Limits, keine Anmeldung, keine versteckten Kosten",
    browserProcessing: "Sofortige Ergebnisse",
    browserProcessingDesc: "Echtzeit-Umrechnung während der Eingabe",
  },
  tools: {
    length: {
      title: "Längenumrechner",
      description:
        "Umrechnung zwischen Metern, Kilometern, Meilen, Fuß, Zoll und mehr.",
    },
    weight: {
      title: "Gewichtsumrechner",
      description:
        "Umrechnung zwischen Kilogramm, Pfund, Unzen, Tonnen und mehr.",
    },
    temperature: {
      title: "Temperaturumrechner",
      description: "Umrechnung zwischen Celsius, Fahrenheit und Kelvin.",
    },
    area: {
      title: "Flächenumrechner",
      description:
        "Umrechnung zwischen Quadratmetern, Hektar, Acres, Quadratfuß und mehr.",
    },
    volume: {
      title: "Volumenumrechner",
      description:
        "Umrechnung zwischen Litern, Gallonen, Tassen, Flüssigunzen und mehr.",
    },
    speed: {
      title: "Geschwindigkeitsumrechner",
      description: "Umrechnung zwischen m/s, km/h, mph, Knoten und mehr.",
    },
    time: {
      title: "Zeitumrechner",
      description:
        "Umrechnung zwischen Sekunden, Minuten, Stunden, Tagen, Wochen und mehr.",
    },
    pressure: {
      title: "Druckumrechner",
      description:
        "Umrechnung zwischen Pascal, Bar, PSI, Atmosphäre und mehr.",
    },
    energy: {
      title: "Energieumrechner",
      description:
        "Umrechnung zwischen Joule, Kalorien, Kilowattstunden, BTU und mehr.",
    },
    power: {
      title: "Leistungsumrechner",
      description:
        "Umrechnung zwischen Watt, Kilowatt, Pferdestärken und mehr.",
    },
    frequency: {
      title: "Frequenzumrechner",
      description:
        "Umrechnung zwischen Hertz, Kilohertz, Megahertz, Gigahertz und RPM.",
    },
    angle: {
      title: "Winkelumrechner",
      description: "Umrechnung zwischen Grad, Radiant, Gon und Umdrehungen.",
    },
    "data-storage": {
      title: "Datenspeicherumrechner",
      description:
        "Umrechnung zwischen Bytes, Kilobytes, Megabytes, Gigabytes und mehr.",
    },
    "fuel-economy": {
      title: "Verbrauchsumrechner",
      description: "Umrechnung zwischen km/L, mpg und L/100km.",
    },
    "number-base": {
      title: "Zahlensystemumrechner",
      description:
        "Umrechnung zwischen Binär, Oktal, Dezimal, Hexadezimal und benutzerdefinierten Basen.",
    },
    "roman-numeral": {
      title: "Römische Zahlen",
      description: "Umrechnung zwischen römischen und arabischen Zahlen.",
    },
    "scientific-notation": {
      title: "Wissenschaftliche Notation",
      description:
        "Umrechnung zwischen wissenschaftlicher Notation und Standardzahlen.",
    },
    "fraction-decimal": {
      title: "Bruch ↔ Dezimal",
      description: "Umrechnung zwischen Brüchen und Dezimalzahlen.",
    },
    percentage: {
      title: "Prozentumrechner",
      description:
        "Umrechnung zwischen Brüchen, Dezimalzahlen und Prozenten.",
    },
    "color-converter": {
      title: "Farbumrechner",
      description:
        "Umrechnung zwischen HEX, RGB, HSL, HSV und CMYK Farbformaten.",
    },
    "color-palette-generator": {
      title: "Farbpaletten-Generator",
      description:
        "Erzeugen Sie komplementäre, triadische und analoge Farbpaletten.",
    },
    "gradient-generator": {
      title: "CSS-Verlaufsgenerator",
      description:
        "Erstellen Sie lineare, radiale und konische CSS-Verläufe mit Live-Vorschau.",
    },
    "color-contrast-checker": {
      title: "Farbkontrast-Prüfer",
      description:
        "Prüfen Sie das WCAG AA/AAA-Kontrastverhältnis zwischen zwei Farben.",
    },
    "color-blindness-simulator": {
      title: "Farbenblindheitssimulator",
      description:
        "Simulieren Sie, wie Farben bei Farbsehschwäche wahrgenommen werden.",
    },
    timezone: {
      title: "Zeitzonen-Umrechner",
      description:
        "Uhrzeiten zwischen verschiedenen Zeitzonen weltweit umrechnen.",
    },
    "unix-timestamp": {
      title: "Unix-Zeitstempel-Umrechner",
      description:
        "Umrechnung zwischen Unix-Zeitstempeln und lesbaren Datumsangaben.",
    },
    "date-format": {
      title: "Datumsformat-Umrechner",
      description:
        "Umrechnung zwischen verschiedenen Datumsformaten (ISO, US, EU und mehr).",
    },
    "date-calculator": {
      title: "Datumsrechner",
      description:
        "Berechnen Sie den Unterschied zwischen Daten oder addieren/subtrahieren Sie Tage.",
    },
    "age-calculator": {
      title: "Altersrechner",
      description:
        "Berechnen Sie das genaue Alter ab dem Geburtsdatum in Jahren, Monaten und Tagen.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Umrechnung zwischen JSON- und YAML-Datenformaten.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Umrechnung zwischen JSON-Arrays und CSV-Tabellenformat.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Umrechnung zwischen JSON- und XML-Datenformaten.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Umrechnung zwischen JSON- und TOML-Konfigurationsformaten.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Umrechnung zwischen Markdown und HTML.",
    },
    "csv-table": {
      title: "CSV zu Tabelle",
      description: "CSV-Daten in Markdown- oder HTML-Tabellen umwandeln.",
    },
    "json-typescript": {
      title: "JSON zu TypeScript",
      description: "TypeScript-Interfaces aus JSON-Daten generieren.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Umrechnung zwischen SQL-INSERT-Anweisungen und JSON-Daten.",
    },
    "px-rem": {
      title: "px ↔ rem Umrechner",
      description:
        "Umrechnung zwischen Pixeln und rem-Einheiten mit benutzerdefinierter Basisgröße.",
    },
    "px-em": {
      title: "px ↔ em Umrechner",
      description:
        "Umrechnung zwischen Pixeln und em-Einheiten mit benutzerdefinierter Elterngröße.",
    },
    "px-percent": {
      title: "px ↔ % Umrechner",
      description:
        "Umrechnung zwischen Pixeln und Prozent mit benutzerdefinierter Containerbreite.",
    },
    "css-unit": {
      title: "CSS-Einheitenumrechner",
      description:
        "Umrechnung zwischen px, rem, em, %, vw, vh und anderen CSS-Einheiten.",
    },
    "css-minifier": {
      title: "CSS-Minifier / Beautifier",
      description:
        "CSS-Code für die Produktion minifizieren oder für die Lesbarkeit formatieren.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Umrechnung zwischen Tailwind-CSS-Klassen und Vanilla-CSS.",
    },
    "cooking-measurement": {
      title: "Kochmaße-Umrechner",
      description:
        "Umrechnung zwischen Tassen, Esslöffeln, Teelöffeln, Millilitern und Gramm.",
    },
    "recipe-scaler": {
      title: "Rezept-Skalierung",
      description:
        "Zutaten eines Rezepts je nach Portionsgröße hoch- oder runterskalieren.",
    },
    "oven-temperature": {
      title: "Ofentemperatur-Umrechner",
      description:
        "Umrechnung zwischen Celsius, Fahrenheit und Gasstufe für Ofentemperaturen.",
    },
    coordinate: {
      title: "Koordinaten-Umrechner",
      description:
        "Umrechnung zwischen DMS-, DD- und DDM-Koordinatenformaten.",
    },
    "distance-calculator": {
      title: "Entfernungsrechner",
      description:
        "Berechnen Sie die Entfernung zwischen zwei geografischen Koordinaten.",
    },
  },
  nav: {
    allTools: "Alle Konverter",
    language: "Sprache",
  },
  footer: {
    tools: "Konverter",
    legal: "Rechtliches",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    copyright: "ToolPop. All rights reserved.",
    company: "Unternehmen",
    about: "Über uns",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Alle Konverter",
    inputPlaceholder: "Wert zur Umrechnung eingeben...",
    outputLabel: "Ergebnis",
    copyToClipboard: "In die Zwischenablage kopieren",
    copied: "Kopiert!",
    clear: "Löschen",
    paste: "Einfügen",
    processing: "Umrechnung...",
    startOver: "Neu beginnen",
    process: "Umrechnen",
    tryAgain: "Erneut versuchen",
    notImplemented: "Dieser Konverter ist in Kürze verfügbar.",
    tryOtherTools: "Andere Konverter ausprobieren",
    privacyBadge: "Alle Umrechnungen erfolgen in Ihrem Browser",
    favoriteAdded: "Zu Favoriten hinzugefügt",
    favoriteRemoved: "Aus Favoriten entfernt",
    comingSoon: "Demnächst verfügbar",
    share: "Teilen",
    shareTitle: "Diesen Konverter teilen",
    shareSubtitle: "Teilen Sie diesen nützlichen Konverter mit anderen",
    shareCopied: "Link kopiert!",
    shareCopyLink: "Link kopieren",
    downloadAsFile: "Herunterladen",
    options: "Optionen",
    input: "Eingabe",
    output: "Ausgabe",
    convert: "Umrechnen",
    swap: "Tauschen",
    from: "Von",
    to: "Nach",
    result: "Ergebnis",
    allConversions: "Alle Umrechnungen",
    details: "Details",
    pageNotFound: "Konverter nicht gefunden",
    goHome: "Zurück zu allen Konvertern",
  },
  toolOptions: {
    fromUnit: "Von",
    toUnit: "Nach",
    precision: "Dezimalstellen",
    baseSize: "Basis-Schriftgröße (px)",
    parentSize: "Eltern-Schriftgröße (px)",
    containerWidth: "Containerbreite (px)",
    viewportWidth: "Viewport-Breite (px)",
    viewportHeight: "Viewport-Höhe (px)",
    direction: "Richtung",
    mode: "Modus",
    ingredient: "Zutat",
    water: "Wasser",
    flour: "Mehl",
    sugar: "Zucker",
    butter: "Butter",
    rice: "Reis",
    milk: "Milch",
    originalServings: "Ursprüngliche Portionen",
    targetServings: "Gewünschte Portionen",
    fromTimezone: "Ausgangs-Zeitzone",
    toTimezone: "Ziel-Zeitzone",
    inputFormat: "Eingabeformat",
    outputFormat: "Ausgabeformat",
    harmony: "Farbharmonie",
    complementary: "Komplementär",
    triadic: "Triadisch",
    analogous: "Analog",
    splitComplementary: "Gespalten komplementär",
    tetradic: "Tetradisch",
    gradientType: "Verlaufstyp",
    linear: "Linear",
    radial: "Radial",
    conic: "Konisch",
    gradientAngle: "Winkel (deg)",
    rootName: "Name des Root-Interface",
    tableName: "Tabellenname",
    minify: "Minifizieren",
    beautify: "Formatieren",
    colorType: "Art der Sehschwäche",
    protanopia: "Protanopie (kein Rot)",
    deuteranopia: "Deuteranopie (kein Grün)",
    tritanopia: "Tritanopie (kein Blau)",
    achromatopsia: "Achromatopsie (keine Farbe)",
    operation: "Operation",
    difference: "Differenz",
    add: "Addieren",
    subtract: "Subtrahieren",
    amount: "Menge",
    unit: "Einheit",
    days: "Tage",
    weeks: "Wochen",
    months: "Monate",
    years: "Jahre",
    fromBase: "Ausgangsbasis",
    toBase: "Zielbasis",
    binary: "Binär (2)",
    octal: "Oktal (8)",
    decimal: "Dezimal (10)",
    hexadecimal: "Hexadezimal (16)",
    seconds: "Sekunden",
    milliseconds: "Millisekunden",
    autoDetect: "Automatisch erkennen",
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
    markdown: "Markdown-Tabelle",
    html: "HTML-Tabelle",
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
    toRoman: "Zahl → Römisch",
    toArabic: "Römisch → Zahl",
    toScientific: "Standard → Wissenschaftlich",
    toStandard: "Wissenschaftlich → Standard",
    toFraction: "Dezimal → Bruch",
    toDecimal: "Bruch → Dezimal",
    decimalToPercent: "Dezimal → Prozent",
    percentToDecimal: "Prozent → Dezimal",
    fractionToPercent: "Bruch → Prozent",
    dd: "Decimal Degrees (DD)",
    dms: "Degrees Minutes Seconds (DMS)",
    ddm: "Degrees Decimal Minutes (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Langformat",
    short: "Kurzformat",
    relative: "Relativ",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Hintergrundfarbe",
    monochromatic: "Monochromatisch",
    timestampToDate: "Zeitstempel → Datum",
    dateToTimestamp: "Datum → Zeitstempel",
    showDetails: "Detaillierte Aufschlüsselung anzeigen",
    addDays: "Tage addieren",
    subtractDays: "Tage subtrahieren",
    datetimeHint: "z. B. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Zeilen",
    characters: "Zeichen",
    rows: "Zeilen",
    columns: "Spalten",
    elements: "Elemente",
    keys: "Schlüssel",
    interfaces: "Interfaces",
    properties: "Eigenschaften",
    originalSize: "Originalgröße",
    resultSize: "Ergebnisgröße",
    savings: "Ersparnis",
    ingredients: "Zutaten",
    scaleFactor: "Skalierungsfaktor",
    contrastRatio: "Kontrastverhältnis",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Breitengrad",
    longitude: "Längengrad",
    distanceKm: "Entfernung (km)",
    distanceMi: "Entfernung (mi)",
    years: "Jahre",
    months: "Monate",
    days: "Tage",
  },
  processorMessages: {
    invalidTimezone: "Ungültige Zeitzone",
    pass: "Bestanden", fail: "Nicht bestanden",
    fromNow: "ab jetzt", ago: "vor",
    today: "Heute", tomorrow: "Morgen", yesterday: "Gestern",
    seconds: "Sekunde", secondsPlural: "Sekunden",
    minutes: "Minute", minutesPlural: "Minuten",
    hours: "Stunde", hoursPlural: "Stunden",
    daysUnit: "Tag", daysPlural: "Tage",
    weeksUnit: "Woche", weeksPlural: "Wochen",
    monthsUnit: "Monat", monthsPlural: "Monate",
    yearsUnit: "Jahr", yearsPlural: "Jahre",
    gasmark: "Gas Mark",
    veryCool: "Sehr kühl", cool: "Kühl", moderatelyCool: "Mäßig kühl",
    moderate: "Mäßig", moderatelyHot: "Mäßig heiß",
    hot: "Heiß", veryHot: "Sehr heiß", extremelyHot: "Extrem heiß",
    original: "Original",
    from: "Von", to: "Nach",
    totalDays: "Gesamttage", weeksDays: "Wochen + Tage",
    originalDate: "Ursprungsdatum", operationLabel: "Operation",
    resultDate: "Ergebnisdatum", dayOfWeek: "Wochentag",
    daysBetween: "Tage dazwischen",
    age: "Alter", totalMonths: "Gesamtmonate",
    totalHours: "Gesamtstunden", totalMinutes: "Gesamtminuten",
    nextBirthday: "Nächster Geburtstag",
    roman: "Römisch", arabic: "Arabisch",
    scientific: "Wissenschaftlich", standard: "Standard", engineering: "Ingenieurformat",
    fraction: "Bruch", simplified: "Vereinfacht", percentage: "Prozent",
    color1: "Farbe 1", color2: "Farbe 2",
    contrastRatioLabel: "Kontrastverhältnis",
    aaNormalText: "AA Normaltext", aaLargeText: "AA Großer Text",
    aaaNormalText: "AAA Normaltext", aaaLargeText: "AAA Großer Text",
    gradientTypeLabel: "Typ", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Konverter — Kostenlose Online-Umrechner",
    siteDescription:
      "Einheiten, Farben, Datenformate, Daten und mehr umrechnen. Kostenlos, schnell und privat — alles läuft in Ihrem Browser.",
    toolTitleSuffix: "| ToolPop Konverter",
  },
  blog: {
    title: "Blog",
    description:
      "Tipps, Anleitungen und Wissen rund um Einheitenumrechnung, Datenformate und mehr.",
    readMore: "Weiterlesen",
    backToBlog: "Zurück zum Blog",
    publishedOn: "Veröffentlicht am",
    categoryGuide: "Anleitung",
    categoryTips: "Tipps",
    categoryKnowledge: "Wissen",
  },
  cookie: {
    message:
      "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch die weitere Nutzung stimmen Sie unserer Cookie-Richtlinie zu.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Zentimeter (cm)", mm: "Millimeter (mm)",
      mi: "Meile (mi)", yd: "Yard (yd)", ft: "Fuß (ft)", in: "Zoll (in)",
      nm: "Seemeile (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogramm (kg)", g: "Gramm (g)", mg: "Milligramm (mg)", lb: "Pfund (lb)",
      oz: "Unze (oz)", ton: "Metrische Tonne (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Quadratmeter (m\u00B2)", "km\u00B2": "Quadratkilometer (km\u00B2)",
      ha: "Hektar (ha)", acre: "Acre", "ft\u00B2": "Quadratfuß (ft\u00B2)",
      "mi\u00B2": "Quadratmeile (mi\u00B2)", "yd\u00B2": "Quadratyard (yd\u00B2)",
      "cm\u00B2": "Quadratzentimeter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Milliliter (mL)", gal: "US-Gallone (gal)",
      "fl oz": "US-Flüssigunze (fl oz)", cup: "US-Tasse", pt: "US-Pinte (pt)",
      qt: "US-Quart (qt)", "m\u00B3": "Kubikmeter (m\u00B3)",
      "cm\u00B3": "Kubikzentimeter (cm\u00B3)", tbsp: "Esslöffel (tbsp)", tsp: "Teelöffel (tsp)",
    },
    speed: {
      "m/s": "Meter/Sek. (m/s)", "km/h": "Kilometer/Std. (km/h)", mph: "Meile/Std. (mph)",
      kn: "Knoten (kn)", "ft/s": "Fuß/Sek. (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekunde (ms)", s: "Sekunde (s)", min: "Minute (min)", h: "Stunde (h)",
      d: "Tag (d)", wk: "Woche (wk)", mo: "Monat (mo)", yr: "Jahr (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosphäre (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalorie (cal)", kcal: "Kilokalorie (kcal)",
      Wh: "Wattstunde (Wh)", kWh: "Kilowattstunde (kWh)", BTU: "BTU", eV: "Elektronenvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Pferdestärke (hp)",
      "BTU/h": "BTU/Std.", "cal/s": "Kalorie/Sek.",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grad (\u00B0)", rad: "Radiant (rad)", grad: "Gon (grad)",
      turn: "Umdrehung", arcmin: "Bogenminute (\u2032)", arcsec: "Bogensekunde (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Tasse", tbsp: "Esslöffel", tsp: "Teelöffel", mL: "Milliliter (mL)",
      L: "Liter (L)", fl_oz: "Flüssigunze", g: "Gramm (g)", kg: "Kilogramm (kg)",
      oz: "Unze (oz)", lb: "Pfund (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixel (px)", em: "Em (em)" },
    "px-percent": { px: "Pixel (px)", "%": "Prozent (%)" },
    "css-unit": {
      px: "Pixel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Prozent (%)", vw: "Viewport-Breite (vw)", vh: "Viewport-Höhe (vh)",
    },
  },
};

export default dict;
