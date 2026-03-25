import type { ConverterResult } from "../types";

const UNIT_LABELS: Record<string, string> = {
  C: "Celsius",
  F: "Fahrenheit",
  K: "Kelvin",
};

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  if (Math.abs(n) >= 1000) return n.toFixed(2);
  if (Math.abs(n) >= 1) return n.toPrecision(6).replace(/\.?0+$/, "");
  return n.toPrecision(6).replace(/\.?0+$/, "");
}

function toKelvin(value: number, from: string): number {
  switch (from) {
    case "C":
      return value + 273.15;
    case "F":
      return (value - 32) * (5 / 9) + 273.15;
    case "K":
      return value;
    default:
      return NaN;
  }
}

function fromKelvin(kelvin: number, to: string): number {
  switch (to) {
    case "C":
      return kelvin - 273.15;
    case "F":
      return (kelvin - 273.15) * (9 / 5) + 32;
    case "K":
      return kelvin;
    default:
      return NaN;
  }
}

function convert(value: number, from: string, to: string): number {
  if (from === to) return value;
  const kelvin = toKelvin(value, from);
  return fromKelvin(kelvin, to);
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
  const output = formatNumber(result);

  const table = keys.map((key) => ({
    label: UNIT_LABELS[key],
    value: formatNumber(convert(value, fromUnit, key)),
    unit: key,
  }));

  return { output, table };
}
