"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { WelcomeModal } from "@/sections/WelcomeModal";
import { SecretHeart } from "@/sections/SecretHeart";
import { WELCOME } from "@/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Inicio con la bienvenida y transición originales. */
export function HomeView() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const seen = sessionStorage.getItem(WELCOME.storageKey);
      setHasEntered(Boolean(seen));
      setShowWelcome(!seen);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const handleEnter = useCallback(() => {
    sessionStorage.setItem(WELCOME.storageKey, "1");
    setHasEntered(true);
    window.setTimeout(() => setShowWelcome(false), reducedMotion ? 0 : 600);
  }, [reducedMotion]);

  if (!ready) return null;

  return (
    <>
      <AnimatePresence>
        {showWelcome && <WelcomeModal onEnter={handleEnter} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.8 }}
      >
        <AppShell activeNav="inicio">
          <div className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:items-stretch">
              <HomeHero />
              <FeatureGrid />
            </div>
          </div>
        </AppShell>
      </motion.div>

      <SecretHeart />
    </>
  );
}
