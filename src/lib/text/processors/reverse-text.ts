import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "characters";

  if (!input) return { output: "", stats: { mode } };

  let output: string;

  switch (mode) {
    case "words": {
      output = input
        .split("\n")
        .map((line) => line.split(/(\s+)/).reverse().join(""))
        .join("\n");
      break;
    }
    case "lines": {
      output = input.split("\n").reverse().join("\n");
      break;
    }
    case "characters":
    default: {
      // Use Array.from to handle Unicode surrogate pairs correctly
      output = Array.from(input).reverse().join("");
      break;
    }
  }

  return { output, stats: { mode } };
}
