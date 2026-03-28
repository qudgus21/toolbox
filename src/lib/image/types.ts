export interface ImageProcessingResult {
  blob: Blob;
  filename: string;
  size: number;
  width?: number;
  height?: number;
  previewUrl?: string;
}

export type ImageProcessorFn = (
  files: File[],
  options: Record<string, unknown>,
  onProgress: (percent: number) => void,
) => Promise<ImageProcessingResult>;

export type ImageToolStage = "idle" | "loaded" | "processing" | "done" | "error";

export interface ImageToolState {
  stage: ImageToolStage;
  files: File[];
  progress: number;
  result: ImageProcessingResult | null;
  downloadUrl: string | null;
  error: string | null;
}
