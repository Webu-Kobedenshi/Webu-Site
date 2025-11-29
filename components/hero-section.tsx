import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="about" className="flex min-h-screen flex-col items-center justify-center px-6 pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          Web系優良企業を目指すコミュニティ
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl">We部</h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Web系優良企業内定を目指す仲間と共に学び、成長するコミュニティ。 情報共有、スキルアップ、就活対策を一緒に。
        </p>
        <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <a href="#contact">
            話を聞く
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}
