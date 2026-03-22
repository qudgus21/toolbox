"use client";

import { type ElementType } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Container } from "../container";

export interface ToolPageLayoutProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Hide title/description header (e.g. for full-screen editors) */
  hideHeader?: boolean;
  linkComponent?: ElementType;
}

export function ToolPageLayout({
  title,
  description,
  backHref = "/",
  backLabel = "Back to all tools",
  action,
  children,
  className,
  size = "lg",
  hideHeader = false,
  linkComponent: LinkEl = "a",
}: ToolPageLayoutProps) {
  return (
    <main className={cn("min-h-[calc(100vh-4rem)]", hideHeader ? "py-2 sm:py-3" : "py-6 sm:py-8", className)}>
      <Container size={size}>
        <div className={cn("flex items-center justify-between", hideHeader ? "mb-2" : "mb-4")}>
          <LinkEl
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </LinkEl>
          <div className="h-9 w-9 shrink-0">{action}</div>
        </div>
        {!hideHeader && (
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
            <p className="mt-2 text-base text-foreground-muted">{description}</p>
          </div>
        )}
        {children}
      </Container>
    </main>
  );
}
