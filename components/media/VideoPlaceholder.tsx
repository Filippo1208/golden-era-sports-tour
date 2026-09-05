import { useTranslations } from "next-intl";

type VideoPlaceholderProps = {
  label?: string;
  className?: string;
};

export function VideoPlaceholder({
  label = "future-video.mp4",
  className = "",
}: VideoPlaceholderProps) {
  const t = useTranslations("MediaPlaceholders");

  return (
    <div
      className={`video-placeholder ${className}`.trim()}
      role="img"
      aria-label={t("videoAriaLabel", { label })}
    >
      <div>
        <span>{t("videoLabel")}</span>
        <strong>{label}</strong>
        <small>{t("videoHint")}</small>
      </div>
    </div>
  );
}
