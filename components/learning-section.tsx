import { ArrowRight, RefreshCcw } from "lucide-react";

const learningSteps = [
  {
    title: "課題の発見・検証",
    skill: "ユーザーヒアリング・課題設定",
    description: "対象となるユーザーに話を聞き、現場の困りごとを探します。誰のどの課題を解決するのか、仮説を立てて確かめます。",
  },
  {
    title: "MVPの開発",
    skill: "最小限の機能・短い開発サイクル",
    description: "検証に必要な最小限の機能（MVP）に絞り、短期間で設計・実装します。早い段階でユーザーに試してもらえる状態を目指します。",
  },
  {
    title: "ユーザー検証",
    skill: "ユーザー獲得・利用状況の確認",
    description: "使ってくれるユーザーを集め、実際の場面で利用してもらいます。利用状況やヒアリングから、想定した課題を解決できているか確かめます。",
  },
  {
    title: "フィードバックと改善",
    skill: "振り返り・優先順位づけ・継続改善",
    description: "利用者のフィードバックを整理し、改善の優先順位を決めます。修正した機能を再び使ってもらい、検証と改善のサイクルを回します。",
  },
];

export function LearningSection() {
  return (
    <section id="learning" data-scene-stop="learning" className="learning-section" aria-labelledby="learning-heading">
      <div className="page-width">
        <div className="learning-heading">
          <div>
            <p className="eyebrow">ここで学べること</p>
            <h2 id="learning-heading">サービスづくりで、<br />実務に近い経験を。</h2>
          </div>
        </div>
        <ol className="learning-steps">
          {learningSteps.map((step, index) => (
            <li key={step.title}>
              <div className="learning-step-top">
                <span className="learning-number" aria-hidden="true">0{index + 1}</span>
                {index < learningSteps.length - 1 && <ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" />}
              </div>
              <h3>{step.title}</h3>
              <p className="learning-skill">{step.skill}</p>
              <p className="learning-description">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="learning-cycle"><RefreshCcw size={16} aria-hidden="true" />検証結果をもとに課題を見直し、開発と改善を繰り返す。</p>
        <div className="learning-outcome">
          <h3>自分の言葉で、<br />語れる経験に。</h3>
          <p>どんな課題に向き合い、どう工夫し、使う人の反応から何を変えたか。その過程を振り返ることで、自分の役割や学びが見えてきます。ポートフォリオや就活の「学生時代に力を入れたこと」でも、具体的に伝えられる経験になります。</p>
        </div>
      </div>
    </section>
  );
}
