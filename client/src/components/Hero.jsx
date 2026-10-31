import React from 'react';
import { ArrowDown, Sparkles, ArrowRight } from "lucide-react";

export default function Hero({ t, onOpenBuy }) {
  return (
    <section className="hero" id="home">
      <div className="hero-pattern"/>
      <div className="hero-glow glow-left"/><div className="hero-glow glow-right"/>
      
      <div className="hero-inner">
        <div className="deity-stage">
          <div className="deity deity-left">
            <div className="deity-placeholder" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/images/lakshmi.webp"
                alt="Maa Lakshmi - Goddess of Prosperity & Abundance"
                className="deity-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <span className="deity-caption">माँ महालक्ष्मी</span>
          </div>

          <div className="stage-ornament">🪷</div>

          <div className="deity deity-right">
            <div className="deity-placeholder" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/images/ganesh.webp"
                alt="Lord Ganesha - Dispeller of Obstacles"
                className="deity-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <span className="deity-caption">भगवान श्री गणेश</span>
          </div>

          <div className="diya-row" aria-label="Traditional auspicious Diwali diyas">
            <span className="diya"><i/></span>
            <span className="diya diya-main"><i/></span>
            <span className="diya"><i/></span>
          </div>
        </div>

        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={14}/>
            {t.eyebrow}
          </div>

          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div style={{
            background: "rgba(217, 168, 82, 0.12)",
            borderLeft: "3px solid var(--gold)",
            padding: "8px 14px",
            borderRadius: "4px",
            marginTop: "14px",
            marginBottom: "18px",
            color: "#fce8c3",
            fontSize: "13px",
            fontWeight: "600"
          }}>
            ✨ {t.heroHook}
          </div>

          <div className="hero-actions">
            <button
              className="button"
              style={{ cursor: "pointer" }}
              onClick={() => onOpenBuy && onOpenBuy('video_kit')}
            >
              {t.primary} <ArrowRight size={16}/>
            </button>
            <a className="button button-outline" href="#product">
              {t.secondary}
            </a>
          </div>

          <span className="hero-note">🪔 {t.heroNote}</span>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to next section">
        <ArrowDown size={18}/>
      </a>
    </section>
  );
}
