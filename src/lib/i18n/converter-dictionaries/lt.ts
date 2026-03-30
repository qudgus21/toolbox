import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Visi konvertavimo įrankiai vienoje vietoje",
    titleAccent: "konvertavimo",
    description:
      "Konvertuokite vienetus, spalvas, duomenų formatus, datas ir daugiau. Viskas naršyklėje.",
    tabAll: "Visi",
    categoryUnit: "Vienetai",
    categoryNumber: "Skaičiai",
    categoryColor: "Spalvos",
    categoryDatetime: "Data/Laikas",
    categoryData: "Duomenys",
    categoryCss: "CSS",
    categoryCooking: "Virimas",
    categoryGeography: "Geografija",
    searchPlaceholder: "Ieškoti konverterių...",
    noResults: "Konverterių nerasta.",
    recentTools: "Neseniai naudoti",
    favorites: "Mėgstamiausi",
    favDragHint: "Vilkite, kad pertvarytumėte",
    favHint: "Spustelėkite žvaigždutę, kad pridėtumėte prie mėgstamiausių",
    gridView: "Tinklelio rodinys",
    listView: "Sąrašo rodinys",
  },
  trust: {
    encryption: "Saugus apdorojimas",
    encryptionDesc: "Visos konversijos vyksta lokaliai jūsų naršyklėje",
    autoDelete: "Duomenys nesaugomi",
    autoDeleteDesc: "Jūsų įvestis niekada neišsaugoma ir nesiunčiama į serverį",
    free: "100% nemokama",
    freeDesc: "Be apribojimų, be registracijos, be paslėptų mokesčių",
    browserProcessing: "Momentiniai rezultatai",
    browserProcessingDesc: "Konversija realiuoju laiku renkant tekstą",
  },
  tools: {
    length: {
      title: "Ilgio konverteris",
      description:
        "Konvertuokite tarp metrų, kilometrų, mylių, pėdų, colių ir daugiau.",
    },
    weight: {
      title: "Svorio konverteris",
      description:
        "Konvertuokite tarp kilogramų, svarų, uncijų, tonų ir daugiau.",
    },
    temperature: {
      title: "Temperatūros konverteris",
      description: "Konvertuokite tarp Celsijaus, Fahrenheito ir Kelvino.",
    },
    area: {
      title: "Ploto konverteris",
      description:
        "Konvertuokite tarp kvadratinių metrų, hektarų, akrų, kvadratinių pėdų ir daugiau.",
    },
    volume: {
      title: "Tūrio konverteris",
      description:
        "Konvertuokite tarp litrų, galonų, puodelių, skysčio uncijų ir daugiau.",
    },
    speed: {
      title: "Greičio konverteris",
      description: "Konvertuokite tarp m/s, km/h, mph, mazgų ir daugiau.",
    },
    time: {
      title: "Laiko konverteris",
      description:
        "Konvertuokite tarp sekundžių, minučių, valandų, dienų, savaičių ir daugiau.",
    },
    pressure: {
      title: "Slėgio konverteris",
      description:
        "Konvertuokite tarp Paskalio, baro, PSI, atmosferos ir daugiau.",
    },
    energy: {
      title: "Energijos konverteris",
      description:
        "Konvertuokite tarp džaulių, kalorijų, kilovatvalandžių, BTU ir daugiau.",
    },
    power: {
      title: "Galios konverteris",
      description:
        "Konvertuokite tarp vatų, kilovatų, arklio galių ir daugiau.",
    },
    frequency: {
      title: "Dažnio konverteris",
      description:
        "Konvertuokite tarp hercų, kilohercų, megahercų, gigahercų ir RPM.",
    },
    angle: {
      title: "Kampo konverteris",
      description: "Konvertuokite tarp laipsnių, radianų, gradų ir apsisukimų.",
    },
    "data-storage": {
      title: "Duomenų saugyklos konverteris",
      description:
        "Konvertuokite tarp baitų, kilobaitų, megabaitų, gigabaitų ir daugiau.",
    },
    "fuel-economy": {
      title: "Degalų sąnaudų konverteris",
      description: "Konvertuokite tarp km/L, mpg ir L/100km.",
    },
    "number-base": {
      title: "Skaičių sistemos konverteris",
      description:
        "Konvertuokite tarp dvejetainės, aštuntainės, dešimtainės, šešioliktainės ir pasirinktinių sistemų.",
    },
    "roman-numeral": {
      title: "Romėniškų skaičių konverteris",
      description: "Konvertuokite tarp romėniškų ir arabiškų skaičių.",
    },
    "scientific-notation": {
      title: "Mokslinio žymėjimo konverteris",
      description:
        "Konvertuokite tarp mokslinio žymėjimo ir standartinių skaičių.",
    },
    "fraction-decimal": {
      title: "Trupmena ↔ Dešimtainė",
      description: "Konvertuokite tarp trupmenų ir dešimtainių skaičių.",
    },
    percentage: {
      title: "Procentų konverteris",
      description:
        "Konvertuokite tarp trupmenų, dešimtainių ir procentų.",
    },
    "color-converter": {
      title: "Spalvų konverteris",
      description:
        "Konvertuokite tarp HEX, RGB, HSL, HSV ir CMYK spalvų formatų.",
    },
    "color-palette-generator": {
      title: "Spalvų paletės generatorius",
      description:
        "Generuokite papildomas, triadines ir analogiškas spalvų paletes.",
    },
    "gradient-generator": {
      title: "CSS Gradiento generatorius",
      description:
        "Kurkite linijinius, radialinius ir kūginius CSS gradientus su tiesiogine peržiūra.",
    },
    "color-contrast-checker": {
      title: "Spalvų kontrasto tikrintuvas",
      description:
        "Patikrinkite WCAG AA/AAA spalvų kontrasto santykį tarp dviejų spalvų.",
    },
    "color-blindness-simulator": {
      title: "Spalvų aklumo simuliatorius",
      description:
        "Simuliuokite, kaip spalvas mato žmonės su spalvų regos trūkumais.",
    },
    timezone: {
      title: "Laiko juostų konverteris",
      description:
        "Konvertuokite laiką tarp skirtingų laiko juostų visame pasaulyje.",
    },
    "unix-timestamp": {
      title: "Unix laiko žymos konverteris",
      description:
        "Konvertuokite tarp Unix laiko žymų ir suprantamų datų.",
    },
    "date-format": {
      title: "Datos formato konverteris",
      description:
        "Konvertuokite datas tarp skirtingų formatų (ISO, US, EU ir daugiau).",
    },
    "date-calculator": {
      title: "Datos skaičiuotuvas",
      description:
        "Apskaičiuokite skirtumą tarp datų arba pridėkite/atimkite dienas.",
    },
    "age-calculator": {
      title: "Amžiaus skaičiuotuvas",
      description:
        "Apskaičiuokite tikslų amžių pagal gimimo datą metais, mėnesiais ir dienomis.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Konvertuokite tarp JSON ir YAML duomenų formatų.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Konvertuokite tarp JSON masyvų ir CSV lentelių formato.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Konvertuokite tarp JSON ir XML duomenų formatų.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Konvertuokite tarp JSON ir TOML konfigūracijos formatų.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Konvertuokite tarp Markdown ir HTML žymėjimo.",
    },
    "csv-table": {
      title: "CSV į lentelę",
      description: "Paverskite CSV duomenis Markdown arba HTML lentele.",
    },
    "json-typescript": {
      title: "JSON į TypeScript",
      description: "Sugeneruokite TypeScript sąsajas iš JSON duomenų.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Konvertuokite tarp SQL INSERT sakinių ir JSON duomenų.",
    },
    "px-rem": {
      title: "px ↔ rem konverteris",
      description:
        "Konvertuokite tarp pikselių ir rem vienetų su pasirinktiniu baziniu dydžiu.",
    },
    "px-em": {
      title: "px ↔ em konverteris",
      description:
        "Konvertuokite tarp pikselių ir em vienetų su pasirinktiniu tėvinio elemento dydžiu.",
    },
    "px-percent": {
      title: "px ↔ % konverteris",
      description:
        "Konvertuokite tarp pikselių ir procentų su pasirinktiniu konteinerio pločiu.",
    },
    "css-unit": {
      title: "CSS vienetų konverteris",
      description:
        "Konvertuokite tarp px, rem, em, %, vw, vh ir kitų CSS vienetų.",
    },
    "css-minifier": {
      title: "CSS glaudintuvė / formatuotuvė",
      description:
        "Suglaudinkite arba suformatuokite CSS kodą gamybai arba skaitomumui.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Konvertuokite tarp Tailwind CSS klasių ir įprasto CSS.",
    },
    "cooking-measurement": {
      title: "Virtuvės matų konverteris",
      description:
        "Konvertuokite tarp puodelių, šaukštų, šaukštelių, mililitrų ir gramų.",
    },
    "recipe-scaler": {
      title: "Recepto mastelio keitiklis",
      description:
        "Keiskite recepto ingredientų kiekius pagal porcijų skaičių.",
    },
    "oven-temperature": {
      title: "Orkaitės temperatūros konverteris",
      description:
        "Konvertuokite tarp Celsijaus, Fahrenheito ir Gas Mark orkaitės temperatūroms.",
    },
    coordinate: {
      title: "Koordinačių konverteris",
      description:
        "Konvertuokite tarp DMS, DD ir DDM koordinačių formatų.",
    },
    "distance-calculator": {
      title: "Atstumo skaičiuotuvas",
      description:
        "Apskaičiuokite atstumą tarp dviejų geografinių koordinačių.",
    },
  },
  nav: {
    allTools: "Visi konverteriai",
    language: "Kalba",
  },
  footer: {
    tools: "Konverteriai",
    legal: "Teisinė informacija",
    privacy: "Privatumo politika",
    terms: "Paslaugų sąlygos",
    copyright: "ToolPop. Visos teisės saugomos.",
    company: "Įmonė",
    about: "Apie mus",
    contact: "Kontaktai",
    faq: "DUK",
  },
  common: {
    backToAll: "Visi konverteriai",
    inputPlaceholder: "Įveskite reikšmę konvertavimui...",
    outputLabel: "Rezultatas",
    copyToClipboard: "Kopijuoti į iškarpinę",
    copied: "Nukopijuota!",
    clear: "Išvalyti",
    paste: "Įklijuoti",
    processing: "Konvertuojama...",
    startOver: "Pradėti iš naujo",
    process: "Konvertuoti",
    tryAgain: "Bandyti dar kartą",
    notImplemented: "Šis konverteris netrukus pasirodys.",
    tryOtherTools: "Išbandykite kitus konverterius",
    privacyBadge: "Visos konversijos vyksta jūsų naršyklėje",
    favoriteAdded: "Pridėta prie mėgstamiausių",
    favoriteRemoved: "Pašalinta iš mėgstamiausių",
    comingSoon: "Netrukus",
    share: "Dalintis",
    shareTitle: "Dalintis šiuo konverteriu",
    shareSubtitle: "Pasidalinkite šiuo naudingu konverteriu su kitais",
    shareCopied: "Nuoroda nukopijuota!",
    shareCopyLink: "Kopijuoti nuorodą",
    downloadAsFile: "Atsisiųsti",
    options: "Parinktys",
    input: "Įvestis",
    output: "Išvestis",
    convert: "Konvertuoti",
    swap: "Sukeisti",
    from: "Iš",
    to: "Į",
    result: "Rezultatas",
    allConversions: "Visos konversijos",
    details: "Detalės",
    pageNotFound: "Konverteris nerastas",
    goHome: "Grįžti prie visų konverterių",
    colorPickerLabel: "Spalvų parinkiklis",
  },
  toolOptions: {
    fromUnit: "Iš",
    toUnit: "Į",
    precision: "Dešimtainiai skaičiai",
    baseSize: "Bazinis šrifto dydis (px)",
    parentSize: "Tėvinio elemento šrifto dydis (px)",
    containerWidth: "Konteinerio plotis (px)",
    viewportWidth: "Peržiūros plotis (px)",
    viewportHeight: "Peržiūros aukštis (px)",
    direction: "Kryptis",
    mode: "Režimas",
    ingredient: "Ingredientas",
    water: "Vanduo",
    flour: "Miltai",
    sugar: "Cukrus",
    butter: "Sviestas",
    rice: "Ryžiai",
    milk: "Pienas",
    originalServings: "Pradinės porcijos",
    targetServings: "Norimos porcijos",
    fromTimezone: "Iš laiko juostos",
    toTimezone: "Į laiko juostą",
    inputFormat: "Įvesties formatas",
    outputFormat: "Išvesties formatas",
    harmony: "Spalvų harmonija",
    complementary: "Papildoma",
    triadic: "Triadinė",
    analogous: "Analogiška",
    splitComplementary: "Padalinta papildoma",
    tetradic: "Tetradinė",
    gradientType: "Gradiento tipas",
    linear: "Linijinis",
    radial: "Radialinis",
    conic: "Kūginis",
    gradientAngle: "Kampas (deg)",
    rootName: "Šakninės sąsajos pavadinimas",
    tableName: "Lentelės pavadinimas",
    minify: "Suglaudinti",
    beautify: "Suformatuoti",
    colorType: "Trūkumo tipas",
    protanopia: "Protanopija (be raudonos)",
    deuteranopia: "Deuteranopija (be žalios)",
    tritanopia: "Tritanopija (be mėlynos)",
    achromatopsia: "Achromatopsija (be spalvų)",
    operation: "Operacija",
    difference: "Skirtumas",
    add: "Pridėti",
    subtract: "Atimti",
    amount: "Kiekis",
    unit: "Vienetas",
    days: "Dienos",
    weeks: "Savaitės",
    months: "Mėnesiai",
    years: "Metai",
    fromBase: "Iš bazės",
    toBase: "Į bazę",
    binary: "Dvejetainė (2)",
    octal: "Aštuntainė (8)",
    decimal: "Dešimtainė (10)",
    hexadecimal: "Šešioliktainė (16)",
    seconds: "Sekundės",
    milliseconds: "Milisekundės",
    autoDetect: "Automatinis aptikimas",
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
    markdown: "Markdown lentelė",
    html: "HTML lentelė",
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
    toRoman: "Skaičius → Romėniškas",
    toArabic: "Romėniškas → Skaičius",
    toScientific: "Standartinis → Mokslinis",
    toStandard: "Mokslinis → Standartinis",
    toFraction: "Dešimtainė → Trupmena",
    toDecimal: "Trupmena → Dešimtainė",
    decimalToPercent: "Dešimtainė → Procentas",
    percentToDecimal: "Procentas → Dešimtainė",
    fractionToPercent: "Trupmena → Procentas",
    dd: "Dešimtainiai laipsniai (DD)",
    dms: "Laipsniai minutės sekundės (DMS)",
    ddm: "Laipsniai dešimtainės minutės (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Ilgas formatas",
    short: "Trumpas formatas",
    relative: "Santykinis",
    celsius: "Celsijus (°C)",
    fahrenheit: "Fahrenheitas (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Fono spalva",
    monochromatic: "Monochromatinė",
    timestampToDate: "Laiko žyma → Data",
    dateToTimestamp: "Data → Laiko žyma",
    showDetails: "Rodyti išsamią analizę",
    addDays: "Pridėti dienų",
    subtractDays: "Atimti dienų",
    datetimeHint: "pvz. 2024-01-15, 1705312200, now",
    endDate: "Pabaigos data",
    today: "Šiandien (numatyta)",
    dateUnit: "Vienetas",
  },
  statsLabels: {
    lines: "Eilutės",
    characters: "Simboliai",
    rows: "Eilutės",
    columns: "Stulpeliai",
    elements: "Elementai",
    keys: "Raktai",
    interfaces: "Sąsajos",
    properties: "Savybės",
    originalSize: "Pradinis dydis",
    resultSize: "Rezultato dydis",
    savings: "Sutaupymas",
    ingredients: "Ingredientai",
    scaleFactor: "Mastelio koeficientas",
    contrastRatio: "Kontrasto santykis",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Platuma",
    longitude: "Ilguma",
    distanceKm: "Atstumas (km)",
    distanceMi: "Atstumas (mi)",
    years: "Metai",
    months: "Mėnesiai",
    days: "Dienos",
  },
  processorMessages: {
    invalidTimezone: "Netinkama laiko juosta",
    pass: "Tinka", fail: "Netinka",
    fromNow: "nuo dabar", ago: "prieš",
    today: "Šiandien", tomorrow: "Rytoj", yesterday: "Vakar",
    seconds: "sekundė", secondsPlural: "sekundės",
    minutes: "minutė", minutesPlural: "minutės",
    hours: "valanda", hoursPlural: "valandos",
    daysUnit: "diena", daysPlural: "dienos",
    weeksUnit: "savaitė", weeksPlural: "savaitės",
    monthsUnit: "mėnuo", monthsPlural: "mėnesiai",
    yearsUnit: "metai", yearsPlural: "metai",
    gasmark: "Gas Mark",
    veryCool: "Labai vėsu", cool: "Vėsu", moderatelyCool: "Vidutiniškai vėsu",
    moderate: "Vidutinė", moderatelyHot: "Vidutiniškai karšta",
    hot: "Karšta", veryHot: "Labai karšta", extremelyHot: "Itin karšta",
    gasMark: "Gas Mark",
    original: "Originalas",
    from: "Iš", to: "Į",
    totalDays: "Iš viso dienų", weeksDays: "Savaitės + Dienos",
    originalDate: "Pradinė data", operationLabel: "Operacija",
    resultDate: "Rezultato data", dayOfWeek: "Savaitės diena",
    daysBetween: "Dienų skirtumas",
    age: "Amžius", totalMonths: "Iš viso mėnesių",
    totalHours: "Iš viso valandų", totalMinutes: "Iš viso minučių",
    nextBirthday: "Kitas gimtadienis",
    roman: "Romėniškas", arabic: "Arabiškas",
    scientific: "Mokslinis", standard: "Standartinis", engineering: "Inžinerinis",
    fraction: "Trupmena", simplified: "Supaprastinta", percentage: "Procentas",
    color1: "Spalva 1", color2: "Spalva 2",
    contrastRatioLabel: "Kontrasto santykis",
    aaNormalText: "AA normalus tekstas", aaLargeText: "AA didelis tekstas",
    aaaNormalText: "AAA normalus tekstas", aaaLargeText: "AAA didelis tekstas",
    gradientTypeLabel: "Tipas", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Konverteris — Nemokami konverteriai internete",
    siteDescription:
      "Konvertuokite vienetus, spalvas, duomenų formatus, datas ir daugiau. Nemokama, greita ir privatu — viskas veikia jūsų naršyklėje.",
    toolTitleSuffix: "| ToolPop Konverteris",
  },
  blog: {
    title: "Tinklaraštis",
    description:
      "Patarimai, vadovai ir žinios apie vienetų konvertavimą, duomenų formatus ir daugiau.",
    readMore: "Skaityti daugiau",
    backToBlog: "Grįžti į tinklaraštį",
    publishedOn: "Paskelbta",
    categoryGuide: "Vadovas",
    categoryTips: "Patarimai",
    categoryKnowledge: "Žinios",
  },
  cookie: {
    message:
      "Naudojame slapukus, kad pagerintume jūsų patirtį. Tęsdami sutinkate su mūsų slapukų politika.",
    accept: "Sutinku",
    decline: "Nesutinku",
  },
  unitLabels: {
    length: {
      m: "Metras (m)", km: "Kilometras (km)", cm: "Centimetras (cm)", mm: "Milimetras (mm)",
      mi: "Mylia (mi)", yd: "Jardas (yd)", ft: "Pėda (ft)", in: "Colis (in)",
      nm: "Jūrmylė (nm)", "\u03BCm": "Mikrometras (\u03BCm)",
    },
    weight: {
      kg: "Kilogramas (kg)", g: "Gramas (g)", mg: "Miligramas (mg)", lb: "Svaras (lb)",
      oz: "Uncija (oz)", ton: "Metrinė tona (t)", st: "Stonas (st)", ct: "Karatas (ct)",
    },
    temperature: { C: "Celsijus (\u00B0C)", F: "Fahrenheitas (\u00B0F)", K: "Kelvinas (K)" },
    area: {
      "m\u00B2": "Kvadratinis metras (m\u00B2)", "km\u00B2": "Kvadratinis kilometras (km\u00B2)",
      ha: "Hektaras (ha)", acre: "Akras", "ft\u00B2": "Kvadratinė pėda (ft\u00B2)",
      "mi\u00B2": "Kvadratinė mylia (mi\u00B2)", "yd\u00B2": "Kvadratinis jardas (yd\u00B2)",
      "cm\u00B2": "Kvadratinis centimetras (cm\u00B2)",
    },
    volume: {
      L: "Litras (L)", mL: "Mililitras (mL)", gal: "JAV galonas (gal)",
      "fl oz": "JAV skysčio uncija (fl oz)", cup: "JAV puodelis", pt: "JAV pinta (pt)",
      qt: "JAV kvorta (qt)", "m\u00B3": "Kubinis metras (m\u00B3)",
      "cm\u00B3": "Kubinis centimetras (cm\u00B3)", tbsp: "Valgomasis šaukštas (tbsp)", tsp: "Arbatinis šaukštelis (tsp)",
    },
    speed: {
      "m/s": "Metras/sek. (m/s)", "km/h": "Kilometras/val. (km/h)", mph: "Mylia/val. (mph)",
      kn: "Mazgas (kn)", "ft/s": "Pėda/sek. (ft/s)", mach: "Machas",
    },
    time: {
      ms: "Milisekundė (ms)", s: "Sekundė (s)", min: "Minutė (min)", h: "Valanda (h)",
      d: "Diena (d)", wk: "Savaitė (wk)", mo: "Mėnuo (mo)", yr: "Metai (yr)",
    },
    pressure: {
      Pa: "Paskalis (Pa)", kPa: "Kilopaskalis (kPa)", bar: "Baras", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Toras", mmHg: "mmHg",
    },
    energy: {
      J: "Džaulis (J)", kJ: "Kilodžaulis (kJ)", cal: "Kalorija (cal)", kcal: "Kilokalorija (kcal)",
      Wh: "Vatvalandė (Wh)", kWh: "Kilovatvalandė (kWh)", BTU: "BTU", eV: "Elektronvoltas (eV)",
    },
    power: {
      W: "Vatas (W)", kW: "Kilovatas (kW)", MW: "Megavatas (MW)", hp: "Arklio galia (hp)",
      "BTU/h": "BTU/val.", "cal/s": "Kalorija/sek.",
    },
    frequency: {
      Hz: "Hercas (Hz)", kHz: "Kilohercas (kHz)", MHz: "Megahercas (MHz)",
      GHz: "Gigahercas (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Laipsnis (\u00B0)", rad: "Radianas (rad)", grad: "Gradanas (grad)",
      turn: "Apsisukimas", arcmin: "Kampo minutė (\u2032)", arcsec: "Kampo sekundė (\u2033)",
    },
    "data-storage": {
      B: "Baitas (B)", KB: "Kilobaitas (KB)", MB: "Megabaitas (MB)", GB: "Gigabaitas (GB)",
      TB: "Terabaitas (TB)", PB: "Petabaitas (PB)", bit: "Bitas",
      Kbit: "Kilobitas", Mbit: "Megabitas", Gbit: "Gigabitas",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (JAV)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Puodelis", tbsp: "Valgomasis šaukštas", tsp: "Arbatinis šaukštelis", mL: "Mililitras (mL)",
      L: "Litras (L)", fl_oz: "Skysčio uncija", g: "Gramas (g)", kg: "Kilogramas (kg)",
      oz: "Uncija (oz)", lb: "Svaras (lb)",
    },
    "oven-temperature": { C: "Celsijus (\u00B0C)", F: "Fahrenheitas (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pikseliai (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pikseliai (px)", em: "Em (em)" },
    "px-percent": { px: "Pikseliai (px)", "%": "Procentai (%)" },
    "css-unit": {
      px: "Pikseliai (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procentai (%)", vw: "Viewport plotis (vw)", vh: "Viewport aukštis (vh)",
    },
  },
};

export default dict;
