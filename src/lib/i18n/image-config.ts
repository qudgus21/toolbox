export interface ImageDictionary {
  home: {
    title: string;
    titleAccent: string;
    description: string;
    tabAll: string;
    categoryEdit: string;
    categoryConvert: string;
    categoryEffects: string;
    categoryCompose: string;
    categoryOptimize: string;
    categoryGenerate: string;
    searchPlaceholder: string;
    noResults: string;
    recentTools: string;
    favorites: string;
    favDragHint: string;
    favHint: string;
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
    dropFiles: string;
    acceptedFormats: string;
    processing: string;
    download: string;
    startOver: string;
    addMoreFiles: string;
    process: string;
    tryAgain: string;
    notImplemented: string;
    filesSelected: string;
    filesSizeTotal: string;
    sortByName: string;
    sortBySize: string;
    tryOtherTools: string;
    privacyBadge: string;
    favoriteAdded: string;
    favoriteRemoved: string;
    comingSoon: string;
    originalSize: string;
    newSize: string;
    reduction: string;
    width: string;
    height: string;
  };
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
