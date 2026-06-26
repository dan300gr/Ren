"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PolaroidCard } from "@/components/nosotras/PolaroidCard";
import { NOSOTRAS_COPY } from "@/constants/nosotras";
import { photos } from "@/data/photos";

interface CollageDesktopProps {
  onSelect: (id: number) => void;
}

/** Collage escritorio con polaroids dispersas y decoraciones. */
export function CollageDesktop({ onSelect }: CollageDesktopProps) {
  return (
    <div className="relative flex-1 min-h-[600px] overflow-hidden bg-white">
      {NOSOTRAS_COPY.backgroundImage && (
        <Image
          src={NOSOTRAS_COPY.backgroundImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Header */}
      <div className="relative z-20 px-8 xl:px-12 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl xl:text-5xl text-warm-800">
            {NOSOTRAS_COPY.title}{" "}
            <span className="text-rose-400">♡</span>
          </h1>
          <p className="mt-2 text-sm text-warm-600/60 font-light">
            {NOSOTRAS_COPY.subtitle}{" "}
            <em className="font-handwriting text-base text-rose-400/80 not-italic">
              {NOSOTRAS_COPY.subtitleHighlight}
            </em>{" "}
            {NOSOTRAS_COPY.subtitleEnd}
          </p>
        </motion.div>
      </div>

      {/* Polaroids */}
      <div className="absolute inset-0 z-10">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20, rotate: photo.placement.rotate - 5 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: photo.placement.rotate,
            }}
            transition={{ delay: 0.05 + i * 0.04, type: "spring", stiffness: 100 }}
            className="absolute"
            style={{
              left: photo.placement.left,
              top: photo.placement.top,
              zIndex: photo.placement.zIndex,
            }}
          >
            <PolaroidCard
              photo={photo}
              size="md"
              onClick={() => onSelect(photo.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Decoraciones */}
      <CollageDecorations />

      {/* Hint inferior */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 right-10 z-20 font-handwriting text-sm text-warm-600/40 flex items-center gap-2"
      >
        {NOSOTRAS_COPY.clickHint}
        <span aria-hidden>→</span>
      </motion.p>
    </div>
  );
}

function CollageDecorations() {
  return (
    <>
      {/* Nota con clip */}
      <div
        className="absolute left-[4%] top-[32%] z-[8] w-36 bg-[#FFFDF5] p-3 shadow-md rotate-[-4deg]"
        aria-hidden
      >
        <div className="absolute -top-3 left-3 w-4 h-6 border-2 border-red-400/60 rounded-sm" />
        <p className="font-handwriting text-xs text-warm-700/80 leading-snug">
          {NOSOTRAS_COPY.pinnedNote}
        </p>
      </div>

      {/* Nota con cinta */}
      <div
        className="absolute right-[10%] top-[62%] z-[8] w-32 bg-[#FFF8F0] p-3 shadow-md rotate-[3deg]"
        aria-hidden
      >
        <div className="absolute -top-1.5 left-4 right-4 h-3 bg-amber-100/50 border border-amber-200/30" />
        <p className="font-handwriting text-xs text-warm-700/80 leading-snug mt-1">
          {NOSOTRAS_COPY.tapedNote}
        </p>
      </div>

      {/* Flores */}
      <div className="absolute left-[45%] top-[28%] z-[1] opacity-40 text-2xl rotate-12" aria-hidden>
        🌸
      </div>
      <div className="absolute right-[28%] bottom-[18%] z-[1] opacity-30 text-xl -rotate-6" aria-hidden>
        ✿
      </div>

      {/* Cámara Instax */}
      <div
        className="absolute right-[4%] bottom-[12%] z-[8] w-20 h-16 rounded-lg shadow-lg rotate-[8deg]"
        style={{
          background: "linear-gradient(145deg, #F8F0E8, #E8E0D8)",
        }}
        aria-hidden
      >
        <div className="absolute top-3 left-3 right-3 h-10 rounded-md bg-[#1a1a1a]/80" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/30" />
      </div>
    </>
  );
}
