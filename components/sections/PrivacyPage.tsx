import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contactDetails } from "@/data/contact";

export async function PrivacyPage() {
  const t = await getTranslations("PrivacyPage");

  return (
    <article className="privacy-page">
      <header className="privacy-hero">
        <Container size="narrow" className="privacy-hero__inner">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1>{t("title")}</h1>
          <p>{t("intro")}</p>
        </Container>
      </header>

      <Container size="narrow" className="privacy-policy">
        <section className="privacy-policy__section">
          <h2>{t("controller.title")}</h2>
          <div className="privacy-policy__body">
            <p>{t("controller.copy")}</p>
            <address>
              <strong>Vintage Events Montecarlo S.r.l.s.</strong>
              <span>Largo Francesco Richini 2</span>
              <span>20122 Milano</span>
              <span>Italy</span>
              <span>VAT / Tax Code: 14563590968</span>
              <span>REA: MI-2792204</span>
            </address>
            <p>
              {t("controller.contactLabel")}: {" "}
              <a href={contactDetails.emailHref}>{contactDetails.email}</a>
            </p>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2>{t("data.title")}</h2>
          <div className="privacy-policy__body">
            <p>{t("data.intro")}</p>
            <h3>{t("data.applicationTitle")}</h3>
            <p>{t("data.applicationCopy")}</p>
            <h3>{t("data.contactTitle")}</h3>
            <p>{t("data.contactCopy")}</p>
            <h3>{t("data.technicalTitle")}</h3>
            <p>{t("data.technicalCopy")}</p>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2>{t("purposes.title")}</h2>
          <div className="privacy-policy__body">
            <ul>
              <li>{t("purposes.application")}</li>
              <li>{t("purposes.contact")}</li>
              <li>{t("purposes.security")}</li>
            </ul>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2>{t("basis.title")}</h2>
          <div className="privacy-policy__body">
            <p>{t("basis.copy")}</p>
            <p>{t("basis.withdrawal")}</p>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2>{t("sharing.title")}</h2>
          <div className="privacy-policy__body">
            <p>{t("sharing.copy")}</p>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2>{t("retention.title")}</h2>
          <div className="privacy-policy__body">
            <p>{t("retention.copy")}</p>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2>{t("rights.title")}</h2>
          <div className="privacy-policy__body">
            <p>{t("rights.copy")}</p>
            <p>
              {t("rights.contact")}{" "}
              <a href={contactDetails.emailHref}>{contactDetails.email}</a>.
            </p>
          </div>
        </section>

        <section className="privacy-policy__section">
          <h2>{t("marketing.title")}</h2>
          <div className="privacy-policy__body">
            <p>{t("marketing.copy")}</p>
          </div>
        </section>
      </Container>
    </article>
  );
}
