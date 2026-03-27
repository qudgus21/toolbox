import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "Todas as ferramentas de conversão que você precisa",
    titleAccent: "conversão",
    description:
      "Converta unidades, cores, formatos e datas. Tudo processado no seu navegador.",
    tabAll: "Todos",
    categoryUnit: "Unidades",
    categoryNumber: "Números",
    categoryColor: "Cores",
    categoryDatetime: "Data/Hora",
    categoryData: "Dados",
    categoryCss: "CSS",
    categoryCooking: "Culinária",
    categoryGeography: "Geografia",
    searchPlaceholder: "Buscar conversores...",
    noResults: "Nenhum conversor encontrado.",
    recentTools: "Usados recentemente",
    favorites: "Favoritos",
    favDragHint: "Arraste para reordenar",
    favHint: "Clique na estrela para adicionar aos favoritos",
    gridView: "Visualização em grade",
    listView: "Visualização em lista",
  },
  trust: {
    encryption: "Processamento seguro",
    encryptionDesc: "Todas as conversões acontecem localmente no seu navegador",
    autoDelete: "Sem armazenamento",
    autoDeleteDesc: "Seus dados nunca são salvos nem enviados a um servidor",
    free: "100% gratuito",
    freeDesc: "Sem limites, sem cadastro, sem taxas ocultas",
    browserProcessing: "Resultados instantâneos",
    browserProcessingDesc: "Conversão em tempo real enquanto você digita",
  },
  tools: {
    length: {
      title: "Conversor de comprimento",
      description:
        "Converta entre metros, quilômetros, milhas, pés, polegadas e mais.",
    },
    weight: {
      title: "Conversor de peso",
      description:
        "Converta entre quilogramas, libras, onças, toneladas e mais.",
    },
    temperature: {
      title: "Conversor de temperatura",
      description: "Converta entre Celsius, Fahrenheit e Kelvin.",
    },
    area: {
      title: "Conversor de área",
      description:
        "Converta entre metros quadrados, hectares, acres, pés quadrados e mais.",
    },
    volume: {
      title: "Conversor de volume",
      description:
        "Converta entre litros, galões, xícaras, onças líquidas e mais.",
    },
    speed: {
      title: "Conversor de velocidade",
      description: "Converta entre m/s, km/h, mph, nós e mais.",
    },
    time: {
      title: "Conversor de tempo",
      description:
        "Converta entre segundos, minutos, horas, dias, semanas e mais.",
    },
    pressure: {
      title: "Conversor de pressão",
      description:
        "Converta entre Pascal, bar, PSI, atmosfera e mais.",
    },
    energy: {
      title: "Conversor de energia",
      description:
        "Converta entre joules, calorias, quilowatt-hora, BTU e mais.",
    },
    power: {
      title: "Conversor de potência",
      description:
        "Converta entre watts, quilowatts, cavalos-vapor e mais.",
    },
    frequency: {
      title: "Conversor de frequência",
      description:
        "Converta entre hertz, quilohertz, megahertz, gigahertz e RPM.",
    },
    angle: {
      title: "Conversor de ângulo",
      description: "Converta entre graus, radianos, grados e voltas.",
    },
    "data-storage": {
      title: "Conversor de armazenamento",
      description:
        "Converta entre bytes, kilobytes, megabytes, gigabytes e mais.",
    },
    "fuel-economy": {
      title: "Conversor de consumo",
      description: "Converta entre km/L, mpg e L/100km.",
    },
    "number-base": {
      title: "Conversor de base numérica",
      description:
        "Converta entre binário, octal, decimal, hexadecimal e bases personalizadas.",
    },
    "roman-numeral": {
      title: "Conversor de números romanos",
      description: "Converta entre números romanos e arábicos.",
    },
    "scientific-notation": {
      title: "Conversor de notação científica",
      description:
        "Converta entre notação científica e números padrão.",
    },
    "fraction-decimal": {
      title: "Fração ↔ Decimal",
      description: "Converta entre frações e números decimais.",
    },
    percentage: {
      title: "Conversor de porcentagem",
      description:
        "Converta entre frações, decimais e porcentagens.",
    },
    "color-converter": {
      title: "Conversor de cores",
      description:
        "Converta entre os formatos de cor HEX, RGB, HSL, HSV e CMYK.",
    },
    "color-palette-generator": {
      title: "Gerador de paletas",
      description:
        "Gere paletas de cores complementares, triádicas e análogas.",
    },
    "gradient-generator": {
      title: "Gerador de gradientes CSS",
      description:
        "Crie gradientes CSS lineares, radiais e cônicos com pré-visualização ao vivo.",
    },
    "color-contrast-checker": {
      title: "Verificador de contraste",
      description:
        "Verifique a proporção de contraste WCAG AA/AAA entre duas cores.",
    },
    "color-blindness-simulator": {
      title: "Simulador de daltonismo",
      description:
        "Simule como as cores são vistas por pessoas com deficiência na visão de cores.",
    },
    timezone: {
      title: "Conversor de fuso horário",
      description:
        "Converta horários entre diferentes fusos horários do mundo.",
    },
    "unix-timestamp": {
      title: "Conversor de Unix timestamp",
      description:
        "Converta entre timestamps Unix e datas legíveis.",
    },
    "date-format": {
      title: "Conversor de formato de data",
      description:
        "Converta datas entre diferentes formatos (ISO, US, EU e mais).",
    },
    "date-calculator": {
      title: "Calculadora de datas",
      description:
        "Calcule a diferença entre datas ou adicione/subtraia dias.",
    },
    "age-calculator": {
      title: "Calculadora de idade",
      description:
        "Calcule a idade exata a partir da data de nascimento em anos, meses e dias.",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "Converta entre os formatos de dados JSON e YAML.",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "Converta entre arrays JSON e formato de planilha CSV.",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "Converta entre os formatos de dados JSON e XML.",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "Converta entre os formatos de configuração JSON e TOML.",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Converta entre Markdown e HTML.",
    },
    "csv-table": {
      title: "CSV para tabela",
      description: "Converta dados CSV em tabelas Markdown ou HTML.",
    },
    "json-typescript": {
      title: "JSON para TypeScript",
      description: "Gere interfaces TypeScript a partir de dados JSON.",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "Converta entre instruções SQL INSERT e dados JSON.",
    },
    "px-rem": {
      title: "px ↔ rem",
      description:
        "Converta entre pixels e unidades rem com tamanho base personalizado.",
    },
    "px-em": {
      title: "px ↔ em",
      description:
        "Converta entre pixels e unidades em com tamanho do pai personalizado.",
    },
    "px-percent": {
      title: "px ↔ %",
      description:
        "Converta entre pixels e porcentagem com largura do contêiner personalizada.",
    },
    "css-unit": {
      title: "Conversor de unidades CSS",
      description:
        "Converta entre px, rem, em, %, vw, vh e outras unidades CSS.",
    },
    "css-minifier": {
      title: "Minificador / Embelezador CSS",
      description:
        "Minifique ou embeleze código CSS para produção ou legibilidade.",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Converta entre classes Tailwind CSS e CSS puro.",
    },
    "cooking-measurement": {
      title: "Conversor de medidas culinárias",
      description:
        "Converta entre xícaras, colheres de sopa, colheres de chá, mililitros e gramas.",
    },
    "recipe-scaler": {
      title: "Ajustador de receitas",
      description:
        "Ajuste os ingredientes de uma receita de acordo com o número de porções.",
    },
    "oven-temperature": {
      title: "Conversor de temperatura do forno",
      description:
        "Converta entre Celsius, Fahrenheit e Gas Mark para temperaturas de forno.",
    },
    coordinate: {
      title: "Conversor de coordenadas",
      description:
        "Converta entre os formatos de coordenadas DMS, DD e DDM.",
    },
    "distance-calculator": {
      title: "Calculadora de distância",
      description:
        "Calcule a distância entre duas coordenadas geográficas.",
    },
  },
  nav: {
    allTools: "Todos os conversores",
    language: "Idioma",
  },
  footer: {
    tools: "Conversores",
    legal: "Legal",
    privacy: "Política de privacidade",
    terms: "Termos de uso",
    copyright: "ToolPop. Todos os direitos reservados.",
    company: "Empresa",
    about: "Sobre",
    contact: "Contato",
    faq: "Perguntas frequentes",
  },
  common: {
    backToAll: "Todos os conversores",
    inputPlaceholder: "Digite um valor para converter...",
    outputLabel: "Resultado",
    copyToClipboard: "Copiar para a área de transferência",
    copied: "Copiado!",
    clear: "Limpar",
    paste: "Colar",
    processing: "Convertendo...",
    startOver: "Recomeçar",
    process: "Converter",
    tryAgain: "Tentar novamente",
    notImplemented: "Este conversor estará disponível em breve.",
    tryOtherTools: "Experimente outros conversores",
    privacyBadge: "Todas as conversões acontecem no seu navegador",
    favoriteAdded: "Adicionado aos favoritos",
    favoriteRemoved: "Removido dos favoritos",
    comingSoon: "Em breve",
    share: "Compartilhar",
    shareTitle: "Compartilhe este conversor",
    shareSubtitle: "Compartilhe este conversor útil com outras pessoas",
    shareCopied: "Link copiado!",
    shareCopyLink: "Copiar link",
    downloadAsFile: "Baixar",
    options: "Opções",
    input: "Entrada",
    output: "Saída",
    convert: "Converter",
    swap: "Inverter",
    from: "De",
    to: "Para",
    result: "Resultado",
    allConversions: "Todas as conversões",
    details: "Detalhes",
    pageNotFound: "Conversor não encontrado",
    goHome: "Voltar para todos os conversores",
  },
  toolOptions: {
    fromUnit: "De",
    toUnit: "Para",
    precision: "Casas decimais",
    baseSize: "Tamanho base da fonte (px)",
    parentSize: "Tamanho da fonte do pai (px)",
    containerWidth: "Largura do contêiner (px)",
    viewportWidth: "Largura do viewport (px)",
    viewportHeight: "Altura do viewport (px)",
    direction: "Direção",
    mode: "Modo",
    ingredient: "Ingrediente",
    water: "Água",
    flour: "Farinha",
    sugar: "Açúcar",
    butter: "Manteiga",
    rice: "Arroz",
    milk: "Leite",
    originalServings: "Porções originais",
    targetServings: "Porções desejadas",
    fromTimezone: "Fuso horário de origem",
    toTimezone: "Fuso horário de destino",
    inputFormat: "Formato de entrada",
    outputFormat: "Formato de saída",
    harmony: "Harmonia de cores",
    complementary: "Complementar",
    triadic: "Triádica",
    analogous: "Análoga",
    splitComplementary: "Complementar dividida",
    tetradic: "Tetrádica",
    gradientType: "Tipo de gradiente",
    linear: "Linear",
    radial: "Radial",
    conic: "Cônico",
    gradientAngle: "Ângulo (deg)",
    rootName: "Nome da interface raiz",
    tableName: "Nome da tabela",
    minify: "Minificar",
    beautify: "Embelezar",
    colorType: "Tipo de deficiência",
    protanopia: "Protanopia (sem vermelho)",
    deuteranopia: "Deuteranopia (sem verde)",
    tritanopia: "Tritanopia (sem azul)",
    achromatopsia: "Acromatopsia (sem cor)",
    operation: "Operação",
    difference: "Diferença",
    add: "Adicionar",
    subtract: "Subtrair",
    amount: "Quantidade",
    unit: "Unidade",
    days: "Dias",
    weeks: "Semanas",
    months: "Meses",
    years: "Anos",
    fromBase: "Base de origem",
    toBase: "Base de destino",
    binary: "Binário (2)",
    octal: "Octal (8)",
    decimal: "Decimal (10)",
    hexadecimal: "Hexadecimal (16)",
    seconds: "Segundos",
    milliseconds: "Milissegundos",
    autoDetect: "Detecção automática",
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
    toRoman: "Número → Romano",
    toArabic: "Romano → Número",
    toScientific: "Padrão → Científica",
    toStandard: "Científica → Padrão",
    toFraction: "Decimal → Fração",
    toDecimal: "Fração → Decimal",
    decimalToPercent: "Decimal → Porcentagem",
    percentToDecimal: "Porcentagem → Decimal",
    fractionToPercent: "Fração → Porcentagem",
    dd: "Graus decimais (DD)",
    dms: "Graus minutos segundos (DMS)",
    ddm: "Graus minutos decimais (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "Formato longo",
    short: "Formato curto",
    relative: "Relativo",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "Cor de fundo",
    monochromatic: "Monocromático",
    timestampToDate: "Timestamp → Data",
    dateToTimestamp: "Data → Timestamp",
    showDetails: "Mostrar detalhamento completo",
    addDays: "Adicionar dias",
    subtractDays: "Subtrair dias",
    datetimeHint: "ex. 2024-01-15, 1705312200, now",
    endDate: "Data de fim",
    today: "Hoje (padrão)",
    dateUnit: "Unidade",
  },
  statsLabels: {
    lines: "Linhas",
    characters: "Caracteres",
    rows: "Linhas",
    columns: "Colunas",
    elements: "Elementos",
    keys: "Chaves",
    interfaces: "Interfaces",
    properties: "Propriedades",
    originalSize: "Tamanho original",
    resultSize: "Tamanho do resultado",
    savings: "Economia",
    ingredients: "Ingredientes",
    scaleFactor: "Fator de escala",
    contrastRatio: "Proporção de contraste",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "Latitude",
    longitude: "Longitude",
    distanceKm: "Distância (km)",
    distanceMi: "Distância (mi)",
    years: "Anos",
    months: "Meses",
    days: "Dias",
  },
  processorMessages: {
    invalidTimezone: "Fuso horário inválido",
    pass: "Aprovado", fail: "Reprovado",
    fromNow: "a partir de agora", ago: "atrás",
    today: "Hoje", tomorrow: "Amanhã", yesterday: "Ontem",
    seconds: "segundo", secondsPlural: "segundos",
    minutes: "minuto", minutesPlural: "minutos",
    hours: "hora", hoursPlural: "horas",
    daysUnit: "dia", daysPlural: "dias",
    weeksUnit: "semana", weeksPlural: "semanas",
    monthsUnit: "mês", monthsPlural: "meses",
    yearsUnit: "ano", yearsPlural: "anos",
    gasmark: "Gas Mark",
    veryCool: "Muito frio", cool: "Frio", moderatelyCool: "Moderadamente frio",
    moderate: "Moderado", moderatelyHot: "Moderadamente quente",
    hot: "Quente", veryHot: "Muito quente", extremelyHot: "Extremamente quente",
    original: "Original",
    from: "De", to: "Para",
    totalDays: "Total de dias", weeksDays: "Semanas + Dias",
    originalDate: "Data original", operationLabel: "Operação",
    resultDate: "Data resultado", dayOfWeek: "Dia da semana",
    daysBetween: "Dias entre",
    age: "Idade", totalMonths: "Total de meses",
    totalHours: "Total de horas", totalMinutes: "Total de minutos",
    nextBirthday: "Próximo aniversário",
    roman: "Romano", arabic: "Arábico",
    scientific: "Científica", standard: "Padrão", engineering: "Engenharia",
    fraction: "Fração", simplified: "Simplificado", percentage: "Porcentagem",
    color1: "Cor 1", color2: "Cor 2",
    contrastRatioLabel: "Proporção de contraste",
    aaNormalText: "AA Texto normal", aaLargeText: "AA Texto grande",
    aaaNormalText: "AAA Texto normal", aaaLargeText: "AAA Texto grande",
    gradientTypeLabel: "Tipo", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Conversor — Conversores online gratuitos",
    siteDescription:
      "Converta unidades, cores, formatos de dados, datas e mais. Gratuito, rápido e privado — tudo roda no seu navegador.",
    toolTitleSuffix: "| ToolPop Conversor",
  },
  blog: {
    title: "Blog",
    description:
      "Dicas, guias e conhecimento sobre conversão de unidades, formatos de dados e mais.",
    readMore: "Ler mais",
    backToBlog: "Voltar ao blog",
    publishedOn: "Publicado em",
    categoryGuide: "Guia",
    categoryTips: "Dicas",
    categoryKnowledge: "Conhecimento",
  },
  cookie: {
    message:
      "Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política de cookies.",
    accept: "Aceitar",
    decline: "Recusar",
  },
  unitLabels: {
    length: {
      m: "Metro (m)", km: "Quilômetro (km)", cm: "Centímetro (cm)", mm: "Milímetro (mm)",
      mi: "Milha (mi)", yd: "Jarda (yd)", ft: "Pé (ft)", in: "Polegada (in)",
      nm: "Milha náutica (nm)", "\u03BCm": "Micrômetro (\u03BCm)",
    },
    weight: {
      kg: "Quilograma (kg)", g: "Grama (g)", mg: "Miligrama (mg)", lb: "Libra (lb)",
      oz: "Onça (oz)", ton: "Tonelada métrica (t)", st: "Stone (st)", ct: "Quilate (ct)",
    },
    temperature: { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", K: "Kelvin (K)" },
    area: {
      "m\u00B2": "Metro quadrado (m\u00B2)", "km\u00B2": "Quilômetro quadrado (km\u00B2)",
      ha: "Hectare (ha)", acre: "Acre", "ft\u00B2": "Pé quadrado (ft\u00B2)",
      "mi\u00B2": "Milha quadrada (mi\u00B2)", "yd\u00B2": "Jarda quadrada (yd\u00B2)",
      "cm\u00B2": "Centímetro quadrado (cm\u00B2)",
    },
    volume: {
      L: "Litro (L)", mL: "Mililitro (mL)", gal: "Galão US (gal)",
      "fl oz": "Onça líquida US (fl oz)", cup: "Xícara US", pt: "Pinta US (pt)",
      qt: "Quarto US (qt)", "m\u00B3": "Metro cúbico (m\u00B3)",
      "cm\u00B3": "Centímetro cúbico (cm\u00B3)", tbsp: "Colher de sopa (tbsp)", tsp: "Colher de chá (tsp)",
    },
    speed: {
      "m/s": "Metro/seg (m/s)", "km/h": "Quilômetro/h (km/h)", mph: "Milha/h (mph)",
      kn: "Nó (kn)", "ft/s": "Pé/seg (ft/s)", mach: "Mach",
    },
    time: {
      ms: "Milissegundo (ms)", s: "Segundo (s)", min: "Minuto (min)", h: "Hora (h)",
      d: "Dia (d)", wk: "Semana (wk)", mo: "Mês (mo)", yr: "Ano (yr)",
    },
    pressure: {
      Pa: "Pascal (Pa)", kPa: "Quilopascal (kPa)", bar: "Bar", psi: "PSI",
      atm: "Atmosfera (atm)", torr: "Torr", mmHg: "mmHg",
    },
    energy: {
      J: "Joule (J)", kJ: "Quilojoule (kJ)", cal: "Caloria (cal)", kcal: "Quilocaloria (kcal)",
      Wh: "Watt-hora (Wh)", kWh: "Quilowatt-hora (kWh)", BTU: "BTU", eV: "Elétron-volt (eV)",
    },
    power: {
      W: "Watt (W)", kW: "Quilowatt (kW)", MW: "Megawatt (MW)", hp: "Cavalo-vapor (hp)",
      "BTU/h": "BTU/h", "cal/s": "Caloria/seg",
    },
    frequency: {
      Hz: "Hertz (Hz)", kHz: "Quilohertz (kHz)", MHz: "Megahertz (MHz)",
      GHz: "Gigahertz (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "Grau (\u00B0)", rad: "Radiano (rad)", grad: "Grado (grad)",
      turn: "Volta", arcmin: "Minuto de arco (\u2032)", arcsec: "Segundo de arco (\u2033)",
    },
    "data-storage": {
      B: "Byte (B)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)",
      TB: "Terabyte (TB)", PB: "Petabyte (PB)", bit: "Bit",
      Kbit: "Kilobit", Mbit: "Megabit", Gbit: "Gigabit",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "Xícara", tbsp: "Colher de sopa", tsp: "Colher de chá", mL: "Mililitro (mL)",
      L: "Litro (L)", fl_oz: "Onça líquida", g: "Grama (g)", kg: "Quilograma (kg)",
      oz: "Onça (oz)", lb: "Libra (lb)",
    },
    "oven-temperature": { C: "Celsius (\u00B0C)", F: "Fahrenheit (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "Pixels (px)", rem: "Root Em (rem)" },
    "px-em": { px: "Pixels (px)", em: "Em (em)" },
    "px-percent": { px: "Pixels (px)", "%": "Porcentagem (%)" },
    "css-unit": {
      px: "Pixels (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "Porcentagem (%)", vw: "Largura do viewport (vw)", vh: "Altura do viewport (vh)",
    },
  },
};

export default dict;
