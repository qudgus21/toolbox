import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "encode";
  const separator = options?.separator !== undefined ? String(options.separator) : " ";
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input) return { output: "", stats: { mode } };

  if (mode === "decode") {
    try {
      const bytes = input.trim().split(/\s+/);
      const output = bytes
        .map((b) => String.fromCharCode(parseInt(b, 2)))
        .join("");
      return { output, stats: { mode, characters: output.length } };
    } catch {
      return { output: msg.invalidBinary ?? "Invalid binary input.", stats: { mode, error: "Invalid binary" } };
    }
  }

  // Encode
  const output = Array.from(input)
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(separator);

  return {
    output,
    stats: { mode, characters: input.length },
  };
}
