import type { Locale } from "./config";
import type { LandingDictionary } from "./landing-config";

const dictionaries: Record<string, () => Promise<LandingDictionary>> = {
  ko: () => import("./landing-dictionaries/ko").then((m) => m.default),
  en: () => import("./landing-dictionaries/en").then((m) => m.default),
};

export async function getLandingDictionary(
  locale: Locale,
): Promise<LandingDictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}
