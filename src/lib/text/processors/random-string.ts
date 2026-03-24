import type { TextResult } from "../types";

const CHARSETS: Record<string, string> = {
  alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  alphabetic: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  numeric: "0123456789",
  hex: "0123456789abcdef",
};

export function process(
  _input: string,
  options?: Record<string, unknown>
): TextResult {
  const length = Math.max(1, (options?.length as number) ?? 32);
  const charsetName = (options?.charset as string) || "alphanumeric";
  const customChars = (options?.customChars as string) || "";
  const count = Math.max(1, (options?.count as number) ?? 5);

  let charset: string;
  if (charsetName === "custom" && customChars) {
    charset = customChars;
  } else {
    charset = CHARSETS[charsetName] || CHARSETS.alphanumeric;
  }

  if (!charset) charset = CHARSETS.alphanumeric;

  const strings: string[] = [];
  for (let i = 0; i < count; i++) {
    strings.push(generateString(charset, length));
  }

  return {
    output: strings.join("\n"),
    stats: { count, length, charset: charsetName },
  };
}

function generateString(charset: string, length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((n) => charset[n % charset.length])
    .join("");
}
