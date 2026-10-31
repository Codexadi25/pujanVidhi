import React, { useState } from 'react';
import { FileText, PlayCircle, Eye, ArrowRight, X } from "lucide-react";

export default function Preview({ t, onOpenBuy }) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section className="section preview-section" id="preview">
      <div className="section-heading">
        <span className="section-kicker">{t.previewKicker || "LOOK INSIDE YOUR GUIDE"}</span>
        <h2>{t.previewTitle}</h2>
        <p>{t.previewSub}</p>
      </div>

      <div className="preview-grid">
        {/* PDF Reader Sample Preview */}
        <article className="preview-card">
          <div className="preview-paper" style={{ background: "#fffdf9", border: "1px solid #e7d5be" }}>
            <span style={{ color: "#8f211c", fontWeight: "700", letterSpacing: "1px" }}>🕉️ दीपावली महापूजा</span>
            <strong style={{ color: "#4b1716", fontSize: "16px", margin: "6px 0" }}>श्री गणेश-लक्ष्मी ध्यान व संकल्प</strong>
            <i style={{ color: "#a58b6c", fontSize: "11px" }}>Actual Sacred Guide Format</i>
            <div className="paper-lines" style={{ opacity: 0.7 }}/>
            <div style={{ marginTop: "10px", fontSize: "10px", color: "#62463a", textAlign: "left", padding: "0 6px" }}>
              • ॐ अपवित्रः पवित्रो वा... (शुद्धिकरण)<br/>
              • दीप प्रज्वलन व मंगल कलश स्थापना<br/>
              • श्री महालक्ष्मी अष्टकम् व आरती
            </div>
          </div>
          <div>
            <FileText size={28} style={{ color: "var(--red)" }}/>
            <h3>{t.previewPDFTitle}</h3>
            <p>{t.previewPDFDesc}</p>
            <a
              href="#product"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: "700",
                color: "var(--red)",
                marginTop: "10px",
                fontSize: "13px"
              }}
            >
              {t.previewPDFAction} <ArrowRight size={14}/>
            </a>
          </div>
        </article>

        {/* Video Walkthrough Preview */}
        <article className="preview-card">
          <div
            className="video-placeholder"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden"
            }}
            onClick={() => setShowVideoModal(true)}
            title="Click to watch preview teaser"
          >
            <PlayCircle size={56} style={{ color: "#fce2a6", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}/>
            <span style={{ fontWeight: "800", letterSpacing: "2px", color: "#fff0d4" }}>AUTHENTIC VIDEO WALKTHROUGH</span>
            <small style={{ color: "#f7d994", fontSize: "11px" }}>Click to preview step demonstration</small>
          </div>
          <div>
            <PlayCircle size={28} style={{ color: "var(--red)" }}/>
            <h3>{t.previewVideoTitle}</h3>
            <p>{t.previewVideoDesc}</p>
            <button
              onClick={() => onOpenBuy && onOpenBuy('video_kit')}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: "700",
                color: "var(--red)",
                marginTop: "10px",
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              {t.previewVideoAction} <ArrowRight size={14}/>
            </button>
          </div>
        </article>
      </div>

      {/* Video Preview Teaser Modal */}
      {showVideoModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(18, 5, 5, 0.88)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setShowVideoModal(false)}
        >
          <div
            style={{
              background: "#240b09",
              border: "1px solid #d9a852",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "520px",
              width: "100%",
              textAlign: "center",
              color: "#fff3db"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#fce2a6" }}>🪔 Diwali Puja Video Walkthrough</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                style={{ background: "none", border: "none", color: "#fce2a6", fontSize: "22px", cursor: "pointer" }}
              >
                <X size={22}/>
              </button>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#e5cbb2", marginBottom: "18px" }}>
              The complete masterclass includes full HD video guidance covering Chowki Sthapana, Ganesha invocation, Kalash Pujan, 16-step Lakshmi worship, 14 Diya deepdaan, and Maha Aarti with Sanskrit mantra audio.
            </p>
            <button
              className="button button-gold"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setShowVideoModal(false);
                onOpenBuy && onOpenBuy('video_kit');
              }}
            >
              Get Complete Video Guide (₹121) <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
