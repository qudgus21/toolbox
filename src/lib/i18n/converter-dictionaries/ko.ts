import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "필요한 모든 변환기를 한곳에서",
    titleAccent: "변환기",
    description:
      "단위, 색상, 데이터 형식, 날짜 등 다양한 변환을 브라우저에서 바로 처리하세요.",
    tabAll: "전체",
    categoryUnit: "단위",
    categoryNumber: "숫자",
    categoryColor: "색상",
    categoryDatetime: "날짜/시간",
    categoryData: "데이터",
    categoryCss: "CSS",
    categoryCooking: "요리",
    categoryGeography: "지리",
    searchPlaceholder: "변환기 검색...",
    noResults: "검색 결과가 없습니다.",
    recentTools: "최근 사용",
    favorites: "즐겨찾기",
    favDragHint: "드래그하여 순서 변경",
    favHint: "별표를 눌러 즐겨찾기에 추가하세요",
    gridView: "격자 보기",
    listView: "목록 보기",
  },
  trust: {
    encryption: "안전한 처리",
    encryptionDesc: "모든 변환은 브라우저에서 직접 처리됩니다",
    autoDelete: "데이터 저장 없음",
    autoDeleteDesc: "입력 데이터는 저장되거나 서버로 전송되지 않습니다",
    free: "완전 무료",
    freeDesc: "사용 제한, 회원가입, 숨은 비용 없음",
    browserProcessing: "즉시 결과 확인",
    browserProcessingDesc: "입력하는 즉시 실시간으로 변환됩니다",
  },
  tools: {
    length: {
      title: "길이 변환기",
      description:
        "미터, 킬로미터, 마일, 피트, 인치 등 다양한 길이 단위를 변환합니다.",
    },
    weight: {
      title: "무게 변환기",
      description:
        "킬로그램, 파운드, 온스, 톤 등 다양한 무게 단위를 변환합니다.",
    },
    temperature: {
      title: "온도 변환기",
      description: "섭씨, 화씨, 켈빈 간 온도를 변환합니다.",
    },
    area: {
      title: "넓이 변환기",
      description:
        "제곱미터, 헥타르, 에이커, 제곱피트, 평 등 넓이 단위를 변환합니다.",
    },
    volume: {
      title: "부피 변환기",
      description:
        "리터, 갤런, 컵, 액량 온스 등 부피 단위를 변환합니다.",
    },
    speed: {
      title: "속도 변환기",
      description: "m/s, km/h, mph, 노트 등 속도 단위를 변환합니다.",
    },
    time: {
      title: "시간 변환기",
      description:
        "초, 분, 시간, 일, 주 등 시간 단위를 변환합니다.",
    },
    pressure: {
      title: "압력 변환기",
      description:
        "파스칼, 바, PSI, 기압 등 압력 단위를 변환합니다.",
    },
    energy: {
      title: "에너지 변환기",
      description:
        "줄, 칼로리, 킬로와트시, BTU 등 에너지 단위를 변환합니다.",
    },
    power: {
      title: "전력 변환기",
      description:
        "와트, 킬로와트, 마력 등 전력 단위를 변환합니다.",
    },
    frequency: {
      title: "주파수 변환기",
      description:
        "헤르츠, 킬로헤르츠, 메가헤르츠, 기가헤르츠, RPM 간 변환합니다.",
    },
    angle: {
      title: "각도 변환기",
      description: "도, 라디안, 그래디언, 회전 간 변환합니다.",
    },
    "data-storage": {
      title: "데이터 용량 변환기",
      description:
        "바이트, 킬로바이트, 메가바이트, 기가바이트 등 저장 용량을 변환합니다.",
    },
    "fuel-economy": {
      title: "연비 변환기",
      description: "km/L, mpg, L/100km 간 연비 단위를 변환합니다.",
    },
    "number-base": {
      title: "진법 변환기",
      description:
        "2진수, 8진수, 10진수, 16진수 등 다양한 진법 간 변환합니다.",
    },
    "roman-numeral": {
      title: "로마 숫자 변환기",
      description: "로마 숫자와 아라비아 숫자를 변환합니다.",
    },
    "scientific-notation": {
      title: "과학적 표기법 변환기",
      description:
        "과학적 표기법과 일반 숫자를 변환합니다.",
    },
    "fraction-decimal": {
      title: "분수 ↔ 소수",
      description: "분수와 소수를 변환합니다.",
    },
    percentage: {
      title: "백분율 변환기",
      description:
        "분수, 소수, 백분율 간 변환합니다.",
    },
    "color-converter": {
      title: "색상 변환기",
      description:
        "HEX, RGB, HSL, HSV, CMYK 등 색상 형식을 변환합니다.",
    },
    "color-palette-generator": {
      title: "색상 팔레트 생성기",
      description:
        "보색, 삼색, 유사색 등 다양한 색상 팔레트를 생성합니다.",
    },
    "gradient-generator": {
      title: "CSS 그라데이션 생성기",
      description:
        "선형, 원형, 원뿔형 CSS 그라데이션을 미리보기와 함께 만들 수 있습니다.",
    },
    "color-contrast-checker": {
      title: "색상 대비 검사기",
      description:
        "두 색상 간 WCAG AA/AAA 대비율을 확인합니다.",
    },
    "color-blindness-simulator": {
      title: "색각 이상 시뮬레이터",
      description:
        "색각 이상이 있는 사람에게 색상이 어떻게 보이는지 시뮬레이션합니다.",
    },
    timezone: {
      title: "시간대 변환기",
      description:
        "전 세계 시간대 간 시간을 변환합니다.",
    },
    "unix-timestamp": {
      title: "Unix 타임스탬프 변환기",
      description:
        "Unix 타임스탬프와 일반 날짜 형식을 변환합니다.",
    },
    "date-format": {
      title: "날짜 형식 변환기",
      description:
        "ISO, US, EU 등 다양한 날짜 형식 간 변환합니다.",
    },
    "date-calculator": {
      title: "날짜 계산기",
      description:
        "두 날짜 사이의 차이를 구하거나, 날짜를 더하고 빼보세요.",
    },
    "age-calculator": {
      title: "나이 계산기",
      description:
        "생년월일로 현재 나이를 년, 월, 일 단위로 계산합니다.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "JSON과 YAML 데이터 형식을 변환합니다.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "JSON 배열과 CSV 스프레드시트 형식을 변환합니다.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "JSON과 XML 데이터 형식을 변환합니다.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "JSON과 TOML 설정 파일 형식을 변환합니다.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Markdown과 HTML 마크업을 변환합니다.",
    },
    "csv-table": {
      title: "CSV → 표 변환",
      description: "CSV 데이터를 Markdown 또는 HTML 표로 변환합니다.",
    },
    "json-typescript": {
      title: "JSON → TypeScript",
      description: "JSON 데이터에서 TypeScript 인터페이스를 생성합니다.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "SQL INSERT 문과 JSON 데이터를 변환합니다.",
    },
    "px-rem": {
      title: "px ↔ rem 변환기",
      description:
        "픽셀과 rem 단위를 기본 글꼴 크기 기준으로 변환합니다.",
    },
    "px-em": {
      title: "px ↔ em 변환기",
      description:
        "픽셀과 em 단위를 부모 글꼴 크기 기준으로 변환합니다.",
    },
    "px-percent": {
      title: "px ↔ % 변환기",
      description:
        "픽셀과 백분율을 컨테이너 너비 기준으로 변환합니다.",
    },
    "css-unit": {
      title: "CSS 단위 변환기",
      description:
        "px, rem, em, %, vw, vh 등 CSS 단위를 변환합니다.",
    },
    "css-minifier": {
      title: "CSS 압축 / 정리",
      description:
        "CSS 코드를 압축하거나 보기 좋게 정리합니다.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tailwind CSS 클래스와 일반 CSS를 변환합니다.",
    },
    "cooking-measurement": {
      title: "요리 계량 변환기",
      description:
        "컵, 큰술, 작은술, 밀리리터, 그램 등 계량 단위를 변환합니다.",
    },
    "recipe-scaler": {
      title: "레시피 인분 조절기",
      description:
        "인분 수에 맞춰 재료 양을 늘리거나 줄여보세요.",
    },
    "oven-temperature": {
      title: "오븐 온도 변환기",
      description:
        "섭씨, 화씨, 가스 마크 간 오븐 온도를 변환합니다.",
    },
    coordinate: {
      title: "좌표 변환기",
      description:
        "DMS, DD, DDM 등 좌표 형식을 변환합니다.",
    },
    "distance-calculator": {
      title: "거리 계산기",
      description:
        "두 지리 좌표 사이의 거리를 계산합니다.",
    },
  },
  nav: {
    allTools: "전체 변환 도구",
    language: "언어",
  },
  footer: {
    tools: "변환기",
    legal: "법적 고지",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    copyright: "ToolPop. All rights reserved.",
    company: "회사",
    about: "소개",
    contact: "문의",
    faq: "자주 묻는 질문",
  },
  common: {
    backToAll: "전체 변환기",
    inputPlaceholder: "변환할 값을 입력하세요...",
    outputLabel: "결과",
    copyToClipboard: "클립보드에 복사",
    copied: "복사됨!",
    clear: "지우기",
    paste: "붙여넣기",
    processing: "변환 중...",
    startOver: "처음부터",
    process: "변환",
    tryAgain: "다시 시도",
    notImplemented: "이 변환기는 준비 중입니다.",
    tryOtherTools: "다른 변환기 둘러보기",
    privacyBadge: "모든 변환은 브라우저에서 처리됩니다",
    favoriteAdded: "즐겨찾기에 추가됨",
    favoriteRemoved: "즐겨찾기에서 제거됨",
    comingSoon: "준비 중",
    share: "공유",
    shareTitle: "이 변환기 공유하기",
    shareSubtitle: "유용한 변환기를 다른 사람과 공유하세요",
    shareCopied: "링크 복사됨!",
    shareCopyLink: "링크 복사",
    downloadAsFile: "다운로드",
    options: "옵션",
    input: "입력",
    output: "출력",
    convert: "변환",
    swap: "바꾸기",
    from: "변환 전",
    to: "변환 후",
    result: "결과",
    allConversions: "전체 변환 결과",
    details: "상세 정보",
    pageNotFound: "변환기를 찾을 수 없습니다",
    goHome: "전체 변환기로 돌아가기",
  },
  toolOptions: {
    fromUnit: "변환 전",
    toUnit: "변환 후",
    precision: "소수점 자릿수",
    baseSize: "기본 글꼴 크기 (px)",
    parentSize: "부모 글꼴 크기 (px)",
    containerWidth: "컨테이너 너비 (px)",
    viewportWidth: "뷰포트 너비 (px)",
    viewportHeight: "뷰포트 높이 (px)",
    direction: "방향",
    mode: "모드",
    ingredient: "재료",
    water: "물",
    flour: "밀가루",
    sugar: "설탕",
    butter: "버터",
    rice: "쌀",
    milk: "우유",
    originalServings: "기존 인분",
    targetServings: "변경 인분",
    fromTimezone: "기준 시간대",
    toTimezone: "변환 시간대",
    inputFormat: "입력 형식",
    outputFormat: "출력 형식",
    harmony: "색상 조화",
    complementary: "보색",
    triadic: "삼색",
    analogous: "유사색",
    splitComplementary: "분리 보색",
    tetradic: "사색",
    gradientType: "그라데이션 유형",
    linear: "선형",
    radial: "원형",
    conic: "원뿔형",
    gradientAngle: "각도 (deg)",
    rootName: "루트 인터페이스 이름",
    tableName: "테이블 이름",
    minify: "압축",
    beautify: "정리",
    colorType: "색각 이상 유형",
    protanopia: "적색맹 (빨강 인식 불가)",
    deuteranopia: "녹색맹 (초록 인식 불가)",
    tritanopia: "청색맹 (파랑 인식 불가)",
    achromatopsia: "전색맹 (색 인식 불가)",
    operation: "연산",
    difference: "차이",
    add: "더하기",
    subtract: "빼기",
    amount: "양",
    unit: "단위",
    days: "일",
    weeks: "주",
    months: "개월",
    years: "년",
    fromBase: "변환 전 진법",
    toBase: "변환 후 진법",
    binary: "2진수",
    octal: "8진수",
    decimal: "10진수",
    hexadecimal: "16진수",
    seconds: "초",
    milliseconds: "밀리초",
    autoDetect: "자동 감지",
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
    markdown: "Markdown 표",
    html: "HTML 표",
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
    toRoman: "숫자 → 로마 숫자",
    toArabic: "로마 숫자 → 숫자",
    toScientific: "일반 → 과학적 표기법",
    toStandard: "과학적 표기법 → 일반",
    toFraction: "소수 → 분수",
    toDecimal: "분수 → 소수",
    decimalToPercent: "소수 → 백분율",
    percentToDecimal: "백분율 → 소수",
    fractionToPercent: "분수 → 백분율",
    dd: "십진 도 (DD)",
    dms: "도분초 (DMS)",
    ddm: "도십진분 (DDM)",
    iso: "ISO 8601",
    us: "미국식 (MM/DD/YYYY)",
    eu: "유럽식 (DD/MM/YYYY)",
    long: "긴 형식",
    short: "짧은 형식",
    relative: "상대 형식",
    celsius: "섭씨 (°C)",
    fahrenheit: "화씨 (°F)",
    gasmark: "가스 마크",
    backgroundColor: "배경색",
    monochromatic: "단색",
    timestampToDate: "타임스탬프 → 날짜",
    dateToTimestamp: "날짜 → 타임스탬프",
    showDetails: "상세 내역 표시",
    addDays: "날짜 더하기",
    subtractDays: "날짜 빼기",
    datetimeHint: "예: 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "줄 수",
    characters: "글자 수",
    rows: "행",
    columns: "열",
    elements: "요소",
    keys: "키",
    interfaces: "인터페이스",
    properties: "속성",
    originalSize: "원본 크기",
    resultSize: "결과 크기",
    savings: "절감량",
    ingredients: "재료",
    scaleFactor: "배율",
    contrastRatio: "대비율",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "위도",
    longitude: "경도",
    distanceKm: "거리 (km)",
    distanceMi: "거리 (mi)",
    years: "년",
    months: "개월",
    days: "일",
  },
  processorMessages: {
    invalidTimezone: "잘못된 시간대",
    pass: "통과",
    fail: "실패",
    fromNow: "후",
    ago: "전",
    today: "오늘",
    tomorrow: "내일",
    yesterday: "어제",
    seconds: "초",
    secondsPlural: "초",
    minutes: "분",
    minutesPlural: "분",
    hours: "시간",
    hoursPlural: "시간",
    daysUnit: "일",
    daysPlural: "일",
    weeksUnit: "주",
    weeksPlural: "주",
    monthsUnit: "개월",
    monthsPlural: "개월",
    yearsUnit: "년",
    yearsPlural: "년",
    gasmark: "가스 마크",
    veryCool: "매우 낮음",
    cool: "낮음",
    moderatelyCool: "약간 낮음",
    moderate: "보통",
    moderatelyHot: "약간 높음",
    hot: "높음",
    veryHot: "매우 높음",
    extremelyHot: "극고온",
    original: "원본",
    from: "시작",
    to: "종료",
    totalDays: "총 일수",
    weeksDays: "주 + 일",
    originalDate: "기준 날짜",
    operationLabel: "연산",
    resultDate: "결과 날짜",
    dayOfWeek: "요일",
    daysBetween: "일수 차이",
    age: "나이",
    totalMonths: "총 개월 수",
    totalHours: "총 시간",
    totalMinutes: "총 분",
    nextBirthday: "다음 생일",
    roman: "로마 숫자",
    arabic: "아라비아 숫자",
    scientific: "과학적 표기법",
    standard: "일반 표기법",
    engineering: "공학적 표기법",
    fraction: "분수",
    simplified: "기약분수",
    percentage: "백분율",
    color1: "색상 1",
    color2: "색상 2",
    contrastRatioLabel: "대비율",
    aaNormalText: "AA 일반 텍스트",
    aaLargeText: "AA 큰 텍스트",
    aaaNormalText: "AAA 일반 텍스트",
    aaaLargeText: "AAA 큰 텍스트",
    gradientTypeLabel: "유형",
    gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop 변환기 — 무료 온라인 변환 도구",
    siteDescription:
      "단위, 색상, 데이터 형식, 날짜 등 다양한 변환을 지원합니다. 브라우저에서 바로 처리되어 빠르고 안전합니다.",
    toolTitleSuffix: "| ToolPop 변환기",
  },
  blog: {
    title: "블로그",
    description:
      "단위 변환, 데이터 형식 등에 관한 팁, 가이드, 지식을 소개합니다.",
    readMore: "자세히 보기",
    backToBlog: "블로그로 돌아가기",
    publishedOn: "게시일",
    categoryGuide: "가이드",
    categoryTips: "팁",
    categoryKnowledge: "지식",
  },
  cookie: {
    message:
      "더 나은 사용 경험을 위해 쿠키를 사용합니다. 계속 이용하시면 쿠키 정책에 동의하는 것으로 간주됩니다.",
    accept: "동의",
    decline: "거부",
  },
  unitLabels: {
    length: {
      m: "미터 (m)", km: "킬로미터 (km)", cm: "센티미터 (cm)", mm: "밀리미터 (mm)",
      mi: "마일 (mi)", yd: "야드 (yd)", ft: "피트 (ft)", in: "인치 (in)",
      nm: "해리 (nm)", "\u03BCm": "마이크로미터 (\u03BCm)",
    },
    weight: {
      kg: "킬로그램 (kg)", g: "그램 (g)", mg: "밀리그램 (mg)", lb: "파운드 (lb)",
      oz: "온스 (oz)", ton: "톤 (t)", st: "스톤 (st)", ct: "캐럿 (ct)",
    },
    temperature: {
      C: "섭씨 (\u00B0C)", F: "화씨 (\u00B0F)", K: "켈빈 (K)",
    },
    area: {
      "m\u00B2": "제곱미터 (m\u00B2)", "km\u00B2": "제곱킬로미터 (km\u00B2)",
      ha: "헥타르 (ha)", acre: "에이커", "ft\u00B2": "제곱피트 (ft\u00B2)",
      "mi\u00B2": "제곱마일 (mi\u00B2)", "yd\u00B2": "제곱야드 (yd\u00B2)",
      "cm\u00B2": "제곱센티미터 (cm\u00B2)",
    },
    volume: {
      L: "리터 (L)", mL: "밀리리터 (mL)", gal: "갤런 (gal)",
      "fl oz": "액량 온스 (fl oz)", cup: "컵", pt: "파인트 (pt)",
      qt: "쿼트 (qt)", "m\u00B3": "세제곱미터 (m\u00B3)",
      "cm\u00B3": "세제곱센티미터 (cm\u00B3)", tbsp: "큰술 (tbsp)", tsp: "작은술 (tsp)",
    },
    speed: {
      "m/s": "초속 (m/s)", "km/h": "시속 (km/h)", mph: "마일/시 (mph)",
      kn: "노트 (kn)", "ft/s": "피트/초 (ft/s)", mach: "마하",
    },
    time: {
      ms: "밀리초 (ms)", s: "초 (s)", min: "분 (min)", h: "시간 (h)",
      d: "일 (d)", wk: "주 (wk)", mo: "월 (mo)", yr: "년 (yr)",
    },
    pressure: {
      Pa: "파스칼 (Pa)", kPa: "킬로파스칼 (kPa)", bar: "바 (bar)", psi: "PSI",
      atm: "기압 (atm)", torr: "토르 (torr)", mmHg: "수은주밀리미터 (mmHg)",
    },
    energy: {
      J: "줄 (J)", kJ: "킬로줄 (kJ)", cal: "칼로리 (cal)", kcal: "킬로칼로리 (kcal)",
      Wh: "와트시 (Wh)", kWh: "킬로와트시 (kWh)", BTU: "BTU", eV: "전자볼트 (eV)",
    },
    power: {
      W: "와트 (W)", kW: "킬로와트 (kW)", MW: "메가와트 (MW)", hp: "마력 (hp)",
      "BTU/h": "BTU/시", "cal/s": "칼로리/초",
    },
    frequency: {
      Hz: "헤르츠 (Hz)", kHz: "킬로헤르츠 (kHz)", MHz: "메가헤르츠 (MHz)",
      GHz: "기가헤르츠 (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "도 (\u00B0)", rad: "라디안 (rad)", grad: "그래디언 (grad)",
      turn: "회전", arcmin: "분 (\u2032)", arcsec: "초 (\u2033)",
    },
    "data-storage": {
      B: "바이트 (B)", KB: "킬로바이트 (KB)", MB: "메가바이트 (MB)", GB: "기가바이트 (GB)",
      TB: "테라바이트 (TB)", PB: "페타바이트 (PB)", bit: "비트",
      Kbit: "킬로비트", Mbit: "메가비트", Gbit: "기가비트",
    },
    "fuel-economy": {
      "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km",
    },
    "cooking-measurement": {
      cup: "컵", tbsp: "큰술", tsp: "작은술", mL: "밀리리터 (mL)",
      L: "리터 (L)", fl_oz: "액량 온스", g: "그램 (g)", kg: "킬로그램 (kg)",
      oz: "온스 (oz)", lb: "파운드 (lb)",
    },
    "oven-temperature": {
      C: "섭씨 (\u00B0C)", F: "화씨 (\u00B0F)", gasmark: "가스 마크",
    },
    "px-rem": { px: "픽셀 (px)", rem: "루트 Em (rem)" },
    "px-em": { px: "픽셀 (px)", em: "Em (em)" },
    "px-percent": { px: "픽셀 (px)", "%": "백분율 (%)" },
    "css-unit": {
      px: "픽셀 (px)", rem: "루트 Em (rem)", em: "Em (em)",
      "%": "백분율 (%)", vw: "뷰포트 너비 (vw)", vh: "뷰포트 높이 (vh)",
    },
  },
};

export default dict;
