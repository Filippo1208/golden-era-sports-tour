import Image from "next/image";
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

function publicAssetExists(assetPath?: string | null) {
  if (!assetPath || assetPath.startsWith("http")) {
    return false;
  }

  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

function publicAssetLabel(assetPath?: string | null) {
  return assetPath ? `public${assetPath}` : "public/images/events/event-hero.jpg";
}

export function TourStageLanding({ event }: TourStageLandingProps) {
  const content = event.landingContent;
  const hasHeroImage = publicAssetExists(event.heroImage);

  return (
    <div className="tour-stage-page">
      <section className="tour-stage-hero" aria-labelledby="tour-stage-title">
        <Container size="wide" className="tour-stage-hero__grid">
          <div className="tour-stage-hero__copy">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 id="tour-stage-title">{event.city}</h1>

            <p className="tour-stage-hero__meta">
              <span>{content.dateLabel}</span>
              <span>{content.heroVenueLabel}</span>
            </p>

            <div className="tour-stage-hero__actions">
              <Button href={content.heroPrimaryCta.href}>
                {content.heroPrimaryCta.label}
              </Button>
              {content.heroSecondaryCta ? (
                <Button href={content.heroSecondaryCta.href} variant="text">
                  {content.heroSecondaryCta.label}
                </Button>
              ) : null}
            </div>
          </div>

          <figure className="tour-stage-hero__media">
            {hasHeroImage && event.heroImage ? (
              <Image
                src={event.heroImage}
                alt={`${event.title} at ${event.venue ?? event.city}`}
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
            <h2>{content.programmeTitle}</h2>
            <p>{content.programmeIntro}</p>
          </div>

          <ol className="tour-programme" aria-label={`${event.city} weekend programme`}>
            {content.schedule.map((item) => (
              <li key={item.id} className="tour-programme__item">
                <div className="tour-programme__date">
                  <span>{item.dayLabel}</span>
                  {item.dateLabel ? <small>{item.dateLabel}</small> : null}
                </div>
                <p className="tour-programme__time">{item.timeLabel ?? ""}</p>
                <div className="tour-programme__moment">
                  <h3>{item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="tour-stage-section tour-stage-experience">
        <Container className="tour-stage-experience__grid">
          <div className="tour-stage-experience__copy">
            <Eyebrow>{content.experienceEyebrow}</Eyebrow>
            <h2>{content.experienceHeadline}</h2>
            <p>{content.experienceCopy}</p>
          </div>

          <ul className="tour-included-list" aria-label="What is included">
            {content.includedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="tour-stage-entry" id="entry">
        <Container size="wide" className="tour-stage-entry__inner">
          <div className="tour-stage-entry__price-block">
            <Eyebrow>Entry</Eyebrow>
            <p className="tour-stage-entry__price">{content.pricing.standardPrice}</p>
            <p className="tour-stage-entry__label">{content.pricing.standardLabel}</p>
          </div>

          <div className="tour-stage-entry__details">
            {content.pricing.memberPrice && content.pricing.memberLabel ? (
              <p className="tour-stage-entry__member">
                <strong>{content.pricing.memberPrice}</strong>
                <span>{content.pricing.memberLabel}</span>
              </p>
            ) : null}
            {content.pricing.note ? (
              <p className="tour-stage-entry__note">{content.pricing.note}</p>
            ) : null}
            {content.pricing.guestPolicy ? (
              <p className="tour-stage-entry__guest">{content.pricing.guestPolicy}</p>
            ) : null}
            <Button href={content.heroPrimaryCta.href} onDark>
              {content.heroPrimaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="tour-stage-section tour-stage-format">
        <Container className="tour-stage-format__grid">
          <div>
            <Eyebrow>{content.formatTeaser.eyebrow}</Eyebrow>
            <h2>{content.formatTeaser.headline}</h2>
          </div>
          <div className="tour-stage-format__copy">
            <p>{content.formatTeaser.copy}</p>
            <Button href={content.formatTeaser.ctaHref} variant="text">
              {content.formatTeaser.ctaLabel}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="tour-stage-final-cta">
        <Container size="narrow" className="tour-stage-final-cta__inner">
          <p className="tour-stage-final-cta__meta">
            <span>{content.finalCta.cityLabel}</span>
            <span>{content.finalCta.dateLabel}</span>
            <span>{content.finalCta.venueLabel}</span>
          </p>
          <h2>{content.finalCta.headline}</h2>
          <Button href={content.finalCta.ctaHref}>{content.finalCta.ctaLabel}</Button>
        </Container>
      </Section>
    </div>
  );
}
