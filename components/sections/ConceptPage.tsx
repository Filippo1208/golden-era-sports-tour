import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { primaryNavigationCta } from "@/data/navigation";

const conceptImages = {
  detail: {
    src: "/images/the-concept/racquetdetail.jpg",
    alt: "Close-up of a historic wooden tennis racquet from the Golden Era collection",
    width: 1008,
    height: 1512,
  },
  evolution: {
    src: "/images/the-concept/racquetevolution.jpg",
    alt: "Selection of tennis racquets from different generations",
    width: 4000,
    height: 6000,
  },
  played: {
    src: "/images/the-concept/played.jpg",
    alt: "Golden Era participant playing with a wooden tennis racquet on clay",
    width: 4696,
    height: 3131,
  },
} as const;

const materialStages = ["Wood", "Metal", "Composite", "Modern"] as const;

const ruleSteps = [
  {
    number: "01",
    title: "Player Assessment",
    copy: "The organisation evaluates the technical characteristics and playing level of each participant.",
  },
  {
    number: "02",
    title: "Racquet Assignment",
    copy: "Equipment is selected to create the intended contrast between player ability and racquet technology.",
  },
  {
    number: "03",
    title: "Balanced Competition",
    copy: "The draw and racquet assignments work together to create a balanced competition consistent with the Golden Era format.",
  },
] as const;

const formatFacts = [
  {
    value: "30-40",
    lines: ["Minutes", "Per Match"],
  },
  {
    value: "3-4",
    lines: ["Matches", "Guaranteed"],
  },
  {
    value: "Stage +",
    lines: ["Overall Tour", "Ranking"],
  },
] as const;

