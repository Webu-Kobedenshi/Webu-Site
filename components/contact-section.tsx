import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-panel">
        <div>
          <h2 id="contact-heading">活動を知りたい方へ</h2>
          <p>活動方針やコミュニティのルールは、ガイドをご覧ください。</p>
        </div>
        <a
          href="https://webu-kobedenshi.github.io/web-community-vault/We%E9%83%A8%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          コミュニティガイド <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
