import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Wszystkie narzędzia do konwersji, których potrzebujesz",
    titleAccent: "konwersji",
    description:
      "Konwertuj jednostki, kolory, formaty danych, daty i więcej. Wszystko w przeglądarce.",
    tabAll: "Wszystkie",
    categoryUnit: "Jednostki",
    categoryNumber: "Liczby",
    categoryColor: "Kolory",
    categoryDatetime: "Data/Czas",
    categoryData: "Dane",
    categoryCss: "CSS",
    categoryCooking: "Gotowanie",
    categoryGeography: "Geografia",
    searchPlaceholder: "Szukaj konwerterów...",
    noResults: "Nie znaleziono konwerterów.",
    recentTools: "Ostatnio używane",
    favorites: "Ulubione",
    favDragHint: "Przeciągnij, aby zmienić kolejność",
    favHint: "Kliknij gwiazdkę, aby dodać do ulubionych",
    gridView: "Widok siatki",
    listView: "Widok listy",
  },
  trust: {
    encryption: "Bezpieczne przetwarzanie",
    encryptionDesc: "Wszystkie konwersje odbywają się lokalnie w przeglądarce",
    autoDelete: "Dane nie są zapisywane",
    autoDeleteDesc: "Wprowadzone dane nigdy nie są zapisywane ani wysyłane na serwer",
    free: "W 100% za darmo",
    freeDesc: "Bez limitów, rejestracji i ukrytych opłat",
    browserProcessing: "Natychmiastowe wyniki",
    browserProcessingDesc: "Konwersja w czasie rzeczywistym podczas pisania",
  },
  tools: {
    length: {
      title: "Konwerter długości",
      description:
        "Konwertuj między metrami, kilometrami, milami, stopami, calami i innymi.",
    },
    weight: {
      title: "Konwerter masy",
      description:
        "Konwertuj między kilogramami, funtami, uncjami, tonami i innymi.",
    },
    temperature: {
      title: "Konwerter temperatury",
      description: "Konwertuj między Celsjuszem, Fahrenheitem i Kelwinem.",
    },
    area: {
      title: "Konwerter powierzchni",
      description:
        "Konwertuj między metrami kwadratowymi, hektarami, akrami, stopami kwadratowymi i innymi.",
    },
    volume: {
      title: "Konwerter objętości",
      description:
        "Konwertuj między litrami, galonami, filiżankami, uncjami płynów i innymi.",
    },
    speed: {
      title: "Konwerter prędkości",
      description: "Konwertuj między m/s, km/h, mph, węzłami i innymi.",
    },
    time: {
      title: "Konwerter czasu",
      description:
        "Konwertuj między sekundami, minutami, godzinami, dniami, tygodniami i innymi.",
    },
    pressure: {
      title: "Konwerter ciśnienia",
      description:
        "Konwertuj między Pascalami, barami, PSI, atmosferami i innymi.",
    },
    energy: {
      title: "Konwerter energii",
      description:
        "Konwertuj między dżulami, kaloriami, kilowatogodzinami, BTU i innymi.",
    },
    power: {
      title: "Konwerter mocy",
      description:
        "Konwertuj między watami, kilowatami, końmi mechanicznymi i innymi.",
    },
    frequency: {
      title: "Konwerter częstotliwości",
      description:
        "Konwertuj między hercami, kilohercami, megahercami, gigahercami i RPM.",
    },
    angle: {
      title: "Konwerter kątów",
      description: "Konwertuj między stopniami, radianami, gradianami i obrotami.",
    },
    "data-storage": {
      title: "Konwerter pamięci",
      description:
        "Konwertuj między bajtami, kilobajtami, megabajtami, gigabajtami i innymi.",
    },
    "fuel-economy": {
      title: "Konwerter zużycia paliwa",
      description: "Konwertuj między km/L, mpg i L/100km.",
    },
    "number-base": {
      title: "Konwerter systemów liczbowych",
      description:
        "Konwertuj między dwójkowym, ósemkowym, dziesiętnym, szesnastkowym i innymi systemami.",
    },
    "roman-numeral": {
      title: "Konwerter cyfr rzymskich",
      description: "Konwertuj między cyframi rzymskimi i arabskimi.",
    },
    "scientific-notation": {
      title: "Notacja naukowa",
      description:
        "Konwertuj między notacją naukową a liczbami standardowymi.",
    },
    "fraction-decimal": {
      title: "Ułamek ↔ Dziesiętny",
      description: "Konwertuj między ułamkami a liczbami dziesiętnymi.",
    },
    percentage: {
      title: "Konwerter procentów",
      description:
        "Konwertuj między ułamkami, liczbami dziesiętnymi i procentami.",
    },
    "color-converter": {
      title: "Konwerter kolorów",
      description:
        "Konwertuj między formatami kolorów HEX, RGB, HSL, HSV i CMYK.",
    },
    "color-palette-generator": {
      title: "Generator palet kolorów",
      description:
        "Generuj palety kolorów dopełniających, triadycznych i analogowych.",
    },
    "gradient-generator": {
      title: "Generator gradientów CSS",
      description:
        "Twórz liniowe, radialne i stożkowe gradienty CSS z podglądem na żywo.",
    },
    "color-contrast-checker": {
      title: "Sprawdzanie kontrastu kolorów",
      description:
        "Sprawdź współczynnik kontrastu WCAG AA/AAA między dwoma kolorami.",
    },
    "color-blindness-simulator": {
      title: "Symulator ślepoty barw",
      description:
        "Symuluj, jak kolory widzą osoby z zaburzeniami widzenia barw.",
    },
    timezone: {
      title: "Konwerter stref czasowych",
      description:
        "Konwertuj czas między strefami czasowymi na całym świecie.",
    },
    "unix-timestamp": {
      title: "Konwerter Unix Timestamp",
      description:
        "Konwertuj między znacznikami czasu Unix a czytelnymi datami.",
    },
    "date-format": {
      title: "Konwerter formatu daty",
      description:
        "Konwertuj daty między formatami ISO, US, EU i innymi.",
    },
    "date-calculator": {
      title: "Kalkulator dat",
      description:
        "Oblicz różnicę między datami lub dodaj/odejmij dni.",
    },
    "age-calculator": {
      title: "Kalkulator wieku",
      description:
        "Oblicz dokładny wiek na podstawie daty urodzenia w latach, miesiącach i dniach.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Konwertuj między formatami danych JSON i YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Konwertuj między tablicami JSON a formatem arkusza CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Konwertuj między formatami danych JSON i XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Konwertuj między formatami konfiguracji JSON i TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Konwertuj między znacznikami Markdown i HTML.",
    },
    "csv-table": {
      title: "CSV na tabelę",
      description: "Konwertuj dane CSV na tabele Markdown lub HTML.",
    },
    "json-typescript": {
      title: "JSON na TypeScript",
      description: "Generuj interfejsy TypeScript z danych JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Konwertuj między instrukcjami SQL INSERT a danymi JSON.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Konwertuj między pikselami a rem z własnym rozmiarem bazowym.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Konwertuj między pikselami a em z własnym rozmiarem rodzica.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Konwertuj między pikselami a procentami z własną szerokością kontenera.",
    },
    "css-unit": {
      title: "Konwerter jednostek CSS",
      description:
        "Konwertuj między px, rem, em, %, vw, vh i innymi jednostkami CSS.",
    },
    "css-minifier": {
      title: "Minifikator CSS",
      description:
        "Minifikuj lub formatuj kod CSS na potrzeby produkcji lub czytelności.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Konwertuj między klasami Tailwind CSS a zwykłym CSS.",
    },
    "cooking-measurement": {
      title: "Konwerter miar kuchennych",
      description:
        "Konwertuj między filiżankami, łyżkami, łyżeczkami, mililitrami i gramami.",
    },
    "recipe-scaler": {
      title: "Skalowanie przepisów",
      description:
        "Przelicz składniki przepisu w górę lub w dół według liczby porcji.",
    },
    "oven-temperature": {
      title: "Konwerter temperatury piekarnika",
      description:
        "Konwertuj temperaturę piekarnika między Celsjuszem, Fahrenheitem i Gas Mark.",
    },
    coordinate: {
      title: "Konwerter współrzędnych",
      description:
        "Konwertuj między formatami współrzędnych DMS, DD i DDM.",
    },
    "distance-calculator": {
      title: "Kalkulator odległości",
      description:
        "Oblicz odległość między dwiema współrzędnymi geograficznymi.",
    },
  },
  nav: {
    allTools: "Wszystkie konwertery",
    language: "Język",
  },
  footer: {
    tools: "Konwertery",
    legal: "Informacje prawne",
    privacy: "Polityka prywatności",
    terms: "Warunki korzystania",
    copyright: "ToolPop. Wszelkie prawa zastrzeżone.",
    company: "Firma",
    about: "O nas",
    contact: "Kontakt",
    faq: "FAQ",
  },
  common: {
    backToAll: "Wszystkie konwertery",
    inputPlaceholder: "Wpisz wartość do konwersji...",
    outputLabel: "Wynik",
    copyToClipboard: "Kopiuj",
    copied: "Skopiowano!",
    clear: "Wyczyść",
    paste: "Wklej",
    processing: "Konwertowanie...",
    startOver: "Zacznij od nowa",
    process: "Konwertuj",
    tryAgain: "Spróbuj ponownie",
    notImplemented: "Ten konwerter pojawi się wkrótce.",
    tryOtherTools: "Wypróbuj inne konwertery",
    privacyBadge: "Wszystkie konwersje odbywają się w przeglądarce",
    favoriteAdded: "Dodano do ulubionych",
    favoriteRemoved: "Usunięto z ulubionych",
    comingSoon: "Wkrótce",
    share: "Udostępnij",
    shareTitle: "Udostępnij ten konwerter",
    shareSubtitle: "Podziel się tym przydatnym konwerterem z innymi",
    shareCopied: "Link skopiowany!",
    shareCopyLink: "Kopiuj link",
    downloadAsFile: "Pobierz",
    options: "Opcje",
    input: "Wejście",
    output: "Wyjście",
    convert: "Konwertuj",
    swap: "Zamień",
    from: "Z",
    to: "Na",
    result: "Wynik",
    allConversions: "Wszystkie konwersje",
    details: "Szczegóły",
    pageNotFound: "Nie znaleziono konwertera",
    goHome: "Wróć do wszystkich konwerterów",
  },
  toolOptions: {
    fromUnit: "Z",
    toUnit: "Na",
    precision: "Miejsca dziesiętne",
    baseSize: "Bazowy rozmiar czcionki (px)",
    parentSize: "Rozmiar czcionki rodzica (px)",
    containerWidth: "Szerokość kontenera (px)",
    viewportWidth: "Szerokość okna (px)",
    viewportHeight: "Wysokość okna (px)",
    direction: "Kierunek",
    mode: "Tryb",
    ingredient: "Składnik",
    water: "Woda",
    flour: "Mąka",
    sugar: "Cukier",
    butter: "Masło",
    rice: "Ryż",
    milk: "Mleko",
    originalServings: "Oryginalne porcje",
    targetServings: "Docelowe porcje",
    fromTimezone: "Ze strefy czasowej",
    toTimezone: "Do strefy czasowej",
    inputFormat: "Format wejściowy",
    outputFormat: "Format wyjściowy",
    harmony: "Harmonia kolorów",
    complementary: "Dopełniająca",
    triadic: "Triadyczna",
    analogous: "Analogowa",
    splitComplementary: "Rozdzielona dopełniająca",
    tetradic: "Tetradyczna",
    gradientType: "Typ gradientu",
    linear: "Liniowy",
    radial: "Radialny",
    conic: "Stożkowy",
    gradientAngle: "Kąt (deg)",
    rootName: "Nazwa interfejsu głównego",
    tableName: "Nazwa tabeli",
    minify: "Minifikuj",
    beautify: "Formatuj",
    colorType: "Typ zaburzenia",
    protanopia: "Protanopia (brak czerwonego)",
    deuteranopia: "Deuteranopia (brak zielonego)",
    tritanopia: "Tritanopia (brak niebieskiego)",
    achromatopsia: "Achromatopsja (brak kolorów)",
    operation: "Operacja",
    difference: "Różnica",
    add: "Dodaj",
    subtract: "Odejmij",
    amount: "Ilość",
    unit: "Jednostka",
    days: "Dni",
    weeks: "Tygodnie",
    months: "Miesiące",
    years: "Lata",
    fromBase: "Z systemu",
    toBase: "Na system",
    binary: "Dwójkowy (2)",
    octal: "Ósemkowy (8)",
    decimal: "Dziesiętny (10)",
    hexadecimal: "Szesnastkowy (16)",
    seconds: "Sekundy",
    milliseconds: "Milisekundy",
    autoDetect: "Automatyczne wykrywanie",
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
    markdown: "Tabela Markdown",
    html: "Tabela HTML",
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
    toRoman: "Liczba → Rzymska",
    toArabic: "Rzymska → Liczba",
    toScientific: "Standardowa → Naukowa",
    toStandard: "Naukowa → Standardowa",
    toFraction: "Dziesiętna → Ułamek",
    toDecimal: "Ułamek → Dziesiętna",
    decimalToPercent: "Dziesiętna → Procent",
    percentToDecimal: "Procent → Dziesiętna",
    fractionToPercent: "Ułamek → Procent",
    dd: "Stopnie dziesiętne (DD)",
    dms: "Stopnie minuty sekundy (DMS)",
    ddm: "Stopnie minuty dziesiętne (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/RRRR)",
    eu: "EU (DD/MM/RRRR)",
    long: "Format długi",
    short: "Format krótki",
    relative: "Względny",
    celsius: "Celsjusz (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Kolor tła",
    monochromatic: "Monochromatyczny",
    timestampToDate: "Znacznik czasu → Data",
    dateToTimestamp: "Data → Znacznik czasu",
    showDetails: "Pokaż szczegółowy podział",
    addDays: "Dodaj dni",
    subtractDays: "Odejmij dni",
    datetimeHint: "np. 2024-01-15, 1705312200, now",
    endDate: "Data końcowa",
    today: "Dziś (domyślnie)",
    dateUnit: "Jednostka",
  },
  statsLabels: {
    lines: "Linie",
    characters: "Znaki",
    rows: "Wiersze",
    columns: "Kolumny",
    elements: "Elementy",
    keys: "Klucze",
    interfaces: "Interfejsy",
    properties: "Właściwości",
    originalSize: "Rozmiar oryginału",
    resultSize: "Rozmiar wyniku",
    savings: "Oszczędność",
    ingredients: "Składniki",
    scaleFactor: "Współczynnik skali",
    contrastRatio: "Współczynnik kontrastu",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Szerokość geogr.",
    longitude: "Długość geogr.",
    distanceKm: "Odległość (km)",
    distanceMi: "Odległość (mi)",
    years: "Lata",
    months: "Miesiące",
    days: "Dni",
  },
  processorMessages: {
    invalidTimezone: "Nieprawidłowa strefa czasowa",
    pass: "Zaliczony", fail: "Niezaliczony",
    fromNow: "od teraz", ago: "temu",
    today: "Dzisiaj", tomorrow: "Jutro", yesterday: "Wczoraj",
    seconds: "sekunda", secondsPlural: "sekund",
    minutes: "minuta", minutesPlural: "minut",
    hours: "godzina", hoursPlural: "godzin",
    daysUnit: "dzień", daysPlural: "dni",
    weeksUnit: "tydzień", weeksPlural: "tygodni",
    monthsUnit: "miesiąc", monthsPlural: "miesięcy",
    yearsUnit: "rok", yearsPlural: "lat",
    gasmark: "Gas Mark",
    veryCool: "Bardzo chłodny", cool: "Chłodny", moderatelyCool: "Umiarkowanie chłodny",
    moderate: "Umiarkowany", moderatelyHot: "Umiarkowanie gorący",
    hot: "Gorący", veryHot: "Bardzo gorący", extremelyHot: "Ekstremalnie gorący",
    original: "Oryginał",
    from: "Z", to: "Na",
    totalDays: "Łącznie dni", weeksDays: "Tygodnie + Dni",
    originalDate: "Data początkowa", operationLabel: "Operacja",
    resultDate: "Data wynikowa", dayOfWeek: "Dzień tygodnia",
    daysBetween: "Dni między",
    age: "Wiek", totalMonths: "Łącznie miesięcy",
    totalHours: "Łącznie godzin", totalMinutes: "Łącznie minut",
    nextBirthday: "Następne urodziny",
    roman: "Rzymskie", arabic: "Arabskie",
    scientific: "Naukowy", standard: "Standardowy", engineering: "Inżynierski",
    fraction: "Ułamek", simplified: "Uproszczony", percentage: "Procent",
    color1: "Kolor 1", color2: "Kolor 2",
    contrastRatioLabel: "Współczynnik kontrastu",
    aaNormalText: "AA Normalny tekst", aaLargeText: "AA Duży tekst",
    aaaNormalText: "AAA Normalny tekst", aaaLargeText: "AAA Duży tekst",
    gradientTypeLabel: "Typ", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — Darmowe konwertery online",
    siteDescription:
      "Konwertuj jednostki, kolory, formaty danych, daty i wiele więcej. Za darmo, szybko i bezpiecznie — wszystko działa w przeglądarce.",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "Blog",
    description:
      "Porady, poradniki i wiedza o konwersji jednostek, formatach danych i nie tylko.",
    readMore: "Czytaj dalej",
    backToBlog: "Wróć do bloga",
    publishedOn: "Opublikowano",
    categoryGuide: "Poradnik",
    categoryTips: "Porady",
    categoryKnowledge: "Wiedza",
  },
  cookie: {
    message:
      "Używamy plików cookie, aby poprawić Twoje doświadczenia. Kontynuując, akceptujesz naszą politykę cookie.",
    accept: "Akceptuj",
    decline: "Odrzuć",
  },
  unitLabels: {
    length: {
      m: "Metr (m)", km: "Kilometr (km)", cm: "Centymetr (cm)", mm: "Milimetr (mm)",
      mi: "Mila (mi)", yd: "Jard (yd)", ft: "Stopa (ft)", in: "Cal (in)",
      nm: "Mila morska (nm)", "\u03BCm": "Mikrometr (\u03BCm)",
    },
    weight: {
      kg: "Kilogram (kg)", g: "Gram (g)", mg: "Miligram (mg)", lb: "Funt (lb)",
      oz: "Uncja (oz)", ton: "Tona metryczna (t)", st: "Stone (st)", ct: "Karat (ct)",
    },
    temperature: { C: "Celsjusz (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelwin (K)" },
    area: {
      "m\u00B2": "Metr kwadratowy (m\u00B2)", "km\u00B2": "Kilometr kwadratowy (km\u00B2)",
      ha: "Hektar (ha)", acre: "Akr", "ft\u00B2": "Stopa kwadratowa (ft\u00B2)",
      "mi\u00B2": "Mila kwadratowa (mi\u00B2)", "yd\u00B2": "Jard kwadratowy (yd\u00B2)",
      "cm\u00B2": "Centymetr kwadratowy (cm\u00B2)",
    },
    volume: {
      L: "Litr (L)", mL: "Mililitr (mL)", gal: "Galon US (gal)",
      "fl oz": "Uncja płynna US (fl oz)", cup: "Filiżanka US", pt: "Pint US (pt)",
      qt: "Kwarta US (qt)", "m\u00B3": "Metr sześcienny (m\u00B3)",
      "cm\u00B3": "Centymetr sześcienny (cm\u00B3)", tbsp: "Łyżka (tbsp)", tsp: "Łyżeczka (tsp)",
    },
    speed: {
      "m/s": "Metr/s (m/s)", "km/h": "Kilometr/h (km/h)", mph: "Mila/h (mph)",
      kn: "Węzeł (kn)", "ft/s": "Stopa/s (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milisekunda (ms)", s: "Sekunda (s)", min: "Minuta (min)", h: "Godzina (h)",
      d: "Dzień (d)", wk: "Tydzień (wk)", mo: "Miesiąc (mo)", yr: "Rok (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Kilopaskal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Dżul (J)", kJ: "Kilodżul (kJ)", cal: "Kaloria (cal)", kcal: "Kilokaloria (kcal)",
      Wh: "Watogodzina (Wh)", kWh: "Kilowatogodzina (kWh)", BTU: "BTU", eV: "Elektronowolt (eV)",
    },
    power: {
      W: "Wat (W)", kW: "Kilowat (kW)", MW: "Megawat (MW)", hp: "Koń mechaniczny (hp)",
      "BTU/h": "BTU/h", "cal/s": "Kaloria/s",
    },
    frequency: {
      Hz: "Herc (Hz)", kHz: "Kiloherc (kHz)", MHz: "Megaherc (MHz)",
      GHz: "Gigaherc (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Stopień (\u00B0)", rad: "Radian (rad)", grad: "Gradian (grad)",
      turn: "Obrót", arcmin: "Minuta kątowa (\u2032)", arcsec: "Sekunda kątowa (\u2033)",
    },
    "data-storage": {
      B: "Bajt (B)", KB: "Kilobajt (KB)", MB: "Megabajt (MB)", GB: "Gigabajt (GB)",
      TB: "Terabajt (TB)", PB: "Petabajt (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Filiżanka", tbsp: "Łyżka", tsp: "Łyżeczka", mL: "Mililitr (mL)",
      L: "Litr (L)", fl_oz: "Uncja płynna", g: "Gram (g)", kg: "Kilogram (kg)",
      oz: "Uncja (oz)", lb: "Funt (lb)",
    },
    "oven-temperature": { C: "Celsjusz (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Piksele (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Piksele (px)", em: "Em (em)" },
    "px-percent": { px: "Piksele (px)", "%": "Procent (%)" },
    "css-unit": {
      px: "Piksele (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Procent (%)", vw: "Viewport Width (vw)", vh: "Viewport Height (vh)",
    },
  },
};

export default dict;
