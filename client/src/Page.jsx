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
import PricingSection from "./components/PricingSection";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import ShareSection from "./components/ShareSection";
import Footer from "./components/Footer";
import { useServerWakeup } from "./hooks/useServerWakeup";
import { api } from "./services/api";
import { trackPageView, trackEvent } from "./utils/analytics";

const BuyPage = lazy(() => import("./components/BuyPage"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));

export default function Page() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("pv_lang") || "hi";
    } catch {
      return "hi";
    }
  });
  const [view, setView] = useState("home"); // "home", "buy", "privacy"
  const [initialKit, setInitialKit] = useState("video_kit");
  const [initialTab, setInitialTab] = useState("signup");
  const [settings, setSettings] = useState({
    supportPhone: '+919956355567',
    supportEmail: 'thepoojanvidhi@gmail.com',
    grievanceEmail: 'aditya.sahu2557@gmail.com',
    grievanceOfficer: 'Aditya Sahu',
    entityName: 'पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)'
  });
  const [prices, setPrices] = useState({ essential: 21, complete: 51 });

  const handleSetLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem("pv_lang", newLang);
    } catch (e) {}
  };

  const t = content[lang] || content.hi;

  // Continuous health heartbeat hook to keep Render warm
  useServerWakeup({ intervalMs: 180000 });

  // Fetch dynamic platform contact & grievance settings and product prices from backend server
  useEffect(() => {
    let isMounted = true;
    api.getSettings()
      .then(res => {
        if (isMounted && res?.settings) {
          setSettings(prev => ({ ...prev, ...res.settings }));
        }
      })
      .catch(err => {
        console.warn('Could not load company settings from server:', err);
      });

    api.getProducts()
      .then(res => {
        if (isMounted && res?.products && Array.isArray(res.products)) {
          const pDigital = res.products.find(p => p.type === 'digital_kit' || (!p.hasVideoAccess && p.isActive));
          const pVideo = res.products.find(p => p.type === 'video_kit' || (p.hasVideoAccess && p.isActive));
          setPrices({
            essential: pDigital?.price || 21,
            complete: pVideo?.price || 51
          });
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname.toLowerCase();

      if (hash === "#buy" || hash === "#purchase" || hash === "#store" || pathname === "/buy") {
        setInitialKit("kit");
        setInitialTab("signup");
        setView("buy");
        window.scrollTo(0, 0);
      } else if (hash === "#buy-video" || hash === "#buy-complete") {
        setInitialKit("video_kit");
        setInitialTab("signup");
        setView("buy");
        window.scrollTo(0, 0);
      } else if (hash === "#login" || hash === "#devotee-login" || pathname === "/login") {
        setInitialTab("login");
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

  useEffect(() => {
    trackPageView(view === 'home' ? '/' : `/${view}`, view === 'home' ? 'Poojan Vidhi Home' : view === 'buy' ? 'Kit Store' : 'Privacy Policy');
  }, [view]);

  const openBuy = (kit = "video_kit", tab = "signup") => {
    trackEvent("cta_click", { kit, tab, location: "homepage" });
    setInitialKit(kit);
    setInitialTab(tab);
    setView("buy");
    window.location.hash = kit === "kit" ? "buy" : "buy-video";
    window.scrollTo(0, 0);
  };

  const openLogin = () => {
    trackEvent("cta_click", { action: "navbar_login", location: "site_header" });
    setInitialTab("login");
    setView("buy");
    window.location.hash = "login";
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
        <BuyPage
          onBackToHome={closeToHome}
          initialKit={initialKit}
          initialTab={initialTab}
          settings={settings}
          lang={lang}
          setLang={handleSetLang}
        />
      </Suspense>
    );
  }

  if (view === "privacy") {
    return (
      <Suspense fallback={suspenseFallback}>
        <PrivacyPolicy
          onBackToHome={closeToHome}
          settings={settings}
          lang={lang}
          setLang={handleSetLang}
        />
      </Suspense>
    );
  }

  return (
    <div className={lang === "hi" ? "app hindi" : "app"}>
      {/* Navigation Header */}
      <Header t={t} lang={lang} setLang={handleSetLang} onOpenBuy={() => openBuy("video_kit")} onOpenLogin={openLogin} />

      <main>
        {/* Section 1: Hero */}
        <Hero t={t} onOpenBuy={() => openBuy("video_kit")} lang={lang} prices={prices} />

        {/* Section 2: Emotional Connection */}
        <FamilyBlessings t={t} />

        {/* Section 3: Problem & Solution */}
        <Problem t={t} lang={lang} />

        {/* Section 4: Product Showcase */}
        <Product t={t} onOpenBuy={(k) => openBuy(k || "kit")} lang={lang} prices={prices} />

        {/* Section 5: How It Works */}
        <Steps t={t} lang={lang} />

        {/* Section 6: Accessibility */}
        <GlobalFamilies t={t} lang={lang} />

        {/* Section 7: Product Preview */}
        <Preview t={t} onOpenBuy={() => openBuy("video_kit")} lang={lang} prices={prices} />

        {/* Section 8: Trust */}
        <Trust t={t} lang={lang} prices={prices} />

        {/* Section 9: Pricing & Purchase */}
        <PricingSection t={t} onOpenBuy={(k) => openBuy(k || "video_kit")} lang={lang} prices={prices} />

        {/* Section 10: Frequently Asked Questions */}
        <FAQ t={t} lang={lang} />

        {/* Section 11: Final Conversion CTA */}
        <FinalCTA t={t} onOpenBuy={() => openBuy("video_kit")} />
      </main>

      {/* Section 12: Social Sharing */}
      <ShareSection />

      {/* Footer */}
      <Footer t={t} onOpenPrivacy={openPrivacy} settings={settings} lang={lang} />

      {/* Mobile Sticky CTA */}
      <button
        className="mobile-sticky-cta"
        style={{ border: 0, width: "100%", cursor: "pointer" }}
        onClick={() => openBuy("video_kit")}
      >
        {t.buy} {`₹${prices.complete}`}
      </button>
    </div>
  );
}
