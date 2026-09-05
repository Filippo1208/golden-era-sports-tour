import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const conceptImage = {
  src: "/images/home/home-concept-racquet.jpg",
  width: 3847,
  height: 6167,
} as const;

export async function HomeConceptSection() {
  const t = await getTranslations("HomePage.concept");

  return (
    <section className="home-concept" aria-labelledby="home-concept-title">
      <Container size="wide" className="home-concept__grid">
        <div className="home-concept__copy">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="home-concept-title">
            {t("titleLineOne")}
            <span>{t("titleLineTwo")}</span>
            <span>{t("titleLineThree")}</span>
          </h2>
          <p>{t("copy")}</p>
          <Button
            href="/the-concept"
            variant="text"
            className="home-concept__link"
          >
            {t("cta")}
          </Button>
        </div>

        <figure className="home-concept__media">
          <Image
            src={conceptImage.src}
            alt={t("imageAlt")}
            width={conceptImage.width}
            height={conceptImage.height}
            sizes="(max-width: 760px) 92vw, (max-width: 980px) 88vw, 32vw"
            className="home-concept__image"
          />
        </figure>
      </Container>
    </section>
  );
}
