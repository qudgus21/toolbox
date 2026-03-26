import type { CalculatorDictionary } from "../calculator-config";

const dict: CalculatorDictionary = {
  home: {
    title: "ឧបករណ៍គណនាទាំងអស់ដែលអ្នកត្រូវការ",
    titleAccent: "គណនា",
    description:
      "ហិរញ្ញវត្ថុ សុខភាព គណិតវិទ្យា ស្ថិតិ។ ទាំងអស់ដំណើរការនៅក្នុងកម្មវិធីរុករក។",
    tabAll: "ទាំងអស់",
    categoryMath: "គណិតវិទ្យា",
    categoryStatistics: "ស្ថិតិ",
    categoryTrigonometry: "ត្រីកោណមាត្រ",
    categoryFinancial: "ហិរញ្ញវត្ថុ",
    categoryHealth: "សុខភាព",
    categoryEveryday: "ប្រចាំថ្ងៃ",
    categoryEducation: "អប់រំ",
    categoryDeveloper: "អ្នកអភិវឌ្ឍន៍",
    searchPlaceholder: "ស្វែងរកម៉ាស៊ីនគណនា...",
    noResults: "រកមិនឃើញម៉ាស៊ីនគណនាទេ។",
    recentTools: "ប្រើថ្មីៗ",
    favorites: "សំណព្វ",
    favDragHint: "អូសដើម្បីរៀបចំលំដាប់",
    favHint: "ចុចផ្កាយដើម្បីបន្ថែមសំណព្វ",
    gridView: "មើលជាក្រឡា",
    listView: "មើលជាបញ្ជី",
  },
  trust: {
    encryption: "ដំណើរការសុវត្ថិភាព",
    encryptionDesc: "ការគណនាទាំងអស់ដំណើរការក្នុងកម្មវិធីរុករករបស់អ្នក",
    autoDelete: "គ្មានទិន្នន័យត្រូវបានរក្សាទុក",
    autoDeleteDesc: "ការបញ្ចូលរបស់អ្នកមិនត្រូវបានរក្សាទុក ឬផ្ញើទៅម៉ាស៊ីនមេទេ",
    free: "ឥតគិតថ្លៃ 100%",
    freeDesc: "គ្មានដែនកំណត់ គ្មានការចុះឈ្មោះ គ្មានថ្លៃលាក់កំបាំង",
    browserProcessing: "លទ្ធផលភ្លាមៗ",
    browserProcessingDesc: "គណនាភ្លាមៗពេលអ្នកវាយ",
  },
  tools: {
    "percentage-calculator": {
      title: "ម៉ាស៊ីនគណនាភាគរយ",
      description: "គណនាភាគរយ ការផ្លាស់ប្ដូរភាគរយ និងផ្សេងៗទៀត។",
    },
    "scientific-calculator": {
      title: "ម៉ាស៊ីនគណនាវិទ្យាសាស្ត្រ",
      description:
        "វាយតម្លៃកន្សោមគណិតវិទ្យាស្មុគស្មាញជាមួយអនុគមន៍ និងថេរ។",
    },
    "ratio-calculator": {
      title: "ម៉ាស៊ីនគណនាសមាមាត្រ",
      description: "ដោះស្រាយសមាមាត្រ និងធ្វើឱ្យសមាមាត្រសាមញ្ញ។",
    },
    "gcd-lcm": {
      title: "ម៉ាស៊ីនគណនា ភ.ស.រ និង គ.រ.ត",
      description:
        "រកភាគចែកសាមញ្ញធំបំផុត និងគុណរួមតិចបំផុត។",
    },
    factorial: {
      title: "ម៉ាស៊ីនគណនា Factorial",
      description:
        "គណនា factorial, permutation និង double factorial។",
    },
    "prime-checker": {
      title: "ពិនិត្យលេខបឋម",
      description: "ពិនិត្យថាតើលេខមួយជាលេខបឋមឬអត់ និងរកកត្តាបឋម។",
    },
    logarithm: {
      title: "ម៉ាស៊ីនគណនា Logarithm",
      description: "គណនា logarithm នៃមូលដ្ឋានណាមួយ (log, ln, log2)។",
    },
    "quadratic-solver": {
      title: "ដោះស្រាយសមីការការ៉េ",
      description: "ដោះស្រាយ ax² + bx + c = 0 រកឫស។",
    },
    "matrix-calculator": {
      title: "ម៉ាស៊ីនគណនាម៉ាទ្រីស",
      description:
        "បូក គុណ រក determinant និង inverse នៃម៉ាទ្រីស។",
    },
    "mean-median-mode": {
      title: "មធ្យម មេដ្យាន និង ម៉ូដ",
      description: "គណនាស្ថិតិពិពណ៌នាសម្រាប់សំណុំទិន្នន័យ។",
    },
    "standard-deviation": {
      title: "ម៉ាស៊ីនគណនាគម្លាតស្តង់ដារ",
      description:
        "គណនាគម្លាតស្តង់ដារសម្រាប់ប្រជាជន និងគំរូ។",
    },
    probability: {
      title: "ម៉ាស៊ីនគណនាប្រូបាប៊ីលីតេ",
      description: "គណនាប្រូបាប៊ីលីតេមូលដ្ឋាន និងតម្លៃរំពឹង។",
    },
    "permutation-combination": {
      title: "ផ្លាស់ប្ដូរ និង បន្សំ",
      description: "គណនាតម្លៃ nPr និង nCr។",
    },
    "z-score": {
      title: "ម៉ាស៊ីនគណនា Z-Score",
      description:
        "គណនា z-score ពីតម្លៃ មធ្យម និងគម្លាតស្តង់ដារ។",
    },
    "confidence-interval": {
      title: "ម៉ាស៊ីនគណនាចន្លោះទំនុកចិត្ត",
      description: "គណនាចន្លោះទំនុកចិត្តសម្រាប់មធ្យមប្រជាជន។",
    },
    regression: {
      title: "ម៉ាស៊ីនគណនា Regression លីនេអ៊ែរ",
      description: "រកបន្ទាត់ best-fit និង R² សម្រាប់ចំណុចទិន្នន័យ។",
    },
    trigonometry: {
      title: "ម៉ាស៊ីនគណនាត្រីកោណមាត្រ",
      description:
        "គណនា sin, cos, tan និងអនុគមន៍ត្រីកោណមាត្រច្រាស។",
    },
    "right-triangle": {
      title: "ម៉ាស៊ីនគណនាត្រីកោណកែង",
      description:
        "ដោះស្រាយត្រីកោណកែងពីជ្រុងពីរ ឬជ្រុងមួយ និងមុំមួយ។",
    },
    "circle-calculator": {
      title: "ម៉ាស៊ីនគណនារង្វង់",
      description:
        "គណនាកាំ អង្កត់ផ្ចិត បរិមាត្រ និងផ្ទៃ។",
    },
    "compound-interest": {
      title: "ម៉ាស៊ីនគណនាការប្រាក់សរុប",
      description:
        "គណនាការប្រាក់សរុបជាមួយភាពញឹកញាប់ផ្សេងៗ។",
    },
    "loan-calculator": {
      title: "ម៉ាស៊ីនគណនាប្រាក់កម្ចី",
      description:
        "គណនាការបង់ប្រចាំខែ ការប្រាក់សរុប និង amortization។",
    },
    "mortgage-calculator": {
      title: "ម៉ាស៊ីនគណនាបញ្ចាំ",
      description:
        "គណនាការបង់បញ្ចាំជាមួយពន្ធ និងធានារ៉ាប់រង។",
    },
    "savings-goal": {
      title: "ម៉ាស៊ីនគណនាគោលដៅសន្សំ",
      description:
        "រកថាតើត្រូវសន្សំប៉ុន្មានក្នុងមួយខែដើម្បីសម្រេចគោលដៅ។",
    },
    "roi-calculator": {
      title: "ម៉ាស៊ីនគណនា ROI",
      description:
        "គណនាអត្រាផលចំណេញលើការវិនិយោគ និងអត្រាផលចំណេញប្រចាំឆ្នាំ។",
    },
    "profit-margin": {
      title: "ម៉ាស៊ីនគណនារឹមប្រាក់ចំណេញ",
      description:
        "គណនារឹមប្រាក់ចំណេញ markup និងប្រាក់ចំណេញសរុប។",
    },
    "markup-calculator": {
      title: "ម៉ាស៊ីនគណនា Markup",
      description:
        "គណនាតម្លៃលក់ពីថ្លៃដើម និងភាគរយ markup។",
    },
    "break-even": {
      title: "ម៉ាស៊ីនគណនាចំណុចមិនចំណេញមិនខាត",
      description: "រកចំណុចមិនចំណេញមិនខាតសម្រាប់អាជីវកម្មរបស់អ្នក។",
    },
    depreciation: {
      title: "ម៉ាស៊ីនគណនារំលស់",
      description:
        "គណនារំលស់ទ្រព្យសកម្ម (straight-line និង declining balance)។",
    },
    "sales-tax": {
      title: "ម៉ាស៊ីនគណនាពន្ធលក់",
      description:
        "គណនាពន្ធលក់ ឬគណនាបញ្ច្រាសតម្លៃមុនពន្ធ។",
    },
    "bmi-calculator": {
      title: "ម៉ាស៊ីនគណនា BMI",
      description: "គណនាសន្ទស្សន៍ម៉ាសរាងកាយ និងប្រភេទសុខភាព។",
    },
    "bmr-calculator": {
      title: "ម៉ាស៊ីនគណនា BMR",
      description:
        "គណនាអត្រាមេតាបូលីសពេលសម្រាកដោយប្រើរូបមន្តផ្សេងៗ។",
    },
    "tdee-calculator": {
      title: "ម៉ាស៊ីនគណនា TDEE",
      description: "គណនាការចំណាយថាមពលសរុបប្រចាំថ្ងៃ។",
    },
    "calorie-calculator": {
      title: "ម៉ាស៊ីនគណនាកាឡូរី",
      description:
        "គណនាតម្រូវការកាឡូរីប្រចាំថ្ងៃតាមគោលដៅរបស់អ្នក។",
    },
    "body-fat": {
      title: "ម៉ាស៊ីនគណនាខ្លាញ់រាងកាយ",
      description:
        "ប៉ាន់ស្មានភាគរយខ្លាញ់រាងកាយដោយប្រើវិធីសាស្ត្រកងទ័ពជើងទឹក។",
    },
    "ideal-weight": {
      title: "ម៉ាស៊ីនគណនាទម្ងន់ល្អ",
      description:
        "គណនាជួរទម្ងន់ល្អដោយប្រើរូបមន្តច្រើន។",
    },
    "heart-rate-zone": {
      title: "ម៉ាស៊ីនគណនាតំបន់ចង្វាក់បេះដូង",
      description: "គណនាតំបន់ចង្វាក់បេះដូងសម្រាប់ហ្វឹកហ្វឺន។",
    },
    "macro-calculator": {
      title: "ម៉ាស៊ីនគណនា Macro",
      description:
        "គណនាគោលដៅប្រូតេអ៊ីន កាបូអ៊ីដ្រាត និងខ្លាញ់ប្រចាំថ្ងៃ។",
    },
    "tip-calculator": {
      title: "ម៉ាស៊ីនគណនាប្រាក់ទឹកចិត្ត",
      description: "គណនាប្រាក់ទឹកចិត្ត និងបែងចែកវិក្កយបត្រ។",
    },
    "electricity-cost": {
      title: "ម៉ាស៊ីនគណនាថ្លៃអគ្គិសនី",
      description:
        "គណនាថ្លៃអគ្គិសនីប្រចាំខែពីការប្រើប្រាស់ឧបករណ៍។",
    },
    "fuel-cost": {
      title: "ម៉ាស៊ីនគណនាថ្លៃប្រេង",
      description:
        "គណនាថ្លៃប្រេងសម្រាប់ដំណើរតាមចម្ងាយ និងប្រសិទ្ធភាព។",
    },
    "paint-calculator": {
      title: "ម៉ាស៊ីនគណនាថ្នាំលាប",
      description: "គណនាថ្នាំលាបដែលត្រូវការសម្រាប់បន្ទប់។",
    },
    "concrete-calculator": {
      title: "ម៉ាស៊ីនគណនាបេតុង",
      description:
        "គណនាបរិមាណបេតុងដែលត្រូវការសម្រាប់គម្រោង។",
    },
    "tile-calculator": {
      title: "ម៉ាស៊ីនគណនាក្បឿង",
      description:
        "គណនាចំនួនក្បឿងដែលត្រូវការរួមទាំងការខាតបង់។",
    },
    "random-number": {
      title: "កម្មវិធីបង្កើតលេខចៃដន្យ",
      description: "បង្កើតលេខចៃដន្យក្នុងជួរកំណត់។",
    },
    "gpa-calculator": {
      title: "ម៉ាស៊ីនគណនា GPA",
      description: "គណនា GPA ពីពិន្ទុមុខវិជ្ជា និងក្រេឌីត។",
    },
    "grade-calculator": {
      title: "ម៉ាស៊ីនគណនាពិន្ទុ",
      description:
        "គណនាពិន្ទុដែលមានទម្ងន់ និងស្ថានភាពបច្ចុប្បន្ន។",
    },
    "final-exam": {
      title: "ម៉ាស៊ីនគណនាប្រឡងចុងក្រោយ",
      description:
        "គណនាពិន្ទុដែលត្រូវការក្នុងការប្រឡងចុងក្រោយ។",
    },
    "weighted-average": {
      title: "ម៉ាស៊ីនគណនាមធ្យមទម្ងន់",
      description: "គណនាមធ្យមទម្ងន់នៃតម្លៃ។",
    },
    "bitwise-calculator": {
      title: "ម៉ាស៊ីនគណនា Bitwise",
      description:
        "អនុវត្តប្រតិបត្តិការ AND, OR, XOR, NOT និង shift។",
    },
    "subnet-calculator": {
      title: "ម៉ាស៊ីនគណនា Subnet",
      description:
        "គណនា IP subnet, ជួរ host និងសញ្ញាណ CIDR។",
    },
  },
  nav: {
    allTools: "ម៉ាស៊ីនគណនាទាំងអស់",
    language: "ភាសា",
  },
  footer: {
    tools: "ម៉ាស៊ីនគណនា",
    legal: "ច្បាប់",
    privacy: "គោលការណ៍ឯកជនភាព",
    terms: "លក្ខខណ្ឌនៃសេវា",
    copyright: "ToolPop។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",
    company: "ក្រុមហ៊ុន",
    about: "អំពីយើង",
    contact: "ទំនាក់ទំនង",
    faq: "សំណួរញឹកញាប់",
  },
  common: {
    backToAll: "ម៉ាស៊ីនគណនាទាំងអស់",
    calculate: "គណនា",
    result: "លទ្ធផល",
    copyToClipboard: "ចម្លងទៅក្ដារតម្បៀតខ្ទាស់",
    copied: "បានចម្លង!",
    clear: "សម្អាត",
    reset: "កំណត់ឡើងវិញ",
    processing: "កំពុងគណនា...",
    tryAgain: "សាកម្ដងទៀត",
    notImplemented: "ម៉ាស៊ីនគណនានេះនឹងមានឆាប់ៗ។",
    tryOtherTools: "សាកម៉ាស៊ីនគណនាផ្សេង",
    privacyBadge: "ការគណនាទាំងអស់ដំណើរការក្នុងកម្មវិធីរុករករបស់អ្នក",
    favoriteAdded: "បានបន្ថែមទៅសំណព្វ",
    favoriteRemoved: "បានដកចេញពីសំណព្វ",
    comingSoon: "មកដល់ឆាប់ៗ",
    share: "ចែករំលែក",
    shareTitle: "ចែករំលែកម៉ាស៊ីនគណនានេះ",
    shareSubtitle: "ចែករំលែកម៉ាស៊ីនគណនាមានប្រយោជន៍នេះជាមួយអ្នកដទៃ",
    shareCopied: "បានចម្លងតំណ!",
    shareCopyLink: "ចម្លងតំណ",
    options: "ជម្រើស",
    input: "បញ្ចូល",
    output: "លទ្ធផល",
    details: "ព័ត៌មានលម្អិត",
    breakdown: "ការបំបែកការគណនា",
    allResults: "លទ្ធផលទាំងអស់",
    pageNotFound: "រកមិនឃើញម៉ាស៊ីនគណនា",
    goHome: "ត្រឡប់ទៅម៉ាស៊ីនគណនាទាំងអស់",
  },
  fieldLabels: {
    // Math
    value: "តម្លៃ",
    percentage: "ភាគរយ",
    mode: "របៀប",
    expression: "កន្សោម",
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    numberA: "លេខ A",
    numberB: "លេខ B",
    number: "លេខ",
    base: "មូលដ្ឋាន",
    // Statistics
    type: "ប្រភេទ",
    n: "n",
    r: "r",
    mean: "មធ្យម",
    stdDev: "គម្លាតស្តង់ដារ",
    sampleSize: "ទំហំគំរូ",
    confidenceLevel: "កម្រិតទំនុកចិត្ត",
    // Trigonometry
    angle: "មុំ",
    unit: "ឯកតា",
    function: "អនុគមន៍",
    sideA: "ជ្រុង A",
    sideB: "ជ្រុង B",
    hypotenuse: "អ៊ីប៉ូតេនុស",
    property: "លក្ខណៈ",
    // Financial
    principal: "ប្រាក់ដើម",
    rate: "អត្រាការប្រាក់",
    time: "រយៈពេល",
    frequency: "ភាពញឹកញាប់នៃការប្រាក់សរុប",
    amount: "ចំនួនប្រាក់កម្ចី",
    term: "រយៈពេលកម្ចី",
    homePrice: "តម្លៃផ្ទះ",
    downPayment: "ប្រាក់កក់",
    propertyTax: "ពន្ធអចលនទ្រព្យ / ឆ្នាំ",
    insurance: "ធានារ៉ាប់រង / ឆ្នាំ",
    goalAmount: "ចំនួនគោលដៅ",
    currentSavings: "សន្សំបច្ចុប្បន្ន",
    timeframe: "រយៈពេល",
    initialInvestment: "ការវិនិយោគដំបូង",
    finalValue: "តម្លៃចុងក្រោយ",
    timePeriod: "រយៈពេល",
    revenue: "ចំណូល",
    cost: "ថ្លៃដើម",
    markup: "ការដំឡើងថ្លៃ",
    fixedCosts: "ចំណាយថេរ",
    variableCost: "ចំណាយប្រែប្រួលក្នុងមួយឯកតា",
    pricePerUnit: "តម្លៃក្នុងមួយឯកតា",
    assetCost: "ថ្លៃដើមទ្រព្យសកម្ម",
    salvageValue: "តម្លៃសំណល់",
    usefulLife: "អាយុកាលប្រើប្រាស់",
    method: "វិធីសាស្ត្រ",
    taxRate: "អត្រាពន្ធ",
    // Health
    weight: "ទម្ងន់",
    height: "កម្ពស់",
    age: "អាយុ",
    gender: "ភេទ",
    formula: "រូបមន្ត",
    activityLevel: "កម្រិតសកម្មភាព",
    goal: "គោលដៅ",
    waist: "បរិមាណចង្កេះ",
    neck: "បរិមាណក",
    hip: "បរិមាណត្រគាក",
    restingHR: "ចង្វាក់បេះដូងពេលសម្រាក",
    calories: "កាឡូរីប្រចាំថ្ងៃ",
    diet: "ប្រភេទរបបអាហារ",
    // Everyday
    billAmount: "ចំនួនវិក្កយបត្រ",
    tipPercent: "ភាគរយទឹកចិត្ត",
    numPeople: "ចំនួនមនុស្ស",
    watts: "ថាមពល",
    hoursPerDay: "ម៉ោងក្នុងមួយថ្ងៃ",
    daysPerMonth: "ថ្ងៃក្នុងមួយខែ",
    costPerKwh: "ថ្លៃក្នុងមួយ kWh",
    distance: "ចម្ងាយ",
    fuelEfficiency: "ប្រសិទ្ធភាពប្រេង",
    fuelPrice: "តម្លៃប្រេង",
    length: "ប្រវែង",
    width: "ទទឹង",
    depth: "ជម្រៅ",
    doors: "ចំនួនទ្វារ",
    windows: "ចំនួនបង្អួច",
    coats: "ចំនួនស្រទាប់",
    roomLength: "ប្រវែងបន្ទប់",
    roomWidth: "ទទឹងបន្ទប់",
    tileLength: "ប្រវែងក្បឿង",
    tileWidth: "ទទឹងក្បឿង",
    gap: "ទំហំគម្លាត",
    wastage: "ការខាតបង់",
    min: "អប្បបរមា",
    max: "អតិបរមា",
    count: "ចំនួន",
    allowDuplicates: "អនុញ្ញាតស្ទួន",
    // Education
    scale: "មាត្រដ្ឋាន GPA",
    currentGrade: "ពិន្ទុបច្ចុប្បន្ន",
    examWeight: "ទម្ងន់ការប្រឡងចុងក្រោយ",
    targetGrade: "ពិន្ទុគោលដៅ",
    // Developer
    operation: "ប្រតិបត្តិការ",
    ipAddress: "អាសយដ្ឋាន IP",
    subnetMask: "របាំងបណ្ដាញរង",
  },
  fieldOptions: {
    // Percentage modes
    whatIsXPercentOfY: "X% នៃ Y ជាចំនួនប៉ុន្មាន?",
    xIsWhatPercentOfY: "X ជាភាគរយប៉ុន្មាននៃ Y?",
    percentChange: "ការផ្លាស់ប្ដូរភាគរយ",
    // Statistics type
    population: "ប្រជាជន",
    sample: "គំរូ",
    // Permutation/Combination
    permutation: "ផ្លាស់ប្ដូរ (nPr)",
    combination: "បន្សំ (nCr)",
    // Confidence levels
    "90": "90%",
    "95": "95%",
    "99": "99%",
    // Trig units
    degrees: "ដឺក្រេ",
    radians: "រ៉ាដង់",
    // Trig functions
    sin: "sin",
    cos: "cos",
    tan: "tan",
    asin: "asin",
    acos: "acos",
    atan: "atan",
    // Circle properties
    radius: "កាំ",
    diameter: "អង្កត់ផ្ចិត",
    circumference: "បរិមាត្រ",
    area: "ផ្ទៃ",
    // Compound frequency
    annually: "ប្រចាំឆ្នាំ",
    "semi-annually": "ពាក់កណ្ដាលឆ្នាំ",
    quarterly: "ប្រចាំត្រីមាស",
    monthly: "ប្រចាំខែ",
    daily: "ប្រចាំថ្ងៃ",
    // Loan frequency
    "bi-weekly": "ពីរសប្ដាហ៍ម្ដង",
    // Depreciation
    "straight-line": "វិធីបន្ទាត់ត្រង់",
    "declining-balance": "វិធីសមតុល្យថយចុះ",
    // Sales tax mode
    addTax: "បន្ថែមពន្ធលើតម្លៃ",
    removeTax: "ដកពន្ធពីតម្លៃ",
    // Unit system
    metric: "ម៉ែត្រ (kg, cm)",
    imperial: "អ៊ីមពេរៀល (lb, in)",
    // Gender
    male: "ប្រុស",
    female: "ស្រី",
    // BMR formula
    "harris-benedict": "Harris-Benedict",
    "mifflin-st-jeor": "Mifflin-St Jeor",
    // Activity levels
    sedentary: "អង្គុយច្រើន (គ្មាន/តិចតួច)",
    light: "ស្រាល (១-៣ ថ្ងៃ/សប្ដាហ៍)",
    moderate: "មធ្យម (៣-៥ ថ្ងៃ/សប្ដាហ៍)",
    active: "សកម្ម (៦-៧ ថ្ងៃ/សប្ដាហ៍)",
    "very-active": "សកម្មខ្លាំង (២ ដង/ថ្ងៃ)",
    // Calorie goals
    lose: "សម្រកទម្ងន់",
    maintain: "រក្សាទម្ងន់",
    gain: "ឡើងទម្ងន់",
    // Diet types
    balanced: "មានតុល្យភាព (40/30/30)",
    "low-carb": "កាបូអ៊ីដ្រាតទាប (25/40/35)",
    "high-protein": "ប្រូតេអ៊ីនខ្ពស់ (30/40/30)",
    keto: "Keto (5/25/70)",
    // Duplicates
    yes: "បាទ/ចាស",
    no: "ទេ",
    // GPA scales
    "4.0": "មាត្រដ្ឋាន 4.0",
    "4.3": "មាត្រដ្ឋាន 4.3",
    "4.5": "មាត្រដ្ឋាន 4.5",
    // Bitwise
    AND: "AND",
    OR: "OR",
    XOR: "XOR",
    NOT: "NOT",
    "LEFT-SHIFT": "Shift ឆ្វេង (<<)",
    "RIGHT-SHIFT": "Shift ស្ដាំ (>>)",
  },
  statsLabels: {
    result: "លទ្ធផល",
    formula: "រូបមន្ត",
    steps: "ជំហាន",
    total: "សរុប",
    average: "មធ្យម",
    monthlyPayment: "ការបង់ប្រចាំខែ",
    totalInterest: "ការប្រាក់សរុប",
    totalPayment: "ការបង់សរុប",
    breakEvenUnits: "ឯកតាចំណុចមិនចំណេញមិនខាត",
    breakEvenRevenue: "ចំណូលចំណុចមិនចំណេញមិនខាត",
    roi: "ROI",
    annualizedReturn: "អត្រាផលចំណេញប្រចាំឆ្នាំ",
    grossProfit: "ប្រាក់ចំណេញសរុប",
    profitMargin: "រឹមប្រាក់ចំណេញ",
    sellingPrice: "តម្លៃលក់",
    taxAmount: "ចំនួនពន្ធ",
    preTaxPrice: "តម្លៃមុនពន្ធ",
    totalWithTax: "សរុបរួមពន្ធ",
    bmiCategory: "ប្រភេទ BMI",
    bmr: "BMR",
    tdee: "TDEE",
    dailyCalories: "កាឡូរីប្រចាំថ្ងៃ",
    protein: "ប្រូតេអ៊ីន",
    carbs: "កាបូអ៊ីដ្រាត",
    fat: "ខ្លាញ់",
    bodyFat: "ខ្លាញ់រាងកាយ",
    idealWeight: "ទម្ងន់ល្អ",
    tipAmount: "ចំនួនទឹកចិត្ត",
    totalBill: "វិក្កយបត្រសរុប",
    perPerson: "ក្នុងមួយនាក់",
    monthlyCost: "ថ្លៃប្រចាំខែ",
    yearlyCost: "ថ្លៃប្រចាំឆ្នាំ",
    fuelNeeded: "ប្រេងដែលត្រូវការ",
    totalCost: "ថ្លៃសរុប",
    paintNeeded: "ថ្នាំលាបដែលត្រូវការ",
    concreteVolume: "បរិមាណបេតុង",
    tilesNeeded: "ក្បឿងដែលត្រូវការ",
    gpa: "GPA",
    neededScore: "ពិន្ទុដែលត្រូវការ",
    networkAddress: "អាសយដ្ឋានបណ្ដាញ",
    broadcastAddress: "អាសយដ្ឋាន Broadcast",
    usableHosts: "Host ដែលអាចប្រើបាន",
    subnetBits: "ប៊ីតបណ្ដាញរង",
  },
  processorMessages: {
    underweight: "ស្គមពេក",
    normal: "ទម្ងន់ធម្មតា",
    overweight: "លើសទម្ងន់",
    obese: "ធាត់ពេក",
    prime: "ជាលេខបឋម",
    notPrime: "មិនមែនជាលេខបឋម",
    noRealRoots: "គ្មានឫសពិត",
    oneRoot: "ឫសម្ដងដដែល",
    twoRoots: "ឫសពីរផ្សេងគ្នា",
    zone1: "តំបន់ ១ — ស្រាលខ្លាំង",
    zone2: "តំបន់ ២ — ស្រាល",
    zone3: "តំបន់ ៣ — មធ្យម",
    zone4: "តំបន់ ៤ — ខ្លាំង",
    zone5: "តំបន់ ៥ — អតិបរមា",
    datasetPlaceholder:
      "បញ្ចូលលេខដែលបំបែកដោយសញ្ញាក្បៀស ឬបន្ទាត់ថ្មី",
    matrixPlaceholder:
      "បញ្ចូលជួរដេកម៉ាទ្រីស (តម្លៃបំបែកដោយដកឃ្លា មួយជួរដេកក្នុងមួយបន្ទាត់)",
    gpaPlaceholder:
      "បញ្ចូលមុខវិជ្ជា៖ ពិន្ទុ,ក្រេឌីត (មួយក្នុងមួយបន្ទាត់)\nឧ. A,3\nB+,4",
    gradePlaceholder:
      "បញ្ចូលកិច្ចការ៖ ពិន្ទុ,ទម្ងន់ (មួយក្នុងមួយបន្ទាត់)\nឧ. 85,30\n92,20",
  },
  metadata: {
    siteTitle: "ToolPop Calculator — ម៉ាស៊ីនគណនាអនឡាញឥតគិតថ្លៃ",
    siteDescription:
      "គណនាហិរញ្ញវត្ថុ សុខភាព គណិតវិទ្យា ស្ថិតិ និងផ្សេងៗទៀត។ ឥតគិតថ្លៃ រហ័ស និងឯកជន — ទាំងអស់ដំណើរការក្នុងកម្មវិធីរុករករបស់អ្នក។",
    toolTitleSuffix: "| ToolPop Calculator",
  },
  blog: {
    title: "ប្លក់",
    description:
      "គន្លឹះ មគ្គុទ្ទេសក៍ និងចំណេះដឹងអំពីការគណនា រូបមន្ត និងផ្សេងៗទៀត។",
    readMore: "អានបន្ថែម",
    backToBlog: "ត្រឡប់ទៅប្លក់",
    publishedOn: "ផ្សព្វផ្សាយនៅ",
    categoryGuide: "មគ្គុទ្ទេសក៍",
    categoryTips: "គន្លឹះ",
    categoryKnowledge: "ចំណេះដឹង",
  },
  cookie: {
    message:
      "យើងប្រើខូគីដើម្បីកែលម្អបទពិសោធន៍របស់អ្នក។ ដោយបន្ត អ្នកយល់ព្រមនឹងគោលការណ៍ខូគីរបស់យើង។",
    accept: "ទទួលយក",
    decline: "បដិសេធ",
  },
};

export default dict;
