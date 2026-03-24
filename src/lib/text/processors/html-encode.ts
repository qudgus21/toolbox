import type { TextResult } from "../types";

const ENCODE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const DECODE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "encode";

  if (!input) return { output: "", stats: { mode } };

  let output: string;

  if (mode === "decode") {
    // First handle named entities
    output = input.replace(
      /&(?:amp|lt|gt|quot|apos|#39);/g,
      (match) => DECODE_MAP[match] || match
    );
    // Handle decimal numeric entities: &#123;
    output = output.replace(/&#(\d+);/g, (_, num) =>
      String.fromCodePoint(Number(num))
    );
    // Handle hex numeric entities: &#x1F;
    output = output.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
  } else {
    output = input.replace(/[&<>"']/g, (ch) => ENCODE_MAP[ch] || ch);
  }

  return {
    output,
    stats: { mode, inputLength: input.length, outputLength: output.length },
  };
}
