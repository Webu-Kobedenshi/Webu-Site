import type { Metadata } from "next";
import { ProjectSection } from "@/components/project-section";

export const metadata: Metadata = {
  title: "プロジェクト | Webu (We部)",
  description: "Webuの学生たちがつくったプロジェクトを紹介。OB・OGと在校生をつなぐWe部ナレッジベースを、架空のデータを使った画面写真とともに紹介します。",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="page-intro projects-intro page-width">
        <p className="eyebrow">PROJECTS / つくったもの</p>
        <h1>これまで作ってきたサービス</h1>
      </header>
      <ProjectSection />
    </>
  );
}
