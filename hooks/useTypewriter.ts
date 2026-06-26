"use client";

import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Efecto máquina de escribir — corre una sola vez por montaje.
 * onComplete se guarda en ref para evitar reinicios por re-renders.
 */
export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
) {
  const { speed = 40, delay = 0, onComplete } = options;
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (finishedRef.current) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || speed <= 0) {
      finishedRef.current = true;
      setDisplayed(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          finishedRef.current = true;
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayed, isComplete };
}
