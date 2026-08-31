import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "standard" | "wide" | "narrow";
};

export function Container({
  children,
  className = "",
  size = "standard",
}: ContainerProps) {
  return (
    <div className={`container container--${size} ${className}`.trim()}>
      {children}
    </div>
  );
}
