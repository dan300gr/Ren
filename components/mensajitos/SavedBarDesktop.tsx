"use client";

import { ArrowRight } from "lucide-react";
import { MENSAJITOS_COPY } from "@/constants/mensajitos";

interface SavedBarDesktopProps {
  savedCount: number;
  onViewAll: () => void;
}

/** Barra inferior de mensajitos guardados. */
export function SavedBarDesktop({ savedCount, onViewAll }: SavedBarDesktopProps) {
  return (
    <section className="shrink-0 bg-gradient-to-b from-rose-50 to-cream-100 px-8 xl:px-12 py-6 flex items-center justify-between border-t border-rose-200/50">
      <div>
        <h2 className="font-serif text-xl text-warm-800">
          {MENSAJITOS_COPY.savedTitle}{" "}
          <span className="text-rose-500">♡</span>
        </h2>
        <p className="mt-1 text-xs text-warm-600/60 font-light">
          {MENSAJITOS_COPY.savedSubtitle}
        </p>
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-white px-5 py-2.5 text-xs text-warm-700 shadow-sm hover:bg-rose-50 transition-colors"
      >
        {MENSAJITOS_COPY.viewAll}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
      <span className="sr-only">{savedCount} guardados</span>
    </section>
  );
}
