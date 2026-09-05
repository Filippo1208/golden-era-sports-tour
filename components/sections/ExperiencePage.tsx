import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { primaryNavigationCta } from "@/data/navigation";
import experienceAtmosphere from "@/public/images/experience/experience-atmosphere.jpg";
import experienceCommunityWide from "@/public/images/experience/experience-community-wide.jpg";
import experienceCommunity from "@/public/images/experience/experience-community.jpg";
import experienceHeritage from "@/public/images/experience/experience-heritage.jpg";
import experienceHero from "@/public/images/experience/experience-hero.jpg";
import experiencePlay from "@/public/images/experience/experience-play.jpg";
import experienceSocial from "@/public/images/experience/experience-social.jpg";

import { ExperienceMotionController } from "./ExperienceMotionController";

const experienceChapters = [
  {
    id: "arrive",
    number: "01",
  },
  {
    id: "play",
    number: "02",
  },
  {
    id: "stay",
    number: "03",
  },
  {
    id: "meet",
    number: "04",
  },
  {
    id: "celebrate",
    number: "05",
  },
] as const;

const manifestoWords = ["play", "meet", "share", "remember"] as const;

export async function ExperiencePage() {
  const navigation = await getTranslations("Navigation");
  const t = await getTranslations("ExperiencePage");

  return (
    <div className="experience-page">
      <ExperienceMotionController />

      <section className="experience-hero" aria-labelledby="experience-title">
        <Container size="wide" className="experience-hero__grid">
          <div className="experience-hero__copy">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 id="experience-title">
              <span>{t("hero.titleLineOne")}</span>
              <span>{t("hero.titleLineTwo")}</span>
            </h1>
            <p>{t("hero.copy")}</p>
            <Button href="#experience-manifesto" className="experience-hero__cta">
              {t("hero.cta")}
            </Button>
          </div>

          <figure
            className="experience-hero__media"
            data-experience-parallax="0.025"
          >
            <Image
              src={experienceHero}
              alt={t("hero.imageAlt")}
              fill
              preload
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, (max-width: 1496px) 52vw, 780px"
              className="experience-hero__image"
            />
          </figure>
        </Container>
      </section>

      <section
        id="experience-manifesto"
        className="experience-manifesto"
        aria-label={t("manifesto.ariaLabel")}
      >
        <Container size="wide" className="experience-manifesto__inner">
          <Eyebrow>{t("manifesto.eyebrow")}</Eyebrow>
          <div className="experience-manifesto__words">
            {manifestoWords.map((word, index) => (
              <p
                key={word}
                className={index === 0 ? "is-active" : undefined}
                data-experience-word
              >
                {t(`manifesto.words.${word}`)}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="experience-journey" aria-labelledby="journey-title">
        <Container size="wide" className="experience-journey__heading">
          <Eyebrow>{t("journey.eyebrow")}</Eyebrow>
          <h2 id="journey-title">{t("journey.title")}</h2>
        </Container>

        <Container size="wide" className="experience-journey__layout">
          <div className="experience-journey__visual-sticky">
            <figure className="experience-journey__visual" data-experience-reveal>
              <Image
                src={experienceAtmosphere}
                alt={t("journey.imageAlt")}
                fill
                placeholder="blur"
                sizes="(max-width: 760px) 100vw, (max-width: 1024px) 94vw, (max-width: 1496px) 46vw, 680px"
                className="experience-journey__image"
              />
            </figure>
          </div>

          <ol className="experience-journey__chapters">
            {experienceChapters.map((chapter, index) => (
              <li
                key={chapter.number}
                className={`experience-journey__chapter ${
                  index === 0 ? "is-active" : ""
                }`}
                data-experience-chapter
              >
                <div className="experience-journey__chapter-copy">
                  <span>{chapter.number}</span>
                  <h3>{t(`journey.chapters.${chapter.id}.title`)}</h3>
                  <p>{t(`journey.chapters.${chapter.id}.copy`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="experience-game" aria-labelledby="experience-game-title">
        <Container size="wide" className="experience-game__grid">
          <div className="experience-game__heading" data-experience-reveal>
            <Eyebrow>{t("game.eyebrow")}</Eyebrow>
            <h2 id="experience-game-title">
              <span>{t("game.titleLineOne")}</span>
              <span>{t("game.titleLineTwo")}</span>
            </h2>
          </div>
          <figure
            className="experience-game__media"
            data-experience-reveal
            data-experience-parallax="0.045"
          >
            <Image
              src={experiencePlay}
              alt={t("game.imageAlt")}
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, (max-width: 1496px) 63vw, 900px"
              className="experience-game__image"
            />
          </figure>
        </Container>
      </section>

      <section className="experience-between" aria-labelledby="experience-between-title">
        <Container size="wide" className="experience-between__grid">
          <figure className="experience-between__media" data-experience-reveal>
            <Image
              src={experienceSocial}
              alt={t("between.imageAlt")}
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, (max-width: 1496px) 57vw, 820px"
              className="experience-between__image"
            />
          </figure>
          <div className="experience-between__copy" data-experience-reveal>
            <Eyebrow>{t("between.eyebrow")}</Eyebrow>
            <h2 id="experience-between-title">
              <span>{t("between.titleLineOne")}</span>
              <span>{t("between.titleLineTwo")}</span>
            </h2>
            <p>{t("between.copy")}</p>
          </div>
        </Container>
      </section>

      <section className="experience-people" aria-labelledby="experience-people-title">
        <Container size="wide" className="experience-people__grid">
          <div className="experience-people__copy" data-experience-reveal>
            <Eyebrow>{t("people.eyebrow")}</Eyebrow>
            <h2 id="experience-people-title">
              <span>{t("people.titleLineOne")}</span>
              <span>{t("people.titleLineTwo")}</span>
            </h2>
            <p>
              <span>{t("people.copyLineOne")}</span>
              <span>{t("people.copyLineTwo")}</span>
            </p>
          </div>
          <figure className="experience-people__media" data-experience-reveal>
            <Image
              src={experienceCommunityWide}
              alt={t("people.imageAlt")}
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, (max-width: 1496px) 53vw, 760px"
              className="experience-people__image"
            />
          </figure>
        </Container>
      </section>

      <section className="experience-heritage" aria-labelledby="experience-heritage-title">
        <Container size="wide" className="experience-heritage__grid">
          <figure className="experience-heritage__media" data-experience-reveal>
            <Image
              src={experienceHeritage}
              alt={t("heritage.imageAlt")}
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, (max-width: 1496px) 44vw, 640px"
              className="experience-heritage__image"
            />
          </figure>
          <div className="experience-heritage__copy" data-experience-reveal>
            <Eyebrow>{t("heritage.eyebrow")}</Eyebrow>
            <h2 id="experience-heritage-title">
              <span>{t("heritage.titleLineOne")}</span>
              <span>{t("heritage.titleLineTwo")}</span>
            </h2>
            <p>
              {t("heritage.copyLineOne")}
              <span>{t("heritage.copyLineTwo")}</span>
            </p>
          </div>
        </Container>
      </section>

      <section className="experience-final" aria-labelledby="experience-final-title">
        <Image
          src={experienceCommunity}
          alt={t("final.imageAlt")}
          fill
          placeholder="blur"
          sizes="100vw"
          className="experience-final__image"
        />
        <div className="experience-final__overlay" aria-hidden="true" />
        <Container size="narrow" className="experience-final__content" data-experience-reveal>
          <Eyebrow>{t("final.eyebrow")}</Eyebrow>
          <h2 id="experience-final-title">
            <span>{t("final.titleLineOne")}</span>
            <span>{t("final.titleLineTwo")}</span>
          </h2>
          <div className="experience-final__actions">
            <Button href={primaryNavigationCta.href} onDark>
              {navigation("joinTour")}
            </Button>
            <Button href="/tour" variant="outline" onDark>
              {t("final.discoverTour")}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
