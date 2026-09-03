import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { TeamMotionController } from "@/components/sections/TeamMotionController";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const teamMembers = [
  {
    id: "nicola",
    number: "01",
    image: "/images/team/nicola.jpg",
    width: 400,
    height: 678,
    position: "50% 10%",
    sizes: "(max-width: 680px) 85vw, (max-width: 900px) 87vw, 38vw",
  },
  {
    id: "massimo",
    number: "02",
    image: "/images/team/massimo.jpg",
    width: 406,
    height: 688,
    position: "50% 8%",
    sizes: "(max-width: 680px) 78vw, (max-width: 900px) 80vw, 46vw",
  },
  {
    id: "marco",
    number: "03",
    image: "/images/team/marco.jpg",
    width: 388,
    height: 678,
    position: "50% 9%",
    sizes: "(max-width: 680px) 67vw, (max-width: 900px) 69vw, 38vw",
  },
  {
    id: "filippo",
    number: "04",
    image: "/images/team/filippo.jpg",
    width: 354,
    height: 686,
    position: "50% 8%",
    sizes: "(max-width: 680px) 82vw, (max-width: 900px) 84vw, 38vw",
  },
  {
    id: "pier",
    number: "05",
    image: "/images/team/pier.jpg",
    width: 402,
    height: 682,
    position: "50% 8%",
    sizes: "(max-width: 680px) 74vw, (max-width: 900px) 76vw, 46vw",
  },
] as const;

export async function TeamPage() {
  const t = await getTranslations("TeamPage");

  return (
    <>
      <TeamMotionController />

      <section className="team-hero" aria-labelledby="team-page-title">
        <Container size="wide" className="team-hero__inner">
          <div className="team-hero__eyebrow" data-team-reveal>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          </div>

          <h1 id="team-page-title" data-team-reveal>
            <span>{t("hero.titleLineOne")}</span>
            <span>{t("hero.titleLineTwo")}</span>
            <span>{t("hero.titleLineThree")}</span>
          </h1>

          <p className="team-hero__intro" data-team-reveal>
            {t("hero.intro")}
          </p>

          <div className="team-hero__court-line" aria-hidden="true">
            <span>00 / 05</span>
          </div>
        </Container>
      </section>

      <section className="team-founder" aria-labelledby="team-founder-title">
        <Container size="wide" className="team-founder__inner">
          <div className="team-founder__origin">
            <figure
              className="team-founder__media"
              data-team-reveal="portrait"
            >
              <Image
                src="/images/team/jerome.jpg"
                alt={t("founder.imageAlt")}
                fill
                sizes="(max-width: 900px) 87vw, (max-width: 1496px) 46vw, 690px"
                className="team-founder__image"
              />
            </figure>

            <div className="team-founder__content">
              <header className="team-founder__header">
                <div data-team-reveal>
                  <Eyebrow>{t("founder.eyebrow")}</Eyebrow>
                </div>
                <h2 id="team-founder-title" data-team-reveal>
                  <span>{t("founder.firstName")}</span>
                  <span>{t("founder.lastName")}</span>
                </h2>
                <p className="team-founder__role" data-team-reveal>
                  {t("founder.role")}
                </p>
              </header>

              <div className="team-founder__story" data-team-reveal>
                <p className="team-founder__opening">
                  {t("founder.story.opening")}
                </p>
                <p>{t("founder.story.background")}</p>
                <p className="team-founder__result">
                  {t("founder.story.result")}
                </p>
                <p>{t("founder.story.question")}</p>
                <p>{t("founder.story.legacy")}</p>
              </div>
            </div>
          </div>

          <blockquote className="team-founder__quote" data-team-reveal>
            <span>{t("founder.quote.lineOne")}</span>
            <span>{t("founder.quote.lineTwo")}</span>
            <span>{t("founder.quote.lineThree")}</span>
          </blockquote>
        </Container>
      </section>

      <section className="team-statement" aria-labelledby="team-statement-title">
        <Container size="wide" className="team-statement__inner">
          <h2 id="team-statement-title" data-team-reveal>
            <span>{t("statement.lineOne")}</span>
            <span>{t("statement.lineTwo")}</span>
            <span>{t("statement.lineThree")}</span>
          </h2>
          <p data-team-reveal>{t("statement.supporting")}</p>
        </Container>
      </section>

      <section className="team-roster" aria-labelledby="team-roster-title">
        <h2 id="team-roster-title" className="visually-hidden">
          {t("people.heading")}
        </h2>

        <Container size="wide" className="team-roster__inner">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className={`team-member team-member--${member.id}`}
            >
              <span className="team-member__number" data-team-reveal>
                {member.number}
              </span>

              <figure
                className="team-member__media"
                data-team-reveal="portrait"
              >
                <Image
                  src={member.image}
                  alt={t(`people.members.${member.id}.imageAlt`)}
                  width={member.width}
                  height={member.height}
                  sizes={member.sizes}
                  className="team-member__image"
                  style={{ objectPosition: member.position }}
                />
              </figure>

              <div className="team-member__identity">
                <h3 data-team-reveal>
                  {t(`people.members.${member.id}.name`)}
                </h3>
                <p data-team-reveal>
                  {t(`people.members.${member.id}.role`)}
                </p>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="team-closing" aria-labelledby="team-closing-title">
        <Container size="wide" className="team-closing__inner">
          <h2 id="team-closing-title" data-team-reveal>
            <span>{t("closing.lineOne")}</span>
            <span>{t("closing.lineTwo")}</span>
          </h2>
          <div data-team-reveal>
            <Button href="/the-concept" variant="text" arrow="up-right">
              {t("closing.cta")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
