import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <>
      <section id="home-top" className="hero" data-scene-stop="hero" aria-labelledby="hero-heading">
        <div className="hero-pin">
          <div className="hero-stage page-width">
            <div className="hero-copy">
              <p className="eyebrow hero-intro">神戸電子の学生による開発コミュニティ</p>
              <h1 id="hero-heading" className="hero-headline">
                <span>「あったらいいな」を、</span>
                <span>私たちの手で。</span>
              </h1>
              <p className="hero-description"><span>学校の課題を、仲間とサービスにする。</span><span>企画から開発、公開後の改善まで。</span></p>
              <div className="hero-actions">
                <Link href="/projects" className="button button-dark">
                  プロジェクトを見る <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
                <Link href="/join" className="text-link">参加方法を見る <ArrowUpRight size={18} aria-hidden="true" /></Link>
              </div>
              <a href="#about" className="hero-about-link text-link">Webuについて知る <ArrowDownRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>
      <section id="about" data-scene-stop="about" className="about-section page-width section-space" aria-labelledby="about-heading">
        <div className="about-title">
          <h2 id="about-heading"><span className="about-kicker">学生コミュニティ</span>Webuとは<span>。</span></h2>
        </div>
        <div className="about-copy">
          <p className="lead-copy">学校の課題を、サービスに。</p>
          <p>Webu（We部）は、神戸電子の学生が、学校生活の「あったらいいな」をサービスにする学生コミュニティです。何をつくるか、どう進めるかは、チームで考えます。</p>
          <p>つくったものを実際に使ってもらい、その声から改善を重ねる。課題の整理から開発、ユーザー獲得、運用までを経験しながら、実務に近い進め方を学びます。</p>
          <a href="#learning" className="text-link">ここで学べること <ArrowDownRight size={18} aria-hidden="true" /></a>
        </div>
      </section>
    </>
  );
}
