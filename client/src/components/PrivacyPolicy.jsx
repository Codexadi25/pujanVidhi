import React from 'react';
import {
  ShieldCheck, ArrowLeft, Mail, Phone, Lock, FileText,
  UserCheck, AlertCircle, HeartHandshake, Sparkles, Clock
} from 'lucide-react';

export default function PrivacyPolicy({ onBackToHome }) {
  const supportEmail = 'thepoojanvidhi@gmail.com';
  const supportPhone = '+919956355567';

  return (
    <div className="privacy-page-root" style={{
      minHeight: '100vh',
      backgroundColor: '#fbf7f0',
      color: '#38231b',
      fontFamily: '"Lato", -apple-system, sans-serif'
    }}>
      {/* Top Banner Navigation */}
      <header style={{
        backgroundColor: '#fff9f2',
        borderBottom: '1px solid #ebd9c8',
        padding: '14px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#8f211c',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/images/PoojanVidhi_Logo.jpeg" alt="PoojanVidhi" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #c69a43' }} />
            <span style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#8f211c'
            }}>
              पूजनविधि
            </span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#2e7d32',
            fontWeight: 700,
            background: '#e8f5e9',
            padding: '4px 10px',
            borderRadius: '20px'
          }}>
            <ShieldCheck size={14} /> 256-Bit SSL Protected
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px 80px' }}>
        {/* Hero Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #ebd9c8',
          padding: '36px 32px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(143, 33, 28, 0.04)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#c69a43',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '10px'
          }}>
            <Sparkles size={14} /> Official Legal &amp; Data Protection Policy
          </div>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", "Noto Serif Devanagari", serif',
            fontSize: '34px',
            color: '#8f211c',
            margin: '0 0 12px'
          }}>
            Privacy Policy &amp; Security Terms
          </h1>
          <p style={{ color: '#6d5345', fontSize: '15px', maxWidth: '640px', margin: '0 auto 16px', lineHeight: 1.6 }}>
            At <strong>पूजनविधि (PoojanVidhi / Kalyanam Puja Services)</strong>, we honor your sacred traditions and protect your personal privacy with the utmost reverence, transparency, and bank-grade security standards.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8c6a58' }}>
            <Clock size={13} /> Last Updated: October 2026 • Valid for Diwali 2026 &amp; Ongoing Services
          </div>
        </div>

        {/* Quick Contact & Grievance Box */}
        <div style={{
          background: 'linear-gradient(135deg, #fdf8ee, #faebd7)',
          border: '2px solid #e2ba6e',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '35px',
          boxShadow: '0 4px 15px rgba(198, 154, 67, 0.08)'
        }}>
          <h3 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '20px',
            color: '#8f211c',
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <HeartHandshake size={20} color="#8f211c" /> Direct Support &amp; Grievance Contacts
          </h3>
          <p style={{ fontSize: '14px', color: '#543b2f', margin: '0 0 16px', lineHeight: 1.5 }}>
            For privacy inquiries, order support, data correction, or payment assistance, reach out directly to our dedicated support desk:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            <a
              href={`tel:${supportPhone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #ebd9c8',
                textDecoration: 'none',
                color: '#38231b',
                transition: 'transform 0.15s, border-color 0.15s'
              }}
            >
              <div style={{
                background: '#8f211c15',
                color: '#8f211c',
                padding: '8px',
                borderRadius: '6px'
              }}>
                <Phone size={18} />
              </div>
              <div>
                <small style={{ display: 'block', fontSize: '11px', color: '#8c6a58', textTransform: 'uppercase', fontWeight: 700 }}>
                  Customer Support &amp; WhatsApp
                </small>
                <strong style={{ fontSize: '15px', color: '#8f211c' }}>{supportPhone}</strong>
              </div>
            </a>

            <a
              href={`mailto:${supportEmail}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #ebd9c8',
                textDecoration: 'none',
                color: '#38231b',
                transition: 'transform 0.15s, border-color 0.15s'
              }}
            >
              <div style={{
                background: '#8f211c15',
                color: '#8f211c',
                padding: '8px',
                borderRadius: '6px'
              }}>
                <Mail size={18} />
              </div>
              <div>
                <small style={{ display: 'block', fontSize: '11px', color: '#8c6a58', textTransform: 'uppercase', fontWeight: 700 }}>
                  Official Grievance Officer Email
                </small>
                <strong style={{ fontSize: '14px', color: '#8f211c', wordBreak: 'break-all' }}>{supportEmail}</strong>
              </div>
            </a>
          </div>
        </div>

        {/* Policy Body Sections */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #ebd9c8',
          padding: '40px',
          lineHeight: 1.8
        }}>
          {/* Section 1 */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              color: '#8f211c',
              borderLeft: '4px solid #c69a43',
              paddingLeft: '12px',
              margin: '0 0 14px'
            }}>
              1. Information We Collect
            </h2>
            <p style={{ margin: '0 0 12px' }}>
              When you purchase a sacred Puja Vidhi kit or register an account on our platform, we collect the following essential information:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li><strong>Personal Identifiers:</strong> Your full name, valid email address, and 10-digit mobile contact number.</li>
              <li><strong>Unique Spiritual ID (Kalyanam ID):</strong> A dedicated reference code (e.g. <code>KLY3681138</code>) auto-generated to authenticate your family’s puja license and track kit access.</li>
              <li><strong>Payment &amp; Transaction Logs:</strong> Transaction identifiers, payment timestamps, amount paid, and selected kit type (e.g. Poojan Vidhi Kit ₹21 or Video Masterclass ₹51).</li>
              <li><strong>Technical &amp; Device Details:</strong> IP addresses and browser signatures used strictly for fraud prevention, rate limiting, and DRM security enforcement.</li>
            </ul>
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: '#f8f4ec',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#6d5345'
            }}>
              🔒 <strong>Payment Security:</strong> We do NOT store or process your sensitive credit/debit card numbers, CVVs, or UPI PINs. All financial payments are processed through Razorpay's RBI-regulated PCI-DSS Level 1 compliant gateway.
            </div>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              color: '#8f211c',
              borderLeft: '4px solid #c69a43',
              paddingLeft: '12px',
              margin: '0 0 14px'
            }}>
              2. How We Use Your Information
            </h2>
            <p style={{ margin: '0 0 12px' }}>We utilize collected data strictly for the following legitimate purposes:</p>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li><strong>Delivering Sacred Content:</strong> Granting instant, perpetual online access to step-by-step Lakshmi-Ganesh Puja Vidhi, Sanskrit Mantras, and HD video walkthroughs.</li>
              <li><strong>Dynamic Forensic Watermarking:</strong> Embedding your authenticated Name and Kalyanam ID diagonally into sacred documents to protect the sanctity of Vedic procedures against unauthorized resale.</li>
              <li><strong>Service Communications:</strong> Dispatching order confirmations, payment receipts, auspicious Muhurat notifications, and account credentials.</li>
              <li><strong>Dedicated Customer Support:</strong> Assisting you via phone (<code>+919956355567</code>) and email (<code>aditya.sahu2557@gmail.com</code>).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              color: '#8f211c',
              borderLeft: '4px solid #c69a43',
              paddingLeft: '12px',
              margin: '0 0 14px'
            }}>
              3. Data Protection &amp; DRM Security
            </h2>
            <p style={{ margin: '0 0 12px' }}>
              The sacred puja literature rendered through our viewer is protected under intellectual property regulations and Vedic copyright protocols:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li><strong>Transport Encryption:</strong> All communications between your device and our servers operate through TLS 1.3 / 256-bit SSL encryption.</li>
              <li><strong>Anti-Piracy Controls:</strong> Text selection, right-click context menus, image dragging, keyboard copy shortcuts (Ctrl+C, Ctrl+P, Ctrl+S), and automated scraping are restricted within the sacred reader.</li>
              <li><strong>Privacy Shield:</strong> When switching tabs or minimizing the browser window, our viewer activates an obscured protective shield to deter background screen capture utilities.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              color: '#8f211c',
              borderLeft: '4px solid #c69a43',
              paddingLeft: '12px',
              margin: '0 0 14px'
            }}>
              4. Sharing &amp; Third-Party Disclosure
            </h2>
            <p style={{ margin: '0 0 12px' }}>
              <strong>We do not sell, rent, or trade your personal information to any third parties for advertising or commercial marketing.</strong> Data is shared only with certified operational partners:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li><strong>Payment Partner:</strong> Razorpay Software Private Limited for verifying and settling rupee transactions.</li>
              <li><strong>Legal Compliance:</strong> When required by applicable Indian laws or government authorities to comply with statutory legal processes.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              color: '#8f211c',
              borderLeft: '4px solid #c69a43',
              paddingLeft: '12px',
              margin: '0 0 14px'
            }}>
              5. Cookies &amp; Local Storage
            </h2>
            <p style={{ margin: 0 }}>
              We use lightweight browser <code>localStorage</code> solely to remember your login session token and purchased kit access. We do not use third-party tracking or advertising cookies. You can clear your storage anytime by clicking "Logout" in the portal.
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              color: '#8f211c',
              borderLeft: '4px solid #c69a43',
              paddingLeft: '12px',
              margin: '0 0 14px'
            }}>
              6. Your Privacy Rights
            </h2>
            <p style={{ margin: '0 0 12px' }}>Under the Digital Personal Data Protection Act and Information Technology Rules:</p>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>You have the right to review, rectify, or update your registered name, phone, or email.</li>
              <li>You may request complete account deletion or data erasure upon conclusion of festive puja services by emailing our support desk.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              color: '#8f211c',
              borderLeft: '4px solid #c69a43',
              paddingLeft: '12px',
              margin: '0 0 14px'
            }}>
              7. Grievance Redressal &amp; Contact Desk
            </h2>
            <p style={{ margin: '0 0 14px' }}>
              In accordance with the Information Technology Act, 2000 and applicable consumer protection rules, our Grievance Officer details are published below:
            </p>
            <div style={{
              backgroundColor: '#faf6f0',
              border: '1px solid #ebd9c8',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <p style={{ margin: '0 0 8px' }}><strong>Officer in Charge:</strong> Aditya Sahu</p>
              <p style={{ margin: '0 0 8px' }}><strong>Entity:</strong> पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)</p>
              <p style={{ margin: '0 0 8px' }}>
                <strong>Support Helpline:</strong>{' '}
                <a href={`tel:${supportPhone}`} style={{ color: '#8f211c', fontWeight: 700 }}>
                  {supportPhone}
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <strong>Support &amp; Grievance Email:</strong>{' '}
                <a href={`mailto:${supportEmail}`} style={{ color: '#8f211c', fontWeight: 700 }}>
                  {supportEmail}
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home Button at Bottom */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={onBackToHome}
            style={{
              backgroundColor: '#8f211c',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(143, 33, 28, 0.25)',
              transition: 'background-color 0.2s'
            }}
          >
            <ArrowLeft size={18} /> Return to Homepage
          </button>
        </div>
      </main>
    </div>
  );
}

