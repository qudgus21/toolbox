import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Όλα τα εργαλεία μετατροπής που χρειάζεστε",
    titleAccent: "μετατροπής",
    description:
      "Μετατρέψτε μονάδες, χρώματα, μορφές δεδομένων, ημερομηνίες. Όλα μέσα στο πρόγραμμα περιήγησης.",
    tabAll: "Όλα",
    categoryUnit: "Μονάδες",
    categoryNumber: "Αριθμοί",
    categoryColor: "Χρώματα",
    categoryDatetime: "Ημερομηνία/Ώρα",
    categoryData: "Δεδομένα",
    categoryCss: "CSS",
    categoryCooking: "Μαγειρική",
    categoryGeography: "Γεωγραφία",
    searchPlaceholder: "Αναζήτηση μετατροπέων...",
    noResults: "Δεν βρέθηκαν μετατροπείς.",
    recentTools: "Πρόσφατα χρησιμοποιημένα",
    favorites: "Αγαπημένα",
    favDragHint: "Σύρετε για αναδιάταξη",
    favHint: "Πατήστε το αστέρι για να προσθέσετε στα αγαπημένα",
    gridView: "Πλέγμα",
    listView: "Λίστα",
  },
  trust: {
    encryption: "Ασφαλής επεξεργασία",
    encryptionDesc: "Όλες οι μετατροπές γίνονται τοπικά στον browser σας",
    autoDelete: "Χωρίς αποθήκευση δεδομένων",
    autoDeleteDesc: "Τα δεδομένα σας δεν αποθηκεύονται ούτε αποστέλλονται σε server",
    free: "100% δωρεάν",
    freeDesc: "Χωρίς περιορισμούς, χωρίς εγγραφή, χωρίς κρυφές χρεώσεις",
    browserProcessing: "Άμεσα αποτελέσματα",
    browserProcessingDesc: "Μετατροπή σε πραγματικό χρόνο καθώς πληκτρολογείτε",
  },
  tools: {
    length: {
      title: "Μετατροπέας μήκους",
      description:
        "Μετατρέψτε μεταξύ μέτρων, χιλιομέτρων, μιλίων, ποδιών, ιντσών και άλλων.",
    },
    weight: {
      title: "Μετατροπέας βάρους",
      description:
        "Μετατρέψτε μεταξύ κιλών, λιβρών, ουγγιών, τόνων και άλλων.",
    },
    temperature: {
      title: "Μετατροπέας θερμοκρασίας",
      description: "Μετατρέψτε μεταξύ Κελσίου, Φαρενάιτ και Κέλβιν.",
    },
    area: {
      title: "Μετατροπέας εμβαδού",
      description:
        "Μετατρέψτε μεταξύ τετραγωνικών μέτρων, εκταρίων, στρεμμάτων, τετραγωνικών ποδιών και άλλων.",
    },
    volume: {
      title: "Μετατροπέας όγκου",
      description:
        "Μετατρέψτε μεταξύ λίτρων, γαλονιών, φλιτζανιών, υγρών ουγγιών και άλλων.",
    },
    speed: {
      title: "Μετατροπέας ταχύτητας",
      description: "Μετατρέψτε μεταξύ m/s, km/h, mph, κόμβων και άλλων.",
    },
    time: {
      title: "Μετατροπέας χρόνου",
      description:
        "Μετατρέψτε μεταξύ δευτερολέπτων, λεπτών, ωρών, ημερών, εβδομάδων και άλλων.",
    },
    pressure: {
      title: "Μετατροπέας πίεσης",
      description:
        "Μετατρέψτε μεταξύ Pascal, bar, PSI, ατμόσφαιρας και άλλων.",
    },
    energy: {
      title: "Μετατροπέας ενέργειας",
      description:
        "Μετατρέψτε μεταξύ joule, θερμίδων, κιλοβατώρων, BTU και άλλων.",
    },
    power: {
      title: "Μετατροπέας ισχύος",
      description:
        "Μετατρέψτε μεταξύ watt, kilowatt, ίππων και άλλων.",
    },
    frequency: {
      title: "Μετατροπέας συχνότητας",
      description:
        "Μετατρέψτε μεταξύ hertz, kilohertz, megahertz, gigahertz και RPM.",
    },
    angle: {
      title: "Μετατροπέας γωνιών",
      description: "Μετατρέψτε μεταξύ μοιρών, ακτινίων, gradians και στροφών.",
    },
    "data-storage": {
      title: "Μετατροπέας αποθηκευτικού χώρου",
      description:
        "Μετατρέψτε μεταξύ bytes, kilobytes, megabytes, gigabytes και άλλων.",
    },
    "fuel-economy": {
      title: "Μετατροπέας κατανάλωσης καυσίμου",
      description: "Μετατρέψτε μεταξύ km/L, mpg και L/100km.",
    },
    "number-base": {
      title: "Μετατροπέας αριθμητικών βάσεων",
      description:
        "Μετατρέψτε μεταξύ δυαδικού, οκταδικού, δεκαδικού, δεκαεξαδικού και προσαρμοσμένων βάσεων.",
    },
    "roman-numeral": {
      title: "Μετατροπέας ρωμαϊκών αριθμών",
      description: "Μετατρέψτε μεταξύ ρωμαϊκών και αραβικών αριθμών.",
    },
    "scientific-notation": {
      title: "Επιστημονική σημειογραφία",
      description:
        "Μετατρέψτε μεταξύ επιστημονικής σημειογραφίας και τυπικών αριθμών.",
    },
    "fraction-decimal": {
      title: "Κλάσμα ↔ Δεκαδικός",
      description: "Μετατρέψτε μεταξύ κλασμάτων και δεκαδικών αριθμών.",
    },
    percentage: {
      title: "Μετατροπέας ποσοστών",
      description:
        "Μετατρέψτε μεταξύ κλασμάτων, δεκαδικών και ποσοστών.",
    },
    "color-converter": {
      title: "Μετατροπέας χρωμάτων",
      description:
        "Μετατρέψτε μεταξύ HEX, RGB, HSL, HSV και CMYK μορφών χρωμάτων.",
    },
    "color-palette-generator": {
      title: "Γεννήτρια χρωματικών παλετών",
      description:
        "Δημιουργήστε συμπληρωματικές, τριαδικές και ανάλογες χρωματικές παλέτες.",
    },
    "gradient-generator": {
      title: "Γεννήτρια CSS gradient",
      description:
        "Δημιουργήστε γραμμικά, ακτινικά και κωνικά CSS gradients με ζωντανή προεπισκόπηση.",
    },
    "color-contrast-checker": {
      title: "Ελεγκτής αντίθεσης χρωμάτων",
      description:
        "Ελέγξτε τον λόγο αντίθεσης WCAG AA/AAA μεταξύ δύο χρωμάτων.",
    },
    "color-blindness-simulator": {
      title: "Προσομοιωτής αχρωματοψίας",
      description:
        "Δείτε πώς φαίνονται τα χρώματα σε άτομα με διαταραχές χρωματικής όρασης.",
    },
    timezone: {
      title: "Μετατροπέας ζωνών ώρας",
      description:
        "Μετατρέψτε την ώρα μεταξύ διαφορετικών ζωνών ώρας παγκοσμίως.",
    },
    "unix-timestamp": {
      title: "Unix Timestamp μετατροπέας",
      description:
        "Μετατρέψτε μεταξύ Unix timestamps και αναγνώσιμων ημερομηνιών.",
    },
    "date-format": {
      title: "Μετατροπέας μορφής ημερομηνίας",
      description:
        "Μετατρέψτε ημερομηνίες μεταξύ διαφορετικών μορφών (ISO, US, EU και άλλων).",
    },
    "date-calculator": {
      title: "Υπολογιστής ημερομηνιών",
      description:
        "Υπολογίστε τη διαφορά μεταξύ ημερομηνιών ή προσθέστε/αφαιρέστε ημέρες.",
    },
    "age-calculator": {
      title: "Υπολογιστής ηλικίας",
      description:
        "Υπολογίστε την ακριβή ηλικία από την ημερομηνία γέννησης σε χρόνια, μήνες και ημέρες.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Μετατρέψτε μεταξύ JSON και YAML μορφών δεδομένων.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Μετατρέψτε μεταξύ JSON πινάκων και CSV μορφής υπολογιστικών φύλλων.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Μετατρέψτε μεταξύ JSON και XML μορφών δεδομένων.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Μετατρέψτε μεταξύ JSON και TOML μορφών ρυθμίσεων.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Μετατρέψτε μεταξύ Markdown και HTML markup.",
    },
    "csv-table": {
      title: "CSV σε πίνακα",
      description: "Μετατρέψτε δεδομένα CSV σε Markdown ή HTML πίνακες.",
    },
    "json-typescript": {
      title: "JSON σε TypeScript",
      description: "Δημιουργήστε TypeScript interfaces από JSON δεδομένα.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Μετατρέψτε μεταξύ SQL INSERT εντολών και JSON δεδομένων.",
    },
    "px-rem": {
      title: "px ↔ rem μετατροπέας",
      description:
        "Μετατρέψτε μεταξύ pixels και rem μονάδων με προσαρμοσμένο βασικό μέγεθος.",
    },
    "px-em": {
      title: "px ↔ em μετατροπέας",
      description:
        "Μετατρέψτε μεταξύ pixels και em μονάδων με προσαρμοσμένο γονικό μέγεθος.",
    },
    "px-percent": {
      title: "px ↔ % μετατροπέας",
      description:
        "Μετατρέψτε μεταξύ pixels και ποσοστών με προσαρμοσμένο πλάτος container.",
    },
    "css-unit": {
      title: "CSS μετατροπέας μονάδων",
      description:
        "Μετατρέψτε μεταξύ px, rem, em, %, vw, vh και άλλων CSS μονάδων.",
    },
    "css-minifier": {
      title: "CSS minifier / μορφοποίηση",
      description:
        "Ελαχιστοποιήστε ή μορφοποιήστε CSS κώδικα για παραγωγή ή αναγνωσιμότητα.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Μετατρέψτε μεταξύ Tailwind CSS κλάσεων και απλού CSS.",
    },
    "cooking-measurement": {
      title: "Μετατροπέας μαγειρικών μέτρων",
      description:
        "Μετατρέψτε μεταξύ φλιτζανιών, κουταλιών, κουταλακιών, χιλιοστόλιτρων και γραμμαρίων.",
    },
    "recipe-scaler": {
      title: "Κλιμάκωση συνταγών",
      description:
        "Προσαρμόστε τις ποσότητες υλικών ανάλογα με τον αριθμό μερίδων.",
    },
    "oven-temperature": {
      title: "Μετατροπέας θερμοκρασίας φούρνου",
      description:
        "Μετατρέψτε μεταξύ Κελσίου, Φαρενάιτ και Gas Mark για θερμοκρασίες φούρνου.",
    },
    coordinate: {
      title: "Μετατροπέας συντεταγμένων",
      description:
        "Μετατρέψτε μεταξύ DMS, DD και DDM μορφών συντεταγμένων.",
    },
    "distance-calculator": {
      title: "Υπολογιστής απόστασης",
      description:
        "Υπολογίστε την απόσταση μεταξύ δύο γεωγραφικών συντεταγμένων.",
    },
  },
  nav: {
    allTools: "Όλα τα εργαλεία μετατροπής",
    language: "Γλώσσα",
  },
  footer: {
    tools: "Μετατροπείς",
    legal: "Νομικά",
    privacy: "Πολιτική απορρήτου",
    terms: "Όροι χρήσης",
    copyright: "ToolPop. Όλα τα δικαιώματα κατοχυρωμένα.",
    company: "Εταιρεία",
    about: "Σχετικά",
    contact: "Επικοινωνία",
    faq: "FAQ",
  },
  common: {
    backToAll: "Όλοι οι μετατροπείς",
    inputPlaceholder: "Εισάγετε μια τιμή για μετατροπή...",
    outputLabel: "Αποτέλεσμα",
    copyToClipboard: "Αντιγραφή στο πρόχειρο",
    copied: "Αντιγράφηκε!",
    clear: "Καθαρισμός",
    paste: "Επικόλληση",
    processing: "Μετατροπή...",
    startOver: "Από την αρχή",
    process: "Μετατροπή",
    tryAgain: "Δοκιμάστε ξανά",
    notImplemented: "Αυτός ο μετατροπέας έρχεται σύντομα.",
    tryOtherTools: "Δοκιμάστε άλλους μετατροπείς",
    privacyBadge: "Όλες οι μετατροπές γίνονται στον browser σας",
    favoriteAdded: "Προστέθηκε στα αγαπημένα",
    favoriteRemoved: "Αφαιρέθηκε από τα αγαπημένα",
    comingSoon: "Σύντομα διαθέσιμο",
    share: "Κοινοποίηση",
    shareTitle: "Μοιραστείτε αυτόν τον μετατροπέα",
    shareSubtitle: "Μοιραστείτε αυτόν τον χρήσιμο μετατροπέα με άλλους",
    shareCopied: "Ο σύνδεσμος αντιγράφηκε!",
    shareCopyLink: "Αντιγραφή συνδέσμου",
    downloadAsFile: "Λήψη",
    options: "Επιλογές",
    input: "Είσοδος",
    output: "Έξοδος",
    convert: "Μετατροπή",
    swap: "Εναλλαγή",
    from: "Από",
    to: "Σε",
    result: "Αποτέλεσμα",
    allConversions: "Όλες οι μετατροπές",
    details: "Λεπτομέρειες",
    pageNotFound: "Ο μετατροπέας δεν βρέθηκε",
    goHome: "Πίσω σε όλους τους μετατροπείς",
    colorPickerLabel: "Επιλογή χρώματος",
  },
  toolOptions: {
    fromUnit: "Από",
    toUnit: "Σε",
    precision: "Δεκαδικά ψηφία",
    baseSize: "Βασικό μέγεθος γραμματοσειράς (px)",
    parentSize: "Μέγεθος γονικής γραμματοσειράς (px)",
    containerWidth: "Πλάτος container (px)",
    viewportWidth: "Πλάτος viewport (px)",
    viewportHeight: "Ύψος viewport (px)",
    direction: "Κατεύθυνση",
    mode: "Λειτουργία",
    ingredient: "Υλικό",
    water: "Νερό",
    flour: "Αλεύρι",
    sugar: "Ζάχαρη",
    butter: "Βούτυρο",
    rice: "Ρύζι",
    milk: "Γάλα",
    originalServings: "Αρχικές μερίδες",
    targetServings: "Επιθυμητές μερίδες",
    fromTimezone: "Από ζώνη ώρας",
    toTimezone: "Σε ζώνη ώρας",
    inputFormat: "Μορφή εισόδου",
    outputFormat: "Μορφή εξόδου",
    harmony: "Χρωματική αρμονία",
    complementary: "Συμπληρωματική",
    triadic: "Τριαδική",
    analogous: "Ανάλογη",
    splitComplementary: "Διαιρεμένη συμπληρωματική",
    tetradic: "Τετραδική",
    gradientType: "Τύπος gradient",
    linear: "Γραμμικό",
    radial: "Ακτινικό",
    conic: "Κωνικό",
    gradientAngle: "Γωνία (deg)",
    rootName: "Όνομα κύριου interface",
    tableName: "Όνομα πίνακα",
    minify: "Ελαχιστοποίηση",
    beautify: "Μορφοποίηση",
    colorType: "Τύπος διαταραχής",
    protanopia: "Πρωτανοπία (χωρίς κόκκινο)",
    deuteranopia: "Δευτερανοπία (χωρίς πράσινο)",
    tritanopia: "Τριτανοπία (χωρίς μπλε)",
    achromatopsia: "Αχρωματοψία (χωρίς χρώμα)",
    operation: "Λειτουργία",
    difference: "Διαφορά",
    add: "Πρόσθεση",
    subtract: "Αφαίρεση",
    amount: "Ποσότητα",
    unit: "Μονάδα",
    days: "Ημέρες",
    weeks: "Εβδομάδες",
    months: "Μήνες",
    years: "Χρόνια",
    fromBase: "Από βάση",
    toBase: "Σε βάση",
    binary: "Δυαδικό (2)",
    octal: "Οκταδικό (8)",
    decimal: "Δεκαδικό (10)",
    hexadecimal: "Δεκαεξαδικό (16)",
    seconds: "Δευτερόλεπτα",
    milliseconds: "Χιλιοστά του δευτερολέπτου",
    autoDetect: "Αυτόματη ανίχνευση",
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
    markdown: "Markdown πίνακας",
    html: "HTML πίνακας",
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
    toRoman: "Αριθμός → Ρωμαϊκός",
    toArabic: "Ρωμαϊκός → Αριθμός",
    toScientific: "Τυπικός → Επιστημονικός",
    toStandard: "Επιστημονικός → Τυπικός",
    toFraction: "Δεκαδικός → Κλάσμα",
    toDecimal: "Κλάσμα → Δεκαδικός",
    decimalToPercent: "Δεκαδικός → Ποσοστό",
    percentToDecimal: "Ποσοστό → Δεκαδικός",
    fractionToPercent: "Κλάσμα → Ποσοστό",
    dd: "Δεκαδικές μοίρες (DD)",
    dms: "Μοίρες λεπτά δευτερόλεπτα (DMS)",
    ddm: "Μοίρες δεκαδικά λεπτά (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Πλήρης μορφή",
    short: "Σύντομη μορφή",
    relative: "Σχετικό",
    celsius: "Κελσίου (°C)",
    fahrenheit: "Φαρενάιτ (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Χρώμα φόντου",
    monochromatic: "Μονοχρωματική",
    timestampToDate: "Χρονοσήμανση → Ημερομηνία",
    dateToTimestamp: "Ημερομηνία → Χρονοσήμανση",
    showDetails: "Εμφάνιση αναλυτικών στοιχείων",
    addDays: "Προσθήκη ημερών",
    subtractDays: "Αφαίρεση ημερών",
    datetimeHint: "π.χ. 2024-01-15, 1705312200, now",
    endDate: "Ημερομηνία λήξης",
    today: "Σήμερα (προεπιλογή)",
    dateUnit: "Μονάδα",
  },
  statsLabels: {
    lines: "Γραμμές",
    characters: "Χαρακτήρες",
    rows: "Σειρές",
    columns: "Στήλες",
    elements: "Στοιχεία",
    keys: "Κλειδιά",
    interfaces: "Interfaces",
    properties: "Ιδιότητες",
    originalSize: "Αρχικό μέγεθος",
    resultSize: "Μέγεθος αποτελέσματος",
    savings: "Εξοικονόμηση",
    ingredients: "Υλικά",
    scaleFactor: "Συντελεστής κλίμακας",
    contrastRatio: "Λόγος αντίθεσης",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Γεωγραφικό πλάτος",
    longitude: "Γεωγραφικό μήκος",
    distanceKm: "Απόσταση (km)",
    distanceMi: "Απόσταση (mi)",
    years: "Χρόνια",
    months: "Μήνες",
    days: "Ημέρες",
  },
  processorMessages: {
    invalidTimezone: "Μη έγκυρη ζώνη ώρας",
    pass: "Επιτυχία", fail: "Αποτυχία",
    fromNow: "από τώρα", ago: "πριν",
    today: "Σήμερα", tomorrow: "Αύριο", yesterday: "Χθες",
    seconds: "δευτερόλεπτο", secondsPlural: "δευτερόλεπτα",
    minutes: "λεπτό", minutesPlural: "λεπτά",
    hours: "ώρα", hoursPlural: "ώρες",
    daysUnit: "ημέρα", daysPlural: "ημέρες",
    weeksUnit: "εβδομάδα", weeksPlural: "εβδομάδες",
    monthsUnit: "μήνας", monthsPlural: "μήνες",
    yearsUnit: "χρόνος", yearsPlural: "χρόνια",
    gasmark: "Gas Mark",
    veryCool: "Πολύ χαμηλή", cool: "Χαμηλή", moderatelyCool: "Μέτρια χαμηλή",
    moderate: "Μέτρια", moderatelyHot: "Μέτρια υψηλή",
    hot: "Υψηλή", veryHot: "Πολύ υψηλή", extremelyHot: "Εξαιρετικά υψηλή",
    original: "Αρχικό",
    from: "Από", to: "Σε",
    totalDays: "Σύνολο ημερών", weeksDays: "Εβδομάδες + Ημέρες",
    originalDate: "Αρχική ημερομηνία", operationLabel: "Λειτουργία",
    resultDate: "Ημερομηνία αποτελέσματος", dayOfWeek: "Ημέρα εβδομάδας",
    daysBetween: "Ημέρες μεταξύ",
    age: "Ηλικία", totalMonths: "Σύνολο μηνών",
    totalHours: "Σύνολο ωρών", totalMinutes: "Σύνολο λεπτών",
    nextBirthday: "Επόμενα γενέθλια",
    roman: "Ρωμαϊκό", arabic: "Αραβικό",
    scientific: "Επιστημονικό", standard: "Τυπικό", engineering: "Μηχανικό",
    fraction: "Κλάσμα", simplified: "Απλοποιημένο", percentage: "Ποσοστό",
    color1: "Χρώμα 1", color2: "Χρώμα 2",
    contrastRatioLabel: "Λόγος αντίθεσης",
    aaNormalText: "AA κανονικό κείμενο", aaLargeText: "AA μεγάλο κείμενο",
    aaaNormalText: "AAA κανονικό κείμενο", aaaLargeText: "AAA μεγάλο κείμενο",
    gradientTypeLabel: "Τύπος", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Δωρεάν online μετατροπείς",
    siteDescription:
      "Μετατρέψτε μονάδες, χρώματα, μορφές δεδομένων, ημερομηνίες και πολλά ακόμα. Δωρεάν, γρήγορα και ιδιωτικά — όλα τρέχουν στον browser σας.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Συμβουλές, οδηγοί και γνώσεις για μετατροπή μονάδων, μορφές δεδομένων και πολλά ακόμα.",
    readMore: "Διαβάστε περισσότερα",
    backToBlog: "Πίσω στο blog",
    publishedOn: "Δημοσιεύτηκε",
    categoryGuide: "Οδηγός",
    categoryTips: "Συμβουλές",
    categoryKnowledge: "Γνώσεις",
  },
  cookie: {
    message:
      "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας. Συνεχίζοντας, αποδέχεστε την πολιτική cookies μας.",
    accept: "Αποδοχή",
    decline: "Απόρριψη",
  },
  unitLabels: {
    length: {
      m: "Μέτρο (m)", km: "Χιλιόμετρο (km)", cm: "Εκατοστό (cm)", mm: "Χιλιοστό (mm)",
      mi: "Μίλι (mi)", yd: "Γιάρδα (yd)", ft: "Πόδι (ft)", in: "Ίντσα (in)",
      nm: "Ναυτικό μίλι (nm)", "\u03BCm": "Μικρόμετρο (\u03BCm)",
    },
    weight: {
      kg: "Κιλό (kg)", g: "Γραμμάριο (g)", mg: "Χιλιοστόγραμμο (mg)", lb: "Λίβρα (lb)",
      oz: "Ουγγιά (oz)", ton: "Μετρικός τόνος (t)", st: "Stone (st)", ct: "Καράτι (ct)",
    },
    temperature: { C: "Κελσίου (\u00B0C)", F: "Φαρενάιτ (\u00B0F)", K: "Κέλβιν (K)" },
    area: {
      "m\u00B2": "Τετραγωνικό μέτρο (m\u00B2)", "km\u00B2": "Τετραγωνικό χιλιόμετρο (km\u00B2)",
      ha: "Εκτάριο (ha)", acre: "Στρέμμα", "ft\u00B2": "Τετραγωνικό πόδι (ft\u00B2)",
      "mi\u00B2": "Τετραγωνικό μίλι (mi\u00B2)", "yd\u00B2": "Τετραγωνική γιάρδα (yd\u00B2)",
      "cm\u00B2": "Τετραγωνικό εκατοστό (cm\u00B2)",
    },
    volume: {
      L: "Λίτρο (L)", mL: "Χιλιοστόλιτρο (mL)", gal: "Γαλόνι US (gal)",
      "fl oz": "Υγρή ουγγιά US (fl oz)", cup: "Φλιτζάνι US", pt: "Πίντα US (pt)",
      qt: "Τέταρτο US (qt)", "m\u00B3": "Κυβικό μέτρο (m\u00B3)",
      "cm\u00B3": "Κυβικό εκατοστό (cm\u00B3)", tbsp: "Κουτάλι σούπας (tbsp)", tsp: "Κουταλάκι (tsp)",
    },
    speed: {
      "m/s": "Μέτρο/δ (m/s)", "km/h": "Χιλιόμετρο/ώ (km/h)", mph: "Μίλι/ώ (mph)",
      kn: "Κόμβος (kn)", "ft/s": "Πόδι/δ (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Χιλιοστό δευτερολέπτου (ms)", s: "Δευτερόλεπτο (s)", min: "Λεπτό (min)", h: "Ώρα (h)",
      d: "Ημέρα (d)", wk: "Εβδομάδα (wk)", mo: "Μήνας (mo)", yr: "Χρόνος (yr)",
    },
    pressure: {
      Pa: "Πασκάλ (Pa)", kPa: "Κιλοπασκάλ (kPa)", bar: "Μπαρ", psi: "PSI",
      atm: "Ατμόσφαιρα (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Τζάουλ (J)", kJ: "Κιλοτζάουλ (kJ)", cal: "Θερμίδα (cal)", kcal: "Κιλοθερμίδα (kcal)",
      Wh: "Βατώρα (Wh)", kWh: "Κιλοβατώρα (kWh)", BTU: "BTU", eV: "Ηλεκτρονιοβόλτ (eV)",
    },
    power: {
      W: "Βατ (W)", kW: "Κιλοβάτ (kW)", MW: "Μεγαβάτ (MW)", hp: "Ίππος (hp)",
      "BTU/h": "BTU/ώ", "cal/s": "Θερμίδα/δ",
    },
    frequency: {
      Hz: "Χερτζ (Hz)", kHz: "Κιλοχέρτζ (kHz)", MHz: "Μεγαχέρτζ (MHz)",
      GHz: "Γιγαχέρτζ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Μοίρα (\u00B0)", rad: "Ακτίνιο (rad)", grad: "Βαθμίδα (grad)",
      turn: "Στροφή", arcmin: "Λεπτό τόξου (\u2032)", arcsec: "Δευτερόλεπτο τόξου (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Φλιτζάνι", tbsp: "Κουτάλι σούπας", tsp: "Κουταλάκι", mL: "Χιλιοστόλιτρο (mL)",
      L: "Λίτρο (L)", fl_oz: "Υγρή ουγγιά", g: "Γραμμάριο (g)", kg: "Κιλό (kg)",
      oz: "Ουγγιά (oz)", lb: "Λίβρα (lb)",
    },
    "oven-temperature": { C: "Κελσίου (\u00B0C)", F: "Φαρενάιτ (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixels (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixels (px)", em: "Em (em)" },
    "px-percent": { px: "Pixels (px)", "%": "Ποσοστό (%)" },
    "css-unit": {
      px: "Pixels (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Ποσοστό (%)", vw: "Πλάτος viewport (vw)", vh: "Ύψος viewport (vh)",
    },
  },
};

export default dict;
