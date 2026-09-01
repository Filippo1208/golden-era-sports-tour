import { Container } from "@/components/layout/Container";
import { CinematicVideo } from "@/components/media/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeHeroMedia } from "@/data/media";
import { formatEventDateRange } from "@/lib/events";
import type { TourEvent } from "@/types/content";

type HeroSectionProps = {
  nextEvent: TourEvent | null;
};

export function HeroSection({ nextEvent }: HeroSectionProps) {
  const eventDate = nextEvent ? formatEventDateRange(nextEvent) : "TO BE ANNOUNCED";
  const primaryCtaHref = nextEvent?.ctaHref ?? "/tour";
  const primaryCtaLabel = nextEvent?.ctaLabel ?? "Discover the Tour";

  return (
    <section className="hero-section" aria-label="Golden Era Sports Tour">
      <CinematicVideo
        desktopSrc={homeHeroMedia.desktopVideo}
        mobileSrc={homeHeroMedia.mobileVideo}
        posterImage={homeHeroMedia.posterImage}
        objectPosition={homeHeroMedia.objectPosition}
      >
        <Container size="wide" className="hero-section__content">
          <div className="hero-section__copy">
            <Eyebrow>Golden Era Sports Tour</Eyebrow>
            <h1>
              The Evolution of Tennis,
              <span>Played by Amateurs.</span>
            </h1>
            <p className="hero-section__description">
              A global tennis tour celebrating the heritage and evolution of
              the game.
            </p>
          </div>

          <div className="hero-section__lower">
            <div className="hero-section__event" aria-label="Next event">
              <span>Next stage</span>
              <strong>{nextEvent?.city ?? "To be announced"}</strong>
              <small>{eventDate}</small>
            </div>

            <div className="hero-section__actions">
              <Button
                href={primaryCtaHref}
                className="hero-section__primary-cta"
                variant="primary"
                onDark
              >
                {primaryCtaLabel}
              </Button>
              <Button
                href="/join"
                className="hero-section__secondary-cta"
                variant="text"
                onDark
              >
                Join the Tour
              </Button>
            </div>
          </div>
        </Container>
      </CinematicVideo>
    </section>
  );
}
