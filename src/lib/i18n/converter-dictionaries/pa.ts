import type { ConverterDictionary } from "../converter-config";

const dict: ConverterDictionary = {
  home: {
    title: "ਤੁਹਾਨੂੰ ਲੋੜੀਂਦੇ ਸਾਰੇ ਪਰਿਵਰਤਨ ਟੂਲ",
    titleAccent: "ਪਰਿਵਰਤਨ",
    description:
      "ਯੂਨਿਟ, ਰੰਗ, ਡਾਟਾ ਫਾਰਮੈਟ, ਮਿਤੀ ਬਦਲੋ। ਸਭ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਹੀ ਹੁੰਦਾ ਹੈ।",
    tabAll: "ਸਭ",
    categoryUnit: "ਯੂਨਿਟਾਂ",
    categoryNumber: "ਨੰਬਰ",
    categoryColor: "ਰੰਗ",
    categoryDatetime: "ਤਾਰੀਖ/ਸਮਾਂ",
    categoryData: "ਡੇਟਾ",
    categoryCss: "CSS",
    categoryCooking: "ਖਾਣਾ ਬਣਾਉਣਾ",
    categoryGeography: "ਭੂਗੋਲ",
    searchPlaceholder: "ਕਨਵਰਟਰ ਖੋਜੋ...",
    noResults: "ਕੋਈ ਕਨਵਰਟਰ ਨਹੀਂ ਮਿਲਿਆ।",
    recentTools: "ਹਾਲ ਹੀ ਵਿੱਚ ਵਰਤੇ",
    favorites: "ਮਨਪਸੰਦ",
    favDragHint: "ਕ੍ਰਮ ਬਦਲਣ ਲਈ ਘਸੀਟੋ",
    favHint: "ਮਨਪਸੰਦ ਵਿੱਚ ਜੋੜਨ ਲਈ ਤਾਰੇ 'ਤੇ ਕਲਿੱਕ ਕਰੋ",
    gridView: "ਗਰਿੱਡ ਵਿਊ",
    listView: "ਸੂਚੀ ਵਿਊ",
  },
  trust: {
    encryption: "ਸੁਰੱਖਿਅਤ ਪ੍ਰੋਸੈਸਿੰਗ",
    encryptionDesc: "ਸਾਰੀਆਂ ਤਬਦੀਲੀਆਂ ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਹੁੰਦੀਆਂ ਹਨ",
    autoDelete: "ਕੋਈ ਡੇਟਾ ਸਟੋਰ ਨਹੀਂ ਹੁੰਦਾ",
    autoDeleteDesc: "ਤੁਹਾਡਾ ਇਨਪੁਟ ਕਦੇ ਵੀ ਸੇਵ ਜਾਂ ਸਰਵਰ ਨੂੰ ਨਹੀਂ ਭੇਜਿਆ ਜਾਂਦਾ",
    free: "100% ਮੁਫ਼ਤ",
    freeDesc: "ਕੋਈ ਸੀਮਾ ਨਹੀਂ, ਕੋਈ ਸਾਈਨ-ਅੱਪ ਨਹੀਂ, ਕੋਈ ਲੁਕੀਆਂ ਫ਼ੀਸਾਂ ਨਹੀਂ",
    browserProcessing: "ਤੁਰੰਤ ਨਤੀਜੇ",
    browserProcessingDesc: "ਤੁਸੀਂ ਟਾਈਪ ਕਰਦੇ ਹੋ ਤਾਂ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਬਦਲਦਾ ਹੈ",
  },
  tools: {
    length: {
      title: "ਲੰਬਾਈ ਕਨਵਰਟਰ",
      description:
        "ਮੀਟਰ, ਕਿਲੋਮੀਟਰ, ਮੀਲ, ਫੁੱਟ, ਇੰਚ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    weight: {
      title: "ਭਾਰ ਕਨਵਰਟਰ",
      description:
        "ਕਿਲੋਗ੍ਰਾਮ, ਪੌਂਡ, ਔਂਸ, ਟਨ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    temperature: {
      title: "ਤਾਪਮਾਨ ਕਨਵਰਟਰ",
      description: "Celsius, Fahrenheit ਅਤੇ Kelvin ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    area: {
      title: "ਖੇਤਰਫ਼ਲ ਕਨਵਰਟਰ",
      description:
        "ਵਰਗ ਮੀਟਰ, ਹੈਕਟੇਅਰ, ਏਕੜ, ਵਰਗ ਫੁੱਟ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    volume: {
      title: "ਮਾਤਰਾ ਕਨਵਰਟਰ",
      description:
        "ਲੀਟਰ, ਗੈਲਨ, ਕੱਪ, ਫਲੂਇਡ ਔਂਸ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    speed: {
      title: "ਰਫ਼ਤਾਰ ਕਨਵਰਟਰ",
      description: "m/s, km/h, mph, ਨੌਟ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    time: {
      title: "ਸਮਾਂ ਕਨਵਰਟਰ",
      description:
        "ਸਕਿੰਟ, ਮਿੰਟ, ਘੰਟੇ, ਦਿਨ, ਹਫ਼ਤੇ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    pressure: {
      title: "ਦਬਾਅ ਕਨਵਰਟਰ",
      description:
        "Pascal, bar, PSI, ਵਾਯੂਮੰਡਲ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    energy: {
      title: "ਊਰਜਾ ਕਨਵਰਟਰ",
      description:
        "ਜੂਲ, ਕੈਲੋਰੀ, ਕਿਲੋਵਾਟ-ਘੰਟੇ, BTU ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    power: {
      title: "ਪਾਵਰ ਕਨਵਰਟਰ",
      description:
        "ਵਾਟ, ਕਿਲੋਵਾਟ, ਹਾਰਸਪਾਵਰ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    frequency: {
      title: "ਫ੍ਰੀਕੁਐਂਸੀ ਕਨਵਰਟਰ",
      description:
        "ਹਰਟਜ਼, ਕਿਲੋਹਰਟਜ਼, ਮੈਗਾਹਰਟਜ਼, ਗੀਗਾਹਰਟਜ਼ ਅਤੇ RPM ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    angle: {
      title: "ਕੋਣ ਕਨਵਰਟਰ",
      description: "ਡਿਗਰੀ, ਰੇਡੀਅਨ, ਗ੍ਰੇਡੀਅਨ ਅਤੇ ਟਰਨ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "data-storage": {
      title: "ਡੇਟਾ ਸਟੋਰੇਜ ਕਨਵਰਟਰ",
      description:
        "ਬਾਈਟ, ਕਿਲੋਬਾਈਟ, ਮੈਗਾਬਾਈਟ, ਗੀਗਾਬਾਈਟ ਅਤੇ ਹੋਰ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "fuel-economy": {
      title: "ਈਂਧਨ ਕੁਸ਼ਲਤਾ ਕਨਵਰਟਰ",
      description: "km/L, mpg ਅਤੇ L/100km ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "number-base": {
      title: "ਨੰਬਰ ਬੇਸ ਕਨਵਰਟਰ",
      description:
        "ਬਾਈਨਰੀ, ਆਕਟਲ, ਡੈਸੀਮਲ, ਹੈਕਸਾਡੈਸੀਮਲ ਅਤੇ ਕਸਟਮ ਬੇਸ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "roman-numeral": {
      title: "ਰੋਮਨ ਅੰਕ ਕਨਵਰਟਰ",
      description: "ਰੋਮਨ ਅੰਕਾਂ ਅਤੇ ਅਰਬੀ ਨੰਬਰਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "scientific-notation": {
      title: "ਵਿਗਿਆਨਕ ਸੰਕੇਤ ਕਨਵਰਟਰ",
      description:
        "ਵਿਗਿਆਨਕ ਸੰਕੇਤ ਅਤੇ ਮਿਆਰੀ ਨੰਬਰਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "fraction-decimal": {
      title: "ਭਿੰਨ ↔ ਦਸ਼ਮਲਵ",
      description: "ਭਿੰਨਾਂ ਅਤੇ ਦਸ਼ਮਲਵ ਨੰਬਰਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    percentage: {
      title: "ਪ੍ਰਤੀਸ਼ਤ ਕਨਵਰਟਰ",
      description:
        "ਭਿੰਨਾਂ, ਦਸ਼ਮਲਵ ਅਤੇ ਪ੍ਰਤੀਸ਼ਤ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "color-converter": {
      title: "ਰੰਗ ਕਨਵਰਟਰ",
      description:
        "HEX, RGB, HSL, HSV ਅਤੇ CMYK ਰੰਗ ਫਾਰਮੈਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "color-palette-generator": {
      title: "ਰੰਗ ਪੈਲੇਟ ਜਨਰੇਟਰ",
      description:
        "ਪੂਰਕ, ਤ੍ਰਿਆਦਿਕ ਅਤੇ ਸਮਰੂਪ ਰੰਗ ਪੈਲੇਟ ਤਿਆਰ ਕਰੋ।",
    },
    "gradient-generator": {
      title: "CSS ਗ੍ਰੇਡੀਐਂਟ ਜਨਰੇਟਰ",
      description:
        "ਲਾਈਵ ਪ੍ਰੀਵਿਊ ਨਾਲ ਲੀਨੀਅਰ, ਰੇਡੀਅਲ ਅਤੇ ਕੋਨਿਕ CSS ਗ੍ਰੇਡੀਐਂਟ ਬਣਾਓ।",
    },
    "color-contrast-checker": {
      title: "ਰੰਗ ਕੰਟ੍ਰਾਸਟ ਚੈਕਰ",
      description:
        "ਦੋ ਰੰਗਾਂ ਵਿਚਕਾਰ WCAG AA/AAA ਕੰਟ੍ਰਾਸਟ ਅਨੁਪਾਤ ਜਾਂਚੋ।",
    },
    "color-blindness-simulator": {
      title: "ਰੰਗ ਅੰਨ੍ਹੇਪਣ ਸਿਮੂਲੇਟਰ",
      description:
        "ਰੰਗ ਦ੍ਰਿਸ਼ਟੀ ਦੀ ਕਮੀ ਵਾਲੇ ਲੋਕਾਂ ਨੂੰ ਰੰਗ ਕਿਵੇਂ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ, ਸਿਮੂਲੇਟ ਕਰੋ।",
    },
    timezone: {
      title: "ਟਾਈਮਜ਼ੋਨ ਕਨਵਰਟਰ",
      description:
        "ਦੁਨੀਆ ਭਰ ਦੇ ਵੱਖ-ਵੱਖ ਟਾਈਮਜ਼ੋਨਾਂ ਵਿਚਕਾਰ ਸਮਾਂ ਬਦਲੋ।",
    },
    "unix-timestamp": {
      title: "Unix ਟਾਈਮਸਟੈਂਪ ਕਨਵਰਟਰ",
      description:
        "Unix ਟਾਈਮਸਟੈਂਪ ਅਤੇ ਪੜ੍ਹਨਯੋਗ ਤਾਰੀਖਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "date-format": {
      title: "ਤਾਰੀਖ ਫਾਰਮੈਟ ਕਨਵਰਟਰ",
      description:
        "ਵੱਖ-ਵੱਖ ਫਾਰਮੈਟਾਂ (ISO, US, EU ਅਤੇ ਹੋਰ) ਵਿਚਕਾਰ ਤਾਰੀਖਾਂ ਬਦਲੋ।",
    },
    "date-calculator": {
      title: "ਤਾਰੀਖ ਕੈਲਕੁਲੇਟਰ",
      description:
        "ਤਾਰੀਖਾਂ ਵਿਚਕਾਰ ਅੰਤਰ ਗਿਣੋ ਜਾਂ ਦਿਨ ਜੋੜੋ/ਘਟਾਓ।",
    },
    "age-calculator": {
      title: "ਉਮਰ ਕੈਲਕੁਲੇਟਰ",
      description:
        "ਜਨਮ ਤਾਰੀਖ ਤੋਂ ਸਾਲਾਂ, ਮਹੀਨਿਆਂ ਅਤੇ ਦਿਨਾਂ ਵਿੱਚ ਸਹੀ ਉਮਰ ਗਿਣੋ।",
    },
    "json-yaml": {
      title: "JSON ↔ YAML",
      description: "JSON ਅਤੇ YAML ਡੇਟਾ ਫਾਰਮੈਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "json-csv": {
      title: "JSON ↔ CSV",
      description:
        "JSON ਐਰੇ ਅਤੇ CSV ਸਪ੍ਰੈਡਸ਼ੀਟ ਫਾਰਮੈਟ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "json-xml": {
      title: "JSON ↔ XML",
      description: "JSON ਅਤੇ XML ਡੇਟਾ ਫਾਰਮੈਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "json-toml": {
      title: "JSON ↔ TOML",
      description:
        "JSON ਅਤੇ TOML ਕੌਂਫਿਗਰੇਸ਼ਨ ਫਾਰਮੈਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "markdown-html": {
      title: "Markdown ↔ HTML",
      description: "Markdown ਅਤੇ HTML ਮਾਰਕਅੱਪ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "csv-table": {
      title: "CSV ਤੋਂ ਟੇਬਲ",
      description: "CSV ਡੇਟਾ ਨੂੰ Markdown ਜਾਂ HTML ਟੇਬਲ ਵਿੱਚ ਬਦਲੋ।",
    },
    "json-typescript": {
      title: "JSON ਤੋਂ TypeScript",
      description: "JSON ਡੇਟਾ ਤੋਂ TypeScript ਇੰਟਰਫੇਸ ਤਿਆਰ ਕਰੋ।",
    },
    "sql-json": {
      title: "SQL ↔ JSON",
      description:
        "SQL INSERT ਸਟੇਟਮੈਂਟਾਂ ਅਤੇ JSON ਡੇਟਾ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "px-rem": {
      title: "px ↔ rem ਕਨਵਰਟਰ",
      description:
        "ਕਸਟਮ ਬੇਸ ਸਾਈਜ਼ ਨਾਲ ਪਿਕਸਲ ਅਤੇ rem ਯੂਨਿਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "px-em": {
      title: "px ↔ em ਕਨਵਰਟਰ",
      description:
        "ਕਸਟਮ ਪੇਰੈਂਟ ਸਾਈਜ਼ ਨਾਲ ਪਿਕਸਲ ਅਤੇ em ਯੂਨਿਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "px-percent": {
      title: "px ↔ % ਕਨਵਰਟਰ",
      description:
        "ਕਸਟਮ ਕੰਟੇਨਰ ਚੌੜਾਈ ਨਾਲ ਪਿਕਸਲ ਅਤੇ ਪ੍ਰਤੀਸ਼ਤ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "css-unit": {
      title: "CSS ਯੂਨਿਟ ਕਨਵਰਟਰ",
      description:
        "px, rem, em, %, vw, vh ਅਤੇ ਹੋਰ CSS ਯੂਨਿਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "css-minifier": {
      title: "CSS ਛੋਟਾ / ਸੁੰਦਰ ਬਣਾਓ",
      description:
        "ਉਤਪਾਦਨ ਜਾਂ ਪੜ੍ਹਨਯੋਗਤਾ ਲਈ CSS ਕੋਡ ਨੂੰ ਛੋਟਾ ਜਾਂ ਸੁੰਦਰ ਬਣਾਓ।",
    },
    "tailwind-css": {
      title: "Tailwind ↔ CSS",
      description:
        "Tailwind CSS ਕਲਾਸਾਂ ਅਤੇ ਸਾਦੀ CSS ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "cooking-measurement": {
      title: "ਖਾਣਾ ਪਕਾਉਣ ਮਾਪ ਕਨਵਰਟਰ",
      description:
        "ਕੱਪ, ਚਮਚੇ, ਛੋਟੇ ਚਮਚੇ, ਮਿਲੀਲੀਟਰ ਅਤੇ ਗ੍ਰਾਮ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "recipe-scaler": {
      title: "ਰੈਸਿਪੀ ਸਕੇਲਰ",
      description:
        "ਸਰਵਿੰਗ ਦੇ ਆਕਾਰ ਅਨੁਸਾਰ ਰੈਸਿਪੀ ਸਮੱਗਰੀ ਨੂੰ ਵਧਾਓ ਜਾਂ ਘਟਾਓ।",
    },
    "oven-temperature": {
      title: "ਓਵਨ ਤਾਪਮਾਨ ਕਨਵਰਟਰ",
      description:
        "ਓਵਨ ਤਾਪਮਾਨ ਲਈ Celsius, Fahrenheit ਅਤੇ Gas Mark ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    coordinate: {
      title: "ਕੋਆਰਡੀਨੇਟ ਕਨਵਰਟਰ",
      description:
        "DMS, DD ਅਤੇ DDM ਕੋਆਰਡੀਨੇਟ ਫਾਰਮੈਟਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    },
    "distance-calculator": {
      title: "ਦੂਰੀ ਕੈਲਕੁਲੇਟਰ",
      description:
        "ਦੋ ਭੂਗੋਲਿਕ ਕੋਆਰਡੀਨੇਟਾਂ ਵਿਚਕਾਰ ਦੂਰੀ ਗਿਣੋ।",
    },
  },
  nav: {
    allTools: "ਸਾਰੇ ਕਨਵਰਟਰ ਟੂਲ",
    language: "ਭਾਸ਼ਾ",
  },
  footer: {
    tools: "ਕਨਵਰਟਰ",
    legal: "ਕਾਨੂੰਨੀ",
    privacy: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
    terms: "ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ",
    copyright: "ToolPop. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
    company: "ਕੰਪਨੀ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    contact: "ਸੰਪਰਕ",
    faq: "FAQ",
  },
  common: {
    backToAll: "ਸਾਰੇ ਕਨਵਰਟਰ",
    inputPlaceholder: "ਬਦਲਣ ਲਈ ਮੁੱਲ ਦਰਜ ਕਰੋ...",
    outputLabel: "ਨਤੀਜਾ",
    copyToClipboard: "ਕਲਿੱਪਬੋਰਡ 'ਤੇ ਕਾਪੀ ਕਰੋ",
    copied: "ਕਾਪੀ ਹੋ ਗਿਆ!",
    clear: "ਸਾਫ਼ ਕਰੋ",
    paste: "ਪੇਸਟ ਕਰੋ",
    processing: "ਬਦਲ ਰਿਹਾ ਹੈ...",
    startOver: "ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰੋ",
    process: "ਬਦਲੋ",
    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    notImplemented: "ਇਹ ਕਨਵਰਟਰ ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ।",
    tryOtherTools: "ਹੋਰ ਕਨਵਰਟਰ ਅਜ਼ਮਾਓ",
    privacyBadge: "ਸਾਰੀਆਂ ਤਬਦੀਲੀਆਂ ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਹੁੰਦੀਆਂ ਹਨ",
    favoriteAdded: "ਮਨਪਸੰਦ ਵਿੱਚ ਜੋੜਿਆ ਗਿਆ",
    favoriteRemoved: "ਮਨਪਸੰਦ ਤੋਂ ਹਟਾਇਆ ਗਿਆ",
    comingSoon: "ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ",
    share: "ਸਾਂਝਾ ਕਰੋ",
    shareTitle: "ਇਹ ਕਨਵਰਟਰ ਸਾਂਝਾ ਕਰੋ",
    shareSubtitle: "ਇਹ ਲਾਭਦਾਇਕ ਕਨਵਰਟਰ ਹੋਰਾਂ ਨਾਲ ਸਾਂਝਾ ਕਰੋ",
    shareCopied: "ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ!",
    shareCopyLink: "ਲਿੰਕ ਕਾਪੀ ਕਰੋ",
    downloadAsFile: "ਡਾਊਨਲੋਡ",
    options: "ਵਿਕਲਪ",
    input: "ਇਨਪੁਟ",
    output: "ਆਊਟਪੁਟ",
    convert: "ਬਦਲੋ",
    swap: "ਅਦਲ-ਬਦਲ",
    from: "ਤੋਂ",
    to: "ਵਿੱਚ",
    result: "ਨਤੀਜਾ",
    allConversions: "ਸਾਰੀਆਂ ਤਬਦੀਲੀਆਂ",
    details: "ਵੇਰਵੇ",
    pageNotFound: "ਕਨਵਰਟਰ ਨਹੀਂ ਮਿਲਿਆ",
    goHome: "ਸਾਰੇ ਕਨਵਰਟਰਾਂ 'ਤੇ ਵਾਪਸ ਜਾਓ",
  },
  toolOptions: {
    fromUnit: "ਤੋਂ",
    toUnit: "ਵਿੱਚ",
    precision: "ਦਸ਼ਮਲਵ ਸਥਾਨ",
    baseSize: "ਬੇਸ ਫੌਂਟ ਸਾਈਜ਼ (px)",
    parentSize: "ਪੇਰੈਂਟ ਫੌਂਟ ਸਾਈਜ਼ (px)",
    containerWidth: "ਕੰਟੇਨਰ ਚੌੜਾਈ (px)",
    viewportWidth: "ਵਿਊਪੋਰਟ ਚੌੜਾਈ (px)",
    viewportHeight: "ਵਿਊਪੋਰਟ ਉਚਾਈ (px)",
    direction: "ਦਿਸ਼ਾ",
    mode: "ਮੋਡ",
    ingredient: "ਸਮੱਗਰੀ",
    water: "ਪਾਣੀ",
    flour: "ਆਟਾ",
    sugar: "ਖੰਡ",
    butter: "ਮੱਖਣ",
    rice: "ਚੌਲ",
    milk: "ਦੁੱਧ",
    originalServings: "ਅਸਲ ਸਰਵਿੰਗ",
    targetServings: "ਲੋੜੀਂਦੀ ਸਰਵਿੰਗ",
    fromTimezone: "ਟਾਈਮਜ਼ੋਨ ਤੋਂ",
    toTimezone: "ਟਾਈਮਜ਼ੋਨ ਵਿੱਚ",
    inputFormat: "ਇਨਪੁਟ ਫਾਰਮੈਟ",
    outputFormat: "ਆਊਟਪੁਟ ਫਾਰਮੈਟ",
    harmony: "ਰੰਗ ਸਦਭਾਵਨਾ",
    complementary: "ਪੂਰਕ",
    triadic: "ਤ੍ਰਿਆਦਿਕ",
    analogous: "ਸਮਰੂਪ",
    splitComplementary: "ਵੰਡਿਆ ਪੂਰਕ",
    tetradic: "ਟੈਟਰਾਡਿਕ",
    gradientType: "ਗ੍ਰੇਡੀਐਂਟ ਕਿਸਮ",
    linear: "ਲੀਨੀਅਰ",
    radial: "ਰੇਡੀਅਲ",
    conic: "ਕੋਨਿਕ",
    gradientAngle: "ਕੋਣ (deg)",
    rootName: "ਰੂਟ ਇੰਟਰਫੇਸ ਨਾਮ",
    tableName: "ਟੇਬਲ ਨਾਮ",
    minify: "ਛੋਟਾ ਕਰੋ",
    beautify: "ਸੁੰਦਰ ਬਣਾਓ",
    colorType: "ਕਮੀ ਦੀ ਕਿਸਮ",
    protanopia: "ਪ੍ਰੋਟੈਨੋਪੀਆ (ਲਾਲ ਨਹੀਂ)",
    deuteranopia: "ਡਿਊਟੇਰੈਨੋਪੀਆ (ਹਰਾ ਨਹੀਂ)",
    tritanopia: "ਟ੍ਰਾਈਟੈਨੋਪੀਆ (ਨੀਲਾ ਨਹੀਂ)",
    achromatopsia: "ਐਕਰੋਮੈਟੋਪਸੀਆ (ਰੰਗ ਨਹੀਂ)",
    operation: "ਓਪਰੇਸ਼ਨ",
    difference: "ਅੰਤਰ",
    add: "ਜੋੜੋ",
    subtract: "ਘਟਾਓ",
    amount: "ਮਾਤਰਾ",
    unit: "ਯੂਨਿਟ",
    days: "ਦਿਨ",
    weeks: "ਹਫ਼ਤੇ",
    months: "ਮਹੀਨੇ",
    years: "ਸਾਲ",
    fromBase: "ਬੇਸ ਤੋਂ",
    toBase: "ਬੇਸ ਵਿੱਚ",
    binary: "ਬਾਈਨਰੀ (2)",
    octal: "ਆਕਟਲ (8)",
    decimal: "ਡੈਸੀਮਲ (10)",
    hexadecimal: "ਹੈਕਸਾਡੈਸੀਮਲ (16)",
    seconds: "ਸਕਿੰਟ",
    milliseconds: "ਮਿਲੀਸਕਿੰਟ",
    autoDetect: "ਆਪਣੇ ਆਪ ਪਛਾਣੋ",
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
    markdown: "Markdown ਟੇਬਲ",
    html: "HTML ਟੇਬਲ",
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
    toRoman: "ਨੰਬਰ → ਰੋਮਨ",
    toArabic: "ਰੋਮਨ → ਨੰਬਰ",
    toScientific: "ਮਿਆਰੀ → ਵਿਗਿਆਨਕ",
    toStandard: "ਵਿਗਿਆਨਕ → ਮਿਆਰੀ",
    toFraction: "ਦਸ਼ਮਲਵ → ਭਿੰਨ",
    toDecimal: "ਭਿੰਨ → ਦਸ਼ਮਲਵ",
    decimalToPercent: "ਦਸ਼ਮਲਵ → ਪ੍ਰਤੀਸ਼ਤ",
    percentToDecimal: "ਪ੍ਰਤੀਸ਼ਤ → ਦਸ਼ਮਲਵ",
    fractionToPercent: "ਭਿੰਨ → ਪ੍ਰਤੀਸ਼ਤ",
    dd: "ਦਸ਼ਮਲਵ ਡਿਗਰੀ (DD)",
    dms: "ਡਿਗਰੀ ਮਿੰਟ ਸਕਿੰਟ (DMS)",
    ddm: "ਡਿਗਰੀ ਦਸ਼ਮਲਵ ਮਿੰਟ (DDM)",
    iso: "ISO 8601",
    us: "US (MM/DD/YYYY)",
    eu: "EU (DD/MM/YYYY)",
    long: "ਲੰਬਾ ਫਾਰਮੈਟ",
    short: "ਛੋਟਾ ਫਾਰਮੈਟ",
    relative: "ਸਾਪੇਖਿਕ",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    gasmark: "Gas Mark",
    backgroundColor: "ਪਿੱਠਭੂਮੀ ਰੰਗ",
    monochromatic: "ਇੱਕਰੰਗੀ",
    timestampToDate: "ਟਾਈਮਸਟੈਂਪ → ਤਾਰੀਖ",
    dateToTimestamp: "ਤਾਰੀਖ → ਟਾਈਮਸਟੈਂਪ",
    showDetails: "ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ ਦਿਖਾਓ",
    addDays: "ਦਿਨ ਜੋੜੋ",
    subtractDays: "ਦਿਨ ਘਟਾਓ",
    datetimeHint: "ਜਿਵੇਂ 2024-01-15, 1705312200, now",
  },
  statsLabels: {
    lines: "ਲਾਈਨਾਂ",
    characters: "ਅੱਖਰ",
    rows: "ਕਤਾਰਾਂ",
    columns: "ਕਾਲਮ",
    elements: "ਤੱਤ",
    keys: "ਕੁੰਜੀਆਂ",
    interfaces: "ਇੰਟਰਫੇਸ",
    properties: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    originalSize: "ਅਸਲ ਆਕਾਰ",
    resultSize: "ਨਤੀਜੇ ਦਾ ਆਕਾਰ",
    savings: "ਬੱਚਤ",
    ingredients: "ਸਮੱਗਰੀ",
    scaleFactor: "ਸਕੇਲ ਫੈਕਟਰ",
    contrastRatio: "ਕੰਟ੍ਰਾਸਟ ਅਨੁਪਾਤ",
    passAA: "WCAG AA",
    passAAA: "WCAG AAA",
    latitude: "ਅਕਸ਼ਾਂਸ਼",
    longitude: "ਦੇਸ਼ਾਂਤਰ",
    distanceKm: "ਦੂਰੀ (km)",
    distanceMi: "ਦੂਰੀ (mi)",
    years: "ਸਾਲ",
    months: "ਮਹੀਨੇ",
    days: "ਦਿਨ",
  },
  processorMessages: {
    invalidTimezone: "ਅਵੈਧ ਟਾਈਮਜ਼ੋਨ",
    pass: "ਪਾਸ", fail: "ਫੇਲ",
    fromNow: "ਹੁਣ ਤੋਂ", ago: "ਪਹਿਲਾਂ",
    today: "ਅੱਜ", tomorrow: "ਕੱਲ੍ਹ", yesterday: "ਕੱਲ੍ਹ",
    seconds: "ਸਕਿੰਟ", secondsPlural: "ਸਕਿੰਟ",
    minutes: "ਮਿੰਟ", minutesPlural: "ਮਿੰਟ",
    hours: "ਘੰਟਾ", hoursPlural: "ਘੰਟੇ",
    daysUnit: "ਦਿਨ", daysPlural: "ਦਿਨ",
    weeksUnit: "ਹਫ਼ਤਾ", weeksPlural: "ਹਫ਼ਤੇ",
    monthsUnit: "ਮਹੀਨਾ", monthsPlural: "ਮਹੀਨੇ",
    yearsUnit: "ਸਾਲ", yearsPlural: "ਸਾਲ",
    gasmark: "Gas Mark",
    veryCool: "ਬਹੁਤ ਠੰਡਾ", cool: "ਠੰਡਾ", moderatelyCool: "ਮੱਧਮ ਠੰਡਾ",
    moderate: "ਮੱਧਮ", moderatelyHot: "ਮੱਧਮ ਗਰਮ",
    hot: "ਗਰਮ", veryHot: "ਬਹੁਤ ਗਰਮ", extremelyHot: "ਅਤਿ ਗਰਮ",
    original: "ਮੂਲ",
    from: "ਤੋਂ", to: "ਵਿੱਚ",
    totalDays: "ਕੁੱਲ ਦਿਨ", weeksDays: "ਹਫ਼ਤੇ + ਦਿਨ",
    originalDate: "ਮੂਲ ਤਾਰੀਖ", operationLabel: "ਓਪਰੇਸ਼ਨ",
    resultDate: "ਨਤੀਜਾ ਤਾਰੀਖ", dayOfWeek: "ਹਫ਼ਤੇ ਦਾ ਦਿਨ",
    daysBetween: "ਦਿਨਾਂ ਦਾ ਅੰਤਰ",
    age: "ਉਮਰ", totalMonths: "ਕੁੱਲ ਮਹੀਨੇ",
    totalHours: "ਕੁੱਲ ਘੰਟੇ", totalMinutes: "ਕੁੱਲ ਮਿੰਟ",
    nextBirthday: "ਅਗਲਾ ਜਨਮਦਿਨ",
    roman: "ਰੋਮਨ", arabic: "ਅਰਬੀ",
    scientific: "ਵਿਗਿਆਨਕ", standard: "ਮਿਆਰੀ", engineering: "ਇੰਜੀਨੀਅਰਿੰਗ",
    fraction: "ਭਿੰਨ", simplified: "ਸਰਲੀਕ੍ਰਿਤ", percentage: "ਪ੍ਰਤੀਸ਼ਤ",
    color1: "ਰੰਗ 1", color2: "ਰੰਗ 2",
    contrastRatioLabel: "ਕੰਟ੍ਰਾਸਟ ਅਨੁਪਾਤ",
    aaNormalText: "AA ਆਮ ਟੈਕਸਟ", aaLargeText: "AA ਵੱਡਾ ਟੈਕਸਟ",
    aaaNormalText: "AAA ਆਮ ਟੈਕਸਟ", aaaLargeText: "AAA ਵੱਡਾ ਟੈਕਸਟ",
    gradientTypeLabel: "ਕਿਸਮ", gradientCss: "CSS",
  },
  metadata: {
    siteTitle: "ToolPop Converter — ਮੁਫ਼ਤ ਔਨਲਾਈਨ ਕਨਵਰਟਰ",
    siteDescription:
      "ਯੂਨਿਟਾਂ, ਰੰਗ, ਡੇਟਾ ਫਾਰਮੈਟ, ਤਾਰੀਖਾਂ ਅਤੇ ਹੋਰ ਬਦਲੋ। ਮੁਫ਼ਤ, ਤੇਜ਼ ਅਤੇ ਨਿੱਜੀ — ਸਭ ਕੁਝ ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਚੱਲਦਾ ਹੈ।",
    toolTitleSuffix: "| ToolPop Converter",
  },
  blog: {
    title: "ਬਲੌਗ",
    description:
      "ਯੂਨਿਟ ਤਬਦੀਲੀਆਂ, ਡੇਟਾ ਫਾਰਮੈਟ ਅਤੇ ਹੋਰ ਬਾਰੇ ਸੁਝਾਅ, ਗਾਈਡ ਅਤੇ ਜਾਣਕਾਰੀ।",
    readMore: "ਹੋਰ ਪੜ੍ਹੋ",
    backToBlog: "ਬਲੌਗ 'ਤੇ ਵਾਪਸ",
    publishedOn: "ਪ੍ਰਕਾਸ਼ਿਤ",
    categoryGuide: "ਗਾਈਡ",
    categoryTips: "ਸੁਝਾਅ",
    categoryKnowledge: "ਜਾਣਕਾਰੀ",
  },
  cookie: {
    message:
      "ਅਸੀਂ ਤੁਹਾਡੇ ਅਨੁਭਵ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਲਈ ਕੂਕੀਜ਼ ਵਰਤਦੇ ਹਾਂ। ਜਾਰੀ ਰੱਖ ਕੇ, ਤੁਸੀਂ ਸਾਡੀ ਕੂਕੀ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤ ਹੁੰਦੇ ਹੋ।",
    accept: "ਸਵੀਕਾਰ ਕਰੋ",
    decline: "ਇਨਕਾਰ ਕਰੋ",
  },
  unitLabels: {
    length: {
      m: "ਮੀਟਰ (m)", km: "ਕਿਲੋਮੀਟਰ (km)", cm: "ਸੈਂਟੀਮੀਟਰ (cm)", mm: "ਮਿਲੀਮੀਟਰ (mm)",
      mi: "ਮੀਲ (mi)", yd: "ਗਜ਼ (yd)", ft: "ਫੁੱਟ (ft)", in: "ਇੰਚ (in)",
      nm: "ਸਮੁੰਦਰੀ ਮੀਲ (nm)", "\u03BCm": "ਮਾਈਕ੍ਰੋਮੀਟਰ (\u03BCm)",
    },
    weight: {
      kg: "ਕਿਲੋਗ੍ਰਾਮ (kg)", g: "ਗ੍ਰਾਮ (g)", mg: "ਮਿਲੀਗ੍ਰਾਮ (mg)", lb: "ਪਾਊਂਡ (lb)",
      oz: "ਔਂਸ (oz)", ton: "ਮੈਟ੍ਰਿਕ ਟਨ (t)", st: "ਸਟੋਨ (st)", ct: "ਕੈਰਟ (ct)",
    },
    temperature: { C: "ਸੈਲਸੀਅਸ (\u00B0C)", F: "ਫਾਰਨਹਾਈਟ (\u00B0F)", K: "ਕੈਲਵਿਨ (K)" },
    area: {
      "m\u00B2": "ਵਰਗ ਮੀਟਰ (m\u00B2)", "km\u00B2": "ਵਰਗ ਕਿਲੋਮੀਟਰ (km\u00B2)",
      ha: "ਹੈਕਟੇਅਰ (ha)", acre: "ਏਕੜ", "ft\u00B2": "ਵਰਗ ਫੁੱਟ (ft\u00B2)",
      "mi\u00B2": "ਵਰਗ ਮੀਲ (mi\u00B2)", "yd\u00B2": "ਵਰਗ ਗਜ਼ (yd\u00B2)",
      "cm\u00B2": "ਵਰਗ ਸੈਂਟੀਮੀਟਰ (cm\u00B2)",
    },
    volume: {
      L: "ਲੀਟਰ (L)", mL: "ਮਿਲੀਲੀਟਰ (mL)", gal: "US ਗੈਲਨ (gal)",
      "fl oz": "US ਫਲੂਇਡ ਔਂਸ (fl oz)", cup: "US ਕੱਪ", pt: "US ਪਾਇੰਟ (pt)",
      qt: "US ਕੁਆਰਟ (qt)", "m\u00B3": "ਘਣ ਮੀਟਰ (m\u00B3)",
      "cm\u00B3": "ਘਣ ਸੈਂਟੀਮੀਟਰ (cm\u00B3)", tbsp: "ਵੱਡਾ ਚਮਚਾ (tbsp)", tsp: "ਛੋਟਾ ਚਮਚਾ (tsp)",
    },
    speed: {
      "m/s": "ਮੀਟਰ/ਸਕਿੰਟ (m/s)", "km/h": "ਕਿਲੋਮੀਟਰ/ਘੰਟਾ (km/h)", mph: "ਮੀਲ/ਘੰਟਾ (mph)",
      kn: "ਨੌਟ (kn)", "ft/s": "ਫੁੱਟ/ਸਕਿੰਟ (ft/s)", mach: "ਮੈਕ",
    },
    time: {
      ms: "ਮਿਲੀਸਕਿੰਟ (ms)", s: "ਸਕਿੰਟ (s)", min: "ਮਿੰਟ (min)", h: "ਘੰਟਾ (h)",
      d: "ਦਿਨ (d)", wk: "ਹਫ਼ਤਾ (wk)", mo: "ਮਹੀਨਾ (mo)", yr: "ਸਾਲ (yr)",
    },
    pressure: {
      Pa: "ਪਾਸਕਲ (Pa)", kPa: "ਕਿਲੋਪਾਸਕਲ (kPa)", bar: "ਬਾਰ", psi: "PSI",
      atm: "ਵਾਯੂਮੰਡਲ (atm)", torr: "ਟੌਰ", mmHg: "mmHg",
    },
    energy: {
      J: "ਜੂਲ (J)", kJ: "ਕਿਲੋਜੂਲ (kJ)", cal: "ਕੈਲੋਰੀ (cal)", kcal: "ਕਿਲੋਕੈਲੋਰੀ (kcal)",
      Wh: "ਵਾਟ-ਘੰਟਾ (Wh)", kWh: "ਕਿਲੋਵਾਟ-ਘੰਟਾ (kWh)", BTU: "BTU", eV: "ਇਲੈਕਟ੍ਰੌਨਵੋਲਟ (eV)",
    },
    power: {
      W: "ਵਾਟ (W)", kW: "ਕਿਲੋਵਾਟ (kW)", MW: "ਮੈਗਾਵਾਟ (MW)", hp: "ਘੋੜਾ ਸ਼ਕਤੀ (hp)",
      "BTU/h": "BTU/ਘੰਟਾ", "cal/s": "ਕੈਲੋਰੀ/ਸਕਿੰਟ",
    },
    frequency: {
      Hz: "ਹਰਟਜ਼ (Hz)", kHz: "ਕਿਲੋਹਰਟਜ਼ (kHz)", MHz: "ਮੈਗਾਹਰਟਜ਼ (MHz)",
      GHz: "ਗੀਗਾਹਰਟਜ਼ (GHz)", rpm: "RPM",
    },
    angle: {
      deg: "ਡਿਗਰੀ (\u00B0)", rad: "ਰੇਡੀਅਨ (rad)", grad: "ਗ੍ਰੇਡੀਅਨ (grad)",
      turn: "ਚੱਕਰ", arcmin: "ਆਰਕ ਮਿੰਟ (\u2032)", arcsec: "ਆਰਕ ਸਕਿੰਟ (\u2033)",
    },
    "data-storage": {
      B: "ਬਾਈਟ (B)", KB: "ਕਿਲੋਬਾਈਟ (KB)", MB: "ਮੈਗਾਬਾਈਟ (MB)", GB: "ਗੀਗਾਬਾਈਟ (GB)",
      TB: "ਟੈਰਾਬਾਈਟ (TB)", PB: "ਪੈਟਾਬਾਈਟ (PB)", bit: "ਬਿੱਟ",
      Kbit: "ਕਿਲੋਬਿੱਟ", Mbit: "ਮੈਗਾਬਿੱਟ", Gbit: "ਗੀਗਾਬਿੱਟ",
    },
    "fuel-economy": { "km/L": "km/L", mpg: "mpg (US)", "L/100km": "L/100km" },
    "cooking-measurement": {
      cup: "ਕੱਪ", tbsp: "ਵੱਡਾ ਚਮਚਾ", tsp: "ਛੋਟਾ ਚਮਚਾ", mL: "ਮਿਲੀਲੀਟਰ (mL)",
      L: "ਲੀਟਰ (L)", fl_oz: "ਫਲੂਇਡ ਔਂਸ", g: "ਗ੍ਰਾਮ (g)", kg: "ਕਿਲੋਗ੍ਰਾਮ (kg)",
      oz: "ਔਂਸ (oz)", lb: "ਪਾਊਂਡ (lb)",
    },
    "oven-temperature": { C: "ਸੈਲਸੀਅਸ (\u00B0C)", F: "ਫਾਰਨਹਾਈਟ (\u00B0F)", gasmark: "Gas Mark" },
    "px-rem": { px: "ਪਿਕਸਲ (px)", rem: "Root Em (rem)" },
    "px-em": { px: "ਪਿਕਸਲ (px)", em: "Em (em)" },
    "px-percent": { px: "ਪਿਕਸਲ (px)", "%": "ਪ੍ਰਤੀਸ਼ਤ (%)" },
    "css-unit": {
      px: "ਪਿਕਸਲ (px)", rem: "Root Em (rem)", em: "Em (em)",
      "%": "ਪ੍ਰਤੀਸ਼ਤ (%)", vw: "ਵਿਊਪੋਰਟ ਚੌੜਾਈ (vw)", vh: "ਵਿਊਪੋਰਟ ਉਚਾਈ (vh)",
    },
  },
};

export default dict;
