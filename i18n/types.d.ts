import type englishMessages from "@/messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: "en" | "fr" | "it";
    Messages: typeof englishMessages;
  }
}

