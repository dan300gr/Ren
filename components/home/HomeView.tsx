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

/** Vista principal del inicio con modal de bienvenida. */
export function HomeView() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const seen = sessionStorage.getItem(WELCOME.storageKey);
    if (seen) {
      setHasEntered(true);
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
    setReady(true);
  }, []);

  const handleEnter = useCallback(() => {
    sessionStorage.setItem(WELCOME.storageKey, "1");
    setHasEntered(true);
    setTimeout(() => setShowWelcome(false), reducedMotion ? 0 : 600);
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
        <AppShell activeNav="inicio" theme="light">
          <div className="flex flex-col lg:flex-row lg:gap-6 flex-1 min-h-0 px-1 pb-1 md:px-2 md:pb-2">
            <HomeHero />
            <FeatureGrid theme="light" />
          </div>
        </AppShell>
      </motion.div>

      <SecretHeart />
    </>
  );
}
