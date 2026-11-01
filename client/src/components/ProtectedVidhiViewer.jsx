import React, { useState, useRef } from 'react';
import {
  ShieldAlert, Lock, Video, ArrowLeft, Sparkles, BookOpen, LogOut, EyeOff,
  Download, FileText
} from 'lucide-react';
import { api, authStorage } from '../services/api';
import { useContentProtection } from '../hooks/useContentProtection';
import { trackEvent } from '../utils/analytics';
import WatermarkOverlay from './WatermarkOverlay';

/**
 * Advanced Content Protection Document Viewer for Kalyanam Puja Documents
 * 
 * Implements a multi-layered defense-in-depth protection architecture:
 * 1. Authenticated Server-Side Delivery (JWT verified, paid user access verification)
 * 2. Dynamic Personalized Watermarking (repeating diagonal identity stamps: {{NAME}} | Kalyanam ID: {{KID}})
 * 3. Copy, Cut, Selection, and Drag Prevention (strictly scoped to document)
 * 4. Screen Obscuration on window blur and tab switching
 * 5. Print & PDF Export Restriction (print-specific CSS hides sacred contents and shows restriction notice)
 * 6. Responsive layout preserving existing classes (.wm, .en, .hi, .meta, .tip, .ill, .end)
 */
export default function ProtectedVidhiViewer({ user, contentData, onBack, onRefresh, onLogout }) {
  const [activeTab, setActiveTab] = useState('hi'); // 'hi' or 'en'
  const containerRef = useRef(null);

  const userName = user?.name || contentData?.name || 'Bhakt';
  const kalyanamId = user?.kalyanamId || contentData?.kalyanamId || 'KLY-MEMBER';

  // Advanced content protection hook (anti-copy, hotkey deterrent, tab-switch blur, print interception)
  const { toast, isObscured, setIsObscured } = useContentProtection({
    containerRef,
    userName,
    kalyanamId
  });

  const hasVideo = contentData?.hasVideoAccess || user?.hasVideoAccess || user?.plan === 'video_kit';
  const rawHtml = contentData?.html || '';
  const token = authStorage.getToken();

  const getApiUrl = (endpoint) => {
    if (import.meta.env?.VITE_API_URL) {
      return import.meta.env.VITE_API_URL.replace(/\/$/, '') + '/api/v1' + endpoint;
    }
    if (typeof window !== 'undefined' && window.location.port === '5173') {
      return `http://localhost:5000/api/v1${endpoint}`;
    }
    return `/api/v1${endpoint}`;
  };

  const videoSrc = getApiUrl(`/content/video?token=${encodeURIComponent(token)}`);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = () => {
    try {
      setDownloading(true);
      trackEvent('download_pdf', { format: 'pdf', title: 'Diwali_Puja_Vidhi_Hindi' });
      const downloadUrl = api.getPdfDownloadUrl(token);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'Diwali_Puja_Vidhi_Hindi.pdf');
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert('Could not start download. Please try again.');
    } finally {
      setTimeout(() => setDownloading(false), 2000);
    }
  };

  return (
    <div className="protected-viewer-root" ref={containerRef}>
      {/* Scoped CSS for Content Protection and Print Restrictions */}
      <style>{`
        /* 1. Selection & Drag Prevention */
        .protected-viewer-root {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          touch-action: pan-y !important;
        }

        .protected-viewer-root img,
        .protected-viewer-root svg,
        .protected-viewer-root video {
          -webkit-user-drag: none !important;
          user-drag: none !important;
          pointer-events: auto;
        }

        /* 2. Print & PDF Export Protection - Scoped strictly to this viewer */
        @media print {
          /* Hide normal sacred content when user attempts browser print / save-as-pdf */
          .viewer-container,
          .video-access-card,
          .protected-html-body,
          .viewer-header,
          .security-toast,
          .reader-toolbar {
            display: none !important;
            visibility: hidden !important;
          }

          /* Display print restriction notice */
          .print-restriction-notice {
            display: block !important;
            visibility: visible !important;
            position: fixed !important;
            top: 25% !important;
            left: 8% !important;
            right: 8% !important;
            padding: 30px !important;
            border: 2px dashed #8f211c !important;
            background: #fff9f5 !important;
            text-align: center !important;
            color: #8f211c !important;
            font-family: 'Cormorant Garamond', serif !important;
          }

          .print-restriction-notice h2 {
            font-size: 24pt !important;
            margin-bottom: 12pt !important;
            color: #8f211c !important;
          }

          .print-restriction-notice p {
            font-size: 14pt !important;
            color: #38231b !important;
            line-height: 1.5 !important;
          }
        }

        @media screen {
          .print-restriction-notice {
            display: none !important;
          }
        }

        .viewer-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(143, 33, 28, 0.12);
          border: 1px solid rgba(143, 33, 28, 0.3);
          color: #8f211c;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          margin-left: 12px;
        }
        .viewer-logout-btn:hover {
          background: #8f211c;
          color: #ffffff;
        }
      `}</style>

      {/* Floating Security Alert Toast */}
      {toast && (
        <div className="security-toast" role="alert">
          <ShieldAlert size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Screen Shield Overlay: Activated on tab-switch or window blur to deter screen capture utilities */}
      {isObscured && (
        <div
          className="screen-shield-overlay"
          onClick={() => setIsObscured(false)}
          title="Click to resume"
        >
          <div className="shield-card">
            <Lock size={44} className="shield-icon" />
            <h3>🔒 Sacred Content Protected</h3>
            <p>Screen capture, snipping, and background recording are restricted.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
              <EyeOff size={16} />
              <small>Click anywhere in this window to resume your Puja Vidhi.</small>
            </div>
          </div>
        </div>
      )}

      {/* Print Restriction Notice (Rendered only during print preview / print workflow) */}
      <div className="print-restriction-notice" aria-hidden="true">
        <h2>🔒 Protected Kalyanam Sacred Document</h2>
        <p>
          Printing, screen-printing, and PDF exporting of this sacred document are prohibited.
        </p>
        <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
          Document licensed exclusively to: {userName}
        </p>
        <p style={{ fontSize: '11pt', color: '#666' }}>
          Kalyanam ID: {kalyanamId} • All rights reserved
        </p>
      </div>

      {/* Viewer Header with User Identity and Nav Controls */}
      <div className="viewer-header">
        <div className="viewer-nav">
          <button className="viewer-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Kit Store
          </button>
          <div className="viewer-badge">
            <Sparkles size={14} />
            <span>{hasVideo ? 'Poojan Vidhi Video + Kit (Complete)' : 'Poojan Vidhi Kit (Digital Edition)'}</span>
          </div>
        </div>
        
        <div className="viewer-user-meta">
          <div className="user-kalyanam">
            <span className="dot-active" />
            <span>Kalyanam ID: <strong>{kalyanamId}</strong></span>
          </div>
          <div className="user-owner">
            <span>Blessed for: <strong>{userName}</strong></span>
          </div>
          {onLogout && (
            <button className="viewer-logout-btn" onClick={onLogout} title="Log Out from Sacred Viewer">
              <LogOut size={13} /> Logout
            </button>
          )}
        </div>
      </div>

      <div className="viewer-container">
        {/* PDF Download Card / Banner for Paid Devotees */}
        <div className="pdf-download-card" style={{
          background: 'linear-gradient(135deg, rgba(143, 33, 28, 0.08) 0%, rgba(217, 168, 82, 0.15) 100%)',
          border: '1.5px solid rgba(217, 168, 82, 0.4)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#8f211c',
              color: '#f8dfa5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileText size={22} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#8f211c', fontWeight: 700 }}>
                Download Diwali Puja Vidhi PDF (Hindi)
              </h4>
              <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: '#5a4638' }}>
                संपूर्ण दिवाली पूजन विधि, मंत्र एवं सामग्री सूची – ऑफ़लाइन अध्ययन या प्रिंट के लिए
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            style={{
              cursor: downloading ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#8f211c',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.92rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(143, 33, 28, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <Download size={16} />
            <span>{downloading ? 'Downloading...' : '📥 Download PDF (8.3 MB)'}</span>
          </button>
        </div>

        {/* If user purchased Video Kit, render the Video Player */}
        {hasVideo && (
          <div className="video-access-card">
            <div className="video-header">
              <div className="video-title">
                <Video size={20} className="gold-icon" />
                <div>
                  <h4>Step-by-Step Lakshmi-Ganesh Puja Video Guide</h4>
                  <p>Complete visual walkthrough: Chowki Sthapana, Sankalp, Deepdaan &amp; Aarti</p>
                </div>
              </div>
              <span className="badge-exclusive">Exclusive Video Access</span>
            </div>
            <div className="video-frame-wrapper">
              <video
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                className="protected-video-player"
                poster="/images/banner.jpg"
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                src={videoSrc}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-tips-row">
              <span>💡 <strong>Tip:</strong> Keep this video playing softly on your tablet or phone during the puja.</span>
            </div>
          </div>
        )}

        {/* Vidhi Reader Card */}
        <div className="content-reader-card" style={{ position: 'relative' }}>
          {/* Dynamic Personalized Repeating Diagonal Watermark Overlay */}
          <WatermarkOverlay userName={userName} kalyanamId={kalyanamId} />

          <div className="reader-toolbar">
            <div className="reader-title">
              <BookOpen size={18} />
              <span>Sacred Vidhi &amp; Mantras</span>
            </div>
            <div className="reader-lang-tabs">
              <button
                className={`tab-btn ${activeTab === 'hi' ? 'active' : ''}`}
                onClick={() => setActiveTab('hi')}
              >
                हिन्दी (Hindi)
              </button>
              <button
                className={`tab-btn ${activeTab === 'en' ? 'active' : ''}`}
                onClick={() => setActiveTab('en')}
              >
                English
              </button>
            </div>
          </div>

          {/* DRM Protected Server HTML Content (preserves .wm, .en, .hi, .meta, .tip, .ill, .end) */}
          <div
            className={`protected-html-body lang-view-${activeTab}`}
            dangerouslySetInnerHTML={{ __html: rawHtml }}
          />

          <div className="reader-footer-note">
            <p>🕉️ May Goddess Lakshmi and Lord Ganesh bless your household with joy, health and auspicious fortune. 🙏</p>
            <small style={{ display: 'block', marginTop: '6px', opacity: 0.7 }}>
              Licensed for personal and family puja use • Kalyanam ID: {kalyanamId}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
