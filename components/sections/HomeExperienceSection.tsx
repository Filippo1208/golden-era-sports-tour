"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import experienceCommunity from "@/public/images/experience/experience-community.jpg";

const experiencePillars = [
  "play",
  "meet",
  "share",
  "remember",
] as const;

export function HomeExperienceSection() {
  const t = useTranslations("HomePage.experience");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;
    }

    section.classList.add("home-experience--motion-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        section.classList.add("is-visible");
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-experience"
      aria-labelledby="home-experience-title"
    >
      <Container size="wide" className="home-experience__inner">
        <div className="home-experience__layout">
          <div className="home-experience__intro">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="home-experience-title">
              <span>{t("titleLineOne")}</span>
              <span>{t("titleLineTwo")}</span>
            </h2>
            <p>{t("copy")}</p>
          </div>

          <figure className="home-experience__media">
            <Image
              src={experienceCommunity}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) calc(100vw - 2rem), (max-width: 1496px) 55vw, 790px"
              className="home-experience__image"
            />
          </figure>

          <dl className="home-experience__pillars">
            {experiencePillars.map((pillar) => (
              <div className="home-experience__pillar" key={pillar}>
                <dt>{t(`pillars.${pillar}.title`)}</dt>
                <dd>{t(`pillars.${pillar}.copy`)}</dd>
              </div>
            ))}
          </dl>

          <Button
            href="/experience"
            variant="text"
            arrow="up-right"
            className="home-experience__link"
          >
            {t("cta")}
          </Button>
        </div>

        <p className="home-experience__signature" aria-hidden="true">
          {t("signature")}
        </p>
      </Container>
    </section>
  );
}
