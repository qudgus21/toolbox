import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const delimiter = options?.delimiter !== undefined ? String(options.delimiter) : ",";
  const trimResults = (options?.trimResults as boolean) ?? true;

  if (!input) return { output: "", stats: { parts: 0 } };

  let parts = input.split(delimiter);
  if (trimResults) {
    parts = parts.map((p) => p.trim());
  }

  return {
    output: parts.join("\n"),
    stats: { parts: parts.length },
  };
}
