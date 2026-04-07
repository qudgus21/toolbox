import type { ToolContentMap } from "../tool-content-types";

export const pdfContentIt: ToolContentMap = {
  merge: {
    howTo: {
      title: "Come unire i file PDF",
      steps: [
        "Click 'Select Files' or drag and drop multiple PDF files into the upload area.",
        "Arrange the files in your desired order by dragging them.",
        "Click the 'Merge' button to combine all files into one PDF.",
        "Download your merged PDF file — it's ready to use.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Combine unlimited PDF files into a single document",
        "Drag-and-drop reordering for precise control over page sequence",
        "Preview thumbnails before merging to verify content",
        "Maintains original quality — no compression or quality loss",
        "Works entirely in your browser — files never leave your device",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Sort files by name or size using the toolbar buttons for quick organization",
        "Large files may take a moment to process — a progress indicator will keep you informed",
        "The merged file preserves bookmarks, links, and form fields from the original documents",
      ],
    },
    faq: [
      { question: "Is it safe to merge PDFs online?", answer: "Yes. ToolPop processes everything in your browser using JavaScript. Your files never leave your device and are never uploaded to any server." },
      { question: "How many PDFs can I merge at once?", answer: "There is no limit. You can merge as many PDF files as your browser can handle." },
      { question: "Will merging affect the quality?", answer: "No. The original quality of each PDF is fully preserved during the merge process." },
    ],
  },
  split: {
    howTo: {
      title: "Come dividere un PDF",
      steps: [
        "Upload a PDF file by clicking 'Select File' or dragging it into the area.",
        "Choose a split method: by page range, extract specific pages, or split by fixed intervals.",
        "Configure your desired ranges or page numbers.",
        "Click 'Split' to create separate PDF files, then download them.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Split by custom page ranges (e.g., pages 1–5, 10–15)",
        "Extract individual pages into separate files",
        "Split into equal-sized chunks (every N pages)",
        "Visual page thumbnails for easy page selection",
        "Option to merge selected ranges into one output file",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use the range input to specify multiple ranges separated by commas",
        "Click on page thumbnails to quickly select or deselect pages",
        "The 'Extract All' option creates one file per page — useful for archiving",
      ],
    },
    faq: [
      { question: "Can I extract a single page from a PDF?", answer: "Yes. Simply enter the page number or use the visual thumbnails to select and extract individual pages." },
      { question: "Does splitting reduce PDF quality?", answer: "No. Splitting creates new PDFs with the same quality as the original document." },
      { question: "What happens if I specify overlapping page ranges?", answer: "Pages in overlapping ranges appear in multiple output files, allowing you to organize content flexibly." },
    ],
  },
  compress: {
    howTo: {
      title: "Come comprimere un PDF",
      steps: [
        "Upload a PDF file you want to make smaller.",
        "Choose a compression level: Maximum (smallest file), Recommended (balanced), or Minimum (best quality).",
        "Select a compression mode — image-based or rasterize.",
        "Click 'Compress' and download your smaller PDF file.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Three compression levels to balance size and quality",
        "Image optimization reduces embedded image sizes",
        "Shows before and after file sizes with percentage reduction",
        "Rasterize mode for maximum compression when text quality is less critical",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "The 'Recommended' level works best for most documents, reducing size by 40–70%",
        "For PDFs with many photos, 'Maximum' compression can dramatically reduce file size",
        "Use 'Minimum' compression when you need to preserve image sharpness for printing",
      ],
    },
    faq: [
      { question: "How much smaller will my PDF be after compression?", answer: "Typically 40-70% smaller with Recommended level, depending on the original file content and compression method." },
      { question: "Is compression done locally on my device?", answer: "Yes. All compression happens in your browser with no data sent to servers, keeping your documents completely private." },
      { question: "Can I recover quality after compressing with Maximum level?", answer: "No. Maximum compression is permanent. If you're unsure, use Recommended level first to test the quality." },
    ],
  },
  "pdf-to-jpg": {
    howTo: {
      title: "Come convertire PDF in JPG",
      steps: [
        "Upload one or more PDF files to convert.",
        "Select the output quality: High (300 DPI), Medium (150 DPI), or Low (72 DPI).",
        "Click 'Convert' to transform each PDF page into a JPG image.",
        "Download individual images or all images as a ZIP file.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert every page of a PDF into a high-quality JPG image",
        "Three quality presets to balance image clarity and file size",
        "Batch processing — convert multiple PDFs at once",
        "Download individual pages or all pages in a single ZIP archive",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use 'High' quality for printing or professional presentations",
        "Choose 'Medium' for web use — good quality with reasonable file sizes",
        "'Low' quality is perfect for thumbnails or quick previews",
      ],
    },
    faq: [
      { question: "Can I convert a single page instead of the whole PDF?", answer: "Yes. Select specific pages during conversion or use the page range option to convert only the pages you need." },
      { question: "Are my PDFs stored after conversion?", answer: "No. All conversion happens in your browser and files are deleted immediately after download." },
      { question: "What's the difference between High, Medium, and Low quality?", answer: "They differ in DPI (300, 150, and 72 respectively) and file size. High is best for printing, Medium for web, Low for previews." },
    ],
  },
  "jpg-to-pdf": {
    howTo: {
      title: "Come convertire JPG in PDF",
      steps: [
        "Upload one or more JPG images by clicking or dragging.",
        "Choose page size, orientation, and margin settings.",
        "Arrange images in your preferred order by dragging.",
        "Click 'Convert' to create your PDF, then download it.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert single or multiple JPG images into one PDF",
        "Choose from standard page sizes (A4, Letter, Legal) or fit-to-image",
        "Adjustable margins and orientation (portrait/landscape)",
        "Option to create one PDF per image or merge all into one document",
        "Drag-and-drop reordering of images",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use 'Fit to Image' page size to avoid cropping or white borders",
        "For photo albums, use 'Merge all' to create a single PDF with all images",
        "Adjust margins to zero for edge-to-edge printing",
      ],
    },
    faq: [
      { question: "Can I convert other image formats besides JPG?", answer: "Yes. This tool supports JPG, PNG, GIF, BMP, WebP, and other common image formats." },
      { question: "How do I prevent white borders when converting images?", answer: "Use the 'Fit to Image' page size option to automatically adjust the page to match your image dimensions." },
      { question: "Is my image data safe during conversion?", answer: "Absolutely. All conversions happen locally in your browser with no uploads to external servers." },
    ],
  },
  rotate: {
    howTo: {
      title: "Come ruotare le pagine PDF",
      steps: [
        "Upload a PDF file with pages that need rotation.",
        "Click the rotation buttons on individual page thumbnails to rotate them.",
        "Use 'Rotate All' to apply the same rotation to every page at once.",
        "Click 'Rotate' to apply changes and download the corrected PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Rotate individual pages clockwise or counter-clockwise by 90°",
        "Rotate all pages at once with a single click",
        "Visual page thumbnails show rotation changes in real-time",
        "Reset all rotations to start over if needed",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Scanned documents often have pages in mixed orientations — fix them all at once",
        "Use individual page rotation for documents with both portrait and landscape pages",
        "The rotation is permanent and maintained when printing or sharing the PDF",
      ],
    },
    faq: [
      { question: "Can I rotate pages by degrees other than 90°?", answer: "This tool rotates by 90° increments. For custom angle rotations, consider using the edit tool instead." },
      { question: "Will rotating affect the file size?", answer: "No. Page rotation is a metadata change that doesn't alter the content or file size." },
      { question: "Can I undo rotations after downloading?", answer: "Yes. Just reopen the PDF in this tool and rotate the pages back to their original orientation." },
    ],
  },
  "edit-pdf": {
    howTo: {
      title: "Come modificare un PDF",
      steps: [
        "Upload the PDF you want to edit.",
        "Select a tool from the toolbar: text, image, shapes, or drawing.",
        "Click on the page to place your element, then customize its properties.",
        "Navigate between pages and add elements as needed.",
        "Click 'Apply' to save all changes and download the edited PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Add text with customizable font, size, color, and alignment",
        "Insert images from your device anywhere on the page",
        "Draw freehand lines, rectangles, ellipses, and straight lines",
        "Add symbols like checkmarks, crosses, stars, and arrows",
        "Layer control — bring elements forward or send them backward",
        "Multi-page editing with easy page navigation",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use the zoom controls to work on fine details with precision",
        "Double-click a text element to edit its content after placing it",
        "Use Ctrl+Z (Cmd+Z on Mac) to undo any mistakes instantly",
        "Symbols like checkmarks are perfect for filling out form fields",
      ],
    },
    faq: [
      { question: "Can I edit the original text in the PDF?", answer: "This tool adds new elements rather than editing existing text. For editing original content, use export to Word and edit there." },
      { question: "Is my edited PDF stored or shared?", answer: "No. Everything happens in your browser. Your PDF is processed locally and never stored on any server." },
      { question: "How many elements can I add to a single page?", answer: "There's no practical limit, though adding many elements may slow down the editor. Keep your document lightweight for best performance." },
    ],
  },
  watermark: {
    howTo: {
      title: "Come aggiungere una filigrana a un PDF",
      steps: [
        "Upload the PDF you want to watermark.",
        "Choose between text or image watermark.",
        "Customize the watermark: set text/image, opacity, position, rotation, and size.",
        "Select which pages to apply the watermark to (all or custom range).",
        "Click 'Add Watermark' and download the watermarked PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Text watermarks with customizable font, size, color, and shadow",
        "Image watermarks with adjustable scale and opacity",
        "Nine position options (corners, edges, and center)",
        "Tile/mosaic pattern to cover the entire page",
        "Layer control — place watermark above or below content",
        "Custom page range selection",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Set opacity to 20–30% for a subtle watermark that doesn't obscure content",
        "Use the mosaic/tile option for full-page coverage on confidential documents",
        "A diagonal rotation (typically 45°) makes watermarks harder to remove",
        "Place watermarks 'below content' so text remains fully readable",
      ],
    },
    faq: [
      { question: "Can I add different watermarks to different pages?", answer: "Currently, the same watermark applies to selected pages. For different watermarks, process the PDF multiple times." },
      { question: "Will the watermark print when someone prints the PDF?", answer: "Yes. Watermarks are embedded in the PDF and will appear in both digital viewing and printed copies." },
      { question: "Can I remove a watermark I added?", answer: "No. Once added, watermarks are permanent. Always keep a backup of your original PDF before watermarking." },
    ],
  },
  protect: {
    howTo: {
      title: "Come proteggere un PDF con password",
      steps: [
        "Upload the PDF you want to protect.",
        "Enter a password and confirm it.",
        "Optionally, configure advanced permissions (printing, copying, editing).",
        "Click 'Protect' to encrypt the PDF with your password.",
        "Download the protected file — recipients will need the password to open it.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "AES-256 encryption for strong security",
        "Password strength indicator (weak, medium, strong)",
        "Granular permission controls for printing, copying, and modifying",
        "Separate permissions for low-resolution and high-resolution printing",
        "Form filling and accessibility permission controls",
        "All encryption happens in your browser — your password never leaves your device",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use a strong password with mixed characters for maximum security",
        "Restrict 'copying' permission to prevent text extraction from the document",
        "Allow 'low-res printing' only if you want to prevent high-quality reproductions",
        "Remember your password — there's no recovery option for encrypted files",
      ],
    },
    faq: [
      { question: "How strong is AES-256 encryption?", answer: "AES-256 is military-grade encryption and considered virtually unbreakable with current technology." },
      { question: "What if I forget the password to my protected PDF?", answer: "There is no password recovery option. The encryption is permanent, so safeguard your password carefully." },
      { question: "Can restricted users still print the document even if printing is disabled?", answer: "No. When printing is restricted, the PDF reader will prevent printing attempts regardless of user attempts." },
    ],
  },
  "delete-pages": {
    howTo: {
      title: "Come eliminare pagine da un PDF",
      steps: [
        "Upload a PDF file containing pages you want to remove.",
        "Click on page thumbnails to select the pages you want to delete.",
        "Use quick-select buttons: select all, odd pages, even pages, or deselect all.",
        "Click 'Delete' to remove selected pages and download the result.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Visual page thumbnails for easy identification",
        "Multi-select with click — choose exactly which pages to remove",
        "Quick-select options for odd pages, even pages, or all pages",
        "Real-time counter showing how many pages will be deleted vs. kept",
        "Safety check prevents you from deleting all pages accidentally",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use 'Select Even Pages' to quickly remove blank back-sides from double-sided scans",
        "Preview each thumbnail carefully before deleting to avoid removing the wrong pages",
        "If you need to keep only a few pages, consider using 'Extract Pages' instead — it's faster",
      ],
    },
    faq: [
      { question: "Can I undo page deletion if I made a mistake?", answer: "No. Page deletion is permanent. Keep a backup of your original PDF or download it again before deleting pages." },
      { question: "Is there a limit to how many pages I can delete at once?", answer: "No. You can delete as many pages as you need from any PDF size that your browser can handle." },
      { question: "Will deleting pages affect the file size significantly?", answer: "Yes. Removing pages reduces file size proportionally to the number of pages deleted." },
    ],
  },
  "extract-images": {
    howTo: {
      title: "Come estrarre immagini da un PDF",
      steps: [
        "Upload a PDF file containing images.",
        "Preview all images found in the PDF with thumbnails.",
        "Select the images you want to extract or click 'Select All'.",
        "Choose output format (JPG, PNG, or WebP) and click 'Extract'.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Extract all images from a PDF in seconds",
        "Multiple output formats: JPG, PNG, and WebP",
        "Preview thumbnails before extraction",
        "Download individual images or all as a ZIP file",
        "Preserves original image quality",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG format preserves transparency if present in the original images",
        "Use WebP format for web use — smaller file sizes with high quality",
        "Batch extract multiple PDFs to save time",
      ],
    },
    faq: [
      { question: "Will image extraction reduce the quality of images?", answer: "No. Extraction preserves the original quality of images as they appear in the PDF." },
      { question: "Can I extract images without uploading them to a server?", answer: "Yes. All image extraction happens locally in your browser with no data sent to any external server." },
      { question: "What if my PDF has low-quality images?", answer: "The extracted images will have the same quality as in the original PDF. Extraction cannot improve quality." },
    ],
  },
  "pdf-to-png": {
    howTo: {
      title: "Come convertire PDF in PNG",
      steps: [
        "Upload your PDF file to convert.",
        "Select resolution quality: High (300 DPI), Medium (150 DPI), or Low (72 DPI).",
        "Click 'Convert' to transform each PDF page into a PNG image.",
        "Download individual PNG files or all as a single ZIP archive.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert all PDF pages to lossless PNG images",
        "Three resolution options for different use cases",
        "Preserves transparency for images with alpha channels",
        "Batch conversion of multiple PDFs at once",
        "All images available as ZIP download",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG is ideal when you need lossless quality and transparency support",
        "Use 'High' resolution for printing and archival purposes",
        "Choose 'Low' resolution for web thumbnails and previews",
      ],
    },
    faq: [
      { question: "Why choose PNG over JPG for PDF conversion?", answer: "PNG is lossless and preserves perfect quality and transparency, while JPG uses compression which may reduce quality." },
      { question: "Is conversion processing done on your servers?", answer: "No. All conversion happens entirely in your browser. Your PDFs are never sent to any server." },
      { question: "Can I convert just specific pages instead of the whole PDF?", answer: "Yes. You can select specific page ranges during conversion to extract only the pages you need." },
    ],
  },
  "pdf-to-text": {
    howTo: {
      title: "Come estrarre testo da un PDF",
      steps: [
        "Upload a PDF file with text content.",
        "Choose extraction method: copy to clipboard, download as TXT, or view in editor.",
        "Optionally select specific pages or a page range.",
        "Click 'Extract' to get your plain text file.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Extract all text from any PDF document",
        "Support for multi-page extraction with page range selection",
        "Download as plain text (.txt) file",
        "Copy extracted text directly to clipboard",
        "Preserves text structure and formatting",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "For scanned PDFs without selectable text, use the OCR tool instead",
        "Text extraction works best with digital PDFs created from word processors",
        "Use page range selection to extract only the content you need",
      ],
    },
    faq: [
      { question: "Why can't I extract text from my scanned PDF?", answer: "Scanned PDFs are images without selectable text. Use the OCR tool instead to extract text from scanned documents." },
      { question: "Can I search the extracted text after downloading?", answer: "Yes. The extracted TXT file is a plain text document you can open in any text editor and search normally." },
      { question: "Is my text kept private during extraction?", answer: "Absolutely. Text extraction happens completely in your browser with no data transmitted to external servers." },
    ],
  },
  "html-to-pdf": {
    howTo: {
      title: "Come convertire HTML in PDF",
      steps: [
        "Paste your HTML code into the editor or upload an HTML file.",
        "Preview your document in the live preview area.",
        "Configure page size, margins, and orientation.",
        "Click 'Convert' to generate your PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert HTML code directly to professional PDF documents",
        "Support for CSS styling and embedded images",
        "Live preview of your PDF before conversion",
        "Customizable page sizes (A4, Letter, etc.) and margins",
        "Maintains HTML structure and formatting",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Test your HTML in the preview panel before converting",
        "External resources must be embedded as data URLs for security",
        "Use media print CSS for better PDF-specific styling",
      ],
    },
    faq: [
      { question: "Can I use CSS styling in my HTML to PDF conversion?", answer: "Yes. Standard CSS is supported. For best results, use print-specific CSS (@media print) to optimize the PDF layout." },
      { question: "What if external images don't load in my HTML?", answer: "Embed images as base64 data URLs instead of external URLs for security and reliability in PDF conversion." },
      { question: "Is my HTML code stored or shared during conversion?", answer: "No. Your HTML is processed entirely in your browser and never sent to any server." },
    ],
  },
  "png-to-pdf": {
    howTo: {
      title: "Come convertire PNG in PDF",
      steps: [
        "Upload one or more PNG images.",
        "Arrange images in your desired order by dragging.",
        "Select page size, orientation, and margins.",
        "Click 'Convert' to create your PDF and download it.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert PNG images to PDF with full transparency support",
        "Merge multiple PNGs into a single PDF",
        "Choose standard page sizes or fit-to-image sizing",
        "Adjustable margins and orientation settings",
        "Preserves image quality without compression",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNGs with transparency will be preserved in the PDF",
        "Use 'Fit to Image' to avoid unwanted cropping",
        "Set margins to zero for borderless output",
      ],
    },
    faq: [
      { question: "Does converting PNG to PDF reduce image quality?", answer: "No. PNG quality is fully preserved as PNG is already lossless and the conversion maintains all detail." },
      { question: "Will transparent areas in my PNG remain transparent in the PDF?", answer: "PDFs don't support true transparency like PNGs do. Transparent areas will typically be converted to white or your chosen background color." },
      { question: "Is the conversion done safely in my browser?", answer: "Yes. All conversions happen locally in your browser with no data transmission to external servers." },
    ],
  },
  "image-to-pdf": {
    howTo: {
      title: "Come convertire immagine in PDF",
      steps: [
        "Upload image files in any format (JPG, PNG, GIF, WebP, etc.).",
        "Drag to reorder images or use quick actions.",
        "Set page size, orientation, and margins.",
        "Click 'Convert' to create your PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert any image format to PDF",
        "Support for JPG, PNG, GIF, WebP, BMP, and more",
        "Multi-image to single PDF or one PDF per image",
        "Flexible page layout options",
        "Preserves image quality in output",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "For photo collections, merge all images into one PDF",
        "Adjust margins based on your printing requirements",
        "Batch process multiple images in one operation",
      ],
    },
    faq: [
      { question: "What image formats are supported?", answer: "JPG, PNG, GIF, WebP, BMP, TIFF, and most common image formats are supported." },
      { question: "Can I create one PDF per image instead of merging all into one?", answer: "Yes. Select the option to create separate PDFs during conversion to get individual PDF files." },
      { question: "Is my image data secure during the conversion process?", answer: "Absolutely. All image processing happens in your browser with no uploads to any external server." },
    ],
  },
  "webp-to-pdf": {
    howTo: {
      title: "Come convertire WebP in PDF",
      steps: [
        "Upload one or more WebP image files.",
        "Preview your images in the editor.",
        "Configure PDF page settings (size, margins, orientation).",
        "Click 'Convert' to generate your PDF file.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert modern WebP format images to PDF",
        "Batch processing for multiple WebP files",
        "Maintains WebP transparency and quality",
        "Customizable page layout settings",
        "Fast conversion with optimal compression",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "WebP images are smaller than JPEG — ideal for web-optimized content",
        "Transparency in WebP files is preserved in the resulting PDF",
        "Combine multiple WebP images into a single document",
      ],
    },
    faq: [
      { question: "Why choose WebP images for conversion to PDF?", answer: "WebP is a modern format that offers better compression than JPEG while maintaining quality, resulting in smaller file sizes." },
      { question: "Will transparency from WebP files be maintained in the PDF?", answer: "PDFs don't support true transparency. Transparent areas will be converted to a solid background color." },
      { question: "Can I batch convert multiple WebP files at once?", answer: "Yes. You can upload and convert multiple WebP files in one operation, either as separate PDFs or merged into one." },
    ],
  },
  "tiff-to-pdf": {
    howTo: {
      title: "Come convertire TIFF in PDF",
      steps: [
        "Upload your TIFF file (single or multi-page).",
        "Preview the content and page thumbnails.",
        "Optionally select specific pages to include.",
        "Click 'Convert' to create your PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert TIFF images to searchable PDF",
        "Handle both single and multi-page TIFF files",
        "Support for different TIFF compression formats",
        "Page selection and reordering options",
        "High-quality output suitable for archival",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "TIFF is commonly used for scanned documents — convert to PDF for better distribution",
        "Multi-page TIFFs are converted to single PDF automatically",
        "Use for archival scanning workflows to create PDF archives",
      ],
    },
    faq: [
      { question: "What's the difference between single-page and multi-page TIFF files?", answer: "Single-page TIFFs contain one image, while multi-page TIFFs contain multiple images in one file (common for scanned documents)." },
      { question: "Can I select specific pages from a multi-page TIFF to convert?", answer: "Yes. You can preview all pages and select specific ones to include in the resulting PDF." },
      { question: "Is conversion performed safely in my browser?", answer: "Yes. All TIFF to PDF conversion happens entirely in your browser with no server uploads." },
    ],
  },
  "heic-to-pdf": {
    howTo: {
      title: "Come convertire HEIC in PDF",
      steps: [
        "Upload HEIC image files from your device.",
        "Arrange multiple images in your preferred order.",
        "Select page size and margin settings.",
        "Click 'Convert' to create your PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert Apple HEIC/HEIF format images to PDF",
        "Supports multi-image conversion",
        "Preserves image quality and transparency",
        "Customizable page layout and sizing",
        "Batch process multiple HEIC files",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "HEIC is the default format for iPhone photos — easily convert to shareable PDFs",
        "Transparency and color profiles are maintained in conversion",
        "Perfect for creating photo albums from iPhone exports",
      ],
    },
    faq: [
      { question: "Why would I convert HEIC to PDF instead of JPG?", answer: "PDF format is better for document sharing and archiving. It preserves quality and is more universally compatible for distribution." },
      { question: "Will my HEIC files remain on my device during conversion?", answer: "Yes. All conversion happens in your browser with no uploads. Your HEIC files are processed locally and never sent to a server." },
      { question: "Can I convert HEIC files from any iPhone or Apple device?", answer: "Yes. Any HEIC/HEIF format files from iPhones, iPads, or other Apple devices can be converted." },
    ],
  },
  "extract-pages": {
    howTo: {
      title: "Come estrarre pagine da un PDF",
      steps: [
        "Upload your PDF file.",
        "Specify pages to extract by entering page numbers or ranges (e.g., 1,3,5-7).",
        "Preview selected pages in the thumbnail view.",
        "Click 'Extract' to create a new PDF with only those pages.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Extract specific pages from a PDF document",
        "Support for page ranges and non-consecutive page selection",
        "Visual preview of selected pages",
        "Create multiple extractions from one PDF",
        "Preserves all content and formatting",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use comma-separated numbers for non-consecutive pages: 1,3,7",
        "Use ranges with hyphen for consecutive pages: 5-10",
        "Combine both methods: 1,3-5,8,10-15",
      ],
    },
    faq: [
      { question: "What's the difference between extract pages and delete pages?", answer: "Extract pages creates a new PDF with only selected pages, while delete pages removes selected pages from the original." },
      { question: "Can I extract the same page multiple times?", answer: "Yes. If you need duplicate pages in your extracted PDF, specify the page number multiple times (e.g., 1,1,2)." },
      { question: "Is extraction performed locally on my device?", answer: "Yes. All page extraction happens in your browser with no data transmission to external servers." },
    ],
  },
  "organize-pages": {
    howTo: {
      title: "Come organizzare le pagine PDF",
      steps: [
        "Upload your PDF file.",
        "View all pages as draggable thumbnails.",
        "Drag and drop to rearrange pages in your desired order.",
        "Click 'Save' to download the reorganized PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Intuitive drag-and-drop page reordering",
        "Full-page thumbnail preview for easy identification",
        "Undo/redo for reordering changes",
        "Zoom in on thumbnails for precise page selection",
        "Multi-page bulk operations (rotate, duplicate, delete)",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use bulk operations to duplicate important pages quickly",
        "Group related pages together for better document flow",
        "Preview your changes before saving",
      ],
    },
    faq: [
      { question: "Can I undo my page reorganization changes?", answer: "Yes. The undo/redo buttons let you reverse changes. You can also reload to start fresh." },
      { question: "Is my PDF data kept private during organization?", answer: "Absolutely. All page reorganization happens in your browser. Your PDF never leaves your device." },
      { question: "Can I duplicate pages in the middle of the document?", answer: "Yes. Drag a page to any position and use the duplicate function to create copies anywhere in your PDF." },
    ],
  },
  "scan-to-pdf": {
    howTo: {
      title: "Come scansionare documenti in PDF",
      steps: [
        "Use your camera or scanner to capture document images.",
        "Upload scanned images to the tool.",
        "Automatically fix orientation and crop pages as needed.",
        "Download your scanned document as a searchable PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert camera or scanner images to professional PDF",
        "Automatic page orientation detection and correction",
        "Smart cropping to remove borders and shadows",
        "Optional OCR for searchable text",
        "Batch processing for multiple page scans",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Keep your camera steady and ensure good lighting for clearer scans",
        "Use OCR to make your scanned document searchable and extractable",
        "Batch process multiple pages in one operation to save time",
      ],
    },
    faq: [
      { question: "Will scan-to-PDF automatically straighten crooked photos?", answer: "Yes. The tool automatically detects page orientation and straightens it to create a properly aligned PDF." },
      { question: "Can I add more pages to my scanned PDF after downloading?", answer: "You can re-upload and process additional scans, then merge the PDFs using the merge tool." },
      { question: "Are my scanned images stored on your servers?", answer: "No. All scanning and processing happens locally in your browser. Your scans are never uploaded or stored anywhere." },
    ],
  },
  "page-numbers": {
    howTo: {
      title: "Come aggiungere numeri di pagina a un PDF",
      steps: [
        "Upload your PDF file.",
        "Select page number format (Arabic, Roman, letters, etc.).",
        "Choose position (top/bottom, left/center/right) and starting page.",
        "Click 'Add' to apply page numbers and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Multiple numbering formats (1,2,3 or i,ii,iii or a,b,c, etc.)",
        "Nine position options (corners, edges, center)",
        "Customizable font, size, and color",
        "Skip first page or custom starting page option",
        "Preview before applying to entire document",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use Roman numerals for front matter (introduction, table of contents)",
        "Position numbers at bottom center for standard documents",
        "Choose a light gray color for a subtle appearance",
      ],
    },
    faq: [
      { question: "Can I skip page numbering on the first page?", answer: "Yes. The tool lets you skip the first page (commonly used for title pages) or start numbering from any page you choose." },
      { question: "Can I use different numbering formats in the same PDF?", answer: "The current version applies one format to the entire document. For different formats, you'll need to process sections separately." },
      { question: "Is page numbering done safely without uploading my PDF?", answer: "Yes. All page numbering happens in your browser with no uploads to any server." },
    ],
  },
  crop: {
    howTo: {
      title: "Come ritagliare le pagine PDF",
      steps: [
        "Upload your PDF file.",
        "Use the crop tool to draw a rectangle around content you want to keep.",
        "Apply the same crop to multiple pages or customize per page.",
        "Click 'Crop' to remove margins and download the result.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Visual crop tool with drag-to-select interface",
        "Apply same crop to all pages or individual pages",
        "Crop by percentage or fixed measurements",
        "Preview crops before applying",
        "Reset crops and try again anytime",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Cropping reduces file size by removing unnecessary margins",
        "Use uniform crop for consistent document appearance",
        "Perfect for preparing documents for tablet reading",
      ],
    },
    faq: [
      { question: "How much can I reduce file size by cropping?", answer: "File size reduction depends on how much you crop. Removing large margins can reduce size by 20-50% or more." },
      { question: "Can I undo a crop after applying it?", answer: "No. Cropping is permanent. Preview your crop carefully before applying. Keep a backup of the original." },
      { question: "Does cropping happen locally on my device?", answer: "Yes. All cropping operations happen in your browser with no server uploads." },
    ],
  },
  sign: {
    howTo: {
      title: "Come firmare un PDF",
      steps: [
        "Upload your PDF document.",
        "Choose signature type: draw, upload image, or type your name.",
        "Place your signature on the document page.",
        "Click 'Sign' to apply and download the signed PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Draw signatures freehand with mouse or touchscreen",
        "Upload pre-created signature images",
        "Type signature text in various fonts",
        "Resize and reposition signature anywhere on page",
        "Multiple signatures per document",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Draw signatures on a touchscreen device for best results",
        "Upload consistent signature images for professional appearance",
        "Test signature placement in preview before finalizing",
      ],
    },
    faq: [
      { question: "Is a digital signature created here legally binding?", answer: "This tool creates a visual signature placed on the PDF. For legally binding digital signatures, use certified digital signature solutions." },
      { question: "Can I sign multiple documents at once?", answer: "You can sign one document at a time. After signing, you can process additional documents using the same signature." },
      { question: "Is my signature data saved or shared?", answer: "No. Your signature is only used to sign the PDF you're processing. It's never stored or sent to any server." },
    ],
  },
  annotate: {
    howTo: {
      title: "Come annotare un PDF",
      steps: [
        "Upload your PDF document.",
        "Select annotation tool: highlight, underline, strikethrough, or notes.",
        "Click and drag to annotate text or add sticky notes.",
        "Click 'Save' to apply annotations and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Text highlighting in multiple colors",
        "Underline and strikethrough text markup",
        "Sticky notes with custom text and colors",
        "Freehand drawing and markup tools",
        "Annotation export and summary view",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use different highlight colors to categorize different types of content",
        "Add detailed notes to important sections with sticky notes",
        "Export annotation summary for quick reference",
      ],
    },
    faq: [
      { question: "Can I remove individual annotations without removing the whole document?", answer: "Yes. You can selectively delete specific annotations while keeping others and the original PDF content intact." },
      { question: "Will annotations be visible if someone else opens the PDF?", answer: "Yes. Once annotations are saved to the PDF, they will be visible to anyone who opens the document." },
      { question: "Is my annotated PDF kept private?", answer: "Yes. All annotation happens in your browser. Your PDF and annotations are never sent to any server." },
    ],
  },
  flatten: {
    howTo: {
      title: "Come appiattire un PDF",
      steps: [
        "Upload a PDF with form fields, layers, or annotations.",
        "Choose what to flatten: forms, layers, annotations, or all.",
        "Click 'Flatten' to merge all layers.",
        "Download the flattened PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Flatten interactive form fields into static content",
        "Merge multiple PDF layers into single layer",
        "Remove or flatten all annotations",
        "Reduce file size by flattening unnecessary elements",
        "Preserve all content while removing editability",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Flatten PDFs before sharing to prevent accidental editing",
        "Flattening form fields after filling makes the PDF read-only",
        "Reduces file size significantly on PDFs with multiple layers",
      ],
    },
    faq: [
      { question: "What's the difference between flattening and converting to images?", answer: "Flattening merges layers while keeping text as text. Converting to images rasterizes everything, making text unsearchable." },
      { question: "Can I undo flattening after downloading the PDF?", answer: "No. Flattening is permanent. Once flattened, form fields and layers cannot be recovered. Keep your original." },
      { question: "Does flattening happen locally on my device?", answer: "Yes. All flattening operations are processed entirely in your browser with no server involvement." },
    ],
  },
  resize: {
    howTo: {
      title: "Come ridimensionare un PDF",
      steps: [
        "Upload your PDF document.",
        "Select target page size (A3, A4, A5, Letter, etc.).",
        "Choose scaling option: fit to page or maintain aspect ratio.",
        "Click 'Resize' to apply and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Resize to standard paper sizes (A series, Letter, Legal)",
        "Custom width and height dimensions",
        "Multiple scaling options (stretch, fit, aspect ratio)",
        "Batch processing for multiple PDFs",
        "Preview before applying changes",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Resize to A5 for mobile reading-friendly documents",
        "Use 'Fit' option to preserve aspect ratio without distortion",
        "Batch resize multiple documents for consistency",
      ],
    },
    faq: [
      { question: "Will resizing affect text quality or readability?", answer: "Using 'Fit' preserves text quality. If you use 'Stretch' on significantly different aspect ratios, text may be distorted." },
      { question: "Can I resize just some pages in a multi-page PDF?", answer: "The tool resizes all pages to the same dimensions. For selective resizing, split and resize pages separately." },
      { question: "Is resizing done safely without uploading to a server?", answer: "Yes. All resizing happens in your browser with no data uploads." },
    ],
  },
  "edit-metadata": {
    howTo: {
      title: "Come modificare i metadati PDF",
      steps: [
        "Upload your PDF file.",
        "Edit fields like Title, Author, Subject, and Keywords.",
        "Add creation and modification dates.",
        "Click 'Save' to apply metadata and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Edit standard PDF metadata fields (title, author, subject, keywords)",
        "Set creation and modification dates",
        "Remove sensitive metadata for privacy",
        "View current metadata before editing",
        "Batch metadata updates for multiple PDFs",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Add descriptive keywords to improve searchability",
        "Remove personal information before sharing documents",
        "Consistent metadata helps with document organization",
      ],
    },
    faq: [
      { question: "Why would I want to edit PDF metadata?", answer: "Metadata improves document organization, searchability, and professionalism. You may also remove personal information for privacy." },
      { question: "Can I see what metadata is currently in my PDF?", answer: "Yes. The tool displays current metadata before editing so you can see what information is stored." },
      { question: "Is metadata editing done safely without uploading to a server?", answer: "Yes. All metadata editing happens locally in your browser with no uploads to any server." },
    ],
  },
  "pages-per-sheet": {
    howTo: {
      title: "Come stampare più pagine per foglio",
      steps: [
        "Upload your PDF document.",
        "Select pages per sheet: 2, 4, 6, 8, or 9 pages.",
        "Choose page order (horizontal or vertical arrangement).",
        "Click 'Apply' to rearrange and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Arrange multiple pages on single sheet (2, 4, 6, 8, 9 per page)",
        "Multiple layout options (horizontal, vertical, book order)",
        "Automatic margin and scale adjustment",
        "Perfect for booklet printing and handouts",
        "Preview layout before processing",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use 4 pages per sheet for standard handout format",
        "Choose 2 pages per sheet with wide margins for note-taking space",
        "Book order is ideal for creating booklets",
      ],
    },
    faq: [
      { question: "Can I add empty space for notes on the printout?", answer: "Yes. Choose 2 or 4 pages per sheet to leave room for written notes around the pages." },
      { question: "Will the text be readable if I put 9 pages on one sheet?", answer: "Readability depends on original page size. 9 pages per sheet results in very small text. Start with 4 and adjust as needed." },
      { question: "Is pages-per-sheet processing done locally on my device?", answer: "Yes. All page arrangement happens in your browser with no server uploads." },
    ],
  },
  "header-footer": {
    howTo: {
      title: "Come aggiungere intestazione e piè di pagina a un PDF",
      steps: [
        "Upload your PDF document.",
        "Enter header text (left, center, right alignment).",
        "Enter footer text with page numbers, date, or custom text.",
        "Click 'Add' to apply and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Customizable header and footer text",
        "Multiple alignment options (left, center, right)",
        "Automatic page number insertion",
        "Insert date, time, or filename variables",
        "Adjust font, size, and color",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use headers for document titles on every page",
        "Include page numbers in footers: 'Page [page]/[total]'",
        "Add 'Confidential' or date information to sensitive documents",
      ],
    },
    faq: [
      { question: "Can I add headers and footers to only specific pages?", answer: "The tool applies headers/footers to all pages or custom ranges. For selective application, process sections separately." },
      { question: "What variables can I use in headers and footers?", answer: "Common variables include [page] for current page, [total] for total pages, [date], [time], and [filename]." },
      { question: "Is header/footer addition done locally on my device?", answer: "Yes. All header and footer processing happens in your browser with no data sent to any server." },
    ],
  },
  grayscale: {
    howTo: {
      title: "Come convertire PDF in scala di grigi",
      steps: [
        "Upload your color PDF file.",
        "Choose grayscale conversion type: standard or high quality.",
        "Preview the converted appearance.",
        "Click 'Convert' to apply and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert full-color PDFs to grayscale",
        "Multiple conversion algorithms for optimal results",
        "Reduces file size significantly",
        "Preserves text and image quality",
        "Batch conversion of multiple PDFs",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Grayscale conversion reduces file size by 20-40%",
        "Perfect for documents intended for black & white printing",
        "Improves printing on monochrome printers",
      ],
    },
    faq: [
      { question: "Can I undo grayscale conversion after downloading?", answer: "No. Grayscale conversion is permanent and cannot be reversed. Keep a backup of the original color PDF." },
      { question: "Will text remain readable after converting to grayscale?", answer: "Yes. Text quality is preserved. Grayscale conversion only affects color information, not text sharpness." },
      { question: "Is conversion done safely in my browser?", answer: "Yes. All grayscale conversion happens locally in your browser with no uploads to any server." },
    ],
  },
  booklet: {
    howTo: {
      title: "Come creare un opuscolo PDF",
      steps: [
        "Upload your PDF document.",
        "Select page size and binding margin.",
        "Choose binding side (left or right).",
        "Click 'Create' to generate booklet layout and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Arrange pages for booklet binding",
        "Automatic front and back cover placement",
        "Customizable binding margin",
        "Blank page insertion for proper page counts",
        "Print-ready output with crop marks",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Ensure page count is divisible by 4 for proper booklet layout",
        "Set binding margin based on your binding method",
        "Print double-sided for authentic booklet appearance",
      ],
    },
    faq: [
      { question: "Why does my document need to be divisible by 4 pages?", answer: "Booklets are folded sheets with 4 pages per sheet. Your content needs to fill sheets completely for proper layout." },
      { question: "Can the tool automatically add blank pages if needed?", answer: "Yes. The booklet tool automatically inserts blank pages to make your page count divisible by 4." },
      { question: "Is booklet creation done locally in my browser?", answer: "Yes. All booklet layout and processing happens entirely in your browser with no server uploads." },
    ],
  },
  overlay: {
    howTo: {
      title: "How to Overlay PDFs",
      steps: [
        "Upload base PDF and overlay PDF files.",
        "Align overlay position and scaling.",
        "Adjust opacity if needed for transparency effect.",
        "Click 'Apply' to merge and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Overlay one PDF on top of another",
        "Position and scale overlay independently",
        "Opacity adjustment for blending effects",
        "Page-by-page overlay application",
        "Batch overlaying for multiple documents",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use overlays to add logos or watermarks to batch documents",
        "Adjust opacity to make overlay content semi-transparent",
        "Perfect for merging forms with pre-printed documents",
      ],
    },
    faq: [
      { question: "How is overlay different from merging PDFs?", answer: "Overlay places one PDF on top of another with positioning control. Merging combines pages sequentially." },
      { question: "Can I apply different overlays to different pages?", answer: "Yes. You can apply different overlays to specific page ranges in your base PDF." },
      { question: "Is overlay processing done locally on my device?", answer: "Yes. All PDF overlay operations happen in your browser with no data sent to any server." },
    ],
  },
  "web-optimize": {
    howTo: {
      title: "How to Web Optimize a PDF",
      steps: [
        "Upload your PDF file.",
        "Select optimization level: fast, balanced, or maximum.",
        "Choose compression settings.",
        "Click 'Optimize' to reduce file size.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Reduce PDF file size for faster web loading",
        "Stream-optimized PDF for progressive rendering",
        "Compress images and remove unnecessary data",
        "Maintain readability while reducing size",
        "Multiple optimization levels",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Optimized PDFs load faster on websites and emails",
        "Choose 'Maximum' optimization for smallest file size",
        "Use for sharing large documents via email or web",
      ],
    },
    faq: [
      { question: "How much smaller will my optimized PDF be?", answer: "Reduction varies by content. Typically 30-60% smaller depending on optimization level and original file structure." },
      { question: "Will optimization affect the quality of my PDF?", answer: "Quality is preserved with smart compression. Balanced and Maximum levels may reduce image clarity slightly for smaller size." },
      { question: "Is optimization done safely in my browser?", answer: "Yes. All optimization happens locally in your browser with no uploads to any server." },
    ],
  },
  redact: {
    howTo: {
      title: "How to Redact a PDF",
      steps: [
        "Upload your PDF document.",
        "Use the redact tool to select text or areas to hide.",
        "Apply redaction marks (black boxes over content).",
        "Click 'Apply' to permanently remove content and download.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Permanently remove sensitive information from PDFs",
        "Draw redaction boxes over text or images",
        "Batch redaction with consistent styling",
        "Customize redaction color and opacity",
        "Verify redactions before final export",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Ensure redactions are visible with sufficient opacity",
        "Redaction is permanent — backup original before applying",
        "Use for removing personal data before sharing documents",
      ],
    },
    faq: [
      { question: "Is redaction truly permanent and irreversible?", answer: "Yes. Redacted content is permanently removed from the PDF and cannot be recovered or made visible again." },
      { question: "Is my sensitive document kept private during redaction?", answer: "Yes. All redaction happens locally in your browser. Your PDF is never sent to or stored on any server." },
      { question: "Can I redact hidden text that's not visually apparent?", answer: "Redaction hides visible content. For metadata or hidden text removal, use the metadata removal tool or flatten the PDF." },
    ],
  },
  "pdf-to-pdfa": {
    howTo: {
      title: "How to Convert PDF to PDF/A",
      steps: [
        "Upload your PDF file.",
        "Select PDF/A level (1B or 2B recommended for archival).",
        "Configure font embedding and color handling.",
        "Click 'Convert' to create archival-ready PDF/A.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert to PDF/A-1B or PDF/A-2B for long-term archival",
        "Automatic font embedding for consistency",
        "Removes features incompatible with archival standards",
        "Verifies compliance before output",
        "Preserves document appearance across years",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PDF/A format ensures documents remain readable for decades",
        "Required for many government and legal document archives",
        "Use for creating permanent digital records",
      ],
    },
    faq: [
      { question: "What's the difference between PDF and PDF/A?", answer: "PDF/A is a standardized format designed for long-term archival with embedded fonts and no external dependencies." },
      { question: "Will interactive features work in PDF/A format?", answer: "No. PDF/A removes interactive elements like forms and links to ensure long-term readability and stability." },
      { question: "Is conversion done locally without uploading my document?", answer: "Yes. All PDF/A conversion happens in your browser with no uploads to any external server." },
    ],
  },
  "pdf-to-word": {
    howTo: {
      title: "How to Convert PDF to Word",
      steps: [
        "Upload your PDF file.",
        "Choose conversion quality (standard or high fidelity).",
        "Select pages to convert or convert entire document.",
        "Click 'Convert' to generate editable Word document.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert PDFs to editable Microsoft Word format (.docx)",
        "Preserve formatting, fonts, and layout",
        "Support for text, images, and tables",
        "High-fidelity conversion for complex documents",
        "Batch conversion of multiple PDFs",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Results are most accurate for PDFs created from Word documents",
        "Some formatting adjustments may be needed after conversion",
        "Use for making PDFs editable in Microsoft Office",
      ],
    },
    faq: [
      { question: "Will tables and images be preserved in the Word document?", answer: "Yes. Tables and images are preserved during conversion, though formatting may require minor adjustments." },
      { question: "What about scanned PDFs or PDFs without selectable text?", answer: "Conversion works best with digital PDFs. For scanned documents, use OCR first to make text selectable." },
      { question: "Is my PDF document kept private during conversion?", answer: "Yes. All conversion happens locally in your browser with no uploads to any external server." },
    ],
  },
  "pdf-to-excel": {
    howTo: {
      title: "How to Convert PDF to Excel",
      steps: [
        "Upload your PDF containing tables or data.",
        "Preview recognized tables in the conversion preview.",
        "Select tables to extract or choose 'Extract All'.",
        "Click 'Convert' to create Excel spreadsheet.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Extract tables from PDFs to Excel format (.xlsx)",
        "Automatic table detection and cell recognition",
        "Preserve data formatting and structure",
        "Support for multiple tables per PDF",
        "Batch table extraction from multiple documents",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Works best with PDFs containing clear table structures",
        "Manual adjustments in Excel may be needed for complex layouts",
        "Perfect for converting data reports to spreadsheets",
      ],
    },
    faq: [
      { question: "Can I extract specific tables instead of the entire PDF?", answer: "Yes. The tool detects individual tables and lets you select which ones to extract." },
      { question: "What if my PDF has poorly formatted or complex tables?", answer: "The tool handles most standard tables well. Complex or irregular layouts may need manual adjustment in Excel." },
      { question: "Is my PDF data kept private during extraction?", answer: "Yes. All extraction happens locally in your browser with no uploads to any server." },
    ],
  },
  "pdf-to-ppt": {
    howTo: {
      title: "How to Convert PDF to PowerPoint",
      steps: [
        "Upload your PDF presentation or document.",
        "Choose conversion style (one slide per page or custom).",
        "Select pages to include or convert entire PDF.",
        "Click 'Convert' to create editable PowerPoint presentation.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert PDF pages to editable PowerPoint slides",
        "Preserve images, text, and layout from original",
        "Support for complex multi-page documents",
        "Editable slides in Microsoft PowerPoint format",
        "Batch conversion of multiple PDFs",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Each PDF page becomes a separate slide",
        "Text may require manual formatting adjustments",
        "Use for converting PDF presentations to editable slides",
      ],
    },
    faq: [
      { question: "Will the original formatting be preserved in PowerPoint?", answer: "Most formatting is preserved, but some adjustments may be needed. Text boxes and images transfer well." },
      { question: "Can I convert only specific pages from a PDF to slides?", answer: "Yes. Select the page range you want to convert, and only those pages will become slides." },
      { question: "Is my PDF document kept private during conversion?", answer: "Yes. All conversion happens locally in your browser with no uploads to any external server." },
    ],
  },
  "word-to-pdf": {
    howTo: {
      title: "How to Convert Word to PDF",
      steps: [
        "Upload your Word document (.doc or .docx).",
        "Preview the document appearance.",
        "Choose page size and margin settings.",
        "Click 'Convert' to create PDF from Word.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert Microsoft Word documents to PDF format",
        "Preserve all formatting, fonts, and styles",
        "Support for images, tables, and headers/footers",
        "Batch conversion of multiple Word files",
        "Maintain document quality and layout",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PDF is ideal for sharing documents while preventing editing",
        "Ensure Word document is properly formatted before conversion",
        "Use for creating professional documents to distribute",
      ],
    },
    faq: [
      { question: "Will track changes be included in the converted PDF?", answer: "Track changes are not visible in PDFs. Accept or reject all changes in Word before converting." },
      { question: "Can I convert Word documents with embedded videos or interactive content?", answer: "PDFs don't support video or interactivity. Static images and content transfer; interactive elements are removed." },
      { question: "Is my Word document kept private during conversion?", answer: "Yes. All conversion happens locally in your browser with no uploads to any external server." },
    ],
  },
  "excel-to-pdf": {
    howTo: {
      title: "How to Convert Excel to PDF",
      steps: [
        "Upload your Excel spreadsheet (.xlsx or .xls).",
        "Select sheets to include or convert all sheets.",
        "Choose page orientation and sizing options.",
        "Click 'Convert' to create PDF from Excel.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert Excel spreadsheets to PDF format",
        "Support for multiple sheets in single PDF",
        "Preserve formatting, colors, and cell layouts",
        "Page size adjustment for optimal printing",
        "Batch conversion of multiple Excel files",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PDF format is ideal for sharing financial reports securely",
        "Spreadsheets are automatically split across pages if needed",
        "Use landscape orientation for wide spreadsheets",
      ],
    },
    faq: [
      { question: "Will formulas and calculations be preserved in the PDF?", answer: "No. PDFs preserve only the visible cell values, not the formulas behind them." },
      { question: "Can I convert multiple sheets from one Excel file into a single PDF?", answer: "Yes. All selected sheets are combined into one PDF document with automatic page breaks between them." },
      { question: "Is my Excel spreadsheet kept private during conversion?", answer: "Yes. All conversion happens locally in your browser with no uploads to any external server." },
    ],
  },
  "ppt-to-pdf": {
    howTo: {
      title: "How to Convert PowerPoint to PDF",
      steps: [
        "Upload your PowerPoint presentation (.pptx or .ppt).",
        "Select slides to include or convert all slides.",
        "Choose output format: single file or one file per slide.",
        "Click 'Convert' to create PDF presentation.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert PowerPoint presentations to PDF format",
        "Preserve animations, transitions, and multimedia references",
        "Multiple output options (single or multi-file)",
        "Maintain slide layout and design elements",
        "Batch conversion of multiple presentations",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Single-file PDF is best for sharing and printing presentations",
        "Animations won't play in PDF — consider adding notes",
        "Use for creating presentation archives",
      ],
    },
    faq: [
      { question: "Will animations and slide transitions appear in the PDF?", answer: "No. PDFs are static documents. Animations and transitions won't play, so add speaker notes as needed." },
      { question: "Can I create separate PDFs for each slide?", answer: "Yes. Choose the multi-file output option to generate one PDF per slide." },
      { question: "Is my PowerPoint presentation kept private during conversion?", answer: "Yes. All conversion happens locally in your browser with no uploads to any external server." },
    ],
  },
  repair: {
    howTo: {
      title: "How to Repair a PDF",
      steps: [
        "Upload your corrupted or damaged PDF file.",
        "Select repair option: auto repair or advanced recovery.",
        "Preview the repaired document.",
        "Click 'Repair' to fix and download the restored PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Fix corrupted PDF files with automatic repair",
        "Recover readable content from damaged documents",
        "Support for various PDF corruption types",
        "Preview repaired content before saving",
        "Attempt to preserve original formatting",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Repair often recovers most content from slightly corrupted files",
        "Some formatting may be lost in heavily damaged files",
        "Keep backups of important PDFs to avoid corruption",
      ],
    },
    faq: [
      { question: "Will repair recover all content from a corrupted PDF?", answer: "Most content is typically recovered, but heavily damaged files may lose some formatting or pages." },
      { question: "What causes PDF corruption in the first place?", answer: "Corruption can result from incomplete downloads, file transfer errors, storage media damage, or software crashes." },
      { question: "Is PDF repair done locally without uploading to a server?", answer: "Yes. All repair operations happen in your browser with no uploads to any external server." },
    ],
  },
  ocr: {
    howTo: {
      title: "How to OCR a PDF",
      steps: [
        "Upload a scanned PDF or image-based PDF.",
        "Select OCR language for accurate text recognition.",
        "Choose output format: searchable PDF or extracted text.",
        "Click 'OCR' to process and download results.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Optical Character Recognition for scanned documents",
        "Support for 40+ languages for accurate text extraction",
        "Create searchable PDFs with hidden text layer",
        "Extract text to separate file or keep in PDF",
        "Batch OCR processing for multiple documents",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Searchable PDFs allow text selection and searching",
        "Better scan quality produces more accurate OCR results",
        "Perfect for digitizing old documents and archival",
      ],
    },
    faq: [
      { question: "How accurate is OCR text recognition?", answer: "Accuracy depends on scan quality. Clear, high-resolution scans achieve 95%+ accuracy. Poor scans may need manual correction." },
      { question: "Can I use OCR on handwritten documents?", answer: "OCR works best with printed text. Handwritten content recognition is limited and may require manual transcription." },
      { question: "Is OCR processing done locally in my browser?", answer: "Yes. All OCR processing happens locally in your browser with no uploads to any external server." },
    ],
  },
  unlock: {
    howTo: {
      title: "How to Unlock a PDF",
      steps: [
        "Upload your password-protected PDF file.",
        "Enter the user password if the file is password-protected.",
        "The tool will remove restrictions automatically.",
        "Download your unlocked PDF.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Remove password protection from PDFs",
        "Disable printing, copying, and editing restrictions",
        "Support for both user and owner passwords",
        "Batch unlock multiple protected PDFs",
        "No data loss during unlock process",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Unlocking requires the correct password if one is set",
        "Use only for files you own or have permission to modify",
        "Unlocked PDFs can be edited with other tools",
      ],
    },
    faq: [
      { question: "Is it legal to unlock password-protected PDFs?", answer: "Yes, if you own the document or have permission from the owner. Respect copyright and usage restrictions." },
      { question: "Can I unlock a PDF if I don't have the password?", answer: "No. If a password is set, you must provide the correct password. This protects document security." },
      { question: "Will unlocking my PDF remove copy and print restrictions?", answer: "Yes. Unlocking removes most permission restrictions, allowing copying, printing, and editing." },
    ],
  },
  translate: {
    howTo: {
      title: "How to Translate a PDF",
      steps: [
        "Upload your PDF document.",
        "Select source language and target language.",
        "Choose output format: translated PDF or side-by-side view.",
        "Click 'Translate' to process and download results.",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Translate PDF content to 100+ languages",
        "Preserve original formatting and layout",
        "Support for both text and image-based PDFs",
        "AI-powered translation for natural results",
        "Batch translation of multiple documents",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "OCR preprocessing improves translation accuracy for scanned PDFs",
        "Technical documents may need manual review for accuracy",
        "Use side-by-side view to compare original and translation",
      ],
    },
    faq: [
      { question: "How accurate is the AI translation?", answer: "Translation accuracy is high for general content, but technical, medical, or legal documents should be reviewed by a professional translator." },
      { question: "Will formatting and layout be preserved after translation?", answer: "Yes. The tool preserves the original layout, fonts, and formatting while translating the text content." },
      { question: "Is my PDF document kept private during translation?", answer: "Yes. All translation happens locally in your browser with no uploads to any external server." },
    ],
  },
};
