"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { secretLetter } from "@/data/secret-letter";

/** Corazón escondido que revela una carta secreta. */
export function SecretHeart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFound, setIsFound] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isFound ? 0.3 : 0.08 }}
        whileHover={{ opacity: 0.6, scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsFound(true);
          setIsOpen(true);
        }}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-30 w-8 h-8 flex items-center justify-center text-rose-400 focus:outline-none focus-visible:opacity-80 focus-visible:ring-2 focus-visible:ring-rose-300/50 rounded-full"
        aria-label="Descubrir secreto"
      >
        <span className="text-lg">♡</span>
      </motion.button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{secretLetter.title}</DialogTitle>
          </DialogHeader>
          <div
            className="font-serif text-sm md:text-base text-warm-700/90 leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto"
            style={{
              background: "linear-gradient(180deg, #FFFDF8 0%, #F9F5EE 100%)",
            }}
          >
            <div className="p-6 rounded-xl border border-warm-200/30">
              {secretLetter.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
