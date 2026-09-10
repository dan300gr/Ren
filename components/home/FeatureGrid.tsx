import { FEATURE_CARDS } from "@/constants";
import { FeatureCard } from "@/components/home/FeatureCard";

export function FeatureGrid() {
  return (
    <section className="min-w-0 lg:h-full" aria-labelledby="home-sections-title">
      <h2 id="home-sections-title" className="sr-only">
        Explora este pequeño lugar
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:h-full lg:grid-rows-2">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
