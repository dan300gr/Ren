"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Menu } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

interface MobileSectionHeaderProps {
  onMenuToggle?: () => void;
  showBack?: boolean;
  onBack?: () => void;
  variant?: "dark" | "light";
}

/** Header móvil: menú o volver, logo, corazón. */
export function MobileSectionHeader({
  onMenuToggle,
  showBack,
  onBack,
  variant = "light",
}: MobileSectionHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLight = variant === "light";

  const toggleMenu = () => {
    setMenuOpen((o) => !o);
    onMenuToggle?.();
  };

  return (
    <header className="lg:hidden relative z-50">
      <div className="flex items-center justify-between px-5 py-4">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
              isLight
                ? "text-warm-700/70 hover:bg-warm-800/5"
                : "text-cream-100/70 hover:bg-white/5"
            )}
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleMenu}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
              isLight
                ? "text-warm-700/70 hover:bg-warm-800/5"
                : "text-cream-100/70 hover:bg-white/5"
            )}
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        )}

        <Link
          href="/"
          className={cn(
            "font-handwriting text-lg",
            isLight ? "text-warm-800" : "text-cream-100"
          )}
          aria-label="Ir al inicio"
        >
          para Ren <span className="text-rose-400">♡</span>
        </Link>

        <button
          type="button"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl text-rose-400 transition-colors cursor-default",
            isLight ? "hover:bg-warm-800/5" : "hover:bg-white/5"
          )}
          aria-label="Favorito"
        >
          <Heart className="h-4 w-4" fill="currentColor" fillOpacity={0.2} />
        </button>
      </div>

      {menuOpen && (
        <nav
          className={cn(
            "absolute top-full left-0 right-0 mx-4 rounded-2xl backdrop-blur-xl p-4 shadow-xl",
            isLight
              ? "border border-rose-200/70 bg-white/95 shadow-rose-900/[0.06]"
              : "border border-white/10 bg-[#1C1917]/95 shadow-2xl"
          )}
          aria-label="Menú de navegación"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block px-4 py-3 text-sm rounded-xl transition-colors",
                isLight
                  ? "text-warm-700 hover:text-warm-900 hover:bg-rose-50/60"
                  : "text-cream-100/80 hover:text-cream-100 hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
