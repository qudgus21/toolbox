import { landingContentKo } from "./landing-content-ko";

export interface LandingContentData {
  title: string;
  description: string;
  sections: { heading: string; text: string }[];
}

// Localized landing content — populated as translation files are added
// Structure: { locale: { app: LandingContentData } }
const localizedLandingContent: Record<
  string,
  Record<string, LandingContentData>
> = {
  ko: landingContentKo,
};

export function getLandingContent(
  app: string,
  locale: string = "en",
): LandingContentData | undefined {
  if (locale !== "en") {
    const localized = localizedLandingContent[locale]?.[app];
    if (localized) return localized;
  }
  return landingContent[app];
}

export const landingContent: Record<string, LandingContentData> = {
  pdf: {
    title: "About ToolPop PDF",
    description:
      "ToolPop PDF is a free, browser-based suite of over 40 PDF tools. Merge, split, compress, convert, edit, sign, redact, and secure your PDF documents without uploading files to any server. Everything runs locally in your browser using WebAssembly technology, ensuring maximum privacy and speed. Whether you need to combine multiple invoices into one file, extract specific pages from a report, or add a digital signature to a contract, ToolPop PDF handles it all without requiring any software installation or account creation.",
    sections: [
      {
        heading: "Privacy-First Processing",
        text: "All PDF operations happen entirely in your browser using WebAssembly and JavaScript. Your files never leave your device, which means sensitive documents like legal contracts, medical records, and financial statements stay completely private. Unlike cloud-based PDF services that upload your files to remote servers, ToolPop processes everything locally. There are no account requirements, no file size limits, and no watermarks added to your output files.",
      },
      {
        heading: "Comprehensive Toolkit",
        text: "From basic tasks like merging and splitting to advanced features like redaction, digital signatures, page numbering, and PDF/A conversion, ToolPop PDF covers every PDF workflow. Organize pages with drag-and-drop, add watermarks for branding, compress files for email attachments, crop pages to remove margins, or convert between PDF and image formats with a few clicks. Each tool is purpose-built to handle its specific task efficiently.",
      },
      {
        heading: "Built for Everyone",
        text: "Students can merge lecture notes into study guides. Legal professionals can redact confidential information from court filings. Business teams can add headers, footers, and page numbers to proposals. Designers can convert high-resolution images to PDF portfolios. ToolPop PDF adapts to any workflow, whether you are processing a single page or batch-handling hundreds of documents at once.",
      },
      {
        heading: "How PDF Processing Works",
        text: "PDF (Portable Document Format) is an ISO-standardized file format created by Adobe in 1993 to preserve document formatting across different systems. ToolPop leverages modern browser APIs and WebAssembly-compiled libraries like pdf-lib and PDF.js to parse, modify, and render PDF files entirely on the client side. This approach eliminates server round-trips, reduces latency, and ensures your documents are never exposed to third-party infrastructure.",
      },
    ],
  },
  image: {
    title: "About ToolPop Image",
    description:
      "ToolPop Image provides over 70 free online image editing and conversion tools. Resize, crop, compress, rotate, flip, convert formats, apply filters, remove backgrounds, add text and watermarks, and create graphics — all processed locally in your browser with zero server uploads. Support for JPG, PNG, WebP, SVG, GIF, TIFF, HEIC, BMP, ICO, PSD, EPS, and more makes ToolPop Image a versatile solution for photographers, designers, marketers, and developers who need quick image manipulation without installing desktop software.",
    sections: [
      {
        heading: "Edit Without Software",
        text: "No need to install Photoshop, GIMP, or any other desktop application. ToolPop Image handles everyday image tasks right in your browser — resize images for social media posts, crop photos to specific aspect ratios, add text overlays or watermarks for branding, and apply professional filters for color correction. The real-time preview lets you see changes instantly before downloading.",
      },
      {
        heading: "Format Conversion Made Easy",
        text: "Convert between JPG, PNG, WebP, SVG, GIF, TIFF, HEIC, BMP, ICO, EPS, and more. Batch processing lets you convert hundreds of files at once with consistent quality settings. Every conversion preserves image quality while optimizing file size. Support for modern formats like WebP and HEIC ensures your images are ready for the latest platforms and devices.",
      },
      {
        heading: "Optimization for the Web",
        text: "Web performance depends heavily on image optimization. ToolPop Image helps you compress images to reduce page load times without visible quality loss. Convert PNG screenshots to WebP for 30-50% smaller files. Resize hero images to exact pixel dimensions for responsive layouts. Generate favicon ICO files from any image. These optimizations directly improve Core Web Vitals scores and user experience.",
      },
      {
        heading: "How Image Processing Works",
        text: "ToolPop Image uses the HTML5 Canvas API, OffscreenCanvas, and WebAssembly-compiled codecs to decode, manipulate, and re-encode image data entirely in the browser. JPEG compression uses the discrete cosine transform (DCT), PNG uses deflate compression with filtering, and WebP combines predictive coding with arithmetic entropy coding. All processing happens on your device using your CPU and GPU, so your images are never uploaded anywhere.",
      },
    ],
  },
  text: {
    title: "About ToolPop Text",
    description:
      "ToolPop Text offers over 40 free text manipulation, analysis, encoding, and developer tools. Count words, transform case, find and replace patterns, generate hashes, format JSON, test regular expressions, encode and decode Base64, compare text differences, and more — all running instantly in your browser. Built for writers, developers, data analysts, and anyone who works with text on a daily basis.",
    sections: [
      {
        heading: "For Writers and Content Creators",
        text: "Whether you need accurate word counts for an article, character counts for social media posts with strict limits, or readability analysis for academic papers, ToolPop Text provides specialized tools for every text-related task. Transform text between uppercase, lowercase, title case, sentence case, and other formats. Remove duplicate lines, sort alphabetically, or reverse text — all with real-time results as you type.",
      },
      {
        heading: "For Developers",
        text: "Format and validate JSON with syntax highlighting. Test regular expressions with live matching and capture group visualization. Encode and decode Base64, URL encoding, and HTML entities. Generate MD5, SHA-1, SHA-256, and other cryptographic hashes. Compare two text blocks with a visual diff viewer. These tools eliminate the need for separate CLI utilities or browser extensions during development workflows.",
      },
      {
        heading: "Instant Results",
        text: "Every text tool processes input in real-time as you type. There are no server round-trips, no waiting for API responses, and no file uploads. Handle large documents with thousands of lines thanks to optimized client-side processing. Copy results to clipboard with a single click. The tools work equally well on desktop and mobile devices.",
      },
      {
        heading: "How Text Processing Works",
        text: "Text manipulation in ToolPop uses native JavaScript string operations, the TextEncoder/TextDecoder APIs for encoding conversions, and the SubtleCrypto API for cryptographic hash generation. Regular expression testing leverages the built-in RegExp engine with support for Unicode properties, lookaheads, and named capture groups. All operations are performed in-memory within the browser tab, ensuring privacy and speed.",
      },
    ],
  },
  converter: {
    title: "About ToolPop Converter",
    description:
      "ToolPop Converter is a free unit and data conversion toolkit with over 50 tools. Convert measurements, colors, dates, time zones, data formats, CSS units, and number systems instantly in your browser. From everyday cooking measurements and temperature conversions to developer-focused JSON/YAML/XML transformations and color space conversions, ToolPop Converter handles any conversion task without requiring software installation or internet connectivity after the initial page load.",
    sections: [
      {
        heading: "Everyday Conversions",
        text: "Length, weight, temperature, area, volume, speed, pressure, energy, and time — all standard unit conversions are available with real-time results and clear formatting. Convert between metric and imperial systems, handle cooking measurements like cups and tablespoons, or calculate fuel efficiency in different units. Each converter includes reference tables and conversion formulas for educational context.",
      },
      {
        heading: "Developer Data Tools",
        text: "Convert between JSON, YAML, CSV, XML, TOML, and TypeScript type definitions. Minify or beautify CSS, convert between px/rem/em units with configurable base sizes, and generate Tailwind CSS utility classes. Transform number bases between binary, octal, decimal, and hexadecimal. These tools integrate seamlessly into modern development workflows and eliminate manual data format wrangling.",
      },
      {
        heading: "Color and Design Conversions",
        text: "Convert colors between HEX, RGB, HSL, HSB, CMYK, and named CSS colors with a visual color picker. Preview color palettes, check contrast ratios for accessibility compliance (WCAG 2.1), and generate complementary or analogous color schemes. Essential for designers and frontend developers who work with color values across different tools and platforms.",
      },
      {
        heading: "How Conversions Work",
        text: "ToolPop Converter uses precise mathematical formulas based on international measurement standards (SI, NIST, ISO) for unit conversions. Data format transformations are handled by JavaScript parsers for JSON, YAML, XML, CSV, and TOML with proper error handling and validation. Color space conversions use the CIE color model as an intermediate representation to ensure accurate transformations between different color systems.",
      },
    ],
  },
  calculator: {
    title: "About ToolPop Calculator",
    description:
      "ToolPop Calculator provides over 50 free online calculators for math, finance, health, statistics, science, and everyday tasks. From compound interest and mortgage payments to BMI and calorie counting, from matrix operations and quadratic equations to subnet calculations and electricity costs — accurate results with clear explanations and step-by-step breakdowns. Every calculator uses validated formulas and handles edge cases properly.",
    sections: [
      {
        heading: "Financial Calculators",
        text: "Calculate compound interest, loan amortization schedules, mortgage payments, ROI, break-even points, tip splitting, discount percentages, and tax estimates. Each financial calculator shows detailed breakdowns including monthly payment schedules, total interest paid, and effective annual rates. Input validation ensures realistic parameters, and results include explanatory context to help users understand the calculations.",
      },
      {
        heading: "Health and Fitness",
        text: "BMI, BMR, TDEE, body fat percentage, calorie needs, macronutrient ratios, ideal weight ranges, and pregnancy due dates — all calculated using clinically validated equations (Harris-Benedict, Mifflin-St Jeor, WHO classifications). Results include health category classifications, recommended ranges, and disclaimers about consulting healthcare professionals. The calculators support both metric and imperial input units.",
      },
      {
        heading: "Math and Science",
        text: "Solve quadratic equations, calculate GPA, perform matrix operations, compute statistical measures (mean, median, standard deviation, correlation), convert number bases, and calculate geometric properties (area, perimeter, volume). Each calculator shows the formula used and intermediate steps so students and professionals can verify the methodology and learn from the process.",
      },
      {
        heading: "How Calculations Work",
        text: "ToolPop Calculator uses JavaScript's IEEE 754 double-precision arithmetic with careful rounding strategies to avoid floating-point precision issues. Financial calculations use the standard time-value-of-money formulas. Statistical functions handle both sample and population variants. All calculators validate inputs against reasonable bounds and provide clear error messages when inputs fall outside expected ranges. Results are computed instantly in the browser with no server dependency.",
      },
    ],
  },
};
