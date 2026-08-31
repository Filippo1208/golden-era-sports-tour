import Link from "next/link";

import { navigationItems } from "@/data/navigation";

type MainNavigationProps = {
  className?: string;
  onDark?: boolean;
};

export function MainNavigation({
  className = "",
  onDark = false,
}: MainNavigationProps) {
  return (
    <nav
      className={`main-navigation ${
        onDark ? "main-navigation--dark" : ""
      } ${className}`.trim()}
      aria-label="Primary navigation"
    >
      {navigationItems.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
