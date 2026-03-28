import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Tous les outils de conversion dont vous avez besoin",
    titleAccent: "conversion",
    description:
      "Convertissez unités, couleurs, formats et dates. Tout se passe dans votre navigateur.",
    tabAll: "Tous",
    categoryUnit: "Unités",
    categoryNumber: "Nombres",
    categoryColor: "Couleurs",
    categoryDatetime: "Date/Heure",
    categoryData: "Données",
    categoryCss: "CSS",
    categoryCooking: "Cuisine",
    categoryGeography: "Géographie",
    searchPlaceholder: "Rechercher des convertisseurs...",
    noResults: "Aucun convertisseur trouvé.",
    recentTools: "Utilisés récemment",
    favorites: "Favoris",
    favDragHint: "Glissez pour réorganiser",
    favHint: "Cliquez sur l'étoile pour ajouter aux favoris",
    gridView: "Vue grille",
    listView: "Vue liste",
  },
  trust: {
    encryption: "Traitement sécurisé",
    encryptionDesc: "Toutes les conversions sont effectuées dans votre navigateur",
    autoDelete: "Aucune donnée stockée",
    autoDeleteDesc: "Vos données ne sont jamais sauvegardées ni envoyées à un serveur",
    free: "100% gratuit",
    freeDesc: "Sans limite, sans inscription, sans frais cachés",
    browserProcessing: "Résultats instantanés",
    browserProcessingDesc: "Conversion en temps réel pendant la saisie",
  },
  tools: {
    length: {
      title: "Convertisseur de longueur",
      description:
        "Convertissez entre mètres, kilomètres, miles, pieds, pouces et plus.",
    },
    weight: {
      title: "Convertisseur de poids",
      description:
        "Convertissez entre kilogrammes, livres, onces, tonnes et plus.",
    },
    temperature: {
      title: "Convertisseur de température",
      description: "Convertissez entre Celsius, Fahrenheit et Kelvin.",
    },
    area: {
      title: "Convertisseur de surface",
      description:
        "Convertissez entre mètres carrés, hectares, acres, pieds carrés et plus.",
    },
    volume: {
      title: "Convertisseur de volume",
      description:
        "Convertissez entre litres, gallons, tasses, onces liquides et plus.",
    },
    speed: {
      title: "Convertisseur de vitesse",
      description: "Convertissez entre m/s, km/h, mph, nœuds et plus.",
    },
    time: {
      title: "Convertisseur de temps",
      description:
        "Convertissez entre secondes, minutes, heures, jours, semaines et plus.",
    },
    pressure: {
      title: "Convertisseur de pression",
      description:
        "Convertissez entre Pascal, bar, PSI, atmosphère et plus.",
    },
    energy: {
      title: "Convertisseur d'énergie",
      description:
        "Convertissez entre joules, calories, kilowattheures, BTU et plus.",
    },
    power: {
      title: "Convertisseur de puissance",
      description:
        "Convertissez entre watts, kilowatts, chevaux-vapeur et plus.",
    },
    frequency: {
      title: "Convertisseur de fréquence",
      description:
        "Convertissez entre hertz, kilohertz, mégahertz, gigahertz et RPM.",
    },
    angle: {
      title: "Convertisseur d'angle",
      description: "Convertissez entre degrés, radians, grades et tours.",
    },
    "data-storage": {
      title: "Convertisseur de stockage",
      description:
        "Convertissez entre octets, kilo-octets, méga-octets, giga-octets et plus.",
    },
    "fuel-economy": {
      title: "Convertisseur de consommation",
      description: "Convertissez entre km/L, mpg et L/100km.",
    },
    "number-base": {
      title: "Convertisseur de base numérique",
      description:
        "Convertissez entre binaire, octal, décimal, hexadécimal et bases personnalisées.",
    },
    "roman-numeral": {
      title: "Convertisseur de chiffres romains",
      description: "Convertissez entre chiffres romains et chiffres arabes.",
    },
    "scientific-notation": {
      title: "Convertisseur de notation scientifique",
      description:
        "Convertissez entre notation scientifique et nombres standards.",
    },
    "fraction-decimal": {
      title: "Fraction ↔ Décimal",
      description: "Convertissez entre fractions et nombres décimaux.",
    },
    percentage: {
      title: "Convertisseur de pourcentage",
      description:
        "Convertissez entre fractions, décimales et pourcentages.",
    },
    "color-converter": {
      title: "Convertisseur de couleurs",
      description:
        "Convertissez entre les formats HEX, RGB, HSL, HSV et CMYK.",
    },
    "color-palette-generator": {
      title: "Générateur de palettes",
      description:
        "Générez des palettes complémentaires, triadiques et analogues.",
    },
    "gradient-generator": {
      title: "Générateur de dégradés CSS",
      description:
        "Créez des dégradés CSS linéaires, radiaux et coniques avec aperçu en direct.",
    },
    "color-contrast-checker": {
      title: "Vérificateur de contraste",
      description:
        "Vérifiez le ratio de contraste WCAG AA/AAA entre deux couleurs.",
    },
    "color-blindness-simulator": {
      title: "Simulateur de daltonisme",
      description:
        "Simulez la perception des couleurs chez les personnes daltoniennes.",
    },
    timezone: {
      title: "Convertisseur de fuseau horaire",
      description:
        "Convertissez l'heure entre différents fuseaux horaires.",
    },
    "unix-timestamp": {
      title: "Convertisseur Unix timestamp",
      description:
        "Convertissez entre horodatages Unix et dates lisibles.",
    },
    "date-format": {
      title: "Convertisseur de format de date",
      description:
        "Convertissez des dates entre différents formats (ISO, US, EU et plus).",
    },
    "date-calculator": {
      title: "Calculateur de dates",
      description:
        "Calculez la différence entre deux dates ou ajoutez/soustrayez des jours.",
    },
    "age-calculator": {
      title: "Calculateur d'âge",
      description:
        "Calculez l'âge exact à partir de la date de naissance en années, mois et jours.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Convertissez entre les formats JSON et YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Convertissez entre tableaux JSON et format CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Convertissez entre les formats JSON et XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Convertissez entre les formats de configuration JSON et TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Convertissez entre Markdown et HTML.",
    },
    "csv-table": {
      title: "CSV vers tableau",
      description: "Convertissez des données CSV en tableaux Markdown ou HTML.",
    },
    "json-typescript": {
      title: "JSON vers TypeScript",
      description: "Générez des interfaces TypeScript à partir de données JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Convertissez entre instructions SQL INSERT et données JSON.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Convertissez entre pixels et rem avec une taille de base personnalisée.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Convertissez entre pixels et em avec une taille parent personnalisée.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Convertissez entre pixels et pourcentage avec une largeur de conteneur personnalisée.",
    },
    "css-unit": {
      title: "Convertisseur d'unités CSS",
      description:
        "Convertissez entre px, rem, em, %, vw, vh et autres unités CSS.",
    },
    "css-minifier": {
      title: "Minificateur / Embellisseur CSS",
      description:
        "Minifiez ou embellissez du code CSS pour la production ou la lisibilité.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Convertissez entre classes Tailwind CSS et CSS standard.",
    },
    "cooking-measurement": {
      title: "Convertisseur de mesures de cuisine",
      description:
        "Convertissez entre tasses, cuillères à soupe, cuillères à café, millilitres et grammes.",
    },
    "recipe-scaler": {
      title: "Ajusteur de recettes",
      description:
        "Ajustez les ingrédients d'une recette selon le nombre de portions.",
    },
    "oven-temperature": {
      title: "Convertisseur de température du four",
      description:
        "Convertissez entre Celsius, Fahrenheit et thermostat pour les températures de four.",
    },
    coordinate: {
      title: "Convertisseur de coordonnées",
      description:
        "Convertissez entre les formats de coordonnées DMS, DD et DDM.",
    },
    "distance-calculator": {
      title: "Calculateur de distance",
      description:
        "Calculez la distance entre deux coordonnées géographiques.",
    },
  },
  nav: {
    allTools: "Tous les convertisseurs",
    language: "Langue",
  },
  footer: {
    tools: "Convertisseurs",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    copyright: "ToolPop. Tous droits réservés.",
    company: "Entreprise",
    about: "À propos",
    contact: "Contact",
    faq: "FAQ",
  },
  common: {
    backToAll: "Tous les convertisseurs",
    inputPlaceholder: "Saisissez une valeur à convertir...",
    outputLabel: "Résultat",
    copyToClipboard: "Copier dans le presse-papiers",
    copied: "Copié !",
    clear: "Effacer",
    paste: "Coller",
    processing: "Conversion...",
    startOver: "Recommencer",
    process: "Convertir",
    tryAgain: "Réessayer",
    notImplemented: "Ce convertisseur sera bientôt disponible.",
    tryOtherTools: "Essayez d'autres convertisseurs",
    privacyBadge: "Toutes les conversions sont effectuées dans votre navigateur",
    favoriteAdded: "Ajouté aux favoris",
    favoriteRemoved: "Retiré des favoris",
    comingSoon: "Bientôt disponible",
    share: "Partager",
    shareTitle: "Partager ce convertisseur",
    shareSubtitle: "Partagez cet outil pratique avec d'autres",
    shareCopied: "Lien copié !",
    shareCopyLink: "Copier le lien",
    downloadAsFile: "Télécharger",
    options: "Options",
    input: "Entrée",
    output: "Sortie",
    convert: "Convertir",
    swap: "Inverser",
    from: "De",
    to: "Vers",
    result: "Résultat",
    allConversions: "Toutes les conversions",
    details: "Détails",
    pageNotFound: "Convertisseur introuvable",
    goHome: "Retour à tous les convertisseurs",
    colorPickerLabel: "Sélecteur de couleur",
  },
  toolOptions: {
    fromUnit: "De",
    toUnit: "Vers",
    precision: "Décimales",
    baseSize: "Taille de police de base (px)",
    parentSize: "Taille de police du parent (px)",
    containerWidth: "Largeur du conteneur (px)",
    viewportWidth: "Largeur du viewport (px)",
    viewportHeight: "Hauteur du viewport (px)",
    direction: "Direction",
    mode: "Mode",
    ingredient: "Ingrédient",
    water: "Eau",
    flour: "Farine",
    sugar: "Sucre",
    butter: "Beurre",
    rice: "Riz",
    milk: "Lait",
    originalServings: "Portions d'origine",
    targetServings: "Portions souhaitées",
    fromTimezone: "Fuseau horaire d'origine",
    toTimezone: "Fuseau horaire de destination",
    inputFormat: "Format d'entrée",
    outputFormat: "Format de sortie",
    harmony: "Harmonie des couleurs",
    complementary: "Complémentaire",
    triadic: "Triadique",
    analogous: "Analogue",
    splitComplementary: "Complémentaire scindé",
    tetradic: "Tétradique",
    gradientType: "Type de dégradé",
    linear: "Linéaire",
    radial: "Radial",
    conic: "Conique",
    gradientAngle: "Angle (deg)",
    rootName: "Nom de l'interface racine",
    tableName: "Nom de la table",
    minify: "Minifier",
    beautify: "Embellir",
    colorType: "Type de déficience",
    protanopia: "Protanopie (sans rouge)",
    deuteranopia: "Deutéranopie (sans vert)",
    tritanopia: "Tritanopie (sans bleu)",
    achromatopsia: "Achromatopsie (sans couleur)",
    operation: "Opération",
    difference: "Différence",
    add: "Ajouter",
    subtract: "Soustraire",
    amount: "Quantité",
    unit: "Unité",
    days: "Jours",
    weeks: "Semaines",
    months: "Mois",
    years: "Ans",
    fromBase: "Base d'origine",
    toBase: "Base de destination",
    binary: "Binaire (2)",
    octal: "Octal (8)",
    decimal: "Décimal (10)",
    hexadecimal: "Hexadécimal (16)",
    seconds: "Secondes",
    milliseconds: "Millisecondes",
    autoDetect: "Détection automatique",
    jsonToYaml: "JSON → YAML",
    yamlToJson: "YAML → JSON",
    jsonToCsv: "JSON → CSV",
    csvToJson: "CSV → JSON",
    jsonToXml: "JSON → XML",
    xmlToJson: "XML → JSON",
    jsonToToml: "JSON → TOML",
    tomlToJson: "TOML → JSON",
    mdToHtml: "Markdown → HTML",
    htmlToMd: "HTML → Markdown",
    markdown: "Tableau Markdown",
    html: "Tableau HTML",
    sqlToJson: "SQL → JSON",
    jsonToSql: "JSON → SQL",
    pxToRem: "px → rem",
    remToPx: "rem → px",
    pxToEm: "px → em",
    emToPx: "em → px",
    pxToPercent: "px → %",
    percentToPx: "% → px",
    tailwindToCss: "Tailwind → CSS",
    cssToTailwind: "CSS → Tailwind",
    toRoman: "Nombre → Romain",
    toArabic: "Romain → Nombre",
    toScientific: "Standard → Scientifique",
    toStandard: "Scientifique → Standard",
    toFraction: "Décimal → Fraction",
    toDecimal: "Fraction → Décimal",
    decimalToPercent: "Décimal → Pourcentage",
    percentToDecimal: "Pourcentage → Décimal",
    fractionToPercent: "Fraction → Pourcentage",
    dd: "Degrés décimaux (DD)",
    dms: "Degrés minutes secondes (DMS)",
    ddm: "Degrés minutes décimales (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Format long",
    short: "Format court",
    relative: "Relatif",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Couleur d'arrière-plan",
    monochromatic: "Monochromatique",
    timestampToDate: "Timestamp → Date",
    dateToTimestamp: "Date → Timestamp",
    showDetails: "Afficher le détail complet",
    addDays: "Ajouter des jours",
    subtractDays: "Soustraire des jours",
    datetimeHint: "ex. 2024-01-15, 1705312200, now",
    endDate: "Date de fin",
    today: "Aujourd'hui (par défaut)",
    dateUnit: "Unité",
  },
  statsLabels: {
    lines: "Lignes",
    characters: "Caractères",
    rows: "Lignes",
    columns: "Colonnes",
    elements: "Éléments",
    keys: "Clés",
    interfaces: "Interfaces",
    properties: "Propriétés",
    originalSize: "Taille d'origine",
    resultSize: "Taille du résultat",
    savings: "Économie",
    ingredients: "Ingrédients",
    scaleFactor: "Facteur d'échelle",
    contrastRatio: "Ratio de contraste",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitude",
    longitude: "Longitude",
    distanceKm: "Distance (km)",
    distanceMi: "Distance (mi)",
    years: "Ans",
    months: "Mois",
    days: "Jours",
  },
  processorMessages: {
    invalidTimezone: "Fuseau horaire invalide",
    pass: "Réussi", fail: "Échoué",
    fromNow: "à partir de maintenant", ago: "il y a",
    today: "Aujourd'hui", tomorrow: "Demain", yesterday: "Hier",
    seconds: "seconde", secondsPlural: "secondes",
    minutes: "minute", minutesPlural: "minutes",
    hours: "heure", hoursPlural: "heures",
    daysUnit: "jour", daysPlural: "jours",
    weeksUnit: "semaine", weeksPlural: "semaines",
    monthsUnit: "mois", monthsPlural: "mois",
    yearsUnit: "an", yearsPlural: "ans",
    gasmark: "Gas Mark",
    veryCool: "Très frais", cool: "Frais", moderatelyCool: "Modérément frais",
    moderate: "Modéré", moderatelyHot: "Modérément chaud",
    hot: "Chaud", veryHot: "Très chaud", extremelyHot: "Extrêmement chaud",
    original: "Original",
    from: "De", to: "Vers",
    totalDays: "Total jours", weeksDays: "Semaines + Jours",
    originalDate: "Date d'origine", operationLabel: "Opération",
    resultDate: "Date résultat", dayOfWeek: "Jour de la semaine",
    daysBetween: "Jours d'écart",
    age: "Âge", totalMonths: "Total mois",
    totalHours: "Total heures", totalMinutes: "Total minutes",
    nextBirthday: "Prochain anniversaire",
    roman: "Romain", arabic: "Arabe",
    scientific: "Scientifique", standard: "Standard", engineering: "Ingénierie",
    fraction: "Fraction", simplified: "Simplifié", percentage: "Pourcentage",
    color1: "Couleur 1", color2: "Couleur 2",
    contrastRatioLabel: "Ratio de contraste",
    aaNormalText: "AA Texte normal", aaLargeText: "AA Grand texte",
    aaaNormalText: "AAA Texte normal", aaaLargeText: "AAA Grand texte",
    gradientTypeLabel: "Type", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Convertisseur — Convertisseurs en ligne gratuits",
    siteDescription:
      "Convertissez unités, couleurs, formats de données, dates et plus. Gratuit, rapide et confidentiel — tout s'exécute dans votre navigateur.",
    toolTitleSuffix: "| ToolPop Convertisseur",
  },
  blog: {
    title: "Blog",
    description:
      "Astuces, guides et connaissances sur la conversion d'unités, les formats de données et plus.",
    readMore: "Lire la suite",
    backToBlog: "Retour au blog",
    publishedOn: "Publié le",
    categoryGuide: "Guide",
    categoryTips: "Astuces",
    categoryKnowledge: "Connaissances",
  },
  cookie: {
    message:
      "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de cookies.",
    accept: "Accepter",
    decline: "Refuser",
  },
  unitLabels: {
    length: {
      m: "Mètre (m)", km: "Kilomètre (km)", cm: "Centimètre (cm)", mm: "Millimètre (mm)",
      mi: "Mile (mi)", yd: "Yard (yd)", ft: "Pied (ft)", in: "Pouce (in)",
      nm: "Mille nautique (nm)", "\u03BCm": "Micromètre (\u03BCm)",
    },
    weight: {
      kg: "Kilogramme (kg)", g: "Gramme (g)", mg: "Milligramme (mg)", lb: "Livre (lb)",
      oz: "Once (oz)", ton: "Tonne métrique (t)", st: "Stone (st)", ct: "Carat (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Mètre carré (m\u00B2)", "km\u00B2": "Kilomètre carré (km\u00B2)",
      ha: "Hectare (ha)", acre: "Acre", "ft\u00B2": "Pied carré (ft\u00B2)",
      "mi\u00B2": "Mile carré (mi\u00B2)", "yd\u00B2": "Yard carré (yd\u00B2)",
      "cm\u00B2": "Centimètre carré (cm\u00B2)",
    },
    volume: {
      L: "Litre (L)", mL: "Millilitre (mL)", gal: "Gallon US (gal)",
      "fl oz": "Once liquide US (fl oz)", cup: "Tasse US", pt: "Pinte US (pt)",
      qt: "Quart US (qt)", "m\u00B3": "Mètre cube (m\u00B3)",
      "cm\u00B3": "Centimètre cube (cm\u00B3)", tbsp: "Cuillère à soupe (tbsp)", tsp: "Cuillère à café (tsp)",
    },
    speed: {
      "m/s": "Mètre/sec (m/s)", "km/h": "Kilomètre/h (km/h)", mph: "Mile/h (mph)",
      kn: "Nœud (kn)", "ft/s": "Pied/sec (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milliseconde (ms)", s: "Seconde (s)", min: "Minute (min)", h: "Heure (h)",
      d: "Jour (d)", wk: "Semaine (wk)", mo: "Mois (mo)", yr: "An (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosphère (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Calorie (cal)", kcal: "Kilocalorie (kcal)",
      Wh: "Wattheure (Wh)", kWh: "Kilowattheure (kWh)", BTU: "BTU", eV: "Électronvolt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Kilowatt (kW)", MW: "Mégawatt (MW)", hp: "Cheval-vapeur (hp)",
      "BTU/h": "BTU/h", "cal/s": "Calorie/sec",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Mégahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Degré (\u00B0)", rad: "Radian (rad)", grad: "Grade (grad)",
      turn: "Tour", arcmin: "Minute d'arc (\u2032)", arcsec: "Seconde d'arc (\u2033)",
    },
    "data-storage": {
      B: "Octet (B)", KB: "Kilo-octet (KB)", MB: "Méga-octet (MB)", GB: "Giga-octet (GB)",
      TB: "Téra-octet (TB)", PB: "Péta-octet (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Mégabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Tasse", tbsp: "Cuillère à soupe", tsp: "Cuillère à café", mL: "Millilitre (mL)",
      L: "Litre (L)", fl_oz: "Once liquide", g: "Gramme (g)", kg: "Kilogramme (kg)",
      oz: "Once (oz)", lb: "Livre (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixels (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixels (px)", em: "Em (em)" },
    "px-percent": { px: "Pixels (px)", "%": "Pourcentage (%)" },
    "css-unit": {
      px: "Pixels (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Pourcentage (%)", vw: "Largeur du viewport (vw)", vh: "Hauteur du viewport (vh)",
    },
  },
};

export default dict;
