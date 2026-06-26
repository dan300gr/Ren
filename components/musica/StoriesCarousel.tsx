"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { songs } from "@/data/songs";
import { MUSICA_COPY } from "@/constants/musica";
import type { MusicPlayer } from "@/types/music";
import { cn } from "@/lib/utils";

interface StoriesCarouselProps {
  player: MusicPlayer;
}

/** Carrusel de historias detrás de cada canción. */
export function StoriesCarousel({ player }: StoriesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const scroll = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / 280);
    setActiveDot(Math.min(index, songs.length - 1));
  }, []);

  return (
    <section
      className="shrink-0 bg-gradient-to-b from-cream-100 to-rose-50 px-6 xl:px-10 py-7 border-t border-rose-200/50"
      aria-label="Historias de canciones"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl xl:text-2xl text-warm-800">
          {MUSICA_COPY.storiesTitle}{" "}
          <span className="text-rose-400">♡</span>
        </h2>
        <div className="flex gap-2">
          <CarouselBtn onClick={() => scroll(-1)} ariaLabel="Anterior">
            <ChevronLeft className="w-4 h-4" />
          </CarouselBtn>
          <CarouselBtn onClick={() => scroll(1)} ariaLabel="Siguiente">
            <ChevronRight className="w-4 h-4" />
          </CarouselBtn>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-1 px-1"
      >
        {songs.map((song, i) => (
          <motion.article
            key={song.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "snap-start shrink-0 w-[260px] rounded-[18px] bg-white border border-rose-200/60 p-4 shadow-[0_2px_18px_rgba(61,53,48,0.07)]",
              player.currentIndex === i && "ring-2 ring-rose-300/40"
            )}
          >
            <div className="flex gap-3">
              <div
                className="w-14 h-14 rounded-xl shrink-0 shadow-md flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${song.albumColor}, ${song.albumColorSecondary})`,
                }}
              >
                <span className="text-white/60 text-xs font-medium">
                  {String(song.id).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-warm-800 truncate">
                  {song.title}
                </p>
                <p className="text-xs text-warm-600/60 truncate">{song.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  player.select(i);
                  player.play();
                }}
                className="self-center flex h-8 w-8 items-center justify-center rounded-full bg-rose-400 text-white shadow-md hover:bg-rose-500 transition-colors shrink-0"
                aria-label={`Reproducir ${song.title}`}
              >
                <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
              </button>
            </div>
            <p className="mt-3 text-xs text-warm-600/70 font-light leading-relaxed line-clamp-2">
              {song.shortMessage}
            </p>
          </motion.article>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-1.5 mt-4">
        {songs.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              scrollRef.current?.scrollTo({ left: i * 280, behavior: "smooth" });
              setActiveDot(i);
            }}
            className={cn(
              "h-1.5 rounded-full transition-all",
              activeDot === i
                ? "w-5 bg-rose-400"
                : "w-1.5 bg-rose-300/40"
            )}
            aria-label={`Ir a canción ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function CarouselBtn({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-300/30 bg-white/50 text-warm-700 hover:bg-white/80 transition-colors"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
