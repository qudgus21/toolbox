"use client";

import { useState, useCallback } from "react";
import { Share2 } from "lucide-react";
import { sendEvent } from "@/lib/analytics";
import { ShareModal } from "./share-modal";

interface ShareButtonProps {
  app?: string;
  shareTitle?: string;
  shareSubtitle?: string;
  copyLabel?: string;
  copiedLabel?: string;
}

export function ShareButton({
  app = "pdf",
  shareTitle = "Share this page",
  shareSubtitle = "Spread the word!",
  copyLabel = "Copy link",
  copiedLabel = "Copied!",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(async () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        sendEvent("share_click", { app, method: "native" });
        return;
      } catch {
        // User cancelled — fall through to modal
      }
    }
    setOpen(true);
  }, [app]);

  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
      </button>
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        title={shareTitle}
        subtitle={shareSubtitle}
        copyLabel={copyLabel}
        copiedLabel={copiedLabel}
        onShare={(method) =>
          sendEvent("share_click", { app, method })
        }
      />
    </>
  );
}
