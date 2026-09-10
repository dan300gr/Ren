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
        className="fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-accent shadow-[var(--shadow-card)] backdrop-blur-sm focus:outline-none focus-visible:opacity-100 md:bottom-7 md:right-7"
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
            className="max-h-[60vh] overflow-y-auto whitespace-pre-line rounded-xl bg-paper font-serif text-sm leading-relaxed text-foreground-soft md:text-base"
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
