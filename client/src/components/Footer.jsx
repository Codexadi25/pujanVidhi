import React from 'react';

export default function Footer({ t, onOpenPrivacy, settings, lang = 'hi' }) {
  const isHindi = lang === 'hi';
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
        <a href="#about">{isHindi ? "पूजा परिचय" : "About the Pooja"}</a>
        <a href="#product">{isHindi ? "क्या सम्मिलित है" : "What's Included"}</a>
        <a href="#pricing">{isHindi ? "योजनाएं एवं मूल्य" : "Plans & Pricing"}</a>
        <a href="#faqs">{isHindi ? "प्रश्नोत्तरी (FAQ)" : "FAQs"}</a>
        <a href="#share">{isHindi ? "परिवार के साथ साझा करें" : "Share with Family"}</a>
        <a href={`mailto:${grievanceEmail}`}>{isHindi ? "सहायता संपर्क" : "Contact Support"}</a>
        <a
          href="#privacy"
          onClick={(e) => {
            if (onOpenPrivacy) {
              e.preventDefault();
              onOpenPrivacy();
            }
          }}
        >
          {isHindi ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}
        </a>
      </div>

      <div style={{ marginTop: '16px', fontSize: '12px', color: '#8c6a58' }}>
        {isHindi ? "भक्त सहायता एवं संपर्क:" : "Devotee Support:"} <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ color: '#d9a852', textDecoration: 'underline' }}>{phone}</a> • <a href={`mailto:${email}`} style={{ color: '#d9a852', textDecoration: 'underline' }}>{email}</a>
      </div>

      <small style={{ display: 'block', marginTop: '16px', color: '#9d9693ff' }}>
        {isHindi
          ? "© २०२६ पूजन विधि (PoojanVidhi). सर्वाधिकार सुरक्षित। हर परिवार के पावन उत्सव हेतु श्रद्धापूर्वक समर्पित।"
          : "© 2026 पूजन विधि (PoojanVidhi). All rights reserved. Made with devotion for families everywhere."}
      </small>
    </footer>
  );
}
