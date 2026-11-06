import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FloatingSculpture } from "@/components/floating-sculpture";

export function HeroSection() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-stage page-width">
          <p className="eyebrow hero-intro">神戸電子の学生による開発コミュニティ</p>
          <h1 id="hero-heading" className="hero-type">
            <span className="hero-type-top">神戸電子に、</span>
            <span className="hero-type-bottom">あったらいいなを<span className="type-period">。</span></span>
          </h1>
          <FloatingSculpture />
        </div>
        <div className="hero-bottom page-width">
          <p className="hero-statement">学校の毎日を、<br />僕らのアイデアでもっとおもしろく。</p>
          <p className="hero-summary">つくる人も、使う人も、同じ学校の仲間。<br />サービスをつくり、届け、使う人の声で育てる。<br />実務に近い経験を重ねる学生コミュニティ。</p>
          <div className="hero-actions">
            <Link href="/projects" className="button button-dark">
              僕らのプロジェクト <ArrowDownRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section id="about" className="about-section page-width section-space" aria-labelledby="about-heading">
        <div className="about-title">
          <h2 id="about-heading"><span className="about-kicker">学生コミュニティ</span>Webuとは<span>。</span></h2>
          <ArrowUpRight className="about-arrow" size={120} strokeWidth={1} aria-hidden="true" />
        </div>
        <div className="about-copy">
          <p className="lead-copy">学校の課題を、<br />仲間とサービスにする。</p>
          <p>Webu（We部）は、神戸電子の学生が、学校生活の「あったらいいな」をサービスにする学生コミュニティです。何をつくるか、どう進めるかは、チームで考えます。</p>
          <p>つくったものを実際に使ってもらい、その声から改善を重ねる。課題の整理から開発、ユーザー獲得、運用までを経験しながら、実務に近い進め方を学びます。</p>
          <a href="#learning" className="text-link">ここで学べること <ArrowDownRight size={18} aria-hidden="true" /></a>
        </div>
      </section>
    </>
  );
}
