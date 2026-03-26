import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Все необходимые инструменты для конвертации",
    titleAccent: "конвертации",
    description:
      "Единицы, цвета, форматы данных, даты — всё прямо в браузере.",
    tabAll: "Все",
    categoryUnit: "Единицы",
    categoryNumber: "Числа",
    categoryColor: "Цвета",
    categoryDatetime: "Дата/Время",
    categoryData: "Данные",
    categoryCss: "CSS",
    categoryCooking: "Кулинария",
    categoryGeography: "География",
    searchPlaceholder: "Поиск конвертеров...",
    noResults: "Конвертеры не найдены.",
    recentTools: "Недавно использованные",
    favorites: "Избранное",
    favDragHint: "Перетащите для изменения порядка",
    favHint: "Нажмите на звёздочку, чтобы добавить в избранное",
    gridView: "Сетка",
    listView: "Список",
  },
  trust: {
    encryption: "Безопасная обработка",
    encryptionDesc: "Все вычисления выполняются локально в вашем браузере",
    autoDelete: "Данные не сохраняются",
    autoDeleteDesc: "Введённые данные никогда не сохраняются и не отправляются на сервер",
    free: "Полностью бесплатно",
    freeDesc: "Без ограничений, регистрации и скрытых платежей",
    browserProcessing: "Мгновенный результат",
    browserProcessingDesc: "Конвертация в реальном времени по мере ввода",
  },
  tools: {
    length: {
      title: "Конвертер длины",
      description:
        "Конвертируйте метры, километры, мили, футы, дюймы и другие единицы длины.",
    },
    weight: {
      title: "Конвертер массы",
      description:
        "Конвертируйте килограммы, фунты, унции, тонны и другие единицы массы.",
    },
    temperature: {
      title: "Конвертер температуры",
      description: "Конвертируйте градусы Цельсия, Фаренгейта и Кельвина.",
    },
    area: {
      title: "Конвертер площади",
      description:
        "Конвертируйте квадратные метры, гектары, акры, квадратные футы и другие единицы.",
    },
    volume: {
      title: "Конвертер объёма",
      description:
        "Конвертируйте литры, галлоны, чашки, жидкие унции и другие единицы.",
    },
    speed: {
      title: "Конвертер скорости",
      description: "Конвертируйте м/с, км/ч, mph, узлы и другие единицы.",
    },
    time: {
      title: "Конвертер времени",
      description:
        "Конвертируйте секунды, минуты, часы, дни, недели и другие единицы.",
    },
    pressure: {
      title: "Конвертер давления",
      description:
        "Конвертируйте Паскали, бары, PSI, атмосферы и другие единицы.",
    },
    energy: {
      title: "Конвертер энергии",
      description:
        "Конвертируйте джоули, калории, киловатт-часы, BTU и другие единицы.",
    },
    power: {
      title: "Конвертер мощности",
      description:
        "Конвертируйте ватты, киловатты, лошадиные силы и другие единицы.",
    },
    frequency: {
      title: "Конвертер частоты",
      description:
        "Конвертируйте герцы, килогерцы, мегагерцы, гигагерцы и обороты в минуту.",
    },
    angle: {
      title: "Конвертер углов",
      description: "Конвертируйте градусы, радианы, грады и обороты.",
    },
    "data-storage": {
      title: "Конвертер данных",
      description:
        "Конвертируйте байты, килобайты, мегабайты, гигабайты и другие единицы.",
    },
    "fuel-economy": {
      title: "Конвертер расхода топлива",
      description: "Конвертируйте км/л, mpg и л/100 км.",
    },
    "number-base": {
      title: "Конвертер систем счисления",
      description:
        "Конвертируйте двоичные, восьмеричные, десятичные, шестнадцатеричные и другие системы.",
    },
    "roman-numeral": {
      title: "Конвертер римских цифр",
      description: "Конвертируйте римские цифры в арабские и обратно.",
    },
    "scientific-notation": {
      title: "Научная нотация",
      description:
        "Конвертируйте числа между научной нотацией и стандартной записью.",
    },
    "fraction-decimal": {
      title: "Дробь ↔ Десятичное",
      description: "Конвертируйте дроби в десятичные числа и обратно.",
    },
    percentage: {
      title: "Конвертер процентов",
      description:
        "Конвертируйте дроби, десятичные числа и проценты.",
    },
    "color-converter": {
      title: "Конвертер цветов",
      description:
        "Конвертируйте цвета между форматами HEX, RGB, HSL, HSV и CMYK.",
    },
    "color-palette-generator": {
      title: "Генератор палитр",
      description:
        "Создавайте комплементарные, триадные и аналоговые цветовые палитры.",
    },
    "gradient-generator": {
      title: "Генератор CSS-градиентов",
      description:
        "Создавайте линейные, радиальные и конические CSS-градиенты с предпросмотром.",
    },
    "color-contrast-checker": {
      title: "Проверка контрастности",
      description:
        "Проверяйте коэффициент контрастности по WCAG AA/AAA для двух цветов.",
    },
    "color-blindness-simulator": {
      title: "Симулятор дальтонизма",
      description:
        "Смоделируйте, как цвета видят люди с нарушением цветового зрения.",
    },
    timezone: {
      title: "Конвертер часовых поясов",
      description:
        "Конвертируйте время между часовыми поясами по всему миру.",
    },
    "unix-timestamp": {
      title: "Конвертер Unix-времени",
      description:
        "Конвертируйте Unix-метки времени в читаемые даты и обратно.",
    },
    "date-format": {
      title: "Конвертер формата даты",
      description:
        "Конвертируйте даты между форматами ISO, US, EU и другими.",
    },
    "date-calculator": {
      title: "Калькулятор дат",
      description:
        "Вычисляйте разницу между датами или прибавляйте/вычитайте дни.",
    },
    "age-calculator": {
      title: "Калькулятор возраста",
      description:
        "Рассчитайте точный возраст по дате рождения в годах, месяцах и днях.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Конвертируйте данные между форматами JSON и YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Конвертируйте JSON-массивы в формат CSV и обратно.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Конвертируйте данные между форматами JSON и XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Конвертируйте данные между форматами JSON и TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Конвертируйте разметку Markdown в HTML и обратно.",
    },
    "csv-table": {
      title: "CSV в таблицу",
      description: "Конвертируйте CSV-данные в таблицы Markdown или HTML.",
    },
    "json-typescript": {
      title: "JSON в TypeScript",
      description: "Генерируйте TypeScript-интерфейсы из JSON-данных.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Конвертируйте SQL INSERT-запросы в JSON и обратно.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Конвертируйте пиксели в rem и обратно с настраиваемым базовым размером.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Конвертируйте пиксели в em и обратно с настраиваемым размером родителя.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Конвертируйте пиксели в проценты с настраиваемой шириной контейнера.",
    },
    "css-unit": {
      title: "Конвертер CSS-единиц",
      description:
        "Конвертируйте px, rem, em, %, vw, vh и другие CSS-единицы.",
    },
    "css-minifier": {
      title: "Минификатор CSS",
      description:
        "Сжимайте или форматируйте CSS-код для продакшена или удобства чтения.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Конвертируйте классы Tailwind CSS в обычный CSS и обратно.",
    },
    "cooking-measurement": {
      title: "Кулинарные мерки",
      description:
        "Конвертируйте чашки, столовые ложки, чайные ложки, миллилитры и граммы.",
    },
    "recipe-scaler": {
      title: "Масштабирование рецептов",
      description:
        "Пересчитайте ингредиенты рецепта на нужное количество порций.",
    },
    "oven-temperature": {
      title: "Температура духовки",
      description:
        "Конвертируйте температуру духовки между Цельсием, Фаренгейтом и Gas Mark.",
    },
    coordinate: {
      title: "Конвертер координат",
      description:
        "Конвертируйте координаты между форматами DMS, DD и DDM.",
    },
    "distance-calculator": {
      title: "Калькулятор расстояний",
      description:
        "Вычислите расстояние между двумя географическими координатами.",
    },
  },
  nav: {
    allTools: "Все конвертеры",
    language: "Язык",
  },
  footer: {
    tools: "Конвертеры",
    legal: "Правовая информация",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    copyright: "ToolPop. Все права защищены.",
    company: "Компания",
    about: "О нас",
    contact: "Контакты",
    faq: "FAQ",
  },
  common: {
    backToAll: "Все конвертеры",
    inputPlaceholder: "Введите значение для конвертации...",
    outputLabel: "Результат",
    copyToClipboard: "Копировать",
    copied: "Скопировано!",
    clear: "Очистить",
    paste: "Вставить",
    processing: "Конвертация...",
    startOver: "Начать заново",
    process: "Конвертировать",
    tryAgain: "Попробовать снова",
    notImplemented: "Этот конвертер скоро появится.",
    tryOtherTools: "Попробуйте другие конвертеры",
    privacyBadge: "Все вычисления выполняются в вашем браузере",
    favoriteAdded: "Добавлено в избранное",
    favoriteRemoved: "Удалено из избранного",
    comingSoon: "Скоро",
    share: "Поделиться",
    shareTitle: "Поделиться конвертером",
    shareSubtitle: "Поделитесь этим полезным конвертером с другими",
    shareCopied: "Ссылка скопирована!",
    shareCopyLink: "Копировать ссылку",
    downloadAsFile: "Скачать",
    options: "Настройки",
    input: "Ввод",
    output: "Вывод",
    convert: "Конвертировать",
    swap: "Поменять",
    from: "Из",
    to: "В",
    result: "Результат",
    allConversions: "Все конвертации",
    details: "Подробности",
    pageNotFound: "Конвертер не найден",
    goHome: "Ко всем конвертерам",
  },
  toolOptions: {
    fromUnit: "Из",
    toUnit: "В",
    precision: "Десятичные знаки",
    baseSize: "Базовый размер шрифта (px)",
    parentSize: "Размер шрифта родителя (px)",
    containerWidth: "Ширина контейнера (px)",
    viewportWidth: "Ширина вьюпорта (px)",
    viewportHeight: "Высота вьюпорта (px)",
    direction: "Направление",
    mode: "Режим",
    ingredient: "Ингредиент",
    water: "Вода",
    flour: "Мука",
    sugar: "Сахар",
    butter: "Масло",
    rice: "Рис",
    milk: "Молоко",
    originalServings: "Исходные порции",
    targetServings: "Нужные порции",
    fromTimezone: "Из часового пояса",
    toTimezone: "В часовой пояс",
    inputFormat: "Входной формат",
    outputFormat: "Выходной формат",
    harmony: "Цветовая гармония",
    complementary: "Комплементарная",
    triadic: "Триадная",
    analogous: "Аналоговая",
    splitComplementary: "Расщеплённая комплементарная",
    tetradic: "Тетрадная",
    gradientType: "Тип градиента",
    linear: "Линейный",
    radial: "Радиальный",
    conic: "Конический",
    gradientAngle: "Угол (deg)",
    rootName: "Имя корневого интерфейса",
    tableName: "Имя таблицы",
    minify: "Сжать",
    beautify: "Форматировать",
    colorType: "Тип нарушения",
    protanopia: "Протанопия (нет красного)",
    deuteranopia: "Дейтеранопия (нет зелёного)",
    tritanopia: "Тританопия (нет синего)",
    achromatopsia: "Ахроматопсия (нет цвета)",
    operation: "Операция",
    difference: "Разница",
    add: "Прибавить",
    subtract: "Вычесть",
    amount: "Количество",
    unit: "Единица",
    days: "Дни",
    weeks: "Недели",
    months: "Месяцы",
    years: "Годы",
    fromBase: "Из системы",
    toBase: "В систему",
    binary: "Двоичная (2)",
    octal: "Восьмеричная (8)",
    decimal: "Десятичная (10)",
    hexadecimal: "Шестнадцатеричная (16)",
    seconds: "Секунды",
    milliseconds: "Миллисекунды",
    autoDetect: "Автоопределение",
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
    markdown: "Таблица Markdown",
    html: "Таблица HTML",
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
    toRoman: "Число → Римское",
    toArabic: "Римское → Число",
    toScientific: "Стандартное → Научное",
    toStandard: "Научное → Стандартное",
    toFraction: "Десятичное → Дробь",
    toDecimal: "Дробь → Десятичное",
    decimalToPercent: "Десятичное → Процент",
    percentToDecimal: "Процент → Десятичное",
    fractionToPercent: "Дробь → Процент",
    dd: "Десятичные градусы (DD)",
    dms: "Градусы минуты секунды (DMS)",
    ddm: "Градусы десятичные минуты (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Полный формат",
    short: "Краткий формат",
    relative: "Относительный",
    celsius: "Цельсий (°C)",
    fahrenheit: "Фаренгейт (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Цвет фона",
    monochromatic: "Монохроматический",
    timestampToDate: "Метка времени → Дата",
    dateToTimestamp: "Дата → Метка времени",
    showDetails: "Показать подробную разбивку",
    addDays: "Прибавить дни",
    subtractDays: "Вычесть дни",
    datetimeHint: "напр. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Строки",
    characters: "Символы",
    rows: "Строки",
    columns: "Столбцы",
    elements: "Элементы",
    keys: "Ключи",
    interfaces: "Интерфейсы",
    properties: "Свойства",
    originalSize: "Исходный размер",
    resultSize: "Итоговый размер",
    savings: "Экономия",
    ingredients: "Ингредиенты",
    scaleFactor: "Коэффициент",
    contrastRatio: "Коэффициент контрастности",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Широта",
    longitude: "Долгота",
    distanceKm: "Расстояние (km)",
    distanceMi: "Расстояние (mi)",
    years: "Годы",
    months: "Месяцы",
    days: "Дни",
  },
  processorMessages: {
    invalidTimezone: "Недопустимый часовой пояс",
    pass: "Пройден", fail: "Не пройден",
    fromNow: "спустя", ago: "назад",
    today: "Сегодня", tomorrow: "Завтра", yesterday: "Вчера",
    seconds: "секунда", secondsPlural: "секунд",
    minutes: "минута", minutesPlural: "минут",
    hours: "час", hoursPlural: "часов",
    daysUnit: "день", daysPlural: "дней",
    weeksUnit: "неделя", weeksPlural: "недель",
    monthsUnit: "месяц", monthsPlural: "месяцев",
    yearsUnit: "год", yearsPlural: "лет",
    gasmark: "Gas Mark",
    veryCool: "Очень прохладно", cool: "Прохладно", moderatelyCool: "Умеренно прохладно",
    moderate: "Умеренно", moderatelyHot: "Умеренно горячо",
    hot: "Горячо", veryHot: "Очень горячо", extremelyHot: "Экстремально горячо",
    original: "Оригинал",
    from: "Из", to: "В",
    totalDays: "Всего дней", weeksDays: "Недели + Дни",
    originalDate: "Исходная дата", operationLabel: "Операция",
    resultDate: "Дата результата", dayOfWeek: "День недели",
    daysBetween: "Дней между датами",
    age: "Возраст", totalMonths: "Всего месяцев",
    totalHours: "Всего часов", totalMinutes: "Всего минут",
    nextBirthday: "Следующий день рождения",
    roman: "Римские", arabic: "Арабские",
    scientific: "Научная", standard: "Стандартная", engineering: "Инженерная",
    fraction: "Дробь", simplified: "Упрощённое", percentage: "Процент",
    color1: "Цвет 1", color2: "Цвет 2",
    contrastRatioLabel: "Коэффициент контрастности",
    aaNormalText: "AA Обычный текст", aaLargeText: "AA Крупный текст",
    aaaNormalText: "AAA Обычный текст", aaaLargeText: "AAA Крупный текст",
    gradientTypeLabel: "Тип", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Бесплатные онлайн-конвертеры",
    siteDescription:
      "Конвертируйте единицы, цвета, форматы данных, даты и многое другое. Бесплатно, быстро и безопасно — всё работает в вашем браузере.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Блог",
    description:
      "Советы, руководства и полезная информация о конвертации единиц, форматах данных и многом другом.",
    readMore: "Читать далее",
    backToBlog: "Назад в блог",
    publishedOn: "Опубликовано",
    categoryGuide: "Руководство",
    categoryTips: "Советы",
    categoryKnowledge: "Справка",
  },
  cookie: {
    message:
      "Мы используем файлы cookie для улучшения работы сайта. Продолжая, вы соглашаетесь с нашей политикой использования cookie.",
    accept: "Принять",
    decline: "Отклонить",
  },
  unitLabels: {
    length: {
      m: "Метр (m)", km: "Километр (km)", cm: "Сантиметр (cm)", mm: "Миллиметр (mm)",
      mi: "Миля (mi)", yd: "Ярд (yd)", ft: "Фут (ft)", in: "Дюйм (in)",
      nm: "Морская миля (nm)", "\u03BCm": "Микрометр (\u03BCm)",
    },
    weight: {
      kg: "Килограмм (kg)", g: "Грамм (g)", mg: "Миллиграмм (mg)", lb: "Фунт (lb)",
      oz: "Унция (oz)", ton: "Метрическая тонна (t)", st: "Стоун (st)", ct: "Карат (ct)",
    },
    temperature: { C: "Цельсий (\u00B0C)", F: "Фаренгейт (\u00B0F)", K: "Кельвин (K)" },
    area: {
      "m\u00B2": "Квадратный метр (m\u00B2)", "km\u00B2": "Квадратный километр (km\u00B2)",
      ha: "Гектар (ha)", acre: "Акр", "ft\u00B2": "Квадратный фут (ft\u00B2)",
      "mi\u00B2": "Квадратная миля (mi\u00B2)", "yd\u00B2": "Квадратный ярд (yd\u00B2)",
      "cm\u00B2": "Квадратный сантиметр (cm\u00B2)",
    },
    volume: {
      L: "Литр (L)", mL: "Миллилитр (mL)", gal: "Галлон US (gal)",
      "fl oz": "Жидкая унция US (fl oz)", cup: "Чашка US", pt: "Пинта US (pt)",
      qt: "Кварта US (qt)", "m\u00B3": "Кубический метр (m\u00B3)",
      "cm\u00B3": "Кубический сантиметр (cm\u00B3)", tbsp: "Столовая ложка (tbsp)", tsp: "Чайная ложка (tsp)",
    },
    speed: {
      "m/s": "Метр/сек (m/s)", "km/h": "Километр/ч (km/h)", mph: "Миля/ч (mph)",
      kn: "Узел (kn)", "ft/s": "Фут/сек (ft/s)", mach: "Мах",
    },
    time: {
      ms: "Миллисекунда (ms)", s: "Секунда (s)", min: "Минута (min)", h: "Час (h)",
      d: "День (d)", wk: "Неделя (wk)", mo: "Месяц (mo)", yr: "Год (yr)",
    },
    pressure: {
      Pa: "Паскаль (Pa)", kPa: "Килопаскаль (kPa)", bar: "Бар", psi: "PSI",
      atm: "Атмосфера (atm)", torr: "Торр", mmHg: "mmHg",
    },
    energy: {
      J: "Джоуль (J)", kJ: "Килоджоуль (kJ)", cal: "Калория (cal)", kcal: "Килокалория (kcal)",
      Wh: "Ватт-час (Wh)", kWh: "Киловатт-час (kWh)", BTU: "BTU", eV: "Электронвольт (eV)",
    },
    power: {
      W: "Ватт (W)", kW: "Киловатт (kW)", MW: "Мегаватт (MW)", hp: "Лошадиная сила (hp)",
      "BTU/h": "BTU/ч", "cal/s": "Калория/сек",
    },
    frequency: {
      Hz: "Герц (Hz)", kHz: "Килогерц (kHz)", MHz: "Мегагерц (MHz)",
      GHz: "Гигагерц (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Градус (\u00B0)", rad: "Радиан (rad)", grad: "Град (grad)",
      turn: "Оборот", arcmin: "Угловая минута (\u2032)", arcsec: "Угловая секунда (\u2033)",
    },
    "data-storage": {
      B: "Байт (B)", KB: "Килобайт (KB)", MB: "Мегабайт (MB)", GB: "Гигабайт (GB)",
      TB: "Терабайт (TB)", PB: "Петабайт (PB)", bit: "Бит",
      Kbit: "Килобит", Mbit: "Мегабит", Gbit: "Гигабит",
    },
    "fuel-economy": { "km/L": "км/л", mpg: "mpg (US)", "L/100km": "л/100 км" },
    "cooking-measurement": {
      cup: "Чашка", tbsp: "Столовая ложка", tsp: "Чайная ложка", mL: "Миллилитр (mL)",
      L: "Литр (L)", fl_oz: "Жидкая унция", g: "Грамм (g)", kg: "Килограмм (kg)",
      oz: "Унция (oz)", lb: "Фунт (lb)",
    },
    "oven-temperature": { C: "Цельсий (\u00B0C)", F: "Фаренгейт (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Пиксели (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Пиксели (px)", em: "Em (em)" },
    "px-percent": { px: "Пиксели (px)", "%": "Процент (%)" },
    "css-unit": {
      px: "Пиксели (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Процент (%)", vw: "Ширина вьюпорта (vw)", vh: "Высота вьюпорта (vh)",
    },
  },
};

export default dict;
