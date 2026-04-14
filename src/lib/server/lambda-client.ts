/**
 * Lambda Function URL을 통한 파일 처리.
 * phos 스타일: base64로 파일 전송 → Lambda 처리 → base64로 결과 수신.
 * S3, API Gateway 없이 Lambda만 사용.
 */

// 각 Lambda Function URL (배포 후 설정)
const FUNCTION_URLS: Record<LambdaGroup, string> = {
  pdf: process.env.NEXT_PUBLIC_LAMBDA_PDF_URL ?? "",
  office: process.env.NEXT_PUBLIC_LAMBDA_OFFICE_URL ?? "",
  image: process.env.NEXT_PUBLIC_LAMBDA_IMAGE_URL ?? "",
};

export type LambdaGroup = "pdf" | "office" | "image";

interface LambdaResponse {
  file: string; // base64
  filename: string;
  size: number;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export async function processViaLambda(
  file: File,
  tool: string,
  group: LambdaGroup,
  options: Record<string, unknown>,
  onProgress: (percent: number) => void,
): Promise<{ blob: Blob; filename: string; size: number }> {
  const url = FUNCTION_URLS[group];
  if (!url) throw new Error(`Lambda URL not configured for group: ${group}`);

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large (max 20MB)");
  }

  // Step 1: 파일 → base64 (0-20%)
  onProgress(5);
  const arrayBuffer = await file.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ""),
  );
  onProgress(20);

  // Step 2: Lambda 호출 (20-80%)
  onProgress(25);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool,
      file: base64,
      filename: file.name,
      options,
    }),
  });
  onProgress(80);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as Record<string, string>).error ?? `Processing failed (${res.status})`);
  }

  const result: LambdaResponse = await res.json();
  onProgress(90);

  // Step 3: base64 → Blob (90-100%)
  const binaryString = atob(result.file);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes]);
  onProgress(100);

  return { blob, filename: result.filename, size: result.size };
}
