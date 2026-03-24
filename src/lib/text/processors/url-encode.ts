import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "encode";
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input) return { output: "", stats: { mode } };

  try {
    const output =
      mode === "decode"
        ? decodeURIComponent(input)
        : encodeURIComponent(input);

    return {
      output,
      stats: { mode, inputLength: input.length, outputLength: output.length },
    };
  } catch {
    const errorMsg = mode === "decode"
      ? (msg.invalidUrlEncoded ?? "Invalid URL-encoded input.")
      : (msg.invalidInput ?? "Invalid input.");
    return {
      output: errorMsg,
      stats: { mode, error: "Invalid input" },
    };
  }
}
