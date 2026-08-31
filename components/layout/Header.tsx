"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MainNavigation } from "@/components/navigation/MainNavigation";
import { Button } from "@/components/ui/Button";
import { primaryNavigationCta } from "@/data/navigation";

const HEADER_SCROLL_THRESHOLD = 24;
const headerLogo = {
  src: "/images/brand/goldeneralogo.png",
  alt: "Golden Era Sports Tour by Vintage Events Monte-Carlo",
  width: 1987,
  height: 324,
} as const;

type HeaderProps = {
  heroTone?: "dark" | "light";
};

export function Header({ heroTone = "dark" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      const nextIsScrolled = window.scrollY > HEADER_SCROLL_THRESHOLD;

      setIsScrolled((currentIsScrolled) =>
        currentIsScrolled === nextIsScrolled ? currentIsScrolled : nextIsScrolled,
      );
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  const onDarkHero = heroTone === "dark" && !isScrolled;
  const onLightHero = heroTone === "light" && !isScrolled;

  return (
    <header
      className={`site-header ${isScrolled ? "site-header--scrolled" : ""} ${
        onLightHero ? "site-header--on-light" : ""
      }`.trim()}
    >
      <Link href="/" className="site-header__brand" aria-label="Golden Era home">
        <Image
          src={headerLogo.src}
          alt={headerLogo.alt}
          width={headerLogo.width}
          height={headerLogo.height}
          preload
          sizes="(max-width: 760px) 155px, 210px"
          className="site-header__brand-logo"
        />
      </Link>

      <MainNavigation className="site-header__desktop-nav" onDark={onDarkHero} />

      <div className="site-header__actions">
        <Button
          href={primaryNavigationCta.href}
          variant="outline"
          arrow="up-right"
          onDark={onDarkHero}
        >
          {primaryNavigationCta.label}
        </Button>

        <details className="site-header__mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <div className="site-header__mobile-panel">
            <MainNavigation onDark />
            <Button
              href={primaryNavigationCta.href}
              variant="primary"
              arrow="up-right"
              onDark
              className="site-header__mobile-cta"
            >
              {primaryNavigationCta.label}
            </Button>
          </div>
        </details>
      </div>
    </header>
  );
}
