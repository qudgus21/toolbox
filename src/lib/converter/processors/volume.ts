import type { ConverterResult } from "../types";

const UNITS: Record<string, { label: string; toBase: number }> = {
  L: { label: "Liter", toBase: 1 },
  mL: { label: "Milliliter", toBase: 0.001 },
  gal: { label: "US Gallon", toBase: 3.785411784 },
  "fl oz": { label: "US Fluid Ounce", toBase: 0.029573529562 },
  cup: { label: "US Cup", toBase: 0.2365882365 },
  pt: { label: "US Pint", toBase: 0.473176473 },
  qt: { label: "US Quart", toBase: 0.946352946 },
  "m³": { label: "Cubic Meter", toBase: 1000 },
  "cm³": { label: "Cubic Centimeter", toBase: 0.001 },
  tbsp: { label: "Tablespoon", toBase: 0.014786764781 },
  tsp: { label: "Teaspoon", toBase: 0.004928921594 },
};

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  if (Math.abs(n) >= 1000) return n.toFixed(2);
  if (Math.abs(n) >= 1) return n.toPrecision(6).replace(/\.?0+$/, "");
  return n.toPrecision(6).replace(/\.?0+$/, "");
}

function convert(value: number, from: string, to: string): number {
  const fromUnit = UNITS[from];
  const toUnit = UNITS[to];
  if (!fromUnit || !toUnit) return NaN;
  return (value * fromUnit.toBase) / toUnit.toBase;
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const value = parseFloat(input);
  if (isNaN(value)) return { output: "" };

  const keys = Object.keys(UNITS);
  const fromUnit = (options?.fromUnit as string) || keys[0];
  const toUnit = (options?.toUnit as string) || keys[1];

  if (!UNITS[fromUnit] || !UNITS[toUnit]) return { output: "" };

  const result = convert(value, fromUnit, toUnit);
  const output = formatNumber(result);

  const table = keys.map((key) => ({
    label: UNITS[key].label,
    value: formatNumber(convert(value, fromUnit, key)),
    unit: key,
  }));

  return { output, table };
}
