"use client";

import { useState } from "react";
import { Envelope } from "@/components/Envelope";
import { letters } from "@/data/letters";

/** Contenido de cartas para la página dedicada. */
export function LettersContent() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-10 items-start justify-items-center">
      {letters.map((letter, index) => (
        <Envelope
          key={letter.id}
          letter={letter}
          index={index}
          isOpen={openId === letter.id}
          onOpen={() => setOpenId(letter.id)}
          onClose={() => setOpenId(null)}
        />
      ))}
    </div>
  );
}

/** @deprecated Usar LettersContent en páginas dedicadas */
export function LettersSection() {
  return <LettersContent />;
}
