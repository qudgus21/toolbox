export interface LandingDictionary {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    searchPlaceholder: string;
  };
  apps: Record<
    string,
    {
      name: string;
      description: string;
      cta: string;
      toolCount: string;
    }
  >;
  popularTools: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewAll: string;
  };
  stats: {
    tools: string;
    toolsLabel: string;
    languages: string;
    languagesLabel: string;
    users: string;
    usersLabel: string;
    price: string;
    priceLabel: string;
  };
  trust: {
    sectionTitle: string;
    sectionSubtitle: string;
    free: string;
    freeDesc: string;
    private: string;
    privateDesc: string;
    noSignup: string;
    noSignupDesc: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  common: {
    shareTitle: string;
    shareSubtitle: string;
    shareCopyLink: string;
    shareCopied: string;
    ariaClose: string;
    ariaMenu: string;
    ariaShare: string;
    ariaToggleTheme: string;
  };
  footer: {
    apps: string;
    company: string;
    about: string;
    contact: string;
    faq: string;
    blog: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
    tagline: string;
    madeWith: string;
  };
  search: {
    noResults: string;
  };
  nav: Record<string, string>;
}
