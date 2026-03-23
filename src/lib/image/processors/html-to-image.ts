import type { ImageProcessorFn } from "../types";
import { canvasToBlob } from "../canvas-utils";

const processor: ImageProcessorFn = async (_files, options, onProgress) => {
  onProgress(0);

  const html = (options.html as string) ?? "<h1>Hello World</h1>";

  onProgress(10);

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "-9999px";
  iframe.style.width = "1200px";
  iframe.style.height = "10000px";
  iframe.style.border = "none";
  iframe.style.opacity = "0";
  document.body.appendChild(iframe);

  try {
    const iframeDoc = iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!iframeDoc) throw new Error("Cannot access iframe document");

    const isFullDoc = /^\s*<!DOCTYPE|^\s*<html/i.test(html);

    iframeDoc.open();
    if (isFullDoc) {
      iframeDoc.write(html);
    } else {
      iframeDoc.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box;}</style>
</head><body>${html}</body></html>`);
    }
    iframeDoc.close();

    onProgress(30);

    await new Promise((resolve) => setTimeout(resolve, 500));

    onProgress(50);

    // Auto-detect content size
    const body = iframeDoc.body;
    const docEl = iframeDoc.documentElement;
    const width = Math.max(body.scrollWidth, docEl.scrollWidth, 800);
    const height = Math.max(body.scrollHeight, docEl.scrollHeight, 100);

    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;

    await new Promise((resolve) => setTimeout(resolve, 100));

    onProgress(60);

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(iframeDoc.body, {
      width,
      height,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      scale: 1,
      logging: false,
    });

    onProgress(80);

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
