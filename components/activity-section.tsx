import { ExternalLink } from "lucide-react";

const activities = [
  {
    title: "チーム開発(デプロイ)",
    description:
      "1年間を通して実際にサービスをリリース。企画から設計、開発、運用までここで体験しよう!",
    detail:
      "技術選定や開発の進め方などはどんどん先輩や強強エンジニアに聞いていこう！！",
    tag: "週1 / オフライン",
  },
  {
    title: "外部のハッカソン出場 (任意参加)",
    description:
      "チームで外部のハッカソンに参加し、実践的な開発経験を積みます。",
    detail:
      "外部ハッカソンで受賞すれば就職活動の実績として超強力な武器になります。",
    tag: "年に1度 / 任意",
    linkLabel: "(例) 技育展 2025 (サポーターズ主催)",
    linkUrl: "https://geek.supporterz.jp/geekten/2025",
  },
  {
    title: "就活は情報戦！？情報共有ラフ会",
    description:
      "就活の最新情報や企業研究、面接対策などをメンバー同士で共有します。",
    detail: "有料企業や大手の情報はなかなか学校では手に入りません！",
    tag: "月1 / ハイブリッド",
  },
  {
    title: "OBOGコミュニティ (準備中)",
    description:
      "卒業後もつながり続け、インターンや企業情報を後輩に還元できる仕組みを整備予定。",
    detail:
      "将来的にはこのコミュニティでOBOGが活躍できるよう、ナレッジ共有の仕組みを整えています。",
    tag: "Coming Soon",
  },
];

const steps = [
  "このコミュニティ気になるなあ〜",
  "まずは話聞くぜ！",
  "参加しよ!と決めるとSlackに参加",
];

export function ActivitySection() {
  return (
    <section id="activity" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Activity
          </p>
          <h3 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            活動内容
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            週に一度、集まり進捗の共有や開発、就活相談や雑談を行います。
            <br />
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="h-full rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm"
            >
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {activity.tag}
              </span>
              <h4 className="mt-4 text-lg font-semibold text-card-foreground">
                {activity.title}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {activity.description}
              </p>
              <p className="mt-4 text-sm text-primary/80">{activity.detail}</p>
              {activity.linkUrl && (
                <a
                  href={activity.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  {activity.linkLabel ?? "詳しく見る"}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-dashed border-primary/30 bg-primary/5 px-6 py-8">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Join flow
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl bg-white/90 p-5 text-center shadow-sm"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-medium text-card-foreground">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
