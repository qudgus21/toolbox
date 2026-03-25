import type { ConverterResult } from "../types";

interface ParsedIngredient {
  original: string;
  quantity: number | null;
  unit: string;
  name: string;
}

function parseFraction(str: string): number | null {
  const trimmed = str.trim();

  // Mixed number: "1 1/2"
  const mixedMatch = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    return Number(mixedMatch[1]) + Number(mixedMatch[2]) / Number(mixedMatch[3]);
  }

  // Fraction: "1/2"
  const fracMatch = trimmed.match(/^(\d+)\/(\d+)$/);
  if (fracMatch) {
    return Number(fracMatch[1]) / Number(fracMatch[2]);
  }

  // Decimal or integer
  const num = parseFloat(trimmed);
  if (!isNaN(num)) return num;

  return null;
}

function formatQuantity(n: number): string {
  // Common fractions
  const fractions: [number, string][] = [
    [0.125, "1/8"],
    [0.25, "1/4"],
    [0.333, "1/3"],
    [0.375, "3/8"],
    [0.5, "1/2"],
    [0.625, "5/8"],
    [0.667, "2/3"],
    [0.75, "3/4"],
    [0.875, "7/8"],
  ];

  if (Number.isInteger(n)) return n.toString();

  const whole = Math.floor(n);
  const decimal = n - whole;

  for (const [val, str] of fractions) {
    if (Math.abs(decimal - val) < 0.04) {
      return whole > 0 ? `${whole} ${str}` : str;
    }
  }

  // Fall back to decimal
  return parseFloat(n.toFixed(2)).toString();
}

const KNOWN_UNITS = [
  "cups?", "tbsps?", "tablespoons?", "tsps?", "teaspoons?",
  "oz", "ounces?", "lbs?", "pounds?", "g", "grams?",
  "kg", "kilograms?", "mL", "ml", "milliliters?",
  "L", "liters?", "litres?", "pinch(?:es)?", "dash(?:es)?",
  "quarts?", "pints?", "gallons?", "cloves?", "slices?",
  "pieces?", "cans?", "bottles?", "packages?", "bunches?",
  "stalks?", "heads?", "sprigs?", "handfuls?",
];

function parseLine(line: string): ParsedIngredient {
  const trimmed = line.trim();
  if (!trimmed) return { original: line, quantity: null, unit: "", name: "" };

  // Try to extract quantity from the beginning
  // Patterns: "2", "1/2", "1 1/2", "0.5"
  const qtyPattern = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+\.?\d*)\s*/;
  const qtyMatch = trimmed.match(qtyPattern);

  if (!qtyMatch) {
    return { original: line, quantity: null, unit: "", name: trimmed };
  }

  const quantity = parseFraction(qtyMatch[1]);
  let rest = trimmed.slice(qtyMatch[0].length).trim();

  // Try to extract unit
  const unitPattern = new RegExp(`^(${KNOWN_UNITS.join("|")})\\.?\\s+`, "i");
  const unitMatch = rest.match(unitPattern);

  let unit = "";
  if (unitMatch) {
    unit = unitMatch[1];
    rest = rest.slice(unitMatch[0].length).trim();
  }

  return { original: line, quantity, unit, name: rest };
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const originalServings = parseFloat(
    (options?.originalServings as string) || "4",
  );
  const targetServings = parseFloat(
    (options?.targetServings as string) || "8",
  );

  if (
    isNaN(originalServings) ||
    isNaN(targetServings) ||
    originalServings <= 0 ||
    targetServings <= 0
  ) {
    return { output: "" };
  }

  const scaleFactor = targetServings / originalServings;
  const lines = trimmed.split("\n");
  const outputLines: string[] = [];
  let ingredientCount = 0;

  for (const line of lines) {
    if (line.trim() === "") {
      outputLines.push("");
      continue;
    }

    const parsed = parseLine(line);

    if (parsed.quantity !== null) {
      ingredientCount++;
      const scaled = parsed.quantity * scaleFactor;
      const formattedQty = formatQuantity(scaled);
      const parts = [formattedQty];
      if (parsed.unit) parts.push(parsed.unit);
      if (parsed.name) parts.push(parsed.name);
      outputLines.push(parts.join(" "));
    } else {
      // No quantity found, output as-is (could be a section header)
      outputLines.push(line);
    }
  }

  const output = outputLines.join("\n");

  return {
    output,
    stats: {
      ingredients: ingredientCount,
      scaleFactor: parseFloat(scaleFactor.toFixed(2)),
    },
  };
}
