"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useMemo, useEffect, type CSSProperties } from "react";
import { cn } from "@toolbox/utils";
import { X, RotateCw, Lock } from "lucide-react";
import { PdfThumbnail } from "./pdf-thumbnail";

/** Page aspect ratios (width/height in portrait) for visual preview */
const PAGE_ASPECT_RATIOS: Record<string, number> = {
  a4: 210 / 297,
  a3: 297 / 420,
  a5: 148 / 210,
  letter: 216 / 279,
  legal: 216 / 356,
  b5: 176 / 250,
  photo4x6: 102 / 152,
  photo5x7: 127 / 178,
  postcard: 100 / 148,
};

/** Convert mm margin to CSS percentage (based on A4 width 210mm) */
function marginMmToPct(mm: number): string {
  if (mm <= 0) return "0%";
  return `${((mm / 210) * 100).toFixed(1)}%`;
}

const IMAGE_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "gif", "webp", "svg", "avif", "bmp", "ico",
]);

function isImageFile(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.has(ext) || file.type.startsWith("image/");
}

function ImageThumbnail({ file, className }: { file: File; className?: string }) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  return (
    <img
      src={url}
      alt={file.name}
      className={cn("object-contain", className)}
      onLoad={() => URL.revokeObjectURL(url)}
    />
  );
}

const HTML_EXTENSIONS = new Set(["html", "htm"]);

function isHtmlFile(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return HTML_EXTENSIONS.has(ext) || file.type === "text/html";
}

function HtmlThumbnail({ file, className }: { file: File; className?: string }) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      let content = reader.result as string;
      content = content
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, "");
      setHtml(content);
    };
    reader.readAsText(file);
  }, [file]);

  if (!html) {
    return <div className={cn("bg-background-muted/50", className)} />;
  }

  return (
    <div className={cn("flex items-center justify-center overflow-hidden", className)}>
      <div className="w-[160px] h-[220px] overflow-hidden shrink-0">
        <iframe
          srcDoc={html}
          sandbox=""
          title={file.name}
          className="w-[800px] h-[1100px] origin-top-left border-none pointer-events-none"
          style={{ transform: "scale(0.2)", transformOrigin: "top left" }}
        />
      </div>
    </div>
  );
}

interface FileListProps {
  files: File[];
  rotations?: Record<string, number>;
  pageCounts?: Record<string, number>;
  pageSelections?: Record<string, number[]>;
  encryptedFiles?: Set<string>;
  encryptedLabel?: string;
  selectPagesTooltip?: string;
  /** When set, show image inside a page-shaped frame with orientation */
  pageOrientation?: "portrait" | "landscape";
  /** Page size key for aspect ratio preview (a4, letter, etc.) */
  pageSize?: string;
  /** Margin in mm for visual preview */
  pageMargin?: number;
  onRemove: (index: number) => void;
  onReorder: (files: File[]) => void;
  onRotate?: (fileKey: string) => void;
  onCardClick?: (file: File) => void;
  className?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function fileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function SortableCard({
  file,
  index,
  rotation,
  pageCount,
  selectedPageCount,
  isEncrypted,
  encryptedLabel,
  onRemove,
  onRotate,
  onCardClick,
  selectPagesTooltip,
  pageOrientation,
  pageSize,
  pageMargin,
  disableTransition,
  didDragRef,
}: {
  file: File;
  index: number;
  rotation: number;
  pageCount?: number;
  selectedPageCount?: number;
  isEncrypted?: boolean;
  encryptedLabel?: string;
  onRemove: () => void;
  onRotate?: () => void;
  onCardClick?: () => void;
  selectPagesTooltip?: string;
  pageOrientation?: "portrait" | "landscape";
  pageSize?: string;
  pageMargin?: number;
  disableTransition: boolean;
  didDragRef: React.RefObject<boolean>;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: fileId(file) });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition:
      isDragging || disableTransition
        ? "none"
        : "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClickCapture={(e) => {
        if (didDragRef.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div
        className={cn(
          "group relative rounded-xl border border-border-muted bg-background-elevated shadow-xs",
          "transition-all duration-200 hover:shadow-md hover:border-border",
          isDragging && "shadow-2xl scale-105 border-accent/40 ring-2 ring-accent/20",
          onCardClick && !isEncrypted && "cursor-pointer",
        )}
        onClick={() => {
          if (onCardClick && !isEncrypted) onCardClick();
        }}
      >
        {/* 삭제 버튼 */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background-elevated border border-border-muted text-foreground-subtle opacity-0 shadow-sm transition-opacity duration-150 hover:bg-error-muted hover:text-error hover:border-error/30 group-hover:opacity-100 cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>

        {/* 썸네일 */}
        <div className={cn(
          "relative w-full overflow-hidden rounded-t-xl transition-all duration-300",
          "aspect-[4/5]",
        )}>
          {isHtmlFile(file) ? (() => {
            const baseRatio = PAGE_ASPECT_RATIOS[pageSize ?? "a4"] ?? PAGE_ASPECT_RATIOS.a4;
            const isLand = pageOrientation === "landscape";
            const pageAR = isLand ? 1 / baseRatio : baseRatio;
            const marginPct = marginMmToPct(pageMargin ?? 0);
            return (
              <div className="h-full w-full flex items-center justify-center bg-background-muted/50 p-3">
                <div className="h-[78%] aspect-square shrink-0 flex items-center justify-center">
                  <div
                    className="bg-white overflow-hidden transition-all duration-300 ease-out [box-shadow:0_0_8px_rgba(0,0,0,0.25)]"
                    style={{
                      aspectRatio: String(pageAR),
                      ...(pageAR <= 1 ? { height: "100%" } : { width: "100%" }),
                      padding: marginPct,
                    }}
                  >
                    <HtmlThumbnail file={file} className="w-full h-full" />
                  </div>
                </div>
              </div>
            );
          })() : pageOrientation && isImageFile(file) ? (() => {
            const baseRatio = PAGE_ASPECT_RATIOS[pageSize ?? "a4"] ?? PAGE_ASPECT_RATIOS.a4;
            const pageAR = pageOrientation === "landscape" ? 1 / baseRatio : baseRatio;
            const marginPct = marginMmToPct(pageMargin ?? 0);
            return (
              <div className="h-full w-full flex items-center justify-center bg-background-muted/50 p-3">
                <div className="h-[78%] aspect-square shrink-0 flex items-center justify-center">
                  <div
                    className="relative overflow-hidden flex items-center justify-center transition-[padding] duration-300 ease-out [box-shadow:0_0_8px_rgba(0,0,0,0.25)]"
                    style={{
                      aspectRatio: String(pageAR),
                      ...(pageAR <= 1 ? { height: '100%' } : { width: '100%' }),
                      padding: marginPct,
                      transform: `rotate(${rotation}deg)`,
                      backgroundColor: '#fff',
                    }}
                  >
                    <ImageThumbnail file={file} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            );
          })() : (
            <div
              className="h-full w-full transition-transform duration-300"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {isImageFile(file) ? (
                <ImageThumbnail file={file} className="h-full w-full" />
              ) : (
                <PdfThumbnail file={file} className="h-full w-full" />
              )}
            </div>
          )}

          {/* 순서 번호 뱃지 */}
          <span className="absolute top-2 left-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-accent-foreground shadow-sm">
            {index + 1}
          </span>

          {/* 회전 버튼 */}
          {onRotate && !isEncrypted && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRotate();
              }}
              className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 shadow-sm transition-opacity duration-150 hover:bg-black/70 group-hover:opacity-100 cursor-pointer"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          )}

          {/* 암호화 경고 */}
          {isEncrypted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/80 backdrop-blur-[2px]">
              <Lock className="h-5 w-5 text-warning" />
              <span className="text-[10px] font-bold text-warning">
                {encryptedLabel ?? "Encrypted"}
              </span>
            </div>
          )}
        </div>

