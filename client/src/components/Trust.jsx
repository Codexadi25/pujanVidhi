import React from 'react';
import { ShieldCheck, BookMarked, BadgeCheck } from "lucide-react";

export default function Trust({ t }) {
  return (
    <section className="trust-section section">
      <div className="section-heading">
        <span className="section-kicker">ROOTED IN TRADITION</span><h2>{t.trustTitle}</h2>
        <p>Help visitors understand how your guide was prepared and reviewed.</p>
      </div>
      <div className="trust-grid">
        <div><BookMarked/><h3>Traditional References</h3><p>Name the sources and tradition followed by your guide.</p></div>
        <div><BadgeCheck/><h3>Reviewed Content</h3><p>Identify the qualified reviewer, only with their permission.</p></div>
        <div><ShieldCheck/><h3>Clear Purchase Details</h3><p>Explain exactly what is included, how access works and your refund terms.</p></div>
      </div>
    </section>
  );
}
