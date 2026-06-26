"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IPodClassic3D } from "@/components/musica/IPodClassic3D";
import { MiniPlayer } from "@/components/musica/MiniPlayer";
import { MUSICA_COPY } from "@/constants/musica";
import type { MusicPlayer } from "@/types/music";
import { cn } from "@/lib/utils";

interface MusicHeroDesktopProps {
  player: MusicPlayer;
}

/** Hero escritorio: mesa, iPod, notas y mini player. */
export function MusicHeroDesktop({ player }: MusicHeroDesktopProps) {
  const { currentSong, currentIndex, totalSongs, isPlaying, play, pause, toggle, prev, next } =
    player;
  const hasPhoto = Boolean(MUSICA_COPY.deskBackground);

  return (
    <div className="relative flex-1 min-h-[480px] overflow-hidden">
      {/* Fondo mesa */}
      {MUSICA_COPY.deskBackground ? (
        <Image
          src={MUSICA_COPY.deskBackground}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.12) 0%, transparent 45%, rgba(0,0,0,0.2) 100%),
              linear-gradient(180deg, #3D2E24 0%, #2A1F18 45%, #1A1410 100%)
            `,
          }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `repeating-linear-gradient(88deg, transparent, transparent 70px, rgba(0,0,0,0.12) 70px, rgba(0,0,0,0.12) 72px)`,
            }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,rgba(255,190,140,0.1)_0%,transparent_55%)]" />

      {/* Decoraciones */}
      <div className="absolute left-[8%] bottom-[22%] z-[2]" aria-hidden>
        <div className="w-9 h-12 rounded-full bg-amber-900/25 border border-amber-700/15" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-gradient-to-t from-amber-400 to-amber-200 rounded-full opacity-70" />
      </div>
      <div
        className="absolute left-[18%] bottom-[30%] w-16 bg-[#FAFAFA] p-1 pb-4 rounded-sm shadow-lg rotate-[-5deg] z-[2]"
        aria-hidden
      >
        <div className="w-full h-11 bg-[#E8D5C4] rounded-sm" />
      </div>
      <div className="absolute right-[22%] top-[20%] opacity-30 text-lg z-[1]" aria-hidden>
        🌸
      </div>

      {/* Texto */}
      <div className="relative z-10 px-8 xl:px-12 pt-8 max-w-md">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "font-serif text-4xl xl:text-[2.75rem] leading-tight",
            hasPhoto ? "text-white drop-shadow-md" : "text-warm-900"
          )}
        >
          {MUSICA_COPY.title}{" "}
          <span className="text-rose-200">♡</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className={cn(
            "mt-2 text-sm font-light",
            hasPhoto ? "text-white/75" : "text-warm-600"
          )}
        >
          {MUSICA_COPY.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className={cn(
            "mt-3 font-handwriting text-lg",
            hasPhoto ? "text-white/60" : "text-warm-600/70"
          )}
        >
          {MUSICA_COPY.note}{" "}
          <span className="text-rose-400">♡</span>
        </motion.p>
      </div>

      {/* iPod central-derecha */}
      <div className="absolute right-[8%] xl:right-[12%] top-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <IPodClassic3D
            song={currentSong}
            currentIndex={currentIndex}
            totalSongs={totalSongs}
            isPlaying={isPlaying}
            onPlayingChange={(playing) => (playing ? play() : pause())}
            onPrev={prev}
            onNext={next}
            onOpenSpotify={() =>
              window.open(currentSong.spotifyUrl, "_blank", "noopener,noreferrer")
            }
          />
        </motion.div>
      </div>

      {/* Nota flotante */}
      <motion.div
        initial={{ opacity: 0, rotate: -3 }}
        animate={{ opacity: 1, rotate: -2 }}
        transition={{ delay: 0.4 }}
        className="absolute right-[6%] bottom-[28%] z-10 max-w-[180px] hidden md:block"
      >
        <div
          className="px-4 py-3 shadow-lg"
          style={{
            background: "#F5F0E8",
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 85%, 90% 100%, 0% 85%)",
          }}
        >
          <p className="font-handwriting text-sm text-warm-700/80 leading-snug">
            {MUSICA_COPY.floatingNote}{" "}
            <span className="text-rose-400">♡</span>
          </p>
        </div>
      </motion.div>

      {/* Mini player */}
      <div className="absolute left-8 xl:left-12 bottom-8 z-20">
        <MiniPlayer
          song={currentSong}
          isPlaying={isPlaying}
          onToggle={toggle}
          onPrev={prev}
          onNext={next}
        />
      </div>
    </div>
  );
}
