import type { TextProcessor } from "./types";

const registry = new Map<string, () => Promise<{ process: TextProcessor }>>();

// COUNT
registry.set("word-counter", () => import("./processors/word-counter"));
registry.set("character-counter", () => import("./processors/character-counter"));
registry.set("text-statistics", () => import("./processors/text-statistics"));
registry.set("keyword-density", () => import("./processors/keyword-density"));
registry.set("find-duplicates", () => import("./processors/find-duplicates"));

// TRANSFORM
registry.set("case-converter", () => import("./processors/case-converter"));
registry.set("reverse-text", () => import("./processors/reverse-text"));
registry.set("text-repeater", () => import("./processors/text-repeater"));
registry.set("text-sort", () => import("./processors/text-sort"));
registry.set("remove-duplicates", () => import("./processors/remove-duplicates"));
registry.set("add-line-numbers", () => import("./processors/add-line-numbers"));
registry.set("add-prefix-suffix", () => import("./processors/add-prefix-suffix"));
registry.set("join-text", () => import("./processors/join-text"));
registry.set("split-text", () => import("./processors/split-text"));

// CLEAN
registry.set("remove-line-breaks", () => import("./processors/remove-line-breaks"));
registry.set("remove-extra-spaces", () => import("./processors/remove-extra-spaces"));
registry.set("remove-empty-lines", () => import("./processors/remove-empty-lines"));
registry.set(
  "remove-special-characters",
  () => import("./processors/remove-special-characters")
);
registry.set("remove-emojis", () => import("./processors/remove-emojis"));
registry.set("remove-html-tags", () => import("./processors/remove-html-tags"));
registry.set("remove-accents", () => import("./processors/remove-accents"));
registry.set("trim-text", () => import("./processors/trim-text"));

// FIND
registry.set("find-and-replace", () => import("./processors/find-and-replace"));
registry.set("text-diff", () => import("./processors/text-diff"));
registry.set("regex-tester", () => import("./processors/regex-tester"));
registry.set("email-extractor", () => import("./processors/email-extractor"));
registry.set("url-extractor", () => import("./processors/url-extractor"));
registry.set("number-extractor", () => import("./processors/number-extractor"));
registry.set("filter-lines", () => import("./processors/filter-lines"));

// ENCODE
registry.set("base64", () => import("./processors/base64"));
registry.set("url-encode", () => import("./processors/url-encode"));
registry.set("html-encode", () => import("./processors/html-encode"));
registry.set("unicode-escape", () => import("./processors/unicode-escape"));
registry.set("morse-code", () => import("./processors/morse-code"));
registry.set("binary-converter", () => import("./processors/binary-converter"));
registry.set("hex-converter", () => import("./processors/hex-converter"));
registry.set("rot13", () => import("./processors/rot13"));

// GENERATE
registry.set("lorem-ipsum", () => import("./processors/lorem-ipsum"));
registry.set("slug-generator", () => import("./processors/slug-generator"));
registry.set("password-generator", () => import("./processors/password-generator"));
registry.set("random-string", () => import("./processors/random-string"));
registry.set("uuid-generator", () => import("./processors/uuid-generator"));
registry.set("hash-generator", () => import("./processors/hash-generator"));
registry.set("json-formatter", () => import("./processors/json-formatter"));

export async function getProcessor(slug: string): Promise<TextProcessor | null> {
  const loader = registry.get(slug);
  if (!loader) return null;
  const mod = await loader();
  return mod.process;
}

export function hasProcessor(slug: string): boolean {
  return registry.has(slug);
}

export function getAllSlugs(): string[] {
  return Array.from(registry.keys());
}
