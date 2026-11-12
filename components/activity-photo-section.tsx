"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const photos = [
  {
    src: "/activities/workshop-overview.jpg",
    alt: "プロジェクターの前で、メンバーが活動内容を発表している様子",
    caption: "メンバーの発表を聞く",
  },
  {
    src: "/activities/worktable.jpg",
    alt: "長いテーブルを囲み、それぞれのパソコンで作業するメンバー",
    caption: "テーブルを囲んで制作",
    orientation: "portrait",
  },
  {
    src: "/activities/presentation.jpg",
    alt: "画面を見ながら、発表者とメンバーが意見を交わしている様子",
    caption: "画面を見ながら意見交換",
  },
  {
    src: "/activities/project-demo.jpg",
    alt: "プロジェクターに映した画面を使って、制作した機能を紹介するメンバー",
    caption: "つくった機能を発表",
  },
  {
    src: "/activities/meeting-room.jpg",
    alt: "テーブルのそばに集まり、モニターを囲んで相談するメンバー",
    caption: "モニターを囲んで相談",
  },
  {
    src: "/activities/img_6421-new.jpg",
    alt: "ホワイトボードに貼った付箋を使い、メンバーが発表している様子",
    caption: "アイデアを共有する",
  },
  {
    src: "/activities/img_6422-new.jpg",
    alt: "ホワイトボードの前で発表するメンバーと、それを聞く参加者",
    caption: "みんなで意見を聞く",
  },
  {
    src: "/activities/img_6423-new.jpg",
    alt: "スクリーンを囲んで説明を聞くメンバーたち",
    caption: "課題について考える",
  },
  {
    src: "/activities/img_6424-new.jpg",
    alt: "スクリーンの前で話し合うメンバーたち",
    caption: "考えを伝え合う",
  },
  {
    src: "/activities/img_6425-new.jpg",
    alt: "付箋を貼ったホワイトボードの前で発表するメンバー",
    caption: "アイデアを発表する",
  },
  {
    src: "/activities/shared-work.jpg",
    alt: "活動スペースで、メンバーが机を囲んで作業する様子",
    caption: "制作の途中もみんなで相談",
  },
  {
    src: "/activities/audience.jpg",
    alt: "発表者の話を聞きながら、画面を見るメンバーたち",
    caption: "学びを共有する",
  },
];

export function ActivityPhotoSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const activePhotoRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.3 });
    observer.observe(viewport);
    const timer = window.setInterval(() => {
      if (!visible || document.hidden || motion.matches || viewport.matches(":hover") || viewport.contains(document.activeElement) || drag.current.active) return;
      const slides = viewport.querySelectorAll<HTMLElement>(".activity-photo-slide");
      const next = (activePhotoRef.current + 1) % photos.length;
      const target = slides[next];
      if (!target) return;
      viewport.scrollTo({
        left: viewport.scrollLeft + target.getBoundingClientRect().left - viewport.getBoundingClientRect().left,
        behavior: next === 0 ? "instant" : "smooth",
      });
    }, 4000);
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, []);

  function updateActivePhoto() {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const left = viewport.getBoundingClientRect().left;
    const slides = Array.from(viewport.querySelectorAll<HTMLElement>(".activity-photo-slide"));
    const atEnd = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 4;
    const nearest = atEnd ? photos.length - 1 : slides.reduce((best, slide, index) =>
      Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[best].getBoundingClientRect().left - left) ? index : best, 0);
    if (nearest !== activePhotoRef.current) {
      activePhotoRef.current = nearest;
      setActivePhoto(nearest);
    }
  }

  const drag = useRef({ active: false, x: 0, scroll: 0, lastX: 0, time: 0, velocity: 0 });

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const viewport = event.currentTarget;
    drag.current = { active: true, x: event.clientX, scroll: viewport.scrollLeft, lastX: event.clientX, time: performance.now(), velocity: 0 };
    viewport.setPointerCapture(event.pointerId);
    viewport.style.scrollSnapType = "none";
    viewport.style.scrollBehavior = "auto";
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state.active) return;
    const now = performance.now();
    state.velocity = (state.lastX - event.clientX) / Math.max(8, now - state.time);
    state.lastX = event.clientX;
    state.time = now;
    event.currentTarget.scrollLeft = state.scroll + state.x - event.clientX;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    const viewport = event.currentTarget;
    viewport.style.removeProperty("scroll-snap-type");
    viewport.style.removeProperty("scroll-behavior");
    viewport.scrollBy({ left: (performance.now() - drag.current.time < 100 ? drag.current.velocity : 0) * 180, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function moveToAdjacentPhoto(direction: -1 | 1) {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slides = Array.from(
      viewport.querySelectorAll<HTMLElement>(".activity-photo-slide"),
    );
    if (slides.length === 0) return;

    const viewportLeft = viewport.getBoundingClientRect().left;
    const currentIndex = slides.reduce((nearestIndex, slide, index) => {
      const currentDistance = Math.abs(
        slides[nearestIndex].getBoundingClientRect().left - viewportLeft,
      );
      const nextDistance = Math.abs(slide.getBoundingClientRect().left - viewportLeft);
      return nextDistance < currentDistance ? index : nearestIndex;
    }, 0);
    const targetIndex = Math.max(
      0,
      Math.min(slides.length - 1, currentIndex + direction),
    );
    const target = slides[targetIndex];
    const targetLeft = viewport.scrollLeft + target.getBoundingClientRect().left - viewportLeft;

    viewport.scrollTo({
      left: targetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  return (
    <section id="activity-photos" className="activity-photos" data-scene-stop="photos" aria-labelledby="activity-photos-heading">
      <div className="page-width activity-photos-inner">
        <div className="activity-photos-header">
          <div className="activity-photos-copy">
            <h2 id="activity-photos-heading">活動の様子</h2>
            <p>
              企画、制作、発表。メンバーが集まり、学びながら形にしています。
            </p>
          </div>
          <div
            className="activity-photo-controls"
            role="group"
            aria-label="写真の移動"
          >
            <span className="activity-photo-count" aria-live="polite" aria-atomic="true">
              <span className="sr-only">写真 </span>{String(activePhoto + 1).padStart(2, "0")}<span aria-hidden="true"> / </span><span className="sr-only"> / 全 </span>{String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="前の写真へ"
              onClick={() => moveToAdjacentPhoto(-1)}
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="次の写真へ"
              onClick={() => moveToAdjacentPhoto(1)}
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="activity-photo-viewport"
          ref={viewportRef}
          role="region"
          aria-roledescription="写真ギャラリー"
          aria-label="Webuの活動写真。スワイプまたは矢印キーで移動できます。"
          tabIndex={0}
          onScroll={updateActivePhoto}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              moveToAdjacentPhoto(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <ul className="activity-photo-track">
            {photos.map((photo) => (
              <li
                key={photo.src}
                className={`activity-photo-slide${
                  photo.orientation === "portrait"
                    ? " activity-photo-slide--portrait"
                    : ""
                }`}
              >
                <figure>
                  <div className="activity-photo-frame">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      draggable={false}
                      sizes={
                        photo.orientation === "portrait"
                          ? "(max-width: 767px) 70vw, (max-width: 1023px) 46vw, 34vw"
                          : "(max-width: 767px) 86vw, (max-width: 1023px) 70vw, 56vw"
                      }
                    />
                  </div>
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
