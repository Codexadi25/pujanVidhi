import React, { useState, useEffect } from 'react';
import {
  FileText,
  Video,
  ListChecks,
  Languages,
  Clock3,
  Smartphone,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { api } from '../services/api';

const actualFeatures = [
  [FileText, "Lakshmi-Ganesh Pooja Vidhi (Complete 16-Step Shodashopachara)", "श्री लक्ष्मी-गणेश पूजन विधि (सम्पूर्ण १६ पावन षोडशोपचार चरण)"],
  [ListChecks, "Exhaustive Samagri Checklist with Kitchen & Household Substitutes", "सामग्री चेकलिस्ट व घरेलू विकल्प (रसोई की आम वस्तुएं)"],
  [Languages, "Sacred Sanskrit Mantras with Simple Hindi & English Meanings", "सरल हिंदी व अंग्रेजी अर्थ सहित पवित्र संस्कृत मंत्र"],
  [FileText, "Illustrated Chowki & Kalash Sthapana Altar Diagram", "चौकी एवं कलश स्थापना का सचित्र पावन आरेख"],
  [Video, "Full HD Step-by-Step Video Walkthrough of Every Stage", "प्रत्येक चरण का फुल एचडी चरण-दर-चरण वीडियो वॉकथ्रू"],
  [Clock3, "Diwali Shubh Muhurat & Sthir Lagna Timing Guidance", "दिवाली शुभ मुहूर्त एवं स्थिर लग्न समय मार्गदर्शन"],
  [CheckCircle2, "Printable Sacred Aarti Sangrah (Lakshmi Mata & Ganesh Ji)", "प्रिंटेबल पवित्र आरती संग्रह (लक्ष्मी माता एवं गणेश जी)"],
  [Smartphone, "Instant Cloud Access on Mobile, Tablet & Laptop (Perpetual)", "मोबाइल, टैबलेट एवं लैपटॉप पर आजीवन तुरंत एक्सेस"]
];

export default function Product({ t, onOpenBuy, lang = 'hi' }) {
  const isHindi = lang === 'hi';
  const [prices, setPrices] = useState({ essential: 21, complete: 121 });

  useEffect(() => {
    let isMounted = true;
    api.getProducts()
      .then(res => {
        if (isMounted && res?.products && Array.isArray(res.products)) {
          const pDigital = res.products.find(p => p.type === 'digital_kit' || (!p.hasVideoAccess && p.isActive));
          const pVideo = res.products.find(p => p.type === 'video_kit' || (p.hasVideoAccess && p.isActive));
          setPrices({
            essential: pDigital?.price || 21,
            complete: pVideo?.price || 121
          });
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="product-section section" id="product">
      <div className="product-visual">
        <div className="book-shadow"/>
        <div className="book-cover">
          <span className="book-top">दीवाली पूजन २०२६</span>
          <span className="book-om">🕉️</span>
          <span className="book-title">श्री लक्ष्मी-गणेश<br/>पूजन विधि</span>
          <span className="book-subtitle">THE DIWALI POOJA GUIDE</span>
          <span className="book-bottom">पारंपरिक विधि • पावन मंत्र • सरल अर्थ</span>
        </div>
        <div className="product-sticker">DIGITAL<br/>GUIDE</div>
      </div>

      <div className="product-copy">
        <span className="section-kicker">{t.productEyebrow}</span>
        <h2>{t.productTitle}</h2>
        <p>{t.productText}</p>

        <h3>{t.included}</h3>
        <ul className="included-list">
          {actualFeatures.map(([Icon, labelEn, labelHi]) => (
            <li key={labelEn}>
              <Icon size={18}/>
              <span>{isHindi ? labelHi : labelEn}</span>
            </li>
          ))}
        </ul>

        <div className="price-row">
          <div>
            <span className="price-placeholder">
              ₹{prices.essential} / ₹{prices.complete}
            </span>
            <small>{isHindi ? "एकमुश्त भुगतान • आजीवन पावन पारिवारिक एक्सेस • कोई मासिक शुल्क नहीं" : "One-time payment • Lifetime sacred family access • No subscription"}</small>
          </div>
          <button
            className="button"
            style={{ cursor: "pointer" }}
            onClick={() => onOpenBuy && onOpenBuy('video_kit')}
          >
            {t.productCTA} <ArrowUpRight size={16}/>
          </button>
        </div>

        <small className="disclaimer">
          {isHindi
            ? "⚡ रेज़रपे द्वारा 100% सुरक्षित चेकआउट (यूपीआई, गूगल पे, कार्ड, नेटबैंकिंग)। भुगतान के तुरंत बाद एक्सेस उपलब्ध।"
            : "⚡ 100% Secure Checkout via Razorpay (UPI, Google Pay, Cards, Netbanking). Instant access unlocked immediately."}
        </small>
      </div>
    </section>
  );
}
