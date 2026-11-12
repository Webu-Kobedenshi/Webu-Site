import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer page-width">
      <div className="footer-main">
        <div>
          <Link className="wordmark footer-wordmark" href="/" aria-label="Webu ホームへ">Webu<span>.</span></Link>
          <p>学校の「あったらいいな」を、私たちの手で。</p>
          <p className="footer-description">神戸電子の学生による開発コミュニティ</p>
        </div>
        <nav className="footer-links" aria-label="関連リンク">
          <a href="https://webu-kobedenshi.github.io/web-community-vault/We%E9%83%A8%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/" target="_blank" rel="noopener noreferrer">
            コミュニティガイド <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="https://notebooklm.google.com/notebook/81622d4b-dbcb-4a6c-a2c1-19828092a7a8" target="_blank" rel="noopener noreferrer">
            コミュニティ専用AI <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <Link href="/projects">プロジェクト <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link href="/join">参加方法 <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>運営: 神戸電子専門学校 ソフトIV 橋本怜苑・服部潤一</p>
        <p>&copy; {new Date().getFullYear()} Webu (We部)</p>
      </div>
    </footer>
  );
}
