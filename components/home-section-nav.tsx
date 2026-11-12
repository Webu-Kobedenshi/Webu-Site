"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home-top", label: "TOP", name: "トップ" },
  { id: "about", label: "ABOUT", name: "Webuとは" },
  { id: "learning", label: "LEARNING", name: "学べること" },
  { id: "activity-photos", label: "GALLERY", name: "活動の様子" },
  { id: "activity", label: "ACTIVITY", name: "活動日時・場所" },
  { id: "home-next", label: "JOIN", name: "プロジェクト・参加方法" },
];

export function HomeSectionNav() {
  const [active, setActive] = useState("home-top");

  useEffect(() => {
    const update = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        setActive(sections[sections.length - 1].id);
        return;
      }
      const threshold = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) current = section.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const links = sections.map((section, index) => (
    <a key={section.id} href={`#${section.id}`} aria-label={section.name} aria-current={active === section.id ? "location" : undefined}>
      <span className="home-section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <span>{section.label}</span>
    </a>
  ));

  return (
    <nav className="home-section-nav" aria-label="ページ内のセクション">
      <div className="home-section-menu home-section-menu-desktop">{links}</div>
      <details>
        <summary>目次</summary>
        <div className="home-section-menu" onClick={(event) => event.currentTarget.parentElement?.removeAttribute("open")}>
          {links}
        </div>
      </details>
    </nav>
  );
}
