import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Semua alat penukaran yang anda perlukan",
    titleAccent: "penukaran",
    description:
      "Tukar unit, warna, format data, tarikh dan lagi. Semuanya diproses dalam pelayar anda.",
    tabAll: "Semua",
    categoryUnit: "Unit",
    categoryNumber: "Nombor",
    categoryColor: "Warna",
    categoryDatetime: "Tarikh/Masa",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Masakan",
    categoryGeography: "Geografi",
    searchPlaceholder: "Cari penukar...",
    noResults: "Tiada penukar ditemui.",
    recentTools: "Baru Digunakan",
    favorites: "Kegemaran",
    favDragHint: "Seret untuk susun semula",
    favHint: "Klik bintang untuk tambah kegemaran",
    gridView: "Paparan grid",
    listView: "Paparan senarai",
  },
  trust: {
    encryption: "Pemprosesan Selamat",
    encryptionDesc: "Semua penukaran berlaku secara tempatan dalam pelayar anda",
    autoDelete: "Tiada Data Disimpan",
    autoDeleteDesc: "Input anda tidak pernah disimpan atau dihantar ke pelayan",
    free: "100% Percuma",
    freeDesc: "Tiada had, tiada pendaftaran, tiada caj tersembunyi",
    browserProcessing: "Keputusan Serta-merta",
    browserProcessingDesc: "Penukaran masa nyata semasa anda menaip",
  },
  tools: {
    length: {
      title: "Penukar Panjang",
      description:
        "Tukar antara meter, kilometer, batu, kaki, inci dan banyak lagi.",
    },
    weight: {
      title: "Penukar Berat",
      description:
        "Tukar antara kilogram, paun, auns, tan dan banyak lagi.",
    },
    temperature: {
      title: "Penukar Suhu",
      description: "Tukar antara Celsius, Fahrenheit dan Kelvin.",
    },
    area: {
      title: "Penukar Luas",
      description:
        "Tukar antara meter persegi, hektar, ekar, kaki persegi dan banyak lagi.",
    },
    volume: {
      title: "Penukar Isipadu",
      description:
        "Tukar antara liter, gelen, cawan, auns cecair dan banyak lagi.",
    },
    speed: {
      title: "Penukar Kelajuan",
      description: "Tukar antara m/s, km/j, mph, knot dan banyak lagi.",
    },
    time: {
      title: "Penukar Masa",
      description:
        "Tukar antara saat, minit, jam, hari, minggu dan banyak lagi.",
    },
    pressure: {
      title: "Penukar Tekanan",
      description:
        "Tukar antara Pascal, bar, PSI, atmosfera dan banyak lagi.",
    },
    energy: {
      title: "Penukar Tenaga",
      description:
        "Tukar antara joule, kalori, kilowatt-jam, BTU dan banyak lagi.",
    },
    power: {
      title: "Penukar Kuasa",
      description:
        "Tukar antara watt, kilowatt, kuasa kuda dan banyak lagi.",
    },
    frequency: {
      title: "Penukar Frekuensi",
      description:
        "Tukar antara hertz, kilohertz, megahertz, gigahertz dan RPM.",
    },
    angle: {
      title: "Penukar Sudut",
      description: "Tukar antara darjah, radian, gradian dan pusingan.",
    },
    "data-storage": {
      title: "Penukar Storan Data",
      description:
        "Tukar antara bait, kilobait, megabait, gigabait dan banyak lagi.",
    },
    "fuel-economy": {
      title: "Penukar Ekonomi Bahan Api",
      description: "Tukar antara km/L, mpg dan L/100km.",
    },
    "number-base": {
      title: "Penukar Asas Nombor",
      description:
        "Tukar antara perduaan, perlapanan, perpuluhan, perenambelasan dan asas tersuai.",
    },
    "roman-numeral": {
      title: "Penukar Angka Roman",
      description: "Tukar antara angka Roman dan nombor Arab.",
    },
    "scientific-notation": {
      title: "Penukar Tatatanda Saintifik",
      description:
        "Tukar antara tatatanda saintifik dan nombor standard.",
    },
    "fraction-decimal": {
      title: "Pecahan ↔ Perpuluhan",
      description: "Tukar antara pecahan dan nombor perpuluhan.",
    },
    percentage: {
      title: "Penukar Peratusan",
      description:
        "Tukar antara pecahan, perpuluhan dan peratusan.",
    },
    "color-converter": {
      title: "Penukar Warna",
      description:
        "Tukar antara format warna HEX, RGB, HSL, HSV dan CMYK.",
    },
    "color-palette-generator": {
      title: "Penjana Palet Warna",
      description:
        "Jana palet warna pelengkap, triadik dan analog.",
    },
    "gradient-generator": {
      title: "Penjana Gradien CSS",
      description:
        "Cipta gradien CSS linear, radial dan konik dengan pratonton langsung.",
    },
    "color-contrast-checker": {
      title: "Pemeriksa Kontras Warna",
      description:
        "Semak nisbah kontras warna WCAG AA/AAA antara dua warna.",
    },
    "color-blindness-simulator": {
      title: "Simulator Buta Warna",
      description:
        "Simulasi bagaimana warna kelihatan kepada mereka yang mempunyai kekurangan penglihatan warna.",
    },
    timezone: {
      title: "Penukar Zon Waktu",
      description:
        "Tukar masa antara zon waktu berbeza di seluruh dunia.",
    },
    "unix-timestamp": {
      title: "Penukar Cap Masa Unix",
      description:
        "Tukar antara cap masa Unix dan tarikh yang boleh dibaca.",
    },
    "date-format": {
      title: "Penukar Format Tarikh",
      description:
        "Tukar tarikh antara format berbeza (ISO, AS, EU dan banyak lagi).",
    },
    "date-calculator": {
      title: "Kalkulator Tarikh",
      description:
        "Kira perbezaan antara tarikh atau tambah/tolak hari.",
    },
    "age-calculator": {
      title: "Kalkulator Umur",
      description:
        "Kira umur tepat dari tarikh lahir dalam tahun, bulan dan hari.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Tukar antara format data JSON dan YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Tukar antara tatasusunan JSON dan format hamparan CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Tukar antara format data JSON dan XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Tukar antara format konfigurasi JSON dan TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Tukar antara penanda Markdown dan HTML.",
    },
    "csv-table": {
      title: "CSV ke Jadual",
      description: "Tukar data CSV kepada jadual Markdown atau HTML.",
    },
    "json-typescript": {
      title: "JSON ke TypeScript",
      description: "Jana antara muka TypeScript daripada data JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Tukar antara pernyataan SQL INSERT dan data JSON.",
    },
    "px-rem": {
      title: "px ↔ rem Penukar",
      description:
        "Tukar antara piksel dan unit rem dengan saiz asas tersuai.",
    },
    "px-em": {
      title: "px ↔ em Penukar",
      description:
        "Tukar antara piksel dan unit em dengan saiz induk tersuai.",
    },
    "px-percent": {
      title: "px ↔ % Penukar",
      description:
        "Tukar antara piksel dan peratusan dengan lebar bekas tersuai.",
    },
    "css-unit": {
      title: "Penukar Unit CSS",
      description:
        "Tukar antara px, rem, em, %, vw, vh dan unit CSS lain.",
    },
    "css-minifier": {
      title: "Peminifikasi / Pencantik CSS",
      description:
        "Kecilkan atau cantikkan kod CSS untuk pengeluaran atau kebolehbacaan.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tukar antara kelas Tailwind CSS dan CSS biasa.",
    },
    "cooking-measurement": {
      title: "Penukar Sukatan Masakan",
      description:
        "Tukar antara cawan, sudu besar, sudu kecil, mililiter dan gram.",
    },
    "recipe-scaler": {
      title: "Penskala Resipi",
      description:
        "Skala bahan resipi naik atau turun mengikut saiz hidangan.",
    },
    "oven-temperature": {
      title: "Penukar Suhu Ketuhar",
      description:
        "Tukar antara Celsius, Fahrenheit dan Gas Mark untuk suhu ketuhar.",
    },
    coordinate: {
      title: "Penukar Koordinat",
      description:
        "Tukar antara format koordinat DMS, DD dan DDM.",
    },
    "distance-calculator": {
      title: "Kalkulator Jarak",
      description:
        "Kira jarak antara dua koordinat geografi.",
    },
  },
  nav: {
    allTools: "Semua Alat Penukar",
    language: "Bahasa",
  },
  footer: {
    tools: "Penukar",
    legal: "Undang-undang",
    privacy: "Dasar Privasi",
    terms: "Syarat Perkhidmatan",
    copyright: "ToolPop. Hak cipta terpelihara.",
    company: "Syarikat",
    about: "Perihal",
    contact: "Hubungi",
    faq: "Soalan Lazim",
  },
  common: {
    backToAll: "Semua Penukar",
    inputPlaceholder: "Masukkan nilai untuk ditukar...",
    outputLabel: "Keputusan",
    copyToClipboard: "Salin ke papan klip",
    copied: "Disalin!",
    clear: "Kosongkan",
    paste: "Tampal",
    processing: "Menukar...",
    startOver: "Mula semula",
    process: "Tukar",
    tryAgain: "Cuba lagi",
    notImplemented: "Penukar ini akan datang tidak lama lagi.",
    tryOtherTools: "Cuba penukar lain",
    privacyBadge: "Semua penukaran berlaku dalam pelayar anda",
    favoriteAdded: "Ditambah ke kegemaran",
    favoriteRemoved: "Dibuang dari kegemaran",
    comingSoon: "Akan Datang",
    share: "Kongsi",
    shareTitle: "Kongsi penukar ini",
    shareSubtitle: "Kongsi penukar berguna ini dengan orang lain",
    shareCopied: "Pautan disalin!",
    shareCopyLink: "Salin pautan",
    downloadAsFile: "Muat turun",
    options: "Pilihan",
    input: "Input",
    output: "Output",
    convert: "Tukar",
    swap: "Tukar",
    from: "Dari",
    to: "Ke",
    result: "Keputusan",
    allConversions: "Semua Penukaran",
    details: "Butiran",
    pageNotFound: "Penukar tidak ditemui",
    goHome: "Kembali ke semua penukar",
    colorPickerLabel: "Pemilih warna",
  },
  toolOptions: {
    fromUnit: "Dari",
    toUnit: "Ke",
    precision: "Tempat perpuluhan",
    baseSize: "Saiz fon asas (px)",
    parentSize: "Saiz fon induk (px)",
    containerWidth: "Lebar bekas (px)",
    viewportWidth: "Lebar viewport (px)",
    viewportHeight: "Tinggi viewport (px)",
    direction: "Arah",
    mode: "Mod",
    ingredient: "Bahan",
    water: "Air",
    flour: "Tepung",
    sugar: "Gula",
    butter: "Mentega",
    rice: "Beras",
    milk: "Susu",
    originalServings: "Hidangan asal",
    targetServings: "Hidangan sasaran",
    fromTimezone: "Dari zon waktu",
    toTimezone: "Ke zon waktu",
    inputFormat: "Format input",
    outputFormat: "Format output",
    harmony: "Harmoni warna",
    complementary: "Pelengkap",
    triadic: "Triadik",
    analogous: "Analog",
    splitComplementary: "Pelengkap Belah",
    tetradic: "Tetradik",
    gradientType: "Jenis gradien",
    linear: "Linear",
    radial: "Radial",
    conic: "Konik",
    gradientAngle: "Sudut (deg)",
    rootName: "Nama antara muka utama",
    tableName: "Nama jadual",
    minify: "Kecilkan",
    beautify: "Cantikkan",
    colorType: "Jenis kekurangan",
    protanopia: "Protanopia (tiada merah)",
    deuteranopia: "Deuteranopia (tiada hijau)",
    tritanopia: "Tritanopia (tiada biru)",
    achromatopsia: "Akromatopsia (tiada warna)",
    operation: "Operasi",
    difference: "Perbezaan",
    add: "Tambah",
    subtract: "Tolak",
    amount: "Jumlah",
    unit: "Unit",
    days: "Hari",
    weeks: "Minggu",
    months: "Bulan",
    years: "Tahun",
    fromBase: "Dari asas",
    toBase: "Ke asas",
    binary: "Perduaan (2)",
    octal: "Perlapanan (8)",
    decimal: "Perpuluhan (10)",
    hexadecimal: "Perenambelasan (16)",
    seconds: "Saat",
    milliseconds: "Milisaat",
    autoDetect: "Kesan automatik",
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
    markdown: "Jadual Markdown",
    html: "Jadual HTML",
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
    toRoman: "Nombor → Roman",
    toArabic: "Roman → Nombor",
    toScientific: "Standard → Saintifik",
    toStandard: "Saintifik → Standard",
    toFraction: "Perpuluhan → Pecahan",
    toDecimal: "Pecahan → Perpuluhan",
    decimalToPercent: "Perpuluhan → Peratus",
    percentToDecimal: "Peratus → Perpuluhan",
    fractionToPercent: "Pecahan → Peratus",
    dd: "Darjah Perpuluhan (DD)",
    dms: "Darjah Minit Saat (DMS)",
    ddm: "Darjah Minit Perpuluhan (DDM)",
    iso: "ISO 8601",
    us: "AS (BB/HH/TTTT)",
    eu: "EU (HH/BB/TTTT)",
    long: "Format panjang",
    short: "Format pendek",
    relative: "Relatif",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Warna Latar Belakang",
    monochromatic: "Monokromatik",
    timestampToDate: "Cap Masa → Tarikh",
    dateToTimestamp: "Tarikh → Cap Masa",
    showDetails: "Tunjuk pecahan terperinci",
    addDays: "Tambah hari",
    subtractDays: "Tolak hari",
    datetimeHint: "cth. 2024-01-15, 1705312200, now",
    endDate: "Tarikh akhir",
    today: "Hari ini (lalai)",
    dateUnit: "Unit",
  },
  statsLabels: {
    lines: "Baris",
    characters: "Aksara",
    rows: "Baris",
    columns: "Lajur",
    elements: "Elemen",
    keys: "Kunci",
    interfaces: "Antara muka",
    properties: "Sifat",
    originalSize: "Saiz asal",
    resultSize: "Saiz hasil",
    savings: "Penjimatan",
    ingredients: "Bahan",
    scaleFactor: "Faktor skala",
    contrastRatio: "Nisbah kontras",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitud",
    longitude: "Longitud",
    distanceKm: "Jarak (km)",
    distanceMi: "Jarak (mi)",
    years: "Tahun",
    months: "Bulan",
    days: "Hari",
  },
  processorMessages: {
    invalidTimezone: "Zon waktu tidak sah",
    pass: "Lulus", fail: "Gagal",
    fromNow: "dari sekarang", ago: "lalu",
    today: "Hari ini", tomorrow: "Esok", yesterday: "Semalam",
    seconds: "saat", secondsPlural: "saat",
    minutes: "minit", minutesPlural: "minit",
    hours: "jam", hoursPlural: "jam",
    daysUnit: "hari", daysPlural: "hari",
    weeksUnit: "minggu", weeksPlural: "minggu",
    monthsUnit: "bulan", monthsPlural: "bulan",
    yearsUnit: "tahun", yearsPlural: "tahun",
    gasmark: "Gas Mark",
    veryCool: "Sangat sejuk", cool: "Sejuk", moderatelyCool: "Sederhana sejuk",
    moderate: "Sederhana", moderatelyHot: "Sederhana panas",
    hot: "Panas", veryHot: "Sangat panas", extremelyHot: "Amat panas",
    gasMark: "Gas Mark",
    original: "Asal",
    from: "Dari", to: "Ke",
    totalDays: "Jumlah Hari", weeksDays: "Minggu + Hari",
    originalDate: "Tarikh Asal", operationLabel: "Operasi",
    resultDate: "Tarikh Keputusan", dayOfWeek: "Hari dalam Minggu",
    daysBetween: "Hari Antara",
    age: "Umur", totalMonths: "Jumlah Bulan",
    totalHours: "Jumlah Jam", totalMinutes: "Jumlah Minit",
    nextBirthday: "Hari Lahir Seterusnya",
    roman: "Roman", arabic: "Arab",
    scientific: "Saintifik", standard: "Standard", engineering: "Kejuruteraan",
    fraction: "Pecahan", simplified: "Ringkas", percentage: "Peratusan",
    color1: "Warna 1", color2: "Warna 2",
    contrastRatioLabel: "Nisbah Kontras",
    aaNormalText: "AA Teks Biasa", aaLargeText: "AA Teks Besar",
    aaaNormalText: "AAA Teks Biasa", aaaLargeText: "AAA Teks Besar",
    gradientTypeLabel: "Jenis", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Penukar Dalam Talian Percuma",
    siteDescription:
      "Tukar unit, warna, format data, tarikh dan banyak lagi. Percuma, pantas dan peribadi — semuanya berjalan dalam pelayar anda.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Petua, panduan dan pengetahuan tentang penukaran unit, format data dan banyak lagi.",
    readMore: "Baca lagi",
    backToBlog: "Kembali ke Blog",
    publishedOn: "Diterbitkan pada",
    categoryGuide: "Panduan",
    categoryTips: "Petua",
    categoryKnowledge: "Pengetahuan",
  },
  cookie: {
    message:
      "Kami menggunakan kuki untuk meningkatkan pengalaman anda. Dengan meneruskan, anda bersetuju dengan dasar kuki kami.",
    accept: "Terima",
    decline: "Tolak",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Sentimeter (cm)", mm: "Milimeter (mm)",
      mi: "Batu (mi)", yd: "Ela (yd)", ft: "Kaki (ft)", in: "Inci (in)",
      nm: "Batu nautika (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Paun (lb)",
      oz: "Auns (oz)", ton: "Tan metrik (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Meter persegi (m\u00B2)", "km\u00B2": "Kilometer persegi (km\u00B2)",
      ha: "Hektar (ha)", acre: "Ekar", "ft\u00B2": "Kaki persegi (ft\u00B2)",
      "mi\u00B2": "Batu persegi (mi\u00B2)", "yd\u00B2": "Ela persegi (yd\u00B2)",
      "cm\u00B2": "Sentimeter persegi (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Mililiter (mL)", gal: "Gelen AS (gal)",
      "fl oz": "Auns cecair AS (fl oz)", cup: "Cawan AS", pt: "Pain AS (pt)",
      qt: "Kuart AS (qt)", "m\u00B3": "Meter padu (m\u00B3)",
      "cm\u00B3": "Sentimeter padu (cm\u00B3)", tbsp: "Sudu besar (tbsp)", tsp: "Sudu kecil (tsp)",
    },
    speed: {
      "m/s": "Meter/saat (m/s)", "km/h": "Kilometer/jam (km/h)", mph: "Batu/jam (mph)",
      kn: "Knot (kn)", "ft/s": "Kaki/saat (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisaat (ms)", s: "Saat (s)", min: "Minit (min)", h: "Jam (h)",
      d: "Hari (d)", wk: "Minggu (wk)", mo: "Bulan (mo)", yr: "Tahun (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalori (cal)", kcal: "Kilokalori (kcal)",
      Wh: "Watt-jam (Wh)", kWh: "Kilowatt-jam (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Kuasa kuda (hp)",
      "BTU/h": "BTU/jam", "cal/s": "Kalori/saat",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Darjah (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Pusingan", arcmin: "Minit arka (\u2032)", arcsec: "Saat arka (\u2033)",
    },
    "data-storage": {
      B: "Bait (B)", KB: "Kilobait (KB)", MB: "Megabait (MB)", GB: "Gigabait (GB)",
      TB: "Terabait (TB)", PB: "Petabait (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (AS)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Cawan", tbsp: "Sudu besar", tsp: "Sudu kecil", mL: "Mililiter (mL)",
      L: "Liter (L)", fl_oz: "Auns cecair", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Auns (oz)", lb: "Paun (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Piksel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Piksel (px)", em: "Em (em)" },
    "px-percent": { px: "Piksel (px)", "%": "Peratus (%)" },
    "css-unit": {
      px: "Piksel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Peratus (%)", vw: "Lebar Viewport (vw)", vh: "Tinggi Viewport (vh)",
    },
  },
};

export default dict;
