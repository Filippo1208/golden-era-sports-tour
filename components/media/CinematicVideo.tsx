import type { CSSProperties, ReactNode } from "react";

import { VideoPlaceholder } from "@/components/media/VideoPlaceholder";

type CinematicVideoProps = {
  desktopSrc?: string | null;
  mobileSrc?: string | null;
  posterImage?: string | null;
  fallbackLabel?: string;
  objectPosition?: string;
  className?: string;
  children?: ReactNode;
};

export function CinematicVideo({
  desktopSrc,
  mobileSrc,
  posterImage,
  fallbackLabel = "home-hero-desktop.mp4 / home-hero-mobile.mp4",
  objectPosition = "center center",
  className = "",
  children,
}: CinematicVideoProps) {
  const hasVideo = Boolean(desktopSrc || mobileSrc);

  return (
    <div
      className={`cinematic-video ${className}`.trim()}
      style={{ "--video-object-position": objectPosition } as CSSProperties}
    >
      {hasVideo ? (
        <video
          className="cinematic-video__media"
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage ?? undefined}
          preload="metadata"
          aria-hidden="true"
        >
          {mobileSrc ? (
            <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
          ) : null}
          {desktopSrc ? <source src={desktopSrc} type="video/mp4" /> : null}
        </video>
      ) : (
        <VideoPlaceholder label={fallbackLabel} className="cinematic-video__media" />
      )}
      <div className="cinematic-video__shade" />
      {children ? <div className="cinematic-video__overlay">{children}</div> : null}
    </div>
  );
}
