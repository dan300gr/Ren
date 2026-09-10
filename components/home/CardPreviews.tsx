interface PreviewProps {
  compact?: boolean;
}

/** Mini preview: pila de sobres para tarjeta Cartas. */
export function EnvelopesPreview() {
  const colors = ["#F5F0E8", "#F0D4D4", "#EDE0F0", "#F5EBD0", "#FAF6F1"];

  return (
    <div className="relative flex h-24 items-end justify-center">
      {colors.map((color, i) => (
        <div
          key={i}
          className="absolute h-[4.5rem] w-12 rounded-sm border border-black/5 shadow-md"
          style={{
            backgroundColor: color,
            transform: `translateX(${(i - 2) * 12}px) rotate(${(i - 2) * 4}deg)`,
            zIndex: i,
          }}
        >
          <div
            className="absolute top-[42%] left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full text-[7px] text-white shadow-sm"
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
export function IPodPreview() {
  return (
    <div className="flex justify-center py-1">
      <div className="w-[5.25rem] rounded-2xl bg-gradient-to-b from-rose-300 to-rose-400 p-1.5 shadow-lg">
        <div className="rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 p-1">
          <div className="min-h-[44px] rounded bg-[#1a1a2e] p-1.5">
            <p className="mb-0.5 text-[5px] uppercase tracking-wider text-blue-300/70">
              Now Playing
            </p>
            <p className="truncate text-[7px] font-medium text-white">Ahí Estabas Tú</p>
            <p className="text-[5px] text-blue-200/50">Carín León</p>
            <div className="mt-1 h-0.5 rounded-full bg-white/10">
              <div className="h-full w-1/3 rounded-full bg-blue-400/60" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-1.5 h-12 w-12 rounded-full border-4 border-rose-100/50 bg-rose-200/80" />
      </div>
    </div>
  );
}

/** Mini preview: polaroids para tarjeta Nosotros. */
export function PolaroidsPreview() {
  const items = [
    { rot: -10, x: -18, color: "#E8D5C4" },
    { rot: 4, x: 0, color: "#F0E4D8" },
    { rot: 12, x: 18, color: "#EDE0D4" },
  ];

  return (
    <div className="relative flex h-24 items-center justify-center">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute h-[4.5rem] w-14 rounded-sm bg-[#FAFAFA] p-1 pb-4 shadow-lg"
          style={{
            transform: `translateX(${item.x}px) rotate(${item.rot}deg)`,
            zIndex: i,
          }}
        >
          <div
            className="h-10 w-full rounded-sm"
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
    <div className={compact ? "flex justify-center py-0" : "flex justify-center py-1"}>
      <div
        className={
          compact
            ? "w-24 rotate-[-2deg] rounded-sm p-2.5 shadow-lg md:w-28 md:p-3"
            : "w-32 rotate-[-2deg] rounded-sm p-3 shadow-lg"
        }
        style={{ backgroundColor: "#F5D0D0" }}
      >
        <p
          className={
            compact
              ? "font-handwriting text-[10px] leading-snug text-warm-800 md:text-[11px]"
              : "font-handwriting text-[13px] leading-snug text-warm-800"
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
