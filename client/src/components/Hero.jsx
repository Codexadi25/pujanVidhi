import React from 'react';
import { ArrowDown, Sparkles } from "lucide-react";

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
                alt="Goddess Lakshmi"
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
            <span className="deity-caption">Goddess Lakshmi</span>
          </div>
          <div className="stage-ornament">✺</div>
          <div className="deity deity-right">
            <div className="deity-placeholder" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/images/ganesh.webp"
                alt="Lord Ganesh"
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
            <span className="deity-caption">Lord Ganesh</span>
          </div>
          <div className="diya-row" aria-label="Three decorative diyas">
            <span className="diya"><i/></span><span className="diya diya-main"><i/></span><span className="diya"><i/></span>
          </div>
        </div>
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14}/>{t.eyebrow}</div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <button className="button" style={{ cursor: "pointer" }} onClick={onOpenBuy}>{t.primary}</button>
            <a className="button button-outline" href="#about">{t.secondary}</a>
          </div>
          <span className="hero-note">For Hindu families in India and around the world</span>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to next section"><ArrowDown size={18}/></a>
    </section>
  );
}
