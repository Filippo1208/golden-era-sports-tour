import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const editorialSerif = Cormorant_Garamond({
  variable: "--font-editorial-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const contemporarySans = Manrope({
  variable: "--font-contemporary-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golden Era Sports Tour | The Evolution of Tennis, Played by Amateurs",
  description:
    "Golden Era Sports Tour celebrates the evolution and heritage of tennis through international events, original racquets and iconic destinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${editorialSerif.variable} ${contemporarySans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
