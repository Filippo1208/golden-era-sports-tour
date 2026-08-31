type VideoPlaceholderProps = {
  label?: string;
  className?: string;
};

export function VideoPlaceholder({
  label = "future-video.mp4",
  className = "",
}: VideoPlaceholderProps) {
  return (
    <div
      className={`video-placeholder ${className}`.trim()}
      role="img"
      aria-label={`Development video placeholder for ${label}`}
    >
      <div>
        <span>Video placeholder</span>
        <strong>{label}</strong>
        <small>Native HTML5 video slot</small>
      </div>
    </div>
  );
}
