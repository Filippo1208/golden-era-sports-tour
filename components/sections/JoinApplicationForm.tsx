"use client";

import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, type ReactNode, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  clothingSizes,
  genderOptions,
  playingHandOptions,
  referralSourceOptions,
  tennisLevelOptions,
  type JoinApplicationEventOption,
} from "@/data/join";

type TextFieldName =
  | "firstName"
  | "lastName"
  | "gender"
  | "email"
  | "phone"
  | "country"
  | "tennisLevel"
  | "clubBackground"
  | "playingHand"
  | "tshirtSize"
  | "bottomSize"
  | "eventSlug"
  | "referralSource"
  | "message";

type FieldName = TextFieldName | "privacyConsent";
type FieldErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

type JoinApplicationFormProps = {
  events: JoinApplicationEventOption[];
};

const textFieldNames: TextFieldName[] = [
  "firstName",
  "lastName",
  "gender",
  "email",
  "phone",
  "country",
  "tennisLevel",
  "clubBackground",
  "playingHand",
  "tshirtSize",
  "bottomSize",
  "eventSlug",
  "referralSource",
  "message",
];

const requiredFieldNames: TextFieldName[] = [
  "firstName",
  "lastName",
  "gender",
  "email",
  "phone",
  "country",
  "tennisLevel",
  "tshirtSize",
  "bottomSize",
  "eventSlug",
];

function readFormValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function RequiredMark() {
  return <span aria-hidden="true"> *</span>;
}

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  return children ? (
    <span id={id} className="join-form__field-error">
      {children}
    </span>
  ) : null;
}

