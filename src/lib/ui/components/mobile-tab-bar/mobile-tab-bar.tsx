import Link from "next/link";
import { appIconMap } from "@/lib/app-icons";
import type { NavApp } from "@/lib/ui/components/app-nav-menu/app-nav-menu";

interface MobileTabBarProps {
  apps: NavApp[];
}

export function MobileTabBar({ apps }: MobileTabBarProps) {
  return (
    <div className="lg:hidden sticky top-[72px] z-40 bg-background border-b border-border">
      <div className="flex overflow-x-auto scrollbar-none px-4">
        {apps.map((app) => {
          const AppIcon = appIconMap[app.slug];
          return (
            <Link
              key={app.slug}
              href={app.href}
              className="flex items-center gap-2 shrink-0 px-4 py-3 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors"
            >
              {AppIcon && <AppIcon className="h-4 w-auto shrink-0" />}
              <span>{app.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
