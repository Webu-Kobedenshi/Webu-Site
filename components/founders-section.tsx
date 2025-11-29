import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Briefcase, MessageCircle } from "lucide-react"

const founders = [
  {
    name: "Founder 1",
    role: "フロントエンド",
    company: "メガベンチャー内定",
    experience: "実務2年",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    name: "Founder 2",
    role: "バックエンド",
    company: "有名SaaS企業内定",
    experience: "実務1.5年",
    skills: ["Go", "AWS", "Docker"],
  },
  {
    name: "Founder 3",
    role: "フルスタック",
    company: "外資系IT企業内定",
    experience: "実務2年",
    skills: ["Python", "React", "GCP"],
  },
]

export function FoundersSection() {
  return (
    <section id="founders" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium text-primary">Meet the Founders</p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">立ち上げメンバー</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            全員がWeb開発の実務経験者。有名企業への内定実績を持つメンバーが、
            <br className="hidden md:block" />
            <span className="text-primary font-medium">就活のリアルなノウハウ</span>を共有します。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {founders.map((founder, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Code className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{founder.name}</h3>
                    <p className="text-sm text-muted-foreground">{founder.role}</p>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-card-foreground">{founder.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{founder.experience}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {founder.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-medium text-card-foreground">就活の進め方、ポートフォリオ作成、面接対策...</p>
          <p className="mt-1 text-muted-foreground">実際に内定を勝ち取ったメンバーに直接聞けるチャンス</p>
        </div>
      </div>
    </section>
  )
}
