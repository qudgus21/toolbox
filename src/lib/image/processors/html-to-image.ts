import type { ImageProcessorFn } from "../types";
import { createCanvas, canvasToBlob } from "../canvas-utils";

const processor: ImageProcessorFn = async (_files, options, onProgress) => {
  onProgress(0);

  const html = (options.html as string) ?? "<h1>Hello World</h1>";
  const width = (options.width as number) ?? 800;
  const height = (options.height as number) ?? 600;
  const backgroundColor = (options.backgroundColor as string) ?? "#ffffff";

  onProgress(10);

  // Create an off-screen iframe to render HTML
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "-9999px";
  iframe.style.width = `${width}px`;
  iframe.style.height = `${height}px`;
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  try {
    const iframeDoc = iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!iframeDoc) throw new Error("Cannot access iframe document");

    // Write HTML to iframe
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body {
            width: ${width}px;
            height: ${height}px;
            overflow: hidden;
            background: ${backgroundColor};
          }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `);
    iframeDoc.close();

    onProgress(30);

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 200));

    onProgress(50);

    // Use SVG foreignObject approach to render to canvas
    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              html, body, div {
                width: ${width}px;
                height: ${height}px;
                background: ${backgroundColor};
                overflow: hidden;
              }
            </style>
            ${html}
          </div>
        </foreignObject>
      </svg>
    `;

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    onProgress(60);

    const img = new window.Image();
    img.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to render HTML to image"));
      img.src = url;
    });

    URL.revokeObjectURL(url);

    onProgress(80);

    const { canvas, ctx } = createCanvas(width, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0);

    const blob = await canvasToBlob(canvas, "image/png");

    onProgress(100);

    return {
      blob,
      filename: "html-to-image.png",
      size: blob.size,
      width,
      height,
    };
  } finally {
    document.body.removeChild(iframe);
  }
};

export default processor;
