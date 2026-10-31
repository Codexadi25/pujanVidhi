import React from 'react';

export default function Footer({ t, onOpenPrivacy }) {
  return (
    <footer className="footer">
      <a className="brand footer-brand" href="#home">
        <span className="brand-mark">ॐ</span>
        <span><strong>पूजनविधि</strong><small>poojanvidhi</small></span>
      </a>
      <p>{t.footer}</p>
      <div className="footer-links">
        <a href="#about">About</a>
        <a href="#faqs">FAQs</a>
        <a href="#share">Share Puja</a>
        <a href="mailto:aditya.sahu2557@gmail.com">Contact</a>
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
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#8c6a58' }}>
        Support: <a href="tel:+919956355567" style={{ color: '#d9a852', textDecoration: 'underline' }}>+91 9956355567</a> • <a href="mailto:aditya.sahu2557@gmail.com" style={{ color: '#d9a852', textDecoration: 'underline' }}>aditya.sahu2557@gmail.com</a>
      </div>
      <small style={{ display: 'block', marginTop: '10px' }}>© 2026 पूजनविधि (PoojanVidhi). All rights reserved.</small>
    </footer>
  );
}
