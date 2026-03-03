"use client";

import { cn } from "@toolbox/utils";
import { ArrowLeft } from "lucide-react";
import { Container } from "../container";

export interface ToolPageLayoutProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export function ToolPageLayout({
  title,
  description,
  backHref = "/",
  backLabel = "Back to all tools",
  children,
  className,
}: ToolPageLayoutProps) {
  return (
    <main className={cn("min-h-[calc(100vh-4rem)] py-12", className)}>
      <Container size="lg">
        <a
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </a>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-3 text-lg text-foreground-muted">{description}</p>
        </div>
        {children}
      </Container>
    </main>
  );
}
