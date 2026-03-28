"use client";

import { cn } from "@/lib/utils";

export interface HeaderProps {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Header({ logo, nav, children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background border-b border-border",
        className,
      )}
    >
      <div className="flex h-18 items-center px-4 lg:px-10">
        {/* Logo — 왼쪽 고정 (너비 고정으로 Nav 중앙 흔들림 방지) */}
        <div className="shrink-0 lg:w-[160px]">
          {logo ?? (
            <a href="/" className="text-lg font-bold text-foreground">
              ToolPop
            </a>
          )}
        </div>

        {/* Nav — 가운데 */}
        {nav && (
          <div className="flex-1 min-w-4 flex justify-center">
            {nav}
          </div>
        )}

        {/* Actions — 오른쪽 고정 (Logo와 동일 너비로 완전 중앙 정렬) */}
        <div className="shrink-0 lg:w-[160px] flex justify-end">
          {children && (
            <nav className="flex items-center gap-3">
              {children}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
