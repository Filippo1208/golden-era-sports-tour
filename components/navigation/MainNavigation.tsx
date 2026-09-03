import { useTranslations } from "next-intl";

import { navigationItems } from "@/data/navigation";
import { Link } from "@/i18n/navigation";

type MainNavigationProps = {
  className?: string;
  onDark?: boolean;
};

export function MainNavigation({
  className = "",
  onDark = false,
}: MainNavigationProps) {
  const t = useTranslations("Navigation");

  return (
    <nav
      className={`main-navigation ${
        onDark ? "main-navigation--dark" : ""
      } ${className}`.trim()}
      aria-label={t("primaryLabel")}
    >
      {navigationItems.map((item) => (
        <Link key={item.href} href={item.href}>
          {t(`items.${item.labelKey}`)}
        </Link>
      ))}
    </nav>
  );
}
