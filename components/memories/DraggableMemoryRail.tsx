"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

export function DraggableMemoryRail({ children }: { children: ReactNode }) {
  const gesture = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null);
  const dragged = useRef(false);
  const [dragging, setDragging] = useState(false);

  function finish(event: PointerEvent<HTMLDivElement>) {
    if (gesture.current?.pointerId !== event.pointerId) return;
    gesture.current = null;
    event.currentTarget.style.scrollSnapType = "";
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      role="region"
      aria-label="Más recuerdos: arrastra para desplazarte"
      tabIndex={0}
      data-no-swipe
      className={`mt-5 flex select-none snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&_a]:cursor-inherit ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0 || !event.isPrimary) return;
        dragged.current = false;
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        gesture.current = { pointerId: event.pointerId, x: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
      }}
      onPointerMove={(event) => {
        const start = gesture.current;
        if (!start || start.pointerId !== event.pointerId) return;
        if (!(event.buttons & 1)) {
          finish(event);
          return;
        }
        const distance = event.clientX - start.x;
        if (!dragged.current) {
          if (Math.abs(distance) < 6) return;
          dragged.current = true;
          event.currentTarget.style.scrollSnapType = "none";
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }
        event.preventDefault();
        event.currentTarget.scrollLeft = start.scrollLeft - distance;
      }}
      onPointerUp={finish}
      onPointerCancel={finish}
      onLostPointerCapture={finish}
      onDragStartCapture={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        if (dragged.current && event.detail !== 0) {
          event.preventDefault();
          event.stopPropagation();
          dragged.current = false;
        }
      }}
    >
      {children}
    </div>
  );
}
