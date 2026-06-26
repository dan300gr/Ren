import type { Song } from "@/types";

export interface MusicPlayerState {
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  currentSong: Song;
  totalSongs: number;
}

export interface MusicPlayerActions {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  select: (index: number) => void;
}

export type MusicPlayer = MusicPlayerState & MusicPlayerActions;
