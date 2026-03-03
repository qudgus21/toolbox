"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@toolbox/utils";

const buttonVariants = {
  variant: {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
    ghost:
      "hover:bg-secondary text-foreground",
    outline:
      "border border-border bg-transparent hover:bg-secondary text-foreground",
    accent:
      "bg-accent text-accent-foreground hover:bg-accent-hover shadow-xs",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive-hover shadow-xs",
  },
  size: {
    sm: "h-8 px-3 text-sm rounded-md gap-1.5",
    md: "h-10 px-4 text-sm rounded-lg gap-2",
    lg: "h-12 px-6 text-base rounded-lg gap-2.5",
  },
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className,
        )}
        disabled={disabled}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
