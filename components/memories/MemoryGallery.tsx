"use client";

import Image from "next/image";
import Link from "next/link";
import { Grid2X2, Heart, MapPin, MessageSquareText, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { memories, memoryCategoryLabels } from "@/data/memories";
import type { MemoryCategory } from "@/types/memory";
import { cn } from "@/lib/utils";

type Filter = "all" | "favorites" | MemoryCategory;

const filters: Array<{ id: Filter; label: string; icon: typeof Heart }> = [
  { id: "all", label: "Todos", icon: Grid2X2 },
  { id: "favorites", label: "Favoritos", icon: Heart },
  { id: "citas", label: "Citas", icon: Heart },
  { id: "dias-especiales", label: "Días especiales", icon: Sparkles },
  { id: "cotidiano", label: "Cotidiano", icon: MessageSquareText },
  { id: "aventuras", label: "Aventuras", icon: MapPin },
];

export function MemoryGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const buttonRefs = useRef<Partial<Record<Filter, HTMLButtonElement | null>>>({});

  const visibleMemories = useMemo(() => {
    if (activeFilter === "all") return memories;
    if (activeFilter === "favorites") {
      return memories.filter((memory) => memory.favorite);
    }
    return memories.filter((memory) => memory.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const button = buttonRefs.current[activeFilter];
    if (!button) return;
    button.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeFilter]);

  return (
    <>
      <div
        role="toolbar"
        aria-label="Filtrar recuerdos"
        className="mt-8 flex gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        {filters.map((filter) => {
          const Icon = filter.icon;
          const active = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              ref={(node) => {
                buttonRefs.current[filter.id] = node;
              }}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex shrink-0 snap-center items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-accent bg-accent text-white"
                  : "border-border/80 bg-surface/90 text-foreground-soft hover:border-border-strong hover:bg-accent-pale"
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden />
              {filter.label}
            </button>
          );
        })}
      </div>

      {visibleMemories.length > 0 ? (
        <div className="memory-grid mt-5" aria-live="polite">
          {visibleMemories.map((memory) => (
            <article key={memory.id}>
              <Link
                href={`/recuerdos/${memory.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-raised)]"
                aria-label={`Abrir recuerdo${memory.title ? `: ${memory.title}` : ""}`}
              >
                <div className="relative overflow-hidden bg-surface-soft">
                  <Image
                    src={memory.image}
                    alt={memory.alt}
                    width={memory.width}
                    height={memory.height}
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
                    sizes="(max-width: 360px) calc(100vw - 2.5rem), (max-width: 767px) 46vw, (max-width: 1279px) 30vw, 20vw"
                  />
                  {memory.favorite && (
                    <span className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-background/92 text-accent shadow-sm backdrop-blur-sm" aria-label="Recuerdo favorito">
                      <Heart className="h-4 w-4" fill="currentColor" aria-hidden />
                    </span>
                  )}
                </div>
                {(memory.title || memory.note || memory.category) && (
                  <div className="flex min-w-0 items-start justify-between gap-2 px-3.5 py-3.5">
                    <div className="min-w-0">
                      {memory.title && (
                        <h2 className="font-serif text-base leading-snug text-foreground">
                          {memory.title}
                        </h2>
                      )}
                      {memory.category && (
                        <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                          {memoryCategoryLabels[memory.category]}
                        </p>
                      )}
                    </div>
                    {memory.note && (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-pale text-accent" aria-label="Este recuerdo tiene una nota">
                        <MessageSquareText className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-soft p-10 text-center">
          <Heart className="mx-auto h-5 w-5 text-accent" aria-hidden />
          <p className="mt-3 font-serif text-xl text-foreground">Todavía no hay recuerdos en este filtro.</p>
        </div>
      )}
    </>
  );
}
