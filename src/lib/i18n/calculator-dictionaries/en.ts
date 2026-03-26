import type { CalculatorDictionary } from "../calculator-config";

const dict: CalculatorDictionary = {
  home: {
    title: "Every Calculation tool you need",
    titleAccent: "Calculation",
    description:
      "Calculate finances, health metrics, math problems, and more. All processed right in your browser.",
    tabAll: "All",
    categoryMath: "Math",
    categoryStatistics: "Statistics",
    categoryTrigonometry: "Trigonometry",
    categoryFinancial: "Financial",
    categoryHealth: "Health",
    categoryEveryday: "Everyday",
    categoryEducation: "Education",
    categoryDeveloper: "Developer",
    searchPlaceholder: "Search calculators...",
    noResults: "No calculators found.",
    recentTools: "Recently Used",
    favorites: "Favorites",
    favDragHint: "Drag to reorder",
    favHint: "Click the star to add favorites",
    gridView: "Grid view",
    listView: "List view",
  },
  trust: {
    encryption: "Secure Processing",
    encryptionDesc: "All calculations happen locally in your browser",
    autoDelete: "No Data Stored",
    autoDeleteDesc: "Your input is never saved or sent to a server",
    free: "100% Free",
    freeDesc: "No limits, no sign-ups, no hidden fees",
    browserProcessing: "Instant Results",
    browserProcessingDesc: "Real-time calculation as you type",
  },
  tools: {
    "percentage-calculator": {
      title: "Percentage Calculator",
      description: "Calculate percentages, percentage change, and more.",
    },
    "scientific-calculator": {
      title: "Scientific Calculator",
      description:
        "Evaluate complex math expressions with functions and constants.",
    },
    "ratio-calculator": {
      title: "Ratio Calculator",
      description: "Solve proportions and simplify ratios.",
    },
    "gcd-lcm": {
      title: "GCD & LCM Calculator",
      description:
        "Find the greatest common divisor and least common multiple.",
    },
    factorial: {
      title: "Factorial Calculator",
      description:
        "Calculate factorial, permutations, and double factorial.",
    },
    "prime-checker": {
      title: "Prime Number Checker",
      description: "Check if a number is prime and find prime factors.",
    },
    logarithm: {
      title: "Logarithm Calculator",
      description: "Calculate logarithms with any base (log, ln, log2).",
    },
    "quadratic-solver": {
      title: "Quadratic Equation Solver",
      description: "Solve ax\u00B2 + bx + c = 0 and find roots.",
    },
    "matrix-calculator": {
      title: "Matrix Calculator",
      description:
        "Add, multiply, find determinant and inverse of matrices.",
    },
    "mean-median-mode": {
      title: "Mean, Median & Mode",
      description: "Calculate descriptive statistics for a data set.",
    },
    "standard-deviation": {
      title: "Standard Deviation Calculator",
      description:
        "Calculate population and sample standard deviation.",
    },
    probability: {
      title: "Probability Calculator",
      description: "Calculate basic probability and expected value.",
    },
    "permutation-combination": {
      title: "Permutation & Combination",
      description: "Calculate nPr and nCr values.",
    },
    "z-score": {
      title: "Z-Score Calculator",
      description:
        "Calculate z-score from value, mean, and standard deviation.",
    },
    "confidence-interval": {
      title: "Confidence Interval Calculator",
      description: "Calculate confidence interval for a population mean.",
    },
    regression: {
      title: "Linear Regression Calculator",
      description: "Find best-fit line and R\u00B2 for data points.",
    },
    trigonometry: {
      title: "Trigonometry Calculator",
      description:
        "Calculate sin, cos, tan and inverse trigonometric functions.",
    },
    "right-triangle": {
      title: "Right Triangle Calculator",
      description:
        "Solve right triangles given two sides or a side and angle.",
    },
    "circle-calculator": {
      title: "Circle Calculator",
      description:
        "Calculate radius, diameter, circumference, and area.",
    },
    "compound-interest": {
      title: "Compound Interest Calculator",
      description:
        "Calculate compound interest with different frequencies.",
    },
    "loan-calculator": {
      title: "Loan Calculator",
      description:
        "Calculate monthly payments, total interest, and amortization.",
    },
    "mortgage-calculator": {
      title: "Mortgage Calculator",
      description:
        "Calculate mortgage payments with taxes and insurance.",
    },
    "savings-goal": {
      title: "Savings Goal Calculator",
      description:
        "Find how much to save monthly to reach your goal.",
    },
    "roi-calculator": {
      title: "ROI Calculator",
      description:
        "Calculate return on investment and annualized return.",
    },
    "profit-margin": {
      title: "Profit Margin Calculator",
      description:
        "Calculate profit margin, markup, and gross profit.",
    },
    "markup-calculator": {
      title: "Markup Calculator",
      description:
        "Calculate selling price from cost and markup percentage.",
    },
    "break-even": {
      title: "Break-Even Calculator",
      description: "Find the break-even point for your business.",
    },
    depreciation: {
      title: "Depreciation Calculator",
      description:
        "Calculate asset depreciation (straight-line and declining balance).",
    },
    "sales-tax": {
      title: "Sales Tax Calculator",
      description:
        "Calculate sales tax or reverse-calculate pre-tax price.",
    },
    "bmi-calculator": {
      title: "BMI Calculator",
      description: "Calculate Body Mass Index and health category.",
    },
    "bmr-calculator": {
      title: "BMR Calculator",
      description:
        "Calculate Basal Metabolic Rate using different formulas.",
    },
    "tdee-calculator": {
      title: "TDEE Calculator",
      description: "Calculate Total Daily Energy Expenditure.",
    },
    "calorie-calculator": {
      title: "Calorie Calculator",
      description:
        "Calculate daily calorie needs based on your goals.",
    },
    "body-fat": {
      title: "Body Fat Calculator",
      description:
        "Estimate body fat percentage using the Navy method.",
    },
    "ideal-weight": {
      title: "Ideal Weight Calculator",
      description:
        "Calculate ideal weight range using multiple formulas.",
    },
    "heart-rate-zone": {
      title: "Heart Rate Zone Calculator",
      description: "Calculate training heart rate zones.",
    },
    "macro-calculator": {
      title: "Macro Calculator",
      description:
        "Calculate daily protein, carb, and fat targets.",
    },
    "tip-calculator": {
      title: "Tip Calculator",
      description: "Calculate tip amount and split the bill.",
    },
    "electricity-cost": {
      title: "Electricity Cost Calculator",
      description:
        "Calculate monthly electricity cost from device usage.",
    },
    "fuel-cost": {
      title: "Fuel Cost Calculator",
      description:
        "Calculate fuel cost for a trip based on distance and efficiency.",
    },
    "paint-calculator": {
      title: "Paint Calculator",
      description: "Calculate how much paint you need for a room.",
    },
    "concrete-calculator": {
      title: "Concrete Calculator",
      description:
        "Calculate volume of concrete needed for a project.",
    },
    "tile-calculator": {
      title: "Tile Calculator",
      description:
        "Calculate number of tiles needed with wastage.",
    },
    "random-number": {
      title: "Random Number Generator",
      description: "Generate random numbers within a range.",
    },
    "gpa-calculator": {
      title: "GPA Calculator",
      description: "Calculate GPA from course grades and credits.",
    },
    "grade-calculator": {
      title: "Grade Calculator",
      description:
        "Calculate weighted grades and current standing.",
    },
    "final-exam": {
      title: "Final Exam Calculator",
      description:
        "Calculate the score needed on your final exam.",
    },
    "weighted-average": {
      title: "Weighted Average Calculator",
      description: "Calculate weighted average of values.",
    },
    "bitwise-calculator": {
      title: "Bitwise Calculator",
      description:
        "Perform AND, OR, XOR, NOT, and shift operations.",
    },
    "subnet-calculator": {
      title: "Subnet Calculator",
      description:
        "Calculate IP subnets, host ranges, and CIDR notation.",
    },
  },
  nav: {
    allTools: "All Calculator Tools",
    language: "Language",
  },
  footer: {
    tools: "Calculators",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "ToolPop. All rights reserved.",
    company: "Company",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
  },
  common: {
    backToAll: "All Calculators",
    calculate: "Calculate",
    result: "Result",
    copyToClipboard: "Copy to clipboard",
    copied: "Copied!",
    clear: "Clear",
    reset: "Reset",
    processing: "Calculating...",
    tryAgain: "Try again",
    notImplemented: "This calculator is coming soon.",
    tryOtherTools: "Try other calculators",
    privacyBadge: "All calculations happen in your browser",
    favoriteAdded: "Added to favorites",
    favoriteRemoved: "Removed from favorites",
    comingSoon: "Coming Soon",
    share: "Share",
    shareTitle: "Share this calculator",
    shareSubtitle: "Share this useful calculator with others",
    shareCopied: "Link copied!",
    shareCopyLink: "Copy link",
    options: "Options",
    input: "Input",
    output: "Output",
    details: "Details",
    breakdown: "Calculation Breakdown",
    allResults: "All Results",
    pageNotFound: "Calculator not found",
    goHome: "Back to all calculators",
  },
  fieldLabels: {
    // Math
    value: "Value",
    percentage: "Percentage",
    mode: "Mode",
    expression: "Expression",
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    numberA: "Number A",
    numberB: "Number B",
    number: "Number",
    base: "Base",
    // Statistics
    type: "Type",
    n: "n",
    r: "r",
    mean: "Mean",
    stdDev: "Standard Deviation",
    sampleSize: "Sample Size",
    confidenceLevel: "Confidence Level",
    // Trigonometry
    angle: "Angle",
    unit: "Unit",
    function: "Function",
    sideA: "Side A",
    sideB: "Side B",
    hypotenuse: "Hypotenuse",
    property: "Property",
    // Financial
    principal: "Principal",
    rate: "Interest Rate",
    time: "Time Period",
    frequency: "Compound Frequency",
    amount: "Loan Amount",
    term: "Loan Term",
    homePrice: "Home Price",
    downPayment: "Down Payment",
    propertyTax: "Property Tax / Year",
    insurance: "Insurance / Year",
    goalAmount: "Goal Amount",
    currentSavings: "Current Savings",
    timeframe: "Timeframe",
    initialInvestment: "Initial Investment",
    finalValue: "Final Value",
    timePeriod: "Time Period",
    revenue: "Revenue",
    cost: "Cost",
    markup: "Markup",
    fixedCosts: "Fixed Costs",
    variableCost: "Variable Cost per Unit",
    pricePerUnit: "Price per Unit",
    assetCost: "Asset Cost",
    salvageValue: "Salvage Value",
    usefulLife: "Useful Life",
    method: "Method",
    taxRate: "Tax Rate",
    // Health
    weight: "Weight",
    height: "Height",
    age: "Age",
    gender: "Gender",
    formula: "Formula",
    activityLevel: "Activity Level",
    goal: "Goal",
    waist: "Waist Circumference",
    neck: "Neck Circumference",
    hip: "Hip Circumference",
    restingHR: "Resting Heart Rate",
    calories: "Daily Calories",
    diet: "Diet Type",
    // Everyday
    billAmount: "Bill Amount",
    tipPercent: "Tip Percentage",
    numPeople: "Number of People",
    watts: "Power",
    hoursPerDay: "Hours per Day",
    daysPerMonth: "Days per Month",
    costPerKwh: "Cost per kWh",
    distance: "Distance",
    fuelEfficiency: "Fuel Efficiency",
    fuelPrice: "Fuel Price",
    length: "Length",
    width: "Width",
    depth: "Depth",
    doors: "Number of Doors",
    windows: "Number of Windows",
    coats: "Number of Coats",
    roomLength: "Room Length",
    roomWidth: "Room Width",
    tileLength: "Tile Length",
    tileWidth: "Tile Width",
    gap: "Gap Size",
    wastage: "Wastage",
    min: "Minimum",
    max: "Maximum",
    count: "Count",
    allowDuplicates: "Allow Duplicates",
    // Education
    scale: "GPA Scale",
    currentGrade: "Current Grade",
    examWeight: "Final Exam Weight",
    targetGrade: "Target Grade",
    // Developer
    operation: "Operation",
    ipAddress: "IP Address",
    subnetMask: "Subnet Mask",
  },
  fieldOptions: {
    // Percentage modes
    whatIsXPercentOfY: "What is X% of Y?",
    xIsWhatPercentOfY: "X is what % of Y?",
    percentChange: "Percentage change",
    // Statistics type
    population: "Population",
    sample: "Sample",
    // Permutation/Combination
    permutation: "Permutation (nPr)",
    combination: "Combination (nCr)",
    // Confidence levels
    "90": "90%",
    "95": "95%",
    "99": "99%",
    // Trig units
    degrees: "Degrees",
    radians: "Radians",
    // Trig functions
    sin: "sin",
    cos: "cos",
    tan: "tan",
    asin: "asin",
    acos: "acos",
    atan: "atan",
    // Circle properties
    radius: "Radius",
    diameter: "Diameter",
    circumference: "Circumference",
    area: "Area",
    // Compound frequency
    annually: "Annually",
    "semi-annually": "Semi-Annually",
    quarterly: "Quarterly",
    monthly: "Monthly",
    daily: "Daily",
    // Loan frequency
    "bi-weekly": "Bi-Weekly",
    // Depreciation
    "straight-line": "Straight Line",
    "declining-balance": "Declining Balance",
    // Sales tax mode
    addTax: "Add tax to price",
    removeTax: "Remove tax from price",
    // Unit system
    metric: "Metric (kg, cm)",
    imperial: "Imperial (lb, in)",
    // Gender
    male: "Male",
    female: "Female",
    // BMR formula
    "harris-benedict": "Harris-Benedict",
    "mifflin-st-jeor": "Mifflin-St Jeor",
    // Activity levels
    sedentary: "Sedentary (little/no exercise)",
    light: "Light (1-3 days/week)",
    moderate: "Moderate (3-5 days/week)",
    active: "Active (6-7 days/week)",
    "very-active": "Very Active (2x/day)",
    // Calorie goals
    lose: "Lose weight",
    maintain: "Maintain weight",
    gain: "Gain weight",
    // Diet types
    balanced: "Balanced (40/30/30)",
    "low-carb": "Low Carb (25/40/35)",
    "high-protein": "High Protein (30/40/30)",
    keto: "Keto (5/25/70)",
    // Duplicates
    yes: "Yes",
    no: "No",
    // GPA scales
    "4.0": "4.0 Scale",
    "4.3": "4.3 Scale",
    "4.5": "4.5 Scale",
    // Bitwise
    AND: "AND",
    OR: "OR",
    XOR: "XOR",
    NOT: "NOT",
    "LEFT-SHIFT": "Left Shift (<<)",
    "RIGHT-SHIFT": "Right Shift (>>)",
  },
  statsLabels: {
    result: "Result",
    formula: "Formula",
    steps: "Steps",
    total: "Total",
    average: "Average",
    monthlyPayment: "Monthly Payment",
    totalInterest: "Total Interest",
    totalPayment: "Total Payment",
    breakEvenUnits: "Break-Even Units",
    breakEvenRevenue: "Break-Even Revenue",
    roi: "ROI",
    annualizedReturn: "Annualized Return",
    grossProfit: "Gross Profit",
    profitMargin: "Profit Margin",
    sellingPrice: "Selling Price",
    taxAmount: "Tax Amount",
    preTaxPrice: "Pre-Tax Price",
    totalWithTax: "Total with Tax",
    bmiCategory: "BMI Category",
    bmr: "BMR",
    tdee: "TDEE",
    dailyCalories: "Daily Calories",
    protein: "Protein",
    carbs: "Carbohydrates",
    fat: "Fat",
    bodyFat: "Body Fat",
    idealWeight: "Ideal Weight",
    tipAmount: "Tip Amount",
    totalBill: "Total Bill",
    perPerson: "Per Person",
    monthlyCost: "Monthly Cost",
    yearlyCost: "Yearly Cost",
    fuelNeeded: "Fuel Needed",
    totalCost: "Total Cost",
    paintNeeded: "Paint Needed",
    concreteVolume: "Concrete Volume",
    tilesNeeded: "Tiles Needed",
    gpa: "GPA",
    neededScore: "Needed Score",
    networkAddress: "Network Address",
    broadcastAddress: "Broadcast Address",
    usableHosts: "Usable Hosts",
    subnetBits: "Subnet Bits",
  },
  processorMessages: {
    underweight: "Underweight",
    normal: "Normal weight",
    overweight: "Overweight",
    obese: "Obese",
    prime: "is a prime number",
    notPrime: "is not a prime number",
    noRealRoots: "No real roots",
    oneRoot: "One repeated root",
    twoRoots: "Two distinct roots",
    zone1: "Zone 1 \u2014 Very Light",
    zone2: "Zone 2 \u2014 Light",
    zone3: "Zone 3 \u2014 Moderate",
    zone4: "Zone 4 \u2014 Hard",
    zone5: "Zone 5 \u2014 Maximum",
    datasetPlaceholder:
      "Enter numbers separated by commas or newlines",
    matrixPlaceholder:
      "Enter matrix rows (space-separated values, one row per line)",
    gpaPlaceholder:
      "Enter courses: grade,credits (one per line)\ne.g. A,3\nB+,4",
    gradePlaceholder:
      "Enter assignments: score,weight (one per line)\ne.g. 85,30\n92,20",
  },
  metadata: {
    siteTitle: "ToolPop Calculator \u2014 Free Online Calculators",
    siteDescription:
      "Calculate finances, health metrics, math problems, statistics, and more. Free, fast, and private \u2014 everything runs in your browser.",
    toolTitleSuffix: "| ToolPop Calculator",
  },
  blog: {
    title: "Blog",
    description:
      "Tips, guides, and knowledge about calculations, formulas, and more.",
    readMore: "Read more",
    backToBlog: "Back to Blog",
    publishedOn: "Published on",
    categoryGuide: "Guide",
    categoryTips: "Tips",
    categoryKnowledge: "Knowledge",
  },
  cookie: {
    message:
      "We use cookies to improve your experience. By continuing, you agree to our cookie policy.",
    accept: "Accept",
    decline: "Decline",
  },
};

export default dict;
