import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const removeWhitespaceOnly = (options?.removeWhitespaceOnly as boolean) ?? true;

  if (!input) return { output: "", stats: { before: 0, after: 0, removed: 0 } };

  const lines = input.split("\n");
  const filtered = lines.filter((line) => {
    if (removeWhitespaceOnly) {
      return line.trim().length > 0;
    }
    return line.length > 0;
  });

  return {
    output: filtered.join("\n"),
    stats: {
      before: lines.length,
      after: filtered.length,
      removed: lines.length - filtered.length,
    },
  };
}
