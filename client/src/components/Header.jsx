import React, { useState } from 'react';
import { Menu, X, Languages, LogIn } from "lucide-react";

export default function Header({ t, lang, setLang, onOpenBuy, onOpenLogin }) {
  const [open, setOpen] = useState(false);
  const ids = ["home", "about", "product", "steps", "pricing", "faqs"];

  const handleLoginClick = () => {
    setOpen(false);
    if (onOpenLogin) {
      onOpenLogin();
    } else if (onOpenBuy) {
      onOpenBuy('video_kit', 'login');
    }
  };

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
        <button
          className="mobile-login-link"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--gold, #d4af37)',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 0',
            cursor: 'pointer',
            textAlign: 'left'
          }}
          onClick={handleLoginClick}
        >
          <LogIn size={18} />
          <span>{lang === "en" ? "Devotee Login" : "भक्त लॉगिन"}</span>
        </button>
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
          className="login-header-btn"
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(217, 168, 82, 0.12)",
            border: "1px solid rgba(217, 168, 82, 0.4)",
            color: "var(--gold-light, #f8dfa5)",
            padding: "8px 14px",
            borderRadius: "6px",
            fontSize: "0.88rem",
            fontWeight: "600",
            transition: "all 0.2s ease"
          }}
          onClick={handleLoginClick}
          title={lang === "en" ? "Access Already Purchased Puja Vidhi" : "पहला खरीदा हुआ पूजा विधान देखें"}
        >
          <LogIn size={15}/>
          <span>{lang === "en" ? "Login" : "लॉगिन"}</span>
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
