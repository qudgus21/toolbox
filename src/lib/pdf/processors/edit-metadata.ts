import { PDFDocument } from "pdf-lib";
import type { ProcessorFn, ProcessingResult } from "../types";

export interface PdfMetadata {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
  creationDate: string | null;
  modificationDate: string | null;
}

/** PDF에서 기존 메타데이터를 읽어옴 */
export async function readPdfMetadata(file: File): Promise<PdfMetadata> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  const creationDate = doc.getCreationDate();
  const modificationDate = doc.getModificationDate();

  return {
    title: doc.getTitle() ?? "",
    author: doc.getAuthor() ?? "",
    subject: doc.getSubject() ?? "",
    keywords: (doc.getKeywords() ?? "").replace(/,\s*/g, ", "),
    creator: doc.getCreator() ?? "",
    producer: doc.getProducer() ?? "",
    creationDate: creationDate ? creationDate.toISOString() : null,
    modificationDate: modificationDate ? modificationDate.toISOString() : null,
  };
}

/**
 * Edit Metadata processor
 *
 * options.title, options.author, options.subject, options.keywords,
 * options.creator, options.producer — 각 필드 문자열
 */
const editMetadata: ProcessorFn = async (files, options, onProgress) => {
  if (files.length === 0) throw new Error("No file provided");

  const file = files[0];
  onProgress(10);

  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  onProgress(30);

  const title = (options.title as string) ?? "";
  const author = (options.author as string) ?? "";
  const subject = (options.subject as string) ?? "";
  const keywordsRaw = (options.keywords as string) ?? "";
  const creator = (options.creator as string) ?? "";
  const producer = (options.producer as string) ?? "";

  doc.setTitle(title);
  doc.setAuthor(author);
  doc.setSubject(subject);
  doc.setKeywords(
    keywordsRaw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  );
  doc.setCreator(creator);
  doc.setProducer(producer);

  const creationDate = options.creationDate as string | undefined;
  if (creationDate) {
    doc.setCreationDate(new Date(creationDate));
  }

  const modificationDate = options.modificationDate as string | undefined;
  if (modificationDate) {
    doc.setModificationDate(new Date(modificationDate));
  }

  onProgress(70);

  const pdfBytes = await doc.save();
  onProgress(90);

  const baseName = file.name.replace(/\.pdf$/i, "");
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });

  onProgress(100);
  return {
    blob,
    filename: `${baseName}_metadata.pdf`,
    size: blob.size,
    pageCount: doc.getPageCount(),
  } satisfies ProcessingResult;
};

export default editMetadata;
