"use client";

import { motion } from "framer-motion";
import { cn } from "@toolbox/utils";
import { ProgressBar } from "./progress-bar";

interface ProcessingOverlayProps {
  progress: number;
  label?: string;
  className?: string;
}

export function ProcessingOverlay({
  progress,
  label = "Processing...",
  className,
}: ProcessingOverlayProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8 rounded-2xl border border-border-muted bg-background-elevated p-16",
        className,
      )}
    >
      {/* 펄스 애니메이션이 있는 아이콘 */}
      <div className="relative flex items-center justify-center">
        {/* 바깥 펄스 링 */}
        <motion.div
          className="absolute h-20 w-20 rounded-full bg-accent/10"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-20 w-20 rounded-full bg-accent/10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* 중앙 아이콘 */}
        <motion.div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-muted"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="h-8 w-8 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
            <motion.path
              d="M12 18v-6"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M9 15l3-3 3 3"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </svg>
        </motion.div>
      </div>

      {/* 프로그레스 바 + 텍스트 */}
      <div className="w-full max-w-xs space-y-3 text-center">
        <ProgressBar progress={progress} />
        <p className="text-sm font-medium text-foreground-muted">
          {label} <span className="text-foreground">{Math.round(progress)}%</span>
        </p>
      </div>
    </div>
  );
}
