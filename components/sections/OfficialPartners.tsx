import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { activeOfficialPartners } from "@/data/partners";
import type { Partner } from "@/types/content";

type PartnerLogoLinkProps = {
  partner: Partner;
  logoAlt: string;
  visitAriaLabel: string;
};

const partnerMessageKeys = {
  heroes: "heroes",
  sembrancher: "sembrancher",
} as const;

function PartnerLogoLink({
  partner,
  logoAlt,
  visitAriaLabel,
}: PartnerLogoLinkProps) {
  const logoSizes = partner.id === "heroes" ? "255px" : "181px";
  const logo = partner.logo ? (
    <Image
      src={partner.logo}
      alt={logoAlt}
      width={partner.logoWidth}
      height={partner.logoHeight}
      sizes={logoSizes}
      className={`official-partners__logo official-partners__logo--${partner.id}`}
    />
  ) : (
    <span className="official-partners__fallback">{partner.name}</span>
  );

  return (
    <a
      className="official-partners__logo-link"
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={visitAriaLabel}
    >
      {logo}
    </a>
  );
}

export async function OfficialPartners() {
  const t = await getTranslations("OfficialPartners");

  if (activeOfficialPartners.length === 0) {
    return null;
  }

  return (
    <section className="official-partners" aria-labelledby="official-partners-title">
      <Container className="official-partners__inner">
        <div className="official-partners__heading">
          <h2 id="official-partners-title">{t("title")}</h2>
        </div>

        <div className="official-partners__logos" aria-label={t("logosAriaLabel")}>
          {activeOfficialPartners.map((partner) => {
            const messageKey =
              partnerMessageKeys[partner.id as keyof typeof partnerMessageKeys];

            if (!messageKey) {
              return null;
            }

            return (
              <PartnerLogoLink
                key={partner.id}
                partner={partner}
                logoAlt={t(`partners.${messageKey}.logoAlt`)}
                visitAriaLabel={t("visitAriaLabel", { name: partner.name })}
              />
            );
          })}
        </div>

        <Button
          href="/partners"
          variant="text"
          arrow="up-right"
          className="official-partners__cta"
        >
          {t("cta")}
        </Button>
      </Container>
    </section>
  );
}
