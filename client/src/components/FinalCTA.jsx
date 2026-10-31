import React from 'react';
import { ArrowRight } from "lucide-react";

export default function FinalCTA({ t, onOpenBuy }) {
  return (
    <section className="final-cta section" id="purchase">
      <div className="final-ornament">✺</div>
      <span className="section-kicker">A MEANINGFUL DIWALI BEGINS WITH PREPARATION</span>
      <h2>{t.finalTitle}</h2><p>{t.finalText}</p>
      <button className="button button-gold" style={{ cursor: "pointer" }} onClick={onOpenBuy}>
        {t.buy} <ArrowRight size={17}/>
      </button>
      <small>Instant Digital Access • 100% Secure Payment • Auspicious Diwali 2026</small>
    </section>
  );
}
