import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { TourEvent, TourEventLandingContent } from "@/types/content";

type TourStageLandingProps = {
  event: TourEvent & { landingContent: TourEventLandingContent };
};

const scheduleMessageKeys = {
  "monte-carlo-saturday-practice": "saturdayPractice",
  "monte-carlo-sunday-tournament": "sundayTournament",
  "monte-carlo-sunday-evening": "sundayEvening",
} as const;

const includedItemKeys = [
  "tournamentAccess",
  "clubAccess",
  "apparel",
  "prizes",
  "foodBeverages",
] as const;

function publicAssetExists(assetPath?: string | null) {
  if (!assetPath || assetPath.startsWith("http")) {
    return false;
  }

  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

function publicAssetLabel(assetPath?: string | null) {
  return assetPath ? `public${assetPath}` : "public/images/events/event-hero.jpg";
}

export async function TourStageLanding({ event }: TourStageLandingProps) {
  const t = await getTranslations("TourStagePage.monteCarlo");
  const content = event.landingContent;
  const hasHeroImage = publicAssetExists(event.heroImage);

  return (
    <div className="tour-stage-page">
      <section className="tour-stage-hero" aria-labelledby="tour-stage-title">
        <Container size="wide" className="tour-stage-hero__grid">
          <div className="tour-stage-hero__copy">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 id="tour-stage-title">{event.city}</h1>

            <p className="tour-stage-hero__meta">
              <span>{t("hero.dateLabel")}</span>
              <span>{content.heroVenueLabel}</span>
            </p>

            <div className="tour-stage-hero__actions">
              <Button href={content.heroPrimaryCta.href}>
                {t("hero.primaryCta")}
              </Button>
              {content.heroSecondaryCta ? (
                <Button href={content.heroSecondaryCta.href} variant="text">
                  {t("hero.secondaryCta")}
                </Button>
              ) : null}
            </div>
          </div>

          <figure className="tour-stage-hero__media">
            {hasHeroImage && event.heroImage ? (
              <Image
                src={event.heroImage}
                alt={t("hero.imageAlt")}
                fill
                preload
                sizes="(max-width: 980px) 100vw, 61vw"
                className="tour-stage-hero__image"
              />
            ) : (
              <ImagePlaceholder
                label={publicAssetLabel(event.heroImage)}
                aspectRatio="16:9"
                className="tour-stage-hero__placeholder"
              />
            )}
          </figure>
        </Container>
      </section>

      <Section className="tour-stage-section tour-stage-weekend">
        <Container className="tour-stage-section__content">
          <div className="tour-stage-section__intro">
            <h2>{t("programme.title")}</h2>
            <p>{t("programme.intro")}</p>
          </div>

          <ol className="tour-programme" aria-label={t("programme.ariaLabel")}>
            {content.schedule.map((item) => {
              const messageKey =
                scheduleMessageKeys[item.id as keyof typeof scheduleMessageKeys];

              if (!messageKey) {
                return null;
              }

              return (
                <li key={item.id} className="tour-programme__item">
                  <div className="tour-programme__date">
                    <span>{t(`programme.schedule.${messageKey}.dayLabel`)}</span>
                    {item.dateLabel ? (
                      <small>
                        {t(`programme.schedule.${messageKey}.dateLabel`)}
                      </small>
                    ) : null}
                  </div>
                  <p className="tour-programme__time">
                    {item.timeLabel ?? ""}
                  </p>
                  <div className="tour-programme__moment">
                    <h3>{t(`programme.schedule.${messageKey}.title`)}</h3>
                    {item.description ? (
                      <p>
                        {t(`programme.schedule.${messageKey}.description`)}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section className="tour-stage-section tour-stage-experience">
        <Container className="tour-stage-experience__grid">
          <div className="tour-stage-experience__copy">
            <Eyebrow>{t("experience.eyebrow")}</Eyebrow>
            <h2>{t("experience.headline")}</h2>
            <p>{t("experience.copy")}</p>
          </div>

          <ul
            className="tour-included-list"
            aria-label={t("experience.includedAriaLabel")}
          >
            {includedItemKeys.map((item) => (
              <li key={item}>{t(`experience.included.${item}`)}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="tour-stage-entry" id="entry">
        <Container size="wide" className="tour-stage-entry__inner">
          <div className="tour-stage-entry__price-block">
            <Eyebrow>{t("entry.eyebrow")}</Eyebrow>
            <p className="tour-stage-entry__price">
              {content.pricing.standardPrice}
            </p>
            <p className="tour-stage-entry__label">{t("entry.standardLabel")}</p>
          </div>

          <div className="tour-stage-entry__details">
            {content.pricing.memberPrice && content.pricing.memberLabel ? (
              <p className="tour-stage-entry__member">
                <strong>{content.pricing.memberPrice}</strong>
                <span>{t("entry.memberLabel")}</span>
              </p>
            ) : null}
            {content.pricing.note ? (
              <p className="tour-stage-entry__note">{t("entry.note")}</p>
            ) : null}
            {content.pricing.guestPolicy ? (
              <p className="tour-stage-entry__guest">{t("entry.guestPolicy")}</p>
            ) : null}
            <Button href={content.heroPrimaryCta.href} onDark>
              {t("hero.primaryCta")}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="tour-stage-section tour-stage-format">
        <Container className="tour-stage-format__grid">
          <div>
            <Eyebrow>{t("format.eyebrow")}</Eyebrow>
            <h2>{t("format.headline")}</h2>
          </div>
          <div className="tour-stage-format__copy">
            <p>{t("format.copy")}</p>
            <Button href={content.formatTeaser.ctaHref} variant="text">
              {t("format.cta")}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="tour-stage-final-cta">
        <Container size="narrow" className="tour-stage-final-cta__inner">
          <p className="tour-stage-final-cta__meta">
            <span>{content.finalCta.cityLabel}</span>
            <span>{t("final.dateLabel")}</span>
            <span>{content.finalCta.venueLabel}</span>
          </p>
          <h2>{t("final.headline")}</h2>
          <Button href={content.finalCta.ctaHref}>{t("final.cta")}</Button>
        </Container>
      </Section>
    </div>
  );
}
