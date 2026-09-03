"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MainNavigation } from "@/components/navigation/MainNavigation";
import { Button } from "@/components/ui/Button";
import { primaryNavigationCta } from "@/data/navigation";
import { Link } from "@/i18n/navigation";

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
  const t = useTranslations("Navigation");

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
      <Link href="/" className="site-header__brand" aria-label={t("homeLabel")}>
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
        <LanguageSwitcher mode="desktop" onDark={onDarkHero} />

        <Button
          href={primaryNavigationCta.href}
          variant="outline"
          arrow="up-right"
          onDark={onDarkHero}
        >
          {t("joinTour")}
        </Button>

        <details className="site-header__mobile-menu">
          <summary aria-label={t("openMenu")}>{t("menu")}</summary>
          <div className="site-header__mobile-panel">
            <MainNavigation onDark />
            <LanguageSwitcher mode="mobile" onDark />
            <Button
              href={primaryNavigationCta.href}
              variant="primary"
              arrow="up-right"
              onDark
              className="site-header__mobile-cta"
            >
              {t("joinTour")}
            </Button>
          </div>
        </details>
      </div>
    </header>
  );
}
