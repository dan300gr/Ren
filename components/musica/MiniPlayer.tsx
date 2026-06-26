"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import type { Song } from "@/types";
import { cn } from "@/lib/utils";

interface MiniPlayerProps {
  song: Song;
  isPlaying: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

/** Mini reproductor glassmórfico — esquina inferior izquierda. */
export function MiniPlayer({
  song,
  isPlaying,
  onToggle,
  onPrev,
  onNext,
  className,
}: MiniPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-rose-200/70 bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg shadow-rose-900/[0.06] max-w-[320px]",
        className
      )}
      role="region"
      aria-label="Reproductor mini"
    >
      <div
        className="w-10 h-10 rounded-lg shrink-0 shadow-md"
        style={{
          background: `linear-gradient(135deg, ${song.albumColor}, ${song.albumColorSecondary})`,
        }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-warm-800 text-xs font-medium truncate">{song.title}</p>
        <p className="text-warm-600/60 text-[10px] truncate">{song.artist}</p>
        <div className="mt-1.5 h-[2px] bg-rose-200/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-rose-400/70 rounded-full"
            animate={{ width: isPlaying ? "55%" : "20%" }}
            transition={
              isPlaying ? { duration: 6, ease: "linear" } : { duration: 0.3 }
            }
          />
        </div>
      </div>

      <button
        type="button"
        className="text-rose-400/70 hover:text-rose-400 transition-colors shrink-0 cursor-default"
        aria-label="Favorito"
      >
        <Heart className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={onPrev}
          className="p-1 text-warm-600/50 hover:text-warm-800 transition-colors"
          aria-label="Anterior"
        >
          <SkipBack className="w-3.5 h-3.5" fill="currentColor" />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="p-1.5 rounded-full bg-rose-400/90 text-white hover:bg-rose-500 transition-colors"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" fill="currentColor" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
          )}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="p-1 text-warm-600/50 hover:text-warm-800 transition-colors"
          aria-label="Siguiente"
        >
          <SkipForward className="w-3.5 h-3.5" fill="currentColor" />
        </button>
      </div>
    </motion.div>
  );
}
