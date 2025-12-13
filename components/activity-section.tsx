"use client";

import { ExternalLink, Calendar, Trophy, Users, Rocket } from "lucide-react";

const activities = [
  {
    id: "01",
    title: "チーム開発",
    subtitle: "Practical Development",
    description: "1年間を通して実際にサービスをリリース。企画から設計、開発、運用までここで体験しよう!",
    detail: "技術選定や開発の進め方などはどんどん先輩や強強エンジニアに聞いていこう！！",
    tag: "週1 / オフライン",
    icon: <Rocket className="h-10 w-10 md:h-12 md:w-12 text-orange-500" />,
    gradient: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/30",
    accent: "bg-orange-500",
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
    icon: <Trophy className="h-10 w-10 md:h-12 md:w-12 text-yellow-500" />,
    gradient: "from-yellow-500/20 to-yellow-600/5",
    border: "border-yellow-500/30",
    accent: "bg-yellow-500",
  },
  {
    id: "03",
    title: "情報共有ラフ会",
    subtitle: "Knowledge Share",
    description: "就活の情報や企業研究、技術トークや面接対策などをメンバー同士で共有します。",
    detail: "有料企業や大手の情報はなかなか学校では手に入りません！",
    tag: "月1 / ハイブリッド",
    icon: <Users className="h-10 w-10 md:h-12 md:w-12 text-blue-500" />,
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    accent: "bg-blue-500",
  },
  {
    id: "04",
    title: "OBOGコミュニティ",
    subtitle: "Alumni Network",
    description: "卒業後もつながり続け、インターンや企業情報を後輩に還元できる仕組みを整備予定。",
    detail: "Coming Soon...",
    tag: "Coming Soon",
    icon: <Calendar className="h-10 w-10 md:h-12 md:w-12 text-gray-500" />,
    gradient: "from-gray-500/20 to-gray-600/5",
    border: "border-gray-500/30",
    accent: "bg-gray-500",
  },
];

export function ActivitySection() {
  return (
    <section id="activity" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Title */}
      <div className="absolute top-12 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="block text-[20vw] font-black leading-none text-foreground/[0.02] tracking-tighter text-center">
          ACTIVITIES
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="h-1 w-16 bg-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 leading-tight">
            活動内容
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground/60 font-medium tracking-wider uppercase">
            Program
          </p>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            週に一度の定例会をはじめ、ハッカソンや就活対策など多角的に成長をサポートします。
          </p>
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`group relative overflow-hidden rounded-3xl border ${activity.border} bg-gradient-to-br ${activity.gradient} backdrop-blur-xl p-8 md:p-10 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-white/80 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    {activity.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground/60">
                      {activity.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-4xl font-black text-foreground/10 font-mono">
                  {activity.id}
                </span>
              </div>

              {/* Description */}
              <p className="text-base text-foreground/80 leading-relaxed mb-6 flex-grow">
                {activity.description}
              </p>

              {/* Detail Quote */}
              <div className={`pl-4 border-l-2 ${activity.accent}/30 py-2 mb-6`}>
                <p className="text-sm text-muted-foreground italic">
                  {activity.detail}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-white/70 text-xs font-bold border border-white/50 shadow-sm">
                  {activity.tag}
                </span>

                {activity.linkUrl && (
                  <a
                    href={activity.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                  >
                    <span>Check Detail</span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </a>
                )}
              </div>

              {/* Decorative Blur */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-white/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
