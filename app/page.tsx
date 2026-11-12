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
        <h2 id="home-next-heading">プロジェクトと参加方法</h2>
        <div className="home-next-links">
          <Link href="/projects"><span>プロジェクト</span><ArrowUpRight aria-hidden="true" /></Link>
          <Link href="/join"><span>参加方法</span><ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
