"use client";

import { motion } from "framer-motion";
import { PolaroidCard } from "@/components/nosotras/PolaroidCard";
import { NOSOTRAS_COPY } from "@/constants/nosotras";
import { photos } from "@/data/photos";

interface StackGalleryMobileProps {
  activeIndex: number;
  onSelect: (id: number) => void;
  onSwipe: (dir: 1 | -1) => void;
}

/** Galería móvil con polaroids apiladas. */
export function StackGalleryMobile({
  activeIndex,
  onSelect,
}: StackGalleryMobileProps) {
  const visibleCount = 3;

  return (
    <div
      className="flex-1 flex flex-col px-5 pb-28 pt-2 bg-gradient-to-b from-cream-100 to-cream-200"
    >
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-3xl text-warm-800">
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
      </motion.header>

      <div className="relative flex-1 flex items-center justify-center min-h-[340px]">
        {photos.slice(activeIndex, activeIndex + visibleCount).map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: i * 8,
              rotate: photo.rotation + i * 2,
              scale: 1 - i * 0.04,
            }}
            transition={{ delay: i * 0.06 }}
            className="absolute"
            style={{ zIndex: visibleCount - i }}
          >
            <PolaroidCard
              photo={photo}
              size="md"
              onClick={() => onSelect(photo.id)}
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => onSelect(photos[activeIndex].id)}
        className="mt-4 flex flex-col items-center gap-1 text-warm-600/40 text-xs tracking-wide"
      >
        <span>{NOSOTRAS_COPY.mobileSwipe} ♡</span>
      </motion.button>
    </div>
  );
}
