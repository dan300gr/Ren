"use client";

import { motion } from "framer-motion";
import type { Letter } from "@/types";
import { cn } from "@/lib/utils";

interface PhysicalEnvelopeProps {
  letter: Letter;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  showHeart?: boolean;
  /** Sobre blanco estilo mockup */
  variant?: "default" | "white";
  /** Dónde mostrar el título */
  titlePlacement?: "inside" | "below" | "none";
}

const SIZES = {
  xs: { w: 58, h: 42, seal: 22, title: "text-[6px]" },
  sm: { w: 56, h: 56, seal: 22, title: "text-[7px]" },
  md: { w: 112, h: 82, seal: 34, title: "text-[8px]" },
  lg: { w: 150, h: 108, seal: 44, title: "text-[9px]" },
  xl: { w: 176, h: 126, seal: 50, title: "text-[10px]" },
};

const WHITE_ENVELOPE = "#FAFAF8";

/** Sobre físico realista con sello de cera numerado. */
export function PhysicalEnvelope({
  letter,
  size = "md",
  selected,
  onClick,
  className,
  style,
  showHeart = true,
  variant = "default",
  titlePlacement = "inside",
}: PhysicalEnvelopeProps) {
  const s = SIZES[size];
  const envelopeColor =
    variant === "white" ? WHITE_ENVELOPE : letter.envelopeColor;
  const Comp = onClick ? motion.button : motion.div;

  const envelope = (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      whileHover={onClick ? { y: -6, scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      className={cn(
        "relative focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50",
        onClick && "cursor-pointer",
        size === "sm" || size === "xs" ? "rounded-xl" : "rounded-lg",
        selected &&
          "ring-2 ring-rose-300/60 ring-offset-2 ring-offset-[#F5F0E8] rounded-xl",
        className
      )}
      style={{ width: s.w, height: s.h, ...style }}
      aria-label={
        onClick ? `Abrir carta ${letter.id}: ${letter.title}` : undefined
      }
    >
      <div
        className="absolute inset-0 rounded-md shadow-[0_10px_28px_rgba(0,0,0,0.32)]"
        style={{ backgroundColor: envelopeColor }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[52%]"
          style={{
            background: `linear-gradient(180deg, ${adjustColor(envelopeColor, -8)} 0%, ${envelopeColor} 100%)`,
            clipPath: "polygon(0 0, 50% 85%, 100% 0)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%] rounded-b-md"
          style={{
            background: `linear-gradient(0deg, ${adjustColor(envelopeColor, -12)} 0%, transparent 100%)`,
          }}
        />
        <div className="absolute inset-0 rounded-md border border-black/[0.06]" />
      </div>

      {titlePlacement === "inside" && size !== "sm" && size !== "xs" && (
        <p
          className={cn(
            "absolute left-0 right-0 text-center z-10 px-1 pointer-events-none",
            size === "xl" || size === "lg" ? "bottom-2.5" : "bottom-1"
          )}
        >
          <span
            className={cn(
              "font-serif font-semibold text-warm-800/75 leading-tight block",
              s.title
            )}
          >
            {letter.title}
          </span>
        </p>
      )}

      <div
        className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center font-serif font-medium text-white shadow-[0_3px_10px_rgba(0,0,0,0.25),inset_0_1px_3px_rgba(255,255,255,0.35)]"
        style={{
          width: s.seal,
          height: s.seal,
          backgroundColor: letter.sealColor,
          fontSize: s.seal * 0.38,
        }}
      >
        {letter.id}
      </div>

      {showHeart && size !== "xs" && (
        <span
          className={cn(
            "absolute font-handwriting text-rose-400/50 pointer-events-none",
            size === "xl" || size === "lg"
              ? "text-base -right-3 top-[30%]"
              : "text-xs -right-2 top-[28%]"
          )}
          aria-hidden
        >
          ♡
        </span>
      )}

      {selected && (
        <motion.div
          layoutId="envelope-glow"
          className="absolute -inset-2 rounded-xl bg-rose-300/20 blur-md -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </Comp>
  );

  if (titlePlacement === "below") {
    return (
      <div className="flex flex-col items-center">
        {envelope}
        <p
          className={cn(
            "font-serif font-medium text-center leading-snug mt-2.5",
            size === "xl"
              ? "text-[10px] xl:text-[11px] max-w-[11rem] xl:max-w-[12rem]"
              : "text-[10px] max-w-[9.5rem]"
          )}
        >
          <span className="inline-block rounded-md bg-[#FFFDF8]/95 px-2 py-1 text-warm-800 shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-white/60">
            {letter.title}
          </span>
        </p>
      </div>
    );
  }

  return envelope;
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
