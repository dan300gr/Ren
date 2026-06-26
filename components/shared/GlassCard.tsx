"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/** Tarjeta con glassmorphism sutil y hover spring. */
export function GlassCard({
  children,
  className,
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -4, scale: 1.01, transition: { type: "spring", stiffness: 300 } }
          : undefined
      }
      whileTap={hover ? { scale: 0.98 } : undefined}
      className={cn(
        "rounded-[24px] border border-white/25 bg-white/15 backdrop-blur-md shadow-lg shadow-warm-900/5",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
