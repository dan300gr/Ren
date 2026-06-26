"use client";

import { useCallback, useEffect, useState } from "react";
import { songs, durationToSeconds } from "@/data/songs";
import type { MusicPlayer } from "@/types/music";

/** Hook del reproductor de música compartido. */
export function useMusicPlayer(): MusicPlayer {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.28);

  const currentSong = songs[currentIndex];
  const totalSongs = songs.length;

  useEffect(() => {
    if (!isPlaying) return;

    const totalSec = durationToSeconds(currentSong.duration);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1 / totalSec / 10;
        if (next >= 1) {
          setCurrentIndex((i) => (i + 1) % songs.length);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const toggle = useCallback(() => setIsPlaying((p) => !p), []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % songs.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
    setProgress(0);
  }, []);

  const select = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  return {
    currentIndex,
    isPlaying,
    progress,
    currentSong,
    totalSongs,
    play,
    pause,
    toggle,
    next,
    prev,
    select,
  };
}
