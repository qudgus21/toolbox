export interface LandingContentData {
  title: string;
  description: string;
  sections: { heading: string; text: string }[];
}

export const landingContent: Record<string, LandingContentData> = {
  pdf: {
    title: "About ToolPop PDF",
    description:
      "ToolPop PDF is a free, browser-based suite of PDF tools. Merge, split, compress, convert, edit, and secure your PDF documents without uploading files to any server — everything runs locally in your browser for maximum privacy and speed.",
    sections: [
      {
        heading: "Privacy-First Processing",
        text: "All PDF operations happen entirely in your browser using WebAssembly and JavaScript. Your files never leave your device, so sensitive documents stay private. No account required, no file size limits, no watermarks.",
      },
      {
        heading: "Comprehensive Toolkit",
        text: "From basic tasks like merging and splitting to advanced features like redaction, digital signatures, and PDF/A conversion — ToolPop PDF covers every PDF workflow. Organize pages, add watermarks, compress for email, or convert between formats with a few clicks.",
      },
    ],
  },
  image: {
    title: "About ToolPop Image",
    description:
      "ToolPop Image provides free online image editing and conversion tools. Resize, crop, compress, convert formats, apply filters, and create graphics — all processed locally in your browser with zero server uploads.",
    sections: [
      {
        heading: "Edit Without Software",
        text: "No need to install Photoshop or GIMP. ToolPop Image handles everyday image tasks right in your browser — resize for social media, crop to specific dimensions, add text or watermarks, and apply professional filters instantly.",
      },
      {
        heading: "Format Conversion Made Easy",
        text: "Convert between JPG, PNG, WebP, SVG, HEIC, TIFF, PSD, EPS, and more. Batch processing lets you convert multiple files at once. Every conversion preserves quality while optimizing file size.",
      },
    ],
  },
  text: {
    title: "About ToolPop Text",
    description:
      "ToolPop Text offers a collection of free text manipulation, analysis, and encoding tools. Count words, transform case, find and replace, generate hashes, format JSON, and more — all running instantly in your browser.",
    sections: [
      {
        heading: "For Writers and Developers",
        text: "Whether you need word counts for an essay, regex testing for code, Base64 encoding for API work, or Lorem Ipsum for mockups — ToolPop Text has a specialized tool for every text task.",
      },
      {
        heading: "Instant Results",
        text: "Every tool processes text in real-time as you type. No waiting, no server round-trips. Handle large documents with ease thanks to optimized client-side processing.",
      },
    ],
  },
  converter: {
    title: "About ToolPop Converter",
    description:
      "ToolPop Converter is a free unit and data conversion toolkit. Convert measurements, colors, dates, data formats, and CSS units instantly in your browser. From everyday cooking measurements to developer-focused JSON/YAML conversions.",
    sections: [
      {
        heading: "Every Conversion You Need",
        text: "Length, weight, temperature, area, volume, speed, pressure, energy — all standard unit conversions with real-time results. Plus specialized tools for color formats, timezone conversions, coordinate systems, and more.",
      },
      {
        heading: "Developer Tools",
        text: "Convert between JSON, YAML, CSV, XML, TOML, and TypeScript types. Minify CSS, convert between px/rem/em, and generate Tailwind utilities. Built for the modern development workflow.",
      },
    ],
  },
  calculator: {
    title: "About ToolPop Calculator",
    description:
      "ToolPop Calculator provides free online calculators for math, finance, health, statistics, and everyday tasks. From compound interest and BMI to matrix operations and subnet calculations — accurate results with clear explanations.",
    sections: [
      {
        heading: "Professional Accuracy",
        text: "Every calculator uses precise mathematical formulas with proper rounding and edge-case handling. Financial calculators account for compounding periods, health calculators use clinically validated equations, and statistics tools handle real-world data distributions.",
      },
      {
        heading: "For Everyone",
        text: "Students can solve quadratic equations and calculate GPA. Professionals can analyze ROI and break-even points. Homeowners can estimate paint, concrete, and tile needs. Each calculator provides clear inputs, instant results, and helpful context.",
      },
    ],
  },
};
