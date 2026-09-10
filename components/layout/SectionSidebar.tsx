"use client";

import Link from "next/link";
import {
  Camera,
  Heart,
  Home,
  Mail,
  Music,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/constants";
import type { NavId } from "@/types";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

const ICONS: Record<NavId, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  inicio: Home,
  cartas: Mail,
  musica: Music,
  recuerdos: Camera,
  mensajitos: Sparkles,
};

interface SectionSidebarProps {
  activeId: NavId;
  theme?: "dark" | "light";
}

/** Sidebar vertical con iconos — diseño Cartas escritorio. */
export function SectionSidebar({ activeId, theme = "light" }: SectionSidebarProps) {
  const mounted = useMounted();
  const isLight = theme === "light";

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col items-center w-[72px] xl:w-[80px] shrink-0 py-6",
        isLight
          ? "border-r border-rose-200/50 bg-cream-50/80"
          : "border-r border-white/[0.06] bg-black/20 backdrop-blur-xl"
      )}
      aria-label="Navegación lateral"
    >
      <Link
        href="/"
        className={cn(
          "font-handwriting text-sm text-center leading-tight px-2 mb-8 hover:opacity-80 transition-opacity",
          isLight ? "text-warm-900" : "text-cream-100/90"
        )}
        aria-label="Ir al inicio"
      >
        para
        <br />
        Ren <span className="text-rose-500">♡</span>
      </Link>

      <nav className="flex flex-col gap-2 flex-1">
        {NAV_LINKS.map((link) => {
          const Icon = ICONS[link.id];
          const isActive = activeId === link.id;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-xl transition-all",
                isActive
                  ? isLight
                    ? "bg-rose-50 text-rose-500 shadow-sm border border-rose-200/60"
                    : "bg-white/15 text-cream-100 shadow-inner"
                  : isLight
                    ? "text-warm-600 hover:text-warm-900 hover:bg-rose-50/60"
                    : "text-cream-100/40 hover:text-cream-100/70 hover:bg-white/5"
              )}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {isActive && mounted && (
                <motion.span
                  layoutId="sidebar-active"
                  className={cn(
                    "absolute inset-0 rounded-xl border",
                    isLight ? "border-rose-300/40" : "border-white/10"
                  )}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className={cn(
          "mt-auto flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-default",
          isLight
            ? "border border-rose-200/80 bg-rose-50 text-rose-500 hover:bg-rose-100"
            : "border border-white/10 bg-white/5 text-rose-400 hover:bg-white/10"
        )}
        aria-label="Favorito"
      >
        <Heart className="h-4 w-4" fill="currentColor" fillOpacity={0.2} />
      </button>
    </aside>
  );
}
