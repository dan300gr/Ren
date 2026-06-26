"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HERO } from "@/constants";
import { cn } from "@/lib/utils";

/** Columna izquierda del inicio: hero con fondo blanco (placeholder). */
export function HomeHero() {
  const parts = HERO.headline.split(HERO.highlight);
  const hasPhoto = Boolean(HERO.backgroundImage);

  return (
    <section
      className="relative flex-[1.55] min-h-[420px] lg:min-h-0 overflow-hidden"
      aria-label="Bienvenida"
    >
      {HERO.backgroundImage ? (
        <Image
          src={HERO.backgroundImage}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}

      <div
        className={
          HERO.backgroundImage
            ? "absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/55"
            : "absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20"
        }
      />

      <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-6 md:p-8 lg:p-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "font-serif text-xl sm:text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.2] max-w-[85%] sm:max-w-md lg:max-w-lg",
            hasPhoto ? "text-white drop-shadow-md" : "text-warm-900"
          )}
        >
          {parts[0]}
          <em className="text-rose-200 not-italic">{HERO.highlight}</em>
          {parts[1]} <span className="text-rose-200">♡</span>
        </motion.h1>

        <div className="flex flex-col gap-3 sm:gap-6 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className={cn(
              "max-w-[9.5rem] sm:max-w-[11.5rem] md:max-w-xs self-start rounded-xl md:rounded-2xl border backdrop-blur-sm md:backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 shadow-md md:shadow-lg",
              hasPhoto
                ? "border-white/30 bg-black/50 sm:bg-black/45 md:border-white/40 md:bg-white/90"
                : "border-white/40 bg-white/25 sm:bg-white/40 md:bg-white/90"
            )}
          >
            <p
              className={cn(
                "text-[11px] sm:text-xs md:text-sm font-light leading-snug sm:leading-relaxed",
                hasPhoto
                  ? "text-white drop-shadow-sm md:text-warm-800 md:drop-shadow-none"
                  : "text-warm-800/90 md:text-warm-800"
              )}
            >
              {HERO.glassText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={cn(
              "flex items-center gap-2 text-xs tracking-widest uppercase",
              hasPhoto ? "text-white/75" : "text-warm-700"
            )}
            aria-hidden
          >
            <span>{HERO.scrollHint}</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
