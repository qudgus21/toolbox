export interface FormatGuide {
  slug: string;
  name: string;
  extension: string;
  mimeType: string;
  category: "document" | "image" | "text" | "data";
  intro: string;
  history: string;
  technicalDetails: string;
  prosAndCons: { pros: string[]; cons: string[] };
  useCases: string[];
  relatedFormats: string[];
  relatedTools: { app: string; slug: string }[];
}

export const formats: FormatGuide[] = [
  // ─────────────────────────────────────────────
  // DOCUMENT FORMATS (7)
  // ─────────────────────────────────────────────
  {
    slug: "pdf",
    name: "PDF (Portable Document Format)",
    extension: ".pdf",
    mimeType: "application/pdf",
    category: "document",
    intro:
      "PDF, short for Portable Document Format, is a file format developed to present documents consistently across every device, operating system, and software application. Unlike editable word-processing files, a PDF captures the complete visual layout of a page — fonts, images, vector graphics, and text positioning — so that every viewer sees an identical rendering regardless of whether they open the file on Windows, macOS, Linux, or a mobile device.\n\nThe format achieves this device independence by embedding all necessary resources directly inside the file. Fonts are subset and included so that the recipient does not need matching typefaces installed; images are stored in their compressed form; and page geometry is described using a coordinate system derived from PostScript. A single PDF can contain hundreds of pages, interactive form fields, hyperlinks, bookmarks, embedded multimedia, JavaScript actions, digital signatures, and layered content.\n\nBecause PDF files are designed to be a faithful digital analog of printed paper, they have become the de facto standard for contracts, invoices, academic papers, government filings, technical manuals, and archival records. The format also supports accessibility features such as tagged content for screen readers, making it possible to create documents that meet WCAG and PDF/UA compliance requirements.",
    history:
      "Adobe Systems co-founder John Warnock launched the Camelot project in 1991 with the goal of enabling anyone to send documents electronically and have them appear exactly as intended when printed. The first public release of the format, then simply called PDF, came in June 1993 alongside the Acrobat 1.0 software suite. Early adoption was slow because the viewer software was not free, but in 1994 Adobe began distributing the Acrobat Reader at no charge, which accelerated uptake dramatically.\n\nOver the following decades Adobe released successive PDF specifications — from PDF 1.0 through PDF 1.7 — each adding capabilities like encryption, annotations, embedded multimedia, and accessibility tagging. In 2008, the International Organization for Standardization published PDF 1.7 as ISO 32000-1, transferring stewardship of the specification from a single company to an international standards body. The latest revision, ISO 32000-2 (PDF 2.0), was published in 2017 and introduced features such as 256-bit AES encryption, richer tagging semantics, and improvements to digital signatures.",
    technicalDetails:
      "A PDF file is organized into four structural layers: a header declaring the version, a body containing indirect objects (pages, fonts, images, content streams), a cross-reference table mapping object numbers to byte offsets for random access, and a trailer pointing to the root catalog. Content streams describe page appearance using a subset of the PostScript imaging model, with operators for stroking paths, filling regions, rendering text, and placing raster images.\n\nImages inside a PDF can be compressed with JPEG, JPEG2000, CCITT Group 4 (for bilevel images), Flate (zlib/deflate), or LZW algorithms. Text is encoded in content streams that reference font dictionaries; those dictionaries can embed TrueType, OpenType, or Type 1 font programs. Incremental saves allow appending changes without rewriting the entire file, and linearization (sometimes called Fast Web View) reorders objects so the first page can display before the entire file has downloaded.",
    prosAndCons: {
      pros: [
        "Pixel-perfect layout preservation across all platforms and devices",
        "ISO-standardized open format (ISO 32000) with broad ecosystem support",
        "Supports encryption, digital signatures, and permission controls",
        "Can embed fonts, images, multimedia, form fields, and JavaScript",
        "Archival variants (PDF/A) accepted for long-term regulatory preservation",
      ],
      cons: [
        "Editing content after creation requires specialized software",
        "Complex files with many embedded resources can be very large",
        "Reflowing text for small screens is difficult without tagged content",
        "Accessibility compliance requires deliberate tagging during creation",
        "Extracting structured data (tables, fields) from untagged PDFs is unreliable",
      ],
    },
    useCases: [
      "Distributing contracts, invoices, and legal documents that must look identical for every recipient",
      "Publishing academic research papers and journal articles for peer review and archival",
      "Filling and signing government, tax, and insurance forms electronically",
      "Creating print-ready brochures, posters, and packaging with PDF/X compliance",
      "Archiving corporate records in PDF/A format to meet regulatory retention requirements",
      "Sharing technical manuals and datasheets with embedded diagrams and hyperlinked tables of contents",
    ],
    relatedFormats: ["docx", "epub", "jpg", "png"],
    relatedTools: [
      { app: "pdf", slug: "merge" },
      { app: "pdf", slug: "split" },
      { app: "pdf", slug: "compress" },
      { app: "pdf", slug: "convert-to-jpg" },
    ],
  },
  {
    slug: "docx",
    name: "DOCX (Microsoft Word Document)",
    extension: ".docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    category: "document",
    intro:
      "DOCX is the default document format for Microsoft Word and the most widely used word-processing file type in the world. Introduced with Office 2007, it replaced the older binary .doc format with an open, XML-based structure that is both easier to parse programmatically and more resilient against corruption. A DOCX file is actually a ZIP archive containing XML files that describe the document's text, formatting, styles, images, and metadata in a well-defined hierarchy.\n\nThe format supports rich typographic features including paragraph and character styles, headers and footers, footnotes, track changes, comments, tables of contents, cross-references, embedded charts, SmartArt diagrams, and mathematical equations via Office MathML. Because the underlying XML schema is publicly documented as part of the ECMA-376 and ISO/IEC 29500 standards, third-party applications such as LibreOffice, Google Docs, and Apple Pages can read and write DOCX files with high fidelity.\n\nDOCX strikes a balance between editability and presentation. While it is not as layout-rigid as PDF, its style-based formatting system allows authors to separate content from presentation, enabling efficient global changes to fonts, spacing, and numbering through a single style modification.",
    history:
      "Microsoft introduced the DOCX format in November 2006 alongside the Office Open XML (OOXML) specification. The motivation was partly technical — the older binary .doc format was opaque and difficult for third parties to implement — and partly strategic, responding to growing government mandates for open document standards. ECMA International standardized OOXML as ECMA-376 in December 2006, and ISO/IEC approved it as ISO/IEC 29500 in 2008 after a controversial and closely watched ballot process.\n\nThe transition from .doc to .docx was gradual. Microsoft shipped a compatibility pack so that older versions of Office could open the new format, and by Office 2010 the ecosystem had largely shifted. Today, virtually every major word processor, cloud editor, and document-management system supports DOCX as a primary interchange format.",
    technicalDetails:
      "Internally, a DOCX file is a ZIP package conforming to the Open Packaging Conventions (OPC). The archive typically contains a [Content_Types].xml manifest, a _rels folder with relationship files, and a word/ folder holding document.xml (the main body), styles.xml, numbering.xml, fontTable.xml, settings.xml, and media files. Each XML file uses namespaces defined in ECMA-376, such as w: for WordprocessingML elements.\n\nText runs are wrapped in <w:r> elements inside <w:p> paragraph elements. Run properties (<w:rPr>) control font, size, bold, italic, and color at the character level, while paragraph properties (<w:pPr>) control alignment, indentation, and spacing. Images are stored in the word/media/ directory and referenced through drawing markup language (DrawingML) elements. The format supports both inline and floating image positioning, as well as VML shapes for backward compatibility.",
    prosAndCons: {
      pros: [
        "Universal compatibility — supported by virtually every word processor and cloud editor",
        "Open XML standard (ISO/IEC 29500) allows reliable third-party implementation",
        "Rich feature set including track changes, comments, styles, and mail merge",
        "ZIP-based packaging keeps file sizes manageable and enables partial extraction",
        "Style-based formatting enables efficient global design changes",
      ],
      cons: [
        "Layout rendering can vary between applications and operating systems",
        "Complex documents with macros or ActiveX controls may not work outside Microsoft Word",
        "No guarantee of pixel-perfect reproduction on different systems",
        "Merging concurrent edits is more difficult than in real-time collaborative formats",
        "VML legacy shapes and some advanced features have limited cross-platform support",
      ],
    },
    useCases: [
      "Writing and collaborating on business reports, proposals, and memos",
      "Drafting legal contracts with track changes and version history",
      "Producing academic theses and dissertations with structured headings and citations",
      "Creating newsletters and flyers with embedded images, tables, and text boxes",
      "Generating templated documents such as invoices and certificates via mail merge",
      "Exchanging editable manuscripts between authors, editors, and publishers",
    ],
    relatedFormats: ["pdf", "odt", "rtf", "txt"],
    relatedTools: [
      { app: "pdf", slug: "merge" },
      { app: "pdf", slug: "edit" },
      { app: "text", slug: "word-counter" },
    ],
  },
  {
    slug: "xlsx",
    name: "XLSX (Microsoft Excel Spreadsheet)",
    extension: ".xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    category: "document",
    intro:
      "XLSX is the default spreadsheet format for Microsoft Excel and the most widely adopted file type for tabular data, calculations, and data analysis in business, science, and finance. Like DOCX, it was introduced with Office 2007 as part of the Office Open XML family, replacing the binary .xls format with a ZIP-packaged collection of XML files that describe worksheets, formulas, styles, charts, and pivot tables.\n\nAn XLSX workbook can contain multiple worksheets, each organized as a grid of cells addressed by column letter and row number (for example, A1 or Z65536). Cells can hold literal values (numbers, strings, booleans, dates), formulas referencing other cells, or error codes. The format supports a rich formula language with over 500 built-in functions spanning mathematics, statistics, financial analysis, text manipulation, date calculations, and database lookups. Conditional formatting, data validation rules, and named ranges add further analytical power.\n\nBeyond simple tables, XLSX files can embed charts (bar, line, scatter, pie, and dozens of other types), pivot tables for interactive summarization, sparklines for in-cell visualization, and even Power Query connections to external data sources. This versatility has made XLSX the standard interchange format between database exports, accounting systems, CRM platforms, and reporting dashboards.",
    history:
      "Microsoft Excel's original file format was the binary BIFF (Binary Interchange File Format), first used in Excel 2.0 for Windows in 1987. The .xls extension persisted through Excel 2003, but the binary structure was notoriously difficult for third parties to parse and prone to corruption. When Microsoft designed the Office Open XML standard in the mid-2000s, SpreadsheetML became the XML vocabulary for workbooks, and the .xlsx extension was born with Office 2007.\n\nECMA-376 (2006) and ISO/IEC 29500 (2008) formalized the specification. Google Sheets, LibreOffice Calc, Apple Numbers, and many data-science libraries (openpyxl for Python, Apache POI for Java, SheetJS for JavaScript) now read and write XLSX natively, cementing it as the universal spreadsheet interchange format.",
    technicalDetails:
      "An XLSX file is a ZIP archive containing XML parts organized under the xl/ directory. The core parts include workbook.xml (workbook structure and sheet references), sharedStrings.xml (a deduplicated string table to reduce file size), styles.xml (number formats, fonts, fills, borders, and cell styles), and individual sheet XML files such as sheet1.xml. Each sheet file lists rows and cells with their types and values; formula cells store both the formula string and the last-calculated value.\n\nCell references use the A1 notation, and formulas follow the OpenFormula-compatible syntax defined in the OOXML specification. Charts are described in DrawingML chart markup embedded within the drawings directory. Pivot tables have their own XML parts and cache definitions. The format supports workbook-level and sheet-level protection with password hashing, though the protection is not cryptographic encryption — true encryption uses the EncryptionInfo stream in the OLE compound file wrapper around the ZIP package.",
    prosAndCons: {
      pros: [
        "Over 500 built-in functions covering finance, statistics, engineering, and more",
        "Universal support across Excel, Google Sheets, LibreOffice, and data libraries",
        "Open XML standard with well-documented schema for programmatic generation",
        "Supports charts, pivot tables, conditional formatting, and data validation",
        "ZIP compression keeps file sizes reasonable even for large datasets",
      ],
      cons: [
        "Row limit of 1,048,576 rows per sheet can be insufficient for large datasets",
        "Complex formulas and volatile functions can cause slow recalculation",
        "Formatting fidelity can vary between Excel, LibreOffice, and Google Sheets",
        "VBA macros (stored in .xlsm variant) pose security risks and lack cross-platform support",
        "Not well suited for relational data that spans multiple interdependent tables",
      ],
    },
    useCases: [
      "Building financial models, budgets, and forecasting spreadsheets",
      "Analyzing survey results and scientific experimental data with pivot tables",
      "Exchanging tabular data between ERP, CRM, and accounting systems",
      "Creating project timelines, Gantt charts, and resource allocation matrices",
      "Generating standardized reports with conditional formatting and embedded charts",
      "Importing and cleaning CSV data before loading into databases or BI tools",
    ],
    relatedFormats: ["csv", "pdf", "odt", "json"],
    relatedTools: [
      { app: "converter", slug: "csv-to-json" },
      { app: "pdf", slug: "merge" },
      { app: "text", slug: "json-formatter" },
    ],
  },
  {
    slug: "pptx",
    name: "PPTX (Microsoft PowerPoint)",
    extension: ".pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    category: "document",
    intro:
      "PPTX is the default presentation format for Microsoft PowerPoint and the dominant file type for slide-based visual communication in business, education, and public speaking. Introduced alongside DOCX and XLSX in Office 2007, PPTX stores slides as XML within a ZIP archive, enabling richer multimedia embedding and better interoperability than the older binary .ppt format.\n\nEach PPTX file is organized as a sequence of slides, where every slide is a canvas containing shapes, text boxes, images, charts, tables, audio clips, video files, and animations. Slide masters and layouts provide a two-tier template system: the master defines the overall theme (fonts, colors, background), while layouts define placeholder positions for specific slide types such as title, content, section header, or comparison. This separation lets presenters change the entire visual identity of a deck by swapping the master theme.\n\nTransitions between slides and animations on individual objects are stored as XML timing sequences, supporting effects ranging from simple fades to complex motion paths. Speaker notes, embedded hyperlinks, and action buttons add interactivity for both live presentations and self-running kiosks.",
    history:
      "PowerPoint was originally created by Robert Gaskins and Dennis Austin at Forethought, Inc. and released for Macintosh in April 1987. Microsoft acquired Forethought three months later for 14 million dollars. The binary .ppt format dominated for nearly two decades, but its opaque structure made third-party support difficult. With the Office Open XML initiative, Microsoft introduced PresentationML and the .pptx extension in 2006, standardized through ECMA-376 and later ISO/IEC 29500.\n\nThe transition accelerated as Google Slides, Apple Keynote, LibreOffice Impress, and numerous online editors added PPTX import and export. Today, PPTX is the expected format for presentations in virtually every corporate and academic environment worldwide.",
    technicalDetails:
      "A PPTX file is a ZIP package containing XML parts under the ppt/ directory. The main structural file is presentation.xml, which lists slide references in order. Each slide has a corresponding slideN.xml file defining shapes via PresentationML and DrawingML schemas. Shapes are positioned using EMU (English Metric Units), where 914400 EMUs equal one inch, providing sub-pixel precision.\n\nText within shapes uses the DrawingML text body model with paragraphs, runs, and character properties. Embedded media files (images, audio, video) reside in the ppt/media/ directory and are referenced through relationship IDs. Charts are embedded as separate DrawingML chart parts. Slide transitions and object animations are encoded in timing XML nodes that specify trigger events, durations, and effect parameters. The format supports OLE embedding, allowing Excel worksheets and other objects to be embedded live within slides.",
    prosAndCons: {
      pros: [
        "De facto standard for business and academic presentations worldwide",
        "Rich multimedia support including video, audio, 3D models, and animations",
        "Slide master and layout system enables consistent branding across large decks",
        "Open XML standard allows programmatic slide generation and manipulation",
        "Wide ecosystem support from Google Slides, Keynote, LibreOffice, and online tools",
      ],
      cons: [
        "Complex animations and transitions may not render identically outside PowerPoint",
        "Large embedded media can inflate file sizes to hundreds of megabytes",
        "Collaborative editing is limited compared to cloud-native tools like Google Slides",
        "Accessibility for screen readers requires deliberate alt-text and reading-order tagging",
        "Font substitution on systems lacking the original typefaces can break layouts",
      ],
    },
    useCases: [
      "Delivering quarterly business reviews, sales pitches, and investor decks",
      "Creating lecture slides and training materials for classrooms and workshops",
      "Designing conference keynotes with embedded video and animated data visualizations",
      "Producing self-running product demos and trade-show kiosk presentations",
      "Generating automated slide reports from data pipelines using templating libraries",
      "Sharing visual proposals and mood boards in design and marketing teams",
    ],
    relatedFormats: ["pdf", "docx", "jpg", "png"],
    relatedTools: [
      { app: "pdf", slug: "convert-to-jpg" },
      { app: "pdf", slug: "merge" },
      { app: "image", slug: "resize" },
    ],
  },
  {
    slug: "odt",
    name: "ODT (OpenDocument Text)",
    extension: ".odt",
    mimeType: "application/vnd.oasis.opendocument.text",
    category: "document",
    intro:
      "ODT is the word-processing file format defined by the OpenDocument Format (ODF) standard, an open, vendor-neutral specification maintained by the OASIS technical committee and published as ISO/IEC 26300. Unlike DOCX, which originated from a single vendor, ODF was designed from the outset as a truly open standard to prevent lock-in and ensure that documents remain readable by any conforming application indefinitely.\n\nAn ODT file stores text content, paragraph and character styles, images, tables, headers, footers, footnotes, and metadata in a ZIP archive of XML files. The markup vocabulary is intentionally straightforward: paragraphs are <text:p>, spans are <text:span>, and styles are defined in a dedicated styles.xml file. This simplicity makes ODT files particularly amenable to XSLT transformations, automated generation, and long-term archival.\n\nODT is the default format in LibreOffice Writer and Apache OpenOffice Writer, and it is supported by Microsoft Word (since Office 2007 SP2), Google Docs, and numerous other editors. Several European governments and public administrations have mandated ODF as the official document format for public records to guarantee long-term accessibility and vendor independence.",
    history:
      "The OpenDocument Format traces its roots to the XML file format used by OpenOffice.org, which Sun Microsystems open-sourced in 2000. In 2002, OASIS formed a technical committee to develop a vendor-neutral document standard based on the OpenOffice.org XML schema. The first edition of ODF (version 1.0) was approved by OASIS in May 2005 and adopted as ISO/IEC 26300 in November 2006.\n\nSubsequent revisions — ODF 1.1 (2007), ODF 1.2 (2011), and ODF 1.3 (2021) — added features like RDF metadata, digital signatures, tracked changes interoperability improvements, and enhanced formula support. The standard has been endorsed by government procurement policies in countries including the United Kingdom, France, the Netherlands, and Brazil, solidifying its role as a guarantor of document sovereignty.",
    technicalDetails:
      "An ODT file is a ZIP archive conforming to the ODF package format. The key XML parts are content.xml (text body and inline formatting), styles.xml (named styles and page layouts), meta.xml (document metadata like author, creation date, and word count), and settings.xml (application-specific preferences such as zoom level). Images and other media are stored in a Pictures/ directory within the archive.\n\nStyles in ODF follow a cascading model similar in concept to CSS: a paragraph style can inherit from a parent style, and character properties within a run override paragraph-level defaults. Page layouts define margins, headers, footers, and column configurations. The formula language for embedded spreadsheet cells follows the OpenFormula specification (ODF Part 2), which provides a portable syntax independent of any single application's function library.",
    prosAndCons: {
      pros: [
        "Fully open ISO standard (ISO/IEC 26300) with no vendor lock-in",
        "Simple, well-documented XML schema suitable for automated processing",
        "Mandated by multiple governments for public-sector document exchange",
        "Natively supported by LibreOffice, OpenOffice, Google Docs, and Microsoft Word",
        "Long-term archival assurance due to vendor-independent specification",
      ],
      cons: [
        "Feature parity with DOCX is incomplete for advanced Word features like SmartArt",
        "Formatting may shift when opened in Microsoft Word due to rendering differences",
        "Smaller ecosystem of templates, add-ins, and training resources compared to DOCX",
        "Track changes and comments interoperability between editors can be imperfect",
        "Limited enterprise adoption outside government and open-source communities",
      ],
    },
    useCases: [
      "Government agencies producing public records under open-format mandates",
      "Nonprofit organizations and NGOs sharing documents without proprietary dependencies",
      "Academic institutions distributing course materials that must remain freely accessible",
      "Automated document generation pipelines that benefit from simple, predictable XML",
      "Long-term archival of corporate policy documents and legal records",
      "Cross-platform collaboration where participants use different office suites",
    ],
    relatedFormats: ["docx", "pdf", "rtf", "epub"],
    relatedTools: [
      { app: "pdf", slug: "edit" },
      { app: "text", slug: "word-counter" },
      { app: "text", slug: "character-counter" },
    ],
  },
  {
    slug: "rtf",
    name: "RTF (Rich Text Format)",
    extension: ".rtf",
    mimeType: "application/rtf",
    category: "document",
    intro:
      "RTF, or Rich Text Format, is a document file format created by Microsoft that stores formatted text along with basic structural elements like tables, images, and font specifications using plain-text control codes. Unlike binary formats such as the old .doc, an RTF file can be opened in any text editor and read — albeit with difficulty — because its content is encoded as ASCII characters interspersed with backslash-prefixed control words like \\b for bold and \\par for paragraph breaks.\n\nRTF was designed as an interchange format, enabling documents to move between different word processors while preserving basic formatting. It supports character-level formatting (fonts, sizes, colors, bold, italic, underline), paragraph-level formatting (alignment, indentation, line spacing), tables, embedded images (as hex-encoded data), and headers and footers. However, it lacks many features found in modern formats like DOCX, such as tracked changes, advanced layout controls, and embedded multimedia.\n\nDespite its age, RTF remains useful in specific niches. It is commonly generated by clipboard operations on Windows, used as a safe format for email composition in some clients, and employed in legal and medical software where simple formatted text exchange is needed without the complexity of XML-based formats.",
    history:
      "Microsoft introduced RTF in 1987 with the release of Word 3.0 for Macintosh, positioning it as a cross-platform document interchange format. The original specification (RTF 1.0) supported basic character and paragraph formatting. Over the following two decades, Microsoft released updated specifications culminating in RTF 1.9.1 in 2008, which added support for new Word features like mathematical equations and themes.\n\nRTF achieved widespread adoption in the 1990s as the primary interchange format between Word, WordPerfect, and other word processors. However, with the rise of DOCX and ODF in the late 2000s, RTF usage declined significantly. Microsoft officially stopped updating the RTF specification after version 1.9.1 and recommends DOCX or PDF for document interchange. Nevertheless, many legacy systems and specialized applications continue to rely on RTF.",
    technicalDetails:
      "An RTF file is a plain-text stream composed of groups delimited by curly braces, control words prefixed with backslashes, and literal text. The file begins with {\\rtf1 followed by character set and font table declarations. A typical control word like \\fs24 sets the font size to 12 points (RTF measures font size in half-points). Groups nest to create scoped formatting: {\\b bold text} applies boldface only within the braces.\n\nImages are embedded as hexadecimal-encoded data within \\pict groups, specifying the image type (e.g., \\pngblip for PNG, \\jpegblip for JPEG), dimensions, and the raw hex bytes. Tables are defined using \\trowd (table row default), \\cellx (cell boundary positions in twips — 1/1440 of an inch), and \\cell delimiters. Because all data is encoded as printable ASCII, RTF files are significantly larger than equivalent binary or compressed XML formats, but they are resilient to partial corruption and trivial to generate programmatically.",
    prosAndCons: {
      pros: [
        "Human-readable plain-text encoding that any text editor can open",
        "Extremely broad compatibility across word processors and operating systems",
        "Simple programmatic generation without needing XML or ZIP libraries",
        "Resilient to partial corruption since content is plain ASCII",
        "Safe from macro-based malware unlike .doc and .docm formats",
      ],
      cons: [
        "No support for tracked changes, comments, or modern collaboration features",
        "Hex-encoded images inflate file sizes dramatically compared to compressed formats",
        "Limited layout control — no master pages, columns, or advanced typography",
        "Specification has not been updated since 2008 and is effectively deprecated",
        "Rendering inconsistencies between applications for complex formatting",
      ],
    },
    useCases: [
      "Exchanging formatted text between disparate word processors and legacy systems",
      "Generating simple formatted documents programmatically from code without complex libraries",
      "Clipboard interchange on Windows where rich formatting must survive copy-paste",
      "Legal document assembly systems that need a lightweight formatted-text format",
      "Email composition in clients that use RTF as their internal editor format",
    ],
    relatedFormats: ["docx", "odt", "txt", "pdf"],
    relatedTools: [
      { app: "text", slug: "word-counter" },
      { app: "text", slug: "character-counter" },
      { app: "pdf", slug: "edit" },
    ],
  },
  {
    slug: "epub",
    name: "EPUB (Electronic Publication)",
    extension: ".epub",
    mimeType: "application/epub+zip",
    category: "document",
    intro:
      "EPUB is the most widely adopted open standard for reflowable digital books and publications. Maintained by the World Wide Web Consortium (W3C) since 2017 (previously by the International Digital Publishing Forum, IDPF), EPUB packages XHTML content, CSS stylesheets, images, fonts, and metadata into a single ZIP archive that e-readers, tablets, and reading applications can render with text that reflows to fit any screen size.\n\nUnlike fixed-layout formats such as PDF, EPUB is designed for comfortable reading on devices ranging from small smartphones to large desktop monitors. Readers can adjust font size, typeface, line spacing, margins, and background color to suit their preferences, and the text repaginates accordingly. This reflowable nature makes EPUB the preferred format for novels, nonfiction, textbooks, and periodicals distributed through digital bookstores including Apple Books, Google Play Books, Kobo, and most library lending platforms.\n\nEPUB also supports fixed-layout mode for content where spatial arrangement is essential, such as children's picture books, comics, and cookbooks with precise image-text integration. Accessibility is a first-class concern: EPUB 3 integrates with the WCAG guidelines, supporting semantic markup, ARIA roles, text-to-speech hints via SSML, and media overlays that synchronize narrated audio with highlighted text.",
    history:
      "The EPUB format evolved from the Open eBook Publication Structure (OEBPS), first released in 1999 by the Open eBook Forum (later renamed IDPF). OEBPS defined an XML-based content vocabulary but lacked a packaging standard. EPUB 2.0, published in 2007, combined XHTML content documents with an OPF (Open Packaging Format) manifest and an OCF (Open Container Format) ZIP wrapper, creating the complete ebook format recognized today.\n\nEPUB 3.0, released in 2011, was a major overhaul that replaced the XHTML subset with full HTML5 and CSS3, added support for SVG, MathML, JavaScript interactivity, and media overlays for synchronized audio-text playback. In 2017, the IDPF merged with the W3C, and EPUB 3.3 (published as a W3C Recommendation in May 2023) is the current version, refining accessibility requirements and aligning the specification more closely with web standards.",
    technicalDetails:
      "An EPUB file is a ZIP archive that must contain a mimetype file as its first entry (stored without compression) with the value application/epub+zip. The META-INF/container.xml file points to the OPF package document, which serves as the manifest and spine (reading order) of the publication. Content documents are XHTML5 files styled with CSS; the spec supports a substantial subset of CSS3 including media queries, web fonts via @font-face, and multi-column layout.\n\nThe navigation document (nav.xhtml) replaces the NCX table of contents from EPUB 2 and uses the HTML5 nav element with epub:type attributes for semantic identification. Media overlay documents are SMIL (Synchronized Multimedia Integration Language) files that pair audio segments with text fragments for read-aloud functionality. DRM is not part of the EPUB specification itself but is typically applied as a wrapper — Adobe DRM and Apple FairPlay are the most common schemes used by commercial distributors.",
    prosAndCons: {
      pros: [
        "Reflowable text adapts to any screen size and reader-customizable typography",
        "W3C-maintained open standard based on familiar web technologies (HTML, CSS)",
        "Strong accessibility support including media overlays and semantic markup",
        "Supported by virtually all e-readers, tablets, and reading applications",
        "Fixed-layout mode available for visually complex publications",
      ],
      cons: [
        "Rendering differences between reading systems can alter the intended design",
        "JavaScript support is inconsistent and sandboxed in most readers",
        "DRM implementations are proprietary and fragment the ecosystem",
        "Complex page layouts (multi-column, sidebars) are harder to achieve than in PDF",
        "Some older e-readers only support EPUB 2 and cannot handle EPUB 3 features",
      ],
    },
    useCases: [
      "Publishing and distributing novels, nonfiction, and textbooks through digital bookstores",
      "Creating accessible educational materials with synchronized audio narration",
      "Producing interactive children's books with embedded audio and animations",
      "Distributing corporate training manuals that readers can customize for comfort",
      "Self-publishing authors packaging manuscripts for platforms like Apple Books and Kobo",
      "Libraries lending digital books through OverDrive, Libby, and similar platforms",
    ],
    relatedFormats: ["pdf", "html", "docx", "odt"],
    relatedTools: [
      { app: "pdf", slug: "convert-to-jpg" },
      { app: "pdf", slug: "merge" },
      { app: "text", slug: "word-counter" },
    ],
  },

  // ─────────────────────────────────────────────
  // IMAGE FORMATS (11)
  // ─────────────────────────────────────────────
  {
    slug: "jpg",
    name: "JPEG/JPG (Joint Photographic Experts Group)",
    extension: ".jpg",
    mimeType: "image/jpeg",
    category: "image",
    intro:
      "JPEG (commonly referred to as JPG due to the three-character file extension convention of early operating systems) is the most ubiquitous lossy image compression format in the world. Developed by the Joint Photographic Experts Group, a committee jointly established by the ISO and the IEC, JPEG excels at compressing photographic images by discarding visual information that the human eye is least likely to notice, achieving compression ratios of 10:1 or higher while maintaining acceptable visual quality.\n\nThe format works by transforming spatial pixel data into the frequency domain using the Discrete Cosine Transform (DCT), then quantizing the resulting coefficients to reduce precision in high-frequency components that represent fine details. This lossy process means that some image data is permanently discarded — each successive save at a lower quality setting introduces additional artifacts, particularly around sharp edges and in areas of flat color. Despite this trade-off, JPEG remains the dominant format for digital photography, web images, and social media because of its extraordinary compression efficiency for natural scenes.\n\nJPEG files can embed EXIF metadata containing camera settings (aperture, shutter speed, ISO, focal length), GPS coordinates, timestamps, and thumbnail previews. This metadata is invaluable for photographers organizing large image libraries but raises privacy concerns when shared online without stripping location data.",
    history:
      "The JPEG standard was first published in 1992 as ITU-T Recommendation T.81 and ISO/IEC 10918-1. The Joint Photographic Experts Group, formed in 1986, spent six years developing the compression algorithm through a rigorous process of proposals, testing, and refinement. The standard was revolutionary at the time — it made it practical to store photographic-quality images in files small enough to transmit over early internet connections and store on limited hard drives.\n\nThe JPEG File Interchange Format (JFIF), published by Eric Hamilton at C-Cube Microsystems in 1992, defined the common container structure used today. The Exchangeable Image File Format (EXIF), developed by the Japan Electronic Industries Development Association (JEIDA) in 1995, added metadata support for digital cameras. A newer variant, JPEG 2000 (ISO 15444), was standardized in 2000 with wavelet-based compression offering better quality at low bitrates, but it failed to achieve widespread adoption due to licensing concerns and lack of browser support.",
    technicalDetails:
      "JPEG compression operates in several stages. First, the image is converted from RGB to YCbCr color space, separating luminance (Y) from chrominance (Cb, Cr). Chrominance channels are typically downsampled (most commonly 4:2:0, reducing chrominance resolution by half in each dimension) because the human visual system is more sensitive to brightness than color. The image is then divided into 8x8 pixel blocks, and each block undergoes a Discrete Cosine Transform that converts spatial data into 64 frequency coefficients.\n\nA quantization matrix (scaled by the quality setting) divides each coefficient and rounds the result to an integer, zeroing out many high-frequency components. The quantized coefficients are then zigzag-scanned, run-length encoded, and Huffman-coded (or arithmetic-coded in less common implementations) to produce the final compressed bitstream. Baseline JPEG supports 8-bit color depth per channel (24-bit color), while JPEG extensions support 12-bit depth. The maximum image dimensions are 65535 x 65535 pixels.",
    prosAndCons: {
      pros: [
        "Exceptional compression ratios for photographic content (10:1 to 20:1 with good quality)",
        "Universal support across every browser, operating system, camera, and image editor",
        "Adjustable quality parameter allows fine-tuning the size/quality trade-off",
        "EXIF metadata support for camera settings, GPS, and organizational data",
        "Mature, royalty-free standard with three decades of ecosystem investment",
      ],
      cons: [
        "Lossy compression permanently discards image data with each save",
        "Visible blocking artifacts at low quality settings, especially on sharp edges",
        "No transparency support — fully opaque images only",
        "Not suitable for text, line art, or graphics with sharp color boundaries",
        "Repeated editing and saving causes cumulative quality degradation (generation loss)",
      ],
    },
    useCases: [
      "Storing photographs from digital cameras and smartphones",
      "Displaying photographic content on websites and social media platforms",
      "Embedding images in documents, presentations, and email messages",
      "Printing photographs at photo labs and consumer printers",
      "Transmitting medical images in DICOM-wrapped JPEG for teleradiology",
      "Archiving digitized historical photographs and artwork scans",
    ],
    relatedFormats: ["png", "webp", "heic", "tiff"],
    relatedTools: [
      { app: "image", slug: "compress" },
      { app: "image", slug: "resize" },
      { app: "image", slug: "convert-to-png" },
      { app: "image", slug: "convert-to-webp" },
    ],
  },
  {
    slug: "png",
    name: "PNG (Portable Network Graphics)",
    extension: ".png",
    mimeType: "image/png",
    category: "image",
    intro:
      "PNG is a lossless raster image format designed as a patent-free replacement for GIF. Developed by an internet community working group and standardized as a W3C Recommendation and ISO/IEC 15948, PNG preserves every pixel exactly as authored — no compression artifacts, no quality degradation on repeated saves. This makes it the preferred format for images that demand precision: screenshots, diagrams, UI elements, logos with text, and any graphic where sharp edges and flat color areas must remain crisp.\n\nPNG's standout feature is its support for an alpha channel, enabling per-pixel transparency with 256 levels of opacity. This capability is essential for web design and application development, where images must composite seamlessly over varying backgrounds. Unlike GIF's binary transparency (a pixel is either fully transparent or fully opaque), PNG's alpha channel allows smooth anti-aliased edges, drop shadows, and glass-like translucent effects.\n\nThe format uses the DEFLATE compression algorithm (the same algorithm used in ZIP and gzip) applied to filtered scanlines, achieving excellent compression for images with large areas of uniform color, repeated patterns, or smooth gradients. For photographic content with complex textures, however, PNG files are substantially larger than their JPEG equivalents because lossless compression cannot discard visual information.",
    history:
      "PNG emerged in January 1995 as a direct response to the GIF patent controversy. Unisys, which held the patent on the LZW compression algorithm used in GIF, began enforcing licensing fees against software developers, provoking outrage in the internet community. Thomas Boutell and an informal working group quickly drafted a specification for a new format that would be entirely free of patent encumbrances.\n\nThe first PNG specification (version 1.0) was published as a W3C Recommendation on October 1, 1996. An updated version (1.2) followed in 1999, and ISO standardized it as ISO/IEC 15948 in 2003. The related MNG (Multiple-image Network Graphics) format for animations never gained traction, but APNG (Animated PNG), an unofficial extension by Mozilla, achieved broad browser support by 2020 and is now supported in all major browsers.",
    technicalDetails:
      "A PNG file begins with an 8-byte signature (137 80 78 71 13 10 26 10) followed by a sequence of chunks. Each chunk has a 4-byte length, a 4-byte type code, the data payload, and a 4-byte CRC32 checksum. The critical chunks are IHDR (image header specifying dimensions, bit depth, and color type), IDAT (compressed image data), and IEND (image trailer). Optional ancillary chunks include tEXt (text metadata), gAMA (gamma correction), cHRM (chromaticity), iCCP (embedded ICC color profile), and tRNS (transparency for palette-based images).\n\nPNG supports five color types: grayscale (1/2/4/8/16-bit), RGB (8/16-bit per channel), palette-based (1/2/4/8-bit indices into a 256-color table), grayscale with alpha, and RGBA. Before compression, each scanline is passed through one of five filter types (None, Sub, Up, Average, Paeth) to improve compressibility by exploiting pixel-to-pixel correlation. The filtered data is then DEFLATE-compressed. Interlacing via the Adam7 scheme allows progressive display, rendering a low-resolution preview in seven passes.",
    prosAndCons: {
      pros: [
        "Lossless compression preserves every pixel without artifacts or quality loss",
        "Full alpha channel transparency with 256 opacity levels per pixel",
        "Patent-free, royalty-free open standard (W3C Recommendation, ISO/IEC 15948)",
        "Excellent for screenshots, diagrams, logos, and graphics with sharp edges",
        "Supports 16-bit per channel color depth for high dynamic range workflows",
      ],
      cons: [
        "File sizes are much larger than JPEG for photographic content",
        "No native animation support in the base specification (APNG is an extension)",
        "Not suitable for print workflows that require CMYK color space",
        "Compression speed is slower than simpler formats like BMP",
        "Lossless compression cannot match the file size reduction of lossy formats for photos",
      ],
    },
    useCases: [
      "Capturing and sharing screenshots with pixel-perfect text and UI elements",
      "Creating web graphics, icons, and buttons that need transparent backgrounds",
      "Storing sprites and texture assets in game development pipelines",
      "Preserving scanned line art, maps, and technical diagrams without artifacts",
      "Exporting design mockups from tools like Figma, Sketch, and Adobe XD",
      "Displaying data visualizations and charts on websites with crisp rendering",
    ],
    relatedFormats: ["jpg", "webp", "svg", "gif"],
    relatedTools: [
      { app: "image", slug: "compress" },
      { app: "image", slug: "convert-to-jpg" },
      { app: "image", slug: "convert-to-webp" },
      { app: "image", slug: "remove-background" },
    ],
  },
  {
    slug: "webp",
    name: "WebP",
    extension: ".webp",
    mimeType: "image/webp",
    category: "image",
    intro:
      "WebP is a modern image format developed by Google that provides both lossy and lossless compression in a single container, along with animation support and alpha-channel transparency. Designed specifically for the web, WebP aims to replace JPEG, PNG, and GIF by offering smaller file sizes at equivalent or better visual quality, reducing page load times and bandwidth consumption.\n\nIn lossy mode, WebP typically produces files 25-34% smaller than JPEG at equivalent perceptual quality, as demonstrated in Google's comparative studies. In lossless mode, WebP files are 26% smaller than PNG on average. These savings translate directly into faster page loads, lower hosting costs, and improved Core Web Vitals scores — factors that influence both user experience and search engine rankings.\n\nWebP achieves its compression advantages by leveraging techniques derived from the VP8 video codec (for lossy) and a novel algorithm combining LZ77, Huffman coding, and color cache (for lossless). The format supports 24-bit RGB color with an 8-bit alpha channel in both lossy and lossless modes, animated sequences comparable to GIF but with dramatically smaller file sizes, and ICC color profile embedding.",
    history:
      "Google announced WebP on September 30, 2010, initially supporting only lossy compression derived from the VP8 video codec's intra-frame coding. The rationale was straightforward: images account for a massive share of web page bytes, and a more efficient format could meaningfully improve the speed of the internet. Lossless compression, transparency support, and animation were added in 2011-2012, making WebP a comprehensive replacement for all three legacy web image formats.\n\nBrowser adoption was gradual. Google Chrome supported WebP from the start, but Firefox did not add support until version 65 (January 2019), Safari waited until version 14 (September 2020), and Microsoft Edge gained native support through its Chromium transition. By 2022, WebP was supported in all major browsers, and adoption accelerated rapidly. Today, major platforms including Facebook, YouTube, and eBay serve WebP images to compatible browsers.",
    technicalDetails:
      "WebP uses the RIFF container format (the same container family as WAV and AVI), beginning with a RIFF header followed by a WEBP FourCC. Lossy WebP employs VP8 intra-frame prediction and transform coding: the image is divided into macroblocks (16x16 pixels for luminance, 8x8 for chrominance in YUV 4:2:0), predicted using one of four spatial prediction modes, and the residual is DCT-transformed and entropy-coded with boolean arithmetic coding.\n\nLossless WebP uses an entirely different algorithm. It applies a series of transforms — predictor transform (14 spatial prediction modes), color transform (decorrelation of RGB channels), subtract-green transform, and color indexing transform (palette reduction) — followed by LZ77 backward references and Huffman coding. A color cache of recently seen pixels provides additional compression. Animated WebP stores multiple frames with per-frame timing, disposal, and blending metadata, similar to animated GIF but with both lossy and lossless frame compression options.",
    prosAndCons: {
      pros: [
        "25-34% smaller than JPEG for lossy and 26% smaller than PNG for lossless compression",
        "Supports both lossy and lossless modes, transparency, and animation in one format",
        "Improves Core Web Vitals page speed metrics and reduces bandwidth costs",
        "Universal browser support achieved as of 2022 (Chrome, Firefox, Safari, Edge)",
        "Royalty-free with open-source reference encoder and decoder (libwebp)",
      ],
      cons: [
        "Lossy encoding at very low quality can produce blurring artifacts less graceful than JPEG",
        "Encoding speed is slower than JPEG, especially for lossless mode",
        "Limited support in older image editing software (Photoshop added support in 2022)",
        "Maximum image dimensions capped at 16383 x 16383 pixels",
        "Less universal outside the web — email clients and print workflows may not accept it",
      ],
    },
    useCases: [
      "Serving web images with optimal compression to improve page load speed",
      "Replacing animated GIFs with dramatically smaller animated WebP files",
      "Storing product images on e-commerce platforms to reduce storage and CDN costs",
      "Creating transparent web graphics that are smaller than equivalent PNG files",
      "Optimizing image assets for mobile applications where bandwidth is limited",
      "Improving Lighthouse and Core Web Vitals scores through format modernization",
    ],
    relatedFormats: ["jpg", "png", "gif", "svg"],
    relatedTools: [
      { app: "image", slug: "convert-to-webp" },
      { app: "image", slug: "compress" },
      { app: "image", slug: "convert-to-jpg" },
      { app: "image", slug: "convert-to-png" },
    ],
  },
  {
    slug: "svg",
    name: "SVG (Scalable Vector Graphics)",
    extension: ".svg",
    mimeType: "image/svg+xml",
    category: "image",
    intro:
      "SVG is an XML-based vector image format for two-dimensional graphics, developed and maintained by the World Wide Web Consortium (W3C). Unlike raster formats such as JPEG and PNG, which store images as grids of colored pixels, SVG describes graphics using mathematical primitives — lines, curves, rectangles, circles, text, and paths defined by coordinate geometry. This means SVG images can be scaled to any size without losing quality, rendering crisply on everything from tiny mobile screens to massive billboard displays.\n\nBecause SVG files are plain-text XML, they can be created and edited in any text editor, manipulated with CSS and JavaScript, embedded directly in HTML documents, and indexed by search engines. Elements within an SVG can be individually styled, animated, and made interactive — a circle can change color on hover, a chart can animate its bars on load, and a map can respond to click events. This programmability makes SVG the foundation of data visualization libraries like D3.js, charting frameworks, interactive infographics, and icon systems.\n\nSVG integrates naturally with the web platform. It supports CSS styling (including external stylesheets), CSS and SMIL animations, filter effects (blur, drop shadow, color matrix), clipping paths, masks, gradients, and patterns. Text within SVG remains selectable and searchable, which is an accessibility and SEO advantage over rasterized text in images.",
    history:
      "SVG development began in 1998 when the W3C solicited proposals for a vector graphics format for the web. Competing submissions from Microsoft (VML), Macromedia and Adobe (PGML), and others were synthesized into a unified specification. SVG 1.0 became a W3C Recommendation on September 4, 2001. SVG 1.1, published in 2003 and revised in 2011, modularized the specification and became the version most widely implemented in browsers.\n\nBrowser support was initially limited — Internet Explorer required a plugin, and mobile support was nonexistent. The turning point came around 2010-2012 as Chrome, Firefox, Safari, and later IE9 all added native SVG support. SVG 2.0, an ongoing W3C specification, aims to align SVG more closely with HTML5, CSS, and the DOM API, removing deprecated features and adding new capabilities like mesh gradients and hatching patterns. Today, SVG is universally supported across all modern browsers and is a standard part of every front-end developer's toolkit.",
    technicalDetails:
      "An SVG document is an XML file with the root element <svg> specifying a viewport width, height, and optionally a viewBox for coordinate system mapping. Drawing elements include <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>, <path>, <text>, and <image> (for embedding raster images). The <path> element is the most powerful, using a compact syntax of move (M), line (L), cubic Bezier (C), quadratic Bezier (Q), arc (A), and close (Z) commands to define arbitrary shapes.\n\nSVG supports a compositing model with opacity, blend modes, and the <filter> element for raster-based effects like Gaussian blur, displacement mapping, and convolution. Reusable components are defined with <defs> and instantiated with <use>, enabling efficient icon sprite systems. The coordinate system uses floating-point precision, and transforms (translate, rotate, scale, skew) can be applied to any element or group. When served as a web asset, SVG files benefit from gzip/brotli compression, often reducing file size by 60-80% because XML compresses extremely well.",
    prosAndCons: {
      pros: [
        "Infinitely scalable without quality loss — perfect for responsive web design",
        "Text-based XML format is editable, scriptable, and version-control friendly",
        "CSS styling and JavaScript interactivity built into the web platform",
        "Excellent compression when gzipped due to repetitive XML text structure",
        "Accessible — text is selectable, searchable, and readable by screen readers",
      ],
      cons: [
        "Not suitable for photographs or complex photographic imagery",
        "Complex SVGs with thousands of elements can cause rendering performance issues",
        "Browser rendering inconsistencies exist for advanced features like filters and text",
        "Security considerations when accepting SVG uploads (can contain scripts)",
        "Learning curve for hand-authoring path data and understanding the coordinate system",
      ],
    },
    useCases: [
      "Icon systems and design systems that scale across resolutions and display densities",
      "Interactive data visualizations and charts built with D3.js or similar libraries",
      "Logos and brand marks that must render sharply at any size from favicon to billboard",
      "Animated illustrations and micro-interactions on marketing websites",
      "Maps and floor plans with interactive hover and click behavior",
      "Technical diagrams and flowcharts that need to be resolution-independent",
    ],
    relatedFormats: ["png", "eps", "pdf", "webp"],
    relatedTools: [
      { app: "image", slug: "convert-to-svg" },
      { app: "image", slug: "convert-to-png" },
      { app: "image", slug: "resize" },
    ],
  },
  {
    slug: "gif",
    name: "GIF (Graphics Interchange Format)",
    extension: ".gif",
    mimeType: "image/gif",
    category: "image",
    intro:
      "GIF is a bitmap image format that has endured for nearly four decades primarily because of its animation capability. While technically limited to a palette of 256 colors per frame, GIF's ability to store multiple frames in a single file with per-frame timing and disposal instructions made it the internet's first and most culturally significant animation format — powering everything from early web page decorations to the reaction GIFs that permeate modern messaging and social media.\n\nEach GIF frame is an indexed-color image using LZW (Lempel-Ziv-Welch) lossless compression. The 256-color limit means GIF excels at simple graphics with flat colors — icons, logos, pixel art, and simple diagrams — but produces poor results with photographic content, where the color quantization creates visible banding and dithering. Despite this limitation and the availability of far superior animation formats like WebP and APNG, GIF remains culturally entrenched because of its universal support: every browser, messaging app, email client, and social platform renders GIF animations without requiring any special player or codec.\n\nGIF also supports binary transparency (a single palette entry can be marked as transparent) and interlaced rendering for progressive display. However, it lacks partial transparency (alpha channel), EXIF metadata, and color management features that modern workflows require.",
    history:
      "CompuServe introduced the GIF format on June 15, 1987, as GIF87a. The format was designed to enable color images to be transmitted efficiently over the slow modem connections of the era. The updated GIF89a specification, published in 1989, added animation support via the Graphics Control Extension block, transparent color designation, and plain-text overlay capability.\n\nIn 1994, it emerged that the LZW compression algorithm used in GIF was patented by Unisys (patent filed in 1983, granted in 1985). The subsequent licensing demands provoked the development of PNG as a patent-free alternative and the broader open-source community's lasting wariness of patented formats. The LZW patents expired worldwide by 2004, making GIF once again free to implement. Despite predictions of obsolescence, GIF experienced a cultural renaissance in the 2010s as platforms like Tumblr, Twitter, and messaging apps embraced animated GIFs as a communication medium.",
    technicalDetails:
      "A GIF file begins with a header (GIF87a or GIF89a), followed by a Logical Screen Descriptor specifying canvas dimensions and a Global Color Table of up to 256 RGB entries. Each image frame can define a Local Color Table to use a different palette. Image data is LZW-compressed with a variable code size starting from the minimum code size declared in the image descriptor (typically the color table's bit depth plus one).\n\nAnimation is achieved by sequencing multiple image frames, each preceded by a Graphics Control Extension that specifies the frame delay (in hundredths of a second), disposal method (leave in place, restore to background, or restore to previous), and optional transparent color index. Frames can be positioned at arbitrary offsets within the canvas, enabling optimization techniques where only the changed rectangular region is stored for each frame. The Netscape Application Extension (a widely adopted de facto standard) enables looping behavior by specifying the number of iterations (0 for infinite looping).",
    prosAndCons: {
      pros: [
        "Universal animation support in every browser, email client, and messaging platform",
        "Simple format that is easy to create, share, and embed anywhere",
        "Lossless compression within the 256-color palette constraint",
        "Binary transparency support for simple compositing needs",
        "Massive cultural adoption as the standard format for reaction animations and memes",
      ],
      cons: [
        "Limited to 256 colors per frame, causing severe banding in photographic content",
        "No alpha-channel transparency — only binary (fully transparent or fully opaque)",
        "Animated GIF file sizes are very large compared to WebP or modern video codecs",
        "No audio support — animations are always silent",
        "Frame timing precision is limited to 10-millisecond increments",
      ],
    },
    useCases: [
      "Sharing reaction animations and memes on social media and messaging platforms",
      "Creating short animated tutorials and screen recordings for documentation",
      "Designing simple animated banners and web advertisements",
      "Storing pixel art and retro-style game sprites with their limited palettes",
      "Embedding animated diagrams in emails where video playback is unsupported",
      "Creating animated stickers for messaging applications",
    ],
    relatedFormats: ["webp", "png", "jpg", "svg"],
    relatedTools: [
      { app: "image", slug: "convert-to-gif" },
      { app: "image", slug: "compress" },
      { app: "image", slug: "convert-to-webp" },
    ],
  },
  {
    slug: "tiff",
    name: "TIFF (Tagged Image File Format)",
    extension: ".tiff",
    mimeType: "image/tiff",
    category: "image",
    intro:
      "TIFF is a flexible, adaptable raster image format widely used in professional photography, publishing, medical imaging, geospatial analysis, and archival digitization. Originally developed by Aldus Corporation (later acquired by Adobe), TIFF was designed to be the universal interchange format for scanned images, and its extensible tag-based structure has allowed it to evolve over decades without breaking backward compatibility.\n\nWhat distinguishes TIFF from consumer-oriented formats like JPEG and PNG is its support for high bit depths (8, 16, or 32 bits per channel), multiple color spaces (RGB, CMYK, CIE L*a*b*, YCbCr), multiple compression schemes within the same file, multi-page documents, and extensive metadata including ICC color profiles, EXIF data, and GeoTIFF geospatial coordinate tags. A single TIFF file can contain multiple images (known as subfiles or pages), making it suitable for multi-page scanned documents and image stacks in scientific imaging.\n\nTIFF's flexibility comes at the cost of complexity. The format's many optional features and extensions mean that not every TIFF reader supports every TIFF file, and web browsers do not natively render TIFF images. TIFF occupies a professional niche where maximum quality, metadata richness, and format longevity outweigh concerns about file size and web compatibility.",
    history:
      "Aldus Corporation (the makers of PageMaker) developed TIFF in collaboration with Microsoft and published the first specification in 1986. The goal was to create a standard format for desktop-scanner output that would be compatible with both Macintosh and PC platforms. TIFF 4.0 (1987) added support for uncompressed RGB images, TIFF 5.0 (1988) added palette-color and LZW compression, and TIFF 6.0 (1992) — the last official revision — added JPEG compression, tile-based organization, and YCbCr color space support.\n\nAfter Adobe acquired Aldus in 1994, it assumed stewardship of the specification. Although TIFF 6.0 has never been formally revised, several important supplements have been published, including the TIFF/EP (Electronic Photography) standard (ISO 12234-2), the GeoTIFF extension for geospatial metadata, and BigTIFF (2007) for files exceeding the 4 GB limit of classic TIFF. The format remains a cornerstone of professional imaging workflows and archival digitization programs worldwide.",
    technicalDetails:
      "A TIFF file starts with a two-byte byte-order indicator (II for little-endian or MM for big-endian), followed by the magic number 42 and a 4-byte offset to the first Image File Directory (IFD). Each IFD is a sorted array of tag entries, where each tag has a numeric ID, data type, count, and value (or offset to value data). Tags define image dimensions, bit depth, color space, compression method, strip or tile offsets, resolution, and metadata.\n\nTIFF supports numerous compression methods: no compression (raw pixel data), LZW, Deflate/ZIP, PackBits (a simple run-length encoding), CCITT Group 3 and Group 4 (for bilevel fax images), and JPEG (for lossy compression within tiles or strips). Image data can be organized as strips (horizontal bands) or tiles (rectangular blocks), with tiles being preferred for large images because they enable random access to any region without decompressing the entire file. BigTIFF extends the format with 8-byte offsets, supporting files up to 18 exabytes in theory.",
    prosAndCons: {
      pros: [
        "Supports very high bit depths (16-bit and 32-bit per channel) for professional quality",
        "Multiple compression options including lossless (LZW, ZIP) and uncompressed",
        "CMYK and Lab color space support for print production workflows",
        "Extensible tag architecture accommodates metadata like GeoTIFF and ICC profiles",
        "Multi-page capability suitable for scanned documents and image stacks",
      ],
      cons: [
        "No native web browser support — cannot be used directly on websites",
        "File sizes are very large, especially for uncompressed high-resolution images",
        "Format complexity means not all readers support all TIFF variations",
        "Classic TIFF has a 4 GB file size limit (BigTIFF extension required for larger files)",
        "Overkill for casual use where JPEG or PNG would suffice",
      ],
    },
    useCases: [
      "Professional photography archival where lossless quality preservation is mandatory",
      "Prepress and print production workflows requiring CMYK color separation",
      "Medical imaging (digital pathology, radiology) with high bit-depth requirements",
      "Geospatial analysis using GeoTIFF with embedded coordinate reference systems",
      "Digitizing archival documents and historical photographs at cultural institutions",
      "Scientific imaging and microscopy where precise pixel values must be preserved",
    ],
    relatedFormats: ["jpg", "png", "psd", "bmp"],
    relatedTools: [
      { app: "image", slug: "convert-to-jpg" },
      { app: "image", slug: "convert-to-png" },
      { app: "image", slug: "compress" },
    ],
  },
  {
    slug: "heic",
    name: "HEIC (High Efficiency Image Container)",
    extension: ".heic",
    mimeType: "image/heic",
    category: "image",
    intro:
      "HEIC (High Efficiency Image Container) is a modern image format based on the HEIF (High Efficiency Image File Format) standard that uses HEVC (H.265) video codec technology to compress still images. Apple adopted HEIC as the default photo format for iPhones and iPads starting with iOS 11 in 2017, making it one of the most widely captured image formats in the world even though many users are unaware they are shooting in it.\n\nThe format delivers approximately 50% file size savings compared to JPEG at equivalent visual quality. This remarkable compression efficiency is achieved by leveraging the advanced prediction, transform, and entropy-coding tools of the HEVC codec — the same technology that compresses 4K and 8K video. A single HEIC file can store a photo at full resolution with dramatically less storage consumption, which is why Apple chose it to help users conserve space on their devices.\n\nBeyond compression, HEIC supports features that JPEG cannot: 10-bit and 12-bit color depth for HDR photography, alpha-channel transparency, image sequences (Live Photos on iPhone store a burst sequence plus a key frame in a single HEIC file), depth maps for portrait-mode bokeh effects, and auxiliary images such as thumbnails and gain maps. The container can also hold multiple independent images, making it a versatile packaging format for computational photography workflows.",
    history:
      "The HEIF container format was standardized by the Moving Picture Experts Group (MPEG) as ISO/IEC 23008-12 in 2015, building on the ISO Base Media File Format (ISOBMFF, ISO 14496-12) used by MP4 video files. HEIF itself is codec-agnostic — it can wrap images compressed with HEVC, AV1 (producing AVIF files), or other codecs. When HEVC is the compression codec, the resulting files are typically given the .heic extension.\n\nApple's adoption of HEIC in iOS 11 (September 2017) was the catalyst for mainstream awareness. By making it the default capture format for hundreds of millions of iPhones, Apple instantly created a massive library of HEIC images worldwide. Microsoft added HEIF/HEIC support to Windows 10 via a store extension, Google added Android support in Android 10, and Samsung phones began shooting HEIC optionally. However, web browser support remains limited — as of 2024, Safari supports HEIC natively, but Chrome and Firefox do not, largely due to HEVC patent licensing complexities.",
    technicalDetails:
      "HEIC files use the ISO Base Media File Format structure, consisting of typed boxes (atoms) that contain metadata, image items, and their properties. The primary image item is HEVC-encoded using intra-frame prediction (I-frame only, no inter-frame dependencies). HEVC divides the image into Coding Tree Units (CTUs) of up to 64x64 pixels, applies angular intra prediction from 35 directional modes, transforms residuals using integer DCT and DST, quantizes coefficients, and entropy-codes them with Context-Adaptive Binary Arithmetic Coding (CABAC).\n\nThe ISOBMFF container supports storing multiple image items with relationships between them: a primary image, a thumbnail, an alpha plane, a depth map, and an HDR gain map can all coexist in a single file. Image properties like rotation, cropping, color profile (ICC or CICP), and EXIF metadata are stored as item properties associated with specific image items. Live Photos are implemented as an image sequence item containing multiple HEVC-compressed frames with timing metadata, paired with an embedded audio track.",
    prosAndCons: {
      pros: [
        "Approximately 50% smaller file size than JPEG at equivalent visual quality",
        "Supports 10-bit and 12-bit color depth for HDR and wide color gamut imagery",
        "Can store multiple images, depth maps, alpha planes, and sequences in one file",
        "Native support on all Apple devices (iOS, macOS) and most Android devices",
        "Preserves Live Photos, portrait depth data, and computational photography metadata",
      ],
      cons: [
        "Limited web browser support due to HEVC patent licensing issues",
        "Many image editors and web services do not accept HEIC directly",
        "Patent royalties on HEVC codec create legal complexity for implementers",
        "Conversion to JPEG is often needed for sharing on non-Apple platforms",
        "Encoding is computationally intensive compared to JPEG",
      ],
    },
    useCases: [
      "Default photo capture format on iPhones and iPads for storage-efficient shooting",
      "Storing HDR photographs with 10-bit color depth and wide color gamut",
      "Packaging Live Photos with image sequences and audio in a single file",
      "Preserving portrait-mode depth maps for post-capture bokeh adjustment",
      "Reducing cloud storage consumption for large photo libraries on iCloud",
      "Archiving high-quality photos at half the storage cost of equivalent JPEGs",
    ],
    relatedFormats: ["jpg", "webp", "png", "tiff"],
    relatedTools: [
      { app: "image", slug: "convert-to-jpg" },
      { app: "image", slug: "convert-to-png" },
      { app: "image", slug: "compress" },
    ],
  },
  {
    slug: "bmp",
    name: "BMP (Bitmap)",
    extension: ".bmp",
    mimeType: "image/bmp",
    category: "image",
    intro:
      "BMP (Bitmap) is one of the oldest raster image formats still in use, developed by Microsoft for the Windows operating system. A BMP file stores pixel data in a straightforward, largely uncompressed format — each pixel's color value is written sequentially, row by row, making BMP conceptually the simplest of all image formats. There is no lossy compression, no complex encoding, and no frequency-domain transformation; what you put in is exactly what comes out.\n\nThis simplicity has both advantages and severe limitations. On the positive side, BMP files are trivial to read and write programmatically, requiring only a fixed-size header followed by raw pixel data. They load quickly because there is minimal decoding overhead, and they preserve every pixel value without any compression artifacts. On the negative side, BMP files are enormous compared to compressed alternatives — a 24-bit 1920x1080 image produces a BMP of approximately 6 MB, while the same image as a JPEG might be 200 KB.\n\nDespite being largely obsolete for everyday use, BMP persists in specific niches: legacy Windows applications, embedded systems with simple display controllers, retro computing enthusiasts, and educational contexts where its straightforward structure makes it an ideal format for teaching image processing fundamentals.",
    history:
      "Microsoft introduced the BMP format with Windows 1.0 in 1985 as the native image format for the Windows graphics subsystem (GDI). The original format, known as the device-dependent bitmap (DDB), was tightly coupled to the display hardware. Windows 3.0 (1990) introduced the device-independent bitmap (DIB) with the BITMAPINFOHEADER structure, which specified color depth and resolution independently of the display device.\n\nSubsequent Windows versions added header variants: BITMAPV4HEADER (Windows 95/NT 4.0) introduced ICC color profile support and alpha channel, while BITMAPV5HEADER (Windows 98/2000) added advanced color management. OS/2 defined its own BMP variant with slightly different header structures. While BMP was once the standard format for Windows wallpapers and clipart, it was gradually displaced by JPEG, PNG, and later WebP for all but the most specialized applications.",
    technicalDetails:
      "A BMP file consists of a 14-byte file header (BITMAPFILEHEADER with the magic bytes BM, file size, and pixel data offset) followed by a variable-size DIB header (most commonly BITMAPINFOHEADER at 40 bytes) specifying width, height, color depth, compression method, and color table. Color depths of 1, 4, 8, 16, 24, and 32 bits per pixel are supported. For depths of 8 bits or fewer, a color palette (color table) maps index values to RGB triples.\n\nPixel data is stored bottom-up by default (the first row in the file is the bottom row of the image), though top-down storage is possible by specifying a negative height value. Each row is padded to a multiple of 4 bytes. Optional compression methods include RLE8 and RLE4 (run-length encoding for 8-bit and 4-bit images) and BI_BITFIELDS (bit masks for 16-bit and 32-bit pixels specifying which bits represent R, G, B, and A channels). BITMAPV5HEADER adds support for embedded or linked ICC color profiles and predefined sRGB/calibrated-RGB color spaces.",
    prosAndCons: {
      pros: [
        "Extremely simple structure that is trivial to read and write programmatically",
        "No compression artifacts — perfect pixel-level fidelity guaranteed",
        "Fast loading due to minimal decoding overhead",
        "Native support across all Windows applications and graphics APIs",
        "Educational value as the simplest format for learning image processing",
      ],
      cons: [
        "Enormous file sizes — no practical compression for real-world images",
        "No transparency support in the most common 24-bit format",
        "Not supported for web display in any practical workflow",
        "No metadata support for EXIF, color management (in older headers), or annotations",
        "Obsolete for nearly all modern use cases where PNG or JPEG are superior",
      ],
    },
    useCases: [
      "Teaching image processing fundamentals in computer science courses",
      "Legacy Windows applications that require the native bitmap format",
      "Embedded systems with simple display controllers that read raw pixel data",
      "Quick, lossless intermediate storage during batch image processing pipelines",
      "Retro computing and pixel art communities preserving historical aesthetics",
    ],
    relatedFormats: ["png", "tiff", "jpg", "gif"],
    relatedTools: [
      { app: "image", slug: "convert-to-bmp" },
      { app: "image", slug: "convert-to-png" },
      { app: "image", slug: "convert-to-jpg" },
    ],
  },
  {
    slug: "ico",
    name: "ICO (Icon)",
    extension: ".ico",
    mimeType: "image/x-icon",
    category: "image",
    intro:
      "ICO is the icon file format used by Microsoft Windows to store small images that represent applications, files, folders, and shortcuts in the operating system's graphical user interface. A distinctive feature of the ICO format is its ability to contain multiple image variants at different sizes and color depths within a single file, allowing the operating system to select the most appropriate version based on the display context — a small 16x16 icon for a menu, a medium 32x32 for the desktop, and a large 256x256 for the modern file explorer's thumbnail view.\n\nBeyond the Windows desktop, ICO achieved a second life on the web as the format for favicons — the small icons displayed in browser tabs, bookmarks, and history entries. When Tim Berners-Lee and the early browser developers needed a mechanism for websites to provide a custom icon, the convention emerged of placing a favicon.ico file at the root of the web server. This convention persists today, although modern browsers also accept PNG and SVG favicons via the <link rel=\"icon\"> HTML tag.\n\nEach image within an ICO file can be stored as either a BMP (without the file header) or a PNG-compressed image. The PNG option, supported since Windows Vista, is generally used for the 256x256 size to keep the file compact, while smaller sizes often remain in BMP format for maximum compatibility with legacy software and operating system components.",
    history:
      "The ICO format dates back to Windows 1.0 in 1985, where it was used to represent applications and files in the graphical shell. The original format supported only small images (32x32 pixels or less) at low color depths (monochrome or 16 colors). As display technology advanced, Microsoft expanded the format to support 256 colors (Windows 95), 24-bit true color (Windows XP), 32-bit RGBA with full alpha-channel transparency (Windows XP), and PNG-compressed 256x256 images (Windows Vista).\n\nThe favicon convention was introduced by Internet Explorer 5 in 1999, which automatically requested /favicon.ico from any visited website. Other browsers adopted the convention, and the HTML 4.01 specification formalized the <link rel=\"icon\"> element for declaring icon resources. Today, while web best practices recommend providing multiple icon formats and sizes (including Apple Touch Icons and web app manifest icons), the favicon.ico file remains a universal fallback that every browser supports.",
    technicalDetails:
      "An ICO file begins with a 6-byte header: two reserved zero bytes, a 2-byte type field (1 for icons, 2 for cursors), and a 2-byte count of images in the file. Following the header is a directory of 16-byte entries, each specifying the image's width, height (0 means 256), color count (0 for more than 255 colors), color plane count, bits per pixel, data size, and offset within the file.\n\nEach image entry contains either a complete BMP structure (minus the 14-byte BITMAPFILEHEADER) or a PNG file. BMP-format icon images include both an XOR mask (the color image) and an AND mask (a 1-bit-per-pixel transparency mask) for legacy compatibility. Modern 32-bit BMP entries use the alpha channel in the BGRA pixel data instead of the AND mask. Common sizes included in a typical ICO file are 16x16, 24x24, 32x32, 48x48, 64x64, and 256x256 pixels. The closely related CUR (cursor) format uses the same structure but interprets two header fields as hotspot coordinates instead of color planes.",
    prosAndCons: {
      pros: [
        "Multi-resolution: stores multiple sizes in a single file for automatic selection",
        "Alpha-channel transparency support for smooth icon edges on any background",
        "Universal browser support as the favicon format for website identity",
        "Native Windows integration for application, file type, and shortcut icons",
        "Backward compatibility spanning nearly four decades of Windows versions",
      ],
      cons: [
        "Maximum image size of 256x256 is insufficient for modern high-DPI displays",
        "File format is Windows-centric with limited relevance on macOS and Linux",
        "Multi-image files can become large when including many size variants",
        "No animation support (animated cursors use the separate ANI format)",
        "Being gradually superseded by SVG and PNG favicons in web development",
      ],
    },
    useCases: [
      "Providing application icons for Windows desktop software and installers",
      "Serving the favicon.ico file for website tab icons and bookmarks",
      "Creating file-type icons for Windows Shell associations",
      "Designing toolbar and menu icons for Windows-native applications",
      "Building icon packs and themes for Windows desktop customization",
    ],
    relatedFormats: ["png", "svg", "bmp", "gif"],
    relatedTools: [
      { app: "image", slug: "convert-to-ico" },
      { app: "image", slug: "resize" },
      { app: "image", slug: "convert-to-png" },
    ],
  },
  {
    slug: "psd",
    name: "PSD (Photoshop Document)",
    extension: ".psd",
    mimeType: "image/vnd.adobe.photoshop",
    category: "image",
    intro:
      "PSD is the native file format of Adobe Photoshop, the world's most widely used professional image editing software. Unlike flat image formats such as JPEG or PNG that store a single composited image, PSD preserves the entire editing state: individual layers with their blending modes and opacity, vector paths, text layers with editable fonts, adjustment layers, layer masks, smart objects, channel data, and a complete edit history. This non-destructive workflow capability is what makes PSD indispensable in professional graphic design, photography retouching, and digital art creation.\n\nA PSD file is essentially a snapshot of a Photoshop project at a given moment, containing everything needed to resume editing. Text layers retain their font, size, and formatting so they can be modified later. Adjustment layers (curves, levels, hue/saturation) apply their effects non-destructively and can be tweaked or removed at any time. Smart objects encapsulate embedded files (including other PSDs, vector artwork, or Camera Raw files) that can be transformed without permanently rasterizing them.\n\nThe PSD format supports color depths from 1 bit to 32 bits per channel, color modes including RGB, CMYK, Lab, Grayscale, Duotone, Indexed Color, and Multichannel, and image dimensions up to 300,000 x 300,000 pixels (though the classic PSD format limits files to 2 GB — the PSB variant handles larger files). ICC color profiles can be embedded for accurate cross-device color reproduction.",
    history:
      "Adobe Photoshop was created by Thomas and John Knoll and first released in February 1990 for Macintosh. The PSD format has evolved alongside Photoshop through more than three decades of releases, with each version potentially adding new layer types, blending modes, or metadata structures. Despite this evolution, Adobe has maintained remarkable backward compatibility — a PSD created in a recent version of Photoshop will still contain a flattened composite image that older versions can display.\n\nAdobe published a partial specification for PSD in their developer documentation (Adobe Photoshop File Formats Specification), enabling third-party software to read and write PSD files. Libraries like libpsd, PSD.js, and the Python psd-tools package parse the format, and competing editors including GIMP, Affinity Photo, Krita, and Photopea all support PSD import to varying degrees. The PSB (Photoshop Big) variant, introduced in Photoshop CS (2003), extended the format to support files larger than 2 GB and image dimensions beyond 30,000 pixels.",
    technicalDetails:
      "A PSD file is organized into five major sections: the File Header (signature, version, channels, dimensions, depth, color mode), Color Mode Data (relevant for indexed and duotone modes), Image Resources (resolution, print flags, ICC profile, EXIF data, slices, URL, and numerous other metadata blocks identified by unique IDs), Layer and Mask Information (the layer tree structure, pixel data, masks, and blending), and the Image Data (the flattened composite image).\n\nLayer pixel data is stored with RLE compression (PackBits) or raw, organized by channel. Each layer has a bounding rectangle within the canvas, a blending mode code, opacity byte, clipping flag, and additional data blocks for vector masks, text engine data, layer effects (drop shadow, bevel, stroke), and linked smart objects. The composite image at the end of the file enables quick previewing without parsing the full layer structure. Channels are stored separately — an RGB image with a mask has four channels (R, G, B, mask), and a CMYK image has at least four ink channels plus any alpha or spot-color channels.",
    prosAndCons: {
      pros: [
        "Preserves the complete non-destructive editing state with all layers and effects",
        "Supports every Photoshop feature: layer types, masks, smart objects, and adjustments",
        "High bit-depth and CMYK support for professional print production",
        "Partially documented format with broad third-party software support",
        "Embedded flattened composite allows preview without full layer parsing",
      ],
      cons: [
        "Large file sizes due to storing every layer's pixel data independently",
        "Classic PSD format has a 2 GB file size limit (PSB needed for larger files)",
        "Full feature fidelity requires Adobe Photoshop — third-party support is incomplete",
        "Not suitable for web display or distribution to end users",
        "Proprietary format controlled by Adobe with no independent standards body",
      ],
    },
    useCases: [
      "Professional photo retouching and compositing with non-destructive editing",
      "Designing web and mobile UI mockups with layered components and text",
      "Creating digital illustrations and concept art with complex layer structures",
      "Preparing print-ready CMYK artwork for brochures, packaging, and magazines",
      "Maintaining editable source files for brand assets, templates, and design systems",
      "Collaborating between designers who need to exchange editable artwork files",
    ],
    relatedFormats: ["png", "jpg", "tiff", "eps"],
    relatedTools: [
      { app: "image", slug: "convert-to-png" },
      { app: "image", slug: "convert-to-jpg" },
      { app: "image", slug: "resize" },
    ],
  },
  {
    slug: "eps",
    name: "EPS (Encapsulated PostScript)",
    extension: ".eps",
    mimeType: "application/postscript",
    category: "image",
    intro:
      "EPS (Encapsulated PostScript) is a graphics file format based on the PostScript page description language, designed to encapsulate a single page of vector and/or raster artwork in a self-contained file that can be embedded within other documents. For decades, EPS was the standard interchange format in professional graphic design and prepress workflows, enabling logos, illustrations, and page elements to be placed in layout applications like Adobe InDesign, QuarkXPress, and Aldus PageMaker with full resolution independence.\n\nAn EPS file contains PostScript code that describes the image using mathematical vector operations — paths, curves, fills, strokes, clipping, and transformations — along with optional embedded raster images. Because the PostScript interpreter renders the image at output time, vector content in EPS files is truly resolution-independent, printing at whatever resolution the output device supports. A logo designed once in EPS can be reproduced on a business card, a poster, and a billboard without any quality loss.\n\nEPS files often include a low-resolution preview image (in TIFF or WMF format) embedded as a header, allowing layout applications to display a placeholder without needing a full PostScript interpreter. The actual high-quality rendering happens at print time when the PostScript is interpreted by the RIP (Raster Image Processor). While EPS has been largely superseded by PDF and native vector formats like AI and SVG for modern workflows, it remains relevant in legacy publishing systems and as an archival format for vector artwork.",
    history:
      "PostScript was developed by Adobe Systems co-founders John Warnock and Charles Geschke and released in 1984 as a device-independent page description language for laser printers. The Encapsulated PostScript format was introduced in 1987 to allow PostScript graphics to be imported into other documents. The specification defined a conformance level (a subset of PostScript that could be encapsulated without side effects like printer resets or page ejects) and the convention of including a bounding box comment and optional preview image.\n\nEPS became the backbone of the desktop publishing revolution in the late 1980s and 1990s. Stock photography agencies, font foundries, and clipart libraries distributed their products in EPS format. Adobe Illustrator used EPS as its native save format until AI (Adobe Illustrator) files diverged into a PDF-based format in the 2000s. The rise of PDF (which is itself derived from PostScript) gradually displaced EPS, and Adobe officially deprecated EPS support in InDesign's Export menu, though import remains fully supported.",
    technicalDetails:
      "An EPS file is a text file (or a binary file with an embedded text section) beginning with the %!PS-Adobe header and conforming to the Document Structuring Conventions (DSC). Required DSC comments include %%BoundingBox (the page coordinates of the artwork), %%Creator, and %%Title. The body contains PostScript operators for drawing paths (moveto, lineto, curveto), applying transformations (translate, rotate, scale), setting colors (setrgbcolor, setcmykcolor), and rendering text with embedded or referenced fonts.\n\nRaster images within EPS are typically encoded as hexadecimal or ASCII85 strings using the PostScript image operator, specifying width, height, bits per component, and a data source. The optional preview image is stored as a TIFF or WMF binary block at the beginning of the file, preceded by a 30-byte binary header indicating the positions and sizes of the PostScript and preview sections. Color management is handled through DSC comments and PostScript color space operators; ICC profiles can be embedded using the setcolorspace operator with an ICCBased color space.",
    prosAndCons: {
      pros: [
        "True resolution independence for vector artwork — prints perfectly at any size",
        "Encapsulated and self-contained, suitable for embedding in layout documents",
        "Supports both vector and raster content within a single file",
        "Long-established industry standard with a massive existing archive of artwork",
        "PostScript code is human-readable text that can be inspected and debugged",
      ],
      cons: [
        "Effectively deprecated — modern workflows prefer PDF, AI, or SVG",
        "Full PostScript interpretation required for rendering, not just a simple decoder",
        "Security vulnerabilities in PostScript interpreters can be exploited via malicious files",
        "No support for transparency (a limitation that PDF resolved with version 1.4)",
        "Large file sizes when raster images are hex-encoded in the PostScript stream",
      ],
    },
    useCases: [
      "Exchanging vector logos and illustrations in legacy publishing workflows",
      "Providing resolution-independent artwork to print service providers",
      "Archiving vector artwork from the desktop publishing era of the 1980s-2000s",
      "Importing legacy clipart and stock illustrations into modern layout applications",
      "Generating PostScript-based output for specialized industrial printing systems",
    ],
    relatedFormats: ["svg", "pdf", "psd", "png"],
    relatedTools: [
      { app: "image", slug: "convert-to-png" },
      { app: "image", slug: "convert-to-jpg" },
      { app: "image", slug: "convert-to-svg" },
    ],
  },

  // ─────────────────────────────────────────────
  // TEXT / DATA FORMATS (7)
  // ─────────────────────────────────────────────
  {
    slug: "txt",
    name: "TXT (Plain Text)",
    extension: ".txt",
    mimeType: "text/plain",
    category: "text",
    intro:
      "TXT, or plain text, is the most fundamental digital document format — a file containing nothing but a sequence of characters with no formatting, styling, or structural metadata. Every character in a TXT file maps directly to a code point in the file's character encoding (typically UTF-8 in modern practice, or ASCII, Latin-1, or other legacy encodings in older files), and the file's meaning is entirely determined by the text itself. There are no bold or italic markers, no font specifications, no embedded images, no hyperlinks — just characters, spaces, and line breaks.\n\nThis radical simplicity is both the format's greatest strength and its most obvious limitation. Any computer ever made can read a plain text file. Text files created on a mainframe in the 1970s are still perfectly readable today. No special software is required, no proprietary codec needs licensing, and no version compatibility concerns arise. A text editor, a terminal, a web browser, a phone — all can display the contents immediately.\n\nPlain text is the foundation on which almost all other text-based formats are built. HTML, XML, JSON, YAML, CSV, Markdown, source code in every programming language, configuration files, shell scripts, log files, and even the PostScript and SVG formats described elsewhere in this guide are all, at their core, structured plain text with conventions layered on top.",
    history:
      "Plain text predates personal computing entirely. The ASCII (American Standard Code for Information Interchange) encoding, which defines the basic Latin alphabet, digits, punctuation, and control characters in 7-bit codes (0-127), was first published as ASA X3.4 in 1963 by the American Standards Association (now ANSI). ASCII became the foundation of text interchange between mainframes, minicomputers, and terminals throughout the 1960s and 1970s.\n\nAs computing globalized, the need for non-Latin scripts led to a proliferation of incompatible 8-bit encodings: Latin-1 (ISO 8859-1) for Western European languages, Shift_JIS for Japanese, EUC-KR for Korean, and hundreds of others. The Unicode Consortium, founded in 1991, developed the Universal Character Set to unify all scripts into a single encoding. UTF-8, designed by Ken Thompson and Rob Pike in 1993, became the dominant text encoding on the web (surpassing 98% of web pages by 2024) because it is backward-compatible with ASCII while supporting every Unicode code point.",
    technicalDetails:
      "A TXT file has no header, no footer, and no structural markers — it is simply a stream of bytes interpreted according to a character encoding. In UTF-8, ASCII characters (0-127) occupy one byte each, while characters outside the ASCII range use 2, 3, or 4 bytes per code point using a prefix-encoding scheme. The Byte Order Mark (BOM, U+FEFF) is sometimes prepended to UTF-8 files for encoding identification, though this practice is discouraged on Unix-like systems.\n\nLine endings differ by platform: Unix and macOS use a single Line Feed (LF, 0x0A), Windows uses Carriage Return followed by Line Feed (CRLF, 0x0D 0x0A), and classic Mac OS used a single Carriage Return (CR, 0x0D). Most modern text editors and parsers handle all three conventions transparently. The MIME type text/plain is used in HTTP and email; the optional charset parameter (e.g., text/plain; charset=utf-8) specifies the encoding. Without it, receivers must guess the encoding, which historically caused mojibake (garbled characters) when the guess was wrong.",
    prosAndCons: {
      pros: [
        "Universally readable by every operating system, editor, and programming language",
        "No vendor lock-in, no proprietary dependencies, no format obsolescence risk",
        "Minimal overhead — the entire file is content with no metadata bloat",
        "Perfect for version control (git diff works line by line on plain text)",
        "Foundation for all structured text formats (HTML, JSON, XML, CSV, source code)",
      ],
      cons: [
        "No formatting — no bold, italic, headings, colors, or font control",
        "Character encoding ambiguity in legacy files can cause garbled text",
        "No embedded images, tables, or any visual structure beyond whitespace",
        "Line-ending differences between platforms can cause subtle issues",
        "No metadata for author, creation date, or document properties",
      ],
    },
    useCases: [
      "Writing and distributing README files, changelogs, and documentation",
      "Storing configuration files, environment variables, and application settings",
      "Logging application events, server access, and error messages",
      "Writing source code in every programming language",
      "Exchanging data between systems that need the simplest possible format",
      "Taking quick notes and drafting content without any formatting overhead",
    ],
    relatedFormats: ["csv", "json", "markdown", "html"],
    relatedTools: [
      { app: "text", slug: "word-counter" },
      { app: "text", slug: "character-counter" },
      { app: "text", slug: "case-converter" },
      { app: "text", slug: "diff-checker" },
    ],
  },
  {
    slug: "csv",
    name: "CSV (Comma-Separated Values)",
    extension: ".csv",
    mimeType: "text/csv",
    category: "data",
    intro:
      "CSV is the simplest and most universally supported format for tabular data exchange. A CSV file represents a table as plain text: each line is a row, and values within each row are separated by commas (or sometimes semicolons, tabs, or other delimiters depending on regional conventions). The first line often serves as a header row naming the columns. This extreme simplicity means CSV files can be opened in any spreadsheet application, parsed by any programming language, imported into any database, and processed by any ETL pipeline.\n\nCSV owes its longevity to its transparency. There is no binary encoding, no compression, no schema — just text that a human can read in a terminal window. A developer can write a CSV parser in a few lines of code, and debugging data issues is as simple as opening the file in a text editor. This accessibility makes CSV the lowest-common-denominator format for data interchange between systems that may have nothing else in common.\n\nDespite its apparent simplicity, CSV has subtleties that catch the unwary. Values containing commas, newlines, or quotation marks must be enclosed in double quotes, and literal double quotes within quoted values must be escaped by doubling them. There is no standard way to represent data types (numbers, dates, and booleans are all plain text), no encoding declaration, and no way to embed metadata about the dataset. RFC 4180, the closest thing to a formal standard, defines the most common conventions but is informational rather than normative.",
    history:
      "Comma-separated data formats predate personal computing. IBM Fortran supported list-directed I/O with comma-separated values as early as 1972. The concept was natural and obvious: write values with a delimiter between them. As personal computers and spreadsheet software (VisiCalc in 1979, Lotus 1-2-3 in 1983, Excel in 1985) became widespread, CSV emerged as the standard way to import and export tabular data between applications.\n\nThe IETF published RFC 4180 (Common Format and MIME Type for Comma-Separated Values) in 2005, codifying the most widely used conventions: CRLF line endings, optional header row, double-quote escaping, and the text/csv MIME type. Despite this, CSV remains a convention rather than a strict standard, and variations abound: European systems often use semicolons as delimiters (because the comma is the decimal separator in many European locales), tab-separated values (TSV) are common in scientific contexts, and some systems use pipe characters or other delimiters.",
    technicalDetails:
      "A CSV file is plain text (typically UTF-8 or ASCII) with records delimited by line breaks and fields delimited by a separator character (most commonly a comma). Per RFC 4180: fields containing the delimiter, double quotes, or line breaks must be enclosed in double quotes; double quotes within a quoted field are escaped by doubling them; each record should have the same number of fields; and the optional header record has the same format as data records.\n\nThere is no type system — every value is a string that the consumer must parse. Dates are notoriously problematic because different producers use different formats (2024-01-15, 01/15/2024, 15-Jan-2024). Numbers may use dots or commas as decimal separators depending on locale. Empty fields are represented by consecutive delimiters or empty quoted strings. Most parsers handle common variations gracefully, but edge cases around encoding, newlines within quoted fields, and trailing delimiters continue to cause interoperability issues.",
    prosAndCons: {
      pros: [
        "Universal support — every spreadsheet, database, and programming language handles CSV",
        "Human-readable plain text that can be inspected and edited in any text editor",
        "Minimal overhead — no metadata, headers, or encoding beyond the raw data",
        "Trivial to generate programmatically with simple string concatenation",
        "Extremely compact for simple tabular data compared to XML or JSON alternatives",
      ],
      cons: [
        "No data type information — everything is a string that consumers must interpret",
        "No standard encoding declaration, leading to character encoding issues",
        "Quoting and escaping edge cases cause frequent parsing failures",
        "Cannot represent hierarchical or nested data structures",
        "No way to include metadata, schemas, or documentation within the file",
      ],
    },
    useCases: [
      "Exporting and importing data between spreadsheet applications and databases",
      "Providing bulk data downloads from government open-data portals",
      "Feeding data into ETL pipelines for transformation and warehouse loading",
      "Exchanging financial transaction records between banking and accounting systems",
      "Sharing scientific datasets and experimental results in academic research",
      "Migrating contact lists, product catalogs, and CRM records between platforms",
    ],
    relatedFormats: ["xlsx", "json", "txt", "xml"],
    relatedTools: [
      { app: "converter", slug: "csv-to-json" },
      { app: "text", slug: "json-formatter" },
      { app: "text", slug: "diff-checker" },
    ],
  },
  {
    slug: "json",
    name: "JSON (JavaScript Object Notation)",
    extension: ".json",
    mimeType: "application/json",
    category: "data",
    intro:
      "JSON (JavaScript Object Notation) is a lightweight data interchange format that has become the dominant standard for transmitting structured data between web servers and clients, between microservices, and between applications and their configuration files. Its appeal lies in a near-perfect combination of human readability and machine parseability: a JSON document looks natural to a programmer's eye while being trivial for any language to parse into native data structures.\n\nJSON supports six value types: strings (Unicode text in double quotes), numbers (integer or floating-point), booleans (true/false), null, objects (unordered collections of key-value pairs wrapped in curly braces), and arrays (ordered sequences of values wrapped in square brackets). These six types are sufficient to represent the vast majority of real-world data structures, from simple configuration settings to deeply nested API responses.\n\nJSON's syntax is a strict subset of JavaScript object literal notation, which is why it integrates so naturally with web development. However, JSON is language-independent — every major programming language provides a JSON library, and many include one in their standard library. The format's ubiquity in web APIs has made it the default choice for REST services, GraphQL responses, configuration files (package.json, tsconfig.json), document databases (MongoDB, CouchDB, Elasticsearch), and real-time messaging protocols (WebSocket payloads, MQTT messages).",
    history:
      "Douglas Crockford is credited with discovering and popularizing JSON in the early 2000s, though he has described it as a format that was already in use by JavaScript developers before he gave it a name and a specification. The json.org website, which Crockford launched in 2002 with a concise grammar expressed in railroad diagrams, became the de facto reference. IETF standardized JSON as RFC 4627 in July 2006, and an updated specification, RFC 8259, was published in December 2017 along with the ECMA-404 standard.\n\nJSON rose to prominence as an alternative to XML for web service communication. While XML-based SOAP was dominant in enterprise systems of the early 2000s, the simpler JSON format became the preferred choice for the emerging REST and AJAX paradigms championed by companies like Google, Yahoo, and Twitter. By the early 2010s, JSON had decisively won the API format wars, and today it is virtually the only format used for public web APIs.",
    technicalDetails:
      "A JSON document is a UTF-8 encoded text file (though UTF-16 and UTF-32 are also technically valid). The grammar is minimal: whitespace (spaces, tabs, newlines) is insignificant except within strings. Strings must use double quotes (not single quotes) and support escape sequences including \\n (newline), \\t (tab), \\\\ (backslash), \\\" (double quote), and \\uXXXX (Unicode code point). Numbers follow the format of decimal floating-point literals without leading zeros, supporting optional negative sign, decimal point, and exponent (e.g., -3.14e10).\n\nJSON has no date type — dates are typically serialized as ISO 8601 strings (2024-01-15T10:30:00Z). There is no comment syntax in standard JSON (a deliberate design decision by Crockford to prevent abuse), though variants like JSON5 and JSONC add comment support. JSON Schema (a separate specification) provides a vocabulary for describing the expected structure and constraints of JSON documents, enabling validation of API payloads, configuration files, and data imports. The maximum nesting depth and number precision are implementation-dependent; in JavaScript, numbers exceeding 2^53 lose precision because they are stored as IEEE 754 doubles.",
    prosAndCons: {
      pros: [
        "Human-readable syntax that is intuitive for developers and non-developers alike",
        "Native parsing support in virtually every programming language",
        "Lightweight and minimal — less syntactic overhead than XML",
        "De facto standard for REST APIs, configuration files, and document databases",
        "JSON Schema provides optional validation without complicating the base format",
      ],
      cons: [
        "No comment support in standard JSON, complicating annotated configuration files",
        "No native date/time type — dates must be encoded as strings by convention",
        "Large numeric precision loss in JavaScript-based parsers (integers beyond 2^53)",
        "Verbose for very large datasets compared to binary formats like Protocol Buffers",
        "No streaming parser standard — entire document typically loaded into memory",
      ],
    },
    useCases: [
      "Transmitting data between web servers and browser clients in REST and GraphQL APIs",
      "Storing application configuration (package.json, tsconfig.json, eslint.json)",
      "Persisting documents in NoSQL databases like MongoDB, CouchDB, and Elasticsearch",
      "Exchanging messages in real-time protocols (WebSocket, MQTT, SSE payloads)",
      "Defining infrastructure as code in tools like Terraform, CloudFormation, and ARM templates",
      "Serializing and deserializing application state for caching, logging, and debugging",
    ],
    relatedFormats: ["yaml", "xml", "csv", "txt"],
    relatedTools: [
      { app: "text", slug: "json-formatter" },
      { app: "converter", slug: "json-to-yaml" },
      { app: "converter", slug: "json-to-xml" },
      { app: "converter", slug: "csv-to-json" },
    ],
  },
  {
    slug: "yaml",
    name: "YAML (YAML Ain't Markup Language)",
    extension: ".yaml",
    mimeType: "application/x-yaml",
    category: "data",
    intro:
      "YAML is a human-friendly data serialization language designed to be more readable than JSON and less verbose than XML for configuration files, data exchange, and structured document authoring. Its design philosophy prioritizes readability: YAML uses indentation to denote structure (similar to Python), supports comments (beginning with #), and allows complex data types like multi-line strings, anchors for deduplication, and custom tags for type annotation — all without requiring brackets, braces, or quotation marks for most values.\n\nYAML is a strict superset of JSON, meaning that any valid JSON document is also a valid YAML document. However, YAML's native syntax goes far beyond JSON's capabilities: block-style mappings and sequences use indentation instead of braces and brackets, scalars can be unquoted or use literal block (|) and folded block (>) indicators for multi-line strings, and anchors (&) and aliases (*) enable DRY (Don't Repeat Yourself) references within a document. These features make YAML the preferred format for configuration files that humans read and edit frequently.\n\nYAML has become the dominant configuration language in the DevOps and cloud-native ecosystem. Docker Compose, Kubernetes, Ansible, GitHub Actions, GitLab CI, CircleCI, Azure Pipelines, Helm charts, and Swagger/OpenAPI specifications all use YAML as their primary configuration format. Its readability advantage over JSON is most apparent in deeply nested structures and lists, where YAML's indentation-based syntax eliminates the visual noise of punctuation.",
    history:
      "YAML was first proposed in 2001 by Clark Evans, with Ingy dot Net and Oren Ben-Kiki joining the specification effort. The original recursive acronym was 'Yet Another Markup Language,' but it was quickly changed to 'YAML Ain't Markup Language' to emphasize that the format is for data serialization, not document markup. YAML 1.0 was released in January 2004, YAML 1.1 followed in 2005, and YAML 1.2 (the current version) was published in October 2009.\n\nYAML 1.2 made a significant change by aligning its JSON compatibility — previous versions had subtle incompatibilities with JSON's string quoting and number representation. The specification also clarified the type resolution system, making it explicit that unquoted strings like 'yes', 'no', 'on', 'off' are booleans only when the schema says so, addressing a notorious source of bugs (the Norway problem, where the country code 'NO' was interpreted as a boolean false).",
    technicalDetails:
      "A YAML document begins with an optional directive line (e.g., %YAML 1.2) and a document start marker (---). Multiple documents can exist in a single file, separated by --- markers, with ... indicating document end. The data model consists of three node kinds: scalars (strings, numbers, booleans, null, timestamps), sequences (ordered lists), and mappings (unordered key-value pairs). Block style uses newlines and indentation; flow style uses JSON-like brackets and braces for compact inline notation.\n\nYAML's type system relies on tags. Core schema tags include !!str, !!int, !!float, !!bool, !!null, !!seq, and !!map. Without explicit tags, YAML parsers apply implicit type resolution: unquoted 42 becomes an integer, 3.14 a float, true a boolean, and ~ or null a null value. Anchors (&name) mark a node for reuse, and aliases (*name) reference it elsewhere, enabling data deduplication. Merge keys (<<) allow mapping inheritance. Multi-line scalars use literal style (| preserves newlines) or folded style (> converts newlines to spaces). Indentation must use spaces (tabs are forbidden) and is significant for structure.",
    prosAndCons: {
      pros: [
        "Highly readable, clean syntax with indentation-based structure and comment support",
        "JSON superset — any valid JSON is valid YAML",
        "Multi-line string support with literal and folded block indicators",
        "Anchor/alias mechanism enables DRY references and data deduplication",
        "De facto standard for DevOps tooling (Kubernetes, Docker Compose, CI/CD pipelines)",
      ],
      cons: [
        "Indentation sensitivity means invisible whitespace errors cause parsing failures",
        "Implicit type coercion can cause subtle bugs (the 'Norway problem' with boolean values)",
        "More complex specification than JSON, leading to parser implementation inconsistencies",
        "Security risks from arbitrary object deserialization in some language bindings",
        "Slower parsing than JSON due to the more complex grammar",
      ],
    },
    useCases: [
      "Defining Kubernetes manifests, Helm charts, and container orchestration configurations",
      "Writing CI/CD pipeline definitions for GitHub Actions, GitLab CI, and Azure Pipelines",
      "Configuring Docker Compose services and multi-container application stacks",
      "Authoring OpenAPI/Swagger API specifications with nested schema definitions",
      "Managing Ansible playbooks and infrastructure automation runbooks",
      "Storing application configuration that developers read and edit frequently",
    ],
    relatedFormats: ["json", "xml", "txt", "csv"],
    relatedTools: [
      { app: "converter", slug: "yaml-to-json" },
      { app: "converter", slug: "json-to-yaml" },
      { app: "text", slug: "json-formatter" },
    ],
  },
  {
    slug: "xml",
    name: "XML (Extensible Markup Language)",
    extension: ".xml",
    mimeType: "application/xml",
    category: "data",
    intro:
      "XML (Extensible Markup Language) is a markup language and data serialization format that provides a flexible, self-describing structure for representing hierarchical information. Unlike HTML, which has a fixed set of predefined tags for web content, XML allows users to define their own elements and attributes, making it a meta-language for creating domain-specific data formats. XHTML, SVG, MathML, SOAP, RSS, Atom, DOCX's internal files, Android layout files, and hundreds of other formats are all XML applications — formats built on XML's syntax.\n\nXML documents consist of nested elements delimited by matching open and close tags, with optional attributes on each element. This tree-structured, self-describing nature means that an XML document carries both data and a degree of metadata about that data. An element named <invoice> wrapping a <lineItem> with a <price> attribute communicates structure and semantics in a way that a bare CSV row cannot.\n\nXML's ecosystem is vast and mature. XSD (XML Schema Definition) provides strongly-typed schema validation, XSLT enables declarative transformation between XML formats, XPath allows precise navigation of the document tree, XQuery supports database-style querying, and namespaces prevent element name collisions when combining vocabularies from different domains. This rich tooling makes XML the preferred format in enterprise systems, government data exchange, and industries (healthcare, finance, aerospace) where rigorous schema validation and interoperability standards are critical.",
    history:
      "XML was developed by a W3C working group chaired by Jon Bosak and published as a W3C Recommendation on February 10, 1998. It was designed as a simplified subset of SGML (Standard Generalized Markup Language, ISO 8879:1986), which was powerful but notoriously complex. The goal was to create a format simple enough for web use yet flexible enough to replace the many incompatible data formats in use across industries.\n\nXML rapidly became the dominant data interchange format of the late 1990s and 2000s. SOAP web services, RSS feeds, configuration files, and enterprise integration buses all adopted XML. However, starting around 2006-2010, JSON began displacing XML for web APIs due to its lighter syntax, and YAML emerged as a preferred configuration format. Today, XML remains deeply entrenched in enterprise systems, government standards (HL7 for healthcare, XBRL for financial reporting, GML for geospatial data), and document formats (OOXML, ODF), but new greenfield projects overwhelmingly choose JSON or YAML.",
    technicalDetails:
      "An XML document begins with an optional XML declaration (<?xml version=\"1.0\" encoding=\"UTF-8\"?>), followed by a single root element containing the document's content tree. Elements are delimited by matching start and end tags (<element>...</element>) or self-closing tags (<element/>). Attributes are name=\"value\" pairs on start tags. XML is case-sensitive, requires all attribute values to be quoted, and mandates that every start tag has a matching end tag — rules that make it more strict than HTML.\n\nNamespaces, declared with the xmlns attribute, partition element and attribute names into URI-identified vocabularies to prevent collisions (e.g., xmlns:svg=\"http://www.w3.org/2000/svg\"). Well-formedness requires proper nesting and a single root element; validity additionally requires conformance to a schema, specified either as a DTD (Document Type Definition — the original schema language from SGML), W3C XML Schema (XSD), or RELAX NG. Character data can include entity references (&amp; for &, &lt; for <) and CDATA sections for blocks of text that should not be parsed as markup. Processing instructions (<?target data?>) provide instructions for specific applications.",
    prosAndCons: {
      pros: [
        "Self-describing structure with user-defined elements and strong schema validation",
        "Vast mature ecosystem (XSLT, XPath, XQuery, XSD, namespaces)",
        "Industry standard for healthcare (HL7/FHIR), finance (XBRL), and government data",
        "Namespace support enables combining multiple vocabularies in a single document",
        "Human-readable with well-established tooling for parsing, querying, and transformation",
      ],
      cons: [
        "Verbose syntax — significant tag overhead compared to JSON for equivalent data",
        "Parsing is slower and more memory-intensive than JSON or binary formats",
        "DTD and schema languages have steep learning curves",
        "Namespace URIs add complexity that is often unnecessary for simple use cases",
        "Largely displaced by JSON and YAML for web APIs and configuration files",
      ],
    },
    useCases: [
      "Defining enterprise integration schemas for B2B data exchange (EDI, SOAP services)",
      "Encoding healthcare records and messages in HL7 CDA and FHIR formats",
      "Submitting financial reports in XBRL for regulatory compliance",
      "Storing Android application layout and resource definitions",
      "Configuring Java enterprise applications (Spring, Maven, web.xml)",
      "Publishing and consuming RSS and Atom syndication feeds",
    ],
    relatedFormats: ["json", "yaml", "html", "csv"],
    relatedTools: [
      { app: "converter", slug: "xml-to-json" },
      { app: "converter", slug: "json-to-xml" },
      { app: "text", slug: "json-formatter" },
    ],
  },
  {
    slug: "html",
    name: "HTML (HyperText Markup Language)",
    extension: ".html",
    mimeType: "text/html",
    category: "text",
    intro:
      "HTML is the standard markup language for creating web pages and web applications. Every page you visit on the internet — from search engines to social networks, from online stores to government portals — is fundamentally an HTML document that your browser receives, parses, and renders into the visual interface you interact with. HTML provides the structural skeleton of web content: headings, paragraphs, lists, links, images, tables, forms, and semantic sections like navigation, articles, asides, and footers.\n\nHTML works in concert with two companion technologies: CSS (Cascading Style Sheets) controls the visual presentation — colors, fonts, layout, animations, and responsive behavior — while JavaScript adds interactivity and dynamic behavior. Together, these three languages form the core technology stack of the World Wide Web. HTML documents are plain text files that use angle-bracket tags to annotate content with structural and semantic meaning, creating a tree structure (the DOM — Document Object Model) that browsers, search engines, screen readers, and other tools can traverse.\n\nModern HTML5 (the current living standard) goes far beyond the text-and-links medium of the early web. It includes native audio and video playback, canvas-based 2D and WebGL 3D graphics, geolocation, drag-and-drop, local storage, service workers for offline capability, and semantic elements that improve accessibility and search engine understanding. The living standard is continuously updated by the WHATWG (Web Hypertext Application Technology Working Group), ensuring HTML evolves alongside the web.",
    history:
      "Tim Berners-Lee invented HTML in 1991 at CERN as part of his proposal for the World Wide Web. The first informal specification described just 18 elements including headings, paragraphs, lists, and the anchor tag (<a>) that made hypertext linking possible. HTML 2.0 (RFC 1866, 1995) was the first formal standard. HTML 3.2 (1997) added tables, applets, and text flow around images, while HTML 4.01 (1999) introduced CSS separation, scripting support, and accessibility features.\n\nThe W3C attempted to replace HTML with XHTML 2.0 (a stricter XML-based language), but browser vendors formed the WHATWG in 2004 to develop HTML5 as a pragmatic evolution of HTML 4. HTML5 was published as a W3C Recommendation in 2014 and included landmark additions: the <video> and <audio> elements, <canvas>, semantic elements (<article>, <section>, <nav>, <header>, <footer>), form input types (date, email, range), and numerous JavaScript APIs. In 2019, the W3C and WHATWG agreed that the WHATWG HTML Living Standard would be the single authoritative specification.",
    technicalDetails:
      "An HTML document begins with a DOCTYPE declaration (<!DOCTYPE html> for HTML5), followed by the <html> root element containing <head> (metadata, title, stylesheets, scripts) and <body> (visible content). Elements are defined by tags: <p> for paragraphs, <h1>-<h6> for headings, <a href=\"\"> for links, <img src=\"\" alt=\"\"> for images, <ul>/<ol>/<li> for lists, <table>/<tr>/<td> for tables, and <form>/<input>/<button> for interactive forms.\n\nThe browser parses HTML into a DOM tree, applies CSS styles to compute layout, paints pixels to the screen, and executes JavaScript that can modify the DOM and respond to events. HTML5's parsing algorithm is defined to be error-tolerant — browsers must handle missing tags, incorrect nesting, and other malformed markup gracefully, which is why HTML 'just works' even with imperfect code. Semantic elements convey meaning to assistive technologies: <nav> identifies navigation, <main> marks the primary content area, <article> denotes self-contained content, and ARIA attributes provide additional accessibility information where native semantics are insufficient.",
    prosAndCons: {
      pros: [
        "Universal foundation of the World Wide Web — every browser renders HTML",
        "Semantic elements improve accessibility and search engine understanding",
        "Continuously evolving living standard maintained by the WHATWG",
        "Error-tolerant parsing ensures pages render even with imperfect markup",
        "Rich ecosystem of native APIs (Canvas, WebGL, Geolocation, Storage, Workers)",
      ],
      cons: [
        "Requires CSS and JavaScript for anything beyond basic document presentation",
        "Inconsistent rendering of edge cases across different browser engines",
        "Complex applications require frameworks (React, Vue, Angular) to manage state",
        "Accessibility requires deliberate effort — semantic markup alone is not sufficient",
        "Source code is always visible to users, complicating intellectual property protection",
      ],
    },
    useCases: [
      "Building websites and web applications of every kind, from blogs to enterprise SaaS",
      "Creating email templates (HTML email with inline CSS for client compatibility)",
      "Developing progressive web applications (PWAs) with offline and installable capability",
      "Producing static documentation sites and knowledge bases",
      "Implementing single-page applications (SPAs) with JavaScript frameworks",
      "Authoring accessible digital content that works with screen readers and assistive devices",
    ],
    relatedFormats: ["xml", "json", "markdown", "txt"],
    relatedTools: [
      { app: "text", slug: "word-counter" },
      { app: "text", slug: "character-counter" },
      { app: "text", slug: "diff-checker" },
    ],
  },
  {
    slug: "markdown",
    name: "Markdown",
    extension: ".md",
    mimeType: "text/markdown",
    category: "text",
    intro:
      "Markdown is a lightweight markup language that uses simple, intuitive plain-text formatting syntax to create structured documents that can be converted to HTML and other formats. Created by John Gruber with contributions from Aaron Swartz, Markdown's design philosophy is that the source text should be readable as-is, without any rendering — a heading is a line prefixed with # characters, emphasis is text wrapped in asterisks, a link is text in brackets followed by a URL in parentheses, and a list is lines prefixed with dashes or numbers.\n\nThis readability-first approach has made Markdown the dominant format for writing on the modern internet. GitHub uses Markdown for README files, issues, pull requests, and wikis. Stack Overflow, Reddit, Discord, Slack, Notion, Obsidian, and countless other platforms support Markdown for user-generated content. Static site generators like Jekyll, Hugo, Gatsby, and Astro use Markdown files as their content source. Documentation platforms (MkDocs, Docusaurus, VuePress, GitBook) are built entirely around Markdown authoring.\n\nMarkdown's appeal extends beyond developers. Technical writers, bloggers, academics, and note-takers use Markdown because it lets them focus on content without the distraction of formatting toolbars or the complexity of HTML. The format is inherently future-proof — Markdown files are plain text that will remain readable on any system for decades, regardless of which applications come and go.",
    history:
      "John Gruber published the original Markdown specification and a Perl conversion script on his blog, Daring Fireball, on March 19, 2004. The original specification was deliberately informal and left many edge cases ambiguous, leading to divergent implementations as Markdown's popularity grew. Different parsers (PHP Markdown Extra, MultiMarkdown, GitHub Flavored Markdown, Pandoc, and others) each added their own extensions and resolved ambiguities differently.\n\nIn 2012, Jeff Atwood and John MacFarlane initiated the CommonMark project to create an unambiguous, comprehensive specification with a reference implementation and test suite. CommonMark 0.30 (published in 2021) defines precise parsing rules for every edge case. GitHub Flavored Markdown (GFM), specified by GitHub, extends CommonMark with tables, task lists, strikethrough, and autolinks. Despite the proliferation of variants, the core syntax (headings, emphasis, links, images, code blocks, lists, blockquotes) is consistent across all major implementations.",
    technicalDetails:
      "Markdown syntax maps directly to HTML elements. Headings use 1-6 hash characters (# = h1, ## = h2, etc.), paragraphs are separated by blank lines, emphasis uses single asterisks or underscores (*italic* or _italic_), strong emphasis uses double (**bold**), code spans use backticks (`code`), and fenced code blocks use triple backticks with an optional language identifier for syntax highlighting. Links use [text](url) and images use ![alt](url). Unordered lists use -, *, or + prefixes, and ordered lists use numbers followed by periods.\n\nCommonMark parsing operates in two phases: first, the document is divided into blocks (paragraphs, headings, code blocks, lists, blockquotes, thematic breaks) based on indentation and marker patterns; second, inline content within blocks is parsed for emphasis, links, code spans, and other inline elements using a delimiter-matching algorithm. GFM adds table syntax using pipe (|) characters and hyphens for column alignment, task list items ([x] and [ ] checkboxes), strikethrough with double tildes (~~text~~), and automatic URL detection. Extended syntax in platforms like Obsidian adds features like wikilinks ([[page]]), callouts, and embeds.",
    prosAndCons: {
      pros: [
        "Source text is readable without any rendering — formatting is intuitive plain text",
        "Ubiquitous support across development platforms, documentation tools, and note-taking apps",
        "Plain text files are future-proof, version-control friendly, and universally portable",
        "Converts to HTML, PDF, DOCX, and many other output formats via tools like Pandoc",
        "Low learning curve — basic syntax can be learned in minutes",
      ],
      cons: [
        "No standardized extended syntax — tables, footnotes, and math vary by implementation",
        "Limited formatting capabilities compared to HTML or DOCX (no columns, page layout, colors)",
        "Original specification is ambiguous, leading to rendering differences between parsers",
        "No native support for metadata (YAML front matter is a convention, not part of the spec)",
        "Complex layouts and interactive content require falling back to embedded HTML",
      ],
    },
    useCases: [
      "Writing README files, documentation, and wikis on GitHub and GitLab",
      "Authoring blog posts and content for static site generators (Hugo, Jekyll, Astro)",
      "Taking structured notes in knowledge management tools like Obsidian and Notion",
      "Writing technical documentation with MkDocs, Docusaurus, or GitBook",
      "Formatting messages in developer communication platforms (Slack, Discord, Teams)",
      "Drafting academic papers and converting them to multiple output formats with Pandoc",
    ],
    relatedFormats: ["html", "txt", "json", "yaml"],
    relatedTools: [
      { app: "text", slug: "word-counter" },
      { app: "text", slug: "character-counter" },
      { app: "text", slug: "diff-checker" },
      { app: "text", slug: "case-converter" },
    ],
  },
];

export function getFormatBySlug(slug: string): FormatGuide | undefined {
  return formats.find((f) => f.slug === slug);
}

/** Backward-compatible interface for Korean format data (old schema). */
export interface Format {
  slug: string;
  name: string;
  extension: string;
  mimeType: string;
  category: string;
  intro: string;
  history: string;
  technicalDetails: string;
  pros?: string[];
  cons?: string[];
  prosAndCons?: { pros: string[]; cons: string[] };
  useCases: string[];
  relatedFormats: string[];
  relatedTools: { app?: string; slug?: string; name?: string; href?: string }[];
}

import { formatsKo, getFormatBySlugKo } from "./format-data-ko";

export function getFormatBySlugLocale(
  slug: string,
  locale: string,
): FormatGuide | Format | undefined {
  if (locale === "ko") return getFormatBySlugKo(slug);
  return getFormatBySlug(slug);
}

export function getFormatsLocale(locale: string): (FormatGuide | Format)[] {
  if (locale === "ko") return formatsKo;
  return formats;
}
