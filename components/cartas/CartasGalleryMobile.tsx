"use client";

import { motion } from "framer-motion";
import { LetterListCard } from "@/components/cartas/LetterListCard";
import { CARTAS_COPY } from "@/constants/cartas";
import { letters } from "@/data/letters";

interface CartasGalleryMobileProps {
  onSelect: (id: number) => void;
}

/** Vista galería móvil: lista de tarjetas sobre fondo claro. */
export function CartasGalleryMobile({ onSelect }: CartasGalleryMobileProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-gradient-to-b from-cream-100 via-rose-50 to-peach-100">
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto px-4 pt-2 pb-8">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-2 pb-8 pt-4"
        >
          <h1 className="font-serif text-3xl text-warm-800">
            {CARTAS_COPY.title}{" "}
            <span className="text-rose-400">{CARTAS_COPY.subtitleHeart}</span>
          </h1>
          <p className="mt-3 text-sm text-warm-600/60 font-light px-1 leading-relaxed">
            {CARTAS_COPY.subtitle}
          </p>
        </motion.header>

        <div className="flex flex-col gap-3 w-full">
          {letters.map((letter, i) => (
            <LetterListCard
              key={letter.id}
              letter={letter}
              index={i}
              onSelect={onSelect}
            />
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 mb-4 w-full max-w-md"
        >
          <div className="relative rounded-lg bg-cream-50 px-5 py-5 shadow-[0_4px_20px_rgba(181,110,110,0.1)] border border-rose-200/60">
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl"
              aria-hidden
            >
              🌸
            </span>
            <p className="font-handwriting text-xl text-warm-800 text-center pt-1">
              {CARTAS_COPY.mobileFooterText}{" "}
              <span className="text-rose-400">{CARTAS_COPY.subtitleHeart}</span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
