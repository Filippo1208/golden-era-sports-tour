import { EventCountdown } from "@/components/event/EventCountdown";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { HomeConceptSection } from "@/components/sections/HomeConceptSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { tourEvents } from "@/data/events";
import { getNextEvent } from "@/lib/events";

export default function Home() {
  const nextEvent = getNextEvent(tourEvents);

  return (
    <PublicPageShell>
      <HeroSection nextEvent={nextEvent} />
      <EventCountdown event={nextEvent} />
      <HomeConceptSection />
    </PublicPageShell>
  );
}
