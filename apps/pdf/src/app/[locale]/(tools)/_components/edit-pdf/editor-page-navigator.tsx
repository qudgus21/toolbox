"use client";

import { type EditorState, type EditPdfLabels } from "./editor-types";
import type { EditorDispatch } from "./use-editor-store";

interface EditorPageNavigatorProps {
  state: EditorState;
  dispatch: EditorDispatch;
  labels: EditPdfLabels;
}

export function EditorPageNavigator({
  state,
  dispatch,
  labels,
}: EditorPageNavigatorProps) {
  const { pages, activePageIndex, annotations } = state;

  if (pages.length <= 1) return null;

  return (
    <div className="flex w-[100px] flex-col gap-2 overflow-y-auto border-r border-border bg-background p-2 lg:w-[120px]">
      <div className="text-center text-xs text-foreground-muted">
        {pages.length} {labels.pageOf.split(" ").pop()}
      </div>
      {pages.map((page, idx) => {
        const isActive = idx === activePageIndex;
        const annotationCount = annotations.filter(
          (a) => a.pageIndex === idx,
        ).length;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => dispatch({ type: "SET_PAGE", index: idx })}
            className={`relative overflow-hidden rounded-md border-2 transition-all ${
              isActive
                ? "border-accent shadow-sm"
                : "border-border hover:border-foreground-muted"
            }`}
          >
            <div className="relative aspect-[3/4] w-full bg-white">
              <img
                src={page.imageUrl}
                alt={`Page ${idx + 1}`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-center gap-1 bg-background py-0.5 text-[10px] text-foreground-muted">
              <span>{idx + 1}</span>
              {annotationCount > 0 && (
                <span className="rounded-full bg-accent/10 px-1 text-accent">
                  {annotationCount}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
