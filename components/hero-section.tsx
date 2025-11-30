"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, Sparkles, X } from "lucide-react";

const highlights = [
  { title: "週1活動", description: "全く雰囲気は硬くないので安心を" },
  {
    title: "初学者OK",
    description: "立ち上げメンバーも入学前まで何も知らなかった",
  },
  { title: "企業情報交流会", description: "どんなWeb企業があるか" },
];

const foundingRoles = [
  "Sky株式会社 長期インターン生",
  "株式会社Optim 開発アルバイト生",
  "株式会社Digeon 長期インターン生",
];

export function HeroSection() {
  const [showWebExplain, setShowWebExplain] = useState(false);

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden px-6 pb-24 pt-32 sm:pt-36"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl sm:h-56 sm:w-56 lg:h-64 lg:w-64" />
        <div className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/40 blur-3xl sm:h-64 sm:w-64 lg:h-72 lg:w-72" />
      </div>

      <div className="mx-auto w-full max-w-6xl text-center">
        <div className="mb-8 hidden flex-wrap items-center gap-3 rounded-full bg-white/95 px-4 py-2 text-base font-medium text-primary shadow-lg sm:inline-flex sm:flex-nowrap sm:gap-4 sm:px-6">
          <Sparkles className="h-5 w-5" />
          Web技術好きと初学者歓迎!! /
          立ち上げメンバーは堅物じゃないですという雰囲気
          <button
            type="button"
            onClick={() => setShowWebExplain(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full  px-3 py-1 text-sm text-primary transition hover:bg-primary/20 sm:w-auto sm:px-4"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Web企業って？</span>
          </button>
        </div>

        {showWebExplain && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setShowWebExplain(false)}
            />
            <div className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-white p-6 text-left text-sm text-muted-foreground shadow-2xl">
              <div className="mb-4 flex items-center justify-between text-base font-semibold text-card-foreground">
                Web系企業って？
                <button
                  type="button"
                  className="rounded-full bg-primary/10 p-1 text-primary hover:bg-primary/20"
                  onClick={() => setShowWebExplain(false)}
                  aria-label="閉じる"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p>
                ECサイト、動画配信、求人プラットフォームなどのWebサービスやSaaSを開発・運営する企業全般。
                エンジニア、デザイナー、PdMがオンラインで価値を届ける会社をイメージしてください。
              </p>
              <p className="mt-4 text-xs font-semibold text-primary">
                たとえばこんな企業
              </p>
              <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                <li>
                  <span className="font-semibold text-card-foreground">
                    LINEヤフー
                  </span>
                  ：メッセージングやニュース、検索など日常インフラをオンラインで提供
                </li>
                <li>
                  <span className="font-semibold text-card-foreground">
                    サイバーエージェント
                  </span>
                  ：ABEMAや人気ゲームなど動画・エンタメサービスを運営
                </li>
                <li>
                  <span className="font-semibold text-card-foreground">
                    ZOZO
                  </span>
                  ：「ZOZOTOWN」でファッションECを展開し、AI採寸なども実施
                </li>
                <li>
                  <span className="font-semibold text-card-foreground">
                    DMM.com
                  </span>
                  ：動画配信、オンライン英会話、3Dプリントなど複数のWeb事業を提供
                </li>
              </ul>
            </div>
          </>
        )}
        <h1 className="mx-auto max-w-3xl text-balance text-center text-3xl font-black leading-snug text-foreground sm:text-5xl sm:leading-tight md:text-6xl">
          <span className="block text-[1.9rem] leading-snug sm:text-inherit">
            Web系企業の就活みんなで乗り切る
          </span>
          <span className="mt-3 block text-2xl font-semibold uppercase tracking-wide text-primary/80 sm:text-3xl">
            webコミュニティ
          </span>
          <span className="mt-1 inline-block bg-gradient-to-r from-primary via-pink-500 to-accent bg-clip-text text-transparent drop-shadow-sm">
            「We部」
          </span>
          <span className="mt-3 block text-base font-medium text-muted-foreground">
            〜立ち上げメンバーがwebしかわからないので〜
          </span>
        </h1>
        <div className="mx-auto mt-6 flex w-full flex-col gap-4 text-left lg:flex-row lg:items-start lg:gap-8">
          <details className="flex-1 rounded-2xl border border-primary/20 bg-white/80 p-5 text-left shadow-sm [&_[data-content]]:mt-3">
            <summary className="cursor-pointer text-lg font-semibold text-primary focus:outline-none">
              なぜWe部を？
            </summary>
            <div data-content>
              <p className="text-base leading-relaxed text-muted-foreground">
                Web就活は「情報量」と「実務力」がカギ。だからこそ、立ち上げメンバー全員が実務開発を学生のうちから経験しています。
                <br />
                就活のコツは神戸電子の後輩にぜんぶ共有したい
                <br />
                ——そんな思いでWe部が生まれました。
                <br />
                Web系企業の就活を目指す学生同士で武器を作り情報を共有し、
                優良企業合格者を増やしたい。
              </p>
            </div>
          </details>
          <div className="flex-1 rounded-2xl border border-primary/15 bg-primary/5 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              立ち上げメンバーの長期開発参加企業
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {foundingRoles.map((role) => (
                <li
                  key={role}
                  className="rounded-xl bg-white/80 px-3 py-2 font-medium text-card-foreground"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 rounded-2xl border border-accent/40 bg-accent/10 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground">
              メンバーの内定先
            </p>
            <div className="mt-3 rounded-xl bg-white/90 px-4 py-3">
              <p className="text-md font-semibold text-card-foreground">
                合同会社DMM.com
              </p>
              {/* <p className="text-md font-semibold text-card-foreground">
                株式会社Digeon
              </p> */}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
          >
            <a href="#contact">
              話を聞きたい！
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/40 bg-white/80 text-primary hover:bg-primary/10"
          >
            <a href="#activity">活動内容を見る</a>
          </Button>
        </div>
        <div className="mt-14 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/70 bg-white/80 p-5 text-left shadow-sm"
            >
              <p className="text-sm font-semibold text-primary">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
