import type { ProcessorFn } from "./types";

const registry = new Map<string, () => Promise<{ default: ProcessorFn }>>();

// 각 도구의 프로세서를 lazy import로 등록
// 새 도구를 추가할 때 여기에 한 줄씩 추가
registry.set("merge", () => import("./processors/merge"));
registry.set("split", () => import("./processors/split"));
registry.set("delete-pages", () => import("./processors/delete-pages"));
registry.set("extract-pages", () => import("./processors/extract-pages"));
registry.set("pdf-to-jpg", () => import("./processors/pdf-to-jpg"));
registry.set("pdf-to-png", () => import("./processors/pdf-to-png"));
registry.set("pdf-to-text", () => import("./processors/pdf-to-text"));
registry.set("extract-images", () => import("./processors/extract-images"));
registry.set("jpg-to-pdf", () => import("./processors/jpg-to-pdf"));
registry.set("png-to-pdf", () => import("./processors/png-to-pdf"));
registry.set("image-to-pdf", () => import("./processors/image-to-pdf"));
registry.set("html-to-pdf", () => import("./processors/html-to-pdf"));
// compress, pdf-to-word: 서버 기반 처리 필요 → comingSoon
// registry.set("compress", () => import("./processors/compress"));
// registry.set("pdf-to-word", () => import("./processors/pdf-to-word"));
// registry.set("rotate", () => import("./processors/rotate"));
// ... 도구 추가 시 여기에 등록

export async function getProcessor(slug: string): Promise<ProcessorFn | null> {
  const loader = registry.get(slug);
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function hasProcessor(slug: string): boolean {
  return registry.has(slug);
}
