import type { TextResult } from "../types";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const SIMILAR = new Set(["i", "l", "1", "I", "L", "o", "0", "O"]);

export function process(
  _input: string,
  options?: Record<string, unknown>
): TextResult {
  const length = Math.max(4, (options?.length as number) ?? 16);
  const useUppercase = (options?.uppercase as boolean) ?? true;
  const useLowercase = (options?.lowercase as boolean) ?? true;
  const useNumbers = (options?.numbers as boolean) ?? true;
  const useSymbols = (options?.symbols as boolean) ?? true;
  const count = Math.max(1, (options?.count as number) ?? 5);
  const excludeSimilar = (options?.excludeSimilar as boolean) ?? false;

  let charset = "";
  if (useUppercase) charset += UPPERCASE;
  if (useLowercase) charset += LOWERCASE;
  if (useNumbers) charset += NUMBERS;
  if (useSymbols) charset += SYMBOLS;

  if (!charset) charset = LOWERCASE + NUMBERS;

  if (excludeSimilar) {
    charset = Array.from(charset)
      .filter((ch) => !SIMILAR.has(ch))
      .join("");
  }

  const passwords: string[] = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(charset, length));
  }

  return {
    output: passwords.join("\n"),
    stats: {
      count,
      length,
      charsetSize: charset.length,
    },
  };
}

function generatePassword(charset: string, length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((n) => charset[n % charset.length])
    .join("");
}
