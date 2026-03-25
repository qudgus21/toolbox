import type { ConverterResult } from "../types";

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(4)).toString();
}

const COMMON_PX = [8, 10, 12, 14, 16, 18, 20, 24, 32, 48, 64, 80, 96, 120, 160, 240, 320, 480, 640, 960];

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const value = parseFloat(input);
  if (isNaN(value)) return { output: "" };

  const direction = (options?.direction as string) || "pxToPercent";
  const containerWidth = parseFloat(
    (options?.containerWidth as string) || "1920",
  );

  if (isNaN(containerWidth) || containerWidth <= 0) return { output: "" };

  let output: string;

  if (direction === "pxToPercent") {
    output = formatNumber((value / containerWidth) * 100);
  } else {
    output = formatNumber((value / 100) * containerWidth);
  }

  const table = COMMON_PX.map((px) => ({
    label: `${px}px`,
    value: formatNumber((px / containerWidth) * 100),
    unit: "%",
  }));

  return { output, table };
}
