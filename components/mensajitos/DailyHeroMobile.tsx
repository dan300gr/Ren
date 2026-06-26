"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { MessagePaper } from "@/components/mensajitos/MessagePaper";
import { MENSAJITOS_COPY } from "@/constants/mensajitos";
import type { DailyMessage } from "@/types";

interface DailyHeroMobileProps {
  message: DailyMessage;
  onRefresh: () => void;
}

/** Vista principal móvil del mensajito del día. */
export function DailyHeroMobile({
  message,
  onRefresh,
}: DailyHeroMobileProps) {
  return (
    <div className="flex-1 flex flex-col px-5 pb-28 pt-2 bg-gradient-to-b from-cream-100 to-cream-200">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 mt-2"
      >
        <h1 className="font-serif text-3xl text-warm-800">
          {MENSAJITOS_COPY.title}{" "}
          <span className="text-rose-400">♡</span>
        </h1>
        <p className="mt-2 text-sm text-warm-600/60 font-light px-4">
          {MENSAJITOS_COPY.subtitle}{" "}
          <em className="text-rose-400 not-italic font-handwriting text-base">
            {MENSAJITOS_COPY.subtitleHighlight}
          </em>
          {MENSAJITOS_COPY.subtitleEnd}
        </p>
      </motion.header>

      <div className="flex-1 flex items-center justify-center py-4">
        <MessagePaper message={message} size="lg" />
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onRefresh}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-rose-400 text-white py-4 text-sm font-medium shadow-lg shadow-rose-300/30 hover:bg-rose-500 transition-colors"
        aria-label={MENSAJITOS_COPY.refreshLabel}
      >
        <RefreshCw className="h-4 w-4" />
        {MENSAJITOS_COPY.refreshLabel}
      </motion.button>

      <p className="mt-4 text-center text-xs text-warm-600/40">
        ♡ {MENSAJITOS_COPY.dailyFooter}
      </p>
    </div>
  );
}
