import React from 'react';
import { BookOpen, ListChecks, PlayCircle, Smartphone } from "lucide-react";
import { features } from "../data/content";

const iconMap = {
  BookOpen,
  ListChecks,
  PlayCircle,
  Smartphone
};

export default function Problem({ t, lang = 'en' }) {
  return (
    <section className="section problem-section" id="solution">
      <div className="section-heading">
        <span className="section-kicker">{t.problemKicker || "SACRED TRADITION, ZERO CONFUSION"}</span>
        <h2>{t.problemTitle}</h2>
        <p>{t.problemText}</p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon] || BookOpen;
          const title = lang === 'hi' ? feature.title : feature.titleEn;
          const desc = lang === 'hi' ? feature.desc : feature.descEn;

          return (
            <article className="feature-card" key={feature.titleEn}>
              <span className="feature-icon"><Icon size={24}/></span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
