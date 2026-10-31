import React from 'react';
import { Globe2, MapPin, HeartHandshake } from "lucide-react";

export default function GlobalFamilies({ t }) {
  return (
    <section className="global-section section">
      <div className="global-copy">
        <span className="section-kicker">ONE TRADITION, MANY HOMES</span>
        <h2>{t.globalTitle}</h2><p>{t.globalText}</p>
        <div className="global-points">
          <span><Globe2/> Digital access for families worldwide</span>
          <span><MapPin/> City-specific Muhurat, where supported</span>
          <span><HeartHandshake/> Traditions for the next generation</span>
        </div>
      </div>
      <div className="world-art">
        <div className="world-circle">ॐ</div>
        <span className="country country-one">INDIA</span><span className="country country-two">USA</span>
        <span className="country country-three">UK</span><span className="country country-four">AUSTRALIA</span>
        <span className="world-caption">Devotion has no borders</span>
      </div>
    </section>
  );
}
