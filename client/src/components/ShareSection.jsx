import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Download,
  ExternalLink,
  MessageCircle,
  Instagram,
  Facebook,
  Sparkles,
  Send
} from 'lucide-react';

export const DIWALI_SHARE_MESSAGE = `🪔✨ इस दीवाली, संपूर्ण विधि-विधान और पावन मंत्रों के साथ करें माँ लक्ष्मी व भगवान श्री गणेश का स्वागत! ✨🪔

माँ लक्ष्मी आपके घर में सुख, शांति और समृद्धि का वास कराएं, और विघ्नहर्ता श्री गणेश आपके जीवन के सभी कष्ट हरें।

पूर्ण दीवाली लक्ष्मी-गणेश पूजन विधि, प्रामाणिक मंत्र, सामग्री सूची और चरण-दर-चरण वीडियो मार्गदर्शन के लिए देखें पूजनविधि:
👉 https://poojanvidhi.web.app

अपने परिवार और प्रियजनों के साथ भी साझा करें ताकि सभी श्रद्धापूर्वक पावन दीवाली पूजन संपन्न कर सकें।
शुभ दीपावली! 🪔🙏`;

export const WEBSITE_URL = "https://poojanvidhi.web.app";
export const POSTER_IMAGE_URL = "/images/diwali-share-ad.jpg";

export default function ShareSection() {
  const [copiedType, setCopiedType] = useState(null); // 'message' | 'link' | null
  const [showInstaGuide, setShowInstaGuide] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const showToast = (type) => {
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 3000);
  };

  const copyToClipboard = async (text, type) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast(type);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: "PoojanVidhi - Diwali Lakshmi-Ganesh Pooja Vidhi",
          text: DIWALI_SHARE_MESSAGE,
          url: WEBSITE_URL,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      copyToClipboard(DIWALI_SHARE_MESSAGE, 'message');
    }
  };

  const shareToWhatsApp = () => {
    const encoded = encodeURIComponent(DIWALI_SHARE_MESSAGE);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const shareToFacebook = () => {
    const encodedUrl = encodeURIComponent(WEBSITE_URL);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  const shareToTelegram = () => {
    const encodedUrl = encodeURIComponent(WEBSITE_URL);
    const encodedText = encodeURIComponent(DIWALI_SHARE_MESSAGE);
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank');
  };

  const downloadPoster = () => {
    const link = document.createElement('a');
    link.href = POSTER_IMAGE_URL;
    link.download = 'PoojanVidhi-Diwali-Invitation.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="section" id="share" style={{ background: "linear-gradient(135deg, #3d1413 0%, #260b0a 100%)", color: "#fff0d9", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        
        <div className="section-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-kicker" style={{ color: "var(--gold)" }}>SPREAD THE BLESSINGS</span>
          <h2 style={{ color: "#fff3db" }}>Bhakti Baantein, Khushiyan Badhaayein!</h2>
          <p style={{ color: "#e3cbbe", maxWidth: "680px", margin: "8px auto 0", fontSize: "15px" }}>
            Share PoojanVidhi with your family, relatives, and friends. Help everyone celebrate Diwali with devotion, clarity, and traditional Pooja guidance.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "36px",
          alignItems: "center"
        }}>
          
          {/* Left Column: Festive Visual & Download */}
          <div style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(217, 168, 82, 0.3)",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(217, 168, 82, 0.2)",
              marginBottom: "16px",
              position: "relative"
            }}>
              <img
                src={POSTER_IMAGE_URL}
                alt="PoojanVidhi Diwali Sacred Share Card"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            <button
              onClick={downloadPoster}
              className="button button-outline"
              style={{
                width: "100%",
                justifyContent: "center",
                gap: "8px",
                borderColor: "var(--gold)",
                color: "var(--gold)",
                cursor: "pointer"
              }}
            >
              <Download size={16}/> Download Greeting Card (Image)
            </button>
          </div>

          {/* Right Column: Instant Share Options */}
          <div>
            <div style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(217, 168, 82, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "1px", color: "var(--gold)", fontWeight: "800", textTransform: "uppercase" }}>
                  🪔 Festive WhatsApp & SMS Invitation
                </span>
                <button
                  onClick={() => copyToClipboard(DIWALI_SHARE_MESSAGE, 'message')}
                  style={{
                    background: "rgba(217, 168, 82, 0.15)",
                    border: "1px solid rgba(217, 168, 82, 0.3)",
                    color: "var(--gold)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px"
                  }}
                >
                  {copiedType === 'message' ? <><Check size={14}/> Copied!</> : <><Copy size={14}/> Copy Text</>}
                </button>
              </div>

              <p style={{
                fontSize: "13px",
                lineHeight: "1.7",
                color: "#e8d6c8",
                maxHeight: "130px",
                overflowY: "auto",
                whiteSpace: "pre-line",
                paddingRight: "8px",
                margin: 0
              }}>
                {DIWALI_SHARE_MESSAGE}
              </p>
            </div>

            {/* Quick Share Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={shareToWhatsApp}
                style={{
                  background: "#25D366",
                  color: "#0a2612",
                  border: "none",
                  padding: "14px 20px",
                  borderRadius: "8px",
                  fontWeight: "800",
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)"
                }}
              >
                <MessageCircle size={20}/> Share PoojanVidhi on WhatsApp
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <button
                  onClick={shareToTelegram}
                  className="button button-outline"
                  style={{ justifyContent: "center", cursor: "pointer", borderColor: "rgba(255,255,255,0.2)" }}
                >
                  <Send size={16}/> Telegram
                </button>
                <button
                  onClick={shareToFacebook}
                  className="button button-outline"
                  style={{ justifyContent: "center", cursor: "pointer", borderColor: "rgba(255,255,255,0.2)" }}
                >
                  <Facebook size={16}/> Facebook
                </button>
              </div>

              <button
                onClick={() => copyToClipboard(WEBSITE_URL, 'link')}
                style={{
                  background: "transparent",
                  border: "1px dashed rgba(217, 168, 82, 0.4)",
                  color: "var(--gold)",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer"
                }}
              >
                {copiedType === 'link' ? <><Check size={16}/> Website Link Copied to Clipboard!</> : <><Copy size={16}/> Copy Website Link (poojanvidhi.web.app)</>}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
