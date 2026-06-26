"use client";

import { motion } from "framer-motion";
import type { Letter } from "@/types";
import { CARTAS_COPY } from "@/constants/cartas";

interface LetterPaperProps {
  letter: Letter;
  variant?: "desktop" | "mobile";
}

/** Papel de carta con textura y tipografía manuscrita. */
export function LetterPaper({ letter, variant = "desktop" }: LetterPaperProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.15 }}
      className="relative w-full"
    >
      <div
        className="relative rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFDF8 0%, #F9F5EE 100%)",
        }}
      >
        {/* Textura papel */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          className={
            variant === "mobile"
              ? "relative px-6 py-8 md:px-8 max-h-[55vh] overflow-y-auto"
              : "relative px-8 py-10 md:px-10 max-h-[60vh] overflow-y-auto"
          }
        >
          <h3 className="font-serif text-xl md:text-2xl text-warm-800 mb-4 pr-4">
            {letter.title}
          </h3>

          {variant === "mobile" && (
            <p className="font-handwriting text-sm text-rose-400/70 mb-4">
              Carta #{letter.id} ♡
            </p>
          )}

          <p className="font-handwriting text-lg md:text-xl text-warm-800 mb-5">
            {letter.opening}
          </p>

          <div className="font-handwriting text-base md:text-lg text-warm-700/90 leading-relaxed whitespace-pre-line space-y-3">
            {letter.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <p className="font-handwriting text-lg text-warm-800 mt-6">
            {letter.signOff} <span className="text-rose-400">♡</span>
          </p>

          {/* Doodles decorativos */}
          <div className="absolute bottom-6 right-6 flex gap-2 opacity-30 pointer-events-none" aria-hidden>
            <span className="text-rose-400 text-sm">✿</span>
            <span className="text-rose-400 text-sm">♡</span>
          </div>
        </div>

        <div className="absolute inset-3 border border-warm-300/15 pointer-events-none rounded-sm" />
      </div>
    </motion.div>
  );
}

/** Sobre abierto rosa con carta interior. */
export function OpenEnvelopeScene({ letter }: { letter: Letter }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Sobre abierto */}
      <div className="relative mb-[-20px] z-0">
        <div
          className="mx-auto w-[85%] h-24 rounded-b-lg shadow-lg relative"
          style={{ backgroundColor: "#F0D4D4" }}
        >
          {/* Solapa abierta hacia atrás */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-[70%] h-16 origin-bottom"
            style={{
              backgroundColor: "#E8C4C4",
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              transform: "translateX(-50%) rotateX(180deg)",
            }}
          />
        </div>
      </div>

      {/* Carta */}
      <div className="relative z-10 px-2">
        <LetterPaper letter={letter} variant="desktop" />
      </div>

      {/* Polaroid + flores decorativas */}
      <div className="absolute -right-4 top-1/3 hidden xl:block">
        <div className="w-24 bg-[#FAFAFA] p-1.5 pb-6 rounded-sm shadow-lg rotate-6">
          <div className="w-full h-16 bg-[#E8D5C4] rounded-sm" />
          <p className="font-handwriting text-[9px] text-warm-700 text-center mt-1.5 leading-tight">
            {CARTAS_COPY.polaroidCaption} ♡
          </p>
        </div>
        <span className="absolute -top-2 -left-3 text-rose-300/40 text-lg" aria-hidden>
          ✿
        </span>
      </div>
    </div>
  );
}
