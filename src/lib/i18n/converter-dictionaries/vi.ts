import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Mọi công cụ chuyển đổi bạn cần",
    titleAccent: "chuyển đổi",
    description:
      "Chuyển đổi đơn vị, màu sắc, định dạng, ngày tháng. Tất cả xử lý ngay trên trình duyệt.",
    tabAll: "Tất cả",
    categoryUnit: "Đơn vị",
    categoryNumber: "Số",
    categoryColor: "Màu sắc",
    categoryDatetime: "Ngày/Giờ",
    categoryData: "Dữ liệu",
    categoryCss: "CSS",
    categoryCooking: "Nấu ăn",
    categoryGeography: "Địa lý",
    searchPlaceholder: "Tìm công cụ chuyển đổi...",
    noResults: "Không tìm thấy công cụ nào.",
    recentTools: "Dùng gần đây",
    favorites: "Yêu thích",
    favDragHint: "Kéo để sắp xếp lại",
    favHint: "Nhấn vào ngôi sao để thêm yêu thích",
    gridView: "Dạng lưới",
    listView: "Dạng danh sách",
  },
  trust: {
    encryption: "Xử lý an toàn",
    encryptionDesc: "Mọi chuyển đổi đều thực hiện ngay trên trình duyệt của bạn",
    autoDelete: "Không lưu dữ liệu",
    autoDeleteDesc: "Dữ liệu bạn nhập không bao giờ được lưu hay gửi đến máy chủ",
    free: "Hoàn toàn miễn phí",
    freeDesc: "Không giới hạn, không cần đăng ký, không phí ẩn",
    browserProcessing: "Kết quả tức thì",
    browserProcessingDesc: "Chuyển đổi theo thời gian thực khi bạn nhập",
  },
  tools: {
    length: {
      title: "Chuyển đổi chiều dài",
      description:
        "Chuyển đổi giữa mét, kilômét, dặm, feet, inch và nhiều đơn vị khác.",
    },
    weight: {
      title: "Chuyển đổi khối lượng",
      description:
        "Chuyển đổi giữa kilôgam, pound, ounce, tấn và nhiều đơn vị khác.",
    },
    temperature: {
      title: "Chuyển đổi nhiệt độ",
      description: "Chuyển đổi giữa Celsius, Fahrenheit và Kelvin.",
    },
    area: {
      title: "Chuyển đổi diện tích",
      description:
        "Chuyển đổi giữa mét vuông, héc-ta, mẫu Anh, feet vuông và nhiều đơn vị khác.",
    },
    volume: {
      title: "Chuyển đổi thể tích",
      description:
        "Chuyển đổi giữa lít, gallon, cốc, ounce lỏng và nhiều đơn vị khác.",
    },
    speed: {
      title: "Chuyển đổi tốc độ",
      description: "Chuyển đổi giữa m/s, km/h, mph, hải lý/giờ và nhiều đơn vị khác.",
    },
    time: {
      title: "Chuyển đổi thời gian",
      description:
        "Chuyển đổi giữa giây, phút, giờ, ngày, tuần và nhiều đơn vị khác.",
    },
    pressure: {
      title: "Chuyển đổi áp suất",
      description:
        "Chuyển đổi giữa Pascal, bar, PSI, atmosphere và nhiều đơn vị khác.",
    },
    energy: {
      title: "Chuyển đổi năng lượng",
      description:
        "Chuyển đổi giữa joule, calorie, kilowatt-giờ, BTU và nhiều đơn vị khác.",
    },
    power: {
      title: "Chuyển đổi công suất",
      description:
        "Chuyển đổi giữa watt, kilowatt, mã lực và nhiều đơn vị khác.",
    },
    frequency: {
      title: "Chuyển đổi tần số",
      description:
        "Chuyển đổi giữa hertz, kilohertz, megahertz, gigahertz và RPM.",
    },
    angle: {
      title: "Chuyển đổi góc",
      description: "Chuyển đổi giữa độ, radian, gradian và vòng.",
    },
    "data-storage": {
      title: "Chuyển đổi dung lượng",
      description:
        "Chuyển đổi giữa byte, kilobyte, megabyte, gigabyte và nhiều đơn vị khác.",
    },
    "fuel-economy": {
      title: "Chuyển đổi mức tiêu thụ nhiên liệu",
      description: "Chuyển đổi giữa km/L, mpg và L/100km.",
    },
    "number-base": {
      title: "Chuyển đổi hệ cơ số",
      description:
        "Chuyển đổi giữa nhị phân, bát phân, thập phân, thập lục phân và các hệ khác.",
    },
    "roman-numeral": {
      title: "Chuyển đổi số La Mã",
      description: "Chuyển đổi giữa số La Mã và số Ả Rập.",
    },
    "scientific-notation": {
      title: "Ký hiệu khoa học",
      description:
        "Chuyển đổi giữa ký hiệu khoa học và số thông thường.",
    },
    "fraction-decimal": {
      title: "Phân số ↔ Thập phân",
      description: "Chuyển đổi giữa phân số và số thập phân.",
    },
    percentage: {
      title: "Chuyển đổi phần trăm",
      description:
        "Chuyển đổi giữa phân số, số thập phân và phần trăm.",
    },
    "color-converter": {
      title: "Chuyển đổi màu",
      description:
        "Chuyển đổi giữa các định dạng màu HEX, RGB, HSL, HSV và CMYK.",
    },
    "color-palette-generator": {
      title: "Tạo bảng màu",
      description:
        "Tạo bảng màu bổ sung, tam giác và tương tự.",
    },
    "gradient-generator": {
      title: "Tạo gradient CSS",
      description:
        "Tạo gradient CSS tuyến tính, hướng tâm và hình nón với xem trước trực tiếp.",
    },
    "color-contrast-checker": {
      title: "Kiểm tra độ tương phản",
      description:
        "Kiểm tra tỷ lệ tương phản WCAG AA/AAA giữa hai màu.",
    },
    "color-blindness-simulator": {
      title: "Mô phỏng mù màu",
      description:
        "Mô phỏng cách người bị rối loạn sắc giác nhìn thấy màu sắc.",
    },
    timezone: {
      title: "Chuyển đổi múi giờ",
      description:
        "Chuyển đổi thời gian giữa các múi giờ trên toàn thế giới.",
    },
    "unix-timestamp": {
      title: "Chuyển đổi Unix Timestamp",
      description:
        "Chuyển đổi giữa Unix timestamp và ngày tháng dễ đọc.",
    },
    "date-format": {
      title: "Chuyển đổi định dạng ngày",
      description:
        "Chuyển đổi ngày giữa các định dạng ISO, US, EU và nhiều hơn nữa.",
    },
    "date-calculator": {
      title: "Máy tính ngày tháng",
      description:
        "Tính khoảng cách giữa hai ngày hoặc cộng/trừ ngày.",
    },
    "age-calculator": {
      title: "Tính tuổi",
      description:
        "Tính tuổi chính xác từ ngày sinh theo năm, tháng và ngày.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Chuyển đổi giữa định dạng JSON và YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Chuyển đổi giữa mảng JSON và định dạng bảng tính CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Chuyển đổi giữa định dạng JSON và XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Chuyển đổi giữa định dạng cấu hình JSON và TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Chuyển đổi giữa Markdown và HTML.",
    },
    "csv-table": {
      title: "CSV sang bảng",
      description: "Chuyển đổi dữ liệu CSV thành bảng Markdown hoặc HTML.",
    },
    "json-typescript": {
      title: "JSON sang TypeScript",
      description: "Tạo interface TypeScript từ dữ liệu JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Chuyển đổi giữa câu lệnh SQL INSERT và dữ liệu JSON.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Chuyển đổi giữa pixel và rem với kích thước cơ sở tùy chỉnh.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Chuyển đổi giữa pixel và em với kích thước phần tử cha tùy chỉnh.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Chuyển đổi giữa pixel và phần trăm với chiều rộng container tùy chỉnh.",
    },
    "css-unit": {
      title: "Chuyển đổi đơn vị CSS",
      description:
        "Chuyển đổi giữa px, rem, em, %, vw, vh và các đơn vị CSS khác.",
    },
    "css-minifier": {
      title: "Nén / Làm đẹp CSS",
      description:
        "Nén hoặc làm đẹp mã CSS cho production hoặc dễ đọc.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Chuyển đổi giữa class Tailwind CSS và CSS thuần.",
    },
    "cooking-measurement": {
      title: "Đo lường nấu ăn",
      description:
        "Chuyển đổi giữa cốc, muỗng canh, muỗng cà phê, mililít và gam.",
    },
    "recipe-scaler": {
      title: "Điều chỉnh công thức",
      description:
        "Tăng hoặc giảm nguyên liệu theo số khẩu phần.",
    },
    "oven-temperature": {
      title: "Nhiệt độ lò nướng",
      description:
        "Chuyển đổi nhiệt độ lò nướng giữa Celsius, Fahrenheit và Gas Mark.",
    },
    coordinate: {
      title: "Chuyển đổi tọa độ",
      description:
        "Chuyển đổi giữa các định dạng tọa độ DMS, DD và DDM.",
    },
    "distance-calculator": {
      title: "Tính khoảng cách",
      description:
        "Tính khoảng cách giữa hai tọa độ địa lý.",
    },
  },
  nav: {
    allTools: "Tất cả công cụ chuyển đổi",
    language: "Ngôn ngữ",
  },
  footer: {
    tools: "Công cụ chuyển đổi",
    legal: "Pháp lý",
    privacy: "Chính sách bảo mật",
    terms: "Điều khoản sử dụng",
    copyright: "ToolPop. Mọi quyền được bảo lưu.",
    company: "Công ty",
    about: "Giới thiệu",
    contact: "Liên hệ",
    faq: "FAQ",
  },
  common: {
    backToAll: "Tất cả công cụ chuyển đổi",
    inputPlaceholder: "Nhập giá trị cần chuyển đổi...",
    outputLabel: "Kết quả",
    copyToClipboard: "Sao chép",
    copied: "Đã sao chép!",
    clear: "Xóa",
    paste: "Dán",
    processing: "Đang chuyển đổi...",
    startOver: "Làm lại",
    process: "Chuyển đổi",
    tryAgain: "Thử lại",
    notImplemented: "Công cụ này sắp ra mắt.",
    tryOtherTools: "Thử công cụ khác",
    privacyBadge: "Mọi chuyển đổi đều thực hiện trên trình duyệt của bạn",
    favoriteAdded: "Đã thêm vào yêu thích",
    favoriteRemoved: "Đã xóa khỏi yêu thích",
    comingSoon: "Sắp ra mắt",
    share: "Chia sẻ",
    shareTitle: "Chia sẻ công cụ này",
    shareSubtitle: "Chia sẻ công cụ hữu ích này với mọi người",
    shareCopied: "Đã sao chép liên kết!",
    shareCopyLink: "Sao chép liên kết",
    downloadAsFile: "Tải xuống",
    options: "Tùy chọn",
    input: "Đầu vào",
    output: "Đầu ra",
    convert: "Chuyển đổi",
    swap: "Đảo",
    from: "Từ",
    to: "Sang",
    result: "Kết quả",
    allConversions: "Tất cả chuyển đổi",
    details: "Chi tiết",
    pageNotFound: "Không tìm thấy công cụ",
    goHome: "Về trang chủ",
  },
  toolOptions: {
    fromUnit: "Từ",
    toUnit: "Sang",
    precision: "Số thập phân",
    baseSize: "Cỡ chữ cơ sở (px)",
    parentSize: "Cỡ chữ phần tử cha (px)",
    containerWidth: "Chiều rộng container (px)",
    viewportWidth: "Chiều rộng viewport (px)",
    viewportHeight: "Chiều cao viewport (px)",
    direction: "Hướng",
    mode: "Chế độ",
    ingredient: "Nguyên liệu",
    water: "Nước",
    flour: "Bột mì",
    sugar: "Đường",
    butter: "Bơ",
    rice: "Gạo",
    milk: "Sữa",
    originalServings: "Khẩu phần gốc",
    targetServings: "Khẩu phần mong muốn",
    fromTimezone: "Từ múi giờ",
    toTimezone: "Sang múi giờ",
    inputFormat: "Định dạng đầu vào",
    outputFormat: "Định dạng đầu ra",
    harmony: "Hòa sắc",
    complementary: "Bổ sung",
    triadic: "Tam giác",
    analogous: "Tương tự",
    splitComplementary: "Bổ sung tách",
    tetradic: "Tứ giác",
    gradientType: "Loại gradient",
    linear: "Tuyến tính",
    radial: "Hướng tâm",
    conic: "Hình nón",
    gradientAngle: "Góc (deg)",
    rootName: "Tên interface gốc",
    tableName: "Tên bảng",
    minify: "Nén",
    beautify: "Làm đẹp",
    colorType: "Loại rối loạn",
    protanopia: "Protanopia (không thấy đỏ)",
    deuteranopia: "Deuteranopia (không thấy xanh lá)",
    tritanopia: "Tritanopia (không thấy xanh dương)",
    achromatopsia: "Achromatopsia (không thấy màu)",
    operation: "Phép tính",
    difference: "Hiệu",
    add: "Cộng",
    subtract: "Trừ",
    amount: "Số lượng",
    unit: "Đơn vị",
    days: "Ngày",
    weeks: "Tuần",
    months: "Tháng",
    years: "Năm",
    fromBase: "Từ hệ cơ số",
    toBase: "Sang hệ cơ số",
    binary: "Nhị phân (2)",
    octal: "Bát phân (8)",
    decimal: "Thập phân (10)",
    hexadecimal: "Thập lục phân (16)",
    seconds: "Giây",
    milliseconds: "Mili giây",
    autoDetect: "Tự nhận diện",
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
    markdown: "Bảng Markdown",
    html: "Bảng HTML",
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
    toRoman: "Số → La Mã",
    toArabic: "La Mã → Số",
    toScientific: "Thường → Khoa học",
    toStandard: "Khoa học → Thường",
    toFraction: "Thập phân → Phân số",
    toDecimal: "Phân số → Thập phân",
    decimalToPercent: "Thập phân → Phần trăm",
    percentToDecimal: "Phần trăm → Thập phân",
    fractionToPercent: "Phân số → Phần trăm",
    dd: "Độ thập phân (DD)",
    dms: "Độ phút giây (DMS)",
    ddm: "Độ phút thập phân (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Dạng đầy đủ",
    short: "Dạng ngắn",
    relative: "Tương đối",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Màu nền",
    monochromatic: "Đơn sắc",
    timestampToDate: "Timestamp → Ngày",
    dateToTimestamp: "Ngày → Timestamp",
    showDetails: "Hiển thị chi tiết",
    addDays: "Cộng ngày",
    subtractDays: "Trừ ngày",
    datetimeHint: "VD: 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "Dòng",
    characters: "Ký tự",
    rows: "Hàng",
    columns: "Cột",
    elements: "Phần tử",
    keys: "Khóa",
    interfaces: "Giao diện",
    properties: "Thuộc tính",
    originalSize: "Kích thước gốc",
    resultSize: "Kích thước kết quả",
    savings: "Tiết kiệm",
    ingredients: "Nguyên liệu",
    scaleFactor: "Hệ số",
    contrastRatio: "Tỷ lệ tương phản",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Vĩ độ",
    longitude: "Kinh độ",
    distanceKm: "Khoảng cách (km)",
    distanceMi: "Khoảng cách (mi)",
    years: "Năm",
    months: "Tháng",
    days: "Ngày",
  },
  processorMessages: {
    invalidTimezone: "Múi giờ không hợp lệ",
    pass: "Đạt", fail: "Không đạt",
    fromNow: "nữa", ago: "trước",
    today: "Hôm nay", tomorrow: "Ngày mai", yesterday: "Hôm qua",
    seconds: "giây", secondsPlural: "giây",
    minutes: "phút", minutesPlural: "phút",
    hours: "giờ", hoursPlural: "giờ",
    daysUnit: "ngày", daysPlural: "ngày",
    weeksUnit: "tuần", weeksPlural: "tuần",
    monthsUnit: "tháng", monthsPlural: "tháng",
    yearsUnit: "năm", yearsPlural: "năm",
    gasmark: "Gas Mark",
    veryCool: "Rất mát", cool: "Mát", moderatelyCool: "Hơi mát",
    moderate: "Vừa phải", moderatelyHot: "Hơi nóng",
    hot: "Nóng", veryHot: "Rất nóng", extremelyHot: "Cực nóng",
    original: "Gốc",
    from: "Từ", to: "Sang",
    totalDays: "Tổng số ngày", weeksDays: "Tuần + Ngày",
    originalDate: "Ngày gốc", operationLabel: "Phép tính",
    resultDate: "Ngày kết quả", dayOfWeek: "Thứ trong tuần",
    daysBetween: "Số ngày chênh lệch",
    age: "Tuổi", totalMonths: "Tổng số tháng",
    totalHours: "Tổng số giờ", totalMinutes: "Tổng số phút",
    nextBirthday: "Sinh nhật tiếp theo",
    roman: "La Mã", arabic: "Ả Rập",
    scientific: "Khoa học", standard: "Tiêu chuẩn", engineering: "Kỹ thuật",
    fraction: "Phân số", simplified: "Rút gọn", percentage: "Phần trăm",
    color1: "Màu 1", color2: "Màu 2",
    contrastRatioLabel: "Tỷ lệ tương phản",
    aaNormalText: "AA Văn bản thường", aaLargeText: "AA Văn bản lớn",
    aaaNormalText: "AAA Văn bản thường", aaaLargeText: "AAA Văn bản lớn",
    gradientTypeLabel: "Loại", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Công cụ chuyển đổi trực tuyến miễn phí",
    siteDescription:
      "Chuyển đổi đơn vị, màu sắc, định dạng dữ liệu, ngày tháng và nhiều hơn nữa. Miễn phí, nhanh chóng và riêng tư — tất cả chạy trên trình duyệt.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Mẹo, hướng dẫn và kiến thức về chuyển đổi đơn vị, định dạng dữ liệu và nhiều hơn nữa.",
    readMore: "Đọc thêm",
    backToBlog: "Quay lại Blog",
    publishedOn: "Ngày đăng",
    categoryGuide: "Hướng dẫn",
    categoryTips: "Mẹo",
    categoryKnowledge: "Kiến thức",
  },
  cookie: {
    message:
      "Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn. Tiếp tục sử dụng đồng nghĩa với việc bạn đồng ý chính sách cookie.",
    accept: "Đồng ý",
    decline: "Từ chối",
  },
  unitLabels: {
    length: {
      m: "Mét (m)", km: "Kilômét (km)", cm: "Xentimét (cm)", mm: "Milimét (mm)",
      mi: "Dặm (mi)", yd: "Yard (yd)", ft: "Feet (ft)", in: "Inch (in)",
      nm: "Hải lý (nm)", "\u03BCm": "Micrômét (\u03BCm)",
    },
    weight: {
      kg: "Kilôgam (kg)", g: "Gam (g)", mg: "Miligam (mg)", lb: "Pound (lb)",
      oz: "Ounce (oz)", ton: "Tấn (t)", st: "Stone (st)", ct: "Carat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Mét vuông (m\u00B2)", "km\u00B2": "Kilômét vuông (km\u00B2)",
      ha: "Héc-ta (ha)", acre: "Mẫu Anh", "ft\u00B2": "Feet vuông (ft\u00B2)",
      "mi\u00B2": "Dặm vuông (mi\u00B2)", "yd\u00B2": "Yard vuông (yd\u00B2)",
      "cm\u00B2": "Xentimét vuông (cm\u00B2)",
    },
    volume: {
      L: "Lít (L)", mL: "Mililít (mL)", gal: "Gallon US (gal)",
      "fl oz": "Ounce lỏng US (fl oz)", cup: "Cốc US", pt: "Pint US (pt)",
      qt: "Quart US (qt)", "m\u00B3": "Mét khối (m\u00B3)",
      "cm\u00B3": "Xentimét khối (cm\u00B3)", tbsp: "Muỗng canh (tbsp)", tsp: "Muỗng cà phê (tsp)",
    },
    speed: {
      "m/s": "Mét/giây (m/s)", "km/h": "Kilômét/giờ (km/h)", mph: "Dặm/giờ (mph)",
      kn: "Hải lý/giờ (kn)", "ft/s": "Feet/giây (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Mili giây (ms)", s: "Giây (s)", min: "Phút (min)", h: "Giờ (h)",
      d: "Ngày (d)", wk: "Tuần (wk)", mo: "Tháng (mo)", yr: "Năm (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosphere (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Calorie (cal)", kcal: "Kilocalorie (kcal)",
      Wh: "Watt-giờ (Wh)", kWh: "Kilowatt-giờ (kWh)", BTU: "BTU", eV: "Electronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Megawatt (MW)", hp: "Mã lực (hp)",
      "BTU/h": "BTU/giờ", "cal/s": "Calorie/giây",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Độ (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Vòng", arcmin: "Phút cung (\u2032)", arcsec: "Giây cung (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Cốc", tbsp: "Muỗng canh", tsp: "Muỗng cà phê", mL: "Mililít (mL)",
      L: "Lít (L)", fl_oz: "Ounce lỏng", g: "Gam (g)", kg: "Kilôgam (kg)",
      oz: "Ounce (oz)", lb: "Pound (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixel (px)", em: "Em (em)" },
    "px-percent": { px: "Pixel (px)", "%": "Phần trăm (%)" },
    "css-unit": {
      px: "Pixel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Phần trăm (%)", vw: "Chiều rộng viewport (vw)", vh: "Chiều cao viewport (vh)",
    },
  },
};

export default dict;
