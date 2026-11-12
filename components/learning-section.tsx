"use client";

import { useEffect, useState } from "react";
import { ArrowRight, RefreshCcw } from "lucide-react";

const learningSteps = [
  {
    phase: "HYPOTHESIS",
    title: "課題の発見・検証",
    tags: ["ユーザーヒアリング", "仮説設定"],
  },
  {
    phase: "BUILD MVP",
    title: "MVPの開発",
    tags: ["最小限の機能", "短い開発サイクル"],
  },
  {
    phase: "VALIDATE",
    title: "ユーザー検証",
    tags: ["ユーザー獲得", "利用状況の確認"],
  },
  {
    phase: "ITERATE",
    title: "フィードバックと改善",
    tags: ["振り返り・優先順位づけ", "継続改善"],
  },
];

export function LearningSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActiveStep((prev) => (prev + 1) % learningSteps.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      id="learning"
      data-scene-stop="learning"
      className="learning-section"
      aria-labelledby="learning-heading"
    >
      <div className="page-width">
        <div className="learning-heading">
          <div>
            <p className="eyebrow">ここで学べること</p>
            <h2 id="learning-heading">
              サービスづくりで、
              <br />
              実務に近い経験を。
            </h2>
          </div>
        </div>

        <ol
          className="learning-steps"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {learningSteps.map((step, index) => {
            const isActive = activeStep === index;
            const isLast = index === learningSteps.length - 1;
            return (
              <li
                key={step.title}
                data-active={isActive}
                onPointerEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
              >
                <div className="learning-step-top">
                  <div className="learning-step-meta">
                    <span className="learning-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="learning-phase" aria-hidden="true">
                      {step.phase}
                    </span>
                  </div>
                  {isLast ? (
                    <span className="learning-loop-badge" aria-hidden="true">
                      <RefreshCcw size={14} strokeWidth={2} />
                      01
                    </span>
                  ) : (
                    <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
                  )}
                </div>
                <h3>{step.title}</h3>
                <div className="learning-tags" aria-label="キーワード">
                  {step.tags.map((tag) => (
                    <span key={tag} className="learning-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="learning-cycle">
          <span className="learning-cycle-pill">
            <RefreshCcw size={14} aria-hidden="true" />
            DEVELOPMENT CYCLE
          </span>
          <p>仮説検証から改善まで、この4ステップを繰り返し回す。</p>
        </div>
      </div>
    </section>
  );
}
