interface PreviewProps {
  compact?: boolean;
}

/** Mini preview: pila de sobres para tarjeta Cartas. */
export function EnvelopesPreview(_props: PreviewProps = {}) {
  const colors = ["#F5F0E8", "#F0D4D4", "#EDE0F0", "#F5EBD0", "#FAF6F1"];

  return (
    <div className="relative h-28 flex items-end justify-center">
      {colors.map((color, i) => (
        <div
          key={i}
          className="absolute w-14 h-20 rounded-sm shadow-md border border-black/5"
          style={{
            backgroundColor: color,
            transform: `translateX(${(i - 2) * 14}px) rotate(${(i - 2) * 4}deg)`,
            zIndex: i,
          }}
        >
          <div
            className="absolute top-[42%] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white shadow-sm"
            style={{ backgroundColor: "#D4A5A5" }}
          >
            ♡
          </div>
          <span className="absolute bottom-1.5 right-2 text-[9px] text-warm-600/40">
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Mini preview: iPod rosa para tarjeta Música. */
export function IPodPreview(_props: PreviewProps = {}) {
  return (
    <div className="flex justify-center py-2">
      <div className="w-24 rounded-2xl bg-gradient-to-b from-rose-300 to-rose-400 p-2 shadow-lg">
        <div className="rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 p-1.5">
          <div className="rounded bg-[#1a1a2e] p-2 min-h-[52px]">
            <p className="text-[6px] text-blue-300/70 uppercase tracking-wider mb-1">
              Now Playing
            </p>
            <p className="text-[8px] text-white font-medium truncate">Ahí Estabas Tú</p>
            <p className="text-[6px] text-blue-200/50">Carín León</p>
            <div className="mt-1.5 h-0.5 bg-white/10 rounded-full">
              <div className="h-full w-1/3 bg-blue-400/60 rounded-full" />
            </div>
          </div>
        </div>
        <div className="mt-1.5 mx-auto w-14 h-14 rounded-full bg-rose-200/80 border-4 border-rose-100/50" />
      </div>
    </div>
  );
}

/** Mini preview: polaroids para tarjeta Nosotros. */
export function PolaroidsPreview(_props: PreviewProps = {}) {
  const items = [
    { rot: -10, x: -20, color: "#E8D5C4" },
    { rot: 4, x: 0, color: "#F0E4D8" },
    { rot: 12, x: 22, color: "#EDE0D4" },
  ];

  return (
    <div className="relative h-28 flex items-center justify-center">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute w-16 h-20 bg-[#FAFAFA] rounded-sm shadow-lg p-1.5 pb-5"
          style={{
            transform: `translateX(${item.x}px) rotate(${item.rot}deg)`,
            zIndex: i,
          }}
        >
          <div
            className="w-full h-12 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
        </div>
      ))}
    </div>
  );
}

/** Mini preview: nota adhesiva para tarjeta Mensajito. */
export function StickyNotePreview({ compact = false }: PreviewProps = {}) {
  return (
    <div className={compact ? "flex justify-center py-0" : "flex justify-center py-2"}>
      <div
        className={
          compact
            ? "w-24 md:w-28 rounded-sm shadow-lg p-2.5 md:p-3 rotate-[-2deg]"
            : "w-36 rounded-sm shadow-lg p-4 rotate-[-2deg]"
        }
        style={{ backgroundColor: "#F5D0D0" }}
      >
        <p
          className={
            compact
              ? "font-handwriting text-[10px] md:text-[11px] text-warm-800 leading-snug"
              : "font-handwriting text-sm text-warm-800 leading-snug"
          }
        >
          {compact
            ? "Hoy quiero que sepas que te amo ♡"
            : "Hoy quiero que sepas que estoy muy orgullosa de ti. Te amo ♡"}
        </p>
      </div>
    </div>
  );
}
