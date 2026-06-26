"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PolaroidCard } from "@/components/nosotras/PolaroidCard";
import { photos } from "@/data/photos";
import type { Photo } from "@/types";

interface PhotoDetailMobileProps {
  photo: Photo;
  onPrev: () => void;
  onNext: () => void;
}

/** Vista detalle móvil con polaroid grande y navegación. */
export function PhotoDetailMobile({
  photo,
  onPrev,
  onNext,
}: PhotoDetailMobileProps) {
  return (
    <div
      className="flex-1 flex flex-col px-5 pb-32 pt-2 overflow-y-auto bg-gradient-to-b from-cream-100 to-peach-50"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center"
        >
          <div className="mt-4 mb-8">
            <PolaroidCard photo={photo} size="lg" showTape />
          </div>

          <div className="w-full max-w-sm text-center px-2">
            <p className="text-xs text-warm-600/50 uppercase tracking-widest mb-2">
              {photo.dateLong}
            </p>
            <h2 className="font-serif text-xl text-warm-800 mb-4">
              {photo.title}
            </h2>
            <p className="text-sm text-warm-600/75 font-light leading-relaxed">
              {photo.story}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navegación */}
      <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-0 right-0 flex items-center justify-center gap-6 z-40">
        <button
          type="button"
          onClick={onPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-400/90 text-white shadow-lg shadow-rose-300/30 hover:bg-rose-500 transition-colors"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <span className="text-sm text-warm-600/60 tabular-nums min-w-[52px] text-center">
          {photo.id} / {photos.length}
        </span>

        <button
          type="button"
          onClick={onNext}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-400/90 text-white shadow-lg shadow-rose-300/30 hover:bg-rose-500 transition-colors"
          aria-label="Siguiente foto"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
