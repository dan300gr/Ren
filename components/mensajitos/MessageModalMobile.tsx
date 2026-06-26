"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { MessageSlipCard } from "@/components/mensajitos/MessagePaper";
import { MENSAJITOS_COPY } from "@/constants/mensajitos";
import type { DailyMessage } from "@/types";

interface MessageModalMobileProps {
  message: DailyMessage;
  isSaved: boolean;
  onSave: () => void;
  onClose: () => void;
}

/** Modal móvil para ver y guardar un mensajito. */
export function MessageModalMobile({
  message,
  isSaved,
  onSave,
  onClose,
}: MessageModalMobileProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 bg-warm-900/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={message.text}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={message.id}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="w-full max-w-sm"
        >
          <div className="scale-110 origin-center mb-8">
            <MessageSlipCard message={message} isSaved={isSaved} />
          </div>

          <button
            type="button"
            onClick={onSave}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-rose-400 text-white py-4 text-sm font-medium shadow-lg shadow-rose-300/30 hover:bg-rose-500 transition-colors"
          >
            <Heart
              className="h-4 w-4"
              fill={isSaved ? "currentColor" : "none"}
            />
            {isSaved ? "Guardado" : MENSAJITOS_COPY.saveLabel}
          </button>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={onClose}
        className="absolute bottom-10 flex h-12 w-12 items-center justify-center rounded-full border border-rose-200/70 bg-white/90 text-warm-700 hover:bg-rose-50 transition-colors shadow-md"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}
