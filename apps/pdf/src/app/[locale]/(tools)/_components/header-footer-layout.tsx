"use client";

import { useRef, useState, useEffect } from "react";
import { FileInfoBar } from "./file-info-bar";
import { HeaderFooterOptionsComponent } from "./header-footer-options";
import { HeaderFooterPreview } from "./header-footer-preview";
import type { HeaderFooterLabels } from "./header-footer-options";
import type { HeaderFooterOptions } from "@/lib/processors/header-footer-types";

interface HeaderFooterLayoutProps {
  file: File;
  pageCount: number;
  options: HeaderFooterOptions;
  onOptionsChange: (options: HeaderFooterOptions) => void;
  onChangeFile: () => void;
  labels: HeaderFooterLabels;
}

export function HeaderFooterLayout({
  file,
  pageCount,
  options,
  onOptionsChange,
  onChangeFile,
  labels,
}: HeaderFooterLayoutProps) {
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
          <HeaderFooterPreview
            file={file}
            pageCount={pageCount}
            options={options}
          />
        </div>

        {/* 우측: 옵션 패널 */}
        <div ref={optionsRef} className="h-fit rounded-xl border border-border bg-background-elevated p-4">
          <HeaderFooterOptionsComponent
            options={options}
            onChange={onOptionsChange}
            labels={labels}
          />
        </div>
      </div>
    </>
  );
}
