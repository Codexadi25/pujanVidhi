import React, { useState, useEffect } from 'react';
import {
  Sparkles, Check, ArrowRight, ShieldCheck, Lock, User, Mail, Phone, KeyRound,
  CreditCard, Video, BookOpen, AlertCircle, RefreshCw, LogOut, CheckCircle2,
  ChevronRight, ArrowLeft
} from 'lucide-react';
import { api, authStorage } from '../services/api';
import ProtectedVidhiViewer from './ProtectedVidhiViewer';

const defaultKits = [
  {
    id: 'kit',
    productId: null,
    name: 'Poojan Vidhi Kit',
    subtitle: 'Complete Diwali Lakshmi-Ganesh Puja Digital Guide',
    price: 21,
    origPrice: 199,
    savings: 'Save 89%',
    badge: 'Essential Guide',
    featured: false,
    hasVideoAccess: false,
    features: [
      'Complete Step-by-Step Diwali Lakshmi-Ganesh Vidhi',
      'Detailed Samagri Checklist with Household Substitutes',
      'Sacred Sanskrit Mantras with Hindi & English Meanings',
      'Chowki & Kalash Sthapana Illustrated Diagram',
      'Diwali Muhurat & Sthir Lagna Guide',
      'Perpetual Digital Access for Your Family'
    ]
  },
  {
    id: 'video_kit',
    productId: null,
    name: 'Poojan Vidhi Video + Poojan Kit',
    subtitle: 'Premium Masterclass: Video Walkthrough + Sacred Kit',
    price: 51,
    origPrice: 299,
    savings: 'Save 83%',
    badge: '🌟 Most Popular & Recommended',
    featured: true,
    hasVideoAccess: true,
    features: [
      'Everything in the Poojan Vidhi Kit',
      'Full HD Step-by-Step Video Walkthrough of Every Puja Stage',
      'Audio Guide for Accurate Sanskrit Mantra Pronunciation',
      'Printable Sacred Aarti Sangrah',
      'Family Sankalp & Deepdaan Sacred Traditions Guide',
      'Priority Festive Guidance & Unlimited Cloud Access'
    ]
  }
];

