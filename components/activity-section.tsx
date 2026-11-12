import { ArrowUpRight } from "lucide-react";

export function ActivitySection() {
  return (
    <section id="activity" data-scene-stop="activity" className="activity-section page-width section-space" aria-labelledby="activity-heading">
      <div className="activity-heading">
        <p className="eyebrow">活動案内</p>
        <h2 id="activity-heading">活動日時と場所。</h2>
      </div>
      <dl className="activity-info">
        <div>
          <dt>活動日時</dt>
          <dd>
            <p className="activity-weekday">毎週木曜日</p>
            <p className="activity-hours"><time dateTime="15:30">15:30</time><span>〜</span><time dateTime="18:00">18:00</time></p>
          </dd>
        </div>
        <div>
          <dt>活動場所</dt>
          <dd>
            <p className="activity-venue">OPTiM Club KOBE</p>
            <p className="activity-note">株式会社オプティム様に、<br />活動拠点をご提供いただいています。</p>
            <a href="https://www.optim.co.jp/" target="_blank" rel="noopener noreferrer" className="text-link">
              株式会社オプティムについて <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
