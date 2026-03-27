import {
  Calculator,
  Percent,
  Scale,
  Hash,
  Sigma,
  Binary as BinaryIcon,
  BookOpen,
  Divide,
  FlaskConical,
  Triangle,
  Circle,
  DollarSign,
  PiggyBank,
  Home,
  Target,
  TrendingUp,
  Receipt,
  Tag,
  HandCoins,
  BarChartHorizontal,
  Landmark,
  Heart,
  Activity,
  Flame,
  Droplets,
  Weight,
  Dumbbell,
  Zap as ZapIcon,
  Apple,
  Lightbulb,
  Fuel,
  Paintbrush,
  HardHat,
  Grid3x3,
  Dice5,
  GraduationCap,
  Award,
  FileCheck,
  BarChart3,
  Network,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export type CalculatorCategory =
  | "math"
  | "statistics"
  | "trigonometry"
  | "financial"
  | "health"
  | "everyday"
  | "education"
  | "developer";

export type CalculatorInputType = "fields" | "expression" | "dataset";

export interface CalculatorFieldDefinition {
  name: string;
  type: "number" | "select" | "text" | "radio";
  required?: boolean;
  default?: unknown;
  /** Preview value shown before user input (overrides auto-generated preview default) */
  preview?: number;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  suffix?: string;
  group?: string;
}

export interface CalculatorToolDefinition {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  emoji: string;
  category: CalculatorCategory;
  inputType: CalculatorInputType;
  fields: CalculatorFieldDefinition[];
  /** Sample data for expression/dataset input types (shown as preview before user input) */
  previewData?: string;
}

export const categories = [
  { key: "math" as const, emoji: "🔢" },
  { key: "statistics" as const, emoji: "📊" },
  { key: "trigonometry" as const, emoji: "📐" },
  { key: "financial" as const, emoji: "💰" },
  { key: "health" as const, emoji: "❤️" },
  { key: "everyday" as const, emoji: "🏠" },
  { key: "education" as const, emoji: "🎓" },
  { key: "developer" as const, emoji: "💻" },
];

export const categoryColors: Record<
  CalculatorCategory,
  { bg: string; text: string; bgHover: string; textHover: string }
> = {
  math: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    bgHover: "hover:bg-violet-100 dark:hover:bg-violet-900/30",
    textHover: "hover:text-violet-700 dark:hover:text-violet-300",
  },
  statistics: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    text: "text-purple-600 dark:text-purple-400",
    bgHover: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
    textHover: "hover:text-purple-700 dark:hover:text-purple-300",
  },
  trigonometry: {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    bgHover: "hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/30",
    textHover: "hover:text-fuchsia-700 dark:hover:text-fuchsia-300",
  },
  financial: {
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    text: "text-yellow-600 dark:text-yellow-400",
    bgHover: "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
    textHover: "hover:text-yellow-700 dark:hover:text-yellow-300",
  },
  health: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    bgHover: "hover:bg-rose-100 dark:hover:bg-rose-900/30",
    textHover: "hover:text-rose-700 dark:hover:text-rose-300",
  },
  everyday: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-600 dark:text-orange-400",
    bgHover: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
    textHover: "hover:text-orange-700 dark:hover:text-orange-300",
  },
  education: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-600 dark:text-indigo-400",
    bgHover: "hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
    textHover: "hover:text-indigo-700 dark:hover:text-indigo-300",
  },
  developer: {
    bg: "bg-slate-50 dark:bg-slate-950/30",
    text: "text-slate-600 dark:text-slate-400",
    bgHover: "hover:bg-slate-100 dark:hover:bg-slate-900/30",
    textHover: "hover:text-slate-700 dark:hover:text-slate-300",
  },
};

