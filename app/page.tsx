import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FoundersSection } from "@/components/founders-section"
import { ActivitySection } from "@/components/activity-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FoundersSection />
      <ActivitySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
