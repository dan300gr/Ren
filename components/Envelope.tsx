"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Letter } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface EnvelopeProps {
  letter: Letter;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/** Sobre físico con sello de cera y animación de apertura. */
export function Envelope({
  letter,
  index,
  isOpen,
  onOpen,
  onClose,
}: EnvelopeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="envelope"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="relative w-full max-w-[220px] sm:max-w-[200px] md:max-w-[240px] aspect-[4/3] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/50 rounded-lg"
            aria-label={`Abrir carta: ${letter.title}`}
          >
            {/* Sobre cerrado */}
            <div
              className="absolute inset-0 rounded-lg shadow-xl"
              style={{ backgroundColor: letter.envelopeColor }}
            >
              {/* Triángulo superior del sobre */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 origin-top"
                style={{
                  background: `linear-gradient(135deg, ${letter.envelopeColor} 0%, ${adjustColor(letter.envelopeColor, -10)} 100%)`,
                  clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                }}
              />
              {/* Líneas del sobre */}
              <div className="absolute inset-0 border border-warm-800/5 rounded-lg" />
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{
                  background: `linear-gradient(to top, ${adjustColor(letter.envelopeColor, -5)}, transparent)`,
                }}
              />
            </div>

            {/* Sello de cera */}
            <motion.div
              className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: letter.sealColor,
                  boxShadow: `0 4px 12px ${letter.sealColor}60, inset 0 2px 4px rgba(255,255,255,0.3)`,
                }}
              >
                <span className="text-white text-lg font-serif">
                  {letter.sealEmoji}
                </span>
              </div>
            </motion.div>

            {/* Número */}
            <span className="absolute bottom-3 right-3 text-xs text-warm-600/40 font-serif">
              {letter.id}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full max-w-[320px] md:max-w-[400px]"
          >
            {/* Carta abierta */}
            <motion.div
              initial={{ y: 50, rotateX: -15, opacity: 0 }}
              animate={{ y: 0, rotateX: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                duration: reducedMotion ? 0 : undefined,
              }}
              className="relative rounded-sm shadow-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #FFFDF8 0%, #F9F5EE 100%)",
                transformPerspective: 1000,
              }}
            >
              {/* Textura de papel */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative p-6 md:p-10">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-warm-100/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/50"
                  aria-label="Cerrar carta"
                >
                  <X className="w-4 h-4 text-warm-600" />
                </button>

                <h3 className="font-serif text-xl md:text-2xl text-warm-800 mb-6 pr-8">
                  {letter.title}
                </h3>

                <div className="font-serif text-sm md:text-base text-warm-700/90 leading-relaxed whitespace-pre-line">
                  {letter.content}
                </div>
              </div>

              {/* Borde decorativo */}
              <div className="absolute inset-4 border border-warm-300/20 pointer-events-none rounded-sm" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
