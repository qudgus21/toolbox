import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Todas las herramientas de conversión que necesitas",
    titleAccent: "conversión",
    description:
      "Convierte unidades, colores, formatos y fechas. Todo se procesa en tu navegador.",
    tabAll: "Todos",
    categoryUnit: "Unidades",
    categoryNumber: "Números",
    categoryColor: "Colores",
    categoryDatetime: "Fecha/Hora",
    categoryData: "Datos",
    categoryCss: "CSS",
    categoryCooking: "Cocina",
    categoryGeography: "Geografía",
    searchPlaceholder: "Buscar conversores...",
    noResults: "No se encontraron conversores.",
    recentTools: "Usados recientemente",
    favorites: "Favoritos",
    favDragHint: "Arrastra para reordenar",
    favHint: "Haz clic en la estrella para añadir favoritos",
    gridView: "Vista de cuadrícula",
    listView: "Vista de lista",
  },
  trust: {
    encryption: "Procesamiento seguro",
    encryptionDesc: "Todas las conversiones se realizan en tu navegador",
    autoDelete: "Sin almacenamiento",
    autoDeleteDesc: "Tus datos nunca se guardan ni se envían a un servidor",
    free: "100% gratis",
    freeDesc: "Sin límites, sin registro, sin costes ocultos",
    browserProcessing: "Resultados instantáneos",
    browserProcessingDesc: "Conversión en tiempo real mientras escribes",
  },
  tools: {
    length: {
      title: "Conversor de longitud",
      description:
        "Convierte entre metros, kilómetros, millas, pies, pulgadas y más.",
    },
    weight: {
      title: "Conversor de peso",
      description:
        "Convierte entre kilogramos, libras, onzas, toneladas y más.",
    },
    temperature: {
      title: "Conversor de temperatura",
      description: "Convierte entre Celsius, Fahrenheit y Kelvin.",
    },
    area: {
      title: "Conversor de área",
      description:
        "Convierte entre metros cuadrados, hectáreas, acres, pies cuadrados y más.",
    },
    volume: {
      title: "Conversor de volumen",
      description:
        "Convierte entre litros, galones, tazas, onzas líquidas y más.",
    },
    speed: {
      title: "Conversor de velocidad",
      description: "Convierte entre m/s, km/h, mph, nudos y más.",
    },
    time: {
      title: "Conversor de tiempo",
      description:
        "Convierte entre segundos, minutos, horas, días, semanas y más.",
    },
    pressure: {
      title: "Conversor de presión",
      description:
        "Convierte entre Pascal, bar, PSI, atmósfera y más.",
    },
    energy: {
      title: "Conversor de energía",
      description:
        "Convierte entre julios, calorías, kilovatios-hora, BTU y más.",
    },
    power: {
      title: "Conversor de potencia",
      description:
        "Convierte entre vatios, kilovatios, caballos de fuerza y más.",
    },
    frequency: {
      title: "Conversor de frecuencia",
      description:
        "Convierte entre hercios, kilohercio, megahercio, gigahercio y RPM.",
    },
    angle: {
      title: "Conversor de ángulos",
      description: "Convierte entre grados, radianes, gradianes y vueltas.",
    },
    "data-storage": {
      title: "Conversor de almacenamiento",
      description:
        "Convierte entre bytes, kilobytes, megabytes, gigabytes y más.",
    },
    "fuel-economy": {
      title: "Conversor de consumo",
      description: "Convierte entre km/L, mpg y L/100km.",
    },
    "number-base": {
      title: "Conversor de bases numéricas",
      description:
        "Convierte entre binario, octal, decimal, hexadecimal y bases personalizadas.",
    },
    "roman-numeral": {
      title: "Conversor de números romanos",
      description: "Convierte entre números romanos y arábigos.",
    },
    "scientific-notation": {
      title: "Conversor de notación científica",
      description:
        "Convierte entre notación científica y números estándar.",
    },
    "fraction-decimal": {
      title: "Fracción ↔ Decimal",
      description: "Convierte entre fracciones y números decimales.",
    },
    percentage: {
      title: "Conversor de porcentajes",
      description:
        "Convierte entre fracciones, decimales y porcentajes.",
    },
    "color-converter": {
      title: "Conversor de colores",
      description:
        "Convierte entre formatos de color HEX, RGB, HSL, HSV y CMYK.",
    },
    "color-palette-generator": {
      title: "Generador de paletas",
      description:
        "Genera paletas de colores complementarios, triádicos y análogos.",
    },
    "gradient-generator": {
      title: "Generador de degradados CSS",
      description:
        "Crea degradados CSS lineales, radiales y cónicos con vista previa.",
    },
    "color-contrast-checker": {
      title: "Verificador de contraste",
      description:
        "Verifica el ratio de contraste WCAG AA/AAA entre dos colores.",
    },
    "color-blindness-simulator": {
      title: "Simulador de daltonismo",
      description:
        "Simula cómo ven los colores las personas con deficiencia visual cromática.",
    },
    timezone: {
      title: "Conversor de zona horaria",
      description:
        "Convierte la hora entre diferentes zonas horarias del mundo.",
    },
    "unix-timestamp": {
      title: "Conversor de Unix timestamp",
      description:
        "Convierte entre marcas de tiempo Unix y fechas legibles.",
    },
    "date-format": {
      title: "Conversor de formato de fecha",
      description:
        "Convierte fechas entre distintos formatos (ISO, US, EU y más).",
    },
    "date-calculator": {
      title: "Calculadora de fechas",
      description:
        "Calcula la diferencia entre fechas o suma/resta días.",
    },
    "age-calculator": {
      title: "Calculadora de edad",
      description:
        "Calcula la edad exacta a partir de la fecha de nacimiento en años, meses y días.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Convierte entre los formatos de datos JSON y YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Convierte entre arrays JSON y formato de hoja de cálculo CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Convierte entre los formatos de datos JSON y XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Convierte entre los formatos de configuración JSON y TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Convierte entre Markdown y HTML.",
    },
    "csv-table": {
      title: "CSV a tabla",
      description: "Convierte datos CSV a tablas Markdown o HTML.",
    },
    "json-typescript": {
      title: "JSON a TypeScript",
      description: "Genera interfaces TypeScript a partir de datos JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Convierte entre sentencias SQL INSERT y datos JSON.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Convierte entre píxeles y unidades rem con tamaño base personalizado.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Convierte entre píxeles y unidades em con tamaño del padre personalizado.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Convierte entre píxeles y porcentaje con ancho de contenedor personalizado.",
    },
    "css-unit": {
      title: "Conversor de unidades CSS",
      description:
        "Convierte entre px, rem, em, %, vw, vh y otras unidades CSS.",
    },
    "css-minifier": {
      title: "Minificador / Embellecedor CSS",
      description:
        "Minifica o embellece código CSS para producción o legibilidad.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Convierte entre clases Tailwind CSS y CSS estándar.",
    },
    "cooking-measurement": {
      title: "Conversor de medidas de cocina",
      description:
        "Convierte entre tazas, cucharadas, cucharaditas, mililitros y gramos.",
    },
    "recipe-scaler": {
      title: "Ajustador de recetas",
      description:
        "Ajusta los ingredientes de una receta según el número de porciones.",
    },
    "oven-temperature": {
      title: "Conversor de temperatura del horno",
      description:
        "Convierte entre Celsius, Fahrenheit y Gas Mark para temperaturas de horno.",
    },
    coordinate: {
      title: "Conversor de coordenadas",
      description:
        "Convierte entre formatos de coordenadas DMS, DD y DDM.",
    },
    "distance-calculator": {
      title: "Calculadora de distancia",
      description:
        "Calcula la distancia entre dos coordenadas geográficas.",
    },
  },
  nav: {
    allTools: "Todos los conversores",
    language: "Idioma",
  },
  footer: {
    tools: "Conversores",
    legal: "Legal",
    privacy: "Política de privacidad",
    terms: "Términos de servicio",
    copyright: "ToolPop. Todos los derechos reservados.",
    company: "Empresa",
    about: "Acerca de",
    contact: "Contacto",
    faq: "Preguntas frecuentes",
  },
  common: {
    backToAll: "Todos los conversores",
    inputPlaceholder: "Introduce un valor para convertir...",
    outputLabel: "Resultado",
    copyToClipboard: "Copiar al portapapeles",
    copied: "¡Copiado!",
    clear: "Borrar",
    paste: "Pegar",
    processing: "Convirtiendo...",
    startOver: "Empezar de nuevo",
    process: "Convertir",
    tryAgain: "Reintentar",
    notImplemented: "Este conversor estará disponible próximamente.",
    tryOtherTools: "Prueba otros conversores",
    privacyBadge: "Todas las conversiones se realizan en tu navegador",
    favoriteAdded: "Añadido a favoritos",
    favoriteRemoved: "Eliminado de favoritos",
    comingSoon: "Próximamente",
    share: "Compartir",
    shareTitle: "Comparte este conversor",
    shareSubtitle: "Comparte este útil conversor con otros",
    shareCopied: "¡Enlace copiado!",
    shareCopyLink: "Copiar enlace",
    downloadAsFile: "Descargar",
    options: "Opciones",
    input: "Entrada",
    output: "Salida",
    convert: "Convertir",
    swap: "Intercambiar",
    from: "De",
    to: "A",
    result: "Resultado",
    allConversions: "Todas las conversiones",
    details: "Detalles",
    pageNotFound: "Conversor no encontrado",
    goHome: "Volver a todos los conversores",
    colorPickerLabel: "Selector de color",
  },
  toolOptions: {
    fromUnit: "De",
    toUnit: "A",
    precision: "Decimales",
    baseSize: "Tamaño base de fuente (px)",
    parentSize: "Tamaño de fuente del padre (px)",
    containerWidth: "Ancho del contenedor (px)",
    viewportWidth: "Ancho del viewport (px)",
    viewportHeight: "Alto del viewport (px)",
    direction: "Dirección",
    mode: "Modo",
    ingredient: "Ingrediente",
    water: "Agua",
    flour: "Harina",
    sugar: "Azúcar",
    butter: "Mantequilla",
    rice: "Arroz",
    milk: "Leche",
    originalServings: "Porciones originales",
    targetServings: "Porciones deseadas",
    fromTimezone: "Zona horaria de origen",
    toTimezone: "Zona horaria de destino",
    inputFormat: "Formato de entrada",
    outputFormat: "Formato de salida",
    harmony: "Armonía de color",
    complementary: "Complementario",
    triadic: "Triádico",
    analogous: "Análogo",
    splitComplementary: "Complementario dividido",
    tetradic: "Tetrádico",
    gradientType: "Tipo de degradado",
    linear: "Lineal",
    radial: "Radial",
    conic: "Cónico",
    gradientAngle: "Ángulo (deg)",
    rootName: "Nombre de la interfaz raíz",
    tableName: "Nombre de la tabla",
    minify: "Minificar",
    beautify: "Embellecer",
    colorType: "Tipo de deficiencia",
    protanopia: "Protanopía (sin rojo)",
    deuteranopia: "Deuteranopía (sin verde)",
    tritanopia: "Tritanopía (sin azul)",
    achromatopsia: "Acromatopsia (sin color)",
    operation: "Operación",
    difference: "Diferencia",
    add: "Sumar",
    subtract: "Restar",
    amount: "Cantidad",
    unit: "Unidad",
    days: "Días",
    weeks: "Semanas",
    months: "Meses",
    years: "Años",
    fromBase: "Base de origen",
    toBase: "Base de destino",
    binary: "Binario (2)",
    octal: "Octal (8)",
    decimal: "Decimal (10)",
    hexadecimal: "Hexadecimal (16)",
    seconds: "Segundos",
    milliseconds: "Milisegundos",
    autoDetect: "Detección automática",
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
    markdown: "Tabla Markdown",
    html: "Tabla HTML",
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
    toRoman: "Número → Romano",
    toArabic: "Romano → Número",
    toScientific: "Estándar → Científica",
    toStandard: "Científica → Estándar",
    toFraction: "Decimal → Fracción",
    toDecimal: "Fracción → Decimal",
    decimalToPercent: "Decimal → Porcentaje",
    percentToDecimal: "Porcentaje → Decimal",
    fractionToPercent: "Fracción → Porcentaje",
    dd: "Grados decimales (DD)",
    dms: "Grados minutos segundos (DMS)",
    ddm: "Grados minutos decimales (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Formato largo",
    short: "Formato corto",
    relative: "Relativo",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Color de fondo",
    monochromatic: "Monocromático",
    timestampToDate: "Timestamp → Fecha",
    dateToTimestamp: "Fecha → Timestamp",
    showDetails: "Mostrar desglose detallado",
    addDays: "Sumar días",
    subtractDays: "Restar días",
    datetimeHint: "p. ej. 2024-01-15, 1705312200, now",
    endDate: "Fecha de fin",
    today: "Hoy (predeterminado)",
    dateUnit: "Unidad",
  },
  statsLabels: {
    lines: "Líneas",
    characters: "Caracteres",
    rows: "Filas",
    columns: "Columnas",
    elements: "Elementos",
    keys: "Claves",
    interfaces: "Interfaces",
    properties: "Propiedades",
    originalSize: "Tamaño original",
    resultSize: "Tamaño del resultado",
    savings: "Ahorro",
    ingredients: "Ingredientes",
    scaleFactor: "Factor de escala",
    contrastRatio: "Ratio de contraste",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitud",
    longitude: "Longitud",
    distanceKm: "Distancia (km)",
    distanceMi: "Distancia (mi)",
    years: "Años",
    months: "Meses",
    days: "Días",
  },
  processorMessages: {
    invalidTimezone: "Zona horaria no válida",
    pass: "Pasa", fail: "No pasa",
    fromNow: "a partir de ahora", ago: "hace",
    today: "Hoy", tomorrow: "Mañana", yesterday: "Ayer",
    seconds: "segundo", secondsPlural: "segundos",
    minutes: "minuto", minutesPlural: "minutos",
    hours: "hora", hoursPlural: "horas",
    daysUnit: "día", daysPlural: "días",
    weeksUnit: "semana", weeksPlural: "semanas",
    monthsUnit: "mes", monthsPlural: "meses",
    yearsUnit: "año", yearsPlural: "años",
    gasmark: "Gas Mark",
    veryCool: "Muy frío", cool: "Frío", moderatelyCool: "Moderadamente frío",
    moderate: "Moderado", moderatelyHot: "Moderadamente caliente",
    hot: "Caliente", veryHot: "Muy caliente", extremelyHot: "Extremadamente caliente",
    original: "Original",
    from: "De", to: "A",
    totalDays: "Total de días", weeksDays: "Semanas + Días",
    originalDate: "Fecha original", operationLabel: "Operación",
    resultDate: "Fecha resultado", dayOfWeek: "Día de la semana",
    daysBetween: "Días entre fechas",
    age: "Edad", totalMonths: "Total de meses",
    totalHours: "Total de horas", totalMinutes: "Total de minutos",
    nextBirthday: "Próximo cumpleaños",
    roman: "Romano", arabic: "Arábigo",
    scientific: "Científica", standard: "Estándar", engineering: "Ingeniería",
    fraction: "Fracción", simplified: "Simplificado", percentage: "Porcentaje",
    color1: "Color 1", color2: "Color 2",
    contrastRatioLabel: "Ratio de contraste",
    aaNormalText: "AA Texto normal", aaLargeText: "AA Texto grande",
    aaaNormalText: "AAA Texto normal", aaaLargeText: "AAA Texto grande",
    gradientTypeLabel: "Tipo", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Conversor — Conversores online gratuitos",
    siteDescription:
      "Convierte unidades, colores, formatos de datos, fechas y más. Gratis, rápido y privado: todo se ejecuta en tu navegador.",
    toolTitleSuffix: "| ToolPop Conversor",
  },
  blog: {
    title: "Blog",
    description:
      "Consejos, guías y conocimiento sobre conversión de unidades, formatos de datos y más.",
    readMore: "Leer más",
    backToBlog: "Volver al blog",
    publishedOn: "Publicado el",
    categoryGuide: "Guía",
    categoryTips: "Consejos",
    categoryKnowledge: "Conocimiento",
  },
  cookie: {
    message:
      "Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra política de cookies.",
    accept: "Aceptar",
    decline: "Rechazar",
  },
  unitLabels: {
    length: {
      m: "Metro (m)", km: "Kilómetro (km)", cm: "Centímetro (cm)", mm: "Milímetro (mm)",
      mi: "Milla (mi)", yd: "Yarda (yd)", ft: "Pie (ft)", in: "Pulgada (in)",
      nm: "Milla náutica (nm)", "\u03BCm": "Micrómetro (\u03BCm)",
    },
    weight: {
      kg: "Kilogramo (kg)", g: "Gramo (g)", mg: "Miligramo (mg)", lb: "Libra (lb)",
      oz: "Onza (oz)", ton: "Tonelada métrica (t)", st: "Stone (st)", ct: "Quilate (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Metro cuadrado (m\u00B2)", "km\u00B2": "Kilómetro cuadrado (km\u00B2)",
      ha: "Hectárea (ha)", acre: "Acre", "ft\u00B2": "Pie cuadrado (ft\u00B2)",
      "mi\u00B2": "Milla cuadrada (mi\u00B2)", "yd\u00B2": "Yarda cuadrada (yd\u00B2)",
      "cm\u00B2": "Centímetro cuadrado (cm\u00B2)",
    },
    volume: {
      L: "Litro (L)", mL: "Mililitro (mL)", gal: "Galón US (gal)",
      "fl oz": "Onza líquida US (fl oz)", cup: "Taza US", pt: "Pinta US (pt)",
      qt: "Cuarto US (qt)", "m\u00B3": "Metro cúbico (m\u00B3)",
      "cm\u00B3": "Centímetro cúbico (cm\u00B3)", tbsp: "Cucharada (tbsp)", tsp: "Cucharadita (tsp)",
    },
    speed: {
      "m/s": "Metro/seg (m/s)", "km/h": "Kilómetro/h (km/h)", mph: "Milla/h (mph)",
      kn: "Nudo (kn)", "ft/s": "Pie/seg (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisegundo (ms)", s: "Segundo (s)", min: "Minuto (min)", h: "Hora (h)",
      d: "Día (d)", wk: "Semana (wk)", mo: "Mes (mo)", yr: "Año (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmósfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Julio (J)", kJ: "Kilojulio (kJ)", cal: "Caloría (cal)", kcal: "Kilocaloría (kcal)",
      Wh: "Vatio-hora (Wh)", kWh: "Kilovatio-hora (kWh)", BTU: "BTU", eV: "Electronvoltio (eV)",
    },
    power: {
      W: "Vatio (W)", kW: "Kilovatio (kW)", MW: "Megavatio (MW)", hp: "Caballo de fuerza (hp)",
      "BTU/h": "BTU/h", "cal/s": "Caloría/seg",
    },
    frequency: {
      Hz: "Hercio (Hz)", kHz: "Kilohercio (kHz)", MHz: "Megahercio (MHz)",
      GHz: "Gigahercio (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grado (\u00B0)", rad: "Radián (rad)", grad: "Gradián (grad)",
      turn: "Vuelta", arcmin: "Minuto de arco (\u2032)", arcsec: "Segundo de arco (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Taza", tbsp: "Cucharada", tsp: "Cucharadita", mL: "Mililitro (mL)",
      L: "Litro (L)", fl_oz: "Onza líquida", g: "Gramo (g)", kg: "Kilogramo (kg)",
      oz: "Onza (oz)", lb: "Libra (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Píxeles (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Píxeles (px)", em: "Em (em)" },
    "px-percent": { px: "Píxeles (px)", "%": "Porcentaje (%)" },
    "css-unit": {
      px: "Píxeles (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Porcentaje (%)", vw: "Ancho del viewport (vw)", vh: "Alto del viewport (vh)",
    },
  },
};

export default dict;
