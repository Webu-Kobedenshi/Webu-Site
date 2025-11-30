import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ActivitySection } from "@/components/activity-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ActivitySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
