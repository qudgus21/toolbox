import type { Locale } from "./config";
import type { ConverterDictionary } from "./converter-config";

const dictionaries: Record<Locale, () => Promise<ConverterDictionary>> = {
  ko: () => import("./converter-dictionaries/ko").then((m) => m.default),
  en: () => import("./converter-dictionaries/en").then((m) => m.default),
  ja: () => import("./converter-dictionaries/ja").then((m) => m.default),
  zh: () => import("./converter-dictionaries/zh").then((m) => m.default),
  es: () => import("./converter-dictionaries/es").then((m) => m.default),
  fr: () => import("./converter-dictionaries/fr").then((m) => m.default),
  de: () => import("./converter-dictionaries/de").then((m) => m.default),
  pt: () => import("./converter-dictionaries/pt").then((m) => m.default),
  it: () => import("./converter-dictionaries/it").then((m) => m.default),
  ru: () => import("./converter-dictionaries/ru").then((m) => m.default),
  vi: () => import("./converter-dictionaries/vi").then((m) => m.default),
  th: () => import("./converter-dictionaries/th").then((m) => m.default),
  id: () => import("./converter-dictionaries/id").then((m) => m.default),
  hi: () => import("./converter-dictionaries/hi").then((m) => m.default),
  ar: () => import("./converter-dictionaries/ar").then((m) => m.default),
  tr: () => import("./converter-dictionaries/tr").then((m) => m.default),
  pl: () => import("./converter-dictionaries/pl").then((m) => m.default),
  nl: () => import("./converter-dictionaries/nl").then((m) => m.default),
  bs: () => import("./converter-dictionaries/bs").then((m) => m.default),
  da: () => import("./converter-dictionaries/da").then((m) => m.default),
  et: () => import("./converter-dictionaries/et").then((m) => m.default),
  ga: () => import("./converter-dictionaries/ga").then((m) => m.default),
  hr: () => import("./converter-dictionaries/hr").then((m) => m.default),
  lv: () => import("./converter-dictionaries/lv").then((m) => m.default),
  lt: () => import("./converter-dictionaries/lt").then((m) => m.default),
  hu: () => import("./converter-dictionaries/hu").then((m) => m.default),
  mt: () => import("./converter-dictionaries/mt").then((m) => m.default),
  no: () => import("./converter-dictionaries/no").then((m) => m.default),
  ro: () => import("./converter-dictionaries/ro").then((m) => m.default),
  sk: () => import("./converter-dictionaries/sk").then((m) => m.default),
  sl: () => import("./converter-dictionaries/sl").then((m) => m.default),
  fi: () => import("./converter-dictionaries/fi").then((m) => m.default),
  sv: () => import("./converter-dictionaries/sv").then((m) => m.default),
  is: () => import("./converter-dictionaries/is").then((m) => m.default),
  cs: () => import("./converter-dictionaries/cs").then((m) => m.default),
  el: () => import("./converter-dictionaries/el").then((m) => m.default),
  bg: () => import("./converter-dictionaries/bg").then((m) => m.default),
  uk: () => import("./converter-dictionaries/uk").then((m) => m.default),
  he: () => import("./converter-dictionaries/he").then((m) => m.default),
  mr: () => import("./converter-dictionaries/mr").then((m) => m.default),
  bn: () => import("./converter-dictionaries/bn").then((m) => m.default),
  pa: () => import("./converter-dictionaries/pa").then((m) => m.default),
  te: () => import("./converter-dictionaries/te").then((m) => m.default),
  ms: () => import("./converter-dictionaries/ms").then((m) => m.default),
  km: () => import("./converter-dictionaries/km").then((m) => m.default),
};

export async function getConverterDictionary(
  locale: Locale,
): Promise<ConverterDictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}
