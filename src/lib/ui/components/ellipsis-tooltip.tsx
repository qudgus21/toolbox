"use client";

import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface EllipsisTooltipProps {
  text: string;
  className?: string;
  children: React.ReactNode;
}

export function EllipsisTooltip({ text, className, children }: EllipsisTooltipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowTooltip(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  useLayoutEffect(() => {
    if (!showTooltip || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ top: rect.top - 6, left: rect.left });
  }, [showTooltip]);

  return (
    <span
      ref={ref}
      className={cn("block w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip &&
        createPortal(
          <span
            style={{ position: "fixed", top: pos.top, left: pos.left, transform: "translateY(-100%)" }}
            className="z-[9999] max-w-[min(400px,90vw)] whitespace-normal break-all rounded-md bg-foreground text-background px-2 py-1 text-[10px] font-medium shadow-sm pointer-events-none"
          >
            {text}
          </span>,
          document.body,
        )}
    </span>
  );
}
