import React, { useState } from 'react';
import { Menu, X, Languages } from "lucide-react";

export default function Header({ t, lang, setLang, onOpenBuy }) {
  const [open, setOpen] = useState(false);
  const ids = ["home", "about", "product", "steps", "pricing", "faqs"];

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="PoojanVidhi Home">
        <img src="/images/PoojanVidhi_Logo.jpeg" alt="PoojanVidhi" className="brand-logo-img" />
        <span>
          <strong>पूजन विधि</strong>
          <small>PoojanVidhi</small>
        </span>
      </a>

      <nav className={open ? "nav nav-open" : "nav"}>
        {t.nav.map((item, i) => (
          <a
            key={item}
            href={`#${ids[i] || ids[0]}`}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="language-switch"
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          aria-label="Switch language"
          title="Switch Language / भाषा बदलें"
        >
          <Languages size={16}/>
          <span>{lang === "en" ? "हिंदी" : "English"}</span>
        </button>

        <button
          className="button button-small"
          style={{ cursor: "pointer" }}
          onClick={() => onOpenBuy && onOpenBuy('video_kit')}
        >
          {t.buy}
        </button>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={22}/> : <Menu size={22}/>}
      </button>
    </header>
  );
}
