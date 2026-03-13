"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@toolbox/utils";

interface PdfThumbnailProps {
  file: File;
  className?: string;
  objectFit?: "object-contain" | "object-cover" | "object-fill" | "object-none";
}

export function PdfThumbnail({ file, className, objectFit = "object-contain" }: PdfThumbnailProps) {
  const [src, setSrc] = useState<string | null>(null);
  const revokeRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const scale = 200 / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]).promise;

        if (cancelled) return;

        canvas.toBlob((blob) => {
          if (cancelled || !blob) return;
          if (revokeRef.current) URL.revokeObjectURL(revokeRef.current);
          const url = URL.createObjectURL(blob);
          revokeRef.current = url;
          setSrc(url);
        }, "image/png");
      } catch {
        // 렌더 실패 시 fallback (아이콘만 표시)
      }
    }

    render();
    return () => {
      cancelled = true;
      if (revokeRef.current) URL.revokeObjectURL(revokeRef.current);
    };
  }, [file]);

  const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");

  if (!isPdf) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-background-muted text-foreground-subtle",
          className,
        )}
      >
        <svg className="h-10 w-10 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
        </svg>
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className={cn(
          "flex flex-col gap-[8px] p-4 bg-background-muted animate-pulse",
          className,
        )}
      >
        <div className="h-[8px] w-3/4 rounded-full bg-foreground-subtle/10" />
        <div className="h-[8px] w-full rounded-full bg-foreground-subtle/10" />
        <div className="h-[8px] w-5/6 rounded-full bg-foreground-subtle/10" />
        <div className="h-[8px] w-full rounded-full bg-foreground-subtle/10" />
        <div className="h-[8px] w-2/3 rounded-full bg-foreground-subtle/10" />
        <div className="mt-auto h-[8px] w-1/2 rounded-full bg-foreground-subtle/8" />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden bg-white", className)}>
      <img
        src={src}
        alt={file.name}
        className={cn("h-full w-full transition-all duration-300", objectFit)}
        draggable={false}
      />
    </div>
  );
}
