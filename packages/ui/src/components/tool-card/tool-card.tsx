"use client";

import { forwardRef, type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@toolbox/utils";

export interface ToolCardProps {
  href: string;
  icon?: ElementType;
  title: string;
  description: string;
  emoji?: string;
  toolIcon?: ReactNode;
  iconColorClasses?: { bg: string; text: string; bgHover: string; textHover: string };
  linkComponent?: ElementType;
  className?: string;
  [key: `data-${string}`]: unknown;
}

export const ToolCard = forwardRef<HTMLDivElement, ToolCardProps>(
  ({ href, icon: _Icon, title, description, emoji, toolIcon, iconColorClasses: _colors, className, linkComponent: LinkEl = "a", ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
      {...props}
    >
      <LinkEl
        href={href}
        className={cn(
          "group flex h-full flex-col gap-4 rounded-xl border border-border/60 bg-background-elevated px-6 py-6 shadow-sm",
          "transition-colors duration-200",
          "hover:border-accent/50 hover:shadow-md",
          className,
        )}
      >
        {toolIcon ? (
          <span className="h-10 w-auto flex items-center">{toolIcon}</span>
        ) : emoji ? (
          <span className="text-4xl leading-none">{emoji}</span>
        ) : null}
        <div>
          <span className="block text-base font-semibold text-foreground">{title}</span>
          <p className="mt-1 text-sm text-foreground-muted">{description}</p>
        </div>
      </LinkEl>
    </motion.div>
  ),
);
ToolCard.displayName = "ToolCard";
