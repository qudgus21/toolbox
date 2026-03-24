import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const delimiter = options?.delimiter !== undefined ? String(options.delimiter) : ", ";

  if (!input) return { output: "", stats: { lines: 0 } };

  const lines = input.split("\n");
  const output = lines.join(delimiter);

  return {
    output,
    stats: { lines: lines.length },
  };
}
