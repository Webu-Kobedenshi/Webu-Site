"use client";

import { useRef, useState } from "react";
import { ArrowDownRight, BookOpen, Building2, Users } from "lucide-react";

// All records are fictional and bundled locally; this demo never connects to the service.
const screens = [
  {
    id: "experiences", label: "選考体験", icon: BookOpen,
    title: "先輩の経験から、一歩先へ。",
    description: "気になる体験を選んで、準備のヒントを見つけよう。",
    records: [
      {
        title: "作品の工夫を、自分の言葉で。", subtitle: "サンプルIT株式会社 / Webエンジニア", tag: "面接の準備",
        heading: "つくった理由まで、伝えてみる。",
        text: "制作したアプリについて、使う人の困りごと、工夫したこと、改善したいことを順番に整理しました。画面を見せながら話す練習が、自分の考えをまとめるきっかけになりました。",
        notes: ["準備したもの：ポートフォリオ、作品のデモ", "振り返り：技術を選んだ理由も説明できるように"],
      },
      {
        title: "チームでつくった経験を振り返る。", subtitle: "デモデザイン株式会社 / フロントエンド", tag: "チーム開発",
        heading: "自分の役割と、仲間との工夫を。",
        text: "チーム制作で担当した画面や、相談しながら解決した課題をまとめました。完成したものだけでなく、意見が分かれたときにどう進めたかも、具体的に話せるようにしました。",
        notes: ["準備したもの：担当した機能、開発の記録", "振り返り：成果と学びを分けて整理する"],
      },
    ],
  },
  {
    id: "companies", label: "企業情報", icon: Building2,
    title: "気になる企業を、知る。",
    description: "事業や職種の情報と、先輩の経験をひとつの場所に。",
    records: [
      {
        title: "サンプルIT株式会社", subtitle: "Webサービス / 自社開発", tag: "企業情報の例",
        heading: "サービスを育てる仕事。",
        text: "日々の困りごとを解決するWebサービスをつくる、架空の企業です。事業内容や開発の仕事を整理し、企業研究の入り口にする画面をイメージしています。",
        notes: ["事業の例：業務を支えるWebサービス", "職種の例：Webエンジニア、UIデザイナー"],
      },
      {
        title: "デモデザイン株式会社", subtitle: "Web制作 / デザイン", tag: "企業情報の例",
        heading: "使いやすさを、かたちにする仕事。",
        text: "Webサイトの企画・デザイン・実装を行う、架空の企業です。気になる会社の特徴をまとめて、働くイメージを少しずつ具体的にしていきます。",
        notes: ["事業の例：Webサイトやアプリの制作", "職種の例：フロントエンド、Webデザイナー"],
      },
    ],
  },
  {
    id: "mentors", label: "先輩を探す", icon: Users,
    title: "少し先を歩く、先輩を見つける。",
    description: "興味のある分野や、聞いてみたいことからつながろう。",
    records: [
      {
        title: "先輩A", subtitle: "Webアプリ開発 / 架空のプロフィール", tag: "制作の相談",
        heading: "最初のサービスづくりを相談。",
        text: "Webアプリの制作を経験した、架空の先輩です。機能の絞り方や、使ってもらうまでの進め方など、相談できるテーマを紹介する画面をイメージしています。",
        notes: ["相談テーマの例：アイデアの整理、チーム開発", "相談テーマの例：ポートフォリオのまとめ方"],
      },
      {
        title: "先輩B", subtitle: "UIデザイン / 架空のプロフィール", tag: "デザインの相談",
        heading: "伝わる画面づくりを相談。",
        text: "UIデザインを学んだ、架空の先輩です。見た目の工夫だけでなく、使う人に合わせた情報の整理や、画面の流れについて話せることを紹介しています。",
        notes: ["相談テーマの例：画面設計、使いやすさ", "相談テーマの例：作品の見せ方、デザインレビュー"],
      },
    ],
  },
];

export function KnowledgeDemo() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [recordIndex, setRecordIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const screen = screens[screenIndex];
  const record = screen.records[recordIndex];

  const selectScreen = (index: number) => {
    setScreenIndex(index);
    setRecordIndex(0);
  };

  return (
    <div className="knowledge-demo" aria-label="We部ナレッジベースの紹介用デモ">
      <div className="demo-brandbar">
        <span className="demo-brand">Webu<span>.</span><small>CAREER KNOWLEDGE</small></span>
        <span className="demo-badge">架空データのデモ</span>
      </div>
      <div className="demo-tabs" role="tablist" aria-label="デモ画面の切り替え">
        {screens.map(({ id, label, icon: Icon }, index) => (
          <button
            key={id}
            ref={(element) => { tabRefs.current[index] = element; }}
            type="button"
            role="tab"
            id={`demo-tab-${id}`}
            aria-selected={screenIndex === index}
            aria-controls="demo-panel"
            tabIndex={screenIndex === index ? 0 : -1}
            onClick={() => selectScreen(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % screens.length;
              else if (event.key === "ArrowLeft") next = (index - 1 + screens.length) % screens.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = screens.length - 1;
              else return;
              event.preventDefault();
              selectScreen(next);
              tabRefs.current[next]?.focus();
            }}
          ><Icon size={16} aria-hidden="true" />{label}</button>
        ))}
      </div>
      <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${screen.id}`} tabIndex={0} className="demo-content">
        <h3>{screen.title}</h3>
        <p className="demo-intro">{screen.description}</p>
        <div className="demo-records">
          <div className="demo-record-list" aria-label={`${screen.label}のサンプル一覧`}>
            {screen.records.map((item, index) => (
              <button key={item.title} type="button" className="demo-record" aria-pressed={recordIndex === index} aria-controls="demo-detail" onClick={() => {
                setRecordIndex(index);
                detailRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
              }}>
                <span className="demo-tag">{item.tag}</span>
                <strong>{item.title}</strong>
                <span className="demo-record-meta">{item.subtitle}</span>
                <span className="demo-record-action">内容を見る<ArrowDownRight size={15} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
          <div id="demo-detail" ref={detailRef} className="demo-detail" aria-live="polite" aria-atomic="true">
            <p className="demo-detail-label">{screen.label} / サンプル</p>
            <h4>{record.heading}</h4>
            <p>{record.text}</p>
            <ul>{record.notes.map((note) => <li key={note}>{note}</li>)}</ul>
          </div>
        </div>
      </div>
      <p className="demo-footnote">このデモでは画面の切り替え・閲覧のみ体験できます。ログインや相談の送信は行いません。</p>
    </div>
  );
}
