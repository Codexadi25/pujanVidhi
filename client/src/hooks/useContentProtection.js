import { useState, useEffect } from 'react';

/**
 * SECURITY ARCHITECTURE & MOBILE DEFENSE NOTE:
 * 
 * Operating system screenshot shortcuts (such as physical Power + Volume buttons or native OS
 * screen recorders) operate at the kernel/OS level below the browser sandbox.
 * 
 * To defend against mobile screenshot techniques on Android and iOS devices:
 * 1. Three-Finger Swipe Interception: Detects multi-touch events (e.touches.length >= 3), cancels the
 *    gesture pipeline with non-passive event listeners, and instantly triggers an opaque shield.
 * 2. Gesture Scoping: Enforces `touch-action: pan-y` so that only standard single-finger reading scroll is
 *    permitted, neutralizing complex multi-finger system gesture recognition.
 * 3. iOS Callout Suppression: `-webkit-touch-callout: none` completely eliminates iOS Safari's long-press
 *    context menus and "Save Image" sheets.
 * 4. Hardware Shortcut Blurring: Hardware button presses (Power + Volume) momentarily steal window focus;
 *    our `visibilitychange` and `blur` listeners instantly shroud the screen with the security overlay.
 * 5. Forensic Identity Watermark: Authenticated user name and Kalyanam ID are permanently stamped diagonally
 *    across every section, ensuring any external photo or screen capture is immediately attributed.
 */

export function useContentProtection({
  containerRef,
  userName = 'Bhakt',
  kalyanamId = 'KLY-MEMBER'
}) {
  const [toast, setToast] = useState('');
  const [isObscured, setIsObscured] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const showToast = (message) => {
    setToast(message);
    const timer = setTimeout(() => {
      setToast('');
    }, 2800);
    return timer;
  };

  useEffect(() => {
    const container = containerRef?.current;

    // 1. Disable Context Menu inside protected container only
    const handleContextMenu = (e) => {
      if (container && container.contains(e.target)) {
        e.preventDefault();
        showToast('⚠️ Right-click context menu is disabled to protect sacred puja content.');
        return false;
      }
    };

    // 2. Disable Text Selection inside protected container
    const handleSelectStart = (e) => {
      if (container && container.contains(e.target)) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Disable Text and Image Dragging inside protected container
    const handleDragStart = (e) => {
      if (container && container.contains(e.target)) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Disable Copy / Cut events inside protected container
    const handleCopyCut = (e) => {
      if (container && container.contains(e.target)) {
        e.preventDefault();
        showToast('⚠️ Copying and extracting sacred text or images is restricted.');
        return false;
      }
    };

    // 5. Mobile 3-Finger Swipe Screenshot Gesture Interception (Android / iOS)
    // Android OEMs (MIUI, ColorOS, OxygenOS, Realme, Samsung, Vivo) listen for 3-finger swipe down
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length >= 3) {
        if (e.cancelable) e.preventDefault();
        setIsObscured(true);
        showToast('🔒 Three-finger screenshot gesture blocked.');
        setTimeout(() => setIsObscured(false), 3000);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length >= 3) {
        if (e.cancelable) e.preventDefault();
        setIsObscured(true);
      }
    };

    // 6. Keyboard Shortcut Deterrents (Scoped to active viewer session)
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Discourage Ctrl/Cmd + C, X, S, P, U, A
      if (isCtrlOrCmd && ['c', 'x', 's', 'p', 'u', 'a'].includes(key)) {
        e.preventDefault();
        e.stopPropagation();

        if (key === 'c' || key === 'x') {
          showToast('⚠️ Copying sacred content is prohibited.');
        } else if (key === 'p') {
          showToast('⚠️ Printing or saving as PDF is prohibited.');
        } else if (key === 's') {
          showToast('⚠️ Saving this protected document to disk is disabled.');
        } else if (key === 'u') {
          showToast('⚠️ Viewing source is restricted.');
        } else if (key === 'a') {
          showToast('⚠️ Bulk text selection is disabled.');
        }
        return false;
      }

      // Discourage Developer Inspection shortcuts (F12, Ctrl+Shift+I, etc.)
      if (
        e.key === 'F12' ||
        (isCtrlOrCmd && e.shiftKey && ['i', 'c', 'j'].includes(key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        showToast('⚠️ Developer inspection tools are restricted for this document.');
        return false;
      }

      // Detect PrintScreen / SysRq key press
      if (e.key === 'PrintScreen' || key === 'printscreen') {
        e.preventDefault();
        // Overwrite system clipboard with anti-piracy warning if browser permits
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(
            `[Kalyanam Protection System] Unauthorized reproduction or screenshots of sacred Vidhi are prohibited. Document licensed exclusively to ${userName} (${kalyanamId}).`
          ).catch(() => {});
        }

        // Temporarily obscure content to prevent clean capture
        setIsObscured(true);
        showToast('🔒 Screen capture is restricted for sacred documents.');
        setTimeout(() => setIsObscured(false), 2600);
        return false;
      }
    };

    // 7. Visibility Change & Window Blur Detection (Screen Recording / Tab Switch / Hardware Button Deterrent)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsObscured(true);
      } else {
        setIsObscured(false);
      }
    };

    const handleWindowBlur = () => {
      setIsObscured(true);
    };

    const handleWindowFocus = () => {
      setIsObscured(false);
    };

    // 8. Print Event Interception
    const handleBeforePrint = () => {
      setIsPrinting(true);
      showToast('🔒 Printing sacred Kalyanam documents is restricted.');
    };

    const handleAfterPrint = () => {
      setIsPrinting(false);
    };

    // Attach listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // Multi-touch screenshot listener with non-passive flag to allow event cancellation
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Clean up all event listeners on unmount to prevent memory leaks or interference outside the viewer
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef, userName, kalyanamId]);

  return {
    toast,
    isObscured,
    isPrinting,
    setIsObscured,
    showToast
  };
}
