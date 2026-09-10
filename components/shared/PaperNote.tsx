import { cn } from "@/lib/utils";

export function PaperNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-sm)] border border-border bg-paper px-5 py-5 shadow-[var(--shadow-card)]",
        className
      )}
    >
      <span
        className="absolute left-1/2 top-0 h-4 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-sm bg-accent-soft/80"
        aria-hidden
      />
      <div className="font-handwriting text-[1.4rem] leading-snug text-foreground-soft">
        {children}
      </div>
    </div>
  );
}
