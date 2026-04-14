/**
 * Next.js API Route를 통한 Lambda 파일 처리.
 * 브라우저 → /api/process → AWS SDK InvokeCommand → Lambda.
 * phos와 동일한 패턴.
 */

export type LambdaGroup = "pdf" | "office" | "image";

interface ProcessResponse {
  file: string; // base64
  filename: string;
  size: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (Vercel payload 제한 고려)

export async function processViaLambda(
  file: File,
  tool: string,
  group: LambdaGroup,
  options: Record<string, unknown>,
  onProgress: (percent: number) => void,
): Promise<{ blob: Blob; filename: string; size: number }> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("파일이 너무 큽니다 (최대 5MB)");
  }

  // Step 1: 파일 → base64 (0-20%)
  onProgress(5);
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  onProgress(20);

  // Step 2: API Route 호출 (20-85%)
  onProgress(25);
  const res = await fetch("/api/process", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool,
      file: base64,
      filename: file.name,
      options,
      group,
    }),
  });
  onProgress(80);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as Record<string, string>).error ?? `처리 실패 (${res.status})`,
    );
  }

  const result: ProcessResponse = await res.json();
  onProgress(90);

  // Step 3: base64 → Blob (90-100%)
  const binaryString = atob(result.file);
  const resultBytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    resultBytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([resultBytes]);
  onProgress(100);

  return { blob, filename: result.filename, size: result.size };
}
