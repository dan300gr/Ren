import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import type { NavId } from "@/types";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  activeNav?: NavId;
  showFooter?: boolean;
  className?: string;
}

export function AppShell({
  children,
  activeNav,
  showFooter = true,
  className,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas p-2 sm:p-3 lg:p-5">
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100dvh-1rem)] w-full max-w-[var(--container-max)] flex-col overflow-clip rounded-[var(--radius-lg)] border border-border bg-background shadow-[var(--shadow-soft)] sm:min-h-[calc(100dvh-1.5rem)] sm:rounded-[var(--radius-xl)] lg:min-h-[calc(100dvh-2.5rem)]",
          className
        )}
      >
        <a
          href="#contenido"
          className="sr-only z-[100] rounded-full bg-foreground px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <Navbar activeId={activeNav} />
        <main id="contenido" className="min-w-0 flex-1">
          {children}
        </main>
        {showFooter && <SiteFooter />}
      </div>
    </div>
  );
}
