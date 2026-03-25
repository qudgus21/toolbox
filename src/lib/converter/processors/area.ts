import type { ConverterResult } from "../types";

const UNITS: Record<string, { label: string; toBase: number }> = {
  "m²": { label: "Square Meter", toBase: 1 },
  "km²": { label: "Square Kilometer", toBase: 1_000_000 },
  ha: { label: "Hectare", toBase: 10_000 },
  acre: { label: "Acre", toBase: 4046.8564224 },
  "ft²": { label: "Square Foot", toBase: 0.09290304 },
  "mi²": { label: "Square Mile", toBase: 2_589_988.110336 },
  "yd²": { label: "Square Yard", toBase: 0.83612736 },
  "cm²": { label: "Square Centimeter", toBase: 0.0001 },
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
