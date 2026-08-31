import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OfficialPartners } from "@/components/sections/OfficialPartners";

type PublicPageShellProps = {
  children: ReactNode;
  heroTone?: "dark" | "light";
  mainClassName?: string;
  showOfficialPartners?: boolean;
};

export function PublicPageShell({
  children,
  heroTone = "dark",
  mainClassName,
  showOfficialPartners = true,
}: PublicPageShellProps) {
  return (
    <>
      <Header heroTone={heroTone} />
      <main className={mainClassName}>{children}</main>
      {showOfficialPartners ? <OfficialPartners /> : null}
      <Footer />
    </>
  );
}
