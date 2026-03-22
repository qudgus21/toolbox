import { useEffect, useState } from "react";
import {
  readPdfMetadata,
  type PdfMetadata,
} from "@/lib/pdf/processors/edit-metadata";

/**
 * PDF 파일에서 기존 메타데이터를 읽어오는 훅.
 * 파일이 바뀔 때마다 자동으로 다시 읽는다.
 */
export function usePdfMetadata(file: File | null) {
  const [metadata, setMetadata] = useState<PdfMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      setMetadata(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    readPdfMetadata(file)
      .then((m) => {
        if (!cancelled) setMetadata(m);
      })
      .catch(() => {
        if (!cancelled) setMetadata(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [file]);

  return { metadata, loading };
}
