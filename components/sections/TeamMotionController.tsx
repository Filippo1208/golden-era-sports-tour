"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-team-reveal]";

export function TeamMotionController() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".team-page");

    if (!page) {
      return;
    }

    const revealElements = Array.from(
      page.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const showEverything = () => {
      page.classList.add("team-motion-ready");
      revealElements.forEach((element) => element.classList.add("is-visible"));
    };

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      showEverything();
      return;
    }

    page.classList.add("team-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
