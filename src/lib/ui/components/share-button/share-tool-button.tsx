"use client";

import { useState, useCallback } from "react";
import { Share2 } from "lucide-react";
import { sendEvent } from "@/lib/analytics";
import { ShareModal } from "./share-modal";

interface ShareToolButtonProps {
  label: string;
  shareTitle: string;
  shareSubtitle: string;
  copyLabel: string;
  copiedLabel: string;
  app?: string;
  toolSlug?: string;
}

export function ShareToolButton({
  label,
  shareTitle,
  shareSubtitle,
  copyLabel,
  copiedLabel,
  app = "pdf",
  toolSlug,
}: ShareToolButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(async () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        sendEvent("share_click", { app, method: "native", tool_slug: toolSlug });
        return;
      } catch {
        // User cancelled
      }
    }
    setOpen(true);
  }, [app, toolSlug]);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <Share2 className="h-4 w-4" />
        {label}
      </button>
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        title={shareTitle}
        subtitle={shareSubtitle}
        copyLabel={copyLabel}
        copiedLabel={copiedLabel}
        onShare={(method) =>
          sendEvent("share_click", { app, method, tool_slug: toolSlug })
        }
      />
    </>
  );
}
