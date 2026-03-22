"use client";

import { FileInfoBar } from "./file-info-bar";
import { BookletOptionsComponent } from "./booklet-options";
import { BookletPreview } from "./booklet-preview";
import type { BookletLabels } from "./booklet-options";
import type { BookletOptions } from "@/lib/pdf/processors/booklet-types";

export interface BookletPreviewLabels {
  sheetLabel: string;
  frontLabel: string;
  backLabel: string;
}

interface BookletLayoutProps {
  file: File;
  pageCount: number;
  options: BookletOptions;
  onOptionsChange: (options: BookletOptions) => void;
  onChangeFile: () => void;
  labels: BookletLabels;
  previewLabels: BookletPreviewLabels;
}

export function BookletLayout({
  file,
  pageCount,
  options,
  onOptionsChange,
  onChangeFile,
  labels,
  previewLabels,
}: BookletLayoutProps) {
  return (
    <>
      <FileInfoBar
        file={file}
        pageCount={pageCount}
        changeLabel={labels.changeFile}
        onChangeFile={onChangeFile}
      />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:items-start">
        {/* 좌측: 소책자 배치 미리보기 */}
        <div className="min-w-0 overflow-y-auto lg:max-h-[calc(100vh-12rem)]">
          <BookletPreview
            file={file}
            pageCount={pageCount}
            options={options}
            labels={previewLabels}
          />
        </div>

        {/* 우측: 옵션 패널 — sticky */}
        <div className="lg:sticky lg:top-4">
          <BookletOptionsComponent
            options={options}
            onChange={onOptionsChange}
            labels={labels}
          />
        </div>
      </div>
    </>
  );
}
