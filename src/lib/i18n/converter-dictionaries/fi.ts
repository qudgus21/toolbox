import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Kaikki tarvitsemasi muunnostyökalut",
    titleAccent: "muunnos",
    description:
      "Muunna yksiköitä, värejä, tietomuotoja, päivämääriä ja muuta. Kaikki suoraan selaimessa.",
    tabAll: "Kaikki",
    categoryUnit: "Yksiköt",
    categoryNumber: "Luvut",
    categoryColor: "Värit",
    categoryDatetime: "Päivä/Aika",
    categoryData: "Data",
    categoryCss: "CSS",
    categoryCooking: "Ruoanlaitto",
    categoryGeography: "Maantiede",
    searchPlaceholder: "Hae muuntimia...",
    noResults: "Muuntimia ei löytynyt.",
    recentTools: "Viimeksi käytetyt",
    favorites: "Suosikit",
    favDragHint: "Vedä järjestääksesi uudelleen",
    favHint: "Napsauta tähteä lisätäksesi suosikkeihin",
    gridView: "Ruudukkonäkymä",
    listView: "Listanäkymä",
  },
  trust: {
    encryption: "Turvallinen käsittely",
    encryptionDesc: "Kaikki muunnokset tapahtuvat paikallisesti selaimessasi",
    autoDelete: "Tietoja ei tallenneta",
    autoDeleteDesc: "Syöttämääsi tietoa ei koskaan tallenneta tai lähetetä palvelimelle",
    free: "100 % ilmainen",
    freeDesc: "Ei rajoituksia, ei rekisteröitymistä, ei piilokustannuksia",
    browserProcessing: "Välitön tulos",
    browserProcessingDesc: "Reaaliaikainen muunnos kirjoittaessasi",
  },
  tools: {
    length: {
      title: "Pituusmuunnin",
      description:
        "Muunna metrien, kilometrien, mailien, jalkojen, tuumien ja muiden välillä.",
    },
    weight: {
      title: "Painomuunnin",
      description:
        "Muunna kilogrammojen, paunojen, unssien, tonnien ja muiden välillä.",
    },
    temperature: {
      title: "Lämpötilamuunnin",
      description: "Muunna Celsius-, Fahrenheit- ja Kelvin-asteiden välillä.",
    },
    area: {
      title: "Pinta-alamuunnin",
      description:
        "Muunna neliömetrien, hehtaarien, eekkerien, neliöjalkojen ja muiden välillä.",
    },
    volume: {
      title: "Tilavuusmuunnin",
      description:
        "Muunna litrojen, gallonojen, kuppien, nesteunssin ja muiden välillä.",
    },
    speed: {
      title: "Nopeusmuunnin",
      description: "Muunna m/s, km/h, mph, solmujen ja muiden välillä.",
    },
    time: {
      title: "Aikamuunnin",
      description:
        "Muunna sekuntien, minuuttien, tuntien, päivien, viikkojen ja muiden välillä.",
    },
    pressure: {
      title: "Painemuunnin",
      description:
        "Muunna Pascalien, barien, PSI:n, ilmakehien ja muiden välillä.",
    },
    energy: {
      title: "Energiamuunnin",
      description:
        "Muunna joulien, kalorien, kilowattituntien, BTU:n ja muiden välillä.",
    },
    power: {
      title: "Tehomuunnin",
      description:
        "Muunna wattien, kilowattien, hevosvoimien ja muiden välillä.",
    },
    frequency: {
      title: "Taajuusmuunnin",
      description:
        "Muunna hertsien, kilohertsien, megahertsien, gigahertsien ja RPM:n välillä.",
    },
    angle: {
      title: "Kulmamuunnin",
      description: "Muunna asteiden, radiaanien, graadien ja kierrosten välillä.",
    },
    "data-storage": {
      title: "Tallennustilamuunnin",
      description:
        "Muunna tavujen, kilotavujen, megatavujen, gigatavujen ja muiden välillä.",
    },
    "fuel-economy": {
      title: "Polttoainetalousmuunnin",
      description: "Muunna km/L, mpg ja L/100km välillä.",
    },
    "number-base": {
      title: "Lukujärjestelmämuunnin",
      description:
        "Muunna binääri-, oktaali-, desimaali-, heksadesimaali- ja muiden lukujärjestelmien välillä.",
    },
    "roman-numeral": {
      title: "Roomalaiset numerot",
      description: "Muunna roomalaisten ja arabialaisten numeroiden välillä.",
    },
    "scientific-notation": {
      title: "Tieteellinen merkintätapa",
      description:
        "Muunna tieteellisen merkintätavan ja standardilukujen välillä.",
    },
    "fraction-decimal": {
      title: "Murtoluku ↔ Desimaali",
      description: "Muunna murtolukujen ja desimaalilukujen välillä.",
    },
    percentage: {
      title: "Prosenttimuunnin",
      description:
        "Muunna murtolukujen, desimaalilukujen ja prosenttien välillä.",
    },
    "color-converter": {
      title: "Värimuunnin",
      description:
        "Muunna HEX-, RGB-, HSL-, HSV- ja CMYK-värimuotojen välillä.",
    },
    "color-palette-generator": {
      title: "Väripalettien luonti",
      description:
        "Luo komplementaarisia, triadisia ja analogisia väripaletteja.",
    },
    "gradient-generator": {
      title: "CSS Gradient -generaattori",
      description:
        "Luo lineaarisia, radiaalisia ja kartiomaisia CSS-liukuvärejä esikatselulla.",
    },
    "color-contrast-checker": {
      title: "Värikontrastin tarkistus",
      description:
        "Tarkista kahden värin WCAG AA/AAA -kontrastisuhde.",
    },
    "color-blindness-simulator": {
      title: "Värisokeus-simulaattori",
      description:
        "Simuloi, miten värisokeudesta kärsivät näkevät värit.",
    },
    timezone: {
      title: "Aikavyöhykemuunnin",
      description:
        "Muunna aikaa eri aikavyöhykkeiden välillä ympäri maailman.",
    },
    "unix-timestamp": {
      title: "Unix-aikaleima-muunnin",
      description:
        "Muunna Unix-aikaleimojen ja luettavien päivämäärien välillä.",
    },
    "date-format": {
      title: "Päivämäärämuotomuunnin",
      description:
        "Muunna päivämääriä ISO-, US-, EU- ja muiden muotojen välillä.",
    },
    "date-calculator": {
      title: "Päivämäärälaskin",
      description:
        "Laske päivämäärien välinen ero tai lisää/vähennä päiviä.",
    },
    "age-calculator": {
      title: "Ikälaskin",
      description:
        "Laske tarkka ikä syntymäpäivästä vuosina, kuukausina ja päivinä.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Muunna JSON- ja YAML-tiedostomuotojen välillä.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Muunna JSON-taulukoiden ja CSV-taulukkomuodon välillä.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Muunna JSON- ja XML-tiedostomuotojen välillä.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Muunna JSON- ja TOML-asetusmuotojen välillä.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Muunna Markdownin ja HTML:n välillä.",
    },
    "csv-table": {
      title: "CSV taulukoksi",
      description: "Muunna CSV-data Markdown- tai HTML-taulukoiksi.",
    },
    "json-typescript": {
      title: "JSON TypeScriptiksi",
      description: "Luo TypeScript-rajapinnat JSON-datasta.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Muunna SQL INSERT -lauseiden ja JSON-datan välillä.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Muunna pikselien ja rem-yksikön välillä mukautetulla peruskoolla.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Muunna pikselien ja em-yksikön välillä mukautetulla yläelementin koolla.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Muunna pikselien ja prosentin välillä mukautetulla säiliön leveydellä.",
    },
    "css-unit": {
      title: "CSS-yksikkömuunnin",
      description:
        "Muunna px, rem, em, %, vw, vh ja muiden CSS-yksiköiden välillä.",
    },
    "css-minifier": {
      title: "CSS-minifoija / -muotoilija",
      description:
        "Minifoi tai muotoile CSS-koodi tuotantoa tai luettavuutta varten.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Muunna Tailwind CSS -luokkien ja tavallisen CSS:n välillä.",
    },
    "cooking-measurement": {
      title: "Ruokamittojen muunnin",
      description:
        "Muunna kuppien, ruokalusikkojen, teelusikkojen, millilitrojen ja grammojen välillä.",
    },
    "recipe-scaler": {
      title: "Reseptiskaalain",
      description:
        "Skaalaa reseptin ainesosat ylös tai alas annosmäärän mukaan.",
    },
    "oven-temperature": {
      title: "Uunilämpötilamuunnin",
      description:
        "Muunna uunilämpötiloja Celsiuksen, Fahrenheitin ja Gas Markin välillä.",
    },
    coordinate: {
      title: "Koordinaattimuunnin",
      description:
        "Muunna DMS-, DD- ja DDM-koordinaattimuotojen välillä.",
    },
    "distance-calculator": {
      title: "Etäisyyslaskin",
      description:
        "Laske etäisyys kahden maantieteellisen koordinaatin välillä.",
    },
  },
  nav: {
    allTools: "Kaikki muuntimet",
    language: "Kieli",
  },
  footer: {
    tools: "Muuntimet",
    legal: "Oikeudelliset tiedot",
    privacy: "Tietosuojakäytäntö",
    terms: "Käyttöehdot",
    copyright: "ToolPop. Kaikki oikeudet pidätetään.",
    company: "Yritys",
    about: "Tietoa meistä",
    contact: "Yhteystiedot",
    faq: "FAQ",
  },
  common: {
    backToAll: "Kaikki muuntimet",
    inputPlaceholder: "Syötä muunnettava arvo...",
    outputLabel: "Tulos",
    copyToClipboard: "Kopioi",
    copied: "Kopioitu!",
    clear: "Tyhjennä",
    paste: "Liitä",
    processing: "Muunnetaan...",
    startOver: "Aloita alusta",
    process: "Muunna",
    tryAgain: "Yritä uudelleen",
    notImplemented: "Tämä muunnin on tulossa pian.",
    tryOtherTools: "Kokeile muita muuntimia",
    privacyBadge: "Kaikki muunnokset tapahtuvat selaimessasi",
    favoriteAdded: "Lisätty suosikkeihin",
    favoriteRemoved: "Poistettu suosikeista",
    comingSoon: "Tulossa pian",
    share: "Jaa",
    shareTitle: "Jaa tämä muunnin",
    shareSubtitle: "Jaa tämä hyödyllinen muunnin muille",
    shareCopied: "Linkki kopioitu!",
    shareCopyLink: "Kopioi linkki",
    downloadAsFile: "Lataa",
    options: "Asetukset",
    input: "Syöte",
    output: "Tulos",
    convert: "Muunna",
    swap: "Vaihda",
    from: "Mistä",
    to: "Mihin",
    result: "Tulos",
    allConversions: "Kaikki muunnokset",
    details: "Tiedot",
    pageNotFound: "Muunninta ei löytynyt",
    goHome: "Takaisin kaikkiin muuntimiin",
    colorPickerLabel: "Värinvalitsin",
  },
  toolOptions: {
    fromUnit: "Mistä",
    toUnit: "Mihin",
    precision: "Desimaalit",
    baseSize: "Peruskirjasinkoko (px)",
    parentSize: "Yläelementin kirjasinkoko (px)",
    containerWidth: "Säiliön leveys (px)",
    viewportWidth: "Näkymän leveys (px)",
    viewportHeight: "Näkymän korkeus (px)",
    direction: "Suunta",
    mode: "Tila",
    ingredient: "Ainesosa",
    water: "Vesi",
    flour: "Jauhot",
    sugar: "Sokeri",
    butter: "Voi",
    rice: "Riisi",
    milk: "Maito",
    originalServings: "Alkuperäiset annokset",
    targetServings: "Halutut annokset",
    fromTimezone: "Aikavyöhykkeestä",
    toTimezone: "Aikavyöhykkeeseen",
    inputFormat: "Syötemuoto",
    outputFormat: "Tulosmuoto",
    harmony: "Väriharmonia",
    complementary: "Komplementaarinen",
    triadic: "Triadinen",
    analogous: "Analoginen",
    splitComplementary: "Jaettu komplementaarinen",
    tetradic: "Tetradinen",
    gradientType: "Liukuvärin tyyppi",
    linear: "Lineaarinen",
    radial: "Radiaalinen",
    conic: "Kartiomainen",
    gradientAngle: "Kulma (deg)",
    rootName: "Juurirajapinnan nimi",
    tableName: "Taulukon nimi",
    minify: "Minifoi",
    beautify: "Muotoile",
    colorType: "Häiriötyyppi",
    protanopia: "Protanopia (ei punaista)",
    deuteranopia: "Deuteranopia (ei vihreää)",
    tritanopia: "Tritanopia (ei sinistä)",
    achromatopsia: "Akromatopsia (ei väriä)",
    operation: "Toiminto",
    difference: "Erotus",
    add: "Lisää",
    subtract: "Vähennä",
    amount: "Määrä",
    unit: "Yksikkö",
    days: "Päivät",
    weeks: "Viikot",
    months: "Kuukaudet",
    years: "Vuodet",
    fromBase: "Kantaluvusta",
    toBase: "Kantalukuun",
    binary: "Binääri (2)",
    octal: "Oktaali (8)",
    decimal: "Desimaali (10)",
    hexadecimal: "Heksadesimaali (16)",
    seconds: "Sekunnit",
    milliseconds: "Millisekunnit",
    autoDetect: "Tunnista automaattisesti",
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
    markdown: "Markdown-taulukko",
    html: "HTML-taulukko",
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
    toRoman: "Luku → Roomalainen",
    toArabic: "Roomalainen → Luku",
    toScientific: "Standardi → Tieteellinen",
    toStandard: "Tieteellinen → Standardi",
    toFraction: "Desimaali → Murtoluku",
    toDecimal: "Murtoluku → Desimaali",
    decimalToPercent: "Desimaali → Prosentti",
    percentToDecimal: "Prosentti → Desimaali",
    fractionToPercent: "Murtoluku → Prosentti",
    dd: "Desimaaliaste (DD)",
    dms: "Asteet minuutit sekunnit (DMS)",
    ddm: "Asteet desimaaliminuutit (DDM)",
    iso: "ISO 8601",
    us: "US (KK/PP/VVVV)",
    eu: "EU (PP/KK/VVVV)",
    long: "Pitkä muoto",
    short: "Lyhyt muoto",
    relative: "Suhteellinen",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Taustaväri",
    monochromatic: "Yksivärinen",
    timestampToDate: "Aikaleima → Päivämäärä",
    dateToTimestamp: "Päivämäärä → Aikaleima",
    showDetails: "Näytä yksityiskohtainen erittely",
    addDays: "Lisää päiviä",
    subtractDays: "Vähennä päiviä",
    datetimeHint: "esim. 2024-01-15, 1705312200, now",
    endDate: "Päättymispäivä",
    today: "Tänään (oletus)",
    dateUnit: "Yksikkö",
  },
  statsLabels: {
    lines: "Rivit",
    characters: "Merkit",
    rows: "Rivit",
    columns: "Sarakkeet",
    elements: "Elementit",
    keys: "Avaimet",
    interfaces: "Rajapinnat",
    properties: "Ominaisuudet",
    originalSize: "Alkuperäinen koko",
    resultSize: "Tuloksen koko",
    savings: "Säästö",
    ingredients: "Ainesosat",
    scaleFactor: "Skaalakerroin",
    contrastRatio: "Kontrastisuhde",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Leveysaste",
    longitude: "Pituusaste",
    distanceKm: "Etäisyys (km)",
    distanceMi: "Etäisyys (mi)",
    years: "Vuodet",
    months: "Kuukaudet",
    days: "Päivät",
  },
  processorMessages: {
    invalidTimezone: "Virheellinen aikavyöhyke",
    pass: "Hyväksytty", fail: "Hylätty",
    fromNow: "tästä eteenpäin", ago: "sitten",
    today: "Tänään", tomorrow: "Huomenna", yesterday: "Eilen",
    seconds: "sekunti", secondsPlural: "sekuntia",
    minutes: "minuutti", minutesPlural: "minuuttia",
    hours: "tunti", hoursPlural: "tuntia",
    daysUnit: "päivä", daysPlural: "päivää",
    weeksUnit: "viikko", weeksPlural: "viikkoa",
    monthsUnit: "kuukausi", monthsPlural: "kuukautta",
    yearsUnit: "vuosi", yearsPlural: "vuotta",
    gasmark: "Gas Mark",
    veryCool: "Hyvin viileä", cool: "Viileä", moderatelyCool: "Kohtalaisen viileä",
    moderate: "Kohtalainen", moderatelyHot: "Kohtalaisen kuuma",
    hot: "Kuuma", veryHot: "Hyvin kuuma", extremelyHot: "Erittäin kuuma",
    original: "Alkuperäinen",
    from: "Mistä", to: "Mihin",
    totalDays: "Päiviä yhteensä", weeksDays: "Viikot + Päivät",
    originalDate: "Alkuperäinen päivämäärä", operationLabel: "Toiminto",
    resultDate: "Tulospäivämäärä", dayOfWeek: "Viikonpäivä",
    daysBetween: "Päiviä välissä",
    age: "Ikä", totalMonths: "Kuukausia yhteensä",
    totalHours: "Tunteja yhteensä", totalMinutes: "Minuutteja yhteensä",
    nextBirthday: "Seuraava syntymäpäivä",
    roman: "Roomalainen", arabic: "Arabialainen",
    scientific: "Tieteellinen", standard: "Standardi", engineering: "Insinööri",
    fraction: "Murtoluku", simplified: "Sievennetty", percentage: "Prosentti",
    color1: "Väri 1", color2: "Väri 2",
    contrastRatioLabel: "Kontrastisuhde",
    aaNormalText: "AA Normaali teksti", aaLargeText: "AA Suuri teksti",
    aaaNormalText: "AAA Normaali teksti", aaaLargeText: "AAA Suuri teksti",
    gradientTypeLabel: "Tyyppi", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Ilmaiset muuntimet verkossa",
    siteDescription:
      "Muunna yksiköitä, värejä, tiedostomuotoja, päivämääriä ja paljon muuta. Ilmainen, nopea ja yksityinen — kaikki toimii selaimessasi.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blogi",
    description:
      "Vinkkejä, oppaita ja tietoa yksikkömuunnoksista, tiedostomuodoista ja muusta.",
    readMore: "Lue lisää",
    backToBlog: "Takaisin blogiin",
    publishedOn: "Julkaistu",
    categoryGuide: "Opas",
    categoryTips: "Vinkit",
    categoryKnowledge: "Tietoa",
  },
  cookie: {
    message:
      "Käytämme evästeitä parantaaksemme kokemustasi. Jatkamalla hyväksyt evästekäytäntömme.",
    accept: "Hyväksy",
    decline: "Hylkää",
  },
  unitLabels: {
    length: {
      m: "Metri (m)", km: "Kilometri (km)", cm: "Senttimetri (cm)", mm: "Millimetri (mm)",
      mi: "Maili (mi)", yd: "Jaardi (yd)", ft: "Jalka (ft)", in: "Tuuma (in)",
      nm: "Merimaili (nm)", "\u03BCm": "Mikrometri (\u03BCm)",
    },
    weight: {
      kg: "Kilogramma (kg)", g: "Gramma (g)", mg: "Milligramma (mg)", lb: "Pauna (lb)",
      oz: "Unssi (oz)", ton: "Metrinen tonni (t)", st: "Stone (st)", ct: "Karaatti (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Neliömetri (m\u00B2)", "km\u00B2": "Neliökilometri (km\u00B2)",
      ha: "Hehtaari (ha)", acre: "Eekkeri", "ft\u00B2": "Neliöjalka (ft\u00B2)",
      "mi\u00B2": "Neliömaili (mi\u00B2)", "yd\u00B2": "Neliöjaardi (yd\u00B2)",
      "cm\u00B2": "Neliösenttimetri (cm\u00B2)",
    },
    volume: {
      L: "Litra (L)", mL: "Millilitra (mL)", gal: "US Gallona (gal)",
      "fl oz": "US Nesteunnssi (fl oz)", cup: "US Kuppi", pt: "US Pintti (pt)",
      qt: "US Kvartti (qt)", "m\u00B3": "Kuutiometri (m\u00B3)",
      "cm\u00B3": "Kuutiosenttimetri (cm\u00B3)", tbsp: "Ruokalusikka (tbsp)", tsp: "Teelusikka (tsp)",
    },
    speed: {
      "m/s": "Metri/s (m/s)", "km/h": "Kilometri/h (km/h)", mph: "Maili/h (mph)",
      kn: "Solmu (kn)", "ft/s": "Jalka/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Millisekunti (ms)", s: "Sekunti (s)", min: "Minuutti (min)", h: "Tunti (h)",
      d: "Päivä (d)", wk: "Viikko (wk)", mo: "Kuukausi (mo)", yr: "Vuosi (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", bar: "Baari", psi: "PSI",
      atm: "Ilmakehä (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Kalori (cal)", kcal: "Kilokalori (kcal)",
      Wh: "Wattitunti (Wh)", kWh: "Kilowattitunti (kWh)", BTU: "BTU", eV: "Elektronvoltti (eV)",
    },
    power: {
      W: "Watti (W)", kW: "Kilowatti (kW)", MW: "Megawatti (MW)", hp: "Hevosvoima (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kalori/s",
    },
    frequency: {
      Hz: "Hertsi (Hz)", kHz: "Kilohertsi (kHz)", MHz: "Megahertsi (MHz)",
      GHz: "Gigahertsi (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Aste (\u00B0)", rad: "Radiaani (rad)", grad: "Graadi (grad)",
      turn: "Kierros", arcmin: "Kaariminuutti (\u2032)", arcsec: "Kaarisekunti (\u2033)",
    },
    "data-storage": {
      B: "Tavu (B)", KB: "Kilotavu (KB)", MB: "Megatavu (MB)", GB: "Gigatavu (GB)",
      TB: "Teratavu (TB)", PB: "Petatavu (PB)", bit: "Bitti",
      Kbit: "Kilobitti", Mbit: "Megabitti", Gbit: "Gigabitti",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Kuppi", tbsp: "Ruokalusikka", tsp: "Teelusikka", mL: "Millilitra (mL)",
      L: "Litra (L)", fl_oz: "Nesteunnssi", g: "Gramma (g)", kg: "Kilogramma (kg)",
      oz: "Unssi (oz)", lb: "Pauna (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pikselit (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pikselit (px)", em: "Em (em)" },
    "px-percent": { px: "Pikselit (px)", "%": "Prosentti (%)" },
    "css-unit": {
      px: "Pikselit (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Prosentti (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
