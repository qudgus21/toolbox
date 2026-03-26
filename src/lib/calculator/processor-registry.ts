import type { CalculatorProcessor } from "./types";

const registry = new Map<string, () => Promise<{ process: CalculatorProcessor }>>();

// MATH
registry.set("percentage-calculator", () => import("./processors/percentage-calculator"));
registry.set("scientific-calculator", () => import("./processors/scientific-calculator"));
registry.set("ratio-calculator", () => import("./processors/ratio-calculator"));
registry.set("gcd-lcm", () => import("./processors/gcd-lcm"));
registry.set("factorial", () => import("./processors/factorial"));
registry.set("prime-checker", () => import("./processors/prime-checker"));
registry.set("logarithm", () => import("./processors/logarithm"));
registry.set("quadratic-solver", () => import("./processors/quadratic-solver"));
registry.set("matrix-calculator", () => import("./processors/matrix-calculator"));

// STATISTICS
registry.set("mean-median-mode", () => import("./processors/mean-median-mode"));
registry.set("standard-deviation", () => import("./processors/standard-deviation"));
registry.set("probability", () => import("./processors/probability"));
registry.set("permutation-combination", () => import("./processors/permutation-combination"));
registry.set("z-score", () => import("./processors/z-score"));
registry.set("confidence-interval", () => import("./processors/confidence-interval"));
registry.set("regression", () => import("./processors/regression"));

// TRIGONOMETRY
registry.set("trigonometry", () => import("./processors/trigonometry"));
registry.set("right-triangle", () => import("./processors/right-triangle"));
registry.set("circle-calculator", () => import("./processors/circle-calculator"));

// FINANCIAL
registry.set("compound-interest", () => import("./processors/compound-interest"));
registry.set("loan-calculator", () => import("./processors/loan-calculator"));
registry.set("mortgage-calculator", () => import("./processors/mortgage-calculator"));
registry.set("savings-goal", () => import("./processors/savings-goal"));
registry.set("roi-calculator", () => import("./processors/roi-calculator"));
registry.set("profit-margin", () => import("./processors/profit-margin"));
registry.set("markup-calculator", () => import("./processors/markup-calculator"));
registry.set("break-even", () => import("./processors/break-even"));
registry.set("depreciation", () => import("./processors/depreciation"));
registry.set("sales-tax", () => import("./processors/sales-tax"));

// HEALTH
registry.set("bmi-calculator", () => import("./processors/bmi-calculator"));
registry.set("bmr-calculator", () => import("./processors/bmr-calculator"));
registry.set("tdee-calculator", () => import("./processors/tdee-calculator"));
registry.set("calorie-calculator", () => import("./processors/calorie-calculator"));
registry.set("body-fat", () => import("./processors/body-fat"));
registry.set("ideal-weight", () => import("./processors/ideal-weight"));
registry.set("heart-rate-zone", () => import("./processors/heart-rate-zone"));
registry.set("macro-calculator", () => import("./processors/macro-calculator"));

// EVERYDAY
registry.set("tip-calculator", () => import("./processors/tip-calculator"));
registry.set("electricity-cost", () => import("./processors/electricity-cost"));
registry.set("fuel-cost", () => import("./processors/fuel-cost"));
registry.set("paint-calculator", () => import("./processors/paint-calculator"));
registry.set("concrete-calculator", () => import("./processors/concrete-calculator"));
registry.set("tile-calculator", () => import("./processors/tile-calculator"));
registry.set("random-number", () => import("./processors/random-number"));

// EDUCATION
registry.set("gpa-calculator", () => import("./processors/gpa-calculator"));
registry.set("grade-calculator", () => import("./processors/grade-calculator"));
registry.set("final-exam", () => import("./processors/final-exam"));
registry.set("weighted-average", () => import("./processors/weighted-average"));

// DEVELOPER
registry.set("bitwise-calculator", () => import("./processors/bitwise-calculator"));
registry.set("subnet-calculator", () => import("./processors/subnet-calculator"));

export async function getProcessor(slug: string): Promise<CalculatorProcessor | null> {
  const loader = registry.get(slug);
  if (!loader) return null;
  const mod = await loader();
  return mod.process;
}

export function hasProcessor(slug: string): boolean {
  return registry.has(slug);
}

export function getAllSlugs(): string[] {
  return Array.from(registry.keys());
}
