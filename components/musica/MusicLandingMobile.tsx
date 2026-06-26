"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { IPodClassic3D } from "@/components/musica/IPodClassic3D";
import { MUSICA_COPY } from "@/constants/musica";
import type { MusicPlayer } from "@/types/music";

const SWIPE_THRESHOLD_PX = 50;

interface MusicLandingMobileProps {
  player: MusicPlayer;
  onOpenPlayer: () => void;
}

/** Vista landing móvil con iPod central. */
export function MusicLandingMobile({ player, onOpenPlayer }: MusicLandingMobileProps) {
  const { currentSong, currentIndex, totalSongs, isPlaying, play, pause, prev, next } =
    player;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

      const deltaY = touch.clientY - touchStart.current.y;
      const deltaX = touch.clientX - touchStart.current.x;
      touchStart.current = null;

      const isSwipeUp =
        deltaY < -SWIPE_THRESHOLD_PX &&
        Math.abs(deltaY) > Math.abs(deltaX) * 1.2;

      if (isSwipeUp) onOpenPlayer();
    },
    [onOpenPlayer]
  );

  const handleTouchCancel = useCallback(() => {
    touchStart.current = null;
  }, []);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-5 pb-28 pt-4 relative bg-gradient-to-b from-cream-100 via-rose-50 to-peach-100 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-3xl text-warm-800">
          {MUSICA_COPY.title}
        </h1>
        <p className="mt-2 text-sm text-warm-600/60 font-light">
          {MUSICA_COPY.subtitle}
        </p>
        <p className="mt-2 font-handwriting text-base text-warm-600/50">
          {MUSICA_COPY.note} ♡
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
        className="rounded-[40px]"
      >
        <IPodClassic3D
          song={currentSong}
          currentIndex={currentIndex}
          totalSongs={totalSongs}
          isPlaying={isPlaying}
          size="md"
          onPlayingChange={(playing) => (playing ? play() : pause())}
          onPrev={prev}
          onNext={next}
          onOpenSpotify={() =>
            window.open(currentSong.spotifyUrl, "_blank", "noopener,noreferrer")
          }
        />
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onOpenPlayer}
        className="mt-10 flex flex-col items-center gap-1 text-warm-600/40 text-xs tracking-widest uppercase py-4 px-8"
        aria-label="Desliza hacia arriba o toca para ver la historia de la canción"
      >
        <span>{MUSICA_COPY.mobileSwipe}</span>
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronUp className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </div>
  );
}
