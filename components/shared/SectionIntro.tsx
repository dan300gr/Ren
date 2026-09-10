import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionIntroProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-accent-hover">
          {eyebrow}
        </p>
      )}
      <h1 className={cn("font-serif text-[clamp(2.35rem,8vw,5.2rem)] leading-[0.98] tracking-[-0.045em] text-foreground", eyebrow && "mt-3")}>
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-foreground-muted sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
