"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "ホーム" },
  { href: "/projects", label: "プロジェクト" },
  { href: "/join", label: "参加方法" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <Link href="/" className="wordmark" aria-label="Webu ホームへ">
          Webu<span>.</span>
        </Link>
        <nav className="page-nav" aria-label="メインナビゲーション">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
