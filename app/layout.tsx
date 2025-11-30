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
        url: "/webclub.png",
        sizes: "any",
      },
    ],
    apple: "/webclub.png",
  },
};

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
