import { Container } from "@/components/layout/Container";
import { CinematicVideo } from "@/components/media/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeHeroMedia } from "@/data/media";
import { formatEventDateRange } from "@/lib/events";
import type { TourEvent } from "@/types/content";
import { getTranslations } from "next-intl/server";

type HeroSectionProps = {
  nextEvent: TourEvent | null;
};

const eventCtaKeys = {
  "st-moritz-2026": "stMoritz",
  "monte-carlo": "monteCarlo",
} as const;

export async function HeroSection({ nextEvent }: HeroSectionProps) {
  const t = await getTranslations("HomePage.hero");
  const common = await getTranslations("Common");
  const monthNames = [
    common("months.january"),
    common("months.february"),
    common("months.march"),
    common("months.april"),
    common("months.may"),
    common("months.june"),
    common("months.july"),
    common("months.august"),
    common("months.september"),
    common("months.october"),
    common("months.november"),
    common("months.december"),
  ];
  const eventDate = nextEvent
    ? formatEventDateRange(nextEvent, monthNames)
    : t("toBeAnnouncedUppercase");
  const primaryCtaHref = nextEvent?.ctaHref ?? "/tour";
  const eventCtaKey = nextEvent
    ? eventCtaKeys[nextEvent.slug as keyof typeof eventCtaKeys]
    : undefined;
  const primaryCtaLabel = eventCtaKey
    ? t(`eventCtas.${eventCtaKey}`)
    : t("discoverTour");

  return (
    <section className="hero-section" aria-label={t("ariaLabel")}>
      <CinematicVideo
        desktopSrc={homeHeroMedia.desktopVideo}
        mobileSrc={homeHeroMedia.mobileVideo}
        posterImage={homeHeroMedia.posterImage}
        objectPosition={homeHeroMedia.objectPosition}
      >
        <Container size="wide" className="hero-section__content">
          <div className="hero-section__copy">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1>
              {t("titleLineOne")}
              <span>{t("titleLineTwo")}</span>
            </h1>
            <p className="hero-section__description">
              {t("description")}
            </p>
          </div>

          <div className="hero-section__lower">
            <div className="hero-section__event" aria-label={t("nextEventLabel")}>
              <span>{t("nextStage")}</span>
              <strong>{nextEvent?.city ?? t("toBeAnnounced")}</strong>
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
                {t("joinTour")}
              </Button>
            </div>
          </div>
        </Container>
      </CinematicVideo>
    </section>
  );
}
