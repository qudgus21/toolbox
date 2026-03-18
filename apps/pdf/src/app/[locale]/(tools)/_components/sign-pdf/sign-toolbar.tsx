"use client";

import { Undo2, Redo2, FileUp } from "lucide-react";
import type { SignState, SignPdfLabels } from "./sign-types";

interface SignToolbarProps {
  state: SignState;
  onUndo: () => void;
  onRedo: () => void;
  labels: SignPdfLabels;
  onChangeFile: () => void;
}

export function SignToolbar({ state, onUndo, onRedo, labels, onChangeFile }: SignToolbarProps) {
  const canUndo = state.history.past.length > 0;
  const canRedo = state.history.future.length > 0;

  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background-muted disabled:cursor-default disabled:opacity-30"
          title={labels.undo}
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background-muted disabled:cursor-default disabled:opacity-30"
          title={labels.redo}
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={onChangeFile}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:bg-background-muted"
      >
        <FileUp className="h-4 w-4" />
        {labels.changeFile}
      </button>
    </div>
  );
}
