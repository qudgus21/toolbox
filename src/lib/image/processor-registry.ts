import type { ImageProcessorFn } from "./types";

const registry = new Map<string, () => Promise<{ default: ImageProcessorFn }>>();

// ── Edit ──
registry.set("resize", () => import("./processors/resize"));
registry.set("crop", () => import("./processors/crop"));
registry.set("rotate", () => import("./processors/rotate"));
registry.set("flip", () => import("./processors/flip"));
// registry.set("photo-editor", () => import("./processors/photo-editor")); // Phase 3

// ── Convert (all share generic convert processor) ──
registry.set("jpg-to-png", () => import("./processors/convert"));
registry.set("png-to-jpg", () => import("./processors/convert"));
registry.set("webp-to-jpg", () => import("./processors/convert"));
registry.set("webp-to-png", () => import("./processors/convert"));
registry.set("jpg-to-webp", () => import("./processors/convert"));
registry.set("png-to-webp", () => import("./processors/convert"));
registry.set("svg-to-png", () => import("./processors/convert"));
registry.set("svg-to-jpg", () => import("./processors/convert"));
registry.set("gif-to-jpg", () => import("./processors/convert"));
registry.set("bmp-to-jpg", () => import("./processors/convert"));
registry.set("bmp-to-png", () => import("./processors/convert"));

// ── Effects ──
registry.set("grayscale", () => import("./processors/grayscale"));
registry.set("add-text", () => import("./processors/add-text"));
registry.set("add-border", () => import("./processors/add-border"));
registry.set("pixelate", () => import("./processors/pixelate"));
registry.set("blur", () => import("./processors/blur"));
registry.set("filters", () => import("./processors/filters"));
registry.set("color-replace", () => import("./processors/color-replace"));
registry.set("vignette", () => import("./processors/vignette"));
registry.set("noise", () => import("./processors/noise"));
registry.set("sharpen", () => import("./processors/sharpen"));
registry.set("sepia", () => import("./processors/sepia"));
registry.set("invert", () => import("./processors/invert"));

// ── Compose ──
registry.set("combine", () => import("./processors/combine"));
registry.set("split-image", () => import("./processors/split-image"));
registry.set("collage", () => import("./processors/collage"));
registry.set("round-image", () => import("./processors/round-image"));
registry.set("profile-photo", () => import("./processors/profile-photo"));
registry.set("meme", () => import("./processors/meme"));

registry.set("image-to-icon", () => import("./processors/image-to-icon"));
registry.set("color-palette", () => import("./processors/color-palette"));
registry.set("html-to-image", () => import("./processors/html-to-image"));

// ── Generate ──
registry.set("gradient", () => import("./processors/gradient"));
registry.set("placeholder", () => import("./processors/placeholder"));
registry.set("pattern", () => import("./processors/pattern"));
registry.set("qr-code", () => import("./processors/qr-code"));

// ── Optimize ──
registry.set("compress", () => import("./processors/compress"));
registry.set("watermark", () => import("./processors/watermark"));

// Server-required tools are comingSoon — no processors registered

export async function getProcessor(slug: string): Promise<ImageProcessorFn | null> {
  const loader = registry.get(slug);
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function hasProcessor(slug: string): boolean {
  return registry.has(slug);
}
