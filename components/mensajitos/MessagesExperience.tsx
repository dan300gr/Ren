"use client";

import { Heart, RefreshCw } from "lucide-react";
import { useMensajitos } from "@/hooks/useMensajitos";
import { cn } from "@/lib/utils";

const rarityLabels = {
  common: "Una notita para hoy",
  special: "Un mensajito especial",
  legendary: "Para guardar muy cerquita",
} as const;

function WaveFlourish({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 20"
      fill="none"
      aria-hidden
      className={cn("h-4 w-24 text-accent/55", flip && "-scale-x-100", className)}
    >
      <path
        d="M2 10 C18 2, 28 18, 44 10 S70 2, 86 10 S108 18, 118 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MessagesExperience() {
  const { message, refresh } = useMensajitos();

  return (
    <div className="mt-9 flex min-w-0 flex-col items-center gap-6">
      <article
        className={cn(
          "relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-[#FDF6F4] px-6 pb-10 pt-9 text-center shadow-[0_18px_50px_rgba(120,70,70,0.12)] sm:rounded-[2.4rem] sm:px-12 sm:pb-12 sm:pt-10",
          message.rarity === "legendary" && "shadow-[0_22px_60px_rgba(120,70,70,0.16)]"
        )}
        aria-live="polite"
      >
        <p className="mx-auto inline-flex rounded-full bg-[#F3D6D4] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8A5555]">
          {rarityLabels[message.rarity]}
        </p>

        <blockquote className="relative mx-auto mt-8 max-w-2xl px-2 sm:mt-10 sm:px-6">
          <span
            className="pointer-events-none absolute -left-1 -top-3 font-serif text-5xl leading-none text-accent/35 sm:-left-3 sm:-top-4 sm:text-6xl"
            aria-hidden
          >
            “
          </span>
          <p className="font-handwriting text-[clamp(1.85rem,5.2vw,3rem)] leading-[1.2] text-foreground-soft">
            {message.text}
          </p>
          <span
            className="pointer-events-none absolute -bottom-5 -right-1 font-serif text-5xl leading-none text-accent/35 sm:-bottom-6 sm:-right-3 sm:text-6xl"
            aria-hidden
          >
            ”
          </span>
        </blockquote>

        <div className="mt-10 flex items-center justify-center gap-3 sm:mt-12">
          <WaveFlourish />
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FDF6F4] shadow-[0_6px_18px_rgba(140,80,85,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]"
            aria-hidden
          >
            <Heart className="h-4 w-4 fill-accent text-accent" strokeWidth={1.5} />
          </span>
          <WaveFlourish flip />
        </div>
      </article>

      <button
        type="button"
        onClick={refresh}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        <RefreshCw className="h-4 w-4" aria-hidden /> Otro mensajito
      </button>
    </div>
  );
}
