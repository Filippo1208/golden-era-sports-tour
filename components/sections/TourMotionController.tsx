"use client";

import { useEffect } from "react";

const PARALLAX_SELECTOR = [
  ".tour-destination--full-bleed .tour-destination__media",
  ".tour-destination--panorama .tour-destination__media",
  ".tour-destination--edge-left .tour-destination__media",
].join(", ");

export function TourMotionController() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".tour-overview-page");

    if (!page) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealSections = Array.from(
      page.querySelectorAll<HTMLElement>("[data-tour-motion-section]"),
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealSections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    page.classList.add("tour-motion-ready");

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
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.12,
      },
    );

    revealSections.forEach((section) => revealObserver.observe(section));

    const parallaxMedia = Array.from(
      page.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR),
    );
    let animationFrame: number | null = null;

    const updateParallax = () => {
      animationFrame = null;

      if (window.innerWidth <= 900) {
        parallaxMedia.forEach((media) => {
          media.style.setProperty("--tour-parallax-y", "0px");
        });
        return;
      }

      const viewportHeight = window.innerHeight;

      parallaxMedia.forEach((media) => {
        const bounds = media.getBoundingClientRect();

        if (bounds.bottom < 0 || bounds.top > viewportHeight) {
          return;
        }

        const progress = Math.min(
          1,
          Math.max(0, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)),
        );
        const offset = (progress - 0.5) * bounds.height * 0.08;

        media.style.setProperty("--tour-parallax-y", `${offset.toFixed(2)}px`);
      });
    };

    const requestParallaxUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null;
}
