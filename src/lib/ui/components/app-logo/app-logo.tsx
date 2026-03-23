"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type AppType = "landing" | "pdf" | "image";

const logoConfig: Record<AppType, { from: string; to: string; accent: string; badge?: string; badgeClasses?: string }> = {
  landing: {
    from: "#a855f7",
    to: "#7c3aed",
    accent: "#9333ea",
  },
  pdf: {
    from: "#ef4444",
    to: "#dc2626",
    accent: "#dc2626",
    badge: "PDF",
    badgeClasses: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  },
  image: {
    from: "#6366f1",
    to: "#4f46e5",
    accent: "#6366f1",
    badge: "Image",
    badgeClasses: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",
  },
};

function detectApp(pathname: string): AppType {
  if (pathname.match(/^\/[^/]+\/pdf(\/|$)/)) return "pdf";
  if (pathname.match(/^\/[^/]+\/image(\/|$)/)) return "image";
  return "landing";
}

export function AppLogo() {
  const pathname = usePathname();
  const app = detectApp(pathname);
  const config = logoConfig[app];
  // Extract locale from pathname (first segment)
  const locale = pathname.split("/")[1] || "ko";

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-2 text-lg font-bold text-foreground"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.from} />
            <stop offset="100%" stopColor={config.to} />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="7" fill="url(#logo-bg)" />
        <text x="16" y="21.5" fontFamily="system-ui,-apple-system,sans-serif" fontSize="15" fontWeight="800" fill="white" textAnchor="middle" letterSpacing="-0.5">T</text>
        <circle cx="25" cy="8" r="3.5" fill="#fbbf24" />
        <circle cx="25" cy="8" r="1.5" fill="white" />
      </svg>
      <span>Tool<span style={{ color: config.accent }}>Pop</span></span>
      {config.badge && (
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold leading-none ${config.badgeClasses}`}>
          {config.badge}
        </span>
      )}
    </Link>
  );
}
