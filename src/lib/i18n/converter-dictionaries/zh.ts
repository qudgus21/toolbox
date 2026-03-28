import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "你需要的所有转换工具",
    titleAccent: "转换",
    description:
      "单位、颜色、数据格式、日期转换，全部在浏览器中完成。",
    tabAll: "全部",
    categoryUnit: "单位",
    categoryNumber: "数字",
    categoryColor: "颜色",
    categoryDatetime: "日期/时间",
    categoryData: "数据",
    categoryCss: "CSS",
    categoryCooking: "烹饪",
    categoryGeography: "地理",
    searchPlaceholder: "搜索转换工具...",
    noResults: "未找到相关转换工具。",
    recentTools: "最近使用",
    favorites: "收藏夹",
    favDragHint: "拖动排序",
    favHint: "点击星标添加收藏",
    gridView: "网格视图",
    listView: "列表视图",
  },
  trust: {
    encryption: "安全处理",
    encryptionDesc: "所有转换均在浏览器本地完成",
    autoDelete: "不存储数据",
    autoDeleteDesc: "您的输入不会被保存或发送至服务器",
    free: "完全免费",
    freeDesc: "无限制、无需注册、无隐藏费用",
    browserProcessing: "即时结果",
    browserProcessingDesc: "输入即转换，实时呈现结果",
  },
  tools: {
    length: {
      title: "长度转换",
      description:
        "在米、千米、英里、英尺、英寸等单位之间互相转换。",
    },
    weight: {
      title: "重量转换",
      description:
        "在千克、磅、盎司、吨等单位之间互相转换。",
    },
    temperature: {
      title: "温度转换",
      description: "在摄氏度、华氏度和开尔文之间互相转换。",
    },
    area: {
      title: "面积转换",
      description:
        "在平方米、公顷、英亩、平方英尺等单位之间互相转换。",
    },
    volume: {
      title: "体积转换",
      description:
        "在升、加仑、杯、液量盎司等单位之间互相转换。",
    },
    speed: {
      title: "速度转换",
      description: "在 m/s、km/h、mph、节等单位之间互相转换。",
    },
    time: {
      title: "时间转换",
      description:
        "在秒、分钟、小时、天、周等单位之间互相转换。",
    },
    pressure: {
      title: "压力转换",
      description:
        "在帕斯卡、巴、PSI、大气压等单位之间互相转换。",
    },
    energy: {
      title: "能量转换",
      description:
        "在焦耳、卡路里、千瓦时、BTU 等单位之间互相转换。",
    },
    power: {
      title: "功率转换",
      description:
        "在瓦特、千瓦、马力等单位之间互相转换。",
    },
    frequency: {
      title: "频率转换",
      description:
        "在赫兹、千赫、兆赫、吉赫和 RPM 之间互相转换。",
    },
    angle: {
      title: "角度转换",
      description: "在度、弧度、百分度和圈之间互相转换。",
    },
    "data-storage": {
      title: "数据存储转换",
      description:
        "在字节、千字节、兆字节、吉字节等单位之间互相转换。",
    },
    "fuel-economy": {
      title: "油耗转换",
      description: "在 km/L、mpg 和 L/100km 之间互相转换。",
    },
    "number-base": {
      title: "进制转换",
      description:
        "在二进制、八进制、十进制、十六进制和自定义进制之间互相转换。",
    },
    "roman-numeral": {
      title: "罗马数字转换",
      description: "在罗马数字和阿拉伯数字之间互相转换。",
    },
    "scientific-notation": {
      title: "科学记数法转换",
      description:
        "在科学记数法和标准数字之间互相转换。",
    },
    "fraction-decimal": {
      title: "分数 ↔ 小数",
      description: "在分数和小数之间互相转换。",
    },
    percentage: {
      title: "百分比转换",
      description:
        "在分数、小数和百分比之间互相转换。",
    },
    "color-converter": {
      title: "颜色转换",
      description:
        "在 HEX、RGB、HSL、HSV 和 CMYK 颜色格式之间互相转换。",
    },
    "color-palette-generator": {
      title: "调色板生成器",
      description:
        "生成互补色、三色组和类似色调色板。",
    },
    "gradient-generator": {
      title: "CSS 渐变生成器",
      description:
        "创建线性、径向和锥形 CSS 渐变，支持实时预览。",
    },
    "color-contrast-checker": {
      title: "色彩对比度检查",
      description:
        "检查两种颜色之间的 WCAG AA/AAA 对比度。",
    },
    "color-blindness-simulator": {
      title: "色盲模拟器",
      description:
        "模拟色觉障碍人群看到的颜色效果。",
    },
    timezone: {
      title: "时区转换",
      description:
        "在全球不同时区之间转换时间。",
    },
    "unix-timestamp": {
      title: "Unix 时间戳转换",
      description:
        "在 Unix 时间戳和可读日期之间互相转换。",
    },
    "date-format": {
      title: "日期格式转换",
      description:
        "在 ISO、美式、欧式等不同日期格式之间互相转换。",
    },
    "date-calculator": {
      title: "日期计算器",
      description:
        "计算两个日期之间的差值，或进行日期加减运算。",
    },
    "age-calculator": {
      title: "年龄计算器",
      description:
        "根据出生日期精确计算年、月、日形式的年龄。",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "在 JSON 和 YAML 数据格式之间互相转换。",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "在 JSON 数组和 CSV 表格格式之间互相转换。",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "在 JSON 和 XML 数据格式之间互相转换。",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "在 JSON 和 TOML 配置格式之间互相转换。",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "在 Markdown 和 HTML 标记之间互相转换。",
    },
    "csv-table": {
      title: "CSV 转表格",
      description: "将 CSV 数据转换为 Markdown 或 HTML 表格。",
    },
    "json-typescript": {
      title: "JSON 转 TypeScript",
      description: "从 JSON 数据生成 TypeScript 接口。",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "在 SQL INSERT 语句和 JSON 数据之间互相转换。",
    },
    "px-rem": {
      title: "px ↔ rem 转换",
      description:
        "使用自定义基准大小在像素和 rem 单位之间互相转换。",
    },
    "px-em": {
      title: "px ↔ em 转换",
      description:
        "使用自定义父元素大小在像素和 em 单位之间互相转换。",
    },
    "px-percent": {
      title: "px ↔ % 转换",
      description:
        "使用自定义容器宽度在像素和百分比之间互相转换。",
    },
    "css-unit": {
      title: "CSS 单位转换",
      description:
        "在 px、rem、em、%、vw、vh 等 CSS 单位之间互相转换。",
    },
    "css-minifier": {
      title: "CSS 压缩 / 美化",
      description:
        "压缩或美化 CSS 代码，便于生产部署或提高可读性。",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "在 Tailwind CSS 类名和原生 CSS 之间互相转换。",
    },
    "cooking-measurement": {
      title: "烹饪计量转换",
      description:
        "在杯、汤匙、茶匙、毫升和克之间互相转换。",
    },
    "recipe-scaler": {
      title: "食谱份量调整",
      description:
        "根据用餐人数按比例调整食材用量。",
    },
    "oven-temperature": {
      title: "烤箱温度转换",
      description:
        "在摄氏度、华氏度和 Gas Mark 烤箱温度之间互相转换。",
    },
    coordinate: {
      title: "坐标转换",
      description:
        "在 DMS、DD 和 DDM 坐标格式之间互相转换。",
    },
    "distance-calculator": {
      title: "距离计算器",
      description:
        "计算两个地理坐标之间的距离。",
    },
  },
  nav: {
    allTools: "所有转换工具",
    language: "语言",
  },
  footer: {
    tools: "转换工具",
    legal: "法律信息",
    privacy: "隐私政策",
    terms: "服务条款",
    copyright: "ToolPop. 保留所有权利。",
    company: "关于我们",
    about: "简介",
    contact: "联系我们",
    faq: "常见问题",
  },
  common: {
    backToAll: "所有转换工具",
    inputPlaceholder: "输入要转换的值...",
    outputLabel: "结果",
    copyToClipboard: "复制到剪贴板",
    copied: "已复制！",
    clear: "清除",
    paste: "粘贴",
    processing: "转换中...",
    startOver: "重新开始",
    process: "转换",
    tryAgain: "重试",
    notImplemented: "该转换工具即将上线。",
    tryOtherTools: "试试其他转换工具",
    privacyBadge: "所有转换均在浏览器内完成",
    favoriteAdded: "已添加到收藏夹",
    favoriteRemoved: "已从收藏夹移除",
    comingSoon: "即将上线",
    share: "分享",
    shareTitle: "分享此转换工具",
    shareSubtitle: "把这个好用的转换工具分享给朋友吧",
    shareCopied: "链接已复制！",
    shareCopyLink: "复制链接",
    downloadAsFile: "下载",
    options: "选项",
    input: "输入",
    output: "输出",
    convert: "转换",
    swap: "互换",
    from: "从",
    to: "到",
    result: "结果",
    allConversions: "所有转换",
    details: "详情",
    pageNotFound: "未找到该转换工具",
    goHome: "返回所有转换工具",
    colorPickerLabel: "颜色选择器",
  },
  toolOptions: {
    fromUnit: "从",
    toUnit: "到",
    precision: "小数位数",
    baseSize: "基准字号 (px)",
    parentSize: "父元素字号 (px)",
    containerWidth: "容器宽度 (px)",
    viewportWidth: "视口宽度 (px)",
    viewportHeight: "视口高度 (px)",
    direction: "方向",
    mode: "模式",
    ingredient: "食材",
    water: "水",
    flour: "面粉",
    sugar: "糖",
    butter: "黄油",
    rice: "米",
    milk: "牛奶",
    originalServings: "原始份数",
    targetServings: "目标份数",
    fromTimezone: "来源时区",
    toTimezone: "目标时区",
    inputFormat: "输入格式",
    outputFormat: "输出格式",
    harmony: "配色方案",
    complementary: "互补色",
    triadic: "三色组",
    analogous: "类似色",
    splitComplementary: "分裂互补",
    tetradic: "四色组",
    gradientType: "渐变类型",
    linear: "线性",
    radial: "径向",
    conic: "锥形",
    gradientAngle: "角度 (deg)",
    rootName: "根接口名称",
    tableName: "表名",
    minify: "压缩",
    beautify: "美化",
    colorType: "色觉缺陷类型",
    protanopia: "红色盲（无红色）",
    deuteranopia: "绿色盲（无绿色）",
    tritanopia: "蓝色盲（无蓝色）",
    achromatopsia: "全色盲（无色彩）",
    operation: "操作",
    difference: "差值",
    add: "加",
    subtract: "减",
    amount: "数量",
    unit: "单位",
    days: "天",
    weeks: "周",
    months: "月",
    years: "年",
    fromBase: "来源进制",
    toBase: "目标进制",
    binary: "二进制 (2)",
    octal: "八进制 (8)",
    decimal: "十进制 (10)",
    hexadecimal: "十六进制 (16)",
    seconds: "秒",
    milliseconds: "毫秒",
    autoDetect: "自动检测",
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
    markdown: "Markdown 表格",
    html: "HTML 表格",
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
    toRoman: "数字 → 罗马数字",
    toArabic: "罗马数字 → 数字",
    toScientific: "标准 → 科学记数法",
    toStandard: "科学记数法 → 标准",
    toFraction: "小数 → 分数",
    toDecimal: "分数 → 小数",
    decimalToPercent: "小数 → 百分比",
    percentToDecimal: "百分比 → 小数",
    fractionToPercent: "分数 → 百分比",
    dd: "十进制度 (DD)",
    dms: "度分秒 (DMS)",
    ddm: "度十进分 (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "完整格式",
    short: "简短格式",
    relative: "相对时间",
    celsius: "摄氏 (°C)",
    fahrenheit: "华氏 (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "背景颜色",
    monochromatic: "单色",
    timestampToDate: "时间戳 → 日期",
    dateToTimestamp: "日期 → 时间戳",
    showDetails: "显示详细分解",
    addDays: "加天数",
    subtractDays: "减天数",
    datetimeHint: "如 2024-01-15、1705312200、now",
    endDate: "结束日期",
    today: "今天 (默认)",
    dateUnit: "单位",
  },
  statsLabels: {
    lines: "行数",
    characters: "字符数",
    rows: "行",
    columns: "列",
    elements: "元素",
    keys: "键",
    interfaces: "接口",
    properties: "属性",
    originalSize: "原始大小",
    resultSize: "结果大小",
    savings: "节省",
    ingredients: "食材",
    scaleFactor: "缩放比例",
    contrastRatio: "对比度",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "纬度",
    longitude: "经度",
    distanceKm: "距离 (km)",
    distanceMi: "距离 (mi)",
    years: "年",
    months: "月",
    days: "天",
  },
  processorMessages: {
    invalidTimezone: "无效时区",
    pass: "通过", fail: "未通过",
    fromNow: "后", ago: "前",
    today: "今天", tomorrow: "明天", yesterday: "昨天",
    seconds: "秒", secondsPlural: "秒",
    minutes: "分钟", minutesPlural: "分钟",
    hours: "小时", hoursPlural: "小时",
    daysUnit: "天", daysPlural: "天",
    weeksUnit: "周", weeksPlural: "周",
    monthsUnit: "个月", monthsPlural: "个月",
    yearsUnit: "年", yearsPlural: "年",
    gasmark: "Gas Mark",
    veryCool: "非常低温", cool: "低温", moderatelyCool: "较低温",
    moderate: "中温", moderatelyHot: "较高温",
    hot: "高温", veryHot: "非常高温", extremelyHot: "极高温",
    original: "原始值",
    from: "从", to: "到",
    totalDays: "总天数", weeksDays: "周 + 天",
    originalDate: "原始日期", operationLabel: "操作",
    resultDate: "结果日期", dayOfWeek: "星期",
    daysBetween: "相差天数",
    age: "年龄", totalMonths: "总月数",
    totalHours: "总小时数", totalMinutes: "总分钟数",
    nextBirthday: "下一个生日",
    roman: "罗马数字", arabic: "阿拉伯数字",
    scientific: "科学记数法", standard: "标准", engineering: "工程记数法",
    fraction: "分数", simplified: "化简", percentage: "百分比",
    color1: "颜色 1", color2: "颜色 2",
    contrastRatioLabel: "对比度",
    aaNormalText: "AA 正常文本", aaLargeText: "AA 大号文本",
    aaaNormalText: "AAA 正常文本", aaaLargeText: "AAA 大号文本",
    gradientTypeLabel: "类型", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop 转换工具 — 免费在线转换",
    siteDescription:
      "转换单位、颜色、数据格式、日期等。免费、快速，所有操作在浏览器内完成。",
    toolTitleSuffix: "| ToolPop 转换工具",
  },
  blog: {
    title: "博客",
    description:
      "关于单位转换、数据格式等方面的技巧、指南和知识。",
    readMore: "阅读更多",
    backToBlog: "返回博客",
    publishedOn: "发布于",
    categoryGuide: "指南",
    categoryTips: "技巧",
    categoryKnowledge: "知识",
  },
  cookie: {
    message:
      "我们使用 Cookie 来改善您的体验。继续使用即表示您同意我们的 Cookie 政策。",
    accept: "接受",
    decline: "拒绝",
  },
  unitLabels: {
    length: {
      m: "米 (m)", km: "千米 (km)", cm: "厘米 (cm)", mm: "毫米 (mm)",
      mi: "英里 (mi)", yd: "码 (yd)", ft: "英尺 (ft)", in: "英寸 (in)",
      nm: "海里 (nm)", "\u03BCm": "微米 (\u03BCm)",
    },
    weight: {
      kg: "千克 (kg)", g: "克 (g)", mg: "毫克 (mg)", lb: "磅 (lb)",
      oz: "盎司 (oz)", ton: "公吨 (t)", st: "英石 (st)", ct: "克拉 (ct)",
    },
    temperature: { C: "摄氏 (\u00B0C)", F: "华氏 (\u00B0F)", K: "开尔文 (K)" },
    area: {
      "m\u00B2": "平方米 (m\u00B2)", "km\u00B2": "平方千米 (km\u00B2)",
      ha: "公顷 (ha)", acre: "英亩", "ft\u00B2": "平方英尺 (ft\u00B2)",
      "mi\u00B2": "平方英里 (mi\u00B2)", "yd\u00B2": "平方码 (yd\u00B2)",
      "cm\u00B2": "平方厘米 (cm\u00B2)",
    },
    volume: {
      L: "升 (L)", mL: "毫升 (mL)", gal: "美制加仑 (gal)",
      "fl oz": "美制液量盎司 (fl oz)", cup: "美制杯", pt: "美制品脱 (pt)",
      qt: "美制夸脱 (qt)", "m\u00B3": "立方米 (m\u00B3)",
      "cm\u00B3": "立方厘米 (cm\u00B3)", tbsp: "汤匙 (tbsp)", tsp: "茶匙 (tsp)",
    },
    speed: {
      "m/s": "米/秒 (m/s)", "km/h": "千米/时 (km/h)", mph: "英里/时 (mph)",
      kn: "节 (kn)", "ft/s": "英尺/秒 (ft/s)", mach: "马赫",
    },
    time: {
      ms: "毫秒 (ms)", s: "秒 (s)", min: "分钟 (min)", h: "小时 (h)",
      d: "天 (d)", wk: "周 (wk)", mo: "月 (mo)", yr: "年 (yr)",
    },
    pressure: {
      Pa: "帕斯卡 (Pa)", kPa: "千帕 (kPa)", bar: "巴", psi: "PSI",
      atm: "标准大气压 (atm)", torr: "托", mmHg: "mmHg",
    },
    energy: {
      J: "焦耳 (J)", kJ: "千焦 (kJ)", cal: "卡路里 (cal)", kcal: "千卡 (kcal)",
      Wh: "瓦时 (Wh)", kWh: "千瓦时 (kWh)", BTU: "BTU", eV: "电子伏特 (eV)",
    },
    power: {
      W: "瓦特 (W)", kW: "千瓦 (kW)", MW: "兆瓦 (MW)", hp: "马力 (hp)",
      "BTU/h": "BTU/时", "cal/s": "卡路里/秒",
    },
    frequency: {
      Hz: "赫兹 (Hz)", kHz: "千赫 (kHz)", MHz: "兆赫 (MHz)",
      GHz: "吉赫 (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "度 (\u00B0)", rad: "弧度 (rad)", grad: "百分度 (grad)",
      turn: "圈", arcmin: "角分 (\u2032)", arcsec: "角秒 (\u2033)",
    },
    "data-storage": {
      B: "字节 (B)", KB: "千字节 (KB)", MB: "兆字节 (MB)", GB: "吉字节 (GB)",
      TB: "太字节 (TB)", PB: "拍字节 (PB)", bit: "比特",
      Kbit: "千比特", Mbit: "兆比特", Gbit: "吉比特",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "杯", tbsp: "汤匙", tsp: "茶匙", mL: "毫升 (mL)",
      L: "升 (L)", fl_oz: "液量盎司", g: "克 (g)", kg: "千克 (kg)",
      oz: "盎司 (oz)", lb: "磅 (lb)",
    },
    "oven-temperature": { C: "摄氏 (\u00B0C)", F: "华氏 (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "像素 (px)", rem: "Root Em (rem)" },
    "px-em": { px: "像素 (px)", em: "Em (em)" },
    "px-percent": { px: "像素 (px)", "%": "百分比 (%)" },
    "css-unit": {
      px: "像素 (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "百分比 (%)", vw: "视口宽度 (vw)", vh: "视口高度 (vh)",
    },
  },
};

export default dict;
