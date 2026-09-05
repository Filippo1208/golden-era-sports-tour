import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { JoinApplicationForm } from "@/components/sections/JoinApplicationForm";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  joinApplicationEvents,
  type JoinApplicationEventOption,
} from "@/data/join";

export async function JoinPage() {
  const t = await getTranslations("JoinPage");
  const eventOptions: JoinApplicationEventOption[] = joinApplicationEvents.map(
    (event) => ({
      value: event.slug,
      label: event.city,
    }),
  );

  return (
    <div className="join-page">
      <section className="join-hero" aria-labelledby="join-title">
        <Container size="wide" className="join-hero__inner">
          <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          <h1 id="join-title">
            <span>{t("hero.titleLineOne")}</span>
            <span>{t("hero.titleLineTwo")}</span>
          </h1>
          <div className="join-hero__details">
            <p>{t("hero.intro")}</p>
            <p className="join-hero__supporting">{t("hero.supporting")}</p>
          </div>
        </Container>
      </section>

      <section className="join-format" aria-labelledby="join-format-title">
        <Container size="wide" className="join-format__inner">
          <h2 id="join-format-title" className="visually-hidden">
            {t("introduction.title")}
          </h2>
          <article>
            <h3>{t("introduction.format.title")}</h3>
            <p>{t("introduction.format.copy")}</p>
          </article>
          <article>
            <h3>{t("introduction.experience.title")}</h3>
            <p>{t("introduction.experience.copy")}</p>
          </article>
          <article>
            <h3>{t("introduction.tour.title")}</h3>
            <p>{t("introduction.tour.copy")}</p>
          </article>
        </Container>
      </section>

      <section className="join-application" aria-labelledby="join-application-title">
        <Container size="wide" className="join-application__inner">
          <div className="join-application__intro">
            <Eyebrow>{t("application.eyebrow")}</Eyebrow>
            <h2 id="join-application-title">{t("application.title")}</h2>
            <p>{t("application.copy")}</p>
          </div>

          <JoinApplicationForm events={eventOptions} />
        </Container>
      </section>

      <section className="join-contact" aria-labelledby="join-contact-title">
        <Container size="wide" className="join-contact__inner">
          <div>
            <h2 id="join-contact-title">{t("contact.title")}</h2>
            <p>{t("contact.copy")}</p>
          </div>
          <Button href="/contact" variant="text">
            {t("contact.cta")}
          </Button>
        </Container>
      </section>
    </div>
  );
}
