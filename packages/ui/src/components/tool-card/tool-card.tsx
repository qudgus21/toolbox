"use client";

import { forwardRef, type ElementType, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@toolbox/utils";

export interface ToolCardProps extends Omit<HTMLMotionProps<"a">, "children"> {
  href: string;
  icon?: ElementType;
  title: string;
  description: string;
  emoji?: string;
  toolIcon?: ReactNode;
  iconColorClasses?: { bg: string; text: string; bgHover: string; textHover: string };
}

export const ToolCard = forwardRef<HTMLAnchorElement, ToolCardProps>(
  ({ href, icon: _Icon, title, description, emoji, toolIcon, iconColorClasses: _colors, className, ...props }, ref) => (
    <motion.a
      ref={ref}
      href={href}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-xl border border-border/60 bg-background-elevated px-6 py-6 shadow-sm",
        "transition-colors duration-200",
        "hover:border-accent/50 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {toolIcon ? (
        <span className="h-10 w-auto flex items-center">{toolIcon}</span>
      ) : emoji ? (
        <span className="text-4xl leading-none">{emoji}</span>
      ) : null}
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-foreground-muted">{description}</p>
      </div>
    </motion.a>
  ),
);
ToolCard.displayName = "ToolCard";
