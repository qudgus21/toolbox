import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const includeDecimals = (options?.includeDecimals as boolean) ?? true;
  const includeNegative = (options?.includeNegative as boolean) ?? true;

  if (!input) return { output: "", stats: { found: 0 } };

  let pattern: string;
  if (includeNegative && includeDecimals) {
    pattern = "-?\\d+(?:\\.\\d+)?";
  } else if (includeNegative) {
    pattern = "-?\\d+";
  } else if (includeDecimals) {
    pattern = "\\d+(?:\\.\\d+)?";
  } else {
    pattern = "\\d+";
  }

  const regex = new RegExp(pattern, "g");
  const matches = input.match(regex) || [];
  const numbers = matches.map(Number).filter((n) => !isNaN(n));

  const stats: Record<string, string | number> = {
    found: numbers.length,
  };

  if (numbers.length > 0) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    stats.sum = Math.round(sum * 1e10) / 1e10;
    stats.average = Math.round((sum / numbers.length) * 1e10) / 1e10;
    stats.min = Math.min(...numbers);
    stats.max = Math.max(...numbers);
  }

  return {
    output: numbers.join("\n"),
    stats,
  };
}
