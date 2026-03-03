"use client";

import { cn } from "@toolbox/utils";
import { Container } from "../container";

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
        "bg-glass backdrop-blur-xl border-b border-glass-border",
        className,
      )}
    >
      <div className="flex h-18 items-center px-6 lg:px-10">
        {/* Logo — 왼쪽 고정 */}
        <div className="shrink-0">
          {logo ?? (
            <a href="/" className="text-lg font-bold text-foreground">
              ToolBox
            </a>
          )}
        </div>

        {/* Nav — 가운데 */}
        {nav && (
          <div className="flex-1 flex justify-center">
            {nav}
          </div>
        )}

        {/* Actions — 오른쪽 고정 */}
        {children && (
          <nav className="shrink-0 flex items-center gap-3">
            {children}
          </nav>
        )}
      </div>
    </header>
  );
}
