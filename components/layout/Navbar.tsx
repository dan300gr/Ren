import Link from "next/link";
import { Heart } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/constants";
import type { NavId } from "@/types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeId?: NavId;
}

export function Navbar({ activeId }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-background/95 backdrop-blur-md">
      <div className="flex min-h-18 items-center justify-between gap-4 px-[var(--page-x)]">
        <Link
          href="/"
          className="shrink-0 font-serif text-[clamp(1.45rem,3vw,2rem)] tracking-[-0.035em] text-foreground"
          aria-label="Ir al inicio"
        >
          <span className="underline decoration-accent decoration-1 underline-offset-6">
            para
          </span>{" "}
          Ren <span className="text-accent">♡</span>
        </Link>

        <nav
          className="hidden items-center gap-5 min-[56rem]:flex xl:gap-8"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.id === activeId;
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-6 text-[0.78rem] font-medium uppercase tracking-[0.15em] transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-4 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-border bg-accent-pale px-4 py-2 text-sm text-accent min-[56rem]:flex">
          <Heart className="h-4 w-4" strokeWidth={1.7} aria-hidden />
          <span className="font-serif">Siempre tú</span>
          <span aria-hidden>♡</span>
        </div>

        <MobileMenu activeId={activeId} />
      </div>
    </header>
  );
}
