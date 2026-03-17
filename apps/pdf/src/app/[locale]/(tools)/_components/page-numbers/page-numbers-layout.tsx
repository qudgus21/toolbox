"use client";

import { useRef, useState, useEffect } from "react";
import { FileInfoBar } from "../file-info-bar";
import { PageNumbersOptions } from "./page-numbers-options";
import { PageNumbersPreview } from "./page-numbers-preview";
import type { PageNumbersLabels } from "./page-numbers-options";
import type { PageNumberOptions } from "./page-numbers-types";

interface PageNumbersLayoutProps {
  file: File;
  pageCount: number;
  options: PageNumberOptions;
  onOptionsChange: (options: PageNumberOptions) => void;
  onChangeFile: () => void;
  labels: PageNumbersLabels;
}

export function PageNumbersLayout({
  file,
  pageCount,
  options,
  onOptionsChange,
  onChangeFile,
  labels,
}: PageNumbersLayoutProps) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [optionsHeight, setOptionsHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = optionsRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setOptionsHeight(entry.contentBoxSize[0].blockSize);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <FileInfoBar
        file={file}
        pageCount={pageCount}
        changeLabel={labels.changeFile}
        onChangeFile={onChangeFile}
      />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:items-start">
        {/* 좌측: PDF 미리보기 — 우측 컨트롤러 높이에 맞춰 스크롤 */}
        <div
          className="min-w-0 overflow-y-auto"
          style={optionsHeight ? { maxHeight: optionsHeight } : undefined}
        >
          <PageNumbersPreview
            file={file}
            pageCount={pageCount}
            options={options}
          />
        </div>

        {/* 우측: 옵션 패널 */}
        <div ref={optionsRef} className="h-fit rounded-xl border border-border bg-background-elevated p-4">
          <PageNumbersOptions
            options={options}
            onChange={onOptionsChange}
            labels={labels}
          />
        </div>
      </div>
    </>
  );
}