export function JoinApplicationForm({ events }: JoinApplicationFormProps) {
  const locale = useLocale();
  const t = useTranslations("JoinPage.form");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  const errorProps = (name: FieldName) => ({
    "aria-invalid": Boolean(fieldErrors[name]),
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(
      textFieldNames.map((name) => [name, readFormValue(formData, name)]),
    ) as Record<TextFieldName, string>;
    const privacyConsent = formData.get("privacyConsent") === "on";
    const nextFieldErrors: FieldErrors = {};

    requiredFieldNames.forEach((name) => {
      if (!values[name]) {
        nextFieldErrors[name] = t("validation.required");
      }
    });

    if (values.email && !isValidEmail(values.email)) {
      nextFieldErrors.email = t("validation.email");
    }

    if (
      values.eventSlug &&
      !events.some((availableEvent) => availableEvent.value === values.eventSlug)
    ) {
      nextFieldErrors.eventSlug = t("validation.event");
    }

    if (!privacyConsent) {
      nextFieldErrors.privacyConsent = t("validation.privacy");
    }

    setFieldErrors(nextFieldErrors);
    setFormError("");

    if (Object.keys(nextFieldErrors).length > 0) {
      setStatus("idle");
      const firstInvalidField = Object.keys(nextFieldErrors)[0];

      window.requestAnimationFrame(() => {
        document.getElementById(firstInvalidField)?.focus();
      });
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          locale,
          privacyConsent,
          submissionId: crypto.randomUUID(),
          companyWebsite: readFormValue(formData, "companyWebsite"),
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        code?: string;
      } | null;

      if (!response.ok) {
        setStatus("error");

        if (result?.code === "EMAIL_NOT_CONFIGURED") {
          setFormError(t("errors.unavailable"));
        } else if (result?.code === "RATE_LIMITED") {
          setFormError(t("errors.rateLimited"));
        } else {
          setFormError(t("errors.generic"));
        }

        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(t("errors.generic"));
    }
  };

  if (status === "success") {
    return (
      <section className="join-success" role="status" aria-live="polite">
        <h2>{t("success.title")}</h2>
        <p>{t("success.intro")}</p>
        <p>{t("success.followUp")}</p>
        <Button href="/tour" variant="text">
          {t("success.cta")}
        </Button>
      </section>
    );
  }

  return (
    <form className="join-form" onSubmit={handleSubmit} noValidate>
      <h2 className="visually-hidden">{t("title")}</h2>

      <div className="join-form__honeypot" aria-hidden="true">
        <label htmlFor="companyWebsite">{t("honeypot")}</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="join-form__section">
        <legend>
          <span>01</span>
          {t("sections.personal")}
        </legend>
        <div className="join-form__grid">
          <div className="join-form__field">
            <label htmlFor="firstName">
              {t("fields.firstName")}
              <RequiredMark />
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              maxLength={80}
              {...errorProps("firstName")}
            />
            <FieldError id="firstName-error">{fieldErrors.firstName}</FieldError>
          </div>

          <div className="join-form__field">
            <label htmlFor="lastName">
              {t("fields.lastName")}
              <RequiredMark />
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              maxLength={80}
              {...errorProps("lastName")}
            />
            <FieldError id="lastName-error">{fieldErrors.lastName}</FieldError>
          </div>

          <div className="join-form__field">
            <label htmlFor="gender">
              {t("fields.gender")}
              <RequiredMark />
            </label>
            <select id="gender" name="gender" defaultValue="" required {...errorProps("gender")}>
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`options.gender.${option}`)}
                </option>
              ))}
            </select>
            <FieldError id="gender-error">{fieldErrors.gender}</FieldError>
          </div>

          <div className="join-form__field">
            <label htmlFor="country">
              {t("fields.country")}
              <RequiredMark />
            </label>
            <input
              id="country"
              name="country"
              type="text"
              autoComplete="country-name"
              required
              maxLength={120}
              {...errorProps("country")}
            />
            <FieldError id="country-error">{fieldErrors.country}</FieldError>
          </div>

          <div className="join-form__field">
            <label htmlFor="email">
              {t("fields.email")}
              <RequiredMark />
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={254}
              {...errorProps("email")}
            />
            <FieldError id="email-error">{fieldErrors.email}</FieldError>
          </div>

          <div className="join-form__field">
            <label htmlFor="phone">
              {t("fields.phone")}
              <RequiredMark />
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={60}
              {...errorProps("phone")}
            />
            <FieldError id="phone-error">{fieldErrors.phone}</FieldError>
          </div>
        </div>
      </fieldset>

      <fieldset className="join-form__section">
        <legend>
          <span>02</span>
          {t("sections.tennis")}
        </legend>
        <div className="join-form__grid">
          <div className="join-form__field">
            <label htmlFor="tennisLevel">
              {t("fields.tennisLevel")}
              <RequiredMark />
            </label>
            <select
              id="tennisLevel"
              name="tennisLevel"
              defaultValue=""
              required
              {...errorProps("tennisLevel")}
            >
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {tennisLevelOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`options.tennisLevel.${option}`)}
                </option>
              ))}
            </select>
            <FieldError id="tennisLevel-error">
              {fieldErrors.tennisLevel}
            </FieldError>
          </div>

          <div className="join-form__field">
            <label htmlFor="playingHand">{t("fields.playingHand")}</label>
            <select
              id="playingHand"
              name="playingHand"
              defaultValue=""
              {...errorProps("playingHand")}
            >
              <option value="">{t("optionalPlaceholder")}</option>
              {playingHandOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`options.playingHand.${option}`)}
                </option>
              ))}
            </select>
            <FieldError id="playingHand-error">{fieldErrors.playingHand}</FieldError>
          </div>

          <div className="join-form__field join-form__field--wide">
            <label htmlFor="clubBackground">{t("fields.clubBackground")}</label>
            <textarea
              id="clubBackground"
              name="clubBackground"
              maxLength={1000}
              rows={4}
              {...errorProps("clubBackground")}
            />
            <FieldError id="clubBackground-error">
              {fieldErrors.clubBackground}
            </FieldError>
          </div>
        </div>
      </fieldset>

      <fieldset className="join-form__section">
        <legend>
          <span>03</span>
          {t("sections.kit")}
        </legend>
        <div className="join-form__grid">
          <div className="join-form__field">
            <label htmlFor="tshirtSize">
              {t("fields.tshirtSize")}
              <RequiredMark />
            </label>
            <select
              id="tshirtSize"
              name="tshirtSize"
              defaultValue=""
              required
              {...errorProps("tshirtSize")}
            >
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {clothingSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <FieldError id="tshirtSize-error">{fieldErrors.tshirtSize}</FieldError>
          </div>

          <div className="join-form__field">
            <label htmlFor="bottomSize">
              {t("fields.bottomSize")}
              <RequiredMark />
            </label>
            <select
              id="bottomSize"
              name="bottomSize"
              defaultValue=""
              required
              {...errorProps("bottomSize")}
            >
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {clothingSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <FieldError id="bottomSize-error">{fieldErrors.bottomSize}</FieldError>
          </div>
        </div>
      </fieldset>

      <fieldset className="join-form__section">
        <legend>
          <span>04</span>
          {t("sections.event")}
        </legend>
        <div className="join-form__grid">
          <div className="join-form__field join-form__field--wide">
            <label htmlFor="eventSlug">
              {t("fields.event")}
              <RequiredMark />
            </label>
            <select
              id="eventSlug"
              name="eventSlug"
              defaultValue=""
              required
              {...errorProps("eventSlug")}
            >
              <option value="" disabled>
                {t("selectEventPlaceholder")}
              </option>
              {events.map((availableEvent) => (
                <option key={availableEvent.value} value={availableEvent.value}>
                  {availableEvent.label}
                </option>
              ))}
            </select>
            <FieldError id="eventSlug-error">{fieldErrors.eventSlug}</FieldError>
          </div>
        </div>
      </fieldset>

      <fieldset className="join-form__section">
        <legend>
          <span>05</span>
          {t("sections.additional")}
        </legend>
        <div className="join-form__grid">
          <div className="join-form__field join-form__field--wide">
            <label htmlFor="referralSource">{t("fields.referralSource")}</label>
            <select
              id="referralSource"
              name="referralSource"
              defaultValue=""
              {...errorProps("referralSource")}
            >
              <option value="">{t("optionalPlaceholder")}</option>
              {referralSourceOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`options.referralSource.${option}`)}
                </option>
              ))}
            </select>
            <FieldError id="referralSource-error">
              {fieldErrors.referralSource}
            </FieldError>
          </div>

          <div className="join-form__field join-form__field--wide">
            <label htmlFor="message">{t("fields.message")}</label>
            <textarea
              id="message"
              name="message"
              maxLength={3000}
              rows={5}
              {...errorProps("message")}
            />
            <FieldError id="message-error">{fieldErrors.message}</FieldError>
          </div>
        </div>
      </fieldset>

      <fieldset className="join-form__section join-form__section--privacy">
        <legend>
          <span>06</span>
          {t("sections.privacy")}
        </legend>

        <div className="join-form__consent">
          <input
            id="privacyConsent"
            name="privacyConsent"
            type="checkbox"
            required
            {...errorProps("privacyConsent")}
          />
          <label htmlFor="privacyConsent">
            {t.rich("privacy.consent", {
              policy: (chunks) => (
                <a href="#join-privacy-note">{chunks}</a>
              ),
            })}
          </label>
        </div>
        <FieldError id="privacyConsent-error">
          {fieldErrors.privacyConsent}
        </FieldError>

        <div id="join-privacy-note" className="join-form__privacy-note">
          <h3>{t("privacy.title")}</h3>
          <p>{t("privacy.note")}</p>
        </div>
      </fieldset>

      {formError ? (
        <p className="join-form__error" role="alert">
          {formError}
        </p>
      ) : null}

      <button
        className="button button--primary join-form__submit"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
