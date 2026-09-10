"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LetterPaper } from "@/components/cartas/LetterPaper";
import { PhysicalEnvelope } from "@/components/cartas/PhysicalEnvelope";
import { CARTAS_COPY } from "@/constants/cartas";
import { letters } from "@/data/letters";
import { cn } from "@/lib/utils";

export function LettersReader() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedIndex = Math.max(
    0,
    letters.findIndex((letter) => letter.id === selectedId)
  );
  const selected = selectedId === null ? null : letters[selectedIndex];

  const selectRelative = (direction: -1 | 1) => {
    const nextIndex = (selectedIndex + direction + letters.length) % letters.length;
    setSelectedId(letters[nextIndex].id);
  };

  return (
    <div className="mt-8 min-w-0">
      <div
        className={cn(
          "grid min-w-0 gap-4 transition-all lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.35fr)] lg:gap-8",
          selected === null && "lg:grid-cols-1"
        )}
      >
        <section
          aria-label="Elige una carta"
          className={cn("min-w-0", selected && "max-lg:hidden")}
        >
          <div
            className={cn(
              "grid gap-3 sm:grid-cols-2",
              selected === null && "lg:grid-cols-5"
            )}
          >
            {letters.map((letter) => {
              const isSelected = selected?.id === letter.id;
              return (
                <button
                  key={letter.id}
                  type="button"
                  onClick={() => setSelectedId(letter.id)}
                  aria-pressed={isSelected}
                  aria-controls="carta-abierta"
                  className={cn(
                    "group flex min-h-24 w-full min-w-0 items-center gap-4 rounded-[var(--radius-md)] border p-4 text-left transition-all sm:min-h-28 lg:flex-col lg:justify-center lg:text-center",
                    isSelected
                      ? "border-border-strong bg-accent-pale shadow-[var(--shadow-card)]"
                      : "border-border bg-surface hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-card)]"
                  )}
                >
                  <span className="flex h-14 w-20 shrink-0 items-center justify-center lg:h-16">
                    <PhysicalEnvelope
                      letter={letter}
                      size="xs"
                      variant="white"
                      titlePlacement="none"
                      showHeart={false}
                    />
                  </span>
                  <span className="min-w-0 font-serif text-[0.98rem] leading-snug text-foreground">
                    {letter.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-[var(--radius-md)] border border-border bg-paper px-5 py-5 text-center shadow-[var(--shadow-card)]">
            <span aria-hidden>🌸</span>
            <p className="mt-2 font-handwriting text-2xl text-foreground-soft">
              {CARTAS_COPY.mobileFooterText} <span className="text-accent">♡</span>
            </p>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.article
              key={selected.id}
              id="carta-abierta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="min-w-0 rounded-[var(--radius-lg)] border border-border bg-surface-soft p-3 shadow-[var(--shadow-card)] sm:p-5"
              aria-live="polite"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm text-accent-hover lg:hidden"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Volver a las cartas
              </button>
              <div className="relative mx-auto mb-[-0.75rem] h-18 w-[78%] max-w-sm rounded-b-xl bg-accent-soft shadow-sm" aria-hidden>
                <div className="absolute -top-5 left-1/2 h-12 w-[66%] -translate-x-1/2 bg-[#e8c4c4] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
              </div>
              <div className="relative z-10">
                <LetterPaper letter={selected} variant="mobile" />
              </div>

              <nav className="mt-5 flex items-center justify-center gap-5" aria-label="Cambiar de carta">
                <button
                  type="button"
                  onClick={() => selectRelative(-1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-[var(--shadow-card)] transition-colors hover:bg-accent-hover"
                  aria-label="Carta anterior"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <span className="min-w-14 text-center text-sm tabular-nums text-foreground-muted">
                  {selectedIndex + 1} / {letters.length}
                </span>
                <button
                  type="button"
                  onClick={() => selectRelative(1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-[var(--shadow-card)] transition-colors hover:bg-accent-hover"
                  aria-label="Siguiente carta"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </nav>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
