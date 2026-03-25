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

  const direction = (options?.direction as string) || "pxToEm";
  const parentSize = parseFloat((options?.parentSize as string) || "16");

  if (isNaN(parentSize) || parentSize <= 0) return { output: "" };

  let output: string;

  if (direction === "pxToEm") {
    output = formatNumber(value / parentSize);
  } else {
    output = formatNumber(value * parentSize);
  }

  const table = COMMON_PX.map((px) => ({
    label: `${px}px`,
    value: formatNumber(px / parentSize),
    unit: "em",
  }));

  return { output, table };
}
