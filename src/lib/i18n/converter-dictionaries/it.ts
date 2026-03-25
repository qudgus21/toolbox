import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Tutti i convertitori di cui hai bisogno",
    titleAccent: "convertitori",
    description:
      "Converti unità, colori, formati dati, date e altro ancora, direttamente nel browser.",
    tabAll: "Tutti",
    categoryUnit: "Unità",
    categoryNumber: "Numeri",
    categoryColor: "Colori",
    categoryDatetime: "Data/Ora",
    categoryData: "Dati",
    categoryCss: "CSS",
    categoryCooking: "Cucina",
    categoryGeography: "Geografia",
    searchPlaceholder: "Cerca convertitori...",
    noResults: "Nessun convertitore trovato.",
    recentTools: "Usati di recente",
    favorites: "Preferiti",
    favDragHint: "Trascina per riordinare",
    favHint: "Clicca sulla stella per aggiungere ai preferiti",
    gridView: "Vista a griglia",
    listView: "Vista a elenco",
  },
  trust: {
    encryption: "Elaborazione sicura",
    encryptionDesc: "Tutte le conversioni avvengono localmente nel tuo browser",
    autoDelete: "Nessun dato archiviato",
    autoDeleteDesc: "I tuoi dati non vengono mai salvati né inviati a un server",
    free: "100% gratuito",
    freeDesc: "Nessun limite, nessuna registrazione, nessun costo nascosto",
    browserProcessing: "Risultati istantanei",
    browserProcessingDesc: "Conversione in tempo reale mentre digiti",
  },
  tools: {
    length: {
      title: "Convertitore di lunghezza",
      description:
        "Converti tra metri, chilometri, miglia, piedi, pollici e altro.",
    },
    weight: {
      title: "Convertitore di peso",
      description:
        "Converti tra chilogrammi, libbre, once, tonnellate e altro.",
    },
    temperature: {
      title: "Convertitore di temperatura",
      description: "Converti tra Celsius, Fahrenheit e Kelvin.",
    },
    area: {
      title: "Convertitore di superficie",
      description:
        "Converti tra metri quadrati, ettari, acri, piedi quadrati e altro.",
    },
    volume: {
      title: "Convertitore di volume",
      description:
        "Converti tra litri, galloni, tazze, once liquide e altro.",
    },
    speed: {
      title: "Convertitore di velocità",
      description: "Converti tra m/s, km/h, mph, nodi e altro.",
    },
    time: {
      title: "Convertitore di tempo",
      description:
        "Converti tra secondi, minuti, ore, giorni, settimane e altro.",
    },
    pressure: {
      title: "Convertitore di pressione",
      description:
        "Converti tra Pascal, bar, PSI, atmosfera e altro.",
    },
    energy: {
      title: "Convertitore di energia",
      description:
        "Converti tra joule, calorie, kilowattora, BTU e altro.",
    },
    power: {
      title: "Convertitore di potenza",
      description:
        "Converti tra watt, kilowatt, cavalli vapore e altro.",
    },
    frequency: {
      title: "Convertitore di frequenza",
      description:
        "Converti tra hertz, kilohertz, megahertz, gigahertz e RPM.",
    },
    angle: {
      title: "Convertitore di angoli",
      description: "Converti tra gradi, radianti, gradienti e giri.",
    },
    "data-storage": {
      title: "Convertitore di archiviazione",
      description:
        "Converti tra byte, kilobyte, megabyte, gigabyte e altro.",
    },
    "fuel-economy": {
      title: "Convertitore di consumo carburante",
      description: "Converti tra km/L, mpg e L/100km.",
    },
    "number-base": {
      title: "Convertitore di basi numeriche",
      description:
        "Converti tra binario, ottale, decimale, esadecimale e basi personalizzate.",
    },
    "roman-numeral": {
      title: "Convertitore di numeri romani",
      description: "Converti tra numeri romani e numeri arabi.",
    },
    "scientific-notation": {
      title: "Convertitore di notazione scientifica",
      description:
        "Converti tra notazione scientifica e numeri standard.",
    },
    "fraction-decimal": {
      title: "Frazione ↔ Decimale",
      description: "Converti tra frazioni e numeri decimali.",
    },
    percentage: {
      title: "Convertitore di percentuali",
      description:
        "Converti tra frazioni, decimali e percentuali.",
    },
    "color-converter": {
      title: "Convertitore di colori",
      description:
        "Converti tra i formati colore HEX, RGB, HSL, HSV e CMYK.",
    },
    "color-palette-generator": {
      title: "Generatore di palette",
      description:
        "Genera palette di colori complementari, triadici e analoghi.",
    },
    "gradient-generator": {
      title: "Generatore di sfumature CSS",
      description:
        "Crea sfumature CSS lineari, radiali e coniche con anteprima dal vivo.",
    },
    "color-contrast-checker": {
      title: "Verificatore di contrasto",
      description:
        "Verifica il rapporto di contrasto WCAG AA/AAA tra due colori.",
    },
    "color-blindness-simulator": {
      title: "Simulatore di daltonismo",
      description:
        "Simula come i colori appaiono alle persone con deficit della visione cromatica.",
    },
    timezone: {
      title: "Convertitore di fuso orario",
      description:
        "Converti l'ora tra diversi fusi orari nel mondo.",
    },
    "unix-timestamp": {
      title: "Convertitore Unix timestamp",
      description:
        "Converti tra timestamp Unix e date leggibili.",
    },
    "date-format": {
      title: "Convertitore di formato data",
      description:
        "Converti date tra diversi formati (ISO, US, EU e altro).",
    },
    "date-calculator": {
      title: "Calcolatore di date",
      description:
        "Calcola la differenza tra date o aggiungi/sottrai giorni.",
    },
    "age-calculator": {
      title: "Calcolatore di età",
      description:
        "Calcola l'età esatta dalla data di nascita in anni, mesi e giorni.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Converti tra i formati dati JSON e YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Converti tra array JSON e formato foglio di calcolo CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Converti tra i formati dati JSON e XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Converti tra i formati di configurazione JSON e TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Converti tra Markdown e HTML.",
    },
    "csv-table": {
      title: "CSV in tabella",
      description: "Converti dati CSV in tabelle Markdown o HTML.",
    },
    "json-typescript": {
      title: "JSON in TypeScript",
      description: "Genera interfacce TypeScript da dati JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Converti tra istruzioni SQL INSERT e dati JSON.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Converti tra pixel e unità rem con dimensione base personalizzata.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Converti tra pixel e unità em con dimensione genitore personalizzata.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Converti tra pixel e percentuale con larghezza contenitore personalizzata.",
    },
    "css-unit": {
      title: "Convertitore di unità CSS",
      description:
        "Converti tra px, rem, em, %, vw, vh e altre unità CSS.",
    },
    "css-minifier": {
      title: "Minificatore / Formattatore CSS",
      description:
        "Minifica o formatta codice CSS per produzione o leggibilità.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Converti tra classi Tailwind CSS e CSS standard.",
    },
    "cooking-measurement": {
      title: "Convertitore di misure da cucina",
      description:
        "Converti tra tazze, cucchiai, cucchiaini, millilitri e grammi.",
    },
    "recipe-scaler": {
      title: "Ridimensionatore di ricette",
      description:
        "Ridimensiona gli ingredienti di una ricetta in base al numero di porzioni.",
    },
    "oven-temperature": {
      title: "Convertitore di temperatura del forno",
      description:
        "Converti tra Celsius, Fahrenheit e Gas Mark per le temperature del forno.",
    },
    coordinate: {
      title: "Convertitore di coordinate",
      description:
        "Converti tra i formati di coordinate DMS, DD e DDM.",
    },
    "distance-calculator": {
      title: "Calcolatore di distanza",
      description:
        "Calcola la distanza tra due coordinate geografiche.",
    },
  },
  nav: {
    allTools: "Tutti i convertitori",
    language: "Lingua",
  },
  footer: {
    tools: "Convertitori",
    legal: "Note legali",
    privacy: "Informativa sulla privacy",
    terms: "Termini di servizio",
    copyright: "ToolPop. All rights reserved.",
    company: "Azienda",
    about: "Chi siamo",
    contact: "Contatti",
    faq: "FAQ",
  },
  common: {
    backToAll: "Tutti i convertitori",
    inputPlaceholder: "Inserisci un valore da convertire...",
    outputLabel: "Risultato",
    copyToClipboard: "Copia negli appunti",
    copied: "Copiato!",
    clear: "Cancella",
    paste: "Incolla",
    processing: "Conversione...",
    startOver: "Ricomincia",
    process: "Converti",
    tryAgain: "Riprova",
    notImplemented: "Questo convertitore sarà disponibile a breve.",
    tryOtherTools: "Prova altri convertitori",
    privacyBadge: "Tutte le conversioni avvengono nel tuo browser",
    favoriteAdded: "Aggiunto ai preferiti",
    favoriteRemoved: "Rimosso dai preferiti",
    comingSoon: "In arrivo",
    share: "Condividi",
    shareTitle: "Condividi questo convertitore",
    shareSubtitle: "Condividi questo utile convertitore con altri",
    shareCopied: "Link copiato!",
    shareCopyLink: "Copia link",
    downloadAsFile: "Scarica",
    options: "Opzioni",
    input: "Input",
    output: "Output",
    convert: "Converti",
    swap: "Inverti",
    from: "Da",
    to: "A",
    result: "Risultato",
    allConversions: "Tutte le conversioni",
    details: "Dettagli",
    pageNotFound: "Convertitore non trovato",
    goHome: "Torna a tutti i convertitori",
  },
  toolOptions: {
    fromUnit: "Da",
    toUnit: "A",
    precision: "Cifre decimali",
    baseSize: "Dimensione font base (px)",
    parentSize: "Dimensione font genitore (px)",
    containerWidth: "Larghezza contenitore (px)",
    viewportWidth: "Larghezza viewport (px)",
    viewportHeight: "Altezza viewport (px)",
    direction: "Direzione",
    mode: "Modalità",
    ingredient: "Ingrediente",
    water: "Acqua",
    flour: "Farina",
    sugar: "Zucchero",
    butter: "Burro",
    rice: "Riso",
    milk: "Latte",
    originalServings: "Porzioni originali",
    targetServings: "Porzioni desiderate",
    fromTimezone: "Fuso orario di origine",
    toTimezone: "Fuso orario di destinazione",
    inputFormat: "Formato di input",
    outputFormat: "Formato di output",
    harmony: "Armonia cromatica",
    complementary: "Complementare",
    triadic: "Triadico",
    analogous: "Analogo",
    splitComplementary: "Complementare diviso",
    tetradic: "Tetradico",
    gradientType: "Tipo di sfumatura",
    linear: "Lineare",
    radial: "Radiale",
    conic: "Conico",
    gradientAngle: "Angolo (deg)",
    rootName: "Nome dell'interfaccia radice",
    tableName: "Nome della tabella",
    minify: "Minifica",
    beautify: "Formatta",
    colorType: "Tipo di deficit",
    protanopia: "Protanopia (senza rosso)",
    deuteranopia: "Deuteranopia (senza verde)",
    tritanopia: "Tritanopia (senza blu)",
    achromatopsia: "Acromatopsia (senza colore)",
    operation: "Operazione",
    difference: "Differenza",
    add: "Aggiungi",
    subtract: "Sottrai",
    amount: "Quantità",
    unit: "Unità",
    days: "Giorni",
    weeks: "Settimane",
    months: "Mesi",
    years: "Anni",
    fromBase: "Base di origine",
    toBase: "Base di destinazione",
    binary: "Binario (2)",
    octal: "Ottale (8)",
    decimal: "Decimale (10)",
    hexadecimal: "Esadecimale (16)",
    seconds: "Secondi",
    milliseconds: "Millisecondi",
    autoDetect: "Rilevamento automatico",
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
    toRoman: "Numero → Romano",
    toArabic: "Romano → Numero",
    toScientific: "Standard → Scientifica",
    toStandard: "Scientifica → Standard",
    toFraction: "Decimale → Frazione",
    toDecimal: "Frazione → Decimale",
    decimalToPercent: "Decimale → Percentuale",
    percentToDecimal: "Percentuale → Decimale",
    fractionToPercent: "Frazione → Percentuale",
    dd: "Decimal Degrees (DD)",
    dms: "Degrees Minutes Seconds (DMS)",
    ddm: "Degrees Decimal Minutes (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Formato esteso",
    short: "Formato breve",
    relative: "Relativo",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Colore di sfondo",
    monochromatic: "Monocromatico",
    timestampToDate: "Timestamp → Data",
    dateToTimestamp: "Data → Timestamp",
    showDetails: "Mostra dettaglio completo",
    addDays: "Aggiungi giorni",
    subtractDays: "Sottrai giorni",
    datetimeHint: "es. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Righe",
    characters: "Caratteri",
    rows: "Righe",
    columns: "Colonne",
    elements: "Elementi",
    keys: "Chiavi",
    interfaces: "Interfacce",
    properties: "Proprietà",
    originalSize: "Dimensione originale",
    resultSize: "Dimensione risultato",
    savings: "Risparmio",
    ingredients: "Ingredienti",
    scaleFactor: "Fattore di scala",
    contrastRatio: "Rapporto di contrasto",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitudine",
    longitude: "Longitudine",
    distanceKm: "Distanza (km)",
    distanceMi: "Distanza (mi)",
    years: "Anni",
    months: "Mesi",
    days: "Giorni",
  },
  processorMessages: {
    invalidTimezone: "Fuso orario non valido",
    pass: "Superato", fail: "Non superato",
    fromNow: "da adesso", ago: "fa",
    today: "Oggi", tomorrow: "Domani", yesterday: "Ieri",
    seconds: "secondo", secondsPlural: "secondi",
    minutes: "minuto", minutesPlural: "minuti",
    hours: "ora", hoursPlural: "ore",
    daysUnit: "giorno", daysPlural: "giorni",
    weeksUnit: "settimana", weeksPlural: "settimane",
    monthsUnit: "mese", monthsPlural: "mesi",
    yearsUnit: "anno", yearsPlural: "anni",
    gasmark: "Gas Mark",
    veryCool: "Molto freddo", cool: "Freddo", moderatelyCool: "Moderatamente freddo",
    moderate: "Moderato", moderatelyHot: "Moderatamente caldo",
    hot: "Caldo", veryHot: "Molto caldo", extremelyHot: "Estremamente caldo",
    original: "Originale",
    from: "Da", to: "A",
    totalDays: "Totale giorni", weeksDays: "Settimane + Giorni",
    originalDate: "Data originale", operationLabel: "Operazione",
    resultDate: "Data risultato", dayOfWeek: "Giorno della settimana",
    daysBetween: "Giorni di differenza",
    age: "Età", totalMonths: "Totale mesi",
    totalHours: "Totale ore", totalMinutes: "Totale minuti",
    nextBirthday: "Prossimo compleanno",
    roman: "Romano", arabic: "Arabo",
    scientific: "Scientifica", standard: "Standard", engineering: "Ingegneria",
    fraction: "Frazione", simplified: "Semplificato", percentage: "Percentuale",
    color1: "Colore 1", color2: "Colore 2",
    contrastRatioLabel: "Rapporto di contrasto",
    aaNormalText: "AA Testo normale", aaLargeText: "AA Testo grande",
    aaaNormalText: "AAA Testo normale", aaaLargeText: "AAA Testo grande",
    gradientTypeLabel: "Tipo", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Convertitore — Convertitori online gratuiti",
    siteDescription:
      "Converti unità, colori, formati dati, date e altro. Gratuito, veloce e privato — tutto avviene nel tuo browser.",
    toolTitleSuffix: "| ToolPop Convertitore",
  },
  blog: {
    title: "Blog",
    description:
      "Consigli, guide e conoscenze sulla conversione di unità, formati dati e altro.",
    readMore: "Leggi di più",
    backToBlog: "Torna al blog",
    publishedOn: "Pubblicato il",
    categoryGuide: "Guida",
    categoryTips: "Consigli",
    categoryKnowledge: "Conoscenza",
  },
  cookie: {
    message:
      "Utilizziamo i cookie per migliorare la tua esperienza. Continuando, accetti la nostra politica sui cookie.",
    accept: "Accetta",
    decline: "Rifiuta",
  },
  unitLabels: {
    length: {
      m: "Metro (m)", km: "Chilometro (km)", cm: "Centimetro (cm)", mm: "Millimetro (mm)",
      mi: "Miglio (mi)", yd: "Iarda (yd)", ft: "Piede (ft)", in: "Pollice (in)",
      nm: "Miglio nautico (nm)", "\u03BCm": "Micrometro (\u03BCm)",
    },
    weight: {
      kg: "Chilogrammo (kg)", g: "Grammo (g)", mg: "Milligrammo (mg)", lb: "Libbra (lb)",
      oz: "Oncia (oz)", ton: "Tonnellata metrica (t)", st: "Stone (st)", ct: "Carato (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Metro quadrato (m\u00B2)", "km\u00B2": "Chilometro quadrato (km\u00B2)",
      ha: "Ettaro (ha)", acre: "Acro", "ft\u00B2": "Piede quadrato (ft\u00B2)",
      "mi\u00B2": "Miglio quadrato (mi\u00B2)", "yd\u00B2": "Iarda quadrata (yd\u00B2)",
      "cm\u00B2": "Centimetro quadrato (cm\u00B2)",
    },
    volume: {
      L: "Litro (L)", mL: "Millilitro (mL)", gal: "Gallone US (gal)",
      "fl oz": "Oncia liquida US (fl oz)", cup: "Tazza US", pt: "Pinta US (pt)",
      qt: "Quarto US (qt)", "m\u00B3": "Metro cubo (m\u00B3)",
      "cm\u00B3": "Centimetro cubo (cm\u00B3)", tbsp: "Cucchiaio (tbsp)", tsp: "Cucchiaino (tsp)",
    },
    speed: {
      "m/s": "Metro/sec (m/s)", "km/h": "Chilometro/h (km/h)", mph: "Miglio/h (mph)",
      kn: "Nodo (kn)", "ft/s": "Piede/sec (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisecondo (ms)", s: "Secondo (s)", min: "Minuto (min)", h: "Ora (h)",
      d: "Giorno (d)", wk: "Settimana (wk)", mo: "Mese (mo)", yr: "Anno (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Caloria (cal)", kcal: "Kilocaloria (kcal)",
      Wh: "Wattora (Wh)", kWh: "Kilowattora (kWh)", BTU: "BTU", eV: "Elettronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Cavallo vapore (hp)",
      "BTU/h": "BTU/h", "cal/s": "Caloria/sec",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grado (\u00B0)", rad: "Radiante (rad)", grad: "Gradiano (grad)",
      turn: "Giro", arcmin: "Primo d'arco (\u2032)", arcsec: "Secondo d'arco (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Tazza", tbsp: "Cucchiaio", tsp: "Cucchiaino", mL: "Millilitro (mL)",
      L: "Litro (L)", fl_oz: "Oncia liquida", g: "Grammo (g)", kg: "Chilogrammo (kg)",
      oz: "Oncia (oz)", lb: "Libbra (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixel (px)", em: "Em (em)" },
    "px-percent": { px: "Pixel (px)", "%": "Percentuale (%)" },
    "css-unit": {
      px: "Pixel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Percentuale (%)", vw: "Larghezza viewport (vw)", vh: "Altezza viewport (vh)",
    },
  },
};

export default dict;
