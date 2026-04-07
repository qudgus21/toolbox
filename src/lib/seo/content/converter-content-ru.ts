import type { ToolContentMap } from "../tool-content-types";

export const converterContentRu: ToolContentMap = {
  // Unit Converters
  "length": {
    howTo: {
      title: "Как преобразовать единицы длины",
      steps: [
        "Select the source unit (meters, feet, kilometers, miles, etc.)",
        "Enter the value you want to convert",
        "Choose the target unit from the dropdown",
        "View the converted result instantly",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Support for 15+ length units including metric and imperial",
        "Real-time conversion as you type",
        "Bidirectional conversion between any units",
        "High precision decimal calculations",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 kilometer equals 0.621371 miles for long distance calculations",
        "Use meters as your base unit for most scientific conversions",
        "Remember that 1 foot equals 12 inches for quick mental math",
      ],
    },
    faq: [
      { question: "How accurate are the conversions?", answer: "All conversions use standard international conversion factors with full floating-point precision for professional-grade accuracy." },
      { question: "Can I convert between metric and imperial?", answer: "Yes. The length converter supports all common metric units (mm, cm, m, km) and imperial units (inches, feet, yards, miles)." },
      { question: "Does this work offline?", answer: "Yes. Once the page loads, all conversions happen in your browser with no internet connection required." },
    ],
  },
  "weight": {
    howTo: {
      title: "Как преобразовать единицы веса",
      steps: [
        "Pick your source weight unit (kilograms, pounds, grams, ounces, etc.)",
        "Input the weight value you need to convert",
        "Select the target unit for conversion",
        "Get your result displayed instantly",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 12+ weight units globally",
        "Support for metric (kg, g) and imperial (lb, oz) systems",
        "Accurate decimal precision for scientific use",
        "Quick conversion without page reload",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 kilogram is approximately 2.2 pounds for quick estimation",
        "Use grams for precise cooking and baking measurements",
        "Metric tons (tonnes) are commonly used in shipping",
      ],
    },
    faq: [
      { question: "What's the difference between weight and mass?", answer: "Weight is the force of gravity on an object (measured in Newtons), while mass is the amount of matter (kilograms). This tool converts mass units as standard practice." },
      { question: "Why do ounces differ from grams?", answer: "One ounce equals approximately 28.35 grams. Avoirdupois ounces (common) and troy ounces (precious metals) have different values, so context matters." },
      { question: "Is my data private when I convert?", answer: "Completely. All weight conversions are calculated locally in your browser—nothing is sent to servers." },
    ],
  },
  "temperature": {
    howTo: {
      title: "Как преобразовать температуру",
      steps: [
        "Select Celsius, Fahrenheit, or Kelvin as your source temperature",
        "Enter the temperature value",
        "Choose your target temperature scale",
        "View the converted temperature instantly",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between Celsius, Fahrenheit, and Kelvin scales",
        "Support for both scientific and everyday temperature values",
        "Precise calculations for extreme temperature ranges",
        "Real-time conversion display",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Water freezes at 0°C, 32°F, and 273.15K",
        "Add 40 to Celsius, multiply by 9/5, then subtract 40 for a quick F conversion",
        "Kelvin starts at absolute zero and is used in scientific calculations",
      ],
    },
    faq: [
      { question: "Which countries use Fahrenheit?", answer: "The United States, Bahamas, Belize, Cayman Islands, Palau, and some US territories primarily use Fahrenheit. Most other countries use Celsius." },
      { question: "Why is Kelvin used in science?", answer: "Kelvin is the absolute temperature scale starting from absolute zero (−273.15°C), making it ideal for scientific calculations without negative numbers." },
      { question: "Can I convert negative temperatures?", answer: "Yes, this tool handles negative temperatures in both Celsius and Fahrenheit. Kelvin conversions start from absolute zero so negative values aren't possible." },
    ],
  },
  "area": {
    howTo: {
      title: "Как преобразовать единицы площади",
      steps: [
        "Select your source area unit (square meters, square feet, hectares, acres, etc.)",
        "Enter the area value you want to convert",
        "Choose the target area unit",
        "View your converted result",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert 15+ area units including metric and imperial",
        "Support for both small (mm²) and large (km²) areas",
        "Useful for real estate, agriculture, and construction",
        "Instant bidirectional conversion",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 hectare equals 10,000 square meters, commonly used in land measurement",
        "1 acre is approximately 4,047 square meters",
        "For property listings, convert m² to sq ft for international comparison",
      ],
    },
    faq: [
      { question: "How are square units different from linear units?", answer: "Square units measure area (length × width), while linear units measure just length. When converting, you must square the conversion factor." },
      { question: "What's a hectare used for?", answer: "Hectares measure land and forests globally. One hectare is 100m × 100m, making it convenient for agricultural and environmental contexts." },
      { question: "All my conversions stay private, right?", answer: "Absolutely. Area calculations never leave your device—everything runs locally in your browser." },
    ],
  },
  "volume": {
    howTo: {
      title: "Как преобразовать единицы объёма",
      steps: [
        "Select your starting volume unit (liters, gallons, milliliters, cups, etc.)",
        "Enter the volume amount to convert",
        "Select your target volume unit",
        "See the converted volume instantly",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Support for 20+ volume units from metric to US customary",
        "Convert cooking measurements like cups, tablespoons, and teaspoons",
        "Accurate for both liquid and dry volume conversions",
        "High precision for scientific applications",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 liter equals 1000 milliliters or approximately 0.264 gallons",
        "1 cup in cooking equals 236.588 milliliters",
        "Remember: 1 tablespoon = 3 teaspoons for recipe scaling",
      ],
    },
    faq: [
      { question: "Do US gallons equal UK gallons?", answer: "No. A US gallon is 3.785 liters while a UK (imperial) gallon is 4.546 liters. Always check the gallon type when converting." },
      { question: "Why are cups imprecise for baking?", answer: "Cups vary based on how densely you pack ingredients. Weight-based measurements (grams/ml) are far more accurate for consistent baking results." },
      { question: "Can I trust these calculations without internet?", answer: "Yes. All volume conversions are computed in your browser—no online connection needed and your numbers stay private." },
    ],
  },
  "speed": {
    howTo: {
      title: "Как преобразовать единицы скорости",
      steps: [
        "Choose your source speed unit (km/h, m/s, mph, knots, etc.)",
        "Input the speed value",
        "Select your target speed unit",
        "Get your converted speed value",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 10+ speed units including metric and imperial",
        "Support for knots commonly used in aviation and maritime",
        "Conversions for km/h, m/s, mph, and more",
        "Real-time instant conversion",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 kilometer per hour equals approximately 0.621 miles per hour",
        "1 knot is used in shipping and equals 1.852 kilometers per hour",
        "Speed limits vary by country - convert mph to km/h when traveling internationally",
      ],
    },
    faq: [
      { question: "What's a knot and why is it used at sea?", answer: "A knot is one nautical mile per hour (1.852 km/h). It's standard in maritime and aviation because nautical miles relate directly to Earth's latitude." },
      { question: "How fast is 100 km/h in mph?", answer: "Approximately 62.14 mph. As a quick mental estimate, divide km/h by 1.6 to get a rough mph value." },
      { question: "Do you store my speed conversions?", answer: "Never. All conversions happen instantly in your browser with zero data transmission or storage." },
    ],
  },
  "time": {
    howTo: {
      title: "Как преобразовать единицы времени",
      steps: [
        "Select your source time unit (seconds, minutes, hours, days, etc.)",
        "Enter the time duration you want to convert",
        "Choose your target time unit",
        "View the converted time value",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 8+ time units from seconds to years",
        "Support for both standard and decimal time formats",
        "Useful for project management and time tracking",
        "Instant bidirectional conversions",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 day equals 24 hours, 1440 minutes, or 86,400 seconds",
        "1 year approximately equals 365.25 days accounting for leap years",
        "Use decimal hours for precise time billing in professional settings",
      ],
    },
    faq: [
      { question: "How do you account for leap years?", answer: "This tool uses 365.25 days per year as the standard for longer conversions, which averages in the leap year effect across time." },
      { question: "Is there a difference between decimal hours and hh:mm format?", answer: "Yes—decimal hours (8.5) express time as a fraction of 24 hours, while hh:mm (8:30) uses hours and minutes. Both are supported here." },
      { question: "Are my time calculations saved anywhere?", answer: "No. All time conversions execute locally in your browser—nothing is logged or transmitted." },
    ],
  },
  "pressure": {
    howTo: {
      title: "Как преобразовать единицы давления",
      steps: [
        "Select your source pressure unit (pascals, bar, psi, atm, etc.)",
        "Enter the pressure value",
        "Choose your target pressure unit",
        "See your converted pressure result",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 12+ pressure units including Pa, bar, psi, and atm",
        "Support for both SI and non-SI pressure measurements",
        "Useful for industrial, scientific, and engineering applications",
        "High precision calculations for technical work",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 bar equals 100,000 pascals and is used in weather and tire pressure",
        "Atmospheric pressure at sea level is 101,325 pascals or 1 atm",
        "PSI (pounds per square inch) is common in North American tire pressure",
      ],
    },
    faq: [
      { question: "What's the standard tire pressure in bar vs PSI?", answer: "Standard car tire pressure is typically 32–35 PSI (2.2–2.4 bar). Check your vehicle's door jamb for the exact specification." },
      { question: "Why do weather reports use millibars?", answer: "Millibars (mb) or hectopascals (hPa) are convenient for atmospheric pressure since sea-level pressure is ~1013 mb, making variations easier to read." },
      { question: "Is there a privacy concern with pressure calculations?", answer: "No. Every conversion is performed instantly in your browser—no external connections or data transmission." },
    ],
  },
  "energy": {
    howTo: {
      title: "Как преобразовать единицы энергии",
      steps: [
        "Choose your source energy unit (joules, calories, BTU, kWh, etc.)",
        "Enter the energy value to convert",
        "Select your target energy unit",
        "Get the converted energy value",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Support for 10+ energy units from joules to kilowatt-hours",
        "Convert food calories to scientific calories",
        "BTU support for heating and cooling calculations",
        "Accurate for thermal and electrical energy",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 kilowatt-hour (kWh) equals 3,600,000 joules and is used for electricity billing",
        "1 calorie (food) equals 4,184 joules",
        "1 BTU is the energy needed to raise 1 pound of water by 1°F",
      ],
    },
    faq: [
      { question: "What's the difference between food calories and scientific calories?", answer: "Food calories (kilocalories or kcal) are 1,000 times larger than scientific calories. When nutrition labels show 'calories,' they actually mean kilocalories." },
      { question: "How do I interpret electricity bills with kWh?", answer: "Your bill shows consumption in kWh (kilowatt-hours). A 100W appliance running 10 hours uses 1 kWh. Multiply kWh by your local rate to calculate cost." },
      { question: "Does this tool require internet for energy calculations?", answer: "No. All energy conversions are computed instantly in your browser—completely offline and private." },
    ],
  },
  "power": {
    howTo: {
      title: "Как преобразовать единицы мощности",
      steps: [
        "Select your source power unit (watts, kilowatts, horsepower, etc.)",
        "Input the power value",
        "Choose your target power unit",
        "View the converted power value",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 8+ power units including watts and horsepower",
        "Support for kilowatts commonly used in electricity",
        "Conversion for BTU/hour used in HVAC systems",
        "Real-time precise calculations",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 kilowatt equals 1,000 watts and is standard for electrical power measurements",
        "1 horsepower (hp) equals approximately 745.7 watts",
        "Check appliance power ratings in watts to estimate energy consumption",
      ],
    },
    faq: [
      { question: "What does 'watts' mean on an appliance label?", answer: "Watts measure the rate of energy consumption. A 1,000W microwave uses more power per second than a 60W light bulb—meaning higher bills and more heat generation." },
      { question: "Why is horsepower still used for cars?", answer: "Horsepower (hp) is a traditional unit for engine power. Modern cars also list kilowatts, but hp remains familiar to many consumers in marketing." },
      { question: "Can I use this offline?", answer: "Absolutely. Power conversions are instant and browser-based—no internet or external servers involved." },
    ],
  },
  "frequency": {
    howTo: {
      title: "Как преобразовать единицы частоты",
      steps: [
        "Select your source frequency unit (hertz, kilohertz, megahertz, etc.)",
        "Enter the frequency value",
        "Choose your target frequency unit",
        "Get your converted frequency",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 6+ frequency units from Hz to GHz",
        "Support for RPM (rotations per minute) conversion",
        "Useful for electronics, radio, and mechanical applications",
        "Instant conversion results",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 kilohertz (kHz) equals 1,000 hertz and is used in radio frequencies",
        "1 megahertz (MHz) equals 1,000,000 hertz, common in wireless communications",
        "AC electrical frequency is typically 50 Hz or 60 Hz depending on country",
      ],
    },
    faq: [
      { question: "What does Hz measure exactly?", answer: "Hertz (Hz) measures cycles per second. For audio, higher Hz means higher pitch; for processors, higher Hz (GHz) means faster computation." },
      { question: "Why is AC electricity 50 Hz or 60 Hz?", answer: "These standards were chosen based on motor efficiency and historical development. Europe and Asia use 50 Hz, while North America uses 60 Hz." },
      { question: "Will my frequency conversions be tracked?", answer: "No. All conversions happen instantly on your device in your browser—completely private." },
    ],
  },
  "angle": {
    howTo: {
      title: "Как преобразовать единицы углов",
      steps: [
        "Choose your source angle unit (degrees, radians, gradians, etc.)",
        "Enter the angle value to convert",
        "Select your target angle unit",
        "View the converted angle",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between degrees, radians, gradians, and arc units",
        "Support for degrees-minutes-seconds (DMS) format",
        "Useful for mathematics, engineering, and navigation",
        "High precision for scientific calculations",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "360 degrees equals 2π radians or a complete circle",
        "1 radian equals approximately 57.3 degrees",
        "Gradians divide a circle into 400 parts, useful in surveying",
      ],
    },
    faq: [
      { question: "When should I use radians instead of degrees?", answer: "Radians are standard in higher mathematics and physics because they relate angles directly to arc length. Degrees are more intuitive for everyday use." },
      { question: "What are arcminutes and arcseconds used for?", answer: "These measure small angles precisely. Arcseconds are crucial in astronomy for positioning stars and planets, where accuracy matters enormously." },
      { question: "Is my angle conversion data kept?", answer: "No. All conversions calculate instantly in your browser without any data collection or transmission." },
    ],
  },
  "data-storage": {
    howTo: {
      title: "Как преобразовать единицы хранилища данных",
      steps: [
        "Select your source data unit (bytes, kilobytes, megabytes, gigabytes, etc.)",
        "Enter the data size value",
        "Choose your target data unit",
        "See your converted storage size",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 10+ data units from bytes to exabytes",
        "Support for both decimal (1000) and binary (1024) measurements",
        "Useful for file sizes, storage capacity, and bandwidth",
        "Clear distinction between MB and MiB formats",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 megabyte (MB) equals 1,000 kilobytes in decimal, or 1 MiB = 1,048,576 bytes binary",
        "1 gigabyte (GB) equals 1,000 megabytes, though storage often uses binary notation",
        "Check file sizes carefully - bandwidth limits often use decimal while storage uses binary",
      ],
    },
    faq: [
      { question: "Why is my hard drive smaller than advertised?", answer: "Manufacturers use decimal (1000 bytes = 1 KB), but operating systems use binary (1024 bytes = 1 KiB). This 2-3% difference adds up significantly on large drives." },
      { question: "What's the difference between MB and MiB?", answer: "MB (megabyte) = 1,000,000 bytes (decimal), while MiB (mebibyte) = 1,048,576 bytes (binary). Storage devices use binary; internet speeds typically use decimal." },
      { question: "Does this tool store my storage unit conversions?", answer: "Not at all. Conversions are done instantly in your browser without any external calls or data logging." },
    ],
  },
  "fuel-economy": {
    howTo: {
      title: "Как преобразовать расход топлива",
      steps: [
        "Select your source fuel economy unit (mpg, l/100km, km/l, etc.)",
        "Enter the fuel economy value",
        "Choose your target fuel economy unit",
        "Get your converted fuel economy",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between MPG, km/l, l/100km, and other fuel efficiency units",
        "Support for both US and metric fuel economy standards",
        "Useful for comparing vehicle efficiency across regions",
        "Instant accurate conversions",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Miles per gallon (MPG) is used in the US; kilometers per liter (km/l) in many other countries",
        "Lower l/100km values indicate better fuel efficiency, opposite of MPG",
        "Compare fuel economy when buying used vehicles across different regions",
      ],
    },
    faq: [
      { question: "Why is the efficiency scale inverted for l/100km?", answer: "Liters per 100km measures consumption (lower is better), while MPG measures distance per gallon (higher is better). They're inverse relationships." },
      { question: "How can I estimate fuel costs from efficiency?", answer: "Take your fuel efficiency (e.g., 25 MPG), divide distance by that number (e.g., 500 miles ÷ 25 = 20 gallons), then multiply by fuel price." },
      { question: "Are my fuel economy calculations private?", answer: "Completely. All conversions happen instantly in your browser with zero data transmission." },
    ],
  },

  // Number Converters
  "number-base": {
    howTo: {
      title: "Как преобразовать между числовыми основаниями",
      steps: [
        "Select your source number base (binary, decimal, hexadecimal, octal, etc.)",
        "Enter the number you want to convert",
        "Choose your target number base",
        "View the converted number value",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 5+ number bases: binary, octal, decimal, hexadecimal, base32",
        "Support for both positive and negative numbers",
        "Useful for programming and computer science",
        "Real-time conversion with instant results",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Binary (base 2) is the foundation of all computer operations",
        "Hexadecimal (base 16) is commonly used in web colors and memory addresses",
        "Octal (base 8) was historically used in computing but is less common today",
      ],
    },
    faq: [
      { question: "What's the easiest way to convert decimal to binary?", answer: "Repeatedly divide by 2 and note the remainders. Read the remainders bottom-to-top for your binary result. This tool does it instantly, of course." },
      { question: "Why use hexadecimal in programming?", answer: "Hexadecimal is compact (each digit represents 4 bits) and human-readable. Colors (#FF5733), memory addresses, and bytecode all use hex efficiently." },
      { question: "Is my number base conversion data private?", answer: "Yes. All conversions are processed instantly in your browser with no external servers or data storage." },
    ],
  },
  "roman-numeral": {
    howTo: {
      title: "How to Convert to/from Roman Numerals",
      steps: [
        "Select whether converting to or from Roman numerals",
        "Enter either a decimal number or Roman numeral",
        "View the conversion instantly",
        "Copy the result for use in documents or designs",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert decimal numbers to Roman numerals and vice versa",
        "Support for both standard and vinculum (overline) notation for large numbers",
        "Handles numbers from 1 to 3,999,999",
        "Useful for historical dates, outlines, and formal documents",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Roman numerals use I=1, V=5, X=10, L=50, C=100, D=500, M=1000",
        "A line (vinculum) over a numeral multiplies it by 1,000",
        "Subtractive notation (like IV for 4) follows specific rules",
      ],
    },
    faq: [
      { question: "Why is 4 written as IV and not IIII?", answer: "Subtractive notation puts a smaller value before a larger one to indicate subtraction. IV (5-1=4) is standard, though IIII appears on some clock faces for symmetry." },
      { question: "How do you represent numbers larger than 3,000?", answer: "A vinculum (horizontal line) above a numeral multiplies it by 1,000. For example, V with a line over it represents 5,000." },
      { question: "Is my conversion kept confidential?", answer: "Absolutely. All Roman numeral conversions happen locally in your browser—no data is collected or transmitted." },
    ],
  },
  "scientific-notation": {
    howTo: {
      title: "How to Convert Scientific Notation",
      steps: [
        "Choose whether converting from decimal or scientific notation",
        "Enter your number in the selected format",
        "Set the precision for significant figures if needed",
        "View the converted value instantly",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between decimal and scientific notation formats",
        "Support for very large and very small numbers",
        "Adjustable decimal places and significant figures",
        "Essential for physics, chemistry, and engineering",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Scientific notation expresses numbers as a × 10^n where 1 ≤ a < 10",
        "Use scientific notation for dealing with very large or very small values",
        "The exponent indicates how many places to move the decimal point",
      ],
    },
    faq: [
      { question: "When should I use scientific notation?", answer: "Use scientific notation for very large numbers (like the distance to stars) or very small numbers (like atomic sizes). It makes values easier to compare and calculate." },
      { question: "How do I interpret a negative exponent?", answer: "A negative exponent means the decimal moves left, creating a small number. For example, 2.5 × 10⁻³ equals 0.0025." },
      { question: "Does this tool track my scientific notation work?", answer: "No. All conversions are computed instantly in your browser with complete privacy." },
    ],
  },
  "fraction-decimal": {
    howTo: {
      title: "How to Convert Fractions to Decimals",
      steps: [
        "Select whether converting from fraction or decimal",
        "Enter your fraction (like 3/4) or decimal value",
        "Adjust precision settings if needed",
        "View the converted result",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between fractions, decimals, and percentages",
        "Simplify fractions to their lowest terms automatically",
        "Support for improper fractions and mixed numbers",
        "Display repeating decimals clearly",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Divide the numerator by denominator to convert fraction to decimal",
        "Common fractions: 1/2 = 0.5, 1/4 = 0.25, 1/3 = 0.333...",
        "Simplify fractions by finding the greatest common divisor",
      ],
    },
    faq: [
      { question: "What's a repeating decimal and why does it happen?", answer: "A repeating decimal occurs when division never terminates evenly. For example, 1/3 = 0.333... repeats infinitely because 3 doesn't divide evenly into 10's powers." },
      { question: "How do I convert 0.75 to a fraction?", answer: "Place the decimal over the appropriate power of 10 (0.75 = 75/100), then simplify by finding the GCD (75/100 = 3/4)." },
      { question: "Are my fraction conversions stored anywhere?", answer: "No. All conversions are instant browser-based calculations with no external tracking." },
    ],
  },
  "percentage": {
    howTo: {
      title: "How to Convert to/from Percentages",
      steps: [
        "Choose your input type: percentage, decimal, or fraction",
        "Enter the value you want to convert",
        "Select the output format desired",
        "View the converted percentage value",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between percentages, decimals, and fractions",
        "Calculate percentage changes and differences",
        "Show both simplified and decimal representations",
        "Useful for finance, statistics, and everyday calculations",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Percentage means 'per hundred' - so 50% = 0.5 = 1/2",
        "To find percentage change: (new - old) / old × 100",
        "Common percentages: 10% = 1/10, 25% = 1/4, 50% = 1/2, 75% = 3/4",
      ],
    },
    faq: [
      { question: "How do I calculate a 20% discount on a $50 item?", answer: "Multiply: $50 × 0.20 = $10 discount, so the final price is $50 - $10 = $40. This tool handles the math instantly." },
      { question: "What's the difference between percentage and percentage point?", answer: "If something rises from 10% to 15%, it increased by 5 percentage points but actually grew 50% in relative terms (10% → 15% is a 50% increase)." },
      { question: "Is my percentage calculation data private?", answer: "Completely. All percentage conversions happen locally in your browser with no data transmission." },
    ],
  },

  // Color Tools
  "color-converter": {
    howTo: {
      title: "Как преобразовать форматы цветов",
      steps: [
        "Select your source color format (HEX, RGB, HSL, CMYK, etc.)",
        "Enter the color value or pick a color from the color picker",
        "Choose your target color format",
        "View the converted color code instantly",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between HEX, RGB, HSL, CMYK, HSV, and Named colors",
        "Interactive color picker for visual color selection",
        "Copy color codes directly to clipboard",
        "Preview color while converting formats",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "HEX format (#RRGGBB) is most common for web design",
        "HSL (Hue, Saturation, Lightness) is more intuitive for manual color adjustments",
        "CMYK is used for print design; RGB for digital screens",
      ],
    },
    faq: [
      { question: "Should I use RGB or HEX for web colors?", answer: "Both work for web—HEX (#FF5733) is more compact and common in stylesheets, while RGB is better for dynamic calculations in JavaScript." },
      { question: "Why does my print color look different than on screen?", answer: "Screens use RGB (light-based), while printers use CMYK (ink-based). Color gamuts differ, so always preview prints or use CMYK color profiles." },
      { question: "Does this tool store my color choices?", answer: "No. All color conversions occur instantly in your browser—nothing is saved or transmitted." },
    ],
  },
  "color-palette-generator": {
    howTo: {
      title: "How to Generate Color Palettes",
      steps: [
        "Select your base color or enter a HEX code",
        "Choose a color harmony scheme (complementary, triadic, analogous, etc.)",
        "Adjust the palette intensity or saturation as needed",
        "Export or copy the generated color palette",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Generate harmonious color palettes from a single color",
        "Support for multiple color harmony schemes",
        "Adjustable saturation and brightness controls",
        "Export palettes as CSS, JSON, or image formats",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Complementary colors (opposite on color wheel) create strong contrast",
        "Analogous colors (adjacent on wheel) create harmonious, calm palettes",
        "Limit palettes to 3-5 colors for professional design consistency",
      ],
    },
    faq: [
      { question: "What's the difference between triadic and tetradic palettes?", answer: "Triadic uses 3 evenly-spaced colors on the wheel for balance; tetradic (split-complementary) uses 4 colors for more variety while maintaining harmony." },
      { question: "How many colors should my design use?", answer: "Keep it simple: 1 primary, 1-2 secondary, 1-2 accent colors. Too many colors create visual chaos and make designs feel unprofessional." },
      { question: "Are my palette choices kept private?", answer: "Absolutely. All palette generation happens in your browser with zero external communication." },
    ],
  },
  "gradient-generator": {
    howTo: {
      title: "How to Generate CSS Gradients",
      steps: [
        "Select gradient type (linear, radial, conic)",
        "Choose or customize your start and end colors",
        "Adjust gradient angle or position as needed",
        "Copy the generated CSS code to use in your project",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Create linear, radial, and conic gradients visually",
        "Generate production-ready CSS code",
        "Support for multiple color stops",
        "Real-time preview of gradient effects",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Linear gradients flow in one direction (90deg for vertical, 180deg for horizontal)",
        "Radial gradients emanate from center point (good for spotlights)",
        "Use color stops to create multi-color gradients smoothly",
      ],
    },
    faq: [
      { question: "What's the difference between 'to right' and '90deg' in CSS gradients?", answer: "They're equivalent—'to right' is the keyword syntax while '90deg' uses degrees. 'to right' is more readable but '90deg' offers more precision." },
      { question: "Can I use gradients on text?", answer: "Yes, with the CSS property 'background-clip: text' combined with '-webkit-text-fill-color: transparent'. This tool generates the gradient code you need." },
      { question: "Is my gradient work private?", answer: "Completely. All gradient generation happens in your browser with no external data collection." },
    ],
  },
  "color-contrast-checker": {
    howTo: {
      title: "How to Check Color Contrast",
      steps: [
        "Select or enter your foreground color (text)",
        "Select or enter your background color",
        "View the contrast ratio and WCAG compliance level",
        "Adjust colors if needed to meet accessibility standards",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate WCAG contrast ratio between two colors",
        "Check compliance with AA and AAA accessibility standards",
        "Provide suggestions for improving contrast",
        "Interactive color picker for easy adjustment",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "WCAG AA requires minimum 4.5:1 contrast for normal text",
        "WCAG AAA requires minimum 7:1 contrast for enhanced accessibility",
        "Dark text on light backgrounds generally provides better readability",
      ],
    },
    faq: [
      { question: "What does a contrast ratio of 4.5:1 actually mean?", answer: "It's the ratio of lighter to darker color brightness. A 4.5:1 ratio is readable by people with moderate vision loss; 7:1 is better for everyone." },
      { question: "Does large text have different contrast requirements?", answer: "Yes. Large text (18pt+ or 14pt bold) only needs 3:1 contrast for WCAG AA, while normal text needs 4.5:1. This accommodates readability differences." },
      { question: "Can I rely on this for accessibility testing?", answer: "This tool uses standard WCAG formulas, but pair it with real user testing. What works mathematically should still be tested with actual users." },
    ],
  },
  "color-blindness-simulator": {
    howTo: {
      title: "How to Simulate Color Blindness",
      steps: [
        "Upload an image or select a color to test",
        "Choose the type of color blindness to simulate",
        "View how the colors appear to people with that condition",
        "Adjust your design to ensure clarity for all users",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Simulate Protanopia, Deuteranopia, Tritanopia, and Monochromacy",
        "Test images or custom colors for accessibility",
        "Side-by-side comparison of original and simulated views",
        "Help ensure designs are inclusive and readable",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Protanopia (red blindness) affects about 1% of males",
        "Avoid using only red-green color distinctions to convey information",
        "Use patterns, shapes, or text labels alongside colors for clarity",
      ],
    },
    faq: [
      { question: "How common is color blindness?", answer: "About 8% of males and 0.5% of females have some form of red-green color blindness. Blue-yellow blindness is rarer (0.001%). Many are unaware they have it." },
      { question: "Is color blindness the same as seeing in grayscale?", answer: "Not always. Most color blindness is red-green confusion where colors shift, not complete grayscale. Full monochromacy (complete color blindness) is very rare." },
      { question: "Is my test image kept secure?", answer: "Yes. All simulations happen locally in your browser—images are never uploaded or stored." },
    ],
  },

  // Date/Time
  "timezone": {
    howTo: {
      title: "How to Convert Timezones",
      steps: [
        "Select your source timezone from the list",
        "Enter the date and time you want to convert",
        "Choose your target timezone",
        "View the converted time in the destination zone",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between 400+ timezones worldwide",
        "Account for daylight saving time automatically",
        "Display UTC offset for reference",
        "Useful for scheduling meetings across regions",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "UTC (Coordinated Universal Time) is the reference standard for all timezones",
        "Daylight saving time is not observed in all countries",
        "Check local time differences when scheduling international calls",
      ],
    },
    faq: [
      { question: "Do all countries observe daylight saving time?", answer: "No. Most of Europe and North America do, but many countries near the equator and in Asia/Africa don't. Always check both locations." },
      { question: "What's the difference between UTC, GMT, and Zulu time?", answer: "UTC is the international standard. GMT (Greenwich Mean Time) is similar but doesn't account for leap seconds. Zulu is aviation/military slang for UTC." },
      { question: "Is my timezone query stored?", answer: "No. All timezone conversions happen instantly in your browser without any external communication." },
    ],
  },
  "unix-timestamp": {
    howTo: {
      title: "How to Convert Unix Timestamps",
      steps: [
        "Choose between converting to or from Unix timestamp",
        "Enter your timestamp (in seconds) or human-readable date",
        "Select your timezone for accuracy",
        "View the converted timestamp or date",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between Unix timestamps and human-readable dates",
        "Support for milliseconds and microseconds",
        "Timezone-aware conversions",
        "Essential for programming and server logs",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Unix timestamp (epoch) starts at January 1, 1970 at 00:00:00 UTC",
        "Most systems use seconds, but some APIs use milliseconds",
        "Timestamps are always in UTC regardless of your local timezone",
      ],
    },
    faq: [
      { question: "Why does Unix time start at 1970?", answer: "Arbitrary choice by early Unix developers. It's a reference point from which all timestamps are calculated. The system handles date conversions automatically." },
      { question: "What's the difference between milliseconds and seconds in timestamps?", answer: "Seconds have lower precision but smaller numbers; milliseconds (1/1000 sec) are better for precise timing. Most modern APIs use milliseconds." },
      { question: "Can I trust this tool for server logging?", answer: "Yes. The timestamp conversions use standard UTC calculations. Verify against your server's timezone settings for production accuracy." },
    ],
  },
  "date-format": {
    howTo: {
      title: "How to Convert Date Formats",
      steps: [
        "Select your source date format",
        "Enter the date in that format",
        "Choose your target date format",
        "Copy the reformatted date for use",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Support for 20+ date format variations",
        "Convert between regional date formats (MM/DD/YYYY vs DD/MM/YYYY)",
        "Include or exclude time components as needed",
        "Prevent date confusion in international contexts",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "US format: MM/DD/YYYY; International format: DD/MM/YYYY",
        "ISO 8601 (YYYY-MM-DD) is the international standard for data exchange",
        "Always clarify date format in business communication to avoid misunderstanding",
      ],
    },
    faq: [
      { question: "Which date format should I use internationally?", answer: "ISO 8601 (YYYY-MM-DD) is the global standard and machine-readable. It avoids ambiguity—no confusion between 03/04/2025 (March 4th or April 3rd)." },
      { question: "Can I include the time in date conversions?", answer: "Yes. This tool supports date+time conversions. Specify your source format including the time component and it will convert both." },
      { question: "Is my date conversion data tracked?", answer: "No. All conversions happen instantly in your browser without any data logging or transmission." },
    ],
  },
  "date-calculator": {
    howTo: {
      title: "How to Use the Date Calculator",
      steps: [
        "Select your operation (add days, subtract dates, find day of week, etc.)",
        "Enter your date(s)",
        "Specify the number of days, months, or years to add/subtract",
        "View the calculated result",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Add or subtract days, months, and years from dates",
        "Calculate the difference between two dates",
        "Determine day of the week for any date",
        "Account for leap years automatically",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Leap years occur every 4 years (except centuries not divisible by 400)",
        "Use date calculations for project deadlines and milestone planning",
        "Month lengths vary: remember 30 days has September, April, June, November",
      ],
    },
    faq: [
      { question: "How do you calculate business days vs. calendar days?", answer: "This tool calculates calendar days (all 365). For business days, you'd need to exclude weekends and holidays manually. Use this as the base and adjust." },
      { question: "Does this handle leap years correctly?", answer: "Yes. The calculator automatically accounts for leap years (every 4 years, except centuries not divisible by 400). February 29th is included properly." },
      { question: "Is my date calculation private?", answer: "Absolutely. All calculations happen instantly in your browser with zero data collection." },
    ],
  },
  "age-calculator": {
    howTo: {
      title: "How to Calculate Your Age",
      steps: [
        "Enter your date of birth",
        "Select today's date or a specific reference date",
        "View your age in years, months, and days",
        "See additional information like total days lived",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate age in years, months, and days with precision",
        "Show total days, hours, and minutes lived",
        "Determine birth day of week",
        "Perfect for birthday planning and milestone tracking",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Age changes on your birthday each year",
        "Some cultures calculate age differently (adding 1 at birth in Korea)",
        "Keep track of important ages for legal documents (voting, driving, contracts)",
      ],
    },
    faq: [
      { question: "Do leap year births affect age calculation?", answer: "People born on Feb 29 typically celebrate their 'official' birthday on Feb 28 or Mar 1 in non-leap years. This tool recognizes the actual date correctly." },
      { question: "How are different cultures' age calculation methods handled?", answer: "This tool uses the Western standard (age increments on your birthday). Korean and some Asian cultures add 1 at birth; you may need to adjust those results." },
      { question: "Is age calculation data stored?", answer: "No. All calculations are instant and browser-based with zero data logging." },
    ],
  },

  // Data Format
  "json-yaml": {
    howTo: {
      title: "Как преобразовать JSON в YAML",
      steps: [
        "Paste your JSON data into the input field",
        "Click convert to transform to YAML format",
        "Review the YAML output for syntax",
        "Copy the YAML for use in configuration files",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Bidirectional conversion between JSON and YAML",
        "Automatic syntax validation",
        "Preserve data structure and types",
        "Useful for config files and data serialization",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "YAML is more human-readable but JSON is more widely supported",
        "YAML uses indentation to show structure instead of braces",
        "Be careful with YAML special characters and quotes",
      ],
    },
    faq: [
      { question: "Why would I choose YAML over JSON?", answer: "YAML is easier for humans to read/write (no braces, cleaner syntax) so it's popular for configuration files. JSON is better for APIs and data interchange." },
      { question: "Can I convert YAML to JSON?", answer: "Yes. This tool supports bidirectional conversion. Paste YAML, select 'YAML to JSON', and get valid JSON output." },
      { question: "Will my conversion data be shared?", answer: "No. All conversions happen entirely in your browser with no external transmission." },
    ],
  },
  "json-csv": {
    howTo: {
      title: "How to Convert JSON to CSV",
      steps: [
        "Paste your JSON array data into the input field",
        "Customize column headers if needed",
        "Set options for delimiters and quoting",
        "Download or copy the CSV output",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert JSON arrays to CSV tables",
        "Customizable delimiters (comma, tab, semicolon)",
        "Handle nested objects and arrays",
        "Useful for Excel and spreadsheet imports",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "CSV format is comma-separated values, widely supported in Excel",
        "Ensure JSON is an array of objects for clean CSV conversion",
        "Test CSV import in your target application before processing",
      ],
    },
    faq: [
      { question: "What JSON structure works best for CSV conversion?", answer: "An array of objects where each object is a row. Example: [{name: 'John', age: 30}, {name: 'Jane', age: 25}] becomes a table with name and age columns." },
      { question: "How are nested objects handled in CSV?", answer: "Flat CSV can't represent nested structures directly. This tool either flattens them into combined columns or converts them to separate tables depending on depth." },
      { question: "Is my JSON data kept private during conversion?", answer: "Completely private. All JSON-to-CSV conversion happens in your browser with zero external access." },
    ],
  },
  "json-xml": {
    howTo: {
      title: "Как преобразовать JSON в XML",
      steps: [
        "Enter your JSON data in the input field",
        "Configure XML root element and formatting options",
        "Click convert to generate XML",
        "Copy or download the XML output",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between JSON and XML formats",
        "Customize root element names",
        "Preserve attribute data correctly",
        "Useful for API integrations and legacy systems",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "XML is verbose but human-readable and widely supported",
        "JSON and XML can represent the same data differently",
        "Ensure valid structure for both formats",
      ],
    },
    faq: [
      { question: "Why is XML used if JSON is simpler?", answer: "XML is older and more widely supported in legacy systems (SOAP APIs, enterprise software). JSON is modern and preferred for new projects, but XML integration is still essential." },
      { question: "How do JSON attributes convert to XML?", answer: "JSON objects become XML elements, and arrays become repeated elements. Attributes are tricky—JSON has no native attribute concept, so they often become child elements." },
      { question: "Is my JSON/XML conversion private?", answer: "Yes. All conversions happen instantly in your browser without any data transmission." },
    ],
  },
  "json-toml": {
    howTo: {
      title: "How to Convert JSON to TOML",
      steps: [
        "Paste your JSON configuration data",
        "Configure TOML formatting preferences",
        "Convert to TOML format",
        "Copy the TOML for use in configuration files",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Bidirectional JSON and TOML conversion",
        "Support for nested tables and arrays",
        "Preserve data types in both directions",
        "Popular in Rust and modern web frameworks",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "TOML (Tom's Obvious, Minimal Language) is designed to be minimal and clear",
        "TOML is commonly used in Cargo.toml for Rust projects",
        "Watch for TOML-specific syntax like table headers [section]",
      ],
    },
    faq: [
      { question: "Should I use TOML or YAML for config files?", answer: "TOML is simpler and more explicit (good for simple configs). YAML is more powerful but flexible enough to be confusing. Choose based on complexity." },
      { question: "How do I define nested tables in TOML?", answer: "Use bracket notation: [section.subsection]. Each bracket pair creates a nested table. Keep nesting shallow for readability." },
      { question: "Is my TOML conversion data stored?", answer: "No. All conversions are instant and browser-based—completely private." },
    ],
  },
  "markdown-html": {
    howTo: {
      title: "How to Convert Markdown to HTML",
      steps: [
        "Write or paste your Markdown content",
        "Preview the HTML output in real-time",
        "Adjust formatting as needed",
        "Copy the HTML code for embedding",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert Markdown to clean HTML with proper formatting",
        "Support for tables, code blocks, and lists",
        "Live preview of rendered output",
        "Option to add CSS styling to output",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Markdown uses # for headings, * for bold, > for quotes",
        "Markdown is easier to write but HTML is needed for web display",
        "Use triple backticks for code blocks in Markdown",
      ],
    },
    faq: [
      { question: "How do I make a link in Markdown?", answer: "Use [link text](url). For example: [Google](https://google.com). You can also use reference-style links for cleaner syntax." },
      { question: "Can I embed images in Markdown?", answer: "Yes. Use ![alt text](image-url). The alt text describes the image for accessibility, and it appears if the image fails to load." },
      { question: "Is my Markdown conversion kept private?", answer: "Completely. All Markdown-to-HTML conversion happens in your browser—no external transmission." },
    ],
  },
  "csv-table": {
    howTo: {
      title: "How to Convert CSV to Table",
      steps: [
        "Paste your CSV data into the input area",
        "Configure delimiter and formatting options",
        "View the formatted table preview",
        "Copy or export the table as needed",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert CSV data to formatted HTML tables",
        "Support for custom delimiters and quoting",
        "Preview table rendering in real-time",
        "Export as HTML, JSON, or Markdown",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "First row often contains headers - mark them for special formatting",
        "Handle commas within quoted fields correctly",
        "Test table layout on mobile devices for responsiveness",
      ],
    },
    faq: [
      { question: "How do I handle commas inside CSV data?", answer: "Wrap the field containing commas in quotes. Example: 'Smith, John',30,Engineer becomes a single field rather than split columns." },
      { question: "What delimiters does this tool support?", answer: "Comma (standard), semicolon, tab, and pipe. Choose the delimiter that matches your CSV format—different regions prefer different standards." },
      { question: "Is my CSV data kept confidential?", answer: "Yes. All CSV-to-table conversions happen instantly in your browser with zero data collection." },
    ],
  },
  "json-typescript": {
    howTo: {
      title: "How to Generate TypeScript Types from JSON",
      steps: [
        "Paste your JSON sample data",
        "Configure naming and formatting options",
        "Generate TypeScript interfaces automatically",
        "Copy the type definitions for your project",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Generate TypeScript interfaces from JSON samples",
        "Support for nested objects and arrays",
        "Automatic type inference (string, number, boolean, null)",
        "Save time on manual type definitions",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Provide comprehensive JSON samples for accurate type generation",
        "Manually review generated types for edge cases",
        "Use optional properties (?) for fields that may not always exist",
      ],
    },
    faq: [
      { question: "Why should I use generated types instead of 'any'?", answer: "Generated types catch errors at compile time, enable IDE autocomplete, and document your data structure. 'any' defeats TypeScript's benefits and hides bugs." },
      { question: "How accurate is the automatic type inference?", answer: "Very accurate for simple fields, but edge cases matter. If a field is sometimes null/undefined, manually mark it optional (?). Provide comprehensive sample data." },
      { question: "Is my JSON data sent to any servers?", answer: "No. All type generation happens instantly in your browser—completely local and private." },
    ],
  },
  "sql-json": {
    howTo: {
      title: "How to Convert SQL to JSON",
      steps: [
        "Enter your SQL SELECT query results or sample data",
        "Configure JSON structure preferences",
        "Generate JSON from SQL data",
        "Copy the JSON for use in APIs or applications",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert SQL query results to JSON format",
        "Customize JSON structure and nesting",
        "Support for various SQL dialects",
        "Useful for API development and data migration",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "JSON representation requires column names as keys",
        "Array output for multiple rows is more efficient",
        "Test data types to ensure proper JSON serialization",
      ],
    },
    faq: [
      { question: "How do I convert actual SQL query results?", answer: "Run your SELECT query in your database client, export or copy the results, then paste them here. This tool works with query output, not live database connections." },
      { question: "What SQL formats are supported?", answer: "Most SQL dialects (MySQL, PostgreSQL, SQLite, SQL Server) produce output this tool can parse. Tab-separated and comma-separated results both work." },
      { question: "Will my SQL data be stored anywhere?", answer: "No. All SQL-to-JSON conversion happens instantly in your browser with complete privacy." },
    ],
  },

  // CSS/Web
  "px-rem": {
    howTo: {
      title: "How to Convert PX to REM",
      steps: [
        "Set your base font size (typically 16px)",
        "Enter the pixel value you want to convert",
        "View the REM equivalent value",
        "Use the REM value in your CSS stylesheets",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between pixels and REM units accurately",
        "Adjust base font size for different design systems",
        "Bidirectional conversion",
        "Essential for scalable, accessible web design",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "REM is relative to root font size; 1 REM typically equals 16px by default",
        "Using REM improves accessibility as users can adjust base font size",
        "Most design systems use 16px as base, making 1 REM = 16px math simple",
      ],
    },
    faq: [
      { question: "Why should I use REM instead of PX?", answer: "REM respects user font preferences. If a user sets their browser to 18px font, your 1rem becomes 18px automatically. PX ignores user settings, hurting accessibility." },
      { question: "What base font size should I use?", answer: "16px is standard. Some use 10px (for easier math like 10px = 0.625rem), but 16px is more accessible. Check your design system." },
      { question: "Is my conversion data private?", answer: "Completely. All PX-to-REM conversions happen instantly in your browser." },
    ],
  },
  "px-em": {
    howTo: {
      title: "How to Convert PX to EM",
      steps: [
        "Set your parent element's font size",
        "Enter the pixel value to convert",
        "View the EM equivalent",
        "Apply the EM value relative to parent",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between pixels and EM units with parent reference",
        "Support for nested EM calculations",
        "Useful for responsive typography",
        "Better scaling for component-based design",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "EM is relative to parent element's font size",
        "1 EM = parent element's font size",
        "Nested EM values multiply (0.5 EM in 0.5 EM parent = 0.25 of root)",
      ],
    },
    faq: [
      { question: "When should I use EM vs REM?", answer: "Use REM for global sizing (margins, padding, font-size). Use EM for component-scoped sizing where you want scaling relative to the component's own font size." },
      { question: "Why do nested EMs multiply?", answer: "An element with 0.8em inside a parent with 0.8em means: child = parent(0.8em) × 0.8 = 0.64 of the grandparent. This can cause unexpected cascading; REM avoids this." },
      { question: "Is my EM conversion kept private?", answer: "Yes. All conversions happen instantly in your browser with zero data collection." },
    ],
  },
  "px-percent": {
    howTo: {
      title: "How to Convert PX to Percent",
      steps: [
        "Set the parent container's width",
        "Enter the pixel width you want to convert",
        "View the percentage equivalent",
        "Use percentage for responsive layouts",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert pixel widths to percentages for responsive design",
        "Adjust parent container size for context",
        "Useful for fluid layouts and flexible components",
        "Help create mobile-responsive designs",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Percentage is relative to parent container width",
        "100% = full parent width",
        "Use percentages for better mobile responsiveness",
      ],
    },
    faq: [
      { question: "Why use percentages instead of pixels?", answer: "Percentages scale with screen size automatically, making designs responsive. Pixels are fixed and break on mobile. Percentages adapt to any container." },
      { question: "What if I use percentages on a parent that doesn't have a set width?", answer: "The percentage is calculated relative to its parent. Chain this back until you find a fixed-width ancestor. Use 100vw/100vh for full viewport width/height." },
      { question: "Is my percentage calculation data stored?", answer: "No. All conversions happen instantly in your browser—completely private." },
    ],
  },
  "css-unit": {
    howTo: {
      title: "Как преобразовать CSS-единицы",
      steps: [
        "Select your source CSS unit",
        "Enter the value",
        "Choose your target unit",
        "Get the converted CSS value",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between all CSS length units (px, em, rem, vh, vw, pt, cm, etc.)",
        "Comprehensive unit support for all design scenarios",
        "Real-time conversion and preview",
        "Essential for frontend development",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "VH/VW units are relative to viewport dimensions (good for hero sections)",
        "PT (points) is traditionally used in print, not web",
        "Mix units strategically for optimal responsive design",
      ],
    },
    faq: [
      { question: "What are VH and VW units?", answer: "VH (viewport height) and VW (viewport width) are percentages of the browser window. 100vh = full screen height, perfect for full-screen sections without scrolling." },
      { question: "Should I use CH units?", answer: "CH units equal the width of the '0' character (monospace). Useful for line-length limits in typography (typically 50-80ch for readability)." },
      { question: "Is my CSS unit conversion private?", answer: "Yes. All conversions happen instantly in your browser without any external communication." },
    ],
  },
  "css-minifier": {
    howTo: {
      title: "How to Minify CSS",
      steps: [
        "Paste your CSS code into the input field",
        "Click minify to compress the CSS",
        "View the optimized CSS output",
        "Copy the minified CSS for production",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Remove unnecessary whitespace and comments from CSS",
        "Reduce file size for faster page loading",
        "Preserve CSS functionality while minimizing size",
        "Option to preserve important comments",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Minified CSS typically reduces file size by 20-40%",
        "Always minify CSS in production for better performance",
        "Use source maps to debug minified CSS in development",
      ],
    },
    faq: [
      { question: "Does minifying CSS change how it works?", answer: "No. Minification removes whitespace and comments but preserves all CSS rules. The output is identical in functionality, just smaller." },
      { question: "What's the difference between minified and source maps?", answer: "Minified CSS is production-optimized but unreadable. Source maps let developers debug minified code by mapping it back to original source. Always use both." },
      { question: "Is my CSS code kept secure?", answer: "Absolutely. CSS minification happens instantly in your browser with zero data storage or transmission." },
    ],
  },
  "tailwind-css": {
    howTo: {
      title: "How to Convert to Tailwind CSS Classes",
      steps: [
        "Enter your traditional CSS properties",
        "View the suggested Tailwind CSS classes",
        "Copy the Tailwind classes to your HTML",
        "Apply the classes for instant styling",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Suggest Tailwind CSS utility classes for CSS properties",
        "Speed up development with utility-first CSS framework",
        "Support for responsive prefixes and hover states",
        "Convert traditional CSS to Tailwind equivalents",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Tailwind CSS uses utility classes for rapid development",
        "Responsive prefixes like md: and lg: simplify responsive design",
        "Tailwind classes can be combined for complex styles",
      ],
    },
    faq: [
      { question: "Is Tailwind CSS faster than writing custom CSS?", answer: "For development speed, yes—you compose styles via utility classes instead of writing CSS files. File size is similar after optimization and tree-shaking." },
      { question: "How do I use Tailwind's responsive prefixes?", answer: "Add prefixes like 'md:', 'lg:', 'xl:' to classes. Example: 'md:w-1/2' applies 50% width only on medium screens and above. Defaults are mobile-first." },
      { question: "Is my CSS-to-Tailwind conversion stored?", answer: "No. All conversions happen instantly in your browser with complete privacy." },
    ],
  },

  // Cooking/Kitchen
  "cooking-measurement": {
    howTo: {
      title: "How to Convert Cooking Measurements",
      steps: [
        "Select your source cooking unit (cups, tablespoons, grams, ml, etc.)",
        "Enter the amount to convert",
        "Choose your target cooking unit",
        "Use the converted measurement in your recipe",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between cooking units: cups, tablespoons, teaspoons, grams, ml, oz",
        "Support for both volume and weight measurements",
        "Ingredient-specific conversions when applicable",
        "Useful for adapting recipes for different regions",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "1 cup equals 16 tablespoons or 236.588 milliliters",
        "1 tablespoon equals 3 teaspoons for recipe scaling",
        "Weight measurements (grams) are more accurate than volume (cups)",
      ],
    },
    faq: [
      { question: "Are cups accurate for baking?", answer: "Volume measurements (cups) vary based on how you pack flour. Professional bakers use grams instead. If a recipe calls for cups, try to measure by weight for best results." },
      { question: "What's the difference between metric teaspoons and tablespoons?", answer: "Metric teaspoon (5ml) and metric tablespoon (15ml) are international standard. US spoons are slightly different. This tool converts between them accurately." },
      { question: "Does my cooking conversion get stored?", answer: "No. All cooking measurements convert instantly in your browser with zero data logging." },
    ],
  },
  "recipe-scaler": {
    howTo: {
      title: "How to Scale a Recipe",
      steps: [
        "Enter the original recipe's serving size",
        "Enter the desired serving size",
        "Input original ingredient amounts",
        "View scaled amounts for your desired serving",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Scale recipe ingredients up or down automatically",
        "Maintain proper ingredient proportions",
        "Support for fractional measurements",
        "Perfect for adjusting batch sizes",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Calculate scaling ratio: desired servings ÷ original servings",
        "Multiply each ingredient amount by this ratio",
        "Seasonings and spices may need independent adjustment",
      ],
    },
    faq: [
      { question: "Why do seasonings need independent adjustment?", answer: "Spices and salt don't scale linearly. Doubling a recipe doesn't always mean doubling the salt. Taste as you go and adjust seasonings last." },
      { question: "Can I scale recipes up or down by any amount?", answer: "Yes, mathematically. But extreme scaling (tiny or huge) may affect cooking times, temperature, and texture. Use common sense—don't scale a recipe to 10x the original." },
      { question: "Is my recipe scaling data kept private?", answer: "Absolutely. All recipe scaling happens instantly in your browser with zero data collection." },
    ],
  },
  "oven-temperature": {
    howTo: {
      title: "How to Convert Oven Temperature",
      steps: [
        "Select your source temperature scale (Celsius, Fahrenheit, Gas Mark)",
        "Enter your oven temperature",
        "View the converted temperature",
        "Adjust your oven to the correct setting",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between Celsius, Fahrenheit, and Gas Mark scales",
        "Support for different oven types and standards",
        "Show equivalent temperatures across scales",
        "Essential for international recipe following",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Gas Mark is primarily used in UK and Ireland ovens",
        "Most recipes state temperature in Celsius or Fahrenheit",
        "Oven preheating time varies; check your oven manual",
      ],
    },
    faq: [
      { question: "What's the conversion from Fahrenheit to Celsius for ovens?", answer: "Subtract 32, multiply by 5, divide by 9. Example: (350°F - 32) × 5/9 = 176.7°C, rounds to 180°C. This tool does it instantly." },
      { question: "Why use Gas Mark if I have a modern oven?", answer: "Older UK and Irish ovens use Gas Marks (1-9) instead of degrees. Newer ovens have both options. Always use the scale your oven displays." },
      { question: "Is oven temperature conversion private?", answer: "Yes. All temperature conversions happen instantly in your browser with no data transmission." },
    ],
  },

  // Geography
  "coordinate": {
    howTo: {
      title: "How to Convert Coordinates",
      steps: [
        "Select your source coordinate format (Decimal, DMS, MGRS, etc.)",
        "Enter the coordinates",
        "Choose your target coordinate format",
        "View the converted coordinates",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Convert between coordinate formats: decimal degrees, degrees-minutes-seconds, MGRS",
        "Support for latitude/longitude conversions",
        "Useful for mapping and GPS applications",
        "High precision for geographical work",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Decimal degrees format: latitude (N-S), longitude (E-W) with negative for S/W",
        "DMS format uses degrees, minutes, seconds for higher precision",
        "Always verify hemisphere indicators (N, S, E, W) when converting",
      ],
    },
    faq: [
      { question: "Which coordinate format is best?", answer: "Decimal degrees are modern and computer-friendly (e.g., 40.7128, -74.0060 for NYC). DMS is traditional and precise for surveying. GPS devices output both." },
      { question: "What's MGRS and when is it used?", answer: "Military Grid Reference System (MGRS) divides Earth into a grid. Used by military, emergency services, and geocaching. Less common in civilian GPS apps." },
      { question: "Will my coordinates be shared?", answer: "No. All coordinate conversions happen instantly in your browser—completely private." },
    ],
  },
  "distance-calculator": {
    howTo: {
      title: "How to Calculate Distance Between Coordinates",
      steps: [
        "Enter the first location's latitude and longitude",
        "Enter the second location's coordinates",
        "Select your preferred distance unit",
        "View the calculated distance",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate straight-line distance between two geographical points",
        "Support for kilometers, miles, nautical miles",
        "Use Haversine formula for accurate Earth calculations",
        "Essential for logistics and travel planning",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Haversine formula accounts for Earth's curvature for accuracy",
        "Straight-line distance differs from road/travel distance",
        "Always provide coordinates with both latitude and longitude",
      ],
    },
    faq: [
      { question: "Why is straight-line distance different from driving distance?", answer: "Straight-line (great-circle) distance is the shortest path on a sphere. Road distance follows roads, which wind around obstacles. Road distance is always longer." },
      { question: "How accurate is the Haversine formula?", answer: "Extremely accurate for most purposes—within 0.5% for typical distances. It accounts for Earth's shape. For surveying, use more complex geodetic formulas." },
      { question: "Is my location data kept private?", answer: "Absolutely. All distance calculations happen instantly in your browser with zero data logging or transmission." },
    ],
  },
};
