"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import experienceCommunity from "@/public/images/experience/experience-community.jpg";

const experiencePillars = [
  {
    title: "Play.",
    copy: "Compete with original racquets from different eras.",
  },
  {
    title: "Meet.",
    copy: "Connect with players, guests and tennis personalities.",
  },
  {
    title: "Share.",
    copy: "Experience the tournament beyond the court.",
  },
  {
    title: "Remember.",
    copy: "Leave with stories, images and moments worth keeping.",
  },
] as const;

export function HomeExperienceSection() {
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
            <Eyebrow>The Experience</Eyebrow>
            <h2 id="home-experience-title">
              <span>More Than</span>
              <span>A Tournament.</span>
            </h2>
            <p>
              Golden Era brings tennis heritage back to life through
              competition, iconic destinations and shared moments on and off
              the court.
            </p>
          </div>

          <figure className="home-experience__media">
            <Image
              src={experienceCommunity}
              alt="Golden Era players gathered on a clay court with heritage tennis racquets"
              fill
              sizes="(max-width: 900px) calc(100vw - 2rem), (max-width: 1496px) 55vw, 790px"
              className="home-experience__image"
            />
          </figure>

          <dl className="home-experience__pillars">
            {experiencePillars.map((pillar) => (
              <div className="home-experience__pillar" key={pillar.title}>
                <dt>{pillar.title}</dt>
                <dd>{pillar.copy}</dd>
              </div>
            ))}
          </dl>

          <Button
            href="/experience"
            variant="text"
            arrow="up-right"
            className="home-experience__link"
          >
            Discover the Experience
          </Button>
        </div>

        <p className="home-experience__signature" aria-hidden="true">
          Play &middot; Meet &middot; Share &middot; Remember
        </p>
      </Container>
    </section>
  );
}
