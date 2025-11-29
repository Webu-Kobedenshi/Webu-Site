import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Contact</h2>
        <h3 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">話を聞いてみませんか？</h3>
        <p className="mx-auto mb-10 max-w-lg text-muted-foreground text-pretty">
          We部に興味がある方、詳しい話を聞きたい方は 下記のフォームからお気軽にご連絡ください。
        </p>
        <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer">
            Google フォームで問い合わせる
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}
