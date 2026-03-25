import type { ConverterResult } from "../types";

const ROMAN_VALUES: [string, number][] = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

const ROMAN_MAP: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function toRoman(num: number): string {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) return "";
  let result = "";
  let remaining = num;
  for (const [symbol, value] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function fromRoman(str: string): number {
  const upper = str.toUpperCase();
  if (!/^[IVXLCDM]+$/.test(upper)) return -1;

  let total = 0;
  for (let i = 0; i < upper.length; i++) {
    const current = ROMAN_MAP[upper[i]];
    const next = i + 1 < upper.length ? ROMAN_MAP[upper[i + 1]] : 0;
    if (current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  // Validate by converting back
  if (total < 1 || total > 3999 || toRoman(total) !== upper) return -1;
  return total;
}

function isRomanInput(input: string): boolean {
  return /^[IVXLCDM]+$/i.test(input);
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
      (isRomanInput(trimmed) ? "toArabic" : "toRoman");

    if (direction === "toArabic") {
      const decimal = fromRoman(trimmed);
      if (decimal < 0) return { output: "" };
      return {
        output: String(decimal),
        table: [
          { label: "Roman", value: trimmed.toUpperCase() },
          { label: "Arabic", value: String(decimal) },
        ],
        stats: { roman: trimmed.toUpperCase(), arabic: decimal },
      };
    } else {
      const num = parseInt(trimmed, 10);
      if (isNaN(num) || num < 1 || num > 3999) return { output: "" };
      const roman = toRoman(num);
      return {
        output: roman,
        table: [
          { label: "Arabic", value: String(num) },
          { label: "Roman", value: roman },
        ],
        stats: { arabic: num, roman },
      };
    }
  } catch {
    return { output: "" };
  }
}
