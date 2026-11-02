import React from 'react';
import { BookMarked, BadgeCheck, ShieldCheck } from "lucide-react";

export default function Trust({ t, lang = 'hi', prices }) {
  const isHindi = lang === 'hi';
  const pEss = prices?.essential || 21;
  const pComp = prices?.complete || 51;
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
          <h3>{isHindi ? "पारंपरिक वैदिक एवं पौराणिक आधार" : "Traditional Vedic & Pauranik Roots"}</h3>
          <p>
            {isHindi
              ? "प्राचीन धर्मग्रंथों एवं शास्त्रसम्मत परंपराओं पर आधारित लक्ष्मी-गणेश पूजन विधान, ताकि हर अनुष्ठान पूर्ण पवित्रता व विधिपूर्वक संपन्न हो सके।"
              : "Follows timeless Lakshmi-Ganesh Diwali worship practices passed down through sacred scriptures, ensuring every ritual is preserved with sanctity."}
          </p>
        </div>

        <div>
          <BadgeCheck size={32}/>
          <h3>{isHindi ? "पूरे परिवार के लिए सहज और स्पष्ट" : "Family-First Clarity"}</h3>
          <p>
            {isHindi
              ? "सरल एवं सहज भाषा में रचित, जिससे घर के बुजुर्ग, युवा और पहली बार पूजा करने वाले सभी सदस्य प्रत्येक मंत्र का अर्थ समझकर भाग ले सकें।"
              : "Written in approachable Hindi and English so that elders, youth, and first-time performers can participate and understand every sacred prayer."}
          </p>
        </div>

        <div>
          <ShieldCheck size={32}/>
          <h3>{isHindi ? "पारदर्शी, प्रामाणिक एवं सम्मानजनक" : "Transparent & Respectful"}</h3>
          <p>
            {isHindi
              ? `ईमानदार एकमुश्त मूल्य (₹${pEss} / ₹${pComp}), सभी मोबाइल व कंप्यूटर पर तुरंत डिलीवरी, कोई छुपा हुआ शुल्क नहीं, एवं व्हाट्सएप व ईमेल पर सदैव भक्त सहायता।`
              : `One-time honest pricing (₹${pEss} / ₹${pComp}), instant digital delivery on all your devices, zero subscriptions, and friendly WhatsApp & email devotee assistance.`}
          </p>
        </div>
      </div>
    </section>
  );
}
