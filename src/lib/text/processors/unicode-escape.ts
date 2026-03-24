import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "escape";

  if (!input) return { output: "", stats: { mode } };

  let output: string;

  if (mode === "unescape") {
    // Replace \uXXXX sequences with actual characters
    output = input.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    // Also handle \u{XXXXX} (ES6 style)
    output = output.replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
  } else {
    // Escape non-ASCII characters to \uXXXX
    output = Array.from(input)
      .map((ch) => {
        const code = ch.codePointAt(0)!;
        if (code > 127) {
          if (code > 0xffff) {
            // Use surrogate pair notation
            const hi = Math.floor((code - 0x10000) / 0x400) + 0xd800;
            const lo = ((code - 0x10000) % 0x400) + 0xdc00;
            return `\\u${hi.toString(16).padStart(4, "0")}\\u${lo.toString(16).padStart(4, "0")}`;
          }
          return `\\u${code.toString(16).padStart(4, "0")}`;
        }
        return ch;
      })
      .join("");
  }

  return {
    output,
    stats: { mode, inputLength: input.length, outputLength: output.length },
  };
}
