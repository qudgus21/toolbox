import { PDFDocument } from "pdf-lib-plus-encrypt";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

/**
 * Protect PDF processor (multi-file)
 *
 * options.userPassword: string — password to open the PDF
 * options.ownerPassword?: string — password for full access (defaults to userPassword)
 * options.permissions: object — user permission flags
 * Single file → protected PDF, multiple files → ZIP.
 */
const protectPdf: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const userPassword = (options.userPassword as string) ?? "";

  // 소유자 비밀번호는 항상 별도 생성 — 사용자 비밀번호와 동일하면
  // PDF 리더가 전체 권한으로 열어서 권한 제한이 무의미해짐
  const ownerPassword = userPassword
    ? userPassword + "_owner_" + Math.random().toString(36).slice(2, 10)
    : "owner_" + Math.random().toString(36).slice(2, 14);

  const permissions = (options.permissions ?? {}) as {
    printing?: boolean | "lowResolution" | "highResolution";
    modifying?: boolean;
    copying?: boolean;
    annotating?: boolean;
    fillingForms?: boolean;
    contentAccessibility?: boolean;
    documentAssembly?: boolean;
  };

  const results: { name: string; bytes: Uint8Array; pageCount: number }[] = [];

  for (let fi = 0; fi < files.length; fi++) {
    const file = files[fi];
    const bytes = await file.arrayBuffer();

    onProgress(((fi + 0.3) / files.length) * 80);

    const doc = await PDFDocument.load(bytes);

    onProgress(((fi + 0.5) / files.length) * 80);

    await doc.encrypt({
      userPassword,
      ownerPassword,
      permissions,
    });

    onProgress(((fi + 0.7) / files.length) * 80);

    const pdfBytes = await doc.save({ useObjectStreams: false });

    const baseName = file.name.replace(/\.pdf$/i, "");
    results.push({
      name: `${baseName}_protected.pdf`,
      bytes: pdfBytes,
      pageCount: doc.getPageCount(),
    });

    onProgress(((fi + 1) / files.length) * 80);
  }

  // Single file → direct PDF
  if (results.length === 1) {
    const r = results[0];
    const blob = new Blob([r.bytes as BlobPart], { type: "application/pdf" });
    onProgress(100);
    return {
      blob,
      filename: r.name,
      size: blob.size,
      pageCount: r.pageCount,
    } satisfies ProcessingResult;
  }

  // Multiple files → ZIP
  const zip = new JSZip();
  let totalPageCount = 0;
  for (const r of results) {
    zip.file(r.name, r.bytes);
    totalPageCount += r.pageCount;
  }

  onProgress(90);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "protected_pdfs.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default protectPdf;
