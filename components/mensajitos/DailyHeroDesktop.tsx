"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { MessagePaper } from "@/components/mensajitos/MessagePaper";
import { MENSAJITOS_COPY } from "@/constants/mensajitos";
import type { DailyMessage } from "@/types";
import { cn } from "@/lib/utils";

interface DailyHeroDesktopProps {
  message: DailyMessage;
  onRefresh: () => void;
}

/** Hero escritorio del mensajito del día. */
export function DailyHeroDesktop({
  message,
  onRefresh,
}: DailyHeroDesktopProps) {
  const hasPhoto = Boolean(MENSAJITOS_COPY.deskBackground);

  return (
    <div className="relative flex-1 min-h-[520px] overflow-hidden">
      {MENSAJITOS_COPY.deskBackground ? (
        <Image
          src={MENSAJITOS_COPY.deskBackground}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.15) 100%),
              linear-gradient(180deg, #3D2E24 0%, #2A1F18 50%, #1F1712 100%)
            `,
          }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(255,200,150,0.08)_0%,transparent_55%)]" />

      {/* Decoraciones */}
      <div
        className="absolute left-[10%] top-[28%] w-28 bg-[#F5E8C8] p-3 shadow-md rotate-[-3deg] z-[2]"
        aria-hidden
      >
        <p className="font-handwriting text-xs text-warm-700/80">
          {MENSAJITOS_COPY.stickyNote}
        </p>
      </div>
      <div
        className="absolute right-[12%] top-[22%] w-20 bg-[#FAFAFA] p-1.5 pb-5 rounded-sm shadow-lg rotate-[6deg] z-[2]"
        aria-hidden
      >
        <div className="w-full h-14 bg-[#E8D5C4] rounded-sm" />
        <p className="font-handwriting text-[8px] text-warm-700 text-center mt-1">
          {MENSAJITOS_COPY.polaroidCaption} ♡
        </p>
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[520px] px-8 py-12">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className={cn(
            "font-serif text-4xl xl:text-5xl",
            hasPhoto ? "text-white drop-shadow-md" : "text-warm-900"
          )}>
            {MENSAJITOS_COPY.title}{" "}
            <span className="text-rose-200">♡</span>
          </h1>
          <p className={cn(
            "mt-3 text-sm font-light",
            hasPhoto ? "text-white/75" : "text-warm-600"
          )}>
            {MENSAJITOS_COPY.subtitle}{" "}
            <em className="text-rose-400 not-italic font-handwriting text-base">
              {MENSAJITOS_COPY.subtitleHighlight}
            </em>
            {MENSAJITOS_COPY.subtitleEnd}
          </p>
        </motion.header>

        <MessagePaper message={message} size="lg" />

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onRefresh}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-white/90 backdrop-blur-md px-6 py-3 text-sm text-warm-800 shadow-md shadow-rose-900/[0.06] hover:bg-rose-50 transition-colors"
          aria-label={MENSAJITOS_COPY.refreshLabel}
        >
          <RefreshCw className="h-4 w-4" />
          {MENSAJITOS_COPY.refreshLabel}
        </motion.button>

        <p className="mt-4 text-xs text-warm-600/50 font-light">
          ♡ {MENSAJITOS_COPY.dailyFooter}
        </p>
      </div>
    </div>
  );
}
