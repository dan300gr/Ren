"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/constants";
import type { NavId } from "@/types";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeId?: NavId;
  theme?: "dark" | "light";
}

/** Barra de navegación superior según diseño de referencia. */
export function Navbar({ activeId, theme = "light" }: NavbarProps) {
  const pathname = usePathname();
  const mounted = useMounted();
  const isLight = theme === "light";

  const resolveActive = (id: NavId, href: string) => {
    if (activeId) return activeId === id;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="shrink-0">
      <div className="flex items-center justify-between px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/"
          className={cn(
            "font-serif text-base md:text-lg tracking-wide hover:opacity-80 transition-opacity",
            isLight ? "text-warm-900" : "text-cream-100"
          )}
          aria-label="Ir al inicio"
        >
          <span className="underline decoration-rose-400 underline-offset-4">
            para
          </span>{" "}
          Ren <span className="text-rose-500">♡</span>
        </Link>

        <nav
          className="hidden sm:flex items-center gap-6 md:gap-8"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => {
            const isActive = resolveActive(link.id, link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  "relative text-[11px] md:text-xs tracking-[0.15em] uppercase font-light transition-colors",
                  isActive
                    ? isLight
                      ? "text-warm-900 font-normal"
                      : "text-cream-100"
                    : isLight
                      ? "text-warm-600 hover:text-warm-900"
                      : "text-cream-100/50 hover:text-cream-100/80"
                )}
              >
                {link.label}
                {isActive && mounted && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40 cursor-default",
            isLight
              ? "border border-rose-200/80 bg-rose-50 text-rose-500 hover:bg-rose-100"
              : "border border-white/10 bg-white/5 text-rose-400 hover:bg-white/10"
          )}
          aria-label="Favorito"
        >
          <Heart className="h-4 w-4" fill="currentColor" fillOpacity={0.2} />
        </button>
      </div>

      <nav
        className="sm:hidden flex gap-5 overflow-x-auto scrollbar-hide px-5 pb-4"
        aria-label="Navegación móvil"
      >
        {NAV_LINKS.map((link) => {
          const isActive = resolveActive(link.id, link.href);
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "shrink-0 text-[10px] tracking-[0.12em] uppercase font-light transition-colors pb-1 border-b-2",
                isActive
                  ? isLight
                    ? "text-warm-900 border-rose-500"
                    : "text-cream-100 border-rose-400"
                  : isLight
                    ? "text-warm-600 border-transparent"
                    : "text-cream-100/40 border-transparent"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
