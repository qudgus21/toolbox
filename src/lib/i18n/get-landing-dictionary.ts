import type { Locale } from "./config";
import type { LandingDictionary } from "./landing-config";

const dictionaries: Record<string, () => Promise<LandingDictionary>> = {
  en: () => import("./landing-dictionaries/en").then((m) => m.default),
  zh: () => import("./landing-dictionaries/zh").then((m) => m.default),
  es: () => import("./landing-dictionaries/es").then((m) => m.default),
  hi: () => import("./landing-dictionaries/hi").then((m) => m.default),
  ar: () => import("./landing-dictionaries/ar").then((m) => m.default),
  fr: () => import("./landing-dictionaries/fr").then((m) => m.default),
  bn: () => import("./landing-dictionaries/bn").then((m) => m.default),
  pt: () => import("./landing-dictionaries/pt").then((m) => m.default),
  ru: () => import("./landing-dictionaries/ru").then((m) => m.default),
  ja: () => import("./landing-dictionaries/ja").then((m) => m.default),
  de: () => import("./landing-dictionaries/de").then((m) => m.default),
  ko: () => import("./landing-dictionaries/ko").then((m) => m.default),
  it: () => import("./landing-dictionaries/it").then((m) => m.default),
  tr: () => import("./landing-dictionaries/tr").then((m) => m.default),
  vi: () => import("./landing-dictionaries/vi").then((m) => m.default),
  th: () => import("./landing-dictionaries/th").then((m) => m.default),
  pl: () => import("./landing-dictionaries/pl").then((m) => m.default),
  nl: () => import("./landing-dictionaries/nl").then((m) => m.default),
  uk: () => import("./landing-dictionaries/uk").then((m) => m.default),
  ro: () => import("./landing-dictionaries/ro").then((m) => m.default),
  el: () => import("./landing-dictionaries/el").then((m) => m.default),
  cs: () => import("./landing-dictionaries/cs").then((m) => m.default),
  sv: () => import("./landing-dictionaries/sv").then((m) => m.default),
  hu: () => import("./landing-dictionaries/hu").then((m) => m.default),
  he: () => import("./landing-dictionaries/he").then((m) => m.default),
  da: () => import("./landing-dictionaries/da").then((m) => m.default),
  fi: () => import("./landing-dictionaries/fi").then((m) => m.default),
  no: () => import("./landing-dictionaries/no").then((m) => m.default),
  bg: () => import("./landing-dictionaries/bg").then((m) => m.default),
  hr: () => import("./landing-dictionaries/hr").then((m) => m.default),
  sk: () => import("./landing-dictionaries/sk").then((m) => m.default),
  sl: () => import("./landing-dictionaries/sl").then((m) => m.default),
  lt: () => import("./landing-dictionaries/lt").then((m) => m.default),
  lv: () => import("./landing-dictionaries/lv").then((m) => m.default),
  et: () => import("./landing-dictionaries/et").then((m) => m.default),
  ga: () => import("./landing-dictionaries/ga").then((m) => m.default),
  is: () => import("./landing-dictionaries/is").then((m) => m.default),
  bs: () => import("./landing-dictionaries/bs").then((m) => m.default),
  mt: () => import("./landing-dictionaries/mt").then((m) => m.default),
  id: () => import("./landing-dictionaries/id").then((m) => m.default),
  ms: () => import("./landing-dictionaries/ms").then((m) => m.default),
  mr: () => import("./landing-dictionaries/mr").then((m) => m.default),
  pa: () => import("./landing-dictionaries/pa").then((m) => m.default),
  te: () => import("./landing-dictionaries/te").then((m) => m.default),
  km: () => import("./landing-dictionaries/km").then((m) => m.default),
};

export async function getLandingDictionary(
  locale: Locale,
): Promise<LandingDictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}
