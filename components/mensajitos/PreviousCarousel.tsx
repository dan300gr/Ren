"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MessageSlipCard } from "@/components/mensajitos/MessagePaper";
import { MENSAJITOS_COPY } from "@/constants/mensajitos";
import type { DailyMessage } from "@/types";
import { cn } from "@/lib/utils";

interface PreviousCarouselProps {
  messages: DailyMessage[];
  savedIds: number[];
  onSelect: (message: DailyMessage) => void;
}

/** Carrusel de mensajitos anteriores. */
export function PreviousCarousel({
  messages,
  savedIds,
  onSelect,
}: PreviousCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const scroll = useCallback((dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setActiveDot(Math.round(el.scrollLeft / 160));
  }, []);

  return (
    <section
      className="shrink-0 bg-gradient-to-b from-[#F8F0EE] to-[#F5EBE8] px-8 xl:px-12 py-10 border-t border-rose-200/20"
      aria-label="Mensajitos anteriores"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-warm-800">
          {MENSAJITOS_COPY.previousTitle}{" "}
          <span className="text-rose-400">♡</span>
        </h2>
        <div className="flex gap-2">
          <NavBtn onClick={() => scroll(-1)} label="Anterior">
            <ChevronLeft className="w-4 h-4" />
          </NavBtn>
          <NavBtn onClick={() => scroll(1)} label="Siguiente">
            <ChevronRight className="w-4 h-4" />
          </NavBtn>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="snap-start">
            <MessageSlipCard
              message={msg}
              isSaved={savedIds.includes(msg.id)}
              onClick={() => onSelect(msg)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-5">
        {messages.slice(0, Math.min(6, messages.length)).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              activeDot === i ? "w-5 bg-rose-400" : "w-1.5 bg-rose-300/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}

function NavBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-300/30 bg-white/60 text-warm-700 hover:bg-white transition-colors"
      aria-label={label}
    >
      {children}
    </button>
  );
}
