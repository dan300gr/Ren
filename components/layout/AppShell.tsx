"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import type { NavId } from "@/types";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  activeNav?: NavId;
  showFooter?: boolean;
  className?: string;
  theme?: "dark" | "light";
}

/**
 * Contenedor principal: fondo oscuro exterior + tarjeta redondeada interior.
 * Replica el marco del diseño de referencia.
 */
export function AppShell({
  children,
  activeNav,
  showFooter = true,
  className,
  theme = "light",
}: AppShellProps) {
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "min-h-screen p-3 md:p-5 lg:p-6 flex items-stretch",
        isLight ? "bg-white" : "bg-[#141210]"
      )}
    >
      <div
        className={cn(
          "flex flex-col w-full max-w-[1400px] mx-auto rounded-[28px] md:rounded-[32px] overflow-hidden",
          isLight
            ? "bg-white border border-rose-200/50 shadow-xl shadow-rose-900/[0.04]"
            : "bg-[#1C1917] border border-white/[0.06] shadow-2xl shadow-black/40",
          className
        )}
      >
        <Navbar activeId={activeNav} theme={theme} />
        <main className="flex-1 flex flex-col min-h-0">{children}</main>
        {showFooter && <SiteFooter />}
      </div>
    </div>
  );
}
