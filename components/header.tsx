import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-border/60 bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          We部{" "}
          <span className="text-sm font-normal text-muted-foreground">
            community
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link
            href="#about"
            className="transition-colors hover:text-foreground"
          >
            コミュニティ紹介
          </Link>
          <Link
            href="#activity"
            className="transition-colors hover:text-foreground"
          >
            活動プログラム
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-foreground"
          >
            お問い合わせ
          </Link>
        </nav>
        <Button
          asChild
          size="sm"
          className="bg-primary/90 text-primary-foreground shadow-sm hover:bg-primary"
        >
          <a href="#contact">話を聞きたい人はこちらから！</a>
        </Button>
      </div>
    </header>
  );
}
