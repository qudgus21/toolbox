import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Gach uirlis tiontaithe atá uait",
    titleAccent: "tiontaithe",
    description:
      "Tiontaigh aonaid, dathanna, formáidí sonraí, dátaí agus tuilleadh. Próiseáilte go léir i do bhrabhsálaí.",
    tabAll: "Gach ceann",
    categoryUnit: "Aonaid",
    categoryNumber: "Uimhreacha",
    categoryColor: "Dathanna",
    categoryDatetime: "Dáta/Am",
    categoryData: "Sonraí",
    categoryCss: "CSS",
    categoryCooking: "Cócaireacht",
    categoryGeography: "Tíreolaíocht",
    searchPlaceholder: "Cuardaigh tiontairí...",
    noResults: "Níor aimsíodh aon tiontaire.",
    recentTools: "Úsáidte le déanaí",
    favorites: "Ceanáin",
    favDragHint: "Tarraing chun athordú",
    favHint: "Cliceáil an réalta chun ceanáin a chur leis",
    gridView: "Amharc greille",
    listView: "Amharc liosta",
  },
  trust: {
    encryption: "Próiseáil Shlán",
    encryptionDesc: "Déantar gach tiontú go háitiúil i do bhrabhsálaí",
    autoDelete: "Ní Stóráiltear Sonraí",
    autoDeleteDesc: "Ní shábháiltear ná ní sheoltar d'ionchur chuig freastalaí riamh",
    free: "Saor in Aisce 100%",
    freeDesc: "Gan teorainneacha, gan clárú, gan táillí folaithe",
    browserProcessing: "Torthaí Láithreacha",
    browserProcessingDesc: "Tiontú fíor-ama agus tú ag clóscríobh",
  },
  tools: {
    length: {
      title: "Tiontaire Faid",
      description:
        "Tiontaigh idir méadair, ciliméadair, mílte, troithe, orlaí agus tuilleadh.",
    },
    weight: {
      title: "Tiontaire Meáchain",
      description:
        "Tiontaigh idir cileagraim, puint, unsaí, tonnaí agus tuilleadh.",
    },
    temperature: {
      title: "Tiontaire Teochta",
      description: "Tiontaigh idir Celsius, Fahrenheit agus Kelvin.",
    },
    area: {
      title: "Tiontaire Achair",
      description:
        "Tiontaigh idir méadair chearnacha, heicteáir, acraí, troithe cearnacha agus tuilleadh.",
    },
    volume: {
      title: "Tiontaire Toirte",
      description:
        "Tiontaigh idir lítir, gallúin, cupáin, unsaí leachtacha agus tuilleadh.",
    },
    speed: {
      title: "Tiontaire Luais",
      description: "Tiontaigh idir m/s, km/u, mph, muirmhílte agus tuilleadh.",
    },
    time: {
      title: "Tiontaire Ama",
      description:
        "Tiontaigh idir soicindí, nóiméid, uaireanta, laethanta, seachtainí agus tuilleadh.",
    },
    pressure: {
      title: "Tiontaire Brú",
      description:
        "Tiontaigh idir Pascal, bar, PSI, atmaisféar agus tuilleadh.",
    },
    energy: {
      title: "Tiontaire Fuinnimh",
      description:
        "Tiontaigh idir giúil, calraí, cileavatuaireanta, BTU agus tuilleadh.",
    },
    power: {
      title: "Tiontaire Cumhachta",
      description:
        "Tiontaigh idir vatanna, cileahatanna, each-chumhacht agus tuilleadh.",
    },
    frequency: {
      title: "Tiontaire Minicíochta",
      description:
        "Tiontaigh idir heirts, cileaheirts, meigiheirtsí, gigiheirtsí agus RPM.",
    },
    angle: {
      title: "Tiontaire Uillinne",
      description: "Tiontaigh idir céimeanna, radaín, grádáin agus rothluithe.",
    },
    "data-storage": {
      title: "Tiontaire Stórála Sonraí",
      description:
        "Tiontaigh idir bítí, cileabítí, meigibítí, gigibítí agus tuilleadh.",
    },
    "fuel-economy": {
      title: "Tiontaire Geilleagair Breosla",
      description: "Tiontaigh idir km/L, mpg agus L/100km.",
    },
    "number-base": {
      title: "Tiontaire Bunuimhreach",
      description:
        "Tiontaigh idir dénártha, ochtártha, deachúlach, heicsidheachúlach agus bunanna eile.",
    },
    "roman-numeral": {
      title: "Tiontaire Uimhreacha Rómhánacha",
      description: "Tiontaigh idir uimhreacha Rómhánacha agus Arabacha.",
    },
    "scientific-notation": {
      title: "Nodaireacht Eolaíoch",
      description:
        "Tiontaigh idir nodaireacht eolaíoch agus gnáthuimhreacha.",
    },
    "fraction-decimal": {
      title: "Codán ↔ Deachúil",
      description: "Tiontaigh idir codáin agus uimhreacha deachúlacha.",
    },
    percentage: {
      title: "Tiontaire Céatadáin",
      description:
        "Tiontaigh idir codáin, deachúlacha agus céatadáin.",
    },
    "color-converter": {
      title: "Tiontaire Dathanna",
      description:
        "Tiontaigh idir formáidí datha HEX, RGB, HSL, HSV agus CMYK.",
    },
    "color-palette-generator": {
      title: "Gineadóir Pailéid Dathanna",
      description:
        "Gin pailéid dathanna comhlántacha, triantánacha agus analógacha.",
    },
    "gradient-generator": {
      title: "Gineadóir Grádán CSS",
      description:
        "Cruthaigh grádáin CSS líneacha, gathachaa agus cónacacha le réamhamharc beo.",
    },
    "color-contrast-checker": {
      title: "Seiceálaí Codarsnachta Dathanna",
      description:
        "Seiceáil cóimheas codarsnachta WCAG AA/AAA idir dhá dhath.",
    },
    "color-blindness-simulator": {
      title: "Insamhlóir Daille Dathanna",
      description:
        "Insamhlaigh conas a fheiceann daoine le heaspa radhairc dathanna iad.",
    },
    timezone: {
      title: "Tiontaire Criosanna Ama",
      description:
        "Tiontaigh am idir criosanna ama éagsúla ar fud an domhain.",
    },
    "unix-timestamp": {
      title: "Tiontaire Stampa Ama Unix",
      description:
        "Tiontaigh idir stampaí ama Unix agus dátaí inléite.",
    },
    "date-format": {
      title: "Tiontaire Formáid Dáta",
      description:
        "Tiontaigh dátaí idir formáidí ISO, US, EU agus tuilleadh.",
    },
    "date-calculator": {
      title: "Áireamhán Dátaí",
      description:
        "Ríomh an difríocht idir dátaí nó cuir laethanta leis/bain laethanta.",
    },
    "age-calculator": {
      title: "Áireamhán Aoise",
      description:
        "Ríomh an aois chruinn ó dháta breithe i mblianta, míonna agus laethanta.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Tiontaigh idir formáidí sonraí JSON agus YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Tiontaigh idir eagar JSON agus formáid scarbhileog CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Tiontaigh idir formáidí sonraí JSON agus XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Tiontaigh idir formáidí cumraíochta JSON agus TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Tiontaigh idir Markdown agus HTML.",
    },
    "csv-table": {
      title: "CSV go Tábla",
      description: "Tiontaigh sonraí CSV go táblaí Markdown nó HTML.",
    },
    "json-typescript": {
      title: "JSON go TypeScript",
      description: "Gin comhéadain TypeScript ó shonraí JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Tiontaigh idir ráitis SQL INSERT agus sonraí JSON.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Tiontaigh idir picteilíní agus rem le bunmhéid saincheaptha.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Tiontaigh idir picteilíní agus em le méid tuismitheora saincheaptha.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Tiontaigh idir picteilíní agus céatadán le leithead coimeádáin saincheaptha.",
    },
    "css-unit": {
      title: "Tiontaire Aonad CSS",
      description:
        "Tiontaigh idir px, rem, em, %, vw, vh agus aonaid CSS eile.",
    },
    "css-minifier": {
      title: "Mionlaighdeoir / Maisitheoir CSS",
      description:
        "Mionlaghdaigh nó maisigh cód CSS le haghaidh táirgeadh nó inléiteachta.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tiontaigh idir aicmí Tailwind CSS agus gnáth-CSS.",
    },
    "cooking-measurement": {
      title: "Tiontaire Tomhas Cócaireachta",
      description:
        "Tiontaigh idir cupáin, spúnóga boird, spúnóga tae, millilítir agus graim.",
    },
    "recipe-scaler": {
      title: "Scálóir Oidis",
      description:
        "Scálaigh comhábhair oidis suas nó síos de réir méid seirbhíse.",
    },
    "oven-temperature": {
      title: "Tiontaire Teochta Oighinn",
      description:
        "Tiontaigh teocht oighinn idir Celsius, Fahrenheit agus Gas Mark.",
    },
    coordinate: {
      title: "Tiontaire Comhordanáidí",
      description:
        "Tiontaigh idir formáidí comhordanáidí DMS, DD agus DDM.",
    },
    "distance-calculator": {
      title: "Áireamhán Faid",
      description:
        "Ríomh an fad idir dhá chomhordanáid thíreolaíocha.",
    },
  },
  nav: {
    allTools: "Gach tiontaire",
    language: "Teanga",
  },
  footer: {
    tools: "Tiontairí",
    legal: "Dlíthiúil",
    privacy: "Polasaí Príobháideachta",
    terms: "Téarmaí Seirbhíse",
    copyright: "ToolPop. Gach ceart ar cosaint.",
    company: "Cuideachta",
    about: "Maidir Linn",
    contact: "Teagmháil",
    faq: "FAQ",
  },
  common: {
    backToAll: "Gach tiontaire",
    inputPlaceholder: "Cuir isteach luach le tiontú...",
    outputLabel: "Toradh",
    copyToClipboard: "Cóipeáil",
    copied: "Cóipeáilte!",
    clear: "Glan",
    paste: "Greamaigh",
    processing: "Ag tiontú...",
    startOver: "Tosaigh arís",
    process: "Tiontaigh",
    tryAgain: "Bain triail eile as",
    notImplemented: "Tá an tiontaire seo ag teacht go luath.",
    tryOtherTools: "Bain triail as tiontairí eile",
    privacyBadge: "Déantar gach tiontú i do bhrabhsálaí",
    favoriteAdded: "Curtha le ceanáin",
    favoriteRemoved: "Bainte ó cheanáin",
    comingSoon: "Ag Teacht go Luath",
    share: "Roinn",
    shareTitle: "Roinn an tiontaire seo",
    shareSubtitle: "Roinn an tiontaire úsáideach seo le daoine eile",
    shareCopied: "Nasc cóipeáilte!",
    shareCopyLink: "Cóipeáil nasc",
    downloadAsFile: "Íoslódáil",
    options: "Roghanna",
    input: "Ionchur",
    output: "Aschur",
    convert: "Tiontaigh",
    swap: "Malartaigh",
    from: "Ó",
    to: "Go",
    result: "Toradh",
    allConversions: "Gach tiontú",
    details: "Sonraí",
    pageNotFound: "Tiontaire gan aimsiú",
    goHome: "Ar ais go gach tiontaire",
    colorPickerLabel: "Roghnóir dathanna",
  },
  toolOptions: {
    fromUnit: "Ó",
    toUnit: "Go",
    precision: "Ionaid dheachúlacha",
    baseSize: "Bunmhéid clófhoirne (px)",
    parentSize: "Méid clófhoirne tuismitheora (px)",
    containerWidth: "Leithead coimeádáin (px)",
    viewportWidth: "Leithead amharcphort (px)",
    viewportHeight: "Airde amharcphort (px)",
    direction: "Treo",
    mode: "Mód",
    ingredient: "Comhábhar",
    water: "Uisce",
    flour: "Plúr",
    sugar: "Siúcra",
    butter: "Im",
    rice: "Rís",
    milk: "Bainne",
    originalServings: "Seirbhísí bunaidh",
    targetServings: "Seirbhísí sprice",
    fromTimezone: "Ó chriosam",
    toTimezone: "Go criosam",
    inputFormat: "Formáid ionchuir",
    outputFormat: "Formáid aschuir",
    harmony: "Comhchuibheas dathanna",
    complementary: "Comhlántach",
    triadic: "Triantánach",
    analogous: "Analógach",
    splitComplementary: "Comhlántach scoilte",
    tetradic: "Ceathairénach",
    gradientType: "Cineál grádáin",
    linear: "Líneach",
    radial: "Gathach",
    conic: "Cónach",
    gradientAngle: "Uillinn (deg)",
    rootName: "Ainm fréamh-chomhéadain",
    tableName: "Ainm tábla",
    minify: "Mionlaghdaigh",
    beautify: "Maisigh",
    colorType: "Cineál easpa",
    protanopia: "Protanóipia (gan dearg)",
    deuteranopia: "Deuteranóipia (gan glas)",
    tritanopia: "Tritanóipia (gan gorm)",
    achromatopsia: "Acrómatopsia (gan dath)",
    operation: "Oibríocht",
    difference: "Difríocht",
    add: "Cuir leis",
    subtract: "Bain",
    amount: "Méid",
    unit: "Aonad",
    days: "Laethanta",
    weeks: "Seachtainí",
    months: "Míonna",
    years: "Blianta",
    fromBase: "Ó bhun",
    toBase: "Go bun",
    binary: "Dénártha (2)",
    octal: "Ochtártha (8)",
    decimal: "Deachúlach (10)",
    hexadecimal: "Heicsidheachúlach (16)",
    seconds: "Soicindí",
    milliseconds: "Milleasoicindí",
    autoDetect: "Braith go huathoibríoch",
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
    markdown: "Tábla Markdown",
    html: "Tábla HTML",
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
    toRoman: "Uimhir → Rómhánach",
    toArabic: "Rómhánach → Uimhir",
    toScientific: "Caighdeánach → Eolaíoch",
    toStandard: "Eolaíoch → Caighdeánach",
    toFraction: "Deachúil → Codán",
    toDecimal: "Codán → Deachúil",
    decimalToPercent: "Deachúil → Céatadán",
    percentToDecimal: "Céatadán → Deachúil",
    fractionToPercent: "Codán → Céatadán",
    dd: "Céimeanna Deachúlacha (DD)",
    dms: "Céimeanna Nóiméid Soicindí (DMS)",
    ddm: "Céimeanna Nóiméid Dheachúlacha (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/BBBB)",
    eu: "EU (DD/MM/BBBB)",
    long: "Formáid fhada",
    short: "Formáid ghearr",
    relative: "Coibhneasta",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Dath an Chúlra",
    monochromatic: "Aonchrómatach",
    timestampToDate: "Stampa Ama → Dáta",
    dateToTimestamp: "Dáta → Stampa Ama",
    showDetails: "Taispeáin miondealú",
    addDays: "Cuir laethanta leis",
    subtractDays: "Bain laethanta",
    datetimeHint: "m.sh. 2024-01-15, 1705312200, now",
    endDate: "Dáta deiridh",
    today: "Inniu (réamhshocrú)",
    dateUnit: "Aonad",
  },
  statsLabels: {
    lines: "Línte",
    characters: "Carachtair",
    rows: "Sraitheanna",
    columns: "Colúin",
    elements: "Eilimintí",
    keys: "Eochracha",
    interfaces: "Comhéadain",
    properties: "Airíonna",
    originalSize: "Bunmhéid",
    resultSize: "Méid toraidh",
    savings: "Coigilt",
    ingredients: "Comhábhair",
    scaleFactor: "Fachtóir scálaithe",
    contrastRatio: "Cóimheas codarsnachta",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Domhanleithead",
    longitude: "Domhanfhad",
    distanceKm: "Fad (km)",
    distanceMi: "Fad (mi)",
    years: "Blianta",
    months: "Míonna",
    days: "Laethanta",
  },
  processorMessages: {
    invalidTimezone: "Criosam neamhbhailí",
    pass: "Pas", fail: "Teip",
    fromNow: "as seo amach", ago: "ó shin",
    today: "Inniu", tomorrow: "Amárach", yesterday: "Inné",
    seconds: "soicind", secondsPlural: "soicindí",
    minutes: "nóiméad", minutesPlural: "nóiméid",
    hours: "uair", hoursPlural: "uaireanta",
    daysUnit: "lá", daysPlural: "laethanta",
    weeksUnit: "seachtain", weeksPlural: "seachtainí",
    monthsUnit: "mí", monthsPlural: "míonna",
    yearsUnit: "bliain", yearsPlural: "blianta",
    gasmark: "Gas Mark",
    veryCool: "An-fhionnuar", cool: "Fionnuar", moderatelyCool: "Measartha fionnuar",
    moderate: "Measartha", moderatelyHot: "Measartha te",
    hot: "Te", veryHot: "An-te", extremelyHot: "Thar a bheith te",
    original: "Bunaidh",
    from: "Ó", to: "Go",
    totalDays: "Laethanta iomlána", weeksDays: "Seachtainí + Laethanta",
    originalDate: "Dáta bunaidh", operationLabel: "Oibríocht",
    resultDate: "Dáta toraidh", dayOfWeek: "Lá den tseachtain",
    daysBetween: "Laethanta idir",
    age: "Aois", totalMonths: "Míonna iomlána",
    totalHours: "Uaireanta iomlána", totalMinutes: "Nóiméid iomlána",
    nextBirthday: "An chéad bhreithlá eile",
    roman: "Rómhánach", arabic: "Arabach",
    scientific: "Eolaíoch", standard: "Caighdeánach", engineering: "Innealtóireacht",
    fraction: "Codán", simplified: "Simplithe", percentage: "Céatadán",
    color1: "Dath 1", color2: "Dath 2",
    contrastRatioLabel: "Cóimheas Codarsnachta",
    aaNormalText: "AA Gnáthtéacs", aaLargeText: "AA Téacs Mór",
    aaaNormalText: "AAA Gnáthtéacs", aaaLargeText: "AAA Téacs Mór",
    gradientTypeLabel: "Cineál", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Tiontairí Saor in Aisce Ar Líne",
    siteDescription:
      "Tiontaigh aonaid, dathanna, formáidí sonraí, dátaí agus tuilleadh. Saor in aisce, tapa agus príobháideach — ritheann gach rud i do bhrabhsálaí.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blag",
    description:
      "Leideanna, treoir agus eolas faoi thiontuithe aonad, formáidí sonraí agus tuilleadh.",
    readMore: "Léigh tuilleadh",
    backToBlog: "Ar ais go dtí an blag",
    publishedOn: "Foilsithe ar",
    categoryGuide: "Treoir",
    categoryTips: "Leideanna",
    categoryKnowledge: "Eolas",
  },
  cookie: {
    message:
      "Úsáidimid fianáin chun do thaithí a fheabhsú. Trí leanúint ar aghaidh, aontaíonn tú lenár bpolasaí fianán.",
    accept: "Glac",
    decline: "Diúltaigh",
  },
  unitLabels: {
    length: {
      m: "Méadar (m)", km: "Ciliméadar (km)", cm: "Ceintiméadar (cm)", mm: "Milliméadar (mm)",
      mi: "Míle (mi)", yd: "Slat (yd)", ft: "Troigh (ft)", in: "Orlach (in)",
      nm: "Muirmhíle (nm)", "\u03BCm": "Micreaméadar (\u03BCm)",
    },
    weight: {
      kg: "Cileagram (kg)", g: "Gram (g)", mg: "Milleagram (mg)", lb: "Punt (lb)",
      oz: "Unsa (oz)", ton: "Tonna méadrach (t)", st: "Cloch (st)", ct: "Carat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Méadar cearnach (m\u00B2)", "km\u00B2": "Ciliméadar cearnach (km\u00B2)",
      ha: "Heicteár (ha)", acre: "Acra", "ft\u00B2": "Troigh chearnach (ft\u00B2)",
      "mi\u00B2": "Míle cearnach (mi\u00B2)", "yd\u00B2": "Slat chearnach (yd\u00B2)",
      "cm\u00B2": "Ceintiméadar cearnach (cm\u00B2)",
    },
    volume: {
      L: "Lítear (L)", mL: "Millilítear (mL)", gal: "Gallún SAM (gal)",
      "fl oz": "Unsa leachtach SAM (fl oz)", cup: "Cupán SAM", pt: "Pionta SAM (pt)",
      qt: "Cárt SAM (qt)", "m\u00B3": "Méadar ciúbach (m\u00B3)",
      "cm\u00B3": "Ceintiméadar ciúbach (cm\u00B3)", tbsp: "Spúnóg boird (tbsp)", tsp: "Spúnóg tae (tsp)",
    },
    speed: {
      "m/s": "Méadar/soic (m/s)", "km/h": "Ciliméadar/u (km/h)", mph: "Míle/u (mph)",
      kn: "Muirmhíle/u (kn)", "ft/s": "Troigh/soic (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milleasoicind (ms)", s: "Soicind (s)", min: "Nóiméad (min)", h: "Uair (h)",
      d: "Lá (d)", wk: "Seachtain (wk)", mo: "Mí (mo)", yr: "Bliain (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Cileapascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmaisféar (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Giúl (J)", kJ: "Cileagiúl (kJ)", cal: "Calra (cal)", kcal: "Cileacalra (kcal)",
      Wh: "Vata-uair (Wh)", kWh: "Cileavatuair (kWh)", BTU: "BTU", eV: "Leictreonvolt (eV)",
    },
    power: {
      W: "Vata (W)", kW: "Cileavata (kW)", MW: "Meigeavata (MW)", hp: "Each-chumhacht (hp)",
      "BTU/h": "BTU/u", "cal/s": "Calra/soic",
    },
    frequency: {
      Hz: "Heirts (Hz)", kHz: "Cileaheirts (kHz)", MHz: "Meigiheirtsí (MHz)",
      GHz: "Gigiheirtsí (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Céim (\u00B0)", rad: "Radán (rad)", grad: "Grádán (grad)",
      turn: "Rothla", arcmin: "Nóiméad stua (\u2032)", arcsec: "Soicind stua (\u2033)",
    },
    "data-storage": {
      B: "Beart (B)", KB: "Cileabeart (KB)", MB: "Meigibeart (MB)", GB: "Gigibeart (GB)",
      TB: "Terabeart (TB)", PB: "Petabeart (PB)", bit: "Giotán",
      Kbit: "Cileagiotán", Mbit: "Meigigiotán", Gbit: "Gigigiotán",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (SAM)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Cupán", tbsp: "Spúnóg boird", tsp: "Spúnóg tae", mL: "Millilítear (mL)",
      L: "Lítear (L)", fl_oz: "Unsa leachtach", g: "Gram (g)", kg: "Cileagram (kg)",
      oz: "Unsa (oz)", lb: "Punt (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Picteilíní (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Picteilíní (px)", em: "Em (em)" },
    "px-percent": { px: "Picteilíní (px)", "%": "Céatadán (%)" },
    "css-unit": {
      px: "Picteilíní (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Céatadán (%)", vw: "Leithead Amharcphort (vw)", vh: "Airde Amharcphort (vh)",
    },
  },
};

export default dict;
