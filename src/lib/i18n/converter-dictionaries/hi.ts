import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "हर ज़रूरी कनवर्टर एक जगह",
    titleAccent: "कनवर्टर",
    description:
      "यूनिट, रंग, डेटा फ़ॉर्मेट, तारीख़ और बहुत कुछ — सब कुछ ब्राउज़र में तुरंत कनवर्ट करें।",
    tabAll: "सभी",
    categoryUnit: "यूनिट",
    categoryNumber: "संख्याएँ",
    categoryColor: "रंग",
    categoryDatetime: "तारीख़/समय",
    categoryData: "डेटा",
    categoryCss: "CSS",
    categoryCooking: "खाना पकाना",
    categoryGeography: "भूगोल",
    searchPlaceholder: "कनवर्टर खोजें...",
    noResults: "कोई कनवर्टर नहीं मिला।",
    recentTools: "हाल ही में इस्तेमाल किए गए",
    favorites: "पसंदीदा",
    favDragHint: "क्रम बदलने के लिए खींचें",
    favHint: "पसंदीदा में जोड़ने के लिए स्टार पर क्लिक करें",
    gridView: "ग्रिड व्यू",
    listView: "लिस्ट व्यू",
  },
  trust: {
    encryption: "सुरक्षित प्रोसेसिंग",
    encryptionDesc: "सभी कनवर्शन आपके ब्राउज़र में होते हैं",
    autoDelete: "कोई डेटा स्टोर नहीं",
    autoDeleteDesc: "आपका इनपुट कभी सेव या सर्वर पर नहीं भेजा जाता",
    free: "100% मुफ़्त",
    freeDesc: "कोई सीमा नहीं, साइन-अप नहीं, छिपी फ़ीस नहीं",
    browserProcessing: "तुरंत नतीजे",
    browserProcessingDesc: "टाइप करते ही रियल-टाइम कनवर्शन",
  },
  tools: {
    length: {
      title: "लंबाई कनवर्टर",
      description:
        "मीटर, किलोमीटर, मील, फ़ीट, इंच और अन्य के बीच कनवर्ट करें।",
    },
    weight: {
      title: "वज़न कनवर्टर",
      description:
        "किलोग्राम, पाउंड, औंस, टन और अन्य के बीच कनवर्ट करें।",
    },
    temperature: {
      title: "तापमान कनवर्टर",
      description: "सेल्सियस, फ़ारेनहाइट और केल्विन के बीच कनवर्ट करें।",
    },
    area: {
      title: "क्षेत्रफल कनवर्टर",
      description:
        "वर्ग मीटर, हेक्टेयर, एकड़, वर्ग फ़ीट और अन्य के बीच कनवर्ट करें।",
    },
    volume: {
      title: "आयतन कनवर्टर",
      description:
        "लीटर, गैलन, कप, फ़्लूड औंस और अन्य के बीच कनवर्ट करें।",
    },
    speed: {
      title: "गति कनवर्टर",
      description: "m/s, km/h, mph, नॉट और अन्य के बीच कनवर्ट करें।",
    },
    time: {
      title: "समय कनवर्टर",
      description:
        "सेकंड, मिनट, घंटे, दिन, हफ़्ते और अन्य के बीच कनवर्ट करें।",
    },
    pressure: {
      title: "दबाव कनवर्टर",
      description:
        "पास्कल, बार, PSI, वायुमंडल और अन्य के बीच कनवर्ट करें।",
    },
    energy: {
      title: "ऊर्जा कनवर्टर",
      description:
        "जूल, कैलोरी, किलोवॉट-घंटा, BTU और अन्य के बीच कनवर्ट करें।",
    },
    power: {
      title: "शक्ति कनवर्टर",
      description:
        "वॉट, किलोवॉट, हॉर्सपावर और अन्य के बीच कनवर्ट करें।",
    },
    frequency: {
      title: "आवृत्ति कनवर्टर",
      description:
        "हर्ट्ज़, किलोहर्ट्ज़, मेगाहर्ट्ज़, गीगाहर्ट्ज़ और RPM के बीच कनवर्ट करें।",
    },
    angle: {
      title: "कोण कनवर्टर",
      description: "डिग्री, रेडियन, ग्रेडियन और टर्न के बीच कनवर्ट करें।",
    },
    "data-storage": {
      title: "डेटा स्टोरेज कनवर्टर",
      description:
        "बाइट, किलोबाइट, मेगाबाइट, गीगाबाइट और अन्य के बीच कनवर्ट करें।",
    },
    "fuel-economy": {
      title: "ईंधन दक्षता कनवर्टर",
      description: "km/L, mpg और L/100km के बीच कनवर्ट करें।",
    },
    "number-base": {
      title: "संख्या आधार कनवर्टर",
      description:
        "बाइनरी, ऑक्टल, डेसिमल, हेक्साडेसिमल और कस्टम बेस के बीच कनवर्ट करें।",
    },
    "roman-numeral": {
      title: "रोमन अंक कनवर्टर",
      description: "रोमन अंकों और अरबी संख्याओं के बीच कनवर्ट करें।",
    },
    "scientific-notation": {
      title: "वैज्ञानिक संकेतन कनवर्टर",
      description:
        "वैज्ञानिक संकेतन और मानक संख्याओं के बीच कनवर्ट करें।",
    },
    "fraction-decimal": {
      title: "भिन्न ↔ दशमलव",
      description: "भिन्नों और दशमलव संख्याओं के बीच कनवर्ट करें।",
    },
    percentage: {
      title: "प्रतिशत कनवर्टर",
      description:
        "भिन्न, दशमलव और प्रतिशत के बीच कनवर्ट करें।",
    },
    "color-converter": {
      title: "रंग कनवर्टर",
      description:
        "HEX, RGB, HSL, HSV और CMYK रंग फ़ॉर्मेट के बीच कनवर्ट करें।",
    },
    "color-palette-generator": {
      title: "कलर पैलेट जनरेटर",
      description:
        "कॉम्प्लिमेंटरी, ट्राइएडिक और एनालॉगस कलर पैलेट बनाएँ।",
    },
    "gradient-generator": {
      title: "CSS ग्रेडिएंट जनरेटर",
      description:
        "लाइव प्रीव्यू के साथ लीनियर, रेडियल और कॉनिक CSS ग्रेडिएंट बनाएँ।",
    },
    "color-contrast-checker": {
      title: "कलर कंट्रास्ट चेकर",
      description:
        "दो रंगों के बीच WCAG AA/AAA कंट्रास्ट अनुपात जाँचें।",
    },
    "color-blindness-simulator": {
      title: "कलर ब्लाइंडनेस सिम्युलेटर",
      description:
        "देखें कि कलर विज़न डेफ़िशिएंसी वाले लोगों को रंग कैसे दिखते हैं।",
    },
    timezone: {
      title: "टाइमज़ोन कनवर्टर",
      description:
        "दुनिया भर के अलग-अलग टाइमज़ोन के बीच समय कनवर्ट करें।",
    },
    "unix-timestamp": {
      title: "Unix टाइमस्टैम्प कनवर्टर",
      description:
        "Unix टाइमस्टैम्प और पढ़ने योग्य तारीख़ों के बीच कनवर्ट करें।",
    },
    "date-format": {
      title: "डेट फ़ॉर्मेट कनवर्टर",
      description:
        "तारीख़ों को अलग-अलग फ़ॉर्मेट (ISO, US, EU आदि) में कनवर्ट करें।",
    },
    "date-calculator": {
      title: "तारीख़ कैलकुलेटर",
      description:
        "दो तारीख़ों के बीच का अंतर निकालें या दिन जोड़ें/घटाएँ।",
    },
    "age-calculator": {
      title: "उम्र कैलकुलेटर",
      description:
        "जन्म तिथि से सटीक उम्र साल, महीने और दिनों में निकालें।",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "JSON और YAML डेटा फ़ॉर्मेट के बीच कनवर्ट करें।",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "JSON ऐरे और CSV स्प्रेडशीट फ़ॉर्मेट के बीच कनवर्ट करें।",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "JSON और XML डेटा फ़ॉर्मेट के बीच कनवर्ट करें।",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "JSON और TOML कॉन्फ़िगरेशन फ़ॉर्मेट के बीच कनवर्ट करें।",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Markdown और HTML मार्कअप के बीच कनवर्ट करें।",
    },
    "csv-table": {
      title: "CSV से टेबल",
      description: "CSV डेटा को Markdown या HTML टेबल में बदलें।",
    },
    "json-typescript": {
      title: "JSON से TypeScript",
      description: "JSON डेटा से TypeScript इंटरफ़ेस जनरेट करें।",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "SQL INSERT स्टेटमेंट और JSON डेटा के बीच कनवर्ट करें।",
    },
    "px-rem": {
      title: "px ↔ rem कनवर्टर",
      description:
        "कस्टम बेस साइज़ के साथ पिक्सल और rem यूनिट के बीच कनवर्ट करें।",
    },
    "px-em": {
      title: "px ↔ em कनवर्टर",
      description:
        "कस्टम पैरेंट साइज़ के साथ पिक्सल और em यूनिट के बीच कनवर्ट करें।",
    },
    "px-percent": {
      title: "px ↔ % कनवर्टर",
      description:
        "कस्टम कंटेनर चौड़ाई के साथ पिक्सल और प्रतिशत के बीच कनवर्ट करें।",
    },
    "css-unit": {
      title: "CSS यूनिट कनवर्टर",
      description:
        "px, rem, em, %, vw, vh और अन्य CSS यूनिट के बीच कनवर्ट करें।",
    },
    "css-minifier": {
      title: "CSS मिनिफ़ायर / ब्यूटिफ़ायर",
      description:
        "प्रोडक्शन या पठनीयता के लिए CSS कोड मिनिफ़ाय या ब्यूटिफ़ाय करें।",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tailwind CSS क्लासेस और वैनिला CSS के बीच कनवर्ट करें।",
    },
    "cooking-measurement": {
      title: "खाना पकाने की माप कनवर्टर",
      description:
        "कप, बड़े चम्मच, छोटे चम्मच, मिलीलीटर और ग्राम के बीच कनवर्ट करें।",
    },
    "recipe-scaler": {
      title: "रेसिपी स्केलर",
      description:
        "सर्विंग साइज़ के हिसाब से रेसिपी सामग्री बढ़ाएँ या घटाएँ।",
    },
    "oven-temperature": {
      title: "ओवन तापमान कनवर्टर",
      description:
        "ओवन तापमान के लिए सेल्सियस, फ़ारेनहाइट और Gas Mark के बीच कनवर्ट करें।",
    },
    coordinate: {
      title: "निर्देशांक कनवर्टर",
      description:
        "DMS, DD और DDM निर्देशांक फ़ॉर्मेट के बीच कनवर्ट करें।",
    },
    "distance-calculator": {
      title: "दूरी कैलकुलेटर",
      description:
        "दो भौगोलिक निर्देशांकों के बीच की दूरी निकालें।",
    },
  },
  nav: {
    allTools: "सभी कनवर्टर टूल",
    language: "भाषा",
  },
  footer: {
    tools: "कनवर्टर",
    legal: "कानूनी",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    copyright: "ToolPop. सर्वाधिकार सुरक्षित।",
    company: "कंपनी",
    about: "हमारे बारे में",
    contact: "संपर्क",
    faq: "अक्सर पूछे जाने वाले सवाल",
  },
  common: {
    backToAll: "सभी कनवर्टर",
    inputPlaceholder: "कनवर्ट करने के लिए मान दर्ज करें...",
    outputLabel: "नतीजा",
    copyToClipboard: "कॉपी करें",
    copied: "कॉपी हो गया!",
    clear: "मिटाएँ",
    paste: "पेस्ट",
    processing: "कनवर्ट हो रहा है...",
    startOver: "फिर से शुरू करें",
    process: "कनवर्ट",
    tryAgain: "फिर से कोशिश करें",
    notImplemented: "यह कनवर्टर जल्द आ रहा है।",
    tryOtherTools: "अन्य कनवर्टर आज़माएँ",
    privacyBadge: "सभी कनवर्शन आपके ब्राउज़र में होते हैं",
    favoriteAdded: "पसंदीदा में जोड़ा गया",
    favoriteRemoved: "पसंदीदा से हटाया गया",
    comingSoon: "जल्द आ रहा है",
    share: "शेयर",
    shareTitle: "यह कनवर्टर शेयर करें",
    shareSubtitle: "यह उपयोगी कनवर्टर दूसरों के साथ शेयर करें",
    shareCopied: "लिंक कॉपी हो गया!",
    shareCopyLink: "लिंक कॉपी करें",
    downloadAsFile: "डाउनलोड",
    options: "विकल्प",
    input: "इनपुट",
    output: "आउटपुट",
    convert: "कनवर्ट",
    swap: "बदलें",
    from: "से",
    to: "में",
    result: "नतीजा",
    allConversions: "सभी कनवर्शन",
    details: "विवरण",
    pageNotFound: "कनवर्टर नहीं मिला",
    goHome: "सभी कनवर्टर पर वापस जाएँ",
  },
  toolOptions: {
    fromUnit: "से",
    toUnit: "में",
    precision: "दशमलव स्थान",
    baseSize: "बेस फ़ॉन्ट साइज़ (px)",
    parentSize: "पैरेंट फ़ॉन्ट साइज़ (px)",
    containerWidth: "कंटेनर चौड़ाई (px)",
    viewportWidth: "व्यूपोर्ट चौड़ाई (px)",
    viewportHeight: "व्यूपोर्ट ऊँचाई (px)",
    direction: "दिशा",
    mode: "मोड",
    ingredient: "सामग्री",
    water: "पानी",
    flour: "आटा",
    sugar: "चीनी",
    butter: "मक्खन",
    rice: "चावल",
    milk: "दूध",
    originalServings: "मूल सर्विंग",
    targetServings: "लक्ष्य सर्विंग",
    fromTimezone: "टाइमज़ोन से",
    toTimezone: "टाइमज़ोन में",
    inputFormat: "इनपुट फ़ॉर्मेट",
    outputFormat: "आउटपुट फ़ॉर्मेट",
    harmony: "कलर हार्मनी",
    complementary: "कॉम्प्लिमेंटरी",
    triadic: "ट्राइएडिक",
    analogous: "एनालॉगस",
    splitComplementary: "स्प्लिट कॉम्प्लिमेंटरी",
    tetradic: "टेट्राडिक",
    gradientType: "ग्रेडिएंट प्रकार",
    linear: "लीनियर",
    radial: "रेडियल",
    conic: "कॉनिक",
    gradientAngle: "कोण (deg)",
    rootName: "रूट इंटरफ़ेस नाम",
    tableName: "टेबल नाम",
    minify: "मिनिफ़ाय",
    beautify: "ब्यूटिफ़ाय",
    colorType: "दोष प्रकार",
    protanopia: "प्रोटैनोपिया (लाल नहीं दिखता)",
    deuteranopia: "ड्यूटेरैनोपिया (हरा नहीं दिखता)",
    tritanopia: "ट्राइटैनोपिया (नीला नहीं दिखता)",
    achromatopsia: "एक्रोमैटोप्सिया (कोई रंग नहीं)",
    operation: "ऑपरेशन",
    difference: "अंतर",
    add: "जोड़ें",
    subtract: "घटाएँ",
    amount: "मात्रा",
    unit: "इकाई",
    days: "दिन",
    weeks: "हफ़्ते",
    months: "महीने",
    years: "साल",
    fromBase: "बेस से",
    toBase: "बेस में",
    binary: "बाइनरी (2)",
    octal: "ऑक्टल (8)",
    decimal: "डेसिमल (10)",
    hexadecimal: "हेक्साडेसिमल (16)",
    seconds: "सेकंड",
    milliseconds: "मिलीसेकंड",
    autoDetect: "ऑटो-डिटेक्ट",
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
    markdown: "Markdown टेबल",
    html: "HTML टेबल",
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
    toRoman: "संख्या → रोमन",
    toArabic: "रोमन → संख्या",
    toScientific: "मानक → वैज्ञानिक",
    toStandard: "वैज्ञानिक → मानक",
    toFraction: "दशमलव → भिन्न",
    toDecimal: "भिन्न → दशमलव",
    decimalToPercent: "दशमलव → प्रतिशत",
    percentToDecimal: "प्रतिशत → दशमलव",
    fractionToPercent: "भिन्न → प्रतिशत",
    dd: "Decimal Degrees (DD)",
    dms: "Degrees Minutes Seconds (DMS)",
    ddm: "Degrees Decimal Minutes (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "विस्तृत फ़ॉर्मेट",
    short: "संक्षिप्त फ़ॉर्मेट",
    relative: "सापेक्ष",
    celsius: "सेल्सियस (°C)",
    fahrenheit: "फ़ारेनहाइट (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "पृष्ठभूमि रंग",
    monochromatic: "मोनोक्रोमैटिक",
    timestampToDate: "टाइमस्टैम्प → तारीख़",
    dateToTimestamp: "तारीख़ → टाइमस्टैम्प",
    showDetails: "विस्तृत विवरण दिखाएँ",
    addDays: "दिन जोड़ें",
    subtractDays: "दिन घटाएँ",
    datetimeHint: "जैसे 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "लाइनें",
    characters: "अक्षर",
    rows: "पंक्तियाँ",
    columns: "कॉलम",
    elements: "एलिमेंट",
    keys: "कीज़",
    interfaces: "इंटरफ़ेस",
    properties: "प्रॉपर्टीज़",
    originalSize: "मूल साइज़",
    resultSize: "नतीजे का साइज़",
    savings: "बचत",
    ingredients: "सामग्री",
    scaleFactor: "स्केल फ़ैक्टर",
    contrastRatio: "कंट्रास्ट अनुपात",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    distanceKm: "दूरी (km)",
    distanceMi: "दूरी (mi)",
    years: "साल",
    months: "महीने",
    days: "दिन",
  },
  processorMessages: {
    invalidTimezone: "अमान्य टाइमज़ोन",
    pass: "पास", fail: "फ़ेल",
    fromNow: "बाद", ago: "पहले",
    today: "आज", tomorrow: "कल", yesterday: "कल (बीता)",
    seconds: "सेकंड", secondsPlural: "सेकंड",
    minutes: "मिनट", minutesPlural: "मिनट",
    hours: "घंटा", hoursPlural: "घंटे",
    daysUnit: "दिन", daysPlural: "दिन",
    weeksUnit: "हफ़्ता", weeksPlural: "हफ़्ते",
    monthsUnit: "महीना", monthsPlural: "महीने",
    yearsUnit: "साल", yearsPlural: "साल",
    gasmark: "Gas Mark",
    veryCool: "बहुत ठंडा", cool: "ठंडा", moderatelyCool: "हल्का ठंडा",
    moderate: "मध्यम", moderatelyHot: "हल्का गरम",
    hot: "गरम", veryHot: "बहुत गरम", extremelyHot: "अत्यधिक गरम",
    original: "मूल",
    from: "से", to: "में",
    totalDays: "कुल दिन", weeksDays: "हफ़्ते + दिन",
    originalDate: "मूल तारीख़", operationLabel: "ऑपरेशन",
    resultDate: "नतीजे की तारीख़", dayOfWeek: "सप्ताह का दिन",
    daysBetween: "दिनों का अंतर",
    age: "उम्र", totalMonths: "कुल महीने",
    totalHours: "कुल घंटे", totalMinutes: "कुल मिनट",
    nextBirthday: "अगला जन्मदिन",
    roman: "रोमन", arabic: "अरबी",
    scientific: "वैज्ञानिक", standard: "मानक", engineering: "इंजीनियरिंग",
    fraction: "भिन्न", simplified: "सरलीकृत", percentage: "प्रतिशत",
    color1: "रंग 1", color2: "रंग 2",
    contrastRatioLabel: "कंट्रास्ट अनुपात",
    aaNormalText: "AA सामान्य टेक्स्ट", aaLargeText: "AA बड़ा टेक्स्ट",
    aaaNormalText: "AAA सामान्य टेक्स्ट", aaaLargeText: "AAA बड़ा टेक्स्ट",
    gradientTypeLabel: "प्रकार", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — मुफ़्त ऑनलाइन कनवर्टर",
    siteDescription:
      "यूनिट, रंग, डेटा फ़ॉर्मेट, तारीख़ और बहुत कुछ कनवर्ट करें। मुफ़्त, तेज़ और निजी — सब कुछ आपके ब्राउज़र में चलता है।",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "ब्लॉग",
    description:
      "यूनिट कनवर्शन, डेटा फ़ॉर्मेट और अन्य विषयों पर टिप्स, गाइड और जानकारी।",
    readMore: "और पढ़ें",
    backToBlog: "ब्लॉग पर वापस जाएँ",
    publishedOn: "प्रकाशित",
    categoryGuide: "गाइड",
    categoryTips: "टिप्स",
    categoryKnowledge: "ज्ञान",
  },
  cookie: {
    message:
      "हम आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का इस्तेमाल करते हैं। जारी रखकर आप हमारी कुकी नीति से सहमत होते हैं।",
    accept: "स्वीकार करें",
    decline: "अस्वीकार करें",
  },
  unitLabels: {
    length: {
      m: "मीटर (m)", km: "किलोमीटर (km)", cm: "सेंटीमीटर (cm)", mm: "मिलीमीटर (mm)",
      mi: "मील (mi)", yd: "गज़ (yd)", ft: "फ़ीट (ft)", in: "इंच (in)",
      nm: "समुद्री मील (nm)", "\u03BCm": "माइक्रोमीटर (\u03BCm)",
    },
    weight: {
      kg: "किलोग्राम (kg)", g: "ग्राम (g)", mg: "मिलीग्राम (mg)", lb: "पाउंड (lb)",
      oz: "औंस (oz)", ton: "मीट्रिक टन (t)", st: "स्टोन (st)", ct: "कैरेट (ct)",
    },
    temperature: { C: "सेल्सियस (\u00B0C)", F: "फ़ारेनहाइट (\u00B0F)", K: "केल्विन (K)" },
    area: {
      "m\u00B2": "वर्ग मीटर (m\u00B2)", "km\u00B2": "वर्ग किलोमीटर (km\u00B2)",
      ha: "हेक्टेयर (ha)", acre: "एकड़", "ft\u00B2": "वर्ग फ़ीट (ft\u00B2)",
      "mi\u00B2": "वर्ग मील (mi\u00B2)", "yd\u00B2": "वर्ग गज़ (yd\u00B2)",
      "cm\u00B2": "वर्ग सेंटीमीटर (cm\u00B2)",
    },
    volume: {
      L: "लीटर (L)", mL: "मिलीलीटर (mL)", gal: "US गैलन (gal)",
      "fl oz": "US फ़्लूड औंस (fl oz)", cup: "US कप", pt: "US पाइंट (pt)",
      qt: "US क्वार्ट (qt)", "m\u00B3": "घन मीटर (m\u00B3)",
      "cm\u00B3": "घन सेंटीमीटर (cm\u00B3)", tbsp: "बड़ा चम्मच (tbsp)", tsp: "छोटा चम्मच (tsp)",
    },
    speed: {
      "m/s": "मीटर/सेकंड (m/s)", "km/h": "किलोमीटर/घंटा (km/h)", mph: "मील/घंटा (mph)",
      kn: "नॉट (kn)", "ft/s": "फ़ीट/सेकंड (ft/s)", mach: "मैक",
    },
    time: {
      ms: "मिलीसेकंड (ms)", s: "सेकंड (s)", min: "मिनट (min)", h: "घंटा (h)",
      d: "दिन (d)", wk: "हफ़्ता (wk)", mo: "महीना (mo)", yr: "साल (yr)",
    },
    pressure: {
      Pa: "पास्कल (Pa)", kPa: "किलोपास्कल (kPa)", bar: "बार", psi: "PSI",
      atm: "वायुमंडल (atm)", torr: "टॉर", mmHg: "mmHg",
    },
    energy: {
      J: "जूल (J)", kJ: "किलोजूल (kJ)", cal: "कैलोरी (cal)", kcal: "किलोकैलोरी (kcal)",
      Wh: "वॉट-घंटा (Wh)", kWh: "किलोवॉट-घंटा (kWh)", BTU: "BTU", eV: "इलेक्ट्रॉन वोल्ट (eV)",
    },
    power: {
      W: "वॉट (W)", kW: "किलोवॉट (kW)", MW: "मेगावॉट (MW)", hp: "हॉर्सपावर (hp)",
      "BTU/h": "BTU/घंटा", "cal/s": "कैलोरी/सेकंड",
    },
    frequency: {
      Hz: "हर्ट्ज़ (Hz)", kHz: "किलोहर्ट्ज़ (kHz)", MHz: "मेगाहर्ट्ज़ (MHz)",
      GHz: "गीगाहर्ट्ज़ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "डिग्री (\u00B0)", rad: "रेडियन (rad)", grad: "ग्रेडियन (grad)",
      turn: "चक्कर", arcmin: "आर्क मिनट (\u2032)", arcsec: "आर्क सेकंड (\u2033)",
    },
    "data-storage": {
      B: "बाइट (B)", KB: "किलोबाइट (KB)", MB: "मेगाबाइट (MB)", GB: "गीगाबाइट (GB)",
      TB: "टेराबाइट (TB)", PB: "पेटाबाइट (PB)", bit: "बिट",
      Kbit: "किलोबिट", Mbit: "मेगाबिट", Gbit: "गीगाबिट",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "कप", tbsp: "बड़ा चम्मच", tsp: "छोटा चम्मच", mL: "मिलीलीटर (mL)",
      L: "लीटर (L)", fl_oz: "फ़्लूड औंस", g: "ग्राम (g)", kg: "किलोग्राम (kg)",
      oz: "औंस (oz)", lb: "पाउंड (lb)",
    },
    "oven-temperature": { C: "सेल्सियस (\u00B0C)", F: "फ़ारेनहाइट (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "पिक्सल (px)", rem: "Root Em (rem)" },
    "px-em": { px: "पिक्सल (px)", em: "Em (em)" },
    "px-percent": { px: "पिक्सल (px)", "%": "प्रतिशत (%)" },
    "css-unit": {
      px: "पिक्सल (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "प्रतिशत (%)", vw: "व्यूपोर्ट चौड़ाई (vw)", vh: "व्यूपोर्ट ऊँचाई (vh)",
    },
  },
};

export default dict;
