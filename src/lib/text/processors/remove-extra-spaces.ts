import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  if (!input) return { output: "", stats: { before: 0, after: 0 } };

  const before = input.length;
  const output = input
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n");
  const after = output.length;

  return {
    output,
    stats: { before, after, removed: before - after },
  };
}
