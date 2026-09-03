import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export async function CollectionPage() {
  const t = await getTranslations("CollectionPage");

  return (
    <section className="collection-preview" aria-labelledby="collection-title">
      <Container size="wide" className="collection-preview__inner">
        <div className="collection-preview__meta">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <p className="collection-preview__status">{t("status")}</p>
        </div>

        <h1 id="collection-title" className="collection-preview__title">
          <span>{t("titleLineOne")}</span>
          <span>{t("titleLineTwo")}</span>
        </h1>

        <div className="collection-preview__body">
          <div className="collection-preview__copy">
            <p>{t("introLineOne")}</p>
            <p>{t("introLineTwo")}</p>
          </div>

          <figure className="collection-preview__media">
            <Image
              src="/images/the-concept/racquetevolution.jpg"
              alt={t("imageAlt")}
              width={1466}
              height={2200}
              sizes="(max-width: 760px) 100vw, (max-width: 1100px) 38vw, 30vw"
              className="collection-preview__image"
            />
          </figure>
        </div>

        <p className="collection-preview__closing">
          <span>{t("closingLineOne")}</span>
          <span>{t("closingLineTwo")}</span>
        </p>
      </Container>
    </section>
  );
}
