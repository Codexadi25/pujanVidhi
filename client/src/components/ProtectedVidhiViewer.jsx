import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Lock, Video, CheckCircle, ArrowLeft, RefreshCw, Volume2, Sparkles, BookOpen } from 'lucide-react';

export default function ProtectedVidhiViewer({ user, contentData, onBack, onRefresh }) {
  const [shielded, setShielded] = useState(false);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('hi'); // 'hi' or 'en'
  const containerRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Anti-Copy, Anti-Screenshot, Anti-DevTools listeners
  useEffect(() => {
    // 1. Context Menu (Right Click)
    const handleContextMenu = (e) => {
      e.preventDefault();
      showToast('⚠️ Right-click is disabled to protect sacred puja content.');
      return false;
    };

    // 2. Copy, Cut, Select, Drag
    const handleCopyCut = (e) => {
      e.preventDefault();
      showToast('⚠️ Copying or extracting content is disabled.');
      return false;
    };

    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // 3. Keyboard Shortcuts & PrintScreen
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      // Block Ctrl/Cmd + C, X, S, P, U, A
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'p', 'u', 'a'].includes(key)) {
        e.preventDefault();
        showToast('⚠️ Keyboard shortcuts (Copy/Save/Print) are disabled.');
        return false;
      }

      // Block F12, Ctrl+Shift+I, Ctrl+Shift+C (DevTools)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'c', 'j'].includes(key))
      ) {
        e.preventDefault();
        showToast('⚠️ Developer inspection is restricted.');
        return false;
      }

      // Block PrintScreen key
      if (e.key === 'PrintScreen' || key === 'printscreen') {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('Screenshots of sacred Poojan Vidhi are restricted.');
        }
        setShielded(true);
        showToast('🔒 Screenshots are strictly prohibited.');
        setTimeout(() => setShielded(false), 2500);
        return false;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.key.toLowerCase() === 'printscreen') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('');
        }
      }
    };

    // 4. Blur / Window Switch Shield (Protects against Snipping Tool & Background Capturing)
    const handleBlur = () => {
      setShielded(true);
    };

    const handleFocus = () => {
      setShielded(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShielded(true);
      } else {
        setShielded(false);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopyCut);
    window.addEventListener('cut', handleCopyCut);
    window.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopyCut);
      window.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const hasVideo = contentData?.hasVideoAccess || user?.plan === 'video_kit';

  // Extract Hindi / English sections if provided, or show complete HTML
  const rawHtml = contentData?.html || '';

  return (
    <div className="protected-viewer-root" ref={containerRef}>
      {/* Print protection */}
      <style>{`
        @media print {
          html, body, .protected-viewer-root, * {
            display: none !important;
            visibility: hidden !important;
          }
        }
      `}</style>

      {/* Floating security toast */}
      {toast && (
        <div className="security-toast">
          <ShieldAlert size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Blur shield when window loses focus or screenshot tool activated */}
      {shielded && (
        <div className="screen-shield-overlay">
          <div className="shield-card">
            <Lock size={42} className="shield-icon" />
            <h3>🔒 Sacred Content Protected</h3>
            <p>Screen capture, snipping, and recording are restricted.</p>
            <small>Click inside this window to resume your Puja Vidhi.</small>
          </div>
        </div>
      )}

      {/* Viewer Header */}
      <div className="viewer-header">
        <div className="viewer-nav">
          <button className="viewer-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Overview
          </button>
          <div className="viewer-badge">
            <Sparkles size={14} />
            <span>{hasVideo ? 'Poojan Vidhi Video + Kit (Complete)' : 'Poojan Vidhi Kit (Digital Edition)'}</span>
          </div>
        </div>
        
        <div className="viewer-user-meta">
          <div className="user-kalyanam">
            <span className="dot-active" />
            <span>Kalyanam ID: <strong>{user?.kalyanamId || contentData?.kalyanamId}</strong></span>
          </div>
          <div className="user-owner">
            <span>Blessed for: <strong>{user?.name || contentData?.name}</strong></span>
          </div>
        </div>
      </div>

      <div className="viewer-container">
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
              >
                <source src="/images/lights.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-tips-row">
              <span>💡 <strong>Tip:</strong> Keep this video playing softly on your tablet or phone during the puja.</span>
            </div>
          </div>
        )}

        {/* Vidhi Reader Card */}
        <div className="content-reader-card">
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

          {/* Dynamic Watermark Background */}
          <div className="watermark-overlay" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className="wm-stamp">
                {user?.kalyanamId || contentData?.kalyanamId} • {user?.name || contentData?.name} • POOJANVIDHI 2026
              </span>
            ))}
          </div>

          {/* DRM Protected Server HTML Content */}
          <div
            className={`protected-html-body lang-view-${activeTab}`}
            dangerouslySetInnerHTML={{ __html: rawHtml }}
          />

          <div className="reader-footer-note">
            <p>🕉️ May Goddess Lakshmi and Lord Ganesh bless your household with joy, health and auspicious fortune. 🙏</p>
          </div>
        </div>
      </div>
    </div>
  );
}

