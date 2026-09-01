import Link from "next/link";

import { CountdownTimer } from "@/components/event/CountdownTimer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatEventDateRange } from "@/lib/events";
import type { TourEvent } from "@/types/content";

type EventCountdownProps = {
  event: TourEvent | null;
};

const mobileHeroDescription =
  "A global tennis tour celebrating the heritage and evolution of the game.";

export function EventCountdown({ event }: EventCountdownProps) {
  if (!event) {
    return (
      <Section className="countdown-section countdown-section--fallback">
        <Container size="standard" className="countdown-section__inner">
          <p className="countdown-section__mobile-description">
            {mobileHeroDescription}
          </p>
          <Eyebrow>Next stage</Eyebrow>
          <h2>To be announced</h2>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="countdown-section">
      <Container size="standard" className="countdown-section__inner">
        <p className="countdown-section__mobile-description">
          {mobileHeroDescription}
        </p>

        <div className="countdown-section__intro">
          <Eyebrow>Next stage</Eyebrow>
          <h2>{event.city}</h2>
          <p>{formatEventDateRange(event)}</p>
        </div>

        <CountdownTimer event={event} />

        <Link className="countdown-section__link" href={event.ctaHref}>
          {event.ctaLabel} <span aria-hidden="true">{"\u2192"}</span>
        </Link>
      </Container>
    </Section>
  );
}
