"use client";

import { IPodClassic3D } from "@/components/musica/IPodClassic3D";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";

/** @deprecated Usar MusicaExperience */
export function MusicContent() {
  const player = useMusicPlayer();
  return (
    <IPodClassic3D
      song={player.currentSong}
      currentIndex={player.currentIndex}
      totalSongs={player.totalSongs}
      isPlaying={player.isPlaying}
      onPlayingChange={(playing) =>
        playing ? player.play() : player.pause()
      }
      onPrev={player.prev}
      onNext={player.next}
    />
  );
}

export function MusicSection() {
  return <MusicContent />;
}
