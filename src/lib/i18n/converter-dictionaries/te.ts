import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "మీకు కావలసిన ప్రతి కన్వర్టర్",
    titleAccent: "కన్వర్టర్",
    description:
      "యూనిట్లు, రంగులు, డేటా ఫార్మాట్లు, తేదీలు మరియు మరిన్ని — మీ బ్రౌజర్‌లో తక్షణంగా మార్చండి.",
    tabAll: "అన్నీ",
    categoryUnit: "యూనిట్లు",
    categoryNumber: "సంఖ్యలు",
    categoryColor: "రంగులు",
    categoryDatetime: "తేదీ/సమయం",
    categoryData: "డేటా",
    categoryCss: "CSS",
    categoryCooking: "వంట",
    categoryGeography: "భూగోళశాస్త్రం",
    searchPlaceholder: "కన్వర్టర్లు వెతకండి...",
    noResults: "కన్వర్టర్లు కనుగొనబడలేదు.",
    recentTools: "ఇటీవల వాడినవి",
    favorites: "ఇష్టమైనవి",
    favDragHint: "క్రమాన్ని మార్చడానికి లాగండి",
    favHint: "ఇష్టమైనవిలో చేర్చడానికి నక్షత్రాన్ని క్లిక్ చేయండి",
    gridView: "గ్రిడ్ వీక్షణ",
    listView: "జాబితా వీక్షణ",
  },
  trust: {
    encryption: "సురక్షిత ప్రాసెసింగ్",
    encryptionDesc: "అన్ని మార్పిడులు మీ బ్రౌజర్‌లో స్థానికంగా జరుగుతాయి",
    autoDelete: "డేటా నిల్వ చేయబడదు",
    autoDeleteDesc: "మీ ఇన్‌పుట్ ఎప్పుడూ సేవ్ చేయబడదు లేదా సర్వర్‌కు పంపబడదు",
    free: "100% ఉచితం",
    freeDesc: "పరిమితులు లేవు, సైన్-అప్‌లు లేవు, దాచిన ఫీజులు లేవు",
    browserProcessing: "తక్షణ ఫలితాలు",
    browserProcessingDesc: "మీరు టైప్ చేస్తుండగా రియల్-టైమ్ మార్పిడి",
  },
  tools: {
    length: {
      title: "పొడవు కన్వర్టర్",
      description:
        "మీటర్లు, కిలోమీటర్లు, మైళ్ళు, అడుగులు, అంగుళాలు మరియు మరిన్ని మధ్య మార్చండి.",
    },
    weight: {
      title: "బరువు కన్వర్టర్",
      description:
        "కిలోగ్రాములు, పౌండ్లు, ఔన్సులు, టన్నులు మరియు మరిన్ని మధ్య మార్చండి.",
    },
    temperature: {
      title: "ఉష్ణోగ్రత కన్వర్టర్",
      description: "Celsius, Fahrenheit మరియు Kelvin మధ్య మార్చండి.",
    },
    area: {
      title: "వైశాల్యం కన్వర్టర్",
      description:
        "చదరపు మీటర్లు, హెక్టార్లు, ఎకరాలు, చదరపు అడుగులు మరియు మరిన్ని మధ్య మార్చండి.",
    },
    volume: {
      title: "ఘనపరిమాణం కన్వర్టర్",
      description:
        "లీటర్లు, గ్యాలన్లు, కప్పులు, ఫ్లూయిడ్ ఔన్సులు మరియు మరిన్ని మధ్య మార్చండి.",
    },
    speed: {
      title: "వేగం కన్వర్టర్",
      description: "m/s, km/h, mph, నాట్లు మరియు మరిన్ని మధ్య మార్చండి.",
    },
    time: {
      title: "సమయం కన్వర్టర్",
      description:
        "సెకన్లు, నిమిషాలు, గంటలు, రోజులు, వారాలు మరియు మరిన్ని మధ్య మార్చండి.",
    },
    pressure: {
      title: "పీడనం కన్వర్టర్",
      description:
        "Pascal, bar, PSI, వాతావరణం మరియు మరిన్ని మధ్య మార్చండి.",
    },
    energy: {
      title: "శక్తి కన్వర్టర్",
      description:
        "జౌల్స్, కేలరీలు, కిలోవాట్-గంటలు, BTU మరియు మరిన్ని మధ్య మార్చండి.",
    },
    power: {
      title: "సామర్థ్యం కన్వర్టర్",
      description:
        "వాట్లు, కిలోవాట్లు, హార్స్‌పవర్ మరియు మరిన్ని మధ్య మార్చండి.",
    },
    frequency: {
      title: "పౌనఃపున్యం కన్వర్టర్",
      description:
        "హెర్ట్జ్, కిలోహెర్ట్జ్, మెగాహెర్ట్జ్, గిగాహెర్ట్జ్ మరియు RPM మధ్య మార్చండి.",
    },
    angle: {
      title: "కోణం కన్వర్టర్",
      description: "డిగ్రీలు, రేడియన్లు, గ్రేడియన్లు మరియు టర్న్‌లు మధ్య మార్చండి.",
    },
    "data-storage": {
      title: "డేటా నిల్వ కన్వర్టర్",
      description:
        "బైట్లు, కిలోబైట్లు, మెగాబైట్లు, గిగాబైట్లు మరియు మరిన్ని మధ్య మార్చండి.",
    },
    "fuel-economy": {
      title: "ఇంధన సామర్థ్యం కన్వర్టర్",
      description: "km/L, mpg మరియు L/100km మధ్య మార్చండి.",
    },
    "number-base": {
      title: "సంఖ్య ఆధారం కన్వర్టర్",
      description:
        "బైనరీ, ఆక్టల్, డెసిమల్, హెక్సాడెసిమల్ మరియు కస్టమ్ ఆధారాల మధ్య మార్చండి.",
    },
    "roman-numeral": {
      title: "రోమన్ సంఖ్య కన్వర్టర్",
      description: "రోమన్ సంఖ్యలు మరియు అరబిక్ సంఖ్యల మధ్య మార్చండి.",
    },
    "scientific-notation": {
      title: "శాస్త్రీయ సంజ్ఞా కన్వర్టర్",
      description:
        "శాస్త్రీయ సంజ్ఞాపనం మరియు ప్రామాణిక సంఖ్యల మధ్య మార్చండి.",
    },
    "fraction-decimal": {
      title: "భిన్నం ↔ దశాంశం",
      description: "భిన్నాలు మరియు దశాంశ సంఖ్యల మధ్య మార్చండి.",
    },
    percentage: {
      title: "శాతం కన్వర్టర్",
      description:
        "భిన్నాలు, దశాంశాలు మరియు శాతాల మధ్య మార్చండి.",
    },
    "color-converter": {
      title: "రంగు కన్వర్టర్",
      description:
        "HEX, RGB, HSL, HSV మరియు CMYK రంగు ఫార్మాట్ల మధ్య మార్చండి.",
    },
    "color-palette-generator": {
      title: "రంగు పాలెట్ జనరేటర్",
      description:
        "పరిపూరకమైన, త్రియాదిక్ మరియు సమానమైన రంగు పాలెట్‌లను రూపొందించండి.",
    },
    "gradient-generator": {
      title: "CSS గ్రేడియెంట్ జనరేటర్",
      description:
        "లైవ్ ప్రివ్యూతో లీనియర్, రేడియల్ మరియు కోనిక్ CSS గ్రేడియెంట్‌లను సృష్టించండి.",
    },
    "color-contrast-checker": {
      title: "రంగు కాంట్రాస్ట్ చెకర్",
      description:
        "రెండు రంగుల మధ్య WCAG AA/AAA కాంట్రాస్ట్ నిష్పత్తిని తనిఖీ చేయండి.",
    },
    "color-blindness-simulator": {
      title: "రంగు అంధత్వ సిమ్యులేటర్",
      description:
        "రంగు దృష్టి లోపం ఉన్న వ్యక్తులకు రంగులు ఎలా కనిపిస్తాయో అనుకరించండి.",
    },
    timezone: {
      title: "సమయ మండలం కన్వర్టర్",
      description:
        "ప్రపంచవ్యాప్తంగా వివిధ సమయ మండలాల మధ్య సమయాన్ని మార్చండి.",
    },
    "unix-timestamp": {
      title: "Unix టైమ్‌స్టాంప్ కన్వర్టర్",
      description:
        "Unix టైమ్‌స్టాంప్‌లు మరియు చదవగలిగే తేదీల మధ్య మార్చండి.",
    },
    "date-format": {
      title: "తేదీ ఫార్మాట్ కన్వర్టర్",
      description:
        "వివిధ ఫార్మాట్‌ల (ISO, US, EU మరియు మరిన్ని) మధ్య తేదీలను మార్చండి.",
    },
    "date-calculator": {
      title: "తేదీ కాలిక్యులేటర్",
      description:
        "తేదీల మధ్య తేడాను లెక్కించండి లేదా రోజులు కలపండి/తీయండి.",
    },
    "age-calculator": {
      title: "వయస్సు కాలిక్యులేటర్",
      description:
        "జన్మ తేదీ నుండి సంవత్సరాలు, నెలలు మరియు రోజుల్లో ఖచ్చితమైన వయస్సు లెక్కించండి.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "JSON మరియు YAML డేటా ఫార్మాట్ల మధ్య మార్చండి.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "JSON అర్రేలు మరియు CSV స్ప్రెడ్‌షీట్ ఫార్మాట్ మధ్య మార్చండి.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "JSON మరియు XML డేటా ఫార్మాట్ల మధ్య మార్చండి.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "JSON మరియు TOML కాన్ఫిగరేషన్ ఫార్మాట్ల మధ్య మార్చండి.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Markdown మరియు HTML మార్కప్ మధ్య మార్చండి.",
    },
    "csv-table": {
      title: "CSV నుండి టేబుల్",
      description: "CSV డేటాను Markdown లేదా HTML టేబుల్‌లుగా మార్చండి.",
    },
    "json-typescript": {
      title: "JSON నుండి TypeScript",
      description: "JSON డేటా నుండి TypeScript ఇంటర్‌ఫేస్‌లను రూపొందించండి.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "SQL INSERT స్టేట్‌మెంట్లు మరియు JSON డేటా మధ్య మార్చండి.",
    },
    "px-rem": {
      title: "px ↔ rem కన్వర్టర్",
      description:
        "కస్టమ్ బేస్ సైజ్‌తో పిక్సెల్‌లు మరియు rem యూనిట్ల మధ్య మార్చండి.",
    },
    "px-em": {
      title: "px ↔ em కన్వర్టర్",
      description:
        "కస్టమ్ పేరెంట్ సైజ్‌తో పిక్సెల్‌లు మరియు em యూనిట్ల మధ్య మార్చండి.",
    },
    "px-percent": {
      title: "px ↔ % కన్వర్టర్",
      description:
        "కస్టమ్ కంటైనర్ వెడల్పుతో పిక్సెల్‌లు మరియు శాతం మధ్య మార్చండి.",
    },
    "css-unit": {
      title: "CSS యూనిట్ కన్వర్టర్",
      description:
        "px, rem, em, %, vw, vh మరియు ఇతర CSS యూనిట్ల మధ్య మార్చండి.",
    },
    "css-minifier": {
      title: "CSS Minifier / Beautifier",
      description:
        "ఉత్పత్తి లేదా చదవగలిగేలా CSS కోడ్‌ను కుదించండి లేదా అందంగా చేయండి.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tailwind CSS క్లాస్‌లు మరియు సాదా CSS మధ్య మార్చండి.",
    },
    "cooking-measurement": {
      title: "వంట కొలత కన్వర్టర్",
      description:
        "కప్పులు, టేబుల్‌స్పూన్లు, టీస్పూన్లు, మిల్లీలీటర్లు మరియు గ్రాముల మధ్య మార్చండి.",
    },
    "recipe-scaler": {
      title: "రెసిపీ స్కేలర్",
      description:
        "వడ్డన సైజు ప్రకారం రెసిపీ పదార్థాలను పెంచండి లేదా తగ్గించండి.",
    },
    "oven-temperature": {
      title: "ఓవెన్ ఉష్ణోగ్రత కన్వర్టర్",
      description:
        "ఓవెన్ ఉష్ణోగ్రతల కోసం Celsius, Fahrenheit మరియు Gas Mark మధ్య మార్చండి.",
    },
    coordinate: {
      title: "కోఆర్డినేట్ కన్వర్టర్",
      description:
        "DMS, DD మరియు DDM కోఆర్డినేట్ ఫార్మాట్ల మధ్య మార్చండి.",
    },
    "distance-calculator": {
      title: "దూరం కాలిక్యులేటర్",
      description:
        "రెండు భౌగోళిక కోఆర్డినేట్ల మధ్య దూరాన్ని లెక్కించండి.",
    },
  },
  nav: {
    allTools: "అన్ని కన్వర్టర్ సాధనాలు",
    language: "భాష",
  },
  footer: {
    tools: "కన్వర్టర్లు",
    legal: "చట్టపరమైనవి",
    privacy: "గోప్యతా విధానం",
    terms: "సేవా నిబంధనలు",
    copyright: "ToolPop. అన్ని హక్కులు భద్రం.",
    company: "కంపెనీ",
    about: "మా గురించి",
    contact: "సంప్రదించండి",
    faq: "FAQ",
  },
  common: {
    backToAll: "అన్ని కన్వర్టర్లు",
    inputPlaceholder: "మార్చడానికి విలువ నమోదు చేయండి...",
    outputLabel: "ఫలితం",
    copyToClipboard: "క్లిప్‌బోర్డ్‌కు కాపీ చేయండి",
    copied: "కాపీ అయింది!",
    clear: "క్లియర్",
    paste: "పేస్ట్",
    processing: "మారుస్తోంది...",
    startOver: "మళ్ళీ ప్రారంభించండి",
    process: "మార్చండి",
    tryAgain: "మళ్ళీ ప్రయత్నించండి",
    notImplemented: "ఈ కన్వర్టర్ త్వరలో వస్తోంది.",
    tryOtherTools: "ఇతర కన్వర్టర్లు ప్రయత్నించండి",
    privacyBadge: "అన్ని మార్పిడులు మీ బ్రౌజర్‌లో జరుగుతాయి",
    favoriteAdded: "ఇష్టమైనవిలో చేర్చబడింది",
    favoriteRemoved: "ఇష్టమైనవి నుండి తొలగించబడింది",
    comingSoon: "త్వరలో వస్తోంది",
    share: "పంచుకోండి",
    shareTitle: "ఈ కన్వర్టర్‌ను పంచుకోండి",
    shareSubtitle: "ఈ ఉపయోగకరమైన కన్వర్టర్‌ను ఇతరులతో పంచుకోండి",
    shareCopied: "లింక్ కాపీ అయింది!",
    shareCopyLink: "లింక్ కాపీ చేయండి",
    downloadAsFile: "డౌన్‌లోడ్",
    options: "ఎంపికలు",
    input: "ఇన్‌పుట్",
    output: "అవుట్‌పుట్",
    convert: "మార్చండి",
    swap: "మార్పిడి",
    from: "నుండి",
    to: "కు",
    result: "ఫలితం",
    allConversions: "అన్ని మార్పిడులు",
    details: "వివరాలు",
    pageNotFound: "కన్వర్టర్ కనుగొనబడలేదు",
    goHome: "అన్ని కన్వర్టర్లకు తిరిగి వెళ్ళండి",
  },
  toolOptions: {
    fromUnit: "నుండి",
    toUnit: "కు",
    precision: "దశాంశ స్థానాలు",
    baseSize: "బేస్ ఫాంట్ సైజ్ (px)",
    parentSize: "పేరెంట్ ఫాంట్ సైజ్ (px)",
    containerWidth: "కంటైనర్ వెడల్పు (px)",
    viewportWidth: "వ్యూపోర్ట్ వెడల్పు (px)",
    viewportHeight: "వ్యూపోర్ట్ ఎత్తు (px)",
    direction: "దిశ",
    mode: "మోడ్",
    ingredient: "పదార్థం",
    water: "నీరు",
    flour: "పిండి",
    sugar: "చక్కెర",
    butter: "వెన్న",
    rice: "బియ్యం",
    milk: "పాలు",
    originalServings: "అసలు వడ్డనలు",
    targetServings: "కావలసిన వడ్డనలు",
    fromTimezone: "సమయ మండలం నుండి",
    toTimezone: "సమయ మండలానికి",
    inputFormat: "ఇన్‌పుట్ ఫార్మాట్",
    outputFormat: "అవుట్‌పుట్ ఫార్మాట్",
    harmony: "రంగు సామరస్యం",
    complementary: "పరిపూరకం",
    triadic: "త్రియాదిక్",
    analogous: "సమానం",
    splitComplementary: "విభజిత పరిపూరకం",
    tetradic: "టెట్రాడిక్",
    gradientType: "గ్రేడియెంట్ రకం",
    linear: "లీనియర్",
    radial: "రేడియల్",
    conic: "కోనిక్",
    gradientAngle: "కోణం (deg)",
    rootName: "రూట్ ఇంటర్‌ఫేస్ పేరు",
    tableName: "టేబుల్ పేరు",
    minify: "కుదించు",
    beautify: "అందంగా చేయి",
    colorType: "లోపం రకం",
    protanopia: "ప్రోటానోపియా (ఎరుపు లేదు)",
    deuteranopia: "డ్యూటెరానోపియా (ఆకుపచ్చ లేదు)",
    tritanopia: "ట్రైటానోపియా (నీలం లేదు)",
    achromatopsia: "ఆక్రోమాటోప్సియా (రంగు లేదు)",
    operation: "ఆపరేషన్",
    difference: "తేడా",
    add: "కలుపు",
    subtract: "తీయి",
    amount: "మొత్తం",
    unit: "యూనిట్",
    days: "రోజులు",
    weeks: "వారాలు",
    months: "నెలలు",
    years: "సంవత్సరాలు",
    fromBase: "ఆధారం నుండి",
    toBase: "ఆధారానికి",
    binary: "బైనరీ (2)",
    octal: "ఆక్టల్ (8)",
    decimal: "డెసిమల్ (10)",
    hexadecimal: "హెక్సాడెసిమల్ (16)",
    seconds: "సెకన్లు",
    milliseconds: "మిల్లీసెకన్లు",
    autoDetect: "ఆటోమేటిక్‌గా గుర్తించు",
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
    markdown: "Markdown టేబుల్",
    html: "HTML టేబుల్",
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
    toRoman: "సంఖ్య → రోమన్",
    toArabic: "రోమన్ → సంఖ్య",
    toScientific: "ప్రామాణికం → శాస్త్రీయం",
    toStandard: "శాస్త్రీయం → ప్రామాణికం",
    toFraction: "దశాంశం → భిన్నం",
    toDecimal: "భిన్నం → దశాంశం",
    decimalToPercent: "దశాంశం → శాతం",
    percentToDecimal: "శాతం → దశాంశం",
    fractionToPercent: "భిన్నం → శాతం",
    dd: "దశాంశ డిగ్రీలు (DD)",
    dms: "డిగ్రీలు నిమిషాలు సెకన్లు (DMS)",
    ddm: "డిగ్రీలు దశాంశ నిమిషాలు (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "పొడవైన ఫార్మాట్",
    short: "చిన్న ఫార్మాట్",
    relative: "సాపేక్షం",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "నేపథ్య రంగు",
    monochromatic: "ఏకవర్ణ",
    timestampToDate: "టైమ్‌స్టాంప్ → తేదీ",
    dateToTimestamp: "తేదీ → టైమ్‌స్టాంప్",
    showDetails: "వివరమైన విశ్లేషణ చూపించు",
    addDays: "రోజులు కలుపు",
    subtractDays: "రోజులు తీయి",
    datetimeHint: "ఉదా. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "లైన్లు",
    characters: "అక్షరాలు",
    rows: "వరుసలు",
    columns: "నిలువు వరుసలు",
    elements: "మూలకాలు",
    keys: "కీలు",
    interfaces: "ఇంటర్‌ఫేస్‌లు",
    properties: "గుణాలు",
    originalSize: "అసలు పరిమాణం",
    resultSize: "ఫలిత పరిమాణం",
    savings: "ఆదా",
    ingredients: "పదార్థాలు",
    scaleFactor: "స్కేల్ ఫ్యాక్టర్",
    contrastRatio: "కాంట్రాస్ట్ నిష్పత్తి",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "అక్షాంశం",
    longitude: "రేఖాంశం",
    distanceKm: "దూరం (km)",
    distanceMi: "దూరం (mi)",
    years: "సంవత్సరాలు",
    months: "నెలలు",
    days: "రోజులు",
  },
  processorMessages: {
    invalidTimezone: "చెల్లని సమయ మండలం",
    pass: "ఉత్తీర్ణం", fail: "అనుత్తీర్ణం",
    fromNow: "ఇప్పటి నుండి", ago: "క్రితం",
    today: "ఈ రోజు", tomorrow: "రేపు", yesterday: "నిన్న",
    seconds: "సెకను", secondsPlural: "సెకన్లు",
    minutes: "నిమిషం", minutesPlural: "నిమిషాలు",
    hours: "గంట", hoursPlural: "గంటలు",
    daysUnit: "రోజు", daysPlural: "రోజులు",
    weeksUnit: "వారం", weeksPlural: "వారాలు",
    monthsUnit: "నెల", monthsPlural: "నెలలు",
    yearsUnit: "సంవత్సరం", yearsPlural: "సంవత్సరాలు",
    gasmark: "Gas Mark",
    veryCool: "చాలా చల్లగా", cool: "చల్లగా", moderatelyCool: "మధ్యస్థంగా చల్లగా",
    moderate: "మధ్యస్థం", moderatelyHot: "మధ్యస్థంగా వేడిగా",
    hot: "వేడిగా", veryHot: "చాలా వేడిగా", extremelyHot: "అత్యంత వేడిగా",
    original: "అసలు",
    from: "నుండి", to: "కు",
    totalDays: "మొత్తం రోజులు", weeksDays: "వారాలు + రోజులు",
    originalDate: "అసలు తేదీ", operationLabel: "ఆపరేషన్",
    resultDate: "ఫలిత తేదీ", dayOfWeek: "వారంలో రోజు",
    daysBetween: "రోజుల తేడా",
    age: "వయస్సు", totalMonths: "మొత్తం నెలలు",
    totalHours: "మొత్తం గంటలు", totalMinutes: "మొత్తం నిమిషాలు",
    nextBirthday: "తదుపరి పుట్టినరోజు",
    roman: "రోమన్", arabic: "అరబిక్",
    scientific: "శాస్త్రీయం", standard: "ప్రామాణికం", engineering: "ఇంజనీరింగ్",
    fraction: "భిన్నం", simplified: "సరళీకృతం", percentage: "శాతం",
    color1: "రంగు 1", color2: "రంగు 2",
    contrastRatioLabel: "కాంట్రాస్ట్ నిష్పత్తి",
    aaNormalText: "AA సాధారణ టెక్స్ట్", aaLargeText: "AA పెద్ద టెక్స్ట్",
    aaaNormalText: "AAA సాధారణ టెక్స్ట్", aaaLargeText: "AAA పెద్ద టెక్స్ట్",
    gradientTypeLabel: "రకం", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — ఉచిత ఆన్‌లైన్ కన్వర్టర్లు",
    siteDescription:
      "యూనిట్లు, రంగులు, డేటా ఫార్మాట్లు, తేదీలు మరియు మరిన్ని మార్చండి. ఉచితం, వేగవంతం మరియు ప్రైవేట్ — అంతా మీ బ్రౌజర్‌లో నడుస్తుంది.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "బ్లాగ్",
    description:
      "యూనిట్ మార్పిడులు, డేటా ఫార్మాట్లు మరియు మరిన్ని గురించి చిట్కాలు, గైడ్‌లు మరియు జ్ఞానం.",
    readMore: "మరింత చదవండి",
    backToBlog: "బ్లాగ్‌కు తిరిగి",
    publishedOn: "ప్రచురించబడింది",
    categoryGuide: "గైడ్",
    categoryTips: "చిట్కాలు",
    categoryKnowledge: "జ్ఞానం",
  },
  cookie: {
    message:
      "మీ అనుభవాన్ని మెరుగుపరచడానికి మేము కుకీలను ఉపయోగిస్తాము. కొనసాగించడం ద్వారా, మీరు మా కుకీ విధానానికి అంగీకరిస్తారు.",
    accept: "అంగీకరించు",
    decline: "తిరస్కరించు",
  },
  unitLabels: {
    length: {
      m: "మీటర్ (m)", km: "కిలోమీటర్ (km)", cm: "సెంటీమీటర్ (cm)", mm: "మిల్లీమీటర్ (mm)",
      mi: "మైలు (mi)", yd: "గజం (yd)", ft: "అడుగు (ft)", in: "అంగుళం (in)",
      nm: "నాటికల్ మైలు (nm)", "\u03BCm": "మైక్రోమీటర్ (\u03BCm)",
    },
    weight: {
      kg: "కిలోగ్రాము (kg)", g: "గ్రాము (g)", mg: "మిల్లీగ్రాము (mg)", lb: "పౌండు (lb)",
      oz: "ఔన్సు (oz)", ton: "మెట్రిక్ టన్ను (t)", st: "స్టోన్ (st)", ct: "క్యారట్ (ct)",
    },
    temperature: { C: "సెల్సియస్ (\u00B0C)", F: "ఫారెన్‌హీట్ (\u00B0F)", K: "కెల్విన్ (K)" },
    area: {
      "m\u00B2": "చదరపు మీటర్ (m\u00B2)", "km\u00B2": "చదరపు కిలోమీటర్ (km\u00B2)",
      ha: "హెక్టార్ (ha)", acre: "ఎకరం", "ft\u00B2": "చదరపు అడుగు (ft\u00B2)",
      "mi\u00B2": "చదరపు మైలు (mi\u00B2)", "yd\u00B2": "చదరపు గజం (yd\u00B2)",
      "cm\u00B2": "చదరపు సెంటీమీటర్ (cm\u00B2)",
    },
    volume: {
      L: "లీటర్ (L)", mL: "మిల్లీలీటర్ (mL)", gal: "US గ్యాలన్ (gal)",
      "fl oz": "US ఫ్లూయిడ్ ఔన్సు (fl oz)", cup: "US కప్పు", pt: "US పింట్ (pt)",
      qt: "US క్వార్ట్ (qt)", "m\u00B3": "ఘన మీటర్ (m\u00B3)",
      "cm\u00B3": "ఘన సెంటీమీటర్ (cm\u00B3)", tbsp: "టేబుల్‌స్పూన్ (tbsp)", tsp: "టీస్పూన్ (tsp)",
    },
    speed: {
      "m/s": "మీటర్/సెకను (m/s)", "km/h": "కిలోమీటర్/గంట (km/h)", mph: "మైలు/గంట (mph)",
      kn: "నాట్ (kn)", "ft/s": "అడుగు/సెకను (ft/s)", mach: "మాక్",
    },
    time: {
      ms: "మిల్లీసెకను (ms)", s: "సెకను (s)", min: "నిమిషం (min)", h: "గంట (h)",
      d: "రోజు (d)", wk: "వారం (wk)", mo: "నెల (mo)", yr: "సంవత్సరం (yr)",
    },
    pressure: {
      Pa: "పాస్కల్ (Pa)", kPa: "కిలోపాస్కల్ (kPa)", bar: "బార్", psi: "PSI",
      atm: "వాతావరణం (atm)", torr: "టార్", mmHg: "mmHg",
    },
    energy: {
      J: "జౌల్ (J)", kJ: "కిలోజౌల్ (kJ)", cal: "కేలరీ (cal)", kcal: "కిలోకేలరీ (kcal)",
      Wh: "వాట్-గంట (Wh)", kWh: "కిలోవాట్-గంట (kWh)", BTU: "BTU", eV: "ఎలక్ట్రాన్‌వోల్ట్ (eV)",
    },
    power: {
      W: "వాట్ (W)", kW: "కిలోవాట్ (kW)", MW: "మెగావాట్ (MW)", hp: "హార్స్‌పవర్ (hp)",
      "BTU/h": "BTU/గంట", "cal/s": "కేలరీ/సెకను",
    },
    frequency: {
      Hz: "హెర్ట్జ్ (Hz)", kHz: "కిలోహెర్ట్జ్ (kHz)", MHz: "మెగాహెర్ట్జ్ (MHz)",
      GHz: "గిగాహెర్ట్జ్ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "డిగ్రీ (\u00B0)", rad: "రేడియన్ (rad)", grad: "గ్రేడియన్ (grad)",
      turn: "టర్న్", arcmin: "ఆర్క్ నిమిషం (\u2032)", arcsec: "ఆర్క్ సెకను (\u2033)",
    },
    "data-storage": {
      B: "బైట్ (B)", KB: "కిలోబైట్ (KB)", MB: "మెగాబైట్ (MB)", GB: "గిగాబైట్ (GB)",
      TB: "టెరాబైట్ (TB)", PB: "పెటాబైట్ (PB)", bit: "బిట్",
      Kbit: "కిలోబిట్", Mbit: "మెగాబిట్", Gbit: "గిగాబిట్",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "కప్పు", tbsp: "టేబుల్‌స్పూన్", tsp: "టీస్పూన్", mL: "మిల్లీలీటర్ (mL)",
      L: "లీటర్ (L)", fl_oz: "ఫ్లూయిడ్ ఔన్సు", g: "గ్రాము (g)", kg: "కిలోగ్రాము (kg)",
      oz: "ఔన్సు (oz)", lb: "పౌండు (lb)",
    },
    "oven-temperature": { C: "సెల్సియస్ (\u00B0C)", F: "ఫారెన్‌హీట్ (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "పిక్సెల్‌లు (px)", rem: "Root Em (rem)" },
    "px-em": { px: "పిక్సెల్‌లు (px)", em: "Em (em)" },
    "px-percent": { px: "పిక్సెల్‌లు (px)", "%": "శాతం (%)" },
    "css-unit": {
      px: "పిక్సెల్‌లు (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "శాతం (%)", vw: "వ్యూపోర్ట్ వెడల్పు (vw)", vh: "వ్యూపోర్ట్ ఎత్తు (vh)",
    },
  },
};

export default dict;
