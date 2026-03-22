import {
  PDFDocument,
  StandardFonts,
  degrees,
} from "pdf-lib";
import type { ProcessorFn } from "../types";
import { hexToRgb } from "./color-utils";
import type {
  SignElement,
  SignatureElement,
  TextFieldElement,
} from "../../../app/pdf/[locale]/(tools)/_components/sign-pdf/sign-types";

// ─── Helpers ──────────────────────────────────────────────────

/** Convert Konva top-left Y-down to PDF bottom-left Y-up */
function toPdfY(konvaY: number, elementHeight: number, pageHeight: number): number {
  return pageHeight - konvaY - elementHeight;
}

/** Check if text contains characters outside WinAnsi range */
function hasNonLatinChars(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 0xFF) return true;
  }
  return false;
}

/** Convert data URL to Uint8Array */
function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Render text to canvas and return PNG bytes */
async function textToImage(
  content: string,
  width: number,
  height: number,
  fontSize: number,
  fontFamily: string,
  fontColor: string,
): Promise<Uint8Array> {
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  const ctx = canvas.getContext("2d")!;

  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, width, height);

  ctx.font = `${fontSize}px ${fontFamily}, sans-serif`;
  ctx.fillStyle = fontColor;
  ctx.textBaseline = "middle";
  ctx.fillText(content, 0, height / 2);

  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => b ? res(b) : rej(new Error("Canvas toBlob returned null")), "image/png"),
  );
  canvas.width = 0; canvas.height = 0;
  return new Uint8Array(await blob.arrayBuffer());
}

// ─── Processor ────────────────────────────────────────────────

const signPdf: ProcessorFn = async (files, options, onProgress) => {
  onProgress(5);

  const file = files[0];
  const elements = ((options.signElements as unknown[]) ?? []) as SignElement[];

  const bytes = new Uint8Array(await file.arrayBuffer());
  onProgress(15);

  const doc = await PDFDocument.load(bytes);
  onProgress(25);

  const font = await doc.embedFont(StandardFonts.Helvetica);

  // Group elements by page
  const byPage = new Map<number, SignElement[]>();
  for (const el of elements) {
    const arr = byPage.get(el.pageIndex) ?? [];
    arr.push(el);
    byPage.set(el.pageIndex, arr);
  }

  const totalPages = doc.getPageCount();
  const progressPerPage = 60 / Math.max(totalPages, 1);

  for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
    const pageElements = byPage.get(pageIdx);
    if (!pageElements || pageElements.length === 0) {
      onProgress(25 + (pageIdx + 1) * progressPerPage);
      continue;
    }

    const page = doc.getPage(pageIdx);
    const { height: ph } = page.getSize();

    for (const el of pageElements) {
      if (el.type === "signature" || el.type === "initials") {
        // Image-based element
        const sigEl = el as SignatureElement;
        const pngBytes = dataUrlToBytes(sigEl.imageDataUrl);

        let image;
        try {
          image = await doc.embedPng(pngBytes);
        } catch {
          // Fallback: try as JPEG if PNG embed fails
          try {
            image = await doc.embedJpg(pngBytes);
          } catch {
            continue;
          }
        }

        page.drawImage(image, {
          x: el.x,
          y: toPdfY(el.y, el.height, ph),
          width: el.width,
          height: el.height,
          opacity: el.opacity,
          rotate: degrees(-el.rotation),
        });
      } else {
        // Text-based element (name, date, text)
        const textEl = el as TextFieldElement;
        const { content } = textEl;

        if (!content) continue;

        if (hasNonLatinChars(content)) {
          // Non-Latin: render to canvas → embed as PNG
          const imgBytes = await textToImage(
            content,
            textEl.width,
            textEl.height,
            textEl.fontSize,
            textEl.fontFamily,
            textEl.fontColor,
          );
          const image = await doc.embedPng(imgBytes);
          page.drawImage(image, {
            x: textEl.x,
            y: toPdfY(textEl.y, textEl.height, ph),
            width: textEl.width,
            height: textEl.height,
            opacity: textEl.opacity,
            rotate: degrees(-textEl.rotation),
          });
        } else {
          // Latin: use drawText directly
          const textY = toPdfY(textEl.y, textEl.height, ph);
          const textHeight = font.heightAtSize(textEl.fontSize);
          const yOffset = (textEl.height - textHeight) / 2;

          page.drawText(content, {
            x: textEl.x,
            y: textY + yOffset,
            size: textEl.fontSize,
            font,
            color: hexToRgb(textEl.fontColor),
            opacity: textEl.opacity,
            rotate: degrees(-textEl.rotation),
          });
        }
      }
    }

    onProgress(25 + (pageIdx + 1) * progressPerPage);
  }

  onProgress(90);

  const pdfBytes = await doc.save();
  const baseName = file.name.replace(/\.pdf$/i, "");
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });

  onProgress(100);

  return {
    blob,
    filename: `${baseName}_signed.pdf`,
    size: blob.size,
    pageCount: doc.getPageCount(),
  };
};

export default signPdf;
