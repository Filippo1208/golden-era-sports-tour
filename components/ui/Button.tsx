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

function ButtonArrowIcon({ arrow }: { arrow: ButtonProps["arrow"] }) {
  if (arrow === "up-right") {
    return (
      <svg
        className="button__icon"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    );
  }

  return (
    <svg
      className="button__icon"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

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
      <ButtonArrowIcon arrow={arrow} />
    </Link>
  );
}
