import type { ConverterResult } from "../types";

const UNITS: Record<string, { label: string; toBase: number }> = {
  J: { label: "Joule", toBase: 1 },
  kJ: { label: "Kilojoule", toBase: 1000 },
  cal: { label: "Calorie", toBase: 4.184 },
  kcal: { label: "Kilocalorie", toBase: 4184 },
  Wh: { label: "Watt-hour", toBase: 3600 },
  kWh: { label: "Kilowatt-hour", toBase: 3_600_000 },
  BTU: { label: "British Thermal Unit", toBase: 1055.05585262 },
  eV: { label: "Electronvolt", toBase: 1.602176634e-19 },
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
