import type { ConverterResult } from "../types";

const COMMON_PX = [8, 10, 12, 14, 16, 18, 20, 24, 32, 48, 64, 80, 96];

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(6)).toString();
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const value = parseFloat(input);
  if (isNaN(value)) return { output: "" };

  const direction = (options?.direction as string) || "pxToRem";
  const baseSize = parseFloat((options?.baseSize as string) || "16");

  if (isNaN(baseSize) || baseSize <= 0) return { output: "" };

  let output: string;
  let resultPx: number;

  if (direction === "pxToRem") {
    const rem = value / baseSize;
    output = formatNumber(rem);
    resultPx = value;
  } else {
    const px = value * baseSize;
    output = formatNumber(px);
    resultPx = px;
  }

  const table = COMMON_PX.map((px) => ({
    label: `${px}px`,
    value: formatNumber(px / baseSize),
    unit: "rem",
  }));

  return { output, table };
}
