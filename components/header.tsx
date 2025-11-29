import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          We部
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="#founders" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Members
          </Link>
          <Link href="#activity" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Activity
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
