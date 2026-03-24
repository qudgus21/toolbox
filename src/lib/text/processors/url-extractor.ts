import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  if (!input) return { output: "", stats: { found: 0 } };

  const regex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  const matches = input.match(regex) || [];
  // Clean trailing punctuation that's likely not part of the URL
  const cleaned = matches.map((url) => url.replace(/[.,;:!?)]+$/, ""));
  const unique = [...new Set(cleaned)];

  return {
    output: unique.join("\n"),
    stats: { found: unique.length },
  };
}
