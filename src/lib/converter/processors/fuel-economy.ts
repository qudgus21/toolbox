import type { ConverterResult } from "../types";

// Fuel economy has an inverse relationship for L/100km.
// Base unit: km/L
// km/L and mpg are "higher is better" (direct ratio)
// L/100km is "lower is better" (inverse)

const UNIT_LABELS: Record<string, string> = {
  "km/L": "Kilometers per Liter",
  mpg: "Miles per Gallon (US)",
  "L/100km": "Liters per 100km",
};

const MPG_TO_KML = 0.425143707; // 1 mpg = 0.425143707 km/L

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  if (Math.abs(n) >= 1000) return n.toFixed(2);
  if (Math.abs(n) >= 1) return n.toPrecision(6).replace(/\.?0+$/, "");
  return n.toPrecision(6).replace(/\.?0+$/, "");
}

// Convert any unit to km/L (the base)
function toKmL(value: number, from: string): number {
  switch (from) {
    case "km/L":
      return value;
    case "mpg":
      return value * MPG_TO_KML;
    case "L/100km":
      if (value === 0) return Infinity;
      return 100 / value;
    default:
      return NaN;
  }
}

// Convert from km/L to any unit
function fromKmL(kmL: number, to: string): number {
  switch (to) {
    case "km/L":
      return kmL;
    case "mpg":
      return kmL / MPG_TO_KML;
    case "L/100km":
      if (kmL === 0) return Infinity;
      return 100 / kmL;
    default:
      return NaN;
  }
}

function convert(value: number, from: string, to: string): number {
  if (from === to) return value;
  const kmL = toKmL(value, from);
  return fromKmL(kmL, to);
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const value = parseFloat(input);
  if (isNaN(value)) return { output: "" };

  const keys = Object.keys(UNIT_LABELS);
  const fromUnit = (options?.fromUnit as string) || keys[0];
  const toUnit = (options?.toUnit as string) || keys[1];

  if (!UNIT_LABELS[fromUnit] || !UNIT_LABELS[toUnit]) return { output: "" };

  const result = convert(value, fromUnit, toUnit);

  if (!isFinite(result)) {
    return { output: "∞" };
  }

  const output = formatNumber(result);

  const table = keys.map((key) => {
    const converted = convert(value, fromUnit, key);
    return {
      label: UNIT_LABELS[key],
      value: isFinite(converted) ? formatNumber(converted) : "∞",
      unit: key,
    };
  });

  return { output, table };
}
