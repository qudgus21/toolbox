import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "both";

  if (!input) return { output: "", stats: { mode } };

  let output: string;

  switch (mode) {
    case "start":
      output = input.replace(/^\s+/, "");
      break;
    case "end":
      output = input.replace(/\s+$/, "");
      break;
    case "lines":
      output = input
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
      break;
    case "both":
    default:
      output = input.trim();
      break;
  }

  return {
    output,
    stats: {
      mode,
      before: input.length,
      after: output.length,
      removed: input.length - output.length,
    },
  };
}
