import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Webu (We部) | 学校の「あったらいいな」を、僕らの手で。",
  description:
    "Webuは、神戸電子をもっと便利に、もっとおもしろくするサービスを仲間と生み出す、学生主体の開発コミュニティです。チーム開発、Git講座、知識共有を通じて、身近なアイデアを形にします。",
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
    title: "Webu (We部) | 学校の「あったらいいな」を、僕らの手で。",
    description:
      "神戸電子の学生が、身近なアイデアをサービスに。仲間と学び、つくり、学校をもっとおもしろくする開発コミュニティ。",
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
    title: "Webu (We部) | 学校の「あったらいいな」を、僕らの手で。",
    description:
      "神戸電子の学生が、身近なアイデアをサービスに。仲間と学び、つくり、学校をもっとおもしろくする開発コミュニティ。",
    images: ["/webu-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div id="top">
          <a href="#main-content" className="skip-link">本文へスキップ</a>
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

