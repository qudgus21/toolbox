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
    options: string;
    changeFile: string;
    share: string;
    shareTitle: string;
    shareSubtitle: string;
    shareCopied: string;
    shareCopyLink: string;
  };
  toolOptions: {
    resize: {
      original: string;
      widthPx: string;
      heightPx: string;
      lockAspect: string;
      unlockAspect: string;
      resizeMode: string;
      fit: string;
      fitDesc: string;
      fill: string;
      fillDesc: string;
      stretch: string;
      stretchDesc: string;
    };
    crop: {
      aspectRatio: string;
      free: string;
      x: string;
      y: string;
      width: string;
      height: string;
    };
    rotate: {
      quickRotate: string;
      ccw90: string;
      rotate180: string;
      cw90: string;
      customAngle: string;
      angleDegrees: string;
      bgColor: string;
      transparent: string;
      white: string;
      black: string;
      custom: string;
    };
    flip: {
      direction: string;
      horizontal: string;
      vertical: string;
      selectOne: string;
    };
    compress: {
      quality: string;
      smallest: string;
      bestQuality: string;
      outputFormat: string;
      originalSize: string;
      estimatedOutput: string;
      estimatedReduction: string;
    };
    convert: {
      quality: string;
      smallerFile: string;
      bestQuality: string;
      losslessMessage: string;
    };
    grayscale: {
      mode: string;
      luminance: string;
      luminanceDesc: string;
      average: string;
      averageDesc: string;
      desaturate: string;
      desaturateDesc: string;
    };
    addText: {
      text: string;
      enterText: string;
      fontFamily: string;
      fontSize: string;
      color: string;
      bold: string;
      italic: string;
      shadow: string;
      alignment: string;
      xPosition: string;
      yPosition: string;
      addText: string;
      noItems: string;
      bgColor: string;
      transparent: string;
    };
    addBorder: {
      borderWidth: string;
      borderColor: string;
      borderStyle: string;
      solid: string;
      double: string;
      rounded: string;
      borderRadius: string;
    };
    pixelate: {
      pixelSize: string;
      fine: string;
      blocky: string;
    };
    blur: {
      blurRadius: string;
      subtle: string;
      heavy: string;
    };
    filters: {
      brightness: string;
      contrast: string;
      saturation: string;
      hueRotate: string;
      sepia: string;
      invert: string;
      resetAll: string;
    };
    combine: {
      layout: string;
      horizontal: string;
      vertical: string;
      grid: string;
      gap: string;
      bgColor: string;
      alignment: string;
      start: string;
      center: string;
      end: string;
    };
    split: {
      rows: string;
      columns: string;
      output: string;
      outputDesc: string;
    };
    collage: {
      template: string;
      horizontal2: string;
      vertical2: string;
      leftFocus3: string;
      rightFocus3: string;
      grid4: string;
      mixed5: string;
      gap: string;
      bgColor: string;
      borderRadius: string;
    };
    round: {
      borderRadius: string;
      borderWidth: string;
      borderColor: string;
    };
    profilePhoto: {
      platform: string;
      instagram: string;
      twitter: string;
      linkedin: string;
      facebook: string;
      youtube: string;
      custom: string;
      sizePx: string;
      output: string;
    };
    meme: {
      topText: string;
      topTextPlaceholder: string;
      bottomText: string;
      bottomTextPlaceholder: string;
      fontSize: string;
      auto: string;
      textColor: string;
      strokeColor: string;
    };
    watermark: {
      mode: string;
      text: string;
      image: string;
      watermarkImage: string;
      enterWatermarkText: string;
      chooseImage: string;
      fontFamily: string;
      fontSize: string;
      color: string;
      scale: string;
      opacity: string;
      position: string;
      tl: string;
      tc: string;
      tr: string;
      cl: string;
      c: string;
      cr: string;
      bl: string;
      bc: string;
      br: string;
      rotation: string;
      mosaic: string;
    };
    colorReplace: {
      sourceColor: string;
      targetColor: string;
      tolerance: string;
      exact: string;
      wide: string;
    };
    vignette: {
      intensity: string;
      subtle: string;
      heavy: string;
      radius: string;
      small: string;
      large: string;
    };
    noise: {
      amount: string;
      subtle: string;
      heavy: string;
      monochrome: string;
    };
    sharpen: {
      amount: string;
      subtle: string;
      strong: string;
      radius: string;
      fine: string;
      coarse: string;
    };
    sepia: {
      intensity: string;
      subtle: string;
      full: string;
    };
    invert: {
      strength: string;
      subtle: string;
      full: string;
    };
    imageToIcon: {
      iconSizes: string;
      selectAll: string;
      deselectAll: string;
      output: string;
      outputDesc: string;
    };
    colorPalette: {
      numberOfColors: string;
      layout: string;
      horizontal: string;
      grid: string;
    };
    htmlToImage: {
      htmlCode: string;
      htmlPlaceholder: string;
      widthPx: string;
      heightPx: string;
      outputSize: string;
    };
    gradient: {
      type: string;
      linear: string;
      radial: string;
      conic: string;
      colors: string;
      addColor: string;
      angle: string;
    };
    placeholder: {
      presets: string;
      banner: string;
      square: string;
      hd: string;
      thumb: string;
      width: string;
      height: string;
      bgColor: string;
      textColor: string;
      textLabel: string;
      format: string;
    };
    pattern: {
      patternType: string;
      stripes: string;
      dots: string;
      checker: string;
      grid: string;
      diagonal: string;
      color1: string;
      color2: string;
      spacing: string;
    };
    qrCode: {
      textOrUrl: string;
      urlPlaceholder: string;
      size: string;
      foreground: string;
      background: string;
      errorCorrection: string;
      low: string;
      medium: string;
      quartile: string;
      high: string;
    };
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
