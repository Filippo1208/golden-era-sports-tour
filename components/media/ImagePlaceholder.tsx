import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

type ImagePlaceholderProps = {
  label?: string;
  aspectRatio?: "16:9" | "3:2" | "4:5" | "1:1";
  className?: string;
};

const aspectRatios = {
  "16:9": "16 / 9",
  "3:2": "3 / 2",
  "4:5": "4 / 5",
  "1:1": "1 / 1",
};

export function ImagePlaceholder({
  label = "future-image.jpg",
  aspectRatio = "16:9",
  className = "",
}: ImagePlaceholderProps) {
  const t = useTranslations("MediaPlaceholders");

  return (
    <div
      className={`image-placeholder ${className}`.trim()}
      style={{ "--placeholder-ratio": aspectRatios[aspectRatio] } as CSSProperties}
      role="img"
      aria-label={t("imageAriaLabel", { label })}
    >
      <span>{t("imageLabel")}</span>
      <strong>{label}</strong>
      <small>{aspectRatio}</small>
    </div>
  );
}
