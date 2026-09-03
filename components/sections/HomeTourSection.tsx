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
  const [isEngaged, setIsEngaged] = useState(false);

  if (!stages.length) {
    return null;
  }

  const resetPanels = () => {
    setActiveStageSlug(defaultStageSlug);
    setIsEngaged(false);
  };

  const activateStage = (slug: string) => {
    setActiveStageSlug(slug);
    setIsEngaged(true);
  };

  return (
    <section className="home-tour" aria-labelledby="home-tour-title">
      <Container size="wide" className="home-tour__inner">
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

        <ol
          className={`home-tour__panels ${
            isEngaged ? "is-engaged" : ""
          }`.trim()}
          aria-label="2026 Tour destinations"
          onMouseLeave={(event) => {
            if (!event.currentTarget.contains(document.activeElement)) {
              resetPanels();
            }
          }}
          onBlur={(event) => {
            const nextTarget = event.relatedTarget as Node | null;

            if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
              resetPanels();
            }
          }}
        >
          {stages.map((stage) => {
            const isSelected = stage.slug === activeStageSlug;
            const isExpanded = isEngaged && isSelected;
            const isNextStage = stage.status === "Next Stage";
            const panelStyle = {
              "--home-tour-image-position":
                stage.imagePosition ?? "center center",
            } as CSSProperties;

            return (
              <li
                key={stage.id}
                className={`home-tour__panel ${
                  isSelected ? "is-selected" : ""
                } ${
                  isNextStage ? "is-next-stage" : ""
                }`.trim()}
                style={panelStyle}
              >
                <article
                  className="home-tour__panel-content"
                  tabIndex={0}
                  aria-current={isNextStage ? "step" : undefined}
                  onMouseEnter={() => activateStage(stage.slug)}
                  onFocus={() => activateStage(stage.slug)}
                >
                  <Image
                    src={stage.image}
                    alt={stage.imageAlt}
                    fill
                    sizes={
                      isExpanded
                        ? "(max-width: 980px) 86vw, 45vw"
                        : "(max-width: 980px) 86vw, 19vw"
                    }
                    className="home-tour__panel-image"
                  />

                  <div className="home-tour__panel-copy">
                    <div className="home-tour__panel-heading">
                      <span className="home-tour__panel-number">
                        {stageNumber(stage.order)}
                      </span>
                      {isNextStage ? (
                        <span className="home-tour__panel-next">
                          Next Stage
                        </span>
                      ) : null}
                    </div>

                    <h3>{stage.city}</h3>

                    <div className="home-tour__panel-meta">
                      <time>{stage.dateLabel}</time>
                      <span>{stage.status}</span>
                      {stage.pageAvailable ? (
                        <Button
                          href={stage.href}
                          variant="text"
                          onDark
                          className="home-tour__panel-link"
                        >
                          Discover
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </article>
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
