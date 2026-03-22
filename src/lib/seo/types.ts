export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface AlternatesConfig {
  canonical: string;
  languages: Record<string, string>;
}

export interface SoftwareAppJsonLd {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  author?: { "@type": string; name: string; url: string };
  inLanguage?: string;
  offers?: { "@type": string; price: string; priceCurrency: string };
}
