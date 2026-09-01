"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { TourOverviewStage } from "@/types/content";

type HomeTourSectionProps = {
  stages: TourOverviewStage[];
};

const defaultStageSlug = "monte-carlo";

function stageNumber(order: number) {
  return order.toString().padStart(2, "0");
}

export function HomeTourSection({ stages }: HomeTourSectionProps) {
  const [activeStageSlug, setActiveStageSlug] = useState(() =>
    stages.some((stage) => stage.slug === defaultStageSlug)
      ? defaultStageSlug
      : stages[0]?.slug,
  );
  const activeStage =
    stages.find((stage) => stage.slug === activeStageSlug) ?? stages[0];

  if (!activeStage) {
    return null;
  }

  return (
    <section className="home-tour" aria-labelledby="home-tour-title">
      <Container size="wide" className="home-tour__grid">
        <div className="home-tour__intro">
          <Eyebrow>The Tour</Eyebrow>
          <h2 id="home-tour-title">
            <span>One global circuit.</span>
            <span>Five iconic destinations.</span>
          </h2>
          <p>
            From the Alps to the Mediterranean, California, South America and
            the Middle East, Golden Era brings the evolution of tennis to
            distinctive international destinations.
          </p>
        </div>

        <figure
          id="home-tour-destination-image"
          className="home-tour__media"
          aria-label={`Current destination: ${activeStage.city}`}
        >
          {stages.map((stage) => {
            const isActive = stage.slug === activeStage.slug;
            const imageStyle = {
              "--home-tour-image-position":
                stage.imagePosition ?? "center center",
            } as CSSProperties;

            return (
              <Image
                key={stage.id}
                src={stage.image}
                alt={isActive ? stage.imageAlt : ""}
                fill
                sizes="(max-width: 980px) 100vw, 58vw"
                className={`home-tour__image ${
                  isActive ? "is-active" : ""
                }`.trim()}
                style={imageStyle}
                aria-hidden={!isActive}
              />
            );
          })}
        </figure>

        <ol className="home-tour__destinations" aria-label="2026 Tour destinations">
          {stages.map((stage) => {
            const isActive = stage.slug === activeStage.slug;

            return (
              <li key={stage.id}>
                <button
                  type="button"
                  className={`home-tour__destination ${
                    isActive ? "is-active" : ""
                  }`.trim()}
                  aria-controls="home-tour-destination-image"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveStageSlug(stage.slug)}
                  onFocus={() => setActiveStageSlug(stage.slug)}
                  onClick={() => setActiveStageSlug(stage.slug)}
                >
                  <span className="home-tour__destination-number">
                    {stageNumber(stage.order)}
                  </span>
                  <span className="home-tour__destination-city">
                    {stage.city}
                  </span>
                  {stage.status === "Next Stage" ? (
                    <span className="home-tour__destination-status">
                      Next Stage
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>

        <Button href="/tour" variant="text" className="home-tour__link">
          Discover the Tour
        </Button>
      </Container>
    </section>
  );
}
