import React from 'react';
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA({ t, onOpenBuy }) {
  return (
    <section className="final-cta section" id="purchase">
      <div className="final-ornament">🪔</div>
      <span className="section-kicker">{t.finalKicker || "A SACRED DIWALI BEGINS WITH PREPARATION"}</span>
      <h2>{t.finalTitle}</h2>
      <p>{t.finalText}</p>
      
      <button
        className="button button-gold"
        style={{ cursor: "pointer", fontSize: "15px", padding: "16px 32px" }}
        onClick={() => onOpenBuy && onOpenBuy('video_kit')}
      >
        {t.finalCTA} <ArrowRight size={18}/>
      </button>

      <small>{t.finalSub || "Instant Digital Access • 100% Secure Payment • Auspicious Diwali 2026"}</small>
    </section>
  );
}
