import React, { useState, useEffect } from 'react';
import { content } from "./data/content";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FamilyBlessings from "./components/FamilyBlessings";
import Problem from "./components/Problem";
import Product from "./components/Product";
import Steps from "./components/Steps";
import GlobalFamilies from "./components/GlobalFamilies";
import Preview from "./components/Preview";
import Trust from "./components/Trust";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import BuyPage from "./components/BuyPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import { useServerWakeup } from "./hooks/useServerWakeup";

export default function Page() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("home"); // "home", "buy", "admin"
  const [initialKit, setInitialKit] = useState("video_kit");
  const t = content[lang];

  // 1. Initial Wake-Up: Polls server on first landing until 1 is returned
  // 2. Continuous 3-minute heartbeat: Prevents Render free-tier from idling to sleep
  const { serverReady, isWakingUp } = useServerWakeup({ intervalMs: 180000 });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname.toLowerCase();

      if (hash === "#admin" || pathname === "/admin" || pathname.startsWith("/admin")) {
        setView("admin");
        window.scrollTo(0, 0);
      } else if (hash === "#buy" || hash === "#purchase" || hash === "#store" || pathname === "/buy") {
        setInitialKit("kit");
        setView("buy");
        window.scrollTo(0, 0);
      } else if (hash === "#buy-video" || hash === "#buy-complete") {
        setInitialKit("video_kit");
        setView("buy");
        window.scrollTo(0, 0);
      } else if (hash === "#home" || (hash === "" && pathname !== "/admin" && pathname !== "/buy")) {
        if (view !== "home") setView("home");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [view]);

  const openBuy = (kit = "video_kit") => {
    setInitialKit(kit);
    setView("buy");
    window.location.hash = kit === "kit" ? "buy" : "buy-video";
    window.scrollTo(0, 0);
  };

  const closeToHome = () => {
    setView("home");
    window.location.hash = "home";
    window.scrollTo(0, 0);
  };

  if (view === "admin") {
    return <AdminDashboard onBackToStore={closeToHome} />;
  }

  if (view === "buy") {
    return <BuyPage onBackToHome={closeToHome} initialKit={initialKit} />;
  }

  return (
    <div className={lang === "hi" ? "app hindi" : "app"}>
      <Header t={t} lang={lang} setLang={setLang} onOpenBuy={() => openBuy("video_kit")} />
      <main>
        <Hero t={t} onOpenBuy={() => openBuy("video_kit")} />
        <FamilyBlessings t={t} />
        <Problem t={t} />
        <Product t={t} onOpenBuy={(k) => openBuy(k || "kit")} />
        <Steps t={t} />
        <GlobalFamilies t={t} />
        <Preview t={t} onOpenBuy={() => openBuy("video_kit")} />
        <Trust t={t} />
        <FAQ t={t} />
        <FinalCTA t={t} onOpenBuy={() => openBuy("video_kit")} />
      </main>
      <Footer t={t} />
      <div style={{ textAlign: "center", padding: "10px", background: "#240b0a", fontSize: "11px", color: "#a5826b" }}>
        <a href="#admin" style={{ color: "#d9a852", textDecoration: "underline" }}>
          ⚙️ Admin Control Panel (MVC Server Modules)
        </a>
      </div>
      <button
        className="mobile-sticky-cta"
        style={{ border: 0, width: "100%", cursor: "pointer" }}
        onClick={() => openBuy("video_kit")}
      >
        {t.buy}
      </button>
    </div>
  );
}
