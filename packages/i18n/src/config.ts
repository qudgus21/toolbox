export const locales = [
  "ko", "en", "ja", "zh", "es", "fr", "de", "pt", "it", "ru",
  "vi", "th", "id", "hi", "ar", "tr", "pl", "nl",
  "bs", "da", "et", "ga", "hr", "lv", "lt", "hu", "mt", "no",
  "ro", "sk", "sl", "fi", "sv", "is", "cs", "el", "bg", "uk",
  "he", "mr", "bn", "pa", "te",
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export interface Dictionary {
  home: {
    title: string;
    titleAccent: string;
    description: string;
    tabAll: string;
    categoryOrganize: string;
    categoryConvert: string;
    categoryEdit: string;
    categoryOptimize: string;
    categorySecurity: string;
    searchPlaceholder: string;
    noResults: string;
  };
  trust: {
    encryption: string;
    encryptionDesc: string;
    autoDelete: string;
    autoDeleteDesc: string;
    free: string;
    freeDesc: string;
    cloud: string;
    cloudDesc: string;
  };
  tools: Record<string, { title: string; description: string }>;
  nav: {
    allTools: string;
    language: string;
  };
  footer: {
    tools: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: {
      heading: string;
      content: string;
    }[];
  };
  terms: {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: {
      heading: string;
      content: string;
    }[];
  };
  common: {
    backToAll: string;
    dropFiles: string;
    acceptedFormats: string;
  };
  metadata: {
    siteTitle: string;
    siteDescription: string;
    toolTitleSuffix: string;
  };
  cookie: {
    message: string;
    accept: string;
    decline: string;
  };
}
