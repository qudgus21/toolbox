import type { ConverterResult } from "../types";

type Ingredient = "water" | "flour" | "sugar" | "butter" | "rice" | "milk";
type Unit = "cup" | "tbsp" | "tsp" | "mL" | "L" | "fl_oz" | "g" | "kg" | "oz" | "lb";

// Density in g/mL
const DENSITIES: Record<Ingredient, number> = {
  water: 1,
  flour: 0.57,
  sugar: 0.85,
  butter: 0.91,
  rice: 0.75,
  milk: 1.03,
};

// Volume units to mL
const VOLUME_TO_ML: Record<string, number> = {
  cup: 236.588,
  tbsp: 14.787,
  tsp: 4.929,
  mL: 1,
  L: 1000,
  fl_oz: 29.574,
};

// Weight units to grams
const WEIGHT_TO_G: Record<string, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
};

const VOLUME_UNITS = new Set(Object.keys(VOLUME_TO_ML));
const WEIGHT_UNITS = new Set(Object.keys(WEIGHT_TO_G));

const UNIT_LABELS: Record<Unit, string> = {
  cup: "Cup",
  tbsp: "Tablespoon",
  tsp: "Teaspoon",
  mL: "Milliliter",
  L: "Liter",
  fl_oz: "Fluid Ounce",
  g: "Gram",
  kg: "Kilogram",
  oz: "Ounce",
  lb: "Pound",
};

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  if (Math.abs(n) >= 100) return n.toFixed(2);
  return parseFloat(n.toPrecision(6)).toString();
}

function convert(
  value: number,
  from: Unit,
  to: Unit,
  density: number,
): number {
  const fromIsVolume = VOLUME_UNITS.has(from);
  const toIsVolume = VOLUME_UNITS.has(to);
  const fromIsWeight = WEIGHT_UNITS.has(from);
  const toIsWeight = WEIGHT_UNITS.has(to);

  if (fromIsVolume && toIsVolume) {
    const mL = value * VOLUME_TO_ML[from];
    return mL / VOLUME_TO_ML[to];
  }

  if (fromIsWeight && toIsWeight) {
    const g = value * WEIGHT_TO_G[from];
    return g / WEIGHT_TO_G[to];
  }

  if (fromIsVolume && toIsWeight) {
    const mL = value * VOLUME_TO_ML[from];
    const g = mL * density;
    return g / WEIGHT_TO_G[to];
  }

  if (fromIsWeight && toIsVolume) {
    const g = value * WEIGHT_TO_G[from];
    const mL = g / density;
    return mL / VOLUME_TO_ML[to];
  }

  return NaN;
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const value = parseFloat(input);
  if (isNaN(value)) return { output: "" };

  const fromUnit = ((options?.fromUnit as string) || "cup") as Unit;
  const toUnit = ((options?.toUnit as string) || "mL") as Unit;
  const ingredient = ((options?.ingredient as string) || "water") as Ingredient;

  if (!UNIT_LABELS[fromUnit] || !UNIT_LABELS[toUnit]) return { output: "" };

  const density = DENSITIES[ingredient] ?? 1;
  const result = convert(value, fromUnit, toUnit, density);

  if (isNaN(result)) return { output: "" };

  const output = formatNumber(result);

  const allUnits: Unit[] = ["cup", "tbsp", "tsp", "mL", "L", "fl_oz", "g", "kg", "oz", "lb"];
  const table = allUnits.map((unit) => ({
    label: UNIT_LABELS[unit],
    value: formatNumber(convert(value, fromUnit, unit, density)),
    unit,
  }));

  return { output, table };
}
