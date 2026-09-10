"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Photo } from "@/types";

interface PolaroidProps {
  photo: Photo;
  index: number;
}

/** Polaroid con flip para mensaje escrito a mano. */
export function Polaroid({ photo, index }: PolaroidProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: photo.rotation }}
        whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
        whileHover={{ y: -12, rotate: 0, scale: 1.03, zIndex: 10 }}
        className="relative cursor-pointer"
        style={{ zIndex: isFlipped ? 20 : index }}
        onClick={() => {
          if (isFlipped) {
            setIsExpanded(true);
          } else {
            setIsFlipped(true);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Foto: ${photo.caption}. ${isFlipped ? "Mostrar frente" : "Ver mensaje"}`}
      >
        <div
          className="relative w-[160px] md:w-[200px] aspect-[3/4] preserve-3d transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Frente */}
          <div
            className="absolute inset-0 backface-hidden rounded-sm shadow-xl p-3 pb-10"
            style={{
              backgroundColor: "#FAFAFA",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              className="w-full aspect-square rounded-sm overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: photo.color }}
            >
              <div className="text-center p-4">
                <span className="text-4xl opacity-30">📷</span>
                <p className="mt-2 text-xs text-warm-600/50 font-light">
                  Nuestro momento
                </p>
              </div>
            </div>
            <p className="mt-3 text-center font-handwriting text-sm text-warm-700">
              {photo.caption}
            </p>
          </div>

          {/* Reverso */}
          <div
            className="absolute inset-0 backface-hidden rounded-sm shadow-xl p-6 flex items-center justify-center"
            style={{
              backgroundColor: photo.color,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="font-handwriting text-sm md:text-base text-warm-800 text-center leading-relaxed rotate-[-2deg]">
              {photo.backMessage}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modal expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/50 backdrop-blur-md cursor-pointer"
            onClick={() => setIsExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label={photo.caption}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-lg w-full rounded-[28px] border border-white/20 bg-white/20 backdrop-blur-xl p-8 shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="aspect-[4/3] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: photo.color }}
              >
                <p className="font-handwriting text-xl text-warm-800 text-center px-6">
                  {photo.backMessage}
                </p>
              </div>
              <p className="mt-4 text-center font-serif text-lg text-warm-800">
                {photo.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
