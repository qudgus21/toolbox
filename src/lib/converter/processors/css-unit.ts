import type { ConverterResult } from "../types";

type CssUnit = "px" | "rem" | "em" | "%" | "vw" | "vh";

const UNIT_LABELS: Record<CssUnit, string> = {
  px: "Pixels",
  rem: "Root Em",
  em: "Em",
  "%": "Percent",
  vw: "Viewport Width",
  vh: "Viewport Height",
};

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(6)).toString();
}

function toPx(
  value: number,
  unit: CssUnit,
  baseSize: number,
  vw: number,
  vh: number,
): number {
  switch (unit) {
    case "px":
      return value;
    case "rem":
    case "em":
      return value * baseSize;
    case "%":
      return (value / 100) * vw;
    case "vw":
      return (value / 100) * vw;
    case "vh":
      return (value / 100) * vh;
    default:
      return NaN;
  }
}

function fromPx(
  px: number,
  unit: CssUnit,
  baseSize: number,
  vw: number,
  vh: number,
): number {
  switch (unit) {
    case "px":
      return px;
    case "rem":
    case "em":
      return px / baseSize;
    case "%":
      return (px / vw) * 100;
    case "vw":
      return (px / vw) * 100;
    case "vh":
      return (px / vh) * 100;
    default:
      return NaN;
  }
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const value = parseFloat(input);
  if (isNaN(value)) return { output: "" };

  const units: CssUnit[] = ["px", "rem", "em", "%", "vw", "vh"];
  const fromUnit = ((options?.fromUnit as string) || "px") as CssUnit;
  const toUnit = ((options?.toUnit as string) || "rem") as CssUnit;
  const baseSize = parseFloat((options?.baseSize as string) || "16");
  const viewportWidth = parseFloat(
    (options?.viewportWidth as string) || "1920",
  );
  const viewportHeight = parseFloat(
    (options?.viewportHeight as string) || "1080",
  );

  if (!UNIT_LABELS[fromUnit] || !UNIT_LABELS[toUnit]) return { output: "" };

  const px = toPx(value, fromUnit, baseSize, viewportWidth, viewportHeight);
  const result = fromPx(px, toUnit, baseSize, viewportWidth, viewportHeight);
  const output = formatNumber(result);

  const table = units.map((unit) => ({
    label: UNIT_LABELS[unit],
    value: formatNumber(
      fromPx(px, unit, baseSize, viewportWidth, viewportHeight),
    ),
    unit,
  }));

  return { output, table };
}
