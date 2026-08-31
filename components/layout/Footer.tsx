import Link from "next/link";

import { MainNavigation } from "@/components/navigation/MainNavigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <Link href="/" aria-label="Golden Era home">
          <span>Golden Era</span>
          <small>Sports Tour</small>
        </Link>
        <p>By Vintage Events Monte-Carlo</p>
      </div>

      <MainNavigation className="site-footer__nav" />
    </footer>
  );
}
