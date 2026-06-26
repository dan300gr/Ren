"use client";

import { motion } from "framer-motion";
import type { Song } from "@/types";

interface VinylRecordProps {
  song: Song;
  isPlaying: boolean;
  size?: number;
}

/** Disco de vinilo giratorio con foto en el centro. */
export function VinylRecord({ song, isPlaying, size = 260 }: VinylRecordProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-full h-full rounded-full shadow-2xl"
        style={{
          background: `
            radial-gradient(circle at center, #1a1a1a 18%, transparent 18.5%),
            repeating-radial-gradient(circle at center, #222 0px, #222 2px, #111 2px, #111 4px)
          `,
        }}
      >
        {/* Label central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] rounded-full overflow-hidden border-4 border-[#1a1a1a] shadow-inner">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${song.albumColor}, ${song.albumColorSecondary})`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#1a1a1a]" />
          </div>
        </div>
      </motion.div>

      {/* Brillo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
