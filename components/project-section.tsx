import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function ProjectSection() {
  return (
    <section id="projects" className="project-collection page-width" aria-label="プロジェクト一覧">
      <div className="project-list">
        <article className="project-entry" aria-labelledby="knowledge-heading">
          <figure className="project-screenshot">
            <a href="/projects/obog-list-mock.jpg" target="_blank" rel="noopener noreferrer" className="project-screenshot-link" aria-label="OB・OG一覧のサンプル画面を拡大する（新しいタブ）">
              <Image src="/projects/obog-list-mock.jpg" width={1440} height={1140} sizes="(max-width: 364px) calc(100vw - 40px), (max-width: 767px) 324px, 384px" alt="学科・卒業年度・企業名で先輩を探せるOB・OG一覧。架空の先輩8人の内定先とスキルを表示しています。" />
            </a>
            <figcaption>実際の画面に、架空の人物・企業情報を入れた紹介用サンプルです。</figcaption>
          </figure>
          <div className="project-story">
            <p className="project-category">01 / Webサービス・就活支援</p>
            <h2 id="knowledge-heading">We部ナレッジベース</h2>
            <p className="project-subtitle">OB・OGと在校生をつなぐ就活サービス</p>
            <p>学科・企業名・卒業年度から先輩を探し、選考フローや面接の体験談を読めます。</p>
            <p>連絡を受け付けている先輩には、公開されたSNSから相談することもできます。</p>
            <a href="/projects/obog-list-mock.jpg" target="_blank" rel="noopener noreferrer" className="text-link">画面を大きく見る <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </article>
      </div>
      <div className="next-project">
        <p>次につくるものは、<br className="mobile-break" />あなたの「あったらいいな」かもしれない。</p>
        <Link href="/join" className="text-link">参加方法を見る <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
