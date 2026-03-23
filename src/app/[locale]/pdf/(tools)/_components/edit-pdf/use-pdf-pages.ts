"use client";

import { useEffect, useRef, useState } from "react";
import type { PageData } from "./editor-types";

const RENDER_SCALE = 2; // High-DPI rendering

export function usePdfPages(file: File | null) {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!file) {
      setPages([]);
      return;
    }

    let cancelled = false;

    async function loadPages() {
      setLoading(true);
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const arrayBuffer = await file!.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        const results: PageData[] = [];

        // Revoke old URLs
        for (const url of urlsRef.current) URL.revokeObjectURL(url);
        urlsRef.current = [];

        for (let i = 1; i <= totalPages; i++) {
          if (cancelled) return;

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: RENDER_SCALE });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d")!;

          await page.render({
            canvasContext: ctx,
            viewport,
            canvas,
          } as Parameters<typeof page.render>[0]).promise;

          if (cancelled) return;

          const blob = await new Promise<Blob>((resolve, reject) =>
            canvas.toBlob((b) => {
              canvas.width = 0;
              canvas.height = 0;
              b ? resolve(b) : reject(new Error("toBlob returned null"));
            }, "image/png"),
          );
          const url = URL.createObjectURL(blob);
          urlsRef.current.push(url);

          // Use original PDF point dimensions (not scaled)
          const baseViewport = page.getViewport({ scale: 1 });
          results.push({
            width: baseViewport.width,
            height: baseViewport.height,
            imageUrl: url,
          });
        }

        if (!cancelled) {
          setPages(results);
        }
      } catch (err) {
        console.error("Failed to load PDF pages:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPages();

    return () => {
      cancelled = true;
    };
  }, [file]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      for (const url of urlsRef.current) URL.revokeObjectURL(url);
    };
  }, []);

  return { pages, loading };
}
