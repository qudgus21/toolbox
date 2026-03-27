import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Всички инструменти за конвертиране на едно място",
    titleAccent: "конвертиране",
    description:
      "Конвертирайте единици, цветове, формати, дати и още. Всичко директно в браузъра.",
    tabAll: "Всички",
    categoryUnit: "Единици",
    categoryNumber: "Числа",
    categoryColor: "Цветове",
    categoryDatetime: "Дата/Час",
    categoryData: "Данни",
    categoryCss: "CSS",
    categoryCooking: "Готвене",
    categoryGeography: "География",
    searchPlaceholder: "Търсене на конвертори...",
    noResults: "Няма намерени конвертори.",
    recentTools: "Наскоро използвани",
    favorites: "Любими",
    favDragHint: "Плъзнете за пренареждане",
    favHint: "Натиснете звездата, за да добавите в любими",
    gridView: "Мрежа",
    listView: "Списък",
  },
  trust: {
    encryption: "Сигурна обработка",
    encryptionDesc: "Всички конверсии се извършват локално в браузъра ви",
    autoDelete: "Без съхранение на данни",
    autoDeleteDesc: "Въведените данни никога не се запазват и не се изпращат към сървър",
    free: "100% безплатно",
    freeDesc: "Без ограничения, без регистрация, без скрити такси",
    browserProcessing: "Мигновени резултати",
    browserProcessingDesc: "Конвертиране в реално време при въвеждане",
  },
  tools: {
    length: {
      title: "Конвертор за дължина",
      description:
        "Конвертирайте между метри, километри, мили, футове, инчове и други.",
    },
    weight: {
      title: "Конвертор за тегло",
      description:
        "Конвертирайте между килограми, паундове, унции, тонове и други.",
    },
    temperature: {
      title: "Конвертор за температура",
      description: "Конвертирайте между Целзий, Фаренхайт и Келвин.",
    },
    area: {
      title: "Конвертор за площ",
      description:
        "Конвертирайте между квадратни метри, хектари, акри, квадратни футове и други.",
    },
    volume: {
      title: "Конвертор за обем",
      description:
        "Конвертирайте между литри, галони, чаши, течни унции и други.",
    },
    speed: {
      title: "Конвертор за скорост",
      description: "Конвертирайте между m/s, km/h, mph, възли и други.",
    },
    time: {
      title: "Конвертор за време",
      description:
        "Конвертирайте между секунди, минути, часове, дни, седмици и други.",
    },
    pressure: {
      title: "Конвертор за налягане",
      description:
        "Конвертирайте между Паскал, бар, PSI, атмосфера и други.",
    },
    energy: {
      title: "Конвертор за енергия",
      description:
        "Конвертирайте между джаули, калории, киловатчаса, BTU и други.",
    },
    power: {
      title: "Конвертор за мощност",
      description:
        "Конвертирайте между ватове, киловатове, конски сили и други.",
    },
    frequency: {
      title: "Конвертор за честота",
      description:
        "Конвертирайте между херцове, килохерцове, мегахерцове, гигахерцове и RPM.",
    },
    angle: {
      title: "Конвертор за ъгли",
      description: "Конвертирайте между градуси, радиани, градиани и обороти.",
    },
    "data-storage": {
      title: "Конвертор за обем данни",
      description:
        "Конвертирайте между байтове, килобайтове, мегабайтове, гигабайтове и други.",
    },
    "fuel-economy": {
      title: "Конвертор за разход на гориво",
      description: "Конвертирайте между km/L, mpg и L/100km.",
    },
    "number-base": {
      title: "Конвертор за бройни системи",
      description:
        "Конвертирайте между двоична, осмична, десетична, шестнадесетична и други системи.",
    },
    "roman-numeral": {
      title: "Конвертор за римски цифри",
      description: "Конвертирайте между римски и арабски цифри.",
    },
    "scientific-notation": {
      title: "Научен запис",
      description:
        "Конвертирайте между научен запис и стандартни числа.",
    },
    "fraction-decimal": {
      title: "Дроб ↔ Десетична",
      description: "Конвертирайте между дроби и десетични числа.",
    },
    percentage: {
      title: "Конвертор за проценти",
      description:
        "Конвертирайте между дроби, десетични числа и проценти.",
    },
    "color-converter": {
      title: "Конвертор за цветове",
      description:
        "Конвертирайте между HEX, RGB, HSL, HSV и CMYK цветови формати.",
    },
    "color-palette-generator": {
      title: "Генератор на цветови палитри",
      description:
        "Генерирайте допълнителни, триадни и аналогови цветови палитри.",
    },
    "gradient-generator": {
      title: "CSS градиент генератор",
      description:
        "Създайте линейни, радиални и конусни CSS градиенти с преглед на живо.",
    },
    "color-contrast-checker": {
      title: "Проверка на цветовия контраст",
      description:
        "Проверете съотношението на контраста по WCAG AA/AAA между два цвята.",
    },
    "color-blindness-simulator": {
      title: "Симулатор за цветна слепота",
      description:
        "Симулирайте как цветовете изглеждат за хора с нарушено цветово зрение.",
    },
    timezone: {
      title: "Конвертор за часови зони",
      description:
        "Конвертирайте часа между различни часови зони по света.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp конвертор",
      description:
        "Конвертирайте между Unix времеви маркери и четими дати.",
    },
    "date-format": {
      title: "Конвертор за формат на дата",
      description:
        "Конвертирайте дати между различни формати (ISO, US, EU и други).",
    },
    "date-calculator": {
      title: "Калкулатор за дати",
      description:
        "Изчислете разликата между дати или добавете/извадете дни.",
    },
    "age-calculator": {
      title: "Калкулатор за възраст",
      description:
        "Изчислете точната възраст от рождената дата в години, месеци и дни.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Конвертирайте между JSON и YAML формати за данни.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Конвертирайте между JSON масиви и CSV таблици.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Конвертирайте между JSON и XML формати за данни.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Конвертирайте между JSON и TOML конфигурационни формати.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Конвертирайте между Markdown и HTML маркиране.",
    },
    "csv-table": {
      title: "CSV към таблица",
      description: "Конвертирайте CSV данни в Markdown или HTML таблици.",
    },
    "json-typescript": {
      title: "JSON към TypeScript",
      description: "Генерирайте TypeScript интерфейси от JSON данни.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Конвертирайте между SQL INSERT изрази и JSON данни.",
    },
    "px-rem": {
      title: "px ↔ rem конвертор",
      description:
        "Конвертирайте между пиксели и rem единици с настройваем базов размер.",
    },
    "px-em": {
      title: "px ↔ em конвертор",
      description:
        "Конвертирайте между пиксели и em единици с настройваем родителски размер.",
    },
    "px-percent": {
      title: "px ↔ % конвертор",
      description:
        "Конвертирайте между пиксели и проценти с настройваема ширина на контейнера.",
    },
    "css-unit": {
      title: "CSS конвертор за единици",
      description:
        "Конвертирайте между px, rem, em, %, vw, vh и други CSS единици.",
    },
    "css-minifier": {
      title: "CSS минификатор / форматиране",
      description:
        "Минифицирайте или форматирайте CSS код за продукция или четимост.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Конвертирайте между Tailwind CSS класове и обикновен CSS.",
    },
    "cooking-measurement": {
      title: "Конвертор за кулинарни мерки",
      description:
        "Конвертирайте между чаши, супени лъжици, чаени лъжици, милилитри и грамове.",
    },
    "recipe-scaler": {
      title: "Мащабиране на рецепти",
      description:
        "Мащабирайте съставките на рецептата нагоре или надолу по брой порции.",
    },
    "oven-temperature": {
      title: "Конвертор за температура на фурна",
      description:
        "Конвертирайте между Целзий, Фаренхайт и Gas Mark за температура на фурната.",
    },
    coordinate: {
      title: "Конвертор за координати",
      description:
        "Конвертирайте между DMS, DD и DDM формати за координати.",
    },
    "distance-calculator": {
      title: "Калкулатор за разстояние",
      description:
        "Изчислете разстоянието между две географски координати.",
    },
  },
  nav: {
    allTools: "Всички конвертори",
    language: "Език",
  },
  footer: {
    tools: "Конвертори",
    legal: "Правни",
    privacy: "Поверителност",
    terms: "Условия за ползване",
    copyright: "ToolPop. Всички права запазени.",
    company: "Компания",
    about: "За нас",
    contact: "Контакт",
    faq: "ЧЗВ",
  },
  common: {
    backToAll: "Всички конвертори",
    inputPlaceholder: "Въведете стойност за конвертиране...",
    outputLabel: "Резултат",
    copyToClipboard: "Копиране в клипборда",
    copied: "Копирано!",
    clear: "Изчистване",
    paste: "Поставяне",
    processing: "Конвертиране...",
    startOver: "Започнете отначало",
    process: "Конвертиране",
    tryAgain: "Опитайте отново",
    notImplemented: "Този конвертор предстои скоро.",
    tryOtherTools: "Опитайте други конвертори",
    privacyBadge: "Всички конверсии се извършват в браузъра ви",
    favoriteAdded: "Добавено в любими",
    favoriteRemoved: "Премахнато от любими",
    comingSoon: "Очаквайте скоро",
    share: "Споделяне",
    shareTitle: "Споделете този конвертор",
    shareSubtitle: "Споделете този полезен конвертор с други",
    shareCopied: "Линкът е копиран!",
    shareCopyLink: "Копиране на линк",
    downloadAsFile: "Изтегляне",
    options: "Настройки",
    input: "Вход",
    output: "Изход",
    convert: "Конвертиране",
    swap: "Размяна",
    from: "От",
    to: "До",
    result: "Резултат",
    allConversions: "Всички конверсии",
    details: "Подробности",
    pageNotFound: "Конверторът не е намерен",
    goHome: "Обратно към всички конвертори",
  },
  toolOptions: {
    fromUnit: "От",
    toUnit: "До",
    precision: "Десетични знаци",
    baseSize: "Базов размер на шрифта (px)",
    parentSize: "Размер на родителски шрифт (px)",
    containerWidth: "Ширина на контейнера (px)",
    viewportWidth: "Ширина на прозореца (px)",
    viewportHeight: "Височина на прозореца (px)",
    direction: "Посока",
    mode: "Режим",
    ingredient: "Съставка",
    water: "Вода",
    flour: "Брашно",
    sugar: "Захар",
    butter: "Масло",
    rice: "Ориз",
    milk: "Мляко",
    originalServings: "Оригинални порции",
    targetServings: "Желани порции",
    fromTimezone: "От часова зона",
    toTimezone: "До часова зона",
    inputFormat: "Входен формат",
    outputFormat: "Изходен формат",
    harmony: "Цветова хармония",
    complementary: "Допълнителна",
    triadic: "Триадна",
    analogous: "Аналогова",
    splitComplementary: "Разделена допълнителна",
    tetradic: "Тетрадна",
    gradientType: "Тип градиент",
    linear: "Линеен",
    radial: "Радиален",
    conic: "Конусен",
    gradientAngle: "Ъгъл (deg)",
    rootName: "Име на основен интерфейс",
    tableName: "Име на таблица",
    minify: "Минифициране",
    beautify: "Форматиране",
    colorType: "Тип нарушение",
    protanopia: "Протанопия (без червено)",
    deuteranopia: "Деутеранопия (без зелено)",
    tritanopia: "Тританопия (без синьо)",
    achromatopsia: "Ахроматопсия (без цвят)",
    operation: "Операция",
    difference: "Разлика",
    add: "Добавяне",
    subtract: "Изваждане",
    amount: "Количество",
    unit: "Единица",
    days: "Дни",
    weeks: "Седмици",
    months: "Месеци",
    years: "Години",
    fromBase: "От система",
    toBase: "До система",
    binary: "Двоична (2)",
    octal: "Осмична (8)",
    decimal: "Десетична (10)",
    hexadecimal: "Шестнадесетична (16)",
    seconds: "Секунди",
    milliseconds: "Милисекунди",
    autoDetect: "Автоматично",
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
    markdown: "Markdown таблица",
    html: "HTML таблица",
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
    toRoman: "Число → Римско",
    toArabic: "Римско → Число",
    toScientific: "Стандартно → Научен запис",
    toStandard: "Научен запис → Стандартно",
    toFraction: "Десетично → Дроб",
    toDecimal: "Дроб → Десетично",
    decimalToPercent: "Десетично → Процент",
    percentToDecimal: "Процент → Десетично",
    fractionToPercent: "Дроб → Процент",
    dd: "Десетични градуси (DD)",
    dms: "Градуси минути секунди (DMS)",
    ddm: "Градуси десетични минути (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Пълен формат",
    short: "Кратък формат",
    relative: "Относителен",
    celsius: "Целзий (°C)",
    fahrenheit: "Фаренхайт (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Цвят на фона",
    monochromatic: "Монохромна",
    timestampToDate: "Времеви маркер → Дата",
    dateToTimestamp: "Дата → Времеви маркер",
    showDetails: "Покажи подробна разбивка",
    addDays: "Добави дни",
    subtractDays: "Извади дни",
    datetimeHint: "напр. 2024-01-15, 1705312200, now",
    endDate: "Крайна дата",
    today: "Днес (по подразбиране)",
    dateUnit: "Единица",
  },
  statsLabels: {
    lines: "Редове",
    characters: "Символи",
    rows: "Редове",
    columns: "Колони",
    elements: "Елементи",
    keys: "Ключове",
    interfaces: "Интерфейси",
    properties: "Свойства",
    originalSize: "Оригинален размер",
    resultSize: "Краен размер",
    savings: "Спестявания",
    ingredients: "Съставки",
    scaleFactor: "Коефициент",
    contrastRatio: "Съотношение на контраста",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Ширина",
    longitude: "Дължина",
    distanceKm: "Разстояние (km)",
    distanceMi: "Разстояние (mi)",
    years: "Години",
    months: "Месеци",
    days: "Дни",
  },
  processorMessages: {
    invalidTimezone: "Невалидна часова зона",
    pass: "Успех", fail: "Неуспех",
    fromNow: "от сега", ago: "преди",
    today: "Днес", tomorrow: "Утре", yesterday: "Вчера",
    seconds: "секунда", secondsPlural: "секунди",
    minutes: "минута", minutesPlural: "минути",
    hours: "час", hoursPlural: "часа",
    daysUnit: "ден", daysPlural: "дни",
    weeksUnit: "седмица", weeksPlural: "седмици",
    monthsUnit: "месец", monthsPlural: "месеца",
    yearsUnit: "година", yearsPlural: "години",
    gasmark: "Gas Mark",
    veryCool: "Много хладно", cool: "Хладно", moderatelyCool: "Умерено хладно",
    moderate: "Умерено", moderatelyHot: "Умерено горещо",
    hot: "Горещо", veryHot: "Много горещо", extremelyHot: "Изключително горещо",
    original: "Оригинал",
    from: "От", to: "До",
    totalDays: "Общо дни", weeksDays: "Седмици + Дни",
    originalDate: "Начална дата", operationLabel: "Операция",
    resultDate: "Крайна дата", dayOfWeek: "Ден от седмицата",
    daysBetween: "Дни между",
    age: "Възраст", totalMonths: "Общо месеци",
    totalHours: "Общо часове", totalMinutes: "Общо минути",
    nextBirthday: "Следващ рожден ден",
    roman: "Римски", arabic: "Арабски",
    scientific: "Научен", standard: "Стандартен", engineering: "Инженерен",
    fraction: "Дроб", simplified: "Опростен", percentage: "Процент",
    color1: "Цвят 1", color2: "Цвят 2",
    contrastRatioLabel: "Съотношение на контраста",
    aaNormalText: "AA нормален текст", aaLargeText: "AA едър текст",
    aaaNormalText: "AAA нормален текст", aaaLargeText: "AAA едър текст",
    gradientTypeLabel: "Тип", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Безплатни онлайн конвертори",
    siteDescription:
      "Конвертирайте единици, цветове, формати на данни, дати и още. Безплатно, бързо и поверително — всичко работи в браузъра ви.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Блог",
    description:
      "Съвети, ръководства и знания за конвертиране на единици, формати на данни и още.",
    readMore: "Прочетете повече",
    backToBlog: "Обратно към блога",
    publishedOn: "Публикувано на",
    categoryGuide: "Ръководство",
    categoryTips: "Съвети",
    categoryKnowledge: "Знания",
  },
  cookie: {
    message:
      "Използваме бисквитки, за да подобрим преживяването ви. Продължавайки, вие приемате нашата политика за бисквитки.",
    accept: "Приемам",
    decline: "Отказвам",
  },
  unitLabels: {
    length: {
      m: "Метър (m)", km: "Километър (km)", cm: "Сантиметър (cm)", mm: "Милиметър (mm)",
      mi: "Миля (mi)", yd: "Ярд (yd)", ft: "Фут (ft)", in: "Инч (in)",
      nm: "Морска миля (nm)", "\u03BCm": "Микрометър (\u03BCm)",
    },
    weight: {
      kg: "Килограм (kg)", g: "Грам (g)", mg: "Милиграм (mg)", lb: "Паунд (lb)",
      oz: "Унция (oz)", ton: "Метричен тон (t)", st: "Стоун (st)", ct: "Карат (ct)",
    },
    temperature: { C: "Целзий (\u00B0C)", F: "Фаренхайт (\u00B0F)", K: "Келвин (K)" },
    area: {
      "m\u00B2": "Квадратен метър (m\u00B2)", "km\u00B2": "Квадратен километър (km\u00B2)",
      ha: "Хектар (ha)", acre: "Акър", "ft\u00B2": "Квадратен фут (ft\u00B2)",
      "mi\u00B2": "Квадратна миля (mi\u00B2)", "yd\u00B2": "Квадратен ярд (yd\u00B2)",
      "cm\u00B2": "Квадратен сантиметър (cm\u00B2)",
    },
    volume: {
      L: "Литър (L)", mL: "Милилитър (mL)", gal: "Галон US (gal)",
      "fl oz": "Течна унция US (fl oz)", cup: "Чаша US", pt: "Пинта US (pt)",
      qt: "Кварта US (qt)", "m\u00B3": "Кубичен метър (m\u00B3)",
      "cm\u00B3": "Кубичен сантиметър (cm\u00B3)", tbsp: "Супена лъжица (tbsp)", tsp: "Чаена лъжица (tsp)",
    },
    speed: {
      "m/s": "Метър/с (m/s)", "km/h": "Километър/ч (km/h)", mph: "Миля/ч (mph)",
      kn: "Възел (kn)", "ft/s": "Фут/с (ft/s)", mach: "Мах",
    },
    time: {
      ms: "Милисекунда (ms)", s: "Секунда (s)", min: "Минута (min)", h: "Час (h)",
      d: "Ден (d)", wk: "Седмица (wk)", mo: "Месец (mo)", yr: "Година (yr)",
    },
    pressure: {
      Pa: "Паскал (Pa)", kPa: "Килопаскал (kPa)", bar: "Бар", psi: "PSI",
      atm: "Атмосфера (atm)", torr: "Торр", mmHg: "mmHg",
    },
    energy: {
      J: "Джаул (J)", kJ: "Килоджаул (kJ)", cal: "Калория (cal)", kcal: "Килокалория (kcal)",
      Wh: "Ватчас (Wh)", kWh: "Киловатчас (kWh)", BTU: "BTU", eV: "Електронволт (eV)",
    },
    power: {
      W: "Ват (W)", kW: "Киловат (kW)", MW: "Мегават (MW)", hp: "Конска сила (hp)",
      "BTU/h": "BTU/ч", "cal/s": "Калория/с",
    },
    frequency: {
      Hz: "Херц (Hz)", kHz: "Килохерц (kHz)", MHz: "Мегахерц (MHz)",
      GHz: "Гигахерц (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Градус (\u00B0)", rad: "Радиан (rad)", grad: "Градиан (grad)",
      turn: "Оборот", arcmin: "Дъгова минута (\u2032)", arcsec: "Дъгова секунда (\u2033)",
    },
    "data-storage": {
      B: "Байт (B)", KB: "Килобайт (KB)", MB: "Мегабайт (MB)", GB: "Гигабайт (GB)",
      TB: "Терабайт (TB)", PB: "Петабайт (PB)", bit: "Бит",
      Kbit: "Килобит", Mbit: "Мегабит", Gbit: "Гигабит",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Чаша", tbsp: "Супена лъжица", tsp: "Чаена лъжица", mL: "Милилитър (mL)",
      L: "Литър (L)", fl_oz: "Течна унция", g: "Грам (g)", kg: "Килограм (kg)",
      oz: "Унция (oz)", lb: "Паунд (lb)",
    },
    "oven-temperature": { C: "Целзий (\u00B0C)", F: "Фаренхайт (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Пиксели (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Пиксели (px)", em: "Em (em)" },
    "px-percent": { px: "Пиксели (px)", "%": "Процент (%)" },
    "css-unit": {
      px: "Пиксели (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Процент (%)", vw: "Ширина на прозореца (vw)", vh: "Височина на прозореца (vh)",
    },
  },
};

export default dict;
