import type { Locale } from "./config";
import type { CalculatorDictionary } from "./calculator-config";

const dictionaries: Record<Locale, () => Promise<CalculatorDictionary>> = {
  ko: () => import("./calculator-dictionaries/ko").then((m) => m.default),
  en: () => import("./calculator-dictionaries/en").then((m) => m.default),
  ja: () => import("./calculator-dictionaries/ja").then((m) => m.default),
  zh: () => import("./calculator-dictionaries/zh").then((m) => m.default),
  es: () => import("./calculator-dictionaries/es").then((m) => m.default),
  fr: () => import("./calculator-dictionaries/fr").then((m) => m.default),
  de: () => import("./calculator-dictionaries/de").then((m) => m.default),
  pt: () => import("./calculator-dictionaries/pt").then((m) => m.default),
  it: () => import("./calculator-dictionaries/it").then((m) => m.default),
  ru: () => import("./calculator-dictionaries/ru").then((m) => m.default),
  vi: () => import("./calculator-dictionaries/vi").then((m) => m.default),
  th: () => import("./calculator-dictionaries/th").then((m) => m.default),
  id: () => import("./calculator-dictionaries/id").then((m) => m.default),
  hi: () => import("./calculator-dictionaries/hi").then((m) => m.default),
  ar: () => import("./calculator-dictionaries/ar").then((m) => m.default),
  tr: () => import("./calculator-dictionaries/tr").then((m) => m.default),
  pl: () => import("./calculator-dictionaries/pl").then((m) => m.default),
  nl: () => import("./calculator-dictionaries/nl").then((m) => m.default),
  bs: () => import("./calculator-dictionaries/bs").then((m) => m.default),
  da: () => import("./calculator-dictionaries/da").then((m) => m.default),
  et: () => import("./calculator-dictionaries/et").then((m) => m.default),
  ga: () => import("./calculator-dictionaries/ga").then((m) => m.default),
  hr: () => import("./calculator-dictionaries/hr").then((m) => m.default),
  lv: () => import("./calculator-dictionaries/lv").then((m) => m.default),
  lt: () => import("./calculator-dictionaries/lt").then((m) => m.default),
  hu: () => import("./calculator-dictionaries/hu").then((m) => m.default),
  mt: () => import("./calculator-dictionaries/mt").then((m) => m.default),
  no: () => import("./calculator-dictionaries/no").then((m) => m.default),
  ro: () => import("./calculator-dictionaries/ro").then((m) => m.default),
  sk: () => import("./calculator-dictionaries/sk").then((m) => m.default),
  sl: () => import("./calculator-dictionaries/sl").then((m) => m.default),
  fi: () => import("./calculator-dictionaries/fi").then((m) => m.default),
  sv: () => import("./calculator-dictionaries/sv").then((m) => m.default),
  is: () => import("./calculator-dictionaries/is").then((m) => m.default),
  cs: () => import("./calculator-dictionaries/cs").then((m) => m.default),
  el: () => import("./calculator-dictionaries/el").then((m) => m.default),
  bg: () => import("./calculator-dictionaries/bg").then((m) => m.default),
  uk: () => import("./calculator-dictionaries/uk").then((m) => m.default),
  he: () => import("./calculator-dictionaries/he").then((m) => m.default),
  mr: () => import("./calculator-dictionaries/mr").then((m) => m.default),
  bn: () => import("./calculator-dictionaries/bn").then((m) => m.default),
  pa: () => import("./calculator-dictionaries/pa").then((m) => m.default),
  te: () => import("./calculator-dictionaries/te").then((m) => m.default),
  ms: () => import("./calculator-dictionaries/ms").then((m) => m.default),
  km: () => import("./calculator-dictionaries/km").then((m) => m.default),
};

export async function getCalculatorDictionary(
  locale: Locale,
): Promise<CalculatorDictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}
