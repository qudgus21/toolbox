"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ToolState } from "./types";
import { getProcessor } from "./processor-registry";
import { sendEvent } from "@/lib/analytics";

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
  const filesRef = useRef<File[]>(state.files);
  filesRef.current = state.files;

  // 언마운트 시 Object URL 해제 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
        resultUrlRef.current = null;
      }
    };
  }, []);

  const addFiles = useCallback((newFiles: File[]) => {
    setState((prev) => {
      if (prev.stage === "idle") {
        const totalSizeKb = Math.round(newFiles.reduce((s, f) => s + f.size, 0) / 1024);
        queueMicrotask(() => sendEvent("file_upload", { app: "pdf", tool_slug: slug, file_count: newFiles.length, total_size_kb: totalSizeKb }));
      }
      return {
        ...prev,
        stage: "loaded",
        files: [...prev.files, ...newFiles],
        error: null,
      };
    });
  }, [slug]);

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

        const currentFiles = filesRef.current;
        const startTime = performance.now();
        const result = await processor(
          currentFiles,
          options,
          (progress) => setState((prev) => ({ ...prev, progress })),
        );
        const durationMs = Math.round(performance.now() - startTime);

        sendEvent("process_complete", {
          app: "pdf",
          tool_slug: slug,
          duration_ms: durationMs,
          output_size_kb: Math.round(result.size / 1024),
        });

        setState((prev) => ({
          ...prev,
          stage: "done",
          progress: 100,
          result,
        }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Processing failed";
        sendEvent("process_error", { app: "pdf", tool_slug: slug, error_message: errorMessage });
        setState((prev) => ({
          ...prev,
          stage: "error",
          error: errorMessage,
        }));
      }
    },
    [slug],
  );

  const download = useCallback((customFilename?: string) => {
    if (!state.result) return;

    const filename = customFilename ?? state.result.filename;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // iOS Safari: blob URL은 <a download>에서 동작 안 함 → data URL로 변환
      const reader = new FileReader();
      reader.onload = () => {
        const a = document.createElement("a");
        a.href = reader.result as string;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      reader.readAsDataURL(state.result.blob);
      return;
    }

    // 이전 URL 해제
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
    }

    const url = URL.createObjectURL(state.result.blob);
    resultUrlRef.current = url;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
