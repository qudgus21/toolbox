"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Share2 } from "lucide-react";
import { sendEvent } from "@/lib/analytics";
import dynamic from "next/dynamic";

const ShareModal = dynamic(
  () => import("./share-modal").then((m) => ({ default: m.ShareModal })),
  { ssr: false },
);

function detectApp(pathname: string): string {
  const match = pathname.match(/^\/[^/]+\/(pdf|image|text|converter|calculator)(\/|$)/);
  return match?.[1] ?? "landing";
}

interface ShareButtonProps {
  app?: string;
  shareTitle?: string;
  shareSubtitle?: string;
  copyLabel?: string;
  copiedLabel?: string;
  closeLabel?: string;
  ariaLabel?: string;
}

export function ShareButton({
  app,
  shareTitle = "Share this page",
  shareSubtitle = "Spread the word!",
  copyLabel = "Copy link",
  copiedLabel = "Copied!",
  closeLabel = "Close",
  ariaLabel = "Share",
}: ShareButtonProps) {
  const pathname = usePathname();
  const resolvedApp = app ?? detectApp(pathname);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
        aria-label={ariaLabel}
      >
        <Share2 className="h-4 w-4" />
      </button>
      {open && (
        <ShareModal
          open={open}
          onClose={() => setOpen(false)}
          title={shareTitle}
          subtitle={shareSubtitle}
          copyLabel={copyLabel}
          copiedLabel={copiedLabel}
          closeLabel={closeLabel}
          onShare={(method) =>
            sendEvent("share_click", { app: resolvedApp, method })
          }
        />
      )}
    </>
  );
}
