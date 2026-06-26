"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PhysicalEnvelope } from "@/components/cartas/PhysicalEnvelope";
import { OpenEnvelopeScene } from "@/components/cartas/LetterPaper";
import { CARTAS_COPY } from "@/constants/cartas";
import { letters } from "@/data/letters";

interface CartasReaderDesktopProps {
  selectedId: number;
  onSelect: (id: number) => void;
  onBack: () => void;
}

/** Vista lector escritorio: split con selector + carta abierta. */
export function CartasReaderDesktop({
  selectedId,
  onSelect,
  onBack,
}: CartasReaderDesktopProps) {
  const letter = letters.find((l) => l.id === selectedId)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-1 min-h-0"
    >
      {/* Panel izquierdo — selector */}
      <div className="w-[42%] bg-cream-200 flex flex-col justify-center px-10 xl:px-14 py-12">
        <button
          type="button"
          onClick={onBack}
          className="self-start mb-8 text-xs text-warm-600/60 hover:text-warm-800 transition-colors flex items-center gap-1.5"
        >
          ← Volver a la mesa
        </button>

        <h2 className="font-serif text-3xl xl:text-4xl text-warm-800">
          {CARTAS_COPY.readerTitle}{" "}
          <span className="text-rose-400">{CARTAS_COPY.subtitleHeart}</span>
        </h2>

        <div className="flex gap-3 mt-10 flex-wrap">
          {letters.map((l) => (
            <PhysicalEnvelope
              key={l.id}
              letter={l}
              size="sm"
              selected={l.id === selectedId}
              onClick={() => onSelect(l.id)}
              showHeart={false}
            />
          ))}
        </div>

        <p className="mt-8 font-handwriting text-lg text-warm-600/70 max-w-xs">
          {CARTAS_COPY.readerSubtitle}{" "}
          <span className="text-rose-400">♡</span>
        </p>
      </div>

      {/* Panel derecho — carta abierta */}
      <div className="flex-1 bg-cream-100 flex items-center justify-center px-8 xl:px-16 py-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg"
          >
            <OpenEnvelopeScene letter={letter} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
