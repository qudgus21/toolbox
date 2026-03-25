import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Every Converter you need",
    titleAccent: "Converter",
    description:
      "Convert units, colors, data formats, dates, and more — instantly in your browser.",
    tabAll: "All",
    categoryUnit: "Units",
    categoryNumber: "Numbers",
    categoryColor: "Colors",
    categoryDatetime: "Date/Time",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Cooking",
    categoryGeography: "Geography",
    searchPlaceholder: "Search converters...",
    noResults: "No converters found.",
    recentTools: "Recently Used",
    favorites: "Favorites",
    favDragHint: "Drag to reorder",
    favHint: "Click the star to add favorites",
    gridView: "Grid view",
    listView: "List view",
  },
  trust: {
    encryption: "Secure Processing",
    encryptionDesc: "All conversions happen locally in your browser",
    autoDelete: "No Data Stored",
    autoDeleteDesc: "Your input is never saved or sent to a server",
    free: "100% Free",
    freeDesc: "No limits, no sign-ups, no hidden fees",
    browserProcessing: "Instant Results",
    browserProcessingDesc: "Real-time conversion as you type",
  },
  tools: {
    length: {
      title: "Length Converter",
      description:
        "Convert between meters, kilometers, miles, feet, inches, and more.",
    },
    weight: {
      title: "Weight Converter",
      description:
        "Convert between kilograms, pounds, ounces, tons, and more.",
    },
    temperature: {
      title: "Temperature Converter",
      description: "Convert between Celsius, Fahrenheit, and Kelvin.",
    },
    area: {
      title: "Area Converter",
      description:
        "Convert between square meters, hectares, acres, square feet, and more.",
    },
    volume: {
      title: "Volume Converter",
      description:
        "Convert between liters, gallons, cups, fluid ounces, and more.",
    },
    speed: {
      title: "Speed Converter",
      description: "Convert between m/s, km/h, mph, knots, and more.",
    },
    time: {
      title: "Time Converter",
      description:
        "Convert between seconds, minutes, hours, days, weeks, and more.",
    },
    pressure: {
      title: "Pressure Converter",
      description:
        "Convert between Pascal, bar, PSI, atmosphere, and more.",
    },
    energy: {
      title: "Energy Converter",
      description:
        "Convert between joules, calories, kilowatt-hours, BTU, and more.",
    },
    power: {
      title: "Power Converter",
      description:
        "Convert between watts, kilowatts, horsepower, and more.",
    },
    frequency: {
      title: "Frequency Converter",
      description:
        "Convert between hertz, kilohertz, megahertz, gigahertz, and RPM.",
    },
    angle: {
      title: "Angle Converter",
      description: "Convert between degrees, radians, gradians, and turns.",
    },
    "data-storage": {
      title: "Data Storage Converter",
      description:
        "Convert between bytes, kilobytes, megabytes, gigabytes, and more.",
    },
    "fuel-economy": {
      title: "Fuel Economy Converter",
      description: "Convert between km/L, mpg, and L/100km.",
    },
    "number-base": {
      title: "Number Base Converter",
      description:
        "Convert between binary, octal, decimal, hexadecimal, and custom bases.",
    },
    "roman-numeral": {
      title: "Roman Numeral Converter",
      description: "Convert between Roman numerals and Arabic numbers.",
    },
    "scientific-notation": {
      title: "Scientific Notation Converter",
      description:
        "Convert between scientific notation and standard numbers.",
    },
    "fraction-decimal": {
      title: "Fraction ↔ Decimal",
      description: "Convert between fractions and decimal numbers.",
    },
    percentage: {
      title: "Percentage Converter",
      description:
        "Convert between fractions, decimals, and percentages.",
    },
    "color-converter": {
      title: "Color Converter",
      description:
        "Convert between HEX, RGB, HSL, HSV, and CMYK color formats.",
    },
    "color-palette-generator": {
      title: "Color Palette Generator",
      description:
        "Generate complementary, triadic, and analogous color palettes.",
    },
    "gradient-generator": {
      title: "CSS Gradient Generator",
      description:
        "Create linear, radial, and conic CSS gradients with live preview.",
    },
    "color-contrast-checker": {
      title: "Color Contrast Checker",
      description:
        "Check WCAG AA/AAA color contrast ratio between two colors.",
    },
    "color-blindness-simulator": {
      title: "Color Blindness Simulator",
      description:
        "Simulate how colors appear to people with color vision deficiency.",
    },
    timezone: {
      title: "Timezone Converter",
      description:
        "Convert time between different timezones worldwide.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp Converter",
      description:
        "Convert between Unix timestamps and human-readable dates.",
    },
    "date-format": {
      title: "Date Format Converter",
      description:
        "Convert dates between different formats (ISO, US, EU, and more).",
    },
    "date-calculator": {
      title: "Date Calculator",
      description:
        "Calculate the difference between dates or add/subtract days.",
    },
    "age-calculator": {
      title: "Age Calculator",
      description:
        "Calculate exact age from birth date in years, months, and days.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Convert between JSON and YAML data formats.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Convert between JSON arrays and CSV spreadsheet format.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Convert between JSON and XML data formats.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Convert between JSON and TOML configuration formats.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Convert between Markdown and HTML markup.",
    },
    "csv-table": {
      title: "CSV to Table",
      description: "Convert CSV data to Markdown or HTML tables.",
    },
    "json-typescript": {
      title: "JSON to TypeScript",
      description: "Generate TypeScript interfaces from JSON data.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Convert between SQL INSERT statements and JSON data.",
    },
    "px-rem": {
      title: "px ↔ rem Converter",
      description:
        "Convert between pixels and rem units with custom base size.",
    },
    "px-em": {
      title: "px ↔ em Converter",
      description:
        "Convert between pixels and em units with custom parent size.",
    },
    "px-percent": {
      title: "px ↔ % Converter",
      description:
        "Convert between pixels and percentage with custom container width.",
    },
    "css-unit": {
      title: "CSS Unit Converter",
      description:
        "Convert between px, rem, em, %, vw, vh and other CSS units.",
    },
    "css-minifier": {
      title: "CSS Minifier / Beautifier",
      description:
        "Minify or beautify CSS code for production or readability.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Convert between Tailwind CSS classes and vanilla CSS.",
    },
    "cooking-measurement": {
      title: "Cooking Measurement Converter",
      description:
        "Convert between cups, tablespoons, teaspoons, milliliters, and grams.",
    },
    "recipe-scaler": {
      title: "Recipe Scaler",
      description:
        "Scale recipe ingredients up or down by serving size.",
    },
    "oven-temperature": {
      title: "Oven Temperature Converter",
      description:
        "Convert between Celsius, Fahrenheit, and Gas Mark for oven temperatures.",
    },
    coordinate: {
      title: "Coordinate Converter",
      description:
        "Convert between DMS, DD, and DDM coordinate formats.",
    },
    "distance-calculator": {
      title: "Distance Calculator",
      description:
        "Calculate the distance between two geographic coordinates.",
    },
  },
  nav: {
    allTools: "All Converter Tools",
    language: "Language",
  },
  footer: {
    tools: "Converters",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "ToolPop. All rights reserved.",
    company: "Company",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
  },
  common: {
    backToAll: "All Converters",
    inputPlaceholder: "Enter a value to convert...",
    outputLabel: "Result",
    copyToClipboard: "Copy to clipboard",
    copied: "Copied!",
    clear: "Clear",
    paste: "Paste",
    processing: "Converting...",
    startOver: "Start over",
    process: "Convert",
    tryAgain: "Try again",
    notImplemented: "This converter is coming soon.",
    tryOtherTools: "Try other converters",
    privacyBadge: "All conversions happen in your browser",
    favoriteAdded: "Added to favorites",
    favoriteRemoved: "Removed from favorites",
    comingSoon: "Coming Soon",
    share: "Share",
    shareTitle: "Share this converter",
    shareSubtitle: "Share this useful converter with others",
    shareCopied: "Link copied!",
    shareCopyLink: "Copy link",
    downloadAsFile: "Download",
    options: "Options",
    input: "Input",
    output: "Output",
    convert: "Convert",
    swap: "Swap",
    from: "From",
    to: "To",
    result: "Result",
    allConversions: "All Conversions",
    details: "Details",
    pageNotFound: "Converter not found",
    goHome: "Back to all converters",
  },
  toolOptions: {
    fromUnit: "From",
    toUnit: "To",
    precision: "Decimal places",
    baseSize: "Base font size (px)",
    parentSize: "Parent font size (px)",
    containerWidth: "Container width (px)",
    viewportWidth: "Viewport width (px)",
    viewportHeight: "Viewport height (px)",
    direction: "Direction",
    mode: "Mode",
    ingredient: "Ingredient",
    water: "Water",
    flour: "Flour",
    sugar: "Sugar",
    butter: "Butter",
    rice: "Rice",
    milk: "Milk",
    originalServings: "Original servings",
    targetServings: "Target servings",
    fromTimezone: "From timezone",
    toTimezone: "To timezone",
    inputFormat: "Input format",
    outputFormat: "Output format",
    harmony: "Color harmony",
    complementary: "Complementary",
    triadic: "Triadic",
    analogous: "Analogous",
    splitComplementary: "Split Complementary",
    tetradic: "Tetradic",
    gradientType: "Gradient type",
    linear: "Linear",
    radial: "Radial",
    conic: "Conic",
    gradientAngle: "Angle (deg)",
    rootName: "Root interface name",
    tableName: "Table name",
    minify: "Minify",
    beautify: "Beautify",
    colorType: "Deficiency type",
    protanopia: "Protanopia (no red)",
    deuteranopia: "Deuteranopia (no green)",
    tritanopia: "Tritanopia (no blue)",
    achromatopsia: "Achromatopsia (no color)",
    operation: "Operation",
    difference: "Difference",
    add: "Add",
    subtract: "Subtract",
    amount: "Amount",
    unit: "Unit",
    days: "Days",
    weeks: "Weeks",
    months: "Months",
    years: "Years",
    fromBase: "From base",
    toBase: "To base",
    binary: "Binary (2)",
    octal: "Octal (8)",
    decimal: "Decimal (10)",
    hexadecimal: "Hexadecimal (16)",
    seconds: "Seconds",
    milliseconds: "Milliseconds",
    autoDetect: "Auto-detect",
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
    markdown: "Markdown table",
    html: "HTML table",
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
    toRoman: "Number → Roman",
    toArabic: "Roman → Number",
    toScientific: "Standard → Scientific",
    toStandard: "Scientific → Standard",
    toFraction: "Decimal → Fraction",
    toDecimal: "Fraction → Decimal",
    decimalToPercent: "Decimal → Percent",
    percentToDecimal: "Percent → Decimal",
    fractionToPercent: "Fraction → Percent",
    dd: "Decimal Degrees (DD)",
    dms: "Degrees Minutes Seconds (DMS)",
    ddm: "Degrees Decimal Minutes (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Long format",
    short: "Short format",
    relative: "Relative",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Background Color",
    monochromatic: "Monochromatic",
    timestampToDate: "Timestamp → Date",
    dateToTimestamp: "Date → Timestamp",
    showDetails: "Show detailed breakdown",
    addDays: "Add days",
    subtractDays: "Subtract days",
    datetimeHint: "e.g. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Lines",
    characters: "Characters",
    rows: "Rows",
    columns: "Columns",
    elements: "Elements",
    keys: "Keys",
    interfaces: "Interfaces",
    properties: "Properties",
    originalSize: "Original size",
    resultSize: "Result size",
    savings: "Savings",
    ingredients: "Ingredients",
    scaleFactor: "Scale factor",
    contrastRatio: "Contrast ratio",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitude",
    longitude: "Longitude",
    distanceKm: "Distance (km)",
    distanceMi: "Distance (mi)",
    years: "Years",
    months: "Months",
    days: "Days",
  },
  processorMessages: {
    invalidTimezone: "Invalid timezone",
    pass: "Pass",
    fail: "Fail",
    fromNow: "from now",
    ago: "ago",
    today: "Today",
    tomorrow: "Tomorrow",
    yesterday: "Yesterday",
    seconds: "second",
    secondsPlural: "seconds",
    minutes: "minute",
    minutesPlural: "minutes",
    hours: "hour",
    hoursPlural: "hours",
    daysUnit: "day",
    daysPlural: "days",
    weeksUnit: "week",
    weeksPlural: "weeks",
    monthsUnit: "month",
    monthsPlural: "months",
    yearsUnit: "year",
    yearsPlural: "years",
    gasmark: "Gas Mark",
    veryCool: "Very Cool",
    cool: "Cool",
    moderatelyCool: "Moderately Cool",
    moderate: "Moderate",
    moderatelyHot: "Moderately Hot",
    hot: "Hot",
    veryHot: "Very Hot",
    extremelyHot: "Extremely Hot",
    original: "Original",
    from: "From",
    to: "To",
    totalDays: "Total Days",
    weeksDays: "Weeks + Days",
    originalDate: "Original Date",
    operationLabel: "Operation",
    resultDate: "Result Date",
    dayOfWeek: "Day of Week",
    daysBetween: "Days Between",
    age: "Age",
    totalMonths: "Total Months",
    totalHours: "Total Hours",
    totalMinutes: "Total Minutes",
    nextBirthday: "Next Birthday",
    roman: "Roman",
    arabic: "Arabic",
    scientific: "Scientific",
    standard: "Standard",
    engineering: "Engineering",
    fraction: "Fraction",
    simplified: "Simplified",
    percentage: "Percentage",
    color1: "Color 1",
    color2: "Color 2",
    contrastRatioLabel: "Contrast Ratio",
    aaNormalText: "AA Normal Text",
    aaLargeText: "AA Large Text",
    aaaNormalText: "AAA Normal Text",
    aaaLargeText: "AAA Large Text",
    gradientTypeLabel: "Type",
    gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Free Online Converters",
    siteDescription:
      "Convert units, colors, data formats, dates, and more. Free, fast, and private — everything runs in your browser.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Tips, guides, and knowledge about unit conversions, data formats, and more.",
    readMore: "Read more",
    backToBlog: "Back to Blog",
    publishedOn: "Published on",
    categoryGuide: "Guide",
    categoryTips: "Tips",
    categoryKnowledge: "Knowledge",
  },
  cookie: {
    message:
      "We use cookies to improve your experience. By continuing, you agree to our cookie policy.",
    accept: "Accept",
    decline: "Decline",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Millimeter (mm)",
      mi: "Mile (mi)", yd: "Yard (yd)", ft: "Foot (ft)", in: "Inch (in)",
      nm: "Nautical Mile (nm)", "\u03BCm": "Micrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Milligram (mg)", lb: "Pound (lb)",
      oz: "Ounce (oz)", ton: "Metric Ton (t)", st: "Stone (st)", ct: "Carat (ct)",
    },
    temperature: {
      C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)",
    },
    area: {
      "m\u00B2": "Square Meter (m\u00B2)", "km\u00B2": "Square Kilometer (km\u00B2)",
      ha: "Hectare (ha)", acre: "Acre", "ft\u00B2": "Square Foot (ft\u00B2)",
      "mi\u00B2": "Square Mile (mi\u00B2)", "yd\u00B2": "Square Yard (yd\u00B2)",
      "cm\u00B2": "Square Centimeter (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Milliliter (mL)", gal: "US Gallon (gal)",
      "fl oz": "US Fluid Ounce (fl oz)", cup: "US Cup", pt: "US Pint (pt)",
      qt: "US Quart (qt)", "m\u00B3": "Cubic Meter (m\u00B3)",
      "cm\u00B3": "Cubic Centimeter (cm\u00B3)", tbsp: "Tablespoon (tbsp)", tsp: "Teaspoon (tsp)",
    },
    speed: {
      "m/s": "Meter/sec (m/s)", "km/h": "Kilometer/hr (km/h)", mph: "Mile/hr (mph)",
      kn: "Knot (kn)", "ft/s": "Foot/sec (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisecond (ms)", s: "Second (s)", min: "Minute (min)", h: "Hour (h)",
      d: "Day (d)", wk: "Week (wk)", mo: "Month (mo)", yr: "Year (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosphere (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Calorie (cal)", kcal: "Kilocalorie (kcal)",
      Wh: "Watt-hour (Wh)", kWh: "Kilowatt-hour (kWh)", BTU: "BTU", eV: "Electronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Horsepower (hp)",
      "BTU/h": "BTU/hr", "cal/s": "Calorie/sec",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Degree (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Turn", arcmin: "Arc Minute (\u2032)", arcsec: "Arc Second (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": {
      "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km",
    },
    "cooking-measurement": {
      cup: "Cup", tbsp: "Tablespoon", tsp: "Teaspoon", mL: "Milliliter (mL)",
      L: "Liter (L)", fl_oz: "Fluid Ounce", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Ounce (oz)", lb: "Pound (lb)",
    },
    "oven-temperature": {
      C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark",
    },
    "px-rem": { px: "Pixels (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixels (px)", em: "Em (em)" },
    "px-percent": { px: "Pixels (px)", "%": "Percent (%)" },
    "css-unit": {
      px: "Pixels (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Percent (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
