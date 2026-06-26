"use client";

import { motion } from "framer-motion";
import type { Photo } from "@/types";
import { cn } from "@/lib/utils";

interface PolaroidCardProps {
  photo: Photo;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  showTape?: boolean;
  className?: string;
}

const SIZES = {
  sm: { w: 120, pad: 8, img: 96, caption: "text-[10px]", date: "text-[8px]" },
  md: { w: 150, pad: 10, img: 120, caption: "text-xs", date: "text-[9px]" },
  lg: { w: 190, pad: 12, img: 155, caption: "text-sm", date: "text-[10px]" },
};

/** Polaroid fotorrealista con fecha y caption manuscrito. */
export function PolaroidCard({
  photo,
  size = "md",
  onClick,
  showTape,
  className,
}: PolaroidCardProps) {
  const s = SIZES[size];
  const Comp = onClick ? motion.button : motion.div;

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      whileHover={onClick ? { y: -8, scale: 1.03, rotate: 0 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cn(
        "relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50 rounded-sm",
        onClick && "cursor-pointer",
        className
      )}
      style={{ width: s.w }}
      aria-label={onClick ? `Ver recuerdo: ${photo.title}` : undefined}
    >
      {showTape && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-100/60 border border-amber-200/40 z-10"
          style={{ transform: "translateX(-50%) rotate(-1deg)" }}
          aria-hidden
        />
      )}

      <div
        className="bg-[#FAFAFA] rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        style={{ padding: s.pad, paddingBottom: s.pad + 28 }}
      >
        <div
          className="rounded-sm overflow-hidden flex items-center justify-center relative"
          style={{
            width: s.img,
            height: s.img,
            backgroundColor: photo.color,
          }}
        >
          <span className="text-3xl opacity-25" aria-hidden>
            📷
          </span>
          {photo.hasHeart && (
            <span className="absolute bottom-1.5 right-1.5 text-rose-400/70 text-xs">
              ♡
            </span>
          )}
        </div>

        <p
          className={cn(
            "mt-2 text-center font-handwriting text-warm-700 leading-tight",
            s.caption
          )}
        >
          {photo.caption}
        </p>
        <p
          className={cn(
            "text-center text-warm-500/50 mt-0.5 font-light tracking-wide",
            s.date
          )}
        >
          {photo.date}
        </p>
      </div>
    </Comp>
  );
}
