import { processViaLambda, type LambdaGroup } from "./lambda-client";
import type { ProcessorFn, ProcessingResult } from "@/lib/pdf/types";
import type { ImageProcessorFn, ImageProcessingResult } from "@/lib/image/types";

interface ServerToolConfig {
  tool: string;
  group: LambdaGroup;
}

/**
 * PDF 서버 프로세서 생성 팩토리.
 * 기존 ProcessorFn 인터페이스를 그대로 구현하여 UI 변경 없이 사용 가능.
 */
export function createPdfServerProcessor(config: ServerToolConfig): ProcessorFn {
  const processor: ProcessorFn = async (
    files,
    options,
    onProgress,
  ): Promise<ProcessingResult> => {
    const file = files[0];
    const { blob, filename, size } = await processViaLambda(
      file,
      config.tool,
      config.group,
      options,
      onProgress,
    );
    return { blob, filename, size };
  };
  return processor;
}

/**
 * Image 서버 프로세서 생성 팩토리.
 * 기존 ImageProcessorFn 인터페이스를 그대로 구현하여 UI 변경 없이 사용 가능.
 */
export function createImageServerProcessor(config: ServerToolConfig): ImageProcessorFn {
  const processor: ImageProcessorFn = async (
    files,
    options,
    onProgress,
  ): Promise<ImageProcessingResult> => {
    const file = files[0];
    const { blob, filename, size } = await processViaLambda(
      file,
      config.tool,
      config.group,
      options,
      onProgress,
    );
    return { blob, filename, size };
  };
  return processor;
}
