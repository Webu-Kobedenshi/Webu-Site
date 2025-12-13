"use client";

import { ExternalLink, Calendar, Trophy, Users, Rocket, ArrowRight } from "lucide-react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const activities = [
  {
    id: "01",
    title: "チーム開発",
    subtitle: "Practical Development",
    description: "1年間を通して実際にサービスをリリース。企画から設計、開発、運用までここで体験しよう!",
    detail: "技術選定や開発の進め方などはどんどん先輩や強強エンジニアに聞いていこう！！",
    tag: "週1 / オフライン",
    icon: <Rocket className="h-24 w-24 text-orange-500/80" />,
    gradient: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/30",
  },
  {
    id: "02",
    title: "ハッカソン出場",
    subtitle: "Hackathon Challenge",
    description: "チームで外部のハッカソンに参加し、実践的な開発経験を積みます。",
    detail: "外部ハッカソンで受賞すれば就職活動の実績として超強力な武器になります。",
    tag: "年に1度 / 任意",
    linkLabel: "技育展 2025 (例)",
    linkUrl: "https://geek.supporterz.jp/geekten/2025",
    icon: <Trophy className="h-24 w-24 text-yellow-500/80" />,
    gradient: "from-yellow-500/20 to-yellow-600/5",
    border: "border-yellow-500/30",
  },
  {
    id: "03",
    title: "情報共有ラフ会",
    subtitle: "Knowledge Share",
    description: "就活の情報や企業研究、技術トークや面接対策などをメンバー同士で共有します。",
    detail: "有料企業や大手の情報はなかなか学校では手に入りません！",
    tag: "月1 / ハイブリッド",
    icon: <Users className="h-24 w-24 text-blue-500/80" />,
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
  },
  {
    id: "04",
    title: "OBOGコミュニティ",
    subtitle: "Alumni Network",
    description: "卒業後もつながり続け、インターンや企業情報を後輩に還元できる仕組みを整備予定。",
    detail: "Coming Soon...",
    tag: "Coming Soon",
    icon: <Calendar className="h-24 w-24 text-gray-500/80" />,
    gradient: "from-gray-500/20 to-gray-600/5",
    border: "border-gray-500/30",
  },
];

export function ActivitySection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Transform horizontal movement
  // Adjusted for 4 items
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  // Parallax background text opacity
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const progressBarWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="activity" ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/5 z-50">
          <motion.div style={{ width: progressBarWidth }} className="h-full bg-primary" />
        </div>

        {/* Dynamic Background Title */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-[10%] left-[5%] pointer-events-none z-0"
        >
          <span className="block text-[15vw] font-black leading-none text-foreground/5 select-none tracking-tighter">
            ACTIVITIES
          </span>
          <span className="block text-2xl md:text-4xl font-bold text-primary ml-2 uppercase tracking-[0.5em]">
            Curriculum
          </span>
        </motion.div>

        {/* Main Horizontal Scroll Area */}
        <motion.div style={{ x }} className="flex gap-8 md:gap-16 pl-[10vw] items-center h-full">

          {/* Introductory Text Block */}
          <div className="shrink-0 w-[80vw] md:w-[400px] flex flex-col justify-center pr-10">
            <div className="h-1 w-20 bg-primary mb-8" />
            <h3 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-[1.1]">
              活動内容<br />
              <span className="text-3xl md:text-5xl text-muted-foreground/50">Program</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              週に一度の定例会をはじめ、<br />
              ハッカソンや就活対策など<br />
              多角的に成長をサポートします。
            </p>
            <div className="mt-8 flex items-center gap-2 text-primary font-bold animate-pulse">
              <ArrowRight className="h-5 w-5" />
              <span>Scroll to Next</span>
            </div>
          </div>

          {/* Activity Cards */}
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`group relative h-[65vh] w-[85vw] md:w-[500px] shrink-0 overflow-hidden rounded-[2.5rem] border ${activity.border} bg-gradient-to-br ${activity.gradient} backdrop-blur-3xl bg-white/40 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl`}
            >
              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-6xl font-black text-foreground/10 font-mono tracking-tighter">
                    {activity.id}
                  </span>
                  <div className="p-3 bg-white/80 backdrop-blur rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {activity.icon}
                  </div>
                </div>

                <h4 className="text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {activity.title}
                </h4>
                <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground/60 mb-6">
                  {activity.subtitle}
                </p>

                <p className="text-lg font-medium text-foreground/80 leading-relaxed">
                  {activity.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 space-y-6">
                <div className="pl-4 border-l-2 border-foreground/10 py-1">
                  <p className="text-sm text-muted-foreground">
                    {activity.detail}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-white/60 text-xs font-bold border border-white">
                    {activity.tag}
                  </span>

                  {activity.linkUrl && (
                    <a
                      href={activity.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-2 text-sm font-bold text-primary"
                    >
                      <span className="border-b border-primary/30 group-hover/btn:border-primary transition-all">
                        Check Detail
                      </span>
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Decorative Blur */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-white/30 transition-colors" />
            </div>
          ))}

          {/* Spacer to Ensure Full Scroll Visibility */}
          <div className="w-[10vw]" />

        </motion.div>
      </div>
    </section>
  );
}
