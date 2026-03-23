"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy } from "lucide-react";
import { createPortal } from "react-dom";

const socialLinks = [
  {
    name: "X",
    key: "twitter" as const,
    color: "hover:bg-[#1da1f2]/10 hover:text-[#1da1f2] dark:hover:bg-[#1da1f2]/20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Facebook",
    key: "facebook" as const,
    color: "hover:bg-[#1877f2]/10 hover:text-[#1877f2] dark:hover:bg-[#1877f2]/20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.044 1.613.115v3.146c-.427-.044-.72-.065-.95-.065-1.35 0-1.872.513-1.872 1.846v2.516h3.332l-.468 3.667h-2.864v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z" />
      </svg>
    ),
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    key: "whatsapp" as const,
    color: "hover:bg-[#25d366]/10 hover:text-[#25d366] dark:hover:bg-[#25d366]/20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "LinkedIn",
    key: "linkedin" as const,
    color: "hover:bg-[#0a66c2]/10 hover:text-[#0a66c2] dark:hover:bg-[#0a66c2]/20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  copyLabel: string;
  copiedLabel: string;
  onShare?: (method: string) => void;
}

export function ShareModal({
  open,
  onClose,
  title,
  subtitle,
  copyLabel,
  copiedLabel,
  onShare,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      setUrl(window.location.href);
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    onShare?.("copy");
    setTimeout(() => setCopied(false), 2000);
  }, [url, onShare]);

  function handleSocial(link: (typeof socialLinks)[number]) {
    window.open(
      link.getUrl(url, document.title),
      "_blank",
      "noopener,noreferrer,width=600,height=400",
    );
    onShare?.(link.key);
  }

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-md rounded-2xl bg-background p-8 shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {title}
                </h2>
                <p className="mt-2 text-foreground-muted">
                  {subtitle}
                </p>
              </div>

              {/* Social icons */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {socialLinks.map((link) => (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => handleSocial(link)}
                    className={`flex h-14 w-14 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-200 cursor-pointer ${link.color}`}
                    aria-label={`Share on ${link.name}`}
                  >
                    {link.icon}
                  </button>
                ))}
              </div>

              {/* Copy link bar */}
              <div className="flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.03] px-4 py-3">
                <span className="flex-1 truncate text-sm text-foreground-muted select-all">
                  {url}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    copied
                      ? "bg-success/10 text-success"
                      : "bg-accent/10 text-accent hover:bg-accent/20"
                  }`}
                >
                  {copied ? (
                    <span className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5" />
                      {copiedLabel}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Copy className="h-3.5 w-3.5" />
                      {copyLabel}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
