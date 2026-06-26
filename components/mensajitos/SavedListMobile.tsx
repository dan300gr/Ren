"use client";

import { Heart } from "lucide-react";
import { MENSAJITOS_COPY } from "@/constants/mensajitos";
import type { DailyMessage } from "@/types";

interface SavedListMobileProps {
  title?: string;
  messages: DailyMessage[];
  onSelect: (message: DailyMessage) => void;
}

/** Lista móvil de mensajitos. */
export function SavedListMobile({
  title = "Guardados",
  messages,
  onSelect,
}: SavedListMobileProps) {
  return (
    <div
      className="flex-1 px-5 pb-28 pt-2 overflow-y-auto bg-gradient-to-b from-cream-100 to-cream-200"
    >
      <header className="mb-8 mt-2">
        <h1 className="font-serif text-3xl text-warm-800">
          {title}{" "}
          <span className="text-rose-400">♡</span>
        </h1>
        <p className="mt-2 text-sm text-warm-600/60 font-light">
          {title === "Guardados"
            ? MENSAJITOS_COPY.savedSubtitle
            : "Mensajes de días pasados."}
        </p>
      </header>

      {messages.length === 0 ? (
        <p className="text-center text-sm text-warm-600/50 font-light py-12">
          Aún no has guardado ningún mensajito.
        </p>
      ) : (
        <ul className="space-y-3">
          {messages.map((msg) => (
            <li key={msg.id}>
              <button
                type="button"
                onClick={() => onSelect(msg)}
                className="w-full flex items-center gap-4 rounded-2xl border border-rose-200/20 bg-white/70 p-4 text-left hover:bg-white transition-colors"
              >
                <div className="w-12 h-14 shrink-0 bg-[#FFFDF8] shadow-sm border border-warm-200/20 flex items-center justify-center">
                  <span className="font-handwriting text-[8px] text-warm-600 text-center px-1 line-clamp-3">
                    {msg.text}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-warm-500/60 uppercase tracking-wider">
                    {msg.date}
                  </p>
                  <p className="font-handwriting text-sm text-warm-800 truncate mt-0.5">
                    {msg.text}
                  </p>
                </div>
                <Heart
                  className="h-4 w-4 text-rose-400 shrink-0"
                  fill="currentColor"
                  fillOpacity={0.2}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
