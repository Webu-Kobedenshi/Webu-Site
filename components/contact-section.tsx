"use client";

import { Button } from "@/components/ui/button";
import { MessageSquareHeart, Send } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";

const perks = ["初学者歓迎！！", "Web系企業志望者向け", "実務経験積みましょう"];

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 relative isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-primary/5" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scaleIn}
        className="mx-auto max-w-4xl text-center rounded-[3rem] bg-white/40 border border-white/60 p-12 shadow-2xl backdrop-blur-xl md:p-16"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-bold text-secondary-foreground mb-8">
          <MessageSquareHeart className="h-4 w-4" />
          Join Us
        </div>

        <h3 className="text-4xl font-black tracking-tight text-foreground md:text-6xl mb-6">
          興味のある学生は<br className="md:hidden" />ぜひ！！！
        </h3>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty mb-10">
          We部は学内最大規模のテックコミュニティを目指しています。<br />
          一緒に成長できる仲間をお待ちしています。
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {perks.map((perk) => (
            <span
              key={perk}
              className="px-4 py-2 rounded-xl bg-white/80 border border-primary/10 text-sm font-bold text-primary shadow-sm"
            >
              {perk}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button
            asChild
            size="lg"
            className="w-full max-w-sm h-16 text-lg gap-3 bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:scale-105 hover:bg-primary hover:shadow-2xl transition-all duration-300 rounded-full"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7OkkLIouK8q6D9doWbvVApyKHpb9BIXULKz_I_i94VBfIsQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="h-5 w-5" />
              説明会申し込みはこちらから！
            </a>
          </Button>

          <p className="text-xs text-muted-foreground/80 font-medium bg-white/50 px-4 py-2 rounded-full">
            ※参加費はかかりません。勧誘やゴリ押しは一切ありません。
          </p>
        </div>
      </motion.div>
    </section>
  );
}

