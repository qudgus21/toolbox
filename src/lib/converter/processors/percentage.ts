import type { ConverterResult } from "../types";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function decimalToFraction(decimal: number): string {
  if (Number.isInteger(decimal)) return `${decimal}/1`;
  const str = String(Math.abs(decimal));
  const decimalPlaces = str.includes(".")
    ? str.length - str.indexOf(".") - 1
    : 0;
  const denominator = Math.pow(10, decimalPlaces);
  const numerator = Math.round(Math.abs(decimal) * denominator);
  const divisor = gcd(numerator, denominator);
  const sign = decimal < 0 ? "-" : "";
  return `${sign}${numerator / divisor}/${denominator / divisor}`;
}

function detectMode(
  input: string,
): "percentToDecimal" | "fractionToPercent" | "decimalToPercent" {
  if (input.includes("%")) return "percentToDecimal";
  if (input.includes("/")) return "fractionToPercent";
  return "decimalToPercent";
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const mode = (options?.mode as string) ?? detectMode(trimmed);

    if (mode === "percentToDecimal") {
      const numStr = trimmed.replace(/%/g, "").trim();
      const percent = parseFloat(numStr);
      if (isNaN(percent)) return { output: "" };

      const decimal = percent / 100;
      const fraction = decimalToFraction(decimal);

      return {
        output: String(decimal),
        table: [
          { label: "Percentage", value: `${percent}%` },
          { label: "Decimal", value: String(decimal) },
          { label: "Fraction", value: fraction },
        ],
        stats: { percentage: percent, decimal, fraction },
      };
    } else if (mode === "fractionToPercent") {
      const match = trimmed.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
      if (!match) return { output: "" };

      const num = parseInt(match[1], 10);
      const den = parseInt(match[2], 10);
      if (den === 0) return { output: "" };

      const decimal = num / den;
      const percent = decimal * 100;
      const percentStr = `${percent.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}%`;

      return {
        output: percentStr,
        table: [
          { label: "Fraction", value: trimmed },
          { label: "Decimal", value: String(decimal) },
          { label: "Percentage", value: percentStr },
        ],
        stats: { fraction: trimmed, decimal, percentage: percent },
      };
    } else {
      // decimalToPercent
      const decimal = parseFloat(trimmed);
      if (isNaN(decimal)) return { output: "" };

      const percent = decimal * 100;
      const percentStr = `${percent.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}%`;
      const fraction = decimalToFraction(decimal);

      return {
        output: percentStr,
        table: [
          { label: "Decimal", value: String(decimal) },
          { label: "Percentage", value: percentStr },
          { label: "Fraction", value: fraction },
        ],
        stats: { decimal, percentage: percent, fraction },
      };
    }
  } catch {
    return { output: "" };
  }
}
