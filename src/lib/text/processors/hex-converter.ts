import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "encode";
  const separator = options?.separator !== undefined ? String(options.separator) : " ";
  const uppercase = (options?.uppercase as boolean) ?? true;
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input) return { output: "", stats: { mode } };

  if (mode === "decode") {
    try {
      const hexValues = input.trim().split(/\s+/);
      const output = hexValues
        .map((h) => String.fromCharCode(parseInt(h, 16)))
        .join("");
      return { output, stats: { mode, characters: output.length } };
    } catch {
      return { output: msg.invalidHex ?? "Invalid hex input.", stats: { mode, error: "Invalid hex" } };
    }
  }

  // Encode
  let output = Array.from(input)
    .map((ch) => ch.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(separator);

  if (uppercase) output = output.toUpperCase();

  return {
    output,
    stats: { mode, characters: input.length },
  };
}
