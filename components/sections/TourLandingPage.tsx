import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";

import { Container } from "@/components/layout/Container";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TourMotionController } from "@/components/sections/TourMotionController";
import { tourOverviewStages } from "@/data/events";
import { getTourStageMessageKey } from "@/lib/tour-i18n";
import type { TourOverviewStage } from "@/types/content";

type TourStageLocalizedCopy = {
  country: string;
  dateLabel: string;
  status: string;
  imageAlt: string;
  supportingLine: string;
};

function stageNumber(order: number) {
  return order.toString().padStart(2, "0");
}

function publicAssetExists(assetPath: string) {
  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

function imageSizes(layout: TourOverviewStage["layout"]) {
  if (layout === "edge-right" || layout === "edge-left") {
    return "(max-width: 900px) 100vw, 64vw";
  }

  return "100vw";
}

function TourStageMedia({
  stage,
  imageAlt,
}: {
  stage: TourOverviewStage;
  imageAlt: string;
}) {
  const mediaStyle = {
    "--tour-overview-image-position": stage.imagePosition ?? "center center",
  } as CSSProperties;

  return (
    <figure className="tour-destination__media" style={mediaStyle}>
      {publicAssetExists(stage.image) ? (
        <Image
          src={stage.image}
          alt={imageAlt}
          fill
          sizes={imageSizes(stage.layout)}
          className="tour-destination__image"
        />
      ) : (
        <ImagePlaceholder
          label={`public${stage.image}`}
          aspectRatio="16:9"
          className="tour-destination__placeholder"
        />
      )}
    </figure>
  );
}

function TourStageCopy({
  stage,
  copy,
  discoverLabel,
}: {
  stage: TourOverviewStage;
  copy: TourStageLocalizedCopy;
  discoverLabel: string;
}) {
  return (
    <div className="tour-destination__copy">
      <Eyebrow>
        {stageNumber(stage.order)} / {copy.country}
      </Eyebrow>
      <h2 id={`tour-destination-${stage.slug}`}>{stage.city}</h2>
      <div className="tour-destination__details">
        <p>{copy.dateLabel}</p>
        {stage.venue ? <p>{stage.venue}</p> : null}
        <p className="tour-destination__status">{copy.status}</p>
      </div>
      <p className="tour-destination__line">{copy.supportingLine}</p>
      {stage.pageAvailable ? (
        <Button
          href={stage.href}
          variant="text"
          className="tour-destination__cta"
        >
          {discoverLabel}
        </Button>
      ) : null}
    </div>
  );
}

function TourDestination({
  stage,
  copy,
  discoverLabel,
}: {
  stage: TourOverviewStage;
  copy: TourStageLocalizedCopy;
  discoverLabel: string;
}) {
  return (
    <section
      className={`tour-destination tour-destination--${stage.layout}`}
      aria-labelledby={`tour-destination-${stage.slug}`}
      data-tour-motion-section
      data-tour-stage={stage.slug}
    >
      <Container size="wide" className="tour-destination__grid">
        <TourStageCopy stage={stage} copy={copy} discoverLabel={discoverLabel} />
        <TourStageMedia stage={stage} imageAlt={copy.imageAlt} />
      </Container>
    </section>
  );
}

export async function TourLandingPage() {
  const navigation = await getTranslations("Navigation");
  const t = await getTranslations("TourPage");
  const stageT = await getTranslations("TourStages");
  const localizedStages = tourOverviewStages.flatMap((stage) => {
    const messageKey = getTourStageMessageKey(stage.slug);

    if (!messageKey) {
      return [];
    }

    return [
      {
        stage,
        copy: {
          country: stageT(`stages.${messageKey}.country`),
          dateLabel: stageT(`stages.${messageKey}.dateLabel`),
          status: stageT(`stages.${messageKey}.status`),
          imageAlt: stageT(`stages.${messageKey}.imageAlt`),
          supportingLine: stageT(`stages.${messageKey}.supportingLine`),
        },
      },
    ];
  });

  return (
    <div className="tour-overview-page">
      <TourMotionController />
      <section className="tour-overview-opening" aria-labelledby="tour-overview-title">
        <Container size="wide" className="tour-overview-opening__inner">
          <Eyebrow>{t("opening.eyebrow")}</Eyebrow>
          <h1 id="tour-overview-title" className="tour-overview-opening__title">
            <span>{t("opening.titleLineOne")}</span>
            <span className="tour-overview-opening__year">2026</span>
            <span>{t("opening.titleLineTwo")}</span>
          </h1>
          <p className="tour-overview-opening__statement">
            <span>{t("opening.statementLineOne")}</span>
            <span>
              <strong>{t("opening.statementHighlight")}</strong>{" "}
              {t("opening.statementLineTwo")}
            </span>
          </p>
        </Container>
      </section>

      <section className="tour-overview-index" aria-labelledby="tour-index-title">
        <Container size="wide" className="tour-overview-index__inner">
          <header className="tour-overview-index__header">
            <Eyebrow>{t("index.eyebrow")}</Eyebrow>
            <h2 id="tour-index-title">{t("index.title")}</h2>
          </header>

          <ol className="tour-index-list">
            {localizedStages.map(({ stage, copy }) => (
              <li key={stage.id} className="tour-index-list__item">
                <span className="tour-index-list__number">
                  {stageNumber(stage.order)}
                </span>
                <time className="tour-index-list__date">{copy.dateLabel}</time>
                <strong className="tour-index-list__city">{stage.city}</strong>
                <span className="tour-index-list__location">
                  {stage.venue ?? copy.country}
                </span>
                <small className="tour-index-list__status">{copy.status}</small>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {localizedStages.map(({ stage, copy }) => (
        <TourDestination
          key={stage.id}
          stage={stage}
          copy={copy}
          discoverLabel={t("destination.discover", { city: stage.city })}
        />
      ))}

      <section
        className="tour-future"
        aria-labelledby="tour-future-title"
        data-tour-motion-section
      >
        <Container size="wide" className="tour-future__inner">
          <Eyebrow>{t("future.eyebrow")}</Eyebrow>
          <div className="tour-future__title-group">
            <h2 id="tour-future-title">2027</h2>
            <div>
              <p className="tour-future__city">{t("future.city")}</p>
              <p className="tour-future__line">{t("future.line")}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="tour-overview-final" aria-labelledby="tour-final-title">
        <Container size="narrow" className="tour-overview-final__inner">
          <h2 id="tour-final-title">
            <span>{t("final.titleLineOne")}</span>
            <span>{t("final.titleLineTwo")}</span>
          </h2>
          <p>
            <span>{t("final.statementLineOne")}</span>
            <span>{t("final.statementLineTwo")}</span>
          </p>
          <Button href="/join">{navigation("joinTour")}</Button>
        </Container>
      </section>
    </div>
  );
}
