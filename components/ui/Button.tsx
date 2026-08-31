import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  arrow?: "right" | "up-right";
  variant?: "primary" | "outline" | "text";
  onDark?: boolean;
};

export function Button({
  children,
  href,
  className = "",
  arrow = "right",
  variant = "primary",
  onDark = false,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`button button--${variant} ${
        onDark ? "button--on-dark" : ""
      } ${className}`.trim()}
    >
      <span>{children}</span>
      <span aria-hidden="true">{arrow === "up-right" ? "\u2197" : "\u2192"}</span>
    </Link>
  );
}
