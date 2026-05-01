export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-white/50 py-12 px-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-xl font-black text-foreground">We部</h4>
          <p className="text-sm font-medium text-muted-foreground">
            Web系優良企業内定を目指すコミュニティ
          </p>
        </div>

        <p className="text-sm text-muted-foreground/80 max-w-md">
          今日もそれぞれのペースで前進中。
          <br />
          また気軽に遊びに来てください。
        </p>

        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-2" />

        <p className="text-xs font-medium text-muted-foreground/70">
          運営: 神戸電子専門学校 ソフトIV 橋本怜苑・服部潤一
        </p>

        <p className="text-[10px] font-semibold text-muted-foreground/50 tracking-wider">
          &copy; {new Date().getFullYear()} We部 community. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
