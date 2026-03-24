import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const caseSensitive = (options?.caseSensitive as boolean) ?? false;
  const trimLines = (options?.trimLines as boolean) ?? true;

  if (!input) return { output: "", stats: { before: 0, after: 0, removed: 0 } };

  const lines = input.split("\n");
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const processed = trimLines ? line.trim() : line;
    const key = caseSensitive ? processed : processed.toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      result.push(trimLines ? processed : line);
    }
  }

  return {
    output: result.join("\n"),
    stats: {
      before: lines.length,
      after: result.length,
      removed: lines.length - result.length,
    },
  };
}
