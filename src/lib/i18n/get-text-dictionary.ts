import type { Locale } from "./config";
import type { TextDictionary } from "./text-config";

const dictionaries: Record<Locale, () => Promise<TextDictionary>> = {
  ko: () => import("./text-dictionaries/ko").then((m) => m.default),
  en: () => import("./text-dictionaries/en").then((m) => m.default),
  ja: () => import("./text-dictionaries/ja").then((m) => m.default),
  zh: () => import("./text-dictionaries/zh").then((m) => m.default),
  es: () => import("./text-dictionaries/es").then((m) => m.default),
  fr: () => import("./text-dictionaries/fr").then((m) => m.default),
  de: () => import("./text-dictionaries/de").then((m) => m.default),
  pt: () => import("./text-dictionaries/pt").then((m) => m.default),
  it: () => import("./text-dictionaries/it").then((m) => m.default),
  ru: () => import("./text-dictionaries/ru").then((m) => m.default),
  vi: () => import("./text-dictionaries/vi").then((m) => m.default),
  th: () => import("./text-dictionaries/th").then((m) => m.default),
  id: () => import("./text-dictionaries/id").then((m) => m.default),
  hi: () => import("./text-dictionaries/hi").then((m) => m.default),
  ar: () => import("./text-dictionaries/ar").then((m) => m.default),
  tr: () => import("./text-dictionaries/tr").then((m) => m.default),
  pl: () => import("./text-dictionaries/pl").then((m) => m.default),
  nl: () => import("./text-dictionaries/nl").then((m) => m.default),
  bs: () => import("./text-dictionaries/bs").then((m) => m.default),
  da: () => import("./text-dictionaries/da").then((m) => m.default),
  et: () => import("./text-dictionaries/et").then((m) => m.default),
  ga: () => import("./text-dictionaries/ga").then((m) => m.default),
  hr: () => import("./text-dictionaries/hr").then((m) => m.default),
  lv: () => import("./text-dictionaries/lv").then((m) => m.default),
  lt: () => import("./text-dictionaries/lt").then((m) => m.default),
  hu: () => import("./text-dictionaries/hu").then((m) => m.default),
  mt: () => import("./text-dictionaries/mt").then((m) => m.default),
  no: () => import("./text-dictionaries/no").then((m) => m.default),
  ro: () => import("./text-dictionaries/ro").then((m) => m.default),
  sk: () => import("./text-dictionaries/sk").then((m) => m.default),
  sl: () => import("./text-dictionaries/sl").then((m) => m.default),
  fi: () => import("./text-dictionaries/fi").then((m) => m.default),
  sv: () => import("./text-dictionaries/sv").then((m) => m.default),
  is: () => import("./text-dictionaries/is").then((m) => m.default),
  cs: () => import("./text-dictionaries/cs").then((m) => m.default),
  el: () => import("./text-dictionaries/el").then((m) => m.default),
  bg: () => import("./text-dictionaries/bg").then((m) => m.default),
  uk: () => import("./text-dictionaries/uk").then((m) => m.default),
  he: () => import("./text-dictionaries/he").then((m) => m.default),
  mr: () => import("./text-dictionaries/mr").then((m) => m.default),
  bn: () => import("./text-dictionaries/bn").then((m) => m.default),
  pa: () => import("./text-dictionaries/pa").then((m) => m.default),
  te: () => import("./text-dictionaries/te").then((m) => m.default),
  ms: () => import("./text-dictionaries/ms").then((m) => m.default),
  km: () => import("./text-dictionaries/km").then((m) => m.default),
};

export async function getTextDictionary(
  locale: Locale
): Promise<TextDictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}
