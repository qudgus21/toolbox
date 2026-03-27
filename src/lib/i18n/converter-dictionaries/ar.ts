import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "كل أدوات التحويل التي تحتاجها",
    titleAccent: "التحويل",
    description:
      "حوّل الوحدات والألوان والتنسيقات والتواريخ. كل شيء يتم في متصفحك مباشرة.",
    tabAll: "الكل",
    categoryUnit: "الوحدات",
    categoryNumber: "الأرقام",
    categoryColor: "الألوان",
    categoryDatetime: "التاريخ/الوقت",
    categoryData: "البيانات",
    categoryCss: "CSS",
    categoryCooking: "الطبخ",
    categoryGeography: "الجغرافيا",
    searchPlaceholder: "ابحث عن أدوات التحويل...",
    noResults: "لم يتم العثور على أدوات تحويل.",
    recentTools: "المستخدمة مؤخرًا",
    favorites: "المفضلة",
    favDragHint: "اسحب لإعادة الترتيب",
    favHint: "انقر على النجمة لإضافتها للمفضلة",
    gridView: "عرض شبكي",
    listView: "عرض قائمة",
  },
  trust: {
    encryption: "معالجة آمنة",
    encryptionDesc: "جميع التحويلات تتم محليًا في متصفحك",
    autoDelete: "لا تخزين للبيانات",
    autoDeleteDesc: "لا يتم حفظ مدخلاتك أو إرسالها لأي خادم",
    free: "مجاني 100%",
    freeDesc: "بلا حدود، بلا تسجيل، بلا رسوم خفية",
    browserProcessing: "نتائج فورية",
    browserProcessingDesc: "تحويل لحظي أثناء الكتابة",
  },
  tools: {
    length: {
      title: "محوّل الأطوال",
      description:
        "حوّل بين الأمتار والكيلومترات والأميال والأقدام والبوصات وغيرها.",
    },
    weight: {
      title: "محوّل الأوزان",
      description:
        "حوّل بين الكيلوغرامات والأرطال والأونصات والأطنان وغيرها.",
    },
    temperature: {
      title: "محوّل الحرارة",
      description: "حوّل بين مئوية وفهرنهايت وكلفن.",
    },
    area: {
      title: "محوّل المساحات",
      description:
        "حوّل بين المتر المربع والهكتار والفدان والقدم المربع وغيرها.",
    },
    volume: {
      title: "محوّل الحجم",
      description:
        "حوّل بين اللترات والغالونات والأكواب والأونصات السائلة وغيرها.",
    },
    speed: {
      title: "محوّل السرعة",
      description: "حوّل بين م/ث وكم/س وميل/س والعُقد وغيرها.",
    },
    time: {
      title: "محوّل الوقت",
      description:
        "حوّل بين الثواني والدقائق والساعات والأيام والأسابيع وغيرها.",
    },
    pressure: {
      title: "محوّل الضغط",
      description:
        "حوّل بين باسكال وبار وPSI والغلاف الجوي وغيرها.",
    },
    energy: {
      title: "محوّل الطاقة",
      description:
        "حوّل بين الجول والسعرات الحرارية والكيلوواط/ساعة وBTU وغيرها.",
    },
    power: {
      title: "محوّل القدرة",
      description:
        "حوّل بين الواط والكيلوواط وحصان وغيرها.",
    },
    frequency: {
      title: "محوّل التردد",
      description:
        "حوّل بين هرتز وكيلوهرتز وميغاهرتز وغيغاهرتز وRPM.",
    },
    angle: {
      title: "محوّل الزوايا",
      description: "حوّل بين الدرجات والراديان والغراديان والدورات.",
    },
    "data-storage": {
      title: "محوّل وحدات التخزين",
      description:
        "حوّل بين البايت والكيلوبايت والميغابايت والغيغابايت وغيرها.",
    },
    "fuel-economy": {
      title: "محوّل استهلاك الوقود",
      description: "حوّل بين km/L وmpg وL/100km.",
    },
    "number-base": {
      title: "محوّل أنظمة العد",
      description:
        "حوّل بين الثنائي والثماني والعشري والسداسي عشر وأنظمة مخصصة.",
    },
    "roman-numeral": {
      title: "محوّل الأرقام الرومانية",
      description: "حوّل بين الأرقام الرومانية والأرقام العربية.",
    },
    "scientific-notation": {
      title: "محوّل الترميز العلمي",
      description:
        "حوّل بين الترميز العلمي والأرقام العادية.",
    },
    "fraction-decimal": {
      title: "كسور ↔ أعداد عشرية",
      description: "حوّل بين الكسور والأعداد العشرية.",
    },
    percentage: {
      title: "محوّل النسب المئوية",
      description:
        "حوّل بين الكسور والأعداد العشرية والنسب المئوية.",
    },
    "color-converter": {
      title: "محوّل الألوان",
      description:
        "حوّل بين صيغ الألوان HEX وRGB وHSL وHSV وCMYK.",
    },
    "color-palette-generator": {
      title: "مولّد لوحات الألوان",
      description:
        "أنشئ لوحات ألوان متكاملة وثلاثية ومتقاربة.",
    },
    "gradient-generator": {
      title: "مولّد تدرجات CSS",
      description:
        "أنشئ تدرجات CSS خطية ودائرية ومخروطية مع معاينة حية.",
    },
    "color-contrast-checker": {
      title: "فاحص تباين الألوان",
      description:
        "تحقق من نسبة تباين الألوان وفق معايير WCAG AA/AAA.",
    },
    "color-blindness-simulator": {
      title: "محاكي عمى الألوان",
      description:
        "شاهد كيف تبدو الألوان لمن يعانون من قصور في رؤية الألوان.",
    },
    timezone: {
      title: "محوّل المناطق الزمنية",
      description:
        "حوّل الوقت بين المناطق الزمنية المختلفة حول العالم.",
    },
    "unix-timestamp": {
      title: "محوّل طابع Unix الزمني",
      description:
        "حوّل بين طوابع Unix الزمنية والتواريخ المقروءة.",
    },
    "date-format": {
      title: "محوّل صيغ التاريخ",
      description:
        "حوّل التواريخ بين صيغ مختلفة (ISO، أمريكي، أوروبي، وغيرها).",
    },
    "date-calculator": {
      title: "حاسبة التواريخ",
      description:
        "احسب الفرق بين تاريخين أو أضف/اطرح أيامًا.",
    },
    "age-calculator": {
      title: "حاسبة العمر",
      description:
        "احسب العمر الدقيق من تاريخ الميلاد بالسنوات والأشهر والأيام.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "حوّل بين صيغتي JSON وYAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "حوّل بين مصفوفات JSON وصيغة جداول CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "حوّل بين صيغتي JSON وXML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "حوّل بين صيغتي JSON وTOML للإعدادات.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "حوّل بين Markdown وHTML.",
    },
    "csv-table": {
      title: "CSV إلى جدول",
      description: "حوّل بيانات CSV إلى جداول Markdown أو HTML.",
    },
    "json-typescript": {
      title: "JSON إلى TypeScript",
      description: "أنشئ واجهات TypeScript من بيانات JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "حوّل بين عبارات SQL INSERT وبيانات JSON.",
    },
    "px-rem": {
      title: "محوّل px ↔ rem",
      description:
        "حوّل بين البكسل ووحدات rem مع حجم أساس مخصص.",
    },
    "px-em": {
      title: "محوّل px ↔ em",
      description:
        "حوّل بين البكسل ووحدات em مع حجم العنصر الأب المخصص.",
    },
    "px-percent": {
      title: "محوّل px ↔ %",
      description:
        "حوّل بين البكسل والنسبة المئوية مع عرض الحاوية المخصص.",
    },
    "css-unit": {
      title: "محوّل وحدات CSS",
      description:
        "حوّل بين px وrem وem و% وvw وvh ووحدات CSS الأخرى.",
    },
    "css-minifier": {
      title: "ضاغط / منسّق CSS",
      description:
        "اضغط أو نسّق كود CSS للإنتاج أو سهولة القراءة.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "حوّل بين أصناف Tailwind CSS وCSS العادي.",
    },
    "cooking-measurement": {
      title: "محوّل مقاييس الطبخ",
      description:
        "حوّل بين الأكواب والملاعق الكبيرة والصغيرة والمليلترات والغرامات.",
    },
    "recipe-scaler": {
      title: "معدّل كميات الوصفات",
      description:
        "عدّل كميات مكونات الوصفة بحسب عدد الحصص.",
    },
    "oven-temperature": {
      title: "محوّل حرارة الفرن",
      description:
        "حوّل بين مئوية وفهرنهايت وGas Mark لدرجات حرارة الفرن.",
    },
    coordinate: {
      title: "محوّل الإحداثيات",
      description:
        "حوّل بين صيغ الإحداثيات DMS وDD وDDM.",
    },
    "distance-calculator": {
      title: "حاسبة المسافات",
      description:
        "احسب المسافة بين نقطتين جغرافيتين.",
    },
  },
  nav: {
    allTools: "جميع أدوات التحويل",
    language: "اللغة",
  },
  footer: {
    tools: "أدوات التحويل",
    legal: "قانوني",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    copyright: "ToolPop. جميع الحقوق محفوظة.",
    company: "الشركة",
    about: "من نحن",
    contact: "اتصل بنا",
    faq: "الأسئلة الشائعة",
  },
  common: {
    backToAll: "جميع أدوات التحويل",
    inputPlaceholder: "أدخل قيمة للتحويل...",
    outputLabel: "النتيجة",
    copyToClipboard: "نسخ",
    copied: "تم النسخ!",
    clear: "مسح",
    paste: "لصق",
    processing: "جارٍ التحويل...",
    startOver: "ابدأ من جديد",
    process: "حوّل",
    tryAgain: "حاول مجددًا",
    notImplemented: "هذا المحوّل قيد التطوير.",
    tryOtherTools: "جرّب أدوات تحويل أخرى",
    privacyBadge: "جميع التحويلات تتم في متصفحك",
    favoriteAdded: "أُضيف للمفضلة",
    favoriteRemoved: "أُزيل من المفضلة",
    comingSoon: "قريبًا",
    share: "مشاركة",
    shareTitle: "شارك هذا المحوّل",
    shareSubtitle: "شارك هذا المحوّل المفيد مع الآخرين",
    shareCopied: "تم نسخ الرابط!",
    shareCopyLink: "نسخ الرابط",
    downloadAsFile: "تنزيل",
    options: "الخيارات",
    input: "الإدخال",
    output: "الإخراج",
    convert: "حوّل",
    swap: "تبديل",
    from: "من",
    to: "إلى",
    result: "النتيجة",
    allConversions: "جميع التحويلات",
    details: "التفاصيل",
    pageNotFound: "المحوّل غير موجود",
    goHome: "العودة لجميع أدوات التحويل",
  },
  toolOptions: {
    fromUnit: "من",
    toUnit: "إلى",
    precision: "المنازل العشرية",
    baseSize: "حجم الخط الأساسي (px)",
    parentSize: "حجم خط العنصر الأب (px)",
    containerWidth: "عرض الحاوية (px)",
    viewportWidth: "عرض نافذة العرض (px)",
    viewportHeight: "ارتفاع نافذة العرض (px)",
    direction: "الاتجاه",
    mode: "الوضع",
    ingredient: "المكوّن",
    water: "ماء",
    flour: "طحين",
    sugar: "سكر",
    butter: "زبدة",
    rice: "أرز",
    milk: "حليب",
    originalServings: "عدد الحصص الأصلي",
    targetServings: "عدد الحصص المطلوب",
    fromTimezone: "من منطقة زمنية",
    toTimezone: "إلى منطقة زمنية",
    inputFormat: "صيغة الإدخال",
    outputFormat: "صيغة الإخراج",
    harmony: "تناغم الألوان",
    complementary: "متكامل",
    triadic: "ثلاثي",
    analogous: "متقارب",
    splitComplementary: "تكاملي منقسم",
    tetradic: "رباعي",
    gradientType: "نوع التدرج",
    linear: "خطي",
    radial: "دائري",
    conic: "مخروطي",
    gradientAngle: "الزاوية (deg)",
    rootName: "اسم الواجهة الجذرية",
    tableName: "اسم الجدول",
    minify: "ضغط",
    beautify: "تنسيق",
    colorType: "نوع القصور",
    protanopia: "عمى الأحمر (Protanopia)",
    deuteranopia: "عمى الأخضر (Deuteranopia)",
    tritanopia: "عمى الأزرق (Tritanopia)",
    achromatopsia: "عمى الألوان الكامل (Achromatopsia)",
    operation: "العملية",
    difference: "الفرق",
    add: "إضافة",
    subtract: "طرح",
    amount: "المقدار",
    unit: "الوحدة",
    days: "أيام",
    weeks: "أسابيع",
    months: "أشهر",
    years: "سنوات",
    fromBase: "من نظام العد",
    toBase: "إلى نظام العد",
    binary: "ثنائي (2)",
    octal: "ثماني (8)",
    decimal: "عشري (10)",
    hexadecimal: "سداسي عشر (16)",
    seconds: "ثوانٍ",
    milliseconds: "ميلي ثانية",
    autoDetect: "كشف تلقائي",
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
    markdown: "جدول Markdown",
    html: "جدول HTML",
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
    toRoman: "رقم → روماني",
    toArabic: "روماني → رقم",
    toScientific: "عادي → علمي",
    toStandard: "علمي → عادي",
    toFraction: "عشري → كسر",
    toDecimal: "كسر → عشري",
    decimalToPercent: "عشري → نسبة مئوية",
    percentToDecimal: "نسبة مئوية → عشري",
    fractionToPercent: "كسر → نسبة مئوية",
    dd: "درجات عشرية (DD)",
    dms: "درجات دقائق ثوانٍ (DMS)",
    ddm: "درجات دقائق عشرية (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "صيغة طويلة",
    short: "صيغة مختصرة",
    relative: "نسبي",
    celsius: "مئوية (°C)",
    fahrenheit: "فهرنهايت (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "لون الخلفية",
    monochromatic: "أحادي اللون",
    timestampToDate: "طابع زمني → تاريخ",
    dateToTimestamp: "تاريخ → طابع زمني",
    showDetails: "عرض التفصيل الكامل",
    addDays: "إضافة أيام",
    subtractDays: "طرح أيام",
    datetimeHint: "مثال: 2024-01-15، 1705312200، now",
    endDate: "تاريخ الانتهاء",
    today: "اليوم (افتراضي)",
    dateUnit: "الوحدة",
  },
  statsLabels: {
    lines: "أسطر",
    characters: "أحرف",
    rows: "صفوف",
    columns: "أعمدة",
    elements: "عناصر",
    keys: "مفاتيح",
    interfaces: "واجهات",
    properties: "خصائص",
    originalSize: "الحجم الأصلي",
    resultSize: "الحجم الناتج",
    savings: "التوفير",
    ingredients: "المكونات",
    scaleFactor: "معامل التعديل",
    contrastRatio: "نسبة التباين",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "خط العرض",
    longitude: "خط الطول",
    distanceKm: "المسافة (km)",
    distanceMi: "المسافة (mi)",
    years: "سنوات",
    months: "أشهر",
    days: "أيام",
  },
  processorMessages: {
    invalidTimezone: "منطقة زمنية غير صالحة",
    pass: "ناجح", fail: "غير ناجح",
    fromNow: "من الآن", ago: "مضت",
    today: "اليوم", tomorrow: "غدًا", yesterday: "أمس",
    seconds: "ثانية", secondsPlural: "ثوانٍ",
    minutes: "دقيقة", minutesPlural: "دقائق",
    hours: "ساعة", hoursPlural: "ساعات",
    daysUnit: "يوم", daysPlural: "أيام",
    weeksUnit: "أسبوع", weeksPlural: "أسابيع",
    monthsUnit: "شهر", monthsPlural: "أشهر",
    yearsUnit: "سنة", yearsPlural: "سنوات",
    gasmark: "Gas Mark",
    veryCool: "بارد جدًا", cool: "بارد", moderatelyCool: "بارد نسبيًا",
    moderate: "معتدل", moderatelyHot: "حار نسبيًا",
    hot: "حار", veryHot: "حار جدًا", extremelyHot: "شديد الحرارة",
    original: "الأصلي",
    from: "من", to: "إلى",
    totalDays: "إجمالي الأيام", weeksDays: "أسابيع + أيام",
    originalDate: "التاريخ الأصلي", operationLabel: "العملية",
    resultDate: "تاريخ النتيجة", dayOfWeek: "يوم الأسبوع",
    daysBetween: "الأيام بين التاريخين",
    age: "العمر", totalMonths: "إجمالي الأشهر",
    totalHours: "إجمالي الساعات", totalMinutes: "إجمالي الدقائق",
    nextBirthday: "عيد الميلاد القادم",
    roman: "روماني", arabic: "عربي",
    scientific: "علمي", standard: "قياسي", engineering: "هندسي",
    fraction: "كسر", simplified: "مُبسَّط", percentage: "نسبة مئوية",
    color1: "اللون 1", color2: "اللون 2",
    contrastRatioLabel: "نسبة التباين",
    aaNormalText: "AA نص عادي", aaLargeText: "AA نص كبير",
    aaaNormalText: "AAA نص عادي", aaaLargeText: "AAA نص كبير",
    gradientTypeLabel: "النوع", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — أدوات تحويل مجانية",
    siteDescription:
      "حوّل الوحدات والألوان وصيغ البيانات والتواريخ وغيرها. مجاني وسريع وخاص — كل شيء يعمل في متصفحك.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "المدونة",
    description:
      "نصائح وأدلة ومعلومات عن تحويل الوحدات وصيغ البيانات وغيرها.",
    readMore: "اقرأ المزيد",
    backToBlog: "العودة للمدونة",
    publishedOn: "نُشر في",
    categoryGuide: "دليل",
    categoryTips: "نصائح",
    categoryKnowledge: "معرفة",
  },
  cookie: {
    message:
      "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بمتابعة الاستخدام، فإنك توافق على سياسة ملفات تعريف الارتباط الخاصة بنا.",
    accept: "موافق",
    decline: "رفض",
  },
  unitLabels: {
    length: {
      m: "متر (m)", km: "كيلومتر (km)", cm: "سنتيمتر (cm)", mm: "ميليمتر (mm)",
      mi: "ميل (mi)", yd: "ياردة (yd)", ft: "قدم (ft)", in: "بوصة (in)",
      nm: "ميل بحري (nm)", "\u03BCm": "ميكرومتر (\u03BCm)",
    },
    weight: {
      kg: "كيلوغرام (kg)", g: "غرام (g)", mg: "ميليغرام (mg)", lb: "رطل (lb)",
      oz: "أونصة (oz)", ton: "طن متري (t)", st: "ستون (st)", ct: "قيراط (ct)",
    },
    temperature: { C: "مئوية (\u00B0C)", F: "فهرنهايت (\u00B0F)", K: "كلفن (K)" },
    area: {
      "m\u00B2": "متر مربع (m\u00B2)", "km\u00B2": "كيلومتر مربع (km\u00B2)",
      ha: "هكتار (ha)", acre: "فدان", "ft\u00B2": "قدم مربع (ft\u00B2)",
      "mi\u00B2": "ميل مربع (mi\u00B2)", "yd\u00B2": "ياردة مربعة (yd\u00B2)",
      "cm\u00B2": "سنتيمتر مربع (cm\u00B2)",
    },
    volume: {
      L: "لتر (L)", mL: "مليلتر (mL)", gal: "غالون أمريكي (gal)",
      "fl oz": "أونصة سائلة أمريكية (fl oz)", cup: "كوب أمريكي", pt: "باينت أمريكي (pt)",
      qt: "كوارت أمريكي (qt)", "m\u00B3": "متر مكعب (m\u00B3)",
      "cm\u00B3": "سنتيمتر مكعب (cm\u00B3)", tbsp: "ملعقة كبيرة (tbsp)", tsp: "ملعقة صغيرة (tsp)",
    },
    speed: {
      "m/s": "متر/ثانية (m/s)", "km/h": "كيلومتر/ساعة (km/h)", mph: "ميل/ساعة (mph)",
      kn: "عقدة (kn)", "ft/s": "قدم/ثانية (ft/s)", mach: "ماخ",
    },
    time: {
      ms: "ميلي ثانية (ms)", s: "ثانية (s)", min: "دقيقة (min)", h: "ساعة (h)",
      d: "يوم (d)", wk: "أسبوع (wk)", mo: "شهر (mo)", yr: "سنة (yr)",
    },
    pressure: {
      Pa: "باسكال (Pa)", kPa: "كيلوباسكال (kPa)", bar: "بار", psi: "PSI",
      atm: "غلاف جوي (atm)", torr: "تور", mmHg: "mmHg",
    },
    energy: {
      J: "جول (J)", kJ: "كيلوجول (kJ)", cal: "سعرة حرارية (cal)", kcal: "كيلو سعرة (kcal)",
      Wh: "واط ساعة (Wh)", kWh: "كيلوواط ساعة (kWh)", BTU: "BTU", eV: "إلكترون فولت (eV)",
    },
    power: {
      W: "واط (W)", kW: "كيلوواط (kW)", MW: "ميغاواط (MW)", hp: "حصان (hp)",
      "BTU/h": "BTU/ساعة", "cal/s": "سعرة/ثانية",
    },
    frequency: {
      Hz: "هرتز (Hz)", kHz: "كيلوهرتز (kHz)", MHz: "ميغاهرتز (MHz)",
      GHz: "غيغاهرتز (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "درجة (\u00B0)", rad: "راديان (rad)", grad: "غراديان (grad)",
      turn: "دورة", arcmin: "دقيقة قوسية (\u2032)", arcsec: "ثانية قوسية (\u2033)",
    },
    "data-storage": {
      B: "بايت (B)", KB: "كيلوبايت (KB)", MB: "ميغابايت (MB)", GB: "غيغابايت (GB)",
      TB: "تيرابايت (TB)", PB: "بيتابايت (PB)", bit: "بت",
      Kbit: "كيلوبت", Mbit: "ميغابت", Gbit: "غيغابت",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "كوب", tbsp: "ملعقة كبيرة", tsp: "ملعقة صغيرة", mL: "مليلتر (mL)",
      L: "لتر (L)", fl_oz: "أونصة سائلة", g: "غرام (g)", kg: "كيلوغرام (kg)",
      oz: "أونصة (oz)", lb: "رطل (lb)",
    },
    "oven-temperature": { C: "مئوية (\u00B0C)", F: "فهرنهايت (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "بكسل (px)", rem: "Root Em (rem)" },
    "px-em": { px: "بكسل (px)", em: "Em (em)" },
    "px-percent": { px: "بكسل (px)", "%": "نسبة مئوية (%)" },
    "css-unit": {
      px: "بكسل (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "نسبة مئوية (%)", vw: "عرض نافذة العرض (vw)", vh: "ارتفاع نافذة العرض (vh)",
    },
  },
};

export default dict;
