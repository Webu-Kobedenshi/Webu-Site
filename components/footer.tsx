export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-white/80 py-10 px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center text-sm text-muted-foreground">
        <p>今日もそれぞれのペースで前進中。また気軽に遊びに来てください。</p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} We部 community
        </p>
      </div>
    </footer>
  );
}
