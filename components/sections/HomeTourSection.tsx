"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, type CSSProperties } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getTourStageMessageKey } from "@/lib/tour-i18n";
import type { TourOverviewStage } from "@/types/content";

type HomeTourSectionProps = {
  stages: TourOverviewStage[];
};

const defaultStageSlug = "monte-carlo";

function stageNumber(order: number) {
  return order.toString().padStart(2, "0");
}

export function HomeTourSection({ stages }: HomeTourSectionProps) {
  const t = useTranslations("HomePage.tour");
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
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="home-tour-title">
            <span>{t("titleLineOne")}</span>
            <span>{t("titleLineTwo")}</span>
          </h2>
          <p>{t("copy")}</p>
        </div>

        <ol
          className={`home-tour__panels ${
            isEngaged ? "is-engaged" : ""
          }`.trim()}
          aria-label={t("destinationsLabel")}
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
            const messageKey = getTourStageMessageKey(stage.slug);

            if (!messageKey) {
              return null;
            }

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
                    alt={t(`stages.${messageKey}.imageAlt`)}
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
                          {t("nextStage")}
                        </span>
                      ) : null}
                    </div>

                    <h3>{stage.city}</h3>

                    <div className="home-tour__panel-meta">
                      <time>{t(`stages.${messageKey}.dateLabel`)}</time>
                      <span>{t(`stages.${messageKey}.status`)}</span>
                      {stage.pageAvailable ? (
                        <Button
                          href={stage.href}
                          variant="text"
                          onDark
                          className="home-tour__panel-link"
                        >
                          {t("discover")}
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
          {t("cta")}
        </Button>
      </Container>
    </section>
  );
}
