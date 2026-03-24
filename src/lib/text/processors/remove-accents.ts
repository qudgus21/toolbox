import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  if (!input) return { output: "", stats: { modified: 0 } };

  const output = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let modified = 0;
  for (let i = 0; i < input.length; i++) {
    if (i < output.length && input[i] !== output[i]) modified++;
  }

  return {
    output,
    stats: { modified },
  };
}
