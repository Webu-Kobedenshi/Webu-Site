import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// <CHANGE> Updated metadata for We部
export const metadata: Metadata = {
  title: "We部 | Web系優良企業内定を目指すコミュニティ",
  description:
    "Web系優良企業内定を目指す仲間と共に学び、成長するコミュニティ。情報共有、スキルアップ、就活対策を一緒に。",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "We部 | Web系優良企業内定を目指すコミュニティ",
    description:
      "Web系優良企業内定を目指す仲間と共に学び、成長するコミュニティ。情報共有、スキルアップ、就活対策を一緒に。",
    images: [
      {
        url: "/webu-logo.png",
        width: 1024,
        height: 1024,
        alt: "We部",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "We部 | Web系優良企業内定を目指すコミュニティ",
    description:
      "Web系優良企業内定を目指す仲間と共に学び、成長するコミュニティ。情報共有、スキルアップ、就活対策を一緒に。",
    images: ["/webu-logo.png"],
  },
};

import { SmoothScroll } from "@/components/smooth-scroll";
import { NoiseOverlay } from "@/components/noise-overlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SmoothScroll>
          <NoiseOverlay />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}

