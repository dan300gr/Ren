"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Heart, SkipBack, SkipForward } from "lucide-react";
import { useRef, useState } from "react";
import { IPodClassic3D } from "@/components/musica/IPodClassic3D";
import { SpotifyEmbed } from "@/components/musica/SpotifyEmbed";
import { MUSICA_COPY } from "@/constants/musica";
import { songs } from "@/data/songs";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 52;

export function MusicCollection() {
  const player = useMusicPlayer();
  const [showStory, setShowStory] = useState(false);
  const touchStart = useRef<number | null>(null);
  const { currentSong, currentIndex, totalSongs, isPlaying } = player;

  return (
    <div className="mt-9 min-w-0">
      <section
        className={cn(
          "relative grid min-h-[34rem] min-w-0 gap-8 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-soft p-5 shadow-[var(--shadow-card)] sm:p-8 lg:items-center lg:p-10",
          showStory
            ? "lg:grid-cols-1"
            : "lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]"
        )}
        aria-label="Reproductor de nuestra música"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientY ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const end = event.changedTouches[0]?.clientY;
          if (end === undefined) return;
          const distance = end - touchStart.current;
          touchStart.current = null;
          if (distance < -SWIPE_THRESHOLD) setShowStory(true);
          if (distance > SWIPE_THRESHOLD) setShowStory(false);
        }}
      >
        <AnimatePresence mode="wait">
          {!showStory && (
            <motion.div
              key="ipod"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex min-w-0 items-center justify-center py-2 sm:py-5"
            >
              <IPodClassic3D
                song={currentSong}
                currentIndex={currentIndex}
                totalSongs={totalSongs}
                isPlaying={isPlaying}
                size="md"
                onPlayingChange={(playing) => (playing ? player.play() : player.pause())}
                onPrev={player.prev}
                onNext={player.next}
                onOpenSpotify={() =>
                  window.open(currentSong.spotifyUrl, "_blank", "noopener,noreferrer")
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {showStory ? (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-auto min-w-0 max-w-2xl"
              >
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate font-serif text-[clamp(2rem,6vw,3rem)] leading-tight text-foreground">
                      {currentSong.title}
                    </h2>
                    <p className="mt-1 text-base text-foreground-muted">{currentSong.artist}</p>
                  </div>
                  <Heart className="mt-2 h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="mt-5 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface p-3">
                  <SpotifyEmbed
                    key={currentSong.id}
                    spotifyUrl={currentSong.spotifyUrl}
                    title={`${currentSong.title} de ${currentSong.artist}`}
                    onPlaybackUpdate={(playing) => (playing ? player.play() : player.pause())}
                    className="rounded-xl"
                  />
                </div>
                <div className="mt-5 rounded-[var(--radius-md)] border border-border bg-paper p-5">
                  <h3 className="font-serif text-lg text-foreground">
                    {MUSICA_COPY.playerNoteTitle}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-foreground-muted">
                    {currentSong.story}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-auto max-w-xl text-center lg:text-left"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent-hover">
                  {MUSICA_COPY.nowPlaying}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.1rem,7vw,4rem)] leading-tight tracking-[-0.04em] text-foreground">
                  {currentSong.title}
                </h2>
                <p className="mt-2 text-lg text-foreground-muted">{currentSong.artist}</p>
                <p className="mt-7 font-handwriting text-2xl leading-snug text-foreground-soft">
                  {MUSICA_COPY.floatingNote} <span className="text-accent">♡</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setShowStory((current) => !current)}
            className={cn(
              "mt-7 flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-3 text-sm font-semibold text-accent-hover transition-colors hover:bg-accent-pale",
              showStory ? "mx-auto" : "mx-auto lg:mx-0"
            )}
            aria-expanded={showStory}
          >
            {showStory ? (
              <><ChevronUp className="h-4 w-4" aria-hidden /> Volver al iPod</>
            ) : (
              <><ChevronDown className="h-4 w-4" aria-hidden /> Ver la historia</>
            )}
          </button>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="song-list-title">
        <h2 id="song-list-title" className="font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
          {MUSICA_COPY.storiesTitle} <span className="text-accent">♡</span>
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {songs.map((song, index) => {
            const selected = index === currentIndex;
            return (
              <button
                key={song.id}
                type="button"
                onClick={() => player.select(index)}
                aria-pressed={selected}
                className={cn(
                  "flex min-h-36 min-w-0 flex-col rounded-[var(--radius-md)] border p-4 text-left transition-all",
                  selected
                    ? "border-border-strong bg-accent-pale shadow-[var(--shadow-card)]"
                    : "border-border bg-surface hover:-translate-y-0.5 hover:border-border-strong"
                )}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-semibold text-white shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${song.albumColor}, ${song.albumColorSecondary})` }}
                  aria-hidden
                >
                  {String(song.id).padStart(2, "0")}
                </span>
                <span className="mt-auto min-w-0 pt-5">
                  <span className="block truncate font-serif text-lg text-foreground">{song.title}</span>
                  <span className="mt-1 block truncate text-sm text-foreground-muted">{song.artist}</span>
                  <span className="mt-2 block text-xs leading-5 text-foreground-muted">{song.shortMessage}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-center gap-6" aria-label="Cambiar de canción">
          <button type="button" onClick={player.prev} className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface text-accent-hover hover:bg-accent-pale" aria-label="Canción anterior">
            <SkipBack className="h-5 w-5" fill="currentColor" aria-hidden />
          </button>
          <span className="text-sm tabular-nums text-foreground-muted">{currentIndex + 1} / {totalSongs}</span>
          <button type="button" onClick={player.next} className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover" aria-label="Siguiente canción">
            <SkipForward className="h-5 w-5" fill="currentColor" aria-hidden />
          </button>
        </div>
      </section>
    </div>
  );
}
