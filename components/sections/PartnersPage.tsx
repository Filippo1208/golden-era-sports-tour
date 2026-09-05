import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { activeOfficialPartners } from "@/data/partners";
import { primaryNavigationCta } from "@/data/navigation";
import type { Partner } from "@/types/content";

type PartnerChapterProps = {
  index: number;
  partner: Partner;
  copy: {
    officialPartner: string;
    visitLabel: string;
    visitAriaLabel: string;
    logoAlt: string;
    description: string;
    featuredImageAlt: string;
  };
};

const partnerMessageKeys = {
  heroes: "heroes",
  sembrancher: "sembrancher",
} as const;

function assetExists(assetPath?: string | null) {
  if (!assetPath) {
    return false;
  }

  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

function PartnerChapter({ index, partner, copy }: PartnerChapterProps) {
  const hasFeaturedImage = assetExists(partner.featuredImage);
  const logoSizes = partner.id === "heroes" ? "212px" : "149px";

  return (
    <section
      className={`partner-editorial partner-editorial--${partner.id}`}
      aria-labelledby={`partner-${partner.id}-title`}
    >
      <Container size="wide" className="partner-editorial__grid">
        <div className="partner-editorial__content">
          <div className="partner-editorial__meta">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{copy.officialPartner}</p>
          </div>

          <h2 id={`partner-${partner.id}-title`}>{partner.name}</h2>

          <a
            className="partner-editorial__logo-link"
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.visitAriaLabel}
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={copy.logoAlt}
                width={partner.logoWidth}
                height={partner.logoHeight}
                sizes={logoSizes}
                className={`partner-editorial__logo partner-editorial__logo--${partner.id}`}
              />
            ) : (
              <span className="partner-editorial__fallback">{partner.name}</span>
            )}
          </a>

          <p className="partner-editorial__copy">{copy.description}</p>

          <a
            className="partner-editorial__visit"
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.visitLabel}
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
              alt={copy.featuredImageAlt}
              width={partner.featuredImageWidth ?? 1200}
              height={partner.featuredImageHeight ?? 1800}
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

export async function PartnersPage() {
  const t = await getTranslations("PartnersPage");

  return (
    <div className="partners-page">
      <section className="partners-opening">
        <Container size="wide" className="partners-opening__inner">
          <Eyebrow>{t("opening.eyebrow")}</Eyebrow>
          <h1>{t("opening.title")}</h1>
          <p className="partners-opening__statement">
            <span>{t("opening.statementLineOne")}</span>
            <span>{t("opening.statementLineTwo")}</span>
          </p>
          <p>{t("opening.copy")}</p>
        </Container>
      </section>

      <section className="partners-chapters" aria-label={t("chaptersAriaLabel")}>
        {activeOfficialPartners.map((partner, index) => {
          const messageKey =
            partnerMessageKeys[partner.id as keyof typeof partnerMessageKeys];

          if (!messageKey) {
            return null;
          }

          return (
            <PartnerChapter
              key={partner.id}
              index={index}
              partner={partner}
              copy={{
                officialPartner: t("officialPartner"),
                visitLabel: t(`partners.${messageKey}.visitLabel`),
                visitAriaLabel: t("visitAriaLabel", { name: partner.name }),
                logoAlt: t(`partners.${messageKey}.logoAlt`),
                description: t(`partners.${messageKey}.description`),
                featuredImageAlt: t(
                  `partners.${messageKey}.featuredImageAlt`,
                ),
              }}
            />
          );
        })}
      </section>

      <section className="partners-philosophy">
        <Container size="wide" className="partners-philosophy__inner">
          <Eyebrow>{t("philosophy.eyebrow")}</Eyebrow>
          <h2>
            <span>{t("philosophy.titleLineOne")}</span>
            <span>{t("philosophy.titleLineTwo")}</span>
          </h2>
          <p>{t("philosophy.copy")}</p>
        </Container>
      </section>

      <section className="partners-cta">
        <Container size="wide" className="partners-cta__inner">
          <Eyebrow>{t("cta.eyebrow")}</Eyebrow>
          <h2>
            <span>{t("cta.titleLineOne")}</span>
            <span>{t("cta.titleLineTwo")}</span>
          </h2>
          <p>{t("cta.copy")}</p>
          <Button
            href={primaryNavigationCta.href}
            variant="text"
            arrow="up-right"
            className="partners-cta__link"
          >
            {t("cta.label")}
          </Button>
        </Container>
      </section>
    </div>
  );
}
