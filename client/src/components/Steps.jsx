import React from 'react';
import { steps } from "../data/content";

export default function Steps({ t }) {
  return (
    <section className="section steps-section" id="steps">
      <div className="section-heading">
        <span className="section-kicker">A SIMPLE, GUIDED EXPERIENCE</span>
        <h2>{t.stepsTitle}</h2>
      </div>
      <div className="steps-grid">
        {steps.map(([number, title, desc]) => <article className="step-card" key={number}>
          <span className="step-number">{number}</span><span className="step-diya">✦</span>
          <h3>{title}</h3><p>{desc}</p>
        </article>)}
      </div>
    </section>
  );
}
