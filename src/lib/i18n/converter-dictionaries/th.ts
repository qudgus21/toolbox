import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "เครื่องมือแปลงหน่วยครบทุกอย่างที่คุณต้องการ",
    titleAccent: "แปลงหน่วย",
    description:
      "แปลงหน่วย สี รูปแบบข้อมูล วันที่ และอื่นๆ ทั้งหมดประมวลผลในเบราว์เซอร์",
    tabAll: "ทั้งหมด",
    categoryUnit: "หน่วย",
    categoryNumber: "ตัวเลข",
    categoryColor: "สี",
    categoryDatetime: "วันที่/เวลา",
    categoryData: "ข้อมูล",
    categoryCss: "CSS",
    categoryCooking: "ทำอาหาร",
    categoryGeography: "ภูมิศาสตร์",
    searchPlaceholder: "ค้นหาตัวแปลง...",
    noResults: "ไม่พบตัวแปลง",
    recentTools: "ใช้ล่าสุด",
    favorites: "รายการโปรด",
    favDragHint: "ลากเพื่อจัดลำดับใหม่",
    favHint: "คลิกดาวเพื่อเพิ่มรายการโปรด",
    gridView: "แบบตาราง",
    listView: "แบบรายการ",
  },
  trust: {
    encryption: "ประมวลผลอย่างปลอดภัย",
    encryptionDesc: "ทุกการแปลงทำงานบนเบราว์เซอร์ของคุณเอง",
    autoDelete: "ไม่เก็บข้อมูล",
    autoDeleteDesc: "ข้อมูลที่ป้อนจะไม่ถูกบันทึกหรือส่งไปยังเซิร์ฟเวอร์",
    free: "ฟรี 100%",
    freeDesc: "ไม่จำกัด ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่ายแฝง",
    browserProcessing: "ผลลัพธ์ทันที",
    browserProcessingDesc: "แปลงแบบเรียลไทม์ขณะที่คุณพิมพ์",
  },
  tools: {
    length: {
      title: "แปลงความยาว",
      description:
        "แปลงหน่วยระหว่างเมตร กิโลเมตร ไมล์ ฟุต นิ้ว และอื่นๆ",
    },
    weight: {
      title: "แปลงน้ำหนัก",
      description:
        "แปลงหน่วยระหว่างกิโลกรัม ปอนด์ ออนซ์ ตัน และอื่นๆ",
    },
    temperature: {
      title: "แปลงอุณหภูมิ",
      description: "แปลงหน่วยระหว่าง Celsius, Fahrenheit และ Kelvin",
    },
    area: {
      title: "แปลงพื้นที่",
      description:
        "แปลงหน่วยระหว่างตารางเมตร เฮกตาร์ เอเคอร์ ตารางฟุต และอื่นๆ",
    },
    volume: {
      title: "แปลงปริมาตร",
      description:
        "แปลงหน่วยระหว่างลิตร แกลลอน ถ้วย ออนซ์ของเหลว และอื่นๆ",
    },
    speed: {
      title: "แปลงความเร็ว",
      description: "แปลงหน่วยระหว่าง m/s, km/h, mph, นอต และอื่นๆ",
    },
    time: {
      title: "แปลงเวลา",
      description:
        "แปลงหน่วยระหว่างวินาที นาที ชั่วโมง วัน สัปดาห์ และอื่นๆ",
    },
    pressure: {
      title: "แปลงความดัน",
      description:
        "แปลงหน่วยระหว่าง Pascal, bar, PSI, atmosphere และอื่นๆ",
    },
    energy: {
      title: "แปลงพลังงาน",
      description:
        "แปลงหน่วยระหว่างจูล แคลอรี่ กิโลวัตต์-ชั่วโมง BTU และอื่นๆ",
    },
    power: {
      title: "แปลงกำลัง",
      description:
        "แปลงหน่วยระหว่างวัตต์ กิโลวัตต์ แรงม้า และอื่นๆ",
    },
    frequency: {
      title: "แปลงความถี่",
      description:
        "แปลงหน่วยระหว่างเฮิรตซ์ กิโลเฮิรตซ์ เมกะเฮิรตซ์ กิกะเฮิรตซ์ และ RPM",
    },
    angle: {
      title: "แปลงมุม",
      description: "แปลงหน่วยระหว่างองศา เรเดียน เกรเดียน และรอบ",
    },
    "data-storage": {
      title: "แปลงขนาดข้อมูล",
      description:
        "แปลงหน่วยระหว่างไบต์ กิโลไบต์ เมกะไบต์ กิกะไบต์ และอื่นๆ",
    },
    "fuel-economy": {
      title: "แปลงอัตราสิ้นเปลืองน้ำมัน",
      description: "แปลงหน่วยระหว่าง km/L, mpg และ L/100km",
    },
    "number-base": {
      title: "แปลงฐานเลข",
      description:
        "แปลงระหว่างเลขฐานสอง ฐานแปด ฐานสิบ ฐานสิบหก และฐานอื่นๆ",
    },
    "roman-numeral": {
      title: "แปลงเลขโรมัน",
      description: "แปลงระหว่างเลขโรมันและเลขอารบิก",
    },
    "scientific-notation": {
      title: "สัญกรณ์วิทยาศาสตร์",
      description:
        "แปลงระหว่างสัญกรณ์วิทยาศาสตร์และตัวเลขมาตรฐาน",
    },
    "fraction-decimal": {
      title: "เศษส่วน ↔ ทศนิยม",
      description: "แปลงระหว่างเศษส่วนและทศนิยม",
    },
    percentage: {
      title: "แปลงเปอร์เซ็นต์",
      description:
        "แปลงระหว่างเศษส่วน ทศนิยม และเปอร์เซ็นต์",
    },
    "color-converter": {
      title: "แปลงสี",
      description:
        "แปลงระหว่างรูปแบบสี HEX, RGB, HSL, HSV และ CMYK",
    },
    "color-palette-generator": {
      title: "สร้างจานสี",
      description:
        "สร้างจานสีแบบเสริม สามเส้า และคล้ายคลึง",
    },
    "gradient-generator": {
      title: "สร้าง CSS Gradient",
      description:
        "สร้าง CSS gradient แบบเชิงเส้น รัศมี และโคนิคพร้อมตัวอย่างสด",
    },
    "color-contrast-checker": {
      title: "ตรวจสอบคอนทราสต์สี",
      description:
        "ตรวจสอบอัตราส่วนคอนทราสต์ WCAG AA/AAA ระหว่างสองสี",
    },
    "color-blindness-simulator": {
      title: "จำลองตาบอดสี",
      description:
        "จำลองการมองเห็นสีของผู้ที่มีภาวะบกพร่องทางสี",
    },
    timezone: {
      title: "แปลงเขตเวลา",
      description:
        "แปลงเวลาระหว่างเขตเวลาต่างๆ ทั่วโลก",
    },
    "unix-timestamp": {
      title: "แปลง Unix Timestamp",
      description:
        "แปลงระหว่าง Unix timestamp และวันที่ที่อ่านได้",
    },
    "date-format": {
      title: "แปลงรูปแบบวันที่",
      description:
        "แปลงวันที่ระหว่างรูปแบบ ISO, US, EU และอื่นๆ",
    },
    "date-calculator": {
      title: "คำนวณวันที่",
      description:
        "คำนวณช่วงห่างระหว่างวันที่ หรือบวก/ลบวัน",
    },
    "age-calculator": {
      title: "คำนวณอายุ",
      description:
        "คำนวณอายุจากวันเกิดเป็นปี เดือน และวัน",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "แปลงระหว่างรูปแบบข้อมูล JSON และ YAML",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "แปลงระหว่าง JSON array และรูปแบบสเปรดชีต CSV",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "แปลงระหว่างรูปแบบข้อมูล JSON และ XML",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "แปลงระหว่างรูปแบบคอนฟิก JSON และ TOML",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "แปลงระหว่าง Markdown และ HTML",
    },
    "csv-table": {
      title: "CSV เป็นตาราง",
      description: "แปลงข้อมูล CSV เป็นตาราง Markdown หรือ HTML",
    },
    "json-typescript": {
      title: "JSON เป็น TypeScript",
      description: "สร้าง TypeScript interface จากข้อมูล JSON",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "แปลงระหว่างคำสั่ง SQL INSERT และข้อมูล JSON",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "แปลงระหว่างพิกเซลและ rem พร้อมกำหนดขนาดฐานเอง",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "แปลงระหว่างพิกเซลและ em พร้อมกำหนดขนาดพาเรนต์เอง",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "แปลงระหว่างพิกเซลและเปอร์เซ็นต์พร้อมกำหนดความกว้างคอนเทนเนอร์เอง",
    },
    "css-unit": {
      title: "แปลงหน่วย CSS",
      description:
        "แปลงระหว่าง px, rem, em, %, vw, vh และหน่วย CSS อื่นๆ",
    },
    "css-minifier": {
      title: "ย่อ / จัดรูปแบบ CSS",
      description:
        "ย่อหรือจัดรูปแบบโค้ด CSS สำหรับ production หรือให้อ่านง่าย",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "แปลงระหว่างคลาส Tailwind CSS และ CSS ธรรมดา",
    },
    "cooking-measurement": {
      title: "แปลงหน่วยทำอาหาร",
      description:
        "แปลงระหว่างถ้วย ช้อนโต๊ะ ช้อนชา มิลลิลิตร และกรัม",
    },
    "recipe-scaler": {
      title: "ปรับสูตรอาหาร",
      description:
        "ปรับปริมาณส่วนผสมตามจำนวนที่เสิร์ฟ",
    },
    "oven-temperature": {
      title: "แปลงอุณหภูมิเตาอบ",
      description:
        "แปลงอุณหภูมิเตาอบระหว่าง Celsius, Fahrenheit และ Gas Mark",
    },
    coordinate: {
      title: "แปลงพิกัด",
      description:
        "แปลงระหว่างรูปแบบพิกัด DMS, DD และ DDM",
    },
    "distance-calculator": {
      title: "คำนวณระยะทาง",
      description:
        "คำนวณระยะทางระหว่างพิกัดภูมิศาสตร์สองจุด",
    },
  },
  nav: {
    allTools: "ตัวแปลงทั้งหมด",
    language: "ภาษา",
  },
  footer: {
    tools: "ตัวแปลง",
    legal: "กฎหมาย",
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "ข้อกำหนดการใช้งาน",
    copyright: "ToolPop. สงวนลิขสิทธิ์ทั้งหมด",
    company: "บริษัท",
    about: "เกี่ยวกับ",
    contact: "ติดต่อ",
    faq: "FAQ",
  },
  common: {
    backToAll: "ตัวแปลงทั้งหมด",
    inputPlaceholder: "ป้อนค่าที่ต้องการแปลง...",
    outputLabel: "ผลลัพธ์",
    copyToClipboard: "คัดลอก",
    copied: "คัดลอกแล้ว!",
    clear: "ล้าง",
    paste: "วาง",
    processing: "กำลังแปลง...",
    startOver: "เริ่มใหม่",
    process: "แปลง",
    tryAgain: "ลองอีกครั้ง",
    notImplemented: "ตัวแปลงนี้กำลังจะมาเร็วๆ นี้",
    tryOtherTools: "ลองตัวแปลงอื่น",
    privacyBadge: "ทุกการแปลงทำงานบนเบราว์เซอร์ของคุณ",
    favoriteAdded: "เพิ่มในรายการโปรดแล้ว",
    favoriteRemoved: "ลบออกจากรายการโปรดแล้ว",
    comingSoon: "เร็วๆ นี้",
    share: "แชร์",
    shareTitle: "แชร์ตัวแปลงนี้",
    shareSubtitle: "แชร์ตัวแปลงที่มีประโยชน์นี้กับคนอื่น",
    shareCopied: "คัดลอกลิงก์แล้ว!",
    shareCopyLink: "คัดลอกลิงก์",
    downloadAsFile: "ดาวน์โหลด",
    options: "ตัวเลือก",
    input: "อินพุต",
    output: "เอาต์พุต",
    convert: "แปลง",
    swap: "สลับ",
    from: "จาก",
    to: "เป็น",
    result: "ผลลัพธ์",
    allConversions: "การแปลงทั้งหมด",
    details: "รายละเอียด",
    pageNotFound: "ไม่พบตัวแปลง",
    goHome: "กลับไปตัวแปลงทั้งหมด",
  },
  toolOptions: {
    fromUnit: "จาก",
    toUnit: "เป็น",
    precision: "ทศนิยม",
    baseSize: "ขนาดฟอนต์ฐาน (px)",
    parentSize: "ขนาดฟอนต์พาเรนต์ (px)",
    containerWidth: "ความกว้างคอนเทนเนอร์ (px)",
    viewportWidth: "ความกว้างวิวพอร์ต (px)",
    viewportHeight: "ความสูงวิวพอร์ต (px)",
    direction: "ทิศทาง",
    mode: "โหมด",
    ingredient: "วัตถุดิบ",
    water: "น้ำ",
    flour: "แป้ง",
    sugar: "น้ำตาล",
    butter: "เนย",
    rice: "ข้าว",
    milk: "นม",
    originalServings: "จำนวนที่เสิร์ฟเดิม",
    targetServings: "จำนวนที่เสิร์ฟต้องการ",
    fromTimezone: "จากเขตเวลา",
    toTimezone: "เป็นเขตเวลา",
    inputFormat: "รูปแบบอินพุต",
    outputFormat: "รูปแบบเอาต์พุต",
    harmony: "การผสมสี",
    complementary: "เสริม",
    triadic: "สามเส้า",
    analogous: "คล้ายคลึง",
    splitComplementary: "เสริมแยก",
    tetradic: "สี่เส้า",
    gradientType: "ประเภท gradient",
    linear: "เชิงเส้น",
    radial: "รัศมี",
    conic: "โคนิค",
    gradientAngle: "มุม (deg)",
    rootName: "ชื่อ interface หลัก",
    tableName: "ชื่อตาราง",
    minify: "ย่อ",
    beautify: "จัดรูปแบบ",
    colorType: "ประเภทความบกพร่อง",
    protanopia: "Protanopia (ไม่เห็นแดง)",
    deuteranopia: "Deuteranopia (ไม่เห็นเขียว)",
    tritanopia: "Tritanopia (ไม่เห็นน้ำเงิน)",
    achromatopsia: "Achromatopsia (ไม่เห็นสี)",
    operation: "การคำนวณ",
    difference: "ผลต่าง",
    add: "บวก",
    subtract: "ลบ",
    amount: "จำนวน",
    unit: "หน่วย",
    days: "วัน",
    weeks: "สัปดาห์",
    months: "เดือน",
    years: "ปี",
    fromBase: "จากฐาน",
    toBase: "เป็นฐาน",
    binary: "ฐานสอง (2)",
    octal: "ฐานแปด (8)",
    decimal: "ฐานสิบ (10)",
    hexadecimal: "ฐานสิบหก (16)",
    seconds: "วินาที",
    milliseconds: "มิลลิวินาที",
    autoDetect: "ตรวจจับอัตโนมัติ",
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
    markdown: "ตาราง Markdown",
    html: "ตาราง HTML",
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
    toRoman: "ตัวเลข → โรมัน",
    toArabic: "โรมัน → ตัวเลข",
    toScientific: "มาตรฐาน → วิทยาศาสตร์",
    toStandard: "วิทยาศาสตร์ → มาตรฐาน",
    toFraction: "ทศนิยม → เศษส่วน",
    toDecimal: "เศษส่วน → ทศนิยม",
    decimalToPercent: "ทศนิยม → เปอร์เซ็นต์",
    percentToDecimal: "เปอร์เซ็นต์ → ทศนิยม",
    fractionToPercent: "เศษส่วน → เปอร์เซ็นต์",
    dd: "องศาทศนิยม (DD)",
    dms: "องศา ลิปดา พิลิปดา (DMS)",
    ddm: "องศา ลิปดาทศนิยม (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "รูปแบบเต็ม",
    short: "รูปแบบย่อ",
    relative: "สัมพัทธ์",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "สีพื้นหลัง",
    monochromatic: "โมโนโครม",
    timestampToDate: "Timestamp → วันที่",
    dateToTimestamp: "วันที่ → Timestamp",
    showDetails: "แสดงรายละเอียดเพิ่มเติม",
    addDays: "เพิ่มวัน",
    subtractDays: "ลบวัน",
    datetimeHint: "เช่น 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "บรรทัด",
    characters: "อักขระ",
    rows: "แถว",
    columns: "คอลัมน์",
    elements: "องค์ประกอบ",
    keys: "คีย์",
    interfaces: "อินเทอร์เฟซ",
    properties: "คุณสมบัติ",
    originalSize: "ขนาดเดิม",
    resultSize: "ขนาดผลลัพธ์",
    savings: "ประหยัด",
    ingredients: "วัตถุดิบ",
    scaleFactor: "ตัวคูณ",
    contrastRatio: "อัตราส่วนคอนทราสต์",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "ละติจูด",
    longitude: "ลองจิจูด",
    distanceKm: "ระยะทาง (km)",
    distanceMi: "ระยะทาง (mi)",
    years: "ปี",
    months: "เดือน",
    days: "วัน",
  },
  processorMessages: {
    invalidTimezone: "เขตเวลาไม่ถูกต้อง",
    pass: "ผ่าน", fail: "ไม่ผ่าน",
    fromNow: "นับจากนี้", ago: "ที่แล้ว",
    today: "วันนี้", tomorrow: "พรุ่งนี้", yesterday: "เมื่อวาน",
    seconds: "วินาที", secondsPlural: "วินาที",
    minutes: "นาที", minutesPlural: "นาที",
    hours: "ชั่วโมง", hoursPlural: "ชั่วโมง",
    daysUnit: "วัน", daysPlural: "วัน",
    weeksUnit: "สัปดาห์", weeksPlural: "สัปดาห์",
    monthsUnit: "เดือน", monthsPlural: "เดือน",
    yearsUnit: "ปี", yearsPlural: "ปี",
    gasmark: "Gas Mark",
    veryCool: "เย็นมาก", cool: "เย็น", moderatelyCool: "ค่อนข้างเย็น",
    moderate: "ปานกลาง", moderatelyHot: "ค่อนข้างร้อน",
    hot: "ร้อน", veryHot: "ร้อนมาก", extremelyHot: "ร้อนจัด",
    original: "ต้นฉบับ",
    from: "จาก", to: "เป็น",
    totalDays: "จำนวนวันทั้งหมด", weeksDays: "สัปดาห์ + วัน",
    originalDate: "วันที่ต้นฉบับ", operationLabel: "การคำนวณ",
    resultDate: "วันที่ผลลัพธ์", dayOfWeek: "วันในสัปดาห์",
    daysBetween: "จำนวนวันระหว่าง",
    age: "อายุ", totalMonths: "จำนวนเดือนทั้งหมด",
    totalHours: "จำนวนชั่วโมงทั้งหมด", totalMinutes: "จำนวนนาทีทั้งหมด",
    nextBirthday: "วันเกิดถัดไป",
    roman: "โรมัน", arabic: "อารบิก",
    scientific: "สัญกรณ์วิทยาศาสตร์", standard: "มาตรฐาน", engineering: "วิศวกรรม",
    fraction: "เศษส่วน", simplified: "ลดรูปแล้ว", percentage: "เปอร์เซ็นต์",
    color1: "สี 1", color2: "สี 2",
    contrastRatioLabel: "อัตราส่วนคอนทราสต์",
    aaNormalText: "AA ข้อความปกติ", aaLargeText: "AA ข้อความขนาดใหญ่",
    aaaNormalText: "AAA ข้อความปกติ", aaaLargeText: "AAA ข้อความขนาดใหญ่",
    gradientTypeLabel: "ประเภท", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — ตัวแปลงออนไลน์ฟรี",
    siteDescription:
      "แปลงหน่วย สี รูปแบบข้อมูล วันที่ และอื่นๆ ฟรี รวดเร็ว และปลอดภัย — ทุกอย่างทำงานบนเบราว์เซอร์",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "บล็อก",
    description:
      "เคล็ดลับ คู่มือ และความรู้เกี่ยวกับการแปลงหน่วย รูปแบบข้อมูล และอื่นๆ",
    readMore: "อ่านเพิ่มเติม",
    backToBlog: "กลับไปบล็อก",
    publishedOn: "เผยแพร่เมื่อ",
    categoryGuide: "คู่มือ",
    categoryTips: "เคล็ดลับ",
    categoryKnowledge: "ความรู้",
  },
  cookie: {
    message:
      "เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ การใช้งานต่อถือว่าคุณยอมรับนโยบายคุกกี้ของเรา",
    accept: "ยอมรับ",
    decline: "ปฏิเสธ",
  },
  unitLabels: {
    length: {
      m: "เมตร (m)", km: "กิโลเมตร (km)", cm: "เซนติเมตร (cm)", mm: "มิลลิเมตร (mm)",
      mi: "ไมล์ (mi)", yd: "หลา (yd)", ft: "ฟุต (ft)", in: "นิ้ว (in)",
      nm: "ไมล์ทะเล (nm)", "\u03BCm": "ไมโครเมตร (\u03BCm)",
    },
    weight: {
      kg: "กิโลกรัม (kg)", g: "กรัม (g)", mg: "มิลลิกรัม (mg)", lb: "ปอนด์ (lb)",
      oz: "ออนซ์ (oz)", ton: "ตัน (t)", st: "สโตน (st)", ct: "กะรัต (ct)",
    },
    temperature: { C: "เซลเซียส (\u00B0C)", F: "ฟาเรนไฮต์ (\u00B0F)", K: "เคลวิน (K)" },
    area: {
      "m\u00B2": "ตารางเมตร (m\u00B2)", "km\u00B2": "ตารางกิโลเมตร (km\u00B2)",
      ha: "เฮกตาร์ (ha)", acre: "เอเคอร์", "ft\u00B2": "ตารางฟุต (ft\u00B2)",
      "mi\u00B2": "ตารางไมล์ (mi\u00B2)", "yd\u00B2": "ตารางหลา (yd\u00B2)",
      "cm\u00B2": "ตารางเซนติเมตร (cm\u00B2)",
    },
    volume: {
      L: "ลิตร (L)", mL: "มิลลิลิตร (mL)", gal: "แกลลอน (gal)",
      "fl oz": "ออนซ์ของเหลว (fl oz)", cup: "ถ้วย", pt: "ไพนต์ (pt)",
      qt: "ควอร์ต (qt)", "m\u00B3": "ลูกบาศก์เมตร (m\u00B3)",
      "cm\u00B3": "ลูกบาศก์เซนติเมตร (cm\u00B3)", tbsp: "ช้อนโต๊ะ (tbsp)", tsp: "ช้อนชา (tsp)",
    },
    speed: {
      "m/s": "เมตร/วินาที (m/s)", "km/h": "กิโลเมตร/ชั่วโมง (km/h)", mph: "ไมล์/ชั่วโมง (mph)",
      kn: "นอต (kn)", "ft/s": "ฟุต/วินาที (ft/s)", mach: "มัค",
    },
    time: {
      ms: "มิลลิวินาที (ms)", s: "วินาที (s)", min: "นาที (min)", h: "ชั่วโมง (h)",
      d: "วัน (d)", wk: "สัปดาห์ (wk)", mo: "เดือน (mo)", yr: "ปี (yr)",
    },
    pressure: {
      Pa: "ปาสคาล (Pa)", kPa: "กิโลปาสคาล (kPa)", bar: "บาร์", psi: "PSI",
      atm: "บรรยากาศ (atm)", torr: "ทอร์", mmHg: "mmHg",
    },
    energy: {
      J: "จูล (J)", kJ: "กิโลจูล (kJ)", cal: "แคลอรี่ (cal)", kcal: "กิโลแคลอรี่ (kcal)",
      Wh: "วัตต์-ชั่วโมง (Wh)", kWh: "กิโลวัตต์-ชั่วโมง (kWh)", BTU: "BTU", eV: "อิเล็กตรอนโวลต์ (eV)",
    },
    power: {
      W: "วัตต์ (W)", kW: "กิโลวัตต์ (kW)", MW: "เมกะวัตต์ (MW)", hp: "แรงม้า (hp)",
      "BTU/h": "BTU/ชม.", "cal/s": "แคลอรี่/วินาที",
    },
    frequency: {
      Hz: "เฮิรตซ์ (Hz)", kHz: "กิโลเฮิรตซ์ (kHz)", MHz: "เมกะเฮิรตซ์ (MHz)",
      GHz: "กิกะเฮิรตซ์ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "องศา (\u00B0)", rad: "เรเดียน (rad)", grad: "เกรเดียน (grad)",
      turn: "รอบ", arcmin: "ลิปดา (\u2032)", arcsec: "พิลิปดา (\u2033)",
    },
    "data-storage": {
      B: "ไบต์ (B)", KB: "กิโลไบต์ (KB)", MB: "เมกะไบต์ (MB)", GB: "กิกะไบต์ (GB)",
      TB: "เทราไบต์ (TB)", PB: "เพตะไบต์ (PB)", bit: "บิต",
      Kbit: "กิโลบิต", Mbit: "เมกะบิต", Gbit: "กิกะบิต",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "ถ้วย", tbsp: "ช้อนโต๊ะ", tsp: "ช้อนชา", mL: "มิลลิลิตร (mL)",
      L: "ลิตร (L)", fl_oz: "ออนซ์ของเหลว", g: "กรัม (g)", kg: "กิโลกรัม (kg)",
      oz: "ออนซ์ (oz)", lb: "ปอนด์ (lb)",
    },
    "oven-temperature": { C: "เซลเซียส (\u00B0C)", F: "ฟาเรนไฮต์ (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "พิกเซล (px)", rem: "Root Em (rem)" },
    "px-em": { px: "พิกเซล (px)", em: "Em (em)" },
    "px-percent": { px: "พิกเซล (px)", "%": "เปอร์เซ็นต์ (%)" },
    "css-unit": {
      px: "พิกเซล (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "เปอร์เซ็นต์ (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
