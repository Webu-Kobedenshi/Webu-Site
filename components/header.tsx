"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
          ? "border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
          : "border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="text-xl">We部</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary">
            community
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
          {["About", "Activity", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative transition-colors hover:text-primary"
            >
              {item === "About" ? "コミュニティ紹介" : item === "Activity" ? "活動プログラム" : "お問い合わせ"}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {/* Mobile Menu Trigger could go here */}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary px-5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
          >
            <a href="#contact">説明会申し込み</a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

