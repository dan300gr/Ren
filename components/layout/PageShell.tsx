"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { SecretHeart } from "@/sections/SecretHeart";
import type { NavId } from "@/types";
import { cn } from "@/lib/utils";

interface PageShellProps {
  activeNav: NavId;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/** Layout interior para páginas de sección. */
export function PageShell({
  activeNav,
  title,
  subtitle,
  children,
  className,
}: PageShellProps) {
  return (
    <>
      <AppShell activeNav={activeNav}>
        <div className="flex-1 px-3 pb-3 md:px-5 md:pb-5 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "h-full rounded-[22px] md:rounded-[26px] bg-cream-50 overflow-y-auto",
              className
            )}
          >
            <div className="px-6 py-8 md:px-12 md:py-12 max-w-5xl mx-auto">
              <header className="mb-10 md:mb-14">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-800 tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-3 text-base md:text-lg text-warm-600/70 font-light max-w-xl">
                    {subtitle}
                  </p>
                )}
              </header>
              {children}
            </div>
          </motion.div>
        </div>
      </AppShell>
      <SecretHeart />
    </>
  );
}
