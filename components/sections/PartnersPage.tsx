import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { activeOfficialPartners } from "@/data/partners";
import { primaryNavigationCta } from "@/data/navigation";
import type { Partner } from "@/types/content";

type PartnerChapterProps = {
  index: number;
  partner: Partner;
};

function assetExists(assetPath?: string | null) {
  if (!assetPath) {
    return false;
  }

  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

function PartnerChapter({ index, partner }: PartnerChapterProps) {
  const visitLabel =
    partner.id === "heroes" ? "Visit HEROE'S" : `Visit ${partner.name}`;
  const hasFeaturedImage = assetExists(partner.featuredImage);

  return (
    <section
      className={`partner-editorial partner-editorial--${partner.id}`}
      aria-labelledby={`partner-${partner.id}-title`}
    >
      <Container size="wide" className="partner-editorial__grid">
        <div className="partner-editorial__content">
          <div className="partner-editorial__meta">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>Official Partner</p>
          </div>

          <h2 id={`partner-${partner.id}-title`}>{partner.name}</h2>

          <a
            className="partner-editorial__logo-link"
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${partner.name}`}
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.logoAlt}
                width={partner.logoWidth}
                height={partner.logoHeight}
                sizes="(max-width: 760px) 64vw, 260px"
                className={`partner-editorial__logo partner-editorial__logo--${partner.id}`}
              />
            ) : (
              <span className="partner-editorial__fallback">{partner.name}</span>
            )}
          </a>

          {partner.shortDescription ? (
            <p className="partner-editorial__copy">{partner.shortDescription}</p>
          ) : null}

          <a
            className="partner-editorial__visit"
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{visitLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <figure
          className={`partner-editorial__media ${
            hasFeaturedImage ? "" : "partner-editorial__media--fallback"
          }`.trim()}
        >
          {hasFeaturedImage && partner.featuredImage ? (
            <Image
              src={partner.featuredImage}
              alt={partner.featuredImageAlt ?? `${partner.name} partner photograph`}
              width={partner.featuredImageWidth ?? 1200}
              height={partner.featuredImageHeight ?? 1800}
              loading="eager"
              unoptimized
              sizes="(max-width: 980px) 100vw, 58vw"
              className="partner-editorial__image"
            />
          ) : (
            <span>{partner.name}</span>
          )}
        </figure>
      </Container>
    </section>
  );
}

export function PartnersPage() {
  return (
    <div className="partners-page">
      <section className="partners-opening">
        <Container size="wide" className="partners-opening__inner">
          <Eyebrow>Golden Era Sports Tour</Eyebrow>
          <h1>Our Partners</h1>
          <p className="partners-opening__statement">
            <span>Partners Who Become</span>
            <span>Part Of The Experience.</span>
          </p>
          <p>
            Golden Era is built with partners who share a connection with sport,
            heritage, international experiences and the culture surrounding the
            game.
          </p>
        </Container>
      </section>

      <section className="partners-chapters" aria-label="Official partners">
        {activeOfficialPartners.map((partner, index) => (
          <PartnerChapter key={partner.id} index={index} partner={partner} />
        ))}
      </section>

      <section className="partners-philosophy">
        <Container size="wide" className="partners-philosophy__inner">
          <Eyebrow>Partnership</Eyebrow>
          <h2>
            <span>Built Into The Experience,</span>
            <span>Not Added Around It.</span>
          </h2>
          <p>
            Golden Era partnerships are designed to live naturally within the
            sporting, social and visual environment of the Tour.
          </p>
        </Container>
      </section>

      <section className="partners-cta">
        <Container size="wide" className="partners-cta__inner">
          <Eyebrow>Partner With Golden Era</Eyebrow>
          <h2>
            <span>Join The Next</span>
            <span>Chapter Of The Tour.</span>
          </h2>
          <p>Interested in becoming part of the Golden Era Sports Tour?</p>
          <Button
            href={primaryNavigationCta.href}
            variant="text"
            arrow="up-right"
            className="partners-cta__link"
          >
            Partner With Us
          </Button>
        </Container>
      </section>
    </div>
  );
}
