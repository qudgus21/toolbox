import type { Locale } from "./config";
import type { ImageDictionary } from "./image-config";

const dictionaries: Record<Locale, () => Promise<ImageDictionary>> = {
  ko: () => import("./image-dictionaries/ko").then((m) => m.default),
  en: () => import("./image-dictionaries/en").then((m) => m.default),
  ja: () => import("./image-dictionaries/ja").then((m) => m.default),
  zh: () => import("./image-dictionaries/zh").then((m) => m.default),
  es: () => import("./image-dictionaries/es").then((m) => m.default),
  fr: () => import("./image-dictionaries/fr").then((m) => m.default),
  de: () => import("./image-dictionaries/de").then((m) => m.default),
  pt: () => import("./image-dictionaries/pt").then((m) => m.default),
  it: () => import("./image-dictionaries/it").then((m) => m.default),
  ru: () => import("./image-dictionaries/ru").then((m) => m.default),
  vi: () => import("./image-dictionaries/vi").then((m) => m.default),
  th: () => import("./image-dictionaries/th").then((m) => m.default),
  id: () => import("./image-dictionaries/id").then((m) => m.default),
  hi: () => import("./image-dictionaries/hi").then((m) => m.default),
  ar: () => import("./image-dictionaries/ar").then((m) => m.default),
  tr: () => import("./image-dictionaries/tr").then((m) => m.default),
  pl: () => import("./image-dictionaries/pl").then((m) => m.default),
  nl: () => import("./image-dictionaries/nl").then((m) => m.default),
  bs: () => import("./image-dictionaries/bs").then((m) => m.default),
  da: () => import("./image-dictionaries/da").then((m) => m.default),
  et: () => import("./image-dictionaries/et").then((m) => m.default),
  ga: () => import("./image-dictionaries/ga").then((m) => m.default),
  hr: () => import("./image-dictionaries/hr").then((m) => m.default),
  lv: () => import("./image-dictionaries/lv").then((m) => m.default),
  lt: () => import("./image-dictionaries/lt").then((m) => m.default),
  hu: () => import("./image-dictionaries/hu").then((m) => m.default),
  mt: () => import("./image-dictionaries/mt").then((m) => m.default),
  no: () => import("./image-dictionaries/no").then((m) => m.default),
  ro: () => import("./image-dictionaries/ro").then((m) => m.default),
  sk: () => import("./image-dictionaries/sk").then((m) => m.default),
  sl: () => import("./image-dictionaries/sl").then((m) => m.default),
  fi: () => import("./image-dictionaries/fi").then((m) => m.default),
  sv: () => import("./image-dictionaries/sv").then((m) => m.default),
  is: () => import("./image-dictionaries/is").then((m) => m.default),
  cs: () => import("./image-dictionaries/cs").then((m) => m.default),
  el: () => import("./image-dictionaries/el").then((m) => m.default),
  bg: () => import("./image-dictionaries/bg").then((m) => m.default),
  uk: () => import("./image-dictionaries/uk").then((m) => m.default),
  he: () => import("./image-dictionaries/he").then((m) => m.default),
  mr: () => import("./image-dictionaries/mr").then((m) => m.default),
  bn: () => import("./image-dictionaries/bn").then((m) => m.default),
  pa: () => import("./image-dictionaries/pa").then((m) => m.default),
  te: () => import("./image-dictionaries/te").then((m) => m.default),
  ms: () => import("./image-dictionaries/ms").then((m) => m.default),
  km: () => import("./image-dictionaries/km").then((m) => m.default),
};

export async function getImageDictionary(
  locale: Locale
): Promise<ImageDictionary> {
  return dictionaries[locale]();
}
