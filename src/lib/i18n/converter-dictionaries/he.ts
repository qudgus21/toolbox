import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "כל כלי ההמרה שתצטרכו",
    titleAccent: "ההמרה",
    description:
      "המירו יחידות, צבעים, פורמטים, תאריכים ועוד. הכל ישירות בדפדפן.",
    tabAll: "הכל",
    categoryUnit: "יחידות",
    categoryNumber: "מספרים",
    categoryColor: "צבעים",
    categoryDatetime: "תאריך/שעה",
    categoryData: "נתונים",
    categoryCss: "CSS",
    categoryCooking: "בישול",
    categoryGeography: "גאוגרפיה",
    searchPlaceholder: "חיפוש ממירים...",
    noResults: "לא נמצאו ממירים.",
    recentTools: "בשימוש לאחרונה",
    favorites: "מועדפים",
    favDragHint: "גררו לשינוי סדר",
    favHint: "לחצו על הכוכב להוספה למועדפים",
    gridView: "תצוגת רשת",
    listView: "תצוגת רשימה",
  },
  trust: {
    encryption: "עיבוד מאובטח",
    encryptionDesc: "כל ההמרות מתבצעות מקומית בדפדפן שלכם",
    autoDelete: "ללא שמירת נתונים",
    autoDeleteDesc: "הקלט שלכם לא נשמר ולא נשלח לשרת",
    free: "חינם לגמרי",
    freeDesc: "ללא הגבלות, ללא הרשמה, ללא עלויות נסתרות",
    browserProcessing: "תוצאות מיידיות",
    browserProcessingDesc: "המרה בזמן אמת תוך כדי הקלדה",
  },
  tools: {
    length: {
      title: "ממיר אורך",
      description:
        "המרה בין מטרים, קילומטרים, מיילים, רגל, אינצ׳ים ועוד.",
    },
    weight: {
      title: "ממיר משקל",
      description:
        "המרה בין קילוגרמים, פאונד, אונקיות, טונות ועוד.",
    },
    temperature: {
      title: "ממיר טמפרטורה",
      description: "המרה בין צלזיוס, פרנהייט וקלווין.",
    },
    area: {
      title: "ממיר שטח",
      description:
        "המרה בין מטרים רבועים, הקטארים, אקרים, רגל רבועה ועוד.",
    },
    volume: {
      title: "ממיר נפח",
      description:
        "המרה בין ליטרים, גלונים, כוסות, אונקיות נוזל ועוד.",
    },
    speed: {
      title: "ממיר מהירות",
      description: "המרה בין מ/ש, קמ/ש, מיילים לשעה, קשרים ועוד.",
    },
    time: {
      title: "ממיר זמן",
      description:
        "המרה בין שניות, דקות, שעות, ימים, שבועות ועוד.",
    },
    pressure: {
      title: "ממיר לחץ",
      description:
        "המרה בין פסקל, בר, PSI, אטמוספרה ועוד.",
    },
    energy: {
      title: "ממיר אנרגיה",
      description:
        "המרה בין ג׳אול, קלוריות, קילוואט-שעה, BTU ועוד.",
    },
    power: {
      title: "ממיר הספק",
      description:
        "המרה בין ואט, קילוואט, כוחות סוס ועוד.",
    },
    frequency: {
      title: "ממיר תדירות",
      description:
        "המרה בין הרץ, קילוהרץ, מגהרץ, גיגהרץ ו-RPM.",
    },
    angle: {
      title: "ממיר זוויות",
      description: "המרה בין מעלות, רדיאנים, גרדיאנים וסיבובים.",
    },
    "data-storage": {
      title: "ממיר אחסון נתונים",
      description:
        "המרה בין בייטים, קילובייטים, מגבייטים, גיגבייטים ועוד.",
    },
    "fuel-economy": {
      title: "ממיר צריכת דלק",
      description: "המרה בין קמ/ל, mpg ו-ל/100 קמ.",
    },
    "number-base": {
      title: "ממיר בסיסי מספרים",
      description:
        "המרה בין בינארי, אוקטלי, עשרוני, הקסדצימלי ובסיסים מותאמים.",
    },
    "roman-numeral": {
      title: "ממיר ספרות רומיות",
      description: "המרה בין ספרות רומיות למספרים ערביים.",
    },
    "scientific-notation": {
      title: "ממיר סימון מדעי",
      description:
        "המרה בין סימון מדעי למספרים רגילים.",
    },
    "fraction-decimal": {
      title: "שבר ↔ עשרוני",
      description: "המרה בין שברים למספרים עשרוניים.",
    },
    percentage: {
      title: "ממיר אחוזים",
      description:
        "המרה בין שברים, עשרוניים ואחוזים.",
    },
    "color-converter": {
      title: "ממיר צבעים",
      description:
        "המרה בין פורמטים HEX, RGB, HSL, HSV ו-CMYK.",
    },
    "color-palette-generator": {
      title: "מחולל פלטות צבע",
      description:
        "יצירת פלטות צבע משלימות, טריאדיות ואנלוגיות.",
    },
    "gradient-generator": {
      title: "מחולל CSS Gradient",
      description:
        "יצירת גרדיאנטים לינאריים, רדיאליים וקוניים עם תצוגה מקדימה.",
    },
    "color-contrast-checker": {
      title: "בודק ניגודיות צבעים",
      description:
        "בדיקת יחס ניגודיות WCAG AA/AAA בין שני צבעים.",
    },
    "color-blindness-simulator": {
      title: "סימולטור עיוורון צבעים",
      description:
        "הדמיית מראה הצבעים עבור אנשים עם לקויות ראיית צבע.",
    },
    timezone: {
      title: "ממיר אזורי זמן",
      description:
        "המרת שעות בין אזורי זמן שונים ברחבי העולם.",
    },
    "unix-timestamp": {
      title: "ממיר Unix Timestamp",
      description:
        "המרה בין חותמות זמן Unix לתאריכים קריאים.",
    },
    "date-format": {
      title: "ממיר פורמט תאריך",
      description:
        "המרת תאריכים בין פורמטים שונים (ISO, אמריקני, אירופי ועוד).",
    },
    "date-calculator": {
      title: "מחשבון תאריכים",
      description:
        "חישוב ההפרש בין תאריכים או הוספה/הפחתה של ימים.",
    },
    "age-calculator": {
      title: "מחשבון גיל",
      description:
        "חישוב גיל מדויק מתאריך לידה בשנים, חודשים וימים.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "המרה בין פורמטים JSON ו-YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "המרה בין מערכי JSON לפורמט גיליון CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "המרה בין פורמטים JSON ו-XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "המרה בין פורמטי JSON ו-TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "המרה בין Markdown ו-HTML.",
    },
    "csv-table": {
      title: "CSV לטבלה",
      description: "המרת נתוני CSV לטבלאות Markdown או HTML.",
    },
    "json-typescript": {
      title: "JSON ל-TypeScript",
      description: "יצירת ממשקי TypeScript מנתוני JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "המרה בין פקודות SQL INSERT לנתוני JSON.",
    },
    "px-rem": {
      title: "ממיר px ↔ rem",
      description:
        "המרה בין פיקסלים ליחידות rem עם גודל בסיס מותאם.",
    },
    "px-em": {
      title: "ממיר px ↔ em",
      description:
        "המרה בין פיקסלים ליחידות em עם גודל אלמנט אב מותאם.",
    },
    "px-percent": {
      title: "ממיר px ↔ %",
      description:
        "המרה בין פיקסלים לאחוזים עם רוחב מכולה מותאם.",
    },
    "css-unit": {
      title: "ממיר יחידות CSS",
      description:
        "המרה בין px, rem, em, %, vw, vh ויחידות CSS נוספות.",
    },
    "css-minifier": {
      title: "מכווץ / מעצב CSS",
      description:
        "כיווץ או עיצוב קוד CSS לייצור או לקריאות.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "המרה בין מחלקות Tailwind CSS ל-CSS רגיל.",
    },
    "cooking-measurement": {
      title: "ממיר מידות בישול",
      description:
        "המרה בין כוסות, כפות, כפיות, מיליליטרים וגרמים.",
    },
    "recipe-scaler": {
      title: "שינוי כמות במתכון",
      description:
        "התאמת כמויות מרכיבים במתכון לפי מספר מנות.",
    },
    "oven-temperature": {
      title: "ממיר טמפרטורת תנור",
      description:
        "המרה בין צלזיוס, פרנהייט ו-Gas Mark לטמפרטורות תנור.",
    },
    coordinate: {
      title: "ממיר קואורדינטות",
      description:
        "המרה בין פורמטים DMS, DD ו-DDM.",
    },
    "distance-calculator": {
      title: "מחשבון מרחקים",
      description:
        "חישוב המרחק בין שתי נקודות גאוגרפיות.",
    },
  },
  nav: {
    allTools: "כל כלי ההמרה",
    language: "שפה",
  },
  footer: {
    tools: "ממירים",
    legal: "משפטי",
    privacy: "מדיניות פרטיות",
    terms: "תנאי שימוש",
    copyright: "ToolPop. כל הזכויות שמורות.",
    company: "חברה",
    about: "אודות",
    contact: "צור קשר",
    faq: "שאלות נפוצות",
  },
  common: {
    backToAll: "כל הממירים",
    inputPlaceholder: "הזינו ערך להמרה...",
    outputLabel: "תוצאה",
    copyToClipboard: "העתקה ללוח",
    copied: "הועתק!",
    clear: "נקה",
    paste: "הדבק",
    processing: "ממיר...",
    startOver: "התחל מחדש",
    process: "המר",
    tryAgain: "נסו שוב",
    notImplemented: "ממיר זה יהיה זמין בקרוב.",
    tryOtherTools: "נסו ממירים אחרים",
    privacyBadge: "כל ההמרות מתבצעות בדפדפן שלכם",
    favoriteAdded: "נוסף למועדפים",
    favoriteRemoved: "הוסר מהמועדפים",
    comingSoon: "בקרוב",
    share: "שתף",
    shareTitle: "שתפו ממיר זה",
    shareSubtitle: "שתפו את הממיר השימושי הזה עם אחרים",
    shareCopied: "הקישור הועתק!",
    shareCopyLink: "העתק קישור",
    downloadAsFile: "הורדה",
    options: "אפשרויות",
    input: "קלט",
    output: "פלט",
    convert: "המר",
    swap: "החלף",
    from: "מ",
    to: "ל",
    result: "תוצאה",
    allConversions: "כל ההמרות",
    details: "פרטים",
    pageNotFound: "הממיר לא נמצא",
    goHome: "חזרה לכל הממירים",
    colorPickerLabel: "בוחר צבעים",
  },
  toolOptions: {
    fromUnit: "מ",
    toUnit: "ל",
    precision: "ספרות עשרוניות",
    baseSize: "גודל גופן בסיס (px)",
    parentSize: "גודל גופן אלמנט אב (px)",
    containerWidth: "רוחב מכולה (px)",
    viewportWidth: "רוחב חלון תצוגה (px)",
    viewportHeight: "גובה חלון תצוגה (px)",
    direction: "כיוון",
    mode: "מצב",
    ingredient: "מרכיב",
    water: "מים",
    flour: "קמח",
    sugar: "סוכר",
    butter: "חמאה",
    rice: "אורז",
    milk: "חלב",
    originalServings: "מנות מקוריות",
    targetServings: "מנות רצויות",
    fromTimezone: "מאזור זמן",
    toTimezone: "לאזור זמן",
    inputFormat: "פורמט קלט",
    outputFormat: "פורמט פלט",
    harmony: "הרמוניית צבעים",
    complementary: "משלים",
    triadic: "טריאדי",
    analogous: "אנלוגי",
    splitComplementary: "משלים מפוצל",
    tetradic: "טטראדי",
    gradientType: "סוג גרדיאנט",
    linear: "לינארי",
    radial: "רדיאלי",
    conic: "קוני",
    gradientAngle: "זווית (מעלות)",
    rootName: "שם ממשק ראשי",
    tableName: "שם טבלה",
    minify: "כיווץ",
    beautify: "עיצוב",
    colorType: "סוג לקות",
    protanopia: "פרוטנופיה (ללא אדום)",
    deuteranopia: "דויטרנופיה (ללא ירוק)",
    tritanopia: "טריטנופיה (ללא כחול)",
    achromatopsia: "אכרומטופסיה (ללא צבע)",
    operation: "פעולה",
    difference: "הפרש",
    add: "הוספה",
    subtract: "הפחתה",
    amount: "כמות",
    unit: "יחידה",
    days: "ימים",
    weeks: "שבועות",
    months: "חודשים",
    years: "שנים",
    fromBase: "מבסיס",
    toBase: "לבסיס",
    binary: "בינארי (2)",
    octal: "אוקטלי (8)",
    decimal: "עשרוני (10)",
    hexadecimal: "הקסדצימלי (16)",
    seconds: "שניות",
    milliseconds: "אלפיות שנייה",
    autoDetect: "זיהוי אוטומטי",
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
    markdown: "טבלת Markdown",
    html: "טבלת HTML",
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
    toRoman: "מספר → רומי",
    toArabic: "רומי → מספר",
    toScientific: "רגיל → מדעי",
    toStandard: "מדעי → רגיל",
    toFraction: "עשרוני → שבר",
    toDecimal: "שבר → עשרוני",
    decimalToPercent: "עשרוני → אחוז",
    percentToDecimal: "אחוז → עשרוני",
    fractionToPercent: "שבר → אחוז",
    dd: "מעלות עשרוניות (DD)",
    dms: "מעלות דקות שניות (DMS)",
    ddm: "מעלות דקות עשרוניות (DDM)",
    iso: "ISO 8601",
    us: "אמריקני (MM/DD/YYYY)",
    eu: "אירופי (DD/MM/YYYY)",
    long: "פורמט ארוך",
    short: "פורמט קצר",
    relative: "יחסי",
    celsius: "צלזיוס (°C)",
    fahrenheit: "פרנהייט (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "צבע רקע",
    monochromatic: "מונוכרומטי",
    timestampToDate: "חותמת זמן → תאריך",
    dateToTimestamp: "תאריך → חותמת זמן",
    showDetails: "הצג פירוט מלא",
    addDays: "הוסף ימים",
    subtractDays: "הפחת ימים",
    datetimeHint: "למשל 2024-01-15, 1705312200, now",
    endDate: "תאריך סיום",
    today: "היום (ברירת מחדל)",
    dateUnit: "יחידה",
  },
  statsLabels: {
    lines: "שורות",
    characters: "תווים",
    rows: "שורות",
    columns: "עמודות",
    elements: "רכיבים",
    keys: "מפתחות",
    interfaces: "ממשקים",
    properties: "מאפיינים",
    originalSize: "גודל מקורי",
    resultSize: "גודל תוצאה",
    savings: "חיסכון",
    ingredients: "מרכיבים",
    scaleFactor: "מקדם שינוי",
    contrastRatio: "יחס ניגודיות",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "קו רוחב",
    longitude: "קו אורך",
    distanceKm: "מרחק (ק״מ)",
    distanceMi: "מרחק (מייל)",
    years: "שנים",
    months: "חודשים",
    days: "ימים",
  },
  processorMessages: {
    invalidTimezone: "אזור זמן לא חוקי",
    pass: "עובר", fail: "נכשל",
    fromNow: "מעכשיו", ago: "לפני",
    today: "היום", tomorrow: "מחר", yesterday: "אתמול",
    seconds: "שנייה", secondsPlural: "שניות",
    minutes: "דקה", minutesPlural: "דקות",
    hours: "שעה", hoursPlural: "שעות",
    daysUnit: "יום", daysPlural: "ימים",
    weeksUnit: "שבוע", weeksPlural: "שבועות",
    monthsUnit: "חודש", monthsPlural: "חודשים",
    yearsUnit: "שנה", yearsPlural: "שנים",
    gasmark: "Gas Mark",
    veryCool: "קר מאוד", cool: "קר", moderatelyCool: "קריר",
    moderate: "בינוני", moderatelyHot: "חם בינוני",
    hot: "חם", veryHot: "חם מאוד", extremelyHot: "חם קיצוני",
    gasMark: "סימן גז",
    original: "מקורי",
    from: "מ", to: "עד",
    totalDays: "סה״כ ימים", weeksDays: "שבועות + ימים",
    originalDate: "תאריך מקורי", operationLabel: "פעולה",
    resultDate: "תאריך תוצאה", dayOfWeek: "יום בשבוע",
    daysBetween: "ימים בין",
    age: "גיל", totalMonths: "סה״כ חודשים",
    totalHours: "סה״כ שעות", totalMinutes: "סה״כ דקות",
    nextBirthday: "יום ההולדת הבא",
    roman: "רומי", arabic: "ערבי",
    scientific: "מדעי", standard: "רגיל", engineering: "הנדסי",
    fraction: "שבר", simplified: "מפושט", percentage: "אחוז",
    color1: "צבע 1", color2: "צבע 2",
    contrastRatioLabel: "יחס ניגודיות",
    aaNormalText: "AA טקסט רגיל", aaLargeText: "AA טקסט גדול",
    aaaNormalText: "AAA טקסט רגיל", aaaLargeText: "AAA טקסט גדול",
    gradientTypeLabel: "סוג", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — ממירים מקוונים חינם",
    siteDescription:
      "המרת יחידות, צבעים, פורמטים, תאריכים ועוד. חינם, מהיר ופרטי — הכל רץ בדפדפן שלכם.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "בלוג",
    description:
      "טיפים, מדריכים וידע בנושא המרת יחידות, פורמטים ועוד.",
    readMore: "קראו עוד",
    backToBlog: "חזרה לבלוג",
    publishedOn: "פורסם ב",
    categoryGuide: "מדריך",
    categoryTips: "טיפים",
    categoryKnowledge: "ידע",
  },
  cookie: {
    message:
      "אנו משתמשים בעוגיות לשיפור החוויה שלכם. בהמשך הגלישה, אתם מסכימים למדיניות העוגיות שלנו.",
    accept: "אישור",
    decline: "דחייה",
  },
  unitLabels: {
    length: {
      m: "מטר (m)", km: "קילומטר (km)", cm: "סנטימטר (cm)", mm: "מילימטר (mm)",
      mi: "מייל (mi)", yd: "יארד (yd)", ft: "רגל (ft)", in: "אינצ׳ (in)",
      nm: "מייל ימי (nm)", "\u03BCm": "מיקרומטר (\u03BCm)",
    },
    weight: {
      kg: "קילוגרם (kg)", g: "גרם (g)", mg: "מיליגרם (mg)", lb: "פאונד (lb)",
      oz: "אונקיה (oz)", ton: "טון מטרי (t)", st: "סטון (st)", ct: "קראט (ct)",
    },
    temperature: { C: "צלזיוס (\u00B0C)", F: "פרנהייט (\u00B0F)", K: "קלווין (K)" },
    area: {
      "m\u00B2": "מטר רבוע (m\u00B2)", "km\u00B2": "קילומטר רבוע (km\u00B2)",
      ha: "הקטאר (ha)", acre: "אקר", "ft\u00B2": "רגל רבועה (ft\u00B2)",
      "mi\u00B2": "מייל רבוע (mi\u00B2)", "yd\u00B2": "יארד רבוע (yd\u00B2)",
      "cm\u00B2": "סנטימטר רבוע (cm\u00B2)",
    },
    volume: {
      L: "ליטר (L)", mL: "מיליליטר (mL)", gal: "גלון US (gal)",
      "fl oz": "אונקיית נוזל US (fl oz)", cup: "כוס US", pt: "פינט US (pt)",
      qt: "קוורט US (qt)", "m\u00B3": "מטר מעוקב (m\u00B3)",
      "cm\u00B3": "סנטימטר מעוקב (cm\u00B3)", tbsp: "כף (tbsp)", tsp: "כפית (tsp)",
    },
    speed: {
      "m/s": "מטר/שנ׳ (m/s)", "km/h": "קמ/ש (km/h)", mph: "מייל/ש (mph)",
      kn: "קשר (kn)", "ft/s": "רגל/שנ׳ (ft/s)", mach: "מאך",
    },
    time: {
      ms: "אלפית שנייה (ms)", s: "שנייה (s)", min: "דקה (min)", h: "שעה (h)",
      d: "יום (d)", wk: "שבוע (wk)", mo: "חודש (mo)", yr: "שנה (yr)",
    },
    pressure: {
      Pa: "פסקל (Pa)", kPa: "קילופסקל (kPa)", bar: "בר", psi: "PSI",
      atm: "אטמוספרה (atm)", torr: "טור", mmHg: "mmHg",
    },
    energy: {
      J: "ג׳אול (J)", kJ: "קילוג׳אול (kJ)", cal: "קלוריה (cal)", kcal: "קילוקלוריה (kcal)",
      Wh: "ואט-שעה (Wh)", kWh: "קילוואט-שעה (kWh)", BTU: "BTU", eV: "אלקטרון-וולט (eV)",
    },
    power: {
      W: "ואט (W)", kW: "קילוואט (kW)", MW: "מגוואט (MW)", hp: "כוח סוס (hp)",
      "BTU/h": "BTU/ש", "cal/s": "קלוריה/שנ׳",
    },
    frequency: {
      Hz: "הרץ (Hz)", kHz: "קילוהרץ (kHz)", MHz: "מגהרץ (MHz)",
      GHz: "גיגהרץ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "מעלה (\u00B0)", rad: "רדיאן (rad)", grad: "גרדיאן (grad)",
      turn: "סיבוב", arcmin: "דקת קשת (\u2032)", arcsec: "שניית קשת (\u2033)",
    },
    "data-storage": {
      B: "בייט (B)", KB: "קילובייט (KB)", MB: "מגבייט (MB)", GB: "גיגבייט (GB)",
      TB: "טרבייט (TB)", PB: "פטבייט (PB)", bit: "ביט",
      Kbit: "קילוביט", Mbit: "מגביט", Gbit: "גיגביט",
    },
    "fuel-economy": { "km/L": "קמ/ל", mpg: "mpg (US)", "L/100km": "ל/100 קמ" },
    "cooking-measurement": {
      cup: "כוס", tbsp: "כף", tsp: "כפית", mL: "מיליליטר (mL)",
      L: "ליטר (L)", fl_oz: "אונקיית נוזל", g: "גרם (g)", kg: "קילוגרם (kg)",
      oz: "אונקיה (oz)", lb: "פאונד (lb)",
    },
    "oven-temperature": { C: "צלזיוס (\u00B0C)", F: "פרנהייט (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "פיקסלים (px)", rem: "Root Em (rem)" },
    "px-em": { px: "פיקסלים (px)", em: "Em (em)" },
    "px-percent": { px: "פיקסלים (px)", "%": "אחוז (%)" },
    "css-unit": {
      px: "פיקסלים (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "אחוז (%)", vw: "רוחב חלון תצוגה (vw)", vh: "גובה חלון תצוגה (vh)",
    },
  },
};

export default dict;
