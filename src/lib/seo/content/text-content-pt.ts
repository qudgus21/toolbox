import type { ToolContentMap } from "../tool-content-types";

export const textContentPt: ToolContentMap = {
  "word-counter": {
    howTo: {
      title: "Como Contar Palavras",
      steps: [
        "Paste or type your text into the input area",
        "Click the 'Count' button or the tool automatically counts as you type",
        "View word count, character count, and other statistics in real-time",
        "Copy the results or clear to analyze another text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Instant word count with live updates",
        "Displays character count including and excluding spaces",
        "Shows paragraph and sentence count",
        "Real-time processing with no file size limits",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use word counter to track essay or article length for academic requirements",
        "Monitor tweet or social media post character limits",
        "Check word count for job application or resume character limits",
      ],
    },
    faq: [
      { question: "Does it count words in all languages?", answer: "Yes. The word counter supports text in any language including CJK characters, Arabic, and Cyrillic scripts." },
      { question: "Is there a text length limit?", answer: "No. You can paste text of any length and get instant results. Processing happens in your browser with no server limits." },
      { question: "Does it count hyphenated words as one or two?", answer: "Hyphenated words like 'well-known' are counted as one word, following standard word counting conventions." },
    ],
  },
  "character-counter": {
    howTo: {
      title: "How to Count Characters",
      steps: [
        "Enter or paste your text in the input field",
        "The tool automatically displays character counts in real-time",
        "View characters with and without spaces separately",
        "Reset and analyze different text as needed",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Count characters including and excluding spaces",
        "Display character statistics instantly",
        "Visual indicators for character limits",
        "Supports all Unicode characters and special symbols",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Perfect for Twitter bio limits (160 characters)",
        "Monitor SMS character limits for text messages",
        "Check meta descriptions for SEO compliance (160 characters)",
      ],
    },
    faq: [
      { question: "How are emojis and special characters counted?", answer: "Emojis and special characters are counted individually. For example, an emoji like 😀 counts as one character." },
      { question: "What's the difference between 'with spaces' and 'without spaces'?", answer: "With spaces includes all whitespace between words, while without spaces counts only the letters, numbers, and symbols excluding blank spaces." },
      { question: "Is my text data stored or sent to any server?", answer: "No. All processing happens entirely in your browser. Your text is never transmitted anywhere and remains completely private." },
    ],
  },
  "text-statistics": {
    howTo: {
      title: "How to Analyze Text Statistics",
      steps: [
        "Paste your text into the analyzer",
        "Review comprehensive statistics including word, character, and line counts",
        "Check reading time estimates and sentence information",
        "Export or share the detailed analysis",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Complete text analysis with word, character, paragraph, and sentence metrics",
        "Reading time estimation based on average reading speed",
        "Average word length and sentence length calculations",
        "Detailed breakdown of text composition",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use reading time to optimize blog post length and reader engagement",
        "Track average word length to improve readability and clarity",
        "Monitor sentence count to ensure diverse sentence structure",
      ],
    },
    faq: [
      { question: "How is reading time calculated?", answer: "Reading time is estimated based on an average reading speed of 200 words per minute, a standard benchmark for adult readers." },
      { question: "What counts as a paragraph?", answer: "Paragraphs are sections of text separated by line breaks. The tool counts each distinct paragraph separated by blank lines or returns." },
      { question: "Are statistics updated live as I type?", answer: "Yes. All statistics update instantly as you type or paste new content. Analysis happens completely in your browser for immediate feedback." },
    ],
  },
  "keyword-density": {
    howTo: {
      title: "How to Analyze Keyword Density",
      steps: [
        "Paste your content text into the input field",
        "Enter keywords you want to analyze or let the tool auto-detect top keywords",
        "Review the keyword frequency and density percentages",
        "Optimize content based on density recommendations",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Automatic keyword extraction and frequency analysis",
        "Keyword density percentage calculation",
        "Visual ranking of most frequently used keywords",
        "Supports multiple keywords and custom keyword lists",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Target keyword density of 1-3% for natural SEO optimization",
        "Avoid over-optimization which can trigger keyword stuffing penalties",
        "Analyze competitor content to benchmark keyword usage patterns",
      ],
    },
    faq: [
      { question: "What is keyword density and why does it matter for SEO?", answer: "Keyword density is the percentage of times a keyword appears in your content. Balanced density (1-3%) helps search engines understand your topic without triggering spam penalties." },
      { question: "Can I analyze multiple keywords at once?", answer: "Yes. You can enter several keywords separated by commas and the tool will analyze the density for each one simultaneously." },
      { question: "Is the analysis confidential?", answer: "Absolutely. Your content is analyzed entirely in your browser and never sent anywhere, ensuring complete privacy for sensitive content." },
    ],
  },
  "find-duplicates": {
    howTo: {
      title: "How to Find Duplicate Lines",
      steps: [
        "Paste your text with multiple lines into the input area",
        "The tool automatically identifies and highlights duplicate lines",
        "Review the duplicate count and occurrences",
        "Remove duplicates or export the duplicate list",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Instant duplicate line detection with occurrence count",
        "Visual highlighting of duplicate entries",
        "Case-sensitive and case-insensitive options",
        "Display duplicate frequency and patterns",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use for data cleaning before importing into databases",
        "Verify log file entries for duplicate events or errors",
        "Check contact lists or CSV files for duplicate records",
      ],
    },
    faq: [
      { question: "Does it find exact duplicates or similar lines?", answer: "It finds exact duplicate lines. For case-insensitive mode, 'Hello' and 'hello' are treated as duplicates, but 'Hello' and 'Hello World' are not." },
      { question: "Can I see which lines are duplicated?", answer: "Yes. The tool highlights all duplicate lines and shows how many times each appears, helping you identify and manage redundant entries." },
      { question: "Will my data be kept private?", answer: "Yes. All processing happens locally in your browser. Your data is never uploaded or shared anywhere." },
    ],
  },
  "case-converter": {
    howTo: {
      title: "How to Convert Text Case",
      steps: [
        "Type or paste your text in the input field",
        "Select the desired case format (uppercase, lowercase, title case, etc.)",
        "View the converted text instantly in the output",
        "Copy the result to clipboard with one click",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Multiple case conversion options: uppercase, lowercase, title case, sentence case, toggle case",
        "Instant preview of converted text",
        "One-click copy to clipboard",
        "Support for all Unicode characters and languages",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use title case for proper formatting of headings and titles",
        "Apply lowercase for consistent email addresses and usernames",
        "Use sentence case for readability in longer blocks of text",
      ],
    },
    faq: [
      { question: "What's the difference between title case and sentence case?", answer: "Title case capitalizes the first letter of each main word, while sentence case only capitalizes the first letter of the first word and proper nouns." },
      { question: "Does it preserve special characters and numbers?", answer: "Yes. Numbers, punctuation, and special characters remain unchanged during conversion. Only the letter cases change." },
      { question: "Does conversion work offline?", answer: "Yes. Conversion happens entirely in your browser without any internet connection required or data transmission." },
    ],
  },
  "reverse-text": {
    howTo: {
      title: "Como Inverter Texto",
      steps: [
        "Enter your text in the input area",
        "Click the reverse button or it reverses automatically",
        "See your text reversed character by character in the output",
        "Copy the reversed text for use elsewhere",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Character-by-character text reversal",
        "Preserve formatting and special characters",
        "Instant reversal with live preview",
        "Support for multi-line text reversal",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Create palindromes or check if text reads the same forwards and backwards",
        "Use for fun text effects in creative writing",
        "Reverse text to verify spelling of unfamiliar words",
      ],
    },
    faq: [
      { question: "How does it handle special characters and spaces?", answer: "Special characters, spaces, and punctuation are all reversed along with the text. For example, 'hello world!' becomes '!dlrow olleh'." },
      { question: "Can I reverse multiple lines at once?", answer: "Yes. Multi-line text can be reversed either as a whole or line-by-line, depending on your preference." },
      { question: "Is my text processed securely?", answer: "Absolutely. Text reversal happens entirely in your browser without any data being sent to external servers." },
    ],
  },
  "text-repeater": {
    howTo: {
      title: "How to Repeat Text",
      steps: [
        "Enter the text you want to repeat",
        "Specify how many times you want it repeated",
        "Choose separator between repetitions (none, space, newline, etc.)",
        "Copy the repeated text for your use",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Specify number of repetitions with flexible range",
        "Multiple separator options between repetitions",
        "Real-time preview of repeated output",
        "Handle large repetition counts efficiently",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Create patterns or filler text for testing UI layouts",
        "Generate repetitive entries for data testing and validation",
        "Build visual effects with repeated text in creative projects",
      ],
    },
    faq: [
      { question: "What separators are available?", answer: "Options include none (no separator), space, comma, newline, dash, and custom separators that you can specify." },
      { question: "Is there a limit to how many times I can repeat text?", answer: "You can repeat text hundreds or even thousands of times. The tool handles large repetition counts efficiently without slowdown." },
      { question: "Will the tool work with very long text strings?", answer: "Yes. The tool processes everything in your browser, so you can repeat even large blocks of text without any issues." },
    ],
  },
  "text-sort": {
    howTo: {
      title: "How to Sort Text Lines",
      steps: [
        "Paste your text with multiple lines into the input field",
        "Choose sort order: alphabetical, reverse alphabetical, or by length",
        "Apply additional filters like removing duplicates or case sensitivity",
        "Copy the sorted result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Multiple sorting options: alphabetical, reverse, by line length",
        "Case-sensitive and case-insensitive sorting",
        "Optional duplicate removal during sort",
        "Preserve or remove blank lines",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Sort CSV data or contact lists for better organization",
        "Organize to-do items or task lists alphabetically",
        "Clean up log files by sorting and finding patterns",
      ],
    },
    faq: [
      { question: "How does sorting by length work?", answer: "Sorting by length arranges lines from shortest to longest (or vice versa), which is useful for organizing lists by text size." },
      { question: "Can I sort case-insensitively but preserve original case?", answer: "Yes. Case-insensitive sorting ignores case for ordering but preserves the original capitalization in the output." },
      { question: "Can I remove duplicates while sorting?", answer: "Yes. The tool can simultaneously sort lines and remove duplicates, giving you clean, organized results in one step." },
    ],
  },
  "remove-duplicates": {
    howTo: {
      title: "How to Remove Duplicate Lines",
      steps: [
        "Paste text with duplicate lines into the input area",
        "The tool automatically removes all duplicate entries",
        "Choose to keep only the first or last occurrence of each line",
        "Copy the cleaned result with unique lines only",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove duplicate lines instantly",
        "Options to keep first or last occurrence",
        "Case-sensitive duplicate detection",
        "Preserve original line order with duplicates removed",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Clean up email subscriber lists to prevent duplicates",
        "Deduplicate data before importing into databases",
        "Remove duplicate entries from log files for cleaner analysis",
      ],
    },
    faq: [
      { question: "What's the difference between keeping first vs. last occurrence?", answer: "Keeping first removes duplicates but retains the original position. Keeping last retains the most recent instance of each unique line." },
      { question: "Can I do case-insensitive deduplication?", answer: "Yes. Case-insensitive mode treats 'Email' and 'email' as the same line while preserving the original case in your output." },
      { question: "Is deduplication done securely in my browser?", answer: "Yes. All deduplication happens locally in your browser. No data is sent to any external service or stored anywhere." },
    ],
  },
  "add-line-numbers": {
    howTo: {
      title: "How to Add Line Numbers",
      steps: [
        "Paste your multi-line text into the input field",
        "Customize numbering format: standard, padded, or with custom prefix",
        "Set starting number and step increment",
        "Copy the numbered text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Add sequential line numbers to all lines",
        "Customize number format and starting point",
        "Adjustable padding and spacing",
        "Option to add numbers only to non-empty lines",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Add line numbers to code snippets for documentation",
        "Number lines in scripts or instructions for clarity",
        "Reference specific lines by number in reviews or discussions",
      ],
    },
    faq: [
      { question: "Can I start numbering from a different number than 1?", answer: "Yes. You can set any starting number and choose increment steps (1, 5, 10, etc.) for custom numbering schemes." },
      { question: "What padding options are available?", answer: "You can use zero-padding to ensure consistent width (e.g., 001, 002) or no padding (1, 2, 10) depending on your preference." },
      { question: "Does it work entirely offline?", answer: "Yes. Line numbering is processed completely in your browser without any data transmission or server connection needed." },
    ],
  },
  "add-prefix-suffix": {
    howTo: {
      title: "How to Add Prefix and Suffix",
      steps: [
        "Enter your text or paste multiple lines",
        "Specify the prefix text to add at the beginning",
        "Specify the suffix text to add at the end",
        "Apply to all lines and copy the result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Add custom prefix and suffix to each line",
        "Apply to single line or multiple lines",
        "Preserve original content with additions",
        "Visual preview of formatted output",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Format list items with bullets or numbers as prefix",
        "Wrap URLs in quote marks or brackets for database entries",
        "Add line comments prefixes for code formatting",
      ],
    },
    faq: [
      { question: "Can I add prefix/suffix to just some lines?", answer: "Yes. You can select which lines to modify or use filters to apply transformations to specific lines matching criteria." },
      { question: "Can I use special characters in prefix and suffix?", answer: "Absolutely. All special characters, symbols, and Unicode characters are fully supported in both prefix and suffix fields." },
      { question: "Does it preview changes before applying?", answer: "Yes. The tool shows a live preview of how your text will look with the prefix and suffix applied before you copy it." },
    ],
  },
  "join-text": {
    howTo: {
      title: "How to Join Text Lines",
      steps: [
        "Paste multiple lines of text into the input area",
        "Choose your separator: space, comma, semicolon, or custom",
        "Select whether to remove empty lines",
        "Copy the joined text as a single line or paragraph",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Join multiple lines with custom separators",
        "Multiple separator options including space and punctuation",
        "Option to remove empty lines before joining",
        "Preserve formatting or create compact output",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Convert line-separated lists into comma-separated format",
        "Join multi-line code into single-line format for compression",
        "Combine lines for CSV or database field formatting",
      ],
    },
    faq: [
      { question: "What custom separators can I use?", answer: "You can use any text as a separator: pipes (|), colons (:), tabs, or any custom string of your choice." },
      { question: "What happens to empty lines when joining?", answer: "By default, empty lines create separators without content. You can choose to skip empty lines entirely for cleaner output." },
      { question: "Is joining done locally in my browser?", answer: "Yes. All text joining happens entirely in your browser without any data being transmitted to external servers." },
    ],
  },
  "split-text": {
    howTo: {
      title: "Como Dividir Texto",
      steps: [
        "Enter your text that needs splitting",
        "Specify the delimiter: space, comma, semicolon, or custom",
        "Choose split method: by delimiter or by character count",
        "View results split into separate lines",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Split text by various delimiters or patterns",
        "Split by character count or word count",
        "Support for custom delimiters and regex patterns",
        "Preserve or remove empty segments",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Convert comma-separated values into separate lines",
        "Break long text into smaller chunks for readability",
        "Split domain lists or URLs for processing",
      ],
    },
    faq: [
      { question: "Can I split by multiple delimiters at once?", answer: "Yes. You can use regex patterns to split by multiple delimiters simultaneously, such as 'split by comma OR semicolon'." },
      { question: "What happens to empty segments after splitting?", answer: "Empty segments (from consecutive delimiters) can be kept or removed based on your preference, giving you cleaner results." },
      { question: "Is splitting processed privately in my browser?", answer: "Yes. Splitting happens entirely locally without any server interaction, ensuring your data remains private." },
    ],
  },
  "remove-line-breaks": {
    howTo: {
      title: "How to Remove Line Breaks",
      steps: [
        "Paste text with multiple lines into the input field",
        "Choose how to handle line breaks: remove entirely or replace with space",
        "Select option to preserve paragraph breaks if needed",
        "Copy the continuous text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove all line breaks from text instantly",
        "Option to replace with space or keep content compact",
        "Preserve or remove paragraph breaks",
        "Handle Windows, Mac, and Unix line ending formats",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Clean up copied text from PDF files with unwanted line breaks",
        "Prepare text for SMS or character-limited platforms",
        "Remove formatting line breaks for database entries",
      ],
    },
    faq: [
      { question: "What's the difference between Windows, Mac, and Unix line endings?", answer: "Windows uses CRLF (\\r\\n), Mac uses LF (\\n), and older Macs used CR (\\r). The tool handles all formats automatically." },
      { question: "Can I preserve paragraph breaks while removing line breaks?", answer: "Yes. You can remove single line breaks but keep double line breaks (paragraph separators) to preserve structure." },
      { question: "Is the process done in my browser for privacy?", answer: "Yes. Line break removal happens entirely locally without any data being sent to external services." },
    ],
  },
  "remove-extra-spaces": {
    howTo: {
      title: "How to Remove Extra Spaces",
      steps: [
        "Paste your text with extra spaces into the input area",
        "The tool automatically detects and removes multiple spaces",
        "Keep leading and trailing spaces or remove them too",
        "Copy the cleaned text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove multiple spaces and replace with single space",
        "Option to trim leading and trailing whitespace",
        "Remove spaces around punctuation",
        "Preserve intentional spacing patterns",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Clean up text copied from websites or documents",
        "Normalize spacing in data files before import",
        "Fix alignment issues caused by multiple spaces",
      ],
    },
    faq: [
      { question: "Can I remove spaces around punctuation?", answer: "Yes. The tool can normalize spacing around punctuation marks, removing spaces before commas and periods, etc." },
      { question: "Will tabs and other whitespace be affected?", answer: "Yes. The tool treats tabs, multiple spaces, and other whitespace the same way, normalizing them all to single spaces." },
      { question: "Does the tool preserve my data privacy?", answer: "Yes. All space removal happens entirely in your browser without any data being uploaded or transmitted anywhere." },
    ],
  },
  "remove-empty-lines": {
    howTo: {
      title: "Como Remover Linhas Vazias",
      steps: [
        "Paste text with blank lines into the input field",
        "The tool identifies and removes all empty lines",
        "Option to keep or remove lines with only whitespace",
        "Copy the compact result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove blank lines instantly",
        "Options for lines with only whitespace",
        "Preserve content lines perfectly",
        "Handle various line ending formats",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Clean up code files by removing unnecessary blank lines",
        "Compress text lists by removing gaps between items",
        "Prepare log files for analysis by removing empty entries",
      ],
    },
    faq: [
      { question: "What's considered an 'empty line'?", answer: "A truly empty line has no characters. Lines with only spaces or tabs can be handled separately with the whitespace-only option." },
      { question: "Can I remove only consecutive empty lines?", answer: "Yes. You can remove multiple consecutive empty lines while preserving single empty lines for paragraph separation." },
      { question: "Is this processing done securely in the browser?", answer: "Yes. Empty line removal happens entirely locally in your browser without any data transmission." },
    ],
  },
  "remove-special-characters": {
    howTo: {
      title: "How to Remove Special Characters",
      steps: [
        "Enter or paste your text containing special characters",
        "Choose what to remove: symbols, punctuation, or custom characters",
        "Select whether to keep spaces, numbers, and letters",
        "Copy the cleaned text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove special characters while preserving letters and numbers",
        "Option to keep or remove specific characters",
        "Custom character removal lists",
        "Keep or remove accented characters",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Clean up email addresses and usernames for databases",
        "Remove special characters from file names for compatibility",
        "Sanitize text input for security in web applications",
      ],
    },
    faq: [
      { question: "Can I keep certain special characters while removing others?", answer: "Yes. You can specify which characters to preserve (like hyphens or apostrophes) while removing all other special characters." },
      { question: "What about accented characters like é, ñ, ü?", answer: "You can choose to keep accented characters or remove them. They can also be normalized to their base characters." },
      { question: "Does processing happen on my device?", answer: "Yes. All special character removal happens entirely in your browser without involving any external servers." },
    ],
  },
  "remove-emojis": {
    howTo: {
      title: "How to Remove Emojis",
      steps: [
        "Paste text containing emojis into the input area",
        "The tool automatically detects and removes all emoji characters",
        "Choose to replace with space or remove completely",
        "Copy text with only alphabetic characters",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove all emoji characters from any text",
        "Support for emoji variations and skin tones",
        "Keep surrounding text perfectly intact",
        "Option to replace with space or remove completely",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Clean up social media content for formal documents",
        "Remove emojis from chat logs for analysis",
        "Prepare text for systems that don't support emoji characters",
      ],
    },
    faq: [
      { question: "Does it remove all emoji types including skin tone variations?", answer: "Yes. The tool removes all emoji characters, including skin tone modifiers, variant selectors, and compound emojis." },
      { question: "What about emoji-like characters or symbols?", answer: "Only actual Unicode emojis are removed. Regular special characters and symbols like ★ or ♥ are preserved." },
      { question: "Is emoji removal done locally in my browser?", answer: "Yes. Processing happens entirely on your device without any data transmission to external servers." },
    ],
  },
  "remove-html-tags": {
    howTo: {
      title: "How to Remove HTML Tags",
      steps: [
        "Paste HTML content into the input field",
        "The tool automatically removes all HTML and XML tags",
        "Choose to keep or remove content within script and style tags",
        "Copy the plain text result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove all HTML and XML tags instantly",
        "Preserve text content perfectly",
        "Option to decode HTML entities",
        "Handle nested and malformed tags",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Extract plain text from web pages and HTML emails",
        "Convert HTML documents to text for archival",
        "Clean copied HTML for readable text content",
      ],
    },
    faq: [
      { question: "Will it handle malformed or unclosed tags?", answer: "Yes. The tool intelligently handles malformed HTML and unclosed tags, cleaning them up gracefully." },
      { question: "What about script and style tag content?", answer: "By default, content inside script and style tags is removed. You can toggle to keep this content if needed." },
      { question: "Does it work completely offline in my browser?", answer: "Yes. HTML tag removal happens entirely locally without any internet connection or external server calls." },
    ],
  },
  "remove-accents": {
    howTo: {
      title: "How to Remove Accents",
      steps: [
        "Enter text with accented characters into the input field",
        "The tool automatically converts accented characters to base characters",
        "Choose to preserve or remove special diacritical marks",
        "Copy the text without accents",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remove accents and diacritical marks from text",
        "Convert accented characters to ASCII equivalents",
        "Support for all Latin alphabet variations",
        "Preserve non-Latin scripts",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Convert foreign language text for ASCII-only systems",
        "Normalize names and addresses for database compatibility",
        "Prepare text for search engines that don't handle diacritics",
      ],
    },
    faq: [
      { question: "Does it work with all Latin-based languages?", answer: "Yes. It handles accents from French, Spanish, Portuguese, German, and other European languages with Latin characters." },
      { question: "What happens to non-Latin scripts like Greek or Cyrillic?", answer: "Non-Latin scripts are preserved as-is since they don't have the same accent system as Latin-based languages." },
      { question: "Is this processing done securely on my device?", answer: "Yes. Accent removal happens entirely in your browser without any data being sent to remote servers." },
    ],
  },
  "trim-text": {
    howTo: {
      title: "How to Trim Text",
      steps: [
        "Paste your text into the input area",
        "Select trim options: leading, trailing, or both",
        "Choose to also remove extra spaces within text",
        "Copy the trimmed result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Trim leading whitespace from text start",
        "Trim trailing whitespace from text end",
        "Remove both leading and trailing spaces at once",
        "Option to also remove internal extra spaces",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Clean up text copied from documents with extra indentation",
        "Normalize data fields before database import",
        "Remove accidental spaces in code or configurations",
      ],
    },
    faq: [
      { question: "What whitespace does it trim - just spaces or tabs too?", answer: "It trims all whitespace including spaces, tabs, newlines, and other whitespace characters from the beginning and end." },
      { question: "Can I trim only from one side?", answer: "Yes. You can choose to trim only leading spaces, only trailing spaces, or both sides independently." },
      { question: "Does trimming happen privately in my browser?", answer: "Yes. All trimming operations happen completely locally in your browser without any external data processing." },
    ],
  },
  "find-and-replace": {
    howTo: {
      title: "How to Find and Replace Text",
      steps: [
        "Paste your text into the input field",
        "Enter the text you want to find in the search box",
        "Enter the replacement text in the replace field",
        "Review changes and copy the result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Find and replace text with case sensitivity options",
        "Replace single occurrence or all occurrences",
        "Support for regular expressions for advanced replacements",
        "Preview changes before applying",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use regex patterns for complex find and replace operations",
        "Change terminology or naming conventions across text",
        "Fix common misspellings throughout documents",
      ],
    },
    faq: [
      { question: "How do I use regular expressions for find and replace?", answer: "You can enable regex mode and use patterns like '\\b\\w+@' to find email addresses. The tool supports full JavaScript regex syntax." },
      { question: "Can I preview changes before applying them?", answer: "Yes. The tool shows a preview of what will be replaced with highlighting before you apply the changes." },
      { question: "Is find and replace done locally in my browser?", answer: "Yes. All searching and replacing happens entirely in your browser without transmitting data to any server." },
    ],
  },
  "text-diff": {
    howTo: {
      title: "How to Compare Text",
      steps: [
        "Paste the first version of text in the left panel",
        "Paste the second version in the right panel",
        "The tool highlights differences between the versions",
        "Review added, removed, and modified sections",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Side-by-side comparison of two text versions",
        "Visual highlighting of differences in color",
        "Shows added, removed, and changed content",
        "Line-by-line difference detection",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Compare document versions to track changes",
        "Review code changes between different revisions",
        "Identify what was modified in edited documents",
      ],
    },
    faq: [
      { question: "How does it decide what counts as a difference?", answer: "It compares text line-by-line and character-by-character. Even minor changes like punctuation or spacing differences are highlighted." },
      { question: "Can it handle very large files?", answer: "Yes. The comparison works efficiently even with large documents, though very large files may take a moment to analyze." },
      { question: "Is the comparison done securely without uploading my text?", answer: "Yes. Both versions are compared entirely in your browser. Nothing is sent to any external server." },
    ],
  },
  "regex-tester": {
    howTo: {
      title: "How to Test Regular Expressions",
      steps: [
        "Enter your regular expression pattern in the regex field",
        "Paste the text you want to test against",
        "Choose options: case-insensitive, global, or multiline matching",
        "View all matches and results highlighted in text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Full regular expression testing with pattern validation",
        "Real-time highlighting of all matches",
        "Support for flags: global, case-insensitive, multiline",
        "Show match count and replace preview",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Test complex regex patterns before using in code",
        "Validate email, URL, or phone number formats",
        "Extract specific patterns from text data",
      ],
    },
    faq: [
      { question: "What regex syntax is supported?", answer: "The tool supports full JavaScript regular expression syntax, including lookahead, lookbehind, and all modern features." },
      { question: "Can I test replacement patterns?", answer: "Yes. You can enter a replacement pattern and see a preview of what the replacements would look like in your text." },
      { question: "Is regex testing done locally without uploading my data?", answer: "Yes. All regex testing happens entirely in your browser without any data transmission to external services." },
    ],
  },
  "email-extractor": {
    howTo: {
      title: "How to Extract Email Addresses",
      steps: [
        "Paste text containing email addresses into the input field",
        "The tool automatically finds and extracts all email addresses",
        "Choose to remove duplicates or sort results",
        "Copy the list of extracted emails",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Automatically extract all email addresses from text",
        "Remove duplicate emails from results",
        "Sort email addresses alphabetically",
        "Support for various email formats and domains",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Extract email addresses from web pages for contact lists",
        "Find all addresses in documents for communication purposes",
        "Build mailing lists by extracting from text sources",
      ],
    },
    faq: [
      { question: "What email formats does it recognize?", answer: "It recognizes standard email formats including most international domains, subdomains, and plus addressing (name+tag@domain.com)." },
      { question: "Can it handle emails without domain extensions?", answer: "It primarily captures standard emails with proper domain extensions. Incomplete formats may not be detected." },
      { question: "Is extracted email data kept private?", answer: "Yes. All extraction happens entirely in your browser without any data being sent anywhere." },
    ],
  },
  "url-extractor": {
    howTo: {
      title: "How to Extract URLs",
      steps: [
        "Paste content containing URLs into the input area",
        "The tool automatically detects and extracts all URLs",
        "Remove duplicates or sort URLs by domain",
        "Copy the extracted URL list",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Automatically find and extract all URLs from text",
        "Recognize http, https, ftp, and other protocols",
        "Remove duplicate URLs from results",
        "Sort and organize extracted links",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Extract links from documents or web page content",
        "Create reference lists from text with multiple URLs",
        "Audit content for all linked resources",
      ],
    },
    faq: [
      { question: "Does it recognize all URL protocols?", answer: "Yes. It recognizes http, https, ftp, ftps, and other common protocols, plus URLs without explicit protocols." },
      { question: "Will it extract URLs from HTML links?", answer: "Yes. It can extract URLs from HTML href attributes, markdown links, and plain text URLs." },
      { question: "Does the tool keep my extracted URLs private?", answer: "Yes. All URL extraction happens entirely in your browser without sending data anywhere." },
    ],
  },
  "number-extractor": {
    howTo: {
      title: "How to Extract Numbers",
      steps: [
        "Paste text containing numbers into the input field",
        "The tool automatically extracts all numbers from the content",
        "Choose to extract integers, decimals, or all numbers",
        "Copy the list of extracted numbers",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Extract all numbers from any text content",
        "Support for integers, decimals, and negative numbers",
        "Remove duplicates from extracted numbers",
        "Sort numbers in ascending or descending order",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Extract prices, quantities, and measurements from documents",
        "Find all numbers in log files or data dumps",
        "Compile statistics from text-based data sources",
      ],
    },
    faq: [
      { question: "Does it handle decimals and negative numbers?", answer: "Yes. It extracts integers, decimals, and negative numbers. You can filter to show only specific types." },
      { question: "What about numbers in different formats like currency?", answer: "It extracts the numeric values from currency, percentages, and other formatted numbers, ignoring symbols." },
      { question: "Is number extraction done privately in the browser?", answer: "Yes. All processing happens locally without any data being transmitted to external servers." },
    ],
  },
  "filter-lines": {
    howTo: {
      title: "How to Filter Text Lines",
      steps: [
        "Paste multi-line text into the input area",
        "Enter filter criteria: contains text, starts with, matches pattern",
        "Choose include or exclude matching lines",
        "Copy the filtered results",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Filter lines by text content, prefix, or suffix",
        "Support for regular expression patterns",
        "Include or exclude matching lines",
        "Case-sensitive or case-insensitive filtering",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Filter log files to find specific errors or events",
        "Extract lines containing specific keywords from documents",
        "Remove unwanted entries from lists based on criteria",
      ],
    },
    faq: [
      { question: "Can I use regex patterns for filtering?", answer: "Yes. You can switch to regex mode and use complex patterns like '^ERROR' to match lines starting with ERROR." },
      { question: "Can I apply multiple filters at once?", answer: "You can combine filters with AND/OR logic, allowing you to create complex filtering rules." },
      { question: "Is filtering done locally without uploading my text?", answer: "Yes. All filtering happens entirely in your browser without involving any external servers." },
    ],
  },
  "base64": {
    howTo: {
      title: "How to Encode and Decode Base64",
      steps: [
        "Choose encode or decode operation",
        "For encoding: paste plain text into the input field",
        "For decoding: paste Base64 string into the input",
        "View the result instantly and copy to clipboard",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Encode plain text to Base64 format",
        "Decode Base64 strings back to readable text",
        "Support for all character encodings",
        "Real-time conversion with instant preview",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Encode credentials or sensitive data for storage",
        "Decode Base64 attachments or email data",
        "Use Base64 for embedding text in URLs or configuration files",
      ],
    },
    faq: [
      { question: "Is Base64 encryption? Is it secure?", answer: "No. Base64 is encoding, not encryption. It's easily reversible and should not be used for sensitive data security." },
      { question: "Can it handle large files or binary data?", answer: "Yes. The tool can encode and decode large amounts of data including binary content in your browser." },
      { question: "Is encoding/decoding done locally without sending data anywhere?", answer: "Yes. All Base64 conversions happen entirely in your browser for complete privacy." },
    ],
  },
  "url-encode": {
    howTo: {
      title: "How to Encode and Decode URLs",
      steps: [
        "Choose between URL encode or decode",
        "For encoding: enter text to make URL-safe",
        "For decoding: paste an encoded URL or parameter",
        "Copy the encoded or decoded result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Encode text to URL-safe format with percent encoding",
        "Decode URL-encoded strings back to plain text",
        "Preserve special URL characters or encode them",
        "Support for all Unicode characters",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Encode query parameters for safe URL construction",
        "Decode URL-encoded search queries to read original text",
        "Prepare text for use in URLs and web parameters",
      ],
    },
    faq: [
      { question: "What characters get encoded?", answer: "Special characters like spaces, &, ?, #, and non-ASCII characters are encoded to percent-encoding format (e.g., space becomes %20)." },
      { question: "Should I encode the entire URL or just the parameters?", answer: "Typically encode only the parameter values. The domain and path are already URL-safe and don't need encoding." },
      { question: "Does encoding happen securely in my browser?", answer: "Yes. All encoding and decoding happens locally in your browser without any external data transmission." },
    ],
  },
  "html-encode": {
    howTo: {
      title: "How to Encode and Decode HTML",
      steps: [
        "Select HTML encode or decode operation",
        "For encoding: paste text that needs HTML escaping",
        "For decoding: paste HTML-encoded entities",
        "Copy the converted result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Encode special characters to HTML entities",
        "Decode HTML entities back to readable text",
        "Support for all standard HTML entities",
        "Preserve formatting and structure",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Escape user input to prevent HTML injection attacks",
        "Decode HTML entities from web pages or emails",
        "Display code examples safely in web content",
      ],
    },
    faq: [
      { question: "Which characters need HTML encoding?", answer: "Key characters include < (&lt;), > (&gt;), & (&amp;), \" (&quot;), and ' (&apos;) plus some special characters." },
      { question: "Is HTML encoding the same as URL encoding?", answer: "No. HTML encoding and URL encoding are different. HTML encoding is for content, while URL encoding is for URLs and parameters." },
      { question: "Is my text kept private during encoding/decoding?", answer: "Yes. All HTML encoding and decoding happens entirely in your browser without any server involvement." },
    ],
  },
  "unicode-escape": {
    howTo: {
      title: "How to Use Unicode Escape",
      steps: [
        "Choose escape or unescape operation",
        "For escaping: enter text to convert to Unicode sequences",
        "For unescaping: paste Unicode escape sequences",
        "View and copy the converted result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Convert text to Unicode escape sequences",
        "Decode Unicode escapes back to readable characters",
        "Support for all Unicode code points",
        "Multiple escape format options",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use Unicode escapes in JavaScript and JSON strings",
        "Display special characters safely in programming code",
        "Handle multilingual text in source code safely",
      ],
    },
    faq: [
      { question: "What format does it use for escaping?", answer: "It supports \\uXXXX format for BMP characters and \\uXXXX\\uXXXX for supplementary planes, plus other formats." },
      { question: "Can I convert emoji and special symbols?", answer: "Yes. All Unicode characters including emoji, symbols, and characters from any language can be escaped and unescaped." },
      { question: "Is the conversion done locally in my browser?", answer: "Yes. All Unicode escape conversions happen entirely locally without any external data transmission." },
    ],
  },
  "morse-code": {
    howTo: {
      title: "How to Use Morse Code Translator",
      steps: [
        "Choose text-to-morse or morse-to-text conversion",
        "For text input: enter regular text or characters",
        "For morse input: use dots (.) and dashes (-) separated by spaces",
        "Copy the translated result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Convert text to Morse code with dots and dashes",
        "Translate Morse code back to readable text",
        "Support for letters, numbers, and common punctuation",
        "International Morse code standard",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Learn Morse code by translating common phrases",
        "Decode historical Morse messages or communications",
        "Practice Morse code conversion for radio operators",
      ],
    },
    faq: [
      { question: "What symbols does Morse code support?", answer: "Letters A-Z, numbers 0-9, and common punctuation like periods, commas, and question marks are supported." },
      { question: "How do I format Morse code input?", answer: "Use dots (.) and dashes (-) with spaces between characters. For example: '.... . .-.. .-.. ---' for 'HELLO'." },
      { question: "Is translation done locally without sending data?", answer: "Yes. All Morse code conversion happens entirely in your browser without any server communication." },
    ],
  },
  "binary-converter": {
    howTo: {
      title: "How to Convert Text to Binary",
      steps: [
        "Choose text-to-binary or binary-to-text conversion",
        "For text: enter any text string into the converter",
        "For binary: input binary digits (0s and 1s) with spaces",
        "View the converted output and copy results",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Convert text characters to 8-bit binary representation",
        "Decode binary strings back to readable text",
        "Support for all ASCII and extended characters",
        "Flexible spacing and formatting options",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Understand how computers represent text internally",
        "Decode binary data from technical documentation",
        "Learn computer science and digital concepts",
      ],
    },
    faq: [
      { question: "Why is binary 8 bits per character?", answer: "8 bits (1 byte) is the standard for ASCII encoding. Each character is represented by 8 binary digits." },
      { question: "Can it handle Unicode or special characters?", answer: "Yes. Extended ASCII and Unicode characters are supported, though they may require more than 8 bits." },
      { question: "Is conversion done locally in the browser?", answer: "Yes. All binary conversions happen entirely in your browser without any external data transmission." },
    ],
  },
  "hex-converter": {
    howTo: {
      title: "How to Convert Text to Hexadecimal",
      steps: [
        "Choose text-to-hex or hex-to-text conversion",
        "For text: enter any string or characters",
        "For hex: input hexadecimal digits (0-9, A-F)",
        "Copy the converted result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Convert text to hexadecimal representation",
        "Decode hexadecimal back to plain text",
        "Support for lowercase and uppercase hex formats",
        "Show both ASCII and extended character encoding",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Read and understand hex color codes in web design",
        "Decode hex data from binary files or logs",
        "Use hex encoding for safe data transmission",
      ],
    },
    faq: [
      { question: "How many hex digits represent one character?", answer: "Two hexadecimal digits (one byte) represent one ASCII character. For example, 'A' is 41 in hex." },
      { question: "Can it handle hex color codes like #FF5733?", answer: "Yes. It can decode color codes and other hex values, though color codes have specific format expectations." },
      { question: "Does hex conversion happen securely in my browser?", answer: "Yes. All conversion happens entirely locally in your browser without any data transmission." },
    ],
  },
  "rot13": {
    howTo: {
      title: "How to Use ROT13 Cipher",
      steps: [
        "Enter your text into the input field",
        "Click apply ROT13 or it rotates automatically",
        "ROT13 rotates each letter 13 positions in the alphabet",
        "Copy the encoded or decoded text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Apply ROT13 cipher rotation to text",
        "Preserve numbers, punctuation, and spaces",
        "Apply ROT13 twice to decode (since 13 x 2 = 26)",
        "Support for both uppercase and lowercase letters",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Decode ROT13-encoded messages and content",
        "Protect content from casual reading without strong encryption",
        "Understand basic cipher mechanics and cryptography",
      ],
    },
    faq: [
      { question: "Is ROT13 secure for protecting sensitive information?", answer: "No. ROT13 is not secure and should never be used for protecting sensitive data. It's easily reversible and only provides obfuscation." },
      { question: "How do I decode a ROT13 message?", answer: "Simply apply ROT13 again. Since there are 26 letters, applying it twice returns to the original text (13 + 13 = 26)." },
      { question: "Does it work locally in my browser?", answer: "Yes. ROT13 encoding happens entirely in your browser without any external processing." },
    ],
  },
  "lorem-ipsum": {
    howTo: {
      title: "Como Gerar Lorem Ipsum",
      steps: [
        "Choose the type: paragraphs, sentences, or words",
        "Specify the number of items you want to generate",
        "Select starting with 'Lorem ipsum' or regular text",
        "Copy the generated placeholder text",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Generate dummy paragraphs, sentences, or words",
        "Customize count: 1 to 100+ items",
        "Start with classic 'Lorem ipsum' or regular text",
        "Copy results with one click for immediate use",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use placeholder text for website design mockups",
        "Fill forms during testing without real data",
        "Generate content for design templates and layouts",
      ],
    },
    faq: [
      { question: "What is Lorem Ipsum and where does it come from?", answer: "Lorem Ipsum is placeholder text derived from a classical Latin text. It's used in design mockups because it resembles real text." },
      { question: "Can I generate different amounts of text?", answer: "Yes. You can generate from just a few words to hundreds of paragraphs in any combination of words, sentences, or paragraphs." },
      { question: "Is text generation done locally in my browser?", answer: "Yes. Lorem Ipsum generation happens entirely in your browser without any external data requirements." },
    ],
  },
  "slug-generator": {
    howTo: {
      title: "How to Generate URL Slugs",
      steps: [
        "Enter your text or title that needs a slug",
        "Adjust settings: separator (dash or underscore) and case",
        "The tool converts text to URL-friendly format",
        "Copy the slug for use in URLs",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Convert titles and text to URL-friendly slugs",
        "Remove spaces, special characters, and accents",
        "Choose separator: hyphens, underscores, or none",
        "Preserve or remove specific characters",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Generate SEO-friendly URL slugs for blog posts",
        "Create clean URL-safe filenames for web content",
        "Standardize text for use in database identifiers",
      ],
    },
    faq: [
      { question: "Why are hyphens preferred over underscores in URLs?", answer: "Hyphens are better for SEO because search engines treat them as word separators, while underscores don't separate words." },
      { question: "How are special characters and accents handled?", answer: "Accented characters are converted to their ASCII equivalents, and special characters are removed or replaced with your chosen separator." },
      { question: "Is slug generation done locally in my browser?", answer: "Yes. All slug generation happens entirely in your browser without any server involvement." },
    ],
  },
  "password-generator": {
    howTo: {
      title: "How to Generate Secure Passwords",
      steps: [
        "Set desired password length (typically 8-16 characters)",
        "Select character types: uppercase, lowercase, numbers, symbols",
        "Generate new password or regenerate for different options",
        "Copy the secure password to clipboard",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Generate strong random passwords of custom length",
        "Include or exclude uppercase, lowercase, numbers, and symbols",
        "Exclude ambiguous characters (0, O, 1, l) if needed",
        "Copy with one click and generate multiple passwords",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use longer passwords (12+ characters) for better security",
        "Include mix of character types for stronger passwords",
        "Store passwords in secure password manager",
      ],
    },
    faq: [
      { question: "How many characters should a strong password have?", answer: "At least 12-16 characters is recommended. Longer passwords are exponentially more difficult to crack." },
      { question: "Why exclude ambiguous characters?", answer: "Characters like 0/O, 1/l, and 1/I can be confusing when reading passwords or typing them manually, so some prefer to exclude them." },
      { question: "Is my generated password stored or transmitted anywhere?", answer: "No. Passwords are generated entirely in your browser and never stored or sent anywhere. Each generation is independent." },
    ],
  },
  "random-string": {
    howTo: {
      title: "How to Generate Random Strings",
      steps: [
        "Set the desired length for your random string",
        "Choose character set: alphanumeric, letters only, numbers only, or custom",
        "Generate the random string instantly",
        "Copy to use in testing or other purposes",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Generate truly random strings of any length",
        "Multiple character set options for flexibility",
        "Custom character inclusion/exclusion",
        "Generate multiple strings at once",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use for software testing with random test data",
        "Generate tokens or session identifiers",
        "Create unique identifiers for records or transactions",
      ],
    },
    faq: [
      { question: "What makes a random string 'truly random'?", answer: "The tool uses the browser's cryptographic random number generator (crypto.getRandomValues) for genuine randomness." },
      { question: "Can I generate multiple strings at once?", answer: "Yes. You can generate batch sets of random strings and get all results together for testing." },
      { question: "Are generated strings logged or stored anywhere?", answer: "No. Strings are generated only in your browser and are never stored, logged, or transmitted anywhere." },
    ],
  },
  "uuid-generator": {
    howTo: {
      title: "How to Generate UUIDs",
      steps: [
        "Choose UUID version: v1, v4, or v5",
        "Click generate to create new UUIDs instantly",
        "Specify how many UUIDs you need",
        "Copy results for use in applications",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Generate UUIDs (Universally Unique Identifiers)",
        "Support for UUID v4 (random) standard",
        "Generate single or multiple UUIDs at once",
        "Copy with one click or as formatted list",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use UUIDs for unique identifiers in databases",
        "Generate tokens for API authentication and sessions",
        "Create unique resource identifiers in distributed systems",
      ],
    },
    faq: [
      { question: "What's the difference between UUID v1, v4, and v5?", answer: "v1 is time-based, v4 is random, and v5 is hash-based. v4 is most common for general purposes." },
      { question: "How unique are UUIDs?", answer: "UUID v4 has 2^122 possible values, making collisions virtually impossible even when generating billions of UUIDs." },
      { question: "Are generated UUIDs kept private?", answer: "Yes. All UUID generation happens entirely in your browser without any tracking or transmission." },
    ],
  },
  "hash-generator": {
    howTo: {
      title: "How to Generate Hashes",
      steps: [
        "Enter the text you want to hash",
        "Choose hash algorithm: MD5, SHA1, SHA256, SHA512",
        "Click generate to compute the hash",
        "Copy the hash value for use",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Generate hashes using MD5, SHA1, SHA256, SHA512 algorithms",
        "Instant hash computation for any text input",
        "Deterministic hashing for verification and comparison",
        "Copy results with one click",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use SHA256 for file integrity verification",
        "Generate checksums for data validation",
        "Create consistent hashes for password comparison",
      ],
    },
    faq: [
      { question: "Which hash algorithm should I use?", answer: "SHA256 is recommended for most purposes. MD5 and SHA1 are deprecated for security. SHA512 offers maximum security but slower speeds." },
      { question: "Can I reverse a hash back to the original text?", answer: "No. Hashing is one-way cryptography. You cannot reverse a hash to get the original text." },
      { question: "Does hash generation happen locally in my browser?", answer: "Yes. All hashing happens entirely in your browser using browser APIs without any server involvement." },
    ],
  },
  "json-formatter": {
    howTo: {
      title: "Como Formatar JSON",
      steps: [
        "Paste your JSON code or raw JSON data into input",
        "The tool automatically formats and indents JSON properly",
        "Choose indentation size (2 or 4 spaces preferred)",
        "Copy the formatted JSON result",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Format and pretty-print JSON with proper indentation",
        "Validate JSON syntax and structure automatically",
        "Minify JSON to remove whitespace for compact output",
        "Syntax highlighting for easier readability",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Format API responses for easier reading and debugging",
        "Validate JSON before using in applications",
        "Minify JSON to reduce file sizes for transmission",
      ],
    },
    faq: [
      { question: "What's the difference between formatting and minifying JSON?", answer: "Formatting adds indentation for readability, while minifying removes all whitespace to reduce file size." },
      { question: "Will it catch JSON syntax errors?", answer: "Yes. The tool validates your JSON and alerts you to syntax errors like missing commas or mismatched brackets." },
      { question: "Is JSON formatting done locally in my browser?", answer: "Yes. All JSON formatting, validation, and minification happen entirely in your browser without any external processing." },
    ],
  },
};
