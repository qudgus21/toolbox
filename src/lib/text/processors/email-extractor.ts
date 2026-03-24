import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  if (!input) return { output: "", stats: { found: 0 } };

  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = input.match(regex) || [];
  const unique = [...new Set(matches)];

  return {
    output: unique.join("\n"),
    stats: { found: unique.length },
  };
}
