import type { TextResult } from "../types";

const ALGORITHM_MAP: Record<string, string> = {
  "SHA-1": "SHA-1",
  "SHA-256": "SHA-256",
  "SHA-384": "SHA-384",
  "SHA-512": "SHA-512",
};

export async function process(
  input: string,
  options?: Record<string, unknown>
): Promise<TextResult> {
  const algorithm = (options?.algorithm as string) || "SHA-256";
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input) {
    return { output: "", stats: { algorithm } };
  }

  const alg = ALGORITHM_MAP[algorithm];
  if (!alg) {
    return {
      output: msg.unsupportedAlgorithm ?? "Unsupported algorithm.",
      stats: { algorithm, error: "Unsupported algorithm" },
    };
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest(alg, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return {
      output: hashHex,
      stats: {
        algorithm,
        inputLength: input.length,
        hashLength: hashHex.length,
      },
    };
  } catch {
    return {
      output: msg.hashError ?? "Error computing hash.",
      stats: { algorithm, error: "Hash computation error" },
    };
  }
}
