import { logEvent as fbLogEvent } from "firebase/analytics";
import { analytics } from "../Firebase";

/**
 * Universal Analytics Tracking Utility
 * Dispatches events simultaneously to Google Analytics (gtag.js) and Firebase Analytics.
 */

export const trackEvent = (eventName, params = {}) => {
  try {
    // 1. Google Analytics (gtag.js)
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }

    // 2. Firebase Analytics
    if (analytics) {
      fbLogEvent(analytics, eventName, params);
    }
  } catch (err) {
    console.debug("[Analytics] Event tracking error:", eventName, err);
  }
};

export const trackPageView = (pagePath, pageTitle) => {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: typeof window !== "undefined" ? window.location.href : ""
  });
};

export const trackKitSelect = (kitId, kitName, price) => {
  trackEvent("select_item", {
    item_list_id: "diwali_kits_2026",
    item_list_name: "Diwali Auspicious Kits",
    items: [
      {
        item_id: kitId,
        item_name: kitName,
        price: price,
        currency: "INR"
      }
    ]
  });
};

export const trackBeginCheckout = (kitId, kitName, price) => {
  trackEvent("begin_checkout", {
    currency: "INR",
    value: price,
    items: [
      {
        item_id: kitId,
        item_name: kitName,
        price: price
      }
    ]
  });
};

export const trackPurchase = ({ orderId, paymentId, amount, plan, kitName }) => {
  trackEvent("purchase", {
    transaction_id: paymentId || orderId,
    value: amount,
    currency: "INR",
    tax: 0,
    shipping: 0,
    items: [
      {
        item_id: plan,
        item_name: kitName || (plan === "video_kit" ? "Complete Video Kit" : "Poojan Vidhi Kit"),
        price: amount,
        quantity: 1
      }
    ]
  });
};

export const trackDownloadPdf = (kalyanamId, plan) => {
  trackEvent("download_pdf", {
    file_name: "Diwali_Puja_Vidhi_Hindi.pdf",
    file_type: "pdf",
    kalyanam_id: kalyanamId,
    plan: plan || "kit"
  });
};

export const trackVideoPlay = (title) => {
  trackEvent("video_start", {
    video_title: title || "Diwali Lakshmi Ganesh Puja Walkthrough",
    video_provider: "PoojanVidhi Server"
  });
};

export const trackShare = (platform) => {
  trackEvent("share", {
    method: platform,
    content_type: "diwali_greeting"
  });
};

