import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

type ImageQuality = "high" | "medium" | "low";

interface QualityConfig {
  /** Canvas render scale (1 = 72dpi, 2 = 144dpi, etc.) */
  scale: number;
}

const qualityConfig: Record<ImageQuality, QualityConfig> = {
  high: { scale: 3 },
  medium: { scale: 2 },
  low: { scale: 1.5 },
};

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas toBlob failed"));
    }, "image/png");
  });
}

/**
 * PDF to PNG processor — multi-file support
 *
 * options.quality: ImageQuality — "high" | "medium" | "low"
 * options.rotations: Record<string, number> — per-file rotation (0/90/180/270)
 */
const pdfToPng: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const quality = (options.quality as ImageQuality) ?? "high";
  const rotations = (options.rotations as Record<string, number> | undefined) ?? {};
  const config = qualityConfig[quality];

  onProgress(5);

  // Load pdfjs-dist dynamically
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  onProgress(8);

  // Count total pages across all files for progress tracking
  const pdfDocs: { file: File; doc: Awaited<ReturnType<typeof pdfjsLib.getDocument>>["promise"] extends Promise<infer T> ? T : never; rotation: number }[] = [];
  let totalPages = 0;

  for (const file of files) {
    const ab = await file.arrayBuffer();
    const doc = await pdfjsLib.getDocument({ data: ab }).promise;
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    pdfDocs.push({ file, doc: doc as typeof pdfDocs[0]["doc"], rotation: rotations[fileKey] ?? 0 });
    totalPages += doc.numPages;
  }

  onProgress(10);

  // Single file, single page → single PNG
  if (files.length === 1 && totalPages === 1) {
    const { doc, file, rotation } = pdfDocs[0];
    const page = await doc.getPage(1);
    const baseViewport = page.getViewport({ scale: config.scale });
    const viewport = rotation ? page.getViewport({ scale: config.scale, rotation }) : baseViewport;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d")!;

    await (
      page.render({
        canvasContext: ctx,
        viewport,
        canvas,
      } as Parameters<typeof page.render>[0]) as { promise: Promise<void> }
    ).promise;

    onProgress(80);

    const blob = await canvasToPngBlob(canvas);
    canvas.width = 0;
    canvas.height = 0;
    doc.destroy();
    onProgress(100);

    const baseName = file.name.replace(/\.pdf$/i, "");
    return {
      blob,
      filename: `${baseName}.png`,
      size: blob.size,
      pageCount: 1,
    } satisfies ProcessingResult;
  }

  // Multiple files or multiple pages → ZIP
  const zip = new JSZip();
  let processedPages = 0;
  const progressPerPage = 82 / totalPages;
  const multiFile = files.length > 1;

  for (const { file, doc, rotation } of pdfDocs) {
    const baseName = file.name.replace(/\.pdf$/i, "");
    const numPages = doc.numPages;
    const padLen = String(numPages).length;

    for (let p = 1; p <= numPages; p++) {
      const page = await doc.getPage(p);
      const viewport = rotation
        ? page.getViewport({ scale: config.scale, rotation })
        : page.getViewport({ scale: config.scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext("2d")!;

      await (
        page.render({
          canvasContext: ctx,
          viewport,
          canvas,
        } as Parameters<typeof page.render>[0]) as { promise: Promise<void> }
      ).promise;

      const blob = await canvasToPngBlob(canvas);
      canvas.width = 0;
      canvas.height = 0;
      const ab = await blob.arrayBuffer();

      const pageLabel = String(p).padStart(padLen, "0");
      const fileName = multiFile
        ? `${baseName}/${baseName}_page${pageLabel}.png`
        : `${baseName}_page${pageLabel}.png`;
      zip.file(fileName, new Uint8Array(ab));

      processedPages++;
      onProgress(10 + progressPerPage * processedPages);
    }

    doc.destroy();
  }

  onProgress(92);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  const zipName = files.length === 1
    ? `${files[0].name.replace(/\.pdf$/i, "")}_images.zip`
    : "pdf_to_png.zip";

  return {
    blob: zipBlob,
    filename: zipName,
    size: zipBlob.size,
    pageCount: totalPages,
  } satisfies ProcessingResult;
};

export default pdfToPng;
