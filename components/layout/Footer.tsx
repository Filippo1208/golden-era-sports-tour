import { useTranslations } from "next-intl";

import { MainNavigation } from "@/components/navigation/MainNavigation";
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
      </div>

      <MainNavigation className="site-footer__nav" />
    </footer>
  );
}
