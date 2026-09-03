"use client";

import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";

type FieldName = "firstName" | "lastName" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldNames: FieldName[] = [
  "firstName",
  "lastName",
  "email",
  "subject",
  "message",
];

function readFormValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(
      fieldNames.map((name) => [name, readFormValue(formData, name)]),
    ) as Record<FieldName, string>;
    const nextFieldErrors: FieldErrors = {};

    fieldNames.forEach((name) => {
      if (!values[name]) {
        nextFieldErrors[name] = t("validation.required");
      }
    });

    if (values.email && !isValidEmail(values.email)) {
      nextFieldErrors.email = t("validation.email");
    }

    setFieldErrors(nextFieldErrors);
    setFormError("");

    if (Object.keys(nextFieldErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          companyWebsite: readFormValue(formData, "companyWebsite"),
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        code?: string;
      } | null;

      if (!response.ok) {
        setStatus("error");
        setFormError(
          result?.code === "EMAIL_NOT_CONFIGURED"
            ? t("errors.unavailable")
            : t("errors.generic"),
        );
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
      <section className="contact-form-success" role="status" aria-live="polite">
        <h2>{t("success.title")}</h2>
        <p>{t("success.lineOne")}</p>
        <p>{t("success.lineTwo")}</p>
      </section>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h2 className="visually-hidden">{t("title")}</h2>

      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="companyWebsite">{t("honeypot")}</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-form__fields">
        <div className="contact-form__field">
          <label htmlFor="firstName">{t("fields.firstName")}</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            maxLength={80}
            aria-invalid={Boolean(fieldErrors.firstName)}
            aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
          />
          {fieldErrors.firstName ? (
            <span id="firstName-error" className="contact-form__field-error">
              {fieldErrors.firstName}
            </span>
          ) : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="lastName">{t("fields.lastName")}</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            maxLength={80}
            aria-invalid={Boolean(fieldErrors.lastName)}
            aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
          />
          {fieldErrors.lastName ? (
            <span id="lastName-error" className="contact-form__field-error">
              {fieldErrors.lastName}
            </span>
          ) : null}
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="email">{t("fields.email")}</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email ? (
            <span id="email-error" className="contact-form__field-error">
              {fieldErrors.email}
            </span>
          ) : null}
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="subject">{t("fields.subject")}</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            maxLength={160}
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
          />
          {fieldErrors.subject ? (
            <span id="subject-error" className="contact-form__field-error">
              {fieldErrors.subject}
            </span>
          ) : null}
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="message">{t("fields.message")}</label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={3000}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          {fieldErrors.message ? (
            <span id="message-error" className="contact-form__field-error">
              {fieldErrors.message}
            </span>
          ) : null}
        </div>
      </div>

      {formError ? (
        <p className="contact-form__error" role="alert">
          {formError}
        </p>
      ) : null}

      <button
        className="button button--primary contact-form__submit"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
