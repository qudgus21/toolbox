import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "İhtiyacın olan tüm dönüştürme araçları",
    titleAccent: "dönüştürme",
    description:
      "Birim, renk, veri formatı, tarih dönüştür. Her şey tarayıcında işlenir.",
    tabAll: "Tümü",
    categoryUnit: "Birimler",
    categoryNumber: "Sayılar",
    categoryColor: "Renkler",
    categoryDatetime: "Tarih/Saat",
    categoryData: "Veri",
    categoryCss: "CSS",
    categoryCooking: "Yemek",
    categoryGeography: "Coğrafya",
    searchPlaceholder: "Dönüştürücü ara...",
    noResults: "Dönüştürücü bulunamadı.",
    recentTools: "Son Kullanılanlar",
    favorites: "Favoriler",
    favDragHint: "Sıralamak için sürükleyin",
    favHint: "Favorilere eklemek için yıldıza tıklayın",
    gridView: "Izgara görünümü",
    listView: "Liste görünümü",
  },
  trust: {
    encryption: "Güvenli İşleme",
    encryptionDesc: "Tüm dönüşümler tarayıcınızda yerel olarak gerçekleşir",
    autoDelete: "Veri Saklanmaz",
    autoDeleteDesc: "Girdiğiniz veriler asla kaydedilmez veya sunucuya gönderilmez",
    free: "%100 Ücretsiz",
    freeDesc: "Sınırsız, kayıt gereksiz, gizli ücret yok",
    browserProcessing: "Anında Sonuç",
    browserProcessingDesc: "Yazarken gerçek zamanlı dönüşüm",
  },
  tools: {
    length: {
      title: "Uzunluk Dönüştürücü",
      description:
        "Metre, kilometre, mil, feet, inç ve daha fazlası arasında dönüştürün.",
    },
    weight: {
      title: "Ağırlık Dönüştürücü",
      description:
        "Kilogram, pound, ons, ton ve daha fazlası arasında dönüştürün.",
    },
    temperature: {
      title: "Sıcaklık Dönüştürücü",
      description: "Celsius, Fahrenheit ve Kelvin arasında dönüştürün.",
    },
    area: {
      title: "Alan Dönüştürücü",
      description:
        "Metrekare, hektar, akre, feet kare ve daha fazlası arasında dönüştürün.",
    },
    volume: {
      title: "Hacim Dönüştürücü",
      description:
        "Litre, galon, fincan, sıvı ons ve daha fazlası arasında dönüştürün.",
    },
    speed: {
      title: "Hız Dönüştürücü",
      description: "m/s, km/h, mph, knot ve daha fazlası arasında dönüştürün.",
    },
    time: {
      title: "Zaman Dönüştürücü",
      description:
        "Saniye, dakika, saat, gün, hafta ve daha fazlası arasında dönüştürün.",
    },
    pressure: {
      title: "Basınç Dönüştürücü",
      description:
        "Pascal, bar, PSI, atmosfer ve daha fazlası arasında dönüştürün.",
    },
    energy: {
      title: "Enerji Dönüştürücü",
      description:
        "Joule, kalori, kilowatt-saat, BTU ve daha fazlası arasında dönüştürün.",
    },
    power: {
      title: "Güç Dönüştürücü",
      description:
        "Watt, kilowatt, beygir gücü ve daha fazlası arasında dönüştürün.",
    },
    frequency: {
      title: "Frekans Dönüştürücü",
      description:
        "Hertz, kilohertz, megahertz, gigahertz ve RPM arasında dönüştürün.",
    },
    angle: {
      title: "Açı Dönüştürücü",
      description: "Derece, radyan, gradyan ve tur arasında dönüştürün.",
    },
    "data-storage": {
      title: "Veri Depolama Dönüştürücü",
      description:
        "Bayt, kilobayt, megabayt, gigabayt ve daha fazlası arasında dönüştürün.",
    },
    "fuel-economy": {
      title: "Yakıt Tüketimi Dönüştürücü",
      description: "km/L, mpg ve L/100km arasında dönüştürün.",
    },
    "number-base": {
      title: "Sayı Tabanı Dönüştürücü",
      description:
        "İkili, sekizli, onlu, onaltılı ve diğer tabanlar arasında dönüştürün.",
    },
    "roman-numeral": {
      title: "Roma Rakamı Dönüştürücü",
      description: "Roma rakamları ve Arap rakamları arasında dönüştürün.",
    },
    "scientific-notation": {
      title: "Bilimsel Gösterim",
      description:
        "Bilimsel gösterim ve standart sayılar arasında dönüştürün.",
    },
    "fraction-decimal": {
      title: "Kesir ↔ Ondalık",
      description: "Kesirler ve ondalık sayılar arasında dönüştürün.",
    },
    percentage: {
      title: "Yüzde Dönüştürücü",
      description:
        "Kesirler, ondalık sayılar ve yüzdeler arasında dönüştürün.",
    },
    "color-converter": {
      title: "Renk Dönüştürücü",
      description:
        "HEX, RGB, HSL, HSV ve CMYK renk formatları arasında dönüştürün.",
    },
    "color-palette-generator": {
      title: "Renk Paleti Oluşturucu",
      description:
        "Tamamlayıcı, üçlü ve benzer renk paletleri oluşturun.",
    },
    "gradient-generator": {
      title: "CSS Gradient Oluşturucu",
      description:
        "Canlı önizleme ile doğrusal, dairesel ve konik CSS gradientleri oluşturun.",
    },
    "color-contrast-checker": {
      title: "Renk Kontrast Denetleyici",
      description:
        "İki renk arasındaki WCAG AA/AAA kontrast oranını kontrol edin.",
    },
    "color-blindness-simulator": {
      title: "Renk Körlüğü Simülatörü",
      description:
        "Renk görme bozukluğu olan kişilerin renkleri nasıl gördüğünü simüle edin.",
    },
    timezone: {
      title: "Saat Dilimi Dönüştürücü",
      description:
        "Dünya genelindeki farklı saat dilimleri arasında saat dönüştürün.",
    },
    "unix-timestamp": {
      title: "Unix Zaman Damgası Dönüştürücü",
      description:
        "Unix zaman damgaları ve okunabilir tarihler arasında dönüştürün.",
    },
    "date-format": {
      title: "Tarih Formatı Dönüştürücü",
      description:
        "Tarihleri ISO, US, EU ve diğer formatlar arasında dönüştürün.",
    },
    "date-calculator": {
      title: "Tarih Hesaplayıcı",
      description:
        "Tarihler arasındaki farkı hesaplayın veya gün ekleyin/çıkarın.",
    },
    "age-calculator": {
      title: "Yaş Hesaplayıcı",
      description:
        "Doğum tarihinden yıl, ay ve gün olarak kesin yaşı hesaplayın.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "JSON ve YAML veri formatları arasında dönüştürün.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "JSON dizileri ve CSV elektronik tablo formatı arasında dönüştürün.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "JSON ve XML veri formatları arasında dönüştürün.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "JSON ve TOML yapılandırma formatları arasında dönüştürün.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Markdown ve HTML biçimlendirmesi arasında dönüştürün.",
    },
    "csv-table": {
      title: "CSV'den Tabloya",
      description: "CSV verilerini Markdown veya HTML tablolarına dönüştürün.",
    },
    "json-typescript": {
      title: "JSON'dan TypeScript'e",
      description: "JSON verilerinden TypeScript arayüzleri oluşturun.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "SQL INSERT ifadeleri ve JSON verileri arasında dönüştürün.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Özel taban boyutuyla piksel ve rem arasında dönüştürün.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Özel üst eleman boyutuyla piksel ve em arasında dönüştürün.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Özel kapsayıcı genişliğiyle piksel ve yüzde arasında dönüştürün.",
    },
    "css-unit": {
      title: "CSS Birim Dönüştürücü",
      description:
        "px, rem, em, %, vw, vh ve diğer CSS birimleri arasında dönüştürün.",
    },
    "css-minifier": {
      title: "CSS Küçültücü / Biçimlendirici",
      description:
        "Üretim veya okunabilirlik için CSS kodunu küçültün veya biçimlendirin.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tailwind CSS sınıfları ve sade CSS arasında dönüştürün.",
    },
    "cooking-measurement": {
      title: "Yemek Ölçü Dönüştürücü",
      description:
        "Fincan, yemek kaşığı, çay kaşığı, mililitre ve gram arasında dönüştürün.",
    },
    "recipe-scaler": {
      title: "Tarif Ölçekleyici",
      description:
        "Tarif malzemelerini porsiyon sayısına göre artırın veya azaltın.",
    },
    "oven-temperature": {
      title: "Fırın Sıcaklığı Dönüştürücü",
      description:
        "Fırın sıcaklığını Celsius, Fahrenheit ve Gas Mark arasında dönüştürün.",
    },
    coordinate: {
      title: "Koordinat Dönüştürücü",
      description:
        "DMS, DD ve DDM koordinat formatları arasında dönüştürün.",
    },
    "distance-calculator": {
      title: "Mesafe Hesaplayıcı",
      description:
        "İki coğrafi koordinat arasındaki mesafeyi hesaplayın.",
    },
  },
  nav: {
    allTools: "Tüm Dönüştürücüler",
    language: "Dil",
  },
  footer: {
    tools: "Dönüştürücüler",
    legal: "Yasal",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    copyright: "ToolPop. Tüm hakları saklıdır.",
    company: "Şirket",
    about: "Hakkımızda",
    contact: "İletişim",
    faq: "FAQ",
  },
  common: {
    backToAll: "Tüm Dönüştürücüler",
    inputPlaceholder: "Dönüştürülecek değeri girin...",
    outputLabel: "Sonuç",
    copyToClipboard: "Kopyala",
    copied: "Kopyalandı!",
    clear: "Temizle",
    paste: "Yapıştır",
    processing: "Dönüştürülüyor...",
    startOver: "Baştan başla",
    process: "Dönüştür",
    tryAgain: "Tekrar dene",
    notImplemented: "Bu dönüştürücü yakında eklenecek.",
    tryOtherTools: "Diğer dönüştürücüleri deneyin",
    privacyBadge: "Tüm dönüşümler tarayıcınızda gerçekleşir",
    favoriteAdded: "Favorilere eklendi",
    favoriteRemoved: "Favorilerden kaldırıldı",
    comingSoon: "Yakında",
    share: "Paylaş",
    shareTitle: "Bu dönüştürücüyü paylaş",
    shareSubtitle: "Bu kullanışlı dönüştürücüyü başkalarıyla paylaşın",
    shareCopied: "Bağlantı kopyalandı!",
    shareCopyLink: "Bağlantıyı kopyala",
    downloadAsFile: "İndir",
    options: "Seçenekler",
    input: "Giriş",
    output: "Çıkış",
    convert: "Dönüştür",
    swap: "Değiştir",
    from: "Kaynak",
    to: "Hedef",
    result: "Sonuç",
    allConversions: "Tüm Dönüşümler",
    details: "Ayrıntılar",
    pageNotFound: "Dönüştürücü bulunamadı",
    goHome: "Tüm dönüştürücülere dön",
  },
  toolOptions: {
    fromUnit: "Kaynak",
    toUnit: "Hedef",
    precision: "Ondalık basamak",
    baseSize: "Temel yazı tipi boyutu (px)",
    parentSize: "Üst eleman yazı tipi boyutu (px)",
    containerWidth: "Kapsayıcı genişliği (px)",
    viewportWidth: "Görünüm alanı genişliği (px)",
    viewportHeight: "Görünüm alanı yüksekliği (px)",
    direction: "Yön",
    mode: "Mod",
    ingredient: "Malzeme",
    water: "Su",
    flour: "Un",
    sugar: "Şeker",
    butter: "Tereyağı",
    rice: "Pirinç",
    milk: "Süt",
    originalServings: "Orijinal porsiyon",
    targetServings: "Hedef porsiyon",
    fromTimezone: "Kaynak saat dilimi",
    toTimezone: "Hedef saat dilimi",
    inputFormat: "Giriş formatı",
    outputFormat: "Çıkış formatı",
    harmony: "Renk uyumu",
    complementary: "Tamamlayıcı",
    triadic: "Üçlü",
    analogous: "Benzer",
    splitComplementary: "Bölünmüş Tamamlayıcı",
    tetradic: "Dörtlü",
    gradientType: "Gradient türü",
    linear: "Doğrusal",
    radial: "Dairesel",
    conic: "Konik",
    gradientAngle: "Açı (deg)",
    rootName: "Kök arayüz adı",
    tableName: "Tablo adı",
    minify: "Küçült",
    beautify: "Biçimlendir",
    colorType: "Bozukluk türü",
    protanopia: "Protanopi (kırmızı yok)",
    deuteranopia: "Deuteranopi (yeşil yok)",
    tritanopia: "Tritanopi (mavi yok)",
    achromatopsia: "Akromatopsi (renk yok)",
    operation: "İşlem",
    difference: "Fark",
    add: "Ekle",
    subtract: "Çıkar",
    amount: "Miktar",
    unit: "Birim",
    days: "Gün",
    weeks: "Hafta",
    months: "Ay",
    years: "Yıl",
    fromBase: "Kaynak taban",
    toBase: "Hedef taban",
    binary: "İkili (2)",
    octal: "Sekizli (8)",
    decimal: "Onlu (10)",
    hexadecimal: "Onaltılı (16)",
    seconds: "Saniye",
    milliseconds: "Milisaniye",
    autoDetect: "Otomatik algıla",
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
    markdown: "Markdown tablosu",
    html: "HTML tablosu",
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
    toRoman: "Sayı → Roma",
    toArabic: "Roma → Sayı",
    toScientific: "Standart → Bilimsel",
    toStandard: "Bilimsel → Standart",
    toFraction: "Ondalık → Kesir",
    toDecimal: "Kesir → Ondalık",
    decimalToPercent: "Ondalık → Yüzde",
    percentToDecimal: "Yüzde → Ondalık",
    fractionToPercent: "Kesir → Yüzde",
    dd: "Ondalık Derece (DD)",
    dms: "Derece Dakika Saniye (DMS)",
    ddm: "Derece Ondalık Dakika (DDM)",
    iso: "ISO 8601",
    us: "US (AA/GG/YYYY)",
    eu: "EU (GG/AA/YYYY)",
    long: "Uzun format",
    short: "Kısa format",
    relative: "Göreceli",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Arka Plan Rengi",
    monochromatic: "Monokromatik",
    timestampToDate: "Zaman Damgası → Tarih",
    dateToTimestamp: "Tarih → Zaman Damgası",
    showDetails: "Ayrıntılı dökümü göster",
    addDays: "Gün ekle",
    subtractDays: "Gün çıkar",
    datetimeHint: "ör. 2024-01-15, 1705312200, now",
    endDate: "Bitiş tarihi",
    today: "Bugün (varsayılan)",
    dateUnit: "Birim",
  },
  statsLabels: {
    lines: "Satır",
    characters: "Karakter",
    rows: "Satır",
    columns: "Sütun",
    elements: "Öğe",
    keys: "Anahtar",
    interfaces: "Arayüz",
    properties: "Özellik",
    originalSize: "Orijinal boyut",
    resultSize: "Sonuç boyutu",
    savings: "Tasarruf",
    ingredients: "Malzeme",
    scaleFactor: "Ölçek faktörü",
    contrastRatio: "Kontrast oranı",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Enlem",
    longitude: "Boylam",
    distanceKm: "Mesafe (km)",
    distanceMi: "Mesafe (mi)",
    years: "Yıl",
    months: "Ay",
    days: "Gün",
  },
  processorMessages: {
    invalidTimezone: "Geçersiz saat dilimi",
    pass: "Geçti", fail: "Kaldı",
    fromNow: "sonra", ago: "önce",
    today: "Bugün", tomorrow: "Yarın", yesterday: "Dün",
    seconds: "saniye", secondsPlural: "saniye",
    minutes: "dakika", minutesPlural: "dakika",
    hours: "saat", hoursPlural: "saat",
    daysUnit: "gün", daysPlural: "gün",
    weeksUnit: "hafta", weeksPlural: "hafta",
    monthsUnit: "ay", monthsPlural: "ay",
    yearsUnit: "yıl", yearsPlural: "yıl",
    gasmark: "Gas Mark",
    veryCool: "Çok Serin", cool: "Serin", moderatelyCool: "Orta Serin",
    moderate: "Orta", moderatelyHot: "Orta Sıcak",
    hot: "Sıcak", veryHot: "Çok Sıcak", extremelyHot: "Aşırı Sıcak",
    original: "Orijinal",
    from: "Kaynak", to: "Hedef",
    totalDays: "Toplam Gün", weeksDays: "Hafta + Gün",
    originalDate: "Başlangıç Tarihi", operationLabel: "İşlem",
    resultDate: "Sonuç Tarihi", dayOfWeek: "Haftanın Günü",
    daysBetween: "Gün Farkı",
    age: "Yaş", totalMonths: "Toplam Ay",
    totalHours: "Toplam Saat", totalMinutes: "Toplam Dakika",
    nextBirthday: "Sonraki Doğum Günü",
    roman: "Roma", arabic: "Arap",
    scientific: "Bilimsel", standard: "Standart", engineering: "Mühendislik",
    fraction: "Kesir", simplified: "Sadeleştirilmiş", percentage: "Yüzde",
    color1: "Renk 1", color2: "Renk 2",
    contrastRatioLabel: "Kontrast Oranı",
    aaNormalText: "AA Normal Metin", aaLargeText: "AA Büyük Metin",
    aaaNormalText: "AAA Normal Metin", aaaLargeText: "AAA Büyük Metin",
    gradientTypeLabel: "Tür", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Ücretsiz Çevrimiçi Dönüştürücüler",
    siteDescription:
      "Birim, renk, veri formatı, tarih ve daha fazlasını dönüştürün. Ücretsiz, hızlı ve güvenli — her şey tarayıcınızda çalışır.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Birim dönüşümleri, veri formatları ve daha fazlası hakkında ipuçları, rehberler ve bilgiler.",
    readMore: "Devamını oku",
    backToBlog: "Bloga dön",
    publishedOn: "Yayın tarihi",
    categoryGuide: "Rehber",
    categoryTips: "İpuçları",
    categoryKnowledge: "Bilgi",
  },
  cookie: {
    message:
      "Deneyiminizi iyileştirmek için çerezler kullanıyoruz. Devam ederek çerez politikamızı kabul etmiş olursunuz.",
    accept: "Kabul et",
    decline: "Reddet",
  },
  unitLabels: {
    length: {
      m: "Metre (m)", km: "Kilometre (km)", cm: "Santimetre (cm)", mm: "Milimetre (mm)",
      mi: "Mil (mi)", yd: "Yarda (yd)", ft: "Feet (ft)", in: "İnç (in)",
      nm: "Deniz Mili (nm)", "\u03BCm": "Mikrometre (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Pound (lb)",
      oz: "Ons (oz)", ton: "Metrik Ton (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Metrekare (m\u00B2)", "km\u00B2": "Kilometrekare (km\u00B2)",
      ha: "Hektar (ha)", acre: "Akre", "ft\u00B2": "Feet Kare (ft\u00B2)",
      "mi\u00B2": "Mil Kare (mi\u00B2)", "yd\u00B2": "Yarda Kare (yd\u00B2)",
      "cm\u00B2": "Santimetrekare (cm\u00B2)",
    },
    volume: {
      L: "Litre (L)", mL: "Mililitre (mL)", gal: "ABD Galonu (gal)",
      "fl oz": "ABD Sıvı Ons (fl oz)", cup: "ABD Fincanı", pt: "ABD Pint (pt)",
      qt: "ABD Quart (qt)", "m\u00B3": "Metreküp (m\u00B3)",
      "cm\u00B3": "Santimetreküp (cm\u00B3)", tbsp: "Yemek Kaşığı (tbsp)", tsp: "Çay Kaşığı (tsp)",
    },
    speed: {
      "m/s": "Metre/sn (m/s)", "km/h": "Kilometre/sa (km/h)", mph: "Mil/sa (mph)",
      kn: "Knot (kn)", "ft/s": "Feet/sn (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisaniye (ms)", s: "Saniye (s)", min: "Dakika (min)", h: "Saat (h)",
      d: "Gün (d)", wk: "Hafta (wk)", mo: "Ay (mo)", yr: "Yıl (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfer (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalori (cal)", kcal: "Kilokalori (kcal)",
      Wh: "Watt-saat (Wh)", kWh: "Kilowatt-saat (kWh)", BTU: "BTU", eV: "Elektronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Beygir gücü (hp)",
      "BTU/h": "BTU/sa", "cal/s": "Kalori/sn",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Derece (\u00B0)", rad: "Radyan (rad)", grad: "Gradyan (grad)",
      turn: "Tur", arcmin: "Yay Dakikası (\u2032)", arcsec: "Yay Saniyesi (\u2033)",
    },
    "data-storage": {
      B: "Bayt (B)", KB: "Kilobayt (KB)", MB: "Megabayt (MB)", GB: "Gigabayt (GB)",
      TB: "Terabayt (TB)", PB: "Petabayt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Fincan", tbsp: "Yemek Kaşığı", tsp: "Çay Kaşığı", mL: "Mililitre (mL)",
      L: "Litre (L)", fl_oz: "Sıvı Ons", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Ons (oz)", lb: "Pound (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Piksel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Piksel (px)", em: "Em (em)" },
    "px-percent": { px: "Piksel (px)", "%": "Yüzde (%)" },
    "css-unit": {
      px: "Piksel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Yüzde (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
