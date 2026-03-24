import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const replacement = options?.replacement !== undefined ? String(options.replacement) : " ";

  if (!input) return { output: "", stats: { removed: 0 } };

  const lineBreaks = (input.match(/\r\n|\r|\n/g) || []).length;
  const output = input.replace(/\r\n|\r|\n/g, replacement);

  return {
    output,
    stats: { removed: lineBreaks },
  };
}
