import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "तुम्हाला हवी असलेली सर्व रूपांतरण साधने",
    titleAccent: "रूपांतरण",
    description:
      "एकके, रंग, डेटा फॉरमॅट, तारखा बदला. सर्व ब्राउझरमध्येच होते.",
    tabAll: "सर्व",
    categoryUnit: "एकके",
    categoryNumber: "संख्या",
    categoryColor: "रंग",
    categoryDatetime: "तारीख/वेळ",
    categoryData: "डेटा",
    categoryCss: "CSS",
    categoryCooking: "स्वयंपाक",
    categoryGeography: "भूगोल",
    searchPlaceholder: "रूपांतरक शोधा...",
    noResults: "कोणतेही रूपांतरक सापडले नाहीत.",
    recentTools: "अलीकडे वापरलेले",
    favorites: "आवडते",
    favDragHint: "पुन्हा क्रमवारी लावण्यासाठी ड्रॅग करा",
    favHint: "आवडते जोडण्यासाठी तारकावर क्लिक करा",
    gridView: "ग्रिड दृश्य",
    listView: "सूची दृश्य",
  },
  trust: {
    encryption: "सुरक्षित प्रक्रिया",
    encryptionDesc: "सर्व रूपांतरणे तुमच्या ब्राउझरमध्ये स्थानिकरित्या होतात",
    autoDelete: "डेटा साठवला जात नाही",
    autoDeleteDesc: "तुमचा इनपुट कधीही सेव्ह किंवा सर्व्हरला पाठवला जात नाही",
    free: "100% मोफत",
    freeDesc: "मर्यादा नाही, नोंदणी नाही, छुपे शुल्क नाही",
    browserProcessing: "तात्काळ निकाल",
    browserProcessingDesc: "तुम्ही टाइप करताना रिअल-टाइम रूपांतरण",
  },
  tools: {
    length: {
      title: "लांबी रूपांतरक",
      description:
        "मीटर, किलोमीटर, मैल, फूट, इंच आणि इतर एककांमध्ये रूपांतर करा.",
    },
    weight: {
      title: "वजन रूपांतरक",
      description:
        "किलोग्रॅम, पाउंड, औंस, टन आणि इतर एककांमध्ये रूपांतर करा.",
    },
    temperature: {
      title: "तापमान रूपांतरक",
      description: "सेल्सिअस, फॅरनहाइट आणि केल्विनमध्ये रूपांतर करा.",
    },
    area: {
      title: "क्षेत्रफळ रूपांतरक",
      description:
        "चौरस मीटर, हेक्टर, एकर, चौरस फूट आणि इतर एककांमध्ये रूपांतर करा.",
    },
    volume: {
      title: "आकारमान रूपांतरक",
      description:
        "लीटर, गॅलन, कप, फ्लुइड औंस आणि इतर एककांमध्ये रूपांतर करा.",
    },
    speed: {
      title: "वेग रूपांतरक",
      description: "m/s, km/h, mph, नॉट आणि इतर एककांमध्ये रूपांतर करा.",
    },
    time: {
      title: "वेळ रूपांतरक",
      description:
        "सेकंद, मिनिटे, तास, दिवस, आठवडे आणि इतर एककांमध्ये रूपांतर करा.",
    },
    pressure: {
      title: "दाब रूपांतरक",
      description:
        "Pascal, bar, PSI, atmosphere आणि इतर एककांमध्ये रूपांतर करा.",
    },
    energy: {
      title: "ऊर्जा रूपांतरक",
      description:
        "जूल, कॅलरी, किलोवॅट-तास, BTU आणि इतर एककांमध्ये रूपांतर करा.",
    },
    power: {
      title: "शक्ती रूपांतरक",
      description:
        "वॅट, किलोवॅट, अश्वशक्ती आणि इतर एककांमध्ये रूपांतर करा.",
    },
    frequency: {
      title: "वारंवारता रूपांतरक",
      description:
        "hertz, kilohertz, megahertz, gigahertz आणि RPM मध्ये रूपांतर करा.",
    },
    angle: {
      title: "कोन रूपांतरक",
      description: "अंश, रेडियन, ग्रेडियन आणि आवर्तनांमध्ये रूपांतर करा.",
    },
    "data-storage": {
      title: "डेटा स्टोरेज रूपांतरक",
      description:
        "बाइट, किलोबाइट, मेगाबाइट, गिगाबाइट आणि इतर एककांमध्ये रूपांतर करा.",
    },
    "fuel-economy": {
      title: "इंधन कार्यक्षमता रूपांतरक",
      description: "km/L, mpg आणि L/100km मध्ये रूपांतर करा.",
    },
    "number-base": {
      title: "अंकप्रणाली रूपांतरक",
      description:
        "द्विमान, अष्टमान, दशमान, षोडशमान आणि सानुकूल प्रणालींमध्ये रूपांतर करा.",
    },
    "roman-numeral": {
      title: "रोमन अंक रूपांतरक",
      description: "रोमन अंक आणि अरबी संख्यांमध्ये रूपांतर करा.",
    },
    "scientific-notation": {
      title: "वैज्ञानिक संकेतन रूपांतरक",
      description:
        "वैज्ञानिक संकेतन आणि मानक संख्यांमध्ये रूपांतर करा.",
    },
    "fraction-decimal": {
      title: "अपूर्णांक ↔ दशांश",
      description: "अपूर्णांक आणि दशांश संख्यांमध्ये रूपांतर करा.",
    },
    percentage: {
      title: "टक्केवारी रूपांतरक",
      description:
        "अपूर्णांक, दशांश आणि टक्केवारीमध्ये रूपांतर करा.",
    },
    "color-converter": {
      title: "रंग रूपांतरक",
      description:
        "HEX, RGB, HSL, HSV आणि CMYK रंग स्वरूपांमध्ये रूपांतर करा.",
    },
    "color-palette-generator": {
      title: "रंग पॅलेट जनरेटर",
      description:
        "पूरक, त्रिकोणी आणि समरूप रंग पॅलेट तयार करा.",
    },
    "gradient-generator": {
      title: "CSS ग्रेडियंट जनरेटर",
      description:
        "लिव्ह प्रिव्ह्यूसह रेषीय, रेडियल आणि शंक्वाकार CSS ग्रेडियंट तयार करा.",
    },
    "color-contrast-checker": {
      title: "रंग विरोधाभास तपासणी",
      description:
        "दोन रंगांमधील WCAG AA/AAA रंग विरोधाभास प्रमाण तपासा.",
    },
    "color-blindness-simulator": {
      title: "रंगांधत्व सिम्युलेटर",
      description:
        "रंग दृष्टी दोष असलेल्या लोकांना रंग कसे दिसतात याचे अनुकरण करा.",
    },
    timezone: {
      title: "टाइमझोन रूपांतरक",
      description:
        "जगभरातील विविध टाइमझोनमध्ये वेळ रूपांतर करा.",
    },
    "unix-timestamp": {
      title: "Unix टाइमस्टॅम्प रूपांतरक",
      description:
        "Unix टाइमस्टॅम्प आणि वाचनीय तारखांमध्ये रूपांतर करा.",
    },
    "date-format": {
      title: "तारीख स्वरूप रूपांतरक",
      description:
        "विविध स्वरूपांमध्ये तारखा रूपांतर करा (ISO, US, EU आणि इतर).",
    },
    "date-calculator": {
      title: "तारीख गणक",
      description:
        "दोन तारखांमधील फरक मोजा किंवा दिवस जोडा/वजा करा.",
    },
    "age-calculator": {
      title: "वय गणक",
      description:
        "जन्मतारखेपासून वर्षे, महिने आणि दिवसांत अचूक वय मोजा.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "JSON आणि YAML डेटा स्वरूपांमध्ये रूपांतर करा.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "JSON अॅरे आणि CSV स्प्रेडशीट स्वरूपांमध्ये रूपांतर करा.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "JSON आणि XML डेटा स्वरूपांमध्ये रूपांतर करा.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "JSON आणि TOML कॉन्फिगरेशन स्वरूपांमध्ये रूपांतर करा.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Markdown आणि HTML मार्कअपमध्ये रूपांतर करा.",
    },
    "csv-table": {
      title: "CSV ते टेबल",
      description: "CSV डेटा Markdown किंवा HTML टेबलमध्ये रूपांतर करा.",
    },
    "json-typescript": {
      title: "JSON ते TypeScript",
      description: "JSON डेटावरून TypeScript इंटरफेस तयार करा.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "SQL INSERT स्टेटमेंट आणि JSON डेटामध्ये रूपांतर करा.",
    },
    "px-rem": {
      title: "px ↔ rem रूपांतरक",
      description:
        "सानुकूल बेस साइझसह पिक्सेल आणि rem एककांमध्ये रूपांतर करा.",
    },
    "px-em": {
      title: "px ↔ em रूपांतरक",
      description:
        "सानुकूल पॅरेंट साइझसह पिक्सेल आणि em एककांमध्ये रूपांतर करा.",
    },
    "px-percent": {
      title: "px ↔ % रूपांतरक",
      description:
        "सानुकूल कंटेनर रुंदीसह पिक्सेल आणि टक्केवारीमध्ये रूपांतर करा.",
    },
    "css-unit": {
      title: "CSS एकक रूपांतरक",
      description:
        "px, rem, em, %, vw, vh आणि इतर CSS एककांमध्ये रूपांतर करा.",
    },
    "css-minifier": {
      title: "CSS मिनिफाय / सुशोभित",
      description:
        "उत्पादनासाठी किंवा वाचनीयतेसाठी CSS कोड मिनिफाय किंवा सुशोभित करा.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tailwind CSS क्लासेस आणि साध्या CSS मध्ये रूपांतर करा.",
    },
    "cooking-measurement": {
      title: "स्वयंपाक मोजमाप रूपांतरक",
      description:
        "कप, चमचे, चमचे, मिलीलीटर आणि ग्रॅममध्ये रूपांतर करा.",
    },
    "recipe-scaler": {
      title: "रेसिपी स्केलर",
      description:
        "वाढणी संख्येनुसार रेसिपीचे घटक समायोजित करा.",
    },
    "oven-temperature": {
      title: "ओव्हन तापमान रूपांतरक",
      description:
        "ओव्हन तापमानासाठी सेल्सिअस, फॅरनहाइट आणि Gas Mark मध्ये रूपांतर करा.",
    },
    coordinate: {
      title: "निर्देशांक रूपांतरक",
      description:
        "DMS, DD आणि DDM निर्देशांक स्वरूपांमध्ये रूपांतर करा.",
    },
    "distance-calculator": {
      title: "अंतर गणक",
      description:
        "दोन भौगोलिक निर्देशांकांमधील अंतर मोजा.",
    },
  },
  nav: {
    allTools: "सर्व रूपांतरक",
    language: "भाषा",
  },
  footer: {
    tools: "रूपांतरक",
    legal: "कायदेशीर",
    privacy: "गोपनीयता धोरण",
    terms: "सेवा अटी",
    copyright: "ToolPop. सर्व हक्क राखीव.",
    company: "कंपनी",
    about: "आमच्याबद्दल",
    contact: "संपर्क",
    faq: "वारंवार विचारले जाणारे प्रश्न",
  },
  common: {
    backToAll: "सर्व रूपांतरक",
    inputPlaceholder: "रूपांतरित करण्यासाठी मूल्य प्रविष्ट करा...",
    outputLabel: "निकाल",
    copyToClipboard: "क्लिपबोर्डवर कॉपी करा",
    copied: "कॉपी केले!",
    clear: "साफ करा",
    paste: "पेस्ट करा",
    processing: "रूपांतरित करत आहे...",
    startOver: "पुन्हा सुरू करा",
    process: "रूपांतर करा",
    tryAgain: "पुन्हा प्रयत्न करा",
    notImplemented: "हा रूपांतरक लवकरच येत आहे.",
    tryOtherTools: "इतर रूपांतरक वापरून पहा",
    privacyBadge: "सर्व रूपांतरणे तुमच्या ब्राउझरमध्ये होतात",
    favoriteAdded: "आवडत्यांमध्ये जोडले",
    favoriteRemoved: "आवडत्यांमधून काढले",
    comingSoon: "लवकरच येत आहे",
    share: "शेअर करा",
    shareTitle: "हा रूपांतरक शेअर करा",
    shareSubtitle: "हा उपयुक्त रूपांतरक इतरांसह शेअर करा",
    shareCopied: "लिंक कॉपी केली!",
    shareCopyLink: "लिंक कॉपी करा",
    downloadAsFile: "डाउनलोड करा",
    options: "पर्याय",
    input: "इनपुट",
    output: "आउटपुट",
    convert: "रूपांतर करा",
    swap: "बदला",
    from: "कडून",
    to: "कडे",
    result: "निकाल",
    allConversions: "सर्व रूपांतरणे",
    details: "तपशील",
    pageNotFound: "रूपांतरक सापडला नाही",
    goHome: "सर्व रूपांतरकांवर परत जा",
    colorPickerLabel: "रंग निवडक",
  },
  toolOptions: {
    fromUnit: "कडून",
    toUnit: "कडे",
    precision: "दशांश स्थाने",
    baseSize: "बेस फॉन्ट साइझ (px)",
    parentSize: "पॅरेंट फॉन्ट साइझ (px)",
    containerWidth: "कंटेनर रुंदी (px)",
    viewportWidth: "व्ह्यूपोर्ट रुंदी (px)",
    viewportHeight: "व्ह्यूपोर्ट उंची (px)",
    direction: "दिशा",
    mode: "मोड",
    ingredient: "घटक",
    water: "पाणी",
    flour: "पीठ",
    sugar: "साखर",
    butter: "लोणी",
    rice: "तांदूळ",
    milk: "दूध",
    originalServings: "मूळ वाढणी",
    targetServings: "हवी असलेली वाढणी",
    fromTimezone: "मूळ टाइमझोन",
    toTimezone: "लक्ष्य टाइमझोन",
    inputFormat: "इनपुट स्वरूप",
    outputFormat: "आउटपुट स्वरूप",
    harmony: "रंग सुसंवाद",
    complementary: "पूरक",
    triadic: "त्रिकोणी",
    analogous: "समरूप",
    splitComplementary: "विभाजित पूरक",
    tetradic: "चतुर्भुज",
    gradientType: "ग्रेडियंट प्रकार",
    linear: "रेषीय",
    radial: "रेडियल",
    conic: "शंक्वाकार",
    gradientAngle: "कोन (deg)",
    rootName: "रूट इंटरफेस नाव",
    tableName: "टेबल नाव",
    minify: "मिनिफाय",
    beautify: "सुशोभित",
    colorType: "दोषाचा प्रकार",
    protanopia: "प्रोटानोपिया (लाल नाही)",
    deuteranopia: "ड्यूटरनोपिया (हिरवा नाही)",
    tritanopia: "ट्रायटानोपिया (निळा नाही)",
    achromatopsia: "अक्रोमॅटोप्सिया (रंग नाही)",
    operation: "ऑपरेशन",
    difference: "फरक",
    add: "जोडा",
    subtract: "वजा करा",
    amount: "रक्कम",
    unit: "एकक",
    days: "दिवस",
    weeks: "आठवडे",
    months: "महिने",
    years: "वर्षे",
    fromBase: "या प्रणालीतून",
    toBase: "या प्रणालीत",
    binary: "द्विमान (2)",
    octal: "अष्टमान (8)",
    decimal: "दशमान (10)",
    hexadecimal: "षोडशमान (16)",
    seconds: "सेकंद",
    milliseconds: "मिलिसेकंद",
    autoDetect: "स्वयं-शोध",
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
    toFraction: "दशांश → अपूर्णांक",
    toDecimal: "अपूर्णांक → दशांश",
    decimalToPercent: "दशांश → टक्के",
    percentToDecimal: "टक्के → दशांश",
    fractionToPercent: "अपूर्णांक → टक्के",
    dd: "दशांश अंश (DD)",
    dms: "अंश मिनिटे सेकंद (DMS)",
    ddm: "अंश दशांश मिनिटे (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "दीर्घ स्वरूप",
    short: "लघु स्वरूप",
    relative: "सापेक्ष",
    celsius: "सेल्सिअस (°C)",
    fahrenheit: "फॅरनहाइट (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "पार्श्वभूमी रंग",
    monochromatic: "एकवर्णी",
    timestampToDate: "टाइमस्टॅम्प → तारीख",
    dateToTimestamp: "तारीख → टाइमस्टॅम्प",
    showDetails: "तपशीलवार विश्लेषण दाखवा",
    addDays: "दिवस जोडा",
    subtractDays: "दिवस वजा करा",
    datetimeHint: "उदा. 2024-01-15, 1705312200, now",
    endDate: "शेवटची तारीख",
    today: "आज (डीफॉल्ट)",
    dateUnit: "एकक",
  },
  statsLabels: {
    lines: "ओळी",
    characters: "अक्षरे",
    rows: "पंक्ती",
    columns: "स्तंभ",
    elements: "घटक",
    keys: "की",
    interfaces: "इंटरफेस",
    properties: "गुणधर्म",
    originalSize: "मूळ आकार",
    resultSize: "निकाल आकार",
    savings: "बचत",
    ingredients: "घटक",
    scaleFactor: "स्केल घटक",
    contrastRatio: "विरोधाभास प्रमाण",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "अक्षांश",
    longitude: "रेखांश",
    distanceKm: "अंतर (km)",
    distanceMi: "अंतर (mi)",
    years: "वर्षे",
    months: "महिने",
    days: "दिवस",
  },
  processorMessages: {
    invalidTimezone: "अवैध टाइमझोन",
    pass: "उत्तीर्ण", fail: "अनुत्तीर्ण",
    fromNow: "आतापासून", ago: "पूर्वी",
    today: "आज", tomorrow: "उद्या", yesterday: "काल",
    seconds: "सेकंद", secondsPlural: "सेकंद",
    minutes: "मिनिट", minutesPlural: "मिनिटे",
    hours: "तास", hoursPlural: "तास",
    daysUnit: "दिवस", daysPlural: "दिवस",
    weeksUnit: "आठवडा", weeksPlural: "आठवडे",
    monthsUnit: "महिना", monthsPlural: "महिने",
    yearsUnit: "वर्ष", yearsPlural: "वर्षे",
    gasmark: "Gas Mark",
    veryCool: "खूप थंड", cool: "थंड", moderatelyCool: "मध्यम थंड",
    moderate: "मध्यम", moderatelyHot: "मध्यम गरम",
    hot: "गरम", veryHot: "खूप गरम", extremelyHot: "अत्यंत गरम",
    gasMark: "गॅस मार्क",
    original: "मूळ",
    from: "कडून", to: "कडे",
    totalDays: "एकूण दिवस", weeksDays: "आठवडे + दिवस",
    originalDate: "मूळ तारीख", operationLabel: "ऑपरेशन",
    resultDate: "निकाल तारीख", dayOfWeek: "आठवड्याचा दिवस",
    daysBetween: "दिवसांचा फरक",
    age: "वय", totalMonths: "एकूण महिने",
    totalHours: "एकूण तास", totalMinutes: "एकूण मिनिटे",
    nextBirthday: "पुढचा वाढदिवस",
    roman: "रोमन", arabic: "अरबी",
    scientific: "वैज्ञानिक", standard: "मानक", engineering: "अभियांत्रिकी",
    fraction: "अपूर्णांक", simplified: "सरलीकृत", percentage: "टक्केवारी",
    color1: "रंग १", color2: "रंग २",
    contrastRatioLabel: "विरोधाभास प्रमाण",
    aaNormalText: "AA सामान्य मजकूर", aaLargeText: "AA मोठा मजकूर",
    aaaNormalText: "AAA सामान्य मजकूर", aaaLargeText: "AAA मोठा मजकूर",
    gradientTypeLabel: "प्रकार", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop रूपांतरक — मोफत ऑनलाइन रूपांतरक",
    siteDescription:
      "एकके, रंग, डेटा स्वरूप, तारखा आणि बरेच काही रूपांतरित करा. मोफत, जलद आणि खाजगी — सर्व काही तुमच्या ब्राउझरमध्ये चालते.",
    toolTitleSuffix: "| ToolPop रूपांतरक",
  },
  blog: {
    title: "ब्लॉग",
    description:
      "एकक रूपांतरण, डेटा स्वरूप आणि बरेच काही याबद्दल टिप्स, मार्गदर्शक आणि ज्ञान.",
    readMore: "अधिक वाचा",
    backToBlog: "ब्लॉगवर परत जा",
    publishedOn: "प्रकाशित",
    categoryGuide: "मार्गदर्शक",
    categoryTips: "टिप्स",
    categoryKnowledge: "ज्ञान",
  },
  cookie: {
    message:
      "तुमचा अनुभव सुधारण्यासाठी आम्ही कुकीज वापरतो. सुरू ठेवून तुम्ही आमच्या कुकी धोरणाशी सहमत होता.",
    accept: "स्वीकारा",
    decline: "नकार द्या",
  },
  unitLabels: {
    length: {
      m: "मीटर (m)", km: "किलोमीटर (km)", cm: "सेंटिमीटर (cm)", mm: "मिलिमीटर (mm)",
      mi: "मैल (mi)", yd: "यार्ड (yd)", ft: "फूट (ft)", in: "इंच (in)",
      nm: "नॉटिकल मैल (nm)", "\u03BCm": "मायक्रोमीटर (\u03BCm)",
    },
    weight: {
      kg: "किलोग्रॅम (kg)", g: "ग्रॅम (g)", mg: "मिलिग्रॅम (mg)", lb: "पाउंड (lb)",
      oz: "औंस (oz)", ton: "मेट्रिक टन (t)", st: "स्टोन (st)", ct: "कॅरेट (ct)",
    },
    temperature: { C: "सेल्सिअस (\u00B0C)", F: "फॅरनहाइट (\u00B0F)", K: "केल्विन (K)" },
    area: {
      "m\u00B2": "चौरस मीटर (m\u00B2)", "km\u00B2": "चौरस किलोमीटर (km\u00B2)",
      ha: "हेक्टर (ha)", acre: "एकर", "ft\u00B2": "चौरस फूट (ft\u00B2)",
      "mi\u00B2": "चौरस मैल (mi\u00B2)", "yd\u00B2": "चौरस यार्ड (yd\u00B2)",
      "cm\u00B2": "चौरस सेंटिमीटर (cm\u00B2)",
    },
    volume: {
      L: "लीटर (L)", mL: "मिलिलीटर (mL)", gal: "US गॅलन (gal)",
      "fl oz": "US फ्लुइड औंस (fl oz)", cup: "US कप", pt: "US पाइंट (pt)",
      qt: "US क्वार्ट (qt)", "m\u00B3": "घनमीटर (m\u00B3)",
      "cm\u00B3": "घनसेंटिमीटर (cm\u00B3)", tbsp: "चमचा (tbsp)", tsp: "चमचा (tsp)",
    },
    speed: {
      "m/s": "मीटर/सेकंद (m/s)", "km/h": "किलोमीटर/तास (km/h)", mph: "मैल/तास (mph)",
      kn: "नॉट (kn)", "ft/s": "फूट/सेकंद (ft/s)", mach: "मॅक",
    },
    time: {
      ms: "मिलिसेकंद (ms)", s: "सेकंद (s)", min: "मिनिट (min)", h: "तास (h)",
      d: "दिवस (d)", wk: "आठवडा (wk)", mo: "महिना (mo)", yr: "वर्ष (yr)",
    },
    pressure: {
      Pa: "पास्कल (Pa)", kPa: "किलोपास्कल (kPa)", bar: "बार", psi: "PSI",
      atm: "अ‍ॅटमॉस्फिअर (atm)", torr: "टॉर", mmHg: "mmHg",
    },
    energy: {
      J: "जूल (J)", kJ: "किलोजूल (kJ)", cal: "कॅलरी (cal)", kcal: "किलोकॅलरी (kcal)",
      Wh: "वॅट-तास (Wh)", kWh: "किलोवॅट-तास (kWh)", BTU: "BTU", eV: "इलेक्ट्रॉनव्होल्ट (eV)",
    },
    power: {
      W: "वॅट (W)", kW: "किलोवॅट (kW)", MW: "मेगावॅट (MW)", hp: "अश्वशक्ती (hp)",
      "BTU/h": "BTU/तास", "cal/s": "कॅलरी/सेकंद",
    },
    frequency: {
      Hz: "हर्ट्झ (Hz)", kHz: "किलोहर्ट्झ (kHz)", MHz: "मेगाहर्ट्झ (MHz)",
      GHz: "गिगाहर्ट्झ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "अंश (\u00B0)", rad: "रेडियन (rad)", grad: "ग्रेडियन (grad)",
      turn: "आवर्तन", arcmin: "कोनमिनिट (\u2032)", arcsec: "कोनसेकंद (\u2033)",
    },
    "data-storage": {
      B: "बाइट (B)", KB: "किलोबाइट (KB)", MB: "मेगाबाइट (MB)", GB: "गिगाबाइट (GB)",
      TB: "टेराबाइट (TB)", PB: "पेटाबाइट (PB)", bit: "बिट",
      Kbit: "किलोबिट", Mbit: "मेगाबिट", Gbit: "गिगाबिट",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "कप", tbsp: "चमचा", tsp: "चमचा", mL: "मिलिलीटर (mL)",
      L: "लीटर (L)", fl_oz: "फ्लुइड औंस", g: "ग्रॅम (g)", kg: "किलोग्रॅम (kg)",
      oz: "औंस (oz)", lb: "पाउंड (lb)",
    },
    "oven-temperature": { C: "सेल्सिअस (\u00B0C)", F: "फॅरनहाइट (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "पिक्सेल (px)", rem: "Root Em (rem)" },
    "px-em": { px: "पिक्सेल (px)", em: "Em (em)" },
    "px-percent": { px: "पिक्सेल (px)", "%": "टक्के (%)" },
    "css-unit": {
      px: "पिक्सेल (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "टक्के (%)", vw: "व्ह्यूपोर्ट रुंदी (vw)", vh: "व्ह्यूपोर्ट उंची (vh)",
    },
  },
};

export default dict;
