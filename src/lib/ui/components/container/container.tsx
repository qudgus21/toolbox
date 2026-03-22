import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const containerSizes = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
} as const;

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizes;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", containerSizes[size], className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";
