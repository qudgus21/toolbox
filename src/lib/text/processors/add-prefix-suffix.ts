import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const prefix = (options?.prefix as string) || "";
  const suffix = (options?.suffix as string) || "";

  if (!input) return { output: "", stats: { lines: 0 } };

  const lines = input.split("\n");
  const output = lines.map((line) => `${prefix}${line}${suffix}`).join("\n");

  return {
    output,
    stats: { lines: lines.length, prefix, suffix },
  };
}
