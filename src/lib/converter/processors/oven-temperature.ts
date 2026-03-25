import type { ConverterResult } from "../types";

interface TempEntry {
  celsius: number;
  fahrenheit: number;
  gasmark: number | string;
  description: string;
}

const COMMON_TEMPS: TempEntry[] = [
  { celsius: 110, fahrenheit: 225, gasmark: 0.25, description: "Very Cool" },
  { celsius: 120, fahrenheit: 250, gasmark: 0.5, description: "Very Cool" },
  { celsius: 140, fahrenheit: 275, gasmark: 1, description: "Cool" },
  { celsius: 150, fahrenheit: 300, gasmark: 2, description: "Cool" },
  { celsius: 160, fahrenheit: 325, gasmark: 3, description: "Moderately Cool" },
  { celsius: 180, fahrenheit: 350, gasmark: 4, description: "Moderate" },
  { celsius: 190, fahrenheit: 375, gasmark: 5, description: "Moderately Hot" },
  { celsius: 200, fahrenheit: 400, gasmark: 6, description: "Hot" },
  { celsius: 220, fahrenheit: 425, gasmark: 7, description: "Hot" },
  { celsius: 230, fahrenheit: 450, gasmark: 8, description: "Very Hot" },
  { celsius: 240, fahrenheit: 475, gasmark: 9, description: "Very Hot" },
  { celsius: 260, fahrenheit: 500, gasmark: 10, description: "Extremely Hot" },
];

function celsiusToFahrenheit(c: number): number {
  return c * 9 / 5 + 32;
}

function fahrenheitToCelsius(f: number): number {
  return (f - 32) * 5 / 9;
}

function celsiusToGasMark(c: number): number {
  // Approximate: Gas Mark = (C - 121) / 14
  if (c < 110) return 0;
  return Math.round(((c - 121) / 14) * 4) / 4;
}

function gasMarkToCelsius(gm: number): number {
  return gm * 14 + 121;
}

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(1)).toString();
}

function findClosestDescription(celsius: number): string {
  let closest = COMMON_TEMPS[0];
  let minDiff = Math.abs(celsius - closest.celsius);

  for (const entry of COMMON_TEMPS) {
    const diff = Math.abs(celsius - entry.celsius);
    if (diff < minDiff) {
      minDiff = diff;
      closest = entry;
    }
  }

  return closest.description;
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const value = parseFloat(input);
  if (isNaN(value)) return { output: "" };

  const fromUnit = (options?.fromUnit as string) || "C";

  let celsius: number;
  switch (fromUnit) {
    case "C":
      celsius = value;
      break;
    case "F":
      celsius = fahrenheitToCelsius(value);
      break;
    case "gasmark":
      celsius = gasMarkToCelsius(value);
      break;
    default:
      return { output: "" };
  }

  const fahrenheit = celsiusToFahrenheit(celsius);
  const gasMark = celsiusToGasMark(celsius);
  const description = findClosestDescription(celsius);

  const output = `${formatNumber(celsius)}°C = ${formatNumber(fahrenheit)}°F = Gas Mark ${formatNumber(gasMark)} (${description})`;

  const table = COMMON_TEMPS.map((entry) => ({
    label: `${entry.celsius}°C — ${entry.description}`,
    value: `${entry.fahrenheit}°F / Gas Mark ${entry.gasmark}`,
  }));

  return { output, table };
}
