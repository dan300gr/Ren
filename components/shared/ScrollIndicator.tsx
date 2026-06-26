"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/** Indicador de scroll animado. */
export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="flex flex-col items-center gap-2 text-warm-600/60"
      aria-hidden
    >
      <span className="text-xs tracking-widest uppercase font-light">
        Desliza para descubrir
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}
