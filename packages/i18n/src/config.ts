export const locales = [
  "en", "zh", "es", "hi", "ar", "fr", "bn", "pt", "ru", "ja",
  "de", "ko", "it", "tr", "vi", "th", "pl", "nl", "uk", "ro",
  "el", "cs", "sv", "hu", "he", "da", "fi", "no", "bg", "hr",
  "sk", "sl", "lt", "lv", "et", "ga", "is", "bs", "mt", "id",
  "mr", "pa", "te",
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
    encryptedFile: string;
    clickToSelectPages: string;
    dragToReorder: string;
    favoriteAdded: string;
    favoriteRemoved: string;
    comingSoon: string;
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
  splitTool: {
    tabRange: string;
    tabExtract: string;
    tabSize: string;
    rangeCustom: string;
    rangeFixed: string;
    addRange: string;
    from: string;
    to: string;
    everyNPages: string;
    mergeIntoOne: string;
    extractAll: string;
    extractSelect: string;
    pagesPlaceholder: string;
    maxFileSize: string;
    originalSize: string;
    totalPages: string;
    filesCreated: string;
    fileSelected: string;
    changeFile: string;
    dropFile: string;
    pages: string;
    rangeLabel: string;
    errorFromGreaterThanTo: string;
    errorEmptyValue: string;
  };
  compressTool: {
    levelExtreme: string;
    levelExtremeDesc: string;
    levelRecommended: string;
    levelRecommendedDesc: string;
    levelLess: string;
    levelLessDesc: string;
    originalSize: string;
    compressedSize: string;
    reduction: string;
    modeImage: string;
    modeImageDesc: string;
    modeRasterize: string;
    modeRasterizeDesc: string;
    rasterizeWarning: string;
  };
  deletePagesTool: {
    dropFile: string;
    changeFile: string;
    pagesToDelete: string;
    pagesPlaceholder: string;
    selectAll: string;
    deselectAll: string;
    selectOdd: string;
    selectEven: string;
    willBeDeleted: string;
    willRemain: string;
    pages: string;
    noPageSelected: string;
    cannotDeleteAll: string;
  };
  extractPagesTool: {
    dropFile: string;
    changeFile: string;
    pagesToExtract: string;
    pagesPlaceholder: string;
    selectAll: string;
    deselectAll: string;
    selectOdd: string;
    selectEven: string;
    willBeExtracted: string;
    willRemain: string;
    pages: string;
    noPageSelected: string;
    cannotExtractAll: string;
    pageOf: string;
    addPage: string;
    removePage: string;
    selectedPages: string;
    dragToReorder: string;
  };
  pdfToJpgTool: {
    qualityLabel: string;
    qualityHigh: string;
    qualityHighDesc: string;
    qualityMedium: string;
    qualityMediumDesc: string;
    qualityLow: string;
    qualityLowDesc: string;
    convertInfo: string;
    convertButton: string;
  };
  pdfToPngTool: {
    qualityLabel: string;
    qualityHigh: string;
    qualityHighDesc: string;
    qualityMedium: string;
    qualityMediumDesc: string;
    qualityLow: string;
    qualityLowDesc: string;
    convertInfo: string;
    convertButton: string;
  };
  pdfToTextTool: {
    description: string;
    pageBreakNote: string;
    encodingNote: string;
    convertButton: string;
  };
  extractImagesTool: {
    dropFile: string;
    changeFile: string;
    description: string;
    jpegNote: string;
    pngNote: string;
    minSizeNote: string;
    noImagesFound: string;
  };
  jpgToPdfTool: {
    orientationLabel: string;
    portrait: string;
    landscape: string;
    pageSizeLabel: string;
    pageSizeFit: string;
    pageSizeFitDesc: string;
    pageSizeGroupDoc: string;
    pageSizeGroupPhoto: string;
    pageSizeGroupOther: string;
    marginLabel: string;
    marginNone: string;
    marginSmall: string;
    marginLarge: string;
    marginUnit: string;
    mergeAllLabel: string;
    mergeAllDesc: string;
    convertButton: string;
    convertInfo: string;
  };
  pngToPdfTool: {
    orientationLabel: string;
    portrait: string;
    landscape: string;
    pageSizeLabel: string;
    pageSizeFit: string;
    pageSizeFitDesc: string;
    pageSizeGroupDoc: string;
    pageSizeGroupPhoto: string;
    pageSizeGroupOther: string;
    marginLabel: string;
    marginNone: string;
    marginSmall: string;
    marginLarge: string;
    marginUnit: string;
    mergeAllLabel: string;
    mergeAllDesc: string;
    convertButton: string;
    convertInfo: string;
  };
  imageToPdfTool: {
    orientationLabel: string;
    portrait: string;
    landscape: string;
    pageSizeLabel: string;
    pageSizeFit: string;
    pageSizeFitDesc: string;
    pageSizeGroupDoc: string;
    pageSizeGroupPhoto: string;
    pageSizeGroupOther: string;
    marginLabel: string;
    marginNone: string;
    marginSmall: string;
    marginLarge: string;
    marginUnit: string;
    mergeAllLabel: string;
    mergeAllDesc: string;
    convertButton: string;
    convertInfo: string;
  };
}
