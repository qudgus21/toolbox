import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const count = Math.max(1, (options?.count as number) ?? 2);
  const separator = options?.separator !== undefined ? String(options.separator) : "\n";

  if (!input) return { output: "", stats: { count, separator } };

  const output = Array(count).fill(input).join(separator);

  return {
    output,
    stats: {
      count,
      outputLength: output.length,
    },
  };
}
