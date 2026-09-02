"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-experience-reveal]";

export function ExperienceMotionController() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".experience-page");

    if (!page) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealElements = Array.from(
      page.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const kineticWords = Array.from(
      page.querySelectorAll<HTMLElement>("[data-experience-word]"),
    );
    const chapters = Array.from(
      page.querySelectorAll<HTMLElement>("[data-experience-chapter]"),
    );

    const activateChapter = (index: number) => {
      chapters.forEach((chapter, chapterIndex) => {
        chapter.classList.toggle("is-active", chapterIndex === index);
      });
    };

    const showEverything = () => {
      page.classList.add("experience-motion-ready", "experience-page--entered");
      revealElements.forEach((element) => element.classList.add("is-visible"));
      kineticWords.forEach((word, index) => {
        word.classList.toggle("is-active", index === kineticWords.length - 1);
      });
      activateChapter(0);
    };

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      showEverything();
      return;
    }

    page.classList.add("experience-motion-ready");
    const entryFrame = window.requestAnimationFrame(() => {
      page.classList.add("experience-page--entered");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const kineticObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          kineticWords.forEach((word) => word.classList.remove("is-active"));
          entry.target.classList.add("is-active");
        });
      },
      {
        rootMargin: "-36% 0px -46% 0px",
        threshold: 0.01,
      },
    );

    kineticWords.forEach((word) => kineticObserver.observe(word));

    activateChapter(0);
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = chapters.indexOf(entry.target as HTMLElement);

          if (index >= 0) {
            activateChapter(index);
          }
        });
      },
      {
        rootMargin: "-34% 0px -46% 0px",
        threshold: 0.01,
      },
    );

    chapters.forEach((chapter) => chapterObserver.observe(chapter));

    const parallaxElements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-experience-parallax]"),
    );
    let parallaxFrame: number | null = null;

    const updateParallax = () => {
      parallaxFrame = null;

      if (window.innerWidth <= 1024) {
        parallaxElements.forEach((element) => {
          element.style.setProperty("--experience-parallax-y", "0px");
        });
        return;
      }

      const viewportHeight = window.innerHeight;

      parallaxElements.forEach((element) => {
        const bounds = element.getBoundingClientRect();

        if (bounds.bottom < 0 || bounds.top > viewportHeight) {
          return;
        }

        const strength = Number(element.dataset.experienceParallax ?? "0.04");
        const elementCenter = bounds.top + bounds.height / 2;
        const progress = (viewportHeight / 2 - elementCenter) / viewportHeight;
        const limit = bounds.height * strength;
        const offset = Math.max(-limit, Math.min(limit, progress * limit * 2));

        element.style.setProperty(
          "--experience-parallax-y",
          `${offset.toFixed(2)}px`,
        );
      });
    };

    const requestParallaxUpdate = () => {
      revealElements.forEach((element) => {
        if (
          !element.classList.contains("is-visible") &&
          element.getBoundingClientRect().top < window.innerHeight * 0.9
        ) {
          element.classList.add("is-visible");
          revealObserver.unobserve(element);
        }
      });

      if (parallaxFrame === null) {
        parallaxFrame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      window.cancelAnimationFrame(entryFrame);
      revealObserver.disconnect();
      kineticObserver.disconnect();
      chapterObserver.disconnect();
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);

      if (parallaxFrame !== null) {
        window.cancelAnimationFrame(parallaxFrame);
      }
    };
  }, []);

  return null;
}
