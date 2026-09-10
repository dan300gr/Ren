"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/constants";
import type { NavId } from "@/types";
import { cn } from "@/lib/utils";

export function MobileMenu({ activeId }: { activeId?: NavId }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground-soft transition-colors hover:bg-accent-pale min-[56rem]:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content className="fixed inset-y-2 right-2 z-50 flex w-[min(22rem,calc(100%-1rem))] flex-col rounded-[var(--radius-xl)] border border-border bg-background p-5 shadow-[var(--shadow-raised)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex items-center justify-between border-b border-border-soft pb-5">
            <Dialog.Title className="font-serif text-2xl text-foreground">
              para Ren <span className="text-accent">♡</span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground-soft transition-colors hover:bg-accent-pale"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <nav className="mt-6 flex flex-col gap-2" aria-label="Navegación móvil">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-base transition-colors",
                    isActive
                      ? "bg-accent-pale font-medium text-accent-hover"
                      : "text-foreground-soft hover:bg-surface-soft hover:text-foreground"
                  )}
                >
                  <span>{link.label}</span>
                  <span className={isActive ? "text-accent" : "text-border-strong"}>
                    {isActive ? "♥" : "♡"}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl bg-surface-soft p-5 text-center">
            <Heart className="mx-auto h-5 w-5 text-accent" aria-hidden />
            <p className="mt-2 font-handwriting text-xl text-foreground-soft">
              Mi lugar favorito eres tú.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
