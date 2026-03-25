import type { ConverterResult } from "../types";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function decimalToFraction(decimal: number): { num: number; den: number } {
  if (Number.isInteger(decimal)) {
    return { num: decimal, den: 1 };
  }

  const sign = decimal < 0 ? -1 : 1;
  const abs = Math.abs(decimal);
  const str = String(abs);
  const decimalIndex = str.indexOf(".");
  if (decimalIndex === -1) return { num: decimal, den: 1 };

  const decimalPlaces = str.length - decimalIndex - 1;
  const denominator = Math.pow(10, decimalPlaces);
  const numerator = Math.round(abs * denominator);

  const divisor = gcd(numerator, denominator);
  return {
    num: sign * (numerator / divisor),
    den: denominator / divisor,
  };
}

function parseFraction(input: string): { num: number; den: number } | null {
  // Handle mixed fractions like "1 3/4"
  const mixedMatch = input.match(
    /^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/,
  );
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const num = parseInt(mixedMatch[2], 10);
    const den = parseInt(mixedMatch[3], 10);
    if (den === 0) return null;
    const sign = whole < 0 ? -1 : 1;
    return { num: sign * (Math.abs(whole) * den + num), den };
  }

  // Simple fraction
  const match = input.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    const den = parseInt(match[2], 10);
    if (den === 0) return null;
    return { num, den };
  }

  return null;
}

function isFractionInput(input: string): boolean {
  return input.includes("/");
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const direction =
      (options?.direction as string) ??
      (isFractionInput(trimmed) ? "toDecimal" : "toFraction");

    if (direction === "toDecimal") {
      const frac = parseFraction(trimmed);
      if (!frac) return { output: "" };

      const decimal = frac.num / frac.den;
      const divisor = gcd(Math.abs(frac.num), Math.abs(frac.den));
      const simplified = `${frac.num / divisor}/${frac.den / divisor}`;

      return {
        output: String(decimal),
        table: [
          { label: "Fraction", value: trimmed },
          { label: "Simplified", value: simplified },
          { label: "Decimal", value: String(decimal) },
          {
            label: "Percentage",
            value: `${(decimal * 100).toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}%`,
          },
        ],
        stats: { fraction: simplified, decimal },
      };
    } else {
      const num = parseFloat(trimmed);
      if (isNaN(num) || !isFinite(num)) return { output: "" };

      const frac = decimalToFraction(num);
      const fractionStr =
        frac.den === 1 ? String(frac.num) : `${frac.num}/${frac.den}`;

      return {
        output: fractionStr,
        table: [
          { label: "Decimal", value: trimmed },
          { label: "Fraction", value: fractionStr },
          {
            label: "Percentage",
            value: `${(num * 100).toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}%`,
          },
        ],
        stats: {
          numerator: frac.num,
          denominator: frac.den,
          decimal: num,
        },
      };
    }
  } catch {
    return { output: "" };
  }
}
