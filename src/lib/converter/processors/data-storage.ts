import type { ConverterResult } from "../types";

// Bytes use 1024-based, bits use 1000-based
// Base unit: Byte
const UNITS: Record<string, { label: string; toBase: number }> = {
  B: { label: "Byte", toBase: 1 },
  KB: { label: "Kilobyte", toBase: 1024 },
  MB: { label: "Megabyte", toBase: 1024 ** 2 },
  GB: { label: "Gigabyte", toBase: 1024 ** 3 },
  TB: { label: "Terabyte", toBase: 1024 ** 4 },
  PB: { label: "Petabyte", toBase: 1024 ** 5 },
  bit: { label: "Bit", toBase: 1 / 8 },
  Kbit: { label: "Kilobit", toBase: 1000 / 8 },
  Mbit: { label: "Megabit", toBase: 1_000_000 / 8 },
  Gbit: { label: "Gigabit", toBase: 1_000_000_000 / 8 },
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
