"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  X,
} from "lucide-react";
import { PolaroidCard } from "@/components/nosotras/PolaroidCard";
import { NOSOTRAS_COPY } from "@/constants/nosotras";
import { photos } from "@/data/photos";
import type { Photo } from "@/types";

interface PhotoDetailDesktopProps {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onViewAll: () => void;
}

/** Modal detalle escritorio con polaroid, cuaderno y texto. */
export function PhotoDetailDesktop({
  photo,
  onClose,
  onPrev,
  onNext,
  onViewAll,
}: PhotoDetailDesktopProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-warm-900/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-rose-200/70 bg-white/90 text-warm-700 hover:bg-rose-50 transition-colors"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-rose-200/70 bg-white/90 text-warm-700 hover:bg-rose-50 transition-colors"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-rose-200/70 bg-white/90 text-warm-700 hover:bg-rose-50 transition-colors"
        aria-label="Siguiente foto"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="flex items-center gap-8 xl:gap-14 max-w-5xl w-full px-20"
        >
          {/* Cuaderno izquierda */}
          <div className="hidden lg:block w-48 shrink-0" aria-hidden>
            <div
              className="relative bg-[#FFFDF5] p-5 shadow-lg rotate-[-2deg] rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 23px, #E8E0D8 23px, #E8E0D8 24px)",
              }}
            >
              <div className="absolute left-3 top-0 bottom-0 w-px bg-rose-300/30" />
              <p className="font-handwriting text-sm text-warm-700/80 leading-relaxed pl-4">
                {photo.notebookText}
              </p>
            </div>
          </div>

          {/* Polaroid central */}
          <div className="relative shrink-0 mx-auto">
            <PolaroidCard photo={photo} size="lg" />
            <span className="absolute -bottom-1 -right-1 text-rose-400 text-lg" aria-hidden>
              ♡
            </span>
          </div>

          {/* Detalle derecha */}
          <div className="hidden md:block flex-1 min-w-0">
            <p className="text-xs text-warm-600/50 uppercase tracking-widest mb-2">
              {photo.dateLong}
            </p>
            <h2 className="font-serif text-2xl xl:text-3xl text-warm-800 mb-4">
              {photo.title}
            </h2>
            <p className="text-sm text-warm-600/75 font-light leading-relaxed">
              {photo.story}
            </p>
            <button
              type="button"
              onClick={onViewAll}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-white px-5 py-2.5 text-xs text-warm-800 hover:bg-rose-50 transition-colors shadow-sm"
            >
              <Grid3X3 className="h-3.5 w-3.5" />
              {NOSOTRAS_COPY.viewAllPhotos}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
