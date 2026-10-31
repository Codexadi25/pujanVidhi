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
  [FileText, "Lakshmi-Ganesh Pooja Vidhi (Complete 16-Step Shodashopachara)"],
  [ListChecks, "Exhaustive Samagri Checklist with Kitchen & Household Substitutes"],
  [Languages, "Sacred Sanskrit Mantras with Simple Hindi & English Meanings"],
  [FileText, "Illustrated Chowki & Kalash Sthapana Altar Diagram"],
  [Video, "Full HD Step-by-Step Video Walkthrough of Every Stage"],
  [Clock3, "Diwali Shubh Muhurat & Sthir Lagna Timing Guidance"],
  [CheckCircle2, "Printable Sacred Aarti Sangrah (Lakshmi Mata & Ganesh Ji)"],
  [Smartphone, "Instant Cloud Access on Mobile, Tablet & Laptop (Perpetual)"]
];

export default function Product({ t, onOpenBuy }) {
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
          {actualFeatures.map(([Icon, label]) => (
            <li key={label}>
              <Icon size={18}/>
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className="price-row">
          <div>
            <span className="price-placeholder">
              ₹{prices.essential} / ₹{prices.complete}
            </span>
            <small>One-time payment • Lifetime sacred family access • No subscription</small>
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
          ⚡ 100% Secure Checkout via Razorpay (UPI, Google Pay, Cards, Netbanking). Instant access unlocked immediately.
        </small>
      </div>
    </section>
  );
}
