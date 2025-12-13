"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, Sparkles, X, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useVelocity, useAnimationFrame } from "framer-motion";
import { fadeInUp, staggerContainer, reveal, scaleIn } from "@/lib/animations";

// Utility for wrapping numbers
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const highlights = [
  {
    title: "優良企業に就職したい",
    description: "実務経験を持っていると就活かなり強いです!",
    icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
  },
  {
    title: "実務経験を積みたい",
    description: "ちなみにアルバイトなので給料も出ます!",
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  },
  {
    title: "学生同士で情報共有がしたい",
    description: "内定者も在籍しているので聞いちゃいましょう!",
    icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
  },
];

const foundingRoles = [
  "Sky株式会社 長期インターン生",
  "株式会社Optim 開発アルバイト生",
  "株式会社Digeon 長期インターン生",
];

// Velocity Text Component
function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) {
  const baseX = useSpring(0, { stiffness: 100, damping: 30 }); // Smooth motion
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-black uppercase text-[12vw] leading-[0.85] tracking-tighter text-foreground/5 flex flex-nowrap" style={{ x }}>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const [showWebExplain, setShowWebExplain] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[100vh] overflow-hidden pt-32 pb-20 flex flex-col items-center"
    >
      {/* Kinetic Background Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10 pointer-events-none select-none mix-blend-multiply opacity-50">
        <ParallaxText baseVelocity={-2}>WE部 COMMUNITY WEB</ParallaxText>
        <ParallaxText baseVelocity={2}>GROWTH CONNECT BUILD</ParallaxText>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-primary/20 blur-[100px] mix-blend-multiply animate-pulse" />
        <div className="absolute right-1/4 bottom-10 h-64 w-64 rounded-full bg-accent/30 blur-[100px] mix-blend-multiply animate-pulse delay-1000" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl px-6 text-center relative z-10 flex flex-col items-center justify-center min-h-[60vh]"
      >
        <motion.div variants={fadeInUp} className="flex justify-center mb-8">
          {/* Badge code identical to before */}
          <div className="group relative inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/50 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-lg hover:border-primary/40 cursor-default">
            <Sparkles className="h-4 w-4 animate-spin-slow" />
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Web技術好きと初学者歓迎!!
            </span>
            <span className="hidden sm:inline text-muted-foreground/50 mx-1">|</span>
            <span className="hidden sm:inline text-muted-foreground">立ち上げメンバーは堅物じゃないです</span>

            <button
              onClick={() => setShowWebExplain(true)}
              className="ml-2 flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              <HelpCircle className="h-3 w-3" />
              <span>Web企業って？</span>
            </button>
          </div>
        </motion.div>

        {/* Modal Logic (Preserved) */}
        <AnimatePresence>
          {showWebExplain && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowWebExplain(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                exit={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
                className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,36rem)] rounded-3xl border border-white/20 bg-white/90 p-8 text-left shadow-2xl backdrop-blur-xl ring-1 ring-black/5"
              >
                {/* Modal Content - Preserved */}
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Web系企業って？</h3>
                  <button
                    onClick={() => setShowWebExplain(false)}
                    className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    ECサイト、動画配信、求人プラットフォームなどのWebサービスやSaaSを開発・運営する企業全般。
                    エンジニア、デザイナー、PdMがオンラインで価値を届ける会社をイメージしてください。
                  </p>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-primary">たとえばこんな企業</p>
                    <ul className="space-y-2 text-sm">
                      {[
                        { name: "LINEヤフー", desc: "日常インフラをオンラインで提供" },
                        { name: "サイバーエージェント", desc: "ABEMAや人気ゲームなどを運営" },
                        { name: "ZOZO", desc: "「ZOZOTOWN」等ファッションECを展開" },
                        { name: "DMM.com", desc: "動画配信、英会話、3Dプリントなど多角展開" }
                      ].map((company) => (
                        <li key={company.name} className="flex items-start gap-2">
                          <span className="block h-1.5 w-1.5 translate-y-2 rounded-full bg-primary/50" />
                          <span>
                            <span className="font-semibold text-foreground">{company.name}</span>
                            <span className="text-muted-foreground/80">：{company.desc}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mx-auto max-w-5xl relative">
          <motion.h1 className="text-balance text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter text-foreground">
            <span className="block overflow-hidden pb-4">
              <motion.span variants={reveal} className="block">
                Web系企業の就活
              </motion.span>
            </span>
            <span className="block overflow-hidden text-muted-foreground/40 pb-4">
              <motion.span variants={reveal} transition={{ delay: 0.1 }} className="block">
                みんなで乗り切る
              </motion.span>
            </span>
            <span className="mt-2 block overflow-hidden pb-4">
              <motion.span
                variants={reveal}
                transition={{ delay: 0.2 }}
                className="inline-block bg-gradient-to-r from-primary via-orange-400 to-accent-foreground bg-clip-text text-transparent"
              >
                「We部」
              </motion.span>
            </span>
          </motion.h1>
        </div>

        <motion.p variants={fadeInUp} className="mx-auto mt-12 max-w-2xl text-lg sm:text-xl font-medium text-muted-foreground leading-relaxed">
          Web就活は「情報量」と「実務力」がカギ。<br className="hidden sm:block" />
          立ち上げメンバー全員が実務開発経験者だからこそできる、<br className="hidden sm:block" />
          <span className="text-foreground font-bold">本気の就活対策</span>と<span className="text-foreground font-bold">技術共有</span>。
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-10 py-7 text-xl font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
          >
            <a href="#contact">
              説明会申し込み
              <ArrowRight className="ml-2 h-6 w-6" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="group rounded-full px-8 py-7 text-xl font-medium text-foreground transition-all hover:bg-white/50"
          >
            <a href="#activity">
              活動内容を見る
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Bento Grid - moved down slightly */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-32 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 max-w-6xl mx-auto px-4 w-full relative z-10"
      >
        {/* Why We部? - Large Card */}
        <motion.div variants={scaleIn} className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/40 p-10 text-left shadow-sm backdrop-blur-md transition-all hover:bg-white/60 hover:shadow-lg group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
            <HelpCircle className="h-48 w-48 text-primary" />
          </div>
          <h3 className="relative z-10 text-3xl font-bold text-foreground mb-6">なぜWe部を？</h3>
          <p className="relative z-10 text-lg leading-loose text-muted-foreground">
            就活のコツは神戸電子の後輩にぜんぶ共有したい——そんな思いでWe部が生まれました。<br /><br />
            <span className="font-bold text-foreground bg-primary/10 px-1 py-0.5 rounded">「Web系企業の就活を目指す学生同士で武器を作り情報を共有」</span>し、
            優良企業合格者を増やしたい。そのために私たちが経験した全てを還元します。
          </p>
          <div className="mt-8 flex gap-3 flex-wrap relative z-10">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-foreground shadow-sm border border-primary/5 hover:scale-105 transition-transform">
                {item.icon}
                {item.title}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Founding Members - Medium Card */}
        <motion.div variants={scaleIn} className="md:col-span-1 md:row-span-1 rounded-[2.5rem] border border-white/40 bg-gradient-to-br from-primary/5 to-primary/10 p-8 shadow-sm backdrop-blur-md group hover:shadow-lg transition-all">
          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            立ち上げメンバーの実務先
          </h4>
          <div className="space-y-3">
            {foundingRoles.map((role, i) => (
              <div key={i} className="text-sm font-bold text-foreground/80 bg-white/50 rounded-xl px-4 py-3 border border-white/40 group-hover:bg-white/80 transition-colors">
                {role}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Offer - Medium Card */}
        <motion.div variants={scaleIn} className="md:col-span-1 md:row-span-1 rounded-[2.5rem] border border-white/40 bg-gradient-to-br from-accent/10 to-accent/20 p-8 shadow-sm backdrop-blur-md hover:shadow-lg transition-all">
          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent-foreground mb-4">
            <CheckCircle2 className="h-4 w-4" />
            メンバーの内定先
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-4 rounded-2xl bg-white/60 p-3 shadow-sm border border-white/60">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#2C2C2C] text-white font-bold text-[8px] shrink-0">
                DMM
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">合同会社DMM.com</p>
                <p className="text-[10px] text-muted-foreground">Webフロント</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/60 p-3 shadow-sm border border-white/60">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#E60012] text-white font-bold text-[7px] shrink-0">
                ぐるなび
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">株式会社ぐるなび</p>
                <p className="text-[10px] text-muted-foreground">Webバックエンド</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
