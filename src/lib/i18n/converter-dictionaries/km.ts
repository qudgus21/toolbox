import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "ឧបករណ៍បម្លែងទាំងអស់ដែលអ្នកត្រូវការ",
    titleAccent: "បម្លែង",
    description:
      "បម្លែងឯកតា ពណ៌ ទម្រង់ទិន្នន័យ កាលបរិច្ឆេទ និងច្រើនទៀត — ភ្លាមៗនៅក្នុងកម្មវិធីរុករក។",
    tabAll: "ទាំងអស់",
    categoryUnit: "ឯកតា",
    categoryNumber: "លេខ",
    categoryColor: "ពណ៌",
    categoryDatetime: "កាលបរិច្ឆេទ/ពេលវេលា",
    categoryData: "ទិន្នន័យ",
    categoryCss: "CSS",
    categoryCooking: "ធ្វើម្ហូប",
    categoryGeography: "ភូមិសាស្ត្រ",
    searchPlaceholder: "ស្វែងរកឧបករណ៍បម្លែង...",
    noResults: "រកមិនឃើញឧបករណ៍បម្លែង។",
    recentTools: "បានប្រើថ្មីៗ",
    favorites: "ចំណូលចិត្ត",
    favDragHint: "អូសដើម្បីរៀបចំឡើងវិញ",
    favHint: "ចុចផ្កាយដើម្បីបន្ថែមចំណូលចិត្ត",
    gridView: "ទិដ្ឋភាពក្រឡា",
    listView: "ទិដ្ឋភាពបញ្ជី",
  },
  trust: {
    encryption: "ដំណើរការសុវត្ថិភាព",
    encryptionDesc: "ការបម្លែងទាំងអស់ដំណើរការក្នុងកម្មវិធីរុករករបស់អ្នក",
    autoDelete: "គ្មានការរក្សាទុកទិន្នន័យ",
    autoDeleteDesc: "ទិន្នន័យរបស់អ្នកមិនត្រូវបានរក្សាទុក ឬផ្ញើទៅម៉ាស៊ីនមេឡើយ",
    free: "ឥតគិតថ្លៃ 100%",
    freeDesc: "គ្មានដែនកំណត់ គ្មានការចុះឈ្មោះ គ្មានថ្លៃលាក់កំបាំង",
    browserProcessing: "លទ្ធផលភ្លាមៗ",
    browserProcessingDesc: "បម្លែងក្នុងពេលវេលាជាក់ស្តែងពេលអ្នកវាយ",
  },
  tools: {
    length: {
      title: "ឧបករណ៍បម្លែងប្រវែង",
      description:
        "បម្លែងរវាងម៉ែត្រ គីឡូម៉ែត្រ ម៉ាយល៍ ហ្វីត អ៊ីញ និងច្រើនទៀត។",
    },
    weight: {
      title: "ឧបករណ៍បម្លែងទម្ងន់",
      description:
        "បម្លែងរវាងគីឡូក្រាម ផោន អោន តោន និងច្រើនទៀត។",
    },
    temperature: {
      title: "ឧបករណ៍បម្លែងសីតុណ្ហភាព",
      description: "បម្លែងរវាង Celsius Fahrenheit និង Kelvin។",
    },
    area: {
      title: "ឧបករណ៍បម្លែងផ្ទៃ",
      description:
        "បម្លែងរវាងម៉ែត្រការ៉េ ហិកតា អេកឺ ហ្វីតការ៉េ និងច្រើនទៀត។",
    },
    volume: {
      title: "ឧបករណ៍បម្លែងមាឌ",
      description:
        "បម្លែងរវាងលីត្រ ហ្គាឡុង ពែង អោនរាវ និងច្រើនទៀត។",
    },
    speed: {
      title: "ឧបករណ៍បម្លែងល្បឿន",
      description: "បម្លែងរវាង m/s km/h mph ថ្នorg់ និងច្រើនទៀត។",
    },
    time: {
      title: "ឧបករណ៍បម្លែងពេលវេលា",
      description:
        "បម្លែងរវាងវិនាទី នាទី ម៉ោង ថ្ងៃ សប្តាហ៍ និងច្រើនទៀត។",
    },
    pressure: {
      title: "ឧបករណ៍បម្លែងសម្ពាធ",
      description:
        "បម្លែងរវាង Pascal bar PSI atmosphere និងច្រើនទៀត។",
    },
    energy: {
      title: "ឧបករណ៍បម្លែងថាមពល",
      description:
        "បម្លែងរវាង joule កាឡូរី គីឡូវ៉ាត់ម៉ោង BTU និងច្រើនទៀត។",
    },
    power: {
      title: "ឧបករណ៍បម្លែងអំណាច",
      description:
        "បម្លែងរវាងវ៉ាត់ គីឡូវ៉ាត់ សេសម៉ា និងច្រើនទៀត។",
    },
    frequency: {
      title: "ឧបករណ៍បម្លែងប្រេកង់",
      description:
        "បម្លែងរវាង hertz kilohertz megahertz gigahertz និង RPM។",
    },
    angle: {
      title: "ឧបករណ៍បម្លែងមុំ",
      description: "បម្លែងរវាងដឺក្រេ radian gradian និងវិល។",
    },
    "data-storage": {
      title: "ឧបករណ៍បម្លែងការផ្ទុកទិន្នន័យ",
      description:
        "បម្លែងរវាង byte kilobyte megabyte gigabyte និងច្រើនទៀត។",
    },
    "fuel-economy": {
      title: "ឧបករណ៍បម្លែងការចំណាយប្រេង",
      description: "បម្លែងរវាង km/L mpg និង L/100km។",
    },
    "number-base": {
      title: "ឧបករណ៍បម្លែងមូលដ្ឋានលេខ",
      description:
        "បម្លែងរវាងគោល ២ គោល ៨ គោល ១០ គោល ១៦ និងគោលផ្ទាល់ខ្លួន។",
    },
    "roman-numeral": {
      title: "ឧបករណ៍បម្លែងលេខរ៉ូម៉ាំង",
      description: "បម្លែងរវាងលេខរ៉ូម៉ាំង និងលេខអារ៉ាប់។",
    },
    "scientific-notation": {
      title: "ឧបករណ៍បម្លែងសញ្ញាណវិទ្យាសាស្ត្រ",
      description:
        "បម្លែងរវាងសញ្ញាណវិទ្យាសាស្ត្រ និងលេខស្តង់ដារ។",
    },
    "fraction-decimal": {
      title: "ប្រភាគ ↔ ទសភាគ",
      description: "បម្លែងរវាងប្រភាគ និងទសភាគ។",
    },
    percentage: {
      title: "ឧបករណ៍បម្លែងភាគរយ",
      description:
        "បម្លែងរវាងប្រភាគ ទសភាគ និងភាគរយ។",
    },
    "color-converter": {
      title: "ឧបករណ៍បម្លែងពណ៌",
      description:
        "បម្លែងរវាងទម្រង់ពណ៌ HEX RGB HSL HSV និង CMYK។",
    },
    "color-palette-generator": {
      title: "កម្មវិធីបង្កើតក្ដារពណ៌",
      description:
        "បង្កើតក្ដារពណ៌បំពេញ ត្រីកោណ និងស្រដៀង។",
    },
    "gradient-generator": {
      title: "កម្មវិធីបង្កើត CSS Gradient",
      description:
        "បង្កើត CSS gradient ត្រង់ រង្វង់ និងកោណ ជាមួយការមើលផ្ទាល់។",
    },
    "color-contrast-checker": {
      title: "ឧបករណ៍ពិនិត្យកម្រិតពណ៌ផ្ទុយ",
      description:
        "ពិនិត្យអនុបាតពណ៌ផ្ទុយ WCAG AA/AAA រវាងពណ៌ពីរ។",
    },
    "color-blindness-simulator": {
      title: "ឧបករណ៍ក្លែងធ្វើពណ៌សម្រាប់ពិការភ្នែក",
      description:
        "ក្លែងធ្វើរបៀបដែលពណ៌បង្ហាញសម្រាប់អ្នកមានពិការភាពមើលពណ៌។",
    },
    timezone: {
      title: "ឧបករណ៍បម្លែងតំបន់ពេលវេលា",
      description:
        "បម្លែងពេលវេលារវាងតំបន់ពេលវេលាផ្សេងៗជុំវិញពិភពលោក។",
    },
    "unix-timestamp": {
      title: "ឧបករណ៍បម្លែង Unix Timestamp",
      description:
        "បម្លែងរវាង Unix timestamp និងកាលបរិច្ឆេទអាចអានបាន។",
    },
    "date-format": {
      title: "ឧបករណ៍បម្លែងទម្រង់កាលបរិច្ឆេទ",
      description:
        "បម្លែងកាលបរិច្ឆេទរវាងទម្រង់ផ្សេងៗ (ISO US EU និងច្រើនទៀត)។",
    },
    "date-calculator": {
      title: "ម៉ាស៊ីនគិតកាលបរិច្ឆេទ",
      description:
        "គណនាភាពខុសគ្នារវាងកាលបរិច្ឆេទ ឬបន្ថែម/ដកថ្ងៃ។",
    },
    "age-calculator": {
      title: "ម៉ាស៊ីនគិតអាយុ",
      description:
        "គណនាអាយុពិតប្រាកដពីថ្ងៃកំណើតជាឆ្នាំ ខែ និងថ្ងៃ។",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "បម្លែងរវាងទម្រង់ទិន្នន័យ JSON និង YAML។",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "បម្លែងរវាង JSON array និងទម្រង់តារាង CSV។",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "បម្លែងរវាងទម្រង់ទិន្នន័យ JSON និង XML។",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "បម្លែងរវាងទម្រង់កំណត់រចនាសម្ព័ន្ធ JSON និង TOML។",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "បម្លែងរវាង Markdown និង HTML markup។",
    },
    "csv-table": {
      title: "CSV ទៅតារាង",
      description: "បម្លែងទិន្នន័យ CSV ទៅតារាង Markdown ឬ HTML។",
    },
    "json-typescript": {
      title: "JSON ទៅ TypeScript",
      description: "បង្កើត TypeScript interface ពីទិន្នន័យ JSON។",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "បម្លែងរវាង SQL INSERT statement និងទិន្នន័យ JSON។",
    },
    "px-rem": {
      title: "px ↔ rem ឧបករណ៍បម្លែង",
      description:
        "បម្លែងរវាង pixel និងឯកតា rem ជាមួយទំហំមូលដ្ឋានផ្ទាល់ខ្លួន។",
    },
    "px-em": {
      title: "px ↔ em ឧបករណ៍បម្លែង",
      description:
        "បម្លែងរវាង pixel និងឯកតា em ជាមួយទំហំមេផ្ទាល់ខ្លួន។",
    },
    "px-percent": {
      title: "px ↔ % ឧបករណ៍បម្លែង",
      description:
        "បម្លែងរវាង pixel និងភាគរយជាមួយទទឹងកុងតឺន័រផ្ទាល់ខ្លួន។",
    },
    "css-unit": {
      title: "ឧបករណ៍បម្លែងឯកតា CSS",
      description:
        "បម្លែងរវាង px rem em % vw vh និងឯកតា CSS ផ្សេងទៀត។",
    },
    "css-minifier": {
      title: "CSS Minifier / Beautifier",
      description:
        "បង្រួម ឬធ្វើឲ្យកូដ CSS ស្រស់ស្អាតសម្រាប់ផលិតកម្ម ឬអាចអានបាន។",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "បម្លែងរវាង class Tailwind CSS និង CSS ធម្មតា។",
    },
    "cooking-measurement": {
      title: "ឧបករណ៍បម្លែងខ្នាតម្ហូប",
      description:
        "បម្លែងរវាងពែង ស្លាបព្រាបាយ ស្លាបព្រាកាហ្វេ មីលីលីត្រ និងក្រាម។",
    },
    "recipe-scaler": {
      title: "ឧបករណ៍កែមាត្រដ្ឋានរូបមន្តម្ហូប",
      description:
        "កែមាត្រដ្ឋានគ្រឿងផ្សំតាមចំនួនអ្នកទទួលទាន។",
    },
    "oven-temperature": {
      title: "ឧបករណ៍បម្លែងសីតុណ្ហភាពឡ",
      description:
        "បម្លែងរវាង Celsius Fahrenheit និង Gas Mark សម្រាប់សីតុណ្ហភាពឡ។",
    },
    coordinate: {
      title: "ឧបករណ៍បម្លែងកូអរដោនេ",
      description:
        "បម្លែងរវាងទម្រង់កូអរដោនេ DMS DD និង DDM។",
    },
    "distance-calculator": {
      title: "ម៉ាស៊ីនគិតចម្ងាយ",
      description:
        "គណនាចម្ងាយរវាងកូអរដោនេភូមិសាស្ត្រពីរ។",
    },
  },
  nav: {
    allTools: "ឧបករណ៍បម្លែងទាំងអស់",
    language: "ភាសា",
  },
  footer: {
    tools: "ឧបករណ៍បម្លែង",
    legal: "ផ្នែកច្បាប់",
    privacy: "គោលការណ៍ឯកជនភាព",
    terms: "លក្ខខណ្ឌសេវាកម្ម",
    copyright: "ToolPop។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",
    company: "ក្រុមហ៊ុន",
    about: "អំពីយើង",
    contact: "ទំនាក់ទំនង",
    faq: "សំណួរញឹកញាប់",
  },
  common: {
    backToAll: "ឧបករណ៍បម្លែងទាំងអស់",
    inputPlaceholder: "បញ្ចូលតម្លៃដើម្បីបម្លែង...",
    outputLabel: "លទ្ធផល",
    copyToClipboard: "ចម្លងទៅក្ដារតម្បៀតខ្ទាស់",
    copied: "បានចម្លង!",
    clear: "សម្អាត",
    paste: "បិទភ្ជាប់",
    processing: "កំពុងបម្លែង...",
    startOver: "ចាប់ផ្តើមឡើងវិញ",
    process: "បម្លែង",
    tryAgain: "សាកម្តងទៀត",
    notImplemented: "ឧបករណ៍បម្លែងនេះនឹងមកដល់ឆាប់ៗ។",
    tryOtherTools: "សាកឧបករណ៍បម្លែងផ្សេងទៀត",
    privacyBadge: "ការបម្លែងទាំងអស់ដំណើរការក្នុងកម្មវិធីរុករករបស់អ្នក",
    favoriteAdded: "បានបន្ថែមទៅចំណូលចិត្ត",
    favoriteRemoved: "បានដកចេញពីចំណូលចិត្ត",
    comingSoon: "មកដល់ឆាប់ៗ",
    share: "ចែករំលែក",
    shareTitle: "ចែករំលែកឧបករណ៍បម្លែងនេះ",
    shareSubtitle: "ចែករំលែកឧបករណ៍បម្លែងមានប្រយោជន៍នេះជាមួយអ្នកផ្សេង",
    shareCopied: "បានចម្លងតំណ!",
    shareCopyLink: "ចម្លងតំណ",
    downloadAsFile: "ទាញយក",
    options: "ជម្រើស",
    input: "បញ្ចូល",
    output: "លទ្ធផល",
    convert: "បម្លែង",
    swap: "ប្តូរ",
    from: "ពី",
    to: "ទៅ",
    result: "លទ្ធផល",
    allConversions: "ការបម្លែងទាំងអស់",
    details: "ព័ត៌មានលម្អិត",
    pageNotFound: "រកមិនឃើញឧបករណ៍បម្លែង",
    goHome: "ត្រឡប់ទៅឧបករណ៍បម្លែងទាំងអស់",
  },
  toolOptions: {
    fromUnit: "ពី",
    toUnit: "ទៅ",
    precision: "ខ្ទង់ទសភាគ",
    baseSize: "ទំហំពុម្ពអក្សរមូលដ្ឋាន (px)",
    parentSize: "ទំហំពុម្ពអក្សរមេ (px)",
    containerWidth: "ទទឹងកុងតឺន័រ (px)",
    viewportWidth: "ទទឹងផ្ទៃមើល (px)",
    viewportHeight: "កម្ពស់ផ្ទៃមើល (px)",
    direction: "ទិសដៅ",
    mode: "របៀប",
    ingredient: "គ្រឿងផ្សំ",
    water: "ទឹក",
    flour: "ម្សៅ",
    sugar: "ស្ករ",
    butter: "ប៊ឺ",
    rice: "អង្ករ",
    milk: "ទឹកដោះគោ",
    originalServings: "ចំនួនចានដើម",
    targetServings: "ចំនួនចានគោលដៅ",
    fromTimezone: "តំបន់ពេលវេលាដើម",
    toTimezone: "តំបន់ពេលវេលាគោលដៅ",
    inputFormat: "ទម្រង់បញ្ចូល",
    outputFormat: "ទម្រង់លទ្ធផល",
    harmony: "សម្របសម្រួលពណ៌",
    complementary: "បំពេញ",
    triadic: "ត្រីកោណ",
    analogous: "ស្រដៀង",
    splitComplementary: "បំពេញបំបែក",
    tetradic: "ចតុកោណ",
    gradientType: "ប្រភេទ gradient",
    linear: "ត្រង់",
    radial: "រង្វង់",
    conic: "កោណ",
    gradientAngle: "មុំ (deg)",
    rootName: "ឈ្មោះ interface ឫស",
    tableName: "ឈ្មោះតារាង",
    minify: "បង្រួម",
    beautify: "ធ្វើឲ្យស្អាត",
    colorType: "ប្រភេទពិការភាព",
    protanopia: "Protanopia (គ្មានពណ៌ក្រហម)",
    deuteranopia: "Deuteranopia (គ្មានពណ៌បៃតង)",
    tritanopia: "Tritanopia (គ្មានពណ៌ខៀវ)",
    achromatopsia: "Achromatopsia (គ្មានពណ៌)",
    operation: "ប្រតិបត្តិការ",
    difference: "ភាពខុសគ្នា",
    add: "បន្ថែម",
    subtract: "ដក",
    amount: "ចំនួន",
    unit: "ឯកតា",
    days: "ថ្ងៃ",
    weeks: "សប្តាហ៍",
    months: "ខែ",
    years: "ឆ្នាំ",
    fromBase: "ពីគោល",
    toBase: "ទៅគោល",
    binary: "គោល ២ (2)",
    octal: "គោល ៨ (8)",
    decimal: "គោល ១០ (10)",
    hexadecimal: "គោល ១៦ (16)",
    seconds: "វិនាទី",
    milliseconds: "មិល្លីវិនាទី",
    autoDetect: "រកឃើញស្វ័យប្រវត្តិ",
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
    markdown: "តារាង Markdown",
    html: "តារាង HTML",
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
    toRoman: "លេខ → រ៉ូម៉ាំង",
    toArabic: "រ៉ូម៉ាំង → លេខ",
    toScientific: "ស្តង់ដារ → វិទ្យាសាស្ត្រ",
    toStandard: "វិទ្យាសាស្ត្រ → ស្តង់ដារ",
    toFraction: "ទសភាគ → ប្រភាគ",
    toDecimal: "ប្រភាគ → ទសភាគ",
    decimalToPercent: "ទសភាគ → ភាគរយ",
    percentToDecimal: "ភាគរយ → ទសភាគ",
    fractionToPercent: "ប្រភាគ → ភាគរយ",
    dd: "ដឺក្រេទសភាគ (DD)",
    dms: "ដឺក្រេ នាទី វិនាទី (DMS)",
    ddm: "ដឺក្រេ នាទីទសភាគ (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "ទម្រង់វែង",
    short: "ទម្រង់ខ្លី",
    relative: "ដែនកំណត់",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "ពណ៌ផ្ទៃខាងក្រោយ",
    monochromatic: "ឯកពណ៌",
    timestampToDate: "Timestamp → កាលបរិច្ឆេទ",
    dateToTimestamp: "កាលបរិច្ឆេទ → Timestamp",
    showDetails: "បង្ហាញការវិភាគលម្អិត",
    addDays: "បន្ថែមថ្ងៃ",
    subtractDays: "ដកថ្ងៃ",
    datetimeHint: "ឧ. 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "បន្ទាត់",
    characters: "តួអក្សរ",
    rows: "ជួរដេក",
    columns: "ជួរឈរ",
    elements: "ធាតុ",
    keys: "គន្លឹះ",
    interfaces: "Interface",
    properties: "លក្ខណសម្បត្តិ",
    originalSize: "ទំហំដើម",
    resultSize: "ទំហំលទ្ធផល",
    savings: "សន្សំ",
    ingredients: "គ្រឿងផ្សំ",
    scaleFactor: "កត្តាមាត្រដ្ឋាន",
    contrastRatio: "អនុបាតពណ៌ផ្ទុយ",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "រយៈទទឹង",
    longitude: "រយៈបណ្តោយ",
    distanceKm: "ចម្ងាយ (km)",
    distanceMi: "ចម្ងាយ (mi)",
    years: "ឆ្នាំ",
    months: "ខែ",
    days: "ថ្ងៃ",
  },
  processorMessages: {
    invalidTimezone: "តំបន់ពេលវេលាមិនត្រឹមត្រូវ",
    pass: "ជោគជ័យ", fail: "បរាជ័យ",
    fromNow: "ចាប់ពីឥឡូវ", ago: "មុន",
    today: "ថ្ងៃនេះ", tomorrow: "ថ្ងៃស្អែក", yesterday: "ម្សិលមិញ",
    seconds: "វិនាទី", secondsPlural: "វិនាទី",
    minutes: "នាទី", minutesPlural: "នាទី",
    hours: "ម៉ោង", hoursPlural: "ម៉ោង",
    daysUnit: "ថ្ងៃ", daysPlural: "ថ្ងៃ",
    weeksUnit: "សប្តាហ៍", weeksPlural: "សប្តាហ៍",
    monthsUnit: "ខែ", monthsPlural: "ខែ",
    yearsUnit: "ឆ្នាំ", yearsPlural: "ឆ្នាំ",
    gasmark: "Gas Mark",
    veryCool: "ត្រជាក់ខ្លាំង", cool: "ត្រជាក់", moderatelyCool: "ត្រជាក់មធ្យម",
    moderate: "មធ្យម", moderatelyHot: "ក្ដៅមធ្យម",
    hot: "ក្ដៅ", veryHot: "ក្ដៅខ្លាំង", extremelyHot: "ក្ដៅខ្លាំងបំផុត",
    original: "ដើម",
    from: "ពី", to: "ទៅ",
    totalDays: "ថ្ងៃសរុប", weeksDays: "សប្តាហ៍ + ថ្ងៃ",
    originalDate: "កាលបរិច្ឆេទដើម", operationLabel: "ប្រតិបត្តិការ",
    resultDate: "កាលបរិច្ឆេទលទ្ធផល", dayOfWeek: "ថ្ងៃក្នុងសប្តាហ៍",
    daysBetween: "ថ្ងៃរវាង",
    age: "អាយុ", totalMonths: "ខែសរុប",
    totalHours: "ម៉ោងសរុប", totalMinutes: "នាទីសរុប",
    nextBirthday: "ថ្ងៃកំណើតបន្ទាប់",
    roman: "រ៉ូម៉ាំង", arabic: "អារ៉ាប់",
    scientific: "វិទ្យាសាស្ត្រ", standard: "ស្តង់ដារ", engineering: "វិស្វកម្ម",
    fraction: "ប្រភាគ", simplified: "សាមញ្ញ", percentage: "ភាគរយ",
    color1: "ពណ៌ ១", color2: "ពណ៌ ២",
    contrastRatioLabel: "អនុបាតពណ៌ផ្ទុយ",
    aaNormalText: "AA អក្សរធម្មតា", aaLargeText: "AA អក្សរធំ",
    aaaNormalText: "AAA អក្សរធម្មតា", aaaLargeText: "AAA អក្សរធំ",
    gradientTypeLabel: "ប្រភេទ", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop ឧបករណ៍បម្លែង — ឧបករណ៍បម្លែងអនឡាញឥតគិតថ្លៃ",
    siteDescription:
      "បម្លែងឯកតា ពណ៌ ទម្រង់ទិន្នន័យ កាលបរិច្ឆេទ និងច្រើនទៀត។ ឥតគិតថ្លៃ រហ័ស និងឯកជន — អ្វីគ្រប់យ៉ាងដំណើរការក្នុងកម្មវិធីរុករក។",
    toolTitleSuffix: "| ToolPop ឧបករណ៍បម្លែង",
  },
  blog: {
    title: "ប្លក់",
    description:
      "គន្លឹះ ការណែនាំ និងចំណេះដឹងអំពីការបម្លែងឯកតា ទម្រង់ទិន្នន័យ និងច្រើនទៀត។",
    readMore: "អានបន្ថែម",
    backToBlog: "ត្រឡប់ទៅប្លក់",
    publishedOn: "ផ្សាយនៅថ្ងៃ",
    categoryGuide: "ការណែនាំ",
    categoryTips: "គន្លឹះ",
    categoryKnowledge: "ចំណេះដឹង",
  },
  cookie: {
    message:
      "យើងប្រើខូគីដើម្បីកែលម្អបទពិសោធន៍របស់អ្នក។ ដោយបន្ត អ្នកយល់ព្រមនឹងគោលការណ៍ខូគីរបស់យើង។",
    accept: "យល់ព្រម",
    decline: "បដិសេធ",
  },
  unitLabels: {
    length: {
      m: "ម៉ែត្រ (m)", km: "គីឡូម៉ែត្រ (km)", cm: "សង់ទីម៉ែត្រ (cm)", mm: "មីលីម៉ែត្រ (mm)",
      mi: "ម៉ាយល៍ (mi)", yd: "យ៉ាត (yd)", ft: "ហ្វីត (ft)", in: "អ៊ីញ (in)",
      nm: "ម៉ាយល៍សមុទ្រ (nm)", "\u03BCm": "មីក្រូម៉ែត្រ (\u03BCm)",
    },
    weight: {
      kg: "គីឡូក្រាម (kg)", g: "ក្រាម (g)", mg: "មីលីក្រាម (mg)", lb: "ផោន (lb)",
      oz: "អោន (oz)", ton: "តោនម៉ែត្រ (t)", st: "ស្តូន (st)", ct: "ការ៉ាត់ (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "ម៉ែត្រការ៉េ (m\u00B2)", "km\u00B2": "គីឡូម៉ែត្រការ៉េ (km\u00B2)",
      ha: "ហិកតា (ha)", acre: "អេកឺ", "ft\u00B2": "ហ្វីតការ៉េ (ft\u00B2)",
      "mi\u00B2": "ម៉ាយល៍ការ៉េ (mi\u00B2)", "yd\u00B2": "យ៉ាតការ៉េ (yd\u00B2)",
      "cm\u00B2": "សង់ទីម៉ែត្រការ៉េ (cm\u00B2)",
    },
    volume: {
      L: "លីត្រ (L)", mL: "មីលីលីត្រ (mL)", gal: "ហ្គាឡុង US (gal)",
      "fl oz": "អោនរាវ US (fl oz)", cup: "ពែង US", pt: "ផាយ US (pt)",
      qt: "ក្វាត US (qt)", "m\u00B3": "ម៉ែត្រគូប (m\u00B3)",
      "cm\u00B3": "សង់ទីម៉ែត្រគូប (cm\u00B3)", tbsp: "ស្លាបព្រាបាយ (tbsp)", tsp: "ស្លាបព្រាកាហ្វេ (tsp)",
    },
    speed: {
      "m/s": "ម៉ែត្រ/វិនាទី (m/s)", "km/h": "គីឡូម៉ែត្រ/ម៉ោង (km/h)", mph: "ម៉ាយល៍/ម៉ោង (mph)",
      kn: "ថ្នorg់ (kn)", "ft/s": "ហ្វីត/វិនាទី (ft/s)", mach: "Mach",
    },
    time: {
      ms: "មីលីវិនាទី (ms)", s: "វិនាទី (s)", min: "នាទី (min)", h: "ម៉ោង (h)",
      d: "ថ្ងៃ (d)", wk: "សប្តាហ៍ (wk)", mo: "ខែ (mo)", yr: "ឆ្នាំ (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosphere (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "កាឡូរី (cal)", kcal: "គីឡូកាឡូរី (kcal)",
      Wh: "វ៉ាត់ម៉ោង (Wh)", kWh: "គីឡូវ៉ាត់ម៉ោង (kWh)", BTU: "BTU", eV: "Electronvolt (eV)",
    },
    power: {
      W: "វ៉ាត់ (W)", kW: "គីឡូវ៉ាត់ (kW)", MW: "មេហ្គាវ៉ាត់ (MW)", hp: "សេសម៉ា (hp)",
      "BTU/h": "BTU/ម៉ោង", "cal/s": "កាឡូរី/វិនាទី",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "ដឺក្រេ (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "វិល", arcmin: "នាទីកោណ (\u2032)", arcsec: "វិនាទីកោណ (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "ពែង", tbsp: "ស្លាបព្រាបាយ", tsp: "ស្លាបព្រាកាហ្វេ", mL: "មីលីលីត្រ (mL)",
      L: "លីត្រ (L)", fl_oz: "អោនរាវ", g: "ក្រាម (g)", kg: "គីឡូក្រាម (kg)",
      oz: "អោន (oz)", lb: "ផោន (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixel (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixel (px)", em: "Em (em)" },
    "px-percent": { px: "Pixel (px)", "%": "ភាគរយ (%)" },
    "css-unit": {
      px: "Pixel (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "ភាគរយ (%)", vw: "ទទឹងផ្ទៃមើល (vw)", vh: "កម្ពស់ផ្ទៃមើល (vh)",
    },
  },
};

export default dict;
