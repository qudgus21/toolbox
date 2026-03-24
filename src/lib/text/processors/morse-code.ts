import type { TextResult } from "../types";

const CHAR_TO_MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.",
  "$": "...-..-", "@": ".--.-.",
};

const MORSE_TO_CHAR: Record<string, string> = {};
for (const [char, morse] of Object.entries(CHAR_TO_MORSE)) {
  MORSE_TO_CHAR[morse] = char;
}

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "encode";

  if (!input) return { output: "", stats: { mode } };

  if (mode === "decode") {
    const words = input.trim().split(" / ");
    const decoded = words
      .map((word) =>
        word
          .trim()
          .split(" ")
          .map((code) => MORSE_TO_CHAR[code] || "?")
          .join("")
      )
      .join(" ");

    return {
      output: decoded,
      stats: { mode },
    };
  }

  // Encode
  const words = input.toUpperCase().split(/\s+/);
  const encoded = words
    .map((word) =>
      Array.from(word)
        .map((ch) => CHAR_TO_MORSE[ch] || "")
        .filter(Boolean)
        .join(" ")
    )
    .join(" / ");

  return {
    output: encoded,
    stats: { mode },
  };
}
