export interface ProcessingResult {
  blob: Blob;
  filename: string;
  size: number;
  pageCount?: number;
  thumbnailUrl?: string;
}

export type ProcessorFn = (
  files: File[],
  options: Record<string, unknown>,
  onProgress: (percent: number) => void,
) => Promise<ProcessingResult>;

export type ToolStage = "idle" | "loaded" | "processing" | "done" | "error";

export interface ToolState {
  stage: ToolStage;
  files: File[];
  rotations: Record<string, number>;
  pageSelections: Record<string, number[]>; // fileKey → selected page numbers (1-based)
  progress: number;
  result: ProcessingResult | null;
  downloadUrl: string | null;
  error: string | null;
}
