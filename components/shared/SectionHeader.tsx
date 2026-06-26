"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/** Encabezado de sección con animación de entrada. */
export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-8 md:mb-12", className)}
    >
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-warm-800 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-warm-600/80 font-light max-w-md">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
