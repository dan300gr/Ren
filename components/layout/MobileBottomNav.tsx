"use client";

import Link from "next/link";
import {
  Camera,
  Home,
  Mail,
  Music,
  Sparkles,
} from "lucide-react";
import { NAV_LINKS } from "@/constants";
import type { NavId } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<NavId, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  inicio: Home,
  cartas: Mail,
  musica: Music,
  nosotros: Camera,
  mensajito: Sparkles,
};

interface MobileBottomNavProps {
  activeId: NavId;
  theme?: "dark" | "light";
}

/** Barra de navegación inferior móvil con iconos. */
export function MobileBottomNav({ activeId, theme = "light" }: MobileBottomNavProps) {
  const isLight = theme === "light";

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      aria-label="Navegación inferior"
    >
      <div
        className={cn(
          "mx-auto max-w-md flex justify-around items-center rounded-[22px] backdrop-blur-xl py-2.5 px-2",
          isLight
            ? "border border-rose-200/70 bg-white/95 shadow-xl shadow-rose-900/[0.06]"
            : "border border-white/10 bg-[#1C1917]/90 shadow-2xl"
        )}
      >
        {NAV_LINKS.map((link) => {
          const Icon = ICONS[link.id];
          const isActive = activeId === link.id;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[52px]",
                isActive
                  ? isLight
                    ? "text-rose-500 bg-rose-50"
                    : "text-rose-400 bg-rose-400/10"
                  : isLight
                    ? "text-warm-600 hover:text-warm-800"
                    : "text-cream-100/40 hover:text-cream-100/60"
              )}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
