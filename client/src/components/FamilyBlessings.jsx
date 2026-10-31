import React from 'react';

export default function FamilyBlessings({ t }) {
  return (
    <section className="family-section section" id="about">
      <div className="family-art">
        <div className="blessing-beam beam-left"/><div className="blessing-beam beam-right"/>
        <div className="family-image-placeholder" style={{ overflow: "hidden", position: "relative" }}>
          <img
            src="/images/family.png"
            alt="Family celebrating sacred Diwali Lakshmi Ganesh Puja together"
            className="family-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom center",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <span className="lotus lotus-one">🪷</span><span className="lotus lotus-two">🪷</span>
      </div>

      <div className="family-copy">
        <span className="section-kicker">{t.familyKicker || "A CELEBRATION OF FAITH"}</span>
        <h2>{t.familyTitle}</h2>
        <p>{t.familyText}</p>
        <p className="script-line">“{t.familyScript}”</p>
      </div>
    </section>
  );
}
