import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { ActivitySection } from "@/components/activity-section";
import { ActivityPhotoSection } from "@/components/activity-photo-section";
import { LearningSection } from "@/components/learning-section";
import { HomeSectionNav } from "@/components/home-section-nav";
import { FloatingSculpture } from "@/components/floating-sculpture";

export default function Home() {
  return (
    <div className="home-experience" data-home-experience>
      <HomeSectionNav />
      <FloatingSculpture />
      <div className="home-scene-controls" data-scene-controls />
      <HeroSection />
      <LearningSection />
      <ActivityPhotoSection />
      <ActivitySection />
      <section id="home-next" className="home-next page-width" data-scene-stop="links" aria-labelledby="home-next-heading">
        <div className="section-index-bar">
          <span>05 / EXPLORE</span>
          <span>NEXT STEPS</span>
        </div>
        <h2 id="home-next-heading">プロジェクトと参加方法</h2>
        <div className="home-next-links">
          <Link href="/projects">
            <span className="home-next-link-label">
              <span className="home-next-link-index">01 / WORKS</span>
              <span>プロジェクト</span>
            </span>
            <span className="home-next-link-icon" aria-hidden="true">
              <ArrowUpRight size={22} />
            </span>
          </Link>
          <Link href="/join">
            <span className="home-next-link-label">
              <span className="home-next-link-index">02 / JOIN US</span>
              <span>参加方法</span>
            </span>
            <span className="home-next-link-icon" aria-hidden="true">
              <ArrowUpRight size={22} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
