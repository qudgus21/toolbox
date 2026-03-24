import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "encode";
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input) return { output: "", stats: { mode } };

  if (mode === "decode") {
    try {
      const binaryString = atob(input.trim());
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const output = new TextDecoder().decode(bytes);
      return { output, stats: { mode, inputLength: input.length, outputLength: output.length } };
    } catch {
      return { output: msg.invalidBase64 ?? "Invalid Base64 input.", stats: { mode, error: "Invalid Base64" } };
    }
  }

  // Encode
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  const output = btoa(binary);

  return {
    output,
    stats: { mode, inputLength: input.length, outputLength: output.length },
  };
}
