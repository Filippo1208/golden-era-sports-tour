"use client";

import { useLocale, useTranslations } from "next-intl";
import { type ChangeEvent, useTransition } from "react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const localeNameKeys = {
  en: "english",
  fr: "french",
  it: "italian",
} as const;

type LanguageSwitcherProps = {
  mode: "desktop" | "mobile";
  onDark?: boolean;
};

export function LanguageSwitcher({
  mode,
  onDark = false,
}: LanguageSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");
  const [isPending, startTransition] = useTransition();

  const changeLocale = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as AppLocale;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  if (mode === "mobile") {
    return (
      <label
        className={`language-switcher language-switcher--mobile ${
          onDark ? "language-switcher--on-dark" : ""
        }`.trim()}
      >
        <span className="visually-hidden">{t("label")}</span>
        <span
          className="language-switcher__select-wrap"
          data-current-locale={locale.toUpperCase()}
        >
          <select
            aria-label={t("label")}
            value={locale}
            onChange={changeLocale}
            disabled={isPending}
          >
            {routing.locales.map((availableLocale) => (
              <option key={availableLocale} value={availableLocale}>
                {t(localeNameKeys[availableLocale])}
              </option>
            ))}
          </select>
        </span>
      </label>
    );
  }

  return (
    <nav
      className={`language-switcher language-switcher--desktop ${
        onDark ? "language-switcher--on-dark" : ""
      }`.trim()}
      aria-label={t("label")}
    >
      {routing.locales.map((availableLocale) => (
        <Link
          key={availableLocale}
          href={pathname}
          locale={availableLocale}
          hrefLang={availableLocale}
          aria-current={availableLocale === locale ? "page" : undefined}
        >
          {availableLocale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
