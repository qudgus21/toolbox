import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Semua alat konversi yang kamu butuhkan",
    titleAccent: "konversi",
    description:
      "Konversi satuan, warna, format data, tanggal, dan lainnya. Semua diproses langsung di browser.",
    tabAll: "Semua",
    categoryUnit: "Satuan",
    categoryNumber: "Angka",
    categoryColor: "Warna",
    categoryDatetime: "Tanggal/Waktu",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Memasak",
    categoryGeography: "Geografi",
    searchPlaceholder: "Cari konverter...",
    noResults: "Konverter tidak ditemukan.",
    recentTools: "Terakhir Digunakan",
    favorites: "Favorit",
    favDragHint: "Seret untuk mengatur ulang",
    favHint: "Klik bintang untuk menambahkan favorit",
    gridView: "Tampilan grid",
    listView: "Tampilan daftar",
  },
  trust: {
    encryption: "Pemrosesan Aman",
    encryptionDesc: "Semua konversi dilakukan secara lokal di browser Anda",
    autoDelete: "Tanpa Penyimpanan Data",
    autoDeleteDesc: "Input Anda tidak pernah disimpan atau dikirim ke server",
    free: "100% Gratis",
    freeDesc: "Tanpa batasan, tanpa pendaftaran, tanpa biaya tersembunyi",
    browserProcessing: "Hasil Instan",
    browserProcessingDesc: "Konversi real-time saat Anda mengetik",
  },
  tools: {
    length: {
      title: "Konverter Panjang",
      description:
        "Konversi antara meter, kilometer, mil, kaki, inci, dan lainnya.",
    },
    weight: {
      title: "Konverter Berat",
      description:
        "Konversi antara kilogram, pon, ons, ton, dan lainnya.",
    },
    temperature: {
      title: "Konverter Suhu",
      description: "Konversi antara Celsius, Fahrenheit, dan Kelvin.",
    },
    area: {
      title: "Konverter Luas",
      description:
        "Konversi antara meter persegi, hektare, acre, kaki persegi, dan lainnya.",
    },
    volume: {
      title: "Konverter Volume",
      description:
        "Konversi antara liter, galon, cangkir, fluid ounce, dan lainnya.",
    },
    speed: {
      title: "Konverter Kecepatan",
      description: "Konversi antara m/s, km/h, mph, knot, dan lainnya.",
    },
    time: {
      title: "Konverter Waktu",
      description:
        "Konversi antara detik, menit, jam, hari, minggu, dan lainnya.",
    },
    pressure: {
      title: "Konverter Tekanan",
      description:
        "Konversi antara Pascal, bar, PSI, atmosfer, dan lainnya.",
    },
    energy: {
      title: "Konverter Energi",
      description:
        "Konversi antara joule, kalori, kilowatt-jam, BTU, dan lainnya.",
    },
    power: {
      title: "Konverter Daya",
      description:
        "Konversi antara watt, kilowatt, tenaga kuda, dan lainnya.",
    },
    frequency: {
      title: "Konverter Frekuensi",
      description:
        "Konversi antara hertz, kilohertz, megahertz, gigahertz, dan RPM.",
    },
    angle: {
      title: "Konverter Sudut",
      description: "Konversi antara derajat, radian, gradian, dan putaran.",
    },
    "data-storage": {
      title: "Konverter Penyimpanan Data",
      description:
        "Konversi antara byte, kilobyte, megabyte, gigabyte, dan lainnya.",
    },
    "fuel-economy": {
      title: "Konverter Konsumsi BBM",
      description: "Konversi antara km/L, mpg, dan L/100km.",
    },
    "number-base": {
      title: "Konverter Basis Bilangan",
      description:
        "Konversi antara biner, oktal, desimal, heksadesimal, dan basis kustom.",
    },
    "roman-numeral": {
      title: "Konverter Angka Romawi",
      description: "Konversi antara angka Romawi dan angka Arab.",
    },
    "scientific-notation": {
      title: "Konverter Notasi Ilmiah",
      description:
        "Konversi antara notasi ilmiah dan bilangan standar.",
    },
    "fraction-decimal": {
      title: "Pecahan ↔ Desimal",
      description: "Konversi antara pecahan dan bilangan desimal.",
    },
    percentage: {
      title: "Konverter Persentase",
      description:
        "Konversi antara pecahan, desimal, dan persentase.",
    },
    "color-converter": {
      title: "Konverter Warna",
      description:
        "Konversi antara format warna HEX, RGB, HSL, HSV, dan CMYK.",
    },
    "color-palette-generator": {
      title: "Generator Palet Warna",
      description:
        "Buat palet warna komplementer, triadik, dan analogus.",
    },
    "gradient-generator": {
      title: "Generator Gradien CSS",
      description:
        "Buat gradien CSS linear, radial, dan konik dengan pratinjau langsung.",
    },
    "color-contrast-checker": {
      title: "Pemeriksa Kontras Warna",
      description:
        "Periksa rasio kontras warna WCAG AA/AAA antara dua warna.",
    },
    "color-blindness-simulator": {
      title: "Simulator Buta Warna",
      description:
        "Simulasikan bagaimana warna terlihat bagi penyandang buta warna.",
    },
    timezone: {
      title: "Konverter Zona Waktu",
      description:
        "Konversi waktu antara berbagai zona waktu di seluruh dunia.",
    },
    "unix-timestamp": {
      title: "Konverter Unix Timestamp",
      description:
        "Konversi antara Unix timestamp dan tanggal yang mudah dibaca.",
    },
    "date-format": {
      title: "Konverter Format Tanggal",
      description:
        "Konversi tanggal antara berbagai format (ISO, US, EU, dan lainnya).",
    },
    "date-calculator": {
      title: "Kalkulator Tanggal",
      description:
        "Hitung selisih antara dua tanggal atau tambah/kurangi hari.",
    },
    "age-calculator": {
      title: "Kalkulator Usia",
      description:
        "Hitung usia tepat dari tanggal lahir dalam tahun, bulan, dan hari.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Konversi antara format data JSON dan YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Konversi antara array JSON dan format spreadsheet CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Konversi antara format data JSON dan XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Konversi antara format konfigurasi JSON dan TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Konversi antara markup Markdown dan HTML.",
    },
    "csv-table": {
      title: "CSV ke Tabel",
      description: "Ubah data CSV menjadi tabel Markdown atau HTML.",
    },
    "json-typescript": {
      title: "JSON ke TypeScript",
      description: "Buat interface TypeScript dari data JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Konversi antara pernyataan SQL INSERT dan data JSON.",
    },
    "px-rem": {
      title: "px ↔ rem Konverter",
      description:
        "Konversi antara piksel dan satuan rem dengan ukuran dasar kustom.",
    },
    "px-em": {
      title: "px ↔ em Konverter",
      description:
        "Konversi antara piksel dan satuan em dengan ukuran induk kustom.",
    },
    "px-percent": {
      title: "px ↔ % Konverter",
      description:
        "Konversi antara piksel dan persentase dengan lebar kontainer kustom.",
    },
    "css-unit": {
      title: "Konverter Satuan CSS",
      description:
        "Konversi antara px, rem, em, %, vw, vh, dan satuan CSS lainnya.",
    },
    "css-minifier": {
      title: "CSS Minifikasi / Perapian",
      description:
        "Minifikasi atau rapikan kode CSS untuk produksi atau keterbacaan.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Konversi antara kelas Tailwind CSS dan CSS biasa.",
    },
    "cooking-measurement": {
      title: "Konverter Takaran Masak",
      description:
        "Konversi antara cangkir, sendok makan, sendok teh, mililiter, dan gram.",
    },
    "recipe-scaler": {
      title: "Pengubah Skala Resep",
      description:
        "Sesuaikan jumlah bahan berdasarkan jumlah porsi.",
    },
    "oven-temperature": {
      title: "Konverter Suhu Oven",
      description:
        "Konversi antara Celsius, Fahrenheit, dan Gas Mark untuk suhu oven.",
    },
    coordinate: {
      title: "Konverter Koordinat",
      description:
        "Konversi antara format koordinat DMS, DD, dan DDM.",
    },
    "distance-calculator": {
      title: "Kalkulator Jarak",
      description:
        "Hitung jarak antara dua koordinat geografis.",
    },
  },
  nav: {
    allTools: "Semua Konverter",
    language: "Bahasa",
  },
  footer: {
    tools: "Konverter",
    legal: "Hukum",
    privacy: "Kebijakan Privasi",
    terms: "Ketentuan Layanan",
    copyright: "ToolPop. Hak cipta dilindungi.",
    company: "Perusahaan",
    about: "Tentang",
    contact: "Kontak",
    faq: "FAQ",
  },
  common: {
    backToAll: "Semua Konverter",
    inputPlaceholder: "Masukkan nilai untuk dikonversi...",
    outputLabel: "Hasil",
    copyToClipboard: "Salin ke clipboard",
    copied: "Tersalin!",
    clear: "Hapus",
    paste: "Tempel",
    processing: "Mengonversi...",
    startOver: "Mulai ulang",
    process: "Konversi",
    tryAgain: "Coba lagi",
    notImplemented: "Konverter ini segera hadir.",
    tryOtherTools: "Coba konverter lainnya",
    privacyBadge: "Semua konversi dilakukan di browser Anda",
    favoriteAdded: "Ditambahkan ke favorit",
    favoriteRemoved: "Dihapus dari favorit",
    comingSoon: "Segera Hadir",
    share: "Bagikan",
    shareTitle: "Bagikan konverter ini",
    shareSubtitle: "Bagikan konverter berguna ini dengan orang lain",
    shareCopied: "Tautan tersalin!",
    shareCopyLink: "Salin tautan",
    downloadAsFile: "Unduh",
    options: "Opsi",
    input: "Input",
    output: "Output",
    convert: "Konversi",
    swap: "Tukar",
    from: "Dari",
    to: "Ke",
    result: "Hasil",
    allConversions: "Semua Konversi",
    details: "Detail",
    pageNotFound: "Konverter tidak ditemukan",
    goHome: "Kembali ke semua konverter",
  },
  toolOptions: {
    fromUnit: "Dari",
    toUnit: "Ke",
    precision: "Tempat desimal",
    baseSize: "Ukuran font dasar (px)",
    parentSize: "Ukuran font induk (px)",
    containerWidth: "Lebar kontainer (px)",
    viewportWidth: "Lebar viewport (px)",
    viewportHeight: "Tinggi viewport (px)",
    direction: "Arah",
    mode: "Mode",
    ingredient: "Bahan",
    water: "Air",
    flour: "Tepung",
    sugar: "Gula",
    butter: "Mentega",
    rice: "Beras",
    milk: "Susu",
    originalServings: "Porsi awal",
    targetServings: "Porsi target",
    fromTimezone: "Zona waktu asal",
    toTimezone: "Zona waktu tujuan",
    inputFormat: "Format input",
    outputFormat: "Format output",
    harmony: "Harmoni warna",
    complementary: "Komplementer",
    triadic: "Triadik",
    analogous: "Analogus",
    splitComplementary: "Split Komplementer",
    tetradic: "Tetradik",
    gradientType: "Jenis gradien",
    linear: "Linear",
    radial: "Radial",
    conic: "Konik",
    gradientAngle: "Sudut (deg)",
    rootName: "Nama interface root",
    tableName: "Nama tabel",
    minify: "Minifikasi",
    beautify: "Rapikan",
    colorType: "Jenis defisiensi",
    protanopia: "Protanopia (tanpa merah)",
    deuteranopia: "Deuteranopia (tanpa hijau)",
    tritanopia: "Tritanopia (tanpa biru)",
    achromatopsia: "Akromatopsia (tanpa warna)",
    operation: "Operasi",
    difference: "Selisih",
    add: "Tambah",
    subtract: "Kurangi",
    amount: "Jumlah",
    unit: "Satuan",
    days: "Hari",
    weeks: "Minggu",
    months: "Bulan",
    years: "Tahun",
    fromBase: "Dari basis",
    toBase: "Ke basis",
    binary: "Biner (2)",
    octal: "Oktal (8)",
    decimal: "Desimal (10)",
    hexadecimal: "Heksadesimal (16)",
    seconds: "Detik",
    milliseconds: "Milidetik",
    autoDetect: "Deteksi otomatis",
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
    markdown: "Tabel Markdown",
    html: "Tabel HTML",
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
    toRoman: "Angka → Romawi",
    toArabic: "Romawi → Angka",
    toScientific: "Standar → Ilmiah",
    toStandard: "Ilmiah → Standar",
    toFraction: "Desimal → Pecahan",
    toDecimal: "Pecahan → Desimal",
    decimalToPercent: "Desimal → Persen",
    percentToDecimal: "Persen → Desimal",
    fractionToPercent: "Pecahan → Persen",
    dd: "Derajat Desimal (DD)",
    dms: "Derajat Menit Detik (DMS)",
    ddm: "Derajat Menit Desimal (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Format panjang",
    short: "Format pendek",
    relative: "Relatif",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Warna Latar Belakang",
    monochromatic: "Monokromatik",
    timestampToDate: "Timestamp → Tanggal",
    dateToTimestamp: "Tanggal → Timestamp",
    showDetails: "Tampilkan rincian lengkap",
    addDays: "Tambah hari",
    subtractDays: "Kurangi hari",
    datetimeHint: "misal 2024-01-15, 1705312200, now",
    endDate: "Tanggal akhir",
    today: "Hari ini (default)",
    dateUnit: "Satuan",
  },
  statsLabels: {
    lines: "Baris",
    characters: "Karakter",
    rows: "Baris",
    columns: "Kolom",
    elements: "Elemen",
    keys: "Kunci",
    interfaces: "Antarmuka",
    properties: "Properti",
    originalSize: "Ukuran asli",
    resultSize: "Ukuran hasil",
    savings: "Penghematan",
    ingredients: "Bahan",
    scaleFactor: "Faktor skala",
    contrastRatio: "Rasio kontras",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Lintang",
    longitude: "Bujur",
    distanceKm: "Jarak (km)",
    distanceMi: "Jarak (mi)",
    years: "Tahun",
    months: "Bulan",
    days: "Hari",
  },
  processorMessages: {
    invalidTimezone: "Zona waktu tidak valid",
    pass: "Lulus", fail: "Gagal",
    fromNow: "dari sekarang", ago: "lalu",
    today: "Hari ini", tomorrow: "Besok", yesterday: "Kemarin",
    seconds: "detik", secondsPlural: "detik",
    minutes: "menit", minutesPlural: "menit",
    hours: "jam", hoursPlural: "jam",
    daysUnit: "hari", daysPlural: "hari",
    weeksUnit: "minggu", weeksPlural: "minggu",
    monthsUnit: "bulan", monthsPlural: "bulan",
    yearsUnit: "tahun", yearsPlural: "tahun",
    gasmark: "Gas Mark",
    veryCool: "Sangat Dingin", cool: "Dingin", moderatelyCool: "Agak Dingin",
    moderate: "Sedang", moderatelyHot: "Agak Panas",
    hot: "Panas", veryHot: "Sangat Panas", extremelyHot: "Luar Biasa Panas",
    original: "Asli",
    from: "Dari", to: "Ke",
    totalDays: "Total Hari", weeksDays: "Minggu + Hari",
    originalDate: "Tanggal Asal", operationLabel: "Operasi",
    resultDate: "Tanggal Hasil", dayOfWeek: "Hari dalam Minggu",
    daysBetween: "Selisih Hari",
    age: "Usia", totalMonths: "Total Bulan",
    totalHours: "Total Jam", totalMinutes: "Total Menit",
    nextBirthday: "Ulang Tahun Berikutnya",
    roman: "Romawi", arabic: "Arab",
    scientific: "Ilmiah", standard: "Standar", engineering: "Teknik",
    fraction: "Pecahan", simplified: "Disederhanakan", percentage: "Persentase",
    color1: "Warna 1", color2: "Warna 2",
    contrastRatioLabel: "Rasio Kontras",
    aaNormalText: "AA Teks Normal", aaLargeText: "AA Teks Besar",
    aaaNormalText: "AAA Teks Normal", aaaLargeText: "AAA Teks Besar",
    gradientTypeLabel: "Tipe", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Konverter — Konverter Online Gratis",
    siteDescription:
      "Konversi satuan, warna, format data, tanggal, dan lainnya. Gratis, cepat, dan privat — semuanya berjalan di browser Anda.",
    toolTitleSuffix: "| ToolPop Konverter",
  },
  blog: {
    title: "Blog",
    description:
      "Tips, panduan, dan pengetahuan tentang konversi satuan, format data, dan lainnya.",
    readMore: "Baca selengkapnya",
    backToBlog: "Kembali ke Blog",
    publishedOn: "Diterbitkan pada",
    categoryGuide: "Panduan",
    categoryTips: "Tips",
    categoryKnowledge: "Pengetahuan",
  },
  cookie: {
    message:
      "Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan melanjutkan, Anda menyetujui kebijakan cookie kami.",
    accept: "Terima",
    decline: "Tolak",
  },
  unitLabels: {
    length: {
      m: "Meter (m)", km: "Kilometer (km)", cm: "Sentimeter (cm)", mm: "Milimeter (mm)",
      mi: "Mil (mi)", yd: "Yard (yd)", ft: "Kaki (ft)", in: "Inci (in)",
      nm: "Mil Laut (nm)", "\u03BCm": "Mikrometer (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Pon (lb)",
      oz: "Ons (oz)", ton: "Ton Metrik (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Meter Persegi (m\u00B2)", "km\u00B2": "Kilometer Persegi (km\u00B2)",
      ha: "Hektare (ha)", acre: "Acre", "ft\u00B2": "Kaki Persegi (ft\u00B2)",
      "mi\u00B2": "Mil Persegi (mi\u00B2)", "yd\u00B2": "Yard Persegi (yd\u00B2)",
      "cm\u00B2": "Sentimeter Persegi (cm\u00B2)",
    },
    volume: {
      L: "Liter (L)", mL: "Mililiter (mL)", gal: "Galon AS (gal)",
      "fl oz": "Fluid Ounce AS (fl oz)", cup: "Cangkir AS", pt: "Pint AS (pt)",
      qt: "Kuart AS (qt)", "m\u00B3": "Meter Kubik (m\u00B3)",
      "cm\u00B3": "Sentimeter Kubik (cm\u00B3)", tbsp: "Sendok Makan (tbsp)", tsp: "Sendok Teh (tsp)",
    },
    speed: {
      "m/s": "Meter/detik (m/s)", "km/h": "Kilometer/jam (km/h)", mph: "Mil/jam (mph)",
      kn: "Knot (kn)", "ft/s": "Kaki/detik (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milidetik (ms)", s: "Detik (s)", min: "Menit (min)", h: "Jam (h)",
      d: "Hari (d)", wk: "Minggu (wk)", mo: "Bulan (mo)", yr: "Tahun (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfer (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalori (cal)", kcal: "Kilokalori (kcal)",
      Wh: "Watt-jam (Wh)", kWh: "Kilowatt-jam (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Tenaga kuda (hp)",
      "BTU/h": "BTU/jam", "cal/s": "Kalori/detik",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Derajat (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Putaran", arcmin: "Menit Busur (\u2032)", arcsec: "Detik Busur (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Cangkir", tbsp: "Sendok Makan", tsp: "Sendok Teh", mL: "Mililiter (mL)",
      L: "Liter (L)", fl_oz: "Fluid Ounce", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Ons (oz)", lb: "Pon (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Piksel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Piksel (px)", em: "Em (em)" },
    "px-percent": { px: "Piksel (px)", "%": "Persen (%)" },
    "css-unit": {
      px: "Piksel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Persen (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
