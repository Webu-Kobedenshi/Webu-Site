import type { Metadata } from "next";
import { JoinSection } from "@/components/join-section";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "参加方法 | Webu (We部)",
  description: "Webuでは、一緒に活動する仲間を探しています。メンバー募集は不定期で行っています。",
};

export default function JoinPage() {
  return (
    <div className="join-page page-width">
      <header className="join-page-intro">
        <p className="eyebrow">参加方法</p>
        <h1>一緒に活動する仲間を探しています。</h1>
      </header>
      <JoinSection />
      <ContactSection />
    </div>
  );
}
