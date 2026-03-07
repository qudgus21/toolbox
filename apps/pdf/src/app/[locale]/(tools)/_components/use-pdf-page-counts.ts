"use client";

import { useEffect, useRef, useState } from "react";
import { fileId } from "./file-list";

export function usePdfPageCounts(files: File[]) {
  const [pageCounts, setPageCounts] = useState<Record<string, number>>({});
  const [encryptedFiles, setEncryptedFiles] = useState<Set<string>>(new Set());
  const processedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function loadCounts() {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();

      for (const file of files) {
        const key = fileId(file);
        if (processedRef.current.has(key) || cancelled) continue;
        processedRef.current.add(key);

        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          if (cancelled) return;
          setPageCounts((prev) => ({ ...prev, [key]: pdf.numPages }));
        } catch (err: unknown) {
          if (
            err &&
            typeof err === "object" &&
            "name" in err &&
            (err as { name: string }).name === "PasswordException"
          ) {
            if (!cancelled) {
              setEncryptedFiles((prev) => new Set(prev).add(key));
            }
          }
        }
      }
    }

    if (files.length > 0) loadCounts();
    return () => {
      cancelled = true;
    };
  }, [files]);

  const currentKeys = new Set(files.map(fileId));
  const totalPages = Object.entries(pageCounts)
    .filter(([key]) => currentKeys.has(key))
    .reduce((sum, [, count]) => sum + count, 0);

  return { pageCounts, totalPages, encryptedFiles };
}
