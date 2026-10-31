import React from 'react';

export default function Footer({ t, onOpenPrivacy }) {
  return (
    <footer className="footer">
      <a className="brand footer-brand" href="#home">
        <span className="brand-mark">🕉️</span>
        <span>
          <strong>पूजन विधि</strong>
          <small>PoojanVidhi</small>
        </span>
      </a>

      <p>{t.footer}</p>

      <div className="footer-links">
        <a href="#about">About the Pooja</a>
        <a href="#product">What's Included</a>
        <a href="#pricing">Plans & Pricing</a>
        <a href="#faqs">FAQs</a>
        <a href="#share">Share with Family</a>
        <a href="mailto:aditya.sahu2557@gmail.com">Contact Support</a>
        <a
          href="#privacy"
          onClick={(e) => {
            if (onOpenPrivacy) {
              e.preventDefault();
              onOpenPrivacy();
            }
          }}
        >
          Privacy Policy
        </a>
      </div>

      <div style={{ marginTop: '16px', fontSize: '12px', color: '#8c6a58' }}>
        Devotee Support: <a href="tel:+919956355567" style={{ color: '#d9a852', textDecoration: 'underline' }}>+91 9956355567</a> • <a href="mailto:aditya.sahu2557@gmail.com" style={{ color: '#d9a852', textDecoration: 'underline' }}>aditya.sahu2557@gmail.com</a>
      </div>

      <small style={{ display: 'block', marginTop: '14px', color: '#6d4e3f' }}>
        © 2026 पूजन विधि (PoojanVidhi). All rights reserved. Made with devotion for families everywhere.
      </small>
    </footer>
  );
}