        {/* 파일 정보 */}
        <div className="relative px-3 py-2.5">
          {/* 페이지 선택 툴팁 */}
          {onCardClick && !isEncrypted && selectPagesTooltip && (
            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
              {selectPagesTooltip}
            </span>
          )}
          <p className="truncate text-xs font-medium text-foreground">
            {file.name}
          </p>
          {!pageOrientation && (
            <p className="mt-0.5 text-[11px] text-foreground-muted">
              {formatSize(file.size)}
              {pageCount != null && selectedPageCount != null && selectedPageCount < pageCount ? (
                <span className="text-accent font-bold"> · {selectedPageCount}/{pageCount}p</span>
              ) : pageCount != null ? (
                ` · ${pageCount}p`
              ) : null}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function FileList({
  files,
  rotations = {},
  pageCounts = {},
  pageSelections = {},
  encryptedFiles = new Set(),
  encryptedLabel,
  selectPagesTooltip,
  pageOrientation,
  pageSize,
  pageMargin,
  onRemove,
  onReorder,
  onRotate,
  onCardClick,
  className,
}: FileListProps) {
  const [disableTransition, setDisableTransition] = useState(false);
  const didDragRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  if (files.length === 0) return null;

  const ids = files.map(fileId);

  function handleDragStart() {
    didDragRef.current = true;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setTimeout(() => { didDragRef.current = false; }, 0);

    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    setDisableTransition(true);
    onReorder(arrayMove(files, oldIndex, newIndex));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableTransition(false);
      });
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        <div
          className={cn(
            "grid gap-4",
            files.length === 1 && "grid-cols-1 max-w-[240px] mx-auto",
            files.length === 2 && "grid-cols-2 max-w-[500px] mx-auto",
            files.length >= 3 &&
              "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
            className,
          )}
        >
          {files.map((file, index) => {
            const key = fileId(file);
            return (
              <SortableCard
                key={key}
                file={file}
                index={index}
                rotation={rotations[key] ?? 0}
                pageCount={pageCounts[key]}
                selectedPageCount={pageSelections[key]?.length}
                isEncrypted={encryptedFiles.has(key)}
                encryptedLabel={encryptedLabel}
                onRemove={() => onRemove(index)}
                onRotate={onRotate ? () => onRotate(key) : undefined}
                onCardClick={onCardClick ? () => onCardClick(file) : undefined}
                selectPagesTooltip={selectPagesTooltip}
                pageOrientation={pageOrientation}
                pageSize={pageSize}
                pageMargin={pageMargin}
                disableTransition={disableTransition}
                didDragRef={didDragRef}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
