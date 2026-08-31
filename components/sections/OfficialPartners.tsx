import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { activeOfficialPartners } from "@/data/partners";
import type { Partner } from "@/types/content";

type PartnerLogoLinkProps = {
  partner: Partner;
};

function PartnerLogoLink({ partner }: PartnerLogoLinkProps) {
  const logo = partner.logo ? (
    <Image
      src={partner.logo}
      alt={partner.logoAlt}
      width={partner.logoWidth}
      height={partner.logoHeight}
      sizes="(max-width: 760px) 78vw, 340px"
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
      aria-label={`Visit ${partner.name}`}
    >
      {logo}
    </a>
  );
}

export function OfficialPartners() {
  if (activeOfficialPartners.length === 0) {
    return null;
  }

  return (
    <section className="official-partners" aria-labelledby="official-partners-title">
      <Container className="official-partners__inner">
        <div className="official-partners__heading">
          <h2 id="official-partners-title">Official Partners</h2>
        </div>

        <div className="official-partners__logos" aria-label="Official partner logos">
          {activeOfficialPartners.map((partner) => (
            <PartnerLogoLink key={partner.id} partner={partner} />
          ))}
        </div>

        <Button
          href="/partners"
          variant="text"
          arrow="up-right"
          className="official-partners__cta"
        >
          Discover Our Partners
        </Button>
      </Container>
    </section>
  );
}
