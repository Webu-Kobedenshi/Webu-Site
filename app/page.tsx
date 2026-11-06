import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { ActivitySection } from "@/components/activity-section";
import { LearningSection } from "@/components/learning-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LearningSection />
      <ActivitySection />
      <section className="home-next page-width" aria-labelledby="home-next-heading">
        <h2 id="home-next-heading">プロジェクトと参加方法</h2>
        <div className="home-next-links">
          <Link href="/projects"><span>プロジェクト</span><ArrowUpRight aria-hidden="true" /></Link>
          <Link href="/join"><span>参加方法</span><ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
