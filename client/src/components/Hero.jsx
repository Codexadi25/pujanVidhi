import React from 'react';
import { ArrowDown, Sparkles, ArrowRight, ShieldCheck, Zap, Video, CheckCircle2 } from "lucide-react";

export default function Hero({ t, onOpenBuy }) {
  return (
    <section className="hero" id="home">
      <div className="hero-pattern"/>
      <div className="hero-glow glow-left"/><div className="hero-glow glow-right"/>
      
      <div className="hero-inner">
        {/* Deity Altar Stage */}
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
                  padding: "6px",
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
                  padding: "6px",
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

        {/* Hero Copy & Conversion Core */}
        <div className="hero-copy">
          <div className="eyebrow" style={{ color: "var(--gold-light, #fbe2aa)", background: "rgba(217, 168, 82, 0.15)", padding: "4px 12px", borderRadius: "99px", display: "inline-flex" }}>
            <Sparkles size={13}/>
            <span>DIGITAL DIWALI POOJA GUIDE &amp; FULL HD VIDEO</span>
          </div>

          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          {/* Quick Value Trust Strip (5-Second Clarity) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px",
            marginTop: "14px",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#fce8c3" }}>
              <Zap size={14} style={{ color: "#d9a852", flexShrink: 0 }}/>
              <span>Instant Phone Access</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#fce8c3" }}>
              <CheckCircle2 size={14} style={{ color: "#34d399", flexShrink: 0 }}/>
              <span>16-Step Vedic Vidhi</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#fce8c3" }}>
              <Video size={14} style={{ color: "#60a5fa", flexShrink: 0 }}/>
              <span>Full HD Video Masterclass</span>
            </div>
          </div>

          <div className="hero-actions">
            <button
              className="button button-gold"
              style={{
                cursor: "pointer",
                padding: "16px 26px",
                fontSize: "14px",
                boxShadow: "0 6px 20px rgba(217, 168, 82, 0.35)"
              }}
              onClick={() => onOpenBuy && onOpenBuy('video_kit')}
            >
              {t.primary} (₹21 / ₹121) <ArrowRight size={17}/>
            </button>
            <a className="button button-outline" href="#product">
              {t.secondary}
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px", fontSize: "11px", color: "#e2cbb2" }}>
            <ShieldCheck size={14} style={{ color: "#34d399" }}/>
            <span>100% Secure Checkout via UPI, Google Pay, Cards • No app download needed</span>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to next section">
        <ArrowDown size={18}/>
      </a>
    </section>
  );
}
