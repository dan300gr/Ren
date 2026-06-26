"use client";

import { motion } from "framer-motion";
import type { DailyMessage } from "@/types";
import { cn } from "@/lib/utils";
import {
  getMessageMotion,
  RarityEffects,
} from "@/components/mensajitos/RarityEffects";

interface MessagePaperProps {
  message: DailyMessage;
  size?: "md" | "lg";
  className?: string;
}

/** Papel sobre cuaderno espiral con cinta washi. */
export function MessagePaper({ message, size = "lg", className }: MessagePaperProps) {
  const isLarge = size === "lg";
  const motionConfig = getMessageMotion(message.rarity);

  return (
    <div className={cn("relative mx-auto", isLarge ? "w-[300px] md:w-[360px]" : "w-[260px]", className)}>
      {/* Cuaderno */}
      <div
        className="absolute -inset-x-4 -bottom-3 top-8 rounded-sm shadow-lg"
        style={{ background: "linear-gradient(180deg, #E8E0D4 0%, #DDD5C8 100%)" }}
        aria-hidden
      >
        <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-warm-600/20" />
          ))}
        </div>
      </div>

      {/* Papel con cinta */}
      <div className="relative z-10">
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-50/50 border border-amber-100/60 z-20"
          style={{ transform: "translateX(-50%) rotate(-1deg)" }}
          aria-hidden
        />
        <div
          className="absolute -top-1 left-[30%] w-14 h-4 bg-rose-100/40 border border-rose-200/30 z-20"
          style={{ transform: "rotate(2deg)" }}
          aria-hidden
        />

        <motion.div
          key={message.id}
          initial={motionConfig.initial}
          animate={motionConfig.animate}
          transition={motionConfig.transition}
          className={cn(
            "relative bg-[#FFFDF8]",
            motionConfig.paperClassName,
            isLarge ? "px-10 py-12 min-h-[200px]" : "px-8 py-10 min-h-[160px]"
          )}
          style={{
            clipPath:
              "polygon(0% 2%, 2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
          }}
        >
          <RarityEffects rarity={message.rarity} />

          {message.rarity === "legendary" && (
            <span
              className="absolute top-3 right-4 text-amber-400/55 text-sm pointer-events-none select-none"
              aria-hidden
            >
              ✦
            </span>
          )}

          <p
            className={cn(
              "font-handwriting text-warm-800 text-center leading-relaxed relative z-10",
              isLarge ? "text-2xl md:text-3xl" : "text-xl"
            )}
          >
            {message.text}
          </p>
          <span className="absolute bottom-4 right-5 text-rose-400/60 text-sm" aria-hidden>
            ♡
          </span>
        </motion.div>
      </div>

      {/* Flores secas */}
      <span
        className="absolute -right-2 top-6 text-lg opacity-50 z-20 rotate-12"
        aria-hidden
      >
        🌿
      </span>
    </div>
  );
}

/** Tarjeta slip vertical para carrusel. */
export function MessageSlipCard({
  message,
  onClick,
  isSaved,
}: {
  message: DailyMessage;
  onClick?: () => void;
  isSaved?: boolean;
}) {
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "relative shrink-0 w-[140px] bg-[#FFFDF8] p-4 pt-5 shadow-md text-left",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50",
        "hover:-translate-y-1 transition-transform",
        onClick && "cursor-pointer"
      )}
      style={{ transform: "rotate(-1deg)" }}
      aria-label={onClick ? `Mensaje del ${message.date}` : undefined}
    >
      <div
        className="absolute -top-1.5 left-3 right-3 h-3 bg-amber-100/50 border border-amber-200/30"
        aria-hidden
      />
      <p className="text-[10px] text-warm-500/60 uppercase tracking-wider mb-2">
        {message.date}
      </p>
      <p className="font-handwriting text-sm text-warm-800 leading-snug line-clamp-4">
        {message.text}
      </p>
      <span className="absolute bottom-2 right-3 text-rose-400/50 text-xs">
        {isSaved ? "♥" : "♡"}
      </span>
    </Comp>
  );
}
