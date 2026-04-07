import type { ToolContentMap } from "../tool-content-types";

export const imageContentIt: ToolContentMap = {
  resize: {
    howTo: {
      title: "How to Resize an Image",
      steps: [
        "Click the upload button or drag and drop your image into the canvas",
        "Select your desired resize dimensions or choose a preset size",
        "Preview the resized result in real-time",
        "Download your resized image in your preferred format",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Support for multiple file formats (JPG, PNG, WebP, GIF)",
        "Preserve aspect ratio or customize dimensions freely",
        "Batch resize multiple images at once",
        "No file size limits - fully client-side processing",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Choose common sizes like 800x600 for web or 1920x1080 for prints",
        "Use percentage scaling to maintain aspect ratio while resizing",
        "Preview before downloading to ensure quality and dimensions",
      ],
    },
    faq: [
      {
        question: "Will resizing reduce image quality?",
        answer: "Downscaling preserves quality well. Upscaling beyond the original resolution may cause some blur, but ToolPop uses optimized algorithms to minimize quality loss.",
      },
      {
        question: "What image formats can I resize?",
        answer: "You can resize JPG, PNG, WebP, GIF, BMP, TIFF, and HEIC images. The output format matches your input.",
      },
      {
        question: "Is my image uploaded to a server?",
        answer: "No. All resizing happens locally in your browser. Your images never leave your device.",
      },
    ],
  },
  crop: {
    howTo: {
      title: "How to Crop an Image",
      steps: [
        "Upload your image by selecting a file or dragging it in",
        "Use the crop tool to select the area you want to keep",
        "Adjust the crop rectangle by dragging corners or edges",
        "Download your cropped image when satisfied",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Freeform and fixed-ratio cropping modes",
        "Real-time preview of the cropped area",
        "Support for common aspect ratios (16:9, 4:3, 1:1)",
        "Undo and reset functionality",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use fixed ratios to maintain consistency for social media posts",
        "Position important subjects at intersection points for better composition",
        "Save the original file before cropping in case you need it later",
      ],
    },
    faq: [
      {
        question: "Can I crop with a specific aspect ratio?",
        answer: "Yes! You can choose from preset aspect ratios like 16:9, 4:3, or 1:1, or crop freely without restrictions.",
      },
      {
        question: "Does cropping change the file size?",
        answer: "Yes, removing parts of the image typically reduces the file size, and you can adjust compression when saving.",
      },
      {
        question: "Is my work saved in the browser?",
        answer: "No, all cropping is done entirely in your browser in real-time. Your original image is never uploaded or stored on any server.",
      },
    ],
  },
  rotate: {
    howTo: {
      title: "How to Rotate an Image",
      steps: [
        "Upload your image to the tool",
        "Select a preset rotation (90°, 180°, 270°) or enter a custom angle",
        "Preview the rotated result instantly",
        "Download your rotated image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Rotate by 90°, 180°, or 270° with one click",
        "Custom angle rotation for precise adjustments",
        "Auto-crop option to remove empty edges",
        "Preserves image quality and metadata",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use 90° rotation for fixing landscape/portrait orientation issues",
        "Custom angles work great for slight tilted photos from old scans",
        "Enable auto-crop to remove white borders after rotation",
      ],
    },
    faq: [
      {
        question: "Can I rotate by any angle?",
        answer: "Yes, you can rotate by preset angles (90°, 180°, 270°) or enter any custom angle for precise tilting.",
      },
      {
        question: "What happens to the white space after rotating?",
        answer: "Enable the auto-crop feature to automatically remove empty white borders that appear after rotation.",
      },
      {
        question: "Will the image quality decrease after rotation?",
        answer: "No. Rotation is a lossless operation that doesn't degrade your image quality.",
      },
    ],
  },
  flip: {
    howTo: {
      title: "How to Flip an Image",
      steps: [
        "Upload or drag your image into the editor",
        "Choose to flip horizontally or vertically",
        "See the flipped result immediately in the preview",
        "Save and download your flipped image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Horizontal flip (mirror effect)",
        "Vertical flip (upside down)",
        "Combine both flips for 180° rotation",
        "Works with all image formats",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Horizontal flip is useful for creating mirror images or correcting reversed text",
        "Vertical flip helps fix upside-down photos",
        "Use flipping to create symmetrical designs or patterns",
      ],
    },
    faq: [
      {
        question: "What's the difference between flip and rotate?",
        answer: "Flip creates a mirror or upside-down effect, while rotate turns the image by an angle. Combine both flips for the same result as 180° rotation.",
      },
      {
        question: "Can I flip multiple times?",
        answer: "Yes. You can flip horizontally and vertically in any combination. Flipping twice in the same direction returns the image to its original state.",
      },
      {
        question: "Do you store my flipped images?",
        answer: "Never. All flipping happens instantly in your browser, and no images are sent to our servers.",
      },
    ],
  },
  "photo-editor": {
    howTo: {
      title: "How to Edit Photos",
      steps: [
        "Upload your photo to the editor",
        "Adjust brightness, contrast, saturation, and other settings",
        "Apply filters or fine-tune individual color channels",
        "Export your edited photo in your preferred format",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Comprehensive editing tools: brightness, contrast, saturation, hue",
        "Professional filters and presets for quick enhancement",
        "Color balance and temperature adjustments",
        "Before/after comparison view",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Start with small adjustments and build up to avoid over-processing",
        "Use color temperature to fix white balance in photos",
        "Apply filters as a starting point, then fine-tune individual settings",
      ],
    },
    faq: [
      {
        question: "Can I undo edits while working?",
        answer: "Yes. You can undo/redo changes step by step, or reset the image to start over completely.",
      },
      {
        question: "How do I compare my original and edited versions?",
        answer: "Use the before/after comparison view to see changes side by side and decide if the edits look good.",
      },
      {
        question: "Are my photos stored after editing?",
        answer: "No. All editing happens locally in your browser with instant previews. Your photos are never sent to any server.",
      },
    ],
  },
  "jpg-to-png": {
    howTo: {
      title: "How to Convert JPG to PNG",
      steps: [
        "Upload your JPG image to the converter",
        "The conversion happens automatically in seconds",
        "Preview the converted PNG image",
        "Click download to save your PNG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Lossless conversion preserving image quality",
        "Supports transparent backgrounds in PNG format",
        "Instant conversion without quality loss",
        "All files stay on your device for privacy",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG files are larger but preserve quality - ideal for graphics and logos",
        "Use PNG for images that need transparency",
        "JPG files are more suitable for photographs if file size matters",
      ],
    },
    faq: [
      {
        question: "Will the converted PNG be the same quality as the JPG?",
        answer: "Yes. JPG to PNG is a lossless conversion that preserves all original quality without degradation.",
      },
      {
        question: "Why would I convert JPG to PNG?",
        answer: "PNG supports transparency and is better for graphics, logos, and icons. JPG is better for photos when file size matters.",
      },
      {
        question: "Is the conversion private?",
        answer: "Completely. Your JPG is converted locally in your browser and is never uploaded to our servers.",
      },
    ],
  },
  "png-to-jpg": {
    howTo: {
      title: "How to Convert PNG to JPG",
      steps: [
        "Select and upload your PNG image",
        "Set the conversion quality level if needed",
        "Preview the converted JPG image",
        "Download your JPG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert PNG images to JPG with customizable quality",
        "Adjustable compression settings to balance quality and file size",
        "White background automatically added for transparency",
        "Batch conversion support",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "JPG format is ideal for photographs and reduces file size significantly",
        "Set quality to 85-90% for best balance between quality and file size",
        "Use JPG for web images to improve page loading speed",
      ],
    },
    faq: [
      {
        question: "What happens to transparent areas when converting PNG to JPG?",
        answer: "Transparent areas are filled with a white background, since JPG doesn't support transparency.",
      },
      {
        question: "How much smaller will my file be after conversion?",
        answer: "JPG compression can reduce file size by 50-80% compared to PNG, depending on the image and quality settings.",
      },
      {
        question: "Can I change the quality of the JPG conversion?",
        answer: "Yes. You can adjust the quality level before converting to balance file size and image quality.",
      },
    ],
  },
  "webp-to-jpg": {
    howTo: {
      title: "How to Convert WebP to JPG",
      steps: [
        "Upload your WebP image to the converter",
        "Select your preferred quality settings",
        "Review the preview of the JPG result",
        "Download the converted JPG image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Fast WebP to JPG conversion",
        "Maintain image quality with customizable compression",
        "Supports modern WebP format files",
        "Zero file size or processing limits",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "WebP is a modern format with better compression - JPG for compatibility",
        "Use this tool when you need JPG files for older software or devices",
        "Quality setting 85% typically provides optimal results",
      ],
    },
    faq: [
      {
        question: "Why would I convert WebP to JPG?",
        answer: "JPG is more widely compatible with older software and devices, while WebP is a newer format that many systems don't support yet.",
      },
      {
        question: "Will I lose quality converting WebP to JPG?",
        answer: "No significant loss. You can adjust the quality setting to maintain the original appearance of your image.",
      },
      {
        question: "How fast is the conversion?",
        answer: "The conversion happens instantly in your browser without uploading to any server.",
      },
    ],
  },
  "webp-to-png": {
    howTo: {
      title: "How to Convert WebP to PNG",
      steps: [
        "Upload your WebP file to the converter",
        "The tool automatically processes your file",
        "Preview the PNG conversion result",
        "Save and download your PNG image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Lossless conversion from WebP to PNG",
        "Preserve transparency and image quality",
        "Instant processing without uploads to servers",
        "Support for all WebP variants",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG is more widely compatible with older software and tools",
        "Transparency from WebP files is preserved in the PNG output",
        "Use PNG for graphics that need quality and transparency support",
      ],
    },
    faq: [
      {
        question: "Is the conversion lossless?",
        answer: "Yes. WebP to PNG conversion is completely lossless and preserves all image quality and transparency.",
      },
      {
        question: "Will my file size increase?",
        answer: "Usually yes. PNG files are typically larger than WebP, but offer better software compatibility.",
      },
      {
        question: "Is the conversion secure?",
        answer: "Yes. Your WebP file is converted entirely in your browser with no server upload or storage.",
      },
    ],
  },
  "jpg-to-webp": {
    howTo: {
      title: "How to Convert JPG to WebP",
      steps: [
        "Upload your JPG image to the converter",
        "Adjust quality settings to control file size",
        "Preview the WebP conversion result",
        "Download your WebP file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert JPG to modern WebP format for better compression",
        "Reduce file size by up to 30% compared to JPG",
        "Adjustable quality slider for optimal results",
        "No server uploads - fully client-side conversion",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "WebP format significantly reduces file size for web use",
        "WebP is supported by modern browsers but check compatibility for older versions",
        "Quality 80% in WebP often matches JPG at quality 90%",
      ],
    },
    faq: [
      {
        question: "How much smaller is WebP compared to JPG?",
        answer: "WebP typically reduces file size by 25-35% compared to JPG at similar quality levels.",
      },
      {
        question: "Do all browsers support WebP?",
        answer: "Most modern browsers support WebP, but older versions don't. Check browser compatibility before using WebP on your website.",
      },
      {
        question: "Can I adjust the quality of the WebP conversion?",
        answer: "Yes. Use the quality slider to find the right balance between file size and image quality for your needs.",
      },
    ],
  },
  "png-to-webp": {
    howTo: {
      title: "How to Convert PNG to WebP",
      steps: [
        "Select and upload your PNG image",
        "Customize quality settings if desired",
        "Preview the converted WebP image",
        "Download your optimized WebP file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert PNG to WebP with better compression",
        "Preserve transparency in WebP format",
        "Significant file size reduction for web optimization",
        "Real-time preview before download",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "WebP achieves better compression for transparent images",
        "WebP is ideal for modern web projects to improve page speed",
        "Always provide fallback JPG/PNG for older browser compatibility",
      ],
    },
    faq: [
      {
        question: "Does WebP support transparency like PNG?",
        answer: "Yes. WebP preserves transparency from PNG files while achieving much better compression ratios.",
      },
      {
        question: "How much file size reduction should I expect?",
        answer: "WebP typically reduces PNG file size by 25-35% for transparent images and even more for photos.",
      },
      {
        question: "Is my PNG file secure during conversion?",
        answer: "Your PNG is converted entirely in your browser. It's never sent to our servers or stored anywhere.",
      },
    ],
  },
  "svg-to-png": {
    howTo: {
      title: "How to Convert SVG to PNG",
      steps: [
        "Upload your SVG file to the converter",
        "Set the desired output resolution and size",
        "Preview the rasterized PNG image",
        "Download your PNG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert vector SVG graphics to raster PNG images",
        "Customize output resolution and dimensions",
        "Support for transparent backgrounds",
        "Maintain quality across different sizes",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use higher resolution settings for crisp PNG output from SVG",
        "PNG files are larger than SVG but compatible with all platforms",
        "Save SVG if you need to scale in the future - PNG is fixed size",
      ],
    },
    faq: [
      {
        question: "What's the difference between SVG and PNG?",
        answer: "SVG is a vector format that scales infinitely without quality loss. PNG is a raster format with fixed size. Convert to PNG when you need compatibility.",
      },
      {
        question: "What resolution should I use for the PNG?",
        answer: "Use 1x or 2x pixel density depending on your need. Web use typically needs 72-96 DPI, print use needs 300 DPI.",
      },
      {
        question: "Is the conversion done on your servers?",
        answer: "No. SVG to PNG conversion happens entirely in your browser for instant results and complete privacy.",
      },
    ],
  },
  "svg-to-jpg": {
    howTo: {
      title: "How to Convert SVG to JPG",
      steps: [
        "Upload your SVG image to the converter",
        "Choose your desired image dimensions",
        "Preview the JPG result with your chosen quality",
        "Download the converted JPG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Rasterize SVG graphics to JPG format",
        "Adjustable resolution for optimal quality",
        "Support for all SVG elements and effects",
        "Customizable background color option",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "JPG works best for SVG graphics with gradients or photos",
        "Set quality to 85-90% for professional results",
        "Keep SVG file as original for future scalability",
      ],
    },
    faq: [
      {
        question: "Should I use JPG or PNG for my SVG conversion?",
        answer: "Use JPG for smaller file sizes and natural images. Use PNG for graphics that need transparency or lossless quality.",
      },
      {
        question: "Will my SVG lose quality when converted to JPG?",
        answer: "No quality loss with proper settings. You can adjust resolution and quality to ensure crisp results.",
      },
      {
        question: "Can I adjust the background color?",
        answer: "Yes. You can set a custom background color before converting, or use transparency.",
      },
    ],
  },
  "gif-to-jpg": {
    howTo: {
      title: "How to Convert GIF to JPG",
      steps: [
        "Upload your GIF file to the converter",
        "Choose which frame to convert, or use the first frame by default",
        "Set the output quality settings",
        "Download your JPG image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert animated or static GIF to JPG format",
        "Select specific frame from animated GIF",
        "Customizable quality and compression settings",
        "Support for both static and animated GIFs",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "JPG works great for GIF frames with photographs or complex images",
        "Quality 85% is usually sufficient for web use",
        "Select the best frame from animated GIFs before conversion",
      ],
    },
    faq: [
      {
        question: "Can I convert an animated GIF to JPG?",
        answer: "Yes. You can select which frame from the GIF to convert to JPG, or use the first frame by default.",
      },
      {
        question: "Will I lose animation information?",
        answer: "Yes. JPG is a still image format, so only one frame is converted. For animated output, use MP4 or WebM instead.",
      },
      {
        question: "How do I select a specific frame from my GIF?",
        answer: "After uploading your animated GIF, you can preview and select the frame you want before converting to JPG.",
      },
    ],
  },
  "bmp-to-jpg": {
    howTo: {
      title: "How to Convert BMP to JPG",
      steps: [
        "Upload your BMP image file",
        "Adjust compression and quality settings",
        "Review the JPG preview",
        "Download your optimized JPG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert uncompressed BMP to compressed JPG format",
        "Reduce file size significantly",
        "Maintain image quality with adjustable settings",
        "Fast conversion process",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "BMP files are typically uncompressed - JPG reduces size dramatically",
        "Use quality 85-90% for best results with BMP conversions",
        "JPG is more suitable for web and sharing purposes",
      ],
    },
    faq: [
      {
        question: "Why is my BMP file so large?",
        answer: "BMP is an uncompressed format. Converting to JPG reduces file size by 50-90% while maintaining quality.",
      },
      {
        question: "Will the JPG look the same as my BMP?",
        answer: "Yes. With quality set to 85% or higher, the JPG will look virtually identical to the BMP but much smaller.",
      },
      {
        question: "Where is my conversion happening?",
        answer: "Your BMP file is converted entirely in your browser. It never leaves your device.",
      },
    ],
  },
  "bmp-to-png": {
    howTo: {
      title: "How to Convert BMP to PNG",
      steps: [
        "Select and upload your BMP image",
        "The tool automatically processes the conversion",
        "Preview your PNG result",
        "Download your PNG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert BMP to PNG with lossless compression",
        "Preserve image quality without data loss",
        "Support for transparent backgrounds",
        "Efficient file size reduction",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG offers better compression than BMP while keeping all quality",
        "Use PNG for graphics and images that need transparency",
        "PNG files are suitable for professional use",
      ],
    },
    faq: [
      {
        question: "Is BMP to PNG conversion lossless?",
        answer: "Yes. PNG conversion is completely lossless, preserving all image data while reducing file size.",
      },
      {
        question: "Can PNG support transparency like I need?",
        answer: "Yes. PNG fully supports transparent backgrounds, unlike BMP which requires a solid background.",
      },
      {
        question: "Is the conversion private?",
        answer: "Yes. Your BMP is converted entirely in your browser with no uploads or storage.",
      },
    ],
  },
  grayscale: {
    howTo: {
      title: "How to Convert Image to Grayscale",
      steps: [
        "Upload your color image to the converter",
        "Select the grayscale conversion method if available",
        "Preview the grayscale result immediately",
        "Download your grayscale image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert color images to black and white",
        "Multiple grayscale conversion algorithms for different effects",
        "Adjust brightness and contrast after conversion",
        "Preview in real-time",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Grayscale creates a classic, professional look for photographs",
        "Works well for old-style effects or archival photos",
        "Adjust contrast after grayscale for better visual impact",
      ],
    },
    faq: [
      {
        question: "Can I convert back to color after grayscale?",
        answer: "No. Grayscale conversion is permanent once saved. Keep your original color image as backup.",
      },
      {
        question: "Does grayscale reduce file size?",
        answer: "Slightly, since grayscale images have less color information than full-color images.",
      },
      {
        question: "Is my work private during conversion?",
        answer: "Yes. Grayscale conversion happens instantly in your browser without any server involvement.",
      },
    ],
  },
  "add-text": {
    howTo: {
      title: "How to Add Text to Image",
      steps: [
        "Upload your image to the text editor",
        "Click to place text on the image and type your message",
        "Customize font, size, color, and position",
        "Download your image with text",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Multiple font options for different styles",
        "Adjustable text size, color, and opacity",
        "Position text anywhere on the image",
        "Shadow and outline effects for text",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use contrasting colors for readability against image backgrounds",
        "Add text shadows or outlines for text visibility on complex backgrounds",
        "Keep text simple and readable - test different sizes",
      ],
    },
    faq: [
      {
        question: "Can I use custom fonts?",
        answer: "Yes. We provide multiple font families including serif, sans-serif, and decorative options.",
      },
      {
        question: "How do I make text readable on dark images?",
        answer: "Use bright text colors, add shadows or outlines, and increase text size for better visibility.",
      },
      {
        question: "Is text editing done privately?",
        answer: "Yes. All text editing and rendering happens locally in your browser with no server uploads.",
      },
    ],
  },
  "add-border": {
    howTo: {
      title: "How to Add Border to Image",
      steps: [
        "Upload your image to the border tool",
        "Choose border style, width, and color",
        "Preview the bordered image",
        "Download your image with border",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Various border styles: solid, dashed, rounded corners",
        "Adjustable border width and color options",
        "Support for different border positions",
        "Real-time preview",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use contrasting border colors to make images stand out",
        "Rounded corners give a modern, friendly appearance",
        "Border width should be proportional to image size",
      ],
    },
    faq: [
      {
        question: "What border styles are available?",
        answer: "You can choose from solid, dashed, dotted styles, and add rounded corners for a modern look.",
      },
      {
        question: "Does adding a border change the image dimensions?",
        answer: "Yes. The border increases the image size by the border width on all sides.",
      },
      {
        question: "Can I preview the border before downloading?",
        answer: "Yes. The tool shows a real-time preview so you can adjust width and color before saving.",
      },
    ],
  },
  pixelate: {
    howTo: {
      title: "How to Pixelate Image",
      steps: [
        "Upload your image to the pixelation tool",
        "Adjust the pixel size or blur level",
        "See the pixelated effect in real-time preview",
        "Download your pixelated image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Control pixel block size for various pixelation intensities",
        "Apply pixelation to entire image or selected areas",
        "Useful for privacy - blur faces or sensitive information",
        "Real-time preview with adjustable parameters",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use pixelation to anonymize faces in photos for privacy",
        "Larger pixel sizes create more dramatic blur effects",
        "Perfect for censoring text or sensitive details in screenshots",
      ],
    },
    faq: [
      {
        question: "Can I pixelate just one area of the image?",
        answer: "Yes. You can select specific areas to pixelate while leaving the rest of the image clear.",
      },
      {
        question: "How effective is pixelation for privacy?",
        answer: "Pixelation is effective for obfuscating faces and sensitive information, but larger pixel blocks are more secure.",
      },
      {
        question: "Is the pixelation process private?",
        answer: "Yes. All pixelation happens locally in your browser with no server uploads.",
      },
    ],
  },
  blur: {
    howTo: {
      title: "How to Blur Image",
      steps: [
        "Upload your image to the blur tool",
        "Adjust the blur intensity using the slider",
        "Preview the blurred result in real-time",
        "Download your blurred image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Various blur effects: Gaussian, motion, zoom blur",
        "Adjustable blur intensity and radius",
        "Selective blur for specific image areas",
        "Real-time preview and instant updates",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Gaussian blur works well for softening entire images",
        "Use motion blur to add dynamic effects to static images",
        "Blur backgrounds to create depth of field effect",
      ],
    },
    faq: [
      {
        question: "What's the difference between Gaussian blur and motion blur?",
        answer: "Gaussian blur creates an overall softening effect, while motion blur simulates movement in a specific direction.",
      },
      {
        question: "Can I blur just the background?",
        answer: "Yes. You can selectively blur specific areas while keeping others sharp for a depth-of-field effect.",
      },
      {
        question: "Is blurring done in your cloud?",
        answer: "No. All blur effects are applied locally in your browser with instant rendering and no uploads.",
      },
    ],
  },
  filters: {
    howTo: {
      title: "How to Apply Filters to Image",
      steps: [
        "Upload your image to the filter tool",
        "Browse and select from various filter options",
        "Adjust filter intensity if available",
        "Download your filtered image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Multiple professional filters: vintage, cool tone, warm tone, etc.",
        "Adjustable filter strength for subtle or dramatic effects",
        "Instant preview of filters applied",
        "Combine multiple filters for unique effects",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Vintage filters add nostalgic, retro appearance to photos",
        "Cool/warm filters help fix color temperature in photos",
        "Start with lower intensity and increase for best results",
      ],
    },
    faq: [
      {
        question: "Can I combine multiple filters?",
        answer: "Yes. You can apply multiple filters sequentially to create unique, custom effects.",
      },
      {
        question: "How do I undo a filter if I don't like it?",
        answer: "You can undo individual filter applications or reset to the original image anytime.",
      },
      {
        question: "Are my images kept after filtering?",
        answer: "No. All filtering happens in your browser and is immediately discarded after download.",
      },
    ],
  },
  "color-replace": {
    howTo: {
      title: "How to Replace Color in Image",
      steps: [
        "Upload your image to the color replace tool",
        "Select the color you want to replace using a picker",
        "Choose the new color you want to apply",
        "Download your image with replaced colors",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Color picker for selecting source color",
        "Adjustable color tolerance for similar shades",
        "Preview changes in real-time",
        "Support for full color spectrum replacement",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Adjust tolerance to capture all similar shades of target color",
        "Works best with solid color areas rather than gradients",
        "Use for recoloring objects or creating variations",
      ],
    },
    faq: [
      {
        question: "Why isn't all the color I want to replace being changed?",
        answer: "Adjust the color tolerance slider to capture a wider range of similar shades. Higher tolerance = more colors affected.",
      },
      {
        question: "Can I replace multiple colors at once?",
        answer: "You can perform the color replacement multiple times, replacing one color at a time.",
      },
      {
        question: "Is my image processed privately?",
        answer: "Yes. Color replacement happens entirely in your browser with no uploads or data collection.",
      },
    ],
  },
  vignette: {
    howTo: {
      title: "How to Add Vignette to Image",
      steps: [
        "Upload your image to the vignette editor",
        "Adjust vignette intensity and size",
        "Preview the vignette effect on your image",
        "Download your image with vignette",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Adjustable vignette darkness and blur radius",
        "Control vignette size and feathering",
        "Multiple vignette shape options",
        "Real-time preview",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Vignette draws attention to the center of your image",
        "Use subtle vignette for professional photos",
        "Darker vignette creates dramatic, moody effects",
      ],
    },
    faq: [
      {
        question: "What is a vignette and why would I use it?",
        answer: "A vignette darkens the edges of an image to draw attention to the center. It's useful for portraits and artistic effects.",
      },
      {
        question: "Can I adjust how strong the vignette is?",
        answer: "Yes. You can control darkness, blur radius, size, and feathering to create subtle or dramatic effects.",
      },
      {
        question: "Does vignetting happen on your servers?",
        answer: "No. Vignette is applied instantly in your browser with real-time preview and no server involvement.",
      },
    ],
  },
  noise: {
    howTo: {
      title: "How to Add Noise to Image",
      steps: [
        "Upload your image to the noise tool",
        "Select the type of noise (grain, salt-pepper, etc.)",
        "Adjust the noise intensity level",
        "Download your image with added noise",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Different noise types: grain, salt-and-pepper, Perlin noise",
        "Adjustable noise intensity and density",
        "Control noise distribution",
        "Real-time preview",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Film grain adds a vintage, cinematic feel to photos",
        "Use subtle noise to reduce smooth areas that look artificial",
        "Noise helps reduce posterization in gradient areas",
      ],
    },
    faq: [
      {
        question: "Why would I want to add noise to an image?",
        answer: "Noise adds vintage character, creates a film grain effect, and can make smooth areas look more natural.",
      },
      {
        question: "What are the different noise types?",
        answer: "Grain (film-like), salt-and-pepper (grainy), and Perlin noise (organic-looking) offer different aesthetic effects.",
      },
      {
        question: "Is noise processing done privately?",
        answer: "Yes. All noise effects are generated and applied locally in your browser with instant results.",
      },
    ],
  },
  sharpen: {
    howTo: {
      title: "How to Sharpen Image",
      steps: [
        "Upload your image to the sharpen tool",
        "Adjust sharpness level using the slider",
        "Compare original and sharpened versions",
        "Download your sharpened image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Adjustable sharpness intensity",
        "Unsharp mask and high-pass sharpening options",
        "Before/after comparison view",
        "Real-time preview adjustments",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use sharpening to enhance details in slightly soft photos",
        "Avoid over-sharpening which creates halos around edges",
        "Works best on images with good initial focus",
      ],
    },
    faq: [
      {
        question: "Can sharpening fix a blurry photo?",
        answer: "Sharpening helps enhance details in soft images but won't fix severely blurred photos. Use it on slightly soft images.",
      },
      {
        question: "What's the difference between unsharp mask and high-pass sharpening?",
        answer: "Unsharp mask is a traditional sharpening method, while high-pass provides more controlled edge enhancement.",
      },
      {
        question: "Is sharpening applied in your cloud?",
        answer: "No. Sharpening happens entirely in your browser with real-time before/after comparison.",
      },
    ],
  },
  sepia: {
    howTo: {
      title: "How to Apply Sepia Filter",
      steps: [
        "Upload your image to the sepia filter tool",
        "Adjust sepia intensity to your preference",
        "Preview the vintage sepia effect",
        "Download your sepia-toned image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Classic sepia tone effect for vintage appearance",
        "Adjustable sepia intensity from subtle to strong",
        "Maintains image contrast and details",
        "Works with all image formats",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Sepia gives photos a warm, antique look perfect for old-style effects",
        "Lower intensity creates subtle vintage feel",
        "Combine with texture overlays for authentic old photo effect",
      ],
    },
    faq: [
      {
        question: "What is sepia and when is it used?",
        answer: "Sepia is a warm, brownish tone that creates a vintage, antique photo effect. Perfect for nostalgic or historical looks.",
      },
      {
        question: "Can I control how much sepia is applied?",
        answer: "Yes. You can adjust the sepia intensity from subtle warmth to strong vintage effect based on your preference.",
      },
      {
        question: "Does the sepia effect process happen privately?",
        answer: "Yes. Sepia tone is applied instantly in your browser with no server uploads or data storage.",
      },
    ],
  },
  invert: {
    howTo: {
      title: "How to Invert Image Colors",
      steps: [
        "Upload your image to the invert tool",
        "Click to invert all colors",
        "Preview the negative effect",
        "Download your inverted image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Complete color inversion (negative effect)",
        "Preserves image quality and details",
        "One-click operation for instant results",
        "Works with all image types",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Color inversion creates a negative effect useful for artistic purposes",
        "Useful for converting scanned negatives to positives",
        "Can create interesting creative effects when combined with other tools",
      ],
    },
    faq: [
      {
        question: "What does color inversion do?",
        answer: "Color inversion creates a negative effect by flipping all colors to their opposites (red becomes cyan, etc.).",
      },
      {
        question: "Can I invert just some colors?",
        answer: "No. Inversion is a complete color flip affecting all pixels equally in one operation.",
      },
      {
        question: "Is the inversion done privately?",
        answer: "Yes. Inversion happens instantly in your browser with no uploads or server processing.",
      },
    ],
  },
  combine: {
    howTo: {
      title: "How to Combine Images",
      steps: [
        "Upload two or more images to combine",
        "Choose layout: horizontal, vertical, or grid arrangement",
        "Adjust spacing and alignment between images",
        "Download your combined image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Multiple layout options: side-by-side, vertical stack, grid",
        "Adjustable spacing and alignment",
        "Automatic or manual sizing options",
        "Support for different image dimensions",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Resize images to similar dimensions before combining for better results",
        "Use consistent spacing for professional appearance",
        "Combine before/after photos to show transformation",
      ],
    },
    faq: [
      {
        question: "Can I combine images of different sizes?",
        answer: "Yes. The tool supports automatic resizing to fit different dimensions, or you can manually adjust spacing.",
      },
      {
        question: "How many images can I combine?",
        answer: "You can combine 2 or more images in various grid layouts (2x2, 3x3, etc.).",
      },
      {
        question: "Does image combining happen on your server?",
        answer: "No. All combining is done instantly in your browser with no uploads or server processing.",
      },
    ],
  },
  "split-image": {
    howTo: {
      title: "How to Split Image",
      steps: [
        "Upload your image to the split tool",
        "Select how many pieces to split the image into",
        "Download individual image pieces",
        "Use split images for creating montages or interactive displays",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Split image into equal grid sections (2x2, 3x3, 4x4, etc.)",
        "Adjustable number of rows and columns",
        "Export each piece as separate files",
        "Maintain quality in split images",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Split images are great for creating Pinterest-style pin grids",
        "Use for puzzle effects or interactive image reveals",
        "Ensure your original image has sufficient resolution",
      ],
    },
    faq: [
      {
        question: "How many pieces can I split an image into?",
        answer: "You can split into grids of 2x2, 3x3, 4x4, 5x5 or custom row/column combinations.",
      },
      {
        question: "Will splitting reduce image quality?",
        answer: "No. Each piece maintains the original quality. You're just dividing the image into sections.",
      },
      {
        question: "Is splitting done privately?",
        answer: "Yes. Your image is split entirely in your browser with instant downloads for each piece.",
      },
    ],
  },
  collage: {
    howTo: {
      title: "How to Create Photo Collage",
      steps: [
        "Upload multiple photos to the collage maker",
        "Choose a collage template or create custom layout",
        "Drag to rearrange photos and adjust spacing",
        "Download your completed collage",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Multiple pre-designed collage templates",
        "Drag-and-drop photo arrangement",
        "Adjustable spacing and borders",
        "Background color customization",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use 4-9 photos for balanced, visually appealing collage",
        "Choose similar style or color-toned photos for cohesion",
        "Add subtle borders to separate photos and add definition",
      ],
    },
    faq: [
      {
        question: "How many photos can I add to a collage?",
        answer: "Most templates support 4-12 photos. You can choose a template that fits your photo count.",
      },
      {
        question: "Can I customize the spacing between photos?",
        answer: "Yes. You can adjust spacing and borders to create your preferred layout.",
      },
      {
        question: "Is my collage created privately?",
        answer: "Yes. All collage creation happens instantly in your browser with no uploads or cloud processing.",
      },
    ],
  },
  "round-image": {
    howTo: {
      title: "How to Round Image Corners",
      steps: [
        "Upload your image to the corner rounding tool",
        "Adjust corner radius for desired roundness",
        "Preview rounded corners in real-time",
        "Download your rounded image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Adjustable corner radius from subtle to full circle",
        "Uniform or individual corner customization",
        "Background color option for rounded areas",
        "Real-time preview",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Slightly rounded corners give modern, polished appearance",
        "Full circles work great for profile pictures and avatars",
        "Use white or transparent background for clean look",
      ],
    },
    faq: [
      {
        question: "Can I round only some corners?",
        answer: "Yes. You can customize each corner individually or apply uniform rounding to all corners.",
      },
      {
        question: "What happens to the rounded area?",
        answer: "The rounded areas are filled with your chosen background color or made transparent.",
      },
      {
        question: "Is rounding done privately?",
        answer: "Yes. Corner rounding happens instantly in your browser with no server processing.",
      },
    ],
  },
  "profile-photo": {
    howTo: {
      title: "How to Create Profile Photo",
      steps: [
        "Upload your photo to the profile photo maker",
        "Select profile photo size and aspect ratio",
        "Adjust crop area to frame your face",
        "Download your profile-ready photo",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Optimized dimensions for all platforms: LinkedIn, Twitter, Facebook, etc.",
        "Face detection and auto-centering",
        "Background blur or solid color options",
        "Automatic quality optimization",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use consistent profile photos across platforms for brand recognition",
        "Professional backgrounds work best for business profiles",
        "Ensure good lighting and clear face visibility",
      ],
    },
    faq: [
      {
        question: "What are the best dimensions for a profile photo?",
        answer: "Common sizes: LinkedIn (400x400), Twitter (400x400), Facebook (170x170). Our tool supports all major platforms.",
      },
      {
        question: "Can the tool detect my face?",
        answer: "Yes. Face detection automatically centers your face in the composition.",
      },
      {
        question: "Is my photo kept after upload?",
        answer: "No. All processing happens in your browser and your photo is never stored on any server.",
      },
    ],
  },
  meme: {
    howTo: {
      title: "How to Create Meme",
      steps: [
        "Upload or select an image for your meme",
        "Add text to top and bottom of image",
        "Customize font size, color, and style",
        "Download your meme",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Top and bottom text fields with customization",
        "Multiple font options and sizes",
        "Text shadow and outline for readability",
        "Impact font style for classic meme look",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use contrasting text color for visibility on image",
        "Keep text short and punchy for maximum impact",
        "Add white outline to text for readability on any background",
      ],
    },
    faq: [
      {
        question: "Can I add text in the middle or other places?",
        answer: "Yes. While the classic meme format uses top/bottom, you can place text anywhere on the image.",
      },
      {
        question: "What fonts are available?",
        answer: "We provide Impact (classic meme font), Arial, Comic Sans, and several other popular fonts.",
      },
      {
        question: "Is meme creation private?",
        answer: "Yes. Your meme is created entirely in your browser with no uploads or external processing.",
      },
    ],
  },
  "image-to-icon": {
    howTo: {
      title: "How to Convert Image to Icon",
      steps: [
        "Upload your image to the icon converter",
        "Select desired icon sizes (16x16, 32x32, 64x64, etc.)",
        "Adjust image to fit square format",
        "Download icon files in ICO format",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Generate multiple icon sizes at once",
        "Convert to ICO format for website favicons",
        "Automatic optimization for icon display",
        "Support for transparency",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use simple, recognizable designs for icons",
        "Ensure designs are clear at small sizes (16x16)",
        "Test favicon on actual website before deployment",
      ],
    },
    faq: [
      {
        question: "What icon sizes do I need for a favicon?",
        answer: "At minimum 16x16 and 32x32. Modern browsers recommend 192x192 and 512x512 for best display.",
      },
      {
        question: "Should I design my icon as square?",
        answer: "Yes. Icons work best as square designs. Our tool auto-crops to square format.",
      },
      {
        question: "Is the icon generation done locally?",
        answer: "Yes. All icon generation happens in your browser with no uploads to servers.",
      },
    ],
  },
  "color-palette": {
    howTo: {
      title: "How to Extract Color Palette",
      steps: [
        "Upload your image to the color palette extractor",
        "The tool automatically detects dominant colors",
        "Review the extracted color palette",
        "Copy color codes for use in design projects",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Automatic detection of dominant colors in image",
        "Color codes in HEX, RGB, and HSL formats",
        "Adjustable number of colors in palette",
        "Copy-to-clipboard functionality for color codes",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use extracted colors for consistent branding across designs",
        "Adjust number of colors to find the perfect palette",
        "Great tool for finding inspiration from photos or designs",
      ],
    },
    faq: [
      {
        question: "What color formats are supported?",
        answer: "HEX (e.g., #FF5733), RGB (e.g., rgb(255, 87, 51)), and HSL (e.g., hsl(9, 100%, 60%)).",
      },
      {
        question: "How many colors can I extract?",
        answer: "You can extract anywhere from 2 to 20 dominant colors from your image.",
      },
      {
        question: "Is my image stored when extracting colors?",
        answer: "No. Color extraction happens entirely in your browser with no uploads.",
      },
    ],
  },
  "html-to-image": {
    howTo: {
      title: "How to Convert HTML to Image",
      steps: [
        "Paste your HTML code into the editor",
        "Preview your HTML rendered as image",
        "Adjust dimensions and quality settings",
        "Download the rendered image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Render HTML and CSS to image format",
        "Support for various HTML elements and styling",
        "Adjustable output resolution and dimensions",
        "Multiple image format options",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Keep HTML simple for best rendering results",
        "Test styling before converting to image",
        "Use high resolution for quality output",
      ],
    },
    faq: [
      {
        question: "What HTML features are supported?",
        answer: "Most standard HTML and CSS features work, including layout, fonts, colors, and basic animations.",
      },
      {
        question: "Can I include external stylesheets?",
        answer: "Inline CSS works best. External stylesheets may not load due to browser security restrictions.",
      },
      {
        question: "Is HTML rendered privately?",
        answer: "Yes. HTML rendering happens entirely in your browser with no uploads.",
      },
    ],
  },
  gradient: {
    howTo: {
      title: "How to Generate Gradient Image",
      steps: [
        "Open the gradient generator tool",
        "Choose starting and ending colors",
        "Select gradient direction or angle",
        "Download your gradient image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Multiple gradient types: linear, radial, conic",
        "Color picker for selecting start and end colors",
        "Adjustable angle and direction",
        "Custom dimensions and export formats",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use complementary colors for striking gradients",
        "Radial gradients work well for circular designs",
        "Export as SVG for scalable gradients",
      ],
    },
    faq: [
      {
        question: "What's the difference between linear, radial, and conic gradients?",
        answer: "Linear flows in one direction, radial expands from center, conic rotates around center like a pie.",
      },
      {
        question: "Can I add more than 2 colors?",
        answer: "Yes. You can add multiple color stops to create complex multi-color gradients.",
      },
      {
        question: "Is gradient generation private?",
        answer: "Yes. Gradients are generated entirely in your browser with no server involvement.",
      },
    ],
  },
  placeholder: {
    howTo: {
      title: "How to Generate Placeholder Image",
      steps: [
        "Open the placeholder generator",
        "Specify desired width and height dimensions",
        "Customize background and text colors",
        "Download your placeholder image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Quick generation of placeholder images in custom sizes",
        "Customizable background and text colors",
        "Dimension display on image",
        "Perfect for website mockups and prototypes",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use placeholders during web design before final images are ready",
        "Maintain consistent placeholder style across mockups",
        "Include dimensions for development reference",
      ],
    },
    faq: [
      {
        question: "Can I use placeholders in production?",
        answer: "Placeholders are designed for mockups and prototypes. Replace them with final images before launching.",
      },
      {
        question: "Can I add text to the placeholder?",
        answer: "Yes. Dimensions are automatically displayed, and you can customize the text and colors.",
      },
      {
        question: "Is placeholder generation done locally?",
        answer: "Yes. Placeholders are generated entirely in your browser with no external processing.",
      },
    ],
  },
  pattern: {
    howTo: {
      title: "How to Generate Pattern Image",
      steps: [
        "Open the pattern generator tool",
        "Choose from available pattern types",
        "Customize colors and pattern size",
        "Download your generated pattern",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Multiple pattern types: dots, stripes, checkerboard, geometric",
        "Adjustable pattern density and size",
        "Customizable colors",
        "Seamless pattern generation",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Patterns work great as background textures for websites",
        "Use subtle colors for background patterns",
        "Test pattern visibility against text",
      ],
    },
    faq: [
      {
        question: "Are the patterns seamless for tiling?",
        answer: "Yes. All patterns are generated as seamless tiles that repeat perfectly without visible seams.",
      },
      {
        question: "What pattern types are available?",
        answer: "Dots, stripes, checkerboard, waves, hexagons, and various geometric patterns.",
      },
      {
        question: "Is pattern generation private?",
        answer: "Yes. Patterns are generated entirely in your browser with no cloud processing.",
      },
    ],
  },
  "qr-code": {
    howTo: {
      title: "How to Generate QR Code",
      steps: [
        "Open the QR code generator",
        "Enter the URL or text to encode",
        "Customize QR code size and colors",
        "Download your QR code image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Generate QR codes from URLs and text",
        "Customizable size and resolution",
        "Color customization for foreground and background",
        "Download in multiple image formats",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Test QR codes with mobile devices before distribution",
        "Ensure sufficient contrast between foreground and background",
        "Use QR codes to link to mobile websites or promotions",
      ],
    },
    faq: [
      {
        question: "How much data can a QR code hold?",
        answer: "A standard QR code can encode up to 4,296 characters. URLs typically need much less.",
      },
      {
        question: "Are custom colored QR codes still scannable?",
        answer: "Yes, as long as there's sufficient contrast between the QR code and background.",
      },
      {
        question: "Is QR generation done privately?",
        answer: "Yes. QR codes are generated entirely in your browser with no server uploads.",
      },
    ],
  },
  compress: {
    howTo: {
      title: "How to Compress Image",
      steps: [
        "Upload your image to the compression tool",
        "Adjust quality and compression level",
        "Preview file size reduction",
        "Download your compressed image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Intelligent compression maintaining visual quality",
        "Adjustable quality slider for file size control",
        "Real-time file size comparison",
        "Support for all major image formats",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Compress images to improve website loading speed",
        "Quality 80-85% usually provides best balance",
        "Batch compress multiple images for efficiency",
      ],
    },
    faq: [
      {
        question: "How much can images typically be compressed?",
        answer: "Most images can be compressed by 50-80% while maintaining visual quality at 80-90% quality setting.",
      },
      {
        question: "Will compression lose quality?",
        answer: "Some loss occurs (lossy compression), but at 85%+ quality, it's barely noticeable to the human eye.",
      },
      {
        question: "Is compression done privately?",
        answer: "Yes. Compression happens entirely in your browser with no uploads to servers.",
      },
    ],
  },
  watermark: {
    howTo: {
      title: "How to Add Watermark to Image",
      steps: [
        "Upload your image to the watermark tool",
        "Add text or upload an image as watermark",
        "Position and adjust watermark opacity",
        "Download your watermarked image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Text watermarks with customizable fonts and colors",
        "Image watermark support",
        "Adjustable opacity and positioning",
        "Multiple watermark placement options",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Use semi-transparent watermarks to protect without obscuring image",
        "Place watermarks in corners for less intrusive protection",
        "Use watermarks to protect portfolio and client work",
      ],
    },
    faq: [
      {
        question: "Can I use both text and image watermarks?",
        answer: "Yes. You can add text watermarks, image watermarks, or both together.",
      },
      {
        question: "How transparent should my watermark be?",
        answer: "Typically 30-50% opacity provides good balance between visibility and not obscuring the image.",
      },
      {
        question: "Is watermarking done privately?",
        answer: "Yes. Watermarking happens entirely in your browser with no uploads or cloud processing.",
      },
    ],
  },
  "heic-to-jpg": {
    howTo: {
      title: "How to Convert HEIC to JPG",
      steps: [
        "Upload your HEIC image file",
        "Adjust quality settings if needed",
        "Preview the JPG conversion result",
        "Download your JPG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert Apple HEIC format to widely compatible JPG",
        "Maintain image quality during conversion",
        "Adjustable compression settings",
        "Fast conversion process",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "JPG is more compatible with older devices and software",
        "HEIC files are common on iOS devices - convert for sharing",
        "Quality 85% works well for HEIC to JPG conversion",
      ],
    },
    faq: [
      {
        question: "What is HEIC format?",
        answer: "HEIC (High Efficiency Image Container) is a modern format used by Apple devices. JPG is more universally compatible.",
      },
      {
        question: "Will I lose quality converting HEIC to JPG?",
        answer: "Minimal quality loss with 85%+ quality setting. The conversion is mostly format-based, not quality-based.",
      },
      {
        question: "Is the conversion private?",
        answer: "Yes. HEIC to JPG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "heic-to-png": {
    howTo: {
      title: "How to Convert HEIC to PNG",
      steps: [
        "Upload your HEIC file to the converter",
        "The tool automatically processes your file",
        "Preview the PNG result",
        "Download your PNG image",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert HEIC to lossless PNG format",
        "Preserve transparency from original HEIC",
        "Support for high-resolution images",
        "Instant conversion without data loss",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG preserves quality from HEIC without compression loss",
        "PNG is more widely supported across platforms",
        "Use PNG when you need transparency support",
      ],
    },
    faq: [
      {
        question: "Is HEIC to PNG conversion lossless?",
        answer: "Yes. PNG conversion preserves all quality and transparency from the original HEIC file.",
      },
      {
        question: "Will the file be larger after conversion?",
        answer: "Possibly. PNG files can be larger than HEIC, but preserve full quality.",
      },
      {
        question: "Is the conversion private?",
        answer: "Yes. HEIC to PNG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "tiff-to-jpg": {
    howTo: {
      title: "How to Convert TIFF to JPG",
      steps: [
        "Upload your TIFF image file",
        "Set compression and quality parameters",
        "Review the JPG preview",
        "Download your compressed JPG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert uncompressed TIFF to compressed JPG",
        "Reduce file size significantly",
        "Customizable quality settings",
        "Support for multi-page TIFF files",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "TIFF to JPG reduces file size dramatically",
        "Quality 85-90% provides good results for most images",
        "JPG is ideal for photographs and web use",
      ],
    },
    faq: [
      {
        question: "How much smaller will my JPG be?",
        answer: "TIFF to JPG conversions typically reduce file size by 50-90% depending on the original image.",
      },
      {
        question: "Can I convert multi-page TIFF files?",
        answer: "Yes. You can select which page to convert, or we convert the first page by default.",
      },
      {
        question: "Is conversion done privately?",
        answer: "Yes. TIFF to JPG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "tiff-to-png": {
    howTo: {
      title: "How to Convert TIFF to PNG",
      steps: [
        "Upload your TIFF file to the converter",
        "The conversion happens automatically",
        "Preview your PNG result",
        "Download the PNG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Lossless conversion from TIFF to PNG",
        "Preserve image quality and transparency",
        "Support for all TIFF variants",
        "Efficient compression",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG maintains TIFF quality with better compression",
        "PNG is more compatible with modern software",
        "Use PNG for professional image archiving",
      ],
    },
    faq: [
      {
        question: "Is TIFF to PNG conversion lossless?",
        answer: "Yes. PNG conversion preserves all quality from the original TIFF file.",
      },
      {
        question: "What TIFF formats are supported?",
        answer: "All TIFF variants including compressed and uncompressed TIFF files.",
      },
      {
        question: "Is conversion private?",
        answer: "Yes. TIFF to PNG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "psd-to-jpg": {
    howTo: {
      title: "How to Convert PSD to JPG",
      steps: [
        "Upload your PSD file from Photoshop",
        "Set JPG quality and export settings",
        "Preview the converted image",
        "Download your JPG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert Photoshop PSD to JPG format",
        "Flatten all layers in conversion",
        "Customizable quality settings",
        "Support for layered PSD files",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "JPG conversion flattens all PSD layers into single image",
        "Quality 85-90% provides professional results",
        "Keep PSD original for future edits",
      ],
    },
    faq: [
      {
        question: "Does conversion flatten all layers?",
        answer: "Yes. All PSD layers are merged into a single image during JPG conversion.",
      },
      {
        question: "Will I lose any layer information?",
        answer: "Yes. JPG is a flat format. Keep your original PSD if you need to edit layers later.",
      },
      {
        question: "Is conversion private?",
        answer: "Yes. PSD to JPG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "psd-to-png": {
    howTo: {
      title: "How to Convert PSD to PNG",
      steps: [
        "Upload your PSD file to the converter",
        "Configure PNG export settings",
        "Preview the result",
        "Download your PNG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert PSD to lossless PNG format",
        "Preserve transparency and layer information",
        "Support for all PSD layer types",
        "Maintains image quality",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG preserves transparency from PSD files",
        "Use PNG when transparency is important",
        "Lossless format ensures no quality loss",
      ],
    },
    faq: [
      {
        question: "Will transparency be preserved?",
        answer: "Yes. PNG preserves transparent areas from your PSD file.",
      },
      {
        question: "Are all layers merged?",
        answer: "Yes. Layers are flattened during PNG conversion. Keep your PSD for future edits.",
      },
      {
        question: "Is conversion done privately?",
        answer: "Yes. PSD to PNG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "eps-to-jpg": {
    howTo: {
      title: "How to Convert EPS to JPG",
      steps: [
        "Upload your EPS vector file",
        "Set resolution and quality parameters",
        "Preview the rasterized JPG",
        "Download your JPG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Rasterize vector EPS to JPG format",
        "Customizable resolution for output quality",
        "Adjustable compression settings",
        "Support for complex EPS graphics",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Higher resolution produces better JPG from EPS",
        "JPG works best for photographs and complex gradients",
        "Keep EPS original for future vector edits",
      ],
    },
    faq: [
      {
        question: "What is EPS format?",
        answer: "EPS (Encapsulated PostScript) is a vector format used for professional graphics and logos.",
      },
      {
        question: "Does converting EPS to JPG lose quality?",
        answer: "You're converting from vector to raster. Higher resolution preserves more detail.",
      },
      {
        question: "Is conversion private?",
        answer: "Yes. EPS to JPG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "eps-to-png": {
    howTo: {
      title: "How to Convert EPS to PNG",
      steps: [
        "Upload your EPS file to the converter",
        "Configure resolution and transparency settings",
        "Review the PNG preview",
        "Download your PNG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert vector EPS to raster PNG",
        "Support for transparency in PNG output",
        "Adjustable resolution for quality control",
        "Preserve colors and effects from EPS",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "PNG with transparency works great for logos from EPS",
        "Use high resolution for crisp rasterized output",
        "PNG format is compatible with all software",
      ],
    },
    faq: [
      {
        question: "Can I preserve transparency from EPS?",
        answer: "Yes. PNG supports transparency for logos and graphics from EPS files.",
      },
      {
        question: "What resolution should I use?",
        answer: "Use 300 DPI for print, 72-96 DPI for web. Higher resolution preserves more detail.",
      },
      {
        question: "Is conversion private?",
        answer: "Yes. EPS to PNG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "eps-to-svg": {
    howTo: {
      title: "How to Convert EPS to SVG",
      steps: [
        "Upload your EPS file to the converter",
        "Configure vectorization settings",
        "Preview the SVG result",
        "Download your scalable SVG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Maintain vector format in SVG conversion",
        "Preserve editability of graphics",
        "Adjustable vectorization accuracy",
        "Support for all EPS elements",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "SVG preserves scalability from original EPS",
        "SVG can be edited in vector editors after conversion",
        "Use SVG for logos and graphics that need scaling",
      ],
    },
    faq: [
      {
        question: "Will the SVG be editable?",
        answer: "Yes. SVG files can be edited in vector editors like Adobe Illustrator or Inkscape.",
      },
      {
        question: "Is this true vector-to-vector conversion?",
        answer: "Yes. EPS to SVG maintains the vector format and preserves scalability.",
      },
      {
        question: "Is conversion private?",
        answer: "Yes. EPS to SVG conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "png-to-svg": {
    howTo: {
      title: "How to Convert PNG to SVG",
      steps: [
        "Upload your PNG image to the vectorizer",
        "Adjust tracing parameters for accuracy",
        "Preview the vectorized SVG",
        "Download your SVG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Trace raster PNG to vector SVG format",
        "Adjustable tracing precision and colors",
        "Support for transparent PNG backgrounds",
        "Produce scalable graphics",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Works best with high-contrast images and logos",
        "Adjust color limit for simple or complex graphics",
        "SVG allows infinite scaling without quality loss",
      ],
    },
    faq: [
      {
        question: "Will the vectorized SVG be editable?",
        answer: "Yes. SVG files can be edited in vector editors like Illustrator or Inkscape.",
      },
      {
        question: "What types of images work best?",
        answer: "Simple logos and high-contrast images. Complex photographs don't vectorize well.",
      },
      {
        question: "Is vectorization done privately?",
        answer: "Yes. PNG to SVG vectorization happens entirely in your browser with no uploads.",
      },
    ],
  },
  "jpg-to-svg": {
    howTo: {
      title: "How to Convert JPG to SVG",
      steps: [
        "Upload your JPG image to the vectorizer",
        "Configure vectorization settings",
        "Preview the SVG conversion",
        "Download your SVG file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Vectorize JPG images to scalable SVG format",
        "Adjustable tracing and color settings",
        "Support for complex JPG images",
        "Produce editable vector graphics",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Best results with simple, bold designs",
        "Works less effectively with photographs",
        "SVG conversion ideal for logos and graphics",
      ],
    },
    faq: [
      {
        question: "Can I convert photographs to SVG?",
        answer: "Not effectively. Vectorization works best for logos and simple graphics. Photographs produce bloated SVG files.",
      },
      {
        question: "Will the SVG be editable?",
        answer: "Yes. The vectorized SVG can be edited in vector editing software.",
      },
      {
        question: "Is vectorization done privately?",
        answer: "Yes. JPG to SVG vectorization happens entirely in your browser with no uploads.",
      },
    ],
  },
  "gif-to-mp4": {
    howTo: {
      title: "How to Convert GIF to MP4",
      steps: [
        "Upload your GIF file to the converter",
        "Configure video settings and frame rate",
        "Preview the MP4 conversion",
        "Download your MP4 video file",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Convert animated GIF to compressed MP4 video",
        "Adjustable frame rate and quality",
        "Significantly reduce file size",
        "Maintain animation smoothness",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "MP4 file size is typically 50-80% smaller than GIF",
        "MP4 is better supported on modern web browsers",
        "Use frame rate 24-30 fps for smooth playback",
      ],
    },
    faq: [
      {
        question: "How much smaller is MP4 compared to GIF?",
        answer: "MP4 files are typically 50-80% smaller than GIF files while maintaining animation quality.",
      },
      {
        question: "Is MP4 supported on all browsers?",
        answer: "Most modern browsers support MP4. It's more universally compatible than GIF for web.",
      },
      {
        question: "Is conversion done privately?",
        answer: "Yes. GIF to MP4 conversion happens entirely in your browser with no uploads.",
      },
    ],
  },
  "image-to-text": {
    howTo: {
      title: "How to Extract Text from Image",
      steps: [
        "Upload your image containing text",
        "The OCR tool automatically processes the image",
        "Review the extracted text in the editor",
        "Copy or download the extracted text",
      ],
    },
    features: {
      title: "Funzionalità principali",
      items: [
        "Optical Character Recognition (OCR) for text extraction",
        "Support for multiple languages",
        "High accuracy for printed and digital text",
        "Copy extracted text to clipboard",
      ],
    },
    tips: {
      title: "Consigli d'uso",
      items: [
        "Upload high-quality images for better OCR accuracy",
        "Works best with clear, readable text",
        "Review extracted text for any errors or corrections",
      ],
    },
    faq: [
      {
        question: "How accurate is the OCR?",
        answer: "OCR accuracy is typically 95%+ for clear, printed text. Handwriting and poor quality may have lower accuracy.",
      },
      {
        question: "What languages are supported?",
        answer: "Most major languages are supported including English, Spanish, French, German, Chinese, Japanese, and many others.",
      },
      {
        question: "Is my image kept after extraction?",
        answer: "No. OCR happens entirely in your browser and your image is never stored on any server.",
      },
    ],
  },
};
