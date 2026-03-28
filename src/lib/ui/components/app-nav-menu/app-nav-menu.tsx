import Link from "next/link";
import { appIconMap } from "@/lib/app-icons";

export interface NavApp {
  slug: string;
  label: string;
  href: string;
}

interface AppNavMenuProps {
  apps: NavApp[];
  menuLabel?: string;
}

export function AppNavMenu({ apps }: AppNavMenuProps) {
  return (
    <div className="hidden lg:flex items-center gap-2">
      {apps.map((app) => {
        const AppIcon = appIconMap[app.slug];
        return (
          <Link
            key={app.slug}
            href={app.href}
            className="flex items-center gap-2 px-3.5 py-2 text-lg font-semibold text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-background-muted"
          >
            {AppIcon && <AppIcon className="h-5 w-auto shrink-0" />}
            <span>{app.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
