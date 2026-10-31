import React from 'react';
import { Globe2, Smartphone, Languages, Sparkles } from "lucide-react";

export default function GlobalFamilies({ t }) {
  return (
    <section className="global-section section" id="accessibility">
      <div className="global-copy">
        <span className="section-kicker">{t.globalKicker || "DEVOTION HAS NO BORDERS"}</span>
        <h2>{t.globalTitle}</h2>
        <p>{t.globalText}</p>

        <div className="global-points">
          <span><Languages/> Simple Hindi & English explanations for every generation</span>
          <span><Smartphone/> 100% Mobile-friendly access beside your Pooja altar</span>
          <span><Sparkles/> Easy-to-understand rituals with practical household substitutes</span>
          <span><Globe2/> Convenient digital resources accessible anywhere in the world</span>
        </div>
      </div>

      <div className="world-art">
        <div className="world-circle">🕉️</div>
        <span className="country country-one">INDIA</span>
        <span className="country country-two">USA</span>
        <span className="country country-three">UK</span>
        <span className="country country-four">AUSTRALIA</span>
        <span className="world-caption">Devotion has no borders</span>
      </div>
    </section>
  );
}
