"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { EditorToolbar } from "./editor-toolbar";
import { EditorPropertiesPanel } from "./editor-properties-panel";
import { EditorPageNavigator } from "./editor-page-navigator";

// Konva requires window — must skip SSR
const EditorCanvas = dynamic(() => import("./editor-canvas").then((m) => ({ default: m.EditorCanvas })), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center bg-background-muted">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  ),
});
import { useEditorStore } from "./use-editor-store";
import { usePdfPages } from "./use-pdf-pages";
import type { EditPdfLabels, EditorElement } from "./editor-types";

export type { EditPdfLabels };

interface EditorLayoutProps {
  file: File;
  labels: EditPdfLabels;
  onAnnotationsChange: (annotations: EditorElement[]) => void;
}

export function EditorLayout({
  file,
  labels,
  onAnnotationsChange,
}: EditorLayoutProps) {
  const { state, dispatch, undo, redo } = useEditorStore();
  const { pages, loading } = usePdfPages(file);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Load pages into editor state
  useEffect(() => {
    if (pages.length > 0) {
      dispatch({ type: "SET_PAGES", pages });
    }
  }, [pages, dispatch]);

  // Notify parent of annotation changes
  useEffect(() => {
    onAnnotationsChange(state.annotations);
  }, [state.annotations, onAnnotationsChange]);

  // Measure canvas container
  useEffect(() => {
    const el = canvasContainerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;

      // Ctrl/Cmd + Z = Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y = Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      // Delete / Backspace = delete selected
      if ((e.key === "Delete" || e.key === "Backspace") && state.selectedElementId) {
        e.preventDefault();
        dispatch({ type: "DELETE_ELEMENT", id: state.selectedElementId });
      }
      // Escape = deselect / switch to select tool
      if (e.key === "Escape") {
        dispatch({ type: "SET_TOOL", tool: "select" });
        dispatch({ type: "SELECT_ELEMENT", id: null });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, state.selectedElementId, dispatch]);

  const selectedElement = state.annotations.find(
    (a) => a.id === state.selectedElementId,
  ) ?? null;

  // Show right panel only when an element is selected
  const showPanel = selectedElement !== null;

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-foreground-muted">Loading PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[500px] flex-col overflow-hidden rounded-xl border border-border bg-background">
      {/* Top Toolbar */}
      <EditorToolbar
        state={state}
        dispatch={dispatch}
        onUndo={undo}
        onRedo={redo}
        labels={labels}
      />

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Page Navigator */}
        <EditorPageNavigator
          state={state}
          dispatch={dispatch}
          labels={labels}
        />

        {/* Center: Canvas */}
        <div ref={canvasContainerRef} className="flex-1 overflow-auto">
          <EditorCanvas
            state={state}
            dispatch={dispatch}
            containerWidth={canvasSize.width}
            containerHeight={canvasSize.height}
          />
        </div>

        {/* Right: Properties Panel */}
        {showPanel && (
          <div className="w-[220px] border-l border-border bg-background lg:w-[260px]">
            <EditorPropertiesPanel
              element={selectedElement}
              dispatch={dispatch}
              labels={labels}
            />
          </div>
        )}
      </div>
    </div>
  );
}
