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
    width: 1008,
    height: 1512,
  },
  evolution: {
    src: "/images/the-concept/racquetevolution.jpg",
    width: 4000,
    height: 6000,
  },
  played: {
    src: "/images/the-concept/played.jpg",
    width: 4696,
    height: 3131,
  },
} as const;

const materialStages = ["wood", "metal", "composite", "modern"] as const;

const ruleSteps = [
  {
    id: "assessment",
    number: "01",
  },
  {
    id: "assignment",
    number: "02",
  },
  {
    id: "competition",
    number: "03",
  },
] as const;

const formatFacts = [
  {
    id: "duration",
    value: "30-40",
  },
  {
    id: "matches",
    value: "3-4",
  },
  {
    id: "ranking",
    value: null,
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
  const t = await getTranslations("ConceptPage");

  const hasDetailImage = publicAssetExists(conceptImages.detail.src);
  const hasEvolutionImage = publicAssetExists(conceptImages.evolution.src);
  const hasPlayedImage = publicAssetExists(conceptImages.played.src);

  return (
    <div className="concept-page">
      <section className="concept-opening" aria-labelledby="concept-title">
        <Container size="wide" className="concept-opening__grid">
          <div className="concept-opening__copy">
            <Eyebrow>{t("opening.eyebrow")}</Eyebrow>
            <h1 id="concept-title">{t("opening.title")}</h1>
            <p className="concept-opening__statement">
              {t("opening.statementLineOne")}
              <span>{t("opening.statementLineTwo")}</span>
            </p>
            <p className="concept-copy">{t("opening.copy")}</p>
          </div>

          <figure className="concept-opening__media">
            {hasDetailImage ? (
              <Image
                src={conceptImages.detail.src}
                alt={t("opening.imageAlt")}
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
            <Eyebrow>{t("manifesto.eyebrow")}</Eyebrow>
          </div>
          <div className="concept-manifesto__copy">
            <p className="concept-manifesto__plain">
              {t("manifesto.lineOne")}
            </p>
            <p className="concept-manifesto__plain">
              {t("manifesto.lineTwo")}
            </p>
            <h2 id="manifesto-title">
              {t("manifesto.titleLineOne")}
              <span className="concept-accent">
                {t("manifesto.titleLineTwo")}
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
                alt={t("rule.imageAlt")}
                width={conceptImages.evolution.width}
                height={conceptImages.evolution.height}
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
            <Eyebrow>{t("rule.eyebrow")}</Eyebrow>
            <h2 id="rule-title">
              {t("rule.titleLineOne")}
              <span>{t("rule.titleLineTwo")}</span>
            </h2>
            <p className="concept-rule__lead">
              {t("rule.lead")}
            </p>
            <p className="concept-copy">{t("rule.copyOne")}</p>
            <p className="concept-copy">{t("rule.copyTwo")}</p>

            <div className="concept-material" aria-label={t("rule.materialsAriaLabel")}>
              <p>{t("rule.materialsIntro")}</p>
              <div className="concept-material__track" aria-hidden="true">
                {materialStages.map((stage, index) => (
                  <span key={stage}>
                    {t(`rule.materials.${stage}`)}
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
            <Eyebrow>{t("racquets.eyebrow")}</Eyebrow>
          </div>
          <div className="concept-racquets__statement">
            <p>{t("racquets.upTo")}</p>
            <strong>1,000</strong>
            <p>{t("racquets.originalRacquets")}</p>
            <small>{t("racquets.period")}</small>
          </div>
          <div className="concept-racquets__copy">
            <p className="concept-copy">{t("racquets.copyOne")}</p>
            <p className="concept-copy">{t("racquets.copyTwo")}</p>
          </div>
        </Container>
      </Section>

      <section className="concept-played" aria-labelledby="played-title">
        <Container size="wide" className="concept-played__intro">
          <div>
            <Eyebrow>{t("played.eyebrow")}</Eyebrow>
            <h2 id="played-title">
              {t("played.titleLineOne")}
              <span>{t("played.titleLineTwo")}</span>
            </h2>
          </div>
          <div className="concept-played__copy">
            <p className="concept-copy">{t("played.copyOne")}</p>
            <p className="concept-copy">{t("played.copyTwo")}</p>
            <p className="concept-copy">{t("played.copyThree")}</p>
          </div>
        </Container>

        <figure className="concept-played__media">
          {hasPlayedImage ? (
            <Image
              src={conceptImages.played.src}
              alt={t("played.imageAlt")}
              width={conceptImages.played.width}
              height={conceptImages.played.height}
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
            <Eyebrow>{t("process.eyebrow")}</Eyebrow>
            <h2>{t("process.title")}</h2>
          </div>

          <ol className="concept-process__steps">
            {ruleSteps.map((step) => (
              <li key={step.number} className="concept-process__step">
                <span className="concept-process__number">{step.number}</span>
                <h3>{t(`process.steps.${step.id}.title`)}</h3>
                <p>{t(`process.steps.${step.id}.copy`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="concept-format" id="sporting-format">
        <Container size="wide" className="concept-format__inner">
          <div className="concept-format__header">
            <Eyebrow>{t("format.eyebrow")}</Eyebrow>
            <h2>
              {t("format.titleLineOne")}
              <span>{t("format.titleLineTwo")}</span>
            </h2>
            <p className="concept-copy">{t("format.copy")}</p>
          </div>

          <div className="concept-format__facts" aria-label={t("format.ariaLabel")}>
            {formatFacts.map((fact) => (
              <div key={fact.id} className="concept-format__fact">
                <strong>{fact.value ?? t("format.stagePlus")}</strong>
                <span>
                  <span>{t(`format.facts.${fact.id}.lineOne`)}</span>
                  <span>{t(`format.facts.${fact.id}.lineTwo`)}</span>
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="concept-white-balls" id="white-balls">
        <Container size="narrow" className="concept-white-balls__inner">
          <Eyebrow>{t("whiteBalls.eyebrow")}</Eyebrow>
          <h2>
            {t("whiteBalls.titleLineOne")}
            <span>{t("whiteBalls.titleLineTwo")}</span>
          </h2>
          <p>{t("whiteBalls.copy")}</p>
        </Container>
      </Section>

      <Section className="concept-final" id="concept-cta">
        <Container size="wide" className="concept-final__inner">
          <p className="concept-final__prelude">
            {t("final.preludeLineOne")}
            <span>{t("final.preludeLineTwo")}</span>
          </p>
          <h2>
            {t("final.titleLineOne")}
            <span>{t("final.titleLineTwo")}</span>
            <span>{t("final.titleLineThree")}</span>
          </h2>
          <p className="concept-final__line">
            {t("final.statementLineOne")}
            <span>{t("final.statementLineTwo")}</span>
          </p>
          <div className="concept-final__actions">
            <Button href="/tour" onDark>
              {t("final.discoverTour")}
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
