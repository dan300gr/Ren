"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PhysicalEnvelope } from "@/components/cartas/PhysicalEnvelope";
import type { Letter } from "@/types";

interface LetterListCardProps {
  letter: Letter;
  index: number;
  onSelect: (id: number) => void;
}

/** Tarjeta de lista móvil — sobre + título + flecha. */
export function LetterListCard({ letter, index, onSelect }: LetterListCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.06 }}
      onClick={() => onSelect(letter.id)}
      className="w-full flex items-center gap-3.5 px-4 py-4 rounded-2xl bg-white shadow-[0_2px_18px_rgba(61,53,48,0.07)] border border-rose-200/60 active:scale-[0.98] transition-transform text-left"
    >
      <PhysicalEnvelope
        letter={letter}
        size="xs"
        variant="white"
        titlePlacement="none"
        showHeart={false}
      />
      <span className="flex-1 font-serif text-[13px] leading-snug text-warm-800 pr-1">
        {letter.title}
      </span>
      <ChevronRight
        className="h-4 w-4 shrink-0 text-warm-600/40"
        strokeWidth={1.5}
        aria-hidden
      />
    </motion.button>
  );
}
