import React, { useState, useEffect } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Video, BookOpen, Clock } from 'lucide-react';
import { api } from '../services/api';

export default function PricingSection({ t, onOpenBuy, lang = 'en' }) {
  const [prices, setPrices] = useState({
    essential: 21,
    essentialOrig: 199,
    complete: 121,
    completeOrig: 499
  });

  useEffect(() => {
    let isMounted = true;
    api.getProducts()
      .then(res => {
        if (isMounted && res?.products && Array.isArray(res.products)) {
          const pDigital = res.products.find(p => p.type === 'digital_kit' || (!p.hasVideoAccess && p.isActive));
          const pVideo = res.products.find(p => p.type === 'video_kit' || (p.hasVideoAccess && p.isActive));
          setPrices({
            essential: pDigital?.price || 21,
            essentialOrig: pDigital?.origPrice || 199,
            complete: pVideo?.price || 121,
            completeOrig: pVideo?.origPrice || 499
          });
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const isHindi = lang === 'hi';

  return (
    <section className="section pricing-section" id="pricing" style={{ background: "#fff6e8", padding: "80px 24px" }}>
      <div className="section-heading" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 48px" }}>
        <span className="section-kicker">{t.pricingKicker || "SIMPLE, HONEST PRICING"}</span>
        <h2>{t.pricingTitle}</h2>
        <p style={{ color: "#795f50", fontSize: "15px", marginTop: "8px" }}>
          {t.pricingSub}
        </p>
      </div>

      <div style={{
        maxWidth: "1050px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "28px",
        alignItems: "stretch"
      }}>
        
        {/* PLAN 1: Essential Guide */}
        <div style={{
          background: "#fffaf2",
          border: "1px solid #e7d5be",
          borderRadius: "12px",
          padding: "36px 30px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 4px 20px rgba(53, 18, 14, 0.05)"
        }}>
          <div style={{ marginBottom: "18px" }}>
            <span style={{
              display: "inline-block",
              background: "#eedbc5",
              color: "#5c2a1c",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1.2px",
              padding: "4px 10px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              {isHindi ? "डिजिटल गाइड" : "Digital Text Guide"}
            </span>
            <h3 style={{ fontSize: "24px", color: "var(--maroon)", margin: "12px 0 6px", fontFamily: "var(--serif, Cormorant Garamond, serif)" }}>
              {t.planEssentialTitle || "Essential Guide"}
            </h3>
            <p style={{ fontSize: "13px", color: "#795f50", lineHeight: "1.6" }}>
              {t.planEssentialDesc}
            </p>
          </div>

          <div style={{ margin: "20px 0 24px", paddingBottom: "20px", borderBottom: "1px solid #edd9c2" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontSize: "38px", fontWeight: "800", color: "var(--maroon)", fontFamily: "var(--serif, Cormorant Garamond, serif)" }}>
                ₹{prices.essential}
              </span>
              <span style={{ fontSize: "16px", color: "#a58b6c", textDecoration: "line-through" }}>
                ₹{prices.essentialOrig}
              </span>
              <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>
                {Math.round(((prices.essentialOrig - prices.essential) / prices.essentialOrig) * 100)}% OFF
              </span>
            </div>
            <small style={{ display: "block", color: "#8c6a58", fontSize: "11px", marginTop: "4px" }}>
              {isHindi ? "एकमुश्त भुगतान • तुरंत डिजिटल एक्सेस" : "One-time payment • Instant cloud access"}
            </small>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            {[
              isHindi ? "सम्पूर्ण श्री लक्ष्मी-गणेश पूजन विधि (१६ पावन चरण)" : "Complete Step-by-Step Diwali Lakshmi-Ganesh Vidhi",
              isHindi ? "सामग्री सूची व घरेलू विकल्प (रसोई की आम चीजें)" : "Exhaustive Samagri Checklist with Kitchen Substitutes",
              isHindi ? "सरल हिंदी व अंग्रेजी अर्थ सहित संस्कृत मंत्र" : "Sacred Sanskrit Mantras with Hindi & English Meanings",
              isHindi ? "चौकी एवं कलश स्थापना का सचित्र रेखाचित्र" : "Illustrated Chowki & Kalash Sthapana Altar Diagram",
              isHindi ? "दीवाली शुभ मुहूर्त व पूजन तैयारी निर्देश" : "Diwali Shubh Muhurat & Preparation Guide",
              isHindi ? "मोबाइल, टैबलेट व कंप्यूटर पर आजीवन सुलभ" : "Mobile-Friendly Perpetual Access for Your Family"
            ].map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#54372a" }}>
                <Check size={16} style={{ color: "#16a34a", flexShrink: 0, marginTop: "2px" }}/>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button
            className="button button-outline"
            style={{
              width: "100%",
              justifyContent: "center",
              borderColor: "var(--maroon)",
              color: "var(--maroon)",
              padding: "14px",
              cursor: "pointer"
            }}
            onClick={() => onOpenBuy && onOpenBuy('kit')}
          >
            {t.planEssentialCTA || `Get Essential Guide – ₹${prices.essential}`}
          </button>
        </div>

        {/* PLAN 2: Complete Guide (RECOMMENDED) */}
        <div style={{
          background: "linear-gradient(150deg, #fffcf7 0%, #fff7ec 100%)",
          border: "2px solid var(--gold)",
          borderRadius: "14px",
          padding: "36px 30px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 10px 30px rgba(75, 23, 22, 0.12)"
        }}>
          {/* Badge */}
          <div style={{
            position: "absolute",
            top: "-13px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, #d9a852, #c69a43)",
            color: "#300e08",
            fontSize: "11px",
            fontWeight: "800",
            letterSpacing: "1px",
            padding: "4px 14px",
            borderRadius: "99px",
            boxShadow: "0 3px 10px rgba(217, 168, 82, 0.4)",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            whiteSpace: "nowrap"
          }}>
            <Sparkles size={12}/>
            {t.planCompleteBadge || "RECOMMENDED • MOST POPULAR"}
          </div>

          <div style={{ marginBottom: "18px", marginTop: "4px" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(143, 33, 28, 0.1)",
              color: "var(--red)",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1.2px",
              padding: "4px 10px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              {isHindi ? "वीडियो + डिजिटल किट" : "Video Walkthrough + Kit"}
            </span>
            <h3 style={{ fontSize: "24px", color: "var(--maroon)", margin: "12px 0 6px", fontFamily: "var(--serif, Cormorant Garamond, serif)" }}>
              {t.planCompleteTitle || "Complete Video Guide"}
            </h3>
            <p style={{ fontSize: "13px", color: "#795f50", lineHeight: "1.6" }}>
              {t.planCompleteDesc}
            </p>
          </div>

          <div style={{ margin: "20px 0 24px", paddingBottom: "20px", borderBottom: "1px solid #edd9c2" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontSize: "38px", fontWeight: "800", color: "var(--maroon)", fontFamily: "var(--serif, Cormorant Garamond, serif)" }}>
                ₹{prices.complete}
              </span>
              <span style={{ fontSize: "16px", color: "#a58b6c", textDecoration: "line-through" }}>
                ₹{prices.completeOrig}
              </span>
              <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>
                {Math.round(((prices.completeOrig - prices.complete) / prices.completeOrig) * 100)}% OFF
              </span>
            </div>
            <small style={{ display: "block", color: "#8c6a58", fontSize: "11px", marginTop: "4px" }}>
              {isHindi ? "एकमुश्त भुगतान • सम्पूर्ण वीडियो + पावन किट" : "One-time payment • Full HD Video + Sacred Kit"}
            </small>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            {[
              isHindi ? "एसेंशियल गाइड की सभी सामग्रियां सम्मिलित" : "Everything included in the Essential Guide",
              isHindi ? "पूजन के प्रत्येक चरण का फुल एचडी वीडियो वॉकथ्रू" : "Full HD Step-by-Step Video Walkthrough of Every Ritual",
              isHindi ? "शुद्ध संस्कृत मंत्रोच्चार हेतु ऑडियो मार्गदर्शन" : "Authentic Audio Guide for Accurate Sanskrit Mantra Chanting",
              isHindi ? "प्रिंट करने योग्य पावन आरती संग्रह (महालक्ष्मी व गणेश जी)" : "Printable Sacred Aarti Sangrah (Lakshmi Mata & Ganesh Ji)",
              isHindi ? "पारिवारिक संकल्प व १४ दीपदान शुभ परंपरा निर्देश" : "Family Sankalp & 14 Deepdaan Auspicious Lighting Guide",
              isHindi ? "प्राथमिकता व्हाट्सएप व ईमेल सहायता" : "Priority Devotee Assistance via WhatsApp & Email"
            ].map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#422417", fontWeight: i < 3 ? "600" : "normal" }}>
                <Check size={16} style={{ color: "#d9a852", flexShrink: 0, marginTop: "2px" }}/>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button
            className="button"
            style={{
              width: "100%",
              justifyContent: "center",
              background: "var(--red)",
              color: "#fff8ed",
              padding: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(143, 33, 28, 0.25)"
            }}
            onClick={() => onOpenBuy && onOpenBuy('video_kit')}
          >
            {t.planCompleteCTA || `Get Complete Guide – ₹${prices.complete}`} <ArrowRight size={16}/>
          </button>
        </div>

      </div>

      <div style={{ textAlign: "center", marginTop: "32px", color: "#8c6a58", fontSize: "12px" }}>
        🔒 100% Secure Checkout powered by Razorpay • Instant Digital Unlock • Dedicated Devotee Support
      </div>
    </section>
  );
}