export const tools: CalculatorToolDefinition[] = [
  // ── Math (9) ───────────────────────────────────────────
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages, percentage change, and what percent X is of Y.",
    icon: Percent,
    emoji: "%",
    category: "math",
    inputType: "fields",
    fields: [
      { name: "value", type: "number", required: true },
      { name: "percentage", type: "number", required: true },
      {
        name: "mode",
        type: "select",
        required: true,
        default: "whatIsXPercentOfY",
        options: [
          { value: "whatIsXPercentOfY", label: "What is X% of Y?" },
          { value: "xIsWhatPercentOfY", label: "X is what % of Y?" },
          { value: "percentChange", label: "Percentage change" },
        ],
      },
    ],
  },
  {
    slug: "scientific-calculator",
    title: "Scientific Calculator",
    description: "Evaluate mathematical expressions with advanced functions.",
    icon: Calculator,
    emoji: "🔬",
    category: "math",
    inputType: "expression",
    fields: [{ name: "expression", type: "text", required: true }],
    previewData: "sqrt(2) * pi",
  },
  {
    slug: "ratio-calculator",
    title: "Ratio Calculator",
    description: "Solve proportions and ratios. Find the missing value in a:b = c:d.",
    icon: Scale,
    emoji: "⚖️",
    category: "math",
    inputType: "fields",
    fields: [
      { name: "a", type: "number" },
      { name: "b", type: "number" },
      { name: "c", type: "number" },
      { name: "d", type: "number" },
    ],
  },
  {
    slug: "gcd-lcm",
    title: "GCD & LCM Calculator",
    description: "Find the Greatest Common Divisor and Least Common Multiple of two numbers.",
    icon: Hash,
    emoji: "🔢",
    category: "math",
    inputType: "fields",
    fields: [
      { name: "numberA", type: "number", required: true },
      { name: "numberB", type: "number", required: true },
    ],
  },
  {
    slug: "factorial",
    title: "Factorial Calculator",
    description: "Calculate the factorial (n!) of a number.",
    icon: Sigma,
    emoji: "❗",
    category: "math",
    inputType: "fields",
    fields: [
      { name: "number", type: "number", required: true, min: 0, max: 170 },
    ],
  },
  {
    slug: "prime-checker",
    title: "Prime Number Checker",
    description: "Check if a number is prime and find its prime factors.",
    icon: BinaryIcon,
    emoji: "🔍",
    category: "math",
    inputType: "fields",
    fields: [
      { name: "number", type: "number", required: true, min: 2 },
    ],
  },
  {
    slug: "logarithm",
    title: "Logarithm Calculator",
    description: "Calculate logarithms with any base (common, natural, or custom).",
    icon: BookOpen,
    emoji: "📖",
    category: "math",
    inputType: "fields",
    fields: [
      { name: "value", type: "number", required: true },
      { name: "base", type: "number", default: 10 },
    ],
  },
  {
    slug: "quadratic-solver",
    title: "Quadratic Equation Solver",
    description: "Solve quadratic equations (ax² + bx + c = 0) and find roots.",
    icon: FlaskConical,
    emoji: "📐",
    category: "math",
    inputType: "fields",
    fields: [
      { name: "a", type: "number", required: true },
      { name: "b", type: "number", required: true },
      { name: "c", type: "number", required: true },
    ],
  },
  {
    slug: "matrix-calculator",
    title: "Matrix Calculator",
    description: "Perform matrix operations: addition, multiplication, determinant, inverse.",
    icon: Grid3x3,
    emoji: "🔲",
    category: "math",
    inputType: "dataset",
    fields: [],
    previewData: "1 2 3\n4 5 6\n7 8 9",
  },

  // ── Statistics (7) ─────────────────────────────────────
  {
    slug: "mean-median-mode",
    title: "Mean, Median & Mode",
    description: "Calculate mean, median, mode, and range from a dataset.",
    icon: BarChart3,
    emoji: "📊",
    category: "statistics",
    inputType: "dataset",
    fields: [],
    previewData: "10, 20, 30, 40, 50",
  },
  {
    slug: "standard-deviation",
    title: "Standard Deviation",
    description: "Calculate standard deviation and variance for population or sample data.",
    icon: Activity,
    emoji: "📈",
    category: "statistics",
    inputType: "dataset",
    previewData: "10, 20, 30, 40, 50",
    fields: [
      {
        name: "type",
        type: "select",
        default: "population",
        options: [
          { value: "population", label: "Population" },
          { value: "sample", label: "Sample" },
        ],
      },
    ],
  },
  {
    slug: "probability",
    title: "Probability Calculator",
    description: "Calculate simple probability from favorable and total outcomes.",
    icon: Dice5,
    emoji: "🎲",
    category: "statistics",
    inputType: "fields",
    fields: [
      { name: "favorable", type: "number", required: true, min: 0 },
      { name: "total", type: "number", required: true, min: 1 },
    ],
  },
  {
    slug: "permutation-combination",
    title: "Permutation & Combination",
    description: "Calculate permutations (nPr) and combinations (nCr).",
    icon: Sigma,
    emoji: "🔀",
    category: "statistics",
    inputType: "fields",
    fields: [
      { name: "n", type: "number", required: true, min: 0 },
      { name: "r", type: "number", required: true, min: 0 },
      {
        name: "type",
        type: "select",
        default: "permutation",
        options: [
          { value: "permutation", label: "Permutation (nPr)" },
          { value: "combination", label: "Combination (nCr)" },
        ],
      },
    ],
  },
  {
    slug: "z-score",
    title: "Z-Score Calculator",
    description: "Calculate z-score from a value, mean, and standard deviation.",
    icon: BarChartHorizontal,
    emoji: "📉",
    category: "statistics",
    inputType: "fields",
    fields: [
      { name: "value", type: "number", required: true },
      { name: "mean", type: "number", required: true },
      { name: "stdDev", type: "number", required: true },
    ],
  },
  {
    slug: "confidence-interval",
    title: "Confidence Interval",
    description: "Calculate confidence intervals for population means.",
    icon: Target,
    emoji: "🎯",
    category: "statistics",
    inputType: "fields",
    fields: [
      { name: "mean", type: "number", required: true },
      { name: "stdDev", type: "number", required: true },
      { name: "sampleSize", type: "number", required: true, min: 2 },
      {
        name: "confidenceLevel",
        type: "select",
        default: "95",
        options: [
          { value: "90", label: "90%" },
          { value: "95", label: "95%" },
          { value: "99", label: "99%" },
        ],
      },
    ],
  },
  {
    slug: "regression",
    title: "Linear Regression",
    description: "Calculate linear regression line, R² value, and predictions.",
    icon: TrendingUp,
    emoji: "📈",
    category: "statistics",
    inputType: "dataset",
    fields: [],
    previewData: "1, 2\n2, 4\n3, 5\n4, 8\n5, 10",
  },

  // ── Trigonometry (3) ───────────────────────────────────
  {
    slug: "trigonometry",
    title: "Trigonometry Calculator",
    description: "Calculate sine, cosine, tangent, and inverse trig functions.",
    icon: Triangle,
    emoji: "📐",
    category: "trigonometry",
    inputType: "fields",
    fields: [
      { name: "angle", type: "number", required: true },
      {
        name: "unit",
        type: "select",
        default: "degrees",
        options: [
          { value: "degrees", label: "Degrees" },
          { value: "radians", label: "Radians" },
        ],
      },
      {
        name: "function",
        type: "select",
        default: "sin",
        options: [
          { value: "sin", label: "sin" },
          { value: "cos", label: "cos" },
          { value: "tan", label: "tan" },
          { value: "asin", label: "asin" },
          { value: "acos", label: "acos" },
          { value: "atan", label: "atan" },
        ],
      },
    ],
  },
  {
    slug: "right-triangle",
    title: "Right Triangle Calculator",
    description: "Calculate sides and angles of a right triangle. Fill any two sides.",
    icon: Triangle,
    emoji: "📏",
    category: "trigonometry",
    inputType: "fields",
    fields: [
      { name: "sideA", type: "number", min: 0 },
      { name: "sideB", type: "number", min: 0 },
      { name: "hypotenuse", type: "number", min: 0 },
    ],
  },
  {
    slug: "circle-calculator",
    title: "Circle Calculator",
    description: "Calculate radius, diameter, circumference, and area of a circle.",
    icon: Circle,
    emoji: "⭕",
    category: "trigonometry",
    inputType: "fields",
    fields: [
      { name: "value", type: "number", required: true, min: 0 },
      {
        name: "property",
        type: "select",
        default: "radius",
        options: [
          { value: "radius", label: "Radius" },
          { value: "diameter", label: "Diameter" },
          { value: "circumference", label: "Circumference" },
          { value: "area", label: "Area" },
        ],
      },
    ],
  },

  // ── Financial (10) ─────────────────────────────────────
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    description: "Calculate compound interest with different compounding frequencies.",
    icon: DollarSign,
    emoji: "💰",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "principal", type: "number", required: true, min: 0, suffix: "$", preview: 10000 },
      { name: "rate", type: "number", required: true, min: 0, suffix: "%", preview: 5 },
      { name: "time", type: "number", required: true, min: 0, suffix: "years", preview: 10 },
      {
        name: "frequency",
        type: "select",
        default: "annually",
        options: [
          { value: "annually", label: "Annually" },
          { value: "semi-annually", label: "Semi-Annually" },
          { value: "quarterly", label: "Quarterly" },
          { value: "monthly", label: "Monthly" },
          { value: "daily", label: "Daily" },
        ],
      },
    ],
  },
  {
    slug: "loan-calculator",
    title: "Loan Calculator",
    description: "Calculate monthly payments, total interest, and amortization schedule.",
    icon: Landmark,
    emoji: "🏦",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "amount", type: "number", required: true, min: 0, suffix: "$", preview: 50000 },
      { name: "rate", type: "number", required: true, min: 0, suffix: "%", preview: 5 },
      { name: "term", type: "number", required: true, min: 0, suffix: "years", preview: 5 },
      {
        name: "frequency",
        type: "select",
        default: "monthly",
        options: [
          { value: "monthly", label: "Monthly" },
          { value: "bi-weekly", label: "Bi-Weekly" },
        ],
      },
    ],
  },
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments with taxes and insurance.",
    icon: Home,
    emoji: "🏠",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "homePrice", type: "number", required: true, min: 0, suffix: "$", preview: 300000 },
      { name: "downPayment", type: "number", required: true, min: 0, suffix: "$", preview: 60000 },
      { name: "rate", type: "number", required: true, min: 0, suffix: "%", preview: 4 },
      { name: "term", type: "number", required: true, min: 0, suffix: "years", preview: 30 },
      { name: "propertyTax", type: "number", min: 0, suffix: "$/yr" },
      { name: "insurance", type: "number", min: 0, suffix: "$/yr" },
    ],
  },
  {
    slug: "savings-goal",
    title: "Savings Goal Calculator",
    description: "Calculate how much to save monthly to reach your financial goal.",
    icon: PiggyBank,
    emoji: "🐷",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "goalAmount", type: "number", required: true, min: 0, suffix: "$", preview: 10000 },
      { name: "currentSavings", type: "number", min: 0, default: 0, suffix: "$" },
      { name: "rate", type: "number", min: 0, default: 0, suffix: "%" },
      { name: "timeframe", type: "number", required: true, min: 1, suffix: "months" },
    ],
  },
  {
    slug: "roi-calculator",
    title: "ROI Calculator",
    description: "Calculate return on investment, annualized ROI, and profit.",
    icon: TrendingUp,
    emoji: "📈",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "initialInvestment", type: "number", required: true, min: 0, suffix: "$", preview: 10000 },
      { name: "finalValue", type: "number", required: true, min: 0, suffix: "$", preview: 15000 },
      { name: "timePeriod", type: "number", min: 0, suffix: "years" },
    ],
  },
  {
    slug: "profit-margin",
    title: "Profit Margin Calculator",
    description: "Calculate gross profit margin, markup, and net profit.",
    icon: Receipt,
    emoji: "🧾",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "revenue", type: "number", required: true, min: 0, suffix: "$", preview: 10000 },
      { name: "cost", type: "number", required: true, min: 0, suffix: "$", preview: 7000 },
    ],
  },
  {
    slug: "markup-calculator",
    title: "Markup Calculator",
    description: "Calculate selling price from cost and markup percentage.",
    icon: Tag,
    emoji: "🏷️",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "cost", type: "number", required: true, min: 0, suffix: "$", preview: 100 },
      { name: "markup", type: "number", required: true, min: 0, suffix: "%", preview: 50 },
    ],
  },
  {
    slug: "break-even",
    title: "Break-Even Calculator",
    description: "Calculate break-even point in units and revenue.",
    icon: HandCoins,
    emoji: "⚖️",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "fixedCosts", type: "number", required: true, min: 0, suffix: "$", preview: 10000 },
      { name: "variableCost", type: "number", required: true, min: 0, suffix: "$", preview: 5 },
      { name: "pricePerUnit", type: "number", required: true, min: 0, suffix: "$", preview: 25 },
    ],
  },
  {
    slug: "depreciation",
    title: "Depreciation Calculator",
    description: "Calculate asset depreciation using straight-line or declining balance.",
    icon: BarChartHorizontal,
    emoji: "📉",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "assetCost", type: "number", required: true, min: 0, suffix: "$", preview: 10000 },
      { name: "salvageValue", type: "number", required: true, min: 0, suffix: "$", preview: 1000 },
      { name: "usefulLife", type: "number", required: true, min: 1, suffix: "years" },
      {
        name: "method",
        type: "select",
        default: "straight-line",
        options: [
          { value: "straight-line", label: "Straight-Line" },
          { value: "declining-balance", label: "Declining Balance" },
        ],
      },
    ],
  },
  {
    slug: "sales-tax",
    title: "Sales Tax Calculator",
    description: "Calculate sales tax, add tax to price, or extract tax from total.",
    icon: Receipt,
    emoji: "🧾",
    category: "financial",
    inputType: "fields",
    fields: [
      { name: "amount", type: "number", required: true, min: 0, suffix: "$" },
      { name: "taxRate", type: "number", required: true, min: 0, suffix: "%" },
      {
        name: "mode",
        type: "select",
        default: "addTax",
        options: [
          { value: "addTax", label: "Add Tax" },
          { value: "removeTax", label: "Remove Tax" },
        ],
      },
    ],
  },

  // ── Health (8) ─────────────────────────────────────────
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    description: "Calculate Body Mass Index and find your BMI category.",
    icon: Weight,
    emoji: "⚖️",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "weight", type: "number", required: true, min: 0, suffix: "kg", preview: 70 },
      { name: "height", type: "number", required: true, min: 0, suffix: "cm", preview: 175 },
      {
        name: "unit",
        type: "select",
        default: "metric",
        options: [
          { value: "metric", label: "Metric (kg/cm)" },
          { value: "imperial", label: "Imperial (lbs/in)" },
        ],
      },
    ],
  },
  {
    slug: "bmr-calculator",
    title: "BMR Calculator",
    description: "Calculate Basal Metabolic Rate using Harris-Benedict or Mifflin-St Jeor.",
    icon: Flame,
    emoji: "🔥",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "weight", type: "number", required: true, min: 0, suffix: "kg", preview: 70 },
      { name: "height", type: "number", required: true, min: 0, suffix: "cm", preview: 175 },
      { name: "age", type: "number", required: true, min: 0, preview: 30 },
      {
        name: "gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        name: "formula",
        type: "select",
        default: "mifflin-st-jeor",
        options: [
          { value: "harris-benedict", label: "Harris-Benedict" },
          { value: "mifflin-st-jeor", label: "Mifflin-St Jeor" },
        ],
      },
    ],
  },
  {
    slug: "tdee-calculator",
    title: "TDEE Calculator",
    description: "Calculate Total Daily Energy Expenditure based on activity level.",
    icon: ZapIcon,
    emoji: "⚡",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "weight", type: "number", required: true, min: 0, suffix: "kg", preview: 70 },
      { name: "height", type: "number", required: true, min: 0, suffix: "cm", preview: 175 },
      { name: "age", type: "number", required: true, min: 0, preview: 30 },
      {
        name: "gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        name: "activityLevel",
        type: "select",
        default: "moderate",
        options: [
          { value: "sedentary", label: "Sedentary (little or no exercise)" },
          { value: "light", label: "Light (1-3 days/week)" },
          { value: "moderate", label: "Moderate (3-5 days/week)" },
          { value: "active", label: "Active (6-7 days/week)" },
          { value: "very-active", label: "Very Active (intense daily)" },
        ],
      },
    ],
  },
  {
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    description: "Calculate daily calorie needs for weight loss, maintenance, or gain.",
    icon: Apple,
    emoji: "🍎",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "weight", type: "number", required: true, min: 0, suffix: "kg", preview: 70 },
      { name: "height", type: "number", required: true, min: 0, suffix: "cm", preview: 175 },
      { name: "age", type: "number", required: true, min: 0, preview: 30 },
      {
        name: "gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        name: "activityLevel",
        type: "select",
        default: "moderate",
        options: [
          { value: "sedentary", label: "Sedentary" },
          { value: "light", label: "Light" },
          { value: "moderate", label: "Moderate" },
          { value: "active", label: "Active" },
          { value: "very-active", label: "Very Active" },
        ],
      },
      {
        name: "goal",
        type: "select",
        default: "maintain",
        options: [
          { value: "lose", label: "Lose Weight" },
          { value: "maintain", label: "Maintain Weight" },
          { value: "gain", label: "Gain Weight" },
        ],
      },
    ],
  },
  {
    slug: "body-fat",
    title: "Body Fat Calculator",
    description: "Estimate body fat percentage using the U.S. Navy method.",
    icon: Droplets,
    emoji: "💧",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "waist", type: "number", required: true, min: 0, suffix: "cm", preview: 85 },
      { name: "neck", type: "number", required: true, min: 0, suffix: "cm", preview: 38 },
      { name: "height", type: "number", required: true, min: 0, suffix: "cm", preview: 175 },
      { name: "hip", type: "number", min: 0, suffix: "cm" },
      {
        name: "gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    ],
  },
  {
    slug: "ideal-weight",
    title: "Ideal Weight Calculator",
    description: "Calculate ideal body weight using multiple formulas (Devine, Robinson, Miller).",
    icon: Dumbbell,
    emoji: "💪",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "height", type: "number", required: true, min: 0, suffix: "cm", preview: 170 },
      {
        name: "gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    ],
  },
  {
    slug: "heart-rate-zone",
    title: "Heart Rate Zone Calculator",
    description: "Calculate target heart rate zones for exercise based on age and resting HR.",
    icon: Heart,
    emoji: "❤️",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "age", type: "number", required: true, min: 0 },
      { name: "restingHR", type: "number", required: true, min: 0, suffix: "bpm" },
    ],
  },
  {
    slug: "macro-calculator",
    title: "Macro Calculator",
    description: "Calculate macronutrient split (protein, carbs, fat) for your diet.",
    icon: Activity,
    emoji: "🥗",
    category: "health",
    inputType: "fields",
    fields: [
      { name: "calories", type: "number", required: true, min: 0, suffix: "kcal", preview: 2000 },
      {
        name: "diet",
        type: "select",
        default: "balanced",
        options: [
          { value: "balanced", label: "Balanced" },
          { value: "low-carb", label: "Low Carb" },
          { value: "high-protein", label: "High Protein" },
          { value: "keto", label: "Keto" },
        ],
      },
    ],
  },

  // ── Everyday (7) ───────────────────────────────────────
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    description: "Calculate tip amount and split the bill between people.",
    icon: HandCoins,
    emoji: "💵",
    category: "everyday",
    inputType: "fields",
    fields: [
      { name: "billAmount", type: "number", required: true, min: 0, suffix: "$", preview: 50 },
      { name: "tipPercent", type: "number", required: true, min: 0, default: 15, suffix: "%" },
      { name: "numPeople", type: "number", min: 1, default: 1 },
    ],
  },
  {
    slug: "electricity-cost",
    title: "Electricity Cost Calculator",
    description: "Calculate electricity consumption cost for any appliance.",
    icon: Lightbulb,
    emoji: "💡",
    category: "everyday",
    inputType: "fields",
    fields: [
      { name: "watts", type: "number", required: true, min: 0, suffix: "W", preview: 1000 },
      { name: "hoursPerDay", type: "number", required: true, min: 0, preview: 8 },
      { name: "daysPerMonth", type: "number", min: 0, default: 30 },
      { name: "costPerKwh", type: "number", required: true, min: 0, suffix: "$" },
    ],
  },
  {
    slug: "fuel-cost",
    title: "Fuel Cost Calculator",
    description: "Calculate fuel cost for a trip based on distance and efficiency.",
    icon: Fuel,
    emoji: "⛽",
    category: "everyday",
    inputType: "fields",
    fields: [
      { name: "distance", type: "number", required: true, min: 0, suffix: "km", preview: 100 },
      { name: "fuelEfficiency", type: "number", required: true, min: 0, suffix: "L/100km", preview: 8 },
      { name: "fuelPrice", type: "number", required: true, min: 0, suffix: "$", preview: 1.5 },
    ],
  },
  {
    slug: "paint-calculator",
    title: "Paint Calculator",
    description: "Calculate how much paint you need for a room.",
    icon: Paintbrush,
    emoji: "🎨",
    category: "everyday",
    inputType: "fields",
    fields: [
      { name: "length", type: "number", required: true, min: 0, suffix: "m" },
      { name: "width", type: "number", required: true, min: 0, suffix: "m" },
      { name: "height", type: "number", required: true, min: 0, suffix: "m" },
      { name: "doors", type: "number", min: 0, default: 1 },
      { name: "windows", type: "number", min: 0, default: 1 },
      { name: "coats", type: "number", min: 1, default: 2 },
    ],
  },
  {
    slug: "concrete-calculator",
    title: "Concrete Calculator",
    description: "Calculate how much concrete you need for a slab or foundation.",
    icon: HardHat,
    emoji: "🏗️",
    category: "everyday",
    inputType: "fields",
    fields: [
      { name: "length", type: "number", required: true, min: 0, suffix: "m" },
      { name: "width", type: "number", required: true, min: 0, suffix: "m" },
      { name: "depth", type: "number", required: true, min: 0, suffix: "m" },
    ],
  },
  {
    slug: "tile-calculator",
    title: "Tile Calculator",
    description: "Calculate number of tiles needed with gap spacing and wastage.",
    icon: Grid3x3,
    emoji: "🔲",
    category: "everyday",
    inputType: "fields",
    fields: [
      { name: "roomLength", type: "number", required: true, min: 0, suffix: "m" },
      { name: "roomWidth", type: "number", required: true, min: 0, suffix: "m" },
      { name: "tileLength", type: "number", required: true, min: 0, suffix: "cm" },
      { name: "tileWidth", type: "number", required: true, min: 0, suffix: "cm" },
      { name: "gap", type: "number", min: 0, default: 3, suffix: "mm" },
      { name: "wastage", type: "number", min: 0, default: 10, suffix: "%" },
    ],
  },
  {
    slug: "random-number",
    title: "Random Number Generator",
    description: "Generate random numbers within a range with optional uniqueness.",
    icon: Dice5,
    emoji: "🎲",
    category: "everyday",
    inputType: "fields",
    fields: [
      { name: "min", type: "number", default: 1 },
      { name: "max", type: "number", default: 100 },
      { name: "count", type: "number", default: 1, min: 1 },
      {
        name: "allowDuplicates",
        type: "select",
        default: "yes",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },

  // ── Education (4) ──────────────────────────────────────
  {
    slug: "gpa-calculator",
    title: "GPA Calculator",
    description: "Calculate GPA from course grades and credit hours.",
    icon: GraduationCap,
    emoji: "🎓",
    category: "education",
    inputType: "dataset",
    previewData: "A, 3\nB+, 4\nA-, 3",
    fields: [
      {
        name: "scale",
        type: "select",
        default: "4.0",
        options: [
          { value: "4.0", label: "4.0 Scale" },
          { value: "4.3", label: "4.3 Scale" },
          { value: "4.5", label: "4.5 Scale" },
        ],
      },
    ],
  },
  {
    slug: "grade-calculator",
    title: "Grade Calculator",
    description: "Calculate weighted or unweighted grade averages.",
    icon: Award,
    emoji: "📝",
    category: "education",
    inputType: "dataset",
    fields: [],
    previewData: "85, 0.3\n92, 0.4\n78, 0.3",
  },
  {
    slug: "final-exam",
    title: "Final Exam Calculator",
    description: "Calculate the grade you need on your final exam to pass.",
    icon: FileCheck,
    emoji: "📋",
    category: "education",
    inputType: "fields",
    fields: [
      { name: "currentGrade", type: "number", required: true, min: 0, max: 100, suffix: "%" },
      { name: "examWeight", type: "number", required: true, min: 0, max: 100, suffix: "%" },
      { name: "targetGrade", type: "number", required: true, min: 0, max: 100, suffix: "%" },
    ],
  },
  {
    slug: "weighted-average",
    title: "Weighted Average Calculator",
    description: "Calculate weighted averages with custom weights.",
    icon: Scale,
    emoji: "⚖️",
    category: "education",
    inputType: "dataset",
    fields: [],
    previewData: "80, 2\n90, 3\n85, 1",
  },

  // ── Developer (2) ──────────────────────────────────────
  {
    slug: "bitwise-calculator",
    title: "Bitwise Calculator",
    description: "Perform bitwise operations: AND, OR, XOR, NOT, shifts.",
    icon: Cpu,
    emoji: "🔧",
    category: "developer",
    inputType: "fields",
    fields: [
      { name: "numberA", type: "number", required: true },
      { name: "numberB", type: "number" },
      {
        name: "operation",
        type: "select",
        default: "AND",
        options: [
          { value: "AND", label: "AND (&)" },
          { value: "OR", label: "OR (|)" },
          { value: "XOR", label: "XOR (^)" },
          { value: "NOT", label: "NOT (~)" },
          { value: "LEFT-SHIFT", label: "Left Shift (<<)" },
          { value: "RIGHT-SHIFT", label: "Right Shift (>>)" },
        ],
      },
    ],
  },
  {
    slug: "subnet-calculator",
    title: "Subnet Calculator",
    description: "Calculate subnet details: network address, broadcast, host range, CIDR.",
    icon: Network,
    emoji: "🌐",
    category: "developer",
    inputType: "fields",
    fields: [
      { name: "ipAddress", type: "text", required: true },
      {
        name: "subnetMask",
        type: "select",
        default: "/24",
        options: [
          { value: "/8", label: "/8 (255.0.0.0)" },
          { value: "/16", label: "/16 (255.255.0.0)" },
          { value: "/24", label: "/24 (255.255.255.0)" },
          { value: "/25", label: "/25 (255.255.255.128)" },
          { value: "/26", label: "/26 (255.255.255.192)" },
          { value: "/27", label: "/27 (255.255.255.224)" },
          { value: "/28", label: "/28 (255.255.255.240)" },
          { value: "/29", label: "/29 (255.255.255.248)" },
          { value: "/30", label: "/30 (255.255.255.252)" },
          { value: "/32", label: "/32 (255.255.255.255)" },
        ],
      },
    ],
  },
];

const toolsBySlug = new Map(tools.map((t) => [t.slug, t]));

export function getToolBySlug(slug: string) {
  return toolsBySlug.get(slug);
}
