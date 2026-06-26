"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PhysicalEnvelope } from "@/components/cartas/PhysicalEnvelope";
import { CARTAS_COPY, ENVELOPE_PLACEMENTS } from "@/constants/cartas";
import { letters } from "@/data/letters";
import { cn } from "@/lib/utils";

interface DeskSceneProps {
  onSelect: (id: number) => void;
}

/** Vista galería escritorio: sobres sobre mesa oscura. */
export function DeskScene({ onSelect }: DeskSceneProps) {
  const hasPhoto = Boolean(CARTAS_COPY.deskBackground);

  return (
    <div className="relative flex-1 min-h-[600px] overflow-hidden">
      {CARTAS_COPY.deskBackground ? (
        <Image
          src={CARTAS_COPY.deskBackground}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.15) 100%),
              linear-gradient(180deg, #3D2E24 0%, #2A1F18 50%, #1F1712 100%)
            `,
          }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(255,200,150,0.08)_0%,transparent_55%)]" />

      {/* Decoraciones */}
      <div
        className="absolute left-[7%] top-[24%] w-28 bg-[#F5E8C8] p-3 shadow-md rotate-[-4deg] z-[2]"
        aria-hidden
      >
        <p className="font-handwriting text-xs text-warm-700/80">
          {CARTAS_COPY.notebookText}
        </p>
      </div>
      <div
        className="absolute right-[9%] top-[18%] w-20 bg-[#FAFAFA] p-1.5 pb-5 rounded-sm shadow-lg rotate-[5deg] z-[2]"
        aria-hidden
      >
        <div className="w-full h-14 bg-[#E8D5C4] rounded-sm" />
        <p className="font-handwriting text-[8px] text-warm-700 text-center mt-1">
          {CARTAS_COPY.polaroidCaption} ♡
        </p>
      </div>

      {/* Header */}
      <div className="relative z-20 flex items-start justify-between gap-4 px-6 xl:px-10 pt-8 xl:pt-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={cn(
              "font-serif text-3xl xl:text-[2.75rem] tracking-tight leading-tight",
              hasPhoto ? "text-white drop-shadow-md" : "text-warm-900"
            )}
          >
            {CARTAS_COPY.title}{" "}
            <span className="text-rose-200">♡</span>
          </h1>
          <p
            className={cn(
              "mt-2 text-sm font-light max-w-sm leading-relaxed",
              hasPhoto ? "text-white/75" : "text-warm-600"
            )}
          >
            {CARTAS_COPY.subtitle}
          </p>
        </motion.div>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-rose-200/70 bg-white/90 backdrop-blur-md px-4 xl:px-5 py-2.5 text-xs text-warm-800 hover:bg-rose-50 transition-all shrink-0 shadow-md shadow-rose-900/[0.06]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {CARTAS_COPY.backLabel}
        </Link>
      </div>

      {/* Área de sobres */}
      <div className="absolute inset-x-0 top-[19%] bottom-[9%] z-10 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-full h-full max-w-[min(96%,1180px)] mx-auto pointer-events-auto origin-center
            scale-[clamp(0.62,0.48+0.04vw,0.88)]
            xl:scale-[clamp(0.78,0.6+0.035vw,1)]
            2xl:scale-100"
        >
          {ENVELOPE_PLACEMENTS.map((pos, i) => {
            const letter = letters.find((l) => l.id === pos.id)!;
            return (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, y: 24, rotate: pos.rotate - 6 }}
                animate={{ opacity: 1, y: 0, rotate: pos.rotate }}
                transition={{
                  delay: 0.12 + i * 0.07,
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: pos.left,
                  top: pos.top,
                  zIndex: pos.zIndex,
                }}
              >
                <PhysicalEnvelope
                  letter={letter}
                  size="xl"
                  variant="white"
                  titlePlacement="below"
                  onClick={() => onSelect(pos.id)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Prompt inferior */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="absolute bottom-6 xl:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <p
          className={cn(
            "font-handwriting text-lg xl:text-xl",
            hasPhoto ? "text-white/70" : "text-warm-600"
          )}
        >
          {CARTAS_COPY.choosePrompt}
        </p>
        <svg
          className={cn(
            "mt-2",
            hasPhoto ? "text-white/40" : "text-warm-600/40"
          )}
          width="36"
          height="20"
          viewBox="0 0 40 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 5 C15 20, 25 20, 35 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
