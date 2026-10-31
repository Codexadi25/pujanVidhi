import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import ShareSection from "./components/ShareSection";
import Footer from "./components/Footer";
import { useServerWakeup } from "./hooks/useServerWakeup";

const BuyPage = lazy(() => import("./components/BuyPage"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));

export default function Page() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("home"); // "home", "buy", "privacy"
  const [initialKit, setInitialKit] = useState("video_kit");
  const t = content[lang];

  // 1. Initial Wake-Up: Polls server on first landing until 1 is returned
  // 2. Continuous 3-minute heartbeat: Prevents Render free-tier from idling to sleep
  const { serverReady, isWakingUp } = useServerWakeup({ intervalMs: 180000 });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname.toLowerCase();

      if (hash === "#buy" || hash === "#purchase" || hash === "#store" || pathname === "/buy") {
        setInitialKit("kit");
        setView("buy");
        window.scrollTo(0, 0);
      } else if (hash === "#buy-video" || hash === "#buy-complete") {
        setInitialKit("video_kit");
        setView("buy");
        window.scrollTo(0, 0);
      } else if (hash === "#privacy" || hash === "#policies" || pathname === "/privacy") {
        setView("privacy");
        window.scrollTo(0, 0);
      } else if (hash === "#home" || (hash === "" && pathname !== "/buy" && pathname !== "/privacy")) {
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

  const openPrivacy = () => {
    setView("privacy");
    window.location.hash = "privacy";
    window.scrollTo(0, 0);
  };

  const closeToHome = () => {
    setView("home");
    window.location.hash = "home";
    window.scrollTo(0, 0);
  };

  const suspenseFallback = (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#1a0505", color: "#d9a852" }}>
      <p style={{ fontSize: "16px", fontWeight: "bold" }}>Loading Poojan Vidhi...</p>
    </div>
  );

  if (view === "buy") {
    return (
      <Suspense fallback={suspenseFallback}>
        <BuyPage onBackToHome={closeToHome} initialKit={initialKit} />
      </Suspense>
    );
  }

  if (view === "privacy") {
    return (
      <Suspense fallback={suspenseFallback}>
        <PrivacyPolicy onBackToHome={closeToHome} />
      </Suspense>
    );
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
      <ShareSection />
      <Footer t={t} onOpenPrivacy={openPrivacy} />
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
