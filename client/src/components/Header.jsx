import React from 'react';
import { useState } from "react";
import { Menu, X, Languages } from "lucide-react";

export default function Header({ t, lang, setLang, onOpenBuy }) {
  const [open, setOpen] = useState(false);
  const ids = ["home", "about", "included", "steps", "faqs"];
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="poojanvidhi home">
        <span className="brand-mark">ॐ</span>
        <span><strong>पूजनविधि</strong><small>poojanvidhi</small></span>
      </a>
      <nav className={open ? "nav nav-open" : "nav"}>
        {t.nav.map((item, i) => <a key={item} href={`#${ids[i]}`} onClick={() => setOpen(false)}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <button className="language-switch" onClick={() => setLang(lang === "en" ? "hi" : "en")} aria-label="Switch language">
          <Languages size={16}/><span>{lang === "en" ? "हिन्दी" : "English"}</span>
        </button>
        <button
          className="button button-small"
          style={{ cursor: "pointer" }}
          onClick={onOpenBuy}
        >
          {t.buy}
        </button>
      </div>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X/> : <Menu/>}
      </button>
    </header>
  );
}
