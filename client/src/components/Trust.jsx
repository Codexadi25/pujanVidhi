import React from 'react';
import { BookMarked, BadgeCheck, ShieldCheck } from "lucide-react";

export default function Trust({ t }) {
  return (
    <section className="trust-section section" id="trust">
      <div className="section-heading">
        <span className="section-kicker">{t.trustKicker || "OUR DEVOTIONAL COMMITMENT"}</span>
        <h2>{t.trustTitle}</h2>
        <p>{t.trustSub}</p>
      </div>

      <div className="trust-grid">
        <div>
          <BookMarked size={32}/>
          <h3>Traditional Vedic & Pauranik Roots</h3>
          <p>
            Follows timeless Lakshmi-Ganesh Diwali worship practices passed down through sacred scriptures, ensuring every ritual is preserved with sanctity.
          </p>
        </div>

        <div>
          <BadgeCheck size={32}/>
          <h3>Family-First Clarity</h3>
          <p>
            Written in approachable Hindi and English so that elders, youth, and first-time performers can participate and understand every sacred prayer.
          </p>
        </div>

        <div>
          <ShieldCheck size={32}/>
          <h3>Transparent & Respectful</h3>
          <p>
            One-time honest pricing (₹21 / ₹121), instant digital delivery on all your devices, zero subscriptions, and friendly WhatsApp & email devotee assistance.
          </p>
        </div>
      </div>
    </section>
  );
}
