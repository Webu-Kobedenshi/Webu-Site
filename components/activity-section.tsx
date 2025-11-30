const activities = [
  {
    title: "デプロイ向けチーム開発",
    description:
      "1年間を通して実際にサービスをリリース。企画から設計、開発、運用までここで体験しよう!",
    detail:
      "技術選定や開発の進め方などはどんどん先輩や強強エンジニアに聞いていこう！！",
    tag: "週1 / オンライン",
  },
  {
    title: "外部のハッカソン出場 (任意参加)",
    description:
      "チームで外部のハッカソンに参加し、実践的な開発経験を積みます。",
    detail: "外部ハッカソンで何か賞を取ると就職活動めっちゃ有利です！",
    tag: "年に1度 / 任意",
  },
  {
    title: "就活は情報戦！？情報共有ラフ会",
    description:
      "就活の最新情報や企業研究、面接対策などをメンバー同士で共有します。",
    detail: "有料企業や大手の情報はなかなか学校では手に入りません！",
    tag: "月1 / ハイブリッド",
  },
];

const steps = [
  "Slackに招待 & 自己紹介",
  "気になる会にゆるっと参加",
  "メンターと1on1で作戦会議",
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

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
