"use client";

import { forwardRef, type ElementType } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@toolbox/utils";

export interface ToolCardProps extends Omit<HTMLMotionProps<"a">, "children"> {
  href: string;
  icon: ElementType;
  title: string;
  description: string;
  emoji?: string;
  iconColorClasses?: { bg: string; text: string; bgHover: string; textHover: string };
}

export const ToolCard = forwardRef<HTMLAnchorElement, ToolCardProps>(
  ({ href, icon: Icon, title, description, emoji, iconColorClasses, className, ...props }, ref) => (
    <motion.a
      ref={ref}
      href={href}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-xl border border-border/60 bg-background-elevated px-6 py-7 shadow-sm",
        "transition-colors duration-200",
        "hover:border-accent/50 hover:shadow-md",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        {emoji && <span className="text-4xl leading-none">{emoji}</span>}
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
            iconColorClasses
              ? cn(iconColorClasses.bg, iconColorClasses.text, iconColorClasses.bgHover, iconColorClasses.textHover)
              : "bg-accent-muted text-accent group-hover:bg-accent group-hover:text-accent-foreground",
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-foreground-muted">{description}</p>
      </div>
    </motion.a>
  ),
);
ToolCard.displayName = "ToolCard";
