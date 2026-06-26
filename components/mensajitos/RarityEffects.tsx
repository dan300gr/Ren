"use client";

import { motion, type TargetAndTransition, type Transition } from "framer-motion";
import type { MessageRarity } from "@/types";

interface RarityEffectsProps {
  rarity: MessageRarity;
}

const PARTICLE_SEEDS = [
  { left: "18%", top: "22%", delay: 0.1 },
  { left: "78%", top: "30%", delay: 0.25 },
  { left: "62%", top: "72%", delay: 0.4 },
  { left: "28%", top: "68%", delay: 0.55 },
  { left: "48%", top: "14%", delay: 0.7 },
] as const;

/** Efectos visuales discretos según rareza — sin etiquetas. */
export function RarityEffects({ rarity }: RarityEffectsProps) {
  if (rarity === "common") return null;

  const particleCount = rarity === "legendary" ? 5 : 3;

  return (
    <>
      <div
        className={
          rarity === "legendary"
            ? "absolute -inset-3 rounded-sm bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,210,150,0.22)_0%,transparent_68%)] pointer-events-none"
            : "absolute -inset-2 rounded-sm bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,220,200,0.12)_0%,transparent_70%)] pointer-events-none"
        }
        aria-hidden
      />

      {rarity === "legendary" && (
        <motion.div
          className="absolute -inset-1 rounded-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            boxShadow: "0 0 28px 6px rgba(255, 190, 120, 0.18)",
          }}
          aria-hidden
        />
      )}

      {PARTICLE_SEEDS.slice(0, particleCount).map((particle, index) => (
        <motion.span
          key={index}
          className={
            rarity === "legendary"
              ? "absolute w-1 h-1 rounded-full bg-amber-200/50 pointer-events-none"
              : "absolute w-0.5 h-0.5 rounded-full bg-rose-200/40 pointer-events-none"
          }
          style={{ left: particle.left, top: particle.top }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0.4],
            y: [0, -8, -14],
          }}
          transition={{
            duration: rarity === "legendary" ? 2.4 : 1.8,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: rarity === "legendary" ? 2.8 : 3.5,
            ease: "easeOut",
          }}
          aria-hidden
        />
      ))}
    </>
  );
}

export function getMessageMotion(rarity: MessageRarity): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
  paperClassName: string;
} {
  switch (rarity) {
    case "legendary":
      return {
        initial: { opacity: 0, y: 22, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1, rotate: -0.5 },
        transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
        paperClassName:
          "shadow-[0_12px_42px_rgba(255,185,120,0.22),0_8px_30px_rgba(0,0,0,0.12)]",
      };
    case "special":
      return {
        initial: { opacity: 0, y: 14, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1, rotate: -0.5 },
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        paperClassName:
          "shadow-[0_10px_36px_rgba(255,200,180,0.18),0_8px_30px_rgba(0,0,0,0.12)]",
      };
    default:
      return {
        initial: { opacity: 0, y: 10, rotate: -1 },
        animate: { opacity: 1, y: 0, rotate: -0.5 },
        transition: { type: "spring", stiffness: 120, damping: 22 },
        paperClassName: "shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
      };
  }
}
