import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contactDetails } from "@/data/contact";

export async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <>
      <section className="contact-opening" aria-labelledby="contact-title">
        <Container size="wide" className="contact-opening__grid">
          <div className="contact-opening__intro">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 id="contact-title">{t("title")}</h1>
            <p className="contact-opening__copy">{t("intro")}</p>

            <div className="contact-points">
              <div className="contact-point">
                <p>{t("generalEnquiries")}</p>
                <a href={contactDetails.emailHref}>{contactDetails.email}</a>
              </div>

              <div className="contact-point">
                <p>{t("followTour")}</p>
                <a
                  className="contact-point__instagram"
                  href={contactDetails.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="contact-point__instagram-icon"
                    src="/images/social/instagram.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span>{t("instagram")}</span>
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </Container>
      </section>

      <section className="contact-join" aria-labelledby="contact-join-title">
        <Container size="wide" className="contact-join__inner">
          <h2 id="contact-join-title">{t("join.prompt")}</h2>
          <Button href="/join" variant="text" arrow="up-right">
            {t("join.cta")}
          </Button>
        </Container>
      </section>
    </>
  );
}
