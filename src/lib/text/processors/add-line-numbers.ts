import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const startFrom = (options?.startFrom as number) ?? 1;
  const separator = options?.separator !== undefined ? String(options.separator) : ". ";
  const padZeros = (options?.padZeros as boolean) ?? false;

  if (!input) return { output: "", stats: { lines: 0 } };

  const lines = input.split("\n");
  const maxNum = startFrom + lines.length - 1;
  const maxWidth = String(maxNum).length;

  const numbered = lines.map((line, i) => {
    const num = startFrom + i;
    const numStr = padZeros ? String(num).padStart(maxWidth, "0") : String(num);
    return `${numStr}${separator}${line}`;
  });

  return {
    output: numbered.join("\n"),
    stats: { lines: lines.length },
  };
}
