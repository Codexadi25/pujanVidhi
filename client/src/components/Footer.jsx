import React from 'react';
export default function Footer({ t }) {
  return (
    <footer className="footer">
      <a className="brand footer-brand" href="#home"><span className="brand-mark">ॐ</span><span><strong>पूजनविधि</strong><small>poojanvidhi</small></span></a>
      <p>{t.footer}</p>
      <div className="footer-links"><a href="#about">About</a><a href="#faqs">FAQs</a><a href="mailto:hello@poojanvidhi.com">Contact</a><a href="#policies">Privacy & Policies</a></div>
      <small>© 2026 poojanvidhi. All rights reserved.</small>
    </footer>
  );
}
