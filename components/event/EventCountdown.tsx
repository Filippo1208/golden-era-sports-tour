import { CountdownTimer } from "@/components/event/CountdownTimer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/i18n/navigation";
import { formatEventDateRange } from "@/lib/events";
import type { TourEvent } from "@/types/content";
import { getTranslations } from "next-intl/server";

type EventCountdownProps = {
  event: TourEvent | null;
};

const eventCtaKeys = {
  "st-moritz-2026": "stMoritz",
  "monte-carlo": "monteCarlo",
} as const;

export async function EventCountdown({ event }: EventCountdownProps) {
  const t = await getTranslations("HomePage.countdown");
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

  if (!event) {
    return (
      <Section className="countdown-section countdown-section--fallback">
        <Container size="standard" className="countdown-section__inner">
          <p className="countdown-section__mobile-description">
            {t("mobileDescription")}
          </p>
          <Eyebrow>{t("nextStage")}</Eyebrow>
          <h2>{t("toBeAnnounced")}</h2>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="countdown-section">
      <Container size="standard" className="countdown-section__inner">
        <p className="countdown-section__mobile-description">
          {t("mobileDescription")}
        </p>

        <div className="countdown-section__intro">
          <Eyebrow>{t("nextStage")}</Eyebrow>
          <h2>{event.city}</h2>
          <p>{formatEventDateRange(event, monthNames)}</p>
        </div>

        <CountdownTimer event={event} />

        <Link className="countdown-section__link" href={event.ctaHref}>
          {t(
            `eventCtas.${eventCtaKeys[event.slug as keyof typeof eventCtaKeys] ?? "discoverTour"}`,
          )}{" "}
          <span aria-hidden="true">{"\u2192"}</span>
        </Link>
      </Container>
    </Section>
  );
}
