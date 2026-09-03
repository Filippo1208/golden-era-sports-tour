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
import type { TourOverviewStage } from "@/types/content";

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

function TourStageMedia({ stage }: { stage: TourOverviewStage }) {
  const mediaStyle = {
    "--tour-overview-image-position": stage.imagePosition ?? "center center",
  } as CSSProperties;

  return (
    <figure className="tour-destination__media" style={mediaStyle}>
      {publicAssetExists(stage.image) ? (
        <Image
          src={stage.image}
          alt={stage.imageAlt}
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

function TourStageCopy({ stage }: { stage: TourOverviewStage }) {
  return (
    <div className="tour-destination__copy">
      <Eyebrow>
        {stageNumber(stage.order)} / {stage.country}
      </Eyebrow>
      <h2 id={`tour-destination-${stage.slug}`}>{stage.city}</h2>
      <div className="tour-destination__details">
        <p>{stage.dateLabel}</p>
        {stage.venue ? <p>{stage.venue}</p> : null}
        <p className="tour-destination__status">{stage.status}</p>
      </div>
      <p className="tour-destination__line">{stage.supportingLine}</p>
      {stage.pageAvailable ? (
        <Button
          href={stage.href}
          variant="text"
          className="tour-destination__cta"
        >
          Discover {stage.city}
        </Button>
      ) : null}
    </div>
  );
}

function TourDestination({ stage }: { stage: TourOverviewStage }) {
  return (
    <section
      className={`tour-destination tour-destination--${stage.layout}`}
      aria-labelledby={`tour-destination-${stage.slug}`}
      data-tour-motion-section
      data-tour-stage={stage.slug}
    >
      <Container size="wide" className="tour-destination__grid">
        <TourStageCopy stage={stage} />
        <TourStageMedia stage={stage} />
      </Container>
    </section>
  );
}

export async function TourLandingPage() {
  const navigation = await getTranslations("Navigation");

  return (
    <div className="tour-overview-page">
      <TourMotionController />
      <section className="tour-overview-opening" aria-labelledby="tour-overview-title">
        <Container size="wide" className="tour-overview-opening__inner">
          <Eyebrow>The Golden Era Sports Tour</Eyebrow>
          <h1 id="tour-overview-title" className="tour-overview-opening__title">
            <span>The</span>
            <span className="tour-overview-opening__year">2026</span>
            <span>Tour</span>
          </h1>
          <p className="tour-overview-opening__statement">
            <span>One global circuit.</span>
            <span>
              <strong>Five</strong> iconic destinations.
            </span>
          </p>
        </Container>
      </section>

      <section className="tour-overview-index" aria-labelledby="tour-index-title">
        <Container size="wide" className="tour-overview-index__inner">
          <header className="tour-overview-index__header">
            <Eyebrow>2026 Itinerary</Eyebrow>
            <h2 id="tour-index-title">The Circuit</h2>
          </header>

          <ol className="tour-index-list">
            {tourOverviewStages.map((stage) => (
              <li key={stage.id} className="tour-index-list__item">
                <span className="tour-index-list__number">
                  {stageNumber(stage.order)}
                </span>
                <time className="tour-index-list__date">{stage.dateLabel}</time>
                <strong className="tour-index-list__city">{stage.city}</strong>
                <span className="tour-index-list__location">
                  {stage.venue ?? stage.country}
                </span>
                <small className="tour-index-list__status">{stage.status}</small>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {tourOverviewStages.map((stage) => (
        <TourDestination key={stage.id} stage={stage} />
      ))}

      <section
        className="tour-future"
        aria-labelledby="tour-future-title"
        data-tour-motion-section
      >
        <Container size="wide" className="tour-future__inner">
          <Eyebrow>Next Chapter</Eyebrow>
          <div className="tour-future__title-group">
            <h2 id="tour-future-title">2027</h2>
            <div>
              <p className="tour-future__city">New York</p>
              <p className="tour-future__line">The Tour continues.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="tour-overview-final" aria-labelledby="tour-final-title">
        <Container size="narrow" className="tour-overview-final__inner">
          <h2 id="tour-final-title">
            <span>One global circuit.</span>
            <span>Five destinations.</span>
          </h2>
          <p>
            <span>The evolution of tennis,</span>
            <span>played by amateurs.</span>
          </p>
          <Button href="/join">{navigation("joinTour")}</Button>
        </Container>
      </section>
    </div>
  );
}
