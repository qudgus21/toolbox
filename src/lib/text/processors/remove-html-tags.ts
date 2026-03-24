import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const keepText = (options?.keepText as boolean) ?? true;

  if (!input) return { output: "", stats: { tagsRemoved: 0 } };

  let text = input;
  let tagsRemoved = 0;

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, () => {
    tagsRemoved++;
    return "";
  });

  // Remove script and style blocks entirely (content + tags)
  text = text.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, () => {
    tagsRemoved += 2;
    return "";
  });

  if (keepText) {
    // Remove only tags, keep text content
    text = text.replace(/<\/?[^>]+(>|$)/g, () => {
      tagsRemoved++;
      return "";
    });
  } else {
    // Remove everything including text between tags
    text = text.replace(/<[^>]+>[^<]*<\/[^>]+>/g, () => {
      tagsRemoved += 2;
      return "";
    });
    text = text.replace(/<\/?[^>]+(>|$)/g, () => {
      tagsRemoved++;
      return "";
    });
  }

  return {
    output: text,
    stats: { tagsRemoved },
  };
}
