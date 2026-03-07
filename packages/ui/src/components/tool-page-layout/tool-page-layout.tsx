"use client";

import { cn } from "@toolbox/utils";
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
}

export function ToolPageLayout({
  title,
  description,
  backHref = "/",
  backLabel = "Back to all tools",
  action,
  children,
  className,
}: ToolPageLayoutProps) {
  return (
    <main className={cn("min-h-[calc(100vh-4rem)] py-6 sm:py-8", className)}>
      <Container size="lg">
        <div className="flex items-center justify-between mb-4">
          <a
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </a>
          {action && <div>{action}</div>}
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-2 text-base text-foreground-muted">{description}</p>
        </div>
        {children}
      </Container>
    </main>
  );
}
