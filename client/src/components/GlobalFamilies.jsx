import React from 'react';
import { Globe2, Smartphone, Languages, Sparkles } from "lucide-react";

export default function GlobalFamilies({ t, lang = 'hi' }) {
  const isHindi = lang === 'hi';
  return (
    <section className="global-section section" id="accessibility">
      <div className="global-copy">
        <span className="section-kicker">{t.globalKicker || "DEVOTION HAS NO BORDERS"}</span>
        <h2>{t.globalTitle}</h2>
        <p>{t.globalText}</p>

        <div className="global-points">
          <span><Languages/> {isHindi ? "हर पीढ़ी के लिए सरल हिंदी व अंग्रेजी में स्पष्ट व्याख्या" : "Simple Hindi & English explanations for every generation"}</span>
          <span><Smartphone/> {isHindi ? "अपनी पूजा चौकी के समीप 100% मोबाइल-अनुकूल सहज उपयोग" : "100% Mobile-friendly access beside your Pooja altar"}</span>
          <span><Sparkles/> {isHindi ? "रसोई की घरेलू सामग्री के सरल विकल्पों सहित सहज विधि" : "Easy-to-understand rituals with practical household substitutes"}</span>
          <span><Globe2/> {isHindi ? "विश्व के किसी भी कोने में तुरंत उपलब्ध डिजिटल संसाधन" : "Convenient digital resources accessible anywhere in the world"}</span>
        </div>
      </div>

      <div className="world-art">
        <div className="world-circle">🕉️</div>
        <span className="country country-one">{isHindi ? "भारत" : "INDIA"}</span>
        <span className="country country-two">{isHindi ? "अमेरिका" : "USA"}</span>
        <span className="country country-three">{isHindi ? "यूके" : "UK"}</span>
        <span className="country country-four">{isHindi ? "ऑस्ट्रेलिया" : "AUSTRALIA"}</span>
        <span className="world-caption">{isHindi ? "भक्ति की कोई सीमा नहीं होती" : "Devotion has no borders"}</span>
      </div>
    </section>
  );
}