function publicAssetExists(assetPath: string) {
  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

function publicAssetLabel(assetPath: string) {
  return `public${assetPath}`;
}

export async function ConceptPage() {
  const navigation = await getTranslations("Navigation");

  const hasDetailImage = publicAssetExists(conceptImages.detail.src);
  const hasEvolutionImage = publicAssetExists(conceptImages.evolution.src);
  const hasPlayedImage = publicAssetExists(conceptImages.played.src);

  return (
    <div className="concept-page">
      <section className="concept-opening" aria-labelledby="concept-title">
        <Container size="wide" className="concept-opening__grid">
          <div className="concept-opening__copy">
            <Eyebrow>Golden Era Sports Tour</Eyebrow>
            <h1 id="concept-title">The Concept</h1>
            <p className="concept-opening__statement">
              The Evolution of Tennis,
              <span>Played by Amateurs.</span>
            </p>
            <p className="concept-copy">
              A global amateur tennis tour hosted in iconic locations,
              celebrating the heritage and evolution of the game.
            </p>
          </div>

          <figure className="concept-opening__media">
            {hasDetailImage ? (
              <Image
                src={conceptImages.detail.src}
                alt={conceptImages.detail.alt}
                fill
                preload
                sizes="(max-width: 980px) 100vw, 45vw"
                className="concept-opening__image"
              />
            ) : (
              <ImagePlaceholder
                label={publicAssetLabel(conceptImages.detail.src)}
                aspectRatio="4:5"
                className="concept-opening__placeholder"
              />
            )}
          </figure>
        </Container>
      </section>

      <Section className="concept-manifesto" id="manifesto">
        <Container size="wide" className="concept-manifesto__inner">
          <div className="concept-manifesto__label">
            <Eyebrow>Our Manifesto</Eyebrow>
          </div>
          <div className="concept-manifesto__copy">
            <p className="concept-manifesto__plain">
              This is not a professional tour.
            </p>
            <p className="concept-manifesto__plain">
              This is not an exhibition.
            </p>
            <h2 id="manifesto-title">
              It is a tribute to tennis history,
              <span className="concept-accent">
                Played &mdash; Not Remembered.
              </span>
            </h2>
          </div>
        </Container>
      </Section>

      <section className="concept-rule" aria-labelledby="rule-title">
        <div className="concept-rule__grid">
          <figure className="concept-rule__media">
            {hasEvolutionImage ? (
              <Image
                src={conceptImages.evolution.src}
                alt={conceptImages.evolution.alt}
                width={conceptImages.evolution.width}
                height={conceptImages.evolution.height}
                loading="eager"
                sizes="(max-width: 760px) 100vw, (max-width: 980px) 95vw, 48vw"
                className="concept-rule__image"
              />
            ) : (
              <ImagePlaceholder
                label={publicAssetLabel(conceptImages.evolution.src)}
                aspectRatio="4:5"
                className="concept-rule__placeholder"
              />
            )}
          </figure>

          <div className="concept-rule__content">
            <Eyebrow>The Rule</Eyebrow>
            <h2 id="rule-title">
              Opposition
              <span>of Materials.</span>
            </h2>
            <p className="concept-rule__lead">
              Players never use their own racquets.
            </p>
            <p className="concept-copy">
              Historic racquets are assigned by the organisation according to
              each player&apos;s technical characteristics and the balance of
              the draw.
            </p>
            <p className="concept-copy">
              More skilled players can be challenged with vintage equipment,
              while less experienced players can rely on more modern technology,
              turning the evolution of equipment into part of the competition
              itself.
            </p>

            <div className="concept-material" aria-label="Wood, metal, composite, modern">
              <p>The equipment changed. So did the game.</p>
              <div className="concept-material__track" aria-hidden="true">
                {materialStages.map((stage, index) => (
                  <span key={stage}>
                    {stage}
                    {index < materialStages.length - 1 ? (
                      <i aria-hidden="true">&mdash;</i>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="concept-racquets" id="racquet-evolution">
        <Container size="wide" className="concept-racquets__inner">
          <div className="concept-racquets__label">
            <Eyebrow>The Evolution of the Racquet</Eyebrow>
          </div>
          <div className="concept-racquets__statement">
            <p>Up To</p>
            <strong>1,000</strong>
            <p>Original Racquets</p>
            <small>From the 1970s to today.</small>
          </div>
          <div className="concept-racquets__copy">
            <p className="concept-copy">
              From wooden frames to modern composite technology, every
              generation changed the way tennis could be played.
            </p>
            <p className="concept-copy">
              Golden Era brings those differences back onto the court.
            </p>
          </div>
        </Container>
      </Section>

      <section className="concept-played" aria-labelledby="played-title">
        <Container size="wide" className="concept-played__intro">
          <div>
            <Eyebrow>Played, Not Remembered</Eyebrow>
            <h2 id="played-title">
              History Returns
              <span>to the Court.</span>
            </h2>
          </div>
          <div className="concept-played__copy">
            <p className="concept-copy">
              Golden Era is not a display of historic equipment.
            </p>
            <p className="concept-copy">The racquets are played.</p>
            <p className="concept-copy">
              Different generations of tennis technology return to competition,
              allowing players to experience how the game itself has changed.
            </p>
          </div>
        </Container>

        <figure className="concept-played__media">
          {hasPlayedImage ? (
            <Image
              src={conceptImages.played.src}
              alt={conceptImages.played.alt}
              width={conceptImages.played.width}
              height={conceptImages.played.height}
              loading="eager"
              sizes="100vw"
              className="concept-played__image"
            />
          ) : (
            <ImagePlaceholder
              label={publicAssetLabel(conceptImages.played.src)}
              aspectRatio="3:2"
              className="concept-played__placeholder"
            />
          )}
        </figure>
      </section>

      <Section className="concept-process" id="how-the-rule-works">
        <Container size="wide" className="concept-process__inner">
          <div className="concept-process__header">
            <Eyebrow>How the Rule Works</Eyebrow>
            <h2>Three sporting decisions, one balanced format.</h2>
          </div>

          <ol className="concept-process__steps">
            {ruleSteps.map((step) => (
              <li key={step.number} className="concept-process__step">
                <span className="concept-process__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="concept-format" id="sporting-format">
        <Container size="wide" className="concept-format__inner">
          <div className="concept-format__header">
            <Eyebrow>Sporting Format</Eyebrow>
            <h2>
              One Day.
              <span>Real Competition.</span>
            </h2>
            <p className="concept-copy">
              A group stage followed by finals keeps each stage dynamic while
              guaranteeing meaningful time on court.
            </p>
          </div>

          <div className="concept-format__facts" aria-label="Golden Era sporting format">
            {formatFacts.map((fact) => (
              <div key={fact.value} className="concept-format__fact">
                <strong>{fact.value}</strong>
                <span>
                  {fact.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="concept-white-balls" id="white-balls">
        <Container size="narrow" className="concept-white-balls__inner">
          <Eyebrow>A Detail from Tennis History</Eyebrow>
          <h2>
            Always Played
            <span>with White Balls.</span>
          </h2>
          <p>
            A deliberate return to tradition and one of the details that makes
            Golden Era immediately distinctive on court.
          </p>
        </Container>
      </Section>

      <Section className="concept-final" id="concept-cta">
        <Container size="wide" className="concept-final__inner">
          <p className="concept-final__prelude">
            Every Era
            <span>Changed the Game.</span>
          </p>
          <h2>
            Golden Era
            <span>Brings Them Back</span>
            <span>to the Same Court.</span>
          </h2>
          <p className="concept-final__line">
            The Evolution of Tennis,
            <span>Played by Amateurs.</span>
          </p>
          <div className="concept-final__actions">
            <Button href="/tour" onDark>
              Discover the Tour
            </Button>
            <Button href={primaryNavigationCta.href} variant="text" onDark>
              {navigation("joinTour")}
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
