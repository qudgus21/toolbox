import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import editMetadata, { readPdfMetadata } from "../edit-metadata";
import { createMarkedPdf, resultToPdf } from "./helpers";

function createProgressTracker() {
  const values: number[] = [];
  return { values, onProgress: (v: number) => values.push(v) };
}

async function createPdfWithMetadata(): Promise<File> {
  const doc = await PDFDocument.create();
  doc.addPage([595, 842]);
  doc.setTitle("Original Title");
  doc.setAuthor("Original Author");
  doc.setSubject("Original Subject");
  doc.setKeywords(["pdf", "test", "metadata"]);
  doc.setCreator("Test Creator");
  doc.setProducer("Test Producer");
  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  return new File([blob], "test-meta.pdf", { type: "application/pdf" });
}

describe("edit-metadata processor", () => {
  it("should set metadata on a blank PDF", async () => {
    const file = await createMarkedPdf(2);
    const { onProgress } = createProgressTracker();

    const result = await editMetadata(
      [file],
      {
        title: "My Title",
        author: "My Author",
        subject: "My Subject",
        keywords: "key1, key2, key3",
        creator: "My Creator",
        producer: "My Producer",
      },
      onProgress,
    );

    expect(result.filename).toMatch(/_metadata\.pdf$/);
    expect(result.pageCount).toBe(2);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getTitle()).toBe("My Title");
    expect(pdf.getAuthor()).toBe("My Author");
    expect(pdf.getSubject()).toBe("My Subject");
    expect(pdf.getKeywords()).toBe("key1 key2 key3");
    expect(pdf.getCreator()).toBe("My Creator");
    // pdf-lib overrides producer on save, so we check it was set (may be pdf-lib string)
    expect(pdf.getProducer()).toBeTruthy();
  });

  it("should overwrite existing metadata", async () => {
    const file = await createPdfWithMetadata();
    const { onProgress } = createProgressTracker();

    const result = await editMetadata(
      [file],
      {
        title: "New Title",
        author: "New Author",
        subject: "New Subject",
        keywords: "new1, new2",
        creator: "New Creator",
        producer: "New Producer",
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getTitle()).toBe("New Title");
    expect(pdf.getAuthor()).toBe("New Author");
    expect(pdf.getSubject()).toBe("New Subject");
    expect(pdf.getKeywords()).toBe("new1 new2");
    expect(pdf.getCreator()).toBe("New Creator");
    expect(pdf.getProducer()).toBeTruthy();
  });

  it("should clear metadata when given empty strings", async () => {
    const file = await createPdfWithMetadata();
    const { onProgress } = createProgressTracker();

    const result = await editMetadata(
      [file],
      {
        title: "",
        author: "",
        subject: "",
        keywords: "",
        creator: "",
        producer: "",
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getTitle()).toBe("");
    expect(pdf.getAuthor()).toBe("");
    expect(pdf.getSubject()).toBe("");
    expect(pdf.getCreator()).toBe("");
    // producer gets set by pdf-lib on save, so it won't be empty
  });

  it("should track progress", async () => {
    const file = await createMarkedPdf(1);
    const { values, onProgress } = createProgressTracker();

    await editMetadata([file], { title: "Test" }, onProgress);

    expect(values.length).toBeGreaterThanOrEqual(4);
    expect(values[0]).toBe(10);
    expect(values[values.length - 1]).toBe(100);
  });

  it("should throw on empty files array", async () => {
    const { onProgress } = createProgressTracker();
    await expect(editMetadata([], {}, onProgress)).rejects.toThrow("No file provided");
  });
});

describe("readPdfMetadata", () => {
  it("should read existing metadata", async () => {
    const file = await createPdfWithMetadata();
    const meta = await readPdfMetadata(file);

    expect(meta.title).toBe("Original Title");
    expect(meta.author).toBe("Original Author");
    expect(meta.subject).toBe("Original Subject");
    expect(meta.keywords).toContain("pdf");
    expect(meta.creator).toBe("Test Creator");
    // pdf-lib overrides producer on save
    expect(meta.producer).toBeTruthy();
  });

  it("should return empty strings for blank PDF", async () => {
    const file = await createMarkedPdf(1);
    const meta = await readPdfMetadata(file);

    expect(meta.title).toBe("");
    expect(meta.author).toBe("");
    expect(meta.subject).toBe("");
    expect(meta.keywords).toBe("");
  });
});
