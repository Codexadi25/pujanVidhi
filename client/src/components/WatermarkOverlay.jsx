import React, { useMemo } from 'react';

/**
 * Dynamic Personalized Watermarking Engine
 * 
 * Embeds authenticated user credentials in a repeating diagonal pattern across
 * all sections of the protected document.
 * 
 * Format: "{{NAME}} | Kalyanam ID: {{KID}}"
 */
export default function WatermarkOverlay({ userName = 'Bhakt', kalyanamId = 'KLY-MEMBER' }) {
  const watermarkText = useMemo(() => {
    const cleanName = String(userName || 'Bhakt').trim();
    const cleanKid = String(kalyanamId || 'KLY-MEMBER').trim();
    return `${cleanName} | Kalyanam ID: ${cleanKid}`;
  }, [userName, kalyanamId]);

  // Generate dynamic repeating SVG tile as data-uri to ensure smooth tiling on all browsers and devices
  const svgDataUri = useMemo(() => {
    // Escape special XML characters
    const escaped = watermarkText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="200" viewBox="0 0 360 200">
      <text x="180" y="100" transform="rotate(-25 180 100)" 
            font-family="'Lato', -apple-system, BlinkMacSystemFont, sans-serif" 
            font-weight="700" font-size="11.5" 
            fill="#38231b" fill-opacity="0.075" 
            text-anchor="middle" letter-spacing="1.2">
        ${escaped}
      </text>
    </svg>`;

    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  }, [watermarkText]);

  return (
    <div
      className="watermark-overlay-container"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        zIndex: 12,
        backgroundImage: svgDataUri,
        backgroundRepeat: 'repeat',
        backgroundPosition: '0 0',
        backgroundSize: '360px 200px',
        opacity: 1
      }}
    />
  );
}

