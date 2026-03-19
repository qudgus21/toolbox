"use client";

import { useCallback, useMemo } from "react";
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
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Plus } from "lucide-react";
import { OverlayOptionsComponent } from "./overlay-options";
import { OverlayPreview } from "./overlay-preview";
import type { OverlayLabels } from "./overlay-options";
import type { OverlayOptions } from "@/lib/processors/overlay-types";

// ─── Sortable file item ───

function fileKey(f: File) {
  return `${f.name}-${f.size}-${f.lastModified}`;
}

function SortableFileItem({
  file,
  index,
  roleLabel,
  onRemove,
}: {
  file: File;
  index: number;
  roleLabel: string;
  onRemove: () => void;
}) {
  const id = fileKey(file);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-lg border border-border bg-background-card p-2.5 hover:border-accent/40 transition-colors"
    >
      <button
        type="button"
        className="shrink-0 cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-foreground-subtle/50" />
      </button>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-[10px] text-foreground-subtle">{roleLabel}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded p-1 text-foreground-subtle hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Main layout ───

interface OverlayLayoutProps {
  files: File[];
  options: OverlayOptions;
  onOptionsChange: (options: OverlayOptions) => void;
  onReorderFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onAddMore: () => void;
  labels: OverlayLabels;
}

export function OverlayLayout({
  files,
  options,
  onOptionsChange,
  onReorderFiles,
  onRemoveFile,
  onAddMore,
  labels,
}: OverlayLayoutProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const ids = useMemo(() => files.map(fileKey), [files]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);
      if (oldIndex === -1 || newIndex === -1) return;
      onReorderFiles(arrayMove(files, oldIndex, newIndex));
    },
    [files, ids, onReorderFiles],
  );

  const contentFile = files[0] ?? null;
  const overlayFile = files[1] ?? null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:items-start">
      {/* 좌측: 오버레이 합성 미리보기 */}
      <div className="min-w-0">
        {contentFile ? (
          <OverlayPreview
            contentFile={contentFile}
            overlayFile={overlayFile}
            options={options}
            labels={{
              contentFile: labels.contentFile,
              overlayFile: labels.overlayFile,
              pageLabel: labels.pageLabel,
            }}
          />
        ) : (
          <div className="flex items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-border text-sm text-foreground-subtle">
            {labels.dropOverlay}
          </div>
        )}
      </div>

      {/* 우측: 파일 목록(dnd) + 옵션 */}
      <div className="space-y-4">
        {/* 파일 목록 */}
        <div className="space-y-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              {files.map((f, i) => (
                <SortableFileItem
                  key={fileKey(f)}
                  file={f}
                  index={i}
                  roleLabel={i === 0 ? labels.contentFile : labels.overlayFile}
                  onRemove={() => onRemoveFile(i)}
                />
              ))}
            </SortableContext>
          </DndContext>

          {/* 파일 추가 */}
          {files.length < 2 && (
            <button
              type="button"
              onClick={onAddMore}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border py-4 text-sm text-foreground-subtle hover:border-accent/40 hover:text-accent transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              {labels.dropOverlay}
            </button>
          )}
        </div>

        {/* 옵션 패널 */}
        <OverlayOptionsComponent
          options={options}
          onChange={onOptionsChange}
          labels={labels}
        />
      </div>
    </div>
  );
}
