"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ExternalLink,
  Trophy,
  Users,
  Rocket,
  Briefcase,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useRef, MouseEvent } from "react";

const activities = [
  {
    id: "01",
    title: "チーム開発",
    subtitle: "Practical Development",
    description:
      "約2ヶ月の開発サイクルで企画からリリースまでを実践。\n設計・開発・運用まで一連の流れをここで体験しよう!",
    detail:
      "技術選定や開発の進め方は、\n先輩や強強エンジニアにどんどん聞いていこう！！",
    tag: "週1 / OPTiM Club KOBE",
    icon: <Rocket className="h-10 w-10 md:h-12 md:w-12 text-orange-500" />,
    gradient: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/30",
    accent: "bg-orange-500",
  },
  {
    id: "02",
    title: "ハッカソン出場",
    subtitle: "Hackathon Challenge",
    description:
      "チームで外部のハッカソンに参加し、実践的な開発経験を積みます。",
    detail:
      "外部ハッカソンで受賞すれば就職活動の実績として超強力な武器になります。",
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
    description:
      "就活情報や企業研究、技術トーク、面接対策まで\nメンバー同士で実体験ベースに共有します。",
    detail: "有料企業や大手の情報は、\n学校だけではなかなか手に入りません！",
    tag: "月1 / ハイブリッド",
    icon: <Users className="h-10 w-10 md:h-12 md:w-12 text-blue-500" />,
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    accent: "bg-blue-500",
  },
  {
    id: "04",
    title: "先輩の就活知見",
    subtitle: "Career Knowledge Base",
    description:
      "先輩がどんな企業に内定をもらい、\nどんなスキルやガクチカを活かしたのかを生の声を集めています。",
    detail:
      "就活でやるべきことを先輩の実例から学び、\n次の一歩を具体化できます。",
    tag: "随時更新 / OBOG体験記",
    linkLabel: "先輩の就活知見を読む",
    linkUrl: "https://webu-portal-web.vercel.app/",
    icon: <Briefcase className="h-10 w-10 md:h-12 md:w-12 text-emerald-600" />,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
    accent: "bg-emerald-500",
  },
];

const resources = [
  {
    id: "kb",
    title: "ナレッジベース",
    subtitle: "Knowledge Base",
    description:
      "We部をより詳しく知りたい方向けに、\n活動内容やスケジュールを確認できます。",
    linkLabel: "ナレッジベースを見る",
    url: "https://webu-kobedenshi.github.io/web-community-vault/We%E9%83%A8%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/",
    icon: <BookOpen className="h-8 w-8 md:h-9 md:w-9 text-emerald-600" />,
    border: "border-emerald-500/30",
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    id: "ai",
    title: "コミュニティ専用AI",
    subtitle: "Community AI",
    description:
      "コミュニティ専属AIです。\n「参加費はかかるの？」など細かな疑問も気軽に聞けます。",
    linkLabel: "専用AIに相談する",
    url: "https://notebooklm.google.com/notebook/54975bed-ea17-4aae-a9d3-18515bf650c2",
    icon: <Sparkles className="h-8 w-8 md:h-9 md:w-9 text-cyan-600" />,
    border: "border-cyan-500/30",
    gradient: "from-cyan-500/20 to-cyan-600/5",
  },
];

function OptimSpecialCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-20 md:mt-48 relative"
    >
      {/* Connection Line */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 100, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-1/2 -top-24 w-[1px] bg-gradient-to-b from-transparent via-[#004481] to-[#004481] -translate-x-1/2 z-0"
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative group rounded-[2.5rem] md:rounded-[3rem] border border-[#004481]/20 bg-gradient-to-br from-white/80 via-white/50 to-white/30 backdrop-blur-2xl p-1 overflow-hidden shadow-2xl shadow-[#004481]/10"
      >
        {/* Mouse Follow Gradient */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(0, 68, 129, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative rounded-[calc(2.5rem-4px)] md:rounded-[calc(3rem-4px)] bg-white/40 p-6 md:p-14 overflow-hidden">
          {/* Animated Background Mesh */}
          <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#004481]/5 rounded-full blur-[80px] md:blur-[100px] mix-blend-multiply animate-blob" />
          <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-400/5 rounded-full blur-[80px] md:blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />

          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            {/* Left: Brand Identity */}
            <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start relative">
              <div className="relative group/logo cursor-default">
                <div className="absolute -inset-8 bg-gradient-to-r from-[#004481]/20 to-blue-500/20 rounded-full blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />

                {/* Accurate Logo Construction */}
                <div className="relative bg-white px-8 py-6 md:px-12 md:py-8 rounded-2xl shadow-xl shadow-[#004481]/5 border border-[#004481]/10 flex items-center justify-center transform transition-transform group-hover/logo:scale-105 duration-500">
                  <span className="text-4xl md:text-6xl font-black text-[#004481] tracking-tighter flex items-center gap-1">
                    OPTiM
                  </span>
                  <span className="absolute top-6 right-6 md:top-8.5 md:right-8 text-sm md:text-[20px] font-bold text-[#004481] opacity-60">
                    ®
                  </span>
                </div>
              </div>

              <div className="mt-6 md:mt-8 flex flex-col items-center lg:items-start space-y-3"></div>
            </div>

            {/* Right: Vision & Message */}
            <div className="w-full lg:w-2/3 text-center lg:text-left space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  <span className="block text-xl md:text-3xl text-slate-500 font-bold mb-1 md:mb-2 tracking-normal">
                    Mission
                  </span>
                  ネットを
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004481] to-blue-600">
                    空気に変える
                  </span>
                </h3>
                <p className="text-base md:text-xl font-medium text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  We部の活動拠点は、東証プライム上場企業
                  <span className="text-[#004481] font-bold">
                    株式会社オプティム
                  </span>
                  様より、 未来のエンジニアへの投資として
                  <span className="underline decoration-[#004481]/30 decoration-4 underline-offset-4">
                    無償提供
                  </span>
                  いただいています。
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                <a
                  href="https://www.optim.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative overflow-hidden w-full md:w-auto px-12 py-4 rounded-xl bg-[#004481] text-white font-bold text-sm shadow-xl shadow-[#004481]/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#004481]/30 text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#004481] to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    Official Site
                    <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ActivitySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="activity"
      ref={containerRef}
      className="relative py-16 md:py-32 bg-slate-50 overflow-hidden"
    >
      {/* Background Title */}
      <motion.div
        style={{ y }}
        className="absolute top-12 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-50"
      >
        <span className="block text-[20vw] font-black leading-none text-foreground/[0.03] tracking-tighter text-center">
          ACTIVITIES
        </span>
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-24"
        >
          <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-4 md:mb-6 rounded-full" />
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
            活動内容
          </h2>
          <p className="text-base md:text-2xl text-slate-400 font-medium tracking-wider uppercase">
            Our Program
          </p>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            週に一度の定例会をはじめ、ハッカソンや就活対策など
            <br className="hidden md:block" />
            エンジニアとして自走するための環境を本気で用意しています。
          </p>
        </motion.div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 max-w-5xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-[2rem] border-2 bg-white ${activity.border} p-6 md:p-10 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white`}
            >
              {/* Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Card Header */}
              <div className="relative z-10 flex items-start justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-4 md:gap-5">
                  <div
                    className={`p-3 md:p-4 rounded-2xl bg-slate-50 shadow-inner group-hover:scale-110 transition-transform duration-300`}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400 mt-1">
                      {activity.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-4xl md:text-5xl font-black text-slate-100 font-mono tracking-tighter">
                  {activity.id}
                </span>
              </div>

              {/* Description */}
              <p className="relative z-10 text-sm md:text-base text-slate-600 leading-relaxed mb-6 md:mb-8 flex-grow font-medium md:whitespace-pre-line">
                {activity.description}
              </p>

              {/* Detail Quote */}
              <div
                className={`relative z-10 pl-4 border-l-4 ${activity.border} py-1 mb-6 md:mb-8`}
              >
                <p className="text-xs md:text-sm text-slate-500 italic md:whitespace-pre-line">
                  {activity.detail}
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-center justify-between mt-auto">
                <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-slate-100 text-[10px] md:text-xs font-bold text-slate-600 border border-slate-200">
                  {activity.tag}
                </span>

                {activity.linkUrl && (
                  <a
                    href={activity.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activity.title}を新しいタブで開く`}
                    className="group/btn flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    <span className="underline decoration-2 underline-offset-4">
                      {activity.linkLabel ?? "Check Detail"}
                    </span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resource Links */}
        <div className="max-w-5xl mx-auto mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-10"
          >
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">
              Resources
            </p>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
              コミュニティをもっと知りたい
            </h3>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
              活動をもっと深く知っていただくために、ナレッジベースと専属AIを用意しています。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {resources.map((resource, index) => (
              <motion.article
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={`group relative overflow-hidden rounded-[1.8rem] border-2 bg-white ${resource.border} p-6 md:p-7 shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${resource.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                      {resource.subtitle}
                    </p>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                      {resource.title}
                    </h4>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 shadow-inner">
                    {resource.icon}
                  </div>
                </div>

                <p className="relative z-10 mt-4 text-sm md:text-base text-slate-600 leading-relaxed min-h-[4.2rem] md:min-h-[5rem] md:whitespace-pre-line">
                  {resource.description}
                </p>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${resource.title}を新しいタブで開く`}
                  className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm md:text-base font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span className="underline decoration-2 underline-offset-4">
                    {resource.linkLabel}
                  </span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>

        {/* OPTiM Special Section */}
        <OptimSpecialCard />
      </div>
    </section>
  );
}