export default function BuyPage({ onBackToHome, initialKit = 'video_kit' }) {
  const [selectedKit, setSelectedKit] = useState(initialKit); // 'kit' or 'video_kit'
  const [user, setUser] = useState(authStorage.getUser());
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [step, setStep] = useState('select'); // 'select', 'payment', 'access'
  
  // Dynamic products from server
  const [dbProducts, setDbProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contentData, setContentData] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch dynamic products on mount
  useEffect(() => {
    let isMounted = true;
    api.getProducts()
      .then(res => {
        if (isMounted && res?.products && Array.isArray(res.products) && res.products.length > 0) {
          setDbProducts(res.products);
        }
      })
      .catch(err => {
        console.warn('Could not fetch products from server, using default active products:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingProducts(false);
      });
    return () => { isMounted = false; };
  }, []);

  // Check login on mount and verify with server (DO NOT AUTO-JUMP to access viewer)
  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      api.getMe()
        .then(res => {
          if (res?.user) {
            setUser(res.user);
            // Notice: We deliberately keep step = 'select' so user can view storefront/prices
          }
        })
        .catch(() => {
          authStorage.clear();
          setUser(null);
        });
    }
  }, []);

  // Compute dynamic kits mapped from server database
  const activeProducts = dbProducts.filter(p => p.isActive);
  const kits = activeProducts.length > 0
    ? activeProducts.map((p) => {
        const isVideo = p.type === 'video_kit' || p.hasVideoAccess;
        const planId = isVideo ? 'video_kit' : 'kit';
        const origPrice = p.origPrice || (p.price > 50 ? p.price * 2 : 199);
        const savingsPercent = origPrice > p.price ? Math.round(((origPrice - p.price) / origPrice) * 100) : 0;
        return {
          id: planId,
          productId: p._id,
          slug: p.slug,
          name: p.name,
          subtitle: p.subtitle,
          price: p.price,
          origPrice: origPrice,
          savings: savingsPercent > 0 ? `Save ${savingsPercent}%` : '',
          badge: p.badge || (isVideo ? '🌟 Most Popular & Recommended' : 'Essential Guide'),
          featured: isVideo,
          hasVideoAccess: p.hasVideoAccess,
          type: p.type,
          features: p.features && p.features.length > 0 ? p.features : [
            'Complete Step-by-Step Diwali Lakshmi-Ganesh Vidhi',
            'Detailed Samagri Checklist with Household Substitutes',
            'Sacred Sanskrit Mantras with Hindi & English Meanings',
            'Perpetual Digital Access for Your Family'
          ]
        };
      })
    : defaultKits;

  const currentKitInfo = kits.find(k => k.id === selectedKit || k.productId === selectedKit) || kits[0];

  const loadContent = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getContent();
      setContentData(data);
    } catch (err) {
      setError(err.message || 'Failed to load protected content from server');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) return setError('Please enter your full name');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter a valid email address');
    if (!/^\d{10}$/.test(phone.trim())) return setError('Please enter a valid 10-digit mobile number');
    if (password.length < 6) return setError('Password must be at least 6 characters');

    try {
      setLoading(true);
      const res = await api.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password
      });

      setUser(res.user);
      
      // Auto direct based on user status
      if (res.user.paid && (res.user.plan === selectedKit || res.user.hasVideoAccess)) {
        setStep('access');
        await loadContent();
      } else {
        setStep('payment');
        setTimeout(() => {
          document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        // Automatically open the Razorpay checkout modal
        initiatePayment(res.user);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) return setError('Please enter your email or phone number');
    if (!password) return setError('Please enter your password');

    try {
      setLoading(true);
      const res = await api.login({
        email: email.trim().toLowerCase(),
        password
      });

      setUser(res.user);

      if (res.user.paid && (res.user.plan === selectedKit || res.user.hasVideoAccess)) {
        setStep('access');
        await loadContent();
      } else {
        setStep('payment');
        setTimeout(() => {
          document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Main Payment Initiation Function
  const initiatePayment = async (activeUser) => {
    const currentUser = activeUser || user;
    try {
      setLoading(true);
      setError('');

      // 1. Create order on backend with dynamic product & price
      const orderData = await api.createOrder({
        plan: currentKitInfo.id,
        productId: currentKitInfo.productId
      });

      // 2. Launch Razorpay modal if live key or real test key available
      if (orderData.key && !orderData.key.includes('simulated')) {
        const loaded = await loadRazorpayScript();
        if (!loaded || !window.Razorpay) {
          throw new Error('Razorpay payment gateway script could not be loaded. Please check your internet connection.');
        }

        const options = {
          key: orderData.key,
          amount: orderData.amount, // Exact dynamic amount in paise from server
          currency: 'INR',
          name: 'Poojan Vidhi',
          description: orderData.productTitle || currentKitInfo.name,
          order_id: orderData.orderId,
          prefill: {
            name: currentUser?.name || name || '',
            email: currentUser?.email || email || '',
            contact: currentUser?.phone || phone || ''
          },
          theme: {
            color: '#8f211c'
          },
          handler: async function (response) {
            try {
              setLoading(true);
              const verifyRes = await api.verifyPayment({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                plan: currentKitInfo.id,
                productId: currentKitInfo.productId
              });

              setUser(verifyRes.user);
              setPaymentSuccess(true);

              setTimeout(async () => {
                setStep('access');
                await loadContent();
                setPaymentSuccess(false);
              }, 1000);
            } catch (err) {
              setError(err.message || 'Payment verification failed. Please contact support.');
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          setError(resp.error?.description || 'Payment was unsuccessful. Please try again.');
          setLoading(false);
        });
        rzp.open();
        return;
      }

      // 3. Fallback for simulated development mode
      const verifyRes = await api.verifyPayment({
        orderId: orderData.orderId,
        paymentId: 'pay_' + Math.random().toString(36).substring(2, 10),
        signature: 'simulated_sig',
        plan: currentKitInfo.id,
        productId: currentKitInfo.productId
      });

      setUser(verifyRes.user);
      setPaymentSuccess(true);

      setTimeout(async () => {
        setStep('access');
        await loadContent();
        setPaymentSuccess(false);
      }, 1000);

    } catch (err) {
      setError(err.message || 'Payment processing encountered an error. Please try again.');
      setLoading(false);
    }
  };

  const handlePayment = () => initiatePayment(user);

  const handleLogout = () => {
    api.logout();
    authStorage.clear();
    setUser(null);
    setContentData(null);
    setStep('select');
  };

  // If user explicitly opened protected content
  if (step === 'access' && user && (user.paid || contentData)) {
    return (
      <ProtectedVidhiViewer
        user={user}
        contentData={contentData}
        onBack={() => setStep('select')}
        onRefresh={loadContent}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="buy-page-root">
      {/* Top Banner Navigation */}
      <header className="buy-header">
        <div className="buy-header-inner">
          <button className="buy-back-link" onClick={onBackToHome}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          
          <div className="buy-brand">
            <span className="brand-om">ॐ</span>
            <span><strong>पूजनविधि</strong><small>poojanvidhi kit store</small></span>
          </div>

          <div className="buy-header-user">
            {user ? (
              <div className="user-logged-pill">
                <span className="user-name">🙏 {user.name}</span>
                {user.paid && (
                  <button className="btn-access-tag" onClick={() => { setStep('access'); loadContent(); }}>
                    View Kit
                  </button>
                )}
                <button className="btn-logout" onClick={handleLogout} title="Logout">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <span className="secure-badge">
                <ShieldCheck size={16} /> 256-Bit SSL Secure
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="stepper-bar">
        <div className={`step-item ${step === 'select' ? 'active' : 'completed'}`}>
          <span className="step-num">{step !== 'select' ? '✓' : '1'}</span>
          <span className="step-label">Select Kit</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${step === 'payment' ? 'active' : user?.paid ? 'completed' : ''}`}>
          <span className="step-num">{user?.paid ? '✓' : '2'}</span>
          <span className="step-label">Account &amp; Payment</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${step === 'access' ? 'active' : ''}`}>
          <span className="step-num">3</span>
          <span className="step-label">Online Access</span>
        </div>
      </div>

      <div className="buy-content-wrapper">
        <div className="buy-intro-text">
          <span className="section-kicker"><Sparkles size={14} /> DIWALI 2026 AUSPICIOUS KITS</span>
          <h1>Choose Your Guided Puja Experience</h1>
          <p>
            Perform your Diwali Lakshmi-Ganesh Puja with complete confidence, pristine Vedic procedures,
            and profound peace of mind.
          </p>
        </div>

        {/* If user is logged in and already paid, show friendly banner */}
        {user?.paid && (
          <div style={{
            background: 'linear-gradient(135deg, #fef4e8, #fdf0db)',
            border: '2px solid #c69a43',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(143, 33, 28, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle2 size={32} color="#8f211c" />
              <div>
                <strong style={{ color: '#8f211c', fontSize: '16px', display: 'block' }}>
                  🙏 Auspicious Access Active for {user.name}
                </strong>
                <span style={{ fontSize: '13px', color: '#6d5345' }}>
                  You have lifetime sacred access to <strong>{user.plan === 'video_kit' ? 'Poojan Vidhi Video + Kit' : 'Poojan Vidhi Kit'}</strong>.
                </span>
              </div>
            </div>
            <button
              onClick={() => { setStep('access'); loadContent(); }}
              style={{
                background: '#8f211c',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <BookOpen size={16} /> Open Sacred Vidhi ➔
            </button>
          </div>
        )}

        {error && (
          <div className="buy-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Select Kit (Dynamic from Database) */}
        <div className="kits-grid-container">
          {kits.map((kit) => {
            const isSelected = selectedKit === kit.id || selectedKit === kit.productId;
            return (
              <div
                key={kit.productId || kit.id}
                className={`kit-card ${kit.featured ? 'featured' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedKit(kit.id)}
              >
                {kit.badge && <span className="kit-badge">{kit.badge}</span>}
                <div className="kit-header">
                  <h3>{kit.name}</h3>
                  <p>{kit.subtitle}</p>
                </div>

                <div className="kit-pricing">
                  <span className="currency">₹</span>
                  <span className="amount">{kit.price}</span>
                  {kit.origPrice > kit.price && (
                    <span className="original">₹{kit.origPrice}</span>
                  )}
                  {kit.savings && (
                    <span className="savings">{kit.savings}</span>
                  )}
                </div>

                <ul className="kit-features-list">
                  {kit.features.map((feat, i) => (
                    <li key={i}>
                      <Check size={16} className="feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`kit-select-btn ${isSelected ? 'btn-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedKit(kit.id);
                    if (user && !user.paid) setStep('payment');
                  }}
                >
                  {isSelected ? '✓ Selected Plan' : 'Select This Kit'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Step 2: User Authentication or Payment Direct */}
        <div className="checkout-section-container" id="payment-section">
          {!user ? (
            /* User NOT logged in: Show Signup / Login Form */
            <div className="auth-card">
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                  onClick={() => { setAuthMode('signup'); setError(''); }}
                >
                  <User size={16} /> Create Account (New User)
                </button>
                <button
                  className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => { setAuthMode('login'); setError(''); }}
                >
                  <Lock size={16} /> Already Have an Account? Login
                </button>
              </div>

              {authMode === 'signup' ? (
                <form className="auth-form" onSubmit={handleSignup}>
                  <div className="form-legend">
                    <h4>Sign up to activate perpetual access to {currentKitInfo.name}</h4>
                    <p>Enter your details below. You will be auto-directed to payment next.</p>
                  </div>

                  <div className="input-group">
                    <label>Full Name *</label>
                    <div className="input-wrapper">
                      <User size={16} className="input-icon" />
                      <input
                        type="text"
                        placeholder="e.g. Rameshwar Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Email Address *</label>
                    <div className="input-wrapper">
                      <Mail size={16} className="input-icon" />
                      <input
                        type="email"
                        placeholder="e.g. rameshwar@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>10-Digit Mobile Number *</label>
                    <div className="input-wrapper">
                      <Phone size={16} className="input-icon" />
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Create Password *</label>
                    <div className="input-wrapper">
                      <KeyRound size={16} className="input-icon" />
                      <input
                        type="password"
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button className="auth-submit-btn" type="submit" disabled={loading}>
                    {loading ? <RefreshCw className="spin" size={18} /> : (
                      <>Create Account &amp; Proceed to Payment <ArrowRight size={18} /></>
                    )}
                  </button>
                  <small className="form-privacy-note">🔒 Your personal details are strictly private and sacred.</small>
                </form>
              ) : (
                <form className="auth-form" onSubmit={handleLogin}>
                  <div className="form-legend">
                    <h4>Welcome back! Login to your account</h4>
                    <p>Access your purchased kit or complete payment.</p>
                  </div>

                  <div className="input-group">
                    <label>Email Address *</label>
                    <div className="input-wrapper">
                      <Mail size={16} className="input-icon" />
                      <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Password *</label>
                    <div className="input-wrapper">
                      <KeyRound size={16} className="input-icon" />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button className="auth-submit-btn" type="submit" disabled={loading}>
                    {loading ? <RefreshCw className="spin" size={18} /> : (
                      <>Login &amp; Continue <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (user.paid && step !== 'payment') ? (
            /* User already purchased */
            <div className="already-paid-card">
              <CheckCircle2 size={48} className="gold-icon" />
              <h3>Auspicious Access Active!</h3>
              <p>
                Namaste <strong>{user.name}</strong>, your account already has verified access to the
                <strong> {user.plan === 'video_kit' ? 'Poojan Vidhi Video + Kit' : 'Poojan Vidhi Kit'}</strong>.
              </p>
              <button
                className="btn-open-kit"
                onClick={() => { setStep('access'); loadContent(); }}
              >
                <BookOpen size={18} /> Open Protected Kit Viewer
              </button>
            </div>
          ) : (
            /* User logged in but NOT paid: Direct Payment Checkout */
            <div className="payment-checkout-card">
              <div className="checkout-header">
                <CreditCard size={24} className="gold-icon" />
                <div>
                  <h3>Complete Your Order</h3>
                  <p>Instant activation for <strong>{user.name}</strong> ({user.email})</p>
                </div>
              </div>

              <div className="order-summary-box">
                <div className="summary-line">
                  <span>Selected Package</span>
                  <strong>{currentKitInfo.name}</strong>
                </div>
                <div className="summary-line">
                  <span>Regular Price</span>
                  <span className="strikethrough">₹{currentKitInfo.origPrice}</span>
                </div>
                <div className="summary-line">
                  <span>Diwali Festive Discount</span>
                  <span className="green-text">-₹{currentKitInfo.origPrice - currentKitInfo.price}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-total">
                  <span>Total Amount Payable:</span>
                  <strong>₹{currentKitInfo.price}</strong>
                </div>
              </div>

              <div className="payment-modes-info">
                <span>Accepted Payment Methods:</span>
                <div className="payment-badges">
                  <span className="pay-badge">UPI / QR</span>
                  <span className="pay-badge">Google Pay</span>
                  <span className="pay-badge">PhonePe</span>
                  <span className="pay-badge">Paytm</span>
                  <span className="pay-badge">Cards &amp; NetBanking</span>
                </div>
              </div>

              {paymentSuccess ? (
                <div className="payment-success-badge">
                  <CheckCircle2 size={24} />
                  <span>Payment Verified! Opening Your Kit...</span>
                </div>
              ) : (
                <button
                  className="btn-pay-now"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <><RefreshCw className="spin" size={18} /> Processing Secure Payment...</>
                  ) : (
                    <>Pay ₹{currentKitInfo.price} &amp; Get Instant Online Access <ChevronRight size={18} /></>
                  )}
                </button>
              )}

              <div className="checkout-trust-row">
                <span>🛡️ 100% Secure Transaction</span>
                <span>⚡ Instant Online Delivery</span>
                <span>🕉️ Dedicated Diwali Support</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
