"use client";

import { Button } from "@/components/ui/button";
import { MessageSquareHeart, Send } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";

const perks = ["初学者歓迎！！", "Web系企業志望者向け", "実務経験積みましょう"];

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-primary/5" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scaleIn}
        className="mx-auto max-w-4xl text-center rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] bg-white/40 border border-white/60 p-5 sm:p-8 md:p-16 shadow-2xl backdrop-blur-xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-bold text-secondary-foreground mb-6 md:mb-8">
          <MessageSquareHeart className="h-3 w-3 md:h-4 md:w-4" />
          Join Us
        </div>

        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground md:text-6xl mb-4 md:mb-6 leading-tight">
          興味のある学生は<br className="md:hidden" />ぜひ！！！
        </h3>

        <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground text-pretty mb-8 md:mb-10 leading-relaxed">
          We部は学内最大規模のテックコミュニティを目指しています。<br className="hidden md:block" />
          一緒に成長できる仲間をお待ちしています。
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {perks.map((perk) => (
            <span
              key={perk}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/80 border border-primary/10 text-xs md:text-sm font-bold text-primary shadow-sm"
            >
              {perk}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-6">
          <Button
            asChild
            size="lg"
            className="w-full max-w-sm h-14 md:h-16 text-base md:text-lg gap-2 md:gap-3 bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:scale-105 hover:bg-primary hover:shadow-2xl transition-all duration-300 rounded-full"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7OkkLIouK8q6D9doWbvVApyKHpb9BIXULKz_I_i94VBfIsQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="h-4 w-4 md:h-5 md:w-5" />
              参加申し込みはこちらから！
            </a>
          </Button>

          <p className="text-[10px] md:text-xs text-muted-foreground/80 font-medium bg-white/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
            ※参加費はかかりません。勧誘やゴリ押しは一切ありません。
          </p>
        </div>
      </motion.div>
    </section>
  );
}

