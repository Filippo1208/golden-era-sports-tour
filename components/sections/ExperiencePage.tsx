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
    number: "01",
    title: "Arrive",
    copy: "Welcome, first encounters and time on court.",
  },
  {
    number: "02",
    title: "Play",
    copy: "The game, original racquets and competition.",
  },
  {
    number: "03",
    title: "Stay in the Game",
    copy: "Even after elimination, players can continue playing singles or doubles.",
  },
  {
    number: "04",
    title: "Meet",
    copy: "A shared environment built around tennis and conversation.",
  },
  {
    number: "05",
    title: "Celebrate",
    copy: "Closing moments, awards and the end of the stage.",
  },
] as const;

export async function ExperiencePage() {
  const navigation = await getTranslations("Navigation");

  return (
    <div className="experience-page">
      <ExperienceMotionController />

      <section className="experience-hero" aria-labelledby="experience-title">
        <Container size="wide" className="experience-hero__grid">
          <div className="experience-hero__copy">
            <Eyebrow>The Experience</Eyebrow>
            <h1 id="experience-title">
              <span>More Than</span>
              <span>A Tournament.</span>
            </h1>
            <p>
              Tennis, heritage and people brought together for one shared
              experience.
            </p>
            <Button href="#experience-manifesto" className="experience-hero__cta">
              Discover the Experience
            </Button>
          </div>

          <figure
            className="experience-hero__media"
            data-experience-parallax="0.025"
          >
            <Image
              src={experienceHero}
              alt="Two Golden Era players sharing a moment at the net"
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
        aria-label="The Golden Era experience in four words"
      >
        <Container size="wide" className="experience-manifesto__inner">
          <Eyebrow>In Every Stage</Eyebrow>
          <div className="experience-manifesto__words">
            {['Play.', 'Meet.', 'Share.', 'Remember.'].map((word, index) => (
              <p
                key={word}
                className={index === 0 ? "is-active" : undefined}
                data-experience-word
              >
                {word}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="experience-journey" aria-labelledby="journey-title">
        <Container size="wide" className="experience-journey__heading">
          <Eyebrow>From Arrival to Awards</Eyebrow>
          <h2 id="journey-title">The Golden Era Experience</h2>
        </Container>

        <Container size="wide" className="experience-journey__layout">
          <div className="experience-journey__visual-sticky">
            <figure className="experience-journey__visual" data-experience-reveal>
              <Image
                src={experienceAtmosphere}
                alt="Golden Era players meeting beside a clay tennis court in the mountains"
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
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="experience-game" aria-labelledby="experience-game-title">
        <Container size="wide" className="experience-game__grid">
          <div className="experience-game__heading" data-experience-reveal>
            <Eyebrow>The Game</Eyebrow>
            <h2 id="experience-game-title">
              <span>The Match Is Only</span>
              <span>Part Of The Experience.</span>
            </h2>
          </div>
          <figure
            className="experience-game__media"
            data-experience-reveal
            data-experience-parallax="0.045"
          >
            <Image
              src={experiencePlay}
              alt="A Golden Era match in progress on a clay court"
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
              alt="Golden Era participants sharing a conversation between matches"
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, (max-width: 1496px) 57vw, 820px"
              className="experience-between__image"
            />
          </figure>
          <div className="experience-between__copy" data-experience-reveal>
            <Eyebrow>Between Points</Eyebrow>
            <h2 id="experience-between-title">
              <span>The Experience</span>
              <span>Continues Off The Ball.</span>
            </h2>
            <p>
              Moments between matches become part of the story: conversation,
              connection and a shared passion for the game.
            </p>
          </div>
        </Container>
      </section>

      <section className="experience-people" aria-labelledby="experience-people-title">
        <Container size="wide" className="experience-people__grid">
          <div className="experience-people__copy" data-experience-reveal>
            <Eyebrow>The People</Eyebrow>
            <h2 id="experience-people-title">
              <span>A Shared Passion.</span>
              <span>An International Community.</span>
            </h2>
            <p>
              <span>Different backgrounds.</span>
              <span>One game.</span>
            </p>
          </div>
          <figure className="experience-people__media" data-experience-reveal>
            <Image
              src={experienceCommunityWide}
              alt="Golden Era players and organisers gathered together on a clay court"
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
              alt="Golden Era participants presenting framed heritage tennis racquets"
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, (max-width: 1496px) 44vw, 640px"
              className="experience-heritage__image"
            />
          </figure>
          <div className="experience-heritage__copy" data-experience-reveal>
            <Eyebrow>The Heritage</Eyebrow>
            <h2 id="experience-heritage-title">
              <span>Every Racquet</span>
              <span>Carries A Story.</span>
            </h2>
            <p>
              The evolution of tennis is not displayed behind glass.
              <span>It returns to the court.</span>
            </p>
          </div>
        </Container>
      </section>

      <section className="experience-final" aria-labelledby="experience-final-title">
        <Image
          src={experienceCommunity}
          alt="The Golden Era community together at the close of a stage"
          fill
          placeholder="blur"
          sizes="100vw"
          className="experience-final__image"
        />
        <div className="experience-final__overlay" aria-hidden="true" />
        <Container size="narrow" className="experience-final__content" data-experience-reveal>
          <Eyebrow>Take Your Place</Eyebrow>
          <h2 id="experience-final-title">
            <span>Come For The Tennis.</span>
            <span>Leave With The Story.</span>
          </h2>
          <div className="experience-final__actions">
            <Button href={primaryNavigationCta.href} onDark>
              {navigation("joinTour")}
            </Button>
            <Button href="/tour" variant="outline" onDark>
              Discover the Tour
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
