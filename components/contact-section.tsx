import { Button } from "@/components/ui/button";
import { ExternalLink, MessageSquareHeart } from "lucide-react";

const perks = [
  "ITエキスパート学科",
  "ゲーム学科でもWebに興味があるならOK",
  "まずは雑談だけでも歓迎",
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground">
          <MessageSquareHeart className="h-4 w-4" />
          Contact
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          興味のある学生はぜひ！！！
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
          We部は学内最大規模のテックコミュニティを目指しています。
        </p>
        <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk}
              className="rounded-2xl border border-primary/20 bg-white/90 px-4 py-3 text-sm font-medium text-primary"
            >
              {perk}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="w-full max-w-xs gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
          >
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Googleフォームで問い合わせ
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full max-w-xs border-primary/40 bg-white/80 text-primary"
          >
            <a href="mailto:hello@webu.community">メールで相談する</a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          ※参加費はかかりません。勧誘やゴリ押しは一切ありません。
        </p>
      </div>
    </section>
  );
}
