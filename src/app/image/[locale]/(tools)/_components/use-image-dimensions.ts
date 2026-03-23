"use client";

import { useEffect, useState } from "react";

interface ImageDimensions {
  width: number;
  height: number;
  loading: boolean;
}

export function useImageDimensions(file: File | null): ImageDimensions {
  const [state, setState] = useState<ImageDimensions>({
    width: 0,
    height: 0,
    loading: true,
  });

  useEffect(() => {
    if (!file) {
      setState({ width: 0, height: 0, loading: false });
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      setState({
        width: img.naturalWidth,
        height: img.naturalHeight,
        loading: false,
      });
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      setState({ width: 0, height: 0, loading: false });
      URL.revokeObjectURL(url);
    };

    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return state;
}
