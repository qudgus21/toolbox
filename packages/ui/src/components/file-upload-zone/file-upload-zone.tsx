"use client";

import { forwardRef, useCallback, useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { cn } from "@toolbox/utils";
import { Upload } from "lucide-react";

export interface FileUploadZoneProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onFiles?: (files: File[]) => void;
  className?: string;
  title?: string;
  description?: string;
}

export const FileUploadZone = forwardRef<HTMLDivElement, FileUploadZoneProps>(
  (
    {
      accept,
      multiple = true,
      maxSizeMB = 100,
      onFiles,
      className,
      title = "Drop files here",
      description = "or click to browse",
    },
    ref,
  ) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList) return;
        const files = Array.from(fileList).filter(
          (f) => f.size <= maxSizeMB * 1024 * 1024,
        );
        onFiles?.(files);
      },
      [maxSizeMB, onFiles],
    );

    const handleDragOver = useCallback((e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
      },
      [handleFiles],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        if (inputRef.current) inputRef.current.value = "";
      },
      [handleFiles],
    );

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12",
          "transition-all duration-200 cursor-pointer",
          "border-foreground-subtle/50 hover:border-accent hover:bg-accent-muted/50",
          "dark:border-foreground-subtle/40 dark:hover:border-accent",
          isDragOver && "border-accent bg-accent-muted/50 scale-[1.01]",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-xl bg-accent-muted text-accent",
            "transition-transform duration-200",
            isDragOver && "scale-110",
          )}
        >
          <Upload className="h-6 w-6" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-sm text-foreground-muted">{description}</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    );
  },
);
FileUploadZone.displayName = "FileUploadZone";
