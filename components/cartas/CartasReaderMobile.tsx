"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LetterPaper } from "@/components/cartas/LetterPaper";
import { letters } from "@/data/letters";

interface CartasReaderMobileProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

/** Vista lector móvil: sobre abierto + carta + navegación. */
export function CartasReaderMobile({
  selectedId,
  onSelect,
}: CartasReaderMobileProps) {
  const letter = letters.find((l) => l.id === selectedId)!;
  const index = letters.findIndex((l) => l.id === selectedId);

  const goPrev = () => {
    const prev = letters[(index - 1 + letters.length) % letters.length];
    onSelect(prev.id);
  };

  const goNext = () => {
    const next = letters[(index + 1) % letters.length];
    onSelect(next.id);
  };

  return (
    <div className="flex-1 flex flex-col px-5 pb-32 pt-2 min-h-0 bg-gradient-to-b from-cream-100 to-cream-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="flex-1 overflow-y-auto"
        >
          {/* Sobre abierto superior */}
          <div className="relative mx-auto max-w-sm mb-[-12px] z-0">
            <div
              className="mx-auto w-[80%] h-16 rounded-b-xl shadow-lg"
              style={{ backgroundColor: "#F0D4D4" }}
            >
              <div
                className="absolute -top-6 left-1/2 w-[65%] h-12"
                style={{
                  backgroundColor: "#E8C4C4",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>

          <div className="relative z-10">
            <LetterPaper letter={letter} variant="mobile" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navegación inferior */}
      <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-0 right-0 flex items-center justify-center gap-6 z-40 px-5">
        <button
          type="button"
          onClick={goPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-400/90 text-white shadow-lg shadow-rose-300/30 hover:bg-rose-500 transition-colors"
          aria-label="Carta anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <span className="text-sm text-warm-600/60 font-light tabular-nums min-w-[48px] text-center">
          {selectedId} / {letters.length}
        </span>

        <button
          type="button"
          onClick={goNext}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-400/90 text-white shadow-lg shadow-rose-300/30 hover:bg-rose-500 transition-colors"
          aria-label="Siguiente carta"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
