import type { ConverterResult } from "../types";

const UNITS: Record<string, { label: string; toBase: number }> = {
  m: { label: "Meter", toBase: 1 },
  km: { label: "Kilometer", toBase: 1000 },
  cm: { label: "Centimeter", toBase: 0.01 },
  mm: { label: "Millimeter", toBase: 0.001 },
  mi: { label: "Mile", toBase: 1609.344 },
  yd: { label: "Yard", toBase: 0.9144 },
  ft: { label: "Foot", toBase: 0.3048 },
  in: { label: "Inch", toBase: 0.0254 },
  nm: { label: "Nautical Mile", toBase: 1852 },
  "μm": { label: "Micrometer", toBase: 0.000001 },
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
