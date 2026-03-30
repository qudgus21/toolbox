import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Усі інструменти для конвертації, які вам потрібні",
    titleAccent: "конвертації",
    description:
      "Конвертуйте одиниці, кольори, формати даних, дати та більше. Усе прямо в браузері.",
    tabAll: "Усі",
    categoryUnit: "Одиниці",
    categoryNumber: "Числа",
    categoryColor: "Кольори",
    categoryDatetime: "Дата/Час",
    categoryData: "Дані",
    categoryCss: "CSS",
    categoryCooking: "Кулінарія",
    categoryGeography: "Географія",
    searchPlaceholder: "Шукати конвертери...",
    noResults: "Конвертерів не знайдено.",
    recentTools: "Нещодавно використані",
    favorites: "Обране",
    favDragHint: "Перетягніть для зміни порядку",
    favHint: "Натисніть зірочку, щоб додати до обраного",
    gridView: "Сітка",
    listView: "Список",
  },
  trust: {
    encryption: "Безпечна обробка",
    encryptionDesc: "Усі конвертації виконуються локально у вашому браузері",
    autoDelete: "Дані не зберігаються",
    autoDeleteDesc: "Ваші дані ніколи не зберігаються й не надсилаються на сервер",
    free: "100% безкоштовно",
    freeDesc: "Без обмежень, без реєстрації, без прихованих платежів",
    browserProcessing: "Миттєві результати",
    browserProcessingDesc: "Конвертація в реальному часі під час введення",
  },
  tools: {
    length: {
      title: "Конвертер довжини",
      description:
        "Конвертуйте між метрами, кілометрами, милями, футами, дюймами та іншими.",
    },
    weight: {
      title: "Конвертер ваги",
      description:
        "Конвертуйте між кілограмами, фунтами, унціями, тоннами та іншими.",
    },
    temperature: {
      title: "Конвертер температури",
      description: "Конвертуйте між Цельсієм, Фаренгейтом та Кельвіном.",
    },
    area: {
      title: "Конвертер площі",
      description:
        "Конвертуйте між квадратними метрами, гектарами, акрами, квадратними футами та іншими.",
    },
    volume: {
      title: "Конвертер об'єму",
      description:
        "Конвертуйте між літрами, галонами, чашками, рідкісними унціями та іншими.",
    },
    speed: {
      title: "Конвертер швидкості",
      description: "Конвертуйте між м/с, км/год, mph, вузлами та іншими.",
    },
    time: {
      title: "Конвертер часу",
      description:
        "Конвертуйте між секундами, хвилинами, годинами, днями, тижнями та іншими.",
    },
    pressure: {
      title: "Конвертер тиску",
      description:
        "Конвертуйте між Паскалем, бар, PSI, атмосферою та іншими.",
    },
    energy: {
      title: "Конвертер енергії",
      description:
        "Конвертуйте між джоулями, калоріями, кіловат-годинами, BTU та іншими.",
    },
    power: {
      title: "Конвертер потужності",
      description:
        "Конвертуйте між ватами, кіловатами, кінськими силами та іншими.",
    },
    frequency: {
      title: "Конвертер частоти",
      description:
        "Конвертуйте між герцами, кілогерцами, мегагерцами, гігагерцами та RPM.",
    },
    angle: {
      title: "Конвертер кутів",
      description: "Конвертуйте між градусами, радіанами, градіанами та обертами.",
    },
    "data-storage": {
      title: "Конвертер обсягу даних",
      description:
        "Конвертуйте між байтами, кілобайтами, мегабайтами, гігабайтами та іншими.",
    },
    "fuel-economy": {
      title: "Конвертер витрати палива",
      description: "Конвертуйте між км/л, mpg та л/100км.",
    },
    "number-base": {
      title: "Конвертер систем числення",
      description:
        "Конвертуйте між двійковою, вісімковою, десятковою, шістнадцятковою та іншими системами.",
    },
    "roman-numeral": {
      title: "Конвертер римських цифр",
      description: "Конвертуйте між римськими та арабськими цифрами.",
    },
    "scientific-notation": {
      title: "Конвертер наукової нотації",
      description:
        "Конвертуйте між науковою нотацією та звичайними числами.",
    },
    "fraction-decimal": {
      title: "Дріб ↔ Десяткове",
      description: "Конвертуйте між дробами та десятковими числами.",
    },
    percentage: {
      title: "Конвертер відсотків",
      description:
        "Конвертуйте між дробами, десятковими та відсотками.",
    },
    "color-converter": {
      title: "Конвертер кольорів",
      description:
        "Конвертуйте між форматами кольорів HEX, RGB, HSL, HSV та CMYK.",
    },
    "color-palette-generator": {
      title: "Генератор кольорових палітр",
      description:
        "Створюйте комплементарні, тріадні та аналогові кольорові палітри.",
    },
    "gradient-generator": {
      title: "Генератор CSS-градієнтів",
      description:
        "Створюйте лінійні, радіальні та конічні CSS-градієнти з попереднім переглядом.",
    },
    "color-contrast-checker": {
      title: "Перевірка контрасту кольорів",
      description:
        "Перевірте співвідношення контрасту WCAG AA/AAA між двома кольорами.",
    },
    "color-blindness-simulator": {
      title: "Симулятор дальтонізму",
      description:
        "Моделюйте, як кольори виглядають для людей із порушенням кольорового зору.",
    },
    timezone: {
      title: "Конвертер часових поясів",
      description:
        "Конвертуйте час між різними часовими поясами світу.",
    },
    "unix-timestamp": {
      title: "Конвертер Unix Timestamp",
      description:
        "Конвертуйте між Unix-мітками часу та зрозумілими датами.",
    },
    "date-format": {
      title: "Конвертер формату дати",
      description:
        "Конвертуйте дати між різними форматами (ISO, US, EU та інші).",
    },
    "date-calculator": {
      title: "Калькулятор дат",
      description:
        "Обчисліть різницю між датами або додайте/відніміть дні.",
    },
    "age-calculator": {
      title: "Калькулятор віку",
      description:
        "Обчисліть точний вік від дати народження в роках, місяцях і днях.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Конвертуйте між форматами даних JSON та YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Конвертуйте між масивами JSON та табличним форматом CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Конвертуйте між форматами даних JSON та XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Конвертуйте між конфігураційними форматами JSON та TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Конвертуйте між розміткою Markdown та HTML.",
    },
    "csv-table": {
      title: "CSV у таблицю",
      description: "Конвертуйте дані CSV у таблиці Markdown або HTML.",
    },
    "json-typescript": {
      title: "JSON у TypeScript",
      description: "Генеруйте інтерфейси TypeScript із даних JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Конвертуйте між SQL INSERT-інструкціями та даними JSON.",
    },
    "px-rem": {
      title: "px ↔ rem конвертер",
      description:
        "Конвертуйте між пікселями та одиницями rem із власним базовим розміром.",
    },
    "px-em": {
      title: "px ↔ em конвертер",
      description:
        "Конвертуйте між пікселями та одиницями em із власним розміром батьківського елемента.",
    },
    "px-percent": {
      title: "px ↔ % конвертер",
      description:
        "Конвертуйте між пікселями та відсотками із власною шириною контейнера.",
    },
    "css-unit": {
      title: "Конвертер одиниць CSS",
      description:
        "Конвертуйте між px, rem, em, %, vw, vh та іншими одиницями CSS.",
    },
    "css-minifier": {
      title: "CSS мініфікатор / форматувач",
      description:
        "Мініфікуйте або форматуйте CSS-код для продакшену або зручності читання.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Конвертуйте між класами Tailwind CSS та звичайним CSS.",
    },
    "cooking-measurement": {
      title: "Конвертер кулінарних мір",
      description:
        "Конвертуйте між чашками, столовими ложками, чайними ложками, мілілітрами та грамами.",
    },
    "recipe-scaler": {
      title: "Масштабування рецептів",
      description:
        "Масштабуйте інгредієнти рецепту залежно від кількості порцій.",
    },
    "oven-temperature": {
      title: "Конвертер температури духовки",
      description:
        "Конвертуйте між Цельсієм, Фаренгейтом та Gas Mark для температур духовки.",
    },
    coordinate: {
      title: "Конвертер координат",
      description:
        "Конвертуйте між форматами координат DMS, DD та DDM.",
    },
    "distance-calculator": {
      title: "Калькулятор відстані",
      description:
        "Обчисліть відстань між двома географічними координатами.",
    },
  },
  nav: {
    allTools: "Усі конвертери",
    language: "Мова",
  },
  footer: {
    tools: "Конвертери",
    legal: "Правова інформація",
    privacy: "Політика конфіденційності",
    terms: "Умови використання",
    copyright: "ToolPop. Усі права захищені.",
    company: "Компанія",
    about: "Про нас",
    contact: "Контакти",
    faq: "FAQ",
  },
  common: {
    backToAll: "Усі конвертери",
    inputPlaceholder: "Введіть значення для конвертації...",
    outputLabel: "Результат",
    copyToClipboard: "Скопіювати в буфер обміну",
    copied: "Скопійовано!",
    clear: "Очистити",
    paste: "Вставити",
    processing: "Конвертація...",
    startOver: "Почати спочатку",
    process: "Конвертувати",
    tryAgain: "Спробувати ще раз",
    notImplemented: "Цей конвертер скоро з'явиться.",
    tryOtherTools: "Спробуйте інші конвертери",
    privacyBadge: "Усі конвертації виконуються у вашому браузері",
    favoriteAdded: "Додано до обраного",
    favoriteRemoved: "Видалено з обраного",
    comingSoon: "Скоро",
    share: "Поділитися",
    shareTitle: "Поділитися цим конвертером",
    shareSubtitle: "Поділіться цим корисним конвертером з іншими",
    shareCopied: "Посилання скопійовано!",
    shareCopyLink: "Скопіювати посилання",
    downloadAsFile: "Завантажити",
    options: "Налаштування",
    input: "Вхід",
    output: "Вихід",
    convert: "Конвертувати",
    swap: "Поміняти",
    from: "З",
    to: "В",
    result: "Результат",
    allConversions: "Усі конвертації",
    details: "Деталі",
    pageNotFound: "Конвертер не знайдено",
    goHome: "Повернутися до всіх конвертерів",
    colorPickerLabel: "Вибір кольору",
  },
  toolOptions: {
    fromUnit: "З",
    toUnit: "В",
    precision: "Десяткові знаки",
    baseSize: "Базовий розмір шрифту (px)",
    parentSize: "Розмір шрифту батьківського елемента (px)",
    containerWidth: "Ширина контейнера (px)",
    viewportWidth: "Ширина в'юпорту (px)",
    viewportHeight: "Висота в'юпорту (px)",
    direction: "Напрямок",
    mode: "Режим",
    ingredient: "Інгредієнт",
    water: "Вода",
    flour: "Борошно",
    sugar: "Цукор",
    butter: "Масло",
    rice: "Рис",
    milk: "Молоко",
    originalServings: "Початкові порції",
    targetServings: "Бажані порції",
    fromTimezone: "З часового поясу",
    toTimezone: "У часовий пояс",
    inputFormat: "Формат вводу",
    outputFormat: "Формат виводу",
    harmony: "Кольорова гармонія",
    complementary: "Комплементарна",
    triadic: "Тріадна",
    analogous: "Аналогова",
    splitComplementary: "Розділена комплементарна",
    tetradic: "Тетрадна",
    gradientType: "Тип градієнта",
    linear: "Лінійний",
    radial: "Радіальний",
    conic: "Конічний",
    gradientAngle: "Кут (deg)",
    rootName: "Назва кореневого інтерфейсу",
    tableName: "Назва таблиці",
    minify: "Мініфікувати",
    beautify: "Форматувати",
    colorType: "Тип порушення",
    protanopia: "Протанопія (без червоного)",
    deuteranopia: "Дейтеранопія (без зеленого)",
    tritanopia: "Тританопія (без синього)",
    achromatopsia: "Ахроматопсія (без кольору)",
    operation: "Операція",
    difference: "Різниця",
    add: "Додати",
    subtract: "Відняти",
    amount: "Кількість",
    unit: "Одиниця",
    days: "Дні",
    weeks: "Тижні",
    months: "Місяці",
    years: "Роки",
    fromBase: "З основи",
    toBase: "В основу",
    binary: "Двійкова (2)",
    octal: "Вісімкова (8)",
    decimal: "Десяткова (10)",
    hexadecimal: "Шістнадцяткова (16)",
    seconds: "Секунди",
    milliseconds: "Мілісекунди",
    autoDetect: "Автовизначення",
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
    markdown: "Таблиця Markdown",
    html: "Таблиця HTML",
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
    toRoman: "Число → Римське",
    toArabic: "Римське → Число",
    toScientific: "Стандартне → Наукове",
    toStandard: "Наукове → Стандартне",
    toFraction: "Десяткове → Дріб",
    toDecimal: "Дріб → Десяткове",
    decimalToPercent: "Десяткове → Відсоток",
    percentToDecimal: "Відсоток → Десяткове",
    fractionToPercent: "Дріб → Відсоток",
    dd: "Десяткові градуси (DD)",
    dms: "Градуси Хвилини Секунди (DMS)",
    ddm: "Градуси Десяткові хвилини (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Довгий формат",
    short: "Короткий формат",
    relative: "Відносний",
    celsius: "Цельсій (°C)",
    fahrenheit: "Фаренгейт (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Колір тла",
    monochromatic: "Монохромна",
    timestampToDate: "Мітка часу → Дата",
    dateToTimestamp: "Дата → Мітка часу",
    showDetails: "Показати детальну розбивку",
    addDays: "Додати дні",
    subtractDays: "Відняти дні",
    datetimeHint: "напр. 2024-01-15, 1705312200, now",
    endDate: "Дата кінця",
    today: "Сьогодні (за замовчуванням)",
    dateUnit: "Одиниця",
  },
  statsLabels: {
    lines: "Рядки",
    characters: "Символи",
    rows: "Рядки",
    columns: "Стовпці",
    elements: "Елементи",
    keys: "Ключі",
    interfaces: "Інтерфейси",
    properties: "Властивості",
    originalSize: "Початковий розмір",
    resultSize: "Розмір результату",
    savings: "Економія",
    ingredients: "Інгредієнти",
    scaleFactor: "Коефіцієнт масштабування",
    contrastRatio: "Коефіцієнт контрасту",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Широта",
    longitude: "Довгота",
    distanceKm: "Відстань (км)",
    distanceMi: "Відстань (ми)",
    years: "Роки",
    months: "Місяці",
    days: "Дні",
  },
  processorMessages: {
    invalidTimezone: "Невірний часовий пояс",
    pass: "Пройдено", fail: "Не пройдено",
    fromNow: "від зараз", ago: "тому",
    today: "Сьогодні", tomorrow: "Завтра", yesterday: "Вчора",
    seconds: "секунда", secondsPlural: "секунд",
    minutes: "хвилина", minutesPlural: "хвилин",
    hours: "година", hoursPlural: "годин",
    daysUnit: "день", daysPlural: "днів",
    weeksUnit: "тиждень", weeksPlural: "тижнів",
    monthsUnit: "місяць", monthsPlural: "місяців",
    yearsUnit: "рік", yearsPlural: "років",
    gasmark: "Gas Mark",
    veryCool: "Дуже прохолодно", cool: "Прохолодно", moderatelyCool: "Помірно прохолодно",
    moderate: "Помірно", moderatelyHot: "Помірно гаряче",
    hot: "Гаряче", veryHot: "Дуже гаряче", extremelyHot: "Надзвичайно гаряче",
    gasMark: "Газова позначка",
    original: "Оригінал",
    from: "Від", to: "До",
    totalDays: "Усього днів", weeksDays: "Тижні + Дні",
    originalDate: "Початкова дата", operationLabel: "Операція",
    resultDate: "Результат", dayOfWeek: "День тижня",
    daysBetween: "Днів між",
    age: "Вік", totalMonths: "Усього місяців",
    totalHours: "Усього годин", totalMinutes: "Усього хвилин",
    nextBirthday: "Наступний день народження",
    roman: "Римське", arabic: "Арабське",
    scientific: "Наукове", standard: "Стандартне", engineering: "Інженерне",
    fraction: "Дріб", simplified: "Спрощений", percentage: "Відсоток",
    color1: "Колір 1", color2: "Колір 2",
    contrastRatioLabel: "Коефіцієнт контрасту",
    aaNormalText: "AA звичайний текст", aaLargeText: "AA великий текст",
    aaaNormalText: "AAA звичайний текст", aaaLargeText: "AAA великий текст",
    gradientTypeLabel: "Тип", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Безкоштовні онлайн-конвертери",
    siteDescription:
      "Конвертуйте одиниці, кольори, формати даних, дати та інше. Безкоштовно, швидко й приватно — усе працює у вашому браузері.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Блог",
    description:
      "Поради, посібники та знання про конвертацію одиниць, формати даних та інше.",
    readMore: "Читати далі",
    backToBlog: "Повернутися до блогу",
    publishedOn: "Опубліковано",
    categoryGuide: "Посібник",
    categoryTips: "Поради",
    categoryKnowledge: "Знання",
  },
  cookie: {
    message:
      "Ми використовуємо файли cookie для покращення вашого досвіду. Продовжуючи, ви погоджуєтеся з нашою політикою щодо файлів cookie.",
    accept: "Прийняти",
    decline: "Відхилити",
  },
  unitLabels: {
    length: {
      m: "Метр (m)", km: "Кілометр (km)", cm: "Сантиметр (cm)", mm: "Міліметр (mm)",
      mi: "Миля (mi)", yd: "Ярд (yd)", ft: "Фут (ft)", in: "Дюйм (in)",
      nm: "Морська миля (nm)", "\u03BCm": "Мікрометр (\u03BCm)",
    },
    weight: {
      kg: "Кілограм (kg)", g: "Грам (g)", mg: "Міліграм (mg)", lb: "Фунт (lb)",
      oz: "Унція (oz)", ton: "Метрична тонна (t)", st: "Стоун (st)", ct: "Карат (ct)",
    },
    temperature: { C: "Цельсій (\u00B0C)", F: "Фаренгейт (\u00B0F)", K: "Кельвін (K)" },
    area: {
      "m\u00B2": "Квадратний метр (m\u00B2)", "km\u00B2": "Квадратний кілометр (km\u00B2)",
      ha: "Гектар (ha)", acre: "Акр", "ft\u00B2": "Квадратний фут (ft\u00B2)",
      "mi\u00B2": "Квадратна миля (mi\u00B2)", "yd\u00B2": "Квадратний ярд (yd\u00B2)",
      "cm\u00B2": "Квадратний сантиметр (cm\u00B2)",
    },
    volume: {
      L: "Літр (L)", mL: "Мілілітр (mL)", gal: "Галон US (gal)",
      "fl oz": "Рідка унція US (fl oz)", cup: "Чашка US", pt: "Пінта US (pt)",
      qt: "Кварта US (qt)", "m\u00B3": "Кубічний метр (m\u00B3)",
      "cm\u00B3": "Кубічний сантиметр (cm\u00B3)", tbsp: "Столова ложка (tbsp)", tsp: "Чайна ложка (tsp)",
    },
    speed: {
      "m/s": "Метр/с (m/s)", "km/h": "Кілометр/год (km/h)", mph: "Миля/год (mph)",
      kn: "Вузол (kn)", "ft/s": "Фут/с (ft/s)", mach: "Мах",
    },
    time: {
      ms: "Мілісекунда (ms)", s: "Секунда (s)", min: "Хвилина (min)", h: "Година (h)",
      d: "День (d)", wk: "Тиждень (wk)", mo: "Місяць (mo)", yr: "Рік (yr)",
    },
    pressure: {
      Pa: "Паскаль (Pa)", kPa: "Кілопаскаль (kPa)", bar: "Бар", psi: "PSI",
      atm: "Атмосфера (atm)", torr: "Торр", mmHg: "mmHg",
    },
    energy: {
      J: "Джоуль (J)", kJ: "Кілоджоуль (kJ)", cal: "Калорія (cal)", kcal: "Кілокалорія (kcal)",
      Wh: "Ват-година (Wh)", kWh: "Кіловат-година (kWh)", BTU: "BTU", eV: "Електронвольт (eV)",
    },
    power: {
      W: "Ват (W)", kW: "Кіловат (kW)", MW: "Мегават (MW)", hp: "Кінська сила (hp)",
      "BTU/h": "BTU/год", "cal/s": "Калорія/с",
    },
    frequency: {
      Hz: "Герц (Hz)", kHz: "Кілогерц (kHz)", MHz: "Мегагерц (MHz)",
      GHz: "Гігагерц (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Градус (\u00B0)", rad: "Радіан (rad)", grad: "Градіан (grad)",
      turn: "Оберт", arcmin: "Кутова хвилина (\u2032)", arcsec: "Кутова секунда (\u2033)",
    },
    "data-storage": {
      B: "Байт (B)", KB: "Кілобайт (KB)", MB: "Мегабайт (MB)", GB: "Гігабайт (GB)",
      TB: "Терабайт (TB)", PB: "Петабайт (PB)", bit: "Біт",
      Kbit: "Кілобіт", Mbit: "Мегабіт", Gbit: "Гігабіт",
    },
    "fuel-economy": { "km/L": "км/л", mpg: "mpg (US)", "L/100km": "л/100км" },
    "cooking-measurement": {
      cup: "Чашка", tbsp: "Столова ложка", tsp: "Чайна ложка", mL: "Мілілітр (mL)",
      L: "Літр (L)", fl_oz: "Рідка унція", g: "Грам (g)", kg: "Кілограм (kg)",
      oz: "Унція (oz)", lb: "Фунт (lb)",
    },
    "oven-temperature": { C: "Цельсій (\u00B0C)", F: "Фаренгейт (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Пікселі (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Пікселі (px)", em: "Em (em)" },
    "px-percent": { px: "Пікселі (px)", "%": "Відсоток (%)" },
    "css-unit": {
      px: "Пікселі (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Відсоток (%)", vw: "Ширина в'юпорту (vw)", vh: "Висота в'юпорту (vh)",
    },
  },
};

export default dict;
