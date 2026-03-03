import { cn } from "@toolbox/utils";
import { Container } from "../container";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border py-8", className)}>
      <Container size="xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} ToolBox. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-foreground-subtle hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-foreground-subtle hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
