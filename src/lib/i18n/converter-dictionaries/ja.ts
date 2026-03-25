import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "あらゆる変換ツールをひとつに",
    titleAccent: "変換ツール",
    description:
      "単位・色・データ形式・日付など、さまざまな変換をブラウザ上で即座に実行できます。",
    tabAll: "すべて",
    categoryUnit: "単位",
    categoryNumber: "数値",
    categoryColor: "色",
    categoryDatetime: "日付/時刻",
    categoryData: "データ",
    categoryCss: "CSS",
    categoryCooking: "料理",
    categoryGeography: "地理",
    searchPlaceholder: "変換ツールを検索...",
    noResults: "該当する変換ツールが見つかりません。",
    recentTools: "最近使ったツール",
    favorites: "お気に入り",
    favDragHint: "ドラッグで並べ替え",
    favHint: "星をクリックしてお気に入りに追加",
    gridView: "グリッド表示",
    listView: "リスト表示",
  },
  trust: {
    encryption: "安全な処理",
    encryptionDesc: "すべての変換はブラウザ内で完結します",
    autoDelete: "データ保存なし",
    autoDeleteDesc: "入力データはサーバーに送信・保存されません",
    free: "完全無料",
    freeDesc: "制限なし、登録不要、隠れた費用なし",
    browserProcessing: "即座に結果表示",
    browserProcessingDesc: "入力と同時にリアルタイムで変換",
  },
  tools: {
    length: {
      title: "長さ変換",
      description:
        "メートル、キロメートル、マイル、フィート、インチなどを相互変換します。",
    },
    weight: {
      title: "重さ変換",
      description:
        "キログラム、ポンド、オンス、トンなどを相互変換します。",
    },
    temperature: {
      title: "温度変換",
      description: "摂氏、華氏、ケルビンを相互変換します。",
    },
    area: {
      title: "面積変換",
      description:
        "平方メートル、ヘクタール、エーカー、平方フィートなどを相互変換します。",
    },
    volume: {
      title: "体積変換",
      description:
        "リットル、ガロン、カップ、液量オンスなどを相互変換します。",
    },
    speed: {
      title: "速度変換",
      description: "m/s、km/h、mph、ノットなどを相互変換します。",
    },
    time: {
      title: "時間変換",
      description:
        "秒、分、時間、日、週などを相互変換します。",
    },
    pressure: {
      title: "圧力変換",
      description:
        "パスカル、バール、PSI、気圧などを相互変換します。",
    },
    energy: {
      title: "エネルギー変換",
      description:
        "ジュール、カロリー、キロワット時、BTUなどを相互変換します。",
    },
    power: {
      title: "仕事率変換",
      description:
        "ワット、キロワット、馬力などを相互変換します。",
    },
    frequency: {
      title: "周波数変換",
      description:
        "ヘルツ、キロヘルツ、メガヘルツ、ギガヘルツ、RPMを相互変換します。",
    },
    angle: {
      title: "角度変換",
      description: "度、ラジアン、グラジアン、回転を相互変換します。",
    },
    "data-storage": {
      title: "データ容量変換",
      description:
        "バイト、キロバイト、メガバイト、ギガバイトなどを相互変換します。",
    },
    "fuel-economy": {
      title: "燃費変換",
      description: "km/L、mpg、L/100kmを相互変換します。",
    },
    "number-base": {
      title: "基数変換",
      description:
        "2進数、8進数、10進数、16進数、任意の基数を相互変換します。",
    },
    "roman-numeral": {
      title: "ローマ数字変換",
      description: "ローマ数字とアラビア数字を相互変換します。",
    },
    "scientific-notation": {
      title: "科学的記数法変換",
      description:
        "科学的記数法と標準的な数値を相互変換します。",
    },
    "fraction-decimal": {
      title: "分数 ↔ 小数",
      description: "分数と小数を相互変換します。",
    },
    percentage: {
      title: "パーセント変換",
      description:
        "分数、小数、パーセントを相互変換します。",
    },
    "color-converter": {
      title: "色変換",
      description:
        "HEX、RGB、HSL、HSV、CMYKの各カラー形式を相互変換します。",
    },
    "color-palette-generator": {
      title: "カラーパレット生成",
      description:
        "補色、トライアド、類似色などのカラーパレットを生成します。",
    },
    "gradient-generator": {
      title: "CSS グラデーション生成",
      description:
        "線形・放射状・円錐のCSSグラデーションをプレビュー付きで作成します。",
    },
    "color-contrast-checker": {
      title: "色コントラストチェッカー",
      description:
        "2色間のWCAG AA/AAAコントラスト比を確認します。",
    },
    "color-blindness-simulator": {
      title: "色覚シミュレーター",
      description:
        "色覚特性のある方にどう見えるかをシミュレーションします。",
    },
    timezone: {
      title: "タイムゾーン変換",
      description:
        "世界各地のタイムゾーン間で時刻を変換します。",
    },
    "unix-timestamp": {
      title: "Unixタイムスタンプ変換",
      description:
        "Unixタイムスタンプと日時を相互変換します。",
    },
    "date-format": {
      title: "日付形式変換",
      description:
        "ISO、US、EU形式など、さまざまな日付形式を相互変換します。",
    },
    "date-calculator": {
      title: "日付計算",
      description:
        "日付の差分を計算、または日数の加算・減算を行います。",
    },
    "age-calculator": {
      title: "年齢計算",
      description:
        "生年月日から年・月・日単位の正確な年齢を計算します。",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "JSONとYAMLデータ形式を相互変換します。",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "JSON配列とCSVスプレッドシート形式を相互変換します。",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "JSONとXMLデータ形式を相互変換します。",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "JSONとTOML設定ファイル形式を相互変換します。",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "MarkdownとHTMLを相互変換します。",
    },
    "csv-table": {
      title: "CSV → テーブル",
      description: "CSVデータをMarkdownまたはHTMLのテーブルに変換します。",
    },
    "json-typescript": {
      title: "JSON → TypeScript",
      description: "JSONデータからTypeScriptインターフェースを生成します。",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "SQL INSERT文とJSONデータを相互変換します。",
    },
    "px-rem": {
      title: "px ↔ rem 変換",
      description:
        "ピクセルとrem単位をカスタム基準サイズで相互変換します。",
    },
    "px-em": {
      title: "px ↔ em 変換",
      description:
        "ピクセルとem単位をカスタム親要素サイズで相互変換します。",
    },
    "px-percent": {
      title: "px ↔ % 変換",
      description:
        "ピクセルとパーセントをカスタムコンテナ幅で相互変換します。",
    },
    "css-unit": {
      title: "CSS単位変換",
      description:
        "px、rem、em、%、vw、vhなどのCSS単位を相互変換します。",
    },
    "css-minifier": {
      title: "CSS 圧縮 / 整形",
      description:
        "CSSコードの圧縮や整形を行います。",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tailwind CSSクラスとバニラCSSを相互変換します。",
    },
    "cooking-measurement": {
      title: "料理の計量変換",
      description:
        "カップ、大さじ、小さじ、ミリリットル、グラムを相互変換します。",
    },
    "recipe-scaler": {
      title: "レシピ分量調整",
      description:
        "人数に合わせてレシピの材料を増減します。",
    },
    "oven-temperature": {
      title: "オーブン温度変換",
      description:
        "摂氏、華氏、ガスマークのオーブン温度を相互変換します。",
    },
    coordinate: {
      title: "座標変換",
      description:
        "DMS、DD、DDMの座標形式を相互変換します。",
    },
    "distance-calculator": {
      title: "距離計算",
      description:
        "2つの地理座標間の距離を計算します。",
    },
  },
  nav: {
    allTools: "すべての変換ツール",
    language: "言語",
  },
  footer: {
    tools: "変換ツール",
    legal: "法的情報",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    copyright: "ToolPop. All rights reserved.",
    company: "会社情報",
    about: "概要",
    contact: "お問い合わせ",
    faq: "よくある質問",
  },
  common: {
    backToAll: "すべての変換ツール",
    inputPlaceholder: "変換する値を入力...",
    outputLabel: "結果",
    copyToClipboard: "クリップボードにコピー",
    copied: "コピーしました！",
    clear: "クリア",
    paste: "貼り付け",
    processing: "変換中...",
    startOver: "最初からやり直す",
    process: "変換",
    tryAgain: "もう一度",
    notImplemented: "この変換ツールは近日公開予定です。",
    tryOtherTools: "他の変換ツールを試す",
    privacyBadge: "すべての変換はブラウザ内で完結します",
    favoriteAdded: "お気に入りに追加しました",
    favoriteRemoved: "お気に入りから削除しました",
    comingSoon: "近日公開",
    share: "共有",
    shareTitle: "この変換ツールを共有",
    shareSubtitle: "便利な変換ツールを他の人にも教えましょう",
    shareCopied: "リンクをコピーしました！",
    shareCopyLink: "リンクをコピー",
    downloadAsFile: "ダウンロード",
    options: "オプション",
    input: "入力",
    output: "出力",
    convert: "変換",
    swap: "入れ替え",
    from: "変換元",
    to: "変換先",
    result: "結果",
    allConversions: "すべての変換",
    details: "詳細",
    pageNotFound: "変換ツールが見つかりません",
    goHome: "すべての変換ツールに戻る",
  },
  toolOptions: {
    fromUnit: "変換元",
    toUnit: "変換先",
    precision: "小数点以下の桁数",
    baseSize: "基準フォントサイズ (px)",
    parentSize: "親要素のフォントサイズ (px)",
    containerWidth: "コンテナ幅 (px)",
    viewportWidth: "ビューポート幅 (px)",
    viewportHeight: "ビューポート高さ (px)",
    direction: "方向",
    mode: "モード",
    ingredient: "食材",
    water: "水",
    flour: "小麦粉",
    sugar: "砂糖",
    butter: "バター",
    rice: "米",
    milk: "牛乳",
    originalServings: "元の人数",
    targetServings: "変更後の人数",
    fromTimezone: "変換元タイムゾーン",
    toTimezone: "変換先タイムゾーン",
    inputFormat: "入力形式",
    outputFormat: "出力形式",
    harmony: "配色パターン",
    complementary: "補色",
    triadic: "トライアド",
    analogous: "類似色",
    splitComplementary: "分裂補色",
    tetradic: "テトラード",
    gradientType: "グラデーション種類",
    linear: "線形",
    radial: "放射状",
    conic: "円錐",
    gradientAngle: "角度 (deg)",
    rootName: "ルートインターフェース名",
    tableName: "テーブル名",
    minify: "圧縮",
    beautify: "整形",
    colorType: "色覚特性の種類",
    protanopia: "1型色覚（赤なし）",
    deuteranopia: "2型色覚（緑なし）",
    tritanopia: "3型色覚（青なし）",
    achromatopsia: "全色盲（色なし）",
    operation: "操作",
    difference: "差分",
    add: "加算",
    subtract: "減算",
    amount: "数量",
    unit: "単位",
    days: "日",
    weeks: "週",
    months: "月",
    years: "年",
    fromBase: "変換元の基数",
    toBase: "変換先の基数",
    binary: "2進数 (2)",
    octal: "8進数 (8)",
    decimal: "10進数 (10)",
    hexadecimal: "16進数 (16)",
    seconds: "秒",
    milliseconds: "ミリ秒",
    autoDetect: "自動検出",
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
    markdown: "Markdown テーブル",
    html: "HTML テーブル",
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
    toRoman: "数字 → ローマ数字",
    toArabic: "ローマ数字 → 数字",
    toScientific: "標準 → 科学的記数法",
    toStandard: "科学的記数法 → 標準",
    toFraction: "小数 → 分数",
    toDecimal: "分数 → 小数",
    decimalToPercent: "小数 → パーセント",
    percentToDecimal: "パーセント → 小数",
    fractionToPercent: "分数 → パーセント",
    dd: "Decimal Degrees (DD)",
    dms: "Degrees Minutes Seconds (DMS)",
    ddm: "Degrees Decimal Minutes (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "詳細形式",
    short: "短縮形式",
    relative: "相対表示",
    celsius: "摂氏 (°C)",
    fahrenheit: "華氏 (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "背景色",
    monochromatic: "モノクロマティック",
    timestampToDate: "タイムスタンプ → 日時",
    dateToTimestamp: "日時 → タイムスタンプ",
    showDetails: "詳細な内訳を表示",
    addDays: "日数を加算",
    subtractDays: "日数を減算",
    datetimeHint: "例: 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "行数",
    characters: "文字数",
    rows: "行",
    columns: "列",
    elements: "要素",
    keys: "キー",
    interfaces: "インターフェース",
    properties: "プロパティ",
    originalSize: "元のサイズ",
    resultSize: "結果サイズ",
    savings: "削減量",
    ingredients: "食材",
    scaleFactor: "倍率",
    contrastRatio: "コントラスト比",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "緯度",
    longitude: "経度",
    distanceKm: "距離 (km)",
    distanceMi: "距離 (mi)",
    years: "年",
    months: "月",
    days: "日",
  },
  processorMessages: {
    invalidTimezone: "無効なタイムゾーン",
    pass: "合格", fail: "不合格",
    fromNow: "後", ago: "前",
    today: "今日", tomorrow: "明日", yesterday: "昨日",
    seconds: "秒", secondsPlural: "秒",
    minutes: "分", minutesPlural: "分",
    hours: "時間", hoursPlural: "時間",
    daysUnit: "日", daysPlural: "日",
    weeksUnit: "週", weeksPlural: "週",
    monthsUnit: "ヶ月", monthsPlural: "ヶ月",
    yearsUnit: "年", yearsPlural: "年",
    gasmark: "Gas Mark",
    veryCool: "とても低温", cool: "低温", moderatelyCool: "やや低温",
    moderate: "中温", moderatelyHot: "やや高温",
    hot: "高温", veryHot: "とても高温", extremelyHot: "超高温",
    original: "元の値",
    from: "変換元", to: "変換先",
    totalDays: "合計日数", weeksDays: "週 + 日",
    originalDate: "元の日付", operationLabel: "操作",
    resultDate: "結果日付", dayOfWeek: "曜日",
    daysBetween: "日数差",
    age: "年齢", totalMonths: "合計月数",
    totalHours: "合計時間数", totalMinutes: "合計分数",
    nextBirthday: "次の誕生日",
    roman: "ローマ数字", arabic: "アラビア数字",
    scientific: "科学的記数法", standard: "標準", engineering: "工学的記数法",
    fraction: "分数", simplified: "約分", percentage: "パーセント",
    color1: "色 1", color2: "色 2",
    contrastRatioLabel: "コントラスト比",
    aaNormalText: "AA 通常テキスト", aaLargeText: "AA 大きいテキスト",
    aaaNormalText: "AAA 通常テキスト", aaaLargeText: "AAA 大きいテキスト",
    gradientTypeLabel: "種類", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop 変換ツール — 無料オンライン変換",
    siteDescription:
      "単位・色・データ形式・日付などを変換。無料で高速、すべてブラウザ内で完結します。",
    toolTitleSuffix: "| ToolPop 変換ツール",
  },
  blog: {
    title: "ブログ",
    description:
      "単位変換やデータ形式に関するヒント、ガイド、知識をお届けします。",
    readMore: "続きを読む",
    backToBlog: "ブログに戻る",
    publishedOn: "公開日",
    categoryGuide: "ガイド",
    categoryTips: "ヒント",
    categoryKnowledge: "ナレッジ",
  },
  cookie: {
    message:
      "より良い体験のためにCookieを使用しています。続行すると、Cookieポリシーに同意したことになります。",
    accept: "同意する",
    decline: "拒否する",
  },
  unitLabels: {
    length: {
      m: "メートル (m)", km: "キロメートル (km)", cm: "センチメートル (cm)", mm: "ミリメートル (mm)",
      mi: "マイル (mi)", yd: "ヤード (yd)", ft: "フィート (ft)", in: "インチ (in)",
      nm: "海里 (nm)", "\u03BCm": "マイクロメートル (\u03BCm)",
    },
    weight: {
      kg: "キログラム (kg)", g: "グラム (g)", mg: "ミリグラム (mg)", lb: "ポンド (lb)",
      oz: "オンス (oz)", ton: "メートルトン (t)", st: "ストーン (st)", ct: "カラット (ct)",
    },
    temperature: { C: "摂氏 (\u00B0C)", F: "華氏 (\u00B0F)", K: "ケルビン (K)" },
    area: {
      "m\u00B2": "平方メートル (m\u00B2)", "km\u00B2": "平方キロメートル (km\u00B2)",
      ha: "ヘクタール (ha)", acre: "エーカー", "ft\u00B2": "平方フィート (ft\u00B2)",
      "mi\u00B2": "平方マイル (mi\u00B2)", "yd\u00B2": "平方ヤード (yd\u00B2)",
      "cm\u00B2": "平方センチメートル (cm\u00B2)",
    },
    volume: {
      L: "リットル (L)", mL: "ミリリットル (mL)", gal: "米ガロン (gal)",
      "fl oz": "米液量オンス (fl oz)", cup: "米カップ", pt: "米パイント (pt)",
      qt: "米クォート (qt)", "m\u00B3": "立方メートル (m\u00B3)",
      "cm\u00B3": "立方センチメートル (cm\u00B3)", tbsp: "大さじ (tbsp)", tsp: "小さじ (tsp)",
    },
    speed: {
      "m/s": "メートル/秒 (m/s)", "km/h": "キロメートル/時 (km/h)", mph: "マイル/時 (mph)",
      kn: "ノット (kn)", "ft/s": "フィート/秒 (ft/s)", mach: "マッハ",
    },
    time: {
      ms: "ミリ秒 (ms)", s: "秒 (s)", min: "分 (min)", h: "時間 (h)",
      d: "日 (d)", wk: "週 (wk)", mo: "月 (mo)", yr: "年 (yr)",
    },
    pressure: {
      Pa: "パスカル (Pa)", kPa: "キロパスカル (kPa)", bar: "バール", psi: "PSI",
      atm: "気圧 (atm)", torr: "トール", mmHg: "mmHg",
    },
    energy: {
      J: "ジュール (J)", kJ: "キロジュール (kJ)", cal: "カロリー (cal)", kcal: "キロカロリー (kcal)",
      Wh: "ワット時 (Wh)", kWh: "キロワット時 (kWh)", BTU: "BTU", eV: "電子ボルト (eV)",
    },
    power: {
      W: "ワット (W)", kW: "キロワット (kW)", MW: "メガワット (MW)", hp: "馬力 (hp)",
      "BTU/h": "BTU/時", "cal/s": "カロリー/秒",
    },
    frequency: {
      Hz: "ヘルツ (Hz)", kHz: "キロヘルツ (kHz)", MHz: "メガヘルツ (MHz)",
      GHz: "ギガヘルツ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "度 (\u00B0)", rad: "ラジアン (rad)", grad: "グラジアン (grad)",
      turn: "回転", arcmin: "分 (\u2032)", arcsec: "秒 (\u2033)",
    },
    "data-storage": {
      B: "バイト (B)", KB: "キロバイト (KB)", MB: "メガバイト (MB)", GB: "ギガバイト (GB)",
      TB: "テラバイト (TB)", PB: "ペタバイト (PB)", bit: "ビット",
      Kbit: "キロビット", Mbit: "メガビット", Gbit: "ギガビット",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "カップ", tbsp: "大さじ", tsp: "小さじ", mL: "ミリリットル (mL)",
      L: "リットル (L)", fl_oz: "液量オンス", g: "グラム (g)", kg: "キログラム (kg)",
      oz: "オンス (oz)", lb: "ポンド (lb)",
    },
    "oven-temperature": { C: "摂氏 (\u00B0C)", F: "華氏 (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "ピクセル (px)", rem: "Root Em (rem)" },
    "px-em": { px: "ピクセル (px)", em: "Em (em)" },
    "px-percent": { px: "ピクセル (px)", "%": "パーセント (%)" },
    "css-unit": {
      px: "ピクセル (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "パーセント (%)", vw: "ビューポート幅 (vw)", vh: "ビューポート高さ (vh)",
    },
  },
};

export default dict;
