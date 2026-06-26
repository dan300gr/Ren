"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { SpotifyEmbed } from "@/components/musica/SpotifyEmbed";
import { VinylRecord } from "@/components/musica/VinylRecord";
import { MUSICA_COPY } from "@/constants/musica";
import type { MusicPlayer } from "@/types/music";

interface VinylPlayerMobileProps {
  player: MusicPlayer;
}

/** Reproductor móvil detallado con vinilo y nota personal. */
export function VinylPlayerMobile({ player }: VinylPlayerMobileProps) {
  const {
    currentSong,
    currentIndex,
    totalSongs,
    isPlaying,
    prev,
    next,
  } = player;

  return (
    <div
      className="flex-1 flex flex-col px-5 pb-8 pt-2 overflow-y-auto bg-gradient-to-b from-cream-100 via-peach-50 to-rose-50"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSong.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center"
        >
          {/* Vinilo */}
          <div className="mt-4 mb-8">
            <VinylRecord song={currentSong} isPlaying={isPlaying} size={240} />
          </div>

          {/* Info track */}
          <div className="flex items-center gap-3 w-full max-w-xs mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-2xl text-warm-800 truncate">
                {currentSong.title}
              </h2>
              <p className="text-sm text-warm-600/60 mt-0.5">{currentSong.artist}</p>
            </div>
            <button
              type="button"
              className="text-rose-400 hover:text-rose-500 transition-colors shrink-0 cursor-default"
              aria-label="Favorito"
            >
              <Heart className="w-5 h-5" fill="currentColor" fillOpacity={0.15} />
            </button>
          </div>

          <div className="w-full max-w-md mb-8">
            <SpotifyEmbed
              key={currentSong.spotifyUrl}
              spotifyUrl={currentSong.spotifyUrl}
              title={currentSong.title}
            />
          </div>

          {/* Controles decorativos para cambiar de canción */}
          <div className="flex items-center justify-center gap-5 mb-8">
            <button
              type="button"
              onClick={prev}
              className="text-warm-700/60 hover:text-warm-800 transition-colors"
              aria-label="Anterior"
            >
              <SkipBack className="w-5 h-5" fill="currentColor" />
            </button>
            <button
              type="button"
              onClick={next}
              className="text-warm-700/60 hover:text-warm-800 transition-colors"
              aria-label="Siguiente"
            >
              <SkipForward className="w-5 h-5" fill="currentColor" />
            </button>
          </div>

          {/* Nota personal */}
          <div className="w-full max-w-sm rounded-[22px] bg-white border border-rose-200/60 shadow-[0_2px_18px_rgba(61,53,48,0.07)] p-6">
            <h3 className="font-serif text-base text-warm-800 mb-3">
              {MUSICA_COPY.playerNoteTitle}
            </h3>
            <p className="text-sm text-warm-600/75 font-light leading-relaxed">
              {currentSong.story}
            </p>
            <p className="mt-4 font-handwriting text-rose-400/70 text-sm">
              ♡
            </p>
          </div>

          <p className="mt-6 text-xs text-warm-600/40 tabular-nums">
            {currentIndex + 1} / {totalSongs}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
