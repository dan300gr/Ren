"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  as?: "p" | "h1" | "h2" | "span";
  renderContent?: (
    displayed: string,
    isComplete: boolean
  ) => React.ReactNode;
}

/** Texto con efecto máquina de escribir — una sola pasada. */
export function TypewriterText({
  text,
  className,
  speed = 35,
  delay = 0,
  onComplete,
  as: Tag = "p",
  renderContent,
}: TypewriterTextProps) {
  const { displayed, isComplete } = useTypewriter(text, {
    speed,
    delay,
    onComplete,
  });

  return (
    <Tag className={cn(className)}>
      {renderContent ? (
        renderContent(displayed, isComplete)
      ) : (
        <>
          {displayed}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[2px] h-[1em] bg-rose-400/70 ml-0.5 align-middle"
              aria-hidden
            />
          )}
        </>
      )}
    </Tag>
  );
}
