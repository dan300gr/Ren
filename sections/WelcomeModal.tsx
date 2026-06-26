"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { TypewriterText } from "@/components/shared/TypewriterText";
import { WELCOME } from "@/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface WelcomeModalProps {
  onEnter: () => void;
}

/** Resalta palabras en texto ya mostrado (para headline/subtext). */
function highlightWords(
  text: string,
  words: string[],
  highlightClass: string
) {
  if (!text) return null;

  const pattern = new RegExp(`(${words.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    const isHighlight = words.some(
      (w) => w.toLowerCase() === part.toLowerCase()
    );
    return isHighlight ? (
      <em key={i} className={cn("not-italic font-handwriting", highlightClass)}>
        {part}
      </em>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Modal de bienvenida premium con typewriter único. */
export function WelcomeModal({ onEnter }: WelcomeModalProps) {
  const [phase, setPhase] = useState<"headline" | "subtext" | "done">(
    "headline"
  );
  const reducedMotion = useReducedMotion();

  const onHeadlineComplete = useCallback(() => setPhase("subtext"), []);
  const onSubtextComplete = useCallback(() => setPhase("done"), []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
      >
        {/* Fondo oscuro desenfocado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#1a1410]/80 backdrop-blur-xl"
        />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(255,180,140,0.15) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(200,120,120,0.1) 0%, transparent 50%)",
          }}
          aria-hidden
        />

        {/* Tarjeta */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 24,
          }}
          className="relative w-full max-w-md md:max-w-lg rounded-[36px] md:rounded-[44px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          style={{
            background:
              "linear-gradient(180deg, #FFF8F4 0%, #FDEEE8 45%, #F8E4E8 100%)",
          }}
        >
          {/* Corazones flotantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {[
              { top: "12%", left: "8%", size: 10 },
              { top: "22%", right: "12%", size: 8 },
              { top: "55%", left: "15%", size: 6 },
              { top: "70%", right: "18%", size: 9 },
            ].map((h, i) => (
              <span
                key={i}
                className="absolute text-rose-300/25"
                style={{
                  top: h.top,
                  left: h.left,
                  right: h.right,
                  fontSize: h.size,
                }}
              >
                ♡
              </span>
            ))}
          </div>

          {/* Rama floral */}
          <svg
            className="absolute bottom-6 left-4 w-16 h-20 text-rose-300/30 pointer-events-none"
            viewBox="0 0 60 80"
            fill="none"
            aria-hidden
          >
            <path
              d="M10 70 Q20 50 15 30 Q12 15 25 10 M15 30 Q30 25 35 15 M15 30 Q5 20 8 8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <ellipse cx="25" cy="10" rx="4" ry="6" fill="currentColor" opacity="0.4" />
            <ellipse cx="8" cy="8" rx="3" ry="5" fill="currentColor" opacity="0.3" />
          </svg>

          <div className="relative px-8 py-10 md:px-12 md:py-14 text-center">
            {/* Corazón superior */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              className="mx-auto mb-8 flex h-12 w-12 items-center justify-center"
            >
              <span
                className="text-2xl drop-shadow-[0_0_12px_rgba(220,120,120,0.6)]"
                aria-hidden
              >
                ♥
              </span>
            </motion.div>

            <h1 id="welcome-title" className="sr-only">
              Bienvenida
            </h1>

            {/* Headline */}
            <div className="font-serif text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed text-[#3d2b2b] min-h-[4.5rem] md:min-h-[5rem]">
              {phase === "headline" ? (
                <TypewriterText
                  text={WELCOME.headline}
                  as="span"
                  className="inline"
                  speed={reducedMotion ? 0 : 28}
                  onComplete={onHeadlineComplete}
                  renderContent={(displayed, isComplete) => (
                    <>
                      {isComplete
                        ? highlightWords(
                            WELCOME.headline,
                            [...WELCOME.headlineHighlights],
                            "text-[#c57676]"
                          )
                        : displayed}
                      {!isComplete && <TypewriterCursor />}
                    </>
                  )}
                />
              ) : (
                highlightWords(
                  WELCOME.headline,
                  [...WELCOME.headlineHighlights],
                  "text-[#c57676]"
                )
              )}
            </div>

            {/* Separador */}
            <AnimatePresence>
              {phase !== "headline" && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  className="flex items-center justify-center gap-3 my-7"
                >
                  <div className="h-px w-16 bg-rose-300/40" />
                  <span className="text-rose-400/60 text-xs">♡</span>
                  <div className="h-px w-16 bg-rose-300/40" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtext */}
            <AnimatePresence>
              {phase !== "headline" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm md:text-base text-[#5c4545]/80 font-light leading-relaxed min-h-[3.5rem]"
                >
                  {phase === "subtext" ? (
                    <TypewriterText
                      text={WELCOME.subtext}
                      as="span"
                      className="inline"
                      speed={reducedMotion ? 0 : 22}
                      delay={200}
                      onComplete={onSubtextComplete}
                      renderContent={(displayed, isComplete) => (
                        <>
                          {isComplete
                            ? highlightWords(
                                WELCOME.subtext,
                                [WELCOME.subtextHighlight],
                                "text-[#c57676]"
                              )
                            : displayed}
                          {!isComplete && <TypewriterCursor />}
                        </>
                      )}
                    />
                  ) : (
                    highlightWords(
                      WELCOME.subtext,
                      [WELCOME.subtextHighlight],
                      "text-[#c57676]"
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón */}
            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="mt-10"
                >
                  <button
                    type="button"
                    onClick={onEnter}
                    className="inline-flex items-center justify-center min-w-[160px] rounded-full px-10 py-3.5 font-serif text-base text-white shadow-[0_0_24px_rgba(214,133,133,0.45)] transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50"
                    style={{
                      background: "linear-gradient(90deg, #d68585 0%, #b55d5d 100%)",
                    }}
                    aria-label="Entrar al refugio"
                  >
                    {WELCOME.cta}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TypewriterCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity }}
      className="inline-block w-[2px] h-[1em] bg-rose-400/60 ml-0.5 align-middle"
      aria-hidden
    />
  );
}
