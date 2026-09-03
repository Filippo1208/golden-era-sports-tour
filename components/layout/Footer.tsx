import Image from "next/image";
import { useTranslations } from "next-intl";

import { MainNavigation } from "@/components/navigation/MainNavigation";
import { contactDetails } from "@/data/contact";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const navigation = useTranslations("Navigation");
  const footer = useTranslations("Footer");

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <Link href="/" aria-label={navigation("homeLabel")}>
          <span>Golden Era</span>
          <small>Sports Tour</small>
        </Link>
        <p>{footer("byline")}</p>
        <a
          className="site-footer__instagram"
          href={contactDetails.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="site-footer__instagram-icon"
            src="/images/social/instagram.png"
            alt=""
            width={17}
            height={17}
          />
          <span>{footer("instagram")}</span>
        </a>
      </div>

      <MainNavigation className="site-footer__nav" />

      <div className="site-footer__legal">
        <address className="site-footer__company">
          <p>Vintage Events Montecarlo S.r.l.s.</p>
          <p>
            <span>Largo Francesco Richini 2</span>
            <span>20122 Milano</span>
            <span>Italy</span>
          </p>
          <p>
            <span>VAT / Tax Code: 14563590968</span>
            <span>REA: MI-2792204</span>
          </p>
        </address>

        <div className="site-footer__closing">
          <p>
            &copy; 2026 Golden Era Sports Tour &middot; Vintage Events Montecarlo
            S.r.l.s. &middot; P. IVA 14563590968 &middot; REA MI-2792204
          </p>
          <p>Website by Filippo Chiani</p>
        </div>
      </div>
    </footer>
  );
}
