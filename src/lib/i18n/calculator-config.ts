export interface CalculatorDictionary {
  home: {
    title: string;
    titleAccent: string;
    description: string;
    tabAll: string;
    categoryMath: string;
    categoryStatistics: string;
    categoryTrigonometry: string;
    categoryFinancial: string;
    categoryHealth: string;
    categoryEveryday: string;
    categoryEducation: string;
    categoryDeveloper: string;
    searchPlaceholder: string;
    noResults: string;
    recentTools: string;
    favorites: string;
    favDragHint: string;
    favHint: string;
    gridView: string;
    listView: string;
  };
  trust: {
    encryption: string;
    encryptionDesc: string;
    autoDelete: string;
    autoDeleteDesc: string;
    free: string;
    freeDesc: string;
    browserProcessing: string;
    browserProcessingDesc: string;
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
    company: string;
    about: string;
    contact: string;
    faq: string;
  };
  common: {
    backToAll: string;
    calculate: string;
    result: string;
    copyToClipboard: string;
    copied: string;
    clear: string;
    reset: string;
    processing: string;
    tryAgain: string;
    notImplemented: string;
    tryOtherTools: string;
    privacyBadge: string;
    favoriteAdded: string;
    favoriteRemoved: string;
    comingSoon: string;
    share: string;
    shareTitle: string;
    shareSubtitle: string;
    shareCopied: string;
    shareCopyLink: string;
    options: string;
    input: string;
    output: string;
    details: string;
    breakdown: string;
    allResults: string;
    pageNotFound: string;
    goHome: string;
  };
  fieldLabels: Record<string, string>;
  fieldOptions: Record<string, string>;
  statsLabels: Record<string, string>;
  processorMessages: Record<string, string>;
  metadata: {
    siteTitle: string;
    siteDescription: string;
    toolTitleSuffix: string;
  };
  blog: {
    title: string;
    description: string;
    readMore: string;
    backToBlog: string;
    publishedOn: string;
    categoryGuide: string;
    categoryTips: string;
    categoryKnowledge: string;
  };
  cookie: {
    message: string;
    accept: string;
    decline: string;
  };
}
