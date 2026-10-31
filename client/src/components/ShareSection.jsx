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

export const DIWALI_SHARE_MESSAGE = `🪔✨ This Diwali, Make Your Pooja Special with PoojanVidhi! ✨🪔
May this Diwali bring happiness, prosperity, good health and endless blessings to you and your family. 🙏
Make your Diwali Pooja more meaningful and auspicious with the right Vidhi, mantras and step-by-step guidance.
🌸 Perform your Pooja with devotion.
🪔 Follow the traditional rituals with confidence.
🙏 Welcome Maa Lakshmi and Lord Ganesha's blessings into your home.
Let this Diwali be the beginning of new hopes, success and prosperity!
🌐 Visit PoojanVidhi:
https://PoojanVidhi.web.app
✨ Share with your loved ones and celebrate a blessed Diwali!
शुभ दीपावली! जय माता लक्ष्मी! 🙏`;

export const WEBSITE_URL = "https://PoojanVidhi.web.app";
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
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadPoster = () => {
    const link = document.createElement('a');
    link.href = POSTER_IMAGE_URL;
    link.download = 'PoojanVidhi-Diwali-Blessings.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp Chat Share
  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(DIWALI_SHARE_MESSAGE);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // Facebook Share
  const handleFacebookShare = () => {
    const encodedUrl = encodeURIComponent(WEBSITE_URL);
    const encodedQuote = encodeURIComponent(DIWALI_SHARE_MESSAGE);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedQuote}`,
      '_blank',
      'noopener,noreferrer,width=600,height=550'
    );
  };

  // Native Web Share API (Triggers WhatsApp Status, Instagram Stories, System Apps on Mobile)
  const handleNativeShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        let shareData = {
          title: 'PoojanVidhi - Sacred Diwali Pooja Guide',
          text: DIWALI_SHARE_MESSAGE,
          url: WEBSITE_URL,
        };

        // Try attaching poster image if supported by browser
        try {
          const res = await fetch(POSTER_IMAGE_URL);
          const blob = await res.blob();
          const file = new File([blob], 'poojanvidhi-diwali.jpg', { type: 'image/jpeg' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            shareData = {
              files: [file],
              title: 'PoojanVidhi - Sacred Diwali Pooja Guide',
              text: DIWALI_SHARE_MESSAGE,
            };
          }
        } catch (e) {
          console.warn('File share attachment skipped, sharing text & link', e);
        }

        await navigator.share(shareData);
      } else {
        // Fallback if desktop or unsupported
        copyToClipboard(DIWALI_SHARE_MESSAGE, 'message');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share action failed', err);
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Instagram Sharing Flow:
  // 1. If mobile and navigator.share with files is supported, try native share (which opens Instagram Stories/Direct).
  // 2. Otherwise, auto-copy the caption, trigger the image download, and guide user to Instagram.
  const handleInstagramShare = async () => {
    // Attempt native share if available
    if (navigator.share) {
      try {
        const res = await fetch(POSTER_IMAGE_URL);
        const blob = await res.blob();
        const file = new File([blob], 'poojanvidhi-diwali.jpg', { type: 'image/jpeg' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            text: DIWALI_SHARE_MESSAGE,
            title: 'PoojanVidhi Diwali Puja',
          });
          return;
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: Copy caption & prompt user to post on Instagram
    copyToClipboard(DIWALI_SHARE_MESSAGE, 'message');
    setShowInstaGuide(true);
  };

  return (
    <section
      id="share"
      className="share-section"
      style={{
        background: 'linear-gradient(180deg, #1f0b08 0%, #2b0e0c 50%, #170705 100%)',
        borderTop: '1px solid rgba(217, 168, 82, 0.3)',
        borderBottom: '1px solid rgba(217, 168, 82, 0.3)',
        padding: '60px 20px',
        color: '#fbf4ea',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(ellipse at center, rgba(217, 168, 82, 0.18) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(217, 168, 82, 0.15)',
              border: '1px solid rgba(217, 168, 82, 0.4)',
              color: '#d9a852',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={16} /> शुभ दीपावली शुभकामनाएँ एवं पूजन विधि
          </div>
          <h2
            style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: '#fbe2aa',
              margin: '8px 0 12px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Share the Divine Blessings
          </h2>
          <p
            style={{
              color: '#d3b7a5',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Spread the light of auspicious Lakshmi-Ganesh Puja with your family, friends, and community across WhatsApp, Instagram, Facebook, and WhatsApp Status.
          </p>
        </div>

        {/* Content Grid: Poster Preview + Message & Share Actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Column 1: Advertisement Poster Card */}
          <div
            style={{
              background: 'rgba(38, 14, 12, 0.85)',
              border: '1px solid rgba(217, 168, 82, 0.35)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
            }}
          >
            <div
              style={{
                width: '100%',
                maxHeight: '440px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid rgba(217, 168, 82, 0.5)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                background: '#120404',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '18px',
              }}
            >
              <img
                src={POSTER_IMAGE_URL}
                alt="PoojanVidhi Diwali Puja Advertisement"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>

            <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
              <button
                onClick={handleDownloadPoster}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  background: 'linear-gradient(135deg, #d9a852 0%, #b8860b 100%)',
                  color: '#1a0505',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(217, 168, 82, 0.3)',
                  transition: 'transform 0.15s ease, filter 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
              >
                <Download size={17} /> Download Puja Poster
              </button>
            </div>
            <small style={{ marginTop: '8px', color: '#a5826b', fontSize: '11px', textAlign: 'center' }}>
              High-resolution festive poster featuring Maa Lakshmi & Lord Ganesh
            </small>
          </div>

          {/* Column 2: Message & Share Actions */}
          <div
            style={{
              background: 'rgba(38, 14, 12, 0.85)',
              border: '1px solid rgba(217, 168, 82, 0.35)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    color: '#d9a852',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Festive Greeting Message
                </span>
                <button
                  onClick={() => copyToClipboard(DIWALI_SHARE_MESSAGE, 'message')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: copiedType === 'message' ? '#1b5e20' : 'rgba(217, 168, 82, 0.15)',
                    border: '1px solid rgba(217, 168, 82, 0.4)',
                    color: copiedType === 'message' ? '#a5d6a7' : '#fbe2aa',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {copiedType === 'message' ? (
                    <>
                      <Check size={14} /> Message Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Message
                    </>
                  )}
                </button>
              </div>

              {/* Message Box */}
              <div
                style={{
                  background: '#190605',
                  border: '1px solid rgba(217, 168, 82, 0.25)',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '13px',
                  lineHeight: '1.65',
                  color: '#e4cbbd',
                  whiteSpace: 'pre-line',
                  maxHeight: '230px',
                  overflowY: 'auto',
                  fontFamily: 'inherit',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
                }}
              >
                {DIWALI_SHARE_MESSAGE}
              </div>
            </div>

            {/* Sharing Platform Buttons */}
            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: '#d3b7a5',
                  marginBottom: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                Share Instantly Via:
              </div>

              {/* Grid of buttons */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                {/* 1. WhatsApp Button */}
                <button
                  onClick={handleWhatsAppShare}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 14px',
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <MessageCircle size={17} /> WhatsApp
                </button>

                {/* 2. WhatsApp Status & Stories (Web Share API) */}
                <button
                  onClick={handleNativeShare}
                  disabled={isSharing}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 14px',
                    background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(18, 140, 126, 0.3)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  title="Share to WhatsApp Status, Instagram, or device apps"
                >
                  <Share2 size={17} /> Status / Apps
                </button>

                {/* 3. Instagram Button */}
                <button
                  onClick={handleInstagramShare}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 14px',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(220, 39, 67, 0.35)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Instagram size={17} /> Instagram
                </button>

                {/* 4. Facebook Button */}
                <button
                  onClick={handleFacebookShare}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 14px',
                    background: '#1877F2',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Facebook size={17} /> Facebook
                </button>
              </div>

              {/* Utility Row: Copy Website Link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px dashed rgba(217, 168, 82, 0.35)',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              >
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#d9a852', marginRight: '8px' }}>
                  🔗 {WEBSITE_URL}
                </div>
                <button
                  onClick={() => copyToClipboard(WEBSITE_URL, 'link')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: copiedType === 'link' ? '#1b5e20' : 'rgba(217, 168, 82, 0.2)',
                    border: '1px solid rgba(217, 168, 82, 0.5)',
                    color: copiedType === 'link' ? '#a5d6a7' : '#fbe2aa',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {copiedType === 'link' ? (
                    <>
                      <Check size={13} /> Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Guide Popup / Modal Banner */}
        {showInstaGuide && (
          <div
            style={{
              marginTop: '24px',
              padding: '18px 24px',
              background: 'linear-gradient(135deg, rgba(80, 20, 20, 0.95) 0%, rgba(40, 10, 10, 0.95) 100%)',
              border: '1px solid #d9a852',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbe2aa', fontWeight: 700, marginBottom: '6px' }}>
                <Instagram size={18} style={{ color: '#e6683c' }} />
                <span>Sharing on Instagram (Story or Post)</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#e4cbbd', lineHeight: '1.5' }}>
                ✓ Caption copied to clipboard! Save the poster image, open Instagram, and paste the caption in your Story or Post.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadPoster}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: '#d9a852',
                  color: '#1a0505',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Download size={14} /> Download Image
              </button>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={14} /> Open Instagram
              </a>
              <button
                onClick={() => setShowInstaGuide(false)}
                style={{
                  padding: '8px 12px',
                  background: 'transparent',
                  color: '#a5826b',
                  border: '1px solid rgba(217, 168, 82, 0.3)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

