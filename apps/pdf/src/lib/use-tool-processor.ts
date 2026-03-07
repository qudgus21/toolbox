"use client";

import { useCallback, useRef, useState } from "react";
import type { ToolState, ProcessingResult } from "./types";
import { getProcessor } from "./processor-registry";

const INITIAL_STATE: ToolState = {
  stage: "idle",
  files: [],
  rotations: {},
  pageSelections: {},
  progress: 0,
  result: null,
  error: null,
};

export function useToolProcessor(slug: string) {
  const [state, setState] = useState<ToolState>(INITIAL_STATE);
  const resultUrlRef = useRef<string | null>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    setState((prev) => ({
      ...prev,
      stage: "loaded",
      files: [...prev.files, ...newFiles],
      error: null,
    }));
  }, []);

  const removeFile = useCallback((index: number) => {
    setState((prev) => {
      const files = prev.files.filter((_, i) => i !== index);
      return {
        ...prev,
        files,
        stage: files.length === 0 ? "idle" : "loaded",
      };
    });
  }, []);

  const reorderFiles = useCallback((files: File[]) => {
    setState((prev) => ({ ...prev, files }));
  }, []);

  const rotateFile = useCallback((fileKey: string) => {
    setState((prev) => ({
      ...prev,
      rotations: {
        ...prev.rotations,
        [fileKey]: ((prev.rotations[fileKey] ?? 0) + 90) % 360,
      },
    }));
  }, []);

  const setPageSelection = useCallback((fileKey: string, pages: number[]) => {
    setState((prev) => ({
      ...prev,
      pageSelections: {
        ...prev.pageSelections,
        [fileKey]: pages,
      },
    }));
  }, []);

  const sortFiles = useCallback(
    (by: "name-asc" | "name-desc" | "size-asc" | "size-desc") => {
      setState((prev) => {
        const sorted = [...prev.files].sort((a, b) => {
          switch (by) {
            case "name-asc":
              return a.name.localeCompare(b.name);
            case "name-desc":
              return b.name.localeCompare(a.name);
            case "size-asc":
              return a.size - b.size;
            case "size-desc":
              return b.size - a.size;
          }
        });
        return { ...prev, files: sorted };
      });
    },
    [],
  );

  const process = useCallback(
    async (options: Record<string, unknown> = {}) => {
      setState((prev) => ({
        ...prev,
        stage: "processing",
        progress: 0,
        error: null,
      }));

      try {
        const processor = await getProcessor(slug);
        if (!processor) {
          throw new Error(`Processor not found: ${slug}`);
        }

        const result = await processor(
          state.files,
          options,
          (progress) => setState((prev) => ({ ...prev, progress })),
        );

        setState((prev) => ({
          ...prev,
          stage: "done",
          progress: 100,
          result,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          stage: "error",
          error: err instanceof Error ? err.message : "Processing failed",
        }));
      }
    },
    [slug, state.files],
  );

  const download = useCallback((customFilename?: string) => {
    if (!state.result) return;

    // 이전 URL 해제
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
    }

    const url = URL.createObjectURL(state.result.blob);
    resultUrlRef.current = url;

    const a = document.createElement("a");
    a.href = url;
    a.download = customFilename ?? state.result.filename;
    a.click();
  }, [state.result]);

  const reset = useCallback(() => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    addFiles,
    removeFile,
    reorderFiles,
    rotateFile,
    setPageSelection,
    sortFiles,
    process,
    download,
    reset,
  };
}
