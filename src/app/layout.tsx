import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/lib/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nakshi Agency",
    template: "%s | Nakshi",
  },
  description: "We build immersive digital experiences.",
  metadataBase: new URL("https://nakshi.agency"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased bg-[var(--background)] text-[var(--foreground)]">
        <SmoothScroll>
          <main className="relative">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}