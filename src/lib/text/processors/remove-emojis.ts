import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  if (!input) return { output: "", stats: { removed: 0 } };

  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  const matches = input.match(emojiRegex);
  const removed = matches ? matches.length : 0;
  const output = input.replace(emojiRegex, "");

  return {
    output,
    stats: { removed },
  };
}
