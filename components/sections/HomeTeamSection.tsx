import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export async function HomeTeamSection() {
  const t = await getTranslations("HomeTeam");

  return (
    <section className="home-team" aria-labelledby="home-team-title">
      <Container size="wide" className="home-team__inner">
        <header className="home-team__copy">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="home-team-title">
            <span>{t("headlineLineOne")}</span>
            <span>{t("headlineLineTwo")}</span>
          </h2>
          <p>{t("copy")}</p>
        </header>

        <figure className="home-team__media">
          <Image
            src="/images/team/team.jpg"
            alt={t("imageAlt")}
            width={2200}
            height={1466}
            sizes="(max-width: 768px) calc(100vw - 2rem), 55vw"
            className="home-team__image"
          />
        </figure>

        <div className="home-team__action">
          <Button href="/team" variant="text" arrow="up-right">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
