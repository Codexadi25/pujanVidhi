import React from 'react';
import { BookOpen, ListChecks, PlayCircle, Clock3 } from "lucide-react";
import { features } from "../data/content";

const icons = [ListChecks, BookOpen, PlayCircle, Clock3];

export default function Problem({ t }) {
  return (
    <section className="section problem-section">
      <div className="section-heading">
        <span className="section-kicker">A LITTLE MORE CLARITY, A LOT MORE PEACE</span>
        <h2>{t.problemTitle}</h2>
        <p>{t.problemText}</p>
      </div>
      <div className="feature-grid">
        {features.map((feature, i) => {
          const Icon = icons[i];
          return <article className="feature-card" key={feature.title}>
            <span className="feature-icon"><Icon size={25}/></span>
            <h3>{feature.title}</h3><p>{feature.desc}</p>
          </article>;
        })}
      </div>
    </section>
  );
}
