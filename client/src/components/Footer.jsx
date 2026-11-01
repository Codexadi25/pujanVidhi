import React from 'react';

export default function Footer({ t, onOpenPrivacy, settings }) {
  const phone = settings?.supportPhone || '+91 9956355567';
  const email = settings?.supportEmail || 'thepoojanvidhi@gmail.com';
  const grievanceEmail = settings?.grievanceEmail || 'aditya.sahu2557@gmail.com';

  return (
    <footer className="footer">
      <a className="brand footer-brand" href="#home">
        <img src="/images/PoojanVidhi_Logo.jpeg" alt="PoojanVidhi" className="brand-logo-img" />
        <span>
          <strong>पूजन विधि</strong>
          <small>PoojanVidhi</small>
        </span>
      </a>

      <p>{t.footer}</p>

      <div className="footer-links">
        <a href="#about">About the Pooja</a>
        <a href="#product">What's Included</a>
        <a href="#pricing">Plans &amp; Pricing</a>
        <a href="#faqs">FAQs</a>
        <a href="#share">Share with Family</a>
        <a href={`mailto:${grievanceEmail}`}>Contact Support</a>
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
        Devotee Support: <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ color: '#d9a852', textDecoration: 'underline' }}>{phone}</a> • <a href={`mailto:${email}`} style={{ color: '#d9a852', textDecoration: 'underline' }}>{email}</a>
      </div>

      <small style={{ display: 'block', marginTop: '16px', color: '#9d9693ff' }}>
        © 2026 पूजन विधि (PoojanVidhi). All rights reserved. Made with devotion for families everywhere.
      </small>
    </footer>
  );
}
