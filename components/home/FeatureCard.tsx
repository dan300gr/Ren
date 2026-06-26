"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, Heart, Mail, Music } from "lucide-react";
import {
  EnvelopesPreview,
  IPodPreview,
  PolaroidsPreview,
  StickyNotePreview,
} from "@/components/home/CardPreviews";
import type { FeatureCardData } from "@/types";
import { cn } from "@/lib/utils";

const ICONS = {
  mail: Mail,
  music: Music,
  camera: Camera,
  heart: Heart,
} as const;

const PREVIEWS = {
  cartas: EnvelopesPreview,
  musica: IPodPreview,
  nosotros: PolaroidsPreview,
  mensajito: StickyNotePreview,
} as const;

interface FeatureCardProps {
  card: FeatureCardData;
  index: number;
  theme?: "dark" | "light";
  horizontal?: boolean;
  className?: string;
}

/** Tarjeta del grid del inicio. */
export function FeatureCard({
  card,
  index,
  theme = "light",
  horizontal = false,
  className,
}: FeatureCardProps) {
  const Icon = ICONS[card.icon];
  const Preview = PREVIEWS[card.preview];
  const isLight = theme === "light";

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
    >
      <Link
        href={card.href}
        className={cn(
          "group relative flex h-full rounded-[20px] md:rounded-[22px] p-5 md:p-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40",
          horizontal
            ? "flex-row items-center gap-4 md:gap-6 min-h-[112px] md:min-h-[128px]"
            : "flex-col",
          isLight
            ? "border border-rose-200/70 bg-white shadow-[0_2px_18px_rgba(61,53,48,0.07)] hover:border-rose-300 hover:bg-rose-50/40 hover:shadow-[0_6px_28px_rgba(181,110,110,0.12)]"
            : "border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.12]"
        )}
        aria-label={`Ir a ${card.title}`}
      >
        {horizontal ? (
          <>
            <Icon
              className={cn(
                "w-4 h-4 shrink-0 self-start mt-0.5",
                isLight ? "text-rose-400" : "text-cream-100/40"
              )}
              strokeWidth={1.5}
              aria-hidden
            />

            <div className="flex-1 min-w-0 pr-12 md:pr-14">
              <h3
                className={cn(
                  "font-serif text-base md:text-lg font-medium",
                  isLight ? "text-warm-900" : "text-cream-100"
                )}
              >
                {card.title}
              </h3>
              <p
                className={cn(
                  "mt-1 text-xs",
                  isLight
                    ? "text-rose-500 font-medium"
                    : "text-cream-100/50 font-light"
                )}
              >
                {card.subtitle}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-[11px] leading-relaxed hidden sm:block",
                  isLight ? "text-warm-600" : "text-cream-100/35 font-light"
                )}
              >
                {card.description}
              </p>
            </div>

            <div className="hidden sm:flex shrink-0 items-center justify-center w-28 md:w-36 -mr-1">
              <Preview compact />
            </div>
          </>
        ) : (
          <>
            <Icon
              className={cn(
                "w-4 h-4 mb-3",
                isLight ? "text-rose-400" : "text-cream-100/40"
              )}
              strokeWidth={1.5}
              aria-hidden
            />

            <div className="flex-1 flex items-center justify-center min-h-[100px]">
              <Preview />
            </div>

            <div className="mt-3 pr-10">
              <h3
                className={cn(
                  "font-serif text-base md:text-lg font-medium",
                  isLight ? "text-warm-900" : "text-cream-100"
                )}
              >
                {card.title}
              </h3>
              <p
                className={cn(
                  "mt-1 text-xs",
                  isLight
                    ? "text-rose-500 font-medium"
                    : "text-cream-100/50 font-light"
                )}
              >
                {card.subtitle}
              </p>
              <p
                className={cn(
                  "mt-2 text-[11px] leading-relaxed hidden sm:block",
                  isLight ? "text-warm-600" : "text-cream-100/35 font-light"
                )}
              >
                {card.description}
              </p>
            </div>
          </>
        )}

        <span
          className={cn(
            "absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
            isLight
              ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25 group-hover:bg-rose-600 group-hover:scale-105"
              : "bg-rose-400/20 text-rose-400 border border-rose-400/20 group-hover:bg-rose-400/30 group-hover:scale-105"
          )}
          aria-hidden
        >
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
}
