import React, { useState, useEffect } from 'react';
import { FileText, Video, ListChecks, Languages, Clock3, Smartphone, ArrowUpRight } from "lucide-react";
import { api } from '../services/api';

const items = [
  [FileText, "Downloadable Puja Vidhi PDF"],
  [ListChecks, "Puja Samagri checklist"],
  [BookTextIcon, "Mantras and meanings"],
  [Video, "Step-by-Step Walkthrough Video Included"],
  [Clock3, "Muhurat information, if included"],
  [Smartphone, "Mobile-friendly access"]
];
function BookTextIcon(props) { return <FileText {...props}/>; }

export default function Product({ t, onOpenBuy }) {
  const [priceRange, setPriceRange] = useState('₹21 / ₹51');

  useEffect(() => {
    let isMounted = true;
    api.getProducts()
      .then(res => {
        if (isMounted && res?.products && Array.isArray(res.products) && res.products.length > 0) {
          const active = res.products.filter(p => p.isActive);
          if (active.length > 0) {
            const prices = active.map(p => p.price).sort((a, b) => a - b);
            if (prices.length === 1) {
              setPriceRange(`₹${prices[0]}`);
            } else {
              setPriceRange(`₹${prices[0]} / ₹${prices[prices.length - 1]}`);
            }
          }
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
          <span className="book-top">पूजनविधि • 2026</span>
          <span className="book-om">ॐ</span>
          <span className="book-title">श्री लक्ष्मी-गणेश<br/>पूजन विधि</span>
          <span className="book-subtitle">THE DIWALI PUJA GUIDE</span>
          <span className="book-bottom">श्रद्धा • परंपरा • मंगलकामना</span>
        </div>
        <div className="product-sticker">DIGITAL<br/>EDITION</div>
      </div>
      <div className="product-copy">
        <span className="section-kicker">{t.productEyebrow}</span>
        <h2>{t.productTitle}</h2>
        <p>{t.productText}</p>
        <h3>{t.included}</h3>
        <ul className="included-list">
          {items.map(([Icon, label]) => <li key={label}><Icon size={19}/>{label}</li>)}
        </ul>
        <div className="price-row">
          <div>
            <span className="price-placeholder">Special {priceRange}</span>
            <small>One-time payment • Lifetime sacred access</small>
          </div>
          <button className="button" style={{ cursor: "pointer" }} onClick={() => onOpenBuy && onOpenBuy('video_kit')}>
            Get the Kit <ArrowUpRight size={16}/>
          </button>
        </div>
        <small className="disclaimer">Instant online access granted immediately upon confirmation.</small>
      </div>
    </section>
  );
}
