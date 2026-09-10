"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function FooterDivider() {
  return <div className="hidden items-center justify-center px-1 md:flex" aria-hidden><div className="h-14 w-px bg-warm-800/10" /></div>;
}

function HeartWithSparkles() {
  return (
    <svg viewBox="0 0 52 52" className="h-11 w-11 shrink-0" aria-hidden>
      <path d="M26 42s-14-10-14-22c0-5 4-9 9-9 3 0 6 2 8 5 2-3 5-5 8-5 5 0 9 4 9 9 0 12-14 22-14 22z" fill="#EFCACA" stroke="#C98686" strokeWidth="1.2" />
      <path d="M12 14l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="#E4A4A4" opacity="0.9" />
      <path d="M40 10l1 2 2.2.3-1.6 1.6.3 2.2-2-1-2 1 .3-2.2-1.6-1.6 2.2-.3z" fill="#E4A4A4" opacity="0.8" />
      <circle cx="44" cy="22" r="1" fill="#E8B4B4" opacity="0.7" />
    </svg>
  );
}

function CherryBlossom() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="20" cy="12" rx="6" ry="10" fill="#F5D0D8" stroke="#C98686" strokeWidth="0.6" transform={`rotate(${angle} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="3.5" fill="#EFCACA" />
      <circle cx="19" cy="19" r="1" fill="#C98686" opacity="0.6" />
    </svg>
  );
}

function HeartOutlineSparkles() {
  return (
    <svg viewBox="0 0 44 44" className="h-10 w-10 shrink-0" aria-hidden>
      <path d="M22 36s-12-9-12-19c0-4.5 3.5-8 8-8 2.8 0 5.2 1.5 6.5 3.8 1.3-2.3 3.7-3.8 6.5-3.8 4.5 0 8 3.5 8 8 0 10-12 19-12 19z" fill="none" stroke="#C98686" strokeWidth="1.5" />
      <path d="M8 12l1 2 2.2.3-1.6 1.6.3 2.2-2-1-2 1 .3-2.2-1.6-1.6 2.2-.3z" fill="#E4A4A4" opacity="0.85" />
      <circle cx="36" cy="10" r="1.2" fill="#E8B4B4" opacity="0.7" />
    </svg>
  );
}

function EnvelopeDeco() {
  return (
    <div className="pointer-events-none absolute -left-3 bottom-2 z-0 hidden sm:block" aria-hidden>
      <div className="relative h-14 w-[4.5rem] rotate-[-8deg]">
        <div className="absolute inset-0 rounded-sm bg-[#f5d0d0] shadow-md" />
        <div className="absolute left-0 right-0 top-0 h-1/2 bg-[linear-gradient(135deg,#f0c0c0_0%,#f5d0d0_50%,#e8b4b4_100%)] [clip-path:polygon(0_0,50%_55%,100%_0)]" />
        <div className="absolute left-1/2 top-[38%] flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-rose-400 text-[8px] text-white shadow-sm">♡</div>
      </div>
    </div>
  );
}

function MaskingTape() {
  return <div className="pointer-events-none absolute -bottom-2 left-1/2 z-20 hidden -translate-x-1/2 sm:block" aria-hidden><div className="h-5 w-16 rotate-[-1.5deg] rounded-[2px] border border-amber-200/50 bg-amber-100/70 shadow-sm" /></div>;
}

function DriedFlowers() {
  const blooms = [[36, 8], [34, 14], [38, 18], [14, 6], [16, 12], [12, 16], [28, 22], [30, 28], [26, 32]];
  return (
    <svg viewBox="0 0 56 56" className="pointer-events-none absolute -right-1 -top-3 z-20 hidden h-14 w-14 sm:block" aria-hidden>
      <path d="M28 52 C28 52 26 38 28 28 C30 18 34 8 36 4" fill="none" stroke="#C4B8A8" strokeWidth="1" opacity="0.6" />
      <path d="M28 52 C28 52 30 36 26 24 C22 12 18 6 14 2" fill="none" stroke="#C4B8A8" strokeWidth="0.8" opacity="0.5" />
      {blooms.map(([cx, cy], index) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 3 === 0 ? 2.2 : 1.6} fill="#F5F0E8" stroke="#E8E0D4" strokeWidth="0.4" />)}
    </svg>
  );
}

/** Footer scrapbook original, ahora sobre los tokens globales. */
export function SiteFooter() {
  return (
    <motion.footer initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative shrink-0 px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative mx-auto max-w-full">
        <EnvelopeDeco />
        <DriedFlowers />
        <MaskingTape />
        <div className="relative rounded-[20px] bg-rose-200/80 p-1 shadow-[0_4px_20px_rgba(181,110,110,0.15)] md:rounded-[22px] md:p-1.5">
          <div className="rounded-[17px] bg-cream-50 px-5 py-5 md:rounded-[19px] md:px-6 md:py-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-0">
              <div className="flex flex-1 items-center justify-center gap-3 md:justify-start md:px-3">
                <HeartWithSparkles />
                <div className="text-center md:text-left"><p className="font-serif text-sm text-warm-800 md:text-[15px]">Hecho con todo mi amor</p><p className="font-handwriting text-lg text-rose-500 md:text-xl">para Ren <span aria-hidden>♡</span></p></div>
              </div>
              <FooterDivider />
              <div className="flex flex-1 flex-col items-center justify-center gap-1.5 md:px-3">
                <CherryBlossom />
                <div className="text-center"><p className="font-serif text-sm text-warm-800 md:text-[15px]">Gracias por ser mi</p><p className="font-handwriting text-lg text-rose-500 md:text-xl">persona favorita.</p></div>
              </div>
              <FooterDivider />
              <div className="flex flex-1 items-center justify-center md:px-2">
                <Link href="/cartas" className="group flex min-h-12 w-full max-w-[260px] items-center gap-3 rounded-2xl border border-rose-200/80 bg-rose-100 px-4 py-3.5 shadow-[inset_0_2px_6px_rgba(181,110,110,0.08)] transition-colors hover:bg-rose-200/60" aria-label="Abrir cartas para cuando tuviste un mal día">
                  <HeartOutlineSparkles />
                  <div><p className="font-serif text-sm text-warm-800 md:text-[15px]">¿Tuviste un mal día?</p><p className="font-handwriting text-lg text-rose-500 transition-colors group-hover:text-rose-600 md:text-xl">Abre esto →</p></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
